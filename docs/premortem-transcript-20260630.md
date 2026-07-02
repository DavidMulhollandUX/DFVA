# Evidura — Premortem Transcript

**Date:** June 30, 2026
**Subject:** Evidura Business Model & Financial Strategy
**Method:** Gary Klein prospective hindsight — 6-month failure horizon (December 2026)
**Agents deployed:** 9 independent deep-dive investigators, 3 parallel batches

---

## Context Gathered

- **What is it?** Evidura: a degree durability rating agency. Tiered institutional subscription model ($19K–$49K/yr) charging universities to rate their programs against AI labour-market disruption. Three-phase rollout: pilot → soft commercial → scale. Target: $10M ARR by Year 5 across 400 institutions.
- **Who is it for?** Australian university leaders (DVC-Academic, Deans, Program Directors), professional accreditation bodies (AACSB, AMC), eventually international universities and students.
- **What does success look like?** Sustainable, independent rating agency. Year 3: $1.64M ARR, 26 AU institutions, profitable. Year 5: $10M ARR, 400 institutions globally, certification seal active.

---

## Raw Premortem — 9 Failure Reasons

1. **Independence perceived as sham** — UoM-incubated rating tool charging competitor universities; Go8 design partners balk at paying
2. **Universities suppress ratings** — reputation-protection machines; first CRITICAL rating generates legal threat, not sales inquiry
3. **Accreditation bodies never pay** — 3-5 year cycles, no procurement mechanism, no precedent
4. **Benchmark dataset stalls** — 26 data points isn't a dataset; international expansion needs data that doesn't exist yet
5. **Unit economics don't close** — $218K EBITDA can't fund international expansion; $10M Year 5 requires $23M–$27M in growth capital
6. **Competitor enters free** — Lightcast/KKR gives product away in Australia; Evidura at $49K can't compete
7. **LLM methodology challenged** — CRITICAL-rated program disputes score; external review finds no reliability testing; credibility collapses
8. **Agent-native channel generates zero demand** — Deans don't use Claude Code; no causal chain from AI citations to institutional purchases
9. **University procurement kills velocity** — 12-18 month cycles, no budget line item; 3-4 institutions/year, not 12

---

## Agent Deep-Dives

### Agent 1: Independence Perceived as Sham

**Failure Story:** Go8 design partners participate free in Phase 1, see UoM programs scoring highest on a UoM-built methodology, then receive a $49K invoice from a founder still employed by UoM. Narrative mutates through the sector: "Melbourne built a tool to grade the rest of us, gave themselves the highest scores, and now wants us to pay." The Go8 comparison (UoM 29/36 vs USyd 19/36) becomes a smoking gun. The spin-out doesn't fix the perception — the origin story is baked in. 38 of 41 universities view Evidura as a UoM commercialisation play dressed as a rating agency. Pipeline empties. Seed funding burns out. Venture dies quietly in procurement meetings where the independence question fails to satisfy.

**Underlying Assumption:** Structural separation (Year 2 spin-out + independent board + governance charter + revenue cap) can retroactively cure the perception of captured independence created by the incubation period.

**Early Warning Signs:** Founder's dual role visible from Day 0; Go8 comparison shows UoM scoring highest; free-pilot-to-paid-transition psychology creates resentment; independence deferred, not resolved; "academic research output" framing contradicts "rating agency" brand positioning; revenue cap reads as admission of problem; benchmark dataset built on UoM-first data; "one of us" origin story only works if you leave.

### Agent 2: Universities Suppress Ratings

**Failure Story:** Pilot reveals 0% RESILIENT, 83% MODERATE, 15% HIGH RISK, 2% CRITICAL. The tool is structurally negative — it tells most programs they're at risk. First public CRITICAL rating (Screenwriting, 11/36) lands in March 2027 State of Degree Durability index. Program director publishes open letter. University General Counsel demands retraction. Peak body (Universities Australia) circulates concerns about "unsolicited, unvalidated third-party ratings." Other universities pre-emptively withdraw from conversations. The demand-pull assumption collapses: no university invites a rating that might declare its programs CRITICAL. Revenue → $0 within 180 days of first public rating.

