# Architecture

## Folder Map

- `compass/app/` — the live web app (Wasp 0.24 + OpenSaaS). ALL UI/feature work goes here.
- `compass/mcp/` — dfva MCP server (agent-first access to assessments)
- `compass/e2e-tests/` — Playwright e2e tests
- `dfva/` — DFVA methodology single-source: `source/rubric.ts`, `source/assessments.json`, `source/evidence/`, `source/targets/*.tmpl` → generated `dist/` (SKILL.md, copilot-instructions, etc.)
- `reports/` — canonical assessment report bodies (markdown, one+ per program)
- `scripts/` — generation/validation pipeline (tsx + some Python); own package.json
- `data/` — raw datasets (QILT, labour-evidence.json)
- `docs/` — venture workbook, plans, briefs
- `brand/evidura/` — brand assets + design tokens
- `features/` — feature specs (feat-001…)
- `graphify-out/` — generated knowledge graph (gitignored; regenerate with `/graphify .`)

## Source-of-Truth Map (edit the left side, never the right)

| Canonical source | Generator | Generated artifact | Guard |
| --- | --- | --- | --- |
| `reports/*.md` | `dfva:gen-content` | `compass/app/src/compass/reportContent*.ts` | `dfva:check` (CI) |
| `dfva/source/rubric.ts` + `targets/*.tmpl` | `dfva:gen` | `dfva/dist/*` (SKILL.md, copilot-instructions…) | `dfva:check` |
| `dfva/source/evidence/`, `data/labour-evidence.json` | `dfva:gen-assessments` | `dfva/source/assessments.json` (consumed by MCP server) | `dfva:assessments-check` |
| `compass/app/src/` + `main.wasp.ts` + `schema.prisma` | `wasp start` / `wasp build` | `compass/app/.wasp/out/**` | never edit output |

## Data Flow (app)

1. Client pages (`src/compass/*.tsx`) call Wasp operations declared in `main.wasp.ts`
2. Operations implemented in `src/compass/operations.ts` (+ `src/user`, `src/payment`, `src/file-upload`)
3. `assessProgram`: DFVA_MOCK=true → mock service over `sharedProgramData.ts`; false → LLM pipeline (needs OPENAI_API_KEY)
4. Report pages render pre-generated content from `reportContent*.ts` (see source-of-truth map)
5. PgBoss jobs: `dailyStatsJob` (hourly), `marketDriftJob` (weekly)

## Deployment

- Vercel via `compass/app/deploy.sh` → evidura.vercel.app + evidura.ai; smoke test with `compass/app/smoke-test.sh`
- CI: `.github/workflows/ci-build.yml` (build + `dfva:check`); git auto-deploy disabled
