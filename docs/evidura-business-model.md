# Evidura — Business Model & Financial Strategy

> A recommended financial model for Evidura, drawing on the Business Model Canvas framework, benchmarking against comparable rating-agency and EdTech SaaS businesses, and grounded in the market sizing and competitive intelligence already gathered.

**Prepared by:** David Mulholland · **Date:** 2026-06-30
**Builds on:** [Brand strategy](compass-brand-strategy.md) · [Market sizing](compass-market-sizing.md) · [Competitive intelligence](compass-competitive-strategic-intelligence.md) · [Methodology](../compass/app/src/compass/dfvaPrompt.ts)

---

## 1. Business Model Canvas (BMC) — Evidura

| Block | Content |
|---|---|
| **Value Proposition** | The independent durability assessment for university degrees — a confidential, evidence-led analysis of whether a program will still be economically worth choosing in an AI-shaped labour market. Delivers *clarity-with-conviction* to institutional decision-makers. Ratings are confidential to the purchasing institution; no program score is ever published without explicit institutional consent. |
| **Customer Segments** | **Primary:** Australian university leadership — DVC-Academic, Deans, Program Directors, curriculum governance committees. **Secondary:** Quality and planning offices, institutional research units. **Tertiary (Year 3+):** International universities (NZ, UK, Canada), government skills/education departments (benchmark data only), peak bodies (anonymised sector reports only). |
| **Channels** | **Direct B2B relationship sales** — University of Melbourne pilot → Go8 reference network → conference/peak-body presence (UA, TEQSA forums). **Thought leadership** — academic publications, conference presentations, an annual *State of Degree Durability* index reporting *anonymised aggregate trends only* (no individual program scores). **Developer infrastructure** — MCP tools for AI agent consumption (developer-facing, not a revenue channel). |
| **Customer Relationships** | **Confidential benchmarking:** Annual contract with dedicated account; quarterly review; methodology updates. All ratings are confidential to the purchasing institution. Institutions choose whether to publish their own scores (opt-in only). **Re-rating cycle:** Annual re-assessment as programs evolve; rapid re-rating on request after major curriculum change. |
| **Revenue Streams** | See §3 below. Primary: institutional subscription (tiered by university size) — confidential program assessments + benchmark comparisons + redesign roadmaps. Secondary: per-program assessment (à la carte), anonymised benchmark data licences for government/peak bodies, rapid re-rating on program redesign. |
| **Key Resources** | **Methodology (DFVA)** — the rubric and scoring engine, validated by inter-rater reliability study. **Benchmark dataset** — the cross-institutional durability scores (path-dependent, compounding moat; institution-identified data never shared). **Brand** — Evidura's independence, rigour, and confidentiality. **Talent** — the team bridging service design, labour economics, and AI. |
| **Key Activities** | Scoring programs (continuously), maintaining/enriching the benchmark dataset, methodology R&D, enterprise sales, thought leadership (anonymised annual index, conference appearances), inter-rater reliability maintenance, independence governance. |
| **Key Partners** | University of Melbourne (incubator + first customer), QILT/JSA (data sources), professional bodies (AACSB, AMC — distribution channels, not customers), peak bodies (Universities Australia, Go8 — anonymised sector reporting). |
| **Cost Structure** | See §4 below. Primary costs: people (scoring analysts, methodology R&D, sales, engineering), data licensing (QILT/JSA/AIOE), infrastructure (Wasp hosting, MCP servers, LLM inference), governance (independent advisory board), legal (trademark, independence structure), inter-rater reliability maintenance. |
| **Moat** | **1. The standard** — the durability methodology itself, defended by legitimacy, published validation, and citation. **2. The benchmark dataset** — path-dependent, first-mover, cannot be retroactively manufactured. **3. Confidentiality** — the trust that ratings won't be leaked or published. **4. ANZ-regulatory nativeness** — uncopyable by US competitors. **5. Independence structure** — the hardest asset to build and the one that compounds all others. |

