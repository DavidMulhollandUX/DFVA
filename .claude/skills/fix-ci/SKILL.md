---
name: fix-ci
description: Find the failing GitHub Actions check on the current branch or PR, read the first actionable error, reproduce it locally, and apply the smallest fix. Use when CI is red.
---

# Fix CI

Adapted from cursor-team-kit `fix-ci` (MIT). Four steps, one failure at a time.

1. **Find the failure.** For a PR: `gh pr checks --json name,bucket,state,workflow,link`.
   For a branch without a PR: `gh run list --branch <branch> --limit 5`, then
   `gh run view <id> --log-failed`.
2. **Read the first actionable error** from the job log. Ignore cascades that
   follow it.
3. **Reproduce locally before touching code.** The jobs map to these commands:

   | Job | Local command |
   | --- | --- |
   | `unit-tests` | `cd compass/app && npm run check` |
   | `build` | `compass/app/wasp-build.sh` (never a bare `wasp build`) |
   | `mcp` | `cd compass/mcp && npm run build && npm test` |
   | `completeness` | `npm --prefix scripts run dfva:completeness && npm --prefix scripts run dfva:report-lint && npm --prefix scripts run dfva:content-check` |
   | `DFVA drift check` | `npm --prefix scripts test && npm --prefix scripts run dfva:check` |
   | `E2E tests` | app running, then `cd compass/e2e-tests && npx playwright test` |

   A fix that was not reproduced is a guess; do not push it.
4. **Apply the smallest safe fix**, run the same local command, commit with a
   conventional message naming the job, push, and re-check with `gh`.

Stop and report after three fix cycles on the same job. Keep `gh` as the source
of truth for the overall state; the report lists the job, the root error, each
fix in order, and the current status.
