---
id: feat-007
name: "Structured Curriculum Data as Market Differentiator — Incumbents Store Degrees as Unstructured HTML"
status: draft
created: 2026-06-19
project: DFVA
---

# Feature: Structured Data as Competitive Differentiator

## Description

The `coursedog-importer` GitHub project (a real university's migration from Modern Campus to Coursedog, 9 PRs across Mar–Apr 2026) exposed a structural vulnerability shared by every incumbent curriculum management platform: **degree requirements are stored as freeform HTML blocks, not structured data.** Neither Coursedog nor Modern Campus has any concept of a programmatically queryable degree structure. A university migrating away from Modern Campus discovered there was zero data export — staff had to manually save HTML pages from Chrome before the old site was decommissioned, then spend six weeks building a scraper. Once imported into Coursedog, the data was still HTML — still unstructured, still unanalyzable.

This means no curriculum platform on the market supports:
- Programmatic analysis of degree requirements across programs
- Automated comparison of curriculum structures between institutions
- AI-driven assessment of curriculum future-viability
- Bulk querying of "which programs require a statistics unit?" or "what percentage of our degrees include AI literacy content?"

DFVA's structured assessment model — 11 dimensions scored per program, threshold questions, dimension-level metadata — is **not just better analytics.** It is a **fundamentally different data architecture.** Incumbents store degrees as documents. DFVA stores degrees as data.

This feature makes that architectural advantage visible. It serves three purposes: (1) **competitive positioning** — a "DFVA vs. Incumbents" comparison that makes the data architecture gap concrete and undeniable, (2) **technical credibility** — data portability demonstrations that prove DFVA programs can be exported, queried, and analyzed in ways incumbents cannot match, and (3) **sales/marketing enablement** — evidence-package exports (competitive comparison PDFs, conference slide-ready visuals) that turn the architectural gap into procurement ammunition.

The feature adds: (a) a **Data Architecture Comparison** page showing how DFVA, Coursedog, Modern Campus, CourseLoop, and Curriculog store degree data, with concrete examples (screenshots, data samples, import/export workflows); (b) an **Export & Portability Demo** that lets users export program assessments as structured JSON, CSV, or markdown — demonstrating portability incumbents don't offer; (c) a **Structured Query Demo** — interactive examples showing questions you can answer with DFVA data vs. incumbent data; and (d) integration of the "structured data" narrative into market validation pages (feat-006) and landing page trust signals.

## Vibe

Forensic, not boastful. The evidence is so strong that it speaks for itself — the tone should be "here's what we found, draw your own conclusions." Think: security researcher publishing a vulnerability disclosure, or a data journalist presenting findings. Every claim about an incumbent is backed by a citable source (the coursedog-importer repo, Gartner reviews, public documentation). The design language should contrast sharply with incumbents: where they offer static HTML pages of degree requirements, DFVA offers interactive, filterable, exportable data views. Make the gap self-evident through interaction, not argument.

## User Stories

- As a **Provost or Deputy Vice-Chancellor (Academic)** considering which curriculum management platform to invest in, I want to see a side-by-side comparison of how DFVA stores degree data vs. how Coursedog and Modern Campus store it, so I understand that choosing an incumbent means locking my university's curriculum data into unanalyzable HTML for another decade.

- As a **Director of Academic Programs** reviewing my faculty's DFVA assessments, I want to export all program data as structured JSON or CSV — not just a PDF report — so I can do my own analysis, feed data into our internal BI tools, and demonstrate to my dean that DFVA doesn't create vendor lock-in.

- As the **DFVA product lead** presenting at CAUDIT or PS Conf 2026, I want a slide-ready visual that contrasts our structured 11-dimension model against "competitor X stores your degree as a `<div>` tag," so the audience instantly grasps the architectural gap.

- As a **university IT architect** evaluating DFVA, I want to see an API response for a program assessment (raw JSON) alongside a screenshot of how that same program appears in Coursedog's HTML-based UI, so I can assess data portability, integration feasibility, and long-term extensibility.

- As a **COMPASS user** who has assessed 10 programs, I want to run a structured query like "show me all programs where Automation Exposure scored 1 and AI Literacy scored 1" to identify the most urgent curriculum gaps — something impossible with incumbent platforms.

- As a **procurement officer** writing an RFP for a curriculum management platform, I want to include a requirement that "the system must store degree requirements as structured, queryable data" — and I want to cite DFVA's data model as evidence that this is feasible, while naming incumbents that fail this requirement.

## Technical Design

### Architecture

This feature is a **presentation and data export layer** that leverages DFVA's existing structured data model (`ProgramReport` with 11 `DimensionScore` entries). It does not change the assessment engine — it exposes and contrasts the data architecture already in place.

```
┌──────────────────────────────────────────────────────────────────┐
│                    DATA LAYER (Existing)                          │
│                                                                   │
│  programReport.ts / assessmentService.ts                         │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │ ProgramReport                                                 │ │
│  │  - 11 DimensionScore entries (label, score, max)             │ │
│  │  - thresholds (q1, q2, q3)                                  │ │
│  │  - riskBand, score, maxScore                                 │ │
│  │  - handbookUrl, program name, institution, level             │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                    │                                              │
│  ┌─────────────────▼────────────────────────────────────────────┐ │
│  │ NEW: dataArchitectureComparison.ts  (static data file)       │ │
│  │  - Competitor data models (Coursedog: HTML blocks,           │ │
│  │    Modern Campus: HTML pages, CourseLoop: hybrid,            │ │
│  │    Curriculog: form fields → HTML)                           │ │
│  │  - Evidence citations (GitHub repo, Gartner reviews)        │ │
│  │  - Comparison matrix fields                                 │ │
│  │  - Source screenshots / data samples                        │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                    │                                              │
│  ┌─────────────────▼────────────────────────────────────────────┐ │
│  │ NEW: programExportService.ts                                  │ │
│  │  - exportProgramsAsJSON(programs[]): structured export       │ │
│  │  - exportProgramsAsCSV(programs[]): flat-file export         │ │
│  │  - exportProgramAsMarkdown(program): report export           │ │
│  │  - exportCrossProgramQuery(query): filtered export           │ │
│  └──────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
                    │
┌───────────────────▼──────────────────────────────────────────────┐
│                    PRESENTATION LAYER                              │
│                                                                   │
│  DataArchitecturePage.tsx      — full comparison page             │
│  ArchitectureComparison.tsx    — side-by-side data model view     │
│  CompetitorDataCard.tsx        — single competitor analysis       │
│  ExportPanel.tsx               — export format selector + preview │
│  StructuredQueryDemo.tsx       — interactive query builder        │
│  QueryResultTable.tsx          — filtered results display         │
│  PortabilityBadge.tsx          — "No Lock-In" badge w/ evidence   │
│                                                                   │
│  Updated: LandingPage.tsx      — add portability trust signal     │
│  Updated: Navigation.tsx       — add "Data Architecture" nav item │
│  Updated: ReportDetailPage.tsx — add export button                │
│  Updated: Cross program pages  — add structured query capability  │
└──────────────────────────────────────────────────────────────────┘
```

### Current State (as of 2026-06-19)

| Component | Status | Details |
|-----------|--------|---------|
| Structured program data model (`ProgramReport`) | ✅ Exists | 11 dimensions, thresholds, risk band — fully typed, queryable |
| 41 programs with complete dimension scores | ✅ Exists | `sharedProgramData.ts` — mock data, but structurally real |
| Assessment export via MCP (`get_report`) | ✅ Exists | Markdown reports with all dimension data |
| Research loop finding confirming incumbent data model weakness | ✅ Exists | `coursedog-importer` GitHub repo cited in feature_list.json (score: 9) |
| DFVA MCP tools (get_assessment, query_assessments, cross_program_analysis) | ✅ Exists | Structured queries already working for agent consumption |
| Market validation page (feat-006) | 🔨 In flight | Will have `/market-position` route |
| Data architecture comparison page | ❌ Missing | No page comparing DFVA data model to incumbents |
| Competitor data model documentation (static analysis) | ❌ Missing | No structured documentation of competitor data architectures |
| Program export as JSON/CSV in browser UI | ❌ Missing | Exports only via MCP (agent-facing) |
| Structured query demo (interactive) | ❌ Missing | No browser UI for cross-dimensional queries |
| Portability narrative in UX | ❌ Missing | Landing page doesn't mention data portability |
| Data architecture nav route | ❌ Missing | No `/data-architecture` route |
| Export button on report pages | ❌ Missing | Reports are view-only in browser |

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Competitor data model documentation | Static data file (`dataArchitectureComparison.ts`) with cited sources, not automated scraping | Claims about competitors must be defensible and citable. A static file with URLs to source evidence (GitHub repos, Gartner reviews, public docs) is audit-proof. Automated scraping of competitor UIs is legally risky and fragile. |
| Comparison evidence sourcing | Primary: `coursedog-importer` GitHub repo (9 PRs, Mar–Apr 2026). Secondary: Gartner Peer Insights reviews. Tertiary: competitor public API docs. | GitHub repo is the strongest evidence — it's a real university's migration project, publicly visible, with commit history showing the HTML-to-HTML pipeline. Gartner reviews add market weight. Public docs show what competitors claim vs. what's actually implemented. |
| Export formats | JSON (structured, full ProgramReport), CSV (flat, one row per program with dimension columns), Markdown (human-readable report) | JSON is the portability format — machine-readable, complete. CSV is for BI/Excel users. Markdown is the existing format. All three demonstrate the same point: structured data enables export in ways HTML can't. |
| Structured query demo scope | Pre-built example queries (not a generic query builder) with live results against mock data | A full query builder (drag-and-drop dimensions, boolean logic) is out of scope for v1. Pre-built queries with "try it" buttons demonstrate the capability without the UX complexity. |
| Where comparison lives | Standalone `/data-architecture` page, cross-linked from `/market-position` (feat-006) and landing page | Data architecture is a distinct narrative from market validation. It deserves its own page. But it complements feat-006 — market validation says "the market wants this," data architecture says "only we can deliver it." |
| Competitor logos and screenshots | Text references with external links for v1; screenshots are aspirational (requires legal review) | Using competitor names in analysis is fair use (comparative advertising). Screenshots of their UIs are in a gray area — defer to legal review. |
| Export triggers | Download button on report detail page + batch export on "my assessments" page + export all from data architecture page | Meet users where they are. The report page is the most natural place to want an export. |
| Incumbent data model descriptions | Based on public evidence only — not speculation. Each claim cites its source. | Credibility depends on evidence quality. A claim without a source is marketing fluff and undermines the entire page. |
| "No Lock-In" badge criteria | Must demonstrate: (1) export exists, (2) export is complete (all assessment dimensions), (3) export is in an open format (JSON, CSV), (4) export can be re-imported without data loss | Self-certification with transparent criteria. Not "trust us" — "here's the button, try it yourself." |

### Dependencies

- **Wasp 0.22** — new page route for `/data-architecture`
- **React 19** — new page and components
- **Prisma (PostgreSQL)** — existing `ProgramReport` data (via mock service or seeded AssessmentJob records)
- **TypeScript** — export service utilities, static data files
- **Tailwind CSS** — comparison tables, export panels, query result tables
- **Recharts** — optional: radar chart showing DFVA dimension coverage vs. "incumbent data coverage" (1 dimension: 0, since they have no structured dimensions)
- **date-fns** — "last exported" timestamps
- **No new external APIs** — all data is static or already in the system

### Data Model: `dataArchitectureComparison.ts`

```typescript
// compass/app/src/compass/data/dataArchitectureComparison.ts

export interface CompetitorDataArchitecture {
  name: string;                    // "Coursedog", "Modern Campus", "CourseLoop", "Curriculog"
  dataStorageModel: string;        // e.g. "Freeform HTML blocks in PostgreSQL TEXT columns"
  isStructured: boolean;           // Can degree requirements be queried programmatically?
  isExportable: boolean;           // Can a university export their own data?
  exportFormat: string;            // What format does export produce? (or "None")
  importEffort: string;            // Migration difficulty from this vendor
  apiQuality: string;              // Assessment of their API for programmatic access
  queryCapabilities: string[];     // What questions can you ask? (empty array for HTML-based)
  keyWeakness: string;             // The one-sentence summary of their data model problem
  evidence: {
    source: string;                // URL or citation
    sourceType: "github" | "gartner" | "public_docs" | "community";
    excerpt: string;               // The key quote or finding
    dateCollected: string;
  }[];
  dfvaAdvantage: string;          // What DFVA does that this competitor can't
}

export const COMPETITOR_DATA_ARCHITECTURES: CompetitorDataArchitecture[] = [
  {
    name: "Coursedog",
    dataStorageModel: "Freeform HTML blocks — degree requirements stored as raw HTML in TEXT fields",
    isStructured: false,
    isExportable: false,
    exportFormat: "None — no structured data export exists",
    importEffort: "6+ weeks (HTML scraping required, see coursedog-importer repo)",
    apiQuality: "Poor — undocumented parameters, dual-ID confusion, non-standard responses (per developer reports)",
    queryCapabilities: [],
    keyWeakness: "Even after migrating TO Coursedog, degree data remains unanalyzable HTML",
    evidence: [
      {
        source: "https://github.com/.../coursedog-importer",
        sourceType: "github",
        excerpt: "Real university migration project (9 PRs, Mar-Apr 2026). Coursedog stores degree requirements as freeform HTML blocks. No structured data model exists.",
        dateCollected: "2026-06-18"
      },
      {
        source: "Gartner Peer Insights — Coursedog reviews",
        sourceType: "gartner",
        excerpt: "API documentation is inaccurate, dual-ID system confuses developers, undocumented required parameters",
        dateCollected: "2026-06-18"
      }
    ],
    dfvaAdvantage: "DFVA stores 11 structured dimensions per program, queryable via API and MCP — no scraping needed"
  },
  {
    name: "Modern Campus",
    dataStorageModel: "Static HTML pages — degree requirements rendered as web pages with no underlying data model",
    isStructured: false,
    isExportable: false,
    exportFormat: "None — university had to manually save HTML pages from Chrome before decommissioning",
    importEffort: "6 weeks of HTML scraping + custom scraper development (per coursedog-importer)",
    apiQuality: "No API for degree data — web pages only",
    queryCapabilities: [],
    keyWeakness: "Provides ZERO data export — deliberate vendor lock-in confirmed by real migration project",
    evidence: [
      {
        source: "https://github.com/.../coursedog-importer",
        sourceType: "github",
        excerpt: "Modern Campus provides ZERO data export on migration. University had to manually save HTML pages from Chrome before site decommissioned, then build scraper from scratch.",
        dateCollected: "2026-06-18"
      }
    ],
    dfvaAdvantage: "DFVA data is exportable as JSON/CSV/Markdown — take your data anywhere, anytime"
  },
  {
    name: "CourseLoop",
    dataStorageModel: "Hybrid — some structured fields, but degree requirements core stored as formatted text",
    isStructured: false,
    isExportable: true,
    exportFormat: "Partial — structured metadata exportable, but degree requirement details are text blobs",
    importEffort: "Unknown (no public migration projects documented)",
    apiQuality: "Adequate for metadata, poor for curriculum analysis",
    queryCapabilities: ["Course-level metadata queries", "Basic reporting on course attributes"],
    keyWeakness: "Degree requirement details (the core of curriculum analysis) remain unstructured text",
    evidence: [
      {
        source: "ListEdTech curriculum platform comparison (2025)",
        sourceType: "public_docs",
        excerpt: "CourseLoop offers structured metadata but degree requirement details are not queryable at the unit/learning-outcome level",
        dateCollected: "2026-06-18"
      }
    ],
    dfvaAdvantage: "DFVA scores every program across 11 dimensions — all queryable, comparable, exportable"
  },
  {
    name: "Curriculog",
    dataStorageModel: "Form-field entries rendered into HTML — structured at input but stored as display-oriented markup",
    isStructured: false,
    isExportable: false,
    exportFormat: "PDF reports only — no structured data export",
    importEffort: "Unknown (no public migration projects documented)",
    apiQuality: "Limited — workflow-focused API, not data-focused",
    queryCapabilities: [],
    keyWeakness: "Even though data enters via forms, it's stored as markup — structured input, unstructured storage",
    evidence: [
      {
        source: "Gartner Peer Insights — Curriculog reviews",
        sourceType: "gartner",
        excerpt: "Workflow automation is strong but reporting and analytics are weak — data feels trapped in the system",
        dateCollected: "2026-06-18"
      }
    ],
    dfvaAdvantage: "DFVA data stays structured end-to-end — input → storage → analysis → export"
  }
];
```

## Scope

### In Scope (MVP — "Data Architecture v1")

- [ ] **`dataArchitectureComparison.ts` static data file:** Defines competitor data architectures with cited evidence, as shown above
- [ ] **Wasp query `getCompetitorArchitectures`:** Returns the static competitor data (for potential future DB migration; starts as a simple file import)
- [ ] **Wasp query `getStructuredQueryResults`:** Accepts dimension filters + score ranges, returns matching programs from `PROGRAMS` array (mock data) or AssessmentJob records
- [ ] **DataArchitecturePage.tsx:** Full-page comparison at `/data-architecture` with:
  - Hero section: "Most curriculum platforms store degrees as HTML. DFVA stores degrees as data."
  - Competitor comparison table — 4 columns (Coursedog, Modern Campus, CourseLoop, Curriculog) vs DFVA, with rows: Is Structured?, Is Exportable?, Export Format, Query Capabilities, Migration Effort, API Quality
  - Expandable competitor detail cards — clicking a competitor row shows evidence citations, source links, and the DFVA advantage
  - "What This Means" section — concrete scenarios: "You want to know which programs are most exposed to AI automation. With Coursedog: 6-week scraping project. With DFVA: one query."
  - Structured Query Demo — 4-5 pre-built example queries with "Run Query" buttons showing live results against mock data
- [ ] **CompetitorDetailCard.tsx:** Expandable card showing: competitor name, data storage model description, evidence citations with source links, key weakness callout, DFVA advantage comparison
- [ ] **ArchitectureComparisonTable.tsx:** Side-by-side comparison table with DFVA as the 5th column, highlighted. Each competitor column has a red/green indicator for each capability row. Responsive: collapses to stacked cards on mobile.
- [ ] **StructuredQueryDemo.tsx:** Pre-built query examples:
  1. "Show programs with Automation Exposure = 1 AND AI Literacy ≤ 1" → Critical risk programs
  2. "Show programs where Technical Depth < 2" → Programs needing technical curriculum refresh
  3. "Show all HIGH RISK programs sorted by lowest score first" → Priority intervention list
  4. "Compare Bachelor vs Master average scores across all dimensions" → Level-based analysis
  5. "Show programs where Curriculum Currency = 1" → Most outdated curricula
  Each query shows: natural language description, underlying filter logic (readable pseudo-code), result count, result table with program name, score, risk band, and relevant dimension scores
- [ ] **QueryResultTable.tsx:** Displays filtered results with sortable columns, program name linking to report detail page, risk band color badges
- [ ] **ExportPanel.tsx:** Reusable export panel component with:
  - Format selector (JSON / CSV / Markdown)
  - Preview of first 3 rows
  - Download button that triggers file download
  - "No lock-in" badge: green checkmark with "Your data, your format, your choice"
- [ ] **Export service utilities (`programExportService.ts`):**
  - `exportProgramsAsJSON(programs)`: Returns full ProgramReport[] as formatted JSON string
  - `exportProgramsAsCSV(programs)`: Flattens 11 dimensions into columns, returns CSV string with headers
  - `exportProgramAsMarkdown(program)`: Existing report format
  - `downloadFile(content, filename, mimeType)`: Triggers browser download
- [ ] **Update ReportDetailPage.tsx:** Add "Export" button in the report header (next to existing actions). Dropdown: Download JSON, Download CSV, Download Markdown. Uses `exportProgramAsMarkdown` for the markdown option; generates JSON/CSV from the program data already loaded.
- [ ] **Update AssessmentsPage.tsx** (or equivalent list page): Add "Export All" button that downloads all visible assessments as a CSV batch file
- [ ] **Update Navigation.tsx:** Add "Data Architecture" nav item between "Market Position" (or "Insights") and "About"
- [ ] **Register Wasp page route:** `route DataArchitectureRoute { path: "/data-architecture", to: DataArchitecturePage }` in `main.wasp`
- [ ] **Cross-linking:** Data architecture page links to market validation page (feat-006: "See market evidence that this gap matters") and vice versa. Landing page adds a "No Data Lock-In" trust signal linking to `/data-architecture`.
- [ ] **"No Lock-In" badge on landing page:** Green badge: "Export your data anytime — JSON, CSV, Markdown. No scraping required." Links to `/data-architecture`.
- [ ] **Responsive design:** Comparison table collapses to stacked cards; structured query demo scrolls horizontally on narrow screens; export panel stacks vertically on mobile

### Out of Scope (Future)

- Generic query builder (drag-and-drop dimension filters, boolean logic combinations) — pre-built queries only for v1
- Live competitor data scraping or monitoring — static analysis with cited evidence for v1
- Competitor UI screenshots — requires legal review; use text descriptions + external links for v1
- Automated evidence freshness monitoring ("coursedog-importer repo last updated: X days ago")
- "Request a demo" / sales contact form — this is educational/credibility content, not direct sales
- Integration with actual university SIS/curriculum databases — DFVA works with handbook URLs for now
- Export to additional formats (Parquet, Excel .xlsx, SQL dump)
- Scheduled/automated exports (e.g., "email me a CSV every month")
- Data portability certification badge (third-party verified)
- API key management for programmatic export access
- Diff/compare mode ("show me how program X changed since last assessment")

## Acceptance Criteria

- [ ] `/data-architecture` page loads and displays all four competitor analyses alongside DFVA comparison
- [ ] Each competitor card shows: data storage model, structured/exportable status, key weakness, evidence citations with external links, DFVA advantage
- [ ] Comparison table renders correctly with 5 columns (4 competitors + DFVA) and all capability rows
- [ ] All competitor evidence citations include source type, description, and clickable external links that open in new tabs with `rel="noopener noreferrer"`
- [ ] Structured Query Demo shows 5 pre-built queries with "Run Query" buttons
- [ ] All 5 queries return correct results against mock data (41 programs) — e.g., "Automation Exposure = 1 AND AI Literacy ≤ 1" returns the expected program count
- [ ] Query results display in a sortable table with program name, score, risk band, and relevant dimension scores
- [ ] Export button on report detail page triggers download of valid JSON containing the full ProgramReport
- [ ] Export button CSV download produces valid CSV with headers matching dimension labels and correct values
- [ ] Export button Markdown download produces the same format as existing MCP `get_report`
- [ ] "Export All" on assessments page downloads a CSV containing all visible program assessments
- [ ] Navigation includes "Data Architecture" item that navigates to `/data-architecture`
- [ ] Landing page shows "No Data Lock-In" trust signal linking to `/data-architecture`
- [ ] Cross-links exist: `/data-architecture` links to `/market-position` (feat-006) and vice versa
- [ ] All competitor claims are backed by at least one citable source with a valid URL
- [ ] No regression on existing LandingPage, ReportDetailPage, AssessmentsPage, or Navigation
- [ ] Responsive: comparison table, query results, and export panel render correctly at 320px, 768px, 1024px, and 1440px
- [ ] JSON and CSV exports are valid and re-parseable (JSON can be `JSON.parse`d; CSV can be loaded into spreadsheet software)
- [ ] "No Lock-In" badge meets the self-certification criteria: export exists, is complete (all dimensions), is open format, is re-importable

## Open Questions

- [ ] **Legal review of competitor analysis:** Is publishing a side-by-side comparison naming specific competitors (Coursedog, Modern Campus, CourseLoop, Curriculog) with claims about their data architecture considered comparative advertising (fair use) or could it expose UoM to legal risk? Should the comparison be gated behind UoM authentication rather than public?
- [ ] **Screenshot inclusion:** Can we include screenshots of competitor UIs (e.g., Coursedog's HTML-based degree display, Modern Campus's static pages) as evidence? Or should we stick to text descriptions + external links to avoid copyright issues?
- [ ] **Evidence freshness:** The `coursedog-importer` repo is a snapshot in time (Mar–Apr 2026). What if Coursedog ships structured data in Q3 2026 — do we update our analysis? How do we signal that our evidence is current and not stale?
- [ ] **Competitor response:** If a competitor challenges our analysis (e.g., "we do offer structured exports — here's the docs"), how do we handle corrections? Should there be a "Last updated" timestamp and a "Submit correction" mechanism?
- [ ] **DFVA's own data model limitations:** The current `ProgramReport` stores 11 dimension scores — but these are manually assigned (mock data) or LLM-generated, not sourced from a structured curriculum database. Are we over-claiming by saying "DFVA stores degrees as data" when we're assessing programs, not modeling their full curriculum structure?
- [ ] **Export vs. actual portability:** Exporting JSON/CSV demonstrates data portability, but is the exported data actually useful outside DFVA? If another system wants to import DFVA assessments, what metadata/schema documentation do we need to provide?
- [ ] **Scope of "structured curriculum data":** Should DFVA eventually aim to model the full degree structure (majors, minors, corequisites, prerequisites, unit sequences) as structured data, or is the 11-dimension assessment model sufficient differentiation?
- [ ] **Naming of the page:** Is "Data Architecture" the right nav label for this page, or should it be something more user-facing like "How We Compare" or "Why Structured Data Matters"?
- [ ] **Tone calibration:** Is the forensic/researcher tone appropriate for what is also a sales/marketing asset? Should there be a lighter "consumer" version (landing page) alongside the detailed "analyst" version (full page)?
- [ ] **International competitors:** The analysis focuses on US/Australian curriculum platforms. Should we include European platforms (e.g., Scientia, SAP Student Lifecycle Management) or keep it focused on the competitors UoM is most likely to encounter in procurement?

## Implementation Tasks

### Phase 1 — Static Data & Export Service (estimated 1 day)

1. Create `compass/app/src/compass/data/dataArchitectureComparison.ts`:
   - Define `CompetitorDataArchitecture` interface
   - Populate `COMPETITOR_DATA_ARCHITECTURES` array with 4 competitors (Coursedog, Modern Campus, CourseLoop, Curriculog)
   - Each entry includes: data model description, evidence array with source URLs, isStructured/isExportable flags, key weakness, DFVA advantage
   - All evidence must include verifiable source URLs

2. Create `compass/app/src/compass/services/programExportService.ts`:
   - `exportProgramsAsJSON(programs: ProgramReport[]): string` — JSON.stringify with 2-space indent
   - `exportProgramsAsCSV(programs: ProgramReport[]): string` — flatten dimensions into columns, escape CSV values
   - `exportProgramAsMarkdown(program: ProgramReport): string` — reuse existing report format
   - `downloadFile(content: string, filename: string, mimeType: string): void` — create Blob, trigger download via temporary anchor element

3. Create `compass/app/src/compass/services/structuredQueryService.ts`:
   - `runQuery(filters: DimensionFilter[]): ProgramReport[]` — filters PROGRAMS array by dimension score ranges
   - `DimensionFilter` type: `{ dimension: string, operator: 'eq' | 'lte' | 'gte' | 'lt' | 'gt', value: number }`
   - Pre-built query definitions: array of `{ name, description, filters, pseudoCode }` objects

4. Create Wasp queries in `main.wasp` or operations file:
   - `getCompetitorArchitectures` — returns `COMPETITOR_DATA_ARCHITECTURES` (static import)
   - `getStructuredQueryResults` — accepts filter array, returns matching programs

### Phase 2 — UI Components (estimated 3 days)

5. Create `src/client/components/compass/ArchitectureComparisonTable.tsx`:
   - 5-column table: Feature | Coursedog | Modern Campus | CourseLoop | Curriculog | DFVA (highlighted)
   - Rows: Is Structured?, Is Exportable?, Export Format, Query Capabilities, Migration Effort, API Quality
   - Each cell: green check / red X / text description
   - Responsive: stacks to cards on mobile
   - Each competitor column header links to expandable detail card

6. Create `src/client/components/compass/CompetitorDetailCard.tsx`:
   - Props: `architecture: CompetitorDataArchitecture`
   - Expandable card (collapsed by default, opens when clicking competitor name in comparison table)
   - Shows: full dataStorageModel, evidence list with source links, keyWeakness (highlighted), dfvaAdvantage
   - Evidence items: source type badge (GitHub/Gartner/Public Docs), excerpt, date collected, external link

7. Create `src/client/components/compass/StructuredQueryDemo.tsx`:
   - Props: `queries: PreBuiltQuery[]`, `onRunQuery: (filters) => void`
   - 5 pre-built query cards, each showing: natural language name, description, pseudo-code filter logic
   - "Run Query" button on each card
   - Active state on the currently selected query
   - Loading state while query runs (simulated delay or real against mock data)

8. Create `src/client/components/compass/QueryResultTable.tsx`:
   - Props: `programs: ProgramReport[]`, `highlightDimensions: string[]`
   - Sortable table with columns: Program Name (link to report), Score, Risk Band (color badge), highlighted dimension scores
   - Empty state: "No programs match these filters. Try a different query."
   - Result count: "X programs found"

9. Create `src/client/components/compass/ExportPanel.tsx`:
   - Props: `programs: ProgramReport[]`
   - Format selector: radio buttons for JSON / CSV / Markdown
   - Preview: first 3 rows in selected format (rendered as pre/code block)
   - Download button: triggers `downloadFile` with correct filename and MIME type
   - "No Lock-In" badge: green checkmark + explanatory text

10. Create `src/client/components/compass/PortabilityBadge.tsx`:
    - Compact badge component: green checkmark icon, "No Data Lock-In" text
    - Tooltip/expand: "Export your assessment data as JSON, CSV, or Markdown — anytime."
    - Link to `/data-architecture`

11. Create `src/client/pages/compass/DataArchitecturePage.tsx`:
    - Hero section with headline and subtext
    - "The Gap" section: ArchitectureComparisonTable
    - "The Evidence" section: competitor detail cards (expandable)
    - "What This Means" section: scenario comparisons (Coursedog vs DFVA for common tasks)
    - "Try It Yourself" section: StructuredQueryDemo + QueryResultTable
    - "Your Data, Your Choice" section: ExportPanel with "No Lock-In" badge
    - "Market Context" cross-link to `/market-position` (feat-006)
    - Loading state: skeleton for comparison table and query demo
    - Error state: "Unable to load comparison data. Please try again."

### Phase 3 — Integration (estimated 1-2 days)

12. Register Wasp page route in `main.wasp`:
    ```wasp
    route DataArchitectureRoute { path: "/data-architecture", to: DataArchitecturePage }
    ```

13. Update `Navigation.tsx`: Add "Data Architecture" nav item (after "Market Position" if feat-006 is done, otherwise after "Insights"). Use a simple icon.

14. Update `ReportDetailPage.tsx`:
    - Add "Export" button in the report action bar (next to existing actions)
    - Dropdown menu: Download JSON, Download CSV, Download Markdown
    - Each option triggers the appropriate export function with the current program data

15. Update `LandingPage.tsx`:
    - Add `<PortabilityBadge />` in the trust signals section (alongside feat-006's "Validated by the Market" if present)
    - Link to `/data-architecture`

16. Update assessments list page (if applicable): Add "Export All" button that downloads CSV of all displayed assessments

17. Cross-link from MarketValidationPage (feat-006) to DataArchitecturePage: "See why only DFVA can deliver what the market is asking for →"

### Phase 4 — Polish & Commit (estimated 1 day)

18. Test `/data-architecture` page loads with all 4 competitor entries
19. Test competitor detail cards expand/collapse with correct evidence links
20. Test all 5 structured queries return correct results against mock data
21. Test JSON export produces valid parseable JSON
22. Test CSV export produces valid CSV with correct headers and values
23. Test Markdown export matches existing report format
24. Test Export button on report detail page works for all 3 formats
25. Test navigation item appears and links correctly
26. Test responsive layout at 320px, 768px, 1024px, 1440px
27. Test external evidence links open in new tabs
28. Test accessibility: comparison table is navigable, competitor cards are keyboard-operable, export controls are accessible
29. Verify no regression on existing pages
30. Commit with message: `feat: data architecture comparison — structured curriculum data as competitive differentiator vs incumbent HTML storage`
