---
id: feat-010
name: "Data Portability as Competitive Weapon — Second Coursedog Migration Confirms Universal Pain"
status: draft
created: 2026-06-29
project: DFVA
priority: high
score: 8
type: competitor_weakness
source: research-loop social
---

# Feature: Data Portability as Competitive Weapon

## Description

Two independently confirmed Coursedog migrations — Modern Campus → Coursedog (Mar-Apr 2026, 9 PRs) and Mercy University 25Live → Coursedog (June 27, 2026) — both required custom Python/C# data extraction scripts because legacy curriculum platforms provide zero structured data export. Universities must scrape their own data before migrating. This is a confirmed universal pain point in the curriculum management market.

DFVA's architecture — assessment results stored as structured JSON in `AssessmentJob.dimensions`, `AssessmentJob.reportJson`, `AssessmentJob.syllabusJson`, backed by typed Zod schemas in `syllabusSchema.ts` — is the antidote. This feature adds comprehensive data portability: bulk JSON/CSV export of all assessment results, structured import of external program data for batch assessment, and a public-facing Data Portability Guarantee page that contrasts DFVA's clean export with the competitor lock-in documented in real GitHub migration projects.

The competitive positioning is direct: "Coursedog and Modern Campus store your degree data as HTML. DFVA stores it as structured JSON you can export anytime. No scraping required. No lock-in."

## Vibe

Liberating, principled — DFVA treats your data as yours. The export button is prominent, the formats are documented, and the competitive contrast is self-evident. This isn't just a feature; it's a statement about who DFVA is.

## User Stories

- As a **university IT architect evaluating DFVA**, I want to see a "Data Portability Guarantee" page with side-by-side comparison of DFVA's structured JSON export vs. competitors' HTML-only storage so that I can present the lock-in risk to my procurement committee.
- As a **program director**, I want to export all my program's assessment results (dimension scores, recommendations, syllabus maps) as a single structured JSON or CSV file so that I can integrate DFVA data into our internal curriculum review dashboards.
- As an **institutional API consumer**, I want to fetch a program's full assessment data via REST API with the same structure that the bulk export provides so that I can automate programmatic health monitoring across our degree portfolio.
- As a **DFVA product manager**, I want the export flow to be one-click from the assessment detail page so that the data portability promise is visible and immediately testable — not buried in settings.
- As a **DFVA competitive intelligence lead**, I want the Data Portability page to cite real, verifiable evidence (GitHub repo names, PR counts, dates) of competitor lock-in so that every university prospect can independently verify the claim.

## Technical Design

### Architecture

Data portability spans three layers: the existing structured assessment store (AssessmentJob + typed schemas), a new export/import service layer, and a presentation layer (export UI + public guarantee page).

