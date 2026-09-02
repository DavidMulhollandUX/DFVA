# Reports index

Route: `/reports`. Component: `compass/app/src/compass/v4/V4ReportsPage.tsx`.
Covered by: `compass/e2e-tests/tests/compass/reports.spec.ts` and `assess.spec.ts`.

## Sub-features

- One card per program (235 as of 2026-09-02), each with a status badge and a
  "Durability Report" link to `/reports/:reportSlug`.
- Search box and three facets: Status, Position, Faculty.
- Program count in the facet row.

## How to get to it (user POV)

Nav bar → Reports. Also the post-login landing page.

## Driving it with Playwright

- Cards: `data-testid="report-card"` with `data-status` of `current`,
  `archived` or `research`. Count with `expect.poll`, never a bare
  `count()`, because the list renders after first paint.
- Links: `data-testid="durability-report-link"`, one per card.
- Badges: `data-testid="status-current"`, `data-testid="status-archived"`,
  `data-testid="status-research"`.
- Count label: `data-testid="report-count"`. Basis chip: `data-testid="exposure-basis"`.
- Facets are native selects: `getByLabel('Status')`, `getByLabel('Position')`,
  `getByLabel('Faculty')`. Status option values: `all`, `current`, `archived`, `research`.
- Search: `getByLabel('Search programs')`.

## Gotchas

- `archived` means v1-only and v4 pending. As of 2026-09-02 no coursework
  program is archived, so tests that need one must skip when the count is 0.
- The heading is `Program reports`. The old v1 index lives at `/reports/archive`.
- The cookie banner and the prototype banner overlay the top of the page on a
  fresh profile; neither blocks the cards.
