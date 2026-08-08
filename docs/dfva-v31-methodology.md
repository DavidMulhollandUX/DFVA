# DFVA v3.1: Exact Position Stability — Methodology & Implementation Spec

*Version 3.1 — August 2026*
*Service Experience & Design, University of Melbourne*
*Amends: [DFVA v3 Methodology](dfva-v3-methodology.md) §4, §5.2, §7, §8. All other v3 sections unchanged.*

---

## 1. Scope

v3.1 is a **correctness amendment** to v3's uncertainty quantification. It changes no construct, no panel, no data source, and no exposure value. It changes how the position-stability distribution is computed, what the display rule is calibrated against, and what the report discloses about the assumption underneath both.

Three defects are addressed:

| # | Defect in v3 | Consequence | v3.1 disposition |
| --- | --- | --- | --- |
| **A1** | Modal probabilities estimated by 20,000-draw Monte Carlo (§4.1) over a space of only 243 states | Published dual-label count is **seed-dependent**: re-running with different seeds gives 0, 1 or 2 programs. The §7 test invariant pinning "2" would fail on a seed change | Replace sampling with **exact enumeration** of all 243 states (§3). Deterministic, seedless, instant |
| **A2** | Single-label threshold fixed at m ≥ 0.80 (§5.2) | The cut falls inside a dense cluster: 11 of 34 programs lie in [0.78, 0.82], and 3 sit within Monte-Carlo error of the cut itself. The distribution has a **0.13-wide empty band** at 0.85–0.98 that the rule ignores | Retain 0.80 as the published rule but **calibrate and justify it against the observed distribution**, and add a `stabilityClass` field derived from the empirical gap (§4) |
| **A3** | Perturbation clamps at the 0–3 item bounds, so an item already at 3 can be moved down but not up | Asymmetric error model with expected net drift **−0.075 adaptiveness points**, concentrated in high-adaptiveness programs (three carry 4 of 5 items at ceiling, drift −0.20). Programs above the threshold are pushed toward it and never past it upward | Retain clamping (verified label-equivalent to a symmetric alternative, §3.4) but **disclose it** and publish the sensitivity result |

**Non-goals.** v3.1 does not close L-v3-1 (hybrid crosswalk), L-v3-2 (evidence-tier trade), L-v3-5 (coverage bias), R7 (AI-literacy re-anchoring) or R9 (rater study). Those remain the v3.2 scope and are re-prioritised in §8.

---

## 2. Why exact enumeration is available

Panel C has **five scored items**, each perturbed to one of three states (−1, 0, +1). The complete outcome space is therefore 3⁵ = **243 states**, each with a closed-form probability. This is small enough to enumerate in microseconds, which makes Monte Carlo not merely unnecessary but strictly worse: it introduces sampling error and a seed dependency in exchange for nothing.

The sampling error is not negligible at the decision boundary. At m ≈ 0.80 with N = 20,000, the standard error is 0.0028 and the 95% interval is ±0.0055 — wider than the gaps between adjacent programs in the lower cluster. Three programs' label regime was therefore **not determined by the data** under v3's method.

Verified against v3's own output: exact enumeration and the 20,000-draw estimate agree to a maximum absolute deviation of **0.0038** (mean 0.0009), and the exact dual-label count is **2** — v3's published figure is correct, but was one draw from a distribution over {0, 1, 2}.

---

## 3. Amended specification: §4.1 Rating perturbation

### 3.1 Algorithm (replaces the Monte-Carlo procedure)

```text
for each program P:
    base ← [D2, D3, D7, B, D5]                 # integers 0..3
    dist ← {q: 0.0 for q in QUADRANTS}
    for each delta in {-1, 0, +1}^5:           # 243 states, deterministic order
        p ← Π over items of  w[delta_i]        # w = {-1: e/2, 0: 1-e, +1: e/2}
        adapt ← Σ clamp(base_i + delta_i, 0, 3)
        q ← quadrant(exposure_P, adapt, medianExposure, medianAdapt)
        dist[q] ← dist[q] + p
    assert |Σ dist - 1| < 1e-12
```

`e` is the assumed per-item rating-error rate, **0.10** as in v3 (0.05 down, 0.05 up).

