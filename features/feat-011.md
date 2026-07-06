---
id: feat-011
name: "TechnologyOne Reporting Gap — DFVA as T1's Missing Analytics Layer"
status: draft
created: 2026-07-08
project: DFVA
---

# Feature: TechnologyOne Data Connector — DFVA as T1's Missing Analytics Layer

## Description

TechnologyOne (T1) Student Management is the dominant SMS at Go8 universities — used by UoM, UNSW, UQ, Monash, Adelaide, and UWA — yet its native reporting is widely acknowledged as broken. The GitHub `technologyone-analyser` project (active through June 2026, 10+ issues) is a complete web application built specifically because T1's built-in analytics are insufficient. It parses T1's proprietary export formats (`.t1etlp`, `.t1dm`, `.t1db`, `.t1xl`) and applies air-gap security because T1 data is considered too sensitive for cloud exposure.

This directly confirms the analytics vacuum that DFVA is positioned to fill. T1 institutions run one of the most expensive SMS platforms in the sector and still cannot get basic curriculum analytics — course enrolment trends, progression rates, assessment load balance, or program viability scoring. Every T1 university is a captive market for DFVA: they already have the data; they lack the analytics layer.

This feature builds a **TechnologyOne Data Connector** that ingests T1 export files, normalizes structured curriculum data into DFVA's assessment models, and delivers the analytics T1 itself cannot. The connector position DFVA as the analytics standard for T1 institutions — not by competing with T1's SMS business, but by providing the reporting layer T1's customers have been building themselves.

The feature adds four capabilities: (1) a file-based T1 data import pipeline that accepts `.t1etlp` (enrolment/load planning), `.t1dm` (data model exports), `.t1db` (database snapshots), and `.t1xl` (spreadsheet exports), (2) a normalization layer that maps T1's proprietary data structures to DFVA's `ProgramReport`, `DimensionScore`, and `AssessmentJob` models, (3) a T1-specific portfolio dashboard that shows cross-program analytics (enrolment trends, progression rates, assessment health) for all programs at a T1 institution, and (4) an air-gap-compatible architecture that keeps raw T1 data on the institution's infrastructure while DFVA processes only the normalized analytics layer.

## Vibe

Enterprise-grade but not enterprise-bloat. The connector should feel like "finally, someone built the analytics T1 should have shipped 10 years ago" — clean dashboards, honest data mapping, zero magic. No vendor lock-in narrative; just a better tool for the data you already own. The visual language should contrast with T1's dated UI: modern typography, clear data lineage (source → transform → insight), and a downloadable audit trail so institutions can verify every transformation.

## User Stories

- As a **Faculty General Manager** whose faculty runs on T1, I want to upload our semester enrolment export and see DFVA scores for all my programs immediately — without waiting for IT to build a custom report — so I can brief my Dean on program viability before the curriculum review cycle.

- As a **Director of Planning & Performance** at a T1 university, I want to correlate DFVA's 11-dimension scores with T1 enrolment data (applications, offers, acceptances, retention) across all programs so I can identify which low-performing programs also have declining demand — the "double alarm" for portfolio review.

- As a **DVCA at a Go8 T1 institution**, I want a portfolio dashboard that combines DFVA's future-viability scores with real enrolment and progression data from T1 so I can present a single source of truth at Academic Board instead of reconciling three separate reports.

- As the **DFVA product team**, I want a file-based import pipeline that accepts T1's proprietary export formats and normalizes them into DFVA's structured data models so we can onboard any T1 institution without custom integration work.

- As a **university IT security architect** evaluating DFVA, I want assurance that raw T1 data never leaves our infrastructure — only normalized analytics summaries are transmitted — so I can approve DFVA for use with sensitive student and curriculum data.

## Technical Design

### Architecture

This feature introduces a new **T1 Data Connector** pipeline that sits alongside the existing async assessment pipeline. It follows the same fire-and-forget pattern (`create job → background processing → update status`) but adds a file-upload frontend for T1 export formats and a normalization layer that maps T1 structures to DFVA's existing data models.

