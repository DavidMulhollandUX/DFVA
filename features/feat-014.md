---
id: feat-014
name: "CourseLeaf Infrastructure Gap Play — Third-Party Tool Ecosystem as Go-to-Market"
status: approved
created: 2026-07-09
project: DFVA
priority: high
score: 8
type: competitor_weakness
source: research-loop GitHub intelligence
---

# Feature: CourseLeaf Infrastructure Gap Play — Third-Party Tool Ecosystem as Go-to-Market

## Description

CourseLeaf (29% market share — the largest curriculum management platform) has systemic API poverty, and the market is building around it. Four independent infrastructure projects now exist specifically to extract or wrap CourseLeaf data: (1) the University of Illinois built an Azure Function for basic data loading because no native export exists; (2) APInception is a meta-API wrapper built because CourseLeaf's native API is insufficient for programmatic access; (3) cc-coursemap maintains a dedicated CourseLeaf scraper for program/catalog data; and (4) UniPaith built a second independent CourseLeaf scraper. Every CourseLeaf customer wanting analytics must build custom infrastructure.

This feature records that evidence as structured competitive intelligence: a CompetitiveEvent framing the third-party tool ecosystem as a market-structure signal (an opportunity, not a threat), three MarketValidationSignal records documenting the ecosystem projects and the go-to-market implication they carry, a MarketWindowSnapshot update appending the opportunity entry, and a new `whatThisMeans` case in CompetitiveThreatCard delivering the strategic analysis. The strategic goal: institutions already trying to solve CourseLeaf's analytics gap with custom engineering are DFVA's pre-qualified audience — DFVA offers the missing analytics layer without touching CourseLeaf's workflow and without a rip-and-replace.

This continues the opportunity-framing pattern established by feat-018 (CourseLeaf Analytics Expansion) but shifts the evidence base: feat-018 documented CourseLeaf's own product moves; feat-014 documents what customers and third parties are forced to build around the platform — demand-side proof of the gap.

## Vibe

**Confident, evidence-led, customer-empathetic.** The tone conveys: "Institutions are voting with their engineering time. When four independent teams build extraction tooling around one platform, that is not a niche complaint — that is an unmet market, documented in public repositories." The framing must never mock CourseLeaf or its customers; the institutions building these tools are resourceful buyers who have already diagnosed their own problem. DFVA's position is respect plus relief: you should not need a custom scraper to get strategic answers about your own programs. Visual treatment: opportunity styling (impactScore 2 → 4/10 display, green/low-threat band), consistent with feat-018's complementary-layer positioning.

## User Stories

- As a **Deputy Vice-Chancellor (Academic)** at a CourseLeaf institution who has been told reporting requires a custom data project, I want to see that other universities resorted to building Azure Functions and scrapers to get their own data out, so that I understand the gap is structural — not a deficiency in how my team deployed CourseLeaf — and that an independent analytics layer exists that requires no custom infrastructure.

- As a **university IT architect** maintaining a homemade CourseLeaf extraction script, I want recognition that this is a common pattern with a maintained alternative, so that I can retire fragile one-off integration code in favour of a structured, schema-first assessment source.

- As the **DFVA product team**, I want the third-party tool ecosystem captured as structured CompetitiveEvent and MarketValidationSignal records, so that the Insights page surfaces demand-side evidence of the analytics gap alongside the supply-side events (feat-017, feat-013, feat-018).

- As a **registrar evaluating analytics spend**, I want the distinction between replacing CourseLeaf and adding DFVA on top made explicit, so that I can see the analytics layer decision does not reopen the curriculum platform procurement question.

## Technical Design

### Architecture

This feature follows the established three-layer competitive intelligence pattern (feat-017 → feat-013 → feat-018): data layer (CompetitiveEvent + MarketValidationSignal + MarketWindowSnapshot via an idempotent seed file), presentation layer (a new `whatThisMeans` case keyed on title substrings), and zero-change integration (InsightsPage sorting and CompetitiveTimeline labels already handle the new record).

