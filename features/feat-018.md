---
id: feat-018
name: "CourseLeaf Analytics Expansion — Validates the Analytics Trend, Exposes the Infrastructure Gap"
status: draft
created: 2026-07-21
project: DFVA
priority: medium
score: 7
type: competitor_move
source: research-loop changelogs
---

# Feature: CourseLeaf Analytics Expansion — Complementary Analytics Layer Positioning

## Description

CourseLeaf — the largest curriculum management platform by market share (29%, per LevaData 2025) — has expanded its product listings to include Micro-Credentials, Career Data Integration, Learning Outcomes Mapping, Course Demand Analytics, and Registration Optimization. This is not a product launch in the same sense as Coursedog's Assessment Cloud (feat-017); it's a product page update signalling the company's direction. Nevertheless, it is strategically significant for two reasons.

**First, it validates the market trend.** The fact that the largest incumbent is adding analytics features confirms that curriculum management platforms are converging toward data-centric operations — exactly the thesis DFVA was built on. When CourseLeaf — a company whose core competency is catalog publishing and workflow automation — starts listing "Course Demand Analytics" and "Career Data Integration," the market is speaking: analytics are becoming table stakes in curriculum management.

**Second, it exposes a structural gap that DFVA is uniquely positioned to fill.** CourseLeaf's well-documented API poverty (confirmed by three independent open-source projects: University of Illinois Azure Function for data loading, APInception meta-API wrapper, and cc-coursemap scraper) means their analytics can only operate on their own platform's data — and that data is stored as unstructured HTML blocks, not structured, queryable records. CourseLeaf cannot deliver the depth of analysis that DFVA's structured, schema-first, 11-dimension scoring methodology provides. DFVA is not competing with CourseLeaf; DFVA is completing CourseLeaf — providing the analytics layer that CourseLeaf structurally cannot build on its own HTML-based architecture.

This feature builds the **complementary positioning layer**: a CompetitiveEvent record framing the expansion as market validation (not a competitive threat — impactScore 5, marketWindowEffect "OPENING"), MarketValidationSignal records confirming the trend and the API poverty constraint, a new "Complementary Analytics" Insights card framing DFVA as the analytics layer for CourseLeaf campuses, a landing page section positioning DFVA as "the analytics standard for curriculum data — regardless of platform," and a DevPortal comparison row documenting the methodology-to-architecture gap between DFVA and CourseLeaf. This feature also adds CourseLeaf to the competitive data infrastructure for the first time — the `apiCompetitiveData.ts` and DevPortal comparison surfaces.

The strategic goal is to ensure any institution using CourseLeaf (or any curriculum platform) understands: DFVA doesn't compete with your curriculum system — it makes your curriculum data analytically useful. This is particularly important for the Go8, where multiple universities use or evaluate CourseLeaf alongside their assessment needs.

## Vibe

**Confident, collaborative, forward-looking.** The tone should convey: "We saw this coming. CourseLeaf's move proves the market is converging exactly where we predicted. And here's why we're complementary, not competitive — we provide the analytics depth their architecture can't reach." The framing must never read as attacking CourseLeaf (they're not a direct competitor — they're a potential partner/ecosystem player). Instead, it should feel like DFVA anticipated this market convergence and built for it from day one. Visual treatment: partnership-framed comparison tables, "complementary, not competitive" callouts, architecture diagrams showing DFVA sitting above (analytics layer) while CourseLeaf sits below (workflow layer). Think McKinsey ecosystem strategy brief, not competitor takedown page.

## User Stories

- As a **Deputy Vice-Chancellor (Academic)** whose institution uses CourseLeaf for curriculum management, I want to understand how DFVA's independent 11-dimension durability scoring complements CourseLeaf's new analytics features without duplication, so that I can justify investment in both platforms to Council — CourseLeaf for workflow, DFVA for assessment rigour.

- As a **university IT architect** who maintains a CourseLeaf deployment and has experienced its API limitations firsthand (no structured data export, HTML-only catalog), I want to see a clear architectural comparison between DFVA's structured, schema-first data model and CourseLeaf's HTML-based approach, so that I can explain to academic stakeholders why CourseLeaf's "analytics" features cannot deliver the same depth of programmatic analysis that DFVA provides.

- As the **DFVA product team**, I want to capture CourseLeaf's analytics expansion as a structured market validation signal — framed as market convergence confirmation, not a competitive threat — so that the product's positioning data accurately reflects the evolving ecosystem and DFVA can reference this signal in sales conversations with CourseLeaf-using institutions.

- As a **prospective university customer** evaluating curriculum analytics solutions, I want to immediately understand that DFVA is platform-agnostic — it works WITH CourseLeaf (or any curriculum system), not instead of it — so that I don't perceive DFVA as a replacement for our existing curriculum management investment but as the analytics layer that makes that investment more valuable.

- As a **Program Director** at a CourseLeaf-using university, I want to see how DFVA's prescriptive methodology ("what SHOULD exist in a durable degree") differs from CourseLeaf's descriptive features ("what courses ARE being offered"), so that I can determine which tool provides the strategic insights needed for program review, not just operational reporting.

## Technical Design

### Architecture

This feature follows the established competitive intelligence pattern from feat-017 (Coursedog Assessment Cloud) and feat-014 (CourseLeaf Infrastructure Gap — pending) but with a fundamentally different framing: **complementary analytics layer** rather than competitive threat response. CourseLeaf is not a direct competitor to DFVA — it's a curriculum management platform whose analytics expansion validates DFVA's thesis while exposing the structural limitations of HTML-based, API-poor architecture.

The architecture mirrors the three-layer pattern: data layer (CompetitiveEvent + MarketValidationSignal records), presentation layer (Insights card, Landing page section, DevPortal comparison row), and data infrastructure layer (adding CourseLeaf to competitive data files for the first time). No new Prisma models are required; the existing schema is sufficient.

