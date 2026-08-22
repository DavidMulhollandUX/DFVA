# DFVA v2: Durability Assessment — Methodology

*Version 2.0-prototype — August 2026*
*Service Experience & Design, University of Melbourne*
*Companion documents: [DFVA v1 Methodology](dfva-methodology.md) · [Portfolio Intelligence Report](dfva-portfolio-insights.md) · [Graduate-Outcomes Evidence Report](dfva-graduate-outcomes-report.md)*
*Superseded in part by: [DFVA v3 Methodology & Display Logic](dfva-v3-methodology.md) (measurement basis and display rules; constructs unchanged)*

> **Erratum (2026-08-08).** This document originally stated D4 Decision-Making saturation as ">70% of programs at the same level". The source matrix gives **62.1%** (41 of 66). The gating decision is unaffected — 62% modal on a two-level item remains ample justification — but the stated figure did not reproduce and is corrected below (marked *\[corrected\]*). Separately, the Panel A figures in §3.3 were computed from a provisional LLM-scored proxy, not the Felten AIOE index this document specifies; see v3 methodology §2 (R1) for the authoritative revision.

---

## 1. Abstract & Rationale

DFVA v1 operationalised eleven dimensions scored 0–3 from handbook evidence and summed them into a single composite (0–36) mapped to four risk bands. Application to 66 University of Melbourne programs, and item-level analysis of the resulting score matrix, surfaced three structural problems with the composite design:

1. **Construct conflation.** Two dimensions (D1 Automation Exposure, D8 Human/Relational Work) are properties of the *destination occupations* graduates enter, not of the *curriculum*. Scoring them from handbook text asked assessors to infer labour-market facts from curriculum documents — a category error that depressed inter-source agreement and made the composite uninterpretable as a curriculum measure.
2. **Item degeneracy.** D9 (Curriculum Currency) showed an item–total correlation of 0.06 — statistically indistinguishable from noise — because handbook documents rarely carry datable currency evidence. Two further dimensions saturated at their modal value across the portfolio (D4 Decision-Making: 62.1% of programs at the same level *\[corrected\]*; D6 Domain Depth: 83.3% modal), contributing variance-free points to the composite.
3. **Evidence-type mixing.** The composite summed curriculum judgments, labour-market inferences, and evidence-quality metadata (D10) into one number, so a program could offset a curriculum weakness with an evidence-availability strength — a trade the construct does not license.

DFVA v2 responds by **decomposing the composite into panels that are never summed across evidence types**: destination exposure is *measured* (Panel A), curriculum adaptiveness is *scored* (Panel C), saturated items become binary *gates*, and evidence quality becomes *metadata* (Panel D). Programs are positioned on a 2×2 matrix (adaptiveness × exposure) rather than a single ordinal band. The v2 instrument is currently a prototype deployed at `dev.evidura.ai`; v1 remains the production instrument at `evidura.ai`.

---

## 2. Design Principles

- **P1 — Measure what is measurable; score only what requires judgment.** Labour-market exposure is computed from administrative data; curriculum properties are scored against anchored rubrics.
- **P2 — Never sum across evidence types.** A measured quantity, a scored judgment, a binary gate, and evidence metadata answer different questions; combining them arithmetically destroys interpretability.
- **P3 — Exposure is not risk.** Panel A encodes the degree of task overlap between destination occupations and current AI capability (Felten, Raj & Seamans, 2023). The *direction* of the effect (substitution vs augmentation) is a function of curriculum defences, which is what Panel C measures. The matrix crosses the two rather than netting them.
- **P4 — Degenerate items are removed or demoted, not retained for continuity.** Items that cannot discriminate (D9) are dropped; items that saturate (D4, D6) become conformance gates.
- **P5 — Evidence quality is reported, never scored into position.** Panel D can strengthen or weaken confidence in a program's placement; it cannot move the placement.

---

## 3. Panel A — Destination AI Exposure (measured)

### 3.1 Construct

The mean AI occupational exposure of the occupations a program's graduates actually enter. Exposure is task overlap with current AI capability, per the AI Occupational Exposure index (AIOE; Felten, Raj & Seamans, 2023), which links language-model capability advances to occupation-level task structures.

### 3.2 Data pipeline

1. **Cohort identification.** Alumni destination records from the UoM Job Insights Report (JIR) layer are matched to programs by exact program-name match (`data/jir_data.json`; e.g. MC-CS: n = 41 graduates, 13 unique employers).
2. **Occupation mapping.** Early-career destination occupations by field of education are drawn from Jobs and Skills Australia Higher Education Outcomes (JSA HEO) — ATO tax-linked administrative data — recorded as occupation-share lists (`data/labour-evidence.json`, e.g. MC-CS early-career: Software Engineer 15%, Developer Programmer 14%, ICT Business Analyst 9%, ICT Customer Support Officer 6%, Management Consultant 4%).
3. **Exposure computation.** Each destination occupation is assigned its AIOE value, rescaled to 0–100 across occupations. Program exposure is the **unweighted mean** of destination-occupation AIOE values. (Unweighted: the occupation-share weights are retained for reporting but not applied to the mean in the current prototype — see Limitation L4.)

