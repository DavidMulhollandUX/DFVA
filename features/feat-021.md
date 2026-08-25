---
id: feat-021
name: "Modern Campus Reporting Gap — March 2026 Signal for Independent Analytics Layer"
status: draft
created: 2026-08-25
project: DFVA
priority: high
score: 8
type: pain_point
source: research-loop reviews
---

# Feature: Modern Campus Reporting Gap — Turning the Freshest Signal in the Category into a Platform-Specific Proof Point

## Description

On March 12, 2026, an enterprise Modern Campus customer published a 2.5/5 G2 review titled "Clunky Learner UI and Restrictive Reporting, Integrations, and Staff Notifications". It is the freshest individual review data point in the entire tracked competitive category — every other complaint in DFVA's evidence base predates it. Modern Campus holds roughly 25% market share, the second-largest installed base among tracked competitors (CourseLeaf leads at 29%). Roughly a quarter of the addressable market therefore sits on a platform whose most recent public evaluation names restrictive reporting as a headline complaint. Corroborating sentiment from RFP.wiki ("reporting and analytics are adequate for standard registrar use but not best-in-class") indicates the pattern is structural rather than one dissatisfied customer.

feat-020 (drafted, not yet built) tells the category-wide version of this story: Modern Campus appears there as one column inside a five-competitor matrix. This feature is the complementary single-platform deep dive. It captures the March 2026 review as structured competitive intelligence, decomposes its four-part complaint into named pain areas (reporting, integrations, staff notifications, learner-facing UI), and maps each area honestly against what DFVA does and does not do. Where DFVA has built the answer — independent durability analytics, an API-first data layer — the mapping says so. Where the complaint falls outside DFVA's domain (learner portals, staff notification workflows) the mapping says that too, because a proof point that overclaims is worth less than no proof point at all.

The deliverables: one `CompetitiveEvent` record using a new eventType value ("REVIEW_SIGNAL"), two `MarketValidationSignal` records (the G2 review as primary evidence, RFP.wiki sentiment as corroboration), a `MarketWindowSnapshot` append, a typed `MODERN_CAMPUS_GAP_DATA` constant powering the UI, a `ModernCampusGapProfile` panel rendered on /insights, and an idempotent seed script following the established house pattern (seedAssessmentCloudResponse.ts, seedCourseLeafAnalyticsResponse.ts, seedLightcast2026Report.ts).

## Vibe

