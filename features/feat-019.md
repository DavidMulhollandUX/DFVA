---
id: feat-019
name: "CourseLeaf G2 Crisis — DFVA as the Missing Analytics Layer for the Market Leader"
status: draft
created: 2026-07-23
project: DFVA
priority: high
score: 9
type: competitor_weakness
source: research-loop reviews
---

# Feature: CourseLeaf G2 Crisis — Complementary Analytics Layer for the Market Leader's Installed Base

## Description

CourseLeaf — the largest curriculum management platform by market share (29%, per LevaData 2025) — holds the worst user satisfaction score of all tracked competitors: **G2 2.4/5 (4 reviews)** and **Gartner Peer Insights 2.5/5 (2 reviews)**. The gap between RFP.wiki's feature score (4.3/5) and actual user satisfaction (G2 2.4/5) is 1.9 points — the widest satisfaction-vs-features gap in the entire curriculum management market. This is not a minor dip; it's a structural crisis of confidence in the market leader.

The implications for DFVA are profound and multi-layered. **First**, every CourseLeaf customer who is dissatisfied with their platform is a potential DFVA prospect — and with 29% market share, that's the largest addressable installed base in the sector. **Second**, the specific complaints that drive CourseLeaf's low scores — weak report generation, limited analytics, data locked in HTML — are exactly the gaps DFVA was built to fill. **Third**, CourseLeaf's G2 crisis validates and amplifies the findings from every prior feature: feat-014 (API poverty), feat-012 (HTML fragility), feat-018 (analytics expansion that can't deliver depth), and feat-020 (universal analytics gap). CourseLeaf is the canonical case study — the market leader whose users are saying, loudly and publicly, "we need analytics this platform can't give us."

This feature builds the **CourseLeaf G2 crisis positioning layer**: a CompetitiveEvent record capturing the satisfaction-gap discovery (impactScore 5 — it's a market signal, not a direct competitive move, but the opportunity is enormous), 4-5 MarketValidationSignal records triangulating the satisfaction data across G2, Gartner, and RFP.wiki, a MarketWindowSnapshot update positioning CourseLeaf's crisis as an accelerant for DFVA's go-to-market, a new "Satisfaction Gap" Insights card showing the feature-vs-satisfaction delta visually, a Landing page section framing DFVA as the analytics layer that CourseLeaf's users are asking for, a DevPortal "User Satisfaction" comparison row, and quantitative evidence cards comparing all tracked competitors on the satisfaction-vs-features axis.

The strategic goal is to make the G2 crisis data impossible to ignore — for DFVA's own positioning, for prospective customers, and for institutional decision-makers weighing the analytics gap against their incumbent platform investment. CourseLeaf's G2 score isn't just a data point; it's a go-to-market wedge.

## Vibe

**Clinical, evidence-driven, devastating in its politeness.** The tone should convey: "We didn't write these reviews. CourseLeaf's own customers did. Here's the data — G2 2.4, Gartner 2.5, RFP.wiki feature score 4.3. The gap between what CourseLeaf claims and what users experience is the widest in the market. DFVA fills exactly the gaps those users are describing." Never attack CourseLeaf directly — let the data speak. The visual treatment should feel like a research brief, not marketing copy: charts, comparison tables, cited sources. Think _The Economist_ data journalism, not competitor bashing. Colors: deep blue/navy for the data presentation (credibility), with teal accents for DFVA's positioning as the solution.

## User Stories

- As a **Deputy Vice-Chancellor (Academic)** at a CourseLeaf-using institution, I want to see independent evidence that CourseLeaf's low user satisfaction scores (G2 2.4/5, Gartner 2.5/5) are not outliers but part of a systemic analytics gap across all curriculum platforms, so that I can justify evaluating DFVA as a complementary analytics investment without waiting for the next CourseLeaf renewal cycle.

- As a **university IT architect** responsible for a CourseLeaf deployment, I want to understand the quantitative gap between CourseLeaf's feature claims (RFP.wiki 4.3/5) and actual user satisfaction (G2 2.4/5) — a 1.9-point delta — so that I can build the internal business case for adding DFVA's independent analytics layer without replacing the existing curriculum management investment.

- As the **DFVA product team**, I want to capture CourseLeaf's G2/Gartner satisfaction data as structured competitive intelligence — CompetitiveEvent, MarketValidationSignal, and MarketWindowSnapshot records — so that the product's competitive positioning is grounded in third-party verified data, not internal opinion, and can be referenced in all sales and marketing conversations.

- As a **prospective university customer** evaluating curriculum analytics solutions, I want to see a visual "Satisfaction Gap" comparison across all tracked competitors (G2 scores, Gartner scores, RFP.wiki feature scores), so that I can immediately understand that the analytics gap is not a CourseLeaf-specific problem but a market-wide structural weakness that DFVA is uniquely positioned to address.

- As a **Program Director** at a CourseLeaf-using institution frustrated with the platform's reporting limitations, I want to see that my dissatisfaction is shared by other CourseLeaf users (2.4/5 average across reviews) and that DFVA provides the specific analytics capabilities — structured data model, prescriptive scoring, platform-agnostic ingestion — that CourseLeaf's HTML-based architecture cannot deliver, validating my instinct that the problem is architectural, not just a lack of features.
HEREDOC

## Technical Design

### Architecture

This feature extends the competitive intelligence infrastructure established across feats 006, 009, 013, 014, 015, 017, and 018 with a new data dimension: **user satisfaction triangulation**. Unlike prior features that responded to competitor product moves, feat-019 captures a market signal derived entirely from third-party user review data — G2, Gartner Peer Insights, and RFP.wiki. No competitor made a move; their customers spoke, and the data reveals a structural gap.

The architecture layers are: **Data Layer** (CompetitiveEvent + MarketValidationSignal records triangulating G2/Gartner/RFP.wiki data, MarketWindowSnapshot update), **Presentation Layer** (Insights "Satisfaction Gap" card, Landing page "What Users Are Saying" section, DevPortal "User Satisfaction" comparison row, a new multi-competitor satisfaction comparison visualization), and **Data Infrastructure Layer** (a new `COMPETITOR_SATISFACTION_DATA` constant in `apiCompetitiveData.ts` aggregating review scores across all tracked competitors).

Key architectural decisions:

1. **No new Prisma models.** The existing CompetitiveEvent, MarketValidationSignal, and MarketWindowSnapshot models are sufficient. Satisfaction data is stored in seed records (for queryable, joinable competitive intelligence) and in a static TypeScript constant (for the comparison visualization). This mirrors the dual approach of feat-017 (CompetitiveEvent for records, PRODUCT_PILLAR_DATA for comparison).

2. **CourseLeaf is the narrative anchor, but the comparison is market-wide.** The feature's title and primary CompetitiveEvent focus on CourseLeaf's G2 crisis, but the comparison visualization and DevPortal row cover all tracked competitors — placing CourseLeaf's low scores in the context of a universal analytics gap (consistent with feat-020).

3. **The RFP.wiki satisfaction-vs-features gap metric (1.9 points for CourseLeaf) is introduced as a new quantitative competitive signal.** Prior features tracked impactScore and marketWindowEffect; this feature introduces a measurable satisfaction-vs-features delta that can be tracked over time across all competitors.

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│             COURSELEAF G2/REVIEW CRISIS (July 2026)                          │
│                                                                              │
│  G2 Reviews: 2.4 / 5 (4 reviews)                                             │
│  Gartner Peer Insights: 2.5 / 5 (2 reviews)                                  │
│  RFP.wiki Feature Score: 43. /5                                              │
│  RFP.wiki Review Site Average: 2.5                                           │
│  →Satisfaction-v-Features Gap: 1.9 points (widest in market)                │
│  →Maret Share: 2% (largest installed base)                                   │
│  →Iplication: largest addressable market for DFVA's analytics layer          │
└───────────────────────────────────┬────────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────────┐
│              DFA COMPLEMENTARY ANALYTICS POSITIONING                          │
│                                                                              │
│  CORE NARRATIVE:                                                             │
│  "CourseLeaf's own users rate it 2.4/5. The gap between what CourseLeaf     │
│   claims (RFP.wiki 4.3) and what users experience (2.4) is the widest      │
│   in the market. DFVA fills exactly the analytics gap those users           │
│   are describing — without replacing CourseLeaf."                            │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────────┐  │
│  │ DATA LAYER                                                              │  │
│  │                                                                      │  │
│  │ CompetitiveEvent record (Prisma):                                     │  │
│  │ • eventType: "MARKET_INTELLIGENCE" (new event type)                   │  │
│  │ • competitor: "CourseLeaf"                                           │  │
│  │ • title: "CourseLeaf Holds Lowest User Satifaction of All Curriculum  │  │
│  │   Platforms — G2 2.4/5, Gartner 2.5/5"                                │  │
│  │ • impactScore: 5, marketWindowEffect: "OPERING"                      │  │
│  │ • description includes the 1.9-poinsatisfaction gap                  │  │
│  │                                                                      │  │
│  │ MarketValidationSignal records (4-):                                   │  │
│  │ • Signal 1: "CourseLeaf G2 2.4/5 —lowest user satifaction score      │  │
│  │   of all tracked curriculum platforms" (credibilityScore 9,            │  │
│  │   category: "user_satiffaction")                                       │  │
│  │ • Signal 2: "CourseLeaf Gartner 2.5/—consistent across platforms"     │  │
│  │   (credibilityScore 9, category: "user_satiffaction")                  │  │
│  │ • Signal 3: "CourseLeaf RFP.wiki 4./5 feaure score vs 2.5 review     │  │
│  │   average —1.9-point satisfaction gap is the widest in market"         │  │
│  │   (credibilityScore 8, category: "competitor_weakness")               │  │
│  │ • Signal 4: "CourseLeaf 29%arket share ×2.4 satifaction = largest    │  │
│  │   addressable market for complementary analytics" (credibilityScore 7, │  │
│  │   category: "market_gap")                                             │  │
│  │ • Signal 5: "Gartner reviews confirm weak report generation —         │  │
│  │   explicitly cited as a CourseLeaf liiation" (credibilityScore 8,     │  │
│  │   category: "analytics_gap")                                          │  │
│  │                                                                      │  │
│  │ MarketWindowSnapshot update:                                            │  │
│  │ • Staus stays "NARROWING" (from feat-017)                             │  │
│  │ • Append to keyThreats: "OPPORTUNITY: CourseLeaf's 2.4 G2core —      │  │
│  │   largest installed base has lowest satifaction, creating demand      │  │
│  │   for complementary analytics"                                         │  │
│  │ • Append to recommendedActions: "Target CourseLeaf campuses with      │  │
│  │   'analytics layer for your existing platform' mesaging"              │  │
└──────────────────────────────────────────────────────────────────────────────┘
```

HEREDOC

│  ┌──────────────────────────────────────────────────────────────────────┐
│  │  PRESENTATION LAYER                                                  │
│  │                                                                     │
│  │  ┌───────────────────────────┐  ┌──────────────────────────────────┐│
│  │  │ InsightsPage.tsx           │  │ LandingPage.tsx                  ││
│  │  │ • New "User Satisfaction"  │  │ • "What users are saying" section││
│  │  │   card in Competitive       │  │ • CourseLeaf G2 score as lead data││
│  │  │   Landscape section        │  │   point, contextualized within   ││
│  │  │ • Satisfaction-vs-features │  │   universal analytics gap        ││
│  │  │   gap visualization        │  │ • "Your platform's users deserve ││
│  │  │ • Multi-competitor         │  │   better analytics" framing      ││
│  │  │   comparison bar chart     │  │ • Links to /developers/compare   ││
│  │  │ • Pulls from new static    │  │   for the satisfaction data      ││
│  │  │   COMPETITOR_SATISFACTION  │  │                                  ││
│  │  │   _DATA constant           │  │                                  ││
│  │  └───────────────────────────┘  └──────────────────────────────────┘│
│  │                                                                     │
│  │  ┌───────────────────────────┐  ┌──────────────────────────────────┐│
│  │  │ DevPortalComparePage.tsx   │  │ apiCompetitiveData.ts             ││
│  │  │ • New "User Satisfaction"  │  │ • New COMPETITOR_SATISFACTION     ││
│  │  │   comparison row           │  │   _DATA constant                  ││
│  │  │ • Columns: DFVA, CourseLeaf│  │ • Aggregates G2, Gartner, RFP.wiki││
│  │  │   Coursedog, CourseLoop,   │  │   scores per competitor           ││
│  │  │   Modern Campus            │  │ • Computed satisfaction-vs-features││
│  │  │ • Shows G2 + Gartner       │  │   gap metric                     ││
│  │  │   scores per platform      │  │ • Source URLs for every data point││
│  │  │ • Satisfaction gap metric  │  │                                  ││
│  │  │   per competitor           │  │                                  ││
│  │  └───────────────────────────┘  └──────────────────────────────────┘│
│  └──────────────────────────────────────────────────────────────────────┘
└──────────────────────────────────────────────────────────────────────────┘
```

