# DFVA Inter-Rater Reliability Study Protocol

**Purpose:** Establish whether the DFVA scoring methodology produces consistent results across raters — the single most important validation step before any external sale.

**Date:** 2026-06-30 · **Amended:** 2026-08-13 (§0 — re-targeted at Panel C v4) ·
2026-08-14 (§0 — extended to the v4.1 eight-item instrument)
**Target completion:** re-baselined to the v4 pilot (see §0)
**Success criterion:** Cohen's kappa >0.8 overall, >0.7 per item

---

## 0. Amendment (2026-08-13, extended 2026-08-14): the study targets Panel C v4.1

Per the [Panel C v4 decision log](dfva-panelc-v4-recommendation.md) (§7, decisions
1–2): the v4 instrument is the working draft, and **this study runs on v4 — running
it on a retiring instrument would spend the plan's most expensive evidence certifying
something already superseded.** The same logic re-applies to
[v4.1](dfva-panelc-v41-recommendation.md), which added a second sub-scale on
2026-08-14: the study runs on the eight-item instrument, not the five-item one.

The protocol below was drafted against the v1 11-dimension rubric; the following
supersede the corresponding details wherever they conflict, and everything else
(rater design, independence constraint, kappa targets, publication plan, §4
diagnostics) carries over unchanged.

1. **Rating targets: 10, not 11 and not 7.** Eight ordinal items — C1–C5 (adaptive
   capabilities) and W1–W3 (workplace practice), each 0–3 — plus two binary gates
   G1/G2 (PASS/FAIL), as defined in `dfva/source/rubricV4.ts`. Weighted kappa applies
   to the eight ordinal items; gates use plain kappa / percent agreement. The
   analysis matrix in §3.3 becomes 5 raters × 10 programs × (8 ordinal + 2 binary).
2. **Report reliability per sub-scale as well as per item.** Kappa is reported for
   C1–C5 and W1–W3 separately and never averaged into one headline figure — the same
   discipline the instrument applies to the scores themselves. A sub-scale whose
   items agree well internally but poorly with the other sub-scale is evidence *for*
   the two-factor structure, not a defect.
3. **Scoring package item 1 changes:** raters receive the generated
   `dfva/dist/v4/DFVA-V4-SCORING-PROMPT.md` (anchors, R1–R4 evidence rules, gate
   criteria, numbered references) in place of the v1 rubric document. LLM raters
   (R1, R2) run that prompt verbatim; human raters receive the same document with
   the JSON-output section removed.
4. **Evidence rules are part of what is being tested.** Raters must cite verbatim
   handbook lines per score (R3), may award level 3 only on quoted *assessment*
   evidence (R2), and must score authenticity from documented task features rather
   than from a handbook's use of the word "authentic" (R4). Rater disagreement on
   whether a line satisfies an anchor is a finding, not noise — record it.
5. **The one-construct-one-home rule is itself a rating target.** v4.1 closed three
   overlaps (C1/W3, C4/W3, C2/W2). Record every case where a rater files the same
   handbook evidence under a different item from another rater: cross-item
   misfiling is a distinct failure mode from level disagreement, invisible to
   per-item kappa, and it is the specific risk the overlap closures were meant to
   remove. Report it as a confusion matrix over items, not folded into kappa.
6. **Two a priori predictions, recorded before data collection.** W3 should be the
   *most* reliable item in the instrument — placements are unambiguously documented
   in handbooks. W2 should be the *least* — it requires a judgement about
   resemblance to professional practice, which is discipline-relative by
   construction (Gulikers et al. 2004). If W2 lands below the 0.7 per-item floor,
   the honest options are sharper anchors or dropping the item; a poor item is not
   to be rescued by averaging it into a sub-scale figure that clears the bar.
7. **Program selection criteria shift.** The §2.2 sample was stratified by v1 risk
   band. Re-stratify at recruitment on the v4.1-relevant axes: adaptiveness spread,
   at least one expected G1 FAIL candidate, at least one program with heavy level-3
   candidacy (ceiling behaviour is a named v4 concern — the v3.1 rate to beat is
   31%), **and W-sub-scale spread: at least one program with a required extended
   placement (W3 = 3 candidate) and at least one with no work-situated learning at
   all (W3 = 0/1 candidate)**, plus the same faculty breadth. Without that spread
   W3 has no variance to be reliable about. The named programs remain good
   candidates; confirm codes and re-justify each slot against v4.1 criteria.