**Forensic, fresh-dated, single-platform.** The leading fact is the date: "March 12, 2026 — the newest independent review anywhere in this category." The panel should read like an analyst brief on one vendor, not another tile in a competitor wall. Lead with scale and recency side by side (25% share, 2.5/5, March 2026), then break the review's four-part complaint into named pain areas, each with the quoted finding, the source badge, and DFVA's honest position. The gap-mapping uses three explicit states, visually distinct: filled (teal — DFVA covers this today), partial (amber), out of domain (neutral grey — deliberately not DFVA's lane). The grey states are the credibility play: showing where DFVA does not play makes the teal states believable. Evidura brand palette throughout; pure Tailwind CSS, no chart library. Think _Gartner vendor profile_ meets _consumer reports teardown_ — sourced quotes, dated claims, no adjectives doing work that evidence should do.

## User Stories

- As a **provost or deputy vice-chancellor (academic)** at an institution running Modern Campus, I want dated, third-party evidence that my platform's reporting limitations are recognised in the market — not just my own staff's complaints — so that I can justify funding DFVA as a complementary analytics layer without implying criticism of a procurement decision my institution already made.

- As the **DFVA product team**, I want the March 2026 Modern Campus review captured as structured competitive intelligence (CompetitiveEvent + MarketValidationSignal records) rather than a line in a research note, so that the "the gap is current, not legacy" claim is queryable, citable inside the product, and survives staff turnover.

- As a **university IT director** building a vendor-neutral business case for DFVA, I want a four-area breakdown showing exactly which parts of the Modern Campus complaint DFVA addresses (reporting, integrations) and which it deliberately does not (learner UI, staff notifications), so that my business case is credible to colleagues who would otherwise dismiss it as vendor spin.

- As a **prospective customer** arriving on /insights from the landing page, I want a single-platform profile that tells me within 30 seconds how big Modern Campus is (25% share), how fresh the evidence is (March 2026), and what specifically users complained about, so that I can decide quickly whether the platform-gap story applies to my institution.

- As a **curriculum committee chair** who has personally fought restrictive reporting tools for years, I want to see my frustration validated by an independent 2.5/5 review naming reporting as the primary pain point at the category's second-largest vendor, so that I can advocate for DFVA with evidence instead of anecdotes.

- As the **Evidura sales lead**, I want every claim on the Modern Campus profile panel attributed to its source (G2, RFP.wiki) with a link, so that any claim can be defended verbatim in a procurement conversation without legal or marketing review.


## Technical Design

### Architecture

This feature follows the established competitive-intelligence pattern (feats 013, 016, 017, 018) — seed data into the three existing market models, a typed static constant for presentation-shaped data, one new component, one page integration — with two deliberate differences from feat-020: the evidence is single-platform rather than category-wide, and the presentation is an honest capability mapping rather than a comparison grid.

The layers:

1. **Data Layer (seeded)** — 1 `CompetitiveEvent` (`competitor: "Modern Campus"`, `eventType: "REVIEW_SIGNAL"` — a new string value, no enum constraint to migrate), 2 `MarketValidationSignal` records (`category: "analytics_gap"`, G2 primary at credibilityScore 8, RFP.wiki corroborating at credibilityScore 8), and 1 `MarketWindowSnapshot` update that appends to `keyThreats` / `recommendedActions` without touching `status`. No new Prisma models, no schema migration.

2. **Data Infrastructure Layer** — a new `MODERN_CAMPUS_GAP_DATA` typed constant in `src/compass/data/modernCampusGapData.ts` (a new file; `marketValidationData.ts` mirrors seed records, while this constant is presentation-shaped). The constant carries the market context (share, review score, review date) plus the four pain areas, each mapped to DFVA's position with an explicit coverage status.

3. **Presentation Layer** — a `ModernCampusGapProfile` component rendered as a section on `InsightsPage.tsx`, placed inside the existing competitive landscape area. No Landing page section (category claims live there; platform depth belongs on /insights) and no DevPortal change (the comparison table there gains rows from feats 019/020 when those build — coordinating a fourth surface now multiplies merge risk for no incremental value).

4. **MCP Layer** — no changes. The MCP server's `cross_program_analysis` tool reads aggregate assessment data and is unaffected by positioning content.

```
┌──────────────────────────────────────────────────────────────────────┐
│        MODERN CAMPUS REPORTING GAP — SINGLE-PLATFORM PROFILE         │
│                                                                      │
│   Evidence:  G2 review 2.5/5 (Mar 12 2026) + RFP.wiki sentiment      │
│   Scale:     ~25% market share — second-largest installed base       │
└──────────────────────────────┬───────────────────────────────────────┘
                               │
        ┌──────────────────────┴───────────────────────┐
        │              DATA LAYER (seeded)             │
        │                                              │
        │  CompetitiveEvent ("REVIEW_SIGNAL")          │
        │  MarketValidationSignal x2                   │
        │    - G2 Mar 2026 (credibility 8)             │
        │    - RFP.wiki corroborating (credibility 8)  │
        │  MarketWindowSnapshot append (status stays   │
        │    NARROWING)                                │
        └──────────────────────┬───────────────────────┘
                               │ surfaced via existing public queries
        ┌──────────────────────┴───────────────────────┐
        │      DATA INFRASTRUCTURE (typed constant)    │
        │                                              │
        │  data/modernCampusGapData.ts                 │
        │  MODERN_CAMPUS_GAP_DATA: { context, areas[] }│
        │  areas[].status: fills_gap | partial |       │
        │                  out_of_domain               │
        └──────────────────────┬───────────────────────┘
                               │ import
        ┌──────────────────────┴───────────────────────┐
        │            PRESENTATION LAYER                │
        │                                              │
        │  ModernCampusGapProfile.tsx (new)            │
        │  InsightsPage.tsx section (existing page)    │
        │  /insights route (no route changes)          │
        └──────────────────────────────────────────────┘
```

The four pain areas and their honest mappings:

| Pain area | Review finding | DFVA position | Status |
|-----------|---------------|---------------|--------|
| Reporting | "Restrictive Reporting" | Independent 11-dimension durability scoring, program/portfolio/faculty dashboards | fills_gap |
| Integrations | "Restrictive ... Integrations" | API-first: structured program data, API key management + developer portal (feat-009) | fills_gap |
| Staff Notifications | "...Staff Notifications" | Not a DFVA capability today — workflow tooling is out of domain | out_of_domain |
| Learner UI | "Clunky Learner UI" | Deliberately not DFVA's lane — DFVA serves program-review analytics, not learner-facing portals | out_of_domain |


### Current State

| Component | Status | Details |
|-----------|--------|---------|
| `CompetitiveEvent` (Prisma model) | ✅ Exists | `schema.prisma` lines 243-258. Fields: `competitor`, `eventType`, `title`, `description`, `source`, `url?`, `dateOccurred`, `dateDiscovered`, `impactScore`, `marketWindowEffect`, `isActive`. Both `competitor` and `eventType` are free-text strings, so `eventType: "REVIEW_SIGNAL"` is a new value with no migration. |
| `MarketValidationSignal` (Prisma model) | ✅ Exists | `schema.prisma` lines 229-241. Fields: `source`, `excerpt`, `url`, `dateDiscovered`, `credibilityScore`, `category`, `relevantClaim`, `isActive`. Reused with `category: "analytics_gap"` — same category feat-019/feat-020 use, keeping query-level filtering coherent. |
| `MarketWindowSnapshot` (Prisma model) | ✅ Exists | `schema.prisma` lines 260-268. `keyThreats` and `recommendedActions` are `Json` arrays; latest snapshot status is NARROWING (set by the feat-017 lineage). This feature appends only. |
| `getValidationSignals` (Wasp query) | ✅ Operational | `operations.ts` lines 273-282; wired in `main.wasp.ts` COMPASS region. Public (no auth), returns active signals ordered by credibilityScore desc, take 200. New signals appear automatically. |
| `getCompetitiveEvents` (Wasp query) | ✅ Operational | `operations.ts` lines 285-294. Public, ordered by dateOccurred desc, take 200. Comment marks it deliberately public for /insights. New event appears automatically. |
| `getMarketWindowStatus` (Wasp query) | ✅ Operational | `operations.ts` lines 297-304. Returns latest snapshot by createdAt desc. Updated snapshot surfaces automatically. |
| `InsightsPage.tsx` | ⚠️ Extended | `src/compass/InsightsPage.tsx`. Carries the competitive landscape area: CompetitiveLandscape radar, CompetitiveThreatCards, Market Validation section, MarketWindowIndicator. This feature adds a Modern Campus profile section. Placement relative to feat-020's future "Universal Analytics Gap" section is an Open Question. |
| `CompetitiveThreatCard.tsx` | ✅ Reusable | `src/compass/CompetitiveThreatCard.tsx`. Supports `variant="opportunity"`. Renders the new REVIEW_SIGNAL event from the shared events query without modification. |
| `marketValidationData.ts` | ✅ No changes | `src/compass/data/marketValidationData.ts`. Exports `ValidationSignalData` (line 5), `CompetitiveEventData` (line 15), `MarketWindowData` (line 28), seeded `competitiveEvents` (line 43), empty `validationSignals` array (line 38). This feature adds its constant to a new file instead of growing this one. |
| `data/` directory convention | ✅ Established | `src/compass/data/` holds `dimensionEvidence.ts`, `marketValidationData.ts`, `rubric.ts`. A new `modernCampusGapData.ts` fits the existing layout. |
| Seed script pattern | ✅ Established | Existing scripts at `src/compass/`: seedAssessmentCloudResponse.ts, seedClassRankedAcquisitionResponse.ts, seedCourseLeafAnalyticsResponse.ts, seedLightcast2026Report.ts. All standalone, idempotent, runnable via `npx tsx`. New script follows suit. |
| `DevPortalPage.tsx` | ✅ No changes | Already references Modern Campus in its comparison content, but feats 019/020 own the next DevPortal rows and neither is built. Adding a Modern Campus row now would collide with both. Deferred (see Out of Scope). |
| Fragility Monitor (feat-012) | ✅ No changes | `FragilityIncident` model (`schema.prisma` lines 290-304) tracks HTML/data fragility incidents by platform. Modern Campus appears in its platform list, but reporting-gap positioning is a separate concern — no schema or UI overlap. |
| `sharedProgramData.ts` | ✅ No changes | 1968 lines, `CACHE_VERSION = 5` (line 2). PROGRAMS array untouched — this feature adds no program-scoped data, so no cache bump is required. |
| feat-019 / feat-020 artifacts | ❌ Not built | Verified absent: no `COMPETITOR_SATISFACTION_DATA`, no `UNIVERSAL_ANALYTICS_GAP_DATA`, no `AnalyticsGapMatrix`, no seedCourseLeafG2Crisis/seedUniversalAnalyticsGap files anywhere under `src/`. This feature must not import from either. Overlap handling is an Open Question. |
| `scanMarketDrift` (Wasp job) | ✅ No changes | Weekly PgBoss job (cron `0 0 * * 0`) in the COMPASS region of `main.wasp.ts`. Static seed data is not auto-updated; unaffected. |


### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| No new Prisma models | Reuse `CompetitiveEvent`, `MarketValidationSignal`, `MarketWindowSnapshot`. | The schema was designed with string-typed `competitor`/`eventType`/`category` columns precisely so new classes of competitive intelligence need no migration (documented rationale carried from feats 019/020). Adding a model for one vendor's review signal would be schema overhead for zero query benefit — all three public market queries already return what this feature needs. |
| New eventType value `"REVIEW_SIGNAL"` | Use a distinct eventType rather than reusing "ANNOUNCEMENT". | The event being recorded is not something Modern Campus did — it is what a customer said about them. Distinguishing vendor actions (`PRODUCT_LAUNCH`, `ACQUISITION`) from market sentiment (`REVIEW_SIGNAL`) keeps the timeline honest and lets the UI filter or badge them differently later. No enum constraint exists, so this is a data-only change. |
| Two MarketValidationSignals, not one | G2 review as primary + RFP.wiki sentiment as corroboration. | A single 2.5/5 review is an anecdote; two independent platforms pointing at reporting weakness is a pattern. The corroboration is what upgrades the claim from "one unhappy customer" to "structural gap", which is the whole strategic point. Both get credibilityScore 8 (see calibration below). |
| Honest three-state coverage mapping | Each pain area carries `status: fills_gap \| partial \| out_of_domain`. | DFVA has no learner portal and no staff-notification workflow. Claiming otherwise would hand a sceptical buyer the first objection. Marking two of four areas out_of_domain makes the two fills_gap rows credible — and matches the repo's evidence discipline (never state more than the source supports). |
| Profile panel, not another matrix row | A single-platform `ModernCampusGapProfile` component on /insights. | feat-020 already gives Modern Campus a column in the category grid. Depth is this feature's entire value-add: scale context, review score, dated freshness, per-area mapping. Cramming that into a matrix cell would flatten exactly what distinguishes it; building a second matrix would duplicate feat-020. |
| No Landing page section | Platform-specific depth stays on /insights only. | The landing page already carries sections from feats 004, 007, 009, 017, 018 plus feat-020's planned category section. Category-level claims belong there; per-vendor forensics do not. feat-010's revert showed marketing surfaces that outlive their relevance get deleted — keeping this off the highest-traffic page caps the blast radius if positioning shifts again. |
| Constant lives in new `data/modernCampusGapData.ts` | Separate file from `marketValidationData.ts`. | `marketValidationData.ts` mirrors seed records for the queries; the profile constant is presentation-shaped (context block + areas array with UI statuses). Different shape, different change cadence — co-locating them couples seed maintenance to UI copy edits. |
| Snapshot status stays NARROWING | Append to arrays only. | The March 2026 review is an opportunity signal, not a threat event. NARROWING was set by the feat-017 lineage and remains accurate while competitors ship analytics features. Flipping status on every pain-point signal would erode the indicator's meaning. |
| `dateOccurred` = 2026-03-12 | The event IS the review's publication. | For `PRODUCT_LAUNCH` events the house convention uses discovery dates because the event date is unknowable; here G2 stamps the review March 12, 2026, so using it is more precise, and `dateDiscovered` (2026-07-23) preserves the research-loop provenance. It also makes recency visible in the timeline ordering. |
| credibilityScore 8 for both signals | Below Gartner-sourced signals (9), at RFP.wiki level. | Follows the authority ladder established in feat-020's Open Questions reasoning: Gartner 9, G2/RFP.wiki 8. The primary evidence is user-generated (G2), so it does not outrank analyst sources; the RFP.wiki corroboration is aggregated, not original research. Keeps `getValidationSignals` ordering meaningful. |
| Seed deduplication guard against feat-020 | `seedModernCampusGap.ts` checks whether a feat-020-era Modern Campus analytics_gap signal exists before creating its own. | If feat-020 builds first, its seed creates a Modern Campus signal whose excerpt is the short "restrictive reporting" complaint. Running both seeds naively would produce near-duplicate signals on /insights. The existence check keys on source + excerpt similarity and skips creation when the slot is taken (detailed in Phase 1). |


### Dependencies

- **Wasp 0.24** — no new routes, queries, actions, or jobs. Existing public queries `getValidationSignals`, `getCompetitiveEvents`, `getMarketWindowStatus` surface all seeded records. Route `/insights` already exists.
- **React 19** — one new component (`ModernCampusGapProfile.tsx`); extend `InsightsPage.tsx` with a section import and render.
- **Prisma (PostgreSQL)** — seed inserts only: 1 CompetitiveEvent, 2 MarketValidationSignals, 1 snapshot findFirst + update. No schema changes, no migration files.
- **Existing models** — `CompetitiveEvent` (schema.prisma lines 243-258), `MarketValidationSignal` (lines 229-241), `MarketWindowSnapshot` (lines 260-268). All string-typed discriminator fields; no enum migrations.
- **New data file** — `src/compass/data/modernCampusGapData.ts` exporting `MODERN_CAMPUS_GAP_DATA` plus its interfaces (`CampusGapContext`, `CampusGapArea`). Fully typed, no `any`.
- **Seed script** — `src/compass/seedModernCampusGap.ts`, following the pattern of seedCourseLeafAnalyticsResponse.ts / seedLightcast2026Report.ts: standalone, idempotent, exportable for dbSeeds wiring, runnable via `npx tsx`.
- **Lucide React** (already in project) — icons: `CalendarClock` (freshness), `PieChart` (market share), `Quote` (review excerpt), `CheckCircle2` (fills_gap), `MinusCircle` (partial), `CircleSlash` (out_of_domain).
- **Tailwind CSS** — styling only; the three coverage states get distinct treatment with existing palette tokens (teal / amber / neutral slate).
- **Source URLs** (verified in feat-020 research; reused verbatim):
  - Modern Campus G2 reviews (primary): `https://www.g2.com/products/modern-campus-catalog/reviews`
  - RFP.wiki category page (corroborating sentiment): `https://www.rfp.wiki/education-training/higher-education-catalog-and-curriculum-management-software`
- **No external APIs, no new NPM packages** — all content is static seed data from research-loop findings.
- **No dependency on unbuilt features** — must not import `COMPETITOR_SATISFACTION_DATA` (feat-019) or `UNIVERSAL_ANALYTICS_GAP_DATA` (feat-020); both verified absent from the codebase.


## Scope

### In Scope (MVP — "Modern Campus Gap Profile v1")

- [ ] **Create 1 `CompetitiveEvent` record** via seed script: `competitor: "Modern Campus"`, `eventType: "REVIEW_SIGNAL"`, `title: "Modern Campus review names restrictive reporting — freshest evaluation in the category (2.5/5, March 2026)"`, `description` covering the four-part complaint, the 25% installed-base context, and the RFP.wiki corroboration, `impactScore: 4`, `marketWindowEffect: "OPENING"`, `dateOccurred: new Date("2026-03-12")`, `dateDiscovered: new Date("2026-07-23")`, `isActive: true`, source URLs.

- [ ] **Create 2 `MarketValidationSignal` records** via seed script:
  1. Primary — G2 enterprise review, March 12, 2026: excerpt quoting "Clunky Learner UI and Restrictive Reporting, Integrations, and Staff Notifications", `credibilityScore: 8`, `category: "analytics_gap"`, `relevantClaim`: validates that the reporting gap at the second-largest vendor is current, not legacy.
  2. Corroborating — RFP.wiki sentiment: excerpt quoting "adequate for standard registrar use but not best-in-class", `credibilityScore: 8`, `category: "analytics_gap"`, `relevantClaim`: confirms the pattern is structural across sources rather than a single dissatisfied customer.

- [ ] **Seed deduplication guard**: before creating signals, check for an existing Modern Campus `analytics_gap` signal from a feat-020-era seed; skip creation if found (prevents near-duplicate cards if feat-020 ships first).

- [ ] **Update latest `MarketWindowSnapshot`** via findFirst + update: append to `keyThreats` — "OPPORTUNITY: Modern Campus (25% share) named in freshest category review (G2, Mar 12 2026, 2.5/5) for restrictive reporting; corroborated by RFP.wiki"; append to `recommendedActions` — "Use the Modern Campus gap profile as the single-platform proof point when talking to institutions on Modern Campus; lead with freshness and scale". Do NOT change `status` (stays NARROWING).

- [ ] **Add `MODERN_CAMPUS_GAP_DATA` constant** in `src/compass/data/modernCampusGapData.ts`: exported interfaces `CampusGapContext` (share percentage, share note, review score, review date, review title quote, source URLs) and `CampusGapArea` (`area`, `reviewFinding`, `dfvaPosition`, `status: "fills_gap" | "partial" | "out_of_domain"`), plus one `MODERN_CAMPUS_GAP_DATA` object combining context with a four-entry areas array per the mapping table above. Fully typed, no `any`.

- [ ] **Create `ModernCampusGapProfile` component** at `src/compass/ModernCampusGapProfile.tsx`: header row with market-share stat, review score badge, and freshness callout ("March 12, 2026 — newest independent review in the category"); quoted review line with source attribution link; four-row coverage table where each row shows pain area, review finding, DFVA position, and a status chip (teal fills_gap / amber partial / neutral out_of_domain); footer line linking to /reports for the analytics counter-example. Pure Tailwind CSS, no chart library. Accepts the constant as props.

- [ ] **Integrate into `InsightsPage.tsx`**: render the profile inside the competitive landscape area, below existing CompetitiveThreatCards and above the Market Validation section. Section heading: "Platform Gap Profile: Modern Campus". Render the REVIEW_SIGNAL CompetitiveEvent beneath it using `CompetitiveThreatCard variant="opportunity"` fed by the shared events query.

- [ ] **Run seed and verify** against local dev database: CompetitiveEvent queryable with `competitor = "Modern Campus"` AND `eventType = "REVIEW_SIGNAL"`; both signals returned by `getValidationSignals`; snapshot still NARROWING with appended entries; re-running the seed creates no duplicates.

- [ ] **Regression test**: existing /insights sections unaffected — radar chart renders, prior threat cards intact, MarketWindowIndicator shows NARROWING, Market Validation list includes the two new signals without layout breakage.

- [ ] **Copy review**: every claim attributed and linked; quotes verbatim from cited sources; no pejorative characterisations of Modern Campus (framing is always "users report" / "[source] notes"); Australian English; serial comma omitted.

- [ ] **Mobile responsive**: profile stacks to single column at 768px; coverage table rows wrap without horizontal scroll.

- [ ] **Type-check clean**: `npx tsc --noEmit` passes in compass/app with the new data file and component.

- [ ] **Commit** with conventional commit message: `feat: modern campus gap profile — single-platform positioning off the March 2026 review signal`.

### Out of Scope (Future)

- Automated G2/RFP.wiki monitoring or scraping to keep the profile current (manual quarterly review for MVP)
- A Modern Campus catalog-data ingestion connector (real integration work — separate feature if demand justifies it)
- Per-vendor profiles for CourseLeaf, Coursedog, CourseLoop (feat-019/feat-020 cover those angles; replicate this pattern only if a comparable fresh signal emerges)
- Landing page exposure for any single-platform content
- DevPortal comparison changes (feats 019/020 own the next rows; avoid four-way merge conflicts)
- Staff-notification or learner-portal features to "close" the out_of_domain rows — they are out of domain on purpose
- Sentiment scoring or star-rating trend charts over time (no longitudinal dataset exists)
- Downloadable PDF version of the profile (future sales asset)
- Surfacing the profile through the MCP server's agent-facing tools


## Acceptance Criteria

- [ ] A `CompetitiveEvent` record exists with `competitor: "Modern Campus"`, `eventType: "REVIEW_SIGNAL"`, `impactScore: 4`, `marketWindowEffect: "OPENING"`, `dateOccurred` equal to 2026-03-12, and `isActive: true`. Its `title` contains "restrictive reporting" and its `description` references the G2 review (2.5/5, March 2026), the four complaint areas, the ~25% share context, and RFP.wiki corroboration.

- [ ] Two `MarketValidationSignal` records exist with `category: "analytics_gap"` and `isActive: true`. The primary record's `source` identifies G2 with the March 12, 2026 review as `excerpt`, `url` pointing at the Modern Campus G2 reviews page, `credibilityScore: 8`. The corroborating record's `source` identifies RFP.wiki, quotes the "not best-in-class" sentiment, links the category page, `credibilityScore: 8`. Both have a `relevantClaim` stating what the evidence validates for DFVA.

- [ ] Running `seedModernCampusGap.ts` twice produces no duplicate CompetitiveEvent or MarketValidationSignal records (existence checks verified by re-run + count query), and the latest `MarketWindowSnapshot` retains `status: "NARROWING"` while its `keyThreats` and `recommendedActions` arrays each contain exactly one new entry referencing this feature.

- [ ] If a feat-020-era seed has already created a Modern Campus analytics_gap MarketValidationSignal, running `seedModernCampusGap.ts` skips signal creation without erroring (deduplication guard demonstrably works).

- [ ] `MODERN_CAMPUS_GAP_DATA` is exported from `src/compass/data/modernCampusGapData.ts` with exported interfaces carrying no `any` fields. It contains one context object (25% share note, 2.5/5 score, March 12 2026 date, quoted review title, two source URLs) and exactly four area entries — Reporting (fills_gap), Integrations (fills_gap), Staff Notifications (out_of_domain), Learner UI (out_of_domain) — each with a verbatim-or-attributed `reviewFinding`.

- [ ] `ModernCampusGapProfile` renders on /insights inside the competitive landscape area: header shows share stat, score badge and freshness callout; the coverage table renders all four rows with distinct status chips; the review quote carries a working source link; footer links to /reports. No chart library is imported anywhere in the component.

- [ ] The REVIEW_SIGNAL event renders beneath the profile via `CompetitiveThreatCard variant="opportunity"` from the shared `getCompetitiveEvents` query — no new query or route is added to `main.wasp.ts`.

- [ ] Existing /insights behaviour is unregressed: radar chart renders, prior threat cards render, MarketWindowIndicator shows NARROWING, and the Market Validation section lists the two new signals alongside existing ones without layout breakage.

- [ ] All sections are responsive at 768px (profile stacks single-column; table rows wrap) and `npx tsc --noEmit` passes in compass/app.

- [ ] No claim in UI copy exceeds its source: every quote is attributed to G2 or RFP.wiki with a link; out_of_domain rows state DFVA does not cover those areas; no sentence describes Modern Campus pejoratively outside attributed user language.


## Open Questions

1. **Section ordering when feat-020 lands.** If feat-020's "Universal Analytics Gap" section ships first, should the Modern Campus profile sit above it (specific proof point before the category claim) or below (category claim, then the strongest example)? Working decision: below — the universal matrix sets up the argument, the profile proves it on one vendor. Revisit at build time; a one-line JSX move either way.

2. **Does the deduplication guard go far enough?** The guard skips signal creation when a Modern Campus analytics_gap signal already exists, but if this feature ships FIRST and feat-020 builds later, feat-020's seed has no reciprocal check (its spec predates this one). Options: (a) accept one near-duplicate pair, (b) patch seedUniversalAnalyticsGap.ts during feat-020 build, (c) have this seed write its records with a distinguishing marker feat-020 could key on. Working decision: (a) for MVP, note (b) in the feat-020 spec when it next regenerates.

3. **Should the share figure be shown as "~25%" or attributed inline?** The 25% figure comes from competitive-share research tracked across feats 019/020, not from G2. Showing "~25% installed base" without attribution risks overclaiming precision. Working decision: show "~25%" with a footnote-style attribution to the tracked competitive research rather than implying G2 published it.

4. **Company-level vs product-level framing.** The March 2026 review targets a Modern Campus catalog product; Modern Campus is a family (Direction, Catalog, Engage). MVP frames everything company-level ("Modern Campus") with the review context naming the catalog product. If sales conversations surface confusion about which product the complaint hits, add product-level granularity then.

5. **Should `partial` status be used at all?** No current area maps cleanly to partial — reporting and integrations are fills_gap, notifications and learner UI are out_of_domain. The status exists because the honest answer will not always be binary (e.g. future export features might make notifications genuinely partial). Keeping an unused enum member is deliberate: forcing every area into fills_gap/out_of_domain would tempt overclaiming later.

6. **ImpactScore 4 vs 5.** Category-defining findings (feat-020's CATEGORY_FINDING) carry impactScore 5. A single-platform review signal is significant but smaller: 4. Confirm this calibration holds once both features render side by side on /insights.


## Implementation Tasks

### Phase 1 — Seed Data (estimated 0.5 days)

1. **Create `src/compass/seedModernCampusGap.ts`** — standalone idempotent seed script:
   - Existence-check + create the CompetitiveEvent: `competitor: "Modern Campus"`, `eventType: "REVIEW_SIGNAL"`, title/description per Scope, `impactScore: 4`, `marketWindowEffect: "OPENING"`, `dateOccurred: new Date("2026-03-12")`, `dateDiscovered: new Date("2026-07-23")`.
   - Deduplication guard: `findFirst` on MarketValidationSignal where `category = "analytics_gap"` AND excerpt contains "Modern Campus" (or source is G2/RFP.wiki with Modern Campus context); skip signal creation when found.
   - Create the two MarketValidationSignal records per Scope (G2 primary, RFP.wiki corroborating).
   - Snapshot update via `findFirst` orderBy createdAt desc + `update` appending one entry each to `keyThreats` / `recommendedActions`; never touch `status`.

   ```typescript
   // Shape reference — full implementation follows house seed pattern
   export async function seedModernCampusGap(prisma: PrismaClient) {
     const existingEvent = await prisma.competitiveEvent.findFirst({
       where: { competitor: "Modern Campus", eventType: "REVIEW_SIGNAL" },
     });
     if (!existingEvent) { /* create per Scope */ }
     const existingSignal = await prisma.marketValidationSignal.findFirst({
       where: {
         category: "analytics_gap",
         OR: [
           { url: { contains: "modern-campus" } },
           { relevantClaim: { contains: "Modern Campus" } },
         ],
       },
     });
     if (!existingSignal) { /* create both signals per Scope */ }
     const snapshot = await prisma.marketWindowSnapshot.findFirst({
       orderBy: { createdAt: "desc" },
     });
     if (snapshot && !JSON.stringify(snapshot.keyThreats).includes("Modern Campus")) {
       /* append keyThreats + recommendedActions entries; status untouched */
     }
   }
   ```

2. **Register the seed** alongside the existing seeds (same wiring point as seedCourseLeafAnalyticsResponse.ts / seedLightcast2026Report.ts) so dev setup picks it up; keep it runnable standalone via `npx tsx`.

3. **Run and verify** against local dev DB (Postgres via `scripts/dev-db.sh start`, DATABASE_URL from `.env.server`):
   ```bash
   cd compass/app
   npx tsx src/compass/seedModernCampusGap.ts   # run twice — second run must no-op
   ```
   Verify counts and fields via a quick Prisma query or psql: event exists once, two signals exist, snapshot NARROWING with appended entries.

### Phase 2 — Data Infrastructure (estimated 0.5 days)

4. **Create `src/compass/data/modernCampusGapData.ts`** with exported `CampusGapContext` and `CampusGapArea` interfaces and the `MODERN_CAMPUS_GAP_DATA` constant per Scope — four area entries exactly as the mapping table specifies.

5. **Verify typing**: `npx tsc --noEmit` in compass/app passes; confirm no `any` fields and that statuses use the literal union (`"fills_gap" | "partial" | "out_of_domain"`), not bare strings.


### Phase 3 — UI Components (estimated 1 day)

6. **Create `ModernCampusGapProfile.tsx`** at `src/compass/`: props-typed against the constant's interfaces; header (PieChart share stat, score badge, CalendarClock freshness callout); Quote block with attribution link; four-row coverage table with status chips (CheckCircle2 teal / MinusCircle amber / CircleSlash slate); footer link to /reports. Pure Tailwind.

7. **Integrate into `InsightsPage.tsx`**: import the component and the constant; render the "Platform Gap Profile: Modern Campus" section below existing CompetitiveThreatCards, above Market Validation; beneath it render the REVIEW_SIGNAL event via `CompetitiveThreatCard variant="opportunity"` from the events query.

8. **Responsive pass**: 768px single-column stacking of the profile; coverage rows wrap without horizontal scroll.

### Phase 4 — Polish & Ship (estimated 0.5 days)

9. **Regression check /insights**: radar chart, prior threat cards, MarketWindowIndicator (NARROWING), validation signals list — all render as before plus the new section. Run existing component tests (`__tests__/`) and the e2e smoke for /insights if wired up.

10. **Copy review**: quotes verbatim + attributed; "~25%" figure carries its research attribution; Australian English; serial comma omitted; no unattributed pejoratives.

11. **Lint + type-check**: project lint command clean in compass/app; `npx tsc --noEmit` green.

12. **Commit** on the feature branch: stage the new files + InsightsPage change, conventional commit `feat: modern campus gap profile — single-platform positioning off the March 2026 review signal`.