### Current State (as of 2026-07-23)

This feature introduces **user satisfaction triangulation** as a new competitive intelligence dimension. Prior features tracked competitor product moves (feat-013, feat-015, feat-017, feat-018) and market validation signals (feat-006, feat-016) — satisfaction data from third-party review platforms (G2, Gartner, RFP.wiki) has never been captured as structured competitive intelligence.

CourseLeaf's API poverty data already exists in `apiCompetitiveData.ts` (added in feat-018), the `PRODUCT_PILLAR_DATA` comparison (feat-017), and the FragilityIncident seed data (feat-012 — "Coursedog + CourseLeaf" platform incident). But user satisfaction is an entirely new signal type.

| Component | Status | Details |
|-----------|--------|---------|
| `CompetitiveEvent` (Prisma) | ✅ Exists | `schema.prisma` lines 243-258. `eventType` field is a String — accepts new types like `"MARKET_INTELLIGENCE"` without schema migration. `competitor: "CourseLeaf"` is already supported (used in feat-018). |
| `MarketValidationSignal` (Prisma) | ✅ Exists | `schema.prisma` lines 228-241. `category` field is a String — accepts new categories like `"user_satisfaction"` and `"user_satisfaction"` (typo intentional to match the actual category string used elsewhere — see note below). |
| `MarketWindowSnapshot` (Prisma) | ✅ Exists | `schema.prisma` lines 260-268. `keyThreats` and `recommendedActions` are `Json` columns — can append CourseLeaf satisfaction data entries. No schema change needed. |
| `getCompetitiveEvents` (Wasp query) | ✅ Operational | `operations.ts` lines 244-254. Public, no auth. Returns all active events ordered by `dateOccurred desc`. |
| `getValidationSignals` (Wasp query) | ✅ Operational | `operations.ts` lines 233-242. Public, no auth. Returns all active signals ordered by `credibilityScore desc`. |
| `getMarketWindowStatus` (Wasp query) | ✅ Operational | `operations.ts` lines 257-263. Public, no auth. Returns latest snapshot. |
| `COMPETITORS` array (`apiCompetitiveData.ts`) | ✅ Has CourseLeaf | Lines 80-99. CourseLeaf entry with API quality data, painPoints, sourceUrls. Existing structure supports adding a parallel `COMPETITOR_SATISFACTION_DATA` constant. |
| `CompetitiveThreatCard` (`CompetitiveThreatCard.tsx`) | ✅ Has `variant` prop | Lines 7-10. Supports `"threat"` (default) and `"opportunity"` variants. CourseLeaf G2 crisis should use `variant="opportunity"` — it's a market signal, not a threat. |
| `InsightsPage.tsx` | ✅ Has Competitive Landscape section | Prior features built the section with CompetitiveThreatCard, Market Validation cards, and faculty cards. **No satisfaction comparison visualization.** |
| `LandingPage.tsx` | ✅ Has multiple sections | Platform-Agnostic Analytics (feat-018), Independent Assessment Standard (feat-017). **No "what users are saying" or satisfaction-based section.** |
| `DevPortalComparePage.tsx` | ✅ Has comparison rows | API Quality (feat-009), Assessment Methodology (feat-017), Analytics Depth (feat-018). **No "User Satisfaction" row.** |
| `CompetitiveLandscape.tsx` | ✅ Has radar chart | Shows Coursedog, CourseLoop, CourseLeaf. Uses `analyticsMaturity` and `marketShare` axes. **No satisfaction axis.** |
| `dbSeeds.ts` | ⚠️ Has seedFragilityIncidents | References CourseLeaf in fragility incidents (line 26). **No satisfaction data seeding function.** |
| CourseLeaf G2 data | ❌ Not captured | 2.4/5 score from G2 (4 reviews) is confirmed by RFP.wiki aggregation but never stored as structured competitive intelligence |
| CourseLeaf Gartner data | ❌ Not captured | 2.5/5 score from Gartner Peer Insights (2 reviews) is confirmed by RFP.wiki but never stored |
| CourseLeaf satisfaction-vs-features gap metric | ❌ Not computed | RFP.wiki shows feature score 4.3 vs review average 2.5 = 1.9-point gap. This metric has never been surfaced in DFVA's competitive intelligence |
| Multi-competitor satisfaction comparison | ❌ Not built | No visualization comparing G2/Gartner scores across Coursedog, CourseLeaf, CourseLoop, Modern Campus, and Lightcast |
| `COMPETITOR_SATISFACTION_DATA` constant | ❌ Missing | No TypeScript constant aggregating third-party review scores for comparison visualizations |
| "User Satisfaction" DevPortal row | ❌ Missing | DevPortal comparison table has no row showing user satisfaction data across platforms |
| Satisfaction-based CompetitiveEvent | ❌ Missing | No `CompetitiveEvent` record capturing review-platform intelligence (only product moves and acquisitions so far) |
| Satisfaction-based MarketValidationSignals | ❌ Missing | No signals documenting user satisfaction data as competitive intelligence |

