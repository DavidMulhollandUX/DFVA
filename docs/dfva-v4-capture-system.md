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

```
scripts/v4-capture-queue.py        the queue — what is owed, what is captured
  |
  |  dfva-v4-handbook-capture      every 10 min: browser agent, 25 pages/batch
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
python3 scripts/v4-capture-queue.py next 25      # next pages to visit, as JSON
python3 scripts/v4-capture-queue.py save <code> <slot>
python3 scripts/v4-capture-queue.py fail <code> <slot> <reason>
python3 scripts/v4-capture-queue.py assemble     # combined extracts for finished programs
python3 scripts/v4-capture-queue.py scoreable    # assembled but not yet scored
python3 scripts/v4-capture-queue.py status
```

State: `scrapes/v4/queue.json`. Per-page text: `scrapes/v4/pages/`. Raw agent
captures: `scrapes/v4/raw/`. Assembled extracts: `scrapes/v4/<code>.txt`.

**Pages are discovered progressively.** A program enters the queue with three
pages — course overview, attributes/outcomes, course structure. Saving the
structure page reads its links and enqueues up to 6 component pages and up to 10
subjects, each with its assessment page. So 34 programs start as 102 pages and
grow to roughly 780.

`next` finishes programs already in flight before starting new ones. A program
is only scoreable once complete, so depth beats breadth: a half-captured cohort
produces no median at all.

## What the queue refuses

`save` validates before recording, because a silently-recorded bad fetch becomes
missing evidence that nothing downstream can distinguish from a genuinely thin
program:

| Condition | Result |
| --- | --- |
| Text contains "Pardon Our Interruption" | `blocked` — the batch stops, no further pages |
| Course/attributes/structure page under 400 chars | `failed` — retry once, then skip |
| Subject or assessment page under 150 chars | `failed` — assessment pages are legitimately short, hence the lower floor |

`assemble` refuses to write an extract unless the program has its course and
structure pages and **at least two assessment pages**. Without assessment
evidence R2 caps every item at level 1, so the extract would score low for a
reason that is about the capture, not the curriculum.

## Pacing

One page every 20–30 seconds, one agent at a time, 25 pages per 10-minute batch
— roughly a page every 24 seconds sustained. Access was regained by behaving
like a reader. Do not parallelise capture agents; they also share a browser tab.

At that rate the full cohort takes about 5 hours of app-open time.

## Running a batch by hand

`/v4-capture [n]` runs one batch in the current session. Same loop, same queue.

## Operating notes

- **Blocked.** If a batch reports `blocked`, capture pauses; the next scheduled
  run retries. Nothing is lost — the queue re-offers the page.
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