8. **Sequencing precondition.** Recruitment does not start until the v4.1
   content-validity step (recommendation §5, step 2 / v4.1 §6) has at least a
   settled item set — anchors may be reworded by the CVI panel, and raters must
   score the frozen wording. The W items are eight weeks younger than the C items
   and have had no external review at all, so this precondition now binds harder,
   not less.

---

## 1. Why This Matters

The premortem identified a successful public challenge to the LLM-scoring methodology as the *most dangerous* failure mode — the one that kills the product itself, not just the business model. The current methodology document (§5) explicitly states:

> *"The current pilot employs a single scoring agent (Hermes LLM). Inter-rater reliability has not been formally assessed."*

This is a publicly documented vulnerability. A CRITICAL-rated program that disputes its score will commission exactly this analysis. If Evidura hasn't done it first, the external reviewer will — and their findings will be the only ones that exist.

**Doing this study proactively converts the #1 existential risk into a published strength.**

---

## 2. Study Design

### 2.1 Raters (5 total)

| Rater | Type | Recruitment |
|---|---|---|
| R1 | **Hermes LLM** (current scorer) | Existing — the DFVA prompt as-is |
| R2 | **Alternative LLM** (Claude, GPT-4, or DeepSeek) | Same prompt, different model — tests LLM-consistency |
| R3 | **Human — curriculum designer** (UoM, not involved in DFVA development) | Internal UoM colleague from CSL/T&L — someone who reads handbooks professionally |
| R4 | **Human — external curriculum expert** (non-UoM, ideally Go8) | Recruit via network — a PVC L&T or program director from another institution |
| R5 | **Human — discipline specialist** (from a scored field — e.g. Health or Engineering) | Recruit via network — domain expertise for validity check |

**Recruitment note:** R4 is the hardest to secure and the most valuable. A non-UoM rater is essential for credibility. Consider offering a modest honorarium ($500–$1,000) and framing as "contributing to curriculum quality methodology development."

### 2.2 Programs (10 selected)

Selection criteria: cover all 4 risk bands, at least 6 of 8 faculties, and both high-variance and low-variance dimensions.

| # | Program | Code | Faculty | Risk Band | Score | Rationale for Inclusion |
|---|---|---|---|---|---|---|
| 1 | Master of Computer Science | MC-CS | Engineering & IT | MODERATE (near-RESILIENT) | 27/36 | Highest non-RESILIENT score; tests ceiling discrimination |
| 2 | Master of Clinical Psychology | 527CL | Health | RESILIENT | 28/36 | Only RESILIENT program; tests ceiling effect |
| 3 | Master of Screenwriting | MC-SCWR | Creative Arts | CRITICAL | 11/36 | Only CRITICAL program; tests floor discrimination; highest legal-risk program |
| 4 | Master of Urban Design | MC-URBDES | Built Environment | MODERATE | 26/36 | Strong D8 (Human & Relational) example; near RESILIENT |
| 5 | Master of Applied Business Analytics | MC-APBUSA | Business | MODERATE | — | Only program scoring 3/3 on D5 (AI Literacy); tests domain-specific high scores |
| 6 | Master of Data Science | MC-DATASC | IT & Analytics | MODERATE | 27/36 | Near RESILIENT; high technical depth |
| 7 | Graduate Diploma in Psychology | — | Health | MODERATE | ~24 | Mid-range; tests consistency on professionally-accredited programs |
| 8 | Master of Teaching (Secondary) | — | Education | HIGH RISK | ~16 | HIGH RISK band; education domain not well-represented |
| 9 | Master of Engineering | — | Engineering | MODERATE | ~22 | Largest faculty by program count; typical mid-range |
| 10 | Master of Management | — | Business | HIGH RISK | ~17 | HIGH RISK; business programs show highest variance |

**Note:** Programs marked "—" and "~" need exact codes and scores confirmed from the pilot database. Select the actual programs that best fit these criteria from the 41 assessed.

### 2.3 Scoring Protocol

Each rater receives the identical package:

1. **The DFVA Rubric** — full 11-dimension criteria document (§2 of the methodology)
2. **The Scoring Protocol** — scoring scale definitions (0=Absent → 3=Exemplary)
3. **The 10 Program Handbook Extracts** — the same three pages per program used by the Hermes scorer: course overview, course structure, attributes/outcomes/skills
4. **A standardised scoring sheet** — one row per program, one column per rating target (§0 rule 1: eight ordinal items C1–C5/W1–W3 plus the two gates), space for rationale, and a citation field per score (R3)

