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

The requirement is a contract, not a tool. Captured text lands in a versioned file under
`data/` (never only in the gitignored `.handbook-cache/`), with `code`, `url`, `success`,
the page text and a capture time, and ≥2,000 characters or `evidenceConfidence: "low"`.
Sparse research-doctorate pages need different sources, not a better scraper. Go8
benchmarking is not implemented. Full contract, store table and commands:
[docs/handbook-capture-contract.md](docs/handbook-capture-contract.md).

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
- **Opus**: MCP design, scoring methodology, complex analysis, the Score and Verify
  stages of `v4-score-cohort.js`
- **Sonnet**: feature builds, UI fixes, test writing, lint fixes, fill-cell authoring
- Default to Sonnet unless the task requires architectural reasoning
- Workflow runner agents (one command, return stdout) use `effort: 'low'`; the deterministic
  work is in the script they call, never in the agent

## Token discipline for report work
- A step that is arithmetic on files is a script, not an agent: persist
  (`scripts/dfva-v4-persist.ts`), the verbatim check
  (`dfva-v4-verify-evidence.ts --scored --json`), scaffolds (`dfva-v4-report-scaffold.ts`,
  `dfva-v4-recommend-scaffold.ts`, `dfva-market-scaffold.py`).
- Authors write fill JSON, never report files. Lint one file: `check-report-format.ts --code <code>`.
- Measure before and after: `npx tsx scripts/dfva-token-audit.ts <code> --both`.
- Agents read the `.agent.md` prompt copies (no bibliography) and the `--fill-template`
  context, never the evidence file or a rendered report. Runner agents and the recommend
  fill carry an explicit `model`.
