# COMPASS Product — State Review & Next Steps (2026-06-12)

> Supersedes [next-steps-2026-06-08.md](next-steps-2026-06-08.md). Scope per direction: **product, experience, reports** — venture-validation work intentionally excluded.

## Where the product stands

The week of Jun 8–10 shipped a genuine product sprint: 41 programs scored with real QILT GOS 2024 + GOS-L 3-year + international market data, AIOE AI-exposure scores with citations, per-program improvement roadmaps, market-data report tabs, faceted report navigation, and four new analytics surfaces (ProgramRadar, Faculty Comparison, Insights hub, Portfolio Health). A Go8 comparison and a 378-line methodology paper landed in docs/.

Two structural gaps were holding all of it back, both now closed:

1. **The four new UI components were orphaned** — no routes in `main.wasp`, no imports anywhere. None of them had ever rendered.
2. **The app had effectively never been run end-to-end** — the `AssessmentJob` migration files were lost (applied to a dev DB on Jun 8 but never committed), `.env.server` carried a stale `DATABASE_URL` that broke Wasp's managed-DB mode, and the smoke-test runbook had never been executed.

## What this session did (2026-06-10 → 12)

**Wired the orphaned UI** — routes for `/insights`, `/insights/portfolio`, `/insights/faculty[/:facultySlug]` (param highlights the chosen faculty row); ProgramRadar embedded in report detail pages ("Dimension Fingerprint"); "Insights" added to the navbar; `getFaculty` consolidated from four identical copies into `src/compass/faculty.ts`.

**First full run + smoke test** — managed dev DB resurrected (container `wasp-dev-db-OpenSaaS-fc3b171ec3`, port 5432; the stale `DATABASE_URL` line pointed at a *second*, older container). Migration regenerated from the live DB and baselined non-destructively (`prisma migrate resolve`) — `migrations/20260608080213_add_assessment_job/` is now in the repo. All existing data preserved. Runbook steps 1–8 **PASS**, including signup → email-verify (Dummy provider link from server log) → login → assess known URL (b-des, Complete ≤2s) → assess unknown URL (generic HIGH RISK fallback confirmed in DB). DB gotchas documented in [compass/app/AGENTS.md](../compass/app/AGENTS.md).

**Experience QA + fixes** (evidence: `/tmp/compass-smoke/*.png`; harness: [compass/e2e-tests/smoke-run.mjs](../compass/e2e-tests/smoke-run.mjs), re-runnable against a live app):