```
┌──────────────────────────────────────────────────────────────────────────┐
│          COURSELEAF ANALYTICS EXPANSION (July 2026)                       │
│                                                                           │
│  Product page additions:                                                   │
│  • Micro-Credentials support                                               │
│  • Career Data Integration                                                 │
│  • Learning Outcomes Mapping                                               │
│  • Course Demand Analytics                                                 │
│  • Registration Optimization                                               │
│  → Validates: analytics are becoming table stakes in curriculum mgmt      │
│  → Exposes: API poverty limits depth (confirmed by 3+ open-source tools)  │
│  → Threat level: 5/10 — market validation, not competitive threat         │
└───────────────────────────────────┬──────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼──────────────────────────────────────┐
│              DFVA COMPLEMENTARY ANALYTICS POSITIONING                      │
│                                                                           │
│  CORE NARRATIVE:                                                          │
│  "CourseLeaf manages curriculum. DFVA assesses it. They're the            │
│   workflow layer; we're the analytics layer. Together, institutions       │
│   get what neither can deliver alone."                                    │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  DATA LAYER                                                         │  │
│  │                                                                     │  │
│  │  CompetitiveEvent record (Prisma):                                   │  │
│  │  • eventType: "PRODUCT_UPDATE" (not "PRODUCT_LAUNCH")               │  │
│  │  • competitor: "CourseLeaf"                                         │  │
│  │  • title: "CourseLeaf Adds Analytics Features to Product Listing"    │  │
│  │  • impactScore: 5, marketWindowEffect: "OPENING"                    │  │
│  │                                                                     │  │
│  │  MarketValidationSignal records (3-4):                               │  │
│  │  • "CourseLeaf adds Career Data Integration — LMI-in-curriculum     │  │
│  │     becoming table stakes"                                           │  │
│  │  • "CourseLeaf API poverty confirmed by third-party tool ecosystem — │  │
│  │     limits analytics depth"                                          │  │
│  │  • "Learning Outcomes Mapping added — structured outcomes data      │  │
│  │     becoming a curriculum platform expectation"                      │  │
│  │  • "Registration Optimization + Course Demand Analytics —            │  │
│  │     operational analytics, not strategic assessment"                 │  │
│  │                                                                     │  │
│  │  MarketWindowSnapshot update:                                        │  │
│  │  • No status change needed (already NARROWING from feat-017)        │  │
│  │  • Append CourseLeaf trend to keyThreats as opportunity signal      │  │
│  │  • recommendedActions: "Position as complementary analytics layer   │  │
│  │    for CourseLeaf campuses"                                          │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  PRESENTATION LAYER                                                  │  │
│  │                                                                     │  │
│  │  ┌───────────────────────────┐  ┌──────────────────────────────────┐│  │
│  │  │ InsightsPage.tsx           │  │ LandingPage.tsx                  ││  │
│  │  │ New card in "Competitive   │  │ • "Platform-Agnostic Analytics"  ││  │
│  │  │ Landscape" section:        │  │   section                        ││  │
│  │  │ • "Market Convergence"     │  │ • Works-with framing: DFVA sits  ││  │
│  │  │   card type (new variant)  │  │   above any curriculum platform   ││  │
│  │  │ • Green/blue styling       │  │ • "Your curriculum data, made    ││  │
│  │  │   (opportunity, not threat)│  │   analytically powerful"         ││  │
│  │  │ • "Why this matters for   │  │ • Logos: CourseLeaf, Coursedog,   ││  │
│  │  │   DFVA" — complementary    │  │   CourseLoop (ecosystem framing) ││  │
│  │  │   opportunity analysis     │  │                                  ││  │
│  │  └───────────────────────────┘  └──────────────────────────────────┘│  │
│  │                                                                     │  │
│  │  ┌───────────────────────────┐  ┌──────────────────────────────────┐│  │
│  │  │ DevPortalComparePage.tsx   │  │ apiCompetitiveData.ts             ││  │
│  │  │ • New "Analytics Depth"    │  │ • Add CourseLeaf competitor       ││  │
│  │  │   comparison row           │  │ • API quality: "none" (confirmed  ││  │
│  │  │ • DFVA: "11-dimension      │  │   by 3+ open-source projects)    ││  │
│  │  │   prescriptive scoring"    │  │ • painPoints: HTML-only, no       ││  │
│  │  │ • CourseLeaf: "Descriptive │  │   structured data export,         ││  │
│  │  │   reporting on HTML data"  │  │   custom scrapers required        ││  │
│  │  │ • Coursedog: "Integrated   │  │                                  ││  │
│  │  │   descriptive analytics"   │  │                                  ││  │
│  │  └───────────────────────────┘  └──────────────────────────────────┘│  │
│  └────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

### Current State (as of 2026-07-21)

This feature introduces CourseLeaf as a named competitor in the product for the first time. CourseLeaf is referenced in the `dbSeeds.ts` FragilityIncident data (alongside Coursedog) and in feat-017's DevPortal comparison row (as a third column), but there is no dedicated CourseLeaf CompetitiveEvent, no MarketValidationSignals about CourseLeaf's analytics, no CourseLeaf entry in `apiCompetitiveData.ts`, and no CourseLeaf-specific positioning content in the UI.

| Component | Status | Details |
|-----------|--------|---------|
| `CompetitiveEvent` (Prisma) | ✅ Exists | `schema.prisma` lines 205-220. `eventType: "PRODUCT_UPDATE"` is a new event type for this feature (existing types: ACQUISITION, PRODUCT_LAUNCH). Competitor field supports arbitrary string values — `competitor: "CourseLeaf"` is valid. |
| `MarketValidationSignal` (Prisma) | ✅ Exists | `schema.prisma` lines 191-203. Category field accepts arbitrary values — `category: "market_convergence"` is valid alongside existing `competitor_move`. |
| `MarketWindowSnapshot` (Prisma) | ✅ Exists | `schema.prisma` lines 222-230. No status change needed (NARROWING from feat-017). Append to keyThreats/recommendedActions arrays. |
| `getCompetitiveEvents` (Wasp query) | ✅ Operational | `operations.ts` lines 244-254. Public, no auth. Returns all active events ordered by dateOccurred desc. |
| `getValidationSignals` (Wasp query) | ✅ Operational | `operations.ts` lines 233-242. Public, no auth. Returns all active signals ordered by credibilityScore desc. |
| `getMarketWindowStatus` (Wasp query) | ✅ Operational | `operations.ts` lines 257-263. Public, no auth. Returns latest snapshot. |
| `apiCompetitiveData.ts` | ✅ Exists | 88 lines. `COMPETITORS` array has Coursedog, CourseLoop, Modern Campus — **no CourseLeaf entry**. `CompetitorApiData` interface covers API quality dimensions. |
| `DevPortalComparePage.tsx` | ✅ Exists | Has comparison rows for API Quality, Market Validation, Assessment Methodology (feat-017). Uses `apiCompetitiveData.ts` for API quality data. **No CourseLeaf in comparison tables except feat-017's methodology row.** |
| `CompetitiveLandscape.tsx` | ✅ Exists | 28 lines showing radar chart of competitors. Shows CourseLoop but **not CourseLeaf**. Analytics maturity scoring for CourseLoop=2. |
| `InsightsPage.tsx` | ✅ Exists | Has Competitive Landscape section (feat-017), Market Validation (feat-016), faculty cards, Portfolio Health CTA. **No CourseLeaf-specific card or market convergence framing.** |
| `LandingPage.tsx` | ✅ Exists | Multiple positioning sections added by feats 002-017. **No "platform-agnostic analytics" or "works with your curriculum system" section.** |
| `dbSeeds.ts` | ✅ References CourseLeaf | FragilityIncident seed (lines 26-31) references "Coursedog + CourseLeaf" platform. CourseLeaf name is established in seed data but not in product UI. |
| CourseLeaf CompetitiveEvent | ❌ Missing | No `CompetitiveEvent` record capturing the July 2026 analytics expansion |
| CourseLeaf MarketValidationSignals | ❌ Missing | No signals documenting CourseLeaf's analytics features, API poverty, or the market convergence pattern |
| CourseLeaf `CompetitorApiData` entry | ❌ Missing | `apiCompetitiveData.ts` has no CourseLeaf entry. The DevPortal comparison table cannot render CourseLeaf API quality data. |
| "Market Convergence" Insights card type | ❌ Missing | `CompetitiveThreatCard` (feat-017) only supports threat-level framing. A new card variant (or prop) for opportunity/convergence signals is needed. |
| "Platform-Agnostic Analytics" landing section | ❌ Missing | No landing page section framing DFVA as the analytics layer that works with any curriculum platform. |
| "Analytics Depth" DevPortal comparison row | ❌ Missing | No comparison row showing the methodology-to-architecture gap between DFVA's prescriptive scoring and competitors' descriptive reporting. |
| CourseLeaf in CompetitiveLandscape radar | ❌ Missing | Radar chart shows only Coursedog and CourseLoop (and one anonymous "Other"). |

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| CompetitiveEvent impactScore | 5/10 (medium-low) | CourseLeaf adding analytics features validates the market, but CourseLeaf is not a direct competitor — it's a curriculum management platform. Their analytics are descriptive reporting on their own data, not independent assessment. A 5 reflects "significant market signal, low direct threat." Compare: Coursedog Assessment Cloud = 9 (direct encroachment). |
| MarketWindowEffect | "OPENING" — the window for DFVA is OPENING, not closing | CourseLeaf's analytics expansion validates the market need for curriculum analytics but cannot deliver depth due to API poverty. More universities will now expect analytics — and discover their platform can't provide them. This creates demand for DFVA's complementary analytics layer. The window is opening because the market is being educated by the incumbent. |
| CompetitiveEvent eventType | "PRODUCT_UPDATE" (new event type, not in existing enum) | Existing types: ACQUISITION (feat-013), PRODUCT_LAUNCH (feat-017). CourseLeaf's move is a product page update listing features, not a launch event with press and pricing. Using a distinct event type distinguishes the signal's nature: trend indicator, not product launch. The Prisma field is a String (not enum) so adding a new value requires no schema migration. |
| MarketValidationSignal category | "market_convergence" (new category) | Distinct from "competitor_move" (feat-017) — these signals document the market converging toward analytics, not a specific competitive threat. The category helps filter and sort signals by strategic significance in the UI. |
| Framing: complementary vs competitive | **Complementary.** CourseLeaf is positioned as an ecosystem partner, not a competitor. | DFVA sits in the analytics layer; CourseLeaf sits in the workflow layer. They're complementary by architecture. Attacking CourseLeaf would be strategically wrong — many DFVA prospects use CourseLeaf and don't want to hear that their curriculum platform is inadequate. Instead, frame DFVA as making CourseLeaf data MORE valuable. |
| CourseLeaf in apiCompetitiveData.ts | **Add CourseLeaf** as a new entry in the COMPETITORS array. | CourseLeaf has been absent from the competitive data infrastructure despite being the market share leader. Adding them now (with accurate, cited API quality data) serves both this feature and future CourseLeaf-related positioning. |
| New Insights card variant vs reusing CompetitiveThreatCard | **New variant:** `MarketConvergenceCard` — a data-driven card that accepts a `CompetitiveEvent` but renders with opportunity (green/blue) styling instead of threat (red/amber) styling. | The `CompetitiveThreatCard` from feat-017 is designed for threats — red badges, "What this means for DFVA" defensive framing, `AlertTriangle` icon. CourseLeaf's analytics expansion is an opportunity signal, not a threat. A new card variant (or a `variant` prop on CompetitiveThreatCard) is cleaner than shoehorning positive signals into threat-styled components. Decision: add a `variant` prop to `CompetitiveThreatCard` with `"threat"` (default) and `"opportunity"` options, rather than a separate component — same data shape, different presentation. |
| Landing page section focus | **"Works with your curriculum system"** — ecosystem framing, not CourseLeaf-specific. | The landing page should position DFVA as the analytics layer that works with any platform (CourseLeaf, Coursedog, CourseLoop). Naming CourseLeaf specifically on the landing page would be inconsistent with feat-017's decision to use generic "integrated platform" framing. Save CourseLeaf-specific comparisons for the DevPortal. |
| DevPortal comparison row name | **"Analytics Depth"** (not "Assessment Methodology" — that's feat-017). | "Assessment Methodology" covers the 11-dimension scoring approach vs integrated platform assessment. "Analytics Depth" covers the architectural limitation: structured data model enables deep analytics; HTML-based data model limits analytics to surface-level reporting. Different comparison dimensions. |
| Adding CourseLeaf to CompetitiveLandscape radar | **Yes** — add as third named competitor with `analyticsMaturity: 2` and `marketShare: 5`. | The radar chart currently shows only Coursedog and CourseLoop. CourseLeaf is the market leader (29% share) but has the lowest analytics maturity due to API poverty. Adding them makes the competitive landscape visualization more complete and accurate. |
| Relationship to feat-014 (CourseLeaf Infrastructure Gap) | **Complementary — feat-014 covers the API poverty data; feat-018 covers the analytics expansion response.** | feat-014 (draft, not yet spec'd) focuses on CourseLeaf's API poverty as a market gap play. feat-018 covers CourseLeaf's recent analytics product listing update. They share the same evidence base (third-party tool ecosystem, API limitations) but address different competitive signals. When both are built, the CourseLeaf competitive data should be consistent across both features. |
| Credibility of CourseLeaf's analytics claims | Treat the product page listing as directionally accurate but unverified — no independent testing of CourseLeaf's analytics features. | CourseLeaf listed these features on their product pages. Whether they actually work at the depth universities need is unverified — and the API poverty evidence suggests they cannot. DFVA's positioning should reference the architectural constraint (HTML data model limits depth), not speculate about feature quality. |

### Dependencies

- **Wasp 0.24** — no new routes required. Existing routes: Insights (`/insights`), Landing (`/`), DevPortal Compare (`/developers/compare`).
- **React 19** — extend `CompetitiveThreatCard` with a `variant` prop. Extend `CompetitiveLandscape` radar chart to include CourseLeaf data point.
- **Prisma (PostgreSQL)** — seed data: 1 CompetitiveEvent, 3-4 MarketValidationSignal records, MarketWindowSnapshot update (append to existing, not new snapshot). No schema changes — `eventType` and `category` are String fields.
- **Existing `CompetitiveEvent` model** — reuse with `eventType: "PRODUCT_UPDATE"` (new value), `competitor: "CourseLeaf"` (new competitor), `impactScore: 5`, `marketWindowEffect: "OPENING"`.
- **Existing `MarketValidationSignal` model** — 3-4 new records with `category: "market_convergence"` (new category value).
- **Existing `MarketWindowSnapshot` model** — update the latest snapshot (from feat-017, status: NARROWING) by appending CourseLeaf trend to `keyThreats` and `recommendedActions` arrays. No new snapshot row.
- **Existing `InsightsPage.tsx`** — extend Competitive Landscape section to handle `CompetitiveThreatCard` with `variant="opportunity"` for lower-impactScore events.
- **Existing `LandingPage.tsx`** — new "Platform-Agnostic Analytics" section.
- **Existing `DevPortalComparePage.tsx`** — new "Analytics Depth" comparison row.
- **Existing `apiCompetitiveData.ts`** — add CourseLeaf entry to `COMPETITORS` array.
- **Existing `CompetitiveLandscape.tsx`** — add CourseLeaf data point to radar chart.
- **Lucide React** (already in project) — icons: `TrendingUp` (market convergence), `Layers` (complementary analytics), `BarChart3` (analytics depth).
- **Tailwind CSS** — styling only; no new CSS dependencies.
- **No external APIs** — all content is static/seed data based on research-loop findings.
- **No new NPM packages** — all UI built with existing stack.
- **CourseLeaf product pages** (external reference) — source URLs for attribution in CompetitiveEvent and MarketValidationSignal records.
- **Third-party CourseLeaf tool ecosystem** (external references) — evidence for API poverty claims: University of Illinois Azure Function, APInception, cc-coursemap.

## Scope

### In Scope (MVP — "CourseLeaf Analytics Expansion Response v1")

- [ ] **Create 1 `CompetitiveEvent` record** via seed migration: `eventType: "PRODUCT_UPDATE"`, `competitor: "CourseLeaf"`, `title: "CourseLeaf Adds Analytics Features to Product Listing"`, `description` covering the five new features (Micro-Credentials, Career Data Integration, Learning Outcomes Mapping, Course Demand Analytics, Registration Optimization), the market convergence signal, and the API poverty constraint on analytics depth, `impactScore: 5`, `marketWindowEffect: "OPENING"`, `dateOccurred: "2026-07-15"`, `isActive: true`.
- [ ] **Create 3-4 `MarketValidationSignal` records** via seed migration: (1) "CourseLeaf adds Career Data Integration — LMI-in-curriculum becoming table stakes for curriculum platforms", credibilityScore 7, category "market_convergence". (2) "CourseLeaf API poverty confirmed by third-party tool ecosystem — university-built Azure Function, APInception meta-API, cc-coursemap scraper all exist because CourseLeaf provides no structured data export", credibilityScore 8, category "competitor_weakness". (3) "Learning Outcomes Mapping added to CourseLeaf — structured outcomes data becoming a curriculum platform expectation", credibilityScore 6, category "market_convergence". (4) "CourseLeaf Registration Optimization + Course Demand Analytics — operational analytics, not strategic assessment. Confirms the analytics layer above curriculum management is a distinct product category", credibilityScore 7, category "market_convergence".
- [ ] **Update latest `MarketWindowSnapshot`** via seed migration: append CourseLeaf analytics expansion to `keyThreats` JSON array (framed as opportunity signal, not threat), append "Position DFVA as complementary analytics layer for CourseLeaf (and all curriculum platform) campuses — the analytics layer the platforms structurally cannot deliver" to `recommendedActions` array. Do NOT change the `status` (stays NARROWING from feat-017).
- [ ] **Add `variant` prop to `CompetitiveThreatCard`** (`src/client/components/compass/CompetitiveThreatCard.tsx`): new optional prop `variant?: "threat" | "opportunity"`, defaults to `"threat"`. When `variant="opportunity"`: green/teal color palette instead of red/amber, `TrendingUp` icon instead of `AlertTriangle`, "Market Signal" label instead of "Competitive Threat", "Why this matters for DFVA" instead of "What this means for DFVA" with opportunity-framed analysis. ImpactScore badge uses green for ≤5 (low threat / opportunity), amber for 6-7, red for ≥8 regardless of variant.
- [ ] **Add "Market Convergence" card to InsightsPage**: in the Competitive Landscape section (feat-017), render the CourseLeaf event using `CompetitiveThreatCard variant="opportunity"`. Show below the Coursedog Assessment Cloud threat card. Add section subheading: "Market Signals" with `TrendingUp` icon for opportunity-framed events.
- [ ] **Add "Platform-Agnostic Analytics" section to LandingPage**: positioned after the "Independent Assessment Standard" section (feat-017) and before the main CTA. Heading: "Your curriculum data, made analytically powerful." Content: 2-column layout — left: "Works with any curriculum platform" with logos/names of CourseLeaf, Coursedog, CourseLoop (no endorsements, just ecosystem acknowledgment); right: "Why platforms alone can't deliver this depth" explaining the architectural difference (structured assessment model vs HTML-based catalogs). CTA: "See the analytics difference →" linking to `/developers/compare`.
- [ ] **Add "Analytics Depth" row to DevPortalComparePage**: new comparison row positioned between "Assessment Methodology" (feat-017) and "API Quality" (feat-009). Column headers: Feature, DFVA (Evidura), Coursedog, CourseLeaf. DFVA cell: "**Prescriptive 11-dimension durability scoring.** Independent, third-party standard. Structured data model enables programmatic analysis. Platform-agnostic — ingests data from any curriculum system. Assessment exists to inform institutional strategy." Coursedog cell: "**Descriptive analytics** tied to Curriculum Cloud. Course evaluations + demand projections + inferred program maps. Assessment optimizes the platform's scheduling features. HTML-inferred data limits reproducibility." CourseLeaf cell: "**Descriptive reporting** on HTML-based catalog data. Analytics features listed July 2026 (Career Data, Course Demand, Learning Outcomes). No structured data export — confirmed by third-party tool ecosystem (Azure Function, APInception, cc-coursemap). API-poor architecture limits depth of analysis."
- [ ] **Add CourseLeaf to `apiCompetitiveData.ts`**: new entry in `COMPETITORS` array with `name: "CourseLeaf"`, `docsAccuracy: "none"`, `authComplexity: "none"`, `responseConsistency: "unknown"`, `sdkLanguages: []`, `hasPlayground: false`, `hasStatusPage: false`, `painPoints: ["No public API — HTML-based data model only", "No structured data export — confirmed by 3+ open-source projects building custom scrapers", "University of Illinois built Azure Function just to load CourseLeaf data", "APInception meta-API wrapper exists because native API is insufficient", "cc-coursemap scraper required for program/catalog data extraction"]`, `sourceUrls: ["https://github.com/unimelb-mdap/cc-coursemap", "https://github.com/search?q=courseleaf+scraper"]`.
- [ ] **Add CourseLeaf to `CompetitiveLandscape` radar chart** (`src/client/components/compass/CompetitiveLandscape.tsx`): add data point `{ name: "CourseLeaf", analyticsMaturity: 2, marketShare: 5, fill: "#10b981" }`. CourseLeaf gets the lowest analytics maturity score (2) despite the highest market share (5) because of the API poverty constraint — this creates a visually striking gap on the radar that tells the story without words.
- [ ] **Seed migration script** at `compass/app/src/compass/seedCourseLeafAnalyticsResponse.ts` consolidating all data operations: CompetitiveEvent insert, MarketValidationSignal inserts, MarketWindowSnapshot update. Use `create` for CompetitiveEvent and MarketValidationSignal; use findFirst + update for MarketWindowSnapshot.
- [ ] **Run seed** against local dev database and verify records via Prisma queries: CompetitiveEvent where competitor = "CourseLeaf", MarketValidationSignal where category = "market_convergence", MarketWindowSnapshot where keyThreats contains "CourseLeaf".
- [ ] **Regression test**: existing Insights page, Landing page, DevPortal Compare all render correctly with new sections added. Existing CompetitiveThreatCard instances (Coursedog Assessment Cloud) still render with threat styling. Existing CompetitiveLandscape radar chart still renders Coursedog and CourseLoop correctly alongside new CourseLeaf point.
- [ ] **Commit** with conventional commits message.

### Out of Scope (Future)

- Automated CourseLeaf product monitoring (manual research-loop monitoring is the current process)
- Direct CourseLeaf API integration (DFVA does not currently ingest data from curriculum platforms — assessments use handbook URLs; platform-native integration is a separate feature)
- CourseLeaf partnership or official integration — this feature positions DFVA as complementary; actual technical integration or commercial partnership is a business development activity, not a product feature
- Detailed CourseLeaf feature-by-feature comparison page (the DevPortal comparison row is sufficient for MVP; a dedicated CourseLeaf comparison page is future content)
- Historical CourseLeaf competitive timeline (a timeline of CourseLeaf's product evolution is separate content work)
- PDF export of "DFVA + CourseLeaf" complementary positioning for sales enablement (nice-to-have; static sales collateral is separate)
- Customer case studies or testimonials from CourseLeaf-using institutions (requires customer development — future feature)
- Benchmarking DFVA assessment scores against CourseLeaf's internal analytics for the same programs (requires CourseLeaf API access — not currently available)
- "Schedule a demo with your CourseLeaf data" CTA (requires data ingestion pipeline for CourseLeaf exports — separate feature)

## Acceptance Criteria

- [ ] A `CompetitiveEvent` record exists with `competitor: "CourseLeaf"`, `eventType: "PRODUCT_UPDATE"`, `impactScore: 5`, `marketWindowEffect: "OPENING"`, and `isActive: true`. The `description` field references the five analytics features (Micro-Credentials, Career Data Integration, Learning Outcomes Mapping, Course Demand Analytics, Registration Optimization) and explains the API poverty constraint on analytics depth.
- [ ] Three or four `MarketValidationSignal` records exist: at least one with `category: "market_convergence"` documenting the LMI-in-curriculum trend, at least one with `category: "competitor_weakness"` documenting the API poverty evidence (citing the third-party tool ecosystem), and at least one documenting the Learning Outcomes Mapping feature.
- [ ] The latest `MarketWindowSnapshot` still has `status: "NARROWING"` (unchanged from feat-017) but its `keyThreats` JSON array now includes an entry about CourseLeaf's analytics expansion and its `recommendedActions` JSON array includes "Position DFVA as complementary analytics layer for CourseLeaf campuses."
- [ ] `CompetitiveThreatCard` accepts a `variant` prop. When `variant="opportunity"`: renders with green/teal color palette, `TrendingUp` icon, "Market Signal" label. When `variant="threat"` (default): renders unchanged from feat-017 behavior (red/amber, `AlertTriangle`, "Competitive Threat").
- [ ] Insights page (`/insights`) Competitive Landscape section renders the CourseLeaf `CompetitiveEvent` with `variant="opportunity"` styling below the Coursedog Assessment Cloud threat card. The section has a "Market Signals" subheading with `TrendingUp` icon.
- [ ] Landing page (`/`) shows a new "Your curriculum data, made analytically powerful" section between the "Independent Assessment Standard" section (feat-017) and the main CTA. The section includes a 2-column layout: left column lists curriculum platforms DFVA works with (CourseLeaf, Coursedog, CourseLoop — no endorsements, ecosystem acknowledgment only) and right column explains the architectural difference between structured assessment and HTML-based catalogs. CTA links to `/developers/compare`.
- [ ] DevPortal Compare page (`/developers/compare`) shows an "Analytics Depth" row with three columns (DFVA, Coursedog, CourseLeaf). DFVA's cell describes prescriptive 11-dimension scoring and platform-agnostic architecture. Coursedog's cell describes descriptive analytics tied to Curriculum Cloud. CourseLeaf's cell describes descriptive reporting on HTML data and references the API poverty evidence (Azure Function, APInception, cc-coursemap).
- [ ] `apiCompetitiveData.ts` `COMPETITORS` array includes a CourseLeaf entry with `docsAccuracy: "none"`, `authComplexity: "none"`, and `painPoints` referencing the third-party tool ecosystem. The entry's `sourceUrls` array includes at least one verifiable source URL.
- [ ] `CompetitiveLandscape` radar chart renders a CourseLeaf data point with `analyticsMaturity: 2` and `marketShare: 5`, visually positioned as the highest-market-share but lowest-analytics-maturity competitor.
- [ ] Landing page "Platform-Agnostic Analytics" section never claims DFVA is "partnered with" or "endorsed by" CourseLeaf — it uses neutral ecosystem acknowledgment language ("works with," "compatible with," "ingests data from").
- [ ] All new sections and components render correctly on mobile viewport (768px): CompetitiveThreatCard opportunity variant stacks vertically, Landing Page 2-column becomes 1-column, DevPortal comparison row doesn't overflow.
- [ ] Existing Insights page functionality is not regressed: CompetitiveThreatCard threat variant (Coursedog Assessment Cloud) still renders correctly, Market Validation section (feat-016) works as before, faculty cards and Portfolio Health CTA are unaffected.
- [ ] Seed migration is idempotent — running it twice does not create duplicate records. The CompetitiveEvent uses Prisma `create` with a uniqueness check; MarketValidationSignal records use `create`; MarketWindowSnapshot uses an upsert pattern (findLatest → update or create).
- [ ] The "Analytics Depth" comparison text for CourseLeaf is factual and cites verifiable sources — no speculation about CourseLeaf's intentions or product quality. Claims about API poverty are backed by references to the open-source tool ecosystem.

## Open Questions

- [ ] **Should CourseLeaf's analytics features be treated as a signal of market convergence or a competitive move?** The framing decision (market convergence = opportunity, not threat) is made in this spec, but it deserves validation with real customer conversations. If CourseLeaf-using universities perceive DFVA as competitive rather than complementary, the framing may need adjustment. Decision for now: market convergence. Revisit after 3+ customer conversations with CourseLeaf-using institutions.
- [ ] **How prominently should CourseLeaf appear on the landing page vs the DevPortal?** The landing page serves prospects evaluating the category; the DevPortal serves technical evaluators. Decision: landing page uses generic ecosystem framing ("works with any curriculum platform") with logos as visual acknowledgment. DevPortal has the detailed, named comparison. This keeps the landing page strategically broad and the DevPortal technically specific.
- [ ] **Should the MarketWindowSnapshot status change?** feat-017 set status to NARROWING because of Coursedog's Assessment Cloud encroachment. CourseLeaf's analytics expansion is a market validation signal, not a threat — it actually strengthens DFVA's position by educating the market. Decision: keep status at NARROWING (from feat-017) — the net window effect is still narrowing due to Coursedog, but CourseLeaf's move is recorded as an opportunity signal in the snapshot data, not a status change.
- [ ] **Does CourseLeaf's Career Data Integration feature suggest they're building LMI comparable to DFVA?** The feature listing says "Career Data Integration" — likely pulling Lightcast or EMSI data into the CourseLeaf interface, not building an independent assessment methodology. DFVA's LMI integration is methodology-driven (scoring dimensions weighted by labour market signals), not just data display. Decision: treat CourseLeaf's Career Data as descriptive display, DFVA's as prescriptive scoring. Document the distinction in the "Analytics Depth" comparison row.
- [ ] **Should the CompetitiveThreatCard `variant` prop be extended to support additional variants in future?** The spec adds `"opportunity"` but future competitor moves might need `"neutral"`, `"partnership"`, or `"acquisition"` variants. Decision: use a string union type (`"threat" | "opportunity"`) for now — easy to extend. Don't over-engineer with a full variant system until at least 3 distinct variants are needed.
- [ ] **How should the CourseLeaf `CompetitorApiData` pain points be kept current?** The API poverty evidence (Azure Function, APInception, cc-coursemap) is based on open-source projects that may become inactive. Decision: include source URLs and dates in the competitive data; review quarterly as part of the research-loop competitive intelligence refresh. The data is static in code for MVP; a future feature could make it database-driven.
- [ ] **Tone of the "Platform-Agnostic Analytics" section:** Should it emphasize "we work WITH your existing tools" (collaborative) or "your existing tools can't do this" (gap-focused)? Decision: collaborative. "Your curriculum data, made analytically powerful" — this frames DFVA as an enhancement, not a replacement. University decision-makers who've invested millions in curriculum platforms don't want to hear that their investment was incomplete. They want to hear that DFVA makes that investment more valuable.

## Implementation Tasks

### Phase 1 — Data Layer (estimated 0.5 days)

1. **Create seed data file** at `compass/app/src/compass/seedCourseLeafAnalyticsResponse.ts`:

   ```typescript
   import type { PrismaClient } from "@prisma/client";

   export async function seedCourseLeafAnalyticsResponse(prisma: PrismaClient) {
     // 1. CompetitiveEvent for CourseLeaf analytics expansion
     await prisma.competitiveEvent.create({
       data: {
         competitor: "CourseLeaf",
         eventType: "PRODUCT_UPDATE",
         title: "CourseLeaf Adds Analytics Features to Product Listing",
         description: "CourseLeaf — the largest curriculum management platform (29% market share) — has expanded its product listings to include Micro-Credentials, Career Data Integration, Learning Outcomes Mapping, Course Demand Analytics, and Registration Optimization. This validates the market trend toward data-centric curriculum management but exposes CourseLeaf's structural limitation: HTML-based data model and confirmed API poverty (third-party tool ecosystem: Azure Function, APInception, cc-coursemap) mean CourseLeaf's analytics can only operate on surface-level catalog data. DFVA's structured, schema-first, platform-agnostic assessment provides the analytics depth that CourseLeaf's architecture cannot deliver. This is a market convergence signal — not a competitive threat — and opens opportunity for DFVA as the complementary analytics layer for CourseLeaf campuses.",
         source: "CourseLeaf product pages + research-loop monitoring",
         url: "https://www.courseleaf.com/products/",
         dateOccurred: new Date("2026-07-15"),
         dateDiscovered: new Date("2026-07-16"),
         impactScore: 5,
         marketWindowEffect: "OPENING",
         isActive: true,
       },
     });

     // 2. MarketValidationSignal records

     // Signal 1: Career Data Integration — LMI becoming table stakes
     await prisma.marketValidationSignal.create({
       data: {
         source: "CourseLeaf Product Pages (research-loop monitoring)",
         excerpt: "CourseLeaf has added Career Data Integration to its product listings (July 2026). This signals that labour market information (LMI) integration is becoming a table-stakes feature for curriculum management platforms — validating DFVA's thesis that LMI-driven assessment is essential for program review. CourseLeaf's implementation is likely descriptive data display (pulling Lightcast/EMSI feeds into the catalog interface), not prescriptive scoring methodology.",
         url: "https://www.courseleaf.com/products/",
         dateDiscovered: new Date("2026-07-16"),
         credibilityScore: 7,
         category: "market_convergence",
         relevantClaim: "LMI-in-curriculum becoming table stakes for curriculum platforms. DFVA's prescriptive LMI-weighted scoring methodology provides deeper, more actionable insights than descriptive data display alone.",
         isActive: true,
       },
     });

     // Signal 2: API poverty confirmed by third-party tools
     await prisma.marketValidationSignal.create({
       data: {
         source: "Open-source ecosystem analysis (research-loop GitHub intelligence)",
         excerpt: "CourseLeaf's API poverty is confirmed by three independent open-source projects: (1) University of Illinois built an Azure Function specifically to load CourseLeaf data because no native export exists; (2) APInception is a meta-API wrapper built because CourseLeaf's native API is insufficient for programmatic access; (3) cc-coursemap includes a dedicated CourseLeaf scraper for program/catalog data extraction. This tool ecosystem exists because CourseLeaf stores degree requirements as unstructured HTML blocks — not structured, queryable records. Any analytics CourseLeaf builds will be constrained by this architectural limitation.",
         url: "https://github.com/unimelb-mdap/cc-coursemap",
         dateDiscovered: new Date("2026-07-16"),
         credibilityScore: 8,
         category: "competitor_weakness",
         relevantClaim: "CourseLeaf's HTML-based data architecture limits analytics depth. DFVA's structured, schema-first data model enables programmatic analysis that CourseLeaf cannot deliver regardless of feature listings. The third-party tool ecosystem is direct evidence of the extraction pain institutions face.",
         isActive: true,
       },
     });

     // Signal 3: Learning Outcomes Mapping
     await prisma.marketValidationSignal.create({
       data: {
         source: "CourseLeaf Product Pages (research-loop monitoring)",
         excerpt: "CourseLeaf now lists Learning Outcomes Mapping among its product features. Structured learning outcomes data is becoming a curriculum platform expectation — institutions increasingly need to map outcomes to courses, programs, and assessment criteria. This aligns with DFVA's Learning Outcomes dimension (one of 11 scoring dimensions) and validates the market need for outcomes-aware assessment.",
         url: "https://www.courseleaf.com/products/",
         dateDiscovered: new Date("2026-07-16"),
         credibilityScore: 6,
         category: "market_convergence",
         relevantClaim: "Learning outcomes mapping is becoming a standard curriculum platform feature. DFVA's assessment methodology already incorporates learning outcomes as a scoring dimension — the market is converging toward DFVA's existing capability set.",
         isActive: true,
       },
     });

     // Signal 4: Operational vs strategic analytics distinction
     await prisma.marketValidationSignal.create({
       data: {
         source: "CourseLeaf Product Pages (research-loop monitoring)",
         excerpt: "CourseLeaf's Registration Optimization and Course Demand Analytics features focus on operational metrics: how many students are enrolling, which sections are filling. These are descriptive operational analytics — useful for scheduling, not for strategic program review. DFVA's assessment methodology is prescriptive: what SHOULD exist in a durable degree, not just what IS happening in current enrollments. This distinction — operational reporting vs strategic assessment — defines the gap between platform-native analytics and DFVA's independent standard.",
         url: "https://www.courseleaf.com/products/",
         dateDiscovered: new Date("2026-07-16"),
         credibilityScore: 7,
         category: "market_convergence",
         relevantClaim: "CourseLeaf's analytics features are operational (descriptive enrollment/scheduling data), not strategic (prescriptive program durability assessment). This confirms that the strategic analytics layer above curriculum management platforms is a distinct product category — exactly DFVA's position.",
         isActive: true,
       },
     });

     // 3. Update MarketWindowSnapshot (append to latest, don't change status)
     const latest = await prisma.marketWindowSnapshot.findFirst({
       orderBy: { createdAt: "desc" },
     });

     if (latest) {
       const keyThreats = (latest.keyThreats as string[]) || [];
       const recommendedActions = (latest.recommendedActions as string[]) || [];

       await prisma.marketWindowSnapshot.update({
         where: { id: latest.id },
         data: {
           keyThreats: [
             ...keyThreats,
             "OPPORTUNITY: CourseLeaf (29% market share) adds analytics features — validates market convergence toward data-centric curriculum management but exposes API poverty constraint. Creates demand for DFVA as complementary analytics layer.",
           ],
           recommendedActions: [
             ...recommendedActions,
             "Position DFVA as the complementary analytics layer for CourseLeaf campuses — the strategic assessment depth their platform structurally cannot deliver. Frame as 'making your CourseLeaf data analytically powerful,' not 'replacing CourseLeaf.'",
           ],
         },
       });
     } else {
       // First snapshot (unlikely — feat-017 should have created one — but handle gracefully)
       await prisma.marketWindowSnapshot.create({
         data: {
           status: "NARROWING",
           urgencyText: "CourseLeaf's analytics expansion validates the market trend but exposes the infrastructure gap. DFVA should position as the complementary analytics layer for all curriculum platforms.",
           keyThreats: [
             "Coursedog Assessment Cloud — third product pillar directly competing in assessment",
             "OPPORTUNITY: CourseLeaf analytics expansion — validates market, exposes API poverty",
           ],
           recommendedActions: [
             "Ship counter-positioning against Coursedog Assessment Cloud",
             "Position DFVA as complementary analytics layer for CourseLeaf campuses",
           ],
         },
       });
     }
   }
   ```

2. **Register seed** in the existing seed infrastructure. The Wasp seed system (`db.seeds` in `main.wasp.ts`) currently only runs `seedMockUsers`. Add `seedCourseLeafAnalyticsResponse` to the seeds array or invoke it standalone. Since this is a one-time data operation (not mock data), consider calling it directly in the seed script:

   ```typescript
   // In dbSeeds.ts or a standalone invocation
   import { seedCourseLeafAnalyticsResponse } from "./seedCourseLeafAnalyticsResponse";
   // Called after seedMockUsers during development setup
   ```

3. **Run seed** against local dev database and verify:

   ```bash
   cd compass/app
   DATABASE_URL=postgresql://postgresWaspDevUser:postgresWaspDevPass@localhost:5432/OpenSaaS-fc3b171ec3 \
     npx tsx src/compass/seedCourseLeafAnalyticsResponse.ts
   ```

4. **Verify records** with Prisma queries:
   - `CompetitiveEvent` where `competitor = "CourseLeaf"` — should return 1 record with `impactScore = 5`
   - `MarketValidationSignal` where `category = "market_convergence"` — should return 3 records
   - `MarketValidationSignal` where `category = "competitor_weakness"` — should return 1 record about API poverty
   - `MarketWindowSnapshot` latest record — `keyThreats` should include CourseLeaf entry, `status` should still be `"NARROWING"`

### Phase 2 — UI Infrastructure (estimated 1 day)

5. **Add `variant` prop to `CompetitiveThreatCard`** at `src/client/components/compass/CompetitiveThreatCard.tsx`:

   ```typescript
   interface CompetitiveThreatCardProps {
     event: CompetitiveEvent;
     variant?: "threat" | "opportunity";
   }

   // Implementation pattern:
   // - variant defaults to "threat"
   // - Conditional styling based on variant:
   //   - threat: red (impactScore >= 8), amber (5-7), green (<5). AlertTriangle icon. "Competitive Threat" label.
   //   - opportunity: green/teal (all scores). TrendingUp icon. "Market Signal" label.
   // - ImpactScore badge color logic is shared across variants
   // - "Why this matters" text is extracted from CompetitiveEvent.description or a dedicated analysis field
   ```

   The threat-level color coding remains based on `impactScore` regardless of variant:
   - ≥8: red (`text-red-600 bg-red-50 border-red-200`)
   - 5-7: amber (`text-amber-600 bg-amber-50 border-amber-200`)
   - <5: green (`text-emerald-600 bg-emerald-50 border-emerald-200`)

   For `variant="opportunity"`, the card header uses teal tones and `TrendingUp` icon but the impactScore badge keeps its color coding. The collapsible section heading changes from "What this means for DFVA" to "Why this matters for DFVA" with opportunity-framed analysis text.

6. **Add CourseLeaf to `apiCompetitiveData.ts`** — insert after the CourseLoop entry in the `COMPETITORS` array:

   ```typescript
   {
     name: "CourseLeaf",
     docsAccuracy: "none",
     authComplexity: "none",
     responseConsistency: "unknown",
     sdkLanguages: [],
     hasPlayground: false,
     hasStatusPage: false,
     painPoints: [
       "No public API — data model is HTML-based, not structured",
       "No structured data export — confirmed by 3+ open-source projects",
       "University of Illinois built Azure Function for basic data loading",
       "APInception meta-API wrapper exists because native API insufficient",
       "cc-coursemap scraper required for program/catalog data extraction",
     ],
     sourceUrls: [
       "https://github.com/unimelb-mdap/cc-coursemap",
       "https://github.com/search?q=courseleaf+api",
     ],
   },
   ```

   This entry makes CourseLeaf available in the DevPortal comparison table's API Quality row automatically — the existing `DevPortalComparePage` iterates over `COMPETITORS` and renders each.

7. **Add CourseLeaf to `CompetitiveLandscape` radar chart** at `src/client/components/compass/CompetitiveLandscape.tsx`:

   Update the chart data configuration to include CourseLeaf as a third named competitor. The existing chart likely uses a static array or a data prop. Add:

   ```typescript
   { name: "CourseLeaf", analyticsMaturity: 2, marketShare: 5, fill: "#10b981" }
   ```

   CourseLeaf's `analyticsMaturity: 2` reflects confirmed API poverty (lowest of all competitors — Coursedog would be higher due to Assessment Cloud, CourseLoop would be mid-range). `marketShare: 5` reflects the 29% market share leadership. The green fill (`#10b981`) visually distinguishes it as the "ecosystem player" rather than a direct competitor.

