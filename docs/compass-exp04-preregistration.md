# COMPASS — EXP-04 Study Pre-Registration (Step 0)

**Do COMPASS durability scores predict — and does COMPASS-informed redesign improve — QILT graduate outcomes? A pre-registered, staged predictive-validity + difference-in-differences study**

**Prepared by:** David Mulholland, Associate Director, Service Experience & Design, University of Melbourne
**Date:** 2026-06-05
**Builds on:** [EXP-04 desk experiment](compass-exp04-causal-evidence.md) (the design + QILT constraints) · [Experiment Backlog](compass-experiment-backlog.md) (EXP-04 / P12) · frozen instrument in [compass-static/src/data/programData.ts](compass-static/src/data/programData.ts)

> **Status: DRAFT for lodgement.** This is the Step-0 artefact from the EXP-04 protocol — the pre-registration to lodge on a public registry (OSF or AEA RCT Registry) *before* any outcome data is examined. The pre-registration itself — with cryptographically frozen baseline scores and a declared estimand — is the credibility artefact (the "moat artefact" that lets an accreditor or faculty body treat the signal as evidence rather than vendor opinion), available before any result lands. Sections follow the OSF Pre-Registration / Registered-Report convention so it is registry-ready. **Two things must be finalised before lodgement** (see §14): the exact scoring normalisation and the HREC pathway.

---

## 1 · Study information

**Title.** Predictive validity and causal effect of an AI-era curriculum "durability" instrument (COMPASS) on graduate labour-market outcomes: a pre-registered staged study using QILT Graduate Outcomes Survey data.

**Contributors.** D. Mulholland (lead); *[to add: a quantitative methodologist / biostatistician — essential co-author for credibility; the institutional GOS data custodian / Institutional Research lead; an HE-research academic e.g. CSHE/LH Martin as advisor].*

**Abstract.** COMPASS scores university programs on a fixed 10+1-dimension rubric of AI-era labour-market "durability" (0–3 per item; a total; a four-level risk band). Prior causal evidence (German/Swiss VET difference-in-differences) shows demand-aligned curriculum *revision* raises wages, but no study validates a *scored instrument* against *higher-education* graduate outcomes, in *Australia*, using *QILT* data. This study tests two pre-specified, deliberately separated claims: **(PV)** that frozen baseline COMPASS scores *predict* subsequent QILT graduate outcomes beyond standard confounders; and **(CA)** that COMPASS-informed curriculum redesign *causally improves* those outcomes (a staggered-adoption difference-in-differences). It is staged so a credible predictive result is obtainable within ~12 months on already-collected data, while the slower causal estimate accrues. A null result is as publishable as a positive one and directly tests the narrowed "empty category".

---

## 2 · Background & the precise gap (brief)

The strict "no causal evidence" claim is retired: Salomons et al. (2025, German VET stacked-DiD; +3.3–5.5% wages) and Swiss/Dutch corroboration causally link demand-aligned curriculum *content updates* to graduate wages; the WorkAdvance RCT (Katz et al. 2020) shows labour-market *alignment* is the active ingredient. The gap this study fills is narrow and specific: **no study validates that a scored durability instrument predicts, or that instrument-informed redesign improves, QILT-measured outcomes for autonomous Australian university programs.** A live external-validity question motivates it — the existing causal evidence comes from *legally-binding, coordinated* curricula, the opposite of Australia's self-accrediting universities.

---

## 3 · Hypotheses (estimands, kept rigidly separate)

> The single most important reporting rule: **"the score *forecasts*" (PV) and "the redesign *causes*" (CA) are different estimands and are never conflated.** All outputs label which is which.

