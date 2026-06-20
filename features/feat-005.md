---
id: feat-005
name: "Lightcast Data Freshness — Real-Time LMI Alternative"
status: draft
created: 2026-06-16
project: DFVA
---

# Feature: Real-Time LMI Alternative — Outpacing Lightcast on Data Freshness

## Description

Gartner reviews confirm Lightcast data is "years behind" and "could be outdated." Combined with high pricing (AUD $255K+ institutional contracts), the incumbent LMI vendor's data freshness is a documented, defensible weakness. DFVA can exploit this gap by supplementing its static QILT/JSA/AIOE data layer with **real-time labour market signals**: live job posting trends, AI-synthesized demand indicators, and recency metadata that make data staleness visible to decision-makers.

This feature doesn't aim to *replace* Lightcast's data aggregation business — that's a capital-intensive moat game. Instead, it positions DFVA as the **fresher, more responsive** analytics layer. While Lightcast delivers annual reports built on data that may be 18–36 months old, DFVA surfaces signals that update weekly or daily. The competitive narrative: "You don't need a $250K subscription to know what the market needed two years ago."

The feature adds three capabilities: (1) a real-time job posting signal pipeline that ingests and scores demand trends per field, (2) data freshness metadata across all existing market data sources so users can see *when* each signal was last updated, and (3) an AI-synthesized demand signal that combines multiple sources into a single, interpretable momentum indicator, updated on a configurable cadence.

## Vibe

Responsive. Current. Trustworthy-through-transparency. Where Lightcast feels like an annual government report, DFVA's market layer should feel like a live dashboard — data that moves, timestamps that are honest, signals that reflect *this quarter*, not last cycle. The visual language should communicate recency: "last updated" timestamps, freshness badges (🟢 live / 🟡 recent / 🔴 stale), and sparklines that show trend direction, not just static snapshots.

## User Stories

- As a **Program Director** reviewing my program's DFVA score, I want to see whether the market data behind my D10 score is current (this quarter) or stale (2 years old) so I know whether to trust the assessment or request a refresh.

- As a **Faculty Dean** comparing my programs against peers, I want to see real-time job posting trends for my discipline (not just annual employment rates) so I can make curriculum decisions based on what employers are hiring for *right now*.

- As a **Deputy Vice-Chancellor (Academic)** presenting portfolio health to Council, I want to cite market signals that are demonstrably fresher than Lightcast's annual reports so I can justify investment in DFVA as a more responsive intelligence tool.

- As the **DFVA product team**, I want an automated pipeline that ingests job posting data from public sources (SEEK API, Adzuna, JSA Internet Vacancy Index) and scores demand momentum per field so market signals stay current without manual data entry.

- As a **careers/employability team member** who currently uses Lightcast, I want to see DFVA's market layer as a viable supplement — fresher data for tactical decisions, even if Lightcast remains the longitudinal benchmark.

## Technical Design

### Architecture

This feature extends the existing `marketData.ts` / `marketDataService.ts` data layer with a new real-time signal pipeline. The architecture follows the same pattern as the async assessment pipeline (create job → background processing → update status), keeping the Wasp app responsive.