**Underlying Assumption:** Demand pull from rating subjects — that universities will want to be publicly rated and benchmarked, the way bond issuers need Moody's to access capital markets. Universities already have self-accreditation authority. They don't need a rating. They need the rating not to exist.

**Early Warning Signs:** No design partners volunteered (all recruited); legal/compliance teams joined calls early; first questions were about opt-out and right-of-reply, not price; 0% Resilient scores reveal the tool is structurally negative; no DVC forwarded results internally without prompting; "defamation" raised unprompted in conversations.

### Agent 3: Accreditation Bodies Never Pay

**Failure Story:** Q4 2026 conversations begin with AACSB Asia-Pacific. Exploratory meeting reveals three barriers: AACSB is a membership body (staff cannot endorse vendors), standards revision cycles run 3-5 years from conversation to mandate, and there's no procurement mechanism for third-party tools. 2027 pilot proposal (3-5 business schools use rating as supplementary CIR evidence) fails — deans resist politically, peer review process requires training and legal review. 2028-2029: next standards review won't conclude until 2030-2032. AMC follows same pattern — standards exist, but the body doesn't buy tools. Engineers Australia has no AI criterion and an $8.1M deficit. Accreditation-body revenue: $0 across four years.

**Underlying Assumption:** Accreditation bodies behave like enterprise buyers — that they can evaluate, purchase, and deploy within 12-24 months. In reality, they are standard-setters and certifiers, not procurement entities. They create demand among universities; they do not buy themselves.

