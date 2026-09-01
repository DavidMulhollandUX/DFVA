# API Surface

Everything below is declared in `compass/app/main.wasp.ts` and implemented under `compass/app/src/`.
Do NOT list or edit files under `compass/app/.wasp/out/` — those are generated from these declarations.

## Wasp Operations (RPC — the primary "API")

COMPASS (`src/compass/operations.ts`):

- **Actions:** `assessProgram`, `updateCourseIntervention`, `uploadAlumniData`, `generateApiKey`, `revokeApiKey`
- **Queries:** `getAssessmentJobs`, `getAssessmentJob`, `getSyllabusMap`, `getCourseInterventions`, `getValidationSignals`, `getCompetitiveEvents`, `getMarketWindowStatus`, `listApiKeys`

OpenSaaS template (user/payment/files/analytics):

- `getPaginatedUsers`, `updateIsUserAdminById` (`src/user/operations.ts`)
- `getCustomerPortalUrl`, `generateCheckoutSession` (`src/payment/operations.ts`)
- `createFileUploadUrl`, `addFileToDb`, `getAllFilesByUser`, `getDownloadFileSignedURL`, `deleteFile` (`src/file-upload/operations.ts`)
- `getDailyStats` (`src/analytics/operations.ts`)

## HTTP APIs

- `POST /payments-webhook` → `src/payment/webhook.ts`
- Public developer API (feat-009): API-key auth in `src/compass/api/auth.ts`; keys managed via the operations above; UI at `/developers`

## Jobs (PgBoss)

- `dailyStatsJob` — hourly, `src/analytics/stats.ts`
- `marketDriftJob` — weekly (Sun 00:00), `src/compass/marketDrift.ts`

## Pages / Routes (client)

- Public: `/` landing, `/assess` (also the post-login redirect), `/reports` (v4-first index, `v4/V4ReportsPage.tsx`), `/reports/:reportSlug` (dispatcher `ReportPage.tsx`: program code → v4 Durability Report, `dfva-*` slug → archived v1 workspace), `/reports/archive` (old v1 index; retired v2/v3/v3.1/v4 `/insights/...` report routes still resolve but nothing links to them — use `reportLinks.programReportPath`), `/insights`, `/insights/portfolio`, `/insights/faculty[/:facultySlug]`, `/pricing`, `/developers`, `/developers/compare`
- Auth-required: `/account`, `/checkout`, `/file-upload`, `/admin/*`
- Auth pages: `/login`, `/signup`, password-reset + email-verification routes

## Auth

- Wasp email/password auth (`main.wasp.ts` auth block); email content in `src/auth/email-and-pass/emails.ts`; success → `/assess`

## MCP Server (compass/mcp)

Tools: `get_assessment`, `query_assessments`, `cross_program_analysis`, `get_methodology`, `list_programs`, `get_report`. Data source: `dfva/source/assessments.json`.