```
┌──────────────────────────────────────────────────────────────────┐
│                    UPLOAD LAYER                                   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  T1FileUpload.tsx                                            │ │
│  │  - Drag-and-drop zone for .t1etlp, .t1dm, .t1db, .t1xl     │ │
│  │  - File type detection by magic bytes + extension            │ │
│  │  - Preview: row count, columns detected, entity types        │ │
│  │  - Progress: parsing → normalizing → assessing               │ │
│  └──────────────────────────┬──────────────────────────────────┘ │
└─────────────────────────────┼────────────────────────────────────┘
                              │
┌─────────────────────────────▼────────────────────────────────────┐
│                    INGESTION PIPELINE                              │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────────┐│
│  │  T1 Parser Layer (src/compass/t1/parser/)                     ││
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐    ││
│  │  │ t1etlp.ts │ │ t1dm.ts   │ │ t1db.ts   │ │ t1xl.ts   │    ││
│  │  │ Enrolment │ │ Data-model│ │ Database  │ │ Spreadsh. │    ││
│  │  │ load plan │ │ entity    │ │ snapshot  │ │ export    │    ││
│  │  │ parser    │ │ parser    │ │ parser    │ │ parser    │    ││
│  │  └─────┬─────┘ └─────┬─────┘ └─────┬─────┘ └─────┬─────┘    ││
│  └────────┼─────────────┼─────────────┼─────────────┼──────────┘│
│           └─────────────┴──────┬───────┴─────────────┘           │
│                                │                                  │
│  ┌─────────────────────────────▼────────────────────────────────┐│
│  │  T1 Normalizer (src/compass/t1/normalizer.ts)                 ││
│  │  - Maps T1 entity graphs → DFVA ProgramReport shape           ││
│  │  - Extracts: programCode, programName, course list,           ││
│  │    enrolment counts, progression rates, handbook URLs         ││
│  │  - Outputs: T1ProgramSnapshot (new model)                     ││
│  └─────────────────────────────┬────────────────────────────────┘│
└────────────────────────────────┼─────────────────────────────────┘
                                 │
┌────────────────────────────────▼─────────────────────────────────┐
│                    STORAGE LAYER                                   │
│                                                                   │
│  ┌──────────────────────────────┐ ┌────────────────────────────┐ │
│  │ T1ImportJob                   │ │ T1ProgramSnapshot           │ │
│  │ - fileHash: string (dedup)    │ │ - programCode: string       │ │
│  │ - fileType: T1FileType enum  │ │ - programName: string       │ │
│  │ - fileName: string            │ │ - enrolmentCount: number    │ │
│  │ - status: queued|processing|  │ │ - applications: number      │ │
│  │   complete|failed             │ │ - offers: number            │ │
│  │ - rowCount: number            │ │ - acceptances: number       │ │
│  │ - entityCount: number         │ │ - retentionRate: float      │ │
│  │ - entityTypes: string[]       │ │ - progressionRate: float    │ │
│  │ - institutionId: string       │ │ - courseList: Json          │ │
│  │ - snapshotIds: string[]       │ │ - rawSource: T1FileType     │ │
│  │ - errorMessage?: string       │ │ - importedAt: DateTime      │ │
│  └──────────────────────────────┘ │ - importJobId: string        │ │
│                                    │ - institutionId: string     │ │
│  ┌──────────────────────────────┐ └────────────────────────────┘ │
│  │ T1EnrolmentTrend              │                                │
│  │ - programCode: string         │  ┌──────────────────────────┐ │
│  │ - year: number                │  │ DFVA → T1 Assessment Link │ │
│  │ - semester: number            │  │ (AssessmentJob extended)  │ │
│  │ - applications: number        │  │ - t1ProgramSnapshotId?    │ │
│  │ - offers: number              │  │ - t1ImportJobId?          │ │
│  │ - acceptances: number         │  └──────────────────────────┘ │
│  │ - enrolments: number          │                                │
│  │ - withdrawalCount: number     │                                │
│  └──────────────────────────────┘                                │
└──────────────────────────────────────────────────────────────────┘
                                 │
┌────────────────────────────────▼─────────────────────────────────┐
│                    PRESENTATION LAYER                              │
│                                                                   │
│  T1UploadPage.tsx            — file upload + import status        │
│  T1PortfolioDashboard.tsx    — cross-program T1 analytics         │
│  T1EnrolmentTrend.tsx        — sparklines for enrolment data      │
│  T1ProgramDetail.tsx         — single program: T1 stats + DFVA    │
│  T1DataSourcePanel.tsx       — audit trail: source → transform    │
│                                                                   │
│  Updated: PortfolioHealthPage.tsx — adds T1 enrolment overlay     │
│  Updated: ReportDetailPage.tsx    — shows T1 enrolment context    │
│  Updated: InsightsPage.tsx        — adds T1 import entry point    │
└──────────────────────────────────────────────────────────────────┘
```

### Current State (as of 2026-07-08)