| Defect found | Fix |
|---|---|
| 41 improvement roadmaps imported but **never merged** into `REPORT_CONTENT` — Improvement Plan tab silently missing for 35 programs | Spread `RECOMMEND_CONTENT_ALL` into `REPORT_CONTENT`; tab now renders for all 41 |
| `dfva-mc-arch` scored 28/36 but labelled MODERATE RISK (28+ is RESILIENT per canonical bands) | Band corrected in registry, reportMeta, report md, and report body — first RESILIENT-banded program alongside mc-busana |
| 8 round-2 reports are **raw JSON** rendered through ReactMarkdown (mc-arch, mc-ba, mc-busana, mc-envlaw, mc-journ, mc-prop, mc-tesol, mc-urbhort) | Structured renderer in ReportDetailPage: threshold chips + dimension/rationale table + markdown tail; graceful fallback |
| Duplicate report cards + React duplicate-key warnings when an assessment is re-run (`useReportsData` didn't dedup jobs) | Keep newest job per slug |
| FacultyDashboard "AI Literacy Gap 1.1" hardcoded (real value 1.2) ; PortfolioHealth "83%" hardcoded | Both computed from data |
| ProgramRadar labels truncated at 12 chars | Widened to 18 |

**Report integrity guard** — new [scripts/dfva-registry-check.ts](../scripts/dfva-registry-check.ts) cross-validates the five report surfaces (app registry ↔ static registry ↔ `reports/*.md` ↔ `REPORT_CONTENT` ↔ reportMeta) plus band-vs-score against canonical `RISK_BANDS`. Wired into `dfva:check` and the `dfva-check.yml` CI workflow (paths extended). Verified green on current state and red on a deliberately broken fixture. It found the two real bugs above on its first run.

**Smoke results:** 25/27 on first run; the two failures led to one more real fix — job status badges never live-updated (no query polling; users had to refresh to see "Complete"), now polling at 1.5s while a job runs. Final clean rerun: **27/27**.

## Known state, accepted for now

- **compass-static (GitHub Pages demo) is 35 programs behind the app** (6 vs 41) and has none of this week's features. The registry check reports this as a standing warning. Decision needed: port the static demo forward, point it at a deployed app, or retire it.
- 22 market + several recommend `reports/*.md` archive files don't exist for programs whose content lives only in `REPORT_CONTENT` (warnings, not errors — the app UI is unaffected).
- User-generated assessments (e.g. the smoke test's `ZZ-NOTREAL`) appear as cards in the public `/reports` listing by design of the DB-merge; consider filtering generic fallbacks out of the public listing.
- `wasp db migrate-dev` has a connectivity-check quirk in wasp 0.22.0 (fails while the server itself connects fine). Harmless here; documented in AGENTS.md.
- Dark-mode visual audit deferred: the app uses a manual theme toggle (not `prefers-color-scheme`); all new components reuse the existing `dark:` utility patterns.
- docs/dfva-cross-program-analysis.md (Jun 10) says "0 programs RESILIENT" — now stale: mc-busana (31) and mc-arch (28, corrected) are RESILIENT. Refresh alongside the next batch.

## Next steps, priority-ordered

1. **compass-static decision** — port-or-retire (see above). The public demo currently undersells the product by 35 programs and every new feature.
2. **Per-faculty detail pages** — `/insights/faculty/:facultySlug` currently shows the all-faculty comparison with the chosen row highlighted; a true per-faculty drill-down (programs, dimension profile, roadmap rollup) is the natural next surface.
3. **InsightsGate → real RBAC** — `IS_LICENSED_DEMO = true` mock; the component's BACKLOG note targets Wasp role-based permissions (INSIGHTS_VIEWER/ADMIN, server-side gating) in Q3 2026.
4. **Score the 74 cached-but-unscored courses** (docs/dfva-batch-backlog.md) — grows coverage beyond 41; the registry check now guards consistency as they land.
5. **Real pipeline prerequisites** (`DFVA_MOCK=false`): real `OPENAI_API_KEY`, handbook fetcher hardening (Playwright fallback exists; anti-bot remains the constraint).
6. **Repo hygiene deferred from this session:** remaining DUPLICATION-AUDIT prompt de-dup (non-product); convert the 8 raw-JSON archive reports to house-format markdown if the archive is ever published.

## How to re-verify

```bash
cd compass/app && wasp start db      # terminal 1
cd compass/app && wasp start         # terminal 2
cd compass/e2e-tests && WASP_LOG=<wasp output file> node smoke-run.mjs
npm --prefix scripts run dfva:check  # generator drift + registry integrity
```

---

## Update 2026-06-15 — Faculty of Science meeting pack

Built a validation pack for the UoM **Faculty of Science** meeting (the meeting is a discovery session — props provoke reactions, the question guide is the centrepiece):
- **Question guide** — [compass-science-faculty-questions.md](compass-science-faculty-questions.md): Mom-Test framing, role-tuned ask-the-room sets tagged to H1–H4/FQ1–8, artifact-reaction prompts, self-prep, capture sheet.
- **Four deliverables** — [docs/science-meeting/](science-meeting/README.md): one-pager, portfolio dashboard, improvement-priorities rollup (PDFs, generated by [scripts/build-science-meeting.ts](../scripts/build-science-meeting.ts) → render → visual QA) and a 12-slide HTML deck. All figures trace to the registry.
- **Taxonomy fix** — [faculty.ts](../compass/app/src/compass/faculty.ts) `getFaculty()` rewritten: it mis-filed Earth Sciences → "Creative Arts" ("e**art**h"), Biotechnology → "Other", and put Biomedical/Epidemiology/Actuarial in Science. Now produces the **authoritative 11-program Faculty of Science roster** (core 10 + Data Science; Biomedical & Epidemiology → MDHS, CS → FEIT, Actuarial → FBE — verified against the UoM Handbook). "Other" bucket eliminated.
- **App** — real per-faculty drill-down at `/insights/faculty/:facultySlug` ([FacultyDashboard.tsx](../compass/app/src/compass/FacultyDashboard.tsx)) replacing the row-highlight stub.
- **Doc** — [dfva-cross-program-analysis.md](dfva-cross-program-analysis.md) recomputed (was stale: now 2 RESILIENT not 0; AI Literacy 1.22 with 4 programs at 3; Outcome Evidence bimodal).
- **Verified:** smoke 29/29, Playwright 4/4, tsc clean, dfva:check + registry green.

**Open / for DJ:** roster confirmed by research (Data Science included as Science-led, jointly delivered — flagged on the deliverables). Brand defaults to COMPASS tokens; switch to UoM brand via `uom-design-system` if the collateral should read as official university material.
