# DFVA Inter-Rater Reliability Study Protocol

**Purpose:** Establish whether the DFVA scoring methodology produces consistent results across raters — the single most important validation step before any external sale.

**Date:** 2026-06-30
**Target completion:** August 2026 (6–8 weeks)
**Success criterion:** Cohen's kappa >0.8 overall, >0.7 per dimension

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
4. **A standardised scoring sheet** — one row per program, 11 dimension columns, space for rationale

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

```python
# Pseudocode for analysis — implement in the study
from sklearn.metrics import cohen_kappa_score
import numpy as np

# Scores matrix: 5 raters × 10 programs × 11 dimensions
scores = load_scores()

# Overall kappa (per dimension, averaged)
dimension_kappas = {}
for dim in range(11):
    pairwise = []
    for r1 in range(5):
        for r2 in range(r1+1, 5):
            k = cohen_kappa_score(scores[r1,:,dim], scores[r2,:,dim])
            pairwise.append(k)
    dimension_kappas[dim] = np.mean(pairwise)

# LLM-vs-human kappa
llm_human_kappa = []
for human in [3, 4, 5]:  # R3, R4, R5
    k = cohen_kappa_score(scores[1].flatten(), scores[human].flatten())
    llm_human_kappa.append(k)

print(f"Overall kappa: {np.mean(list(dimension_kappas.values())):.3f}")
print(f"LLM-human kappa: {np.mean(llm_human_kappa):.3f}")
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