| Component | Status | Details |
|-----------|--------|---------|
| `AssessmentJob` model (Prisma) | ✅ Exists | `schema.prisma` lines 117-146. Core assessment pipeline. |
| `assessProgram` action | ✅ Exists | `operations.ts` lines 56-121. Fire-and-forget pattern. |
| `getAssessmentJobs` query | ✅ Exists | `operations.ts` lines 144-202. Poll-based status tracking. |
| `Institution` model | ✅ Exists | `schema.prisma` lines 149-159. Cross-institutional benchmarking. |
| `InstitutionalAssessment` model | ✅ Exists | `schema.prisma` lines 161-181. Per-institution program scores. |
| `ApiKey` model | ✅ Exists | `schema.prisma` lines 203-222. API key management (feat-009). |
| `ProgramReport` interface | ✅ Exists | `sharedProgramData.ts` lines 10-28. Standard assessment shape. |
| `PROGRAMS` static array (41 programs) | ✅ Exists | `sharedProgramData.ts` — static UoM program data. |
| `InsightsPage` | ✅ Exists | `/insights` route. Faculty-level analytics. |
| `PortfolioHealthPage` | ✅ Exists | `/insights/portfolio` route. Cross-program health. |
| `ReportDetailPage` | ✅ Exists | `/reports/:reportSlug` route. Per-program detail. |
| `scanMarketDrift` cron job | ✅ Exists | `marketDrift.ts`. Weekly drift detection. |
| File upload infrastructure | ✅ Exists | `file-upload/operations.ts`. S3-based upload. Not used here — T1 files stay on-server. |
| T1 `.t1etlp` parser | ❌ Missing | No parser for T1 Enrolment & Load Planning exports. |
| T1 `.t1dm` parser | ❌ Missing | No parser for T1 Data Model entity exports. |
| T1 `.t1db` parser | ❌ Missing | No parser for T1 database snapshot exports. |
| T1 `.t1xl` parser | ❌ Missing | No parser for T1 spreadsheet/Excel exports. |
| T1 format detection (magic bytes) | ❌ Missing | No file-type detection for T1 binary/proprietary formats. |
| T1 → DFVA field normalizer | ❌ Missing | No mapping layer from T1 entity graphs to DFVA models. |
| `T1ImportJob` model | ❌ Missing | No Prisma model for import tracking. |
| `T1ProgramSnapshot` model | ❌ Missing | No Prisma model for normalized T1 program data. |
| `T1EnrolmentTrend` model | ❌ Missing | No Prisma model for time-series enrolment data. |
| T1 Portfolio Dashboard UI | ❌ Missing | No page for cross-program T1 + DFVA analytics. |
| T1 Enrolment Trend sparklines | ❌ Missing | No time-series visualization of enrolment data. |
| T1 audit trail / data lineage panel | ❌ Missing | No visibility into source → transform → insight. |
| Air-gap architecture documentation | ❌ Missing | No documented pattern for on-prem data with cloud analytics. |
| T1 institution onboarding flow | ❌ Missing | No guided flow for T1 institutions to connect data. |

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Import mechanism | **File upload, not API connection.** Users export from T1's native export tool and upload to DFVA. | T1 has no public API for curriculum data. The GitHub `technologyone-analyser` project confirms file-based export is the only viable path. Institutions already know how to run T1 exports; we meet them where they are. |
| File format support priority | `.t1xl` (spreadsheet) first, `.t1etlp` (enrolment) second, `.t1dm`/`.t1db` (data model/database) later | `.t1xl` is the most common export format, accessible to non-technical staff. `.t1etlp` provides the richest enrolment data but requires the Load Planning module. `.t1dm`/`.t1db` are power-user formats. Start with what every T1 user can produce. |
| Parser architecture | **Per-format parser modules** (`t1xl.ts`, `t1etlp.ts`, etc.) with a shared `T1Normalizer` that outputs a unified `T1ProgramSnapshot` | Separates format-specific parsing from business-logic normalization. Adding a new format means writing one parser module — the normalizer, storage, and UI don't change. |
| File deduplication | **SHA-256 hash of uploaded file** stored in `T1ImportJob.fileHash`. Re-uploading the same export file is a no-op. | Prevents duplicate data. Institutions may re-upload the same export file accidentally; we should recognize it and skip processing. |
| Air-gap compliance | **Server-side file processing only.** T1 files are uploaded to the DFVA server (not S3), parsed in-memory, and only normalized `T1ProgramSnapshot` records are persisted. Raw files are deleted after processing. Optional: institution-hosted processing container. | Addresses the documented T1 security sensitivity. Raw student-level data never enters cloud storage. Only aggregate analytics are stored. For institutions with strict air-gap requirements, provide a Docker container that runs the parser on-prem and sends only normalized summaries via API. |
| Institution mapping | **Match by `Institution.code`** — T1 exports include institution metadata. Auto-create `Institution` record if not found. Link `T1ImportJob` to `Institution`. | Enables multi-institution analytics. Each T1 university gets its own portfolio view. The `Institution` model already exists (feat cross-institutional benchmarking). |
| T1 → DFVA program matching | **Fuzzy match on program code/name** with manual override. T1 program codes vary by institution (e.g., `B-SCI` vs `BSC` vs `SCIENCE-B`). Auto-match attempts exact code match → normalized code match → name similarity. Unmatched programs are flagged for manual mapping. | Program codes are not standardized across T1 instances. Auto-matching handles 80% of cases; the remaining 20% need a human to confirm the mapping. |
| Enrolment trend storage | **`T1EnrolmentTrend` time-series table** — one row per program per year per semester. Supports multi-year trend visualization. | Separates snapshot data (point-in-time import) from trend data (historical enrolment patterns). Institutions can upload historical enrolment exports to backfill trends. |
| T1 dashboard route | `/insights/t1/:institutionCode` — new route under Insights. | Consistent with existing `/insights/faculty/:facultySlug` pattern. Institution-scoped analytics. |
| Normalized data retention | **Indefinite.** `T1ProgramSnapshot` and `T1EnrolmentTrend` records are aggregate analytics, not raw student data. No privacy concern. | Supports year-over-year trend analysis. Storage is trivial: ~200 programs × 2 semesters × N years ≈ kilobytes per institution. |
| DFVA scoring integration | **On-demand, not automatic.** After T1 import, user clicks "Assess with DFVA" to trigger `assessProgram` for each imported program. Results linked via `t1ProgramSnapshotId` on `AssessmentJob`. | Separates data import from scoring. Institutions may want to import T1 data and review it before running DFVA assessments. Also avoids unexpected API costs — scoring 200+ programs at once could be expensive with the LLM pipeline. |
| LLM synthesis for T1 portfolio | **Optional.** A "Generate Portfolio Brief" button that runs GPT-4o-mini across all T1 + DFVA data for an institution, producing an executive summary. | Value-add for leadership. Combines enrolment trends with DFVA risk bands into a single narrative. ~$0.002/institution for synthesis. |
| T1 data export format documentation | **Publish as open reference.** Document the structure of each T1 format as we reverse-engineer it, similar to the GitHub `technologyone-analyser` approach. | Positions DFVA as the community's T1 analytics standard. Attracts contributions and builds trust with T1 universities. |

