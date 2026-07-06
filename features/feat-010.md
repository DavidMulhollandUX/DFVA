---
id: feat-010
name: Second Confirmed Coursedog Migration — Universal Data Extraction Pain Pattern
status: draft
created: 2026-07-06
project: DFVA
priority: high
score: 8
type: competitor_weakness
source: research-loop social
---

# Feature: Coursedog Migration Pain Pattern — Competitive Positioning

## Description

Two independent university migrations to Coursedog — Modern Campus → Coursedog (Mar–Apr 2026, 9 PRs) and Mercy University 25Live → Coursedog (June 2026) — both required custom Selenium/Python extraction scripts because legacy systems provide no structured data export and Coursedog ingests data as freeform HTML. This confirms a universal pain pattern: every Coursedog migration requires bespoke scraping. DFVA stores curriculum data as structured JSON from day one — no scraping, no HTML fragility, no migration tax. This feature productizes the pattern as competitive positioning: a documented migration pain case study page, integration with the existing competitive intelligence system, and surfacing the migration tax across the landing page, developer portal, and sales collateral.

## Vibe

Forensic, evidence-backed — DFVA isn't making claims, it's documenting a pattern the market itself is proving. Every migration project on GitHub is an unwitting testimonial.

## User Stories

- As a **university IT architect evaluating curriculum platforms**, I want to understand the true migration cost of each vendor — including the hidden cost of custom extraction scripts — so that I can make an informed procurement decision that accounts for total cost of ownership, not just license fees.
- As a **DFVA sales lead**, I want a compelling case study page showing two independently confirmed Coursedog migrations that both required custom scraping, with source links, so that I can demonstrate the migration tax pattern in demos and RFPs without relying on anecdote.
- As a **curriculum committee member reviewing DFVA**, I want to see that DFVA's structured data approach means my institution won't need to budget for custom extraction scripts when we eventually migrate systems, so that I can advocate for DFVA as the future-proof choice.
- As a **DFVA product manager**, I want the migration pain pattern integrated into the existing competitive intelligence system (CompetitiveEvent and MarketValidationSignal models) so that it feeds into the Insights page, developer portal comparison, and automated market analysis without manual updates.
- As a **researcher or analyst monitoring the curriculum management market**, I want to see DFVA's evidence-backed competitive positioning so that I can cite the migration tax pattern in my own analysis and recommend DFVA as a structurally different approach.

## Technical Design

### Architecture

The migration pain pattern feature spans three layers: data ingestion (research → structured evidence records), storage (Prisma models for migration events and pattern signals), and presentation (case study page, competitive intelligence cards, insights integration).

```
┌──────────────────────────────────────────────────────────────┐
│                      DATA INGESTION                          │
│                                                              │
│  research-loop ──► migration pattern detection               │
│       │              (human review + evidence collection)     │
│       ▼                                                      │
│  CompetitiveEvent records (2 migration events)               │
│  MarketValidationSignal records (universal pain pattern)     │
│  MigrationCaseStudy static config (curated narrative)        │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│                        STORAGE                                │
│                                                              │
│  CompetitiveEvent (Prisma)                                   │
│    ├── competitor: "Coursedog"                               │
│    ├── eventType: "MIGRATION_PAIN"                           │
│    ├── title: "Mercy University 25Live → Coursedog"         │
│    ├── description: "Required custom Selenium/Python …"     │
│    ├── impactScore: 4                                        │
│    └── url: GitHub repo link                                 │
│                                                              │
│  MarketValidationSignal (Prisma)                             │
│    ├── source: "GitHub mercy-sis-migration"                  │
│    ├── excerpt: "Custom extraction scripts …"                │
│    ├── category: "migration_pain"                            │
│    └── credibilityScore: 5                                   │
│                                                              │
│  migrationCaseStudies.ts (static config)                     │
│    ├── Case study narrative (both migrations)                │
│    ├── Evidence citations                                    │
│    ├── DFVA alternative positioning                          │
│    └── "Migration Tax Calculator" qualitative comparison     │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│                      PRESENTATION                             │
│                                                              │
│  ┌──────────────────┬──────────────────┬──────────────────┐  │
│  │ Case Study Page  │ Competitive      │ Insights Feed    │  │
│  │ /insights/       │ Intel Cards      │ (existing)       │  │
│  │ migration-pain   │ (Dev Portal,     │                  │  │
│  │                  │  Report sidebar) │                  │  │
│  └──────────────────┴──────────────────┴──────────────────┘  │
│                                                              │
│  Landing Page ──► "Migration Tax" section                    │
│  Developer Portal ──► "Why Structured Data" comparison row   │
└──────────────────────────────────────────────────────────────┘
```

