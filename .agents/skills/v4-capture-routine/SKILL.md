---
name: v4-capture-routine
description: Routine for capturing University of Melbourne handbook pages for DFVA Panel C v4 scoring of the 18 coursework programs (repeats every minute).
---

# DFVA v4 Handbook Capture Routine (Antigravity Workflow)

Capture paced batches of University of Melbourne handbook pages directly via Google Chrome as evidence for DFVA Panel C v4 scoring of the 18 coursework programs with only a v1 report.

## Configuration & Target Set

- **Working directory**: `/Users/djmulholland/Documents/SXD-Github/DFVA`
- **Target programs (`$CODES`)**:
  `b-des,b-sci,mc-urbhort,mc-sciepi,mc-scibif,mc-actsc,mc-bmedsc,mc-scibio,mc-climsci,mc-bamktg,mc-envlaw,mc-indeng,mc-scwr,me-dcd,dr-philedp,080cn,080cl,300bb`

---

## Execution Command

Run the native Antigravity runner (1 page per minute iteration, or 2 pages with 22s delay):
```bash
python3 scripts/v4-capture-antigravity.py 1 --only "b-des,b-sci,mc-urbhort,mc-sciepi,mc-scibif,mc-actsc,mc-bmedsc,mc-scibio,mc-climsci,mc-bamktg,mc-envlaw,mc-indeng,mc-scwr,me-dcd,dr-philedp,080cn,080cl,300bb"
```

To view target cohort status at any time:
```bash
python3 scripts/v4-capture-queue.py status --only "b-des,b-sci,mc-urbhort,mc-sciepi,mc-scibif,mc-actsc,mc-bmedsc,mc-scibio,mc-climsci,mc-bamktg,mc-envlaw,mc-indeng,mc-scwr,me-dcd,dr-philedp,080cn,080cl,300bb"
```

## How It Operates

1. **Queue Planning**: Calls `v4-capture-queue.py plan 1 --only "$CODES"`.
   - If `cooloff`: Circuit breaker is open. Reports cooloff time and waits.
   - If `attend`: Verification required. Prompts user to clear check in Chrome and run `python3 scripts/v4-capture-queue.py unblock`.
   - If `idle`: All 18 programs completed.
   - If `capture`: Proceeds to fetch the leased page(s).

2. **Native Chrome Extraction**:
   - Opens a tab in Google Chrome, navigates to the handbook URL.
   - Waits for `document.readyState == "complete"`.
   - Checks for challenge / bot markers. (If detected, trips circuit breaker and stops).
   - Extracts verbatim text and links, writing `scrapes/v4/raw/<code>__<slot>.json`.
   - Calls `python3 scripts/v4-capture-queue.py save <code> <slot>` to record the capture and discover linked subjects/components.

3. **Assemble & Reporting**:
   - Runs `python3 scripts/v4-capture-queue.py assemble`.
   - Appends run log to `scrapes/v4/runs.log` and `.claude/logs/v4-capture-runs.log`.
   - Outputs target cohort progress (assembled count, pages done/pending/in-flight) and global metrics.
