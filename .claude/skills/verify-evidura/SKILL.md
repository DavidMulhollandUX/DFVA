---
name: verify-evidura
description: Launch, drive and prove a change in the Evidura web app (compass/app) as a user would. Use first, before reading page source, for any user report about /reports, /assess, /insights or a report page, and when asked to run the app, reproduce a bug, check that a fix works on a page, or take a screenshot of a route. Carries the feature map (features/*.md) that says how to reach every feature and which test ids to drive.
---

# Verify Evidura

Written for an agent reading it cold. Follow it in order: Doctor, Launch, Drive,
Evidence, Cleanup. The feature map in `features/` is the part that turns a vague
report ("the pending notice is missing on b-des") into a route, a test id and a
spec.

## Proof standard

Adapted from pstack's "Prove It Works" and "Sequence Work into Verifiable Units"
(MIT, Lauren Tan).

- Exercise the real user path: the route in a browser, the form as submitted,
  never an internal setter or a unit test standing in for the page.
- One verifiable unit per commit, with its check named in the commit body.
- Evidence is a spec run, a screenshot, or a DOM query result. A sentence that
  says it works is not evidence.
- If a check cannot be run, say so in the report; do not report the unit as done.

## Doctor

```bash
bash scripts/doctor.sh
```

Read-only. Every FAIL line names its fix. Common ones after a reboot:
`container system start`, then `scripts/dev-db.sh start`.

## Launch

Start the stack with the Bash tool in the background:

```bash
bash scripts/dev-app.sh
```

It starts the container service, Postgres and `wasp start`; the client is on
`http://localhost:3000` and the server on `:3001`. Boot takes about a minute;
poll `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/` for 200.

Then attach the in-app browser with `preview_start` and name `evidura`
(`.claude/launch.json`). The launcher cannot run the script itself on macOS
because its helper process cannot read files under `~/Documents`; the attach
form is the only one that works here.

Fallback without the browser tools: the three commands in the repo `CLAUDE.md`
quick start, in two terminals.

## Drive

Two tiers. Explore with the browser tools; prove with a spec.

**Explore.** `navigate` to the route from the feature file, then inspect:

- `find` and `read_page` match accessibility names and text, not test ids.
- To see test ids, use `javascript_tool`:
  `[...document.querySelectorAll('[data-testid]')].map(e => e.dataset.testid)`.
- `read_console_messages` with `onlyErrors` for runtime errors. The dev-mode
  "Hydration failed" error is a Wasp 0.24 quirk, not an app bug.

**Prove.** Write or extend a spec under `compass/e2e-tests/tests/compass/` and run
it against the running app:

```bash
cd compass/e2e-tests && npx playwright test tests/compass/<spec> --reporter=line
```

The config reuses the running server locally. If Playwright's headless-shell
download hangs on this machine, run with the installed Google Chrome:

```bash
cd compass/e2e-tests && PW_CHANNEL=chrome npx playwright test tests/compass --reporter=line
```

Match the existing style: one `describe` per feature, test ids from the feature
file, `{ timeout: 15_000 }` on the first assertion of a report page, and
`expect.poll` rather than a bare `count()`.

## Profile

Never reason from a screenshot of a flame graph. Take the numbers yourself:

```bash
cd compass/e2e-tests && PW_CHANNEL=chrome node perf/measure.mjs /reports
```

It opens the route in Chrome with the cache disabled through the DevTools
protocol and prints load, LCP, long tasks, script time, heap, DOM nodes and
the transfer size of every script, largest first. Pass an absolute URL to
measure dev.evidura.ai. Add `--trace` to write a DevTools trace file, and
`--json` to keep the raw numbers. Compare against the budgets in
`compass/app/bundle-budget.json`; a route over budget fails CI through
`scripts/check-bundle-size.mjs`.

## Evidence

- Spec output pasted into the report, or `--trace on` with the trace under
  `compass/e2e-tests/test-results/` (gitignored).
- Screenshots via `computer` `screenshot` go to the session scratchpad, never
  into the repo.
- For a copy or data claim, the DOM query result from `javascript_tool`.

## Cleanup

`preview_stop` closes the attached browser. Stop the app only if this session
started it: find its PID with `lsof -ti :3001` and terminate that process.
Postgres can stay up; `scripts/dev-db.sh stop` if needed.

## Helpers

| Helper | Where | Notes |
| --- | --- | --- |
| `signUserUp`, `logUserIn`, `createRandomUser` | `compass/e2e-tests/tests/utils.ts` | Wasp forms; login waits for `**/reports` |
| `DFVA_MOCK` | `compass/app/src/compass/assessmentService.ts` | Default true; only `/assess` reads it |
| `SKIP_EMAIL_VERIFICATION_IN_DEV=true` | `compass/app/.env.server` | Required for signup to complete locally; CI sets it |
| Unit tests | `cd compass/app && npm run check` | prettier, eslint, tsc, vitest: what CI's unit-tests job runs |
| Pipeline guards | `npm --prefix scripts run dfva:check` | Report and data drift |
| CI repair | `/fix-ci` | Reads the failing job, reproduces locally, fixes one thing |

## Maintain

The feature files name test ids and routes verbatim.
`compass/app/src/compass/__tests__/featureMapDrift.test.ts` fails when a named
test id no longer exists in `compass/app/src` or a route is not declared in
`main.wasp.ts`. When you add a page or rename a test id, update the feature
file in the same commit. When you add a feature, add a file with the four
sections and a row in `features/README.md`.

After you edit this skill or a feature file, run `/regression-test` against
[evals.md](evals.md): one cold subagent per task, scored on the task's checklist.
