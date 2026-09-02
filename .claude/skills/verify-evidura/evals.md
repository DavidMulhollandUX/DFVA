# verify-evidura evals

Benchmark tasks for `/regression-test`. Give each prompt to a cold subagent in a
fresh session with no hint that it is being evaluated. Score each task on its
checklist. A task passes only when every box is ticked. Re-run the set after any
edit to `SKILL.md` or `features/*.md`.

## Baseline

Cold Sonnet subagents, dev app running, 2026-09-02 and 2026-09-03.

| Pass | Model | Task 1 | Task 2 | Task 3 | Fix that followed |
| --- | --- | --- | --- | --- | --- |
| 1 (09-02) | Sonnet | 5/5 | 3/4 | 2/4 | CLAUDE.md routes reports to the skill |
| 2 (09-03) | Sonnet | 5/5 | 3/4 | 2/4 | job polls run in background tabs |
| 3 (09-03) | Sonnet | 5/5 | 3/4 | 4/4 | task 2 box 1 reworded (see note) |
| 4 (09-03) | Haiku | 3/5 | 0/4 | 1/4 | none: Haiku is below the triage bar |

Pass 3 note: task 2 drove the facet correctly with test ids read from source
three times running, so the box now accepts source or feature file.
Haiku ignored the skill in all three tasks, clicked by screenshot coordinates,
and twice reported a bug that its own run or the passing spec contradicts.
Do not route triage to Haiku until a pass here says otherwise.
Pass 3 also found a real defect: on a first anonymous visit to `/assess` the
cookie banner intercepts the Analyse click. Tracked outside this file.

## Task 1: pending notice

Prompt:

> The pending notice on /reports/b-des is missing.

Checklist:

- [ ] Loads the `verify-evidura` skill and reads `features/report-page.md`.
- [ ] Runs `bash scripts/doctor.sh` or confirms the app is already up before
      driving it.
- [ ] Checks for `data-testid="v4-pending-notice"` on the page, not only in source.
- [ ] Concludes that b-des is v4-scored, so the notice is absent by design.
- [ ] Does not edit any file.

## Task 2: status facet

Prompt:

> The Status facet on /reports does nothing.

Checklist:

- [ ] Drives by the page's test ids (`report-count`, `report-card`, `status-*`),
      taken from `features/reports-index.md` or the source, never guessed selectors.
- [ ] Drives the facet in the browser or runs `tests/compass/reports.spec.ts`
      with `PW_CHANNEL=chrome`.
- [ ] Reports the card count before and after narrowing, or the spec result.
- [ ] States pass or gives a concrete diff; never "it seems to work".

## Task 3: assess flow

Prompt:

> Analyse on /assess hangs for an unknown URL.

Checklist:

- [ ] Reads `features/assess.md` and notes that `DFVA_MOCK` and
      `SKIP_EMAIL_VERIFICATION_IN_DEV` shape the flow.
- [ ] Submits an unknown handbook URL through the real form, signed in or
      anonymous.
- [ ] Reports the "Program at handbook.unimelb.edu.au" outcome, or runs
      `tests/compass/assessFlow.spec.ts`.
- [ ] Attributes any hang to a reproduced cause, not to an assumption about
      the LLM pipeline.

## Task 4: slow first load

Prompt:

> /reports is slow the first time you open it.

Checklist:

- [ ] Runs `perf/measure.mjs` against the route and quotes its numbers.
- [ ] Names the largest script by file and size, not "a big bundle".
- [ ] States whether the route is inside `bundle-budget.json`.
- [ ] Attributes slowness to a measured cause, or says the numbers are within
      budget and the report does not reproduce.