---

## 2. Pricing Philosophy

Evidura is a **confidential benchmarking service**, not a public rating agency or an edtech tool. The pricing strategy must reflect this. The wrong model is per-seat SaaS (Coursedog territory). The right model is **institutional subscription anchored to university size** — the way a strategy consultancy charges by engagement scope, not per-analyst-seat.

**Core principle: the confidential assessment is the product, not the software.** The web dashboard is the *delivery mechanism*, not the value. What customers buy is the **independent, confidential durability assessment** — the score, the band, the benchmark comparison, the redesign roadmap. Price the insight, not the interface.

**Pricing psychology:**
- "Sub-1% of any institution's software budget" is the price-anxiety ceiling ($19K–$49K against $2M–$25M IT spend)
- The comparator is not "what does another SaaS tool cost" — it's "what is the cost of a curriculum governance failure?" (one program elimination, one TEQSA concern, one reputational hit = 10–50× the annual subscription)
- The assessment must never be free — free signals are worth what you pay for them. The price *is* part of the credibility signal.

**The confidentiality guarantee:** No program rating is ever published without explicit, written institutional consent. The annual *State of Degree Durability* index reports only anonymised aggregate sector trends. The benchmark dataset shares no institution-identified data with any third party. Confidentiality is a contractual obligation and a structural moat.

**The independence constraint:** Under no circumstance can Evidura's revenue be concentrated in any single institution. A benchmarking service where 40% of revenue comes from one university is not independent — it's captured. This imposes a structural cap: no single institution >15% of total revenue. This shapes the minimum viable customer count (see §5).

---

## 3. Revenue Model — Recommended Tiered Structure

### 3.1 Primary: Institutional Annual Subscription

Priced by university size (student enrolment as proxy for program portfolio breadth):

| Tier | University Size | Programs Rated | Annual Price (AUD) | Target Count (SOM Yr 3) | Annual Revenue |
|---|---|---|---|---|---|
| **Go8 / Large** | 40,000+ students | Up to 50 programs | **$49,000** | 8 | $392,000 |
| **Mid-tier** | 20,000–39,999 | Up to 30 programs | **$32,000** | 10 | $320,000 |
| **Small / Regional** | <20,000 | Up to 15 programs | **$19,000** | 8 | $152,000 |
| **Single program** | Any | 1 program | **$4,900** | 20 | $98,000 |

**Blended ASP:** ~$36,800 across the institutional tiers; drops to ~$21,000 if single-program purchases dominate.

**SOM Year 3 conservative estimate:** 26 AU institutions at blended $25K = **$650,000 ARR** (below the $4.5M prior estimate — see §3.2 for what closes the gap).

### 3.2 Secondary: Beyond program assessments

The institutional subscription gets you to ~$650K–$1.5M ARR in Australia. Additional revenue comes from:

| Stream | Description | Price Point | Year 3 Target | Note |
|---|---|---|---|---|
| **Accreditation-driven institutional demand** | Universities purchase assessments because accreditation bodies (AACSB, AMC) signal demand for AI-curriculum evidence. Bodies themselves are distribution channels, not customers — they do not pay Evidura directly. | Included in institutional subscription | — | No separate revenue line; this is demand generation, not direct sales to bodies |
| **Benchmark access licence** | Anonymised, aggregate cross-institutional benchmark data for sector-level analysis, policy development, and government submissions. No institution-identified data. | **$15,000–$30,000/yr** | 5 subscribers = $75K–$150K | |
| **Annual Index — "State of Degree Durability"** | One authoritative, citable annual report — anonymised aggregate trends only, no individual program scores. Sponsored by peak bodies; premium tier with expanded data access. | **Free (public) / $5,000 (data tier)** | 20 data-tier subscribers = $100K | Public version is aggregate only — no institution-identified reporting |
| **Opt-in program-page embed** | Institution *chooses* to display its own rating on public program pages. Evidura provides the badge and methodology disclosure text. Available only post-trademark-clearance. | **$800/program/yr** | 100 programs = $80K | **Gated on: independence structure resolved, reliability study published, institution consent** |
| **Rapid re-rating** | Program redesign triggers a re-score before the annual cycle. | **$2,900 per re-rate** | 15 re-rates = $43K | |
| **International expansion (NZ, UK)** | Same tiered model, priced in local currency at equivalent rates. | Same tiers | 10–15 institutions = $250K–$500K | |

