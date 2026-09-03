# Report page

Route: `/reports/:reportSlug`. Dispatcher: `compass/app/src/compass/ReportPage.tsx`.
Covered by: `compass/e2e-tests/tests/compass/reports.spec.ts`.

## Sub-features

- v4 Durability Report for a scored coursework program (`compass/app/src/compass/v4/V4ReportPage.tsx`
  and `v4/report/*`): hero, finding, position card and plane, scorecard, gates,
  market part, improvement plan, footer with archived v1 links.
- Research-degree report (`v4/report/ResearchReport.tsx`): no rating, a research
  notice, the carried-forward narrative, market card, archived v1 link.
- Pending state (`v4/report/PendingReport.tsx`) for a v1-only program.
- Archived v1 page (`compass/app/src/compass/ReportDetailPage.tsx`) for any
  `dfva-*` slug.

## How to get to it (user POV)

Reports index → "Durability Report" on a card. Archived v1 pages are reached
from the footer of a v4 report or from the pending notice, never from the index.

## Driving it with Playwright

Dispatcher rules, by slug:

| Slug | Renders | Example |
| --- | --- | --- |
| a program code | v4, research or pending report | `/reports/mc-cs` |
| `dfva-v4r-<code>` | v4 research report | `/reports/dfva-v4r-dr-philsci` |
| any other `dfva-*` | archived v1 page | `/reports/dfva-recommend-b-des` |

Test ids:

- Finding: `data-testid="finding-block"`, draft flag `data-testid="v4-draft-notice"`.
- Position: `data-testid="v4-exposure"`, `data-testid="v4-exposure-basis"`,
  `data-testid="v4-exposure-weighted"`, `data-testid="v4-adaptiveness"`,
  `data-testid="v4-position-chip"`, `data-testid="v4-basis-description"`,
  `data-testid="v4-program-point"`, `data-testid="v4-no-matrix"`.
- Scorecard and gates: `data-testid="rated-v4-*"` (C1–C5, W1–W3),
  `data-testid="gate-*"` (G1, G2), `data-testid="v4-workplace-pending"`.
- Market and plan: `data-testid="v4-no-market"`, `data-testid="v4-no-plan"`.
- Footer: `data-testid="archived-reports"`.
- Research and pending: `data-testid="v4-research-notice"`,
  `data-testid="v4r-no-plan"` (research pages state that no v4 plan exists),
  `data-testid="v4-pending-notice"`, `data-testid="archived-v1-link"`.
- Archived v1 page: `data-testid="archived-report-banner"`,
  `data-testid="source-references"`, `data-testid="method-glossary"`.
- Rubric dialog trigger: `data-testid="how-rubric-works-trigger"`.

## Gotchas

- Report bodies are lazy chunks. On a dev server first paint can exceed the
  default 5 s expect timeout; pass `{ timeout: 15_000 }`.
- The loading skeleton has `role="status"` and `aria-label="Loading report"`.
- A v4 report page also fetches its program's Panel C record as its own
  chunk (`v4/data/v4PanelC/<code>.ts`, 6–32 kB) after the route chunk. Until
  it arrives the page renders an empty `role="status"` shell; a missing chunk
  in the network log, not the pending card, is the sign of a broken record.
- v1 vocabulary (`N/36`, `MODERATE RISK`, `RESILIENT`) is allowed only on the
  archived v1 page. `renderedV4Bodies.test.ts` pins the markdown and
  `reports.spec.ts` pins the DOM for the research page.
- `find` in the in-app browser matches accessibility names, not test ids. Use
  `javascript_tool` with `document.querySelectorAll('[data-testid]')` to list
  what a page rendered.
