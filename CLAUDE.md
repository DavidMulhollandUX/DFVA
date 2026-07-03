# DFVA

**Tech stack:** TypeScript (scripts), Wasp 0.22 (compass app), Prisma (PostgreSQL), React 19
**Key constraint:** Handbook scraper UNBLOCKED (2026-07-01) — Crawl4AI bypasses anti-bot. Use `PYTHONPATH="" bash ~/.hermes/scripts/crawl4ai_scrape.sh "<url>"` for handbook extraction.
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