### 3.3 Coverage and range

Of 66 assessed programs, 34 (52%) have a JIR destination match and therefore an exposure measurement. Programs without a match are classified **no-exposure** and appear in tabular outputs but not on the matrix. Observed range: 35.0–72.0; portfolio median **61.8**.

### 3.4 What Panel A replaces

v1's D1 (Automation Exposure, scored 0–3 from handbook inference) and D8 (Human/Relational Work) are retired as scored items: both are properties of the destination, and both are subsumed by the measured exposure axis.

---

## 4. Panel C — Curriculum Adaptiveness (scored)

### 4.1 Construct

The degree to which the curriculum builds capabilities that resist AI substitution in exposed destinations. Five dimensions are retained from v1, with their theoretical grounding and 0–3 anchor definitions unchanged (see v1 methodology §2 for the full anchors and literature):

| Dimension | Retention rationale |
| --- | --- |
| D2 Systems Thinking | Discriminating in v1; cognitive capability weakly performed by current models |
| D3 Technical Depth | Discriminating; substitution barrier per human-capital theory |
| D7 Research Methods | Discriminating; direct market signal (see §8, Signals 1 and 7) |
| B Irreplaceability | Highest item coherence in the v1 matrix (item–total r = 0.65) |
| D5 AI Literacy | Largest portfolio-level gap in v1 (83% of programs ≤1); guardrail-anchored |

### 4.2 Scoring

Each dimension is scored 0–3 against the v1 anchors from handbook evidence. **Adaptiveness = D2 + D3 + D7 + B + D5, range 0–15.** Observed portfolio range 3–14; median **11.0**. No composite beyond this within-type sum is formed (P2: all five addends are the same evidence type — anchored curriculum judgments).

### 4.3 Gates (binary, not summed)

D4 (Decision-Making Under Uncertainty) and D6 (Domain Depth) saturated in v1 (62.1% *\[corrected\]* and 83.3% modal respectively, on a two-level and near-two-level item): they no longer discriminate between programs but still describe a floor below which a program is anomalous. Each is therefore recast as a **PASS/FAIL gate** at the portfolio-modal level. Gates are displayed alongside Panel C, are excluded from the adaptiveness sum, and function as regression checks during curriculum change (a redesign that breaks a gate is flagged regardless of its adaptiveness effect).

### 4.4 Dropped

D9 (Curriculum Currency) is removed entirely: item–total correlation 0.06, and the underlying evidence (dated curriculum-review artefacts) is not reliably present in public handbooks. Removal follows P4; no replacement item is introduced in v2.

---

## 5. Panel D — Evidence Confidence (metadata)

### 5.1 Construct

A descriptive account of how much observational support a program's placement has. Panel D never contributes to position (P5). It replaces v1's D10 (Outcome Evidence), which scored evidence *publishing practice* into the composite.

### 5.2 Operational components

Panel D reports, per program: evidence tier (Strong / Moderate / Limited), JIR match exactness and cohort size (n), unique-employer count, prestige-employer share (hand-classified; see L7), QILT study-area mapping, short- and mid-term employment rates (QILT GOS 2024), median salary, advertised-salary range (demand-side, Adzuna AU), and JSA Skills Priority List demand status. An **evidence score out of 7** summarises component availability: one point for each of (1) exact JIR program match, (2) cohort n ≥ 30, (3) ≥ 10 unique employers, (4) QILT study-area linkage, (5) employment-rate data at both horizons, (6) salary data (survey or advertised), (7) occupation-demand listing. This score is stipulative (defined, not empirically derived) and versioned with the instrument.

---

## 6. Quadrant Classification

Programs with an exposure measurement are classified by median split on both axes (exposure median 61.8; adaptiveness median 11.0/15):

| Quadrant | Definition | Reading |
| --- | --- | --- |
| **Well-positioned** | exposure ≥ median, adaptiveness ≥ median | Exposed destinations with curriculum defences — strongest position |
| **Comfortable** | exposure < median, adaptiveness ≥ median | Lower-exposure destinations with adaptive curriculum |
| **Attention** | exposure ≥ median, adaptiveness < median | Exposed destinations, static curriculum — priority intervention set |
| **Sheltered (for now)** | exposure < median, adaptiveness < median | Low exposure is doing the protective work; fragile to exposure drift |
| *No-exposure* | no JIR match | Awaiting destination mapping; not plotted |