```
┌──────────────────────────────────────────────────────────────────┐
│                    DATA INGESTION LAYER                           │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐ │
│  │ SEEK API      │  │ Adzuna API   │  │ JSA Internet Vacancy     │ │
│  │ (job counts   │  │ (salary +    │  │ Index (monthly CSV,      │ │
│  │  by category) │  │  title data) │  │  gov.au open data)       │ │
│  └──────┬───────┘  └──────┬───────┘  └────────────┬─────────────┘ │
│         │                 │                        │               │
│         └─────────┬───────┴────────────────────────┘               │
│                   │                                                │
│         ┌─────────▼──────────────────────────────┐                │
│         │        Signal Ingestion Pipeline        │                │
│         │  scripts/ingest-job-postings.ts          │                │
│         │  - Fetches from 3 sources               │                │
│         │  - Normalizes to MarketFieldData shape   │                │
│         │  - Computes momentum scores              │                │
│         │  - Stores in new DB models               │                │
│         └─────────┬──────────────────────────────┘                │
└───────────────────┼──────────────────────────────────────────────┘
                    │
┌───────────────────▼──────────────────────────────────────────────┐
│                    STORAGE LAYER                                   │
│                                                                   │
│  ┌────────────────────────────┐  ┌──────────────────────────────┐ │
│  │ MarketSignalSnapshot        │  │ DataSourceFreshness           │ │
│  │ - field: string             │  │ - source: string              │ │
│  │ - jobPostingCount: number   │  │ - lastFetched: DateTime        │ │
│  │ - avgSalary: number         │  │ - dataVintage: string (e.g.    │ │
│  │ - momentumScore: -1..+1    │  │   "Q1 2026")                  │ │
│  │ - topSkills: string[]       │  │ - freshness: LIVE|RECENT|STALE │ │
│  │ - sourceBreakdown: Json     │  │ - nextRefreshDue: DateTime     │ │
│  │ - fetchedAt: DateTime       │  └──────────────────────────────┘ │
│  └────────────────────────────┘                                    │
│                                                                   │
│  ┌────────────────────────────┐                                   │
│  │ AI Demand Synthesis         │                                   │
│  │ - field: string             │                                   │
│  │ - synthesisText: string     │  ← LLM-generated narrative from  │
│  │ - confidenceScore: 0..1    │    combined signals               │
│  │ - keyDrivers: string[]      │                                   │
│  │ - generatedAt: DateTime     │                                   │
│  └────────────────────────────┘                                   │
└──────────────────────────────────────────────────────────────────┘
                    │
┌───────────────────▼──────────────────────────────────────────────┐
│                    PRESENTATION LAYER                              │
│                                                                   │
│  MarketDataFreshness.tsx    — freshness badges on program cards   │
│  JobPostingTrend.tsx        — sparkline + momentum indicator      │
│  DemandSynthesis.tsx        — AI-generated narrative block         │
│  DataSourcePanel.tsx        — "where this data comes from" panel  │
│                                                                   │
│  Updated: MarketSignalCorrelation.tsx (from feat-004) —           │
│  adds freshness badges and real-time signal toggle                │
└──────────────────────────────────────────────────────────────────┘
```

### Current State (as of 2026-06-16)

