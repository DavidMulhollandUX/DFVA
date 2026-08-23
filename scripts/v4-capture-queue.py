#!/usr/bin/env python3
"""Work queue for the Panel C v4 handbook capture.

The handbook rejects the crawl4ai fetcher ("Pardon Our Interruption") but serves
a real browser normally, so capture runs through a browser agent instead. That
agent has no memory between scheduled runs, so all the state lives here: what
has been captured, what is still owed, and what each page turned out to link to.

An agent run is a loop of three calls:

    plan 30                -> what to do: capture (with a batch) / cooloff / attend / idle
    (visit each, write scrapes/v4/raw/<code>__<slot>.json)
    save <code> <slot>     -> file it, discover follow-up pages
    assemble               -> build scrapes/v4/<code>.txt for finished programs

The site can also refuse everyone at once — since 2026-08-16 with an hCaptcha no
unattended agent can clear. That is a site-level fact, not a page-level one, so
it is held centrally: `block` opens a circuit breaker, `plan` refuses to hand out
work while it is open, and a page served in full closes it again.

Pages are discovered progressively: a program starts with three fixed pages, and
its component and subject pages only enter the queue once the course-structure
page has been captured and its links read.

Commands:
    init                 seed/refresh the queue from scripts/v4_cohort.json
    plan [n]             what this run should do, as one JSON object
    block <reason>       record a site-level refusal: release leases, back off
    unblock              clear the breaker (after a person clears the challenge)
    next [n]             emit the next n pending pages as JSON
    save <code> <slot>   file a captured page and enqueue what it links to
    fail <code> <slot> [reason]   ONLY for a page that genuinely will not load
    requeue [code ...]   return failed pages to pending
    prioritise [code ...] | prioritise --clear
                         move some programs to the front of the queue (no args: show
                         what is flagged). Reversible; never re-bases the median.
    assemble [code ...]  write combined extracts for complete programs
    rediscover           re-run link discovery over already-captured pages
    stalled              programs that can no longer progress on their own
    scoreable            assembled programs that still need a panelCv4 block
    status [--json]      progress
"""
# Scheduled runs resolve `python3` to /usr/bin/python3 (3.9), which cannot parse the
# `str | None` annotations below. Deferring annotation evaluation keeps the hints while
# letting the script run on the interpreter the cron task actually gets.
from __future__ import annotations

import json
import os
import re
import sys
from datetime import datetime, timedelta, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "scrapes", "v4")
RAW = os.path.join(OUT, "raw")
PAGES = os.path.join(OUT, "pages")
QUEUE = os.path.join(OUT, "queue.json")
COHORT = os.path.join(ROOT, "scripts", "v4_cohort.json")
# The Wave 1 backfill cohort. Kept in a SEPARATE file from v4_cohort.json on
# purpose: v4_cohort.json is the record of the 34-program reference cohort that
# the adaptiveness median is based on, and that set has to stay auditable at a
# glance. Everything here is extension cohort — placed against the reference
# thresholds, never re-basing them (v3.1 §10a rule 2).
COHORT_EXT = os.path.join(ROOT, "scripts", "v4_cohort_ext.json")

# Caps mirror scripts/scrape-v4-cohort.py so an extract captured by either route
# has the same shape, and the scoring prompt sees one consistent evidence base.
MAX_COMPONENTS = 6
# 10 truncated the capstone alternatives on the first program scored (439fs
# reached its cap before two of its four permitted capstone routes), which caps
# C4 and C5 for a reason about the capture rather than the curriculum. That
# error has a direction — it only ever depresses scores — so it would have bent
# the cohort median downward while looking authoritative.
MAX_SUBJECTS = 16

# A combined degree ("Master of Architecture/Master of Urban Planning") carries two
# programs' curriculum behind one code, so a cap sized for one truncates it by
# construction. That error has a direction — it only ever removes curriculum, which
# only ever depresses C4/C5 — so it would read as "this double degree is less
# adaptive" when what happened is that we stopped looking. Wave 1 adds ~12 of them.
# Doubling the caps rather than removing them keeps the request budget bounded.
DOUBLE_DEGREE_MULTIPLIER = 2


def is_double_degree(prog: dict) -> bool:
    """A combined award: two full degree names joined by a slash."""
    return "/" in prog.get("name", "")


def caps_for(prog: dict) -> tuple[int, int]:
    """(max components, max subjects) for this program."""
    if is_double_degree(prog):
        return (
            MAX_COMPONENTS * DOUBLE_DEGREE_MULTIPLIER,
            MAX_SUBJECTS * DOUBLE_DEGREE_MULTIPLIER,
        )
    return MAX_COMPONENTS, MAX_SUBJECTS

