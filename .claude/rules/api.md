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

- Public: `/` landing, `/assess` (public; post-login lands on `/reports` since 2026-09-02), `/reports` (v4-first index, `v4/V4ReportsPage.tsx`), `/reports/:reportSlug` (dispatcher `ReportPage.tsx`: program code → v4 Durability Report, `dfva-*` slug → archived v1 workspace), `/reports/archive` (old v1 index; the v2/v3/v3.1 report routes and `/insights/v1` were deleted 2026-09-02 — link with `reportLinks.programReportPath`), `/insights`, `/insights/portfolio`, `/insights/faculty[/:facultySlug]`, `/pricing`, `/developers`, `/developers/compare`
- Auth-required: `/account`, `/checkout`, `/file-upload`, `/admin/*`
- Auth pages: `/login`, `/signup`, password-reset + email-verification routes

## Auth

- Wasp email/password auth (`main.wasp.ts` auth block); email content in `src/auth/email-and-pass/emails.ts`; success → `/reports`

## MCP Server (compass/mcp)

Tools: `get_assessment`, `query_assessments`, `cross_program_analysis`, `get_methodology`, `list_programs`, `get_report`. Data source: `dfva/source/assessments.json`.
