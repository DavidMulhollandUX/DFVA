# The DFVA Rubric: Full Evolution, v1.0 → v4.2

Compiled 2026-08-16 · Service Experience & Design, University of Melbourne

This document traces every generation of the Degree Future-Viability Assessment
rubric — what each version measured, why it changed, and where each retired
dimension went. It is a synthesis; the versioned methodology documents remain
the instruments of record:

- v1: [dfva-methodology.md](dfva-methodology.md)
- v2: [dfva-v2-methodology.md](dfva-v2-methodology.md)
- v3: [dfva-v3-methodology.md](dfva-v3-methodology.md)
- v3.1: [dfva-v31-methodology.md](dfva-v31-methodology.md)
- v4.0: [dfva-panelc-v4-recommendation.md](dfva-panelc-v4-recommendation.md)
- v4.1: [dfva-panelc-v41-recommendation.md](dfva-panelc-v41-recommendation.md)
- v4.2: [dfva-v4-agent-harness.md](dfva-v4-agent-harness.md) ("W3 and
  in-practice cohorts"); canonical instrument `dfva/source/rubricV4.ts`
  (`V4_VERSION = '4.2-draft'`)

---

## Timeline at a glance

| Version | Date | One-line character | Status |
| --- | --- | --- | --- |
| **v1.0** | May–Jun 2026 | 11-dimension composite /36, four risk bands, LLM-scored from handbooks | Production (`evidura.ai`) |
| v1.x refinements | Jun–Jul 2026 | Single-sourcing, Σ-reconciliation, JIR-evidenced D10 re-scoring, NA-aware scoring | Folded into v1 |
| **v2.0** | Aug 2026 | Composite decomposed into panels (measured / scored / gated / metadata); 2×2 quadrant matrix | Prototype (`dev.evidura.ai`) |
| **v3.0** | 2026-08-08 | Measurement-integrity revision: authoritative Felten AIOE, provenance schema, uncertainty quantification, confidence-first display | Preview |
| **v3.1** | 2026-08-08 | Exact enumeration replaces Monte Carlo; sensitivity analysis; stability classes; extension-cohort protocol | Preview (deployed) |
| **v4.0** | 2026-08-13 | Panel C re-anchored on TEQSA adaptive capabilities (C1–C5); depth becomes gate G1; Irreplaceability retired | Working draft |
| **v4.1** | 2026-08-14 | Workplace-practice sub-scale W1–W3 added (Lyons review); overlaps closed; sum-or-separate rule pre-registered | Working draft; migration cycle 33/34 scored |
| **v4.2** | Aug 2026 | W3 gains an in-practice route for already-practising cohorts (additive amendment) | Working draft (current) |

Publication of the v4 family is gated on the migration cycle; nothing in v4
changes v1–v3.1 scoring.

---

## Rationale: why the rubric is built the way it is

The rubric's rationale operates at three levels — why an instrument exists at
all, why it measures the way it does, and why its specific items are the ones
chosen. Later sections record what changed at each version; this section
records the reasoning that has driven every one of those changes.

### Why an instrument exists at all

The founding observation (v1 methodology §1) is a gap in the
quality-assurance landscape: the AQF, TEQSA's Higher Education Standards
Framework, and professional accreditation all assess curriculum quality,
graduate attributes and compliance — but none systematically measures a
program's resilience to AI automation of the tasks its graduates will
actually do. Universities were making portfolio decisions about AI-exposed
programs with no instrument. DFVA was built to be that instrument: something
a faculty can run over public evidence that produces a defensible, auditable
position rather than an opinion.

Two constraints followed from that purpose and shaped everything else:

- **Public evidence only.** Scoring from handbooks means any institution can
  be assessed without cooperation, every score is checkable against a citable
  source, and the instrument cannot be gamed by private assurances. The cost —
  programs with thin public documentation score low on evidence rather than
  quality — surfaced in the v1 Go8 pilot (the "transparency effect") and was
  accepted as a declared limitation rather than a reason to use private data.
- **Anchored levels, not holistic judgment.** Each dimension gets four
  behaviourally anchored levels (0 absent · 1 mentioned-not-assessed ·
  2 developed · 3 embedded-and-assessed) so a score is a claim about
  documented evidence, not an impression. This is what made LLM scoring
  viable in v1 and what the IRR study can eventually test.

### Why these constructs — the theory of AI resistance

The dimension set operationalises a specific position in the
labour-economics literature: AI substitutes for tasks, not occupations, and
some capabilities are structural bottlenecks to substitution. The v1
dimensions were selected to cover four defence classes:

- **Cognitive defences** (D2, D3, D4, D7). From Autor–Levy–Murnane's
  routine/non-routine task distinction and Frey & Osborne's engineering
  bottlenecks: causal and systems reasoning, judgment under Knightian
  uncertainty, and primary evidence generation are what current models do
  worst. A curriculum that builds and *assesses* these builds substitution
  barriers.
- **Professional and institutional defences** (D1, D6, D8). From Becker's
  human capital, Collins's credentialism, and Susskind & Susskind: regulatory
  gatekeeping (AHPRA, APAC), specialist depth, and relational work with
  accountability to real people are closure mechanisms AI cannot easily route
  around.
- **Adaptive defences** (D5, D9). A program that teaches students to use,
  critique and govern AI produces graduates who are complemented rather than
  replaced — Brynjolfsson & McAfee's "racing with machines."
- **Market grounding** (D10, B). The link from curriculum claims to realised
  labour-market outcomes, so the instrument is not purely input-side.

The bonus dimension B tried to score the *integration* of these — the
intuition that rare combinations (technical + clinical + regulatory) are
worth more than their parts. v4 later concluded the intuition was right but
the item was wrong: integration is expressed by the program's position
(exposure × adaptiveness), and scoring it separately double-counted its
inputs.

### Why the measurement philosophy changed

The v1 composite embodied an implicit assumption: that eleven judgments of
different kinds can be summed into one meaningful number. The 66-program
score matrix falsified that assumption empirically, and v2's principles
P1–P5 are the corrected epistemology — the closest thing the instrument has
to a constitution:

- **Measure what is measurable; score only what requires judgment.**
  Destination exposure is a fact about occupations, computable from the AIOE
  index and destination data. Asking a rater to infer it from handbook prose
  (v1's D1 and D8) was a category error that depressed agreement and made the
  composite uninterpretable. Curriculum properties, by contrast, genuinely
  require anchored judgment.
- **Never sum across evidence types.** A measured quantity, a scored
  judgment, a binary gate and evidence metadata answer different questions.
  Summing them let a program offset a curriculum weakness with an
  evidence-availability strength (D10) — a trade the construct does not
  license. This principle has been re-applied at every generation since: it
  is why gates stay out of the sum, why Panel D never moves position, and why
  v4.1's W sub-scale is reported beside the axis rather than added to it.
- **Exposure is not risk.** The most-repeated caveat in the instrument. AIOE
  encodes task *overlap* with AI capability, not direction of effect — and
  the v3 audit found exposure positively associated with projected employment
  growth (ρ = +0.51). Whether overlap becomes substitution or augmentation
  depends on curriculum defences, which is what Panel C measures. Crossing
  the two axes rather than netting them is the instrument's central design
  claim.
- **Degenerate items are removed or demoted, not kept for continuity.** D9 at
  item–total r = 0.06 is noise; D4/D6 at 62–83% modal are floors, not
  discriminators. Keeping them for the composite's continuity would trade
  validity for comparability.
- **Evidence quality is reported, never scored.** Data availability tells you
  how much to trust a placement, not where the placement is.

The v3/v3.1 layer added a second-order rationale: **an instrument's stated
precision must match its actual precision.** v2 reported categorical
quadrants its own measurement could not support (26 of 34 programs within
the fragility band). v3's response — provenance schemas, build-failing
reproduction guards, uncertainty published before labels, labels suppressed
when unstable — reflects the view that for an assessment product, trust is
the actual product: a methodology whose statistics do not reproduce from its
own data forfeits the reader's confidence in everything else. Hence
corrections issued as public errata rather than silent edits, and migration
tables at every version boundary.

### Why the v4 anchors are written the way they are

v4's four design rules encode lessons about what handbook evidence can and
cannot support:

- **R1 — declarative anchors** (the Brynjolfsson–Mitchell–Rock SML form):
  "assessment requires students to justify when they relied on or overrode an
  AI system" is checkable in a handbook; "graduates exercise evaluative
  judgement" is not. Every anchor must be a checkable statement about
  documented curriculum features.
- **R2 — level 3 requires assessment evidence.** Grounded in constructive
  alignment and Barrie's finding that stated graduate attributes are not
  evidence of attainment. A capability that appears in learning outcomes but
  is never assessed scores 1, everywhere, uniformly. This also deliberately
  attacks the ceiling problem — 31% of v3.1 items sat at ceiling, degrading
  discrimination — by making level 3 rare by construction.
- **R3 — every score cites its handbook lines**, so the chain from evidence
  to number is auditable per program.
- **R4 — features, never labels** (v4.1): never score a program up because
  the handbook says "authentic" or "work-ready" — Fawns et al.'s warning that
  the label is a "thought-terminating cliché". Marketing prose is the
  assessment-design equivalent of the outcome-statement problem R2 already
  blocks.

### Why external authority and falsifiability entered in v4

The subtlest defect the evolution corrected: v3.1's Panel C construct was
self-referential — "capabilities that resist AI substitution" was defined
only by its own five anchors, so no reviewer could say an item was
*missing*. The TEQSA adaptive-capabilities framework (Lodge et al. 2026)
supplied an external, regulator-commissioned referent — which immediately
exposed the gaps (metacognition, evaluative judgement, transfer) and, via
the Lyons review, its own scope limit (workplace effectiveness), producing
v4.1.

The same turn made the instrument falsifiable in a way it had never been:
the C/W two-factor structure is a testable prediction with a pre-registered
decision rule (sum at r ≥ 0.6, keep separate below), fixed before the
evidence exists — because a rule chosen after seeing the answer is not a
test. That is the rubric's current epistemic posture: every structural claim
either has statistical support from the score matrix, an external construct
authority, or a pre-registered test that could kill it.

---

## v1.0 — The eleven-dimension composite (May–June 2026)

### Origins: before the repo

The rubric predates the repository. Its full provenance chain — recovered
in stages during August 2026 — runs: a **video monologue** on degrees
obsolete by 2027 (transcribed as a seed prompt) → a **Gemini Deep Research
session (2026-02-18)** producing the "Great Flattening" report
([preserved](dfva-origin-gemini-report.md) ·
[reviewed](dfva-origin-gemini-review.md)) → its research plan, transcribed
and re-run through **Perplexity** (~April 2026;
[preserved](dfva-origin-conversation.md) ·
[sources verified](dfva-rubric-original-sources.md) ·
[reverse-engineered](dfva-synthesis-reverse-engineering.md)) → the rubric.
Two dimension names (D2 Systems Thinking, D4 Decision-Making Under
Uncertainty), the human-middleware frame, the 2027 horizon and the frank
advisory posture come from the video seed essentially verbatim. The initial
commit (2026-05-07, `1579583`) preserves the later links of that chain in
three artifacts.

**Stage 0 — the institutional spark (April 2026).**
`COMPASS-Discover-Proposal.md`, dated 2026-04-22, is an application by DM
(Associate Director, Service Experience & Design, Enterprise Services Group)
to the UoM Education Innovation Community of Practice *Discover* program.
Its problem statement is the founding rationale verbatim: *"no university
has a fast, evidence-based, repeatable way to answer the question that
matters most… will this degree still be economically valuable in five
years?"* COMPASS then expanded to "Curriculum Outcomes and Market Proof
Alignment Scoring System" (the current expansion came later), and the
proposal already contains the complete 11-dimension rubric, the four risk
bands, and the three integrated capabilities that became the report family:
Viability Assessment, Market Intelligence, Curriculum Redesign Advisor. The
rubric therefore existed in full by 22 April 2026 at the latest.

**Stage 1 — conversational design (the origin conversation, now preserved).**
The Perplexity export in the initial commit — *"Act as a prompt engineer, I
want to turn this workflow into a skill to run this within VSCode"* — cites
its own source as a `pasted-text.txt`: the DFVA workflow was pasted *into*
that session from an earlier conversation. That earlier conversation was
recovered in August 2026 and is preserved verbatim at
[dfva-origin-conversation.md](dfva-origin-conversation.md), with a full
source reconstruction in
[dfva-rubric-original-sources.md](dfva-rubric-original-sources.md). It shows
the rubric created in three turns: an eight-point research brief on "human
middleware" → a cited synthesis → *"create an assessment based on the above
which can be applied to any course"* → the rubric, complete. Its output,
embedded in the packaging export as the DFVA system prompt, comprised:
the persona, the 10 dimensions + Irreplaceability bonus with 0–3 anchors in
one table, the risk bands (with traffic-light emoji; CRITICAL glossed
"human middleware"), the Three Threshold Questions ("Could a well-prompted
AI agent produce 80% of what this graduate produces in their first two
years?"), the verdict / recommendations / analogue-graduate-profile output
format, and the behaviour rules ("Do not soften findings…", "never use 'it
depends'"). Its anchor concept was **"human middleware"** — roles whose
value is reformatting and routing structured information by template — with
a stated boundary of obsolescence: template execution vs. original problem
solving, information reformatting vs. decision ownership, tool operation
vs. system design. The declared evidence base was practitioner-grade (WEF
Future of Jobs 2025, McKinsey, ILO, AI capability benchmarks); the academic
grounding came later. The /36 band scale against eleven 0–3 items (Σ = 33)
also dates to this prompt and was carried forward unchanged.

**Stage 2 — the packaging session (Perplexity).** The export itself is a
deployment guide: four options for running DFVA from VS Code (Copilot
custom instructions; a Continue.dev slash command; a Node.js batch runner
calling the Claude API with handbook fetching, rate limiting and an
auto-generated INDEX.md league table; VS Code tasks). It closes by naming
the three prompt-engineering principles that governed the design:

1. **Grounding over generation** — fetch and quote the handbook before
   scoring, degrade gracefully with an explicit caveat when the fetch fails.
2. **Structured output enforcement** — a fixed markdown schema so reports
   are machine-readable (for index generation) and human-readable without
   post-processing.
3. **The no-hedge-language constraint** — "never use 'it depends'", called
   in the export "the single most important prompt engineering decision",
   forcing commitment to a score with uncertainty confined to the verdict.

**Stage 3 — repo instantiation (2026-05-07).** The initial commit
implements the guide: the README describes the repository as "a reusable VS
Code DFVA skill package" with `/dfva`, `/dfva-market` and `/dfva-recommend`
slash commands for both Copilot and Continue — the scoring / market /
recommend three-prompt family that survives as today's report card
structure. The first target list was bachelor's degrees, including five
Fine Arts programs — the cohort the human-middleware thesis most directly
threatened. The market prompt already carried a "CURRENT DISCUSSION SIGNALS
(X)" section — the ancestor of the sourcing-attribution rules that
`dfva:report-lint` now enforces.

Development then proceeded in the reverse of the order the methodology
paper's structure implies:

1. **First reports and pilot (May–June 2026):** MC-IS, B-Sci, B-Des and
   MC-SCIBIT scored within the first week; a workflow agent and report
   visualisation components added; scaled to the 41-program pilot with QILT /
   JSA / AIOE enrichment of D10.
2. **Formalisation (June 2026):** the rubric single-sourced into
   `dfva/source/rubric.ts` (2026-06-07), then the v1.0 methodology paper
   (2026-06-10) mapped formal theory onto each existing dimension —
   retrospective grounding, together with an honest validation section
   (single scorer, no IRR, single institution).

That birth order explains the later arc. A rubric born as a persuasive
prompt persona carried exactly the defects v2–v4 then removed — dimensions
chosen for narrative completeness over measurement properties (D9), a
rhetorically satisfying bonus that was halo (B), destination inference
bundled with curriculum judgment (D1/D8), and a composite built to deliver
a confident verdict rather than a calibrated one. And of the three founding
prompt-engineering principles, two were progressively *hardened* — grounding
became R3's cite-the-handbook-lines rule and the build-failing evidence
guards; structured output became the generated single-source report
pipeline — while the third, the no-hedge rule, was deliberately *inverted*
by v3's confidence-first display, which suppresses labels its own precision
cannot support. The instrument's maturation is legible in that reversal:
from committing to a verdict, to earning one.

### The instrument

The original rubric operationalised AI labour-market resilience as **eleven
dimensions scored 0–3 from public handbook content**, summed into a composite
out of 36 and mapped to four risk bands:

| Band | Range |
| --- | --- |
| RESILIENT | 28–36 |
| MODERATE RISK | 20–27 |
| HIGH RISK | 12–19 |
| CRITICAL | 0–11 |

The dimensions, each grounded in a named theoretical tradition (v1 methodology §2):

| # | Dimension | Grounding (abridged) |
| --- | --- | --- |
| D1 | Automation Exposure of Roles | Autor–Levy–Murnane; Frey & Osborne; Acemoglu & Restrepo |
| D2 | Systems Thinking & Problem Framing | Meadows; Senge |
| D3 | Technical & Quantitative Depth | Becker human capital; Brynjolfsson & McAfee |
| D4 | Decision-Making Under Uncertainty | Knight; Kahneman & Tversky |
| D5 | AI Literacy & Governance | Long & Magerko; UNESCO |
| D6 | Domain Depth & Specialisation | Smith; Becker; Collins (credentialism) |
| D7 | Research Methods Rigour | Boyer; Brew |
| D8 | Human & Relational Capability | Noddings; Hochschild; Susskind & Susskind |
| D9 | Curriculum Currency & Adaptability | Barnett & Coate; OECD |
| D10 | Outcome Evidence | Spence signalling; Tomlinson |
| B | Irreplaceability Premium (bonus) | Acemoglu & Restrepo task framework |

Scoring scale: 0 Absent · 1 Emerging (mentioned, not assessed) · 2 Developed ·
3 Exemplary (embedded, assessed, regulatory). Three handbook pages per program
(overview, structure, attributes/outcomes); single LLM scorer with a structured
prompt requiring evidence grounding. D10 was enriched with QILT GOS/GOS-L, JSA
Skills Priority List and Felten AIOE market data.

**Pilot findings (41 UoM graduate programs):** 83% MODERATE, 15% HIGH, 2%
CRITICAL, none RESILIENT. AI Literacy was the weakest dimension portfolio-wide
(mean 1.1/3); Domain Depth the strongest (2.8/3). A limited Go8 comparison
(USyd, UNSW) surfaced the transparency confound — public curriculum detail
drives scores as much as curriculum quality. Coverage later grew to 66 programs.

### v1-era refinements (June–July 2026)

These changed the pipeline and edge-case semantics, not the construct:

- **Single-sourcing** (2026-06-07, `55d293b`): the rubric became canonical at
  `dfva/source/rubric.ts`, generating the scoring prompts, demo and skill —
  ending hand-maintained copies.
- **Σ-reconciliation** (2026-06-22, `cfa7c92`): recommend-report generation
  repaired and stored scores reconciled to the sum of dimensions; a later guard
  (check #6) caught five more sum-drift programs.
- **JIR-evidenced D10 re-scoring** (2026-07-05, `c9622d2`): 12 programs
  re-scored on real alumni-destination evidence; 2 band changes (e.g. MC-CS →
  RESILIENT).
- **NA-aware scoring** (2026-07-06, `77818ff`): inapplicable dimensions score
  `null` instead of 0, with pro-rata renormalisation
  (Σ applicable × 11 / count, rounded half-down) and a `NOT RATABLE` verdict
  below 7 applicable dimensions. Fixed dh-lld and dh-sc mis-banding.

---

## v2.0 — Panel decomposition (August 2026)

Item-level analysis of the 66-program score matrix surfaced three structural
defects in the composite:

1. **Construct conflation.** D1 and D8 are properties of *destination
   occupations*, not the curriculum; scoring them from handbooks was a category
   error.
2. **Item degeneracy.** D9's item–total correlation was 0.06 (noise); D4
   (62.1% modal — originally misstated as ">70%", corrected by erratum) and D6
   (83.3% modal) saturated and contributed variance-free points.
3. **Evidence-type mixing.** The composite summed curriculum judgments,
   labour-market inferences and evidence-availability metadata (D10) into one
   number, licensing trades the construct does not permit.

v2's answer: **decompose, and never sum across evidence types** (principles
P1–P5). Every v1 dimension received an explicit disposition:

| Panel | Role | Contents |
| --- | --- | --- |
| **Panel A** | *Measured* | Destination AI exposure — mean Felten AIOE of occupations graduates actually enter (replaces scored D1 and D8) |
| **Panel C** | *Scored* | Curriculum adaptiveness = D2 + D3 + D7 + B + D5, /15, v1 anchors unchanged |
| **Gates** | *Binary* | D4 and D6 recast as PASS/FAIL conformance gates at the portfolio-modal level, excluded from the sum |
| **Panel D** | *Metadata* | Evidence confidence (replaces scored D10); reported, never scored into position |
| *Dropped* | — | D9 (undiscriminating; evidence not reliably present in handbooks) |

Programs were positioned on a **2×2 matrix** (exposure × adaptiveness, median
split) instead of a single band: Well-positioned / Comfortable / Attention /
Sheltered (for now), with 32 of 66 unplaced for lack of destination data. The
v1→v2 migration table was kept co-visible as the audit trail. v2 shipped as a
prototype at `dev.evidura.ai` (reference program MC-CS) while v1 remained
production.

---

## v3.0 — Measurement integrity and confidence-first display (2026-08-08)

v3 changed **no construct**; it existed because four v2 claims failed
reproduction in an audit:

| Audit finding | v3 disposition |
| --- | --- |
| Panel A figures came from a provisional LLM-scored proxy (ρ = 0.42 against the real AIOE; 20 of 34 programs change quadrant) | Authoritative Felten AIOE adopted; index provenance became a required, machine-checked field of every published value |
| 6 of 34 "measured" programs had under-50% destination-title coverage | Coverage repaired to 100% via 80 new crosswalk mappings; coverage stored and displayed per program |
| D4 saturation stated as ">70%"; source gives 62.1% | Corrected; erratum issued against the v2 document |
| Quadrants reported as stable categorical facts while 26 of 34 programs sat within the fragility band | Position reported as coordinates + uncertainty; labels probability-qualified and suppressed when unstable |

Substantive changes:

- **Program-grain destinations.** Panel A moved from JSA field-of-education
  data to JIR/LiveAlumni alumni titles at program grain (368-title crosswalk to
  O*NET-SOC → published AIOE, min–max rescaled 0–100) — buying grain at a
  disclosed evidence-tier cost.
- **Reproduction harness.** The generator fails the build on any unmapped
  title, any deviation > 0.01 from the archived authoritative table, or any
  quadrant mismatch.
- **Uncertainty quantification.** Panel C ratings perturbed ±1 with p = 0.1
  (Monte Carlo, 20,000 seeded draws); label display rules: m ≥ 0.80 single
  label, 0.60–0.80 dual "boundary case", < 0.60 coordinates only.
- **Measurement-first naming.** "Attention" → "High exposure · low
  adaptiveness"; narrative names demoted to glosses, because exposure is task
  overlap, not a risk finding.
- **Confidence-first reports** with the full destination-title table,
  provenance block, exposure-is-not-risk caveat co-located with every figure,
  and an intervention simulator that never offers exposure as a controllable.
- **Robustness result:** two independent recomputations (different destination
  bases, independently authored crosswalks) produced identical quadrant
  structure (9/14/8/3) with different absolute levels — the exposure axis's
  strongest validity evidence.

---

## v3.1 — Exact position stability (August 2026)

A correctness amendment to v3's uncertainty layer — no construct, panel, data
source or exposure value changed:

- **Exact enumeration replaces sampling.** Five items × three perturbation
  states = 3⁵ = **243 states**, enumerable in closed form. The Monte-Carlo
  estimate was seed-dependent at the decision boundary (the published "2 dual
  labels" was one draw from a distribution over {0, 1, 2}). Deterministic,
  seedless, byte-identical output guarded at build time.
- **Sensitivity is mandatory.** Modal probabilities published at three assumed
  rater-error rates (e = 0.05 / 0.10 / 0.20 → 0 / 2 / 14 of 34 programs fail
  the single-label rule), because no inter-rater study had run and the
  assumption — not the data — determined the headline.
- **Stability classes.** The exact distribution is bimodal with a 0.13-wide
  empty band; `stabilityClass` (boundary < 0.90 ≤ stable) cuts inside the gap,
  so the partition is robust to any cut in [0.85, 0.98]. 14 boundary / 20
  stable.
- **Clamping asymmetry disclosed:** 31% of scored items sat at ceiling, net
  drift −0.075; a symmetric alternative changed no label.
- **Deployment as a parallel instrument** (`/insights/v31/:code`, reference
  report Juris Doctor), followed by a display overhaul (answer-first three-part
  reports, plain-language probability, rubric anchors rendered in-report, full
  APA reference lists, portfolio page rebuilt off the authoritative
  measurement).
- **Extension-cohort protocol.** Late-placed programs (mc-urbhort, b-des,
  b-sci, then 244cw MPH) join against frozen reference medians (exposure 90.9,
  adaptiveness 10) without re-basing; a directional audit then showed ~51
  standalone programs placeable on evidence already in the repository —
  coverage's binding constraint is assessment throughput, not data.

v3.1's own conclusion set up v4: the rater study was the binding next step, and
**R7 — AI-literacy re-anchoring — was the next item queued to saturate.**

---

## v4.0 — Panel C re-anchored on the TEQSA adaptive capabilities (2026-08-13)

The first change to *what Panel C measures* since v2. Four defects
(adaptiveness literature review §2.1):

1. **Self-referential construct** — v3.1's Panel C was defined only by its own
   anchors; TEQSA's *Assuring quality learning in a gen AI-integrated future*
   (Lodge et al., June 2026) supplied an external, regulator-commissioned
   referent.
2. **Construct underrepresentation** (Messick) — metacognition, evaluative
   judgement, transfer, ethical reasoning and human–AI teaming were all absent.
3. **The labour economics contradicted D3's weighting** — Deming & Noray
   (2020): the applied-technical premium decays 44% → 14% between ages 24 and
   35; depth is a precondition, not adaptiveness evidence.
4. **B was halo, not signal** — its item–total r = 0.65 is what a
   general-impression item restating D3+D6+D8 produces.

The new instrument (canonical at `dfva/source/rubricV4.ts`):

| v3.1 Panel C | v4 Panel C | Disposition |
| --- | --- | --- |
| D2 Systems Thinking | **C1 Distributed cognition & relational capability** | C1 absorbs D2's integrative half and *restores D8* |
| D5 AI Literacy | **C3 Digital & AI literacy incl. governance** | Re-anchored one level up: tool operation caps at 1 |
| — | **C2 Hybrid metacognition & evaluative judgement** | New — the largest v3.1 construct gap |
| D9 (dropped in v2) | **C4 Life-long learning & transfer** | Restored, re-anchored on transfer (scoreable), not review recency (not) |
| D7 Research Rigour | **C5 Inquiry & evidence generation** | Retained essentially intact |
| D3 Technical Depth | **G1 Disciplinary foundation** (gate) | Moves to gate, absorbing the D6 gate — where TEQSA's architecture places depth |
| D4 gate | **G2 Decision-making under uncertainty** | Unchanged |
| B Irreplaceability | **Retired** | The claim lives in the position (exposure × adaptiveness) with G1 attesting depth |

Design rules: **R1** anchors are declarative statements about documented
curriculum evidence (the SML-rubric form); **R2** level 3 requires *assessment*
evidence — outcome statements score 1 everywhere (attacking the 31% ceiling
rate); **R3** every score cites handbook evidence lines.

Deliberately unchanged: 5 items × 4 levels, so the /15 scale and the entire
243-state stability machinery carry over. **v4 is a new instrument**: no v3.1
score is comparable, medians re-base, and publication requires a migration
cycle with a v3.1 → v4 table. A Kane-ordered validation sequence was written
down (IUA → content-validity panel → pilot → IRR on v4, never on the retiring
v3.1 → internal structure → extrapolation probes).

---

## v4.1 — The workplace-practice sub-scale (2026-08-14)

A/Prof Kayley Lyons's review of the v4 draft endorsed C1–C5 and named the same
defect class v4 had just fixed, in a different region: v4 derived its items
top-down from a framework whose scope is *AI adaptation*, so anything TEQSA
does not name, v4 could not see — professional skills, deeper learning
approaches (placements), authentic assessment.

The fix is a **second, separately reported sub-scale**, not five more items:

- **W1 Professional communication & conduct** — professional genres and
  audiences beyond the examiner, assessed conduct (HESF cl. 1.4.2, QILT ESS
  domains, Deming, Heckman).
- **W2 Authentic task design** — fidelity of core assessment to the
  discipline's own criterion situation (Gulikers 2004; Villarroel 2018);
  explicitly excludes evaluative judgement (that is C2).
- **W3 Work-situated learning** — extended, supervised, assessed workplace
  participation (HESF cl. 5.4.1, Kuh, Jackson); warrant is skill development,
  relevance and identity — *never* employment rates (Jackson & Collings 2018).

Structural decisions:

- **Two sub-scores, never summed.** Adaptiveness stays /15 and remains the
  position axis; W is /9 beside it. Summing would assert compensability (a
  placement point substituting for an AI-literacy point) — the halo mechanism
  that retired B, re-entering through arithmetic.
- **New design rule R4:** authenticity is scored from documented task features,
  never from the label ("authentic", "real-world", "work-ready") — Fawns et
  al.'s "thought-terminating cliché" warning.
- **Three overlaps closed in the same change:** C1 level 3 drops its placement
  exemplar; C4 level 3 drops its WIL route (both now W3's construct); W2
  excludes evaluative judgement. One construct, one home.
- **Falsifiable by design:** whether C and W resolve as two correlated factors
  is a pre-registered internal-structure prediction, with a **sum-or-separate
  decision rule fixed in advance** (run once at n ≥ 30, multi-rater, not
  during the migration cycle). Interim prior at n = 16: r(A, W) = 0.24 — near
  uncorrelated, with W discriminating about twice as widely as A.
- Enumeration state space grows 3⁵ = 243 → 3⁸ = 6,561; same algorithm. The IRR
  protocol re-pointed at eight items and two gates.

The reference pair that makes the case: Master of Public Health (A 9, W 6) and
Master of Computer Science (A 9, W 2) — indistinguishable on the v4.0 axis,
four points apart on workplace practice. The v4.1 migration cycle scored 33 of
34 reference programs by 2026-08-15.

---

## v4.2 — The W3 in-practice route (August 2026, current draft)

v4.1's W3 anchors presumed a **pre-professional cohort placed into a host
workplace** (placement, practitioner supervision, accountability to a host).
For mid-career cohorts already practising — where the workplace is the
student's own practice and no host or placement exists — W3 stopped
discriminating: the strongest available in-practice evidence (core, assessed,
real recipients, measured outcomes) landed on the same score as an unassessed
elective. The error only ever made such programs look *less* evidenced than
they are.

**The amendment:** W3 levels 2–3 gain an explicit **in-practice route**,
grounded in the work-based-learning literature (Lester & Costley 2010):

| Level | In-practice route (placement route word-for-word unchanged) |
| --- | --- |
| 2 | A core unit assesses activity conducted in the student's own professional practice, with real recipients and a documented outcome measure — but short or standing alone |
| 3 | A required sequence of assessed own-practice activity with structured reflection and documented accountability to workplace stakeholders (trainees, patients, clients or employer) |

Constraints: the cohort must be *documented* as practising in the evidence
extract, never assumed from the title; one-construct-one-home still binds (W2
takes the artefact evidence, W3 the participation evidence); the amendment is
**additive**, so every v4.1 score taken on the placement route carries forward
without re-scoring, and records keep the label of the run that produced them
(`4.1-draft` / `4.2-draft`). The adaptiveness median and all position labels
are untouched.

Worked example: **MC-SURGED** (Master of Surgical Education) — online delivery,
no placements, a cohort of practising surgeons, and MEDS90007 requiring
participants to design, deliver and reflect on their own workplace teaching
with measured trainee outcomes. Under v4.1 this misfit every anchor and scored
W3 = 1; under v4.2 the evidence is scorable as itself.

Deliberately deferred to the IRR study: whether consequentiality (real
recipient, real outcome) and external accountability structure (supervision,
host judgement) should become separate items — a structural change to W's
maximum, so it waits for inter-rater evidence.

---

## Dimension lineage, v1 → v4.2

| v1 (composite item) | v2/v3/v3.1 disposition | v4.0–v4.2 disposition |
| --- | --- | --- |
| D1 Automation Exposure | Retired as scored; subsumed by measured Panel A | Panel A unchanged |
| D2 Systems Thinking | Scored, Panel C | Absorbed into C1 (integrative half); trade-off content overlaps G2 |
| D3 Technical Depth | Scored, Panel C | Moved to gate G1 (precondition, not capability) |
| D4 Decision-Making | Gate (saturated, 62.1% modal) | Gate G2, unchanged |
| D5 AI Literacy | Scored, Panel C | Re-anchored one level up as C3 (governance at the top; tool operation caps at 1) |
| D6 Domain Depth | Gate (saturated, 83.3% modal) | Absorbed into gate G1 |
| D7 Research Rigour | Scored, Panel C | Retained as C5, essentially intact |
| D8 Human/Relational | Retired as scored (destination property) | Restored inside C1 (relational capability) |
| D9 Curriculum Currency | Dropped (item–total r = 0.06) | Restored as C4, re-anchored on transfer |
| D10 Outcome Evidence | Demoted to Panel D metadata | Panel D unchanged |
| B Irreplaceability | Scored, Panel C (r = 0.65 read as coherence) | **Retired** (r = 0.65 re-read as halo); claim lives in position + G1 |
| — | — | C2 Metacognition & evaluative judgement (new, v4.0) |
| — | — | W1–W3 Workplace practice sub-scale (new, v4.1; W3 in-practice route, v4.2) |

## The recurring pattern

Each generation was forced by the same discipline applied to a new layer:

1. **v1 → v2:** the *score matrix* was audited — degenerate and conflated items
   were removed, gated or demoted rather than kept for continuity.
2. **v2 → v3/v3.1:** the *measurements and their precision* were audited —
   claims that did not reproduce were corrected in public, and every published
   number gained provenance, guards and quantified (then exact) uncertainty.
3. **v3.1 → v4/v4.1/v4.2:** the *construct itself* was audited — first against
   an external framework (TEQSA), then against expert review (Lyons), then
   against a cohort the anchors silently excluded (practising professionals).

The constants throughout: never sum across evidence types; every retirement
and restoration is recorded with its statistical reason; migrations ship as
published cycles with side-by-side tables, never silent re-scores; and every
change lands in a single canonical source (`rubric.ts` / `rubricV4.ts`) from
which all downstream artifacts are generated.