# Ordering within a program. Scoring rule R2 awards level 3 only on assessment
# evidence, so assessment pages are never the part that gets dropped: they sort
# immediately after their subject page.
SLOT_ORDER = ["course", "attributes", "structure"]


# A handed-out page is leased, not just read, so a scheduled run and a hand-run
# batch cannot capture the same pages twice — duplicate work would double the
# request rate against a site we only just regained access to. A lease that goes
# stale (crashed agent, closed app) returns to the queue on its own.
LEASE_SECONDS = 1200


# --- Site-level block: the circuit breaker -----------------------------------
#
# A lease handles ONE agent dying. It does not handle the site refusing everyone,
# which is a different failure with a different remedy. Since 2026-08-16 the
# handbook answers an unrecognised session with a real hCaptcha, and no
# unattended agent can clear that — solving it is a human action, and not one the
# agent is permitted to take on the user's behalf.
#
# Without a breaker the scheduled task rediscovers this every 30 minutes: it
# opens a browser, walks into the gate, captures nothing, and leaves its batch
# leased for 20 minutes. That is a steady stream of challenge hits against a site
# whose access was regained by behaving like a reader, and it buys nothing.
#
# So a block is recorded centrally and the queue itself stops handing out work
# for a growing window. Backoff doubles from the schedule interval to a 12-hour
# ceiling; after BLOCK_ATTEND_AFTER consecutive blocks the queue stops asking a
# robot to keep trying and says so — the remedy at that point is a person
# clearing the challenge once, not another retry.
BLOCK_BACKOFF_MINUTES = [30, 60, 120, 240, 480, 720]
BLOCK_ATTEND_AFTER = 3


def now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def parse_ts(ts: str | None) -> datetime | None:
    try:
        return datetime.fromisoformat(ts)  # type: ignore[arg-type]
    except (TypeError, ValueError):
        return None


def block_state(q: dict) -> dict:
    return q.setdefault(
        "block", {"consecutive": 0, "since": None, "until": None, "reason": None}
    )


def cooloff_seconds(q: dict) -> int:
    """Seconds left on the current cool-off, 0 if capture may proceed."""
    until = parse_ts((q.get("block") or {}).get("until"))
    if until is None:
        return 0
    return max(0, int((until - datetime.now(timezone.utc)).total_seconds()))


def trip_breaker(q: dict, reason: str) -> dict:
    """Record a site-level block and open the breaker for a backoff window.

    Also releases every leased page immediately. A blocked run captured nothing,
    so holding its batch for the rest of the lease only delays the next attempt
    without protecting anything.
    """
    b = block_state(q)
    released = 0
    for prog in q["programs"].values():
        for page in prog["pages"].values():
            if page["status"] == "inflight":
                page.update(status="pending", ts=None)
                released += 1
    b["consecutive"] = b.get("consecutive", 0) + 1
    minutes = BLOCK_BACKOFF_MINUTES[min(b["consecutive"] - 1, len(BLOCK_BACKOFF_MINUTES) - 1)]
    b["since"] = b.get("since") or now()
    b["until"] = (
        datetime.now(timezone.utc) + timedelta(minutes=minutes)
    ).isoformat(timespec="seconds")
    b["reason"] = reason
    b["released"] = released
    b["minutes"] = minutes
    return b


def clear_breaker(q: dict) -> bool:
    """Reset the breaker. Any page served in full is proof the block has lifted."""
    b = block_state(q)
    if not (b.get("consecutive") or b.get("until")):
        return False
    b.update(consecutive=0, since=None, until=None, reason=None, released=0, minutes=0)
    return True


def lease_expired(ts: str | None) -> bool:
    if not ts:
        return True
    try:
        age = (datetime.now(timezone.utc) - datetime.fromisoformat(ts)).total_seconds()
    except ValueError:
        return True
    return age > LEASE_SECONDS


def claimable(page: dict) -> bool:
    # "blocked" is a fact about the site refusing us, not about the page, so it
    # must not be terminal — `requeue` only rescues "failed", so a blocked page
    # would otherwise never be offered again. Reuse the lease clock as a cool-off:
    # it comes back on its own once the block has had time to clear.
    if page["status"] in ("inflight", "blocked"):
        return lease_expired(page["ts"])
    return page["status"] == "pending"


