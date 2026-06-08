# DFVA App — Next Steps (2026-06-08)

## What was built (7/8 tasks complete, all committed)

| # | Task | Commit | Status |
|---|------|--------|--------|
| 1 | Extract `sharedProgramData.ts` — single source of truth for 6 programs | `714cdd7` + `6a34f8b` fix | ✅ |
| 2 | Add `AssessmentJob` model to Prisma schema | `b03a205` | ✅ |
| 3 | Add `DFVA_MOCK` env var for mock/real service switching | `2e44739` | ✅ |
| 4 | Create swappable service layer (`assessmentService.ts`, `mockAssessmentService.ts`, `realAssessmentService.ts`) | `8e205b2` | ✅ |
| 5 | Create Wasp operations (`assessProgram` action, `getAssessmentJobs`/`getAssessmentJob` queries) + `main.wasp` declarations | `a146cb7` | ✅ |
| 6 | Rewire `AssessorPage.tsx` to use `useAction`/`useQuery` instead of local state | `580470c` | ✅ |
| 7 | De-boilerplate meta tags + `CLAUDE.md`/`AGENTS.md` | `388f853` | ✅ |
| 8 | End-to-end smoke test | — | ⚠️ Blocked |

**14 files changed, +636 / -287 lines.**

## Architecture summary

```
┌─────────────────┐     ┌──────────────────────┐
│  AssessorPage   │────▶│  useAction(assess)   │
│  (React)        │     │  useQuery(jobs)      │
└─────────────────┘     └──────────┬───────────┘
                                   │ Wasp operation
                          ┌────────▼───────────┐
                          │  assessProgram()    │
                          │  → AssessmentJob    │
                          │  → getAssessmentSvc │
                          └────────┬───────────┘
                                   │ DFVA_MOCK?
                    ┌──────────────┴──────────────┐
                    ▼                              ▼
         MockAssessmentService         RealAssessmentService
         (hardcoded 6 programs)        (throws "not implemented")
```

**Data flow:**
1. User pastes URL → `assessProgram` action creates `AssessmentJob` (status: `processing`)
2. Service runs — mock matches URL to known program, returns assessment result
3. Job updated with score, risk band, dimensions, thresholds, report JSON → status: `complete`
4. UI refetches `getAssessmentJobs` → shows complete card with "View Report" link
5. "View Report" links to `/reports/:slug` (the existing `ReportDetailPage`)

## What remains (blocker: migration)

### 1. Run the Prisma migration

The `AssessmentJob` model exists in `schema.prisma` but has no corresponding database table. You need to create the migration:

```bash
# Step A: Start the managed database (Docker must be running)
cd /Users/djmulholland/Documents/SXD-Github/DFVA/compass/app
wasp start db

# Step B: Wait for PostgreSQL to be ready
lsof -i :5432   # should show postgres LISTEN

# Step C: Run the migration (pipe the name to avoid interactive prompt)
echo "add_assessment_job" | wasp db migrate-dev
```

**Docker daemon must be running.** Verify with `docker ps`. If it fails with "Cannot connect to the Docker daemon", restart Docker Desktop.

**DATABASE_URL** is already set in `.env.server`:
```
DATABASE_URL=postgresql://postgresWaspDevUser:postgresWaspDevPass@localhost:5432/OpenSaaS-fc3b171ec3
```

If the migration fails with auth errors, see the pg_hba.conf trust fix in the `wasp-opensaas` skill.

### 2. Start the app

```bash
# Kill anything on port 3000 first (Open WebUI is a common culprit)
docker stop open-webui  # if running
# Or: lsof -i :3000 and kill the PID

# Start the dev server
cd /Users/djmulholland/Documents/SXD-Github/DFVA/compass/app
wasp start
```

Wait for both server (port 3001) and client (port 3000) to come up. The Prisma warning ("schema does not match your database") should be gone after step 1.

### 3. Smoke test the flow

Once the app is running at `http://localhost:3000`:

| Step | Action | Expected result |
|------|--------|-----------------|
| 1 | Visit `/assess` | Page loads with URL input + empty history |
| 2 | Submit `https://handbook.unimelb.edu.au/2025/courses/b-des` | Card appears with "Complete" badge + "View Report" link |
| 3 | Click "View Report" | Navigates to `/reports/dfva-b-des` showing the full assessment |
| 4 | Submit `https://handbook.unimelb.edu.au/2025/courses/mc-is` | Card appears with score 18, HIGH RISK |
| 5 | Submit an unknown URL (e.g., `https://example.com/courses/test`) | Falls back to generic "HIGH RISK" with score 18 |
| 6 | Refresh the page | History persists (loaded from DB via `getAssessmentJobs`) |
| 7 | Visit `/reports` | Shows the 6 static program reports (unchanged) |

### 4. Commit and push

There are **8 unpushed commits** on `main` (ahead of `origin/main` by 8). After the smoke test passes:

```bash
cd /Users/djmulholland/Documents/SXD-Github/DFVA
git push origin main
```

There are also **unstaged changes** (9 files) and **untracked files** (`.claude/`, `.hermes/`, `docs/compass-artifacts/`, etc.) that should be reviewed — some of these are from earlier work sessions.

## Known limitations

| Limitation | Detail | Mitigation |
|------------|--------|------------|
| **Handbook scraper blocked** | Anti-bot protection on handbook.unimelb.edu.au prevents automated fetching | `DFVA_MOCK=true` is the only working mode for now |
| **No auth on assess page** | `AssessRoute` has no `authRequired: true` — anyone can submit assessments | Add `authRequired: true` when ready for production |
| **Mock only matches exact URLs** | URL must match exactly (including `/2025/`) to get a known-program result | The example buttons on the page provide correct URLs |
| **Fallback is generic** | Unknown URLs get a default score of 18 / HIGH RISK with placeholder content | Intended for demo — real pipeline would do actual analysis |
| **Migration is manual** | `wasp db migrate-dev` requires interactive name input | Pipe the name: `echo "name" \| wasp db migrate-dev` |

## Next features (TBD)

These came up in the session but weren't scoped:

1. **Polling for real assessments** — when the real pipeline exists, jobs created with `status: queued` need a background worker to pick them up
2. **Auth on assess** — add `authRequired: true` to `AssessRoute`
3. **Admin review** — let admins override scores / risk bands
4. **Export** — PDF export of assessment reports
5. **Unblock the handbook scraper** — the 6 blocked programs in `scripts/progress.json` need an alternative data source
