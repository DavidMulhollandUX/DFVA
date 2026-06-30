# Evidura — Business Model & Financial Strategy

> A recommended financial model for Evidura, drawing on the Business Model Canvas framework, benchmarking against comparable rating-agency and EdTech SaaS businesses, and grounded in the market sizing and competitive intelligence already gathered.

**Prepared by:** David Mulholland · **Date:** 2026-06-30
**Builds on:** [Brand strategy](compass-brand-strategy.md) · [Market sizing](compass-market-sizing.md) · [Competitive intelligence](compass-competitive-strategic-intelligence.md) · [Methodology](../compass/app/src/compass/dfvaPrompt.ts)

---

## 1. Business Model Canvas (BMC) — Evidura

| Block | Content |
|---|---|
| **Value Proposition** | The independent durability rating for university degrees — a trusted, comparable signal that a program will still be economically worth choosing in an AI-shaped labour market. Converts *dread-in-the-dark* into *clarity-with-conviction* at the moment of decision (design, approval, enrolment). |
| **Customer Segments** | **Primary:** Australian university leadership — DVC-Academic, Deans, Program Directors, curriculum governance committees. **Secondary:** Professional accreditation bodies (AACSB, AMC, Engineers Australia). **Tertiary (Year 3+):** Students/families (via university portals), regulators (TEQSA), international universities (UK, NZ, Canada, US). |
| **Channels** | **Direct B2B enterprise sales** — University of Melbourne pilot → Go8 reference network → conference/peak-body presence (UA, TEQSA forums). **Product-led** — public sample ratings on evidura.ai, the annual *State of Degree Durability* index, academic publications. **Agent-native** — MCP tools surfaced in AI coding assistants, agent workflows (the 2027-forward distribution). |
| **Customer Relationships** | **Enterprise SaaS:** Annual contract with dedicated account, quarterly review, methodology updates. **Self-serve (future):** Per-program rating purchase, instant delivery via API. **Certification:** Annual re-rating cycle (the durability rating is a snapshot, not a permanent mark — programmes must requalify). |
| **Revenue Streams** | See §3 below. Primary: institutional subscription (tiered by university size). Secondary: per-program rating, accreditation body partnerships, certification seal licensing, the annual index report. |
| **Key Resources** | **Methodology (DFVA)** — the rubric and scoring engine. **Benchmark dataset** — the cross-institutional durability scores (path-dependent, compounding moat). **Brand** — Evidura's independence, trust, and the "Durability Rating" mark. **Talent** — the team bridging service design, labour economics, and AI. **MCP infrastructure** — the agent-native distribution layer. |
| **Key Activities** | Scoring programs (continuously), maintaining/enriching the benchmark dataset, methodology R&D, enterprise sales, thought leadership (the annual index, conference appearances), accreditation-body partnerships, agent-tooling development. |
| **Key Partners** | University of Melbourne (incubator + first customer), TEQSA (regulatory alignment — not endorsement), QILT/JSA (data sources), professional bodies (AACSB, AMC, Engineers Australia), peak bodies (Universities Australia, Go8). |
| **Cost Structure** | See §4 below. Primary costs: people (scoring analysts, methodology R&D, sales, engineering), data licensing (QILT/JSA/AIOE), infrastructure (Wasp hosting, MCP servers, LLM inference), governance (independent advisory board), legal (trademark, independence structure). |
| **Moat** | **1. The standard** — the durability methodology itself, defended by legitimacy and citation (like NABERS, Health Star Rating). **2. The benchmark dataset** — path-dependent, first-mover, cannot be retroactively manufactured. **3. ANZ-regulatory nativeness** — uncopyable by US competitors. **4. Independence structure** — the hardest asset to build and the one that compounds all others. **5. Agent-native distribution** — the genuinely 2027-forward moat. |

---

## 2. Pricing Philosophy

Evidura is a **rating agency**, not an edtech tool. The pricing strategy must reflect this. The wrong model is per-seat SaaS (Coursedog territory). The right model is **institutional subscription anchored to university size** — the way Moody's charges by institution type and portfolio size, not per-analyst-seat.

**Core principle: the rating is the product, not the software.** The web dashboard is the *delivery mechanism*, not the value. What customers buy is the **independent durability signal** — the score, the band, the benchmark comparison, the redesign roadmap. Price the signal, not the interface.

**Pricing psychology from the brand strategy:**
- "Sub-1% of any institution's software budget" is the price-anxiety ceiling ($15K–$35K against $2M–$25M IT spend)
- The comparator is not "what does another SaaS tool cost" — it's "what is the cost of a curriculum governance failure?" (one program elimination, one TEQSA concern, one reputational hit = 10–50× the annual subscription)
- The rating must never be free — free signals are worth what you pay for them. The price *is* part of the credibility signal.

**The independence constraint:** Under no circumstance can Evidura's revenue be concentrated in any single institution. A rating agency where 40% of revenue comes from one university is not independent — it's captured. This imposes a structural cap: no single institution >15% of total revenue. This shapes the minimum viable customer count (see §5).

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

