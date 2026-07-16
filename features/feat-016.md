---
id: feat-016
name: "Lightcast 2026 Impact Report — AI Amplifies LMI Demand, Market Validation for DFVA"
status: draft
created: 2026-07-17
project: DFVA
---

# Feature: Lightcast 2026 Impact Report — AI Amplifies LMI Demand

## Description

Lightcast's 2026 Customer Impact Report surveyed ~1,000 customers and delivered three findings that directly validate DFVA's core thesis: (1) **96% say LMI is essential** — labour market intelligence is no longer optional for universities; (2) **90% of education customers use LMI for program review** — the exact use case DFVA serves; (3) **89% say LMI is MORE critical with AI adoption** — AI creates demand for structured assessment data, exactly as DFVA's 11-dimension methodology anticipated.

Lightcast was also named to TIME's Top WorkTech Companies 2026 list, confirming the vendor's brand strength is growing rapidly. This creates both a tailwind (the market wants what DFVA offers) and a headwind (Lightcast owns the category mindshare). The feature captures this report as a **market validation signal** inside the DFVA product — an Insights page section, a landing page positioning block, and a competitive differentiation narrative — so that prospects, users, and internal stakeholders can see third-party evidence that the problem DFVA solves is real, urgent, and growing.

This is not a data pipeline feature. It's a **content + positioning + product credibility** feature. The work is primarily in: (1) capturing the report's data points as structured `MarketValidationSignal` records, (2) building a dedicated Insights card and detail view that frames the validation in product terms, (3) updating landing page copy to cite the report as social proof, and (4) wiring the signal into the competitive differentiation narrative so DFVA's positioning evolves alongside market signals.

## Vibe

**Authoritative but urgent.** The report's data is not marketing fluff — it's a credible third party (Lightcast, a TIME Top WorkTech company) confirming DFVA's thesis. The tone should convey: "The market is racing toward this. Here's the evidence. DFVA is the education-specific answer." Visual treatment: data-forward cards with clear percentages, pull-quote styling for key findings, and a "what this means for DFVA" callout that connects market validation to product differentiation. Think McKinsey insight page, not blog post.

## User Stories

