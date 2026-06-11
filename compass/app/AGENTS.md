# COMPASS — Degree Future-Viability Assessor

**Tech stack:** Wasp 0.22, React 19, TypeScript, Prisma (PostgreSQL), Tailwind CSS
**Key constraint:** DFVA_MOCK=true in dev — mock service returns hardcoded assessments for the 41 programs in `src/compass/sharedProgramData.ts`. DFVA_MOCK=false matches against the same PROGRAMS array, then falls back to the LLM pipeline (needs a real OPENAI_API_KEY). Both work.
**See:** README.md

## Context
Part of the SXD-Github workspace at University of Melbourne. 
Wasp/OpenSaaS app for assessing university program viability against AI-driven labour market change.

## Project Structure
- `compass/app/` — Wasp application
- `compass/app/src/compass/` — COMPASS-specific pages, operations, services
- `compass/app/src/client/` — Shared UI components (shadcn/ui style)
- `compass/app/src/server/` — Server-side utilities
- `compass/e2e-tests/` — Playwright e2e tests
- `scripts/` — DFVA report generation pipeline (CLI)
- `reports/` — Generated assessment reports (markdown)

## Development
```bash
cd compass/app && wasp start db   # terminal 1 — managed Postgres (container wasp-dev-db-OpenSaaS-fc3b171ec3, host port 5432)
cd compass/app && wasp start      # terminal 2 — server :3001, client :3000
```
Mock service is active by default (DFVA_MOCK=true). Set DFVA_MOCK=false to use real pipeline.

**Database gotchas (learned 2026-06-10):**
- Do NOT define `DATABASE_URL` in `.env.server` — its presence switches Wasp to custom-db mode, which makes `wasp start db` refuse to run and `wasp db migrate-dev` fail its connectivity check. For direct Prisma CLI use, export it in the shell instead (user `postgresWaspDevUser`, db `OpenSaaS-fc3b171ec3`, port 5432).
- `wasp db migrate-dev`'s "Can not connect to database" check can fail even when the DB is reachable (wasp 0.22.0 quirk); the server itself connects fine. If `npx prisma migrate status` says "up to date", `wasp start` is sufficient.
- A second, stale container `wasp-dev-db-compass` (host port 5433) exists from an earlier setup; the live one is `wasp-dev-db-OpenSaaS-fc3b171ec3` on 5432.

## Rules
- Use conventional commits (feat:, fix:, refactor:, docs:, chore:)
- Test before committing. Lint before pushing.
- For multi-step tasks, prefer inline Workflow scripts