The thresholds are **descriptive (portfolio-relative), not criterion-referenced**: quadrant membership can change as other programs move (Limitation L5). Portfolio distribution at assessment: no-exposure 32, sheltered 14, well-positioned 11, attention 6, comfortable 3.

---

## 7. Instruments

Three rendered instruments implement the method. All are generated from canonical data (§9); none contains hand-maintained numbers.

### 7.1 Program Durability Report (`/insights/program/:code`)

Section-by-section specification and provenance:

| Section | Content | Source |
| --- | --- | --- |
| Hero | Program identity, faculty, level, credit points, quadrant badge, superseded v1 composite | `v2Programs.ts`, `v2ReportDetails.ts` |
| Panel A | Exposure gauge vs portfolio median; top graduate destinations with shares; exposure-is-not-risk caveat | JSA HEO via `labour-evidence.json` |
| Panel C | Five dimension bars (0–3), adaptiveness total /15, D4/D6 gate chips | `dfva/source/assessments.json` |
| Matrix position | Mini-matrix with program highlighted; quadrant narrative | computed (§6) |
| Panel D | Evidence-confidence table (§5.2) | `jir_data.json`, `labour-evidence.json` |
| Version comparison | All 11 v1 dimensions with scores and their v2 disposition (measured / scored / gate / dropped / metadata) | `assessments.json` + §§3–5 mapping |
| Market intelligence | Job-family map with substitution pressure, job-ad signals, discussion themes | `reports/dfva-market-*.md` |
| Redesign recommendations | §8 output | `reports/dfva-recommend-*.md` |

### 7.2 Insights Report — Portfolio Matrix (`/insights`)

The portfolio-level instrument renders all 66 programs:

- **Scatter construction.** x = exposure (axis domain 30–80 AIOE), y = adaptiveness raw score (domain 0–16, ticks at 3). Median reference lines at (61.8, 11.0) partition the plane into the §6 quadrants. Only the 34 measured programs are plotted; dots are coloured by quadrant; sparse code labels suppress overlaps; faculty filters re-render the plotted subset with non-matching programs faded for context.
- **Panel summaries.** Two stat cards restate the measurement model (which dimensions are scored, gated, measured, dropped, metadata) and Panel A coverage/range/median — the method is carried on the instrument itself to prevent misreading.
- **Migration table.** All 66 programs with v1 band → v2 quadrant, exposure, adaptiveness, the five Panel C scores, both gates, and JIR availability. This table is the audit trail for the v1→v2 transition: every program's old and new position is co-visible.

### 7.3 Recommendation Report (redesign method)

Recommendations are derived from the assessment by fixed rules rather than free-form judgment:

- **R1 — Only scored gaps generate curriculum interventions.** Any Panel C dimension below 3/3 yields an intervention targeting that dimension's 3/3 anchor (e.g. MC-CS: D2 at 2/3 → integrate defended trade-off and failure-mode case studies across core units).
- **R2 — Exposure generates steering, not scoring, interventions.** Panel A cannot be "improved" by curriculum edits; interventions instead steer the destination mix toward low-substitution job families identified in the market scan (systems engineering, ML platform, security, governance).
- **R3 — Every intervention cites a market signal.** Each prioritised action links to a named, numbered signal in the program's market-intelligence report (e.g. Signal 2: tier split in software engineering; Signal 6: AI-governance postings), so the evidence chain from labour-market observation to curriculum action is explicit and auditable.
- **R4 — Gates generate regression checks.** Passing gates produce no interventions but are re-checked at every curriculum change.
- **R5 — Panel D generates maintenance actions.** Evidence currency decays; each plan schedules the JIR re-match and destination-evidence refresh.
- **Measurement plan.** Leading indicators are implementation artefacts (handbook entries, published pathways); lagging indicators are re-measured instrument values (adaptiveness re-score, annual Panel A re-measurement, quadrant hold, share of graduates entering low-substitution families).

---

## 8. Reliability & Validity

**Internal evidence motivating the redesign** (from the v1 66-program score matrix): D9 item–total r = 0.06 (removed); D4 62.1% *\[corrected\]* and D6 83.3% modal saturation (gated); B item–total r = 0.65 (retained as the coherence benchmark). These are internal analyses of a single-institution, single-cohort matrix and have not been externally replicated.

**Construct validity.** Panel A inherits the validity argument of the AIOE (Felten et al., 2023) and of ATO-linked administrative destination data (JSA HEO), at the cost of field-of-education grain (L1). Panel C inherits the v1 anchor definitions and their theoretical grounding (v1 methodology §2). The decomposition itself follows standard measurement practice: formative composites should not mix indicators of distinct constructs (P1–P2).