def load() -> dict:
    if os.path.exists(QUEUE):
        with open(QUEUE) as fh:
            return json.load(fh)
    return {"version": 1, "programs": {}}


def save_queue(q: dict) -> None:
    os.makedirs(OUT, exist_ok=True)
    tmp = QUEUE + ".tmp"
    with open(tmp, "w") as fh:
        json.dump(q, fh, indent=1, sort_keys=True)
    os.replace(tmp, QUEUE)


def add_page(prog: dict, url: str, slot: str) -> None:
    """Enqueue a page unless it is already known (by url or by slot)."""
    if url in prog["pages"]:
        return
    if any(p["slot"] == slot for p in prog["pages"].values()):
        return
    prog["pages"][url] = {"slot": slot, "status": "pending", "chars": 0, "ts": None}


def cmd_init() -> None:
    q = load()
    cohort = json.load(open(COHORT))
    if os.path.exists(COHORT_EXT):
        cohort = cohort + json.load(open(COHORT_EXT))
    added = 0
    for p in cohort:
        prog = q["programs"].setdefault(
            p["code"], {"name": p["name"], "base": p["url"].rstrip("/"), "pages": {}, "assembled": False}
        )
        prog["name"] = p["name"]
        base = prog["base"]
        before = len(prog["pages"])
        add_page(prog, base, "course")
        add_page(prog, f"{base}/attributes-outcomes-skills", "attributes")
        add_page(prog, f"{base}/course-structure", "structure")
        added += len(prog["pages"]) - before
    save_queue(q)
    print(f"queue: {len(q['programs'])} programs, {added} pages added")


def sort_key(code: str, page: dict) -> tuple:
    slot = page["slot"]
    if slot in SLOT_ORDER:
        return (0, SLOT_ORDER.index(slot), "")
    if slot.startswith("comp-"):
        return (1, 0, slot)
    # subj-abcd12345 and subj-abcd12345-assessment sort adjacent, subject first.
    return (2, 0, slot.replace("-assessment", "~"))


def take_batch(q: dict, n: int, only: set[str] | None = None) -> list[dict]:
    """Lease and return the next n pages to capture.

    `only` restricts the batch to those program codes — a targeted cycle
    (e.g. the 18 coursework programs) that must not spend its batches
    finishing the wider backlog's in-flight programs.

    Programs already in flight are finished before new ones are started: a
    program is only scoreable once complete, so depth beats breadth here — a
    half-captured cohort produces no median at all.

    Among programs at the same stage, those flagged by `prioritise` lead. Note
    the order of the key: `started` still comes FIRST, so priority never
    preempts a half-captured program and strands it. Priority decides which
    program is picked up next, not which one is abandoned.

    Mutates `q`; the caller saves.
    """
    order = []
    for code, prog in q["programs"].items():
        if only is not None and code not in only:
            continue
        pending = [(u, p) for u, p in prog["pages"].items() if claimable(p)]
        if not pending:
            continue
        done = sum(1 for p in prog["pages"].values() if p["status"] == "done")
        started = 0 if done else 1  # 0 sorts first, so in-flight programs lead
        rank = 0 if prog.get("priority") else 1  # 0 sorts first, so priority leads
        pending.sort(key=lambda up: sort_key(code, up[1]))
        order.append((started, rank, code, pending))
    order.sort(key=lambda o: (o[0], o[1], o[2]))

    batch = []
    for _, _, code, pending in order:
        for url, page in pending:
            page.update(status="inflight", ts=now())
            batch.append(
                {
                    "code": code,
                    "slot": page["slot"],
                    "url": url,
                    "raw": os.path.relpath(os.path.join(RAW, f"{code}__{page['slot']}.json"), ROOT),
                }
            )
            if len(batch) >= n:
                return batch
    return batch


def cmd_next(n: int, only: set[str] | None = None) -> None:
    """Emit the next pages to capture, as JSON.

    Honours the breaker: while a block cool-off is running this hands out
    nothing, so a caller that only knows "empty list means stop" still backs off
    correctly. The reason goes to stderr so it cannot corrupt the JSON on stdout.
    """
    q = load()
    left = cooloff_seconds(q)
    if left:
        b = block_state(q)
        print(
            f"# blocked: cool-off {left // 60}m left "
            f"(block {b.get('consecutive')}, until {b.get('until')}) — "
            f"run `plan` for the recommended action",
            file=sys.stderr,
        )
        print("[]")
        return
    batch = take_batch(q, n, only)
    save_queue(q)
    print(json.dumps(batch, indent=1))


