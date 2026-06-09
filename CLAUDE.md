# DFVA

**Tech stack:** TypeScript (scripts), Wasp 0.22 (compass app), Prisma (PostgreSQL), React 19
**Key constraint:** Handbook scraper blocked by anti-bot. DFVA_MOCK=true in dev.
**See:** compass/app/README.md

## Quick start
```bash
cd compass/app
wasp start db          # terminal 1
wasp db migrate-dev    # name: add_assessment_job
wasp start             # terminal 2 → http://localhost:3000
```
**Smoke test runbook:** `.hermes/smoke-test-runbook.md`
**Env:** `.env.server` has DFVA_MOCK=true + dummy keys for OpenSaaS services (OpenAI, Stripe, S3)

## Context
Part of the SXD-Github workspace at University of Melbourne.
COMPASS = COMputational Program Assessment & Strategy System. 
DFVA = Degree Future-Viability Assessment — the scoring methodology.

## Rules
- Use conventional commits (feat:, fix:, refactor:, docs:, chore:)
- Test before committing. Lint before pushing.
- For multi-step tasks, prefer inline Workflow scripts

## Related
- Hermes skills: ~/.hermes/skills/
- Claude Code skills: ~/.claude/skills/
- Vault: ~/Documents/Claude/
