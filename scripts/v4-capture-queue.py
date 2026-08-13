#!/usr/bin/env python3
"""Work queue for the Panel C v4 handbook capture.

The handbook rejects the crawl4ai fetcher ("Pardon Our Interruption") but serves
a real browser normally, so capture runs through a browser agent instead. That
agent has no memory between scheduled runs, so all the state lives here: what
has been captured, what is still owed, and what each page turned out to link to.

An agent run is a loop of three calls:

    next 8                 -> the next pages to visit, as JSON
    (visit each, write scrapes/v4/raw/<code>__<slot>.json)
    save <code> <slot>     -> file it, discover follow-up pages
    assemble               -> build scrapes/v4/<code>.txt for finished programs

Pages are discovered progressively: a program starts with three fixed pages, and
its component and subject pages only enter the queue once the course-structure
page has been captured and its links read.

Commands:
    init                 seed/refresh the queue from scripts/v4_cohort.json
    next [n]             emit the next n pending pages as JSON
    save <code> <slot>   file a captured page and enqueue what it links to
    fail <code> <slot> [reason]
    assemble [code ...]  write combined extracts for complete programs
    scoreable            assembled programs that still need a panelCv4 block
    status [--json]      progress
"""
import json
import os
import re
import sys
from datetime import datetime, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "scrapes", "v4")
RAW = os.path.join(OUT, "raw")
PAGES = os.path.join(OUT, "pages")
QUEUE = os.path.join(OUT, "queue.json")
COHORT = os.path.join(ROOT, "scripts", "v4_cohort.json")

# Caps mirror scripts/scrape-v4-cohort.py so an extract captured by either route
# has the same shape, and the scoring prompt sees one consistent evidence base.
MAX_COMPONENTS = 6
MAX_SUBJECTS = 10

# Ordering within a program. Scoring rule R2 awards level 3 only on assessment
# evidence, so assessment pages are never the part that gets dropped: they sort
# immediately after their subject page.
SLOT_ORDER = ["course", "attributes", "structure"]


# A handed-out page is leased, not just read, so a scheduled run and a hand-run
# batch cannot capture the same pages twice — duplicate work would double the
# request rate against a site we only just regained access to. A lease that goes
# stale (crashed agent, closed app) returns to the queue on its own.
LEASE_SECONDS = 1200


def now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def lease_expired(ts: str | None) -> bool:
    if not ts:
        return True
    try:
        age = (datetime.now(timezone.utc) - datetime.fromisoformat(ts)).total_seconds()
    except ValueError:
        return True
    return age > LEASE_SECONDS


def claimable(page: dict) -> bool:
    return page["status"] == "pending" or (page["status"] == "inflight" and lease_expired(page["ts"]))


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


def cmd_next(n: int) -> None:
    """Emit the next pages to capture.

    Programs already in flight are finished before new ones are started: a
    program is only scoreable once complete, so depth beats breadth here — a
    half-captured cohort produces no median at all.
    """
    q = load()
    order = []
    for code, prog in q["programs"].items():
        pending = [(u, p) for u, p in prog["pages"].items() if claimable(p)]
        if not pending:
            continue
        done = sum(1 for p in prog["pages"].values() if p["status"] == "done")
        started = 0 if done else 1  # 0 sorts first, so in-flight programs lead
        pending.sort(key=lambda up: sort_key(code, up[1]))
        order.append((started, code, pending))
    order.sort(key=lambda o: (o[0], o[1]))

    batch = []
    for _, code, pending in order:
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
                save_queue(q)
                print(json.dumps(batch, indent=1))
                return
    save_queue(q)
    print(json.dumps(batch, indent=1))


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

    Only the structure and component pages expand: they carry the compulsory and
    capstone subject tables, which is where the curriculum evidence actually is.
    """
    if slot != "structure" and not slot.startswith("comp-"):
        return 0
    before = len(prog["pages"])

    if slot == "structure":
        comps = []
        for h in links:
            m = re.match(r"https://handbook\.unimelb\.edu\.au/(?:\d{4}/)?components/([\w-]+)", h)
            if m and m.group(1) not in comps:
                comps.append(m.group(1))
        for c in sorted(comps)[:MAX_COMPONENTS]:
            add_page(prog, f"https://handbook.unimelb.edu.au/2026/components/{c}/course-structure", f"comp-{c}")

    have = sum(1 for p in prog["pages"].values() if p["slot"].startswith("subj-") and "-assessment" not in p["slot"])
    subjects = []
    for h in links:
        m = re.search(r"/subjects/([a-z]{4}\d{5})", h)
        if m and m.group(1) not in subjects:
            subjects.append(m.group(1))
    for s in subjects[: max(0, MAX_SUBJECTS - have)]:
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
    if "Pardon Our Interruption" in text:
        prog["pages"][url].update(status="blocked", ts=now())
        save_queue(q)
        sys.exit(f"{code}/{slot}: blocked page — capture rejected, back off and retry")
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


def cmd_status(as_json: bool) -> None:
    q = load()
    rows, tot = [], {"done": 0, "pending": 0, "inflight": 0, "failed": 0, "blocked": 0}
    for code, prog in sorted(q["programs"].items()):
        counts = {k: 0 for k in tot}
        for p in prog["pages"].values():
            counts[p["status"]] = counts.get(p["status"], 0) + 1
        for k in tot:
            tot[k] += counts[k]
        rows.append({"code": code, "assembled": prog["assembled"], **counts})
    complete = [r["code"] for r in rows if r["assembled"]]
    summary = {
        "programs": len(rows),
        "assembled": len(complete),
        "assembledCodes": complete,
        "pages": tot,
    }
    if as_json:
        print(json.dumps({"summary": summary, "programs": rows}, indent=1))
        return
    print(f"{'code':<14}{'done':>6}{'pend':>6}{'live':>6}{'fail':>6}{'blk':>5}  assembled")
    for r in rows:
        print(
            f"{r['code']:<14}{r['done']:>6}{r['pending']:>6}{r['inflight']:>6}"
            f"{r['failed']:>6}{r['blocked']:>5}  {'yes' if r['assembled'] else ''}"
        )
    print(
        f"\n{summary['assembled']}/{summary['programs']} programs assembled · "
        f"pages: {tot['done']} done, {tot['pending']} pending, "
        f"{tot['inflight']} leased, {tot['failed']} failed, {tot['blocked']} blocked"
    )


def main() -> None:
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    cmd, rest = sys.argv[1], sys.argv[2:]
    if cmd == "init":
        cmd_init()
    elif cmd == "next":
        cmd_next(int(rest[0]) if rest else 8)
    elif cmd == "save":
        cmd_save(rest[0], rest[1])
    elif cmd == "fail":
        cmd_fail(rest[0], rest[1], " ".join(rest[2:]) or "unspecified")
    elif cmd == "assemble":
        cmd_assemble(rest)
    elif cmd == "scoreable":
        cmd_scoreable()
    elif cmd == "status":
        cmd_status("--json" in rest)
    else:
        sys.exit(__doc__)


if __name__ == "__main__":
    main()