```
┌──────────────────────────────────────────────────────────────────────────┐
│       COURSELEAF THIRD-PARTY TOOL ECOSYSTEM (evidence base)               │
│                                                                           │
│  4 independent projects built around CourseLeaf's API gap:                │
│  • University of Illinois — Azure Function for basic data loading         │
│  • APInception — meta-API wrapper for programmatic access                 │
│  • cc-coursemap — dedicated CourseLeaf scraper (program/catalog data)     │
│  • UniPaith — second independent CourseLeaf scraper                       │
│  → Reading: analytics demand exists at scale; the platform cannot         │
│    serve it natively; customers engineer around it themselves             │
│  → Window effect: OPENING — every custom build is a pre-qualified         │
│    DFVA use case in the wild                                              │
└───────────────────────────────────────────┬──────────────────────────────┘
                                            │
┌───────────────────────────────────────────▼──────────────────────────────┐
│              DFVA GO-TO-MARKET RESPONSE                                    │
│                                                                            │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  DATA LAYER                                                         │  │
│  │                                                                     │  │
│  │  CompetitiveEvent (Prisma):                                         │  │
│  │  • eventType: "ANNOUNCEMENT"                                        │  │
│  │  • competitor: "CourseLeaf"                                         │  │
│  │  • title: "Third-Party Tool Ecosystem Builds Custom                 │  │
│  │    Infrastructure Around CourseLeaf"                                │  │
│  │  • impactScore: 2 (DB 1-5 → displayed 4/10, low/opportunity)        │  │
│  │  • marketWindowEffect: "OPENING"                                    │  │
│  │                                                                     │  │
│  │  MarketValidationSignal records (3):                                │  │
│  │  • UniPaith scraper — second independent scraper confirms           │  │
│  │    systematic extraction pain (competitor_weakness, cred 5)         │  │
│  │  • Four-project ecosystem breadth — each build is a DFVA            │  │
│  │    use case in the wild (competitor_weakness, cred 5)               │  │
│  │  • Go-to-market: CourseLeaf installed base × API poverty =          │  │
│  │    addressable analytics layer, no rip-and-replace                  │  │
│  │    (market_gap, cred 4)                                             │  │
│  │                                                                     │  │
│  │  MarketWindowSnapshot update (append, keep status NARROWING):       │  │
│  │  • keyThreats += OPPORTUNITY entry on the tool ecosystem            │  │
│  │  • recommendedActions += "skip the custom build" positioning        │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  PRESENTATION LAYER                                                 │  │
│  │                                                                     │  │
│  │  CompetitiveThreatCard.tsx:                                         │  │
│  │  • New whatThisMeans case matching                                  │  │
│  │    title.includes("CourseLeaf") && title.includes("Infrastructure") │  │
│  │  • 4 paragraphs: demand-side proof, fragility of custom builds,     │  │
│  │    pre-qualified audience, complementary-layer window               │  │
│  │  • Rendered with default threat styling (low band = green)          │  │
│  │                                                                     │  │
│  │  InsightsPage.tsx:                                                  │  │
│  │  • No change — impactScore 2 routes the event into                  │  │
│  │    marketSignals (opportunities), not topThreats                    │  │
│  │                                                                     │  │
│  │  CompetitiveTimeline.tsx:                                           │  │
│  │  • No change — ANNOUNCEMENT label and OPENING badge exist           │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘
```

### Current State (as of 2026-08-26)

