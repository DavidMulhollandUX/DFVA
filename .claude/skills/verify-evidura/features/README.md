# Feature map

One file per user-facing feature, each with the same four sections:
Sub-features, How to get to it (user POV), Driving it with Playwright, Gotchas.
Test ids and route paths in these files are checked against the source by
`compass/app/src/compass/__tests__/featureMapDrift.test.ts`, so a renamed
test id or a deleted route fails the unit-tests job until the map is updated.

| Feature | File | Routes | Covering spec |
| --- | --- | --- | --- |
| Reports index | [reports-index.md](reports-index.md) | `/reports` | `tests/compass/reports.spec.ts` |
| Report page | [report-page.md](report-page.md) | `/reports/:reportSlug` | `tests/compass/reports.spec.ts` |
| Assess a program | [assess.md](assess.md) | `/assess` | `tests/compass/assessFlow.spec.ts` |
| Insights | [insights.md](insights.md) | `/insights`, `/insights/portfolio`, `/insights/faculty`, `/insights/faculty/:facultySlug`, `/insights/fragility` | `tests/compass/insights.spec.ts` |
| Auth | [auth.md](auth.md) | `/login`, `/signup`, `/account` | `tests/authRedirectTests.spec.ts` |
| Navigation and shell | [nav-and-shell.md](nav-and-shell.md) | `/`, `/pricing`, `/developers`, `/trust` | `tests/landingPageTests.spec.ts` |

Spec paths are relative to `compass/e2e-tests/`.

Not mapped: `/admin/*`, `/checkout`, `/file-upload` (OpenSaaS template pages
with no COMPASS behaviour), `/reports/archive` (the old v1 index).
