# verify-evidura evals

Benchmark tasks for `/regression-test`. Give each prompt to a cold subagent in a
fresh session with no hint that it is being evaluated. Score each task on its
checklist. A task passes only when every box is ticked. Re-run the set after any
edit to `SKILL.md` or `features/*.md`.

## Baseline

Cold Sonnet subagents, dev app running, 2026-09-02 and 2026-09-03.

| Task | Score | Missed |
| --- | --- | --- |
| 1 | 5/5 | none (dry run, 2026-09-02) |
| 2 | 3/4 | never loaded the skill; found test ids by reading page source |
| 3 | 2/4 | never loaded the skill; read a paused poll as a hang |

Fixes from this baseline: the `CLAUDE.md` rule that routes bug reports to the
skill, and the hidden-tab gotcha in `features/assess.md`. Re-run after the
next skill edit and update this table.

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

- [ ] Reads `features/reports-index.md` and uses its test ids, not guessed selectors.
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
