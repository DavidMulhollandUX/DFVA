# Assess a program

Route: `/assess`. Component: `compass/app/src/compass/AssessorPage.tsx`.
Covered by: `compass/e2e-tests/tests/compass/assessFlow.spec.ts` and `assess.spec.ts`.

## Sub-features

- Handbook URL form with validation feedback and an "Analyse" submit.
- Program picker that fills the URL field.
- Assessment history: session-only for anonymous visitors, persisted for
  signed-in users.

## How to get to it (user POV)

Nav bar → Assess. Public; no account needed.

## Driving it with Playwright

- URL field: `#handbook-url` (an `input` of `type="text"` with `inputMode="url"`,
  so `input[type="url"]` matches nothing).
- Feedback: `#handbook-url-feedback` (`aria-live="polite"`).
- Submit: `getByRole('button', { name: 'Analyse' })`; reads "Analysing…" while busy.
- Picker filter: `getByLabel('Filter assessable programs')`; each row is a button.
- History error: `data-testid="assess-history-error"`.
- Job status text: `Complete` or `Processing`.

## Gotchas

- `DFVA_MOCK` is read only in `compass/app/src/compass/assessmentService.ts`
  and defaults to true. The mock resolves known URLs against
  `sharedProgramData.ts`; an unknown URL falls back to a generic program named
  "Program at handbook.unimelb.edu.au".
- Known URL for a fixture: `https://handbook.unimelb.edu.au/2025/courses/b-des`
  → "Bachelor of Design".
- Mock jobs complete within a few seconds; allow 30 s in a spec.
- Job rows poll `getAssessmentJob` every 1.5 s with a react-query
  `refetchInterval`, which pauses while `document.visibilityState` is
  `hidden`. The in-app Browser pane reports hidden when the pane is not
  fronted, so a row can sit on "Processing" after the server has finished.
  Front the tab with `tabs_select` before driving, or prove the flow with
  `assessFlow.spec.ts` instead. A user's visible tab resumes on focus; this
  is not an app bug.