### Dependencies

- **Wasp 0.24** — new `action` for T1 import; new `query` for T1 data; new routes for T1 pages
- **Prisma (PostgreSQL)** — new models: `T1ImportJob`, `T1ProgramSnapshot`, `T1EnrolmentTrend`; extension of `AssessmentJob` with optional `t1ProgramSnapshotId`
- **React 19** — new T1 UI components
- **Recharts** — sparkline and trend visualizations (already in project)
- **xlsx** (npm, new dependency) — parsing `.t1xl` spreadsheet exports. T1 `.t1xl` files are Excel-format; `xlsx` is the standard Node.js Excel parser
- **csv-parse** (npm, new dependency) — parsing CSV-based T1 exports (some `.t1etlp` variants are CSV)
- **fast-xml-parser** (npm, new dependency) — parsing XML-based T1 exports (some `.t1dm` exports use XML)
- **busboy** (npm, already in Wasp) — multipart file upload parsing (used by Wasp's built-in file handling)
- **crypto** (Node.js built-in) — SHA-256 file hashing for deduplication
- **Docker** (optional, new dependency) — on-prem parsing container for air-gapped institutions

## Scope

### In Scope (MVP — "T1 Connector v1")

- [ ] **`T1ImportJob` Prisma model + migration:** Tracks each uploaded T1 export file with status (queued/processing/complete/failed), file hash for dedup, row count, entity types detected, and links to generated `T1ProgramSnapshot` records
- [ ] **`T1ProgramSnapshot` Prisma model + migration:** Normalized program data extracted from T1 exports — program code, name, enrolment count, applications, offers, acceptances, retention rate, progression rate, course list as JSON, source file type
- [ ] **`T1EnrolmentTrend` Prisma model + migration:** Time-series enrolment data per program per year per semester — supports multi-year trend visualization and backfill from historical exports
- [ ] **`AssessmentJob.t1ProgramSnapshotId` optional field + migration:** Links DFVA assessments to T1-imported program data for combined analytics
- [ ] **`.t1xl` parser module** (`src/compass/t1/parser/t1xl.ts`): Parses T1 spreadsheet exports using `xlsx` library. Extracts program-level rows, detects column headers (program code, program name, enrolments, etc.), outputs structured `T1RawProgram` records
- [ ] **`.t1etlp` parser module** (`src/compass/t1/parser/t1etlp.ts`): Parses T1 Enrolment & Load Planning exports. Handles CSV and fixed-width variants. Extracts enrolment counts, load plans, and course-level detail
- [ ] **File-type detection** (`src/compass/t1/detect.ts`): Identifies T1 file format from magic bytes and extension. Returns `T1FileType` enum. Falls back to extension-based detection
- [ ] **T1 Normalizer** (`src/compass/t1/normalizer.ts`): Maps parsed `T1RawProgram` records to `T1ProgramSnapshot` shape. Handles: field name normalization, code cleanup, enrolment aggregation, progression rate calculation. Links to `Institution` by code
- [ ] **T1 Import action** (`src/compass/t1/operations.ts` — `importT1Data`): Wasp action that accepts file upload, detects format, runs appropriate parser, normalizes data, creates `T1ProgramSnapshot` and `T1EnrolmentTrend` records, and returns import summary. Follows the fire-and-forget pattern from `assessProgram`
- [ ] **File deduplication:** SHA-256 hash check before import. Re-uploading the same file returns the existing `T1ImportJob` result
- [ ] **T1 Import status query** (`getT1ImportJob`): Returns import progress — row count parsed, entity count detected, snapshots created, errors if any
- [ ] **T1 portfolio query** (`getT1Portfolio(institutionCode: string)`): Returns all `T1ProgramSnapshot` records for an institution, joined with latest `AssessmentJob` if assessment exists
- [ ] **T1 enrolment trend query** (`getT1EnrolmentTrends(institutionCode: string, programCode?: string)`): Returns time-series enrolment data with optional program filter
- [ ] **T1 upload page** (`T1UploadPage.tsx`): Drag-and-drop file upload zone. Shows supported formats with descriptions. Displays import progress and results. Links to T1 portfolio after successful import. Route: `/insights/t1/upload`
- [ ] **T1 portfolio dashboard** (`T1PortfolioDashboard.tsx`): Cross-program view for one T1 institution. Table: program name, enrolments (current), enrolment trend sparkline, DFVA score (if assessed), risk band. Sortable columns. Export to CSV. Route: `/insights/t1/:institutionCode`
- [ ] **T1 program detail** (`T1ProgramDetail.tsx`): Single program view combining T1 enrolment data with DFVA assessment (if available). Enrolment trend chart, application/offer/acceptance funnel, progression rate gauge. Route: `/insights/t1/:institutionCode/:programCode`
- [ ] **T1 enrolment trend sparkline component** (`T1EnrolmentTrend.tsx`): Recharts sparkline showing 3-year enrolment trend with year/semester labels. Colour-coded: green (growing), grey (stable), amber (declining)
- [ ] **T1 data source panel** (`T1DataSourcePanel.tsx`): Audit trail showing: source file name, file type, import date, row count, normalization steps applied. Downloadable JSON of the transformation log
- [ ] **Update `InsightsPage.tsx`:** Add "TechnologyOne Analytics" card linking to T1 upload and portfolio views. Position as a new insight category alongside Faculty Analytics and Portfolio Health
- [ ] **Update `PortfolioHealthPage.tsx`:** Add optional T1 enrolment overlay — if T1 data exists for the institution, show enrolment counts and trends alongside DFVA risk bands
- [ ] **Update `ReportDetailPage.tsx`:** If assessment is linked to a `T1ProgramSnapshot`, show enrolment context below the DFVA dimension radar
- [ ] **"Assess with DFVA" bulk action:** Button on T1 portfolio dashboard that triggers `assessProgram` for all imported programs. Shows progress bar. Rate-limited to 10 concurrent assessments
- [ ] **T1 format reference documentation:** Publish `docs/t1-export-formats.md` — open reference for each T1 export format's structure, field mappings, and known quirks. Positions DFVA as the community standard for T1 analytics

### Out of Scope (Future)

- Real-time T1 API integration (T1 has no public API for curriculum data — this may change; monitor T1 roadmap)
- `.t1dm` (data model) and `.t1db` (database snapshot) parser modules — power-user formats; implement after `.t1xl` and `.t1etlp` are stable
- Docker-based on-prem parsing container — for air-gapped institutions that cannot upload files to DFVA server. Requires containerization work and deployment documentation
- T1 assessment load balancing analysis (course-level workload distribution across semesters)
- T1 timetable integration (room utilization, scheduling conflicts, contact hours)
- T1 student demographics correlation (equity group performance, ATAR vs progression)
- Multi-institution T1 benchmarking (comparing enrolment trends across Go8 T1 universities)
- Automated T1 export scheduling (cron job that pulls T1 data via SFTP/API if institution configures it)
- T1 → DFVA program code auto-mapping ML model (fuzzy matching with confidence scores)
- Integration with T1's Finance module (program-level revenue/cost analysis)
- T1 student-level progression tracking (individual student pathways through programs)
- Historical T1 data migration tooling (batch import of 5+ years of enrolment archives)

## Acceptance Criteria

- [ ] `.t1xl` parser correctly extracts program-level rows from a real T1 spreadsheet export: identifies program code, program name, enrolment count, and course list columns regardless of column ordering
- [ ] `.t1etlp` parser correctly extracts enrolment counts, load plans, and course-level detail from a real T1 Enrolment & Load Planning export in CSV format
- [ ] File-type detection correctly identifies `.t1xl` files (by magic bytes: ZIP/Office Open XML) and `.t1etlp` files (by header pattern) without relying on file extension alone
- [ ] T1 Normalizer correctly maps 100% of extracted programs to `T1ProgramSnapshot` records, with all fields populated or explicitly null (no silent data loss)
- [ ] File deduplication works: uploading the same `.t1xl` file twice returns the existing `T1ImportJob` result without creating duplicate `T1ProgramSnapshot` or `T1EnrolmentTrend` records
- [ ] T1 import pipeline completes for a 200-program institution export in under 30 seconds (parsing + normalization + persistence)
- [ ] T1 Portfolio Dashboard loads all programs for an institution with enrolment counts and trends in under 2 seconds
- [ ] T1 enrolment trend sparkline renders 6 data points (3 years × 2 semesters) as a Recharts area chart with correct year labels and trend colour coding
- [ ] "Assess with DFVA" bulk action correctly creates `AssessmentJob` records for all imported programs, each linked via `t1ProgramSnapshotId`, and shows a progress bar that updates in real-time
- [ ] When a T1 program has both enrolment data and a DFVA assessment, the combined view shows enrolment trend + DFVA dimension scores on the same page without layout breakage
- [ ] Raw T1 export files are deleted from the server after successful processing (verified by checking the upload directory)
- [ ] If T1 parser encounters a malformed row, it logs the error with row number and file name, skips the row, and continues processing remaining rows (no all-or-nothing failure)
- [ ] New Prisma migration runs without data loss; existing `AssessmentJob`, `Institution`, and `InstitutionalAssessment` data unaffected
- [ ] No regression on existing `AssessorPage`, `ReportsPage`, `InsightsPage`, or `PortfolioHealthPage`
- [ ] `docs/t1-export-formats.md` is published with field mappings for `.t1xl` and `.t1etlp`, including known column name variants across T1 versions

## Open Questions

- [ ] **T1 export format stability:** T1 may change export formats between versions. The GitHub `technologyone-analyser` project has 10+ open issues, many related to format changes. How do we handle format versioning? Detect the T1 version from export metadata and maintain parser versions? Or treat each format change as a bug fix?
- [ ] **Real T1 export samples:** We need access to anonymized T1 export files for parser development and testing. Can we obtain these from UoM's T1 instance (we're already a T1 customer)? Or from partner universities? Without real samples, parsers will be fragile.
- [ ] **Air-gap Docker container priority:** Is the on-prem parsing container a gating requirement for UoM adoption, or can we start with server-side processing and add the container later? The GitHub analyser project requires air-gap — this may be a hard requirement for some Go8 security teams.
- [ ] **Institution consent for analytics:** Does DFVA need explicit institutional consent to store and display normalized T1 analytics (aggregate, non-student-level) for a university? Or is this covered by the existing terms of service?
- [ ] **T1 version fragmentation:** T1 Student Management has multiple versions deployed across Go8 (Ci, CiA, Ci Anywhere). Do export formats differ between versions? This affects how many parser variants we need.
- [ ] **Competitive positioning:** Should DFVA's T1 connector be positioned as "the analytics T1 should have built" (aggressive) or "a complement to your T1 investment" (collaborative)? Aggressive positioning drives adoption but risks T1 responding with their own analytics push. Collaborative positioning is safer but less differentiated.
- [ ] **T1 enrolment trend backfill:** Should MVP include a bulk import mode for historical enrolment data (upload 5 years of semester exports at once), or is single-semester import sufficient for v1? Historical data enables trend visualization but complicates the import flow.
- [ ] **LLM synthesis for T1 portfolio:** Is the "Generate Portfolio Brief" feature (GPT-4o-mini executive summary across T1 + DFVA data) worth including in MVP, or defer? Adds ~$0.002/institution in API costs but significantly increases perceived value for DVCA/Dean personas.

