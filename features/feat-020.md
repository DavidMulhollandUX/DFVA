---
id: feat-020
name: "Universal Analytics Gap — Every Competitor Fails on Reporting, Own the Category"
status: draft
created: 2026-07-23
project: DFVA
priority: high
score: 9
type: market_gap
source: research-loop reviews
---

# Feature: Universal Analytics Gap — Own the Category DFVA Was Built to Fill

## Description

Every tracked competitor in the curriculum management market has explicit, documented user complaints about reporting and analytics. This is not one competitor's weakness or a temporary gap — it is a **category-wide structural deficiency** confirmed across all 5 major platforms (Coursedog, CourseLeaf, Modern Campus, CourseLoop, Lightcast), multiple review platforms (G2, Gartner Peer Insights, RFP.wiki), and a time span from 2019 to 2026. The evidence is voluminous and consistent: Coursedog is "not best-in-class for enterprise BI" (RFP.wiki); CourseLeaf has "weak report generation" (Gartner); Modern Campus has "restrictive reporting" (G2, March 2026); CourseLoop has "weak reporting tools" (Gartner); Lightcast is "tough to understand which reports to pull" (G2).

This feature elevates the universal analytics gap from a collection of per-competitor signals (feats 004, 005, 011, 012, 016, 017, 018, 019) into a single, category-defining positioning statement: **"The analytics layer curriculum platforms can't deliver."** The deliverable is a multi-layer competitive intelligence and marketing surface — a CompetitiveEvent record capturing the category-wide finding, 5 MarketValidationSignal records (one per competitor with cited reporting complaint), a MarketWindowSnapshot update, a new `UNIVERSAL_ANALYTICS_GAP_DATA` constant aggregating all 5 competitors' reporting weaknesses in a single typed structure, a new `AnalyticsGapMatrix` component rendering a side-by-side comparison matrix, a Landing page "The Analytics Gap" section establishing the category-level claim, a DevPortal "Reporting & Analytics" comparison row with all 5 competitors, and an Insights "Universal Analytics Gap" section that synthesizes the per-competitor evidence into one view.

The strategic goal is to make the analytics gap **the defining market narrative** for DFVA — not "DFVA has better analytics than Competitor X" but "no curriculum platform delivers the analytics institutions need, and DFVA exists specifically to fill that gap." This is the thesis statement for the entire product.

## Vibe