- **H-PV (predictive validity, primary near-term).** A program's frozen baseline COMPASS total score is positively associated with subsequent QILT graduate outcomes, *after* conditioning on field of education, level, intake composition and labour-market period — i.e. it carries **incremental predictive information** over a confounder-only model. *Directional, with a pre-specified null region (see §10).*
- **H-PV-dim (secondary).** Specific dimensions (a priori: *Automation Exposure*, *AI Literacy*, *Irreplaceability*) carry more predictive weight for medium-term (GOS-L) skills-utilisation than the total alone.
- **H-CA (causal, primary long-term).** Programs that undergo COMPASS-informed redesign show an improvement in graduate outcomes relative to not-yet-redesigned same-field programs — a positive average treatment effect on the treated (ATT), with flat pre-trends.
- **Null framing.** A near-zero, precisely-estimated PV association, or a null ATT with flat pre-trends, is a **confirmatory result** (it substantiates the narrowed empty category and bounds the instrument's value) and will be reported and published as such. The study is designed to be informative in both directions.

---

## 4 · The frozen instrument (the object of study)

The predictor is the COMPASS rubric **exactly as implemented at freeze**, not as later revised:

| # | Dimension | Range |
|---|---|---|
| 1 | Automation Exposure | 0–3 |
| 2 | Systems Thinking | 0–3 |
| 3 | Technical Depth | 0–3 |
| 4 | Decision-Making | 0–3 |
| 5 | AI Literacy | 0–3 |
| 6 | Domain Depth | 0–3 |
| 7 | Research Rigour | 0–3 |
| 8 | Human & Relational | 0–3 |
| 9 | Curriculum Currency | 0–3 |
| 10 | Outcome Evidence | 0–3 |
| 11 | Irreplaceability (bonus) | 0–3 |

Outputs: a **total score**, a **dimension-level vector** (the richer predictor), three **threshold questions** (q1/q2/q3), and a four-level **risk band** (RESILIENT · MODERATE RISK · HIGH RISK · CRITICAL).

**The freeze procedure (anti-leakage — the core safeguard).** Before any outcome data is touched: (a) score ~15–30 University of Melbourne programs on the catalogue *as it stood at a declared baseline date*; (b) record, per program, the dimension vector, total, band, and threshold answers; (c) compute a **SHA-256 hash of the full frozen score table** and lodge the hash (and the rubric definition) in the public pre-registration with a timestamp; (d) retain the cleartext table privately. This makes it cryptographically impossible to retrofit scores after seeing outcomes — the requirement that makes any predictive claim non-circular.

> **⚠ Must resolve before freeze (§14):** the implemented `maxScore` is **36**, but 11 items × max 3 sum to **33** (e.g. Bachelor of Design dimensions sum to exactly its reported 17). The exact scoring function — total/33 vs a /36 normalisation, and whether the Irreplaceability *bonus* is additive or weighted — **must be fixed and documented in the freeze**, because the predictor's definition cannot change after registration.

---

## 5 · Design plan

**Type.** Staged, pre-registered, observational + quasi-experimental. Two nested layers under one registration:

- **Layer 1 — Predictive-validity back-test (near-term, runs first).** Retrospectively attach frozen baseline scores to programs and test association with **already-collected** GOS/GOS-L outcomes for cohorts that have *already* graduated. No waiting for new cohorts. Establishes criterion validity of the score *before* any causal claim.
- **Layer 2 — Staggered-adoption difference-in-differences (long-term, accrues behind Layer 1).** Treated units = programs undergoing COMPASS-informed redesign; controls = not-yet-redesigned same-field programs; outcome = QILT GOS then GOS-L. Estimated with a heterogeneity-robust group-time ATT (**Callaway & Sant'Anna 2021**), *not* naïve two-way fixed effects, with an event-study specification for pre-trends.

**Treatment definition (Layer 2).** The "treatment" is the **redesign event dated to the first graduating cohort that experienced the *full* revised curriculum** — *not* the date a committee signed off. Partial-exposure cohorts are excluded or modelled as a separate dose.

**Blinding.** Not applicable (observational), but the score freeze + timestamp is the functional equivalent of outcome-blind predictor definition.

---

## 6 · Sampling plan

- **Units of analysis.** Program = **institution × ASCED 6-digit field-of-education × level × major** (major only where the institution surveys at major level). Anchored at **ASCED field-of-education**, which is *stable* across the ANZSCO→OSCA migration (occupation coding is not — see §11).
- **Data source (the lawful, low-governance route).** The **University of Melbourne's own GOS/GOS-L unit-record deliverable files** (csv/SPSS), already in the institution's lawful custody under existing QILT governance — *not* suppressed public aggregates, and *not* a new data-sharing arrangement. All linkage runs **inside the institution's environment**; unit records are **never exported to COMPASS**.
- **Cohorts.** Pool **3–5 GOS cohorts** (and the corresponding GOS-L waves) to beat small-cell suppression. Declared baseline catalogue date and the cohort window are fixed at registration.
- **Sample size & power.** Program-level cells are small and frequently fall below the QILT **n < 25** suppression threshold; only ~40% of national strata meet QILT's own ±7.5pp precision target. The protocol therefore: (a) pools cohorts; (b) uses the **individual-level multilevel model as primary** (graduates nested in programs) for power, with the program-level analysis as a robustness check; (c) treats single-cell point estimates as noisy and reports intervals throughout; (d) pre-commits to a **sequential / accrual** plan rather than a single fixed-n endpoint. A formal power/precision simulation using the (blinded) program-count and cohort sizes will be appended to the registration before Layer 1 analysis.
- **Stopping rule.** Layer 1 reports at the pre-specified cohort pool; Layer 2 reports interim event-study leads as post-cohorts accrue, with the confirmatory ATT at the pre-declared minimum number of treated programs × post-cohorts.

---

## 7 · Variables

**Predictor (frozen).** Primary = COMPASS **total** (per §4 normalisation); secondary = the **11-dimension vector** and the **risk band** (ordinal). Frozen and hashed at baseline.

**Outcomes (QILT; pre-specified hierarchy).**
- **Primary:** GOS **full-time employment** (35+ hrs/wk), ~4–6 months post-completion (individual binary; program proportion in the robustness model).
- **Secondary (short-term):** GOS **median full-time salary** (self-reported; outliers excluded); **skills utilisation** (employed in managerial/professional occupation + self-report "fully utilising skills").
- **Key durability outcomes (medium-term):** **GOS-L (3-year)** full-time employment, earnings, and skills-utilisation — the most decision-relevant "durability" signals; available immediately for *already-collected* GOS-L waves (historical cohorts) in Layer 1.

**Covariates / confounders (pre-specified).** ASCED field-of-education; qualification level; **intake composition** (median ATAR / selectivity; SEIFA); study mode (FT/PT, on-campus/online); domestic/international; cohort year (labour-market period fixed effects); institution (in multi-institution extensions); broad regional labour-market indicator. QILT's own caveat — outcomes are driven by "factors beyond the quality of teaching… course profile, study mode, student composition, regional labour markets" — is the explicit confounding model.

**Negative-control / placebo outcome.** Program intake ATAR/SEIFA used as a **placebo outcome** in Layer 2 (a redesign should *not* change who enrolled in pre-treatment years; a non-null here flags confounding).

---

## 8 · Analysis plan

**Layer 1 — predictive validity.**
- Primary model: multilevel logistic (binary FT employment) / linear (salary) regression, graduates nested in programs, with the frozen COMPASS score as predictor and the §7 covariate set.
- Pre-specified metrics: **calibration** (calibration curve / Brier), **discrimination** (AUC/ROC for binary; R²/RMSE for continuous), and — the headline — **incremental ΔAUC / ΔR² over a confounder-only baseline** (does the score add information beyond field/level/intake?).
- Partial Spearman (score ↔ outcome | covariates); **E-value** sensitivity for unmeasured confounding; negative-control-outcome check.
- H-PV-dim: penalised (LASSO) dimension-level model, reported as exploratory.

**Layer 2 — causal (DiD).**
- **Callaway & Sant'Anna (2021)** group-time ATT; aggregated to an overall ATT and an event-study; cross-checked with Sun–Abraham and de Chaisemartin–D'Haultfœuille estimators.
- **Not-yet-treated** programs in the same field as the comparison group; **parallel-trends** tested via the event-study pre-period.
- **Few-cluster inference:** wild-cluster (Webb) bootstrap **and** randomisation/permutation inference (treatment-timing reassignment) — essential given few treated clusters.
- Placebo-on-inputs (ATAR/SEIFA outcome) and an in-time placebo (fake treatment dates) as falsification checks.

**Multiplicity & reporting.** One **primary** outcome (GOS FT employment) drives confirmatory inference; all others are **secondary/exploratory** and flagged as such with adjusted intervals. Estimands labelled "forecast" (Layer 1) vs "cause" (Layer 2) in every table.

**Missing data.** QILT non-response (GOS ~38.5%, GOS-L ~48%) handled via pre-specified sensitivity (complete-case vs response-weighted vs bounded); attrition in the GOS-L panel modelled explicitly.

---

## 9 · Confound & validity safeguards (summary)

| Threat | Mitigation (pre-committed) |
|---|---|
| Score→outcome leakage (circularity) | Cryptographic **freeze + timestamp** of scores before any outcome access (§4) |
| Severe confounding (field, intake, region) | Rich covariate set; DiD for the causal claim; placebo-on-inputs; E-values |
| Small cells / suppression | Pool 3–5 cohorts; individual-level multilevel primary; QILT n<25 discipline in all outputs |
| **ANZSCO→OSCA occupation-coding seam** | **Anchor at stable ASCED field-of-education, not occupation;** avoid occupation-skill-level metrics across the seam; **version-pin** every LMI input (ANZSCO 1.3 vs OSCA 2024) with a documented crosswalk |
| Latency mistaken for null | Treatment dated to first *fully*-revised cohort; interim event-study leads reported, not a single distant endpoint |
| Self-reported salary | Use GOS salary with caveats now; pre-register a later upgrade to **verified ATO-linked earnings (PLIDA/BLADE via ABS DataLab)** once Layer 1 shows signal |
| External validity (VET-coordination vs HE-autonomy) | Stated as a limitation; multi-institution predictive extension planned to probe generalisability |

---

## 10 · Inference criteria (decision rules, declared in advance)

- **H-PV confirmed** if the score's incremental ΔAUC ≥ a pre-specified threshold (e.g. ≥0.02) with a CI excluding zero, *and* calibration is acceptable. **H-PV null** if the incremental contribution CI lies within a pre-specified equivalence region around zero — a *publishable confirmation* that the instrument adds little beyond known confounders.
- **H-CA confirmed** if the overall ATT is positive with a CI excluding zero **and** pre-trends are flat. **H-CA null** if the ATT CI is tight around zero with flat pre-trends.
- **Venture decision linkage:** a confirmed H-PV is the minimum bar to claim "predicted durability" credibly to an accreditor/faculty body (couples to EXP-03 standing); H-CA is the longer-horizon "validated durability" claim. Either null reshapes positioning honestly rather than killing the venture.

---

## 11 · Occupation-coding version control (explicit, because it can fake an effect)

QILT coded occupation to **ANZSCO v1.3 (2022)** through ~2025; future cycles migrate to **OSCA (2024)** — a non-1:1 change (splits/merges; skill-level recalibration; ABS adoption ~Sep 2026). Any occupation-derived metric therefore has a **classification break mid-window**. Pre-committed: occupation appears only as a coarse, stable control (OSCA major group ↔ ANZSCO major via the ABS correspondence file with a declared allocation rule for split/merged codes); the durability outcome of record is **ASCED-anchored**; every LMI-derived input is version-stamped. A skills-utilisation change coinciding with Dec-2024/Sep-2026 reclassification is treated as suspect until validated against a fixed crosswalk.

---

## 12 · Data management, ethics & governance

- **Ethics pathway:** the validation *join* occurs at the individual record, so **HREC review is required** (University of Melbourne Office of Research Ethics & Integrity). Frame as **secondary use** of existing GOS/GOS-L unit-record data for research, *low-risk* given: data already in institutional custody; analysis inside the institution's environment; **no export** of unit records to COMPASS; outputs **aggregated and n<25-suppressed**; no re-identification. The consent boundary (graduates consented to a graduate-outcomes survey, not to validating a commercial product) is named explicitly and is the reason HREC (not a waiver) is sought.
- **Departmental/QILT conditions:** the GOS sample frame derives from TCSI and the data are Departmentally governed; confirm with the institutional data custodian that secondary research use of the *own-institution deliverable file* is within conditions (it generally is) before lodgement.
- **Privacy framework:** Privacy Act 1988 / APPs; Privacy (Market & Social Research) Code 2021; transfers via QILT Secure File Exchange where relevant.
- **Open-science / data availability:** the **rubric, score-hash, code, and suppressed aggregate results** are public; **unit-record data are not shareable**. Pre-registration and analysis code on OSF; results posted regardless of direction.

---

## 13 · Timeline & milestones

| Step | When | Output |
|---|---|---|
| **0 · Register & freeze** | Months 0–3 | Lodged pre-registration; SHA-256-hashed frozen scores for 15–30 UoM programs; dated redesign indicators for the 2–6 programs already slated for revision; blinded power simulation appended |
| **1 · Predictive back-test** (MVP) | Months 3–9 | First publishable result: calibration + discrimination + incremental ΔAUC/ΔR² on already-collected GOS (positive *or* null) |
| **2 · Medium-term predictive** | Months 9–18 | GOS-L (3-yr) predictive read on historical cohorts; embedded DiD arms formalised |
| **3 · Causal DiD matures** | Years 2–7 | Interim event-study leads → confirmatory Callaway–Sant'Anna ATT; later upgrades: multi-institution consortium, stepped-wedge rollout randomisation, PLIDA/BLADE verified earnings |

---

## 14 · Pre-lodgement checklist (finalise before registering)

1. **Lock the scoring function** — resolve total/33 vs /36 normalisation and the Irreplaceability-bonus treatment; document it as part of the freeze (§4). *(This is a real inconsistency in the current data: `maxScore: 36` with 33 achievable points.)*
2. **Confirm the HREC pathway** with UoM Research Ethics & the GOS data custodian (Institutional Research) — secondary-use, low-risk; confirm Departmental data conditions.
3. **Recruit the methodologist co-author** (DiD/multilevel) — names on the registration materially affect credibility.
4. **Run the blinded power/precision simulation** from the actual program count and cohort sizes; set the ΔAUC equivalence region (§10) from it.
5. **Fix the baseline catalogue date and cohort window**; score the 15–30 programs; compute and lodge the hash.
6. **Choose the registry** (OSF Pre-Registration vs AEA RCT Registry — OSF suits the observational Layer 1; AEA suits the embedded experiment).

## 15 · Amendments & deviations

Any change after lodgement is recorded as a **timestamped amendment** on the registry with rationale; the frozen score hash is **never** changed. Analyses departing from this plan are reported as **exploratory**, clearly separated from the pre-registered confirmatory analyses.

---

*Genre: OSF/AEA-style study pre-registration (Registered-Report structure). Methodological basis: Callaway & Sant'Anna (2021) staggered-adoption DiD; predictive-validity (calibration/discrimination/incremental-validity) conventions. Data: QILT GOS/GOS-L (Social Research Centre / Dept of Education). Derived from the [EXP-04 desk experiment](compass-exp04-causal-evidence.md); instrument frozen from [compass-static/src/data/programData.ts](compass-static/src/data/programData.ts).*