## Implementation Tasks

### Phase 1 — Data Models & Migration (estimated 2 days)

1. Add Prisma models to `compass/app/schema.prisma`: `T1ImportJob`, `T1ProgramSnapshot`, `T1EnrolmentTrend`
   ```prisma
   enum T1FileType {
     T1XL
     T1ETLP
     T1DM
     T1DB
   }

   model T1ImportJob {
     id            String      @id @default(uuid())
     createdAt     DateTime    @default(now())
     updatedAt     DateTime    @updatedAt

     institution   Institution @relation(fields: [institutionId], references: [id])
     institutionId String

     fileHash      String      // SHA-256 for dedup
     fileName      String
     fileType      T1FileType
     fileSize      Int         // bytes
     status        String      @default("queued") // queued | processing | complete | failed
     rowCount      Int         @default(0)
     entityCount   Int         @default(0)
     entityTypes   String[]    // e.g. ["program", "course", "enrolment"]
     errorMessage  String?

     snapshots     T1ProgramSnapshot[]
     enrolments    T1EnrolmentTrend[]

     @@index([institutionId, createdAt])
     @@unique([fileHash])
   }

   model T1ProgramSnapshot {
     id               String      @id @default(uuid())
     createdAt        DateTime    @default(now())

     importJob        T1ImportJob @relation(fields: [importJobId], references: [id])
     importJobId      String

     institution      Institution @relation(fields: [institutionId], references: [id])
     institutionId    String

     programCode      String
     programName      String
     level            String?     // Bachelor, Master, PhD, etc.
     handbookUrl      String?

     enrolmentCount   Int?
     applications     Int?
     offers           Int?
     acceptances      Int?
     retentionRate    Float?
     progressionRate  Float?
     courseList       Json?       // Array of {courseCode, courseName, enrolment, level}

     sourceFileType   T1FileType  // Which T1 format this snapshot came from
     isActive         Boolean     @default(true)

     // DFVA linkage — AssessmentJob.t1ProgramSnapshotId references this
     assessments      AssessmentJob[]

     @@index([institutionId, programCode])
     @@index([importJobId])
   }

   model T1EnrolmentTrend {
     id               String      @id @default(uuid())
     createdAt        DateTime    @default(now())

     importJob        T1ImportJob @relation(fields: [importJobId], references: [id])
     importJobId      String

     institution      Institution @relation(fields: [institutionId], references: [id])
     institutionId    String

     programCode      String
     year             Int
     semester         Int         // 1 or 2
     applications     Int         @default(0)
     offers           Int         @default(0)
     acceptances      Int         @default(0)
     enrolments       Int         @default(0)
     withdrawalCount  Int         @default(0)

     @@unique([institutionId, programCode, year, semester])
     @@index([programCode, year])
   }
   ```