def cmd_plan(n: int, only: set[str] | None = None) -> None:
    """Say what this run should do, as one JSON object.

    A scheduled run asks this first. `next` alone cannot distinguish "cohort
    finished" from "site is refusing us" — both are an empty list — and those
    call for opposite responses: one closes the task, the other must not even
    open a browser.

      capture  batch leased, proceed
      cooloff  a block is backing off; do nothing, touch no browser
      attend   blocked repeatedly; only a person clearing the challenge helps
      idle     nothing pending
    """
    q = load()
    b = block_state(q)
    left = cooloff_seconds(q)
    if left:
        consecutive = b.get("consecutive", 0)
        attend = consecutive >= BLOCK_ATTEND_AFTER
        print(json.dumps(
            {
                "action": "attend" if attend else "cooloff",
                "minutesRemaining": left // 60,
                "until": b.get("until"),
                "consecutive": consecutive,
                "reason": b.get("reason"),
                "hint": (
                    "Unattended retries cannot clear this. A person opens the handbook "
                    "in their own browser, clears the challenge once, then runs "
                    "`v4-capture-queue.py unblock`."
                    if attend else
                    "Do not open a browser. The next run after the cool-off retries automatically."
                ),
            },
            indent=1,
        ))
        return
    batch = take_batch(q, n, only)
    save_queue(q)
    if not batch:
        print(json.dumps({"action": "idle", "batch": []}, indent=1))
        return
    print(json.dumps({"action": "capture", "attempt": b.get("consecutive", 0) + 1, "batch": batch}, indent=1))


def cmd_block(reason: str) -> None:
    """Record that the site refused us, and back off.

    Called by a capture agent the moment it meets the gate. `save` trips the
    breaker too, but only for a page that reached it — an agent stopped at the
    challenge before any page loaded has nothing to save, which is exactly the
    case this exists for.
    """
    q = load()
    b = trip_breaker(q, reason)
    save_queue(q)
    action = "attend" if b["consecutive"] >= BLOCK_ATTEND_AFTER else "cooloff"
    print(
        f"blocked ({reason}): {b['released']} lease(s) released, "
        f"backing off {b['minutes']}m until {b['until']} "
        f"— consecutive block {b['consecutive']}, action {action}"
    )


def cmd_unblock() -> None:
    """Clear the breaker — after a person has cleared the challenge, or by hand."""
    q = load()
    if clear_breaker(q):
        save_queue(q)
        print("breaker cleared — capture resumes on the next run")
    else:
        print("breaker already clear")


def clean(text: str) -> str:
    """Drop site chrome that carries no curriculum evidence."""
    cut = text.find("We acknowledge and pay respect to the Traditional Owners")
    if cut > 0:
        text = text[:cut]
    skip = (
        "You’re viewing", "Or view archived", "View full page", "Next:", "Prev:",
        "Last updated:", "My Course Planner", "Lodge an enquiry", "Contact Stop 1",
    )
    lines = [ln for ln in text.split("\n") if not ln.strip().startswith(skip)]
    # Collapse the runs of blank lines innerText leaves behind.
    out, blank = [], 0
    for ln in lines:
        if ln.strip():
            blank = 0
        else:
            blank += 1
            if blank > 1:
                continue
        out.append(ln.rstrip())
    return "\n".join(out).strip()