## New Routes (added 2026-07-05)
- `compass/app/.wasp/out/sdk/wasp/api/events.ts`
- `compass/app/.wasp/out/sdk/wasp/api/index.ts`
- `compass/app/.wasp/out/sdk/wasp/server/api/index.ts`
- `compass/app/.wasp/out/sdk/wasp/src/compass/api/auth.ts`
- `compass/app/.wasp/out/server/src/routes/apis/index.ts`
- `compass/app/.wasp/out/server/src/routes/auth/index.js`
- `compass/app/.wasp/out/server/src/routes/auth/logout.ts`
- `compass/app/.wasp/out/server/src/routes/auth/me.ts`
- `compass/app/.wasp/out/server/src/routes/index.js`
- `compass/app/.wasp/out/server/src/routes/operations/addFileToDb.js`
- `compass/app/.wasp/out/server/src/routes/operations/assessProgram.js`
- `compass/app/.wasp/out/server/src/routes/operations/createFileUploadUrl.js`
- `compass/app/.wasp/out/server/src/routes/operations/deleteFile.js`
- `compass/app/.wasp/out/server/src/routes/operations/generateApiKey.js`
- `compass/app/.wasp/out/server/src/routes/operations/generateCheckoutSession.js`
- `compass/app/.wasp/out/server/src/routes/operations/getAllFilesByUser.js`
- `compass/app/.wasp/out/server/src/routes/operations/getAssessmentJob.js`
- `compass/app/.wasp/out/server/src/routes/operations/getAssessmentJobs.js`
- `compass/app/.wasp/out/server/src/routes/operations/getCompetitiveEvents.js`
- `compass/app/.wasp/out/server/src/routes/operations/getCourseInterventions.js`
- `compass/app/.wasp/out/server/src/routes/operations/getCustomerPortalUrl.js`
- `compass/app/.wasp/out/server/src/routes/operations/getDailyStats.js`
- `compass/app/.wasp/out/server/src/routes/operations/getDownloadFileSignedURL.js`
- `compass/app/.wasp/out/server/src/routes/operations/getMarketWindowStatus.js`
- `compass/app/.wasp/out/server/src/routes/operations/getPaginatedUsers.js`
- `compass/app/.wasp/out/server/src/routes/operations/getSyllabusMap.js`
- `compass/app/.wasp/out/server/src/routes/operations/getValidationSignals.js`
- `compass/app/.wasp/out/server/src/routes/operations/index.js`
- `compass/app/.wasp/out/server/src/routes/operations/listApiKeys.js`
- `compass/app/.wasp/out/server/src/routes/operations/revokeApiKey.js`
- `compass/app/.wasp/out/server/src/routes/operations/updateCourseIntervention.js`
- `compass/app/.wasp/out/server/src/routes/operations/updateIsUserAdminById.js`
- `compass/app/.wasp/out/server/src/routes/operations/uploadAlumniData.js`
- `compass/app/.wasp/out/src/compass/api/auth.ts`
- `compass/app/src/compass/api/auth.ts`

## New Routes (added 2026-07-05)
- `compass/app/.wasp/out/server/src/views/wrong-port.ts`

## New Routes (added 2026-07-05)
- `compass/app/.wasp/out/user/src/compass/api/auth.d.ts`
- `compass/app/.wasp/out/user/src/compass/api/auth.js`

## New Routes (added 2026-07-06)
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/sdk/wasp/api/events.ts`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/sdk/wasp/api/index.ts`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/sdk/wasp/server/api/index.ts`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/sdk/wasp/src/compass/api/auth.ts`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/apis/index.ts`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/auth/index.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/auth/logout.ts`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/auth/me.ts`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/index.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/addFileToDb.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/assessProgram.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/createFileUploadUrl.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/deleteFile.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/generateApiKey.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/generateCheckoutSession.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/getAllFilesByUser.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/getAssessmentJob.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/getAssessmentJobs.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/getCompetitiveEvents.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/getCourseInterventions.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/getCustomerPortalUrl.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/getDailyStats.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/getDownloadFileSignedURL.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/getMarketWindowStatus.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/getPaginatedUsers.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/getSyllabusMap.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/getValidationSignals.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/index.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/listApiKeys.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/revokeApiKey.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/updateCourseIntervention.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/updateIsUserAdminById.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/server/src/routes/operations/uploadAlumniData.js`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/.wasp/out/src/compass/api/auth.ts`
- `.claude/worktrees/intelligent-easley-01af41/compass/app/src/compass/api/auth.ts`

## New Routes (added 2026-07-11)
- `design-system/react/.design-sync/previews/BandBadge.tsx`
- `design-system/react/.design-sync/previews/Button.tsx`
- `design-system/react/.design-sync/previews/Card.tsx`
- `design-system/react/.design-sync/previews/ScoreDisplay.tsx`
- `design-system/react/.design-sync/previews/StrataMark.tsx`
- `design-system/react/.design-sync/previews/ValidationSignalCard.tsx`
- `design-system/react/ds-bundle/_preview/BandBadge.js`
- `design-system/react/ds-bundle/_preview/Button.js`
- `design-system/react/ds-bundle/_preview/Card.js`
- `design-system/react/ds-bundle/_preview/ScoreDisplay.js`
- `design-system/react/ds-bundle/_preview/StrataMark.js`
- `design-system/react/ds-bundle/_preview/ValidationSignalCard.js`

## New Routes (added 2026-08-07)
- `compass/app/.wasp/out/server/src/routes/operations/addFragilityIncident.js`
- `compass/app/.wasp/out/server/src/routes/operations/assessT1Programs.js`
- `compass/app/.wasp/out/server/src/routes/operations/getFragilityIncidents.js`
- `compass/app/.wasp/out/server/src/routes/operations/getT1EnrolmentTrends.js`
- `compass/app/.wasp/out/server/src/routes/operations/getT1ImportJob.js`
- `compass/app/.wasp/out/server/src/routes/operations/getT1Portfolio.js`
- `compass/app/.wasp/out/server/src/routes/operations/importT1Data.js`

## New Routes (added 2026-08-14)
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/src/compass/api/auth.ts`

