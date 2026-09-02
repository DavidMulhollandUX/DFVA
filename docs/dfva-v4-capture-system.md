# v4 handbook capture — scheduled agent system

Panel C v4 scores a program from what its handbook says is **taught and
assessed**. Scoring rule R2 awards level 3 only on assessment evidence, and R3
requires every score to quote the handbook verbatim, so the migration cycle
cannot start until the evidence for all 34 reference programs is on disk.

This document describes the system that gathers it.

## Why a browser

The repository's usual fetcher (`crawl4ai`, via
`~/.hermes/scripts/crawl4ai_scrape.sh`) is refused by the handbook with a
"Pardon Our Interruption" interstitial. The refusal is against that client, not
against the network: a real browser loads the same URLs normally, including the
subject assessment pages that carry the task/weighting tables.

Capture therefore runs through browser tools — Claude in Chrome where the
extension is connected, otherwise the in-app Browser pane. Do not "optimise" it
back to `curl` or `crawl4ai`.

## Shape of the system

Two scheduled agents and a queue. The agents hold no state between runs; the
queue file does.

```text
scripts/v4-capture-queue.py        the queue — what is owed, what is captured
  |
  |  dfva-v4-handbook-capture      every 30 min: browser agent, 30 pages/batch
  v
scrapes/v4/<code>.txt              one assembled extract per program
  |
  |  dfva-v4-score-assembled       hourly: v4-score-cohort.js on finished programs
  v
dfva/source/evidence/<code>.json   panelCv4 block, adversarially verified
  |
  |  npm --prefix scripts run dfva:gen-v4
  v
V4_META.adaptMedian                published only when all 34 are scored
```

Scheduled tasks live in `~/.claude/scheduled-tasks/` and run while the app is
open; a task due while the app is closed runs on next launch.

## The queue

```bash
python3 scripts/v4-capture-queue.py init         # seed from scripts/v4_cohort.json
python3 scripts/v4-capture-queue.py plan 30    # capture/cooloff/attend/idle
python3 scripts/v4-capture-queue.py next 30    # next pages, as JSON (raw form)
python3 scripts/v4-capture-queue.py save <code> <slot>
python3 scripts/v4-capture-queue.py block <reason>  # drop leases, back off
python3 scripts/v4-capture-queue.py unblock         # after a person clears it
python3 scripts/v4-capture-queue.py fail <code> <slot> <reason>   # will not load
python3 scripts/v4-capture-queue.py requeue [code ...]   # undo a wrong fail
python3 scripts/v4-capture-queue.py prioritise [code ...]  # capture these first
python3 scripts/v4-capture-queue.py prioritise --clear     # back to plain order
python3 scripts/v4-capture-queue.py assemble     # combined extracts for finished programs
python3 scripts/v4-capture-queue.py scoreable    # assembled but not yet scored
python3 scripts/v4-capture-queue.py status
```

Tests for the breaker: `python3 -m pytest scripts/test_v4_capture_queue.py`.

State: `scrapes/v4/queue.json`. Per-page text: `scrapes/v4/pages/`. Raw agent
captures: `scrapes/v4/raw/`. Assembled extracts: `scrapes/v4/<code>.txt`.

**Pages are discovered progressively.** A program enters the queue with three
pages — course overview, attributes/outcomes, course structure. Saving the
structure page reads its links and enqueues up to 6 component pages and up to 16
subjects, each with its assessment page. So 34 programs start as 102 pages and
grow to roughly 800. Pending therefore *rises* for much of the run — read
progress off programs assembled, not pages pending.

`next` finishes programs already in flight before starting new ones. A program
is only scoreable once complete, so depth beats breadth: a half-captured cohort
produces no median at all.

**`prioritise` reorders what gets picked up next, within that rule.** The sort is
`(started, priority, code)` — `started` first, deliberately, so flagging a program
never preempts a half-captured one and strands it short of assembly. Sequencing
lives in the queue rather than the cohort files because it is a decision about
this week, not a statement about what the cohort is; `--clear` undoes it and
`init` leaves it alone. Codes come from whatever picked the set — currently
`python3 scripts/destination-profiles.py ready`, the holdout programs whose
measured JIR record is fully crosswalk-mappable and so can yield a two-axis
report today. Pipe it through `xargs`: this is a zsh shell, which does not
word-split an unquoted `$VAR`, so passing the codes through a variable hands the
whole list over as a single argument.

## What the queue refuses

`save` validates before recording, because a silently-recorded bad fetch becomes
missing evidence that nothing downstream can distinguish from a genuinely thin
program:

| Condition | Result |
| --- | --- |
| Text contains "Pardon Our Interruption" | `blocked` — the batch stops, no further pages |
| Course/attributes/structure page under 400 chars | `failed` — retry once, then skip |
| Subject or assessment page under 150 chars | `failed` — assessment pages are legitimately short, hence the lower floor |

**`save` is the only judge of whether a page is good.** A capture agent must not
pre-screen the HTML itself: `_Incapsula_Resource` appears in the markup of
perfectly healthy handbook pages and is not, on its own, evidence of a block.

`assemble` refuses to write an extract unless the program has its course and
structure pages and **at least two assessment pages**. Without assessment
evidence R2 caps every item at level 1, so the extract would score low for a
reason that is about the capture, not the curriculum.