def discover(prog: dict, slot: str, links: list[str]) -> int:
    """Enqueue the pages a captured page points at.

    Only the structure, specialisation and component pages expand: they carry
    the compulsory and capstone subject tables, which is where the curriculum
    evidence actually is.
    """
    if slot not in ("structure", "specialisations") and not slot.startswith("comp-"):
        return 0
    before = len(prog["pages"])
    max_components, max_subjects = caps_for(prog)

    # Some programs (MC-CLIND and other specialisation-structured degrees) list
    # no subjects on course-structure at all — it just points at the
    # specialisations page. Without following that, the program can never reach
    # the two assessment pages `assemble` requires, so it would sit at "nothing
    # pending, never assembled" forever and hold the whole cohort median hostage.
    if slot == "structure" and not any(re.search(r"/subjects/[a-z]{4}\d{5}", h) for h in links):
        add_page(prog, f"{prog['base']}/majors-minors-specialisations", "specialisations")

    if slot in ("structure", "specialisations"):
        comps = []
        for h in links:
            m = re.match(r"https://handbook\.unimelb\.edu\.au/(?:\d{4}/)?components/([\w-]+)", h)
            if m and m.group(1) not in comps:
                comps.append(m.group(1))
        for c in sorted(comps)[:max_components]:
            add_page(prog, f"https://handbook.unimelb.edu.au/2026/components/{c}/course-structure", f"comp-{c}")

    known = {p["slot"][5:] for p in prog["pages"].values()
             if p["slot"].startswith("subj-") and not p["slot"].endswith("-assessment")}
    subjects = []
    for h in links:
        m = re.search(r"/subjects/([a-z]{4}\d{5})", h)
        # Filter out subjects already queued BEFORE applying the cap — slicing
        # the raw list first would return only subjects already held, so a
        # capped program could never take on new ones when the cap was raised.
        if m and m.group(1) not in subjects and m.group(1) not in known:
            subjects.append(m.group(1))
    for s in subjects[: max(0, max_subjects - len(known))]:
        add_page(prog, f"https://handbook.unimelb.edu.au/2026/subjects/{s}", f"subj-{s}")
        add_page(prog, f"https://handbook.unimelb.edu.au/2026/subjects/{s}/assessment", f"subj-{s}-assessment")
    return len(prog["pages"]) - before


def cmd_save(code: str, slot: str) -> None:
    q = load()
    prog = q["programs"].get(code)
    if not prog:
        sys.exit(f"unknown program {code}")
    url = next((u for u, p in prog["pages"].items() if p["slot"] == slot), None)
    if url is None:
        sys.exit(f"{code}: no queued page for slot {slot}")

    raw_path = os.path.join(RAW, f"{code}__{slot}.json")
    if not os.path.exists(raw_path):
        sys.exit(f"missing capture file {os.path.relpath(raw_path, ROOT)}")
    with open(raw_path) as fh:
        data = json.load(fh)
    text = clean(data.get("text") or "")

    # A block page or a redirect to search is short and has no curriculum text.
    # Recording it as done would turn a failed fetch into missing evidence that
    # nothing downstream can distinguish from a genuinely thin program.
    # Two block shapes seen so far: the crawl4ai interstitial, and an Incapsula
    # challenge that serves an iframe in place of the page. Note the Incapsula
    # marker also appears in the HTML of perfectly healthy pages, so it is only
    # a block signal here, in the extracted main-content text.
    if any(m in text for m in ("Pardon Our Interruption", "_Incapsula_Resource")):
        prog["pages"][url].update(status="blocked", ts=now())
        b = trip_breaker(q, f"{code}/{slot}: interstitial")
        save_queue(q)
        sys.exit(
            f"{code}/{slot}: blocked page — capture rejected, backing off {b['minutes']}m. "
            f"Stop the batch; run `plan` next time."
        )
    # The Incapsula block also has a silent shape: HTTP 200 with a well-formed but
    # EMPTY document, the marker living in an iframe the extractor never reads. That
    # lands here as an empty extract, and without this branch it fell through to the
    # "too short" case below and was recorded as *failed* — terminal, so a perfectly
    # good page left the queue for good (hit 507aa/subj-laws90057 on 2026-08-17).
    # No real handbook page has zero main-content text, so empty always means the
    # fetch did not happen. A slow render lands here too; calling that blocked costs
    # a retry, whereas calling it failed loses the page — so bias to blocked.
    if not text.strip():
        prog["pages"][url].update(status="blocked", ts=now())
        b = trip_breaker(q, f"{code}/{slot}: empty extract")
        save_queue(q)
        sys.exit(
            f"{code}/{slot}: empty extract — treated as blocked, backing off {b['minutes']}m. "
            f"Stop the batch; run `plan` next time."
        )
    # A subject the handbook does not publish for 2026 is neither a capture
    # failure nor evidence. Retrying it forever is pointless, and recording it
    # as done puts "Page not found" into the extract and lets it count toward
    # the assessment-page bar that decides whether a program is scoreable.
    # It gets its own terminal state: no page file, no retry, no bearing on
    # completeness either way.
    if "not currently published" in text or "Page not found" in text:
        prog["pages"][url].update(status="notfound", chars=len(text), ts=now())
        clear_breaker(q)  # the handbook answered; whatever block there was has lifted
        page_file = os.path.join(PAGES, f"{code}__{slot}.txt")
        if os.path.exists(page_file):
            os.remove(page_file)
        prog["assembled"] = False
        save_queue(q)
        print(f"{code}/{slot}: not published for 2026 — recorded, not counted as evidence")
        return
    # An assessment page is legitimately short — often just a task/weighting
    # table — so it gets a lower bar than a course or structure page.
    floor = 150 if slot.startswith("subj-") else 400
    if len(text) < floor:
        prog["pages"][url].update(status="failed", ts=now(), note="too short")
        save_queue(q)
        sys.exit(f"{code}/{slot}: only {len(text)} chars (need {floor}) — capture rejected")

    os.makedirs(PAGES, exist_ok=True)
    with open(os.path.join(PAGES, f"{code}__{slot}.txt"), "w") as fh:
        fh.write(f"===== SOURCE: {url} =====\n{text}\n")
    prog["pages"][url].update(status="done", chars=len(text), ts=now())
    found = discover(prog, slot, data.get("links") or [])
    prog["assembled"] = False
    # A page served in full is the only reliable evidence the block has lifted,
    # so success resets the backoff. Without this the window would ratchet upward
    # across unrelated blocks and eventually park capture at the 12-hour ceiling.
    clear_breaker(q)
    save_queue(q)

    pend = sum(1 for p in prog["pages"].values() if p["status"] == "pending")
    print(f"{code}/{slot}: saved {len(text)} chars, +{found} discovered, {pend} pending for this program")


