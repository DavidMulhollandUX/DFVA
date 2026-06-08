# COMPASS — Degree Future-Viability Assessor

**Tech stack:** Wasp 0.22, React 19, TypeScript, Prisma (PostgreSQL), Tailwind CSS
**Key constraint:** DFVA_MOCK=true in dev — mock service returns hardcoded assessments. Real pipeline blocked by handbook anti-bot.
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
cd compass/app && wasp start
```
Mock service is active by default (DFVA_MOCK=true). Set DFVA_MOCK=false to use real pipeline.

## Rules
- Use conventional commits (feat:, fix:, refactor:, docs:, chore:)
- Test before committing. Lint before pushing.
- For multi-step tasks, prefer inline Workflow scripts
