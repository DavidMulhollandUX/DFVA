# DFVA

**Tech stack:** TypeScript (scripts), Wasp 0.22 (compass app), Prisma (PostgreSQL), React 19
**Key constraint:** Handbook scraper blocked by anti-bot. DFVA_MOCK=true in dev.
**See:** compass/app/README.md

## Quick start
```bash
cd compass/app
wasp start             # single command — manages DB, server (3001), client (3000)
```
**DB:** Wasp's managed PostgreSQL (Docker). `DATABASE_URL` in `.env.server` is required for direct Prisma commands.
**Migrations:** `echo "name" | wasp db migrate-dev` (DB must be running: `wasp start db` in another terminal).
**Smoke test runbook:** `.hermes/smoke-test-runbook.md`
**Env:** `.env.server` has DFVA_MOCK=true + dummy keys for OpenSaaS services (OpenAI, Stripe, S3) + DATABASE_URL.

## Context
Part of the SXD-Github workspace at University of Melbourne.
COMPASS = COMputational Program Assessment & Strategy System. 
DFVA = Degree Future-Viability Assessment — the scoring methodology.

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
