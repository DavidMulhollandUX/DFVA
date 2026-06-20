---
id: feat-004
name: Industry-Wide Reporting & Analytics Gap — DFVA as Independent Analytics Standard
status: draft
created: 2026-06-15
project: DFVA
---

# Feature: DFVA as Independent Analytics Standard

## Description
Research confirmed across 3 competitor platforms (CourseLeaf, CourseLoop, Coursedog) that no curriculum management system delivers adequate reporting or analytics. ListEdTech's verdict: "These are data questions, not workflow questions." DFVA's scoring dashboards fill this gap as an independent analytics layer — a cross-platform standard that any institution can adopt regardless of their curriculum management vendor.

This feature builds the analytics infrastructure to make DFVA a standalone analytics standard: cross-institutional benchmarking, program-to-market signal correlation, exportable board-ready report packs, and an API for third-party integration. The goal is not just better dashboards — it's positioning DFVA as the analytics layer the market lacks.

## Vibe
Independent. Authoritative. Vendor-neutral. DFVA doesn't compete with curriculum platforms — it complements them with analytics they can't (or won't) build. The visual language should feel like a Bloomberg Terminal for program viability: dense, data-rich, exportable, built for decision-makers.

## User Stories

- As a **Faculty Dean**, I want to see how my programs' DFVA scores compare to equivalent programs at other institutions so I can benchmark my faculty's AI resilience against the sector.
- As a **Deputy Vice-Chancellor (Academic)**, I want a board-ready PDF that summarises portfolio health, risk distribution, trend vs prior year, and recommended actions so I can present to University Council without compiling data manually.
- As a **Program Director**, I want to see the market signals (job posting trends, salary trajectories, AI exposure indices) correlated to my program's dimensions so I understand *why* my scores are what they are.
- As a **CIO / Enterprise Architecture team**, I want a REST API that returns DFVA scores and dimension breakdowns so I can pipe DFVA analytics into the university's data warehouse or BI tools (Power BI, Tableau).
- As a **Competitor institution's strategy team**, I want to submit my institution's programs for DFVA assessment against the same rubric so I can benchmark without building my own analytics pipeline.

## Technical Design

### Architecture
This feature spans three layers: (1) a new analytics data layer with cross-institutional storage and aggregation queries, (2) export/report generation using server-side rendering (PDF, CSV, JSON), and (3) a public API surface for third-party integration.

```
┌─────────────────────────────────────────────────────────────┐
│                    ANALYTICS LAYER                          │
│ ┌──────────────┐  ┌────────────────┐  ┌──────────────────┐ │
│ │ Cross-Inst.   │  │ Market Signal  │  │ Trend Tracking   │ │
│ │ Benchmarking  │  │ Correlation    │  │ (annual scoring) │ │
│ └──────┬───────┘  └──────┬─────────┘  └────────┬─────────┘ │
│        │                 │                       │          │
│        └─────────┬───────┴───────────────────────┘          │
│                  │                                           │
│        ┌─────────▼──────────────────────────────┐           │
│        │        Analytics Query Layer            │           │
│        │  /analytics/cross-institutional          │           │
│        │  /analytics/market-signal-correlation    │           │
│        │  /analytics/trend/:programCode           │           │
│        └─────────┬──────────────────────────────┘           │
└──────────────────┼──────────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────────┐
│                   EXPORT LAYER                                │
│ ┌──────────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│ │ Board-Ready PDF  │  │ CSV Export   │  │ JSON Data Dump  │ │
│ │ (server-rendered)│  │ (portfolio)  │  │ (full dimension) │ │
│ └──────────────────┘  └──────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────────┐
│                    API LAYER                                  │
│ GET  /api/v1/programs                                        │
│ GET  /api/v1/programs/:code                                  │
│ GET  /api/v1/analytics/portfolio-health                      │
│ POST /api/v1/assessments (submit external program)           │
└─────────────────────────────────────────────────────────────┘
```

### Current State (as of 2026-06-15)

| Component | Status | Details |
|-----------|--------|---------|
| PortfolioHealthPage | ✅ Exists | University-wide risk distribution, dimension gaps, threshold programs, recommended actions |
| FacultyDashboard | ✅ Exists | Per-faculty scoring table with dimension averages, risk bands |
| InsightsGate | ✅ Exists | Premium tier gate (currently bypassed: IS_LICENSED_DEMO=true) |
| InsightsPage | ✅ Exists | Faculty card grid with average scores, links to portfolio + faculty detail |
| ReportsPage | ✅ Exists | List of program assessment reports with links |
| ReportDetailPage | ✅ Exists | Single program detail: dimension radar, scores, recommendations |
| assessProgram (action) | ✅ Exists | Accepts handbook URL, returns DFVA assessment |
| Cross-institutional benchmarking | ❌ Missing | No multi-institution data model or comparison UI |
| Market signal correlation view | ❌ Missing | No visual linking of job posting trends / AIOE / salary data to dimension scores |
| Trend tracking (year-over-year) | ❌ Missing | Scores are snapshots; no temporal comparison |
| Board-ready PDF export | ❌ Missing | No PDF generation pipeline |
| CSV/JSON export | ❌ Missing | No bulk data export endpoints |
| Public/API assessment endpoint | ❌ Missing | No programmatic submission for external institutions |
| REST API surface | ❌ Missing | No documented API for third-party integration |
| Go8 benchmark data | ⚠️ Partial | Pilot compared 3 CS/ClinPsych programs across UniMelb/USyd/UNSW — hardcoded in methodology doc, not in app |
| Market data enrichment | ✅ Exists | marketDataService.ts enriches D10 with QILT, JSA, AIOE data |

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Multi-institution data model | New `Institution` and `InstitutionalAssessment` Prisma models | Separate namespace from internal UniMelb assessments; enables anonymous benchmarking |
| Benchmark data source | Manual CSV import + optional self-serve via API | Phase 1: DFVA team loads competitor data. Phase 2: external institutions self-submit via API |
| PDF generation | Puppeteer/Playwright server-side rendering | Reuses existing React components for consistent visual output; no template duplication |
| API authentication | API key per institution (hashed in DB) | Simple, standard, doesn't require Wasp auth integration for external consumers |
| Trend tracking | New `AssessmentSnapshot` model with timestamp | Each annual assessment saved as immutable snapshot; queries compare latest vs prior |
| Chart library for dashboards | Recharts (already in project via shadcn/ui) | Consistent with existing UI; no new dependency |
| Market signal visualisation | Sparklines + delta indicators embedded in dimension cards | Compact, scannable; follows Bloomberg-terminal density aesthetic |
| Export format | PDF (primary), CSV + JSON (secondary) | PDF targets senior leadership/board; CSV/JSON targets analysts and BI tools |

### Dependencies
- **Wasp 0.22** — routes, queries, actions for new analytics endpoints
- **Prisma (PostgreSQL)** — new models: `Institution`, `InstitutionalAssessment`, `AssessmentSnapshot`, `ApiKey`
- **React 19** — new analytics UI components
- **Recharts** — already in project via shadcn/ui admin dashboards
- **Playwright** (new dependency) — PDF generation via server-side rendering
- **PapaParse** (new dependency) — CSV export
- **Express/Node.js HTTP server** — REST API routes (can run alongside Wasp server or as separate service)

## Scope

### In Scope (MVP — "Analytics Standard v1")
- [ ] **Cross-institutional benchmark view:** Upload Go8 CS/IT and Clinical Psychology assessments; render comparison table + radar overlay
- [ ] **Market signal correlation dashboard:** Per-program view correlating dimension scores with JSA shortage status, AIOE index, QILT salary and employment rate
- [ ] **Board-ready PDF export for Portfolio Health:** Server-side render PortfolioHealthPage → PDF with cover page, TOC, consistent branding
- [ ] **CSV export for Faculty Dashboard:** Download current faculty comparison table as CSV
- [ ] **Assessment snapshot model + migration:** Add `AssessmentSnapshot` to Prisma schema; backfill current 41 assessments as first snapshot
- [ ] **Year-over-year trend indicator:** On program detail page, show score delta from prior snapshot (if exists)
- [ ] **REST API v1 (internal-only):** `GET /api/v1/programs`, `GET /api/v1/programs/:code`, `GET /api/v1/analytics/portfolio-health`
- [ ] **API key management UI (admin):** Generate, revoke, and view API keys for institutional partners

### Out of Scope (Future)
- Self-serve institutional onboarding portal (institutions create their own accounts)
- Public benchmarking leaderboard
- SOC 2 / ISO 27001 compliance for API
- White-label embedding (iframe-able dashboards for partner institutions)
- Real-time job posting data pipeline (uses static GOS/JSA/AIOE data in v1)
- Program-level market data (field-level aggregation only in v1)
- Alerting/notification system ("Program X dropped 4 points this year")
- Multi-language support for international institutions

## Acceptance Criteria
- [ ] Go8 benchmark comparison renders for 3+ institutions side-by-side (program match by field, not by exact name)
- [ ] Portfolio Health PDF exports correctly: cover page, risk distribution chart, key findings, recommended actions, programs-on-threshold table (formatting preserved from on-screen view)
- [ ] Faculty Dashboard CSV exports with headers: Faculty, Programs, Avg Score, Resilient, Moderate, High, Critical, Weakest Dimension
- [ ] Program detail page shows score delta badge (e.g., "+2 from 2025 assessment") when prior snapshot exists
- [ ] Market signal correlation view shows at minimum: AIOE percentile, JSA shortage status, QILT employment rate, median salary for each program's field
- [ ] API endpoints return valid JSON with documented schema; `/api/v1/programs` returns all assessed programs with dimension scores
- [ ] API key authentication: requests without valid `X-API-Key` header return 401; valid key returns data scoped to that institution's assessments
- [ ] New Prisma migration runs without data loss; `AssessmentSnapshot` backfill succeeds for all 41 pilot programs
- [ ] No regression on existing AssessorPage, ReportsPage, or InsightsPage

## Open Questions
- [ ] **Go8 data sourcing:** Do we manually score Go8 programs using the Hermes LLM pipeline, or request self-assessments from partner institutions? Manual scoring is faster but raises questions about scorer bias.
- [ ] **PDF rendering environment:** Playwright requires a headless browser in production — does Wasp's deployment environment (Docker on Fly.io / Railway) support this? Alternative: use @react-pdf/renderer for pure-JS PDF generation (no browser dependency, but loses CSS rendering fidelity).
- [ ] **API versioning strategy:** URL path versioning (`/api/v1/`) or header-based? Path versioning is simpler and more visible to consumers.
- [ ] **Institutional anonymity:** Should benchmarking display institution names (transparent) or anonymised labels (Institution A, B, C)? Transparent is more credible; anonymised reduces political risk.
- [ ] **Snapshot cadence:** Annual snapshots per program, or on-demand? Annual aligns with handbook updates; on-demand supports mid-cycle re-assessment.
- [ ] **Market data update frequency:** Refresh QILT/JSA/AIOE data annually when new reports are published? Or allow manual refresh for specific programs?
- [ ] **Rate limiting on API:** Per-key rate limit (e.g., 100 requests/min)? No rate limit in v1 risks abuse; too strict limits frustrate legitimate use.

## Implementation Tasks

### Phase 1 — Data Layer (estimated 3–4 days)
1. Add Prisma models: `Institution`, `InstitutionalAssessment`, `AssessmentSnapshot`, `ApiKey` — in `compass/app/schema.prisma`
2. Create migration: `wasp db migrate-dev`
3. Write backfill script: create `AssessmentSnapshot` records for all 41 pilot programs using current scores and `2026-06-15` as snapshot date
4. Add Wasp query `getProgramSnapshots(programCode: string)` returning all snapshots for a program ordered by date
5. Add Wasp action `createInstitutionalAssessment` for importing external program scores

### Phase 2 — Dashboard Components (estimated 4–5 days)
6. Build `CrossInstitutionalBenchmark.tsx`: comparison table + radar chart overlay of matched programs across institutions
7. Build `MarketSignalCorrelation.tsx`: per-program view with JSA shortage badge, AIOE percentile bar, QILT employment/salary sparklines
8. Build `ProgramTrendBadge.tsx`: score delta indicator component (reused in ReportDetailPage)
9. Update `ReportDetailPage.tsx` to include trend badge and market signal correlation section below dimension radar
10. Add Go8 benchmark data (hardcoded for v1: MC-CS vs USyd MCompSci vs UNSW MIT; 527CL vs UNSW M Psych Clin)

### Phase 3 — Export Pipeline (estimated 2–3 days)
11. Set up PDF generation service using `@react-pdf/renderer` (pure JS, no headless browser dependency) or Playwright if deployment environment supports it
12. Create `PortfolioHealthPDF.tsx`: server-renderable version of PortfolioHealthPage with cover page and TOC
13. Add Wasp action `exportPortfolioHealthPDF` → returns PDF buffer as base64 data URL
14. Add Wasp action `exportFacultyCSV` → returns CSV string for Faculty Dashboard
15. Add download buttons to PortfolioHealthPage and FacultyDashboard

### Phase 4 — API (estimated 2–3 days)
16. Create Express.js REST API server (or Wasp-compatible route handlers) at `/api/v1/`
17. Implement `GET /api/v1/programs`, `GET /api/v1/programs/:code`, `GET /api/v1/analytics/portfolio-health`
18. Implement API key authentication middleware (validate `X-API-Key` header against hashed keys in `ApiKey` table)
19. Add API key management UI in admin panel: generate, list, revoke keys
20. Document API schema (OpenAPI/Swagger or markdown)

### Phase 5 — Polish & Ship (estimated 2 days)
21. Add "DFVA Analytics Standard" badge/messaging to landing page and Insights gate
22. Add `/insights/benchmark` route for cross-institutional view
23. Add `/insights/market-signals` route for market signal correlation
24. Test all exports (PDF renders correctly, CSV opens in Excel/Numbers)
25. Test API endpoints with curl; verify 401 for missing key, 200 with valid key
26. Commit with message: `feat: industry-wide analytics standard — cross-inst benchmarking, board-ready PDF, REST API v1`