| Component | Status | Details |
|-----------|--------|---------|
| `CompetitiveEvent` (Prisma) | ✅ Exists | `compass/app/schema.prisma` line 243. `eventType` is a String (not enum) — `"ANNOUNCEMENT"` is valid and already labelled in `CompetitiveTimeline.tsx` line 22 (`ANNOUNCEMENT: "Announcement"`). |
| `MarketValidationSignal` (Prisma) | ✅ Exists | `compass/app/schema.prisma` line 229. `category` is a String — `"competitor_weakness"` used by feat-018 signals, `"market_gap"` matches the feature type. |
| `MarketWindowSnapshot` (Prisma) | ✅ Exists | `compass/app/schema.prisma` line 260. Latest snapshot status is `NARROWING`; feat-013 appended entries without changing status. |
| `getCompetitiveEvents` / `getValidationSignals` / `getMarketWindowStatus` queries | ✅ Operational | Public Wasp queries in `operations.ts`; no auth changes needed. |
| `CompetitiveThreatCard.tsx` | ✅ Exists | Exports `whatThisMeans(title)` returning `{ paragraphs: string[]; sourceUrl: string \| null }`. Cases present: "Assessment" + "Third Product Pillar" (feat-017), "CourseLeaf" + "Analytics" (feat-018), "ClassRanked" (feat-013). **No case for the infrastructure gap.** |
| `InsightsPage.tsx` | ✅ Exists | `topThreats` memo sorts by `impactScore` desc (top 3); `marketSignals` memo captures lower-impact events as opportunities. An `impactScore: 2` event flows into marketSignals with no code change. |
| `CompetitiveTimeline.tsx` | ✅ Exists | `EVENT_TYPE_LABELS` includes `ANNOUNCEMENT` (line 22); `OPENING` effect badge defined (line 26). No code change needed. |
| Seed files | ✅ Pattern established | `seedAssessmentCloudResponse.ts` (feat-017), `seedClassRankedAcquisitionResponse.ts` (feat-013), `seedCourseLeafAnalyticsResponse.ts` (feat-018). All idempotent: findFirst before create, append-with-guard for snapshot. |
| Infrastructure-gap CompetitiveEvent | ❌ Missing | No CompetitiveEvent documents the third-party tool ecosystem. The closest existing record is feat-018's PRODUCT_UPDATE ("CourseLeaf Adds Analytics Features to Product Listing"). |
| Infrastructure-gap MarketValidationSignals | ❌ Missing | feat-018's signal 2 covers API poverty broadly ("Open-source ecosystem analysis..."); UniPaith and the four-project go-to-market reading are not recorded anywhere. |
| `whatThisMeans` case for infrastructure gap | ❌ Missing | Default generic analysis would render instead of the strategic paragraphs. |

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| CompetitiveEvent eventType | `"ANNOUNCEMENT"` | The event is a market-structure observation surfaced through public project activity, not a vendor product move (PRODUCT_UPDATE/PRODUCT_LAUNCH are taken by feat-017/018 semantics). ANNOUNCEMENT is already labelled in the timeline. |
| impactScore | 2 (displayed 4/10, low/green) | This is an opportunity, not a threat — same scoring treatment as feat-018's opportunity event. It also routes the card into InsightsPage's `marketSignals` (opportunity) section rather than `topThreats`, which is where complementary-layer content belongs. |
| marketWindowEffect | `"OPENING"` | Each new third-party build widens the addressable gap: more institutions demonstrate the need and become reachable without a platform replacement pitch. |
| Signal categories | Two `competitor_weakness`, one `market_gap` | The first two document evidence (UniPaith; ecosystem breadth). The third draws the go-to-market conclusion. Categories reuse existing values — no schema or filter changes. |
| Snapshot guard marker | Match on `"tool ecosystem"` substring, not `"CourseLeaf"` | feat-018's snapshot update already appended keyThreats/recommendedActions entries containing "CourseLeaf". An `includes("CourseLeaf")` guard would silently skip this feature's entries as duplicates. The guard must check a marker unique to this feature's entries. |
| Snapshot status | Keep `NARROWING` (append only) | Consistent with feat-013/feat-018 behaviour: opportunity entries are appended; the overall competitive window status remains governed by the Coursedog consolidation trend (feat-013). |
| whatThisMeans match guard | `title.includes("CourseLeaf") && title.includes("Infrastructure")` | Distinct from the existing `"CourseLeaf" && "Analytics"` case. Both substrings appear in the planned title and are unlikely to collide with future vendor events. |
| Scope boundary | Insights surfaces only — no landing page sections, no standalone pages | feat-010's migration-pain surfaces (landing section + dedicated page) were reverted as irrelevant to the product. The kept precedent (feat-011/012/013/018) confines competitor intelligence to the insights data model and cards. |
| Seed idempotency | findFirst before create; unique source strings per signal | Same pattern as all three existing seeds. Signal sources chosen not to collide with feat-018's `"Open-source ecosystem analysis (research-loop GitHub intelligence)"`. |
| Standalone seed invocation | `npx tsx` dynamic import, not `require.main === module` | ESM package (`"type": "module"`): the CJS `require.main === module` footer used by older seed files fails under tsx. Exported seed function invoked via `npx tsx -e` with dynamic import (documented pitfall). |

### Dependencies

- **Wasp 0.24** — no new routes. Existing surfaces: Insights (`/insights`), Competitive Timeline (`/insights/competitive`).
- **Prisma (PostgreSQL)** — seed writes: 1 CompetitiveEvent, 3 MarketValidationSignals, 1 MarketWindowSnapshot append. No schema changes.
- **Existing `seedCourseLeafAnalyticsResponse.ts`** — reference pattern for structure and idempotency.
- **Existing `CompetitiveThreatCard.tsx`** — one new branch inside `whatThisMeans()`.
- **Vitest** — node-environment tests under `src/compass/__tests__/` (config includes `src/compass/__tests__/**/*.test.ts`).
- **No external APIs, no new NPM packages.**

## Scope

### In Scope (MVP — "Infrastructure Gap Go-to-Market v1")