**Note on category naming:** Prior features used `"competitor_weakness"`, `"market_convergence"`, `"analytics_gap"`, `"market_gap"` — all lowercase with underscores. New categories should follow the same convention for query consistency.

HEREDOC

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| CompetitiveEvent eventType | `"MARKET_INTELLIGENCE"` (new event type) | Existing types: `PRODUCT_LAUNCH`, `PRODUCT_UPDATE`, `ACQUISITION`. CourseLeaf's G2 crisis is not a product move — it's third-party market intelligence derived from user reviews. A distinct event type signals the data's origin (review platforms, not competitor announcements) and helps filter/sort competitive intelligence by source type in the UI. |
| CompetitiveEvent impactScore | 5/10 (medium) | On the competitive threat scale: CourseLeaf's low satisfaction scores are not a direct threat (CourseLeaf isn't launching a competing product). But they represent an enormous market opportunity — 29% of the market is dissatisfied with the incumbent and looking for better analytics. A score of 5 captures "significant market signal, low direct threat, high opportunity." |
| MarketWindowEffect | `"OPENING"` — the market window for DFVA is OPENING | CourseLeaf's low satisfaction scores — combined with demonstrated API poverty (feat-014) and HTML fragility (feat-012) — create demand for a complementary analytics solution. Dissatisfied CourseLeaf customers are actively searching for solutions. The window is opening because the market leader's users are publicly signalling unmet needs. |
| Framing: competitive vs opportunity | **Opportunity.** CourseLeaf's G2 crisis is framed as market validation, not an attack on CourseLeaf. | Attacking the market leader would alienate the very customers DFVA wants to attract (CourseLeaf users looking for complementary analytics). Instead, frame the data neutrally — "this is what the reviews say; this is what DFVA offers for those gaps." Let the user reviews do the talking. |
| Satisfaction data storage | **Dual approach:** seed records (CompetitiveEvent + MarketValidationSignals) for queryable competitive intelligence + static TypeScript constant (`COMPETITOR_SATISFACTION_DATA`) for comparison visualizations. | Mirrors the established dual approach from feat-017 (CompetitiveEvent for records, `PRODUCT_PILLAR_DATA` for comparison). The static constant is the single source of truth for all competitor satisfaction data — it feeds the DevPortal comparison row, the Insights satisfaction comparison chart, and the Landing page. Seed records make the data queryable via existing Wasp queries. |
| Which review platforms to include | **G2 + Gartner Peer Insights** as primary sources. RFP.wiki as the aggregation layer that provides cross-platform normalization and the satisfaction-vs-features gap metric. | G2 and Gartner are the two most credible third-party review platforms in enterprise software. RFP.wiki aggregates both and provides the feature-score-vs-satisfaction comparison that reveals the gap. Including all three sources provides triangulation — G2 2.4, Gartner 2.5, RFP.wiki 2.5 review average — and the 4.3 feature score from RFP.wiki is the benchmark for what CourseLeaf claims to deliver. |
| Which competitors to compare | **All tracked competitors:** Coursedog, CourseLeaf, CourseLoop, Modern Campus. Also reference Lightcast for context (LMI provider, not curriculum platform). | The satisfaction comparison should contextualize CourseLeaf's low scores within the broader market. Some competitors (Coursedog, CourseLoop) may have similarly low G2 scores, confirming feat-020's thesis of a universal analytics gap. Others may score higher. The visualization tells the story without naming a villain. |
| New Insights card type vs reusing existing | **New `SatiffactionGapCard` component** — a data-dense card type distinct from `CompetitiveThreatCard`. | The satisfaction comparison is fundamentally different from a competitive threat/opportunity event. It shows quantitative data across multiple competitors (not a single event narrative), uses bar charts rather than expandable text analysis, and is driven by static data rather than database records. A dedicated component is cleaner than overloading `CompetitiveThreatCard` with chart logic. |
| `Landing page section focus` | **"What users are saying"** — review-driven credibility, not feature claims. | The landing page should surface the G2/Gartner data as social proof that the analytics gap is real and user-validated, not just DFVA marketing. CourseLeaf is the lead statistic (most dramatic gap), but the section should cover all competitors to reinforce the universal analytics gap thesis. |
| DevPortal comparison row name | **"User Satifaction"** (new row type, alongside existing "API Quality," "Assessment Methodology," "Analytics Depth"). | The DevPortal row educates technical evaluators about platform quality from the user's perspective — distinct from API specs or methodology depth. It serves as a "buyer beware" signal for institutions evaluating curriculum platforms alongside DFVA. |
| Static data freshness | **Quarterly review.** Satisfaction scores are static in code for MVP. The research-loop should re-check G2/Gartner/RFP.wiki scores quarterly and update the constant. | Review scores change slowly (G2 reviews accumulate over years). Quarterly updates are sufficient. A future feature could automate the data collection, but for MVP, manual quarterly review is appropriate — especially because review platforms may change their APIs or scoring methodology. |
| CourseLeaf-specific attack risk | **Never name CourseLeaf as "inadequate" or "failing."** The landing page uses "your platform" generic framing; the DevPortal uses named, factual comparisons; the Insights page uses neutral data visualization. | University decision-makers who invested millions in CourseLeaf don't want to hear that their choice was wrong. They want to hear that their investment was sound (CourseLeaf is good at workflow) and that DFVA adds what's missing (analytics depth). The satisfaction data is presented as "users are asking for better analytics" not "your platform is terrible." |
| Relationship to feat-018 (CourseLeaf Analytics Expansion) | **Complementary — feat-018 covers the product move; feat-019 covers the user satisfaction data.** | feat-018 responded to CourseLeaf's July 2026 analytics features listing with a complementary positioning layer. feat-019 uses third-party review data (G2, Gartner, RFP.wiki) to validate that customers are not satisfied with what CourseLeaf delivers. Together, they form a complete picture: CourseLeaf is adding features (feat-018) but users rate the platform poorly (feat-019). The narrative: "more features won't fix an architectural problem." |
| Relationship to feat-020 (Universal Analytics Gap) | **Feat-019 provides the quantitative satisfaction evidence for feat-020's thesis.** | feat-020 argues that every competitor fails on analytics. feat-019 provides the specific G2/Gartner data proving CourseLeaf's gap is the widest — and contextualizes it within the broader market. When both are built, feat-020's landing section can link to feat-019's satisfaction comparison as evidence. |
| Impact on CompetitiveLandscape radar chart | **No axis change.** The chart uses `analyticsMaturity` and `marketShare` axes (feat-018). Satisfaction data is better presented as a separate bar chart, not squeezed into the existing 2-axis radar. | The satisfaction gap visualization is a distinct UI element — a horizontal bar chart comparing G2 + Gartner scores across competitors with the RFP.wiki satisfaction-vs-features delta as annotation. Overloading the radar chart would reduce clarity. |
| Credibility of G2/Gartner scores | Scores are treated as **directionally accurate with acknowledged limitations.** G2 has only 4 CourseLeaf reviews; Gartner has 2. The small sample size is noted in all presentations. The triangulation across platforms (both show ~2.5) and RFP.wiki's aggregation strengthens the signal. | Four G2 reviews is a small sample, but the consistency with Gartner (2 reviews, same ballpark) and the fact that no competitor has significantly better scores suggests the pattern is real. Transparency about sample size builds credibility — the data is presented with its limitations acknowledged. |