**Year 3 blended projection:** Core AU subscriptions ($650K) + benchmark ($112K) + index ($100K) + opt-in embed ($80K) + re-rates ($43K) + international ($375K) = **~$1.36M ARR**

**Year 5 (400 institutions across AU/NZ/UK/CA):** Core subscriptions ($7.2M) + all secondary streams ($2.8M) = **~$10M ARR**

**What changed from the original model:** Accreditation-body revenue ($240K/yr) has been removed as a direct line item — bodies are distribution channels, not customers. The certification seal has been replaced with opt-in program-page embeds (only with institutional consent + independence resolved). The annual index now explicitly reports anonymised aggregate data only.

### 3.3 Student-Facing Revenue (Year 4+, gated)

**All student-facing products are gated on three conditions:** (1) independence structure fully resolved (Stage 3), (2) inter-rater reliability study published with κ >0.8, (3) explicit institutional consent for display of their scores.

Once the institutional base is established:

| Stream | Description | Price Point | Gate |
|---|---|---|---|
| **Program-page embed** | Institution opts in to display its own Durability Assessment badge on public program pages. | **$800/program/yr** | Institution consent required; RESILIENT/MODERATE bands only initially |
| **Student comparison tool** | Evidura.ai hosts a public program comparison tool — students compare durability assessments across institutions. Only programs with institutional consent are displayed. | **$10,000–$25,000/yr per sponsored institution** | Gated until 50+ programs have consented to public display |
| **API access for student platforms** | Third-party platforms (e.g., VTAC, UAC, StudyPortals) embed the Durability Assessment via API. Only consenting programs are included. | **$0.05–$0.25 per API call, volume tiers** | Gated until institutional base is 30+ and consent framework is operational |

**Caution:** Student-facing revenue must never create an incentive to inflate assessments. The institutional subscription model structurally separates the *payer* from the *assessed entity* — all universities pay, all are assessed, none can buy a better score. Student-facing products amplify the same risk: a university that pays for a public badge has an incentive to suppress unfavourable re-assessments. Mitigation: public display is opt-in per program, re-assessments are scheduled automatically (not on institutional request), and methodology changes are published transparently.

---

## 4. Cost Structure

### 4.1 People (70–80% of costs)

| Role | Year 1 (FTE) | Year 3 (FTE) | Annual Cost (AUD) |
|---|---|---|---|
| **CEO / Chief Rating Officer** | 0.5 (David, part-time initially) | 1.0 | $180,000 |
| **Methodology Lead / Chief Analyst** | 0.5 | 1.0 | $150,000 |
| **Scoring Analysts** (program assessment) | 1.0 | 3.0 | $90,000 each |
| **Enterprise Sales / Partnerships** | 0.5 | 1.5 | $130,000 (+ commission) |
| **Full-Stack Engineer** (platform, MCP) | 1.0 | 2.0 | $140,000 each |
| **Data Engineer** (benchmark, market data) | — | 1.0 | $130,000 |
| **Operations / Governance** | 0.25 | 0.5 | $100,000 |

| Year | People Cost |
|---|---|
| Year 1 (3.75 FTE) | ~$420,000 |
| Year 2 (6 FTE) | ~$670,000 |
| Year 3 (10 FTE) | ~$1,100,000 |

### 4.2 Non-People Costs

