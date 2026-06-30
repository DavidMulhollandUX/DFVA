# Deep-Dive: University Procurement Kills Sales Velocity

> A failure analysis of Evidura's institutional sales model — why the plan's assumption of 26 Australian universities by Year 3 is off by 3–4×, and what the early warning signs would have told us.

---

## 1. The Failure Story

### The Plan

Evidura's business model projects **26 Australian universities** on paid institutional subscriptions by Year 3, generating ~$650,000 in core ARR from a blended average of $25,000 per institution. The plan treats this as a *conservative* estimate — a floor, not a ceiling. The sales motion is relationship-driven: University of Melbourne pilot → Go8 reference network → conference and peak-body presence. The unit economics look excellent: $18,000 CAC, ~9-month payback, 8.9:1 LTV:CAC ratio. The model even acknowledges the constraint explicitly: "the constraint is *institutional sales velocity*, not market size" (line 245).

### The Reality

Australian universities operate at **5.3% operating margins**. They are in an active cost-cutting cycle. They have no budget line item for "curriculum durability rating" — it's not in the org chart, it doesn't sit inside any existing procurement category, and no-one has pre-approved spending authority for it. A new-category procurement in an Australian university takes **12–18 months**, often longer when budgets are contracting. The sales channel — relationship-driven, conference-based, reference-network — is excellent for awareness and trust but does nothing to compress the procurement timeline itself.

At 12–18 months per deal and a small sales team (1.5 FTE by Year 3), the realistic velocity is **3–4 institutions per year**. Not 8–9. The plan's 26-institution Year 3 target requires signing institutions at a rate that is structurally impossible given the procurement environment.

### The Math

| | Plan Assumption | Reality |
|---|---|---|
| Institutions by Year 3 | 26 | 8–12 |
| Annual signing velocity | ~9/year | ~3–4/year |
| Core AU ARR (Year 3) | $650,000 | $200,000–$300,000 |
| Year 3 total revenue (all streams) | $1,640,000 | $800,000–$1,000,000 |
| Year 3 EBITDA | +$218,000 (13% margin) | –$200,000 to –$400,000 (deeply negative) |
| Break-even | Month 18–22 | Month 36–48 (if ever on AU alone) |

The downstream consequences cascade: secondary revenue streams (accreditation partnerships, benchmark licences, seal licensing) all depend on having a critical mass of rated institutions. International expansion (NZ, UK) is gated on proving the model in Australia. The entire J-curve shifts right by 18–24 months, and the Year 3 P&L flips from profitable to cash-negative.

### Why the Mitigations Don't Work

The plan lists two mitigations for slow procurement (line 254):

1. **Reference-network strategy** ("Go8 design partners → word-of-mouth"): This accelerates awareness and trust, not procurement. A DVC-Academic hearing from a Go8 peer that Evidura is valuable doesn't create a budget line item, doesn't skip the tender threshold, and doesn't bypass the finance committee. It *may* shorten the "consideration" phase within the 12–18 month cycle, but it cannot compress the compliance machinery.