```
┌──────────────────────────────────────────────────────────────┐
│  COMPETITOR LOCK-IN (confirmed by 2 GitHub migration repos)  │
│  Modern Campus: zero export → manual Chrome HTML save        │
│  Coursedog: freeform HTML blocks in requirement fields       │
│  25Live: proprietary format, zero structured export          │
│  → 6+ weeks of custom Python/C# scraping required           │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  DFVA DATA PORTABILITY                                       │
│                                                              │
│  EXPORT LAYER (new)                                          │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────┐   │
│  │ JSON export  │  │  CSV export   │  │  REST API export │   │
│  │ (full struct)│  │ (flat dims)  │  │ (/api/v1/export) │   │
│  └──────┬───────┘  └──────┬───────┘  └────────┬──────────┘   │
│         │                 │                    │              │
│         ▼                 ▼                    ▼              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │           ExportService (new)                        │    │
│  │  - formatAssessmentForExport(jobId) → ExportPayload  │    │
│  │  - formatAssessmentsForCSV(jobIds) → CSV string      │    │
│  │  - buildExportPayload(job, includeSyllabus)          │    │
│  └──────────────────────┬───────────────────────────────┘    │
│                         │                                    │
│  STORAGE (existing)     ▼                                    │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  AssessmentJob                                       │    │
│  │  ├── dimensions: Json?   ← Zod-typed DimensionScore[]│    │
│  │  ├── reportJson: Json?   ← ProgramReport structure   │    │
│  │  ├── syllabusJson: Json? ← Zod-typed SyllabusMap     │    │
│  │  ├── score, riskBand, programName, courseCode        │    │
│  │  └── thresholds: Json?                               │    │
│  │                                                      │    │
│  │  AssessmentSnapshot (versioned history)              │    │
│  │  InstitutionalAssessment (cross-institutional)       │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│  IMPORT LAYER (new)                                          │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  ImportService (new)                                 │    │
│  │  - importProgramsFromJSON(json) → AssessmentJob[]    │    │
│  │  - validateImportPayload(json) → ValidationResult    │    │
│  │  - mapExternalToDFVA(external) → DFVA dimensions     │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│  PRESENTATION (new)                                          │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  /data-portability   → DataPortabilityPage (public)  │    │
│  │  /assess → Export button on job detail card          │    │
│  │  /reports → Bulk export on filtered report view      │    │
│  │  API: GET /api/v1/assessments/:code/export           │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

### Current State

| Component | Status | Details |
|-----------|--------|---------|
| `AssessmentJob.dimensions` (Prisma) | ✅ `Json?` | Stores 11 DimensionScore objects; populated by `assessmentService.ts` fire-and-forget path (operations.ts:54) |
| `AssessmentJob.reportJson` (Prisma) | ✅ `Json?` | Full assessment report as JSON; operations.ts:56 |
| `AssessmentJob.syllabusJson` (Prisma) | ✅ `Json?` | Zod-typed SyllabusMap from `syllabusSchema.ts`; operations.ts:57 |
| `AssessmentSnapshot` (Prisma) | ✅ Model exists | Versioned snapshots; schema.prisma:178-196. Foreign key to AssessmentJob |
| `InstitutionalAssessment` (Prisma) | ✅ Model exists | Cross-institutional benchmarking; schema.prisma:156-176 |
| `ApiKey` (Prisma) | ✅ Model exists | API key model for institutional access; schema.prisma:198-213 |
| `syllabusSchema.ts` | ✅ Zod schemas | SubjectSchema, StreamSchema, CreditStructureSchema, SyllabusMapSchema — full typed definitions |
| Export operation (Wasp) | ❌ Not implemented | No `exportAssessment` query/action exists in `main.wasp` |
| Import operation (Wasp) | ❌ Not implemented | No `importPrograms` action exists |
| Bulk export operation (Wasp) | ❌ Not implemented | No multi-job export query exists |
| REST API export endpoint | ❌ Not implemented | No Wasp `api` declaration for `/api/v1/assessments/:code/export` |
| `/data-portability` page | ❌ Not implemented | No route/page exists in main.wasp |
| Export button on AssessorPage | ❌ Not implemented | No export UI exists in `AssessorPage` component |
| CSV generation utility | ❌ Not implemented | No CSV formatting utility exists in the compass module |
| Competitive evidence data | ✅ In `feature_list.json` | Two confirmed migration repos: `github.com/.../coursedog-importer` (9 PRs, Mar-Apr 2026) and `github.com/FrankCoRa/Data_Migration_Project` (June 27, 2026) |
| `getAssessmentJob` query (Wasp) | ✅ Operational | Returns single job with all fields including dimensions/reportJson/syllabusJson; `main.wasp:351-354` |

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Export format primary | Structured JSON matching `ProgramReport` interface | Preserves full fidelity; CSV is a secondary flat format for spreadsheet users |
| Export trigger | New `exportAssessment` Wasp action (authRequired) | Streams to browser as download; avoids exposing raw JSON at public URLs |
| Bulk export scope | All user's AssessmentJobs, filtered by status=complete | Users should only export their own completed assessments |
| CSV format | Flat table: one row per dimension per program | Spreadsheet users need dimension-level granularity; merging programs into rows would be lossy |
| Import format | JSON array matching a subset of ProgramReport (code, level, dimensions optional) | Allows partial data; DFVA will assess any programs without dimension data |
| Import auth | `authRequired: true` + admin-only or credit-gated | Prevents abuse; import triggers assessment computation |
| REST API export | New Wasp `api` route at `GET /api/v1/assessments/:code/export` with ApiKey auth | Institutional consumers need programmatic access; ApiKey model already exists |
| Data Portability page | Public route (`authRequired: false`) | Competitive positioning page should be visible pre-login for procurement evaluation |
| Evidence citations | Hardcoded competitive intelligence data in the page component | Fastest path to deployment; later can be backed by `CompetitiveEvent` records in the DB |
| Syllabus inclusion in export | Default: include. User toggle: exclude. | Some users want the full curriculum map; others want just scores |
| Snapshot history in export | Include snapshot timeline as an array | Enables trend analysis — a differentiator no competitor offers |

### Dependencies

- **Wasp 0.22** — `api` route declarations, `action`/`query` for export/import operations, `authRequired` for gating
- **Prisma** — `AssessmentJob.findMany`, `AssessmentJob.findUnique`, `AssessmentSnapshot.findMany` for data access
- **syllabusSchema.ts** — Zod schemas for export type validation (`SyllabusMapSchema`, `SubjectSchema`, etc.)
- **sharedProgramData.ts** — `ProgramReport` interface (used as export type definition)
- **ApiKey model** — Existing model for institutional API access to the REST export endpoint
- **zod** — Already in project (`syllabusSchema.ts` uses it); needed for import payload validation
- None external — no third-party export/import libraries needed (JSON.stringify for JSON, manual CSV builder)

## Scope

### In Scope (MVP)

- [ ] New `exportAssessment` Wasp action: accepts `jobId`, returns `ExportPayload` (dimensions, scores, syllabus, snapshots) as downloadable JSON
- [ ] JSON export download triggered from AssessmentJob detail card on AssessorPage (one-click button)
- [ ] CSV export variant: flat table with one row per dimension per program, triggered from the same button (format toggle)
- [ ] New `exportAllAssessments` Wasp query: returns all user's completed jobs as a combined JSON array for bulk download
- [ ] Bulk CSV export from ReportsPage filtered view
- [ ] New public `/data-portability` route with DataPortabilityPage component
- [ ] Data Portability page content: side-by-side comparison table (DFVA structured JSON vs. Competitors HTML), real GitHub repo citations (names, PR counts, dates), "Try It" CTA linking to `/assess` (if not logged in, redirects to `/login` then `/assess`)
- [ ] New `importPrograms` Wasp action: accepts JSON array of `{ programCode, programName, level? }`, creates AssessmentJobs, runs assessments
- [ ] Import payload validation using Zod schema
- [ ] `exportAssessment` returns syllabus data by default with optional `includeSyllabus: false` parameter

### Out of Scope (Future)

- PDF export format (separate feature — report rendering pipeline exists in `reportContent.ts`)
- Scheduled/automated exports (cron-based) — separate feature
- Export to third-party cloud storage (S3, Google Drive) — infrastructure complexity
- Migration tooling that converts Competitor HTML → DFVA JSON (scraping is a separate product line)
- Multi-institutional export aggregation (requires InstitutionalAssessment model changes)
- Export history/audit log (tracking who exported what and when)
- Import from CSV format (JSON-only for MVP; CSV import has parsing complexity)
- Real-time competitive intelligence data live from GitHub API (hardcoded evidence is sufficient for MVP)

## Acceptance Criteria

- [ ] Authenticated user can click "Export" on an AssessmentJob detail card and receive a JSON file containing all dimensions, scores, syllabus map, and snapshot history
- [ ] Same "Export" button provides a CSV toggle; CSV output has columns: programCode, programName, dimensionLabel, score, maxScore, riskBand, assessedDate
- [ ] Authenticated user can export all their completed assessments as a single JSON array from the ReportsPage
- [ ] Public `/data-portability` page loads without authentication and displays a comparison table with at least 3 competitor lock-in citations (Modern Campus, Coursedog, 25Live) with verifiable GitHub repo names
- [ ] `importPrograms` action accepts a JSON array of program metadata, validates with Zod, creates AssessmentJob records with status=queued, and returns the created job IDs
- [ ] `importPrograms` rejects invalid payloads with a 400 error and a descriptive validation message
- [ ] `exportAssessment` with `includeSyllabus: false` returns all fields except `syllabusJson` and `subjectList`
- [ ] Unauthenticated access to `exportAssessment`, `exportAllAssessments`, or `importPrograms` returns 401
- [ ] Export payload structure matches `ProgramReport` interface from `sharedProgramData.ts` plus `syllabusMap` and `snapshots` fields

## Open Questions

- [ ] Should CSV export include the full 11 dimensions as separate columns (wide format) or one row per dimension (long format)? Decision: long format (one row per dimension per program) — more queryable in spreadsheets and avoids 11+ column width issues.
- [ ] Should import be credit-gated (consumes a credit per imported program) or free for authenticated users? Decision: credit-gated — import triggers assessment computation which has LLM costs.
- [ ] Should the REST API export endpoint use ApiKey auth (Institution model) or user session auth? Decision: ApiKey auth — this is for institutional programmatic access, not individual users.
- [ ] Should the Data Portability page include a live "Export a sample assessment" demo that works without login? Decision: include a pre-computed static sample export (one of the 41 programs from `sharedProgramData.ts`) so procurement evaluators can see the format without creating an account. No — use the DFVA MCP server's cross_program_analysis or get_assessment as the visible demo; the page can embed a code snippet showing how to use the MCP tools.
- [ ] Should `exportAllAssessments` respect the same snapshot-history inclusion as single export? Decision: yes, same `includeSyllabus` parameter and same snapshot array.
- [ ] Should the import endpoint accept a `handbookUrl` per program and attempt to enrich the assessment, or just queue with metadata-only? Decision: accept optional `handbookUrl` — if provided, trigger full assessment pipeline; if omitted, create assessment with status=queued and metadata-only, awaiting subsequent enrichment.

## Implementation Tasks

1. **Define export/import types** — Create `src/compass/exportImportTypes.ts` with `ExportPayload`, `ImportPayload`, `ImportProgramEntry`, `ImportValidationResult` TypeScript interfaces. Use Zod for import validation schema. Reuse `ProgramReport` from `sharedProgramData.ts` as base export type. (30 min)

2. **Add Wasp operations** — Add to `main.wasp`: `action exportAssessment { fn: import { exportAssessment } from "@src/compass/operations", entities: [AssessmentJob, AssessmentSnapshot] }`, `query exportAllAssessments { fn: import { exportAllAssessments } from "@src/compass/operations", entities: [AssessmentJob, AssessmentSnapshot] }`, `action importPrograms { fn: import { importPrograms } from "@src/compass/operations", entities: [AssessmentJob, User] }`. (15 min)

3. **Implement export operations** — In `operations.ts`: `exportAssessment` takes `{ jobId: string, includeSyllabus?: boolean }`, fetches the job (401/404 guards), fetches snapshots, builds `ExportPayload`, returns as JSON. `exportAllAssessments` fetches all user's completed jobs, maps through `exportAssessment` logic, returns combined array. (45 min)

4. **Implement CSV formatter** — Create `src/compass/csvExport.ts` with `formatAssessmentsToCSV(jobs: AssessmentJob[]): string`. One row per dimension: columns `programCode, programName, dimensionLabel, score, maxScore, riskBand, assessedDate`. Escape commas and quotes properly. (30 min)

5. **Add export UI to AssessorPage** — Add "Export" button on each completed AssessmentJob card. Dropdown with "JSON" and "CSV" options. On click, call `exportAssessment` action, create Blob, trigger browser download with filename `dfva-{programCode}-{date}.json` or `.csv`. Add bulk "Export All" button to ReportsPage header. (60 min)

6. **Create DataPortabilityPage** — New page at `/data-portability`: header with value proposition, side-by-side comparison table (DFVA vs. Modern Campus/Coursedog/25Live), evidence citations with repo names and dates, CTA to `/login?redirect=/assess`. Add route in `main.wasp`: `route DataPortabilityRoute { path: "/data-portability", to: DataPortabilityPage }` with `authRequired: false`. (90 min)

7. **Implement importPrograms operation** — In `operations.ts`: `importPrograms` takes `{ programs: ImportProgramEntry[] }`, validates with Zod, creates AssessmentJob records (userId, status=queued, programName, courseCode), optionally triggers assessment if handbookUrl provided. Returns `{ jobsCreated: number, jobIds: string[] }`. (45 min)

8. **Add REST API export endpoint** — Add Wasp `api` declaration: `api exportAssessmentApi { fn: import { exportAssessmentApi } from "@src/compass/operations", entities: [AssessmentJob, AssessmentSnapshot, ApiKey, Institution], httpRoute: (GET, "/api/v1/assessments/:code/export") }`. Implement `exportAssessmentApi` with ApiKey validation, lookup by programCode across user's jobs, return ExportPayload. (45 min)

9. **Add competitive evidence data** — Create `src/compass/data/portabilityEvidence.ts` with a typed array of competitor lock-in evidence: `{ competitor: string, evidence: string, repoUrl?: string, date: string, impact: string }`. Source from `feature_list.json` feat-008 and feat-010 detail fields. Used by DataPortabilityPage. (20 min)

10. **Test and commit** — Verify JSON export structure matches `ProgramReport` interface. Verify CSV output columns. Verify unauthenticated access returns 401. Verify import validation rejects malformed payloads. Verify `/data-portability` loads without auth. Commit with: `feat: data portability — structured JSON/CSV export, bulk import, public guarantee page`. (30 min)

### Phase Summary

| Phase | Tasks | Estimated Total |
|-------|-------|-----------------|
| Types + Wasp declarations | 1, 2 | 45 min |
| Operations (export + import) | 3, 4, 7 | 2 hr |
| API endpoint | 8 | 45 min |
| UI (export buttons + portability page) | 5, 6, 9 | 2 hr 50 min |
| Test + commit | 10 | 30 min |
| **Total** | **10 tasks** | **~6.5 hours** |