## New Routes (added 2026-08-14)
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/sdk/wasp/api/events.ts`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/sdk/wasp/api/index.ts`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/sdk/wasp/server/api/index.ts`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/sdk/wasp/src/compass/api/auth.ts`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/apis/index.ts`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/auth/index.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/auth/logout.ts`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/auth/me.ts`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/index.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/addFileToDb.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/addFragilityIncident.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/assessProgram.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/assessT1Programs.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/createFileUploadUrl.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/deleteFile.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/generateApiKey.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/generateCheckoutSession.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/getAllFilesByUser.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/getAssessmentJob.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/getAssessmentJobs.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/getCompetitiveEvents.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/getCourseInterventions.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/getCustomerPortalUrl.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/getDailyStats.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/getDownloadFileSignedURL.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/getFragilityIncidents.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/getMarketWindowStatus.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/getPaginatedUsers.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/getSyllabusMap.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/getT1EnrolmentTrends.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/getT1ImportJob.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/getT1Portfolio.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/getValidationSignals.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/importT1Data.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/index.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/listApiKeys.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/revokeApiKey.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/updateCourseIntervention.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/updateIsUserAdminById.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/routes/operations/uploadAlumniData.js`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/server/src/views/wrong-port.ts`

## New Routes (added 2026-08-14)
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/user/src/compass/api/auth.d.ts`
- `.claude/worktrees/recursing-perlman-8f5e37/compass/app/.wasp/out/user/src/compass/api/auth.js`

## New Routes (added 2026-08-17)
- `.claude/worktrees/clever-wozniak-719024/compass/app/src/compass/api/auth.ts`

## New Routes (added 2026-08-23)
- `.claude/worktrees/v4-reports-12/compass/app/src/compass/api/auth.ts`
- `.claude/worktrees/v4-reports-12/design-system/react/ds-bundle/_preview/BandBadge.js`
- `.claude/worktrees/v4-reports-12/design-system/react/ds-bundle/_preview/Button.js`
- `.claude/worktrees/v4-reports-12/design-system/react/ds-bundle/_preview/Card.js`
- `.claude/worktrees/v4-reports-12/design-system/react/ds-bundle/_preview/ScoreDisplay.js`
- `.claude/worktrees/v4-reports-12/design-system/react/ds-bundle/_preview/StrataMark.js`
- `.claude/worktrees/v4-reports-12/design-system/react/ds-bundle/_preview/ValidationSignalCard.js`

## New Routes (added 2026-08-23)
- `.claude/skills/dfva-report-review/SKILL.md`
- `dfva/skills/dfva-report-review/SKILL.md`

## New Routes (added 2026-08-25)
- `.agents/skills/dfva-report-review/SKILL.md`
- `.claude/worktrees/agitated-bose-42aeda/.agents/skills/dfva-report-review/SKILL.md`
- `.claude/worktrees/agitated-bose-42aeda/.claude/skills/dfva-report-review/SKILL.md`
- `.claude/worktrees/agitated-bose-42aeda/compass/app/src/compass/api/auth.ts`
- `.claude/worktrees/agitated-bose-42aeda/design-system/react/ds-bundle/_preview/BandBadge.js`
- `.claude/worktrees/agitated-bose-42aeda/design-system/react/ds-bundle/_preview/Button.js`
- `.claude/worktrees/agitated-bose-42aeda/design-system/react/ds-bundle/_preview/Card.js`
- `.claude/worktrees/agitated-bose-42aeda/design-system/react/ds-bundle/_preview/ScoreDisplay.js`
- `.claude/worktrees/agitated-bose-42aeda/design-system/react/ds-bundle/_preview/StrataMark.js`
- `.claude/worktrees/agitated-bose-42aeda/design-system/react/ds-bundle/_preview/ValidationSignalCard.js`