- [ ] **Create 1 `CompetitiveEvent` record** via seed: `eventType: "ANNOUNCEMENT"`, `competitor: "CourseLeaf"`, `title: "Third-Party Tool Ecosystem Builds Custom Infrastructure Around CourseLeaf"`, `description` covering the four projects (Illinois Azure Function, APInception, cc-coursemap scraper, UniPaith scraper), the 29% installed base, and the reading that custom builds are demand-side proof of the analytics gap, `impactScore: 2`, `marketWindowEffect: "OPENING"`, `isActive: true`.
- [ ] **Create 3 `MarketValidationSignal` records** via seed: (1) UniPaith as the second independent CourseLeaf scraper — systematic extraction pain — credibilityScore 5, category `competitor_weakness`. (2) Four-project ecosystem breadth — each build is a DFVA use case in the wild — credibilityScore 5, category `competitor_weakness`. (3) Go-to-market implication: CourseLeaf installed base × API poverty = addressable analytics layer without rip-and-replace — credibilityScore 4, category `market_gap`.
- [ ] **Update latest `MarketWindowSnapshot`** via seed: keep status `NARROWING`; append one keyThreats OPPORTUNITY entry and one recommendedActions entry, guarded on a `"tool ecosystem"` substring marker (not `"CourseLeaf"` — see Key Decisions).
- [ ] **Create `seedCourseLeafInfrastructureGapResponse.ts`** exporting typed constants (`INFRASTRUCTURE_GAP_EVENT`, `INFRASTRUCTURE_GAP_SIGNALS`) plus `seedCourseLeafInfrastructureGapResponse(prisma)`, following the house idempotent pattern; no `require.main === module` footer (ESM).
- [ ] **Add `whatThisMeans` case in `CompetitiveThreatCard.tsx`** matching `title.includes("CourseLeaf") && title.includes("Infrastructure")`: 4 paragraphs on (1) demand-side proof — institutions vote with engineering time, (2) custom extracts are fragile bandaids over unstructured HTML, (3) these institutions are pre-qualified DFVA audiences — complementary, not rip-and-replace, (4) the window: while competitors sell workflow, DFVA owns the analytics layer above any platform including CourseLeaf's 29% base. sourceUrl: `https://github.com/unimelb-mdap/cc-coursemap`.
- [ ] **Write tests** (`src/compass/__tests__/courseLeafInfrastructureGap.test.ts`): data-contract assertions on the exported seed constants (shape, scores in range, categories, distinct sources vs feat-018) and `whatThisMeans` assertions (paragraph count, sourceUrl, substring matching, distinctness from the CourseLeaf-Analytics and default cases).
- [ ] **Run the full vitest suite** — no regressions.
- [ ] **Commit** with conventional commits, one commit per phase.

### Out of Scope (Future)

- Landing page sections, dedicated pages, or DevPortal rows for the infrastructure gap (feat-010 revert precedent — surfaces beyond insights were rejected as irrelevant to the product)
- Automated monitoring of GitHub for new CourseLeaf tooling (manual research-loop monitoring is the current process)
- Direct integration with any third-party CourseLeaf tool (cc-coursemap, APInception, UniPaith)
- Outreach tooling or lead lists derived from the ecosystem
- A CourseLeaf "compatibility" certification or partner programme
- Changes to InsightsPage, CompetitiveTimeline, or any query — existing rendering handles the new records

## Acceptance Criteria

- [ ] A `CompetitiveEvent` exists with `competitor: "CourseLeaf"`, `eventType: "ANNOUNCEMENT"`, `impactScore: 2`, `marketWindowEffect: "OPENING"`, `isActive: true`, and a description naming all four ecosystem projects.
- [ ] Three `MarketValidationSignal` records exist whose sources are distinct from each other and from feat-018's API-poverty signal; two carry `category: "competitor_weakness"` (credibilityScore 5) and one carries `category: "market_gap"` (credibilityScore 4).
- [ ] The latest `MarketWindowSnapshot` retains `status: "NARROWING"` and gains exactly one new keyThreats entry and one new recommendedActions entry per seed run — re-running the seed does not duplicate them.
- [ ] Re-running the entire seed never creates duplicate events or signals (findFirst guards hold).
- [ ] `CompetitiveThreatCard.whatThisMeans()` returns 4 paragraphs and a non-null `sourceUrl` containing `github.com` for titles containing both "CourseLeaf" and "Infrastructure".
- [ ] The new case is distinct from the CourseLeaf-Analytics case (different paragraphs and sourceUrl) and from the default case (different paragraph count and non-null URL).
- [ ] Titles containing "CourseLeaf" but not "Infrastructure" still hit the Analytics case or default — no regression to existing cases.
- [ ] The Insights page renders the event among market signals (opportunities), not top threats — behaviour implied by `impactScore <= 2` filtering, no code change required.
- [ ] All existing tests pass with no regressions.

