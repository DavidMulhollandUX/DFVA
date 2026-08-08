# DFVA v3: Confidence-First Durability Report — Methodology & Display Logic

*Version 3.0-preview — August 2026*
*Service Experience & Design, University of Melbourne*
*Companion documents: [DFVA v2 Methodology](dfva-v2-methodology.md) · [DFVA v1 Methodology](dfva-methodology.md) · Panel A reconciliation package (`data/aioe/reconciliation/`) · v3 recommendations (R1–R12, reconciliation package)*

---

## 1. Abstract & Scope

DFVA v3 is a **measurement-integrity and display revision** of the v2 durability assessment. It changes no construct: destination AI exposure remains *measured* (Panel A), curriculum adaptiveness remains *scored* (Panel C), the D4/D6 gates and the evidence-confidence metadata (Panel D) carry over unchanged. What v3 changes is (a) the basis on which Panel A is computed, (b) the quantification of uncertainty around the published position, and (c) the rules by which position is displayed. The revision responds to four reproducibility defects identified in an audit of the v2 instrument (recommendations R1–R4 of the v3 scoping document), of which the most consequential was that v2 reported a categorical quadrant judgment that its own measurement precision did not support.

The governing principle of v3 display: **every published position states what was measured, on which index vintage, over what coverage, with what precision — and a derived label is shown only when it is stable under perturbation.**

v3 is deployed as a preview at `dev.evidura.ai/insights/v3/:code` (reference implementation: Master of Information Systems, chosen as a contrast subject to the v2 reference report for Master of Computer Science). One program report per basis allows side-by-side comparison of the v2 and v3 display grammars on adjacent programs.

## 2. Corrections to v2 (audit findings adopted)

v3 exists because four v2 claims failed reproduction. They are recorded here because a methodology whose stated statistics do not reproduce from its own data forfeits the reader's trust in the remainder (audit R3).

| # | v2 claim | Audit finding | v3 disposition |
| --- | --- | --- | --- |
| R1 | Panel A figures are Felten AIOE values | Published figures (35.0–72.0, median 61.8) came from a provisional LLM-scored proxy marked `PROVISIONAL_llm_rubric_v1_REPLACE_WITH_AUTHORITATIVE`; the proxy correlates with AIOE at only ρ = 0.42 (n = 25), and 20 of 34 programs change quadrant between the two | Authoritative AIOE values adopted; index provenance made a required field of every published exposure value (§3.5) |
| R2 | Exposure "measured" for 34 programs | Only 25 of 34 had every destination title mapped; six programs sat below 50 % coverage (Doctor of Veterinary Medicine: 1 of 12 titles) yet displayed identically to fully-covered programs | Coverage repaired to 100 % via 80 new title mappings; coverage stored and displayed per program (§3.4) |
| R3 | D4 Decision-Making saturates at ">70 % modal" | Source matrix gives 62.1 % (41 of 66). The gating decision survives (62 % modal on a two-level item is ample); the stated figure does not | Corrected here and in an erratum to the v2 document. D6 reproduces (83.3 %) |
| R4 | Quadrant membership reported as a stable categorical fact | 26 of 34 placed programs sit within 1 adaptiveness point or 2.5 AIOE of a threshold; 9 tie exactly at the adaptiveness median; 8 exceed 20 % quadrant-flip probability under ±1 rating perturbation | Position reported as coordinates + uncertainty; quadrant label probability-qualified and suppressed when unstable (§5.2) |

## 3. Panel A — Measurement Specification

### 3.1 Construct

Unchanged from v2: mean AI Occupational Exposure (Felten, Raj & Seamans 2023) of the occupations a program's graduates actually enter. Exposure encodes task overlap with AI capability — **not** direction of effect (v2 principle P3, retained; see §5.6).

### 3.2 Destination-title universe

v3 adopts the reconciliation package's basis: destination titles are **JIR/LiveAlumni alumni job titles at program grain**, for all 34 placed programs.