## New Routes (added 2026-08-29)
- `.claude/worktrees/insights-v4/.agents/skills/dfva-report-review/SKILL.md`
- `.claude/worktrees/insights-v4/.claude/skills/dfva-report-review/SKILL.md`
- `.claude/worktrees/insights-v4/compass/app/src/compass/api/auth.ts`
- `.claude/worktrees/insights-v4/design-system/react/ds-bundle/_preview/BandBadge.js`
- `.claude/worktrees/insights-v4/design-system/react/ds-bundle/_preview/Button.js`
- `.claude/worktrees/insights-v4/design-system/react/ds-bundle/_preview/Card.js`
- `.claude/worktrees/insights-v4/design-system/react/ds-bundle/_preview/ScoreDisplay.js`
- `.claude/worktrees/insights-v4/design-system/react/ds-bundle/_preview/StrataMark.js`
- `.claude/worktrees/insights-v4/design-system/react/ds-bundle/_preview/ValidationSignalCard.js`

## New Routes (added 2026-09-01)
- `.claude/worktrees/jobads-fix/.agents/skills/dfva-report-review/SKILL.md`
- `.claude/worktrees/jobads-fix/.claude/skills/dfva-report-review/SKILL.md`
- `.claude/worktrees/jobads-fix/compass/app/src/compass/api/auth.ts`
- `.claude/worktrees/jobads-fix/design-system/react/ds-bundle/_preview/BandBadge.js`
- `.claude/worktrees/jobads-fix/design-system/react/ds-bundle/_preview/Button.js`
- `.claude/worktrees/jobads-fix/design-system/react/ds-bundle/_preview/Card.js`
- `.claude/worktrees/jobads-fix/design-system/react/ds-bundle/_preview/ScoreDisplay.js`
- `.claude/worktrees/jobads-fix/design-system/react/ds-bundle/_preview/StrataMark.js`
- `.claude/worktrees/jobads-fix/design-system/react/ds-bundle/_preview/ValidationSignalCard.js`
- `.claude/worktrees/serene-feistel-14a7c4/compass/app/src/compass/api/auth.ts`
- `.claude/worktrees/stoic-hopper-1d46b6/.agents/skills/dfva-report-review/SKILL.md`
- `.claude/worktrees/stoic-hopper-1d46b6/.claude/skills/dfva-report-review/SKILL.md`
- `.claude/worktrees/stoic-hopper-1d46b6/compass/app/src/compass/api/auth.ts`
- `.claude/worktrees/stoic-hopper-1d46b6/design-system/react/ds-bundle/_preview/BandBadge.js`
- `.claude/worktrees/stoic-hopper-1d46b6/design-system/react/ds-bundle/_preview/Button.js`
- `.claude/worktrees/stoic-hopper-1d46b6/design-system/react/ds-bundle/_preview/Card.js`
- `.claude/worktrees/stoic-hopper-1d46b6/design-system/react/ds-bundle/_preview/ScoreDisplay.js`
- `.claude/worktrees/stoic-hopper-1d46b6/design-system/react/ds-bundle/_preview/StrataMark.js`
- `.claude/worktrees/stoic-hopper-1d46b6/design-system/react/ds-bundle/_preview/ValidationSignalCard.js`