| Category | Year 1 | Year 3 |
|---|---|---|
| Infrastructure (hosting, LLM inference, MCP) | $18,000 | $72,000 |
| Data licensing (QILT/JSA — may be free for AU public data; AIOE may require academic licence) | $5,000 | $15,000 |
| Legal (trademark, independence structure, contracts) | $40,000 | $30,000 |
| Governance (independent advisory board) | $15,000 | $45,000 |
| Marketing / conference attendance | $25,000 | $95,000 |
| Travel (sales, Go8 visits) | $15,000 | $40,000 |
| Insurance / admin | $12,000 | $25,000 |
| **Total non-people** | **$130,000** | **$322,000** |

### 4.3 Summary P&L

| | Year 1 | Year 2 | Year 3 |
|---|---|---|---|---|
| **Revenue** | $0 | $280,000 | $820,000 |
| **People costs** | $420,000 | $550,000 | $780,000 |
| **Non-people costs** | $130,000 | $180,000 | $240,000 |
| **Total costs** | $550,000 | $730,000 | $1,020,000 |
| **EBITDA** | –$550,000 | –$450,000 | –$200,000 |
| **EBITDA margin** | — | — | — |

**Key assumptions (re-baselined post-premortem):**
- Year 1: University of Melbourne pilot only (internal cross-subsidy — UoM pays nothing in Year 1; no external revenue). Independence structure Stage 1 established. Reliability study completed. Methodology published.
- Year 2: 5–8 AU institutions on paid subscriptions. Confidential assessments only. First benchmark access licence subscribers.
- Year 3: 8–12 AU institutions + first NZ contracts. Opt-in program-page embeds available (gated).
- **Break-even: Month 36–42** (re-baselined from 18–22 — the original assumed SaaS procurement timelines, not university procurement realities).

### 4.4 Capital Requirements

**Staged spin-out funding (Option B, 12–24 months):**
- **Stage 1 (incorporation, legal, advisory board):** **$50K–$80K** — legal entity setup, IP licence, first advisory board meetings. UoM commercialisation support may cover legal costs.
- **Stage 1–2 bridge (operations through break-even):** **$850K–$1.3M** — covers Year 1–3 operating losses ($1.2M cumulative at the re-baselined P&L) minus any UoM internal funding or grants.
- **International expansion (if pursuing):** **$6M–$27M** — see premortem unit economics deep-dive ($23.5M–$26.9M total to 400 institutions). Realistic raise target for first 50 international institutions: **$5M–$8M**.

**Funding sources (in order of likelihood):**
1. **UoM internal funding** — service improvement / innovation budget. Covers Year 1 methodology development and pilot. Already operational.
2. **University commercialisation / pre-seed grant** — $150K–$300K for the spin-out. "Integrity of higher education" framing is grant-friendly.
3. **ARC Linkage or philanthropic/impact investment** — $200K–$500K. Philanthropic foundations interested in higher education quality and AI preparedness.
4. **Angel / seed VC** — $500K–$1.5M. Difficult given the structural constraints (slow procurement, small TAM, independence requirement) but viable if the AU institutional base is proven.
5. **Series A for international expansion** — $5M–$8M. Only after 3+ years of AU proof and a credible international pipeline.

**The honest capital deck answer:** This is not a venture-scale business in Years 1–3. It's a consultancy-scale business with a SaaS delivery mechanism. The $10M Year 5 ambition requires $6M–$27M in growth capital that the unit economics cannot generate. Either raise at that scale (and accept the dilution), or accept the $1.5M–$2M ARR lifestyle-business ceiling. Both are real outcomes.

---

## 5. Unit Economics