### Phase 3 — Page Integration (estimated 1.5 days)

8. **Update `InsightsPage.tsx`** — add Market Convergence card to Competitive Landscape section:

   - In the Competitive Landscape section (added by feat-017), after the Coursedog Assessment Cloud threat card, add a sub-section: `"Market Signals"` heading with `TrendingUp` icon
   - Query `getCompetitiveEvents` (already queried by the section) — filter for events with `impactScore < 6` to identify opportunity/market-convergence signals (vs threats with impactScore ≥ 6)
   - Render each qualifying event using `CompetitiveThreatCard variant="opportunity"`
   - The CourseLeaf event (impactScore 5) will render with green/teal opportunity styling
   - If no low-impact events exist, show empty state: "Monitoring market signals..." with a subtle pulse animation

   The filtering heuristic (`impactScore < 6 = opportunity/convergence, ≥6 = threat`) is simple but effective for MVP. A future iteration could use `eventType` or a dedicated `signalCategory` field for more precise classification.

9. **Update `LandingPage.tsx`** — add "Platform-Agnostic Analytics" section:

   Position after the "Independent Assessment Standard" section (feat-017) and before the main CTA. Structure:

   ```tsx
   <section className="py-20 bg-white">
     <div className="container mx-auto px-4">
       <div className="text-center mb-12">
         <Layers className="w-12 h-12 text-teal-600 mx-auto mb-4" />
         <h2 className="text-3xl font-bold text-gray-900 mb-4">
           Your curriculum data, made analytically powerful
         </h2>
         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
           DFVA works with any curriculum management platform — CourseLeaf,
           Coursedog, CourseLoop, and more. We don't replace your curriculum
           system; we make its data strategically valuable.
         </p>
       </div>

       <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
         {/* Left: Works with any platform */}
         <div>
           <h3 className="text-xl font-semibold text-gray-900 mb-4">
             Works with your existing tools
           </h3>
           {/* Platform logos/names — visual acknowledgment, no endorsement */}
           <div className="flex flex-wrap gap-3 mb-6">
             {["CourseLeaf", "Coursedog", "CourseLoop", "Modern Campus"].map(
               (platform) => (
                 <span key={platform}
                   className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                   {platform}
                 </span>
               )
             )}
           </div>
           <p className="text-gray-600">
             Ingest handbook URLs, program data, or structured exports from any
             curriculum system. DFVA's assessment methodology is platform-agnostic
             — the 11-dimension scoring works regardless of where your curriculum
             data lives.
           </p>
         </div>

         {/* Right: Why platforms alone can't deliver this */}
         <div>
           <h3 className="text-xl font-semibold text-gray-900 mb-4">
             Why platforms alone can't deliver this depth
           </h3>
           <ul className="space-y-3 text-gray-600">
             <li className="flex gap-2">
               <BarChart3 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
               <span>Curriculum platforms store degree requirements as HTML blocks
               — not structured, queryable data. Deep analysis requires a
               structured data model.</span>
             </li>
             <li className="flex gap-2">
               <BarChart3 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
               <span>Platform analytics are descriptive — they tell you what IS
               happening. DFVA is prescriptive — it tells you what SHOULD exist
               in a durable degree.</span>
             </li>
             <li className="flex gap-2">
               <BarChart3 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
               <span>Platform-locked assessment optimizes the platform's workflow.
               Independent assessment informs the institution's strategy — unbiased
               by any vendor's product roadmap.</span>
             </li>
           </ul>
         </div>
       </div>

       <div className="text-center mt-10">
         <a href="/developers/compare"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600
                       text-white rounded-lg hover:bg-teal-700 transition-colors
                       font-medium">
           See the analytics difference
           <ArrowRight className="w-4 h-4" />
         </a>
       </div>
     </div>
   </section>
   ```

   Key design decisions for this section:
   - Platform names in neutral gray pills — visual acknowledgment, not endorsement
   - "Works with" language, never "partnered with"
   - The right column explains the architectural gap without naming any platform as inadequate
   - CTA uses "See the analytics difference" — invites comparison without competitive aggression
   - `Layers` icon conveys the "sitting above" complementary architecture