## Open Questions

- [ ] **Should the snapshot status flip to OPENING given two consecutive OPENING-effect events (feat-018, feat-014)?** Decision: no. The overall window is governed by Coursedog's consolidation (feat-013 set NARROWING; reaffirmed). Opportunity entries are appended within a narrowing window — that tension is accurate: the category is consolidating while the CourseLeaf flank opens. Revisit if CourseLeaf ships real APIs.
- [ ] **Is `"ANNOUNCEMENT"` honest for an ecosystem observation rather than a vendor announcement?** Decision: yes, with the title carrying the nuance. The timeline renders the raw title; the type is a coarse bucket. Introducing a new eventType string would render unlabelled in the timeline (falls back to the raw value) — worse than reusing an existing label.
- [ ] **Should UniPaith get its own CompetitiveEvent?** Decision: no. One event per market-structure reading keeps the timeline legible; individual projects belong in signals. If a fifth independent project appears, revisit whether the pattern warrants escalation (higher impactScore, its own timeline entry).
- [ ] **Does the go-to-market signal overclaim?** Decision: keep it descriptive. The signal states that institutions needing analytics must currently build custom infrastructure and that DFVA serves that need without replacement — claims directly supported by the four projects. It does not claim pipeline, conversions, or institutional intent.

## Implementation Tasks

### Phase 1 — Data Layer (estimated 0.5 days)

1. **Write failing tests** at `compass/app/src/compass/__tests__/courseLeafInfrastructureGap.test.ts`:
   - Import `INFRASTRUCTURE_GAP_EVENT` and `INFRASTRUCTURE_GAP_SIGNALS` from `../seedCourseLeafInfrastructureGapResponse`.
   - Assert event contract: competitor, eventType, impactScore 2, marketWindowEffect "OPENING", isActive true, dateOccurred/dateDiscovered are Date instances, description mentions Illinois/Azure, APInception, cc-coursemap, and UniPaith.
   - Assert signal contracts: exactly 3; categories ⊆ {competitor_weakness, market_gap}; expected counts of each; credibilityScores within 1–5 with the specified values; sources pairwise distinct; no source colliding with feat-018's `"Open-source ecosystem analysis"` prefix; excerpts and URLs non-empty; URLs parse via `new URL()`.
   - Run vitest — expect failure (module does not exist yet).

2. **Implement the seed** at `compass/app/src/compass/seedCourseLeafInfrastructureGapResponse.ts`:
   - Export `INFRASTRUCTURE_GAP_EVENT` and `INFRASTRUCTURE_GAP_SIGNALS` constants.
   - Export `async function seedCourseLeafInfrastructureGapResponse(prisma: PrismaClient)` implementing findFirst-before-create for the event and each signal, and the guarded MarketWindowSnapshot append (marker: `"tool ecosystem"`).
   - Make the tests pass; run the suite again.

3. **Commit**: `test(compass): infra-gap seed data contracts (feat-014 phase 1)` then `feat(compass): CourseLeaf infrastructure gap seed (feat-014 phase 1)`.

### Phase 2 — Presentation Layer (estimated 0.5 days)

4. **Write failing `whatThisMeans` tests** (extend `courseLeafInfrastructureGap.test.ts`):
   - The planned title returns 4 paragraphs and a `sourceUrl` containing `github.com/unimelb-mdap/cc-coursemap`.
   - A variant title containing both substrings still matches (guard robustness).
   - Distinctness from the CourseLeaf-Analytics case and the default case.
   - Existing titles unaffected: Analytics title still hits its case; an unrelated title still gets the 2-paragraph default.
   - Run vitest — expect failures.

5. **Add the case** in `CompetitiveThreatCard.tsx`: new `if` branch before the default return, matching `title.includes("CourseLeaf") && title.includes("Infrastructure")`, returning the 4 strategic paragraphs and the cc-coursemap sourceUrl. Place it adjacent to the existing CourseLeaf-Analytics branch.

6. **Run the full suite** (`npx vitest run`) — all green, no regressions.

7. **Commit**: `test(compass): infra-gap whatThisMeans coverage (feat-014 phase 2)` then `feat(compass): infrastructure gap analysis case (feat-014 phase 2)`.

### Phase 3 — Bookkeeping

8. **Update `feature_list.json`**: feat-014 `status: done`, refresh `loops.dev_loop` counters and `updated`. Commit: `chore(dev-loop): mark feat-014 done`.