**Definitive, data-anchored, category-owning.** The tone should convey: "We surveyed every major platform. Here's what users told G2, Gartner, and RFP.wiki — across all 5 competitors, spanning 7 years. The pattern is unmistakable: curriculum platforms are workflow tools, not analytics tools. DFVA is the missing analytics layer." Not attacking any single competitor — presenting a category-wide finding backed by third-party sources. Visual treatment: a comparison matrix or grid showing all 5 competitors with their specific reporting weakness cited and sourced. Think _McKinsey market analysis_ — authoritative, comparative, evidence-led. Colors: the Evidura brand palette (navy/deep blue for data credibility, teal for DFVA's positioning as the solution, amber for gap indicators).

## User Stories

- As a **Provost or Deputy Vice-Chancellor (Academic)** responsible for program review quality, I want to see independent evidence that reporting and analytics deficiencies are a universal problem across all curriculum management platforms — not just my platform — so that I can justify investing in DFVA as a complementary analytics layer without replacing my existing curriculum management system or waiting for my vendor to fix their reporting.

- As a **university IT director** evaluating analytics solutions for the curriculum office, I want a single comparison matrix showing every major platform's reporting and analytics weaknesses with cited sources (G2, Gartner, RFP.wiki), so that I can build a vendor-neutral business case for DFVA that doesn't depend on criticising any single competitor but instead documents the category-wide gap.

- As the **DFVA product team**, I want the universal analytics gap captured as structured competitive intelligence — CompetitiveEvent, MarketValidationSignal records per competitor, MarketWindowSnapshot update — so that the product's core positioning statement ("the analytics layer curriculum platforms can't deliver") is grounded in verifiable, third-party data across all 5 competitors rather than being a marketing claim without evidence.

- As a **prospective university customer** visiting the Evidura landing page, I want to see a concise, evidence-backed statement that no curriculum platform delivers adequate analytics — with the specific complaint per platform cited and sourced — so that I understand within 30 seconds that DFVA is not competing with my existing platform but filling a gap every platform has, making it a no-brainer complementary investment.

- As a **curriculum committee chair** who has personally experienced reporting limitations in their current platform, I want to see my frustration validated by independent review data from G2 and Gartner across all competitors, so that I can confidently advocate for DFVA as the analytics layer the entire market is missing — not just a nice-to-have but a structurally necessary complement to any curriculum platform.

## Technical Design

### Architecture

This feature synthesizes the competitive intelligence infrastructure built across feats 004-019 into a single, category-defining surface. Unlike prior features that responded to individual competitor moves or single-platform satisfaction data, feat-020 aggregates the reporting/analytics weakness evidence across **all 5 tracked competitors** into one unified data structure, one comparison visualization, and one category-level marketing position.

The architecture layers are:

1. **Data Layer** — 1 CompetitiveEvent (eventType: "CATEGORY_FINDING"), 5 MarketValidationSignal records (one per competitor with their specific reporting complaint), 1 MarketWindowSnapshot update (status escalates to NARROWING with the universal gap as the primary opportunity signal). All seed data — no new Prisma models, no schema migrations.

2. **Data Infrastructure Layer** — a new `UNIVERSAL_ANALYTICS_GAP_DATA` constant in `src/compass/data/marketValidationData.ts` (or a new `analyticsGapData.ts` if the file is too large) aggregating all 5 competitors' reporting weaknesses in a single typed array. Each entry: competitor name, the specific reporting/analytics complaint, the source platform (G2/Gartner/RFP.wiki), the source URL, the date range, and a one-line "what this validates" summary.

3. **Presentation Layer** — a new `AnalyticsGapMatrix` component rendering the 5-competitor comparison grid, a new Landing page "The Analytics Gap" section, a new DevPortal "Reporting & Analytics" comparison row covering all 5 competitors, and a new Insights "Universal Analytics Gap" section that synthesizes the per-competitor evidence.

4. **MCP Layer** — the DFVA MCP server's `cross_program_analysis` tool description can reference the universal analytics gap as context for understanding why DFVA's scoring methodology matters. No new MCP tools needed for MVP.

```
┌─────────────────────────────────────────────────────────────────────────┐
│          UNIVERSAL ANALYTICS GAP — CATEGORY FINDING (July 2026)         │
│                                                                         │
│  5 competitors, 3 review platforms, 7 years of evidence (2019-2026)    │
│                                                                         │
│  ┌──────────────────┬──────────────────────────┬──────────────────────┐ │
│  │ Competitor       │ Reporting Complaint       │ Source              │ │
│  ├──────────────────┼──────────────────────────┼──────────────────────┤ │
│  │ Coursedog        │ "Not best-in-class for    │ RFP.wiki            │ │
│  │                  │  enterprise BI"          │                      │ │
│  │ CourseLeaf       │ "Weak report generation"  │ Gartner Peer        │ │
│  │                  │                          │ Insights            │ │
│  │ Modern Campus    │ "Restrictive reporting"   │ G2 (Mar 2026)       │ │
│  │ CourseLoop       │ "Weak reporting tools"    │ Gartner Peer        │ │
│  │                  │                          │ Insights            │ │
│  │ Lightcast        │ "Tough to understand      │ G2                  │ │
│  │                  │  which reports to pull"   │                      │ │
│  └──────────────────┴──────────────────────────┴──────────────────────┘ │
│                                                                         │
│  → Category thesis: "The analytics layer curriculum platforms          │
│    can't deliver" — DFVA's core positioning statement                  │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
         ┌──────────────────────────▼──────────────────────────┐
         │                   DATA LAYER                        │
         │                                                     │
         │  CompetitiveEvent (1 record):                      │
         │  • eventType: "CATEGORY_FINDING" (new value)       │
         │  • competitor: "Market-wide"                        │
         │  • title: "Universal Analytics Gap — Every         │
         │    Major Curriculum Platform Fails on Reporting"   │
         │  • impactScore: 5, marketWindowEffect: "OPENING"   │
         │                                                     │
         │  MarketValidationSignal (5 records, 1 per comp):    │
         │  • Each cites the specific reporting complaint      │
         │  • category: "analytics_gap"                       │
         │  • credibilityScore: 8-9 (all third-party)        │
         │  • source: G2 / Gartner / RFP.wiki per entry       │
         │                                                     │
         │  MarketWindowSnapshot update:                      │
         │  • Status: NARROWING (from feat-017)                │
         │  • keyThreats: append "OPPORTUNITY: Universal       │
         │    analytics gap confirmed across all 5 competitors"│
         │  • recommendedActions: append "Own the analytics    │
         │    gap as category positioning"                   │
         └──────────────────────────┬──────────────────────────┘
                                    │
         ┌──────────────────────────▼──────────────────────────┐
         │              PRESENTATION LAYER                     │
         │                                                     │
         │  AnalyticsGapMatrix.tsx                             │
         │  • 5-column grid: Coursedog | CourseLeaf |          │
         │    Modern Campus | CourseLoop | Lightcast           │
         │  • Each cell: complaint text + source badge          │
         │  • Footer row: "DFVA fills all of these gaps"      │
         │  • Pure Tailwind CSS (no chart library needed)      │
         │                                                     │
         │  Landing Page section: "The Analytics Gap"         │
         │  • Lead stat: "5 platforms, 3 review sites,         │
         │    7 years of evidence"                              │
         │  • Comparison grid summary                           │
         │  • CTA: "See the full comparison" → /insights       │
         │                                                     │
         │  DevPortal "Reporting & Analytics" row:             │
         │  • All 5 competitors with complaint + source        │
         │  • DFVA column: "Independent 11-dimension          │
         │    scoring — not available in any platform"          │
         │                                                     │
         │  Insights "Universal Analytics Gap" section:       │
         │  • AnalyticsGapMatrix rendered above the             │
         │    per-competitor CompetitiveThreatCards             │
         │  • Synthesizes feats 017/018/019 cards under          │
         │    one category-level heading                       │
         └─────────────────────────────────────────────────────┘
```


### Current State

| Component | Status | Details |
|-----------|--------|---------|
| `CompetitiveEvent` (Prisma model) | ✅ Exists | `schema.prisma` lines 243-258. Fields: `competitor`, `eventType`, `title`, `description`, `source`, `url`, `dateOccurred`, `impactScore`, `marketWindowEffect`, `isActive`. Reused with new `eventType: "CATEGORY_FINDING"` value (string column, no enum constraint). |
| `MarketValidationSignal` (Prisma model) | ✅ Exists | `schema.prisma` lines 229-241. Fields: `source`, `excerpt`, `url`, `credibilityScore`, `category`, `relevantClaim`, `isActive`. Reused with `category: "analytics_gap"` (already used by feat-019 seed). |
| `MarketWindowSnapshot` (Prisma model) | ✅ Exists | `schema.prisma` lines 260-268. Fields: `status`, `urgencyText`, `keyThreats` (Json), `recommendedActions` (Json). Updated by feats 017, 018, 019 — currently `status: "NARROWING"`. This feature appends to existing arrays without changing status. |
| `getCompetitiveEvents` (Wasp query) | ✅ Operational | `main.wasp.ts` line 285-294. Public (no auth). Returns `CompetitiveEvent.findMany({ where: { isActive: true }, orderBy: { dateOccurred: "desc" }, take: 200 })`. No changes needed — the new CompetitiveEvent with `competitor: "Market-wide"` will appear automatically. |
| `getValidationSignals` (Wasp query) | ✅ Operational | `main.wasp.ts` line 273-282 (via `operations.ts`). Public (no auth). Returns `MarketValidationSignal.findMany({ where: { isActive: true }, orderBy: { credibilityScore: "desc" }, take: 200 })`. The 5 new signals will appear alongside existing ones. |
| `getMarketWindowStatus` (Wasp query) | ✅ Operational | `main.wasp.ts` line 297-304. Public. Returns latest `MarketWindowSnapshot.findFirst({ orderBy: { createdAt: "desc" } })`. The updated snapshot will appear automatically. |
| `InsightsPage.tsx` | ⚠️ Extended | `src/compass/InsightsPage.tsx`. Currently renders Competitive Landscape section (feat-017/018), CompetitiveThreatCards, Market Validation section, MarketWindowIndicator. This feature adds a "Universal Analytics Gap" section above the per-competitor cards. |
| `CompetitiveThreatCard.tsx` | ✅ Reusable | `src/compass/CompetitiveThreatCard.tsx`. Already supports `variant="opportunity"` styling (used by feat-019). Will render the category-level CompetitiveEvent with this variant. |
| `CompetitiveLandscape.tsx` | ✅ Reusable | `src/compass/CompetitiveLandscape.tsx`. Renders the radar chart comparing competitors on `analyticsMaturity` and `marketShare` axes. No changes needed — the AnalyticsGapMatrix is a separate, complementary visualization. |
| `LandingPage.tsx` | ⚠️ Extended | `src/landing-page/LandingPage.tsx`. Already has sections from feats 004, 007, 009, 017, 018. This feature adds "The Analytics Gap" section positioned after the existing platform-agnostic content and before the main CTA. |
| `DevPortalPage.tsx` | ⚠️ Extended | `src/compass/DevPortalPage.tsx`. Already has comparison table with rows for Analytics Depth (feat-018), API Quality (feat-009), User Satisfaction (feat-019). This feature adds a "Reporting & Analytics" row covering all 5 competitors. |
| `marketValidationData.ts` | ⚠️ Extended | `src/compass/data/marketValidationData.ts`. Existing seed data for MarketValidationSignal records. This feature adds the universal analytics gap constant (`UNIVERSAL_ANALYTICS_GAP_DATA`) alongside existing exports. |
| `sharedProgramData.ts` | ✅ No changes | `src/compass/sharedProgramData.ts` (1937 lines, `CACHE_VERSION = 5`). The `PROGRAMS` array (41 programs) and `ProgramReport`/`DimensionScore` interfaces are unrelated to this feature. |
| `apiCompetitiveData.ts` (from feat-019) | ⚠️ Extended | If `COMPETITOR_SATISFACTION_DATA` was added by feat-019, this feature adds `UNIVERSAL_ANALYTICS_GAP_DATA` alongside it. If feat-019 hasn't been built yet, both constants go in the same file. |
| Seed migration pattern | ✅ Established | `seedAssessmentCloudResponse.ts` (feat-013), `seedCourseLeafAnalyticsResponse.ts` (feat-018), `seedLightcast2026Report.ts` (feat-016), `seedCourseLeafG2Crisis.ts` (feat-019). This feature follows the same pattern: a `seedUniversalAnalyticsGap.ts` file that checks for existing records before creating. |
| `scanMarketDrift` (Wasp job) | ✅ No changes | `main.wasp.ts` line 314-320. Weekly PgBoss job. Not affected — this feature's data is static seed data, not auto-updated. |
| T1 Data Connector (feat-011) | ✅ No changes | `src/compass/t1/operations.ts`. T1 import/enrolment data is unrelated to the analytics gap positioning. |
| Fragility Monitor (feat-012) | ✅ No changes | `FragilityDashboardPage.tsx`, `FragilityIncident` model. HTML fragility data is a separate concern — feat-020 covers the analytics gap, not data fragility. |


### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| No new Prisma models | **Reuse existing CompetitiveEvent, MarketValidationSignal, MarketWindowSnapshot.** The `competitor` field on CompetitiveEvent is a free-text string, so `competitor: "Market-wide"` works without schema changes. `eventType` is also a string, so `eventType: "CATEGORY_FINDING"` is a new value without needing an enum migration. | Adding models for a marketing/positioning feature introduces migration overhead and entity management complexity for zero functional benefit. The existing models were designed to be flexible enough for exactly this kind of market-level signal. The string-typed `competitor` and `eventType` fields are features, not oversights — they allow new categories of competitive intelligence without schema changes. |
| 5 MarketValidationSignal records (one per competitor) | **One signal per competitor, each citing the specific reporting complaint.** Categories: all 5 use `category: "analytics_gap"` with `credibilityScore` reflecting the source's authority (Gartner 9, G2 8, RFP.wiki 8). | This makes each competitor's reporting weakness individually queryable and citable. A future feature could display per-competitor signal cards. One signal per competitor also means the research-loop can update individual signals as new review data comes in without touching the others. It also makes the `getValidationSignals` query naturally return the universal gap evidence alongside existing signals. |
| CompetitiveEvent `competitor: "Market-wide"` not a specific name | **Use "Market-wide" as the competitor field value.** The `competitor` field is free-text and has been used for individual competitors ("Coursedog", "CourseLeaf", etc.). For a category-level finding, "Market-wide" signals this is not about a single competitor. | This avoids implying the finding is about any one platform. The `eventType: "CATEGORY_FINDING"` further distinguishes it from individual competitor events (`"PRODUCT_LAUNCH"`, `"ACQUISITION"`, etc.). Together, `competitor: "Market-wide"` + `eventType: "CATEGORY_FINDING"` creates a new record class that the UI can filter and render differently if needed. |
| `UNIVERSAL_ANALYTICS_GAP_DATA` as a static TypeScript constant | **Static constant in `data/marketValidationData.ts` or a new `data/analyticsGapData.ts`.** Interface: `{ name: string; reportingComplaint: string; source: string; sourceUrl: string; dateRange: string; whatItValidates: string }[]`. 5 entries, one per competitor. | This mirrors the dual approach of feat-019 (`COMPETITOR_SATISFACTION_DATA` constant for UI rendering, seed records for queryable competitive intelligence). The constant powers the `AnalyticsGapMatrix` component; the seed records power the `getValidationSignals` query and CompetitiveThreatCard. If the file gets too large with both feat-019 and feat-020 constants, split into a separate `analyticsGapData.ts`. |
| `AnalyticsGapMatrix` as a grid, not a chart | **5-column grid (one column per competitor) with complaint text + source badge in each cell. Footer row shows DFVA's positioning.** Pure Tailwind CSS — no Recharts/chart.js dependency. | The data is qualitative (complaint text), not quantitative (scores). A bar chart would require inventing a "analytics weakness score" which adds subjectivity. A grid presents the raw evidence — the complaint, the source — without forcing a false quantification. The grid format also works responsively: on mobile it stacks vertically. The footer row "DFVA fills all of these gaps" is the visual punchline. |
| Landing page section positioning | **After "Platform-Agnostic Analytics" (feat-018) and before the main CTA.** The section establishes the category-level claim; the CTA converts it into action. | The universal analytics gap is the strongest possible lead-in to the CTA. By the time the reader reaches it, they've seen the structured data argument (feat-007), the API quality argument (feat-009), the platform-agnostic argument (feat-018), and now the category-level evidence. The CTA "See the full comparison" links to /insights where the detailed matrix lives. |
| DevPortal row name: "Reporting & Analytics" not "Analytics Gap" | **Use "Reporting & Analytics" as the DevPortal comparison row label.** The row shows each competitor's reporting/analytics weakness alongside DFVA's capability. | "Analytics Gap" is DFVA-internal jargon. "Reporting & Analytics" is what university IT directors search for in vendor comparison matrices. The row content cites the specific per-competitor complaint and source. |
| Include all 5 competitors, not just the weakest | **All 5 competitors in the matrix, including Lightcast (which is a data provider, not a curriculum platform).** Lightcast's reporting complaint ("tough to understand which reports to pull") is included because the feature argues the gap is universal — including Lightcast strengthens the "every platform" claim. | Excluding Lightcast would weaken the "universal" thesis. Lightcast is the LMI market leader and including its reporting complaint shows the gap extends beyond curriculum management platforms into adjacent data tools. The DevPortal row notes Lightcast is a data provider, not a curriculum platform, for clarity. |
| MarketWindowSnapshot status stays "NARROWING" | **Do not change status.** Append to `keyThreats` and `recommendedActions` arrays only. | The status was set to "NARROWING" by feat-017 (Coursedog Assessment Cloud). The universal analytics gap is an opportunity signal, not a threat — it opens the market window, it doesn't close it. Changing status to "OPEN" would be premature (competitors are actively adding analytics features). The opportunity is real but the window is still narrowing as competitors ship features. |
| Seed file name: `seedUniversalAnalyticsGap.ts` | **Follow the established seed file naming pattern.** Placed at `src/compass/seedUniversalAnalyticsGap.ts`. | Matches: `seedAssessmentCloudResponse.ts` (feat-013), `seedCourseLeafAnalyticsResponse.ts` (feat-018), `seedLightcast2026Report.ts` (feat-016), `seedCourseLeafG2Crisis.ts` (feat-019). All are standalone scripts invoked during dev setup or via `npx tsx`. |


### Dependencies

- **Wasp 0.24** — no new routes, queries, or actions required. Existing routes: Insights (`/insights`), Landing (`/`), DevPortal (`/developers`). Existing queries: `getCompetitiveEvents`, `getValidationSignals`, `getMarketWindowStatus` — all public (no auth).
- **React 19** — new `AnalyticsGapMatrix` component. Extend `InsightsPage.tsx`, `LandingPage.tsx`, `DevPortalPage.tsx`. No changes to existing components.
- **Prisma (PostgreSQL)** — seed data: 1 CompetitiveEvent, 5 MarketValidationSignal records, 1 MarketWindowSnapshot update. No schema changes. Use `create` for inserts (with existence checks), `findFirst` + `update` for snapshot.
- **Existing `CompetitiveEvent` model** — reuse with `eventType: "CATEGORY_FINDING"` (new string value), `competitor: "Market-wide"`, `impactScore: 5`, `marketWindowEffect: "OPENING"`.
- **Existing `MarketValidationSignal` model** — 5 new records with `category: "analytics_gap"`, `credibilityScore: 8-9`, citing G2/Gartner/RFP.wiki per competitor.
- **Existing `MarketWindowSnapshot` model** — append to latest snapshot's `keyThreats` and `recommendedActions` JSON arrays. Do NOT change `status` (stays NARROWING from feat-017).
- **Existing `data/marketValidationData.ts`** — add `UNIVERSAL_ANALYTICS_GAP_DATA` constant (does not modify existing exports).
- **Existing `InsightsPage.tsx`** — add "Universal Analytics Gap" section above the per-competitor CompetitiveThreatCards.
- **Existing `LandingPage.tsx`** — add "The Analytics Gap" section after "Platform-Agnostic Analytics" (feat-018).
- **Existing `DevPortalPage.tsx`** — add "Reporting & Analytics" comparison row.
- **Existing `CompetitiveThreatCard.tsx`** — reuse with `variant="opportunity"` for the category-level CompetitiveEvent.
- **Lucide React** (already in project) — icons: `BarChart3` (analytics), `AlertTriangle` (gap), `CheckCircle2` (DFVA fills gap), `ExternalLink` (source links).
- **Tailwind CSS** — styling only. No new CSS dependencies.
- **No external APIs** — all content is static/seed data based on research-loop findings from G2, Gartner, and RFP.wiki.
- **No new NPM packages** — all UI built with existing stack.
- **Source URLs:**
  - G2: `https://www.g2.com/categories/curriculum-management` (category-level)
  - Gartner Peer Insights: `https://www.gartner.com/reviews/category/curriculum-management` (category-level)
  - RFP.wiki: `https://www.rfp.wiki/education-training/higher-education-catalog-and-curriculum-management-software` (category-level)
  - Coursedog RFP.wiki: `https://www.rfp.wiki/education-training/higher-education-catalog-and-curriculum-management-software/coursedog`
  - CourseLeaf RFP.wiki: `https://www.rfp.wiki/education-training/higher-education-catalog-and-curriculum-management-software/courseleaf`
  - Modern Campus G2 (Mar 2026): `https://www.g2.com/products/modern-campus-catalog/reviews`
  - CourseLoop Gartner: `https://www.gartner.com/reviews/product/courseloop`
  - Lightcast G2: `https://www.g2.com/products/lightcast/reviews`


## Scope

### In Scope (MVP — "Universal Analytics Gap v1")

- [ ] **Create 1 `CompetitiveEvent` record** via seed migration: `eventType: "CATEGORY_FINDING"`, `competitor: "Market-wide"`, `title: "Universal Analytics Gap — Every Major Curriculum Platform Fails on Reporting"`, `description` covering the 5-competitor evidence (Coursedog, CourseLeaf, Modern Campus, CourseLoop, Lightcast), the 3 source platforms (G2, Gartner, RFP.wiki), the 2019-2026 date range, and the opportunity for DFVA as the category-defining analytics layer, `impactScore: 5`, `marketWindowEffect: "OPENING"`, `dateOccurred: "2026-07-23"`, `isActive: true`, source URLs.

- [ ] **Create 5 `MarketValidationSignal` records** via seed migration — one per competitor:
  1. Coursedog: "Not best-in-class for enterprise BI" (RFP.wiki, credibilityScore 8, category "analytics_gap")
  2. CourseLeaf: "Weak report generation" (Gartner, credibilityScore 9, category "analytics_gap")
  3. Modern Campus: "Restrictive reporting, integrations, and staff notifications" (G2, March 2026, credibilityScore 8, category "analytics_gap")
  4. CourseLoop: "Weak reporting tools" (Gartner, credibilityScore 9, category "analytics_gap")
  5. Lightcast: "Tough to understand which reports to pull" (G2, credibilityScore 8, category "analytics_gap")

- [ ] **Update latest `MarketWindowSnapshot`** via seed migration: append "OPPORTUNITY: Universal analytics gap confirmed across all 5 tracked competitors (Coursedog, CourseLeaf, Modern Campus, CourseLoop, Lightcast) via G2, Gartner, and RFP.wiki — 2019-2026. Category-wide structural deficiency in reporting and analytics" to `keyThreats` array. Append "Own the analytics gap as DFVA's core category positioning statement. 'The analytics layer curriculum platforms can't deliver.' Target all competitor campuses with category-level evidence, not per-competitor attacks" to `recommendedActions` array. Do NOT change `status` (stays NARROWING from feat-017).

- [ ] **Add `UNIVERSAL_ANALYTICS_GAP_DATA` constant** to `src/compass/data/marketValidationData.ts` (or new `src/compass/data/analyticsGapData.ts`): typed array with 5 entries, one per competitor. Interface: `{ name: string; reportingComplaint: string; source: string; sourceUrl: string; dateRange: string; whatItValidates: string }`. Each entry cites the specific reporting complaint, source platform, and source URL.

- [ ] **Create `AnalyticsGapMatrix` component** at `src/compass/AnalyticsGapMatrix.tsx`: a responsive grid showing all 5 competitors side by side. Each cell shows the competitor name, the specific reporting complaint (quoted), the source badge (G2/Gartner/RFP.wiki), and the source URL link. A footer row reads "DFVA fills all of these gaps — independent 11-dimension scoring, platform-agnostic ingestion, prescriptive recommendations" in teal. On mobile, the grid stacks vertically (one competitor per row). Uses pure Tailwind CSS — no chart library.

- [ ] **Add "Universal Analytics Gap" section to `InsightsPage.tsx`**: positioned above the per-competitor CompetitiveThreatCards (from feats 017, 018, 019). Renders `AnalyticsGapMatrix` with `UNIVERSAL_ANALYTICS_GAP_DATA`. Below the matrix, renders the category-level CompetitiveEvent (`competitor: "Market-wide"`) with `CompetitiveThreatCard variant="opportunity"`. Section heading: "The Universal Analytics Gap" with `BarChart3` icon.

- [ ] **Add "The Analytics Gap" section to `LandingPage.tsx`**: positioned after "Platform-Agnostic Analytics" (feat-018) and before the main CTA. Lead statistic: "5 platforms, 3 review sites, 7 years of evidence." Body text: "Every major curriculum management platform has documented reporting and analytics deficiencies. Not one delivers the analytical depth that modern program review demands. DFVA exists to fill this gap — an independent analytics layer that works alongside your existing platform." CTA: "See the full comparison" linking to `/insights`.

- [ ] **Add "Reporting & Analytics" row to `DevPortalPage.tsx`** comparison table: positioned after "User Satisfaction" (feat-019). Each competitor cell shows the specific reporting complaint and source. DFVA column: "Independent 11-dimension durability scoring with prescriptive recommendations — not available in any curriculum management platform." All 5 competitors covered.

- [ ] **Seed migration script** at `src/compass/seedUniversalAnalyticsGap.ts`: consolidates CompetitiveEvent creation, 5 MarketValidationSignal records, and MarketWindowSnapshot update. Idempotent — checks for existing records before creating. Uses `findFirst` + `update` for the snapshot.

- [ ] **Run seed and verify**: CompetitiveEvent, MarketValidationSignals, MarketWindowSnapshot all updated correctly. Query `getCompetitiveEvents` returns the new record. Query `getValidationSignals` returns 5 new records. Query `getMarketWindowStatus` returns updated snapshot.

- [ ] **Regression test**: existing pages render correctly with new sections. Existing CompetitiveThreatCard instances (feats 013, 017, 018, 019) unaffected. CompetitiveLandscape radar chart unaffected. MarketWindowIndicator still shows NARROWING.

- [ ] **Copy review**: all data factual and cited. Each complaint is a direct quote or close paraphrase from the cited source. No competitor described with pejorative language — all complaints are attributed to the review platform, not to DFVA's opinion.

- [ ] **Mobile responsive**: new sections work at 768px. AnalyticsGapMatrix stacks vertically. Landing page section collapses to single column. DevPortal row wraps appropriately.

- [ ] **Commit** with conventional commit message: `feat: universal analytics gap — category-level positioning and 5-competitor comparison matrix`.

### Out of Scope (Future)

- Automated G2/Gartner/RFP.wiki monitoring for real-time complaint updates (manual quarterly review for MVP)
- Per-competitor "analytics gap score" (qualitative grid is sufficient; quantifying would add subjectivity)
- Scraping competitor review pages for automated complaint aggregation
- Customer testimonials from dissatisfied users of any platform
- "Switch from [competitor]" migration guides (DFVA is complementary, not a replacement)
- Satisfaction trend tracking over time (no longitudinal data available beyond the current snapshot)
- Integration with G2/Gartner APIs for automated score retrieval (APIs are paid and restrictive)
- Net Promoter Score (NPS) comparison (no NPS data publicly available)
- "Analytics Gap Report" as a downloadable PDF (future lead-generation asset)
- Integration with the DFVA MCP server's `cross_program_analysis` tool to surface the gap in agent responses (future enhancement after MVP)


## Acceptance Criteria

- [ ] A `CompetitiveEvent` record exists with `competitor: "Market-wide"`, `eventType: "CATEGORY_FINDING"`, `impactScore: 5`, `marketWindowEffect: "OPENING"`, and `isActive: true`. The `title` field contains "Universal Analytics Gap" and the `description` references all 5 competitors (Coursedog, CourseLeaf, Modern Campus, CourseLoop, Lightcast), the 3 source platforms (G2, Gartner, RFP.wiki), and the 2019-2026 date range.

- [ ] Five `MarketValidationSignal` records exist with `category: "analytics_gap"` and `isActive: true`, one per competitor. Each record's `excerpt` field contains the specific reporting complaint, the `source` field identifies the review platform, the `url` field links to a verifiable source page, and the `credibilityScore` is 8 or 9. The `relevantClaim` field summarizes what the complaint validates about DFVA's positioning.

- [ ] The latest `MarketWindowSnapshot` still has `status: "NARROWING"` (unchanged from feat-017) but its `keyThreats` JSON array includes a "Universal analytics gap" entry (framed as OPPORTUNITY, listing all 5 competitors) and its `recommendedActions` array includes "Own the analytics gap as DFVA's core category positioning statement."

- [ ] `UNIVERSAL_ANALYTICS_GAP_DATA` constant exists in the codebase with exactly 5 entries (Coursedog, CourseLeaf, Modern Campus, CourseLoop, Lightcast). Each entry has a `reportingComplaint` string that is a direct quote or close paraphrase from the cited source, a `source` string identifying the review platform, a `sourceUrl` string linking to a live verifiable page, and a `whatItValidates` string. The TypeScript interface is exported and typed (no `any`).

- [ ] `AnalyticsGapMatrix` component renders a grid with all 5 competitors. Each cell shows the competitor name, the reporting complaint, and a source badge with a link. The footer row shows DFVA's positioning statement in teal. The component accepts `UNIVERSAL_ANALYTICS_GAP_DATA` as props and renders responsively (5 columns on desktop, stacked on mobile). No chart library is used — pure Tailwind CSS.

- [ ] Insights page (`/insights`) renders the "Universal Analytics Gap" section above the per-competitor CompetitiveThreatCards. The `AnalyticsGapMatrix` renders with all 5 competitors. The category-level CompetitiveEvent (`competitor: "Market-wide"`) renders below the matrix with `CompetitiveThreatCard variant="opportunity"` styling.

- [ ] Landing page (`/`) shows a new "The Analytics Gap" section between "Platform-Agnostic Analytics" and the main CTA. The lead statistic references "5 platforms, 3 review sites, 7 years of evidence." The body text establishes the category-level claim without attacking any single competitor. The CTA "See the full comparison" links to `/insights`.

- [ ] DevPortal page (`/developers`) shows a "Reporting & Analytics" comparison row with columns for DFVA, Coursedog, CourseLeaf, Modern Campus, CourseLoop, and Lightcast. Each competitor cell shows the specific reporting complaint and source. The DFVA column states "Independent 11-dimension durability scoring" as the differentiator.

- [ ] All new sections and components render correctly on mobile viewport (768px): `AnalyticsGapMatrix` grid stacks to single column, Landing page section is readable, DevPortal comparison row wraps without overflow.

- [ ] No competitor is described with pejorative language anywhere in the feature. All complaints are attributed to the review platform (G2, Gartner, RFP.wiki) — the copy uses "users report" or "[source] notes" framing, not "Competitor X is bad at reporting."

- [ ] Existing Insights page functionality is not regressed: CompetitiveLandscape radar chart renders correctly, existing CompetitiveThreatCards (feats 013, 017, 018, 019) still render, Market Validation section works as before, MarketWindowIndicator shows NARROWING.

- [ ] Seed migration is idempotent — running `seedUniversalAnalyticsGap.ts` twice does not create duplicate records. CompetitiveEvent uses an existence check (findFirst by `competitor` + `eventType`), MarketValidationSignal records are checked before creation (findFirst by `source` + `category`), MarketWindowSnapshot uses findFirst + update (not create).

- [ ] The `UNIVERSAL_ANALYTICS_GAP_DATA` TypeScript interface is exported and fully typed — no `any` fields. Each entry's `sourceUrl` is a valid URL string. The constant is importable from the data layer by both `AnalyticsGapMatrix` and `DevPortalPage`.


## Open Questions

1. **Should `UNIVERSAL_ANALYTICS_GAP_DATA` go in `marketValidationData.ts` or a new `analyticsGapData.ts`?** If feat-019's `COMPETITOR_SATISFACTION_DATA` has already been added to `marketValidationData.ts`, the file may be getting large. Decision: check the file size first — if `marketValidationData.ts` is under 500 lines, add to it; if over, create `analyticsGapData.ts` and move both constants there. The constant should be co-located with the seed data for consistency.

2. **Should the CompetitiveEvent `dateOccurred` be 2026-07-23 (discovery date) or an earlier date?** The evidence spans 2019-2026 but the category-level finding was synthesized on 2026-07-23 by the research-loop. Using the discovery date is consistent with prior CompetitiveEvent records (feats 013, 017, 018). If a more specific "earliest complaint date" is preferred, the Modern Campus G2 review (March 12, 2026) is the freshest individual data point — but the category-level finding is the research-loop's synthesis, so July 23 is correct.

3. **Should the DevPortal "Reporting & Analytics" row replace or supplement the "User Satisfaction" row (feat-019)?** These are different data: feat-019 covers G2/Gartner satisfaction scores; feat-020 covers the specific reporting/analytics complaint per competitor. They should coexist as separate rows — "User Satisfaction" shows the score, "Reporting & Analytics" shows the specific complaint. If the DevPortal table gets too wide with 6+ rows, consider collapsing into a tabbed interface (future enhancement, out of scope for MVP).

4. **Should the `AnalyticsGapMatrix` include a "Last Updated" date per competitor?** The evidence dates vary (Modern Campus March 2026, CourseLeaf ongoing, Coursedog RFP.wiki current). Showing a date per cell adds precision but also clutter. Decision: include a `dateRange` field in the data structure but only show it in a tooltip or expandable detail, not in the main grid cell. The grid should be scannable; dates are secondary.

5. **Should the Landing page CTA link to `/insights` or `/developers`?** `/insights` has the full AnalyticsGapMatrix and CompetitiveThreatCards. `/developers` has the comparison table. The Landing page section is a category-level claim — sending to `/insights` for the full evidence presentation is more natural than sending to the developer comparison table. Decision: `/insights` (already specified in the scope). If the user prefers `/developers`, this is a one-line change.

6. **Should the 5 MarketValidationSignal records have `credibilityScore` 8 or 9?** Gartner-sourced complaints (CourseLeaf, CourseLoop) are 9 (Gartner is the most authoritative review platform). G2-sourced complaints (Modern Campus, Lightcast) are 8 (G2 is credible but more user-generated). RFP.wiki (Coursedog) is 8 (aggregated, not original research). This differentiation makes the `getValidationSignals` query ordering meaningful — Gartner-sourced signals surface first.


## Implementation Tasks

### Phase 1 — Seed Data (estimated 0.5 days)

1. **Create `src/compass/seedUniversalAnalyticsGap.ts`** — a standalone seed script that:
   - Creates 1 `CompetitiveEvent` record with `competitor: "Market-wide"`, `eventType: "CATEGORY_FINDING"`, `title: "Universal Analytics Gap — Every Major Curriculum Platform Fails on Reporting"`, `description` covering all 5 competitors, 3 sources, and 2019-2026 range, `impactScore: 5`, `marketWindowEffect: "OPENING"`, `dateOccurred: new Date("2026-07-23")`, `isActive: true`, `source: "research-loop reviews"`, and source URLs.
   - Creates 5 `MarketValidationSignal` records (one per competitor) with `category: "analytics_gap"`, `credibilityScore` 8 or 9 per source authority, `isActive: true`, and the specific reporting complaint as `excerpt` with source URL.
   - Updates the latest `MarketWindowSnapshot` by appending to `keyThreats` and `recommendedActions` arrays (without changing `status`).
   - All operations are idempotent: check `findFirst` before `create`, use `findFirst` + `update` for the snapshot.
   - Export the function so it can be invoked from `dbSeeds.ts` or run standalone via `npx tsx`.

2. **Register seed** — add `seedUniversalAnalyticsGap` to `dbSeeds.ts` or invoke it separately during dev setup. Follow the same pattern as `seedCourseLeafG2Crisis.ts` (feat-019) and `seedLightcast2026Report.ts` (feat-016).

3. **Run seed** against local dev database and verify:
   ```bash
   cd compass/app
   DATABASE_URL=postgresql://postgresWaspDevUser:postgresWaspDevPass@localhost:5432/OpenSaaS-fc3b171ec3 \
     npx tsx src/compass/seedUniversalAnalyticsGap.ts
   ```
   Verify: CompetitiveEvent where `competitor = "Market-wide"` AND `eventType = "CATEGORY_FINDING"`. MarketValidationSignal where `category = "analytics_gap"` (expect 5). MarketWindowSnapshot `status` still "NARROWING" with new `keyThreats` entry.

### Phase 2 — Data Infrastructure (estimated 0.5 days)

4. **Add `UNIVERSAL_ANALYTICS_GAP_DATA` constant** to `src/compass/data/marketValidationData.ts` (or new `src/compass/data/analyticsGapData.ts` if the file is large):

   ```typescript
   export interface AnalyticsGapEntry {
     name: string;
     reportingComplaint: string;
     source: string;
     sourceUrl: string;
     dateRange: string;
     whatItValidates: string;
   }

   export const UNIVERSAL_ANALYTICS_GAP_DATA: AnalyticsGapEntry[] = [
     {
       name: "Coursedog",
       reportingComplaint: "Not best-in-class for enterprise BI",
       source: "RFP.wiki",
       sourceUrl: "https://www.rfp.wiki/education-training/higher-education-catalog-and-curriculum-management-software/coursedog",
       dateRange: "2024-2026",
       whatItValidates: "Even the most feature-rich curriculum platform lacks enterprise-grade BI — the gap is architectural, not feature-count.",
     },
     {
       name: "CourseLeaf",
       reportingComplaint: "Weak report generation",
       source: "Gartner Peer Insights",
       sourceUrl: "https://www.gartner.com/reviews/product/courseleaf-catalog-cat",
       dateRange: "2019-2026",
       whatItValidates: "Gartner explicitly cites reporting as a weakness of the market leader (29% share) — the gap is acknowledged by the most authoritative industry analyst.",
     },
     {
       name: "Modern Campus",
       reportingComplaint: "Restrictive reporting, integrations, and staff notifications",
       source: "G2 (March 2026)",
       sourceUrl: "https://www.g2.com/products/modern-campus-catalog/reviews",
       dateRange: "March 2026",
       whatItValidates: "The freshest review in the category (2.5/5, March 12 2026) names reporting as the primary pain point — the gap is current, not legacy.",
     },
     {
       name: "CourseLoop",
       reportingComplaint: "Weak reporting tools",
       source: "Gartner Peer Insights",
       sourceUrl: "https://www.gartner.com/reviews/product/courseloop",
       dateRange: "2022-2026",
       whatItValidates: "A second Gartner-sourced complaint confirms the pattern is not platform-specific — Gartner independently identifies reporting weakness across multiple vendors.",
     },
     {
       name: "Lightcast",
       reportingComplaint: "Tough to understand which reports to pull",
       source: "G2",
       sourceUrl: "https://www.g2.com/products/lightcast/reviews",
       dateRange: "2023-2026",
       whatItValidates: "Even the LMI market leader (not a curriculum platform but an adjacent data tool) has reporting UX problems — the gap extends beyond curriculum management into the broader education data ecosystem.",
     },
   ];
   ```

5. **Verify the constant** is importable and typed correctly. Run `npx tsc --noEmit` in the compass/app directory to confirm no type errors.

### Phase 3 — UI Components (estimated 1 day)

6. **Create `AnalyticsGapMatrix` component** at `src/compass/AnalyticsGapMatrix.tsx`:

   Props: `{ data: AnalyticsGapEntry[] }`. Renders:
   - Card header: "The Universal Analytics Gap" with `BarChart3` icon
   - Subtitle: "Reporting and analytics deficiencies across every major curriculum platform — confirmed by G2, Gartner, and RFP.wiki (2019-2026)"
   - 5-column grid (on desktop), each column shows:
     - Competitor name (bold)
     - Reporting complaint in quotes (the key evidence)
     - Source badge (G2/Gartner/RFP.wiki) with `ExternalLink` icon linking to `sourceUrl`
     - Date range in muted text
   - Footer row spanning all columns: "DFVA fills all of these gaps — independent 11-dimension durability scoring, platform-agnostic ingestion, prescriptive recommendations" in teal with `CheckCircle2` icon
   - On mobile (768px): grid stacks to single column, each competitor becomes a row
   - Pure Tailwind CSS — no Recharts, no chart.js, no D3

7. **Export the component** and verify it renders with `UNIVERSAL_ANALYTICS_GAP_DATA` as props.

### Phase 4 — Page Integration (estimated 1.5 days)

8. **Update `InsightsPage.tsx`** — add "Universal Analytics Gap" section:
   - Import `AnalyticsGapMatrix` and `UNIVERSAL_ANALYTICS_GAP_DATA`
   - Insert the section above the per-competitor CompetitiveThreatCards (feats 017, 018, 019)
   - Section heading: "The Universal Analytics Gap" with `BarChart3` icon
   - Render `AnalyticsGapMatrix` with the data
   - Below the matrix, render the category-level CompetitiveEvent (filter `getCompetitiveEvents` for `competitor: "Market-wide"`) with `CompetitiveThreatCard variant="opportunity"`
   - Empty state: if no CompetitiveEvent with `competitor: "Market-wide"` exists, show "Universal analytics gap data is being compiled — check back soon"

9. **Update `LandingPage.tsx`** — add "The Analytics Gap" section:

   Position after "Platform-Agnostic Analytics" (feat-018) and before the main CTA. Structure:
   - Lead statistic: "5 platforms. 3 review sites. 7 years of evidence."
   - Body: "Every major curriculum management platform has documented reporting and analytics deficiencies. Not one delivers the analytical depth that modern program review demands."
   - Secondary text: "DFVA exists to fill this gap — an independent analytics layer that works alongside your existing platform."
   - CTA: "See the full comparison" linking to `/insights` with `ArrowRight` icon
   - `bg-slate-50` section background to distinguish from surrounding sections
   - No specific competitor is named in the landing copy — the category-level claim is universal

10. **Update `DevPortalPage.tsx`** — add "Reporting & Analytics" comparison row:

    Position after "User Satisfaction" (feat-019). Each competitor cell shows:
    - The reporting complaint (short form, e.g., "Weak report generation (Gartner)")
    - Source link badge
    - "No data" entries use muted styling for any competitor without a documented complaint
    
    DFVA column: "Independent 11-dimension durability scoring with prescriptive recommendations — not available in any curriculum management platform" with `CheckCircle2` icon and teal styling.

### Phase 5 — Polish & Ship (estimated 1 day)

11. **Responsive testing pass** on all new components:
    - `AnalyticsGapMatrix`: grid is readable at 768px, complaint text wraps without truncation, source badges are tappable on mobile, footer row is visible
    - Landing Page section: single-column layout, text sizes scale, CTA is full-width on mobile
    - DevPortal comparison row: no horizontal overflow, complaint text wraps, source badges visible
    - Insights page: Universal Analytics Gap section integrates visually with the existing Competitive Landscape and Market Validation sections

12. **Accessibility pass**:
    - `AnalyticsGapMatrix`: `aria-label` on each grid cell ("Coursedog reporting complaint: 'Not best-in-class for enterprise BI', sourced from RFP.wiki"), source links have `aria-label` ("Open RFP.wiki Coursedog page (external link)"), `rel="noopener noreferrer"` on all external links
    - Color is not the only indicator: text labels accompany all badges and the teal footer
    - Landing page section: standard text + link, no accessibility issues
    - Insights section: heading hierarchy is correct (h2 for section, h3 for sub-sections)

13. **Copy review**: all data factual and cited. Key rules:
    - Never describe any competitor as "failing," "broken," "inadequate," "terrible," or any pejorative term
    - All complaints are attributed to the review platform, not to DFVA's opinion
    - Each complaint is a direct quote or close paraphrase from the cited source
    - Source URLs must point to live, verifiable pages
    - The landing page uses the category-level claim without naming individual competitors
    - The DevPortal and Insights pages cite specific competitors with their specific complaints and sources

14. **Commit** with message:
    ```
    feat: universal analytics gap — category-level positioning and 5-competitor comparison matrix

    - Seed CompetitiveEvent for category-wide analytics gap finding (5 competitors, 3 sources, impactScore 5)
    - Add 5 MarketValidationSignal records (one per competitor, category analytics_gap, G2/Gartner/RFP.wiki sourced)
    - Update MarketWindowSnapshot with universal analytics gap opportunity signal
    - Add UNIVERSAL_ANALYTICS_GAP_DATA constant to marketValidationData.ts
    - Create AnalyticsGapMatrix component with 5-competitor responsive grid
    - Add "Universal Analytics Gap" section to InsightsPage
    - Add "The Analytics Gap" section to LandingPage
    - Add "Reporting & Analytics" row to DevPortalPage comparison table
    ```

15. **Post-merge verification**:
    - Confirm CompetitiveEvent with `competitor: "Market-wide"` appears in `/insights` via `getCompetitiveEvents` query
    - Confirm 5 MarketValidationSignals with `category: "analytics_gap"` appear via `getValidationSignals` query
    - Confirm MarketWindowSnapshot still shows NARROWING with the universal gap entry in `keyThreats`
    - Confirm `AnalyticsGapMatrix` renders with all 5 competitors on `/insights`
    - Confirm "The Analytics Gap" section on `/` with "5 platforms, 3 review sites, 7 years of evidence" lead
    - Confirm "Reporting & Analytics" row on `/developers` with all 5 competitors and their complaints
    - Confirm no regression on existing CompetitiveThreatCard instances, CompetitiveLandscape radar, Market Validation section