2. Add `t1ProgramSnapshotId` optional field to `AssessmentJob`:
   ```prisma
   // In AssessmentJob model, add:
   t1ProgramSnapshot   T1ProgramSnapshot? @relation(fields: [t1ProgramSnapshotId], references: [id])
   t1ProgramSnapshotId String?
   ```
3. Create migration: `cd compass/app && DATABASE_URL=... npx prisma migrate dev --name add_t1_connector_models --schema .wasp/out/db/schema.prisma`
4. Register new entities in `main.wasp.ts` for Wasp operation generation

### Phase 2 — T1 Parsers (estimated 3–4 days)

5. Install dependencies: `cd compass/app && npm install xlsx csv-parse fast-xml-parser`
6. Create `src/compass/t1/types.ts` — shared types:
   ```typescript
   export enum T1FileType { T1XL = "T1XL", T1ETLP = "T1ETLP", T1DM = "T1DM", T1DB = "T1DB" }

   export interface T1RawProgram {
     programCode: string;
     programName: string;
     level?: string;
     enrolmentCount?: number;
     applications?: number;
     offers?: number;
     acceptances?: number;
     retentionRate?: number;
     progressionRate?: number;
     courses: T1RawCourse[];
     rawRow: Record<string, unknown>; // Original row for audit trail
   }

   export interface T1RawCourse {
     courseCode: string;
     courseName: string;
     enrolment?: number;
     level?: string;
     semester?: string;
   }

   export interface T1ParseResult {
     programs: T1RawProgram[];
     warnings: string[];   // Non-fatal issues (skipped rows, unknown columns)
     detectedColumns: string[];
     rowCount: number;
     entityCount: number;
     entityTypes: string[];
   }
   ```