- Source: `data/jir_data.json` (LiveAlumni-derived titles of this program's own graduates, curated by University careers staff), matched to DFVA programs via `docs/JIR/dfva_jir_map.json` (one match per program; match tier recorded).
- Aggregation: `entry + early_mid + mid_senior` title lists concatenated and **deduplicated** (a title appearing at several career stages counts once); fallback to the `all` key when the staged lists are empty. Verified immaterial: dedup, raw occurrences, and the `all` key alone all yield the same portfolio median.
- JSA HEO field-level destinations are **not used on this axis** in v3. This is a deliberate grain trade (see §6 and limitation L-v3-2): alumni titles are program-specific but are curated self-reported data; JSA destinations are ATO tax-linked administrative data but are reported per field of education, which forced same-field programs (e.g. MC-IS and MC-CS) onto identical exposure values.

### 3.3 Index and crosswalk

- **Index**: Felten AIOE, `AIOE_DataAppendix.xlsx` (repository `AIOE-Data/AIOE @ main`), Appendix A, published population n = 773, raw z range −2.670…1.528, min–max rescaled to 0–100. The rescaling was validated by recomputing the 278 previously-mapped occupations from raw appendix scores: maximum absolute deviation 0.005.
- **Crosswalk**: each title is assigned an O\*NET-SOC 2010 code carrying a published AIOE value. Two crosswalk generations are in use — an inherited 288-title index and 80 titles newly mapped in August 2026 (69 high / 11 medium confidence) — merged to 368 titles. No code was accepted that does not appear in the published AIOE list; none was invented. Per-title confidence (high/medium/low) and crosswalk generation are stored and displayed.
- **Known defect (disclosed, not hidden)**: the two crosswalk generations sit at different levels (inherited median AIOE 92.3; new mappings median 77.3). Absolute exposure levels therefore depend on crosswalk composition; structural results do not (§6). The crosswalk collapses 368 titles onto 106 SOC codes (3.47 : 1) because seniority and specialisation qualifiers carry no SOC distinction — the mechanism behind limitation L-v3-4.

### 3.4 Computation and coverage

- Program exposure = **unweighted arithmetic mean** of rescaled AIOE over the program's distinct destination titles. Destination shares are not applied: no share data exists at alumni-title grain, so recommendation R5 (share-weighting) is structurally open on this basis and is displayed as such rather than silently omitted.
- **Entry-stage exposure** (R6 near-term) = the same mean restricted to titles appearing in the entry-stage list. Published alongside the all-stage mean because the strongest realised evidence of AI labour-market effects is specifically at the entry port.
- **Coverage** = mapped titles / distinct titles, stored per program; the v3 dataset stands at 100 % for all 34 placed programs and the build fails on any unmapped title. The remaining 32 of 66 programs have no JIR destination match and are not placed (limitation L-v3-5).

### 3.5 Provenance schema (required, machine-checked)

Every published exposure value carries, as data rather than documentation:

```text
exposure_index_name      Felten-AIOE
exposure_index_vintage   AIOE_DataAppendix.xlsx @ AIOE-Data/AIOE main (n=773, z −2.670…1.528)
exposure_rescaling       min-max 0-100 over published population
exposure_computed_at     ISO-8601 date
destination_source       JIR/LiveAlumni alumni titles, program grain (cohort n)
coverage                 mapped/total distinct titles
crosswalk_mix            n inherited-index titles · n Aug-2026 titles
```

### 3.6 Build-time validation

The generator (`scripts/dfva-v3-panela.ts`) is a *reproduction harness*, not only a transform. On every run it: (1) rejects any crosswalk SOC code absent from the published index; (2) recomputes each program mean and **fails the build if it deviates from the archived authoritative table** (`data/aioe/reconciliation/v2_panelA_authoritative_aioe.csv`) by more than 0.01; (3) recomputes each quadrant assignment and fails on any mismatch with that table. The published dataset therefore cannot drift from its documented source without the build breaking.

## 4. Uncertainty Quantification

### 4.1 Rating perturbation (Monte-Carlo)

Panel C scores are expert ratings and carry rating uncertainty. v3 quantifies its consequence for the published position:

- Each of the five scored items (D2, D3, D7, B, D5) is independently perturbed: with probability 0.05 down one level, 0.05 up one level (p = 0.1 total), clamped to [0, 3].
- 20,000 draws per program; deterministic seed derived from the program code (mulberry32), so the published distribution is exactly reproducible.
- For each draw, the quadrant is recomputed against **fixed** portfolio thresholds (the unperturbed medians). Outputs: the full quadrant probability distribution, the modal quadrant probability, and the observed adaptiveness envelope (min–max across draws), published as the ±1 interval.

### 4.2 What is not perturbed, and why

Exposure is held fixed in the simulation. It is a measurement, not a rating; its dominant uncertainty is *systematic* (crosswalk composition, §3.3) rather than stochastic, and modelling a systematic error as random noise would understate it in a misleadingly precise way. The systematic component is instead handled by disclosure (§5.5) and by the two-basis robustness result (§6). This asymmetry is stated as limitation L-v3-3.

### 4.3 Threshold proximity

Independently of the simulation, a program is flagged `nearBoundary` when it sits within 2.5 AIOE of the exposure median or within 1 point of the adaptiveness median — the audit's fragility band, within which 26 of 34 programs fall.

## 5. Display Logic

The display rules are the substance of v3; each is stated with its decision criterion so it can be applied mechanically and audited.

### 5.1 Confidence-first ordering

The report leads with the **coordinate pair and its uncertainty** — exposure (with portfolio median), adaptiveness (with ±1 interval and median) — before any label. Rationale: a reader who sees "Attention" first anchors on the category; a reader who sees "91.7 vs median 90.9" first sees how close the call is. The quadrant is rendered as a *derived* attribute of the coordinates, visually subordinate to them.

### 5.2 Label stability rules (R4)

Let *m* = modal quadrant probability under §4.1.

| Condition | Display |
| --- | --- |
| m ≥ 0.80 | Single quadrant label, with *m* stated beside it |
| 0.60 ≤ m < 0.80 | Dual label: modal / runner-up — "boundary case" |
| m < 0.60 | Label suppressed; position reported as coordinates only |

The full four-quadrant probability distribution is always displayed beneath the label — the label is a summary of the distribution, never a replacement for it.

### 5.3 Measurement-first naming (R10)

Quadrant names state the measurement; narrative names are demoted to a parenthetical gloss:

| Coordinates | v3 name | v2 narrative name (gloss) |
| --- | --- | --- |
| exposure > median, adaptiveness ≥ median | High exposure · high adaptiveness | Well-positioned |
| exposure ≤ median, adaptiveness ≥ median | Low exposure · high adaptiveness | Comfortable |
| exposure > median, adaptiveness < median | High exposure · low adaptiveness | formerly "Attention" |
| exposure ≤ median, adaptiveness < median | Low exposure · low adaptiveness | formerly "Sheltered (for now)" |

Rationale: "Attention" implies a *finding* of graduate-level risk that the exposure axis cannot support. The audit of all 358 Australian occupational unit groups found exposure *positively* associated with projected employment growth (ρ = +0.51), largely a skill confound (partial ρ = +0.17 controlling skill level), with the apparent graduate-line reversal non-significant under a correct ordinal specification (joint F = 1.49, p = 0.20). A measurement-stated name cannot be over-read; the narrative interpretation survives only as a labelled hypothesis.

**Tie rule (deterministic, documented):** a program exactly at the adaptiveness median counts as adaptive (≥). Nine of the 34 placed programs tie at the median, so the rule is doing real work; under v2 it was implicit. The stability display (§5.2) is what prevents the arbitrary component of any tie rule from being over-read.

### 5.4 Provenance display (R1)

The §3.5 provenance block is rendered as a table on every report — it is not relegated to a methods footnote. A reader must be able to answer "which index, which vintage, over what coverage, computed when" from the report itself.

### 5.5 Destination transparency and the hybrid-crosswalk caveat

The full destination-title table is rendered: every title, its SOC occupation and code, its rescaled AIOE value, career stages, crosswalk generation (inherited / Aug 2026), and mapping confidence (high / medium / low). No title is silently dropped, and a title mapped at low confidence is visibly flagged rather than laundered into the mean. The known crosswalk-level defect (§3.3) is disclosed in a caveat block on every report that uses the hybrid mapping, together with the robustness statement of §6.

### 5.6 Exposure-is-not-risk co-location

The interpretation caveat — AIOE encodes task overlap, not direction of effect; every placed program sits high on the index because its low end is physical and manual work graduates do not enter — is rendered **adjacent to every exposure figure**, not once in a methods section. Range restriction is stated with the portfolio minimum (61.0) so the reader can see the compression directly.

### 5.7 Intervention simulator (R12c)

Panel C is a small integer space (5 items × 4 levels), so every reachable position under curriculum improvement can be *enumerated* rather than narrated:

- Interactive: the reader adjusts any scored item (bounded by current score and 3) and the position recomputes live against fixed thresholds.
- Static: the single-improvement table enumerates each +1 move and states whether it changes the quadrant.
- **Honesty rule**: when no single-dimension improvement moves the position, the report says so explicitly, states the point deficit to the adaptiveness threshold, and states that the exposure coordinate is a property of the destinations, not the curriculum — exposure generates *steering* interventions, never *scoring* interventions (recommendation-method rule R2, inherited from v2). The simulator never offers exposure as a controllable.

### 5.8 Version comparison

Every v3 report carries a "what changed from v2" table: index (proxy → authoritative, with ρ = 0.42 stated), the program's own exposure under each, the portfolio median under each, coverage disposition, label regime, and grain. The v1→v2 migration table established that an instrument revision must leave an audit trail; v3 generalises the practice.

## 6. Robustness: Two Independent Recomputations

The reconciliation produced an unplanned but valuable design check. Two computations of Panel A were performed independently, with different destination universes and independently authored crosswalks:

| Property | Reconciliation package (adopted) | Independent repo recomputation |
| --- | --- | --- |
| Destination basis | JIR alumni titles, program grain, all 34 | JSA HEO field grain (28) + JIR titles (6) |
| Crosswalk | Hybrid: inherited 288 + 80 new | Uniform 111-title, single session |
| Exposure range / median | 61.0–97.2 / 90.9 | 63.3–95.0 / 79.7 |
| Quadrant counts (wp/cf/at/sh) | 9/14/8/3 | 9/14/8/3 |
| Quadrant changes vs v2 proxy | 20/34 | 20/34 |
| Adaptiveness median (34) | 10 | 10 |

**Interpretation.** Quadrant structure — the instrument's published categorical content — is invariant across measurement basis and crosswalk authorship; absolute exposure levels are not. Display consequences: absolute exposure values are never compared across bases or vintages, thresholds are always recomputed within-basis, and longitudinal claims use raw coordinates on a pinned basis (v2 limitation L5, now enforced by the provenance schema). The convergent structure across two independent operationalisations is the strongest validity evidence the exposure axis currently has.

## 7. Reproducibility

| Artifact | Source | Command / guard |
| --- | --- | --- |
| Published AIOE extract | `data/aioe/felten_aioe.json` (from `AIOE_DataAppendix.xlsx`) | validated: n, z-range, rescale ≤ 0.005 vs 278 known rows |
| Crosswalks | `data/aioe/reconciliation/reconcile_C_authoritative_288_index.csv` + `v2_panelA_new_occupation_crosswalk.csv` | generator rejects codes absent from the published index |
| Authoritative per-program table | `data/aioe/reconciliation/v2_panelA_authoritative_aioe.csv` | generator fails on mean Δ > 0.01 or quadrant mismatch |
| Destination titles | `data/jir_data.json` + `docs/JIR/dfva_jir_map.json` | aggregation rules of §3.2 |
| Panel C scores, gates | `v2Programs.ts` (unchanged from v2; canonical: `dfva/source/assessments.json`) | `dfva:check` (CI) |
| Generated dataset | `compass/app/src/compass/v3/data/v3Programs.ts` | `cd scripts && npx tsx dfva-v3-panela.ts` |
| Dataset invariants | `compass/app/src/compass/v3/__tests__/v3Programs.test.ts` | pins medians, ranges, counts, 20/34, MC-IS 91.69 / MC-CS 92.8; distributions sum to 1; quadrants consistent with medians |
| Monte-Carlo | seeded per program (mulberry32) | identical output on every run |

## 8. Limitations & Threats to Validity

Inherited v2 limitations remain except where superseded; new limitations are introduced by the v3 basis and are stated rather than traded away silently.

- **L-v3-1 (hybrid crosswalk levels).** Absolute exposure levels depend on a crosswalk built in two generations at different levels (medians 92.3 vs 77.3). A uniform re-mapping of all 368 titles would shift levels while (per §6) preserving structure. This is the priority measurement task for v3.1.
- **L-v3-2 (evidence-tier trade).** Moving Panel A from JSA administrative data to LiveAlumni titles bought program grain at the cost of evidence strength: alumni titles are curated self-reports with variable cohort coverage (n = 41 to 1,277). The grain/strength trade is disclosed in the provenance table (`destination_source`, cohort n); a future dual-axis treatment (administrative field-grain as a sensitivity band around the program-grain value) is the natural resolution.
- **L-v3-3 (asymmetric uncertainty treatment).** Rating uncertainty is quantified (§4.1); measurement uncertainty on the exposure axis is disclosed but not distributed. The modal probabilities are therefore conditional on the exposure value being correct.
- **L-v3-4 (seniority-blind index).** SOC-2010 carries no seniority dimension; the crosswalk strips seniority qualifiers at 3.47 : 1. An instrument for *graduate* durability that cannot distinguish entry from senior exposure misses the mechanism most likely to matter; the entry-stage mean (§3.4) is a partial, title-list-based mitigation, not a solution (full treatment: audit R6).
- **L-v3-5 (coverage is not missing at random).** 32 of 66 programs remain unplaced, concentrated by faculty; medians are computed on the placed subset. Portfolio-level aggregate claims remain out of scope (audit R8).
- **L-v3-6 (shares).** No destination-share weighting is possible at alumni-title grain; the unweighted mean treats a program's dominant destination and its rarest identically (v2 L4, now structurally open rather than merely unapplied).
- **Reactivity.** Unchanged from v2: the scored axis is gameable in principle (most cheaply via AI-literacy electives); gates function as regression checks, and the exposure axis is computed from sources the program does not author.

## 9. Versioning & Status

- Implements audit recommendations **R1, R2, R3, R4** (the "must" scope), **R10**, **R12(a)** (confidence-first report), **R12(c)** (intervention simulator), and the near-term half of **R6** (entry-stage exposure).
- Open: **R5** (structurally blocked at alumni grain, L-v3-6), **R7** (AI-literacy re-anchoring), **R8** (coverage bias), **R9** (v2-conditions inter-rater study), **R11** (anti-gaming beyond gates), **R12(b)** (recomputation/diff history view).
- Status: **preview**, `dev.evidura.ai/insights/v3/:code`, one reference report (MC-IS) alongside the v2 reference (MC-CS). v2 remains the dev-default instrument; v1 remains production. Quadrant thresholds are portfolio-relative and preview-only; criterion-referenced thresholds (audit R4.5) are deferred to a version intended for cross-institution publication.
- Erratum issued against the v2 methodology document for the D4 saturation figure (§2, R3).

## References

- Felten, E., Raj, M., & Seamans, R. (2023). *Occupational, industry, and geographic exposure to artificial intelligence.* Strategic Management Journal. Data appendix: `AIOE-Data/AIOE`.
- DFVA v2 methodology (`docs/dfva-v2-methodology.md`) and v1 methodology (`docs/dfva-methodology.md`).
- Panel A reconciliation package, August 2026 (`data/aioe/reconciliation/`): revision note, twelve-recommendation scoping document, authoritative per-program table, crosswalks, spot-check traces.