| Component | Status | Details |
|-----------|--------|---------|
| `marketData.ts` — static field data | ✅ Exists | 11 broad fields, QILT GOS 2024, JSA 2025, AIOE indices. All data carries `year: 2024` |
| `marketDataService.ts` — enrichment | ✅ Exists | `enrichWithMarketData()` updates D10 scores with static data |
| `getFieldForCourse()` — field mapping | ✅ Exists | Maps 80+ course codes to 11 broad fields |
| `scoreOutcomeEvidence()` | ✅ Exists | Scores D10 based on employment rate, 3yr rate, median salary |
| `scoreLabourMarketDurability()` | ✅ Exists | Scores D11 based on shortage status, AI exposure, 3yr employment |
| Real-time job posting ingestion | ❌ Missing | No pipeline for live job market data |
| AI-synthesized demand signals | ❌ Missing | No LLM-based synthesis of market signals |
| Data freshness metadata | ❌ Missing | No tracking of when each data source was last updated |
| Freshness UI (badges, timestamps) | ❌ Missing | No visual indicator of data recency |
| MarketSignalSnapshot model | ❌ Missing | No Prisma model for time-series market signal storage |
| DataSourceFreshness model | ❌ Missing | No model tracking source-level freshness |
| AIDemandSynthesis model | ❌ Missing | No model for LLM-generated demand narratives |
| SEEK API integration | ❌ Missing | No integration with SEEK job posting data |
| Adzuna API integration | ❌ Missing | No integration with Adzuna salary/title data |
| JSA IVI integration | ❌ Missing | No integration with JSA Internet Vacancy Index |
| Market momentum scoring | ❌ Missing | No computed momentum indicator (direction + velocity) |
| Field-level trend sparklines | ❌ Missing | No time-series visualization of demand |

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Primary real-time source | SEEK API (AU job postings by category) | Largest AU job board; documented API; covers all 11 DFVA fields. Adzuna as secondary for salary data. JSA IVI as government benchmark. |
| Ingestion cadence | Weekly cron (Monday 6am AEST) | Balances freshness with API rate limits. Weekly is 52x fresher than Lightcast's annual cycle. |
| Momentum scoring algorithm | Rolling 4-week average vs 12-week baseline, normalized to -1..+1 | Simple, interpretable, doesn't require ML. A program director can understand "hiring momentum for IT is +0.7 this month." |
| AI synthesis trigger | On-demand (user clicks "Generate Synthesis") + weekly cron for all fields | On-demand for interactive use; cron keeps baseline fresh. Uses existing OpenAI integration (`gpt-4o-mini`). |
| Data freshness model | `DataSourceFreshness` table with `freshness` enum (LIVE < 7d, RECENT < 30d, STALE > 30d) | Simple, visible, honest. Users can see exactly how current each signal is. |
| MarketSignalSnapshot storage | Time-series table — new row per field per week | Enables trend visualization (sparklines) and historical comparison. ~11 fields × 52 weeks = 572 rows/year — negligible storage. |
| SEEK API auth | API key in `.env.server` (free tier: 1000 req/month) | Free tier sufficient for weekly field-level queries. Upgrade path if usage grows. |
| Adzuna API auth | API key + app ID in `.env.server` (free tier: 100 req/month) | Supplementary source — salary data only. Free tier sufficient. |
| JSA IVI ingestion | Static CSV download from data.gov.au (monthly) | Government open data — no API key needed. Monthly matches JSA's publication cadence. |
| Fallback when sources unavailable | Graceful degradation: show last known signal with "last updated" timestamp; mark as STALE after 7 days of failed fetches | Don't break the UI when an API is down. Honest staleness is better than missing data. |
| Market momentum in D10 scoring | Supplementary, not primary — D10 still based on QILT annual data; momentum shown as context | Regulatory credibility comes from government statistics (QILT, JSA). Real-time signals add decision context but don't replace the evidentiary base. |
| LLM synthesis model | `gpt-4o-mini` via existing OpenAI integration | Consistent with on-demand DFVA pipeline; ~$0.00015/field/synthesis. 11 fields × weekly = $0.00165/week ≈ $0.09/year. |

### Dependencies

- **Wasp 0.22** — new `job` for weekly ingestion; new queries for market signal data
- **Prisma (PostgreSQL)** — new models: `MarketSignalSnapshot`, `DataSourceFreshness`, `AIDemandSynthesis`
- **React 19** — new market data UI components
- **Recharts** — sparkline and trend visualizations (already in project)
- **SEEK API** (new external dependency) — `https://api.seek.com.au/v2/jobs/search` for category-level counts
- **Adzuna API** (new external dependency) — `https://api.adzuna.com/v1/api/jobs/au` for salary and title data
- **JSA Internet Vacancy Index** (new external dependency) — CSV from `https://data.gov.au/data/dataset/internet-vacancy-index`
- **OpenAI API** (existing) — `gpt-4o-mini` for AI demand synthesis
- **node-cron** or Wasp `job` with `schedule` — for weekly ingestion
- **PapaParse** (already in project via feat-004) — JSA CSV parsing

## Scope

### In Scope (MVP — "Fresh Signals v1")