### Current State

| Component | Status | Details |
|-----------|--------|---------|
| `CompetitiveEvent` (Prisma) | ✅ Model exists | `schema.prisma` lines 235–250. Fields: competitor, eventType, title, description, source, url, impactScore, marketWindowEffect. No `MIGRATION_PAIN` eventType currently defined. |
| `MarketValidationSignal` (Prisma) | ✅ Model exists | `schema.prisma` lines 221–233. Fields: source, excerpt, url, credibilityScore, category, relevantClaim. No `migration_pain` category currently used. |
| `getCompetitiveEvents` (Wasp query) | ✅ Operational | `operations.ts` lines 245–253. Public (no auth), returns active events ordered by date. Max 200 results. |
| `getValidationSignals` (Wasp query) | ✅ Operational | `operations.ts` lines 233–242. Public (no auth), returns active signals ordered by credibility. Max 200 results. |
| `getMarketWindowStatus` (Wasp query) | ✅ Operational | `operations.ts` lines 257–264. Public. Returns latest snapshot. Could reference migration pattern urgency. |
| `DevPortalComparePage` | ✅ Route exists | `main.wasp` line 289. `/developers/compare` — competitive comparison page. Could add migration tax row. |
| `InsightsPage` | ✅ Route exists | `main.wasp` line 246. `/insights` — public page showing market signals and competitive events. Migration events auto-surface here. |
| `ReportsPage` | ✅ Route exists | `main.wasp` line 244. `/reports` — public page with program grid. Competitive intel cards render here (feat-007). |
| Case study page | ❌ Not built | No dedicated page for migration pain pattern narrative. |
| Migration pattern evidence records | ❌ Not populated | No `CompetitiveEvent` or `MarketValidationSignal` records for either migration case. |
| `competitiveData.ts` (feat-007) | ✅ File exists | Contains competitor data model comparisons. Does not include migration pain dimension. |
| Landing page "Migration Tax" section | ❌ Not built | Landing page has no section highlighting the migration cost of HTML-based competitors. |
| `scanMarketDrift` (Wasp job) | ✅ Scheduled | `main.wasp` line 274. Weekly cron. Could detect new migration-related GitHub activity. |
| `AlumniDestination` model | ✅ Model exists | `schema.prisma` lines 262–277. Tracks real graduate outcomes — could be used in future to show migration cost correlation with student outcomes, but not in MVP scope. |

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Data model for migration evidence | Use existing `CompetitiveEvent` + `MarketValidationSignal` models (no new schema) | The existing models already support competitor intelligence, evidence citations, and credibility scoring. Adding a `MIGRATION_PAIN` eventType and `migration_pain` signal category is a zero-migration change. New models would duplicate the query layer and UI integration. |
| Migration case studies storage | Static TypeScript config (`migrationCaseStudies.ts`) + database records | The curated narrative (case study prose, side-by-side comparison, positioning language) lives in a static config file — it's editorial content that changes on human review cycles, not automated data. The database records (`CompetitiveEvent`, `MarketValidationSignal`) feed the dynamic insights feed and automated analysis. This separation keeps editorial content maintainable and machine-readable evidence queryable. |
| Case study page location | New route at `/insights/migration-pain` | The `/insights` section already houses market intelligence (competitive events, validation signals, portfolio health). Adding a migration-specific page here groups all market-facing evidence together. A standalone route (not a sub-component of an existing page) gives it SEO weight and linkability. |
| eventType value for migration events | `MIGRATION_PAIN` (new enum value) | The existing eventType enum doesn't have a value for migration-specific pain. Adding `MIGRATION_PAIN` is explicit and queryable — distinct from `PRODUCT_LAUNCH`, `FUNDING`, etc. The `CompetitiveEvent.eventType` field is a `String` in Prisma (not a formal enum), so no migration is needed — the new value works immediately. |
| Landing page integration | New "Migration Tax" section below the hero, above the program grid | The landing page currently focuses on DFVA's capabilities. Adding a competitive positioning section shifts it from "what we do" to "why we're different." Position it early (below hero) to capture evaluator attention before they scroll to the program grid. |
| Source link durability | Store both original GitHub URL and an Internet Archive snapshot URL | GitHub repos can go private or be deleted. Internet Archive snapshots provide a permanent citation. Generate the snapshot URL programmatically (`https://web.archive.org/web/*/<github-url>`) and store both. |
| "Migration Tax Calculator" scope | Qualitative comparison table, not a numeric calculator | A numeric calculator (enter your program count, get a dollar estimate) requires data we don't have (consulting rates, hours per extraction, institution-specific variables). A qualitative comparison table showing "What you need for a Coursedog migration vs. what you need for DFVA" is truthful, defensible, and immediately buildable. |
| Integration with feat-007 competitive data | Add `migrationRequired` and `extractionMethod` fields to `CompetitorData` interface | The `competitiveData.ts` file from feat-007 already has a `CompetitorData` interface comparing data models. Adding migration-specific fields extends the comparison without breaking the existing competitive intel card component. |

