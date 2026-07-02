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
The local Postgres runs via Apple's `container` CLI (not Docker / `wasp start db`):
```bash
container system start            # once per login (or: brew services start container)
scripts/dev-db.sh start           # terminal 1 — Postgres on 127.0.0.1:5432 (container `dfva-pg`)
cd compass/app && wasp start      # terminal 2 — server :3001, client :3000
```
`DATABASE_URL` is set in `.env.server`, so Wasp runs in **custom-db mode** — use `wasp start`, never `wasp start db` (it refuses when DATABASE_URL is present). Mock service is active by default (DFVA_MOCK=true); set DFVA_MOCK=false for the real pipeline.

**Database notes:**
- DB lives in the Apple-`container` Postgres `dfva-pg` (creds in `scripts/dev-db.sh`; data persists at `~/.dfva/pgdata`). Connection: `postgresql://postgresWaspDevUser:postgresWaspDevPass@localhost:5432/OpenSaaS-fc3b171ec3`.
- After a Mac reboot the loopback publish rule is dropped — re-run `scripts/dev-db.sh start` (and `container system start` if the service is down).
- `wasp db migrate-dev`'s "Can not connect to database" check can falsely fail (wasp 0.22.0 quirk); the server connects fine. For migrations prefer `DATABASE_URL=… npx prisma migrate dev --schema .wasp/out/db/schema.prisma`. If `prisma migrate status` is up to date, `wasp start` is sufficient.

## Rules
- Use conventional commits (feat:, fix:, refactor:, docs:, chore:)
- Test before committing. Lint before pushing.
- For multi-step tasks, prefer inline Workflow scripts