2. **Accreditation-body channel** ("short-circuits individual procurement"): AACSB, AMC, and Engineers Australia are themselves slow-moving, political organisations. Embedding the Durability Rating as an evidence input for accreditation is a *years-long* partnership cycle (the plan's own pricing analysis admits this: "Years-long partnership cycle; accreditation bodies are slow and political" — line 198). This is a Year 4–5 strategy, not a Year 2–3 sales accelerator.

---

## 2. The Underlying Assumption

The plan's central, unstated assumption is:

> **University procurement behaves like enterprise B2B SaaS procurement.**

This assumption is embedded throughout the financial model:

| Where It Appears | What It Assumes |
|---|---|
| **CAC: $18,000** | That the primary cost of acquiring a university is travel, conference attendance, and sales salary — not the 12–18 months of relationship maintenance, pilot-to-contract shepherding, and internal advocacy required to birth a new budget category |
| **CAC payback: ~9 months** | That a deal closes and revenue begins within a fiscal year of first contact |
| **Year 2: 12–15 institutions** | That signing 8–11 new institutions in a single year (on top of 4 pilot partners) is feasible when each requires navigating a full procurement cycle for a category that doesn't exist |
| **Year 3: 26 institutions** | That the reference network and conference presence can sustain a signing velocity of ~9 institutions per year — faster than most enterprise SaaS companies selling into *for-profit* organisations with established budget categories |
| **Churn rate: 8–12%** | That university subscriptions renew like SaaS contracts, rather than being subject to annual budget fights in a cost-cutting environment where the "durability rating" line item is perpetually vulnerable because it serves no statutory or compliance function |
| **"Conservative" estimate** | That 26 of 41 universities (63% penetration) in 3 years is a cautious projection when selling a new category into a sector with 5.3% margins and no regulatory mandate |

The fundamental category error: **Australian universities are not enterprises. They are publicly funded, committee-governed, budget-cycle-constrained institutions.** Their procurement is closer to government procurement than to B2B SaaS. The plan acknowledges this once — "9–18 month sales cycles" rated MEDIUM risk — but never adjusts the projections to reflect it.

---

## 3. Early Warning Signs

These indicators were visible at the time of planning and, taken together, would have flagged the velocity assumption as the #1 existential risk to the financial model:

### Signal 1: No Budget Line Item Exists

The single most reliable predictor of procurement velocity is whether the buyer already has a budget for what you're selling. "Curriculum durability rating" sits in no university's budget. It's not a compliance cost (like TEQSA re-registration). It's not an operational cost (like the LMS). It's not infrastructure (like the student system). It's a new category — which means every sale requires:

- Identifying who owns the budget (no-one does)
- Building an internal business case
- Getting it into the next budget cycle (missed if the window has passed)
- Committee approval (curriculum committee → finance committee → executive)
- Tender or sole-source justification
- Legal review of the subscription agreement

Each of these steps takes weeks or months. The 12–18 month cycle isn't a worst case; it's the baseline for a new category in a university.

### Signal 2: 5.3% Margins + Active Cost-Cutting

When margins compress to 5.3%, universities don't add new spending categories — they eliminate them. The decision-maker for Evidura (DVC-Academic, Dean) is simultaneously being told to cut costs by 5–10%. Asking them to create a new $19,000–$49,000 annual line item for a non-mandatory service during a cost-cutting cycle is a profoundly difficult sale, regardless of ROI. The plan's "sub-1% of IT budget" framing (line 34) is rational but irrelevant — the psychology of cost-cutting means *any new recurring cost* faces disproportionate scrutiny.

### Signal 3: The Plan's Own Risk Table Downgrades This

The risk assessment (line 254) rates "Slow university procurement — 9–18 month sales cycles" as **MEDIUM**. This is a misclassification. Procurement velocity is not a medium risk — it is the *binding constraint* on the entire financial model. The plan's own language (line 245) recognises this ("the constraint is institutional sales velocity, not market size") but the risk rating doesn't reflect it. A binding constraint that can delay revenue by 12–24 months and flip the P&L from profitable to cash-negative should be rated **CRITICAL**.

### Signal 4: The Year 2 Ramp Is Mathematically Impossible

Year 1: 4 no-cost pilot partners (UoM + 3 Go8 design partners).
Year 2: 12–15 institutions on paid subscriptions.

This requires converting the 3 pilot partners to paid contracts *and* signing 8–11 *new* institutions — all in a single year. At 12–18 month procurement cycles, the pilot partners' conversion alone could take most of Year 2. New institutions first contacted in Year 2 wouldn't close until Year 3 (at best). The Year 2 target requires procurement cycles of 3–6 months, which is simply not how Australian universities work.

### Signal 5: Relationship-Driven Sales Are Slow by Nature

The plan's sales model is conferences, peak-body forums, and Go8 reference networks. These are trust-building activities — essential for a credibility product — but they are *slow*. A sales motion built on academic relationships, conference appearances, and peer references is measured in years, not quarters. The plan treats the Go8 network as an accelerator when it should be treated as a prerequisite to even *entering* the procurement queue.

### Signal 6: The Unit Economics Are Built on a False Premise

The CAC of $18,000 assumes the cost of acquiring a university is travel + conference + a fraction of a sales salary. But if the sales cycle is 12–18 months, the *real* CAC includes:
- 12–18 months of the sales lead's salary allocated to a single institution
- Travel cost for multiple visits (not one)
- The opportunity cost of the pilot phase (free ratings that must be converted)
- The cost of the reference institutions' time (maintaining the Go8 network)

Real CAC is likely $30,000–$50,000 per institution, which destroys the LTV:CAC ratio and pushes payback beyond 18 months.

### Signal 7: Accreditation-Body Channel Is Not a Near-Term Mitigation

The plan lists accreditation-body partnerships as the procurement-shortcut strategy (line 254). But its own pricing analysis (Option D, line 194–198) admits: "Years-long partnership cycle; accreditation bodies are slow and political." You cannot simultaneously claim this channel will short-circuit procurement in Year 2–3 while acknowledging it takes years to establish. This is internally contradictory and masks the true timeline risk.

---

## 4. What a Corrected Model Looks Like

If we rebuild the sales velocity assumption around realistic university procurement timelines:

| | Year 1 | Year 2 | Year 3 | Year 4 |
|---|---|---|---|---|
| **Pilot partners (no-cost)** | 4–5 | — | — | — |
| **Paid institutions (cumulative)** | 0 | 3–5 | 8–12 | 18–24 |
| **New signings per year** | — | 3–5 | 5–7 | 10–12 |
| **Blended ARPI** | $0 | $25,000 | $28,000 | $30,000 |
| **Core AU ARR** | $0 | $75,000–$125,000 | $224,000–$336,000 | $540,000–$720,000 |
| **Total revenue (all streams)** | $0 | $150,000–$250,000 | $400,000–$600,000 | $900,000–$1,300,000 |
| **People costs** | $420,000 | $670,000 | $800,000 | $900,000 |
| **Non-people costs** | $130,000 | $220,000 | $280,000 | $320,000 |
| **Total costs** | $550,000 | $890,000 | $1,080,000 | $1,220,000 |
| **EBITDA** | –$550,000 | –$640,000 to –$740,000 | –$480,000 to –$680,000 | –$320,000 to +$80,000 |

**Implications:**

1. **Break-even moves from Month 18–22 to Month 42–48.** The business requires significantly more capital — likely $1.2M–$1.8M instead of the planned $500K–$800K seed raise.

2. **The Australian market alone cannot justify the venture.** At 3–4 institutions per year and 41 total universities, full AU penetration takes 10–12 years. The J-curve flattens into a long, shallow ramp.

3. **Cost structure must be leaner.** The plan's Year 3 cost of $1.1M in people alone requires revenue that won't exist. The corrected model needs to keep costs at or below $600K–$700K until Year 4 — meaning a team of 4–5, not 10.

4. **Grant / non-dilutive funding becomes essential.** The corrected timeline cannot support a traditional venture raise. University commercialisation funds, ARC Linkage grants, or philanthropic/impact investment are the viable paths.

5. **International expansion is the only path to venture-scale returns** — but it's gated on Australian proof, which takes 4+ years, not 2.

---

## 5. Recommendations

### For the Financial Model

1. **Re-baseline the AU sales velocity at 3–5 institutions per year**, not 8–9. Build the P&L from this corrected assumption.
2. **Model Year 3 as cash-negative**, not profitable. Plan capital accordingly.
3. **Increase CAC to $30,000–$50,000** to reflect the real cost of 12–18 month sales cycles.
4. **Remove the accreditation-body revenue from Year 2–3 projections.** Treat it as Year 4–5 upside, not near-term mitigation.
5. **Build a "procurement crisis" scenario** where only 1–2 institutions sign per year. This is not the base case, but it's close enough to be worth planning against.

### For the Sales Strategy

1. **Find a procurement shortcut that actually works.** Options:
   - **TEQSA alignment**: If the Durability Rating can be positioned as evidence for re-registration, it moves from "discretionary" to "compliance-adjacent" — the fastest path through university procurement.
   - **Consortium buying**: Sell to a group of universities simultaneously (e.g., all Go8, all ATN) through a peak-body agreement. One procurement, multiple institutions.
   - **Embed in existing budget lines**: Can the rating be purchased under an existing category — curriculum review consulting, quality assurance, strategic planning — rather than requiring a new line item?

2. **Start procurement conversations 12–18 months before revenue is needed.** The Year 1 pilot partners should have procurement processes initiated *during* the pilot, not after.

3. **Hire a sales lead who has sold into Australian university procurement before.** Not enterprise SaaS — university procurement specifically. They know the budget cycles, the committees, and the shortcuts.

### For the Risk Framework

1. **Reclassify procurement velocity from MEDIUM to CRITICAL.** It is the binding constraint on the entire financial model.
2. **Add a specific procurement-velocity KPI** to the quarterly review: "Institutions in active procurement pipeline" (not just "institutions in conversation").
3. **Create a hard gate**: do not hire to Year 3 cost levels until 10+ institutions are through procurement (not just signed — through procurement, with PO issued).

---

*This analysis is deliberately pessimistic. It assumes the plan's assumptions are wrong and asks what happens. The purpose is not to argue Evidura is unviable — it's to ensure the financial model doesn't promise what the procurement environment cannot deliver, and to identify the real constraints before they become crises.*