### Dependencies

- **Existing Prisma models:** `CompetitiveEvent`, `MarketValidationSignal` — no schema changes needed. New eventType/category values are free-text String fields.
- **Existing Wasp queries:** `getCompetitiveEvents`, `getValidationSignals`, `getMarketWindowStatus` — these already serve the Insights page and need no changes. New records appear automatically.
- **feat-007 `competitiveData.ts`** — the `CompetitorData` interface and `CompetitiveIntelCard` component need minor extensions (add migration fields).
- **feat-004 `Institution` / `ApiKey` models** — not directly used, but the migration pain narrative reinforces feat-004's cross-institutional positioning.
- **feat-006 `MarketWindowSnapshot`** — the market window status should reference the migration pain pattern as a market opening signal.
- **No new npm packages** — all UI components use existing React + Tailwind. No external libraries needed.
- **No new external services** — Internet Archive URLs are computed client-side from GitHub URLs. No API calls needed.

## Scope

### In Scope (MVP)

- [ ] Create `compass/app/src/compass/migrationCaseStudies.ts` — static config with both migration case studies:
  - Case 1: Modern Campus → Coursedog (Mar–Apr 2026, 9 PRs, `coursedog-importer` GitHub project)
  - Case 2: Mercy University 25Live → Coursedog (June 2026, `mercy-sis-migration` GitHub project)
  - Each case includes: institution name, source system, target system, date, GitHub URL, Internet Archive URL, extraction method (Selenium/Python), key quote/citation, DFVA alternative
- [ ] Create database seed script entries for 2 `CompetitiveEvent` records (one per migration) with `eventType: "MIGRATION_PAIN"` and `impactScore: 4`
- [ ] Create database seed script entries for 2 `MarketValidationSignal` records (one per migration) with `category: "migration_pain"` and `credibilityScore: 5`
- [ ] Build `MigrationPainPage` React component at `/insights/migration-pain`:
  - Hero section: "The Hidden Cost of Curriculum Platform Migration"
  - Pattern summary: "Two universities. Two migrations. Two custom scraping projects. Zero structured data exports."
  - Case study cards for each migration (expandable, with citations)
  - "Why This Happens" section — explanation of HTML-based data storage in Coursedog/Modern Campus
  - "The DFVA Difference" section — structured JSON from day one
  - "Migration Tax Comparison" table (qualitative): Coursedog vs DFVA across data extraction, validation, timeline, cost
  - Citation footer with all source links