**Early Warning Signs:** No accreditation-body interview conducted (target #19 marked [ ] Not started); Falsifiable Question 7 unanswered; competitive intelligence doc explicitly states the 3-5 year timeline mismatch; AACSB Australian revenue (~$1.1M over 6 years) makes $40K–$120K/yr licence implausible; no precedent for a body paying a startup vendor; independence conflict amplified at the body level.

### Agent 4: Benchmark Dataset Never Reaches Critical Mass

**Failure Story:** Evidura signs 24 Australian institutions — strong domestic uptake relative to 41 total. But when NZ and UK sales conversations begin, buyers ask: "How do we compare against our own sector?" 24 Australian data points aren't a benchmark for a UK university. Discipline × institution-type cells have N=1 or N=2. The NZ conversation dies first. UK follows. Benchmark access licence product ($112K–$150K projected) collapses to zero. International seeding (action item #7, Q2 2027) is scheduled after revenue targets — the circular dependency was always there. Lightcast enters Year 4 with an internationally-rich dataset built from 18B+ labour market data points — no institutional relationships required. First-mover window closes.

**Underlying Assumption:** The Australian benchmark dataset will be valuable enough to sell internationally — and international customers will buy before the international dataset exists to make it valuable.

**Early Warning Signs:** "Seed the dataset" scheduled after revenue targets; Australian-only TAM of $1M–$1.5M acknowledged in the plan; no budget line for international dataset bootstrapping; value proposition written for Australian buyers; Lightcast data-scale asymmetry (18B+ data points vs 26 institutional scores).

### Agent 5: Unit Economics Don't Close

**Failure Story:** Year 3 at $218K EBITDA. International expansion requires $6.48M–$18M in acquisition costs (realistic CAC) against $218K retained earnings. The "One Chart That Matters" shows a 9.6× EBITDA jump Year 3→4 with no capital bridge. Business plateaus at $1.2M–$1.6M ARR. The $5.7M EBITDA gap can't be filled through operations. Capital raise at realistic scale ($23.5M–$26.9M) exceeds what an Australian university-incubated startup can attract. The "dead zone" of startup finance: margins too thin to self-fund, growth too slow for VC, revenue too small for debt. The business survives as a profitable Australian rating agency with $1.5M ARR — a failure only by its own $10M ambition.

**Underlying Assumption:** The business can self-fund international expansion from Australian operating profits. Realistic shortfall: $11.88M at realistic international CAC.

**Early Warning Signs:** P&L shows 6.6× gap between retained earnings and acquisition spend; "One Chart" implies impossible EBITDA jump; talent costs below-market for international hires; revenue concentration rule is an unmodelled capital multiplier; 400-institution target exceeds ~318 universities in named markets; seed raise mislabelled as governance fund, not first tranche of $27M; "conservative" labels camouflage CRITICAL-banded projections.

### Agent 6: Well-Funded Competitor Enters Free

**Failure Story:** January 2027: Lightcast announces Skillabi for Australia — free for first year. The entire Evidura sales pipeline freezes. Procurement officers: "Why would we pay $49K when there's a free alternative from an established vendor?" Year 2 revenue: $87K (3 institutions from pre-existing relationships), against $920K projected. Accreditation-body conversations die — AACSB won't engage with a tool whose commercial viability is in question. February 2028: Evidura Pty Ltd wound down. The 18-36 month window was never a window — it was grace from a competitor who hadn't decided to care. KKR can make the Australian market uneconomic with a rounding-error budget.

**Underlying Assumption:** The 18-36 month first-mover window is guaranteed. It was a discovery assumption (they haven't noticed Australia) that collapsed into a caring assumption (they haven't bothered yet). The competitive intelligence doc itself documents Lightcast's 5 acquisitions in 2025 and existing Australian distribution — the signal was there.

**Early Warning Signs:** Lightcast's 5 acquisitions in 2025 (active roll-up); existing Australian distribution via Labour Insight since 2017; AU university margins at 5.3% (no budget for premium); moat depends on time not guaranteed; independence as a paid premium no one needs when free exists; accreditation revenue is untested assumption.

### Agent 7: LLM Methodology Successfully Challenged

**Failure Story:** March 2027: State of Degree Durability index launches. MC-SCWR Screenwriting at 11/36 CRITICAL. Program director publishes open letter questioning methodology, methodology provenance (UoM-incubated), and the training data behind the LLM scorer. University commissions external review. Findings: no inter-rater reliability testing conducted, LLM hallucinations identified in scoring rationales (invented unit descriptions), handbook content variability makes scores incomparable, and zero human verification of any pilot rating. One news cycle. Campus Review and The Australian pick up the story. AACSB withdraws from all conversations. Go8 design partners demand contract termination with prejudice. Revenue → $0 within 90 days. Evidura wound down, methodology discredited, the "durability rating" concept poisoned for any future entrant.

**Underlying Assumption:** An LLM, given a sufficiently structured prompt, can produce scoring outputs reliable enough for external publication without human verification.

**Early Warning Signs:** Methodology §5 explicitly states no inter-rater reliability; sole CRITICAL program (Screenwriting) is in the rubric's weakest domain; "LLM-assisted, human-verified" is a plan not a practice; no handbook version-locking protocol; RESILIENT threshold structurally unreachable for arts/humanities; independence constraint makes single challenge catastrophic.

### Agent 8: Agent-Native Channel Generates Zero Demand

**Failure Story:** The MCP tools work beautifully. Six clean endpoints. AI agents query Evidura ratings programmatically. But 18 months in: zero attributable leads. Zero attributable revenue. Zero institutional purchasing decisions traced to AI agent citations. The causal chain never existed — DVCs-Academic don't use Claude Code, Deans don't configure MCP servers, and no procurement officer has ever signed a $49K contract because "our AI coding assistant cited this rating." The channel is a category error: builder tools don't reach institutional buyers. Bandwidth spent on MCP infrastructure in Years 1-3 is bandwidth not spent on the relationships that actually close deals. The channel is quietly removed from the pitch deck in Year 4.

**Underlying Assumption:** AI agent citations will translate into institutional purchasing decisions — a causal chain with zero observed instances in any B2B product category.

**Early Warning Signs:** No agent-native revenue line item in P&L; buyer/user mismatch is visible in the BMC; MCP tools are thin wrappers with no agent-specific optimisation; entire channel can be deleted with zero revenue impact; "seeding demand" is unfalsifiable; no agent-native success metric exists; temporal deferral (Years 4-5) masks zero accountability.

### Agent 9: University Procurement Kills Sales Velocity

**Failure Story:** The plan assumes enterprise B2B SaaS procurement timelines applied to Australian universities — publicly funded, committee-governed institutions with 12-18 month procurement cycles for any new budget category. Year 1 pilot: 3-5 Go8 partners (free). Year 2: the conversion starts. But "curriculum durability rating" has no budget line item, no procurement category, and no precedent. Even enthusiastic Deans can't sign — the conversation moves from the Dean to the CFO to the procurement office to the legal team and stalls at each gate. Actual velocity: 3 institutions in Year 2, not 12-15. Year 3: 5 institutions total, not 26. Break-even pushes from Month 20 to Month 42. Capital requirement rises from $500K to $1.8M. The "relationship-driven sales" advantage is actually a velocity constraint — each DVC relationship takes months to cultivate and produces one decision, not a pipeline.

**Underlying Assumption:** University procurement behaves like enterprise B2B SaaS — 9-month CAC payback, 8-9 new signings per year. The $18K CAC and 9-month payback are SaaS benchmarks, not university procurement benchmarks.

**Early Warning Signs:** No budget line item exists; 5.3% margins + cost-cutting; risk table classifies procurement as MEDIUM (should be CRITICAL); Year 2 ramp requires mathematically impossible signings rate; relationship-driven sales are inherently slow; unit economics built on false procurement velocity premise; accreditation-body channel contradicts its own timeline.

---

## Synthesis

### Most Likely Failure
**Independence + procurement velocity compound fatally.** Competitor universities see a UoM-incubated rating tool as a protection racket — and even those that might buy can't, because procurement takes 12-18 months for a new category with no budget line item. The Go8 design partners who participated free balk at the $49K invoice. Sales velocity: 3-4 institutions/year, not 12. Year 3 ARR: ~$300K, not $1.6M. Break-even never arrives. The spin-out burns its seed funding and closes quietly.

### Most Dangerous Failure
**The LLM methodology is successfully challenged.** A CRITICAL-rated program disputes the score. An external review finds no inter-rater reliability testing, LLM hallucinations, and zero human verification. The methodology is dead — and with it, every revenue line, every partnership, and the entire brand proposition. This kills the product itself, not just the business model.

### The Hidden Assumption
**Universities want to be publicly rated.** Every element of the plan assumes demand pull from rating subjects. But universities are reputation-protection machines. They don't need a rating to access anything — they already have self-accreditation authority. They need Evidura not to exist.

### Revised Plan (7 concrete changes)
1. Pivot from public rating agency → private benchmarking service (McKinsey model: they pay, they own the output)
2. Resolve independence before any competitor university is asked to pay (founder resigns from UoM or venture transferred)
3. Kill accreditation-body revenue line (they're distribution channels, not customers)
4. Re-baseline sales velocity to 3–5 institutions/year; Year 3 target drops to 8-12
5. Commission multi-rater reliability study before any external sale (>0.8 Cohen's kappa)
6. Accept $1.5M–$2M ARR ceiling for Australia (raise venture funding or accept lifestyle business)
7. Drop agent-native distribution as revenue channel (reclassify as infrastructure only)

### Pre-Launch Checklist (7 items)
1. Multi-rater reliability study completed and published
2. Independence structure resolved before first external invoice
3. First 3 paying customers secured through existing relationships
4. Legal review of methodology completed; E&O insurance in place
5. "No public ratings without consent" policy codified
6. Procurement pathway validated through 3 DVC interviews
7. Competitor monitoring active — verify the 18-36 month window monthly

---

*Transcript generated June 30, 2026. 9 independent agents. 6-month failure horizon. Full deep-dive files saved to docs/evidura-failure-story-*.md and docs/evidura-deepdive-*.md.*
