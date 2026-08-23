# Tech Stack

## Languages & Frameworks

- TypeScript everywhere; Python for a few pipeline scripts in `scripts/`
- Web app: Wasp 0.24 (custom-db mode) + OpenSaaS template + React 19 + Tailwind 4 + Prisma 5 (PostgreSQL) — lives in `compass/app`
- MCP server: plain TypeScript (`compass/mcp`, tsx dev / tsc build)
- Pipeline tooling: tsx scripts in `scripts/` (own package.json)

## Database

- PostgreSQL via Apple's `container` CLI (container `dfva-pg`, data at `~/.dfva/pgdata`) — NOT Docker, NOT `wasp start db`
- Start: `container system start` (once per login) then `scripts/dev-db.sh start`
- Migrations: `DATABASE_URL=… npx prisma migrate dev --schema compass/app/.wasp/out/db/schema.prisma`

## All Commands

| Command | What it does |
| --------- | ------------- |
| `scripts/dev-db.sh start` | Start local Postgres (port 5432) |
| `cd compass/app && wasp start` | Run app — server :3001, client :3000 |
| `cd compass/app && wasp test client run` | Run vitest unit tests (e.g. `src/compass/__tests__/`) |
| `npm --prefix scripts run dfva:gen` | Regenerate rubric/prompt targets from `dfva/source/rubric.ts` |
| `npm --prefix scripts run dfva:gen-content` | Regenerate `reportContent*.ts` from `reports/*.md` |
| `npm --prefix scripts run dfva:gen-assessments` | Regenerate `dfva/source/assessments.json` |
| `npm --prefix scripts run dfva:check` | Full parity/drift guard (also runs in CI) |
| `npm --prefix scripts run dfva:report-lint` | Lint report markdown format |
| `compass/app/smoke-test.sh` | Post-deploy smoke test (runbook: `.hermes/smoke-test-runbook.md`) |
| `compass/app/deploy.sh` | Unified Vercel deploy (aliases evidura.vercel.app + evidura.ai) |
| `cd compass/mcp && npm run dev` | Run the dfva MCP server |

## CI

- `.github/workflows/ci-build.yml` — build + `dfva:check`; git auto-deploy is disabled, deploy via `deploy.sh`
