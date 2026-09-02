# DFVA

**Tech stack:** TypeScript (scripts), Wasp 0.24 (compass app; config in main.wasp.ts — Wasp Spec, requires Node 24), Prisma (PostgreSQL), React 19
**Key constraint:** Handbook capture needs a client that clears the `handbook.unimelb.edu.au`
anti-bot (Akamai/Imperva). A real browser does; headless HTTP clients mostly do not. Cloud/CI
sessions are egress-blocked for that host, so capture runs locally. Capture UoM handbook evidence
through the browser-based queue — `/v4-capture` or `python3 scripts/v4-capture-queue.py`
([runbook](docs/dfva-v4-capture-system.md)), paced at ~1 page per 20–30s. Crawl4AI
(`PYTHONPATH="" bash ~/.hermes/scripts/crawl4ai_scrape.sh "<url>"`) still works for the Go8
handbooks below.

## Handbook capture

**The requirement is the contract below, not a particular tool.** Any method that gets the page
text is acceptable — what matters is where it lands.

1. **Captured text MUST land in a versioned file under `data/`.** Never leave it only in
   `compass/app/.handbook-cache/`: that path is gitignored, and it is why the June-2026 batch of
   74 "ready to score" courses evaporated to 9 on a fresh clone. Capture that exists on one
   machine cannot be re-examined, re-scored, or audited.
2. **A record needs `code`, `url`, `success`, the page text, and when it was captured.** Two
   shapes are already in use: `{code, url, success, markdown, length, scraped_at}` in
   `data/handbook_data.json`, and a structured-extraction shape
   (`{code, name, url, success, study_level_type, aqf_level, duration, text}`) in
   `data/handbook_doctorate_data.json`. Either is fine; `dfva:capture-check` reads both.
3. **≥2,000 characters**, or the program must carry `evidenceConfidence: "low"` in
   `sharedProgramData.ts`. See the note on sparse pages below.

```bash
python3 scripts/build-capture-queue.py       # rebuild data/capture_queue.json (the work list)
python3 scripts/cyclical_scrape.py --dry-run # what would be captured next; no network needed
npm --prefix scripts run dfva:capture-check  # assert every scored program is capture-backed
```

### What has actually been used

| Store | Method | Notes |
|---|---|---|
| `data/handbook_doctorate_data.json` | agent-driven browser (Claude in Chrome) | structured extraction; no script in this repo produces this shape |
| `data/handbook_discovered.json` | `scripts/discover_courses.py` — AppleScript + real Chrome | its docstring calls this "the only reliable Imperva/Incapsula bypass as of June 2026"; macOS-only, one page per run |
| `data/handbook_data.json` | crawl4ai (`cyclical_scrape.py`, `scrape_handbooks.py`) | 23 records stamped 2026-07-01 and **none since** — treat crawl4ai as a fallback that worked on one day, not a standing capability |

The ingest step for browser-captured text is currently manual — there is no script that writes it
into `data/`. Do that write deliberately and commit it; an uncommitted capture is the exact failure
this section exists to prevent.

If you do use crawl4ai: `cyclical_scrape.py` is resumable and merge-not-clobber (skips captured
codes, upserts, stops a batch after 2 consecutive blocks), runs from any clone, and takes
`CRAWL4AI_SITE_PACKAGES` if crawl4ai lives in a venv you are not invoking directly. Universities
configured: `unimelb`, `latrobe`.

### Sparse source pages are not a capture failure

The research-doctorate handbook pages (`dr-phil*`, `dh-*`) are genuinely one-paragraph generic
descriptions — ~180-940 chars. Re-capturing them with any tool returns the same text. The 24
programs flagged `evidenceConfidence: "low"` need **different sources** (faculty RHD pages,
graduate-research handbook sections), not a better scraper. They sit in `data/capture_queue.json`
for that reason, but re-running a scraper over them will not clear the flag.

**Go8 benchmarking is NOT implemented.** `docs/dfva-go8-comparison.md` (2026-06-10) was authored
from ad-hoc extracts that were never persisted, so it cannot be reproduced or extended. There is no
Go8 scraper, no `scripts/go8_handbook_config.json`, and no `data/go8_*_handbook_data.json`.

**See:** compass/app/README.md

