# Adding a course — definition of done

A course is only "done" when **all** of its linked artifacts exist and agree.
The Juris Doctor shipped assessment-only, so the redesign link, the redesign
plan, and the dimension evidence were each missing and had to be backfilled one
request at a time. Do all of this up front instead.

## The 6 artifacts

1. **Program entry** — `compass/app/src/compass/sharedProgramData.ts`: scores, 11
   dimensions, thresholds, `assessmentSlug`, `marketSlug`, **`recommendSlug`**
   (the last is what makes the *Redesign Plan* link appear on `/reports`).
2. **Assessment content** — `REPORT_CONTENT["dfva-<code>"]` (via `reportContent.ts`).
3. **Redesign plan** — `RECOMMEND_CONTENT_ALL["dfva-recommend-<code>"]` in
   `reportContent.recommend-all.ts`, in the `b-des` format (Diagnostic Summary,
   Score-to-Action, Market Evidence, Prioritised Interventions table with a
   `P1..Pn` lever scheme).
4. **Report metadata** — the `reportMeta` map in `ReportDetailPage.tsx`
   (assessment + market + recommend entries).
5. **Dimension evidence** — `dfva/source/evidence/<code>.json`
   (`{ code, programSlug, byDimension }`), with a `rationale` + `recommendations`
   (reusing the same `P#` levers as the redesign plan) for all 11 dimensions.
   **Author this in `dfva/source/evidence/`, not by hand in the app file** — the
   app's `data/dimensionEvidence.ts` is generated, so a hand-edit is deleted by
   the next `dfva:gen`.
6. **Report markdown** — `reports/dfva-<code>.md`, and bump `CACHE_VERSION` in
   `sharedProgramData.ts`.

## Guardrails

### Completeness (`dfva:completeness`)

`npm --prefix scripts run dfva:completeness` (runs in CI) fails on a new course
that is missing any of the above: dangling `recommendSlug`, missing assessment
content, or dimension evidence that is incomplete or has no source file. Existing
incomplete programs are grandfathered in a `GRANDFATHERED` allowlist; the check
prints which ones are now complete and can be removed from it.

### Report format (`dfva:report-lint`)

`npm --prefix scripts run dfva:report-lint` (runs in CI) validates every
`reports/dfva-*.md` against the canonical template in
[`docs/report-template.md`](report-template.md). Newly generated reports must
pass; existing format drift is grandfathered. See the template for the three
canonical report families (assessment, market, recommend).

> Note: the dimension-evidence generator (`dfva:gen`) is currently out of sync
> with the app data (it emits far fewer programs than the app carries). Until
> that's reconciled, treat the app's `data/dimensionEvidence.ts` as the live
> source of truth and keep a matching `dfva/source/evidence/<code>.json` so the
> completeness check passes and a future clean `dfva:gen` won't drop the course.