| Metric | Value | Benchmark / Note |
|---|---|---|
| **Average Revenue Per Institution (ARPI)** | $25,000 | Go8 pays $49K, small uni pays $19K |
| **Customer Acquisition Cost (CAC)** | $18,000 | Mostly travel + conference + sales salary; very targeted market (41 unis) |
| **CAC Payback Period** | ~9 months | At $25K ARPI |
| **Annual Churn Rate** | 8–12% (target) | Enterprise SaaS benchmark 5–15%; a rating agency should see low churn — the rating becomes governance infrastructure |
| **Lifetime Value (LTV)** | $160,000–$310,000 | At 8% churn (12.5 yr avg life) × $25K; at 12% churn (8.3 yr) × $25K |
| **LTV:CAC Ratio** | 8.9:1 → 17.2:1 | Excellent; reflects tiny acquisition market and high retention |
| **Gross Margin** | 75–85% | SaaS-typical; people-heavy at first, improving with automation (LLM scoring scales better than human analysts) |
| **Revenue Concentration Cap** | <15% per institution | Governance rule, not a target |

**The critical unit-economic insight:** Australia has 41 universities. The total addressable revenue from Australian institutional subscriptions alone is roughly $1.0M–$1.5M ARR — meaningful but not venture-scale. The financial case for Evidura is:
1. **Australia proves the model** (Year 1–3, $1.4M ARR, 8–12 institutions)
2. **International expansion requires capital** — the unit economics cannot self-fund it. Either raise $6M–$27M for international scale, or accept the $1.5M–$2M ARR ceiling.
3. **Confidentiality + independence are the compounding moats** — not the certification seal or public ratings. The benchmark dataset and the trust it requires accumulate over years.

---

## 6. Pricing Options — Comparative Analysis

### Option A: Tiered Institutional Subscription (RECOMMENDED)

| What | How | Pros | Cons |
|---|---|---|---|
| Annual fee by university size; includes N program ratings, benchmark access, and one annual re-rating cycle. | Per §3.1 above | Clean procurement (single PO, annual renewal); aligns with university budgeting cycles; revenue predictability; structurally separates payer from score | Requires upfront commitment from budget-constrained institutions; "why pay for 50 ratings if I only need 12?" |

### Option B: Per-Program Rating (à la carte)

| What | How | Pros | Cons |
|---|---|---|---|
| Pay per program rated. $4,900/program. No subscription. | University submits a list of programs; Evidura scores them; university receives the reports. | Low barrier to entry; easy pilot; budget-friendly | Unpredictable revenue; no ongoing relationship; incentivises cherry-picking (only rate the good programs); undermines the "portfolio view" value proposition |

### Option C: Freemium / Public Ratings

| What | How | Pros | Cons |
|---|---|---|---|
| A limited set of ratings are publicly available for free (e.g., all Go8 CS programs). Universities pay for full portfolio ratings + benchmark access + redesign roadmaps. | Publish 5–10 sample ratings per discipline on evidura.ai. Institutions pay to get their own programs rated and access the full dataset. | Generates demand (the Carfax model — "why doesn't MY program have a rating?"); builds public trust; feeds the annual index | Universities might resist having their programs publicly rated without consent; risk of legal challenge (a rating is an opinion, but a public negative rating invites disputes); TEQSA politics |

### Option D: Accreditation Body Partnership (the "become mandatory" play)

| What | How | Pros | Cons |
|---|---|---|---|
| Professional accreditation bodies (AACSB, AMC) embed the Durability Rating as a standard evidence input. Universities pay the body; body pays Evidura a licence fee + per-program fee. | Partner with AACSB to make the Durability Rating an accepted evidence type for Standard 4.1 (technology agility). AMC for digital health requirements. | The endgame — if accreditation bodies require it, every accredited program gets rated. Revenue becomes structural, not discretionary. 14 AU business schools × 15+ programs each = 210 programs at one body. | Years-long partnership cycle; accreditation bodies are slow and political; risk of being seen as "compliance overhead" rather than decision-support |

### Option E: Data / Benchmark Subscription (sell the dataset, not the rating)

| What | How | Pros | Cons |
|---|---|---|---|
| Anonymised cross-institutional benchmark data sold as a subscription to universities, government, peak bodies, and researchers. The rating is a byproduct of the dataset. | Universities pay $15K–$30K/yr for benchmark access. The dataset compares their programs against sector averages across all 11 dimensions. | Less politically charged than "we rate YOU"; multi-buyer within one institution (IR, strategy, quality); government/peak-body buyers diversify revenue from institutions | Smaller TAM than the rating model; harder to sell than "give us your programs and we'll tell you the score"; the value is in the signal, not the raw data |