## Quick start
```bash
container system start         # once per login (Apple `container` runtime)
scripts/dev-db.sh start        # Postgres on localhost:5432 (replaces Docker / `wasp start db`)
cd compass/app && wasp start   # server (3001) + client (3000)
```
**DB:** Postgres runs via Apple's `container` CLI (container `dfva-pg`, data at `~/.dfva/pgdata`). `DATABASE_URL` is set in `.env.server`, so Wasp is in custom-db mode — use `wasp start`, never `wasp start db`.
**Migrations:** `DATABASE_URL=… npx prisma migrate dev --schema compass/app/.wasp/out/db/schema.prisma` (DB running via `scripts/dev-db.sh start`).
**Smoke test runbook:** `.hermes/smoke-test-runbook.md`
**Env:** `.env.server` has DFVA_MOCK=true + dummy keys for OpenSaaS services (OpenAI, Stripe, S3) + DATABASE_URL.

## Report content pipeline
`reports/*.md` are the canonical source. Never hand-edit `compass/app/src/compass/reportContent*.ts` — regenerate with `npm --prefix scripts run dfva:gen-content`, then verify with `npm --prefix scripts run dfva:check`. New courses: follow `docs/adding-a-course.md`.

Three sections are authored by judgement, not generated — market report §3 (discussion
signals), and v4 §4 (market evidence) and §5 (curriculum implications). Procedure, lint
mechanics and house form: [docs/dfva-report-section-authoring.md](docs/dfva-report-section-authoring.md).
Source §3 **before** authoring §4 — §4 condenses it.

## Context
Part of the SXD-Github workspace at University of Melbourne.
COMPASS = COMputational Program Assessment & Strategy System. 
DFVA = Degree Future-Viability Assessment — the scoring methodology.

## Brand
**Evidura** is the selected master brand (replaces the working name "COMPASS"); domain `evidura.ai`. Architecture: **Evidura** (brand/platform) → **Durability Rating** (consumer-facing signal: score + Resilient→Critical bands) → **DFVA** (internal methodology/engine, not used in external copy). Assets + design tokens: `brand/evidura/` ([guide](brand/evidura/README.md)). Strategy/naming/logo: `docs/compass-brand-strategy.md`, `docs/compass-naming.md`, `docs/evidura-logo.md`. App rollout: `docs/evidura-brand-implementation-plan.md`. Public launch gated on trademark clearance (naming DD §4); the in-repo/in-dev rebrand is not.

## Rules
- Use conventional commits (feat:, fix:, refactor:, docs:, chore:)
- Test before committing. Lint before pushing.
- For multi-step tasks, prefer inline Workflow scripts
- A review comment you have made twice is a missing lint rule or test.
  Add the gate instead of a third comment.
- To reproduce a bug report or check a page in the app, load the
  `verify-evidura` skill before reading page source.

## Agent-First (MCP)

COMPASS is now agent-first. Instead of visiting the website, agents consume DFVA context directly:

### MCP Tools (dfva-mcp)
- `get_assessment { programCode }` — full 11-dimension assessment
- `query_assessments { faculty?, riskCategory?, minScore?, maxScore? }` — filtered query
- `cross_program_analysis` — risk distribution, weakest dimension, near-resilient programs
- `get_methodology` — scoring rubric and criteria
- `list_programs` — all program codes with names
- `get_report { programCode }` — full markdown report

### Usage in Claude Code
```
Use dfva MCP: get_assessment mc-cs
Use dfva MCP: query_assessments with faculty="Science", riskCategory="MODERATE RISK"
Use dfva MCP: cross_program_analysis
```

### Running the MCP server
```bash
cd compass/mcp && npm run dev
```

## Related
- Hermes skills: ~/.hermes/skills/
- Claude Code skills: ~/.claude/skills/
- Vault: ~/Documents/Claude/

## Session startup
Read `.claude/.session_context.txt` before exploring. Do not `ls`/`find`/`grep` — the overview script already captured the project structure.

## Model tiering
- **Opus (deepseek-v4-pro)**: MCP design, scoring methodology, complex analysis
- **Sonnet (deepseek-chat)**: feature builds, UI fixes, test writing, lint fixes
- Default to Sonnet unless the task requires architectural reasoning