def cmd_fail(code: str, slot: str, reason: str) -> None:
    q = load()
    prog = q["programs"].get(code)
    if not prog:
        sys.exit(f"unknown program {code}")
    for url, page in prog["pages"].items():
        if page["slot"] == slot:
            page.update(status="failed", ts=now(), note=reason)
            save_queue(q)
            print(f"{code}/{slot}: marked failed ({reason})")
            return
    sys.exit(f"{code}: no queued page for slot {slot}")


def cmd_requeue(codes: list[str]) -> None:
    """Return failed pages to pending so they are offered again.

    `fail` is terminal by design — a page that genuinely will not load should
    stop consuming request budget. But an agent that uses it to mean "not this
    batch" silently truncates the evidence, and a program can then assemble and
    score on a partial extract that looks complete. This undoes that.
    """
    q = load()
    targets = codes or list(q["programs"])
    total = 0
    for code in targets:
        prog = q["programs"].get(code)
        if not prog:
            print(f"{code}: unknown")
            continue
        n = 0
        for page in prog["pages"].values():
            if page["status"] == "failed":
                page.update(status="pending", ts=None, note=None)
                n += 1
        if n:
            # The extract on disk no longer reflects the full page set.
            prog["assembled"] = False
            total += n
            print(f"{code}: {n} page(s) requeued, extract marked for reassembly")
    save_queue(q)
    if not total:
        print("nothing to requeue")


def assemble_one(code: str, prog: dict) -> str:
    pending = [p for p in prog["pages"].values() if p["status"] in ("pending", "inflight")]
    if pending:
        return f"{code}: {len(pending)} page(s) still pending"
    done = {p["slot"] for p in prog["pages"].values() if p["status"] == "done"}
    assessments = sum(1 for s in done if s.endswith("-assessment"))
    # Same completeness bar the crawl4ai scraper used: without assessment pages
    # every item is capped at level 1 by R2, so the extract is not scoreable.
    if assessments < 2:
        return f"{code}: only {assessments} assessment page(s) — not scoreable"
    if not {"course", "structure"} <= done:
        return f"{code}: missing course/structure page"

    ordered = sorted(
        ((u, p) for u, p in prog["pages"].items() if p["status"] == "done"),
        key=lambda up: sort_key(code, up[1]),
    )
    body = []
    for _, page in ordered:
        path = os.path.join(PAGES, f"{code}__{page['slot']}.txt")
        if os.path.exists(path):
            body.append(open(path).read().rstrip())
    with open(os.path.join(OUT, f"{code}.txt"), "w") as fh:
        fh.write("\n\n".join(body) + "\n")
    prog["assembled"] = True
    return f"{code}: assembled {len(body)} pages, {assessments} with assessment"


def cmd_assemble(codes: list[str]) -> None:
    q = load()
    targets = codes or list(q["programs"])
    for code in targets:
        prog = q["programs"].get(code)
        if not prog:
            print(f"{code}: unknown")
            continue
        print(assemble_one(code, prog))
    save_queue(q)