10. **Update `DevPortalComparePage.tsx`** — add "Analytics Depth" comparison row:

    Position between the "Assessment Methodology" row (feat-017) and the "API Quality" row (feat-009). Add to the existing comparison table:

    ```tsx
    // Comparison row data
    const analyticsDepthRow = {
      feature: "Analytics Depth",
      icon: BarChart3,
      dfva: {
        text: "Prescriptive 11-dimension durability scoring. Independent, third-party standard. Structured data model enables programmatic, reproducible analysis. Platform-agnostic — ingests data from any curriculum system. Assessment exists to inform institutional strategy, not optimize platform operations.",
        strength: "strong",
      },
      coursedog: {
        text: "Descriptive analytics tied to Curriculum Cloud. Course evaluations + demand projections + inferred program maps. Assessment designed to optimize the platform's scheduling and curriculum features. HTML-inferred data limits reproducibility and auditability.",
        strength: "moderate",
      },
      courseleaf: {
        text: "Descriptive reporting on HTML-based catalog data. Analytics features listed July 2026 (Career Data, Course Demand, Learning Outcomes, Registration Optimization). No structured data export — confirmed by third-party tool ecosystem (Azure Function, APInception, cc-coursemap). API-poor architecture limits depth of analysis.",
        strength: "limited",
      },
    };
    ```

    The existing `DevPortalComparePage` likely renders comparison rows from a data structure. Integrate `analyticsDepthRow` into that structure. If the page uses a hardcoded JSX table, add a new `<tr>` block for this row.