## New Routes (added 2026-09-01)
- `.claude/worktrees/agent-a24c423a2b8729942/.agents/skills/dfva-report-review/SKILL.md`
- `.claude/worktrees/agent-a24c423a2b8729942/.claude/skills/dfva-report-review/SKILL.md`
- `.claude/worktrees/agent-a24c423a2b8729942/compass/app/src/compass/api/auth.ts`
- `.claude/worktrees/agent-a24c423a2b8729942/design-system/react/ds-bundle/_preview/BandBadge.js`
- `.claude/worktrees/agent-a24c423a2b8729942/design-system/react/ds-bundle/_preview/Button.js`
- `.claude/worktrees/agent-a24c423a2b8729942/design-system/react/ds-bundle/_preview/Card.js`
- `.claude/worktrees/agent-a24c423a2b8729942/design-system/react/ds-bundle/_preview/ScoreDisplay.js`
- `.claude/worktrees/agent-a24c423a2b8729942/design-system/react/ds-bundle/_preview/StrataMark.js`
- `.claude/worktrees/agent-a24c423a2b8729942/design-system/react/ds-bundle/_preview/ValidationSignalCard.js`
- `.claude/worktrees/agent-a310939f64194ca6c/compass/app/src/compass/api/auth.ts`
- `.claude/worktrees/agent-a4596bda9c82129ca/compass/app/src/compass/api/auth.ts`
- `.claude/worktrees/agent-a486e6a755df47c9b/.agents/skills/dfva-report-review/SKILL.md`
- `.claude/worktrees/agent-a486e6a755df47c9b/.claude/skills/dfva-report-review/SKILL.md`
- `.claude/worktrees/agent-a486e6a755df47c9b/compass/app/src/compass/api/auth.ts`
- `.claude/worktrees/agent-a486e6a755df47c9b/design-system/react/ds-bundle/_preview/BandBadge.js`
- `.claude/worktrees/agent-a486e6a755df47c9b/design-system/react/ds-bundle/_preview/Button.js`
- `.claude/worktrees/agent-a486e6a755df47c9b/design-system/react/ds-bundle/_preview/Card.js`
- `.claude/worktrees/agent-a486e6a755df47c9b/design-system/react/ds-bundle/_preview/ScoreDisplay.js`
- `.claude/worktrees/agent-a486e6a755df47c9b/design-system/react/ds-bundle/_preview/StrataMark.js`
- `.claude/worktrees/agent-a486e6a755df47c9b/design-system/react/ds-bundle/_preview/ValidationSignalCard.js`
- `.claude/worktrees/agent-a585048c3490720eb/compass/app/src/compass/api/auth.ts`
- `.claude/worktrees/agent-a6ed650661d51cab0/compass/app/src/compass/api/auth.ts`
- `.claude/worktrees/agent-a8781e30e16f55e0c/compass/app/src/compass/api/auth.ts`
- `.claude/worktrees/agent-a8fccba1ac4186bea/compass/app/src/compass/api/auth.ts`
- `.claude/worktrees/agent-aa5139e1db2a51104/compass/app/src/compass/api/auth.ts`
- `.claude/worktrees/agent-ab028ee2da3432133/compass/app/src/compass/api/auth.ts`
- `.claude/worktrees/agent-acc322961190b22d1/.agents/skills/dfva-report-review/SKILL.md`
- `.claude/worktrees/agent-acc322961190b22d1/.claude/skills/dfva-report-review/SKILL.md`
- `.claude/worktrees/agent-acc322961190b22d1/compass/app/src/compass/api/auth.ts`
- `.claude/worktrees/agent-acc322961190b22d1/design-system/react/ds-bundle/_preview/BandBadge.js`
- `.claude/worktrees/agent-acc322961190b22d1/design-system/react/ds-bundle/_preview/Button.js`
- `.claude/worktrees/agent-acc322961190b22d1/design-system/react/ds-bundle/_preview/Card.js`
- `.claude/worktrees/agent-acc322961190b22d1/design-system/react/ds-bundle/_preview/ScoreDisplay.js`
- `.claude/worktrees/agent-acc322961190b22d1/design-system/react/ds-bundle/_preview/StrataMark.js`
- `.claude/worktrees/agent-acc322961190b22d1/design-system/react/ds-bundle/_preview/ValidationSignalCard.js`
- `.claude/worktrees/goal-3items/.agents/skills/dfva-report-review/SKILL.md`
- `.claude/worktrees/goal-3items/.claude/skills/dfva-report-review/SKILL.md`
- `.claude/worktrees/goal-3items/compass/app/src/compass/api/auth.ts`
- `.claude/worktrees/goal-3items/design-system/react/ds-bundle/_preview/BandBadge.js`
- `.claude/worktrees/goal-3items/design-system/react/ds-bundle/_preview/Button.js`
- `.claude/worktrees/goal-3items/design-system/react/ds-bundle/_preview/Card.js`
- `.claude/worktrees/goal-3items/design-system/react/ds-bundle/_preview/ScoreDisplay.js`
- `.claude/worktrees/goal-3items/design-system/react/ds-bundle/_preview/StrataMark.js`
- `.claude/worktrees/goal-3items/design-system/react/ds-bundle/_preview/ValidationSignalCard.js`