### 3.2 Secondary: Beyond program ratings

The institutional subscription gets you to ~$650K–$1.5M ARR in Australia. The step-change to $4.5M+ comes from:

| Stream | Description | Price Point | Year 3 Target |
|---|---|---|---|
| **Accreditation body partnerships** | AACSB/AMC/Engineers Australia embed the Durability Rating as an evidence input for accreditation submissions. Annual licence fee + per-program rating fee. | **$40,000–$120,000/yr per body** | 2–3 bodies = $120K–$360K |
| **Benchmark access licence** | Access to the anonymised cross-institutional benchmark dataset for sector-level analysis, policy development, government submissions. | **$15,000–$30,000/yr** | 5 subscribers = $75K–$150K |
| **Annual Index — "State of Degree Durability"** | One authoritative, citable annual report. Sponsored by peak bodies; premium tier with underlying data access. | **Free (public) / $5,000 (data tier)** | 20 data-tier subscribers = $100K |
| **Certification seal licensing** | "Evidura-rated" mark displayed on program pages. Annual re-certification fee per program carrying the seal. Post-trademark-clearance only. | **$1,200/program/yr** | 100 programs = $120K |
| **Rapid re-rating** | Program redesign triggers a re-score before the annual cycle. | **$2,900 per re-rate** | 15 re-rates = $43K |
| **International expansion (NZ, UK)** | Same tiered model, priced in local currency at equivalent rates. | Same tiers | 10–15 institutions = $250K–$500K |

**Year 3 blended projection:** Core AU subscriptions ($650K) + accreditation ($240K) + benchmark ($112K) + index ($100K) + seal ($120K) + re-rates ($43K) + international ($375K) = **~$1.64M ARR**

**Year 5 (400 institutions across AU/NZ/UK/CA):** Core subscriptions ($7.2M) + all secondary streams ($2.8M) = **~$10M ARR** — consistent with the market sizing doc's $10M Year 5 SOM.

### 3.3 Student-Facing Revenue (Year 4+)

Once the institutional base is established and the certification seal has sector recognition:

| Stream | Description | Price Point |
|---|---|---|
| **Program-page embed** | University embeds the Durability Rating badge on public program pages — students see the rating before applying. University pays per displayed program. | **$800/program/yr** |
| **Student comparison tool** | Evidura.ai hosts a public program comparison tool — students compare durability ratings across institutions. Monetised via university sponsorship placements. | **$10,000–$25,000/yr per sponsored institution** |
| **API access for student platforms** | Third-party platforms (e.g., VTAC, UAC, StudyPortals) embed the Durability Rating via API. | **$0.05–$0.25 per API call, volume tiers** |

**Caution:** Student-facing revenue must never create an incentive to inflate ratings. The institutional subscription model is structurally cleaner because it separates the *payer* from the *rated entity* — all universities pay, all are rated, none can buy a better score.

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
|---|---|---|---|
| **Revenue** | $280,000 | $920,000 | $1,640,000 |
| **People costs** | $420,000 | $670,000 | $1,100,000 |
| **Non-people costs** | $130,000 | $220,000 | $322,000 |
| **Total costs** | $550,000 | $890,000 | $1,422,000 |
| **EBITDA** | –$270,000 | +$30,000 | +$218,000 |
| **EBITDA margin** | — | 3% | 13% |

**Key assumptions:**
- Year 1: University of Melbourne pilot only (internal cross-subsidy — UoM pays nothing in Year 1; revenue from 3–5 early adopter Go8 institutions). Negative EBITDA is funded by the incubating institution.
- Year 2: 12–15 AU institutions; first accreditation-body partnership.
- Year 3: 26 AU institutions + first NZ/UK contracts; multiple secondary revenue streams active.
- **Break-even: Month 18–22.**

### 4.4 Capital Requirements

**Spin-out / independence vehicle (recommended by Year 2–3):**
- Seed raise: **$500K–$800K** to fund the independence structure, independent advisory board setup, and initial sales push beyond the Go8 reference network.
- Pre-seed / grant alternative: **$150K–$300K** from university commercialisation funds, ARC Linkage, or philanthropic/impact investment (the "integrity of higher education" framing is grant-friendly).

**The independence question (from the brand strategy §6):**
> "COMPASS's entire moat is independence, yet it is incubated inside one university. Can a UoM-born tool credibly rate UoM's competitors?"

This is the single most important business-model decision. **Recommendation: establish Evidura as a separate legal entity by Year 2 — a university spin-out with an independent board, a published rating methodology governance charter, and a revenue-concentration cap (no single institution >15%).** UoM retains equity; the rating methodology is transferred to the entity under an independence-protecting licence. This is modelled on NABERS (government-incubated, now independently governed) and B Corp (incubated within the non-profit sector, became a standalone certification).

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
1. **Australia proves the model** (Year 1–3, $1.6M ARR)
2. **International expansion scales it** (Year 4–5, NZ → UK → Canada, $10M ARR)
3. **The certification seal creates a recurring revenue flywheel** (every rated program becomes a seal-licensed program, compounding annually)
4. **Agent-native distribution creates a new channel with near-zero marginal cost** (MCP tools consumed by AI agents → institutional demand driven by agents citing Evidura)

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