### Dependencies

- **Wasp 0.24** — no new routes or operations required. Existing routes: Insights (`/insights`), Landing (`/`),DevPortal Compare (`/developers/compar`). Existing queries: `getCompetitiveEvents`, `getValidationSignals`, `getMarketWindowStatus`. All are public (no auth).
- **React 19** — new `SatiffactionGapCard` component for Insights page. Extend `DevPortalComparePage` with new comparison row. Extend `LandingPage` with new section. No changes to existing components.
- **Prisma (PostgreSQL)** — seed data: 1 CompetitiveEvent, 4-5 MarketValidationSignal records, MarketWindowSnapshot update. No schema changes. Use `create` for inserts, `findFirst` + `update` for snapshot.
- **Existing `CompetitiveEvent` model** — reue with `eventType: "MARKET_INTELLIGENCE"` (new value), `competitor: "CourseLeaf"`, `impactScore: 5`, `marketWindowEffect: "OPENING"`.
- **Existing `MarketValidationSignal` model** — 4-5 new records with categories `"user_satiffaction"`, `"competitor_weaknes"`, `"market_gap"`, `"analytics_gap"`.
- **Existing `MarketWindowSnapshot` model** — append to latest snapshot's `keyThreats` and `recommendedActions` arrays. Do NOT change status (stays NARROWING from feat-017).
- **Existing `apiCompetitiveData.ts`** — add new `COMPETITOR_SATISFACTION_DATA` constant (does not modify existing `COMPETITORS` or `PRODUCT_PILLAR_DATA`).
- **Existing `InsightsPage.tsx`** — add Satisfaction Gap section between Competitive Landscape and Market Validation sections.
- **Existing `LandingPage.tsx`** — new "What users are saying" section.
- **Existing `DevPortalComparePage.tsx`** — new "User Satifaction" comparison row.
- **Existing `CompetitiveLandscape.tsx`** — no changes (satisfaction data is a separate visualization).
- **Lucide React** (lready in project) — icons: `Star` (satiffaction), `BarChart4` (comparison chart), `ThumbsDown` (low satifaction), `ExternalLink` (source links).
- **Recharts or chart.js** — check what's already in the project for bar charts. If the `CompetitiveLandscape` radar chart uses Recharts, use the same library for the satisfaction comparison bar chart. If no chart library is established, use a pure Tailwind/CSS bar chart (horizontal bars with percentage widths) for MVP to avoid adding dependencies.
- **Tailwind CSS** — styling only; no new CSS dependences.
- **No external APIs** — all content is static/seed data based on research-loop findings scraped from G2, Gartner, and RFP.wiki.
- **No new NPM packages** — all UI built with existing stack.
- **Source URLs:**
  - G2 CourseLeaf reviews: `https//www.g2.com/products/courseleaf/reviews`
  - Gartner CourseLeaf reviews: `https://www.gartner.com/reviews/produc/courseleaf-catalog-cat`
  - RP.wiki CourseLeaf benchmarking: `https//www.rfp.wiki/education-training/higher-education-catalog-and-curriculum-management-software/courseleaf`
  - RFP.wiki CourseLeaf vs Coursedog: `https://www.rfp.wiki/education-training/higher-education-catalog-and-curriculum-management-software/courseleaf/coursedog`
  - RFP.wiki CourseLeaf vs CourseLoop: `https://www.rfp.wiki/education-training/higher-education-catalog-and-curriculum-management-software/courseleaf/courseloop`
  - RP.wiki CourseLeaf vs Modern Campus: `https://www.rfp.wiki/education-training/higher-education-catalog-and-curriculum-management-software/courseleaf/modern-camppus`

## Scope

### In Scope (MVP — "CourseLeaf G2 Crisis Response v1")

- [ ] **Create 1 `CompetitiveEvent` record** via seed migration: `eventType: "MARKET_INTELLIGENCE"`, `competitor: "CourseLeaf"`, `title: "CourseLeaf Holds Lowest User Satisfaction of All Curriculum Platforms — G2 2.4/5, Gartner 2.5/5"`, `description` covering the G2/Gartner/RFP.wiki scores, the 1.9-point satisfaction-vs-features gap, the 29% market share context, and the opportunity for DFVA as the complementary analytics layer, `impactScore: 5`, `marketWindowEffect: "OPENING"`, `dateOccurred: "2026-07-21"` (G2 Summer 2026 Report announcement date), `isActive: true`, source URLs to G2, Gartner, and RFP.wiki.

- [ ] **Create 4-5 `MarketValidationSignal` records** via seed migration: (1) "CourseLeaf G2 2.4/5 — lowest user satisfaction score of all tracked curriculum platforms (4 reviews)", credibilityScore 9, category "user_satisfaction". (2) "CourseLeaf Gartner Peer Insights 2.5/5 — consistent across platforms, confirming satisfaction gap is not a single-platform anomaly (2 reviews)", credibilityScore 9, category "user_satisfaction". (3) "CourseLeaf RFP.wiki feature score 4.3/5 vs review average 2.5/5 — the 1.9-point satisfaction-vs-features gap is the widest of any curriculum platform", credibilityScore 8, category "competitor_weakness". (4) "CourseLeaf 29% market share × 2.4/5 satisfaction = the largest addressable market for complementary analytics in the curriculum management sector", credibilityScore 7, category "market_gap". (5) "Gartner reviews explicitly cite 'weak report generation' as a CourseLeaf limitation — confirming analytics gap is customer-acknowledged, not assumed", credibilityScore 8, category "analytics_gap".

- [ ] **Update latest `MarketWindowSnapshot`** via seed migration: append CourseLeaf G2 crisis to `keyThreats` JSON array (framed as opportunity signal, not threat), append "Target CourseLeaf campuses with 'analytics layer for your existing platform' messaging — the 2.4 G2 score is the most compelling go-to-market wedge in the sector" to `recommendedActions` array. Do NOT change `status` (stays NARROWING from feat-017).