7. Create `src/compass/t1/detect.ts` — file-type detection:
   - Read first 4 bytes of file buffer
   - `.t1xl`: ZIP magic bytes (`PK\x03\x04`) + `.t1xl` extension
   - `.t1etlp`: text-based, check for T1 ELP header patterns
   - Returns `T1FileType` or throws with "Unknown T1 format"
8. Create `src/compass/t1/parser/t1xl.ts` — `.t1xl` spreadsheet parser:
   - Uses `xlsx` to read workbook
   - Auto-detects sheet with program data (heuristic: sheet with "Program Code" or similar column)
   - Extracts all rows as `T1RawProgram`
   - Handles merged cells, multi-row headers, and empty rows
   - Maps common T1 column name variants to `T1RawProgram` fields
9. Create `src/compass/t1/parser/t1etlp.ts` — `.t1etlp` Enrolment & Load Planning parser:
   - Handles CSV and fixed-width variants
   - Detects delimiter (comma, tab, pipe)
   - Extracts enrolment counts by program and course
   - Computes progression rates from enrolment/withdrawal data if available
10. Create `src/compass/t1/parser/index.ts` — dispatcher that routes to correct parser based on `T1FileType`
11. Create `src/compass/t1/__tests__/fixtures/` — directory for test T1 export files (use anonymized samples or generated test data)

### Phase 3 — Normalization & Storage (estimated 2 days)

12. Create `src/compass/t1/normalizer.ts`:
    - `normalizePrograms(raw: T1RawProgram[], institutionCode: string): T1ProgramSnapshot[]`
    - Field name normalization: trim whitespace, uppercase program codes, title-case program names
    - Enrolment aggregation: sum course-level enrolments for program-level total
    - Progression rate calculation: if course-level pass rates available, compute weighted average
    - Institution linking: find or create `Institution` by code
