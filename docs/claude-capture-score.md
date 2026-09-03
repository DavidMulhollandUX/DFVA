# DFVA v4.1 capture + score — Claude harness

**Status:** ready to run. This document is the Claude counterpart to the Hermes
cron job (`dd321e7d34be` score, `b2aa22a426e7` capture) and the Antigravity
scheduled capture. All three harnesses share one register
(`llm-usage-register.jsonl`) and one lease coordinator (`v4-capture-queue.py`).

**What this harness covers.** Capture (handbook extraction via a local Chrome
tab) and score + author (read from disk, no network). It is the only harness
that can run the **full** pipeline end to end in one pass — Hermes splits the two
across two jobs; Antigravity does capture only.

**Preconditions.**
- Working directory: `/Users/djmulholland/Documents/SXD-Github/DFVA`.
- Capture requires **Google Chrome open** (the script drives a real tab).
- Score requires the `Workflow` tool (interactive Claude Code session, or a
  scheduled task with Workflow enabled). Headless API Claude must replace the
  `Workflow({...})` calls with `claude` CLI invocations of the workflow scripts.
- Read before acting: `docs/dfva-v4-agent-harness.md`,
  `docs/dfva-report-section-authoring.md`, `docs/dfva-profession-deep-research.md`,
  `.agents/skills/v4-capture-routine/SKILL.md` (status-reporting contract).
- Never hand-edit generated files (`dfva/dist/**`,
  `compass/app/src/compass/reportContent*.ts`); edit source and regenerate.

## Stage 1 — Capture

1. `python3 scripts/v4-capture-queue.py status` — read global progress.
1b. Heartbeat — log that this harness is active before doing work:
   `python3 scripts/llm-usage-register.py log --harness claude --model <your-model> --job-id claude-capture --note "capture stage begin"`.
2. `python3 scripts/v4-capture-queue.py plan 2` — coordination gate. Returns
   `capture` / `cooloff` / `attend` / `idle`. Proceed only on `capture`. The
   lease (20 min/page) is the source of truth and prevents grabbing pages
   another harness holds.
3. Cross-harness check: `python3 scripts/llm-usage-register.py status`. If
   Hermes or Antigravity shows an `inflight` capture on the same program, skip
   that program. Do not force-capture what another harness leases.
4. Capture: `python3 scripts/v4-capture-antigravity.py 2` (opens handbook pages
   in Chrome).
5. `python3 scripts/v4-capture-land.py --sweep` then
   `python3 scripts/v4-capture-queue.py assemble`.
6. Log the run:
   `python3 scripts/llm-usage-register.py log --model <your-model> --job-id claude-capture --note "capture batch 2 (ok)"`.
7. If `plan` says `attend` (bot challenge), stop and alert the user. If
   `idle`/`cooloff`, do nothing this tick.

## Stage 2 — Score & author (from disk, no network)

1. Work list: `ls scrapes/v4/*.txt`, subtract programs that already have a
   **verified** `panelCv4` block (check `dfva/source/evidence/<code>.json`).
   Take at most 3, oldest-first. If none, report "no newly assembled programs"
   per the status contract and stop.
1b. Heartbeat — log that this harness is active before scoring:
   `python3 scripts/llm-usage-register.py log --harness claude --model <your-model> --job-id claude-score --note "score stage begin: <codes>"`.
2. Score + verify + persist:
   `Workflow({ scriptPath: "scripts/workflows/v4-score-cohort.js", args: [<codes>] })`.
   Both sub-scales required; a C-only response is a failed run. The verbatim check
   (`dfva-v4-verify-evidence.ts --scored`) and the persist step (`dfva-v4-persist.ts`)
   are scripts run through low-effort runner agents; no agent writes
   `dfva/source/evidence/` directly. In-flight blocks live in `scrapes/v4/pending/`
   (gitignored).
3. Exposure gate (stage 4a): `cd scripts && npx tsx dfva-panela-audit.ts | grep <code>`.
   Must resolve with 0 unmapped titles before REPORT. If not, fix the DATA per
   `docs/tasks/dfva-panela-scoring.SKILL.md`. Never type an exposure figure.
4. Deep research BEFORE prose: for each program's SOC family without a committed
   record, `python3 scripts/dfva-deep-research.py <soc>`. Flag missing families
   honestly; never fabricate.
5. Market §3: re-source per `docs/dfva-report-section-authoring.md` (sourced /
   scoped / corrected / removed), then remove the slug from `MARKET_GRANDFATHERED`
   in `scripts/check-report-format.ts` when aligned.
5b. Market report from the profession ledgers: `python3 scripts/dfva-market-scaffold.py <code>`
   (`--siblings` first; `--reuse-from <code>` when an authored sibling shares the set).
6. Scaffold the report: `npx tsx scripts/dfva-v4-report-scaffold.ts <code>`. §1–§3 and §6
   are derived; §4 is seeded from the market report (job-family table, exposure-basis
   sentence, signal table, restated confidence). Only §4's Bearing column and §5 stay
   unfilled. §3 before §4, always.
7. Improvement plans:
   `Workflow({ scriptPath: "scripts/workflows/v4-recommend-cohort.js", args: [<codes>] })`.
   The agent fills a JSON from `dfva-v4-recommend-scaffold.ts <code> --fill-template` and
   renders it with `--fill`; it never writes the report file.
7b. Author §4 Bearing and §5 from the improvement plan (§5 is sourced from the plan's
   diagnostic table, so the plan must exist first):
   `npx tsx scripts/dfva-v4-report-scaffold.ts <code> --fill-template` (its `context` carries the
   plan's diagnostic and intervention rows — read nothing else) → fill →
   `npx tsx scripts/dfva-v4-report-scaffold.ts <code> --fill <json>` →
   `npx tsx scripts/check-report-format.ts --code <code>`.
8. Gate: `npm --prefix scripts run dfva:check`.
   - pass: stage + commit in ONE invocation:
     `git add -A && git commit -m "feat(v4): score and author <codes>"`
   - fail: fix prose/sourcing errors, re-run, max 3 attempts, then report
     blocked honestly.
9. Log the run:
   `python3 scripts/llm-usage-register.py log --model <your-model> --job-id claude-score --note "score <codes> (ok/blocked)"`.

## Safety rules

- Never run `block` unless you personally hit a challenge.
- Never hand-edit `llm-usage-register.jsonl` — only append via
  `llm-usage-register.py log`.
- Trust `plan` for lease coordination. Different programs run in parallel
  safely; the same program's pages are lease-protected.
- Claude Code's `Workflow` tool runs the scoring fan-out — do not re-implement
  scoring inline. In headless Claude, replace `Workflow({...})` with
  `claude` CLI calls to the same workflow scripts.

## Register integration

Claude writes to the shared register with `--job-id claude-capture` or
`claude-score`. Hermes folds its audit in via `python3 scripts/llm-usage-register.py sync`;
Antigravity and Claude append directly. `status` breaks down by harness, so a
third active harness is visible without extra wiring.