### Phase 4 — Polish & Ship (estimated 1 day)

11. **Responsive testing pass** on all new components:
    - `CompetitiveThreatCard` with `variant="opportunity"`: threat badge, description, and collapsible section all readable on mobile (768px breakpoint)
    - `LandingPage` new section: 2-column collapses to 1-column on < 768px, platform pills wrap cleanly
    - `DevPortalComparePage` new row: doesn't overflow horizontal scroll, text is readable in all three columns
    - `InsightsPage` Market Signals section: integrates visually with the existing Competitive Landscape section
    - `CompetitiveLandscape` radar chart: new CourseLeaf data point renders correctly alongside existing Coursedog/CourseLoop points without label overlap

12. **Accessibility pass**: 
    - CompetitiveThreatCard opportunity variant: `aria-label` on icon and badge ("Market signal — impact score: 5 out of 10")
    - Landing page platform pills: `aria-label="Compatible with [Platform Name]"` (not "Partnered with")
    - Collapsible sections: `aria-expanded` on toggle buttons
    - External links: `rel="noopener noreferrer"` on source URLs
    - Comparison table rows: proper `scope` attributes on header cells
    - Color is not the only indicator of threat level — text labels accompany all color-coded badges

13. **Copy review**: all CourseLeaf content must be factual, collaborative in tone, and cite verifiable sources. Key rules:
    - Never speculate about CourseLeaf's intentions or product quality — only what is publicly confirmed (product pages, open-source ecosystem)
    - Never claim DFVA is "partnered with" or "endorsed by" CourseLeaf or any named platform
    - The API poverty claims must reference the third-party tool ecosystem (Azure Function, APInception, cc-coursemap) as evidence
    - "Complementary" and "works with" are the correct framing words; avoid "better than," "replaces," or "competes with"
    - Landing page uses generic ecosystem language; DevPortal uses specific, named comparisons