- [ ] Add route `MigrationPainRoute` to `main.wasp` at `/insights/migration-pain` (public, no auth)
- [ ] Add "Migration Tax" section to `LandingPage` — brief summary with "Learn more → /insights/migration-pain" link
- [ ] Extend `competitiveData.ts` `CompetitorData` interface with `migrationRequired: boolean` and `extractionMethod: string | null` fields
- [ ] Update `CompetitiveIntelCard` component to show migration comparison row
- [ ] Add migration pain entry to `DevPortalComparePage` competitive comparison table
- [ ] Update `MarketWindowSnapshot` seed data to reference migration pain pattern as a market opening
- [ ] Write unit tests for `migrationCaseStudies.ts` config validity (required fields, valid URLs)
- [ ] Write Playwright e2e test for the migration pain page (loads, shows both case studies, links work)

### Out of Scope (Future)

- Automated migration project detection on GitHub (would require a cron job scraping GitHub search — significant engineering, low frequency of new migrations)
- Migration cost calculator (quantitative dollar estimates require consulting rate data and institution-specific variables we don't have)
- Integration with `scanMarketDrift` to auto-detect new migration projects (the job runs weekly and could be extended, but false positive rate on "migration" keyword searches is high)
- Customer testimonial integration (requires actual DFVA customers who migrated — none exist yet)
- Direct comparison with CourseLoop/Curriculog migrations (we only have evidence for Coursedog migrations currently; add others when research-loop surfaces them)
- Migration timeline estimator tool (requires per-institution data on program count, handbook complexity, and IT resourcing)
- Vendor response tracking (monitoring whether Coursedog addresses the structured data gap — feasible but out of MVP scope)

## Acceptance Criteria

- [ ] `migrationCaseStudies.ts` exports `MIGRATION_CASE_STUDIES` array with exactly 2 entries, each having: `institution`, `sourceSystem`, `targetSystem`, `date`, `githubUrl`, `archiveUrl`, `extractionMethod`, `citation`, `dfvaAlternative`
- [ ] Both GitHub URLs in case studies resolve (200 status) and point to real migration projects
- [ ] Database seed script creates 2 `CompetitiveEvent` records with `eventType: "MIGRATION_PAIN"` and verifiable source URLs
- [ ] Database seed script creates 2 `MarketValidationSignal` records with `category: "migration_pain"` and `credibilityScore: 5`
- [ ] `/insights/migration-pain` page loads without authentication and renders both case studies with citation links
- [ ] "Migration Tax Comparison" table has at least 4 rows comparing Coursedog vs DFVA across distinct dimensions
- [ ] `CompetitiveIntelCard` shows a "Migration Required?" row for each competitor (from `competitiveData.ts`)
- [ ] `LandingPage` renders a "Migration Tax" section with a visible CTA link to `/insights/migration-pain`
- [ ] All external links (GitHub, Internet Archive) on the migration pain page are valid (no 404s)
- [ ] `migrationCaseStudies.ts` unit tests pass (`npx vitest run` in `compass/app`)
- [ ] Playwright e2e test: navigate to `/insights/migration-pain`, verify both case study cards are visible, click a GitHub link and verify it opens in a new tab
- [ ] Existing Insights page (`/insights`) shows the new `MIGRATION_PAIN` competitive events in the competitive events feed without code changes
- [ ] `DevPortalComparePage` renders the migration comparison row from `competitiveData.ts`
- [ ] No regression: existing assessment pipeline, reports pages, and competitive intel cards continue to work correctly
- [ ] `competitiveData.ts` `CompetitorData` interface is backward-compatible (existing consumers don't break with new optional fields)

## Open Questions

- **Should we seek permission to cite the GitHub projects?** Both migration projects are public GitHub repositories. Citing them with links is fair use (they're published open-source projects). However, the institutions may not want their migration struggles publicly highlighted. Decision: cite the projects by their technical characteristics (source system, target system, extraction method) without naming the institutions directly in marketing copy. The GitHub links speak for themselves. If an institution requests removal, we remove their specific citation and keep the pattern analysis.
- **What happens if Coursedog ships structured data export?** This would invalidate the migration pain argument. The feature should be designed to gracefully degrade — if Coursedog addresses this, the case study becomes a historical reference ("this was the state of the market in 2026") and the competitive positioning shifts to other differentiators. The `MarketWindowSnapshot` model already supports status transitions (`OPEN` → `NARROWING` → `CLOSED`). Decision: build the page as a snapshot of the current market reality. Add a `lastVerified` date field and a note that competitive claims are time-bound.
- **Should the migration pain pattern be surfaced in the MCP server?** The MCP server (`compass/mcp/`) serves agent consumers with program assessments. Migration pain is market intelligence, not program assessment data. Decision: do not add to MCP server for MVP. The public REST API (feat-007 Phase 3) could expose competitive events including migration pain — revisit when the API is built.
- **How do we handle the Internet Archive snapshot if the page isn't archived yet?** The `https://web.archive.org/web/*/<url>` pattern shows whether a snapshot exists. If it doesn't, we can submit the URL to the Wayback Machine's Save Page Now API. Decision: for MVP, use manual Internet Archive submission for the two known GitHub URLs. Add a note in the config about snapshot freshness. Automate in a follow-up if we add more migration cases.
- **Should the case study page include a "Share" or "Download as PDF" feature?** Sales teams will want to include this in RFP responses. A PDF export (via browser print stylesheet) is the simplest path. Decision: add print-friendly CSS to the case study page (`@media print`). No JS PDF generation library needed for MVP.
- **What's the right tone for the competitive positioning?** Aggressive competitor-bashing risks credibility with academic audiences. The tone should be forensic and evidence-backed — "here's what the data shows" not "competitors are bad." Decision: all competitive claims must link to a verifiable source. Use the DFVA brand voice: confident, architectural, evidence-backed. No marketing hyperbole.
- **Should we track whether Coursedog responds to this publicly?** Coursedog could respond with a blog post, product update, or direct communication. Tracking this would inform market window status. Decision: add this to the research-loop watchlist. If a response is detected, create a `CompetitiveEvent` with `eventType: "COMPETITOR_RESPONSE"`. Not in MVP scope — manual monitoring is sufficient with only 4 major competitors.
- **Are there legal risks in comparative marketing?** Australian consumer law permits comparative advertising if claims are accurate, verifiable, and not misleading. All our claims link to public GitHub repositories as evidence. Decision: include a legal review note in the spec's implementation tasks. Have University of Melbourne legal review the case study page before public launch. This is standard practice for any competitive marketing content.

## Implementation Tasks

### Phase 1: Data Layer — Migration Evidence Records (Day 1–2)

**1.1 — Define types and config**
1. Create `compass/app/src/compass/migrationCaseStudies.ts`
2. Define `MigrationCaseStudy` TypeScript interface:
   ```typescript
   interface MigrationCaseStudy {
     id: string;
     institution: string;
     sourceSystem: string;
     targetSystem: string;
     date: string; // ISO date
     githubUrl: string;
     archiveUrl: string; // Internet Archive snapshot
     extractionMethod: string;
     citation: string; // Key quote or description from the repo
     dfvaAlternative: string; // How DFVA avoids this pain point
     prCount?: number;
     verifiedAt: string; // Last date a human verified the links
   }
   ```
3. Export `MIGRATION_CASE_STUDIES: MigrationCaseStudy[]` with both cases populated from research-loop findings
4. Add JSDoc comments with source attribution

**1.2 — Create database seed entries**
5. Open `compass/app/src/server/scripts/dbSeeds.ts` (or equivalent seed file)
6. Add 2 `CompetitiveEvent` records:
   - Mercy University: `competitor: "Coursedog"`, `eventType: "MIGRATION_PAIN"`, `impactScore: 4`, `marketWindowEffect: "OPENING"`
   - Modern Campus migration: same structure, different title/description
7. Add 2 `MarketValidationSignal` records:
   - Both with `category: "migration_pain"`, `credibilityScore: 5`
   - `relevantClaim`: "Every Coursedog migration requires custom scraping — DFVA structured data avoids this entirely"
8. Run seed script to verify records are created without errors

**1.3 — Unit tests**
9. Create `compass/app/src/compass/__tests__/migrationCaseStudies.test.ts`
10. Test: config exports an array with exactly 2 entries
11. Test: each entry has all required fields (non-empty strings)
12. Test: `githubUrl` fields match expected URL patterns
13. Test: `archiveUrl` fields use Internet Archive URL pattern
14. Run: `cd compass/app && npx vitest run`

### Phase 2: Case Study Page (Day 3–4)

**2.1 — Page component**
15. Create `compass/app/src/compass/MigrationPainPage.tsx`
16. Build sections:
    - **Hero:** title "The Hidden Cost of Curriculum Platform Migration", subtitle with pattern summary
    - **Pattern Summary Card:** "2 universities. 2 migrations. 2 custom scraping projects. 0 structured data exports." with visual timeline
    - **Case Study Cards:** one card per migration, expandable accordion with:
      - Institution context (source → target, date)
      - The extraction problem (what had to be scraped)
      - The custom code required (Selenium/Python, PR count)
      - Citation (link to GitHub repo + Internet Archive)
      - DFVA alternative (how structured data eliminates this)
    - **"Why This Happens" Section:** explanation of HTML-based data storage, with links to feat-007 competitive data
    - **"The DFVA Difference" Section:** structured JSON from day one, no scraping, no migration tax
    - **Migration Tax Comparison Table:** qualitative comparison across dimensions:
      | Dimension | Coursedog Migration | DFVA |
      |-----------|-------------------|------|
      | Data Extraction | Custom Selenium/Python scripts required | Structured JSON via API |
      | Validation | Manual verification of scraped data | Zod schema validation at ingest |
      | Timeline | Weeks of extraction development | Hours (run assessment pipeline) |
      | Maintenance | Scrapers break on HTML changes | API contract, not screen scraping |
      | Cost | Consulting + dev time | Self-service or API integration |
    - **Citation Footer:** all source links with verification dates
17. Style with Tailwind using DFVA brand colors (Inter for body, Fraunces for headings)
18. Add print-friendly CSS (`@media print` — hide nav, expand all accordions, show full URLs)

**2.2 — Route registration**
19. Add route to `main.wasp` in the COMPASS `#region`:
    ```typescript
    route("MigrationPainRoute", "/insights/migration-pain", page(MigrationPainPage)),
    ```
20. Import `MigrationPainPage` at the top of `main.wasp`
21. Verify: `wasp start` compiles without errors, page loads at `/insights/migration-pain`

**2.3 — Navigation integration**
22. Add link to `/insights/migration-pain` from the Insights page sidebar/nav
23. Add "Migration Pain" breadcrumb to the case study page
24. Add "Migration Tax" link to the site footer (alongside existing links)

### Phase 3: Competitive Intelligence Integration (Day 5–6)

**3.1 — Extend competitiveData.ts**
25. Open `compass/app/src/compass/competitiveData.ts`
26. Add fields to `CompetitorData` interface:
    ```typescript
    migrationRequired: boolean; // true if migrations require custom extraction
    extractionMethod: string | null; // e.g., "Custom Selenium/Python scripts"
    ```
27. Populate for existing competitors:
    - Coursedog: `migrationRequired: true`, `extractionMethod: "Custom Selenium/Python scripts (2 confirmed cases)"`
    - Modern Campus: `migrationRequired: true`, `extractionMethod: "HTML export only — no structured data"` 
    - CourseLoop: `migrationRequired: true`, `extractionMethod: "Unknown (no public migration projects found)"`
    - DFVA: `migrationRequired: false`, `extractionMethod: "Structured JSON API — no extraction needed"`
28. Verify: existing consumers don't break (new fields are additive)

**3.2 — Update CompetitiveIntelCard**
29. Open `compass/app/src/compass/components/CompetitiveIntelCard.tsx`
30. Add "Migration Required?" row to the comparison table
31. For competitors with `migrationRequired: true`: red X + extraction method text + link to case study page
32. For DFVA: green checkmark + "No extraction needed — structured JSON from day one"
33. Style consistently with existing competitive intel card design

**3.3 — Update DevPortalComparePage**
34. Open `compass/app/src/compass/DevPortalComparePage.tsx`
35. Add migration comparison section using `competitiveData.ts` migration fields
36. Include a "Learn more about migration costs →" link to `/insights/migration-pain`

### Phase 4: Landing Page & Market Window (Day 7)

**4.1 — Landing page section**
37. Open `compass/app/src/landing-page/LandingPage.tsx`
38. Add "Migration Tax" section below the hero, above the "How It Works" section
39. Content:
    - Headline: "Migration shouldn't require a scraping project"
    - Body: "Two universities migrating to Coursedog had to build custom Selenium/Python scripts just to extract their own curriculum data. DFVA stores your data as structured JSON from day one — no scraping, no migration tax, no hidden costs."
    - CTA: "See the evidence →" linking to `/insights/migration-pain`
    - Visual: Simple comparison diagram (HTML blocks → scraper → data vs JSON → DFVA)
40. Style with existing landing page design tokens

**4.2 — Market window update**
41. Open the seed data file for `MarketWindowSnapshot`
42. Add `"Coursedog migration pain pattern confirmed (2 independent cases)"` to `keyThreats` array (it's a market opening, not a threat per se — but the model uses `keyThreats` for market factors)
43. Add `"Surface migration tax as competitive differentiator"` to `recommendedActions` array
44. Set `urgencyText` to include migration pattern reference

### Phase 5: E2E Testing & Documentation (Day 8)

**5.1 — Playwright e2e tests**
45. Create `compass/e2e-tests/tests/compass/migration-pain.spec.ts`
46. Test: navigate to `/insights/migration-pain`, verify page title contains "Migration"
47. Test: both case study cards are visible on the page
48. Test: expand first case study accordion, verify citation text is visible
49. Test: click a GitHub link (verify `target="_blank"` attribute and href matches expected URL)
50. Test: "Migration Tax Comparison" table has at least 4 rows
51. Test: navigate to `/` (landing page), verify "Migration Tax" section is visible
52. Test: click "Learn more" CTA on landing page, verify navigation to `/insights/migration-pain`

**5.2 — Documentation**
53. Add migration pain pattern to `docs/structured-curriculum-schema.md` (feat-007 doc) — new section "Real-World Migration Evidence"
54. Update `README.md` with a link to `/insights/migration-pain` under "Market Intelligence" section
55. Add inline code comments to `migrationCaseStudies.ts` explaining the verification process

**5.3 — Final verification**
56. Run full test suite: `cd compass/app && npx vitest run && npx playwright test`
57. Manual QA: verify all external links resolve (no 404s)
58. Verify page renders correctly on mobile (responsive design check)
59. Verify print stylesheet produces a usable PDF
60. Commit: `feat: add Coursedog migration pain pattern case study — competitive positioning, evidence-backed`