**Deterministic.** No seed, no RNG, no `mulberry32`. Two runs on the same inputs produce bit-identical output; the v3 seeding machinery is removed.

**Adaptiveness envelope.** Published as the exact min and max reachable adaptiveness over the 243 states, not the observed range across draws. For most programs this is `[Σbase − 5, Σbase + 5]` truncated by the item bounds — e.g. Master of Computer Science, at 14 with 4 items at ceiling, has envelope 9–15 rather than 9–19.

### 3.2 Quadrant function (unchanged, restated for implementation)

```text
quadrant(exposure, adapt, medE, medA):
    highE ← exposure >  medE       # strict
    highA ← adapt    >= medA       # tie counts as adaptive (v3 §5.3 tie rule)
```

The asymmetry between `>` and `>=` is deliberate and inherited from v3. It matters: **9 of the 34 placed programs tie exactly at the adaptiveness median**, so the tie rule determines the label for a quarter of the placed portfolio.

### 3.3 Required sensitivity outputs

The generator must compute and store the modal probability at **three** error rates, not one:

| Field | Error rate | Meaning |
| --- | --- | --- |
| `modalProbability` | e = 0.10 | Published value; v3's assumption |
| `modalProbabilityOptimistic` | e = 0.05 | Raters agree more than assumed |
| `modalProbabilityPessimistic` | e = 0.20 | Raters agree less than assumed |

This is the single most important addition in v3.1, because the assumed error rate — not the data — determines the headline result:

| e | Programs failing the m ≥ 0.80 rule | Mean modal probability | Minimum |
| --- | --- | --- | --- |
| 0.05 | **0** of 34 | 0.9551 | 0.8879 |
| **0.10** | **2** of 34 | 0.9177 | 0.7986 |
| 0.20 | **14** of 34 | 0.8599 | 0.6716 |

**No inter-rater study has been run**, so none of the three is empirically grounded (v3 open item R9). Publishing only the middle column presents a choice of assumption as a property of the portfolio. The report must show all three.

### 3.4 Error-model asymmetry (defect A3)

Clamping at the item bounds makes the perturbation asymmetric wherever a program has items at 0 or 3. Across the placed portfolio, **53 of 170 scored items (31%) sit at the ceiling**, giving an expected net drift of **−0.075 adaptiveness points**, concentrated in the highest-adaptiveness programs.

A symmetric alternative was tested — reject out-of-range moves and renormalise, rather than clamping them into no-ops. The result: maximum difference in modal probability **0.0057**, and **zero programs change label regime**. Clamping is therefore retained as the simpler rule, but §8 records the asymmetry as a stated limitation rather than leaving it implicit, and the sensitivity result is stored so the claim is checkable.

---

## 4. Amended specification: §5.2 Label stability rules

### 4.1 The distribution is bimodal, and the rule should say so

Exact enumeration reveals structure that sampling obscured. The 34 modal probabilities take only **13 distinct values**, in two well-separated clusters:

| Cluster | Range | n | Character |
| --- | --- | --- | --- |
| **Boundary** | 0.79855 – 0.84758 | 14 | Every program sits 0 or 1 adaptiveness point from the median |
| *(empty band)* | 0.84758 – 0.97939 | 0 | **0.13 wide — no program lands here** |
| **Stable** | 0.97939 – 1.00000 | 20 | Every program sits ≥ 1 point from the median, most ≥ 2 |

The bimodality has a single cause: **distance from the adaptiveness threshold**, and nothing else. A program one point from the median can cross it under a single item's error; a program two points away needs two coincident errors, which is an order of magnitude less likely.

### 4.2 Retained rule, plus a derived class

The published thresholds are **unchanged** — m ≥ 0.80 single label, 0.60 ≤ m < 0.80 dual, m < 0.60 suppressed — for three reasons: they were pre-committed in v3, they are conventional in the sense that any cut in [0.799, 0.806] would be defensible, and changing them now to fit an observed distribution would be exactly the post-hoc threshold selection the instrument criticises elsewhere.

But the 0.80 cut falls **inside** the boundary cluster, separating two programs at 0.79855 from six at 0.80620 — a gap of 0.008 doing categorical work. That fact must be visible rather than hidden, so v3.1 adds a derived field:

```text
stabilityClass = "boundary"  if modalProbability < 0.90
               = "stable"    otherwise
```

The 0.90 cut point sits in the middle of the empirical empty band and is therefore robust: any value in [0.85, 0.98] produces the identical partition. `stabilityClass` is the honest summary of position stability; the m ≥ 0.80 label rule is retained as the display convention. Where they disagree — the 12 programs that are `boundary` but clear 0.80 — the report shows the class.

### 4.3 Required disclosure at the label

Any program whose modal probability lies within **0.02** of a rule threshold must render the note:

> *This label sits near the display threshold (m = 0.806 against a 0.80 rule). At a pessimistic rater-error assumption it would be reported as a boundary case.*

Eleven of the 34 placed programs currently trigger this (modal probabilities 0.79855 to 0.81355).

---

## 5. Implementation

### 5.1 Changes to `scripts/dfva-v3-panela.ts`

1. **Delete** the `mulberry32` seeded RNG and the 20,000-draw loop.
2. **Add** `enumeratePerturbations(base: number[], e: number)` implementing §3.1. Pre-compute the 243 delta vectors once at module scope.
3. **Call it three times** per program (e = 0.05, 0.10, 0.20); store all three modal probabilities plus the full four-quadrant distribution at e = 0.10.
4. **Add** `stabilityClass` (§4.2), `adaptEnvelope: [min, max]` (§3.1), `nearDisplayThreshold: boolean` (§4.3), and `itemsAtCeiling: number` (§3.4).
5. **Assert** each distribution sums to 1 within 1e-12 and fail the build otherwise. This replaces the statistical tolerance a sampled method required.

### 5.2 Changes to `v3Programs.test.ts`

Replace the invariant pinning "2 dual labels" — which was seed-dependent — with exact-value assertions from the reference table:

```ts
expect(byCode('746st').modalProbability).toBeCloseTo(0.79855, 5);
expect(byCode('mc-phtyph').modalProbability).toBeCloseTo(0.79855, 5);
expect(byCode('mc-cs').modalProbability).toBeCloseTo(1.00000, 5);
expect(programs.filter(p => p.stabilityClass === 'boundary')).toHaveLength(14);
expect(programs.filter(p => p.modalProbability < 0.80)).toHaveLength(2);
```

These are now exact facts about the data rather than estimates, so `toBeCloseTo` at 5 decimal places is appropriate. Add a regression test asserting that two consecutive generator runs produce byte-identical output.

### 5.3 Reference outputs

`v31_reference_position_stability.csv` (accompanying this document) carries all 34 programs with exact quadrant distributions at e = 0.10, modal probabilities at all three error rates, adaptiveness envelopes, ceiling-item counts, distance to the adaptiveness median, and `stabilityClass`. **The generator must reproduce this table exactly**; treat it as the §3.6 archived-table guard for the stability layer.

Spot values for implementation checking:

| Program | Exposure | Adapt | Envelope | Modal quadrant | m (e=0.10) | m (e=0.05) | m (e=0.20) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `746st` | 91.09 | 10 | 5–13 | High exposure · high adaptiveness | 0.79855 | 0.88792 | 0.67165 |
| `mc-phtyph` | 71.03 | 10 | 5–13 | Low exposure · high adaptiveness | 0.79855 | 0.88792 | 0.67165 |
| `mc-propsyc` | 97.19 | 10 | 5–14 | High exposure · high adaptiveness | 0.80620 | 0.89011 | 0.69480 |
| `mc-is` | 91.69 | 8 | 3–13 | High exposure · low adaptiveness | 0.98062 | 0.99449 | 0.94034 |
| `mc-cs` | 92.80 | 14 | 9–15 | High exposure · high adaptiveness | 1.00000 | 1.00000 | 0.99999 |
| `mc-dvetmed` | 62.40 | 12 | 7–14 | Low exposure · high adaptiveness | 0.99889 | 0.99985 | 0.99215 |

The 14 boundary-class programs: `746st`, `mc-phtyph`, `mc-propsyc`, `mc-gencoun`, `mc-dphysio`, `mc-scibit`, `mc-envsc`, `mc-nursc`, `mc-jurisd`, `mc-prop`, `439fs`, `mc-urbdes`, `mc-ed`, `mc-surged`.