**Critical constraint:** Raters score independently. No discussion between raters until all scores are submitted. This is essential for valid inter-rater reliability measurement.

**LLM raters:** R1 (Hermes) uses the existing `dfvaPrompt.ts` prompt. R2 (alternative LLM) uses the same prompt text but is executed on a different model (Claude Sonnet or GPT-4o recommended). Both are run programmatically via API — same handbook inputs, same prompt, different models.

### 2.4 Timeline

| Week | Activity |
|---|---|
| Week 1 | Recruit R4 and R5. Compile handbook extracts for 10 programs. Prepare scoring packages. |
| Week 2 | Distribute scoring packages to human raters (R3–R5). Run LLM scoring (R1–R2). Human raters have 2 weeks to complete scoring. |
| Week 3 | Human raters continue scoring. |
| Week 4 | Collect all scores. Compute inter-rater reliability statistics. Draft report. |
| Week 5 | Review findings. If kappa <0.7, identify problematic dimensions and revise rubric before re-testing. If kappa >0.8, finalise report. |
| Week 6 | Publish report. Update methodology document with reliability data. |

---

## 3. Statistical Analysis

### 3.1 Primary Measure: Cohen's Kappa (κ)

Cohen's kappa measures agreement between raters beyond chance. Applied pairwise (each rater pair) and as an aggregate (Fleiss' kappa for all 5 raters).

| Kappa Value | Interpretation |
|---|---|
| >0.80 | **Strong agreement** — methodology is reliable. Proceed. |
| 0.60–0.80 | **Moderate agreement** — methodology is usable with caution. Investigate problematic dimensions. |
| 0.40–0.60 | **Weak agreement** — methodology needs revision. Do not sell until improved. |
| <0.40 | **Poor agreement** — methodology is unreliable. Fundamental redesign required. |

**Target:** κ >0.80 overall, κ >0.70 for each individual dimension.

### 3.2 Secondary Measures

| Measure | What it tells us |
|---|---|
| **Weighted kappa** | Accounts for degree of disagreement (0 vs 3 is worse than 1 vs 2). More appropriate for ordinal scale (0–3). |
| **Intraclass Correlation Coefficient (ICC)** | Measures consistency across all 5 raters simultaneously. ICC >0.75 is good. |
| **Per-dimension mean and SD** | Identifies which dimensions have the most rater disagreement. |
| **LLM-vs-human agreement** | Most important pairwise comparison. If κ(R1, R3–R5) is substantially lower than κ(R3, R4, R5), the LLM is the source of variance. |
| **LLM-vs-LLM agreement** | κ(R1, R2). If two different LLMs agree strongly, the methodology is machine-consistent — good for scaling but doesn't validate human validity. |

### 3.3 Analysis Script

Updated 2026-08-14 for the v4.1 instrument (§0 rules 1, 2, 5).

```python
# Pseudocode for analysis — implement in the study
from sklearn.metrics import cohen_kappa_score
import numpy as np

ADAPTIVE  = ["C1", "C2", "C3", "C4", "C5"]   # ordinal 0-3
WORKPLACE = ["W1", "W2", "W3"]               # ordinal 0-3
GATES     = ["G1", "G2"]                     # binary PASS/FAIL

# Ordinal scores: 5 raters × 10 programs × 8 items. Gates are scored into a
# separate binary matrix — plain kappa, never weighted (§0 rule 1).
scores, gate_scores = load_scores()

def mean_pairwise(matrix, idx, weights=None):
    """Mean pairwise kappa across the 5 raters for one column."""
    return np.mean([
        cohen_kappa_score(matrix[a, :, idx], matrix[b, :, idx], weights=weights)
        for a in range(5) for b in range(a + 1, 5)
    ])

# Per-item kappa. Ordinal items use quadratic weights — a 0-vs-3 disagreement
# is not the same event as a 2-vs-3 disagreement.
item_kappas = {
    item: mean_pairwise(scores, i, weights="quadratic")
    for i, item in enumerate(ADAPTIVE + WORKPLACE)
}
gate_kappas = {g: mean_pairwise(gate_scores, i) for i, g in enumerate(GATES)}

# Per-SUB-SCALE, never averaged into one headline figure (§0 rule 2).
adaptive_kappa  = np.mean([item_kappas[i] for i in ADAPTIVE])
workplace_kappa = np.mean([item_kappas[i] for i in WORKPLACE])

# LLM-vs-human kappa, reported per sub-scale for the same reason.
def llm_human(cols):
    idx = [(ADAPTIVE + WORKPLACE).index(c) for c in cols]
    return np.mean([
        cohen_kappa_score(scores[1][:, idx].flatten(),
                          scores[h][:, idx].flatten(), weights="quadratic")
        for h in (3, 4, 5)   # R3, R4, R5
    ])

# Cross-item misfiling (§0 rule 5): same handbook line, different item. This is
# invisible to per-item kappa and is the specific risk the v4.1 overlap closures
# address, so it is reported as its own confusion matrix over items.
misfiling = confusion_over_items(load_evidence_citations())

print(f"Adaptive (C1-C5):  {adaptive_kappa:.3f}   LLM-human {llm_human(ADAPTIVE):.3f}")
print(f"Workplace (W1-W3): {workplace_kappa:.3f}   LLM-human {llm_human(WORKPLACE):.3f}")
for item, k in item_kappas.items():
    flag = "  ← below 0.7 floor" if k < 0.70 else ""
    print(f"  {item}: {k:.3f}{flag}")
for gate, k in gate_kappas.items():
    print(f"  {gate}: {k:.3f} (unweighted)")
```