14. **Commit** with message:
    ```
    feat: CourseLeaf analytics expansion response — complementary analytics layer positioning

    - Seed CompetitiveEvent for CourseLeaf analytics features (impactScore 5, marketWindowEffect OPENING)
    - Add 4 MarketValidationSignal records (3 market_convergence + 1 competitor_weakness)
    - Update MarketWindowSnapshot with CourseLeaf opportunity signal
    - Add variant="opportunity" prop to CompetitiveThreatCard (green/teal styling, TrendingUp icon)
    - Add "Market Signals" section to InsightsPage with opportunity-framed cards
    - Add "Platform-Agnostic Analytics" section to LandingPage (ecosystem framing)
    - Add "Analytics Depth" comparison row to DevPortalComparePage
    - Add CourseLeaf to apiCompetitiveData.ts COMPETITORS array
    - Add CourseLeaf to CompetitiveLandscape radar chart (analyticsMaturity: 2, marketShare: 5)
    ```

15. **Post-merge verification**: 
    - Confirm the CourseLeaf CompetitiveEvent appears in `/insights` via the public `getCompetitiveEvents` query
    - Confirm the MarketWindowSnapshot still shows NARROWING with CourseLeaf entry in keyThreats
    - Confirm the CourseLeaf `CompetitorApiData` entry renders in the `/developers/compare` API Quality row
    - Confirm the new "Analytics Depth" row renders correctly with all three columns
    - Confirm the "Market Signals" card on `/insights` renders with opportunity styling
    - Confirm the "Platform-Agnostic Analytics" landing section renders on `/` with platform pills and CTA
