# Reports index

Route: `/reports`. Component: `compass/app/src/compass/v4/V4ReportsPage.tsx`.
Covered by: `compass/e2e-tests/tests/compass/reports.spec.ts` and `assess.spec.ts`.

## Sub-features

- One card per program (235 as of 2026-09-07: 221 scored plus 14 research
  degrees), each with a status badge, its owning university, and a "Durability
  Report" link to `/reports/:reportSlug`.
- Search box and five facets: University, Status, Position, Level, Faculty,
  plus a Sort control.
- Program count in the facet row, and a row of removable chips for the active
  filters.

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
  Institution line on a card: `data-testid="card-institution"`.
- Facets are native selects: `getByLabel('University')`, `getByLabel('Status')`,
  `getByLabel('Position')`, `getByLabel('Level')`, `getByLabel('Faculty')`,
  `getByLabel('Sort by')`. Status option values: `all`, `current`, `archived`,
  `research`. University option values are institution slugs (`unimelb`, `usyd`,
  `unsw`, `monash`, `uq`, `adelaide`, `anu`, `uwa`, `la-trobe`).
- Active filters render as `data-testid="filter-chip"` buttons; clicking one
  clears that filter.
- Search: `getByLabel('Search programs')`.

## Counting cards — read the label, not the DOM

**Assert on `data-testid="report-count"`**, which reports the full match count,
rather than counting `report-card` nodes. The grid renders every match today,
but the count label is the contract; a windowing or paging change must not
break the suite.

Card-level assertions must be scoped, never a bare `text=` locator: program
names such as "Bachelor of Design" are not unique once more than one university
is published — on 2026-09-07 that locator resolved to 3,073 elements.

## Gotchas

- `archived` means v1-only and v4 pending. As of 2026-09-07 no coursework
  program is archived, so tests that need one must skip when the count is 0.
- The University facet only renders when more than one institution is
  published; the Faculty facet only renders for the University of Melbourne,
  because `faculty.ts` maps onto UoM's nine official faculties and means
  nothing elsewhere. With only Melbourne published, University is hidden and
  Faculty is shown.
- The heading is `Program reports`. The old v1 index lives at `/reports/archive`.
- The cookie banner and the prototype banner overlay the top of the page on a
  fresh profile; neither blocks the cards.
