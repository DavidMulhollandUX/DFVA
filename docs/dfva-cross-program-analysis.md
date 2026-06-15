# DFVA Cross-Program Analysis

**Date:** 2026-06-10 · **Updated:** 2026-06-15 (recomputed from `compass/app/src/compass/sharedProgramData.ts`) | **Programs analyzed:** 41 | **Data:** QILT GOS 2024 + JSA 2025

---

## 1. Dimension Analysis (0-3 scale, all 41 programs)

| Dimension | Avg | Bar | Signal |
|-----------|-----|-----|--------|
| Domain Depth | 2.78 | ██████████ | **Strongest** — programs are well-specialized |
| Decision-Making | 2.49 | ████████ | Strong across most programs |
| Irreplaceability (bonus) | 2.29 | ████████ | Many programs have structural AI defences |
| Human & Relational | 2.20 | ███████ | Strong in clinical programs, weak in technical |
| Technical Depth | 2.12 | ███████ | Varies widely by field |
| Systems Thinking | 2.10 | ███████ | Moderate across most |
| Research Rigour | 2.07 | ███████ | Strong in thesis programs, absent in coursework |
| Curriculum Currency | 2.05 | ███████ | Many programs in transition |
| Outcome Evidence | 2.00 | ██████ | Bimodal — half QILT-enriched (3), half not yet scored in (1) |
| Automation Exposure | 1.85 | ██████ | Programs cluster at extremes (0-1 or 3) |
| **AI Literacy** | **1.22** | ███ | **Weakest — near-universal gap** |

### Key finding: AI Literacy is 2.3x weaker than Domain Depth

Only **4** of 41 programs score 3 on AI Literacy (Master of Business Analytics, Master of Computer Science, Master of Applied Business Analytics, MBA), and 3 more score 2 (Data Science, Environmental Law, Industrial Engineering). The remaining **34 programs score 0-1** — 32 at 1 and 2 at 0. This is the single biggest curriculum opportunity across all faculties.

### Outcome Evidence is bimodal, not uniformly strong

D10 splits 16 programs at 3 / 9 at 2 / 16 at 1. The programs at 3 have had QILT GOS employment + salary data scored in; the 16 still at 1 (which include most Science programs) simply haven't had that enrichment folded into the rubric score yet — even though the underlying market data exists in the app's market tab. Scoring it in is an easy, evidence-backed lift.

---

## 2. Risk Band Distribution

| Band | Count | % |
|------|-------|---|
| RESILIENT (28-36) | 2 | 5% |
| MODERATE RISK (20-27) | 33 | 80% |
| HIGH RISK (12-19) | 5 | 12% |
| CRITICAL (0-11) | 1 | 2% |

**80% of programs cluster in MODERATE RISK.** Only two reach RESILIENT — **Master of Business Analytics (31)** and **Master of Architecture (28)** — and both clear the 28-point threshold precisely because they pair strong domain/technical scores with AI Literacy at or above 2. The threshold is hard to reach mainly because AI Literacy is universally weak.

### By faculty (heuristic grouping)

| Faculty | Programs | Avg | Notes |
|---------|----------|-----|-------|
| Science & Environment | 11 | 24.0 | All MODERATE; Domain Depth a perfect 3.00; twin gaps AI Literacy + Outcome Evidence (both 1.1) |
| Health (MDHS) | 9 | ~24.8 | Clinical/regulatory resilience; near-threshold cluster |
| Built Environment | 5 | ~23.8 | Holds the only non-Business RESILIENT (Architecture 28) |
| Business | 4 | ~23.5 | Bimodal — Business Analytics 31 vs MBA(Marketing) 17 |
| IT & Analytics | 3 | ~26.0 | Strongest AI Literacy in the portfolio |
| Education / Engineering / Creative Arts / Law | 8 | mixed | Creative Arts holds the only CRITICAL (Screenwriting 11) |

---

## 3. Programs on the Threshold

### 1 point from RESILIENT (27):
- **MC-CS** Master of Computer Science (27) — already AI-literate (3/3); add outcome evidence → 28+
- **527CL** Master of Clinical Psychology (27) — add AI/digital mental health → 28+

### 2 points from RESILIENT (26):
- **MC-CLIMSCI** Master of Climate Science (26) — add climate-ML / AI methods → 28
- **MC-GENCOUN** Master of Genetic Counselling (26) — add AI in clinical genomics → 28
- **MC-NURSC** Master of Nursing Science (26) — add AI in clinical practice → 28
- **MC-PROPSYC** Master of Professional Psychology (26) — add digital mental health → 28
- **MC-URBDES** Master of Urban Design (26) — add computational urban design → 28

### HIGH RISK programs:
- **B-DES** Bachelor of Design (17) — high junior-role automation exposure
- **MC-BAMKTG** MBA (Marketing) (17) — low automation resistance, low technical depth
- **MC-IS** Master of Information Systems (18) — generalist IT, lacks specialization depth
- **MC-BASE** Master of Advanced Social Enterprise (18) — leadership value but commodified content
- **MC-INTEDIB** Master of International Education (IB) (16) — online delivery, niche market

### CRITICAL:
- **MC-SCWR** Master of Screenwriting (11) — highest AI exposure of any program; commercial screenwriting heavily threatened by generative AI.

---

## 4. Strategic Implications

1. **AI Literacy is the near-universal gap.** 34 of 41 programs sit at 0-1. Adding AI literacy to core curriculum would lift most by 1-2 points — and would move the seven near-threshold programs (26-27) into RESILIENT.

2. **Clinical/health programs are structurally resilient.** Programs with clinical placements, regulatory accreditation, and hands-on patient care (psychology, physiotherapy, dentistry, nursing) cluster at 23-27. Their AI defence is regulatory and practical, not curricular.

3. **Business programs are bimodal.** Master of Business Analytics (31, RESILIENT) and the MBA (25) carry AI Literacy 3/3; MBA(Marketing) (17) and Advanced Social Enterprise (18) combine high exposure with weak technical depth. The business faculty holds both the biggest AI strength and the biggest AI risk.

4. **Outcome Evidence is half-captured.** 25 of 41 programs score 2-3 on D10 where QILT data has been scored in; the other 16 (mostly Science) still sit at 1 despite real employment/salary data existing in the market tab. This is a data-folding gap, not an outcomes gap — and an easy lift.

5. **Creative arts is the canary.** MC-SCWR at 11/36 CRITICAL reflects a genuine structural threat to creative practice programs. Its all-compulsory, craft-focused design offers no AI defence; journalism (23) and other creative programs face similar pressure.

---

## 5. Actionable Priorities

| Priority | Action | Impact |
|----------|--------|--------|
| P1 | Add AI literacy module to the 7 near-threshold programs (26-27) | Push them into RESILIENT |
| P1 | Score QILT outcome data into the 16 programs still at D10=1 | Evidence-backed lift, no new analysis |
| P2 | Develop a faculty-level AI literacy strategy | Close the 1.22/3 gap across all programs |
| P2 | Audit creative-arts programs for AI exposure | Identify structural curriculum gaps |
| P3 | Reassess business programs with labour-market projections | Differentiate high-risk from moderate-risk |

> Figures recomputed from the canonical program registry; this doc drifts when new programs are scored — consider generating it from `sharedProgramData.ts` (like the rubric pipeline) so it stays in sync.