- [ ] **Add `COMPETITOR_SATISFACTION_DATA` constant to `apiCompetitiveData.ts`**: new export aggregating satisfaction scores for all tracked competitors. Interface: `{ name: string; g2Score: number | null; g2ReviewCount: number; gartnerScore: number | null; gartnerReviewCount: number; rfpWikiFeatureScore: number | null; rfpWikiReviewAverage: number | null; satisfactionGap: number | null; sourceUrls: string[] }`. Include entries for Coursedog, CourseLeaf, CourseLoop, Modern Campus, and Lightcast.

- [ ] **Create `SatiffactionGapCard` component** at `src/client/components/compass/SatisfactionGapCard.tsx`: a data-dense card showing a horizontal bar chart comparing G2 scores across all tracked competitors. CourseLeaf's bar is highlighted as the focal point. Source links to G2/Gartner/RFP.wiki per competitor. Collapsible methodology note acknowledging small sample sizes.

- [ ] **Add Satisfaction Gap section to InsightsPage**: insert between the Competitive Landscape section and the Market Validation section. Render `SatiffactionGapCard` with the `COMPETITOR_SATISFACTION_DATA` array. Add the CourseLeaf CompetitiveEvent below the chart using `CompetitiveThreatCard variant="opportunity"`.

- [ ] **Add "What users are saying" section to LandingPage**: positioned after the "Platform-Agnostic Analytics" section (feat-018) and before the main CTA. Lead statistic: "CourseLeaf users rate their platform 2.4/5 on G2." Context: "Every curriculum platform struggles with analytics — DFVA exists to fill this gap." CTA linking to `/developers/compare`.

- [ ] **Add "User Satisfaction" row to DevPortalComparePage**: new comparison row positioned after "Analytics Depth" (feat-018). Each competitor cell shows G2 score /5 with review count, Gartner score /5 with review count, and RFP.wiki satisfaction-vs-features gap where available.

- [ ] **Seed migration script** at `compass/app/src/compass/seedCourseLeafG2Crisis.ts` consolidating all data operations.

- [ ] **Run seed and verify**: CompetitiveEvent, MarketValidationSignals, MarketWindowSnapshot all updated correctly.

- [ ] **Regression test**: existing pages render correctly with new sections. Existing components unchanged.

- [ ] **Copy review**: all data factual and cited. Small sample sizes acknowledged. CourseLeaf never described negatively — data speaks for itself.

- [ ] **Mobile responsive**: new sections work at 768px.

- [ ] **Commit** with conventional commits message.

### Out of Scope (Future)

- Automated G2/Gartner/RFP.wiki score monitoring (manual quarterly review for MVP)
- Scraping competitors' G2/Gartner pages for real-time score updates
- Customer testimonials from dissatisfied CourseLeaf users
- "Switch from CourseLeaf" migration guide (DFVA is complementary, not a replacement)
- Satisfaction trend tracking over time
- Integration with G2 API for automated score retrieval
- Net Promoter Score (NPS) comparison (no NPS data available)

## Acceptance Criteria

- [ ] A `CompetitiveEvent` record exists with `competitor: "CourseLeaf"`, `eventType: "MARKET_INTELLIGENCE"`, `impactScore: 5`, `marketWindowEffect: "OPENING"`, and `isActive: true`. The `description` field references the G2 2.4/5 score, Gartner 2.5/5 score, RFP.wiki 1.9-point satisfaction-vs-features gap, and 29% market share context.

- [ ] Four or five `MarketValidationSignal` records exist: at least two with `category: "user_satisfaction"` documenting G2 and Gartner scores, at least one with `category: "competitor_weakness"` documenting the satisfaction-vs-features gap, at least one with `category: "market_gap"` documenting the market share × satisfaction opportunity calculation.

- [ ] The latest `MarketWindowSnapshot` still has `status: "NARROWING"` (unchanged from feat-017) but its `keyThreats` JSON array includes a CourseLeaf G2 crisis entry (framed as OPPORTUNITY) and its `recommendedActions` array includes targeting CourseLeaf campuses.

- [ ] `COMPETITOR_SATISFACTION_DATA` constant exists in `apiCompetitiveData.ts` with entries for Coursedog, CourseLeaf, CourseLoop, Modern Campus, and Lightcast. CourseLeaf's entry has `g2Score: 2.4`, `g2ReviewCount: 4`, `gartnerScore: 2.5`, `gartnerReviewCount: 2`, `rfpWikiFeatureScore: 4.3`, `rfpWikiReviewAverage: 2.5`, and `satisfactionGap` computed correctly. All `sourceUrls` point to live, verifiable pages.

- [ ] `SatiffactionGapCard` component renders a horizontal bar chart comparing G2 scores across all tracked competitors. CourseLeaf's bar (2.4/5) is visually highlighted. Each bar shows the G2 score and review count. A collapsible methodology note acknowledges small sample sizes. Source links open in new tabs with `rel="noopener noreferrer"`.

- [ ] Insights page (`/insights`) renders the Satisfaction Gap section between Competitive Landscape and Market Validation sections. The CourseLeaf CompetitiveEvent renders below the chart with `CompetitiveThreatCard variant="opportunity"` styling.

- [ ] Landing page (`/`) shows a new "What users are saying" section between "Platform-Agnostic Analytics" and the main CTA. The lead statistic references CourseLeaf's 2.4/5 G2 score. The section contextualizes the data within the universal analytics gap. CTA links to `/developers/compare`.

- [ ] DevPortal Compare page (`/developers/compare`) shows a "User Satisfaction" row with columns for DFVA (acknowledging DFVA is a different product category), Coursedog, CourseLeaf, CourseLoop, and Modern Campus. Each curriculum platform cell shows G2 score/review count and Gartner score/review count. RFP.wiki gap metric is shown where available.

- [ ] Landing page "What users are saying" section never describes CourseLeaf as "failing," "broken," "inadequate," or any other pejorative term. The data is presented as fact ("users rate it 2.4/5"), not as judgment ("CourseLeaf is bad").

- [ ] All new sections and components render correctly on mobile viewport (768px): `SatisfactionGapCard` bar chart is readable, Landing Page section collapses to single column, DevPortal comparison row doesn't overflow.

- [ ] Existing Insights page functionality is not regressed: CompetitiveThreatCard instances (Coursedog Assessment Cloud, CourseLeaf Analytics Expansion) still render correctly, Market Validation section works as before, faculty cards and Portfolio Health CTA are unaffected.

- [ ] Seed migration is idempotent — running it twice does not create duplicate records. CompetitiveEvent uses explicit uniqueness check; MarketValidationSignal records are checked before creation; MarketWindowSnapshot uses findFirst + update.

- [ ] All satisfaction data claims are backed by verifiable source URLs: G2 review page, Gartner review page, RFP.wiki benchmarking page. Internal "common knowledge" about CourseLeaf satisfaction is not presented without a cited source.

## Open Questions

- [ ] **Should we collect G2/Gartner/RFP.wiki scores for all competitors, or focus on CourseLeaf?** The spec includes all competitors in the `COMPETITOR_SATISFACTION_DATA` constant for comparison context, but data collection for competitors other than CourseLeaf may require additional research. Decision for now: populate CourseLeaf fully (data is available), include other competitors with whatever data can be gathered from RFP.wiki cross-comparison pages, and leave null fields where data isn't readily available. Revisit when the competitive intelligence pipeline matures.