The report header's `**Course Director:**` value comes from the assembled
extract, not from a separate capture: `scripts/dfva-v4-director.ts` reads the
course page's contact block (`Program Director`, `Director of Studies`, `Course
Coordinators`, `Principal Coordinator`, `Course Convenor`, `Associate Dean (…)`,
or an unlabelled `Contact` block) and `dfva-v4-report-scaffold.ts` prints the
result. Six course pages name no person (`080cl`, `080cn`, `mc-indeng` print an
email address; `300bb`, `j17re` print a role title with no holder;
`mc-mgmthre`'s course page is truncated). Those reports carry `not listed on the
handbook course page`; re-capturing returns the same text. Run
`npx tsx scripts/dfva-v4-director.ts --diff` to list reports that disagree with
their capture.

## Pacing

One page every 20–30 seconds, one agent at a time, 30 pages per batch. Access was
regained by behaving like a reader. Do not parallelise capture agents; they also
share a browser tab.

The schedule was 10-minute batches until the site served an Incapsula block at
575 pages, and is now 30 minutes. In practice a 30-page batch takes 13–26
minutes, so the agent is the pace-setter and the schedule is a floor. The full
cohort is roughly 26 batches.

## Running a batch by hand

`/v4-capture [n]` runs one batch in the current session. Same loop, same queue.

## When the site refuses everyone — the breaker

A lease handles one agent dying. A *block* is different: the site is refusing
every session, and no amount of retrying by a robot changes that. Since
2026-08-16 the handbook answers an unrecognised session with a real hCaptcha, not
the softer "Pardon Our Interruption" interstitial. Solving it is a human action,
and not one an agent may take on the user's behalf.

So the block is held centrally in `queue.json` under `block`, and the queue stops
handing out work while it is open:

```text
block <reason>   ->  releases every leased page, opens the breaker
plan             ->  cooloff (wait) / attend (needs a person) / capture / idle
save             ->  trips the breaker itself on a block page or empty extract,
                     and CLOSES it on any page served in full
unblock          ->  clears it after a person has cleared the challenge
```

Backoff doubles from the schedule interval to a ceiling: **30m → 1h → 2h → 4h →
8h → 12h**. After 3 consecutive blocks `plan` returns `attend` and stops
pretending another retry will help.

`plan` exists because `next` cannot tell "cohort finished" from "site is refusing
us" — both are an empty list, and they call for opposite responses. One closes
the task; the other must not even open a browser.

### The fallback: attended unblock

The clearance is per browser session, so **one human clearance buys a long run of
unattended batches**:

1. DJ opens a handbook page in his own Chrome and completes the check himself.
2. He leaves the tab open and runs `unblock`.
3. `/v4-capture 30` runs batches against the cleared session at the normal pace.

Two things deliberately *not* built:

- **No same-origin `fetch()` fast path.** It would be cheaper per page — the 2026
  gap scan used it at ~2.5s/request — but a `DOMParser` document has no layout,
  so `innerText` returns different whitespace from a navigated page. The queue's
  whole design assumes an extract has the same shape whichever route captured it.
  A faster capture is not worth two shapes of evidence.
- **No archive.org fallback.** A snapshot answers a *different question* — what
  the handbook said whenever it was crawled, not what it says for 2026 — and R3
  quotes this text verbatim, so a mis-dated quote would be indistinguishable from
  a current one. (Coverage is also unverified: archive.org was returning 5xx when
  this was designed.) If it is ever added it must carry its snapshot date into
  the extract, not blend in.

## Operating notes

- **Blocked.** If a batch reports `blocked`, capture pauses and backs off; the
  next run after the cool-off retries. Nothing is lost — the queue re-offers the
  page, and `status` prints `BREAKER OPEN` while it is waiting.
- **`fail` is terminal; never use it to mean "not this batch".** A capture agent
  once marked 13 mc-mgmthre pages failed for being "non-core", which removed them
  from the queue; the program then assembled and scored on a truncated extract
  that looked complete. Use `requeue <code>` to undo it. Uncaptured pages need no
  marking at all — they stay pending.
- **A partial extract distorts in both directions.** Missing *assessment* pages
  suppress scores through R2; missing *structure* pages conceal optionality and
  inflate them. Re-scoring mc-mgmthre on its completed extract moved W from 6 to
  4, because the full capstone-selective slot showed that a student can finish
  the degree with no workplace exposure. Do not assume more evidence only raises
  scores.
- **An interrupted batch loses nothing but time.** Agents have died mid-batch on
  session and weekly limits several times. Leases expire after 20 minutes and the
  pages return to pending; run `assemble` afterwards, since a program that
  completed just before the agent died will not have been assembled by it.
- **Evidence files.** Most cohort programs have no `dfva/source/evidence/<code>.json`
  yet. The scoring workflow creates one containing only the `panelCv4` block; it
  never invents v1 `byDimension` content.
- **The median stays withheld** until all 34 reference programs are scored.
  `V4_META.complete` enforces it and `compass/app/src/compass/__tests__/v4Medians.test.ts`
  guards it. Do not hand-compute a preview median from a partial cohort — it is a
  different statistic from the one a reader would take it for.
- **Reference vs extension.** The queue holds 35 programs: the 34 reference
  programs from `scripts/v4_cohort.json` plus mc-mgmthre. Only the 34 contribute
  to the median. Membership is not a judgement call — the reference cohort is
  *defined* by carrying a v3.1 adaptiveness score (every cohort entry has a
  `v31` field, range 6–14), because that is what the v4 pass re-bases. mc-mgmthre
  has no v3.1 score and appears in no v3 registry data, so it cannot be a
  reference program; it is an extension program, placed against the reference
  thresholds and never re-basing them, per v3.1 §10a rule 2. The other extension
  programs (mc-urbhort, b-des, 244cw, b-sci) are not in the queue at all.
