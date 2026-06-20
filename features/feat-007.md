---
id: feat-007
name: Structured Curriculum Data as Market Differentiator
status: draft
created: 2026-06-21
project: DFVA
priority: high
score: 9
type: market_gap
source: research-loop forums
---

# Feature: Structured Curriculum Data as Market Differentiator

## Description

DFVA's structured assessment model is a fundamentally different data architecture from every competitor in the curriculum management market. Research confirms both Coursedog and Modern Campus store degree requirements as freeform HTML blocks — NOT structured, queryable data. No curriculum platform in the market supports programmatic analysis of degree requirements. This feature hardens, documents, and productizes DFVA's structured curriculum data architecture so it becomes a visible, demonstrable competitive differentiator — not just an internal implementation detail.

## Vibe

Confident, architectural — DFVA doesn't just do better analytics, it's built on a better data model. The structured data is the moat.

## User Stories

- As a **curriculum committee member**, I want to see a program's subject dependencies, stream pathways, and credit structure as structured data (not just a score) so that I can understand what makes a program resilient or vulnerable at the curriculum level.
- As a **DFVA product manager**, I want a side-by-side comparison page showing "How DFVA stores curriculum data vs. how Coursedog / Modern Campus / CourseLoop store it" so that prospective university customers see the architectural advantage immediately.
- As a **university IT architect evaluating curriculum platforms**, I want a clean, documented REST API that returns structured curriculum assessments (subjects, streams, prerequisites, credit points, levels) so that I can integrate DFVA data into our internal analytics stack without scraping HTML.
- As a **DFVA API consumer** (another university), I want to query "which programs have a capstone research component of 25+ credit points" or "which programs require at least 3 AI-relevant electives" so that I can run comparative analyses across our own program portfolio.
- As a **sales/marketing lead**, I want competitive intelligence cards embedded in the product that cite real evidence (GitHub coursedog-importer project, 9 PRs Mar-Apr 2026) showing competitors store curriculum as HTML, while DFVA stores it as structured JSON, so that the differentiation is self-evident during demos.

## Technical Design

### Architecture

The structured curriculum data architecture spans three layers: ingestion (handbook → structured JSON), storage (Prisma + JSON columns with typed schemas), and presentation (structured views, comparison engine, public API).