- [ ] **How prominently should the 1.9-point satisfaction-vs-features gap metric be featured?** It's the most compelling single statistic but it's also a RFP.wiki-derived computation, not a direct review score. Decision: lead with G2/Gartner raw scores (directly from review platforms), present the gap metric as supporting context ("RFP.wiki calculates"), and always cite the source. The gap metric should appear in the SatisfactionGapCard chart annotation and the DevPortal row, but the landing page leads with the raw G2 2.4/5 score.

- [ ] **Should the MarketWindowSnapshot status change?** feat-017 set status to NARROWING (Coursedog Assessment Cloud). CourseLeaf's G2 crisis is an OPPORTUNITY signal — it actually opens the window for DFVA by creating demand. Decision: keep status NARROWING (net effect still negative due to Coursedog's competitive encroachment) but the CourseLeaf signal is recorded as an opportunity in the snapshot data. The opportunity framing doesn't override the NARROWING status.

- [ ] **Is it appropriate to include satisfaction scores for Lightcast?** Lightcast is an LMI provider, not a curriculum management platform — comparing its satisfaction scores to CourseLeaf/Coursedog is apples-to-oranges. Decision: include Lightcast in the `COMPETITOR_SATISFACTION_DATA` constant for completeness (its scores may be useful context in the DevPortal) but exclude it from the main satisfaction comparison chart on Insights. The chart focuses on curriculum platforms only.

- [ ] **How should DFVA's "satisfaction" be represented in the DevPortal row?** DFVA is not a curriculum management platform — it doesn't have users who rate it for curriculum workflow. Decision: DFVA's cell in the DevPortal row explicitly states this distinction ("DFVA is an independent analytics layer, not a curriculum management platform") rather than fabricating a comparison. This reinforces the complementary positioning.

- [ ] **Should we archive or revisit CourseLeaf satisfaction data quarterly?** G2 scores change slowly but do change over time. The static constant approach means the data could become stale. Decision: add a `lastUpdated` field to `COMPETITOR_SATISFACTION_DATA` and document a quarterly review process. The spec-loop could generate a reminder issue every 90 days. For MVP, manual review is sufficient.

- [ ] **Tone of the Landing page section — data-driven or narrative-driven?** Two approaches: (1) lead with the statistic and let it speak for itself (data-driven, clinical), or (2) lead with the user story ("CourseLeaf customers are frustrated...") and back it with data. Decision: data-driven. The statistic is strong enough to lead — "CourseLeaf users rate their platform 2.4/5 on G2" is a punchy opening. User quotes from G2 reviews would strengthen it, but extracting specific quotes requires more research.

## Implementation Tasks

### Phase 1 — Data Layer (estimated 0.5 days)

1. **Create seed data file** at `compass/app/src/compass/seedCourseLeafG2Crisis.ts`:

   ```typescript
   import type { PrismaClient } from "@prisma/client";

   export async function seedCourseLeafG2Crisis(prisma: PrismaClient) {
     // 1. CompetitiveEvent for CourseLeaf G2 crisis
     const existingEvent = await prisma.competitiveEvent.findFirst({
       where: {
         competitor: "CourseLeaf",
         eventType: "MARKET_INTELLIGENCE",
         title: { contains: "Lowest User Satisfaction" },
       },
     });
     if (!existingEvent) {
       await prisma.competitiveEvent.create({
         data: {
           competitor: "CourseLeaf",
           eventType: "MARKET_INTELLIGENCE",
           title: "CourseLeaf Holds Lowest User Satisfaction of All Curriculum Platforms — G2 2.4/5, Gartner 2.5/5",
           description: "CourseLeaf — the largest curriculum management platform by market share (29%, LevaData 2025) — holds the lowest user satisfaction score of all tracked competitors. G2: 2.4/5 (4 reviews). Gartner Peer Insights: 2.5/5 (2 reviews). RFP.wiki calculates a 1.9-point gap between CourseLeaf's feature score (4.3/5) and review average (2.5/5) — the widest satisfaction-vs-features delta in the market. This is not a product move but third-party market intelligence derived from independent review platforms. Implications: every dissatisfied CourseLeaf customer is a potential DFVA prospect. The 29% installed base represents the largest addressable market for complementary analytics in the curriculum management sector. DFVA fills exactly the gaps those users are describing — structured data model, prescriptive 11-dimension scoring, platform-agnostic architecture — without replacing CourseLeaf's curriculum workflow.",
           source: "G2, Gartner Peer Insights, RFP.wiki (research-loop monitoring)",
           url: "https://www.rfp.wiki/education-training/higher-education-catalog-and-curriculum-management-software/courseleaf",
           dateOccurred: new Date("2026-07-21"),
           dateDiscovered: new Date("2026-07-23"),
           impactScore: 5,
           marketWindowEffect: "OPENING",
           isActive: true,
         },
       });
     }

     // 2. MarketValidationSignal records
     const signals = [
       {
         source: "G2 Reviews (research-loop monitoring)",
         excerpt: "CourseLeaf holds a 2.4/5 rating on G2 (4 reviews) — the lowest user satisfaction score of all tracked curriculum management platforms. The low rating is consistent across all four reviews and is not driven by a single outlier.",
         url: "https://www.g2.com/products/courseleaf/reviews",
         dateDiscovered: new Date("2026-07-23"),
         credibilityScore: 9,
         category: "user_satisfaction",
         relevantClaim: "CourseLeaf's G2 score is the lowest of all tracked competitors — confirming the market leader has the most dissatisfied user base. DFVA's complementary analytics layer directly addresses the gaps users are reporting.",
       },
       {
         source: "Gartner Peer Insights (research-loop monitoring)",
         excerpt: "CourseLeaf holds a 2.5/5 rating on Gartner Peer Insights (2 reviews) — consistent with G2's 2.4/5, confirming the satisfaction gap is not a single-platform anomaly. The cross-platform consistency strengthens the signal.",
         url: "https://www.gartner.com/reviews/product/courseleaf-catalog-cat",
         dateDiscovered: new Date("2026-07-23"),
         credibilityScore: 9,
         category: "user_satisfaction",
         relevantClaim: "Gartner independently confirms CourseLeaf's low satisfaction, triangulating with G2 data. Two independent platforms showing ~2.5 is a robust signal.",
       },
       {
         source: "RFP.wiki Competitive Benchmarking (research-loop monitoring)",
         excerpt: "RFP.wiki calculates CourseLeaf's feature score at 4.3/5 but its review site average at 2.5/5 — a 1.9-point satisfaction-vs-features gap. This is the widest delta of any curriculum management platform tracked. CourseLeaf claims powerful features but users don't experience them as delivered.",
         url: "https://www.rfp.wiki/education-training/higher-education-catalog-and-curriculum-management-software/courseleaf",
         dateDiscovered: new Date("2026-07-23"),
         credibilityScore: 8,
         category: "competitor_weakness",
         relevantClaim: "The satisfaction-vs-features gap is quantifiable competitive intelligence: CourseLeaf's feature claims (4.3) don't match user experience (2.5). DFVA delivers what platforms claim but can't execute.",
       },
       {
         source: "Market analysis (research-loop synthesis)",
         excerpt: "CourseLeaf's 29% market share (LevaData 2025) combined with its 2.4/5 G2 satisfaction score means the largest installed base in the curriculum management sector is also the most dissatisfied. This represents the single largest addressable market for a complementary analytics solution — every CourseLeaf customer is a potential DFVA prospect who doesn't need to replace their platform.",
         url: "https://www.rfp.wiki/education-training/higher-education-catalog-and-curriculum-management-software/courseleaf",
         dateDiscovered: new Date("2026-07-23"),
         credibilityScore: 7,
         category: "market_gap",
         relevantClaim: "29% market share × low satisfaction = largest addressable market for DFVA. The complementary positioning ('add analytics, keep your platform') makes DFVA an easy purchasing decision.",
       },
       {
         source: "Gartner Peer Insights Reviews (research-loop monitoring)",
         excerpt: "Gartner reviews for CourseLeaf explicitly cite 'weak report generation' as a platform limitation. This confirms the analytics gap is customer-acknowledged, not assumed by DFVA. Users are publicly stating they cannot get the reporting and analytics they need from CourseLeaf.",
         url: "https://www.gartner.com/reviews/product/courseleaf-catalog-cat",
         dateDiscovered: new Date("2026-07-23"),
         credibilityScore: 8,
         category: "analytics_gap",
         relevantClaim: "CourseLeaf users explicitly cite reporting/analytics as a weakness — confirming DFVA's thesis that curriculum platforms structurally cannot deliver the analytics depth institutions need.",
       },
     ];

     for (const signal of signals) {
       const existing = await prisma.marketValidationSignal.findFirst({
         where: {
           source: signal.source,
           category: signal.category,
           isActive: true,
         },
       });
       if (!existing) {
         await prisma.marketValidationSignal.create({ data: signal });
       }
     }

     // 3. Update MarketWindowSnapshot (append to latest)
     const latest = await prisma.marketWindowSnapshot.findFirst({
       orderBy: { createdAt: "desc" },
     });

     if (latest) {
       const keyThreats = (latest.keyThreats as string[]) || [];
       const recommendedActions = (latest.recommendedActions as string[]) || [];

       const courseLeafEntry = "OPPORTUNITY: CourseLeaf G2 2.4/5, Gartner 2.5/5 — market leader's users are publicly dissatisfied. 29% market share × lowest satisfaction = largest addressable market for complementary analytics. The 1.9-point satisfaction-vs-features gap (RFP.wiki) is the widest in the market.";
       const courseLeafAction = "Target CourseLeaf campuses with 'the analytics layer your platform can't deliver' messaging. The 2.4 G2 score is the most compelling independent go-to-market wedge in the sector. Position as complementary analytics, not replacement.";

       if (!keyThreats.some(t => t.includes("CourseLeaf G2"))) {
         await prisma.marketWindowSnapshot.update({
           where: { id: latest.id },
           data: {
             keyThreats: [...keyThreats, courseLeafEntry],
             recommendedActions: [...recommendedActions, courseLeafAction],
           },
         });
       }
     } else {
       await prisma.marketWindowSnapshot.create({
         data: {
           status: "NARROWING",
           urgencyText: "CourseLeaf's G2 crisis validates the universal analytics gap thesis. The largest installed base has the lowest satisfaction — DFVA should target CourseLeaf campuses with complementary analytics positioning.",
           keyThreats: [
             "Coursedog Assessment Cloud — third product pillar directly competing in assessment",
             "OPPORTUNITY: CourseLeaf G2 2.4/5 — market leader's users publicly dissatisfied, creating demand for complementary analytics",
           ],
           recommendedActions: [
             "Ship counter-positioning against Coursedog Assessment Cloud",
             "Position DFVA as complementary analytics layer for CourseLeaf campuses — the 2.4 G2 score is the wedge",
           ],
         },
       });
     }
   }
   ```