- [ ] **MarketSignalSnapshot Prisma model + migration:** Time-series table storing per-field job posting counts, avg salary, momentum score, top skills, source breakdown per fetch
- [ ] **DataSourceFreshness Prisma model + migration:** Source-level freshness tracking (SEEK, Adzuna, JSA IVI, QILT, AIOE) with `lastFetched`, `dataVintage`, `freshness` enum, and `nextRefreshDue`
- [ ] **AIDemandSynthesis Prisma model + migration:** LLM-generated narrative synthesis per field with confidence score and key drivers
- [ ] **SEEK job posting ingestion script:** `scripts/ingest-job-postings.ts` — queries SEEK API by category, normalizes to field, stores `MarketSignalSnapshot` records
- [ ] **Adzuna salary ingestion:** Extends ingestion script with Adzuna API for salary and job title data
- [ ] **JSA IVI CSV ingestion:** Downloads monthly IVI CSV from data.gov.au, parses, stores as `MarketSignalSnapshot` with `source: 'JSA_IVI'`
- [ ] **Momentum scoring function:** `computeMomentum(field: string): number` — rolling 4wk vs 12wk baseline normalized to -1..+1
- [ ] **Data freshness computation:** `computeFreshness(source: string): Freshness` — LIVE (<7d), RECENT (<30d), STALE (>30d)
- [ ] **Weekly ingestion cron job:** Wasp `job` with `schedule: "0 6 * * 1"` (Monday 6am AEST) — fetches all sources, computes momentum, updates freshness
- [ ] **AI demand synthesis job:** Wasp `action` — calls `gpt-4o-mini` with combined market signals, stores `AIDemandSynthesis` record. Prompt includes: job posting count trend, salary trend, JSA shortage status, AIOE exposure
- [ ] **Wasp query `getMarketSignals(field: string)`:** Returns latest `MarketSignalSnapshot` + `DataSourceFreshness` records for a field, with 12-week history for sparklines
- [ ] **Wasp query `getDemandSynthesis(field: string)`:** Returns latest `AIDemandSynthesis` for a field
- [ ] **MarketDataFreshness UI component:** Badge on program cards and report pages showing overall signal freshness (🟢 LIVE / 🟡 RECENT / 🔴 STALE)
- [ ] **JobPostingTrend sparkline component:** 12-week sparkline of job posting counts per field with momentum score and direction arrow
- [ ] **DemandSynthesis UI component:** AI-generated narrative block with confidence score, shown on program detail page below dimension radar
- [ ] **DataSourcePanel UI component:** Expandable panel showing each data source with its vintage, freshness, and last-updated timestamp
- [ ] **Update `enrichWithMarketData()`** to include `marketMomentum` from real-time signals (supplementary to static D10 score)
- [ ] **Update ReportDetailPage** to include JobPostingTrend, DemandSynthesis, and DataSourcePanel below the dimension radar
- [ ] **Update MarketSignalCorrelation** (from feat-004) to show freshness badges and toggle between static/real-time data

### Out of Scope (Future)

- Full SEEK Talent Search API integration (occupation-level granularity — requires paid tier)
- LinkedIn Talent Insights integration (requires enterprise contract; $10K+/year)
- Indeed job posting API (no public AU API)
- Real-time scraping of individual employer career pages
- Predictive modelling ("forecast D10 score 12 months from now")
- Automated Lightcast data comparison (side-by-side freshness benchmark)
- Custom alerting: "IT job postings dropped 30% this month — review MC-CS and MC-DATASC"
- Field-to-occupation granular mapping (current field-level aggregation is sufficient for v1)
- Historical backfill beyond 12 weeks (start fresh from go-live date)
- User-configurable ingestion cadence (weekly is hardcoded for v1)

## Acceptance Criteria