### Phase 2: Soft Commercial (Year 2–3)
**Model: Tiered institutional subscription (Option A) + accreditation-body partnerships (Option D).**
- 12–26 AU institutions on paid subscriptions.
- 1–2 accreditation body partnerships in negotiation.
- First international (NZ) contracts.
- **Legal structure:** Separate legal entity established (Evidura Pty Ltd, UoM spin-out). Independent advisory board seated. Revenue concentration cap enforced.
- Annual *State of Degree Durability* index published — free public version + paid data tier.
- MCP tools publicly available; agent-native distribution seeding demand.

### Phase 3: Scale (Year 4–5)
**Model: Full portfolio — subscriptions + accreditation + seal licensing + public ratings + international.**
- 400 institutions across AU/NZ/UK/CA.
- Certification seal launched (post-trademark clearance).
- Public program comparison tool on evidura.ai (the Carfax moment — "show me the Evidura rating").
- Agent-native channel delivering measurable institutional demand (AI agents citing Evidura in curriculum governance contexts).

---

## 8. The One Chart That Matters

```
Year 1:  –$270K  (investment — methodology validation, dataset bootstrapping, UoM-funded)
Year 2:  +$30K   (break-even — first paid subscribers, first accreditation partner)
Year 3:  +$218K  (profitable — Australian base established, international begins)
Year 4:  +$2.1M  (scale — UK/Canada expansion, seal licensing active)
Year 5:  +$3.8M  (mature — 400 institutions, certification flywheel, agent-native channel)
```

**The shape:** J-curve typical of B2B SaaS, but compressed — because the target market is tiny (41 universities in Australia, ~3,200 globally) and the sales cycle is relationship-driven, not ad-spend-driven. CAC is low; LTV is high; the constraint is *institutional sales velocity*, not market size.

---

## 9. Risks to the Financial Model

| Risk | Severity | Mitigation |
|---|---|---|
| **Independence perception** — universities won't pay a UoM-incubated rater to rate them | HIGH | Spin-out by Year 2; independent board; published methodology governance charter; revenue concentration cap |
| **Slow university procurement** — 9–18 month sales cycles | MEDIUM | Reference-network strategy (Go8 design partners → word-of-mouth); accreditation-body channel short-circuits individual procurement |
| **Legal challenge** — a CRITICAL-rated program disputes the rating | MEDIUM | Published, transparent methodology; rating framed as *opinion* (like a credit rating); legal review of methodology before public launch; errors-and-omissions insurance |
| **Competitor entry** — Lightcast or Mapademics launches in Australia | MEDIUM | 18–36 month first-mover window; ANZ-regulatory nativeness as barrier; build the benchmark dataset (path-dependent moat) before they arrive |
| **Trademark blockage** — Evidura name unavailable | LOW-MEDIUM | Trademark clearance in progress (naming DD §4); fallback names identified; launch gated on clearance |
| **Revenue concentration** — too few customers | MEDIUM | Structural cap at 15% per institution; diversify into accreditation bodies, government, international early |
| **LLM scoring credibility** — "an AI scored our program and gave it CRITICAL" | MEDIUM | Methodology transparency; human-in-the-loop for CRITICAL ratings; multi-rater validation study; frame as "LLM-assisted, human-verified" |

---

## 10. Immediate Next Steps

| # | Action | Why | When |
|---|---|---|---|
| 1 | **Get 3–5 Go8 design partners** on no-cost pilot ratings | Builds the reference network, validates the methodology across institutions, starts the benchmark dataset | Q3 2026 |
| 2 | **Commission independence legal advice** | The independence structure question must be answered before any university pays. Engage a university IP/commercialisation lawyer to model spin-out options. | Q3 2026 |
| 3 | **Publish the methodology** as a white paper / pre-print | Establishes academic credibility; makes the rubric *citable*; feeds the legitimacy-and-citation moat | Q3–Q4 2026 |
| 4 | **Begin AACSB/AMC conversations** | The accreditation-body channel is the highest-leverage revenue pathway. Even informal conversations establish the relationship. | Q4 2026 |
| 5 | **Produce the first "State of Degree Durability" index** | Owns the category conversation; generates inbound demand; costs almost nothing to produce (you already have 42 program ratings) | Q1 2027 |
| 6 | **Trademark clearance** | Gating item for public launch, the certification seal, and use of evidura.ai | As soon as possible |
| 7 | **Seed the benchmark dataset** with international programs | Rate 10–20 UK/CA/US programs using public handbooks. Tests the methodology cross-nationally and creates a dataset that's valuable before any international customer pays. | Q2 2027 |

---

*This document should be reviewed quarterly as pilot revenue data, competitor movements, and the independence legal structure evolve. The financial projections are deliberately conservative — they assume no venture-scale outcome, only a sustainable, independent rating agency that compounds value through trust and the benchmark dataset.*