- As a **Deputy Vice-Chancellor (Academic)** evaluating whether to invest in DFVA, I want to see third-party market data (Lightcast's own customer research) confirming that 96% of institutions consider LMI essential and 89% say AI makes it MORE critical, so I can justify the investment to Council with evidence the vendor themselves published.

- As the **DFVA product team**, I want to capture competitive intelligence signals — including Lightcast's Impact Report — as structured records in the Insights database so the product's market validation story stays current and is surfaced automatically to users, not buried in a slide deck.

- As a **Program Director** viewing the DFVA Insights page, I want to see that independent market research (Lightcast's ~1,000-customer survey) confirms the urgency of program-level LMI assessment, so I feel validated in my decision to use DFVA rather than questioning whether this is just another tool.

- As a **prospective university customer** landing on evidura.ai, I want to see credible third-party validation (Lightcast report, TIME Top WorkTech recognition) that LMI-driven program review is an industry imperative, so I trust that DFVA addresses a real, urgent problem rather than an invented one.

- As the **DFVA marketing/content lead**, I want a structured way to capture external market validation signals (reports, surveys, analyst recognition) as product content that can be surfaced across the landing page, Insights page, and competitive comparison matrix, so the product's evidence base grows without manual page-by-page updates.

## Technical Design

### Architecture

This feature extends the existing market validation signal infrastructure — `MarketValidationSignal` (Prisma model, already seeded with 25+ signals), `getValidationSignals` (public Wasp query), and the Insights page — with a dedicated "Impact Report" presentation layer. No new data models are required; the existing `MarketValidationSignal` schema is sufficient. The work is in content authoring, UI components, and integration into existing pages.

```
┌──────────────────────────────────────────────────────────────────┐
│                    CONTENT LAYER                                   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │ Lightcast 2026 Impact Report — Structured Signal              │ │
│  │                                                               │ │
│  │ MarketValidationSignal records (3-5 rows):                    │ │
│  │  • "96% of ~1,000 customers say LMI is essential"             │ │
│  │  • "90% of education customers use LMI for program review"   │ │
│  │  • "89% say AI makes LMI more critical"                      │ │
│  │  • "Lightcast named to TIME Top WorkTech Companies 2026"     │ │
│  │  • "Lightcast surveyed ~1,000 customers for 2026 report"     │ │
│  │                                                               │ │
│  │ category: "market_validation"                                 │ │
│  │ source: "Lightcast 2026 Customer Impact Report"               │ │
│  │ credibilityScore: 8-9 (vendor-published but large-N survey)  │ │
│  └──────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────┬──────────────────────────────┘
                                    │
┌───────────────────────────────────▼──────────────────────────────┐
│                    PRESENTATION LAYER                              │
│                                                                   │
│  ┌────────────────────────────┐  ┌──────────────────────────────┐ │
│  │ ImpactReportCard.tsx        │  │ LandingPage — "Validated by   │ │
│  │ - Hero stat cards (96%,     │  │  Industry Research" section   │ │
│  │   90%, 89%)                 │  │ - Lightcast report pull-quote │ │
│  │ - Source attribution        │  │ - TIME Top WorkTech badge     │ │
│  │ - "What this means for      │  │ - "See the evidence →" CTA   │ │
│  │   DFVA" analysis block      │  └──────────────────────────────┘ │
│  │ - Link to full report       │                                   │
│  └────────────────────────────┘  ┌──────────────────────────────┐ │
│                                   │ CompetitiveComparison        │ │
│  ┌────────────────────────────┐  │ — "Market Validation" row     │ │
│  │ ImpactReportDetail.tsx      │  │   Lightcast: their own       │ │
│  │ - Full breakdown of each    │  │   research validates DFVA    │ │
│  │   finding                   │  │   thesis                     │ │
│  │ - Competitive implications  │  └──────────────────────────────┘ │
│  │ - DFVA differentiation      │                                   │
│  │   narrative                 │  ┌──────────────────────────────┐ │
│  └────────────────────────────┘  │ InsightsPage                  │ │
│                                   │ — New "Market Validation"     │ │
│                                   │   section below Portfolio     │ │
│                                   │   Health card                 │ │
│                                   │ — ImpactReportCard prominent  │ │
│                                   └──────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

### Current State (as of 2026-07-17)

| Component | Status | Details |
|-----------|--------|---------|
| `MarketValidationSignal` (Prisma) | ✅ Exists | `schema.prisma` lines 191-203. Fields: source, excerpt, url, dateDiscovered, credibilityScore, category, relevantClaim, isActive |
| `getValidationSignals` (Wasp query) | ✅ Operational | `operations.ts` lines 233-242. Public (no auth), returns all active signals, limit 200 |
| `MarketValidationSignal` seed data | ✅ Populated | 25+ signals from research-loop: Coursedog acquisitions, CourseLeaf gaps, migration pain, T1 gap, scraper regressions |
| `MarketWindowSnapshot` (Prisma) | ✅ Exists | `schema.prisma` lines 222-230. Tracks market window status, urgency, threats, recommendations |
| `getMarketWindowStatus` (Wasp query) | ✅ Operational | `operations.ts` lines 257-262. Public. Returns latest snapshot |
| `CompetitiveEvent` (Prisma) | ✅ Exists | `schema.prisma` lines 205-220. Tracks competitor moves with impact scores |
| `getCompetitiveEvents` (Wasp query) | ✅ Operational | `operations.ts` lines 245-254. Public. Returns all active events |
| `InsightsPage.tsx` | ✅ Exists | 124 lines. Faculty analytics cards, Portfolio Health CTA, Premium gate. **No market validation signal display yet** |
| `InsightsGate.tsx` | ✅ Exists | Premium/authentication gate for Insights subpages |
| `LandingPage.tsx` | ✅ Exists | Evidura brand landing — assess CTA, value props. **No market validation / social proof section** |
| `DevPortalComparePage.tsx` | ✅ Exists | Competitive comparison matrix from feat-009. Has rows for API maturity, data model, etc. **No "Market Validation" comparison row** |
| Impact Report signal records | ❌ Missing | No `MarketValidationSignal` rows for Lightcast 2026 report findings |
| ImpactReportCard component | ❌ Missing | No dedicated UI for presenting individual high-credibility market validation reports |
| ImpactReportDetail page | ❌ Missing | No detail view for a market validation signal report |
| Landing Page "Validated by Research" section | ❌ Missing | No social proof / third-party validation section on the landing page |
| Competitive Comparison "Market Validation" row | ❌ Missing | DevPortal comparison doesn't include a row about third-party validation |
| Insights Page "Market Validation" section | ❌ Missing | Insights page shows faculty analytics only — no market signal content |
| TIME Top WorkTech 2026 badge | ❌ Missing | No visual badge or reference to Lightcast's TIME recognition |

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Data model for report signals | Reuse existing `MarketValidationSignal` — no new models | The schema already captures all needed fields: source, excerpt, url, credibilityScore, category, relevantClaim. A new model would duplicate this. |
| How many signal records | 5 records — one per finding + one for the report itself as a container | Each finding can be surfaced independently (e.g., the 96% stat on a card, the 89% AI stat on a different page). A container record links them. |
| Credibility scoring | 8/10 — vendor-published but large-N survey (~1,000 respondents) | Higher than a press release (6), lower than peer-reviewed research (10). Transparent to users. |
| Category | `market_validation` — existing category in seed data | Consistent with feat-006 (Market Convergence Validation). Enables filtering by validation type. |
| Insights page placement | New "Market Validation" section below Portfolio Health card | Portfolio Health is the primary CTA. Market validation is supporting evidence — it belongs below, not above. |
| Landing page placement | New "Validated by Industry Research" section between existing hero/value-props and the CTA | Social proof before the ask. Standard landing page pattern (Stripe, Linear, Vercel). |
| Dedicated detail page vs inline | Dedicated route `/insights/validation/:slug` | High-credibility reports deserve their own page for deep linking (from email, social, sales decks). Same pattern as `/reports/:reportSlug`. |
| "What this means for DFVA" analysis | LLM-assisted draft, human-reviewed | The implications require strategic judgment (competitive positioning, differentiation narrative). AI can draft from structured data; human review ensures accuracy and tone. |
| Competitive comparison integration | Add "Market Validation" row to DevPortalComparePage | Consistent with feat-009's comparison pattern. Each competitor gets a cell: Lightcast = "n/a (vendor)", DFVA = "Independent third-party methodology + industry research citations" |
| TIME Top WorkTech badge | Static SVG badge, not an API integration | TIME doesn't provide a badge API. A stylized badge communicates the recognition without licensing risk. Link out to TIME.com article. |
| Report URL persistence | Store the Lightcast report URL in `MarketValidationSignal.url` | The report may move or be paywalled. Storing the URL at signal creation time captures the link as it existed. Add `archiveUrl` as a future enhancement. |
| Signal recency display | Show "Q2 2026" vintage on the card, not a freshness badge | Unlike job posting data (feat-005), market validation reports don't go "stale" — a 2026 survey stays relevant for 12-18 months. "Last updated" is misleading for this content type. |
| Landing page A/B test readiness | Build as a single section, prep for variant test | Don't over-engineer. Ship one version. Use a feature flag (`SHOW_VALIDATION_SECTION`) to enable/disable for A/B testing later. Hardcode to `true` for v1. |

### Dependencies

- **Wasp 0.24** — new `route` for `/insights/validation/:slug`; no new queries/actions needed (reuses `getValidationSignals`)
- **React 19** — new UI components: `ImpactReportCard`, `ImpactReportDetail`
- **Prisma (PostgreSQL)** — seed data insert for 5 new `MarketValidationSignal` records
- **Existing `MarketValidationSignal` model** — no schema changes required
- **Existing `InsightsPage.tsx`** — extended with new section
- **Existing `LandingPage.tsx`** — extended with new section
- **Existing `DevPortalComparePage.tsx`** — extended with new comparison row
- **Lucide React** (already in project) — icons: `BarChart3`, `Award`, `ExternalLink`, ` TrendingUp`
- **Tailwind CSS** — styling only; no new CSS dependencies
- **No external APIs** — all data is static content from the Lightcast report
- **No new NPM packages** — all UI is built with existing stack
- **Lightcast 2026 Customer Impact Report** (external reference) — URL to the report for attribution links. The report itself is not ingested; we cite it.

## Scope

### In Scope (MVP — "Market Validation v1")

- [ ] **Seed 5 `MarketValidationSignal` records** for the Lightcast 2026 Impact Report findings: (1) 96% LMI essential, (2) 90% education use LMI for program review, (3) 89% AI makes LMI more critical, (4) TIME Top WorkTech 2026 recognition, (5) container record for the full report with URL
- [ ] **Create `ImpactReportCard` component** (`src/client/components/compass/ImpactReportCard.tsx`): hero stat cards (96%, 90%, 89%) with source attribution, collapsible "What this means for DFVA" analysis block, link to full report source
- [ ] **Create `ImpactReportDetail` page** (`src/compass/ImpactReportDetail.tsx`): dedicated page at `/insights/validation/:slug` with full breakdown of each finding, competitive implications narrative, DFVA differentiation positioning, and related validation signals
- [ ] **Add "Market Validation" section to InsightsPage**: new section below Portfolio Health card displaying the latest high-credibility validation signals, with `ImpactReportCard` as the hero component and a "View all signals" link
- [ ] **Add "Validated by Industry Research" section to LandingPage**: pull-quote from the Lightcast report (96% stat), TIME Top WorkTech badge, supporting text connecting market validation to DFVA's value proposition, CTA to Insights page
- [ ] **Add "Market Validation" row to DevPortalComparePage**: new comparison row showing DFVA's independent third-party validation vs competitors' vendor-published claims. Lightcast cell: "Vendor-published; large-N survey (~1,000). TIME Top WorkTech 2026." DFVA cell: "Independent 11-dimension methodology. Validated by Lightcast, Gartner, ListEdTech, and 25+ market signals."
- [ ] **Add Wasp route** for `/insights/validation/:slug` in `main.wasp.ts` COMPASS region, mapped to `ImpactReportDetail` page (public, no auth required — consistent with Insights)
- [ ] **Add seed migration** to populate the 5 Lightcast report `MarketValidationSignal` records. Use existing seed pattern (Prisma `createMany` with `skipDuplicates: true`)
- [ ] **Write the "What this means for DFVA" analysis** as static content embedded in the component (not LLM-generated at runtime). Content covers: (a) LMI demand is proven and growing, (b) Lightcast validates but doesn't own education-specific methodology, (c) DFVA's 11-dimension model is the differentiated answer
- [ ] **Add TIME Top WorkTech 2026 badge** as an SVG asset in `src/client/assets/` and reference it in the Landing Page and ImpactReportCard
- [ ] **Regression test**: existing Insights page, Landing page, and DevPortal all render correctly with new sections added
- [ ] **Commit** with message following conventional commits pattern

### Out of Scope (Future)

- Automated ingestion of future Lightcast reports (requires report scraping/parsing — manual content authoring is better for analyst-grade reports)
- General-purpose market validation CMS (this feature builds specific components for a specific report; a general CMS is a separate feature)
- A/B testing framework for landing page sections (build the section, test later)
- Competitor report comparison (e.g., "Lightcast vs Burning Glass vs Emsi" — different feature)
- Real-time updating of validation signals (reports are static; cron-based refresh of signal metadata is sufficient)
- Integration with third-party analyst ratings (Gartner Magic Quadrant, Forrester Wave) — those are separate signals for future features
- Email/social sharing of validation report pages (standard social sharing can be added later)
- PDF export of validation report detail page (nice-to-have for sales enablement)
- Animated stat counters on ImpactReportCard (accessible static numbers first; animation is polish)
- Multi-language versions of the validation content (English-only for v1; i18n is a separate initiative)

## Acceptance Criteria

- [ ] Five `MarketValidationSignal` records exist in the database with `category: "market_validation"`, `source: "Lightcast 2026 Customer Impact Report"`, `credibilityScore` between 7-9, and `isActive: true`
- [ ] `ImpactReportCard` renders with three stat cards (96%, 90%, 89%) each showing the percentage, a one-line description, and the source attribution "Lightcast 2026 Customer Impact Report"
- [ ] `ImpactReportCard` "What this means for DFVA" section expands/collapses on click and contains a 3-4 paragraph competitive positioning narrative that explicitly names Lightcast as the source while differentiating DFVA
- [ ] `/insights/validation/lightcast-2026-impact-report` loads the `ImpactReportDetail` page showing all five findings with source links, the DFVA differentiation narrative, and a "Related Signals" section listing other `market_validation` category signals
- [ ] Insights page (`/insights`) shows a new "Market Validation" section below Portfolio Health containing the `ImpactReportCard` and a "View all signals →" link
- [ ] Landing page (`/`) shows a "Validated by Industry Research" section between the existing value propositions and the CTA, with the 96% stat prominently displayed, the TIME Top WorkTech badge, and a CTA linking to `/insights`
- [ ] DevPortal Compare page (`/developers/compare`) shows a "Market Validation" row with appropriate content for DFVA and each competitor
- [ ] TIME Top WorkTech 2026 badge renders as an SVG on both the landing page and the ImpactReportCard
- [ ] All new pages and sections render correctly on mobile viewport (responsive stat cards stack vertically, analysis block is readable)
- [ ] Existing Insights page functionality is not regressed: faculty cards, Portfolio Health card, and Premium gate all work as before
- [ ] Landing page is not regressed: hero, value props, CTA, and navigation all work as before
- [ ] Seed migration is idempotent — running it twice does not create duplicate `MarketValidationSignal` records

## Open Questions

- [ ] **Exact Lightcast report URL:** The report may be gated behind a form or paywall. Do we link to the public landing page, the PDF directly, or a Lightcast blog post summarizing the findings? Decision: link to the most stable public URL; if gated, link to the Lightcast blog summary post and note "full report available from Lightcast."
- [ ] **TIME Top WorkTech 2026 article URL:** The TIME.com article may have a paywall. Decision: link to the TIME.com article; add `(may require subscription)` note. The badge itself is the primary signal.
- [ ] **Should the Landing Page validation section include competitor logos?** Showing Lightcast's logo as the source of the data could be confusing ("are they partners?"). Decision: use the Lightcast name in text, not the logo. The TIME badge is safe because it's an award, not a competitor.
- [ ] **Tone of competitive differentiation:** How directly should DFVA name Lightcast as a competitor vs framing them as validation of the category? Decision: "Lightcast's own research validates the need. DFVA delivers the education-specific answer." Acknowledge their research, differentiate on methodology.
- [ ] **Signal recency vs evergreen content:** The 2026 report will be "current" for 12-18 months. Should the ImpactReportCard show a vintage date to manage expectations? Decision: show "2026" in the card subtitle, not a freshness badge. When Lightcast publishes a 2027 report, we add new signals and optionally archive the 2026 ones.
- [ ] **Should the "What this means for DFVA" analysis be editable without a code deploy?** Currently it's static content in the component. A future CMS-backed approach would allow non-engineers to update the analysis. Decision: static for v1 — the analysis changes at the pace of major reports (annual), not weekly. A CMS is premature.
- [ ] **How many other market validation signals should be shown on the Insights page?** The Lightcast report is the hero, but there are 25+ existing signals. Decision: show the top 3 highest-credibility signals below the ImpactReportCard, with a "View all signals" link. Don't overwhelm the page.

## Implementation Tasks

### Phase 1 — Data Layer (estimated 0.5 days)

1. **Create seed data file** at `compass/app/src/compass/seedLightcast2026Report.ts`:
   ```typescript
   // Export an array of MarketValidationSignal create inputs for the Lightcast 2026 report
   export const LIGHTCAST_2026_SIGNALS = [
     {
       source: "Lightcast 2026 Customer Impact Report",
       excerpt: "96% of ~1,000 customers surveyed say labour market intelligence (LMI) is essential to their operations.",
       url: "https://lightcast.io/resources/research/customer-impact-report-2026",
       dateDiscovered: new Date("2026-07-15"),
       credibilityScore: 8,
       category: "market_validation",
       relevantClaim: "LMI demand is near-universal — 96% of institutions consider it essential. Validates DFVA's core market thesis.",
       isActive: true,
     },
     // ... 4 more records
   ];
   ```
2. **Register seed data** in the existing seed script (`dbSeeds.ts`) or as a standalone migration script. Use `createMany` with `skipDuplicates: true` keyed on `(source, excerpt)` to ensure idempotency.
3. **Run seed** against local dev database: `cd compass/app && npx tsx src/compass/seedLightcast2026Report.ts`
4. **Verify** records in DB: query `MarketValidationSignal` where `source` contains "Lightcast 2026"

### Phase 2 — UI Components (estimated 2 days)

5. **Create `ImpactReportCard` component** at `src/client/components/compass/ImpactReportCard.tsx`:
   - Props: none (fetches its own data via `useQuery(getValidationSignals)` filtered by source)
   - Renders three stat cards in a responsive grid (1 col mobile, 3 col desktop)
   - Each stat: large percentage number, one-line description, source attribution in small text
   - Below stats: collapsible "What this means for DFVA" section with 3-4 paragraph static analysis
   - Bottom: "Read the full report →" external link + TIME Top WorkTech badge
   - Loading skeleton while query resolves
   - Empty state if signals not found: "Market validation data loading..."
6. **Create `ImpactReportDetail` page** at `src/compass/ImpactReportDetail.tsx`:
   - Route param: `slug` — maps to a signal group (e.g., `lightcast-2026-impact-report`)
   - Fetches all signals in the group via `useQuery(getValidationSignals)` filtered by source
   - Renders: page title, report metadata (source, date, credibility), each finding as a card with full excerpt and implications, DFVA differentiation narrative section, "Related Signals" section showing other `market_validation` category signals, back link to Insights
   - Not found state if slug doesn't match any signal group
7. **Add Wasp route** in `main.wasp.ts`:
   ```typescript
   route("ImpactReportDetailRoute", "/insights/validation/:slug", page(ImpactReportDetail))
   ```
   Place in COMPASS region, no `authRequired` (public, consistent with Insights).
8. **Export `ImpactReportDetail` page** from `main.wasp.ts` imports section

### Phase 3 — Page Integration (estimated 1.5 days)

9. **Update `InsightsPage.tsx`** — add "Market Validation" section:
   - Import `ImpactReportCard`
   - Add new section between Portfolio Health card and faculty cards
   - Section heading: "Market Validation" with `TrendingUp` icon
   - Render `ImpactReportCard`
   - Below card: "View all market signals →" link to a filtered view or anchor on the same page
10. **Update `LandingPage.tsx`** — add "Validated by Industry Research" section:
    - New section between existing value propositions and the CTA section
    - Heading: "Validated by Industry Research"
    - Pull-quote style block: "96% of institutions say LMI is essential" with Lightcast attribution
    - TIME Top WorkTech 2026 badge (SVG)
    - Supporting text: 2-3 sentences connecting market validation to DFVA's value
    - CTA button: "See the evidence →" linking to `/insights`
    - Responsive: stacks vertically on mobile
11. **Update `DevPortalComparePage.tsx`** — add "Market Validation" comparison row:
    - New row in the existing comparison table
    - Column headers: Feature, DFVA (Evidura), Coursedog, CourseLeaf, Lightcast
    - DFVA cell: "Independent 11-dimension methodology. Validated by Lightcast (~1,000-customer survey), Gartner reviews, ListEdTech analysis, and 25+ market signals."
    - Coursedog cell: "Vendor-published Assessment Cloud + ClassRanked integration. No independent third-party validation."
    - CourseLeaf cell: "Vendor-published analytics expansion. No independent third-party validation."
    - Lightcast cell: "Vendor-published; large-N customer survey (~1,000). TIME Top WorkTech 2026. Industry standard for LMI data."

### Phase 4 — Assets & Polish (estimated 1 day)

12. **Create TIME Top WorkTech 2026 badge SVG** at `src/client/assets/time-top-worktech-2026.svg`:
    - Stylized badge that matches Evidura brand colours
    - "TIME Top WorkTech Companies 2026" text
    - Consistent sizing with other brand assets
13. **Add Lightcast report URL** to `.env` or constants file (if the URL may change between environments)
14. **Responsive testing pass** on all new components:
    - `ImpactReportCard`: stat cards stack vertically on mobile
    - `ImpactReportDetail`: readable on narrow viewports
    - Landing Page new section: doesn't break existing layout
    - DevPortal comparison: new row doesn't overflow table
15. **Accessibility pass**: stat cards have proper `aria-label`, collapsible section has `aria-expanded`, external links have `rel="noopener noreferrer"` and screen-reader-visible "opens in new tab" text
16. **Commit** with message:
    ```
    feat: Lightcast 2026 Impact Report — market validation signals, Insights card, landing page section, competitive comparison row

    - Seed 5 MarketValidationSignal records for Lightcast 2026 report findings
    - Add ImpactReportCard component with hero stats + DFVA analysis
    - Add ImpactReportDetail page at /insights/validation/:slug
    - Add "Market Validation" section to InsightsPage
    - Add "Validated by Industry Research" section to LandingPage
    - Add "Market Validation" row to DevPortalComparePage
    - Add TIME Top WorkTech 2026 badge asset
    ```