### 5.4 Report surface

Three additions to the v3 confidence-first report:

1. **Sensitivity strip** beside the modal probability — the three error-rate values as a compact inline range, e.g. `0.806 (0.890 optimistic / 0.695 pessimistic)`, with a tooltip stating that no rater study has been run and the middle value is an assumption.
2. **Stability class** rendered with the coordinate pair, worded so it is not read as a quality judgment: *"Position stability: boundary — this program sits at the adaptiveness median, so its quadrant is sensitive to single-item rating differences."*
3. **Near-threshold note** (§4.3) where triggered.

The existing four-quadrant probability distribution display is unchanged and remains the primary uncertainty surface.

---

## 6. Reproducibility additions

| Artifact | Guard |
| --- | --- |
| Exact stability table | Generator fails if any modal probability deviates from `v31_reference_position_stability.csv` by > 1e-5 |
| Distribution integrity | Each program's four-quadrant distribution sums to 1 within 1e-12 |
| Determinism | Two consecutive generator runs produce byte-identical `v3Programs.ts` |
| Enumeration completeness | Exactly 243 delta vectors, each visited once |
| Sensitivity fields | All three error-rate probabilities present and monotone: `optimistic ≥ published ≥ pessimistic` |

---

## 7. What v3.1 does not fix, restated honestly

**The display rule remains calibrated against an assumption, not a measurement.** Exact enumeration removes sampling error; it does not remove the fact that e = 0.10 was chosen rather than estimated. If the rater study returns per-item agreement consistent with e ≈ 0.20, then 14 of 34 programs — not 2 — fail the single-label rule, and the current report understates instability for a third of the placed portfolio. **Precision in the computation must not be mistaken for accuracy in the model.** This is why §3.3 mandates publishing all three.

**Position stability is not construct validity.** A stable label can be a stable measurement of the wrong thing. The stability layer says how robust a position is to rating error; it says nothing about whether the two axes measure what they claim, which remains the province of R9 and of realised-outcome data.

**The exposure axis still carries no distributed uncertainty** (L-v3-3, unchanged). Modal probabilities are conditional on the exposure coordinate being correct, and §3.3's crosswalk defect means absolute exposure is the least certain quantity in the instrument. A program near the *exposure* median has an uncertainty that this layer does not model at all — which is why `nearBoundary` (v3 §4.3) is retained alongside `stabilityClass` rather than replaced by it.

---

## 8. Re-prioritised open scope

v3.1 completes the uncertainty layer. The remaining work, in the order the evidence now supports:

| Priority | Item | Why now |
| --- | --- | --- |
| **1** | **R9 — inter-rater study** (5 scored items + 2 gates, v3 conditions) | Promoted to first. Everything in §4 is calibrated against an assumed error rate; this is the only way to learn the real one. Report quadrant agreement as the headline statistic, with per-item weighted κ, AC1, PABAK and marginals |
| **2** | **L-v3-1 — uniform crosswalk re-mapping** (368 titles, single generation) | Absolute exposure levels currently depend on which of two crosswalk generations a title landed in. Bounded task; §6 of v3 predicts structure survives and levels move |
| **3** | **R7 — AI-literacy re-anchoring** | At 77% modal it is the next item to saturate, it correlates negatively with research methods, and it is the most gameable item in the instrument. Re-anchor to discriminate at the bottom of the range, with the top anchor requiring *assessment* evidence |
| **4** | **L-v3-2 — dual-basis exposure** (administrative field-grain as a sensitivity band around program-grain) | Resolves the evidence-tier trade and supplies the second independent basis the robustness argument needs |
| **5** | R8 (coverage bias), R11 (anti-gaming), R12(b) (diff history) | Unchanged priority |

**Criterion-referenced thresholds** (audit R4.5) remain deferred, and v3.1 strengthens the case for them: the bimodality documented in §4.1 is a property of *this* portfolio's adaptiveness distribution around *this* median. Under portfolio-relative thresholds the empty band is not guaranteed to persist as programs are added, and `stabilityClass` would need recalibration. Fixed cut-points defined against the index's own distribution would make both the thresholds and the stability classes portable across institutions and vintages.