def cmd_rediscover() -> None:
    """Re-run link discovery over pages already captured.

    Needed after a discovery rule changes: the raw captures are still on disk,
    so the pages a program was owed can be worked out again without refetching.
    """
    q = load()
    total = 0
    for code, prog in sorted(q["programs"].items()):
        for url, page in list(prog["pages"].items()):
            if page["status"] != "done":
                continue
            raw_path = os.path.join(RAW, f"{code}__{page['slot']}.json")
            if not os.path.exists(raw_path):
                continue
            try:
                data = json.load(open(raw_path))
            except json.JSONDecodeError:
                continue
            found = discover(prog, page["slot"], data.get("links") or [])
            if found:
                # New evidence means any extract already written is incomplete,
                # and so is any score derived from it.
                prog["assembled"] = False
                print(f"{code}/{page['slot']}: +{found}")
                total += found
    save_queue(q)
    print(f"rediscovered {total} page(s)")


def cmd_prioritise(codes: list[str], clear: bool = False) -> None:
    """Move some programs to the front of the queue.

    Sequencing lives here rather than in the cohort files on purpose: which
    programs matter most is a decision about this week, while the cohort files
    are the auditable record of what the cohort IS. Flagging is idempotent and
    `--clear` puts everything back, so nothing here is a commitment.

    Codes come from whatever picked the set — e.g. `destination-profiles.py
    ready` for the programs that can yield a two-axis record today. This script
    deliberately does not compute that itself; it would drag the capture queue
    into a dependency on the JIR data and three crosswalk CSVs.
    """
    q = load()
    if clear:
        n = 0
        for prog in q["programs"].values():
            if prog.pop("priority", None):
                n += 1
        save_queue(q)
        print(f"priority cleared on {n} program(s)")
        return
    if not codes:
        flagged = sorted(c for c, p in q["programs"].items() if p.get("priority"))
        print(f"{len(flagged)} program(s) prioritised: {' '.join(flagged) or '(none)'}")
        return
    # A typo'd code must not silently do nothing — the whole point of this
    # command is that the next scheduled run captures a DIFFERENT set, and a
    # dropped code would show up days later as a program that never got picked.
    unknown = [c for c in codes if c not in q["programs"]]
    for c in codes:
        if c in q["programs"]:
            q["programs"][c]["priority"] = True
    save_queue(q)
    total = sum(1 for p in q["programs"].values() if p.get("priority"))
    print(f"prioritised {len(codes) - len(unknown)} of {len(codes)} code(s); {total} flagged in total")
    if unknown:
        print(f"  NOT in the queue, ignored: {' '.join(unknown)}")


def cmd_stalled() -> None:
    """Programs that can no longer make progress on their own.

    Nothing pending, nothing in flight, and not assembled — so no agent will
    ever pick them up again. Each one of these blocks the cohort median, which
    only publishes when all 34 reference programs are scored.
    """
    q = load()
    out = []
    for code, prog in sorted(q["programs"].items()):
        if prog["assembled"]:
            continue
        live = [p for p in prog["pages"].values() if p["status"] in ("pending", "inflight")]
        if live:
            continue
        done = {p["slot"] for p in prog["pages"].values() if p["status"] == "done"}
        if not done:
            continue
        out.append(
            {
                "code": code,
                "done": len(done),
                "assessmentPages": sum(1 for s in done if s.endswith("-assessment")),
                "failed": sum(1 for p in prog["pages"].values() if p["status"] in ("failed", "blocked")),
            }
        )
    print(json.dumps(out, indent=1))


def cmd_scoreable() -> None:
    """List assembled programs that do not yet carry a panelCv4 block.

    This is the handover point between the two halves of the pipeline: capture
    decides a program is complete, scoring picks it up from here.
    """
    q = load()
    out = []
    for code, prog in sorted(q["programs"].items()):
        if not prog["assembled"]:
            continue
        ev = os.path.join(ROOT, "dfva", "source", "evidence", f"{code}.json")
        scored = False
        if os.path.exists(ev):
            try:
                scored = "panelCv4" in json.load(open(ev))
            except json.JSONDecodeError:
                scored = False
        if not scored:
            out.append({"code": code, "extract": f"scrapes/v4/{code}.txt", "evidenceFileExists": os.path.exists(ev)})
    print(json.dumps(out, indent=1))