---

## 7. Recommended Path

### Phase 1: Pilot (Now — Year 1)
**Model: Internal UoM service + 3–5 Go8 design partners (no charge).**
- No revenue. UoM funds development as internal capability.
- 3–5 Go8 universities receive pilot ratings in exchange for feedback, testimonials, and co-design input.
- Goal: validate the methodology, build the benchmark dataset, establish the reference network.
- **Legal structure:** Operating within UoM. The independence question is flagged but deferred — at this stage, the rating is an *academic research output*, not a commercial product. Frame accordingly.

### Phase 2: Soft Commercial — Confidential Benchmarking (Year 2–3)
**Model: Tiered institutional subscription (Option A) — confidential assessments only.**
- 8–12 AU institutions on paid subscriptions (re-baselined from 12–26 — see premortem procurement velocity findings).
- Accreditation bodies engaged as distribution channels — conversations begin, but no revenue expected from bodies directly.
- First international (NZ) contracts.
- **Legal structure:** Evidura Pty Ltd incorporated. Founder at 0.4–0.6 FTE UoM, balance Evidura (Stage 2 of independence structure). Independent advisory board seated. Revenue concentration cap enforced.
- Annual *State of Degree Durability* index published — **anonymised aggregate data only.** No individual program scores.
- Inter-rater reliability study published (target κ >0.8).
- Methodology governance charter published.
- **No public ratings. No certification seal. No student-facing products.** All assessments are confidential to the purchasing institution.

### Phase 3: Scale — Confidential + Opt-In Public (Year 4–5, gated)
**Model: Confidential assessments at scale + opt-in public display (institution-consented only).**
- 150–400 institutions across AU/NZ/UK/CA (re-baselined from 400 — realistic at this stage with capital).
- Opt-in program-page embeds available — institutions choose to display their own scores (gated on: independence Stage 3, reliability study published, institution consent).
- Public program comparison tool on evidura.ai — only consenting programs displayed; aggregate trends from the full dataset.
- Student-facing API access available for consented programs.
- **Full independence:** Founder full-time Evidura CEO. UoM a minority shareholder only.
- **Not happening in Phase 3:** Unsolicited public ratings. Certification seal without consent. Publishing any program score the institution hasn't approved.

---

## 8. The One Chart That Matters (re-baselined)

```
Year 1:  –$550K  (investment — methodology validation, reliability study, independence Stage 1, UoM-funded)
Year 2:  –$450K  (early commercial — first 5–8 subscribers, confidential benchmarking only)
Year 3:  –$200K  (approaching break-even — 8–12 AU institutions + first NZ)
Year 4:  +$400K  (profitable — AU base stable, international growing, opt-in embeds active)
Year 5:  +$1.5M  (mature — 30–50 institutions AU/NZ/UK, confidential + opt-in public)
```

**The shape:** Slower, flatter, more realistic. The original J-curve assumed SaaS procurement timelines and self-funded international expansion — both disproven by the premortem. This corrected curve reflects university procurement reality (3–5 institutions/year), confidential benchmarking (no public demand pull), and staged independence (revenue only after the entity exists). Break-even at Month 36–42, not 18–22.

---

## 9. Risks to the Financial Model (post-premortem update)

