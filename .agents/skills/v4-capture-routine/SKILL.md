---
name: v4-capture-routine
description: Routine for capturing University of Melbourne handbook pages for DFVA Panel C v4 scoring of the global queue (221 programs).
---

# DFVA v4 Handbook Capture Routine — Global Queue

Capture paced batches of University of Melbourne handbook pages directly via Google Chrome as evidence for DFVA Panel C v4 scoring across the global queue (221 programs).

## Configuration & Target Set

- **Working directory**: `/Users/djmulholland/Documents/SXD-Github/DFVA`
- **Target**: the whole queue. Do not pass `--only`; no argument means all 221 programs.

---

## Execution Command

Run the native runner (2 pages per iteration, ~22s internal delay between pages):
```bash
python3 scripts/v4-capture-antigravity.py 2
```

To view queue status at any time:
```bash
python3 scripts/v4-capture-queue.py status
```

## How It Operates

1. **Queue Planning**: Calls `v4-capture-queue.py plan 2`.
   - If `cooloff`: Circuit breaker is open. Reports cooloff time and waits.
   - If `attend`: Verification required. Prompts user to clear check in Chrome and run `python3 scripts/v4-capture-queue.py unblock`. Never touch a challenge yourself.
   - If `idle`: The global queue is complete.
   - If `capture`: Proceeds to fetch the leased page(s).

2. **Native Chrome Extraction**:
   - Opens a tab in Google Chrome, navigates to the handbook URL.
   - Waits for `document.readyState == "complete"`.
   - Checks for challenge / bot markers. (If detected, trips circuit breaker and stops).
   - Extracts verbatim text and links, writing `scrapes/v4/raw/<code>__<slot>.json`.
   - Calls `python3 scripts/v4-capture-queue.py save <code> <slot>` to record the capture and discover linked subjects/components.
   - Never call `fail` (terminal). Never bypass a challenge.

3. **Assemble & Reporting**:
   - Runs `python3 scripts/v4-capture-land.py --sweep` (staging inbox into raw) and `python3 scripts/v4-capture-queue.py assemble`.
   - Appends run log to `scrapes/v4/runs.log` and `.claude/logs/v4-capture-runs.log`.
   - Outputs cohort progress (assembled count, pages done/pending/in-flight) and global metrics.

---

## Pipeline continuation (after assemble)

Authority for everything below: [docs/dfva-v4-agent-harness.md](../../../docs/dfva-v4-agent-harness.md). Capture serially and paced; score from extracts on disk with **no network access**.

```
assemble → Workflow(scripts/workflows/v4-score-cohort.js, [codes])     # v4.1: C1–C5 + W1–W3 in one pass,
                                                                       # adversarial + mechanical + boundary verify
        → cd scripts && npx tsx dfva-panela-audit.ts | grep <code>    # stage 4a exposure gate
        → deep research per docs/dfva-profession-deep-research.md     # BEFORE any prose
        → market §3 sourcing per docs/dfva-report-section-authoring.md # §3 before §4, always
        → npx tsx scripts/dfva-v4-report-scaffold.ts <code>
        → author §4, then §5
        → Workflow(scripts/workflows/v4-recommend-cohort.js, [codes])
        → npm --prefix scripts run dfva:check
```

Hard rules from the harness:

- A scoring response carrying only C-items is a failed run, not a partial one.
- Never sum `workplace` with `adaptiveness` — no combined `/24` anywhere.
- Stage 4a must resolve with 0 unmapped titles before any report drafting; fix the DATA if it does not.
- An unquotable evidence line fails the run.

---

## Operations (Hermes cron)

Two Hermes cron jobs drive this pipeline (`cronjob action='list'` for ids):

| Job | Schedule | Scope |
|---|---|---|
| DFVA v4 Capture Tick | every minute | steps in "How It Operates" |
| DFVA v4 Score & Author | hourly | pipeline continuation, ≤3 programs/tick |

- **Pause**: `cronjob action='pause'` on both job ids.
- **Resume**: `cronjob action='resume'` on both job ids.
- **Unattended block recovery**: clear the challenge in Chrome yourself, then run `python3 scripts/v4-capture-queue.py unblock`.
- Scoring runs need Claude Code available for the Workflow tool; without it the tick must report blocked rather than fall back to unverified scoring.