```
┌──────────────────────────────────────────────────────────┐
│                    COMPETITORS (HTML)                     │
│  Coursedog: <div class="requirement">...</div>           │
│  Modern Campus: <p><strong>Core:</strong> subject list</p>│
│  CourseLoop: nested <ul>/<li> with inline styles         │
│  → NOT queryable. NOT comparable. NOT machine-readable.  │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                    DFVA (STRUCTURED)                      │
│                                                          │
│  INGESTION                                               │
│  handbook URL ──► web_extract ──► structured JSON        │
│       │                            (typed, validated)     │
│       ▼                                                  │
│  STORAGE                                                 │
│  AssessmentJob.syllabusJson: SyllabusSnapshot (JSON)      │
│  AssessmentJob.dimensions: DimensionScore[] (JSON)        │
│  AssessmentJob.reportJson: ReportContent (JSON)           │
│       │                                                  │
│       ▼                                                  │
│  PRESENTATION                                            │
│  ┌──────────────┬──────────────────┬──────────────────┐  │
│  │ Syllabus Map │ Program Compare  │ Public API       │  │
│  │ (structured  │ (side-by-side    │ (REST, typed,    │  │
│  │  view of     │  diff of         │  documented)     │  │
│  │  subjects,   │  curriculum      │                  │  │
│  │  streams,    │  structure)      │                  │  │
│  │  prereqs)    │                  │                  │  │
│  └──────────────┴──────────────────┴──────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

### Current State

| Component | Status | Details |
|-----------|--------|---------|
| `AssessmentJob.syllabusJson` (Prisma) | ✅ `Json?` column | Exists in schema; `syllabusJson` on AssessmentJob model. Populated by `assessmentPipeline.ts` during LLM scoring. |
| `getSyllabusMap` (Wasp query) | ✅ Operational | `compass/app/src/compass/operations.ts` line 144-161. Returns `syllabusJson` for a job. Auth-guarded, ownership-checked. |
| `SyllabusSnapshot` type | ❌ Not defined | `syllabusJson` is typed as `any` across the codebase. No TypeScript interface for the structured data shape. |
| `DimensionScore` type | ✅ Defined | `sharedProgramData.ts` lines 1-5. Typed `{ label, score, max }`. Reused across 41 programs. |
| `ProgramReport` type | ✅ Defined | `sharedProgramData.ts` lines 7-21. Full typed structure with dimensions, thresholds, slugs. |
| `PROGRAMS` static array | ✅ 41 programs | `sharedProgramData.ts`. All 41 scored programs with full dimension data. Hardcoded, not DB-sourced. |
| Structured syllabus rendering | ❌ Not built | The `syllabusJson` is returned by the query but no UI component renders it as a structured view. |
| Program comparison engine | ❌ Not built | No UI for comparing two programs' curriculum structures side-by-side. |
| Public REST API for curriculum data | ❌ Not built | The MCP server (`compass/mcp/`) provides `get_assessment`, `query_assessments`, and `cross_program_analysis` for agent consumers, but there's no human-facing REST API with structured curriculum data. |
| Competitive intelligence cards | ❌ Not built | No UI component showing DFVA's structured data advantage over competitors. |
| Structured Program Schema documentation | ❌ Not written | No formal spec for the structured curriculum data format. |
| `dfva-mcp` MCP server | ✅ Built | `compass/mcp/src/index.ts`. 6 tools, operates on the static `sharedProgramData.ts`. |
| Structured data in `reportJson` | ✅ Partial | Each assessment's `reportJson` contains the full DFVA report with dimension scores, evidence, and thresholds — but this is a freeform markdown report, not a structured curriculum schema. |
| Cross-program `query_assessments` (MCP) | ✅ Built | Filters by faculty, riskCategory, score range. Operates on static data. |
| `cross_program_analysis` (MCP) | ✅ Built | Risk distribution, weakest dimension, near-resilient programs. Aggregate analytics on static data. |

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Data model for structured curriculum | JSON column on AssessmentJob (not normalized tables) | The syllabus structure varies by program (different numbers of streams, subjects, credit models). JSON with a typed interface gives flexibility without schema migration churn. Normalized tables would require a generic entity-attribute-value pattern that's harder to query and reason about. |
| Source of truth for structured data | `sharedProgramData.ts` PROGRAMS array → AssessmentJob JSON columns | The static array is the reference dataset (41 scored programs). The AssessmentJob records are dynamic (user-submitted URLs). Both use the same `DimensionScore[]` shape. For comparison and API features, query both sources. |
| Comparison engine approach | Client-side diff on typed JSON (not server-side SQL) | Program structures are small (<50KB JSON). Client-side comparison avoids a new Prisma query type and keeps comparison logic in React where it can be rendered immediately. Server-side aggregation (faculty-level, university-wide) already exists via MCP. |
| Public API layer | New `api` declarations in `main.wasp` (Wasp API routes), NOT a separate Express server | Wasp supports `api` declarations that expose HTTP endpoints. This keeps auth, entities, and context consistent with the rest of the app. The MCP server serves agent consumers; the Wasp API serves human/institutional consumers. |
| Competitive intelligence data | Static JSON config (not Prisma model) | The competitive data (Coursedog uses HTML, Modern Campus has no export, etc.) is factual and changes slowly. A static JSON config file is more maintainable than a database table with 5 rows. Update it when new research surfaces. |
| Syllabus visualization | Interactive D3 or React Flow graph (not static ASCII/table) | Subject dependency graphs, stream pathways, and prerequisite chains benefit from a visual representation. React Flow (`@xyflow/react`) is a lightweight dependency that handles directed graphs well. |
| Typed syllabus schema | Zod-validated TypeScript interface for `SyllabusSnapshot` | The `syllabusJson` is currently `any`. A Zod schema provides runtime validation when data enters the system and generates TypeScript types for consumers. This is the single biggest quality improvement — catch malformed syllabus data at the boundary. |
| Progressive enhancement path | Phase 1: types + docs + competitive cards. Phase 2: comparison engine. Phase 3: public API. Phase 4: visualization. | Don't build the comparison engine until the data shape is formalized. Don't build the visualization until the comparison engine works. Each phase adds value independently. |

### Dependencies

- **Wasp 0.22** `api` declarations — for public REST API endpoints (Phase 3)
- **Zod** — runtime validation. Already available via OpenSaaS boilerplate (used in `src/env.ts` for server env validation).
- **`@xyflow/react`** (React Flow) — for syllabus visualization graph (Phase 4). Lightweight, ~50KB gzipped.
- **`sharedProgramData.ts`** — source of truth for 41 scored programs
- **MCP server** (`compass/mcp/`) — already provides agent-facing structured queries; the public API is the human/institutional counterpart
- **No new external services** — this feature is entirely internal data architecture hardening + presentation layers

## Scope

### In Scope (MVP — Phase 1: Data Architecture Hardening)

- [x] Define `SyllabusSnapshot` Zod schema with TypeScript types — subjects, streams, prerequisites, credit points, levels, research components
- [x] Add runtime validation of `syllabusJson` in `assessmentPipeline.ts` before storing to DB
- [x] Create `competitiveData.ts` — static JSON config documenting competitor data models with citations (GitHub PRs, forum posts, Gartner reviews)
- [x] Build `CompetitiveIntelCard` React component — shows DFVA's structured data vs competitor HTML storage, with real citations
- [x] Add competitive intel cards to the Reports landing page (below the program grid) and individual report detail pages (sidebar)
- [x] Write `docs/structured-curriculum-schema.md` — formal documentation of the structured data format
- [x] Write unit tests for Zod schema validation (valid, invalid, edge cases)
- [x] Publish "How DFVA Models Curriculum Data" as a `/methodology/data-model` public page

### In Scope (Phase 2: Program Comparison)

- [ ] Build `ProgramComparePage` at `/compare?left=mc-cs&right=mc-datasc`
- [ ] Build `ProgramCompare` React component with side-by-side diff:
  - Subject overlap analysis (shared subjects, unique subjects)
  - Stream structure comparison
  - Research component sizing (0, 25, 50+ credit points)
  - Dimension score delta visualization
  - Prerequisite depth comparison
- [ ] Add program selector dropdowns (search by code or name)
- [ ] Generate shareable comparison URLs with query params
- [ ] Add "Compare" button to report detail pages
- [ ] Write Playwright e2e tests for comparison flow

### In Scope (Phase 3: Public REST API)

- [ ] Add Wasp `api` declarations for structured curriculum data endpoints:
  - `GET /api/v1/programs` — list all programs with structured data (dimensions, thresholds, handbook URLs)
  - `GET /api/v1/programs/:code` — full structured data for one program
  - `GET /api/v1/programs/:code/syllabus` — structured syllabus snapshot
  - `GET /api/v1/programs/compare?codes=mc-cs,mc-datasc` — comparison endpoint
- [ ] Implement API key auth via existing `ApiKey` Prisma model
- [ ] Write OpenAPI 3.0 spec (`docs/dfva-api.yaml`)
- [ ] Add rate limiting (100 req/min per key)
- [ ] Publish API docs at `/api/docs` (Swagger UI)
- [ ] Write API integration tests

### In Scope (Phase 4: Syllabus Visualization)

- [ ] Build `SyllabusGraph` component using `@xyflow/react`
- [ ] Render subject dependency DAG (prerequisites → core → electives → capstone)
- [ ] Render stream pathway diagram (parallel streams, shared subjects, exit points)
- [ ] Color-code by risk dimension contribution (subjects that boost D3, D7, etc.)
- [ ] Add syllabus graph to report detail pages as a tab ("Curriculum Structure")
- [ ] Write unit tests for graph layout logic

### Out of Scope (Future)

- Replacing `sharedProgramData.ts` static array with a DB-sourced query (requires production handbook pipeline — blocked by anti-bot)
- Real-time curriculum change monitoring (detect when handbook pages update)
- Automated subject-level AI-exposure scoring (individual subject scoring, not program-level)
- Multi-institution comparison (cross-university curriculum benchmarking — requires InstitutionalAssessment model population)
- Curriculum redesign recommendation engine ("swap subject X for Y, add module Z")
- Integration with university SIS/CMS systems (requires API contracts with each vendor)
- Normalized relational schema for curriculum data (JSON column is the pragmatic choice for variable structure; revisit if query patterns demand SQL)

## Acceptance Criteria

- [ ] `SyllabusSnapshot` Zod schema validates real `syllabusJson` data from at least 5 existing AssessmentJob records without errors
- [ ] `SyllabusSnapshot` Zod schema rejects malformed data (missing required fields, wrong types) with clear error messages
- [ ] `competitiveData.ts` contains citations for at least 3 competitors (Coursedog, Modern Campus, CourseLoop) with verifiable source URLs
- [ ] `CompetitiveIntelCard` renders on `/reports` page below the program grid, visible without scrolling on a 1440px viewport
- [ ] `CompetitiveIntelCard` renders on individual report detail pages in the sidebar
- [ ] Each competitive claim in the card links to its source (GitHub issue, forum post, Gartner review)
- [ ] `docs/structured-curriculum-schema.md` is complete: all JSON fields documented with types, examples, and constraints
- [ ] `/methodology/data-model` page is publicly accessible (no auth required)
- [ ] Unit tests for Zod schema pass (`npx vitest run` in `compass/app`)
- [ ] No regression in existing assessment pipeline (submit a handbook URL, verify job completes with `syllabusJson` populated)
- [ ] (Phase 2) Program comparison shows subject overlap count, unique subjects per program, and dimension score deltas
- [ ] (Phase 2) Comparison URLs are shareable and load the correct comparison state
- [ ] (Phase 3) Public API returns valid JSON for all 4 endpoints with correct HTTP status codes
- [ ] (Phase 3) API key auth rejects requests with missing/invalid keys (401)
- [ ] (Phase 3) Rate limiting kicks in at 101 requests/minute and returns 429
- [ ] (Phase 4) Syllabus graph renders subject dependencies as a DAG with correct edge directions
- [ ] (Phase 4) Clicking a subject node shows its details (name, credit points, level, prerequisites)

## Open Questions

- [ ] **Should `syllabusJson` be backfilled for the 41 pre-computed programs?** The existing programs in `sharedProgramData.ts` have dimension scores but may not have structured syllabus snapshots. Backfilling requires running the full handbook → assessment pipeline for all 41 programs with structured syllabus extraction. This is >40 hours of work due to anti-bot constraints (must use `web_extract` for each). Decision: start with programs that already have `syllabusJson` populated (on-demand assessments) and add static programs opportunistically.
- [ ] **What's the right granularity for the comparison engine?** Subject-level comparison requires parsing subject codes from structured syllabus data. The `SyllabusSnapshot` schema must include a `subjects: Subject[]` array with codes. This is already done in the assessment pipeline but needs explicit typing. Confirm the pipeline consistently extracts subject codes.
- [ ] **Should the public API use the same API key model as the MCP server?** The MCP server has no auth currently (it's local-only). The Prisma schema has `ApiKey` model with `keyHash`, `keyPrefix`, `isActive` but no middleware for Wasp API routes. Build from the existing model or create a simpler API key table? Decision: use the existing `ApiKey` model — it's already designed for cross-institutional API access (feat-004).
- [ ] **Is React Flow the right visualization library, or should we use a lighter alternative?** `@xyflow/react` is ~50KB gzipped and well-maintained. Alternatives: Mermaid (declarative, no interactivity), D3 (more flexible, more code), Cytoscape.js (graph-focused, ~100KB). Decision: React Flow for Phase 4 — good balance of interactivity and bundle size. Revisit if bundle size becomes a concern.
- [ ] **Where does the competitive intelligence data live long-term?** Currently proposed as `competitiveData.ts` static config. If the research loop continues producing competitor intelligence, should this move to a Prisma model (like `CompetitiveEvent`) for dynamic updates? Decision: static config for now. If the research loop produces >10 citations, migrate to a Prisma model with a cron job that updates from research-loop output.
- [ ] **Should the public API be versioned from day one?** `/api/v1/` prefix commits to a versioning strategy. Is DFVA mature enough to warrant this, or is it premature? Decision: version from day one. It costs nothing (URL prefix) and prevents breaking changes for early adopters. The alternative (unversioned API → v2 migration) is expensive.
- [ ] **How do we handle programs that were assessed but don't have structured syllabus data?** The assessment pipeline has evolved — early assessments may have `syllabusJson: null`. The comparison engine and API must handle this gracefully (return 404 for syllabus endpoint, show "Structured data not available" in comparison view).
- [ ] **Should the competitive intel cards be dismissible or persistent?** Persistent for MVP — they're core positioning, not a one-time announcement. If user feedback indicates they're annoying, add a dismiss-with-cookie pattern in a follow-up.

## Implementation Tasks

### Phase 1: Data Architecture Hardening (Week 1-2)

**1.1 — Define types and schemas**
1. Create `compass/app/src/compass/syllabusSchema.ts` with Zod schema for `SyllabusSnapshot`
2. Define TypeScript types: `Subject`, `Stream`, `Prerequisite`, `SyllabusSnapshot`, `CreditStructure`
3. Export inferred types: `export type SyllabusSnapshot = z.infer<typeof SyllabusSnapshotSchema>`
4. Add JSDoc comments to every field with examples from real handbook data

**1.2 — Wire validation into pipeline**
5. Import `SyllabusSnapshotSchema` in `assessmentPipeline.ts`
6. After LLM scoring produces `syllabusJson`, run `SyllabusSnapshotSchema.parse(syllabusJson)`
7. On validation failure, log the Zod error and store `syllabusJson` with a `validationErrors` field (don't block the assessment — the syllabus data is best-effort)
8. Add `validationErrors?: string[]` to the `AssessmentJob` JSON shape (no Prisma migration needed — it's JSON)

**1.3 — Unit tests**
9. Create `compass/app/src/compass/__tests__/syllabusSchema.test.ts`
10. Test valid syllabus snapshot (full structure)
11. Test missing required fields (subjects array empty, missing credit points)
12. Test wrong types (string where number expected)
13. Test edge cases (single-stream program, programs with 0 electives, 100+ credit point research components)
14. Run: `cd compass/app && npx vitest run`

**1.4 — Competitive intelligence data**
15. Create `compass/app/src/compass/competitiveData.ts`
16. Add entries for Coursedog, Modern Campus, CourseLoop with:
    - Competitor name, logo placeholder
    - How they store curriculum data (with citations)
    - Citation URLs (GitHub issues, forum posts, Gartner reviews)
    - DFVA's advantage statement
17. Add a `CompetitorData` TypeScript interface
18. Export `COMPETITORS: CompetitorData[]`

**1.5 — Competitive intel card component**
19. Create `compass/app/src/compass/components/CompetitiveIntelCard.tsx`
20. Render a card with "Why DFVA's data model is different" header
21. For each competitor: icon, name, "Stores curriculum as HTML" / "No structured data export" with citation link
22. DFVA row: "Structured JSON — queryable, comparable, machine-readable" with green checkmark
23. Responsive: horizontal on desktop, stacked on mobile
24. Add to `ReportsPage.tsx` below the program grid
25. Add to `ReportDetailPage.tsx` in the sidebar

**1.6 — Documentation**
26. Create `docs/structured-curriculum-schema.md` in the DFVA repo root
27. Document the `SyllabusSnapshot` schema: every field, type, constraints, example values
28. Document the `DimensionScore` schema (11 dimensions, 0-3 scoring)
29. Document the `ProgramReport` schema
30. Include a "Competitor Comparison" section with the competitive intelligence data
31. Add a `/methodology/data-model` route + page in `main.wasp` — simple markdown render of the schema doc

**1.7 — Integration testing**
32. Submit a handbook URL through the app and verify `syllabusJson` is populated and valid per the schema
33. Check that `CompetitiveIntelCard` renders on `/reports` and `/reports/:slug` pages
34. Verify all citation links are valid (no 404s)
35. Test mobile responsiveness of competitive intel cards
36. Commit: `feat: harden structured curriculum data architecture — Zod schema, competitive intel, schema docs`

### Phase 2: Program Comparison Engine (Week 3-4)

**2.1 — Comparison logic**
37. Create `compass/app/src/compass/programCompare.ts` with `comparePrograms(left: ProgramReport, right: ProgramReport): ComparisonResult`
38. Implement subject overlap analysis (parse subject codes from syllabus snapshots, compute intersection/union)
39. Implement dimension score delta (array of `{ dimension, leftScore, rightScore, delta }`)
40. Implement stream structure comparison (count streams, identify shared stream types)
41. Implement research component comparison (credit points, thesis/capstone presence)
42. Write unit tests for comparison logic

**2.2 — Comparison page**
43. Add route `CompareRoute { path: "/compare", to: ComparePage }` to `main.wasp`
44. Create `compass/app/src/compass/ComparePage.tsx` — reads `left` and `right` from query params
45. Add program selector dropdowns (search by code or name, autocomplete from PROGRAMS array)
46. Render side-by-side comparison with `ComparisonResult` data
47. Add dimension score delta as a horizontal bar chart (green = DFVA advantage, red = gap)
48. Add "Share comparison" button that copies the URL
49. Add "Compare" button to `ReportDetailPage.tsx` that navigates to `/compare?left={current}`

**2.3 — E2e tests**
50. Write Playwright test for comparison flow in `compass/e2e-tests/tests/compass/compare.spec.ts`
51. Test: select two programs → see comparison → verify subject overlap count
52. Test: share URL → open URL → see same comparison
53. Test: "Compare" button on report detail page navigates correctly
54. Commit: `feat: add program comparison engine — structured side-by-side curriculum diff`

### Phase 3: Public REST API (Week 5-6)

**3.1 — API routes**
55. Add `api` declarations to `main.wasp` for each endpoint
56. Create `compass/app/src/compass/api/programs.ts` with handler functions
57. Implement `GET /api/v1/programs` — list all programs with structured data
58. Implement `GET /api/v1/programs/:code` — single program with full structured data
59. Implement `GET /api/v1/programs/:code/syllabus` — structured syllabus snapshot
60. Implement `GET /api/v1/programs/compare?codes=mc-cs,mc-datasc` — comparison endpoint

**3.2 — Auth and rate limiting**
61. Implement API key middleware: check `Authorization: Bearer dfva_...` header against `ApiKey` table
62. Implement rate limiting: 100 req/min per key, 429 response with Retry-After header
63. Add `lastUsedAt` update on each authenticated request
64. Log rate limit hits to `Logs` table

**3.3 — Documentation**
65. Write OpenAPI 3.0 spec at `docs/dfva-api.yaml`
66. Add Swagger UI page at `/api/docs` (serve the spec + swagger-ui-dist static files)
67. Add API documentation link to the landing page footer
68. Write integration tests for all 4 endpoints (valid requests, auth failures, rate limiting)
69. Commit: `feat: add public REST API v1 for structured curriculum data — 4 endpoints, API key auth, OpenAPI spec`

### Phase 4: Syllabus Visualization (Week 7-8)

**4.1 — Graph component**
70. Install `@xyflow/react`: `cd compass/app && npm install @xyflow/react`
71. Create `compass/app/src/compass/components/SyllabusGraph.tsx`
72. Transform `SyllabusSnapshot` into React Flow nodes and edges
73. Nodes: subjects (colored by type: core, elective, capstone, research)
74. Edges: prerequisite relationships (directed), stream membership (grouped)
75. Add node click handler → show subject detail tooltip (name, code, credit points, level, dimension contributions)

**4.2 — Integration**
76. Add "Curriculum Structure" tab to `ReportDetailPage.tsx`
77. Render `SyllabusGraph` in the tab when `syllabusJson` is available
78. Show "Structured data not available" placeholder when `syllabusJson` is null
79. Add graph layout controls: zoom, fit-to-view, export as PNG
80. Write unit tests for the graph transformation logic (syllabus → nodes/edges)
81. Commit: `feat: add interactive syllabus graph — DAG visualization of curriculum structure with React Flow`