- [ ] Weekly cron job runs successfully: fetches SEEK, Adzuna, and JSA IVI data for all 11 fields; stores `MarketSignalSnapshot` records; updates `DataSourceFreshness`; computes momentum scores
- [ ] SEEK API returns job counts per category that map to DFVA fields (IT, Engineering, Health, Business, Architecture, Creative Arts, Education, Law, Science, Agriculture, Other)
- [ ] Momentum score is computed correctly: a field with 4-week average 20% above 12-week baseline should show positive momentum (+0.2 to +0.4); a field with 4-week average 20% below baseline should show negative momentum
- [ ] DataSourceFreshness shows correct status: SEEK marked LIVE if fetched within 7 days, RECENT within 30 days, STALE beyond 30 days
- [ ] JobPostingTrend sparkline renders 12 data points (weeks) as a Recharts sparkline with the momentum score and direction arrow (↗ positive, → flat, ↘ negative)
- [ ] DemandSynthesis generates a coherent 2-4 sentence narrative from current market signals — not a template fill but actual LLM synthesis
- [ ] Program detail page shows MarketDataFreshness badge (🟢/🟡/🔴) next to the D10 score
- [ ] DataSourcePanel expands to show all sources with vintage dates — QILT (2024), JSA (2025), SEEK (this week's date), Adzuna (this week's date), JSA IVI (latest month)
- [ ] When SEEK API is unavailable, the cron job logs the error, marks SEEK freshness as STALE, and continues with Adzuna and JSA IVI (graceful degradation)
- [ ] New Prisma migration runs without data loss; existing static market data unaffected
- [ ] No regression on existing AssessorPage, ReportsPage, or InsightsPage
- [ ] AI synthesis prompt produces deterministic-enough output: same signals should produce substantively similar narratives (within ~20% edit distance)

## Open Questions

- [ ] **SEEK API rate limits:** The free tier allows 1,000 requests/month. At 11 fields × 1 request/field/week = 44 requests/month — well within limits. But if we move to occupation-level granularity (100+ occupation categories), we'd need the paid tier. Decision: start with field-level aggregation; monitor usage.
- [ ] **Adzuna API coverage:** Adzuna's AU job listing coverage is ~60-70% of SEEK's. Salary data is self-reported in job ads — may skew high. Should we adjust Adzuna salary data with a known deflator, or present as-is with caveat text?
- [ ] **JSA IVI lag:** JSA publishes IVI monthly with a ~6-week lag (e.g., May data published mid-July). This means JSA IVI is technically "stale" on arrival by our freshness criteria. Should JSA IVI have a different freshness threshold (60 days instead of 30)?
- [ ] **Field-to-category mapping:** SEEK uses its own category taxonomy (Classification field in API), not DFVA's 11 broad fields. The mapping from SEEK categories → DFVA fields needs manual curation. How many SEEK categories map to "Other"? Should we create a "No clear mapping" field or distribute proportionally?
- [ ] **Momentum score threshold for alerts:** At what momentum score should the UI flag a field as "notable change"? ±0.3? ±0.5? This determines when the sparkline shows a warning colour (amber/red) vs neutral.
- [ ] **AI synthesis freshness:** Should the LLM synthesis regenerate weekly with each cron run, or only when the user explicitly requests it? Weekly auto-generation keeps the narrative fresh but adds ~$0.00165/week in API costs. On-demand is cheaper but means synthesis could be stale.
- [ ] **Data retention for MarketSignalSnapshot:** Keep all weekly snapshots indefinitely (trivial storage: ~572 rows/year × 11 fields), or prune after 52 weeks? Indefinite retention supports year-over-year trend analysis; pruning simplifies the query layer.
- [ ] **Competitive positioning:** Should the UI explicitly name Lightcast ("Data fresher than Lightcast's 2024 annual reports") or keep it generic ("Updated weekly vs annual industry benchmarks")? Explicit naming is bolder marketing but risks looking petty. Generic is more professional but loses competitive sharpness.

## Implementation Tasks

### Phase 1 — Data Models & Migration (estimated 2 days)