---

## 4. What Happens If Kappa Is Low

If κ <0.70, do not proceed to external sale. The methodology needs revision. The likely causes and fixes:

| Likely Cause | Fix |
|---|---|
| **Handbook content variability** — some programs have richer public documentation than others. Raters disagree because they're working from different-quality evidence. | Add a "Documentation Quality" metadata field. Programs with sparse handbooks receive an "Insufficient Evidence" rating rather than a forced 0. |
| **Dimension criteria are ambiguous** — e.g. D4 (Decision-Making Under Uncertainty) may be interpreted differently by different raters. | Revise the criteria descriptors. Add specific examples of what constitutes each score level. |
| **LLM hallucination** — the LLM invents unit descriptions or misattributes content. | Add a verification step: LLM scores must cite specific handbook sentences. Human raters spot-check citations. |
| **Systematic LLM bias** — the LLM consistently scores higher or lower than humans. | Recalibrate the prompt. Add human calibrations as few-shot examples. |
| **W2 (authentic task design) below the 0.7 floor** — predicted in advance (§0 rule 6): the item asks for a judgement about resemblance to professional practice, which is discipline-relative by construction. | Sharpen the anchors toward checkable task features, or drop the item. Do **not** rescue it by reporting only the workplace sub-scale figure. |
| **Cross-item misfiling** — raters agree on the evidence but file it under different items (e.g. a placement scored in C1 or C4 rather than W3). | The v4.1 overlap closures were the first fix; if it persists, the construct boundaries in the anchors are still not explicit enough. Per-item kappa will not show this — read the §3.3 confusion matrix. |

**The study is not a pass/fail gate — it's a diagnostic.** If kappa is low, the study has succeeded at its real purpose: finding the problem before an external challenger does.

---

## 5. Publication

The reliability study should be published as a standalone white paper (8–12 pages) and linked from the methodology document. Structure:

1. **Abstract** — what was tested, by whom, with what result
2. **Method** — rater selection, program selection, scoring protocol
3. **Results** — kappa values (overall, per dimension, per rater pair), key findings
4. **Limitations** — 10 programs is a small sample, UoM-only handbooks, further validation needed
5. **Conclusions** — methodology reliability assessment, areas for improvement

Transparency is the strategy. Even if the study finds moderate agreement (κ 0.60–0.80), publishing it with clear limitations is more credible than having no reliability data at all. The worst outcome is not "moderate kappa" — it's "they never tested it."

---

## 6. Required Resources

| Resource | Estimate |
|---|---|
| Human rater honoraria (R4, R5) | $1,000–$2,000 total |
| LLM API costs (R2, ~10 programs × 4,000 tokens) | <$10 |
| Statistical analysis (self-conducted or research assistant) | In-house |
| Report writing and publication | In-house |
| **Total cost** | **$1,000–$2,000** |

---

*This protocol should be reviewed by a statistician or research methodologist before execution. The 10-program sample size is adequate for an initial reliability estimate but should be expanded in a follow-up study (30+ programs, 3+ institutions) before any regulatory or accreditation-body engagement.*