13. Create `src/compass/t1/operations.ts` — Wasp operations:
    - `importT1Data` action: accepts `File`, detects format, parses, normalizes, stores. Returns `{ importJobId, programCount, warnings }`
    - `getT1ImportJob` query: returns `T1ImportJob` with status and summary
    - `getT1Portfolio` query: returns `T1ProgramSnapshot[]` for an institution, joined with latest `AssessmentJob` where available
    - `getT1EnrolmentTrends` query: returns `T1EnrolmentTrend[]` with optional program filter
    - `assessT1Programs` action: bulk-assess all programs in an institution's portfolio, linking `AssessmentJob.t1ProgramSnapshotId`
14. Register operations in `main.wasp.ts` with appropriate entity declarations
15. Seed test `Institution` record for UoM: `{ name: "University of Melbourne", code: "unimelb", country: "AU" }`

### Phase 4 — UI Components (estimated 4–5 days)

16. Create `T1UploadPage.tsx` (`src/compass/T1UploadPage.tsx`):
    - Drag-and-drop file upload zone with supported format badges
    - Format descriptions: ".t1xl — Spreadsheet export (most common)", ".t1etlp — Enrolment & Load Planning export"
    - After file drop: validate type, show preview (file name, size, detected format)
    - Upload button triggers `importT1Data` action
    - Progress display: parsing → normalizing → storing → complete
    - Results summary: programs imported, enrolments processed, warnings
    - Link to T1 portfolio after success
    - Route: `/insights/t1/upload`
17. Create `T1PortfolioDashboard.tsx` (`src/compass/T1PortfolioDashboard.tsx`):
    - Fetches `getT1Portfolio(institutionCode)`
    - Table columns: Program Code, Program Name, Enrolments, Trend (sparkline), DFVA Score, Risk Band, Actions
    - Sortable columns, search filter
    - "Assess All with DFVA" button with progress indicator
    - Export to CSV button
    - Empty state: "No T1 data imported yet. Upload a T1 export to get started."
    - Route: `/insights/t1/:institutionCode`
18. Create `T1ProgramDetail.tsx` (`src/compass/T1ProgramDetail.tsx`):
    - Combined view: T1 enrolment data + DFVA assessment (if available)
    - Enrolment trend area chart (Recharts) — 3 years, semester granularity
    - Application → Offer → Acceptance → Enrolment funnel chart
    - Progression rate gauge (0-100%, colour-coded)
    - DFVA dimension radar (if assessment exists)
    - "Run DFVA Assessment" button (if no assessment yet)
    - Route: `/insights/t1/:institutionCode/:programCode`
19. Create `T1EnrolmentTrend.tsx` component:
    - Props: `programCode: string`, `institutionCode: string`
    - Fetches `getT1EnrolmentTrends`, renders Recharts area sparkline
    - Compact variant (40px height, no axes) for table cells
    - Full variant (200px height, labelled axes) for detail pages
    - Colour: green for positive trend, grey for flat, amber for declining
20. Create `T1DataSourcePanel.tsx` component:
    - Expandable panel showing data lineage
    - Source file → Parser → Normalizer → DFVA Models
    - Each step shows: input count, output count, transformation applied, timestamp
    - Download audit trail as JSON
21. Create `T1InsightsCard.tsx` — card for InsightsPage linking to T1 features:
    - Icon, title "TechnologyOne Analytics", description, link to upload
    - Shows last import date and program count if data exists
22. Update `InsightsPage.tsx`: add `T1InsightsCard` alongside Faculty Analytics and Portfolio Health cards
23. Update `PortfolioHealthPage.tsx`: if T1 data exists for the institution, add a "T1 Enrolment Overlay" toggle that shows enrolment counts alongside DFVA risk bands

### Phase 5 — Integration & Polish (estimated 2–3 days)

24. Add T1 portfolio section to `ReportDetailPage.tsx`: if assessment has `t1ProgramSnapshotId`, fetch and display enrolment context below the dimension radar
25. Write `docs/t1-export-formats.md` — open reference documentation:
    - `.t1xl` format: sheet structure, expected columns, known column name variants
    - `.t1etlp` format: CSV structure, field mappings, delimiter variants
    - Parsing quirks: merged cells, multi-row headers, empty rows, encoding issues
    - Field mapping table: T1 column → DFVA field
26. Create `src/compass/t1/__tests__/t1xl-parser.test.ts` — unit tests with mock `.t1xl` data (generated programmatically, not real T1 exports)
27. Create `src/compass/t1/__tests__/normalizer.test.ts` — unit tests verifying field mapping correctness
28. Test end-to-end with anonymized T1 export file (if available): upload → parse → normalize → view dashboard → assess → view combined report
29. Test deduplication: upload same file twice, verify no-op on second upload
30. Test error handling: upload malformed file, verify graceful error message and no partial data
31. Test bulk assess: trigger "Assess All with DFVA" on a small test dataset, verify all jobs created and linked
32. Commit with message: `feat: T1 data connector — .t1xl/.t1etlp parsers, T1 portfolio dashboard, enrolment trend analytics, DFVA-T1 combined views`