1. Add Prisma models to `compass/app/schema.prisma`: `MarketSignalSnapshot`, `DataSourceFreshness`, `AIDemandSynthesis`
   ```prisma
   model MarketSignalSnapshot {
     id              String   @id @default(uuid())
     field           String
     source          String   // "SEEK", "ADZUNA", "JSA_IVI"
     jobPostingCount Int?
     avgSalary       Float?
     momentumScore   Float?
     topSkills       String[] // JSON array of top 10 skill keywords
     sourceBreakdown Json?
     fetchedAt       DateTime @default(now())

     @@index([field, fetchedAt])
     @@index([source, fetchedAt])
   }

   model DataSourceFreshness {
     id              String   @id @default(uuid())
     source          String   @unique // "SEEK", "ADZUNA", "JSA_IVI", "QILT_GOS", "JSA_SPL", "AIOE"
     lastFetched     DateTime
     dataVintage     String   // e.g. "2024", "Q1 2026", "June 2026"
     freshness       String   // "LIVE", "RECENT", "STALE"
     nextRefreshDue  DateTime
     errorMessage    String?
     updatedAt       DateTime @updatedAt
   }

   model AIDemandSynthesis {
     id              String   @id @default(uuid())
     field           String
     synthesisText   String   // 2-4 sentence LLM narrative
     confidenceScore Float    // 0..1
     keyDrivers      String[] // e.g. ["AI skills demand +34%", "graduate salaries rising"]
     generatedAt     DateTime @default(now())

     @@index([field, generatedAt])
   }
   ```
2. Create migration: `cd compass/app && echo "add market_signal_snapshot data_source_freshness ai_demand_synthesis" | wasp db migrate-dev`
3. Add seed function to populate `DataSourceFreshness` with initial state (all sources marked STALE, `dataVintage` set to known values: QILT=2024, JSA=2025, AIOE=2021)
4. Register new entities in `main.wasp` for Wasp query/action generation

### Phase 2 — Ingestion Pipeline (estimated 3–4 days)

5. Create `scripts/ingest-job-postings.ts` — TypeScript CLI script (run via `npx tsx`) that:
   - Reads SEEK_API_KEY, ADZUNA_APP_ID, ADZUNA_API_KEY from `.env`
   - Fetches SEEK job counts by category for all 11 DFVA fields
   - Fetches Adzuna salary data by category
   - Downloads and parses JSA IVI CSV from data.gov.au
   - Normalizes all data to `MarketSignalSnapshot` records
   - Computes momentum scores using `computeMomentum()`
   - Updates `DataSourceFreshness` records with `lastFetched` and computed `freshness`
   - Stores everything via direct Prisma client (not through Wasp operations, for cron compatibility)
6. Create `src/compass/momentumScoring.ts`:
   - `computeMomentum(field: string, weeksWindow: number = 4, baselineWeeks: number = 12): number`
   - `computeFreshness(lastFetched: Date, thresholds?: {live: number, recent: number}): Freshness`
7. Create `src/compass/signalNormalizer.ts`:
   - `normalizeSeekCategory(seekCategory: string): string` — maps SEEK categories to DFVA fields
   - `normalizeAdzunaCategory(adzunaCategory: string): string` — maps Adzuna categories to DFVA fields
   - `mapJsaIviToField(iviOccupationGroup: string): string` — maps JSA IVI occupation groups to DFVA fields
8. Define SEEK→DFVA field mapping table (collaborative task — needs domain knowledge):
   - IT: "Information & Communication Technology"
   - Engineering: "Engineering"
   - Health: "Healthcare & Medical"
   - Business: "Accounting", "Banking & Financial Services", "Consulting & Strategy", "Marketing & Communications"
   - Architecture: "Construction", "Design & Architecture"
   - Creative Arts: "Advertising, Arts & Media"
   - Education: "Education & Training"
   - Law: "Legal"
   - Science: "Science & Technology"
   - Agriculture: "Farming, Animals & Conservation"
   - Other: remaining unmapped categories aggregated
9. Create Wasp job `ingestMarketSignals` with `schedule: "0 6 * * 1"` (Monday 6am AEST) that calls the ingestion script logic
10. Create Wasp action `triggerSignalIngestion` for manual/admin-triggered ingestion (bypasses cron schedule)

### Phase 3 — AI Demand Synthesis (estimated 1–2 days)