**Reliability.** v1 scoring was single-assessor with LLM assistance; no inter-rater study has been conducted for the five retained dimensions under v2 conditions. The reduction from eleven scored items to five, with anchors unchanged, is expected to concentrate rater attention on the discriminating items, but this is a hypothesis, not a finding. An inter-rater reliability study is the highest-value next validation step.

---

## 9. Reproducibility

| Artefact | Location | Regeneration |
| --- | --- | --- |
| Program-level v2 dataset (66 programs, exposure, adaptiveness, quadrants, meta) | `compass/app/src/compass/v2/data/v2Programs.ts` | extracted from `dfva-v2-prototype.html` DATA blob |
| Per-program rich report detail | `compass/app/src/compass/v2/data/v2ReportDetails.ts` | authored from `jir_data.json`, `labour-evidence.json`, `assessments.json` |
| v1 dimension scores + labour evidence | `dfva/source/assessments.json` | `npm --prefix scripts run dfva:gen-assessments` |
| Market + recommendation report bodies | `reports/dfva-market-*.md`, `reports/dfva-recommend-*.md` | canonical; app content via `npm --prefix scripts run dfva:gen-content` |
| Destination + QILT + demand data | `data/labour-evidence.json`, `data/jir_data.json`, `data/qilt/` | JIR/QILT/JSA/Adzuna pipelines |
| Parity/format guards | `npm --prefix scripts run dfva:check`, `dfva:report-lint` | run in CI |
| Rendered instruments | `dev.evidura.ai/insights`, `/insights/program/mc-cs` | `compass/app/deploy-dev.sh` (dev branch) |

MC-CS is the reference implementation: the only program with the full §7.1 report including §5.2 Panel D detail and the §7.3 rule-derived recommendation.

---

## 10. Limitations & Threats to Validity

- **L1 — Destination grain.** JSA HEO destinations are field-of-education level, not per-degree; per-program exposure inherits field-level occupation mixes. JIR cohort matches (per-program) partially mitigate but cover 52% of the portfolio.
- **L2 — Demand-side conflation risk.** Advertised-vacancy employers and salary ranges (Adzuna) describe who is hiring, not where alumni went. The instruments label the two separately; readers may still conflate them.
- **L3 — Coverage bias.** The 32 no-exposure programs are excluded from the matrix; if JIR matching is easier for large, professionally-destined programs, the plotted subset over-represents them.
- **L4 — Unweighted exposure mean.** Occupation shares are reported but not used as weights in the exposure mean; a share-weighted mean would shift programs whose destination distributions are highly skewed.
- **L5 — Portfolio-relative thresholds.** Median-split quadrants move as the portfolio moves; longitudinal claims must track raw coordinates, not quadrant membership.
- **L6 — Temporal validity.** AIOE reflects model capabilities at its estimation date; QILT GOS 2024 and Q1 2026 demand signals age at different rates. Panel A re-measurement is scheduled annually (§7.3 R5) but the prototype is a static snapshot.
- **L7 — Hand-classified components.** The prestige-employer share in Panel D is analyst-classified without a published codebook. Market-scan signals are LLM-assisted syntheses of documented trend sources with per-section confidence labels, not systematic samples of job-ad corpora.
- **L8 — Single-cohort, single-institution item statistics.** All psychometric evidence in §8 derives from one 66-program matrix at one institution; the gating and dropping decisions should be re-examined on any new portfolio.
- **L9 — No inter-rater evidence under v2.** See §8.

---

## 11. Versioning & Status

- **v1 (production).** Eleven-dimension composite, four risk bands; serves `evidura.ai`. Remains the instrument of record.
- **v2 (prototype, this document).** Panel decomposition + quadrant matrix; serves `dev.evidura.ai` from the `dev` branch. Reference program: MC-CS.
- Changes to panel definitions, gate levels, the evidence-score rubric (§5.2), or quadrant thresholds require a version increment to this document and re-generation of the §9 artefacts. The v1→v2 migration table (§7.2) must remain co-visible in the insights instrument for at least one full assessment cycle to preserve the audit trail.

---

## References

- Felten, E., Raj, M., & Seamans, R. (2023). How will Language Modelers like ChatGPT Affect Occupations and Industries? *arXiv:2303.01157*.
- Jobs and Skills Australia (2025). *Higher Education Outcomes — Work and Occupation* (ATO-linked administrative data) and *Skills Priority List 2025*.
- QILT (2024). *Graduate Outcomes Survey 2024*. Social Research Centre.
- Autor, D., Levy, F., & Murnane, R. (2003). The Skill Content of Recent Technological Change. *QJE, 118*(4).
- Full theoretical grounding for the retained Panel C dimensions: see [DFVA v1 Methodology §2](dfva-methodology.md).