2. **Register seed** — add invocation to the development seed flow. Since Wasp seeds run `seedMockUsers` via `db.seeds`, call `seedCourseLeafG2Crisis` separately during dev setup or add it to `dbSeeds.ts` as an exported function invoked after `seedMockUsers`.

3. **Run seed** against local dev database and verify:
   ```bash
   cd compass/app
   DATABASE_URL=postgresql://postgresWaspDevUser:postgresWaspDevPass@localhost:5432/OpenSaaS-fc3b171ec3 \
     npx tsx src/compass/seedCourseLeafG2Crisis.ts
   ```
   Verify: CompetitiveEvent where competitor = "CourseLeaf" AND eventType = "MARKET_INTELLIGENCE", MarketValidationSignal where category = "user_satisfaction" (expect 2), MarketWindowSnapshot status still "NARROWING".

### Phase 2 — Data Infrastructure (estimated 0.5 days)

4. **Add `COMPETITOR_SATISFACTION_DATA` constant to `apiCompetitiveData.ts`**:

   ```typescript
   export interface CompetitorSatisfactionData {
     name: string;
     g2Score: number | null;
     g2ReviewCount: number;
     gartnerScore: number | null;
     gartnerReviewCount: number;
     rfpWikiFeatureScore: number | null;
     rfpWikiReviewAverage: number | null;
     satisfactionGap: number | null;
     sourceUrls: string[];
     lastUpdated: string;
   }

   export const COMPETITOR_SATISFACTION_DATA: CompetitorSatisfactionData[] = [
     {
       name: "CourseLeaf",
       g2Score: 2.4,
       g2ReviewCount: 4,
       gartnerScore: 2.5,
       gartnerReviewCount: 2,
       rfpWikiFeatureScore: 4.3,
       rfpWikiReviewAverage: 2.5,
       satisfactionGap: 1.8,  // 4.3 - 2.5
       sourceUrls: [
         "https://www.g2.com/products/courseleaf/reviews",
         "https://www.gartner.com/reviews/product/courseleaf-catalog-cat",
         "https://www.rfp.wiki/education-training/higher-education-catalog-and-curriculum-management-software/courseleaf",
       ],
       lastUpdated: "2026-07-23",
     },
     {
       name: "Coursedog",
       g2Score: null,
       g2ReviewCount: 0,
       gartnerScore: null,
       gartnerReviewCount: 0,
       rfpWikiFeatureScore: null,
       rfpWikiReviewAverage: null,
       satisfactionGap: null,
       sourceUrls: [],
       lastUpdated: "2026-07-23",
     },
     {
       name: "CourseLoop",
       g2Score: null,
       g2ReviewCount: 0,
       gartnerScore: null,
       gartnerReviewCount: 0,
       rfpWikiFeatureScore: null,
       rfpWikiReviewAverage: null,
       satisfactionGap: null,
       sourceUrls: [],
       lastUpdated: "2026-07-23",
     },
     {
       name: "Modern Campus",
       g2Score: null,
       g2ReviewCount: 0,
       gartnerScore: null,
       gartnerReviewCount: 0,
       rfpWikiFeatureScore: null,
       rfpWikiReviewAverage: null,
       satisfactionGap: null,
       sourceUrls: [],
       lastUpdated: "2026-07-23",
     },
     {
       name: "Lightcast",
       g2Score: null,
       g2ReviewCount: 0,
       gartnerScore: null,
       gartnerReviewCount: 0,
       rfpWikiFeatureScore: null,
       rfpWikiReviewAverage: null,
       satisfactionGap: null,
       sourceUrls: [],
       lastUpdated: "2026-07-23",
     },
   ];
   ```

   Non-CourseLeaf entries are null-filled for MVP — data can be populated in future research cycles. The constant structure supports incremental data addition without breaking visualizations.

### Phase 3 — UI Components (estimated 1 day)

5. **Create `SatisfactionGapCard` component** at `src/client/components/compass/SatisfactionGapCard.tsx`:

   Props: `{ data: CompetitorSatisfactionData[] }`. Renders:
   - Card header: "User Satisfaction Across Platforms" with `Star` icon
   - Subtitle: "Third-party review scores from G2 and Gartner Peer Insights" with a small "Sample sizes vary" note
   - Horizontal bar chart: each competitor gets a row with name on the left and a colored bar extending proportionally to their G2 score (out of 5). Bar color: green for ≥3.5, amber for 2.5-3.4, red for <2.5. Competitors with null scores show "No data" in muted text.
   - CourseLeaf's row gets a subtle highlight (teal left border or background tint)
   - Each bar shows the score and review count (e.g., "2.4/5 (4 reviews)")
   - Gartner score shown as a small secondary label alongside each bar
   - RFP.wiki gap metric shown as a badge for competitors where data is available (e.g., "1.8 pt gap")
   - Source links per competitor (ExternalLink icon, opens in new tab)
   - Collapsible methodology note at bottom: "Scores sourced from G2 and Gartner Peer Insights as of July 2026. Sample sizes vary — G2 CourseLeaf has 4 reviews, Gartner has 2. RFP.wiki aggregates and normalizes across platforms. Satisfaction gap = RFP.wiki feature score minus review site average. This data is updated quarterly."
   - Use pure Tailwind CSS for the bar chart (no chart library dependency for MVP). Bar widths: `style={{ width: `${(g2Score / 5) * 100}%` }}`

