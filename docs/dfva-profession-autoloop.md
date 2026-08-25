# DFVA profession research autoloop

## Purpose

The Hermes cron job `DFVA Profession Deep Research Autoloop` replaces the
synthetic profession corpus incrementally. Each scheduled run completes one
profession and the next scheduled run automatically takes the next pending SOC.

## Durable state

- Queue: `data/professions/research-queue.json`
- Queue helper: `scripts/dfva-profession-queue.py`
- Completion marker: `researchMethod: empirical-five-lane-v1`
- Existing synthetic files do **not** count as complete merely because they
  exist. The helper reconciles the marker with the on-disk evidence log.

Commands:

```bash
python3 scripts/dfva-profession-queue.py status
python3 scripts/dfva-profession-queue.py next
python3 scripts/dfva-profession-queue.py done 13-2011 --note "commit <sha>"
python3 scripts/dfva-profession-queue.py retry 13-2011 --note "transient source failure"
python3 scripts/dfva-profession-queue.py block 13-2011 --note "requires user authentication"
```

## Run contract

One run processes exactly one pending SOC. It must:

1. Read `docs/dfva-profession-deep-research.md` and
   `docs/tasks/dfva-profession-discourse.SKILL.md`.
2. Fetch all five evidence lanes. Factiva is omitted in unattended runs as
   required by constraint 3; public trade press remains available. Adzuna AU is
   available through `ADZUNA_APP_ID` and `ADZUNA_API_KEY` in Hermes' private
   environment.
3. Run the three-lens refute pass.
4. Write `<soc>.json`, `<soc>/evidence.md`, raw payloads, and the committed
   sha256 manifest. Add the empirical completion marker.
5. Validate URLs, quotes, counts, source presence, and refuted flags.
6. Commit only profession-loop-owned files to branch
   `feat/profession-deep-research`. Do not stage unrelated concurrent changes.
7. Mark the SOC done only after the commit is verified in `git show`. Transient
   failures are marked retry; permanent/authentication blockers are marked
   blocked.

## Schedule and chaining

The job runs every four hours. The recurring tick is the chain: each fresh run
reads the same durable queue and selects the next unfinished SOC. Runs use the
repository as `workdir`, so Hermes serialises them with other workdir jobs.

At 248 remaining SOCs, the nominal duration is approximately 41 days at six
successful runs per day. The queue is resumable after restarts, rate limits, or
model failures.

## Factiva

An authenticated browser session is attended-only and cannot be assumed by a
fresh unattended cron session. Scheduled runs must record the Factiva omission.
A later attended refresh can improve L3 claims without invalidating the rest of
the ledger.

## Finalisation

When no pending SOC remains, the job runs propagation and the four acceptance
commands:

```bash
npm --prefix scripts run dfva:gen-content
npm --prefix scripts run dfva:report-lint
npm --prefix scripts run dfva:report-prose
npm --prefix scripts run dfva:check
```

If they pass, the job reports completion. It must not claim completion while
blocked SOCs or failed verification gates remain.
