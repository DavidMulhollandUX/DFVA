# Insights

Routes: `/insights`, `/insights/portfolio`, `/insights/faculty`,
`/insights/faculty/:facultySlug`, `/insights/fragility`.
Covered by: `compass/e2e-tests/tests/compass/insights.spec.ts` and, server-side,
`compass/app/src/compass/__tests__/insightsPagesRender.test.ts`.

## Sub-features

- Portfolio overview (`compass/app/src/compass/v4/V4InsightsPage.tsx`): one row
  per program, sortable columns, faculty chips, search, rubric dialog.
- Portfolio health report (`compass/app/src/compass/PortfolioHealthPage.tsx`).
- Faculty comparison and per-faculty detail (`compass/app/src/compass/FacultyDashboard.tsx`).
- Fragility dashboard (`compass/app/src/compass/FragilityDashboardPage.tsx`).

## How to get to it (user POV)

Nav bar → Insights lands on the portfolio overview. Faculty links in the
overview open the faculty pages.

## Driving it with Playwright

- Rows: `data-testid="program-row"` with `data-assessed="true"` or `"false"`;
  unassessed rows carry `data-testid="not-assessed-label"`.
- Counts and controls: `data-testid="row-count"`, `data-testid="toggle-items"`,
  `data-testid="sort-status"` (live region).
- Faculty chips: `data-testid="chip-all"` and `data-testid="chip-*"` (faculty slug).
- Sorting: `getByRole('columnheader', { name: /Adaptiveness/ })` contains a
  button; the header's `aria-sort` flips.
- Search: `getByLabel('Search programs')`.
- Rubric dialog: `data-testid="how-rubric-works-trigger"`.

## Gotchas

- Heading is `Portfolio overview`. Row counts are pinned in `insights.spec.ts`
  and derived in `v4PortfolioStats.test.ts`; change both when the cohort changes.
- `InsightsGate.tsx` has `IS_LICENSED_DEMO = true`, so the paywall is a no-op.
- The health report and faculty pages have no test ids; match on their `h1`
  (`Portfolio Health Report`, `Faculty comparison`, or the faculty name).