| Risk | Severity | Mitigation |
|---|---|---|
| **Independence perception** — universities won't pay a UoM-incubated assessor to assess them | **CRITICAL** | Staged spin-out (see independence structure doc): Pty Ltd incorporated Stage 1, founder transitions out of UoM Stage 2–3, independent board, revenue cap, published governance charter |
| **Slow university procurement** — 12–18 month sales cycles; no budget line item | **CRITICAL** | Re-baselined to 3–5 institutions/year; target 8–12 by Year 3 (not 26); interview DVCs about procurement pathways before building pipeline |
| **Methodology credibility** — LLM-scoring challenged publicly | **CRITICAL** | Inter-rater reliability study commissioned before any external sale (target κ >0.8); human verification of all CRITICAL-band scores; methodology governance charter published |
| **Demand resistance** — universities don't want to be assessed | **HIGH** | Pivoted to confidential benchmarking: no public ratings without consent; annual index is anonymised aggregate only |
| **Competitor entry** — Lightcast or Mapademics enters Australia free | **HIGH** | Competitor monitoring active; ANZ-regulatory nativeness as barrier; build benchmark dataset (path-dependent moat) before they arrive |
| **Revenue concentration** — too few customers | **MEDIUM** | Structural cap at 15% per institution; diversify into government/peak-body benchmark licences |
| **Growth capital gap** — $218K Year 3 EBITDA can't fund international expansion | **HIGH** | Either accept $1.5M–$2M ARR lifestyle-business ceiling, or raise $6M–$27M for international scale. Do not model self-funded international expansion — the unit economics don't close. |
| **Trademark blockage** — Evidura name unavailable | LOW–MEDIUM | Trademark clearance in progress (naming DD §4); fallback names identified |
| **Independence timeline slips** — staged spin-out takes longer than 24 months | MEDIUM | Founder part-time transition starts Stage 2 (Month 6); independent board seated Stage 1; UoM equity negotiation flagged early |

---

## 10. Immediate Next Steps (post-premortem priority order)

| # | Action | Why | When | Status |
|---|---|---|---|---|
| 1 | **Resolve independence structure** — brief Brad, engage UoM Commercialisation, file conflict-of-interest disclosure | The independence question is the single largest risk. Option B (staged spin-out, 12–24 months) is the recommended path. No competitor university should be asked to pay until Stage 1 is complete. | Week of July 6, 2026 | 🔴 Starting now |
| 2 | **Pivot to confidential benchmarking** — update all external-facing language, brand materials, and pitch decks | Public rating agency framing creates demand resistance and legal exposure. The survivable model is confidential assessment with opt-in public display. | July 2026 | 🔴 This document updated |
| 3 | **Commission inter-rater reliability study** — recruit 3 human raters + 2 LLM raters, select 10 programs, run 6-week study | Methodology credibility is gating for any external sale. Publish results regardless of outcome. Target κ >0.8. | July–August 2026 | 🔴 Protocol drafted |
| 4 | **Interview 3 DVCs-Academic about procurement** | The single highest-value research activity: find out whether any Australian university can actually buy this, from what budget line, and how long it takes. | Q3 2026 | 🟡 After independence conversation |
| 5 | **Set up competitor monitoring** — Google Alerts for Lightcast + Mapademics + Australia | The 18–36 month window is an assumption. Verify it. | July 2026 | 🟡 Low effort, immediate |
| 6 | **Publish the methodology** as a white paper / pre-print | Establishes academic credibility; makes the rubric *citable*; feeds the legitimacy-and-citation moat. | Q3–Q4 2026 | 🟡 After reliability study |
| 7 | **Trademark clearance** | Gating item for public launch. | As soon as possible | 🟡 In progress |
| 8 | **Begin accreditation-body conversations** (AACSB, AMC) — as distribution channels, not customers | Long-lead relationship building. Frame as "we're developing a methodology for AI-curriculum evidence — interested in your perspective." Do not pitch a product. | Q4 2026 | 🟢 After independence Stage 1 |
| 9 | **Seed the benchmark dataset** with international programs | Rate 10–20 UK/CA/US programs using public handbooks. Tests methodology cross-nationally. | Q2 2027 | 🟢 After reliability study |

---

*This document should be reviewed quarterly as pilot revenue data, competitor movements, and the independence legal structure evolve. The financial projections are deliberately conservative — they assume no venture-scale outcome, only a sustainable, independent rating agency that compounds value through trust and the benchmark dataset.*
