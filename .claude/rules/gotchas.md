# Gotchas & Workarounds

## Do Not Touch (generated files)

- `compass/app/.wasp/out/**` — Wasp build output. Edit `compass/app/src/` and `main.wasp.ts` instead; Wasp regenerates everything under `.wasp/out`.
- `compass/app/src/compass/reportContent.ts`, `reportContent/**` (per-report lazy modules) and `src/compass/data/dimensionEvidence.ts` — generated. Canonical sources are `reports/*.md` and `dfva/source/`. Regenerate with `npm --prefix scripts run dfva:gen-content` (content) or `dfva:gen` (rubric/prompts), then verify with `dfva:check`. Hand-edits will fail CI. Client pages import the lazy `reportContent/index` loaders; the eager `reportContent.ts` map is server/scripts-only (keeps report bodies out of the web bundle).
- `dfva/dist/**` — generated from `dfva/source/rubric.ts` + `dfva/source/targets/*.tmpl` via `dfva:gen`.

## Known Quirks

- **Two alumni-data files, and only one answers "does this program have a record?"**
  `data/jir_data.json` (141 JIR/LiveAlumni records) is the Panel A source of record.
  `data/labour-evidence.json` (41 programs) is a narrower enrichment layer. A program
  absent from labour-evidence and present in jir_data is common — **never conclude "no
  alumni destination record exists" from labour-evidence.json.** This shipped a wrong
  claim to dev.evidura.ai on 2026-08-14.
- **A JIR record can exist and still look empty.** 82 of the 141 records carry at least
  one destination title missing from the AIOE crosswalk, and several have none mapped, so
  a naive exposure computation returns almost nothing and reads as "no data". Map the
  titles into `data/aioe/v31_extension_crosswalk.csv` (from `data/aioe/felten_aioe.json`,
  min–max rescaled) **before** scoring, not after. Both failures are caught by
  `npx tsx scripts/dfva-panela-coverage-check.ts`, wired into `dfva:check`.
- **Every v4 cohort program resolves to an exposure basis** (since 2026-08-22): own JIR
  record → variant → pooled majors → combined → curated cognate/partial
  (`data/aioe/panela_basis_overrides.json`) → JSA HEO field list (`data/jsa/`). One resolver,
  `scripts/dfva-panela-basis.ts`, serves generator and guard. "No exposure" is no longer a
  legitimate published state for a coursework program — fix the basis, never the page. Method
  and Felten justification: `docs/dfva-v4-panela-basis.md`. Refused titles get
  program-scoped rows (`crosswalk-add.py … "program_scope"`), never a global guess.

- **Postgres is NOT Docker.** It runs via Apple's `container` CLI (`dfva-pg`). `wasp start db` refuses to run because `DATABASE_URL` is set in `.env.server` (custom-db mode). Use `scripts/dev-db.sh start` + `wasp start`.
- **After a Mac reboot** the loopback publish rule drops — re-run `scripts/dev-db.sh start` (and `container system start` if the service is down).
- **`wasp db migrate-dev` falsely reports "Can not connect to database"** (wasp 0.22.0 quirk). Use `DATABASE_URL=… npx prisma migrate dev --schema compass/app/.wasp/out/db/schema.prisma` instead.
- **`DFVA_MOCK=true` in dev** — OpenAI/Stripe/S3 keys in `.env.server` are dummies; the mock service returns hardcoded assessments for the programs in `src/compass/sharedProgramData.ts`. Don't debug "broken" integrations; set `DFVA_MOCK=false` + real `OPENAI_API_KEY` for the real pipeline.
- **`compass-static/` is deleted** (decommissioned 2026-07-04). All UI work goes in `compass/app`. Ignore any stale references to it.
- **Handbook scraping**: Crawl4AI (`PYTHONPATH="" bash ~/.hermes/scripts/crawl4ai_scrape.sh "<url>"`) worked for the Go8 batch but the UoM handbook now refuses it with a "Pardon Our Interruption" interstitial. A real browser is served normally. For UoM handbook evidence use the browser-based capture system — `/v4-capture`, or `python3 scripts/v4-capture-queue.py` directly ([runbook](../../docs/dfva-v4-capture-system.md)). Pace it: ~1 page per 20–30s, never parallel.

## Environment Notes

- Env config lives in `compass/app/.env.server` (no `.env.example` at repo root). Server env validated by `compass/app/src/env.ts` zod schema — adding an env var means updating that schema.
- Deployed at `evidura.ai` / `evidura.vercel.app` (Vercel); deploy only via `compass/app/deploy.sh` (git auto-deploy disabled).

## CI-specific (learned 2026-07-05, cost 7 iterations)

- **Wasp in CI installs via npm only**: `npm install -g @wasp.sh/wasp-cli@0.24.0 @wasp.sh/wasp-cli-linux-x64-glibc@0.24.0` (curl installer rejects ≥0.21; the platform optionalDep is skipped without the explicit second package). Needs **node 24+** (wasp 0.24 requires >=24.14).
- **`wasp test client run` breaks on Linux runners** — vitest externalizes the generated SDK and node fails on its internal imports ("Cannot find package 'wasp/server'"); works on macOS only because the node_modules/wasp symlink realpath escapes node_modules. CI runs `npx vitest run --config vitest.ci.config.mts` instead (aliases wasp/server → `src/test/waspServerShim.ts`). Locally keep using `wasp test client run`.
- **`npm ci` fails in compass/app on a fresh checkout** (lockfile references the generated `.wasp/out/*` workspaces) — use `npm install`.