11. Create `src/compass/demandSynthesis.ts`:
    - `generateDemandSynthesis(field: string, signals: MarketSignalSnapshot[]): Promise<AIDemandSynthesis>`
    - Builds prompt with: field name, 4-week job posting trend, salary trend, JSA shortage status, AIOE exposure, top skills
    - Calls OpenAI `gpt-4o-mini` via existing integration
    - Parses structured response: synthesis text, confidence score, key drivers
12. Create prompt template at `src/compass/prompts/demandSynthesisPrompt.ts`:
    - System: "You are a labour market analyst synthesizing real-time signals for university curriculum planners..."
    - Format: 2-4 sentence narrative, confidence 0-1, 2-4 key drivers as bullet points
13. Create Wasp query `getDemandSynthesis(field: string)` returning latest synthesis
14. Create Wasp action `generateDemandSynthesis(field: string)` for on-demand user-triggered synthesis

### Phase 4 — UI Components (estimated 3–4 days)

15. Create `src/client/components/compass/MarketDataFreshness.tsx`:
    - Props: `field: string`
    - Uses `useQuery(getDataSourceFreshness)` to fetch freshness data
    - Renders badge: 🟢 LIVE / 🟡 RECENT / 🔴 STALE
    - Tooltip on hover: "Data last updated: [date]. Next refresh: [date]."
16. Create `src/client/components/compass/JobPostingTrend.tsx`:
    - Props: `field: string`
    - Uses `useQuery(getMarketSignals)` with `limit: 12`
    - Renders Recharts sparkline (Area chart, height: 40px, no axes)
    - Shows momentum score + direction arrow (↗ +0.3, → 0.0, ↘ -0.2)
    - Colour: green for positive momentum, grey for flat, amber for negative
17. Create `src/client/components/compass/DemandSynthesis.tsx`:
    - Props: `field: string`
    - Uses `useQuery(getDemandSynthesis)`
    - Renders: synthesis text, confidence score as percentage, key drivers as tags/chips
    - "Generate fresh synthesis" button triggers `generateDemandSynthesis` action
    - Loading skeleton while generating
18. Create `src/client/components/compass/DataSourcePanel.tsx`:
    - Props: `field: string`
    - Expandable panel (collapsed by default, "Where does this data come from?" toggle)
    - Table: Source | Vintage | Freshness | Last Updated
    - Rows: QILT GOS, JSA SPL, AIOE, SEEK, Adzuna, JSA IVI
    - Each row has freshness badge and timestamp
19. Update `ReportDetailPage.tsx`:
    - Add `MarketDataFreshness` badge next to D10 score section
    - Add `JobPostingTrend` below dimension radar
    - Add `DemandSynthesis` below trend
    - Add `DataSourcePanel` at bottom of report section
20. Add Wasp routes for standalone signal pages:
    - `/insights/market-signals/:field` → `MarketSignalsPage` showing full detail for one field
21. Add field selector to navigate between fields on market signals page

### Phase 5 — Integration & Polish (estimated 2 days)

22. Update `enrichWithMarketData()` in `marketDataService.ts` to include `marketMomentum` from latest `MarketSignalSnapshot.momentumScore`
23. Update `MarketFieldData` interface to add optional `momentumScore` and `signalFreshness` fields
24. Update `MarketSignalCorrelation.tsx` (from feat-004) to show freshness badges and a toggle between "Static data (annual)" and "Real-time signals (weekly)"
25. Add "Data Freshness" section to COMPASS landing page — marketing copy about weekly-updated signals vs annual reports
26. Test ingestion pipeline end-to-end: run manual trigger, verify records in DB, verify UI renders
27. Test graceful degradation: temporarily set invalid SEEK API key, verify Adzuna + JSA IVI still ingest, verify SEEK marked STALE
28. Test AI synthesis: generate synthesis for IT and Health fields, verify narrative quality, store in DB
29. Commit with message: `feat: real-time LMI alternative — job posting ingestion, momentum scoring, AI demand synthesis, freshness metadata`