def cmd_status(as_json: bool, only: set[str] | None = None) -> None:
    q = load()
    rows, tot = [], {"done": 0, "pending": 0, "inflight": 0, "failed": 0, "blocked": 0, "notfound": 0}
    target_rows, target_tot = [], {"done": 0, "pending": 0, "inflight": 0, "failed": 0, "blocked": 0, "notfound": 0}
    for code, prog in sorted(q["programs"].items()):
        counts = {k: 0 for k in tot}
        for p in prog["pages"].values():
            counts[p["status"]] = counts.get(p["status"], 0) + 1
        for k in tot:
            tot[k] += counts[k]
        row = {
            "code": code,
            "assembled": prog["assembled"],
            "priority": bool(prog.get("priority")),
            **counts,
        }
        rows.append(row)
        if only is None or code in only:
            target_rows.append(row)
            for k in target_tot:
                target_tot[k] += counts[k]

    complete = [r["code"] for r in rows if r["assembled"]]
    target_complete = [r["code"] for r in target_rows if r["assembled"]]
    prio = [r for r in rows if r["priority"]]
    left = cooloff_seconds(q)
    summary = {
        "programs": len(rows),
        "assembled": len(complete),
        "assembledCodes": complete,
        "priority": len(prio),
        "priorityRemaining": sum(1 for r in prio if not r["assembled"]),
        "pages": tot,
        "target": {
            "programs": len(target_rows),
            "assembled": len(target_complete),
            "assembledCodes": target_complete,
            "pages": target_tot,
        },
        "block": {**(q.get("block") or {}), "cooloffMinutesRemaining": left // 60},
    }
    if as_json:
        print(json.dumps({"summary": summary, "programs": target_rows if only else rows}, indent=1))
        return

    display_rows = target_rows if only else rows
    print(f"{'code':<14}{'done':>6}{'pend':>6}{'live':>6}{'fail':>6}{'blk':>5}  {'pri':<5}assembled")
    for r in display_rows:
        print(
            f"{r['code']:<14}{r['done']:>6}{r['pending']:>6}{r['inflight']:>6}"
            f"{r['failed']:>6}{r['blocked']:>5}  {'*' if r['priority'] else '':<5}"
            f"{'yes' if r['assembled'] else ''}"
        )
    if only:
        print(
            f"\n🎯 Target cohort ({len(target_rows)} programs): {len(target_complete)}/{len(target_rows)} assembled · "
            f"pages: {target_tot['done']} done, {target_tot['pending']} pending, "
            f"{target_tot['inflight']} leased, {target_tot['failed']} failed, {target_tot['blocked']} blocked"
        )
    print(
        f"🌐 Global ({summary['programs']} programs): {summary['assembled']}/{summary['programs']} assembled · "
        f"pages: {tot['done']} done, {tot['pending']} pending, "
        f"{tot['inflight']} leased, {tot['failed']} failed, {tot['blocked']} blocked, "
        f"{tot['notfound']} unpublished"
    )
    if summary["priority"]:
        print(
            f"{summary['priority']} program(s) prioritised — "
            f"{summary['priorityRemaining']} still to assemble"
        )
    if left:
        b = block_state(q)
        verb = "NEEDS A PERSON" if b.get("consecutive", 0) >= BLOCK_ATTEND_AFTER else "cooling off"
        print(
            f"\nBREAKER OPEN — {verb}: {left // 60}m left, consecutive block "
            f"{b.get('consecutive')}, reason {b.get('reason')!r}"
        )


def main() -> None:
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    cmd, rest = sys.argv[1], sys.argv[2:]
    only: set[str] | None = None
    if "--only" in rest:
        i = rest.index("--only")
        only = {c for c in rest[i + 1].split(",") if c}
        rest = rest[:i] + rest[i + 2 :]
    if cmd == "init":
        cmd_init()
    elif cmd == "plan":
        cmd_plan(int(rest[0]) if rest else 8, only)
    elif cmd == "block":
        cmd_block(" ".join(rest) or "unspecified")
    elif cmd == "unblock":
        cmd_unblock()
    elif cmd == "next":
        cmd_next(int(rest[0]) if rest else 8, only)
    elif cmd == "save":
        cmd_save(rest[0], rest[1])
    elif cmd == "fail":
        cmd_fail(rest[0], rest[1], " ".join(rest[2:]) or "unspecified")
    elif cmd == "assemble":
        cmd_assemble(rest)
    elif cmd == "scoreable":
        cmd_scoreable()
    elif cmd == "requeue":
        cmd_requeue(rest)
    elif cmd == "rediscover":
        cmd_rediscover()
    elif cmd == "prioritise":
        cmd_prioritise([c for c in rest if c != "--clear"], clear="--clear" in rest)
    elif cmd == "stalled":
        cmd_stalled()
    elif cmd == "status":
        cmd_status("--json" in rest, only)
    else:
        sys.exit(__doc__)


if __name__ == "__main__":
    main()