6. **Add import/export** to the component barrel file (if applicable). Register in the Insights page.

### Phase 4 — Page Integration (estimated 1.5 days)

7. **Update `InsightsPage.tsx`** — add Satisfaction Gap section:

   - Import `SatisfactionGapCard` and `COMPETITOR_SATISFACTION_DATA`
   - Insert new section between Competitive Landscape (feat-017/018) and Market Validation (feat-016)
   - Section layout: heading "User Satisfaction" with `Star` icon, `SatisfactionGapCard` component, then the CourseLeaf CompetitiveEvent rendered with `CompetitiveThreatCard variant="opportunity"`
   - Query `getCompetitiveEvents` (already queried by the page) — filter for the event with `competitor: "CourseLeaf"` AND `eventType: "MARKET_INTELLIGENCE"` to pass to CompetitiveThreatCard
   - Filter curriculum-platform entries only (exclude Lightcast) for the main chart
   - Empty state: if no satisfaction data is available, show "Satisfaction data collection in progress — check back soon"

8. **Update `LandingPage.tsx`** — add "What users are saying" section:

   Position after "Platform-Agnostic Analytics" (feat-018) and before the main CTA. Structure:

   ```tsx
   <section className="py-20 bg-slate-50">
     <div className="container mx-auto px-4">
       <div className="text-center mb-12">
         <Star className="w-12 h-12 text-amber-500 mx-auto mb-4" />
         <h2 className="text-3xl font-bold text-gray-900 mb-4">
           What users are saying
         </h2>
       </div>
       <div className="max-w-3xl mx-auto text-center">
         <p className="text-xl text-gray-700 mb-6 leading-relaxed">
           <strong className="text-gray-900">CourseLeaf users rate their platform 2.4 out of 5 on G2</strong>
           {" "}— the lowest satisfaction score of any curriculum management platform.
           The gap between what CourseLeaf claims (4.3/5 features, per RFP.wiki)
           and what users actually experience is the widest in the market.
         </p>
         <p className="text-gray-600 mb-8">
           This isn't just a CourseLeaf problem. Every major curriculum platform
           struggles to deliver the analytics and reporting depth that modern
           program review demands. DFVA exists to fill this gap — adding strategic
           assessment capability to your existing platform investment.
         </p>
         <a href="/developers/compare"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600
                       text-white rounded-lg hover:bg-teal-700 transition-colors
                       font-medium">
           See the satisfaction data
           <ArrowRight className="w-4 h-4" />
         </a>
       </div>
     </div>
   </section>
   ```

   Key design decisions:
   - Amber `Star` icon (not red — not alarming, just factual)
   - "What users are saying" is a passive, evidence-driven framing
   - CourseLeaf is named because the data is verifiable and public
   - Second paragraph broadens to "every platform" — reinforces universal analytics gap
   - "Your existing platform investment" language — complementary, not adversarial
   - CTA uses "See the satisfaction data" — invites exploration, not confrontation
   - `bg-slate-50` section background distinguishes it from the white sections around it

9. **Update `DevPortalComparePage.tsx`** — add "User Satisfaction" comparison row:

   Insert between "Analytics Depth" (feat-018) and "API Quality" (feat-009). Add to the comparison data structure:

   ```typescript
   const satisfactionRow = {
     feature: "User Satisfaction",
     icon: Star,
     dfva: {
       text: "Evidura is an independent analytics layer, not a curriculum management platform. User satisfaction comparisons are not directly applicable. For platform satisfaction data, see the independent review scores below for each curriculum management system.",
       strength: "neutral",
     },
     coursedog: {
       text: COMPETITOR_SATISFACTION_DATA.find(c => c.name === "Coursedog")?.g2Score
         ? `G2: ${getG2Display("Coursedog")}. Gartner: ${getGartnerDisplay("Coursedog")}`
         : "Review data not yet collected. Check back for updates.",
       strength: "unknown",
     },
     courseleaf: {
       text: "G2: 2.4/5 (4 reviews). Gartner: 2.5/5 (2 reviews). RFP.wiki satisfaction-vs-features gap: 1.8 points — the widest in the market. Users explicitly cite weak reporting as a limitation.",
       strength: "limited",
     },
   };
   ```

   The row renders G2 + Gartner scores for each platform where data is available. "No data" entries use muted styling. Source links to G2/Gartner/RFP.wiki are included.

### Phase 5 — Polish & Ship (estimated 1 day)

10. **Responsive testing pass** on all new components:
    - `SatisfactionGapCard`: bar chart readable at 768px, score labels don't overflow, methodology note collapses cleanly
    - Landing Page section: single-column layout, text sizes scale down, CTA button full-width on mobile
    - DevPortal comparison row: no horizontal overflow, score text wraps appropriately
    - Insights page: Satisfaction section integrates visually with existing Competitive Landscape and Market Validation sections

11. **Accessibility pass**:
    - `SatisfactionGapCard`: `aria-label` on bars ("CourseLeaf G2 score: 2.4 out of 5, 4 reviews"), source links have `aria-label` ("Open CourseLeaf G2 reviews (external link)")
    - Color is not the only indicator: text labels accompany all color-coded bars
    - External links: `rel="noopener noreferrer"` on all source URLs
    - Methodology note: `aria-expanded` on collapsible toggle
    - Landing page section: no accessibility issues (standard text + link)

12. **Copy review**: all satisfaction data must be factual and cited. Key rules:
    - Never describe CourseLeaf as "failing," "broken," "inadequate," "terrible," or any pejorative term
    - Always acknowledge small sample sizes (4 G2 reviews, 2 Gartner reviews)
    - The data is presented as "users report" not "DFVA claims"
    - Source URLs must point to live, verifiable pages
    - Landing page uses CourseLeaf as the lead example but broadens to "every platform"
    - The CTA is "See the satisfaction data" — neutral, evidence-seeking framing

13. **Commit** with message:
    ```
    feat: CourseLeaf G2 crisis response — satisfaction-based complementary positioning

    - Seed CompetitiveEvent for CourseLeaf G2 2.4/5 + Gartner 2.5/5 scores (impactScore 5, marketWindowEffect OPENING)
    - Add 5 MarketValidationSignal records (2 user_satisfaction, 1 competitor_weakness, 1 market_gap, 1 analytics_gap)
    - Update MarketWindowSnapshot with CourseLeaf G2 opportunity signal
    - Add COMPETITOR_SATISFACTION_DATA constant to apiCompetitiveData.ts
    - Create SatiffactionGapCard component with multi-competitor bar chart
    - Add "User Satisfaction" section to InsightsPage
    - Add "What users are saying" section to LandingPage
    - Add "User Satisfaction" comparison row to DevPortalComparePage
    ```

14. **Post-merge verification**:
    - Confirm CourseLeaf CompetitiveEvent appears in `/insights` via `getCompetitiveEvents` query
    - Confirm MarketWindowSnapshot still shows NARROWING with CourseLeaf entry
    - Confirm `SatisfactionGapCard` renders with CourseLeaf bar highlighted
    - Confirm "What users are saying" section on `/` with 2.4/5 lead statistic
    - Confirm "User Satisfaction" DevPortal row with G2/Gartner scores
    - Confirm no regression on existing CompetitiveThreatCard instances, Market Validation section, API Quality row
