<!-- GENERATED FILE — DO NOT EDIT.
     Source: dfva/source/rubricV4.ts · Generator: scripts/dfva-v4-gen.ts
     Regenerate: npm --prefix scripts run dfva:gen-v4 -->
# DFVA v4 Report Template — Canonical Spec (instrument 4.0-draft)

Every `reports/dfva-v4-<code>.md` must follow this template. It extends the
v3.1 display grammar (Part A finding / Part B market evidence / Part C method)
with the v4 Panel C and an explicit epistemic-status tag on every section —
**Basis: measured | scored | reported | inferred** — so a reader always knows
when the report moves from observation to judgement (the distinction A/Prof
Lyons's August 2026 feedback identified; LR §1, §7).

---

## Header

```markdown
# DFVA v4 DURABILITY REPORT: <Program Name> (<CODE>)

**Instrument:** DFVA 4.0-draft — Panel C v4 on the TEQSA adaptive capabilities [1]
**Assessment date:** <YYYY-MM-DD>
**Handbook vintage:** <year> · **Source URL(s):** <handbook url(s)>
**Coordinator:** <name (school)> — omit line if unknown
```

## Sections (all required, in order)

### 1. POSITION — Basis: measured × scored

Destination AI Exposure <NN.NN> (Felten AIOE, measured; portfolio median <NN.N>)
× Curriculum Adaptiveness <N>/15 (scored on Panel C v4 [1]).
Position label only if stable per the v3.1 §5.2 rules; state modal probability
and stability class. Never render an unstable label.

### 2. PANEL C v4 SCORECARD — Basis: scored

A table of the five items. Every row cites its literature anchor by reference
number and its handbook evidence:

```markdown
| Item | Score | Rationale (anchor-referenced) |
| --- | --- | --- |
| C1 Distributed cognition & relational capability [1][5][7] | <0–3> | <rationale citing the anchor met and the handbook evidence> |
| C2 Hybrid metacognition & evaluative judgement [1][4][3] | <0–3> | <rationale citing the anchor met and the handbook evidence> |
| C3 Digital & AI literacy, including governance [1][13][11][12][2] | <0–3> | <rationale citing the anchor met and the handbook evidence> |
| C4 Life-long learning & transfer [1][9][10][2] | <0–3> | <rationale citing the anchor met and the handbook evidence> |
| C5 Inquiry & evidence generation [14][15][7] | <0–3> | <rationale citing the anchor met and the handbook evidence> |
| **Adaptiveness** | **<N> / 15** | |
```

Followed by one evidence paragraph per item quoting the decisive handbook
line(s). A level-3 claim must quote assessment evidence (R2).

### 3. GATES — Basis: scored

- **G1 Disciplinary foundation:** <PASS|FAIL> — <one-line evidence>
- **G2 Decision-making under uncertainty:** <PASS|FAIL> — <one-line evidence>

A G1 FAIL is flagged prominently regardless of the adaptiveness score.

### 4. MARKET EVIDENCE — Basis: reported

The Part B run endorsed in the August 2026 review, unchanged in structure:
JOB FAMILY MAP · RECENT JOB AD SIGNALS · CURRENT DISCUSSION SIGNALS ·
SKILL SHIFT SUMMARY. Confidence stated per subsection. No scoring language.

### 5. CURRICULUM IMPLICATIONS — Basis: inferred

Opens with the mandatory sentence: *"This section argues from the evidence
above; it is interpretation, not observation."* Implications are keyed to
C-items (e.g. "C2 at 1/3 → …") and phrased as options with trade-offs, not
directives.

### 6. EVIDENCE CONFIDENCE & LIMITATIONS — Basis: reported

Panel D metadata (JIR match tier, n, coverage), the crosswalk vintage note,
plus the v4 standing limitations verbatim:

- Scores describe **documented curriculum intent**, not demonstrated graduate
  capability; the extrapolation warrant is constructive alignment, stated as an
  assumption (Kane [17]).
- Indigenous data governance is not scored as a distinct construct; C3 level 3
  counts it where taught (CARE Principles; Lodge et al. 2025 Principle 4 [2]).
- Perception/manipulation (Frey & Osborne's third bottleneck [7]) is unscored.

### REFERENCES

The numbered list below, verbatim, ending the report:

```markdown
1. Lodge JM, de Barba P, Ainscough L, et al. (2026). Assuring quality learning in a gen AI-integrated future: The role of adaptive capabilities. TEQSA. https://www.teqsa.gov.au/guides-resources/resources/corporate-publications/assuring-quality-learning-gen-ai-integrated-future-role-adaptive-capabilities
2. Lodge JM, et al. (2025). Australian Framework for Artificial Intelligence in Higher Education. ACSES. (Principles 4 & 6.) https://www.acses.edu.au/publication/australian-framework-for-artificial-intelligence-in-higher-education/
3. Lodge JM, Howard S, Bearman M, Dawson P & Associates (2023). Assessment reform for the age of artificial intelligence. TEQSA. https://www.teqsa.gov.au/sites/default/files/2023-09/assessment-reform-age-artificial-intelligence-discussion-paper.pdf
4. Tai J, Ajjawi R, Boud D, Dawson P, Panadero E (2018). Developing evaluative judgement: enabling students to make decisions about the quality of work. Higher Education 76:467–481. https://doi.org/10.1007/s10734-017-0220-3
5. Deming DJ (2017). The growing importance of social skills in the labor market. Quarterly Journal of Economics 132(4):1593–1640. https://doi.org/10.1093/qje/qjx022
6. Deming DJ, Noray K (2020). Earnings dynamics, changing job skills, and STEM careers. Quarterly Journal of Economics 135(4):1965–2005. https://doi.org/10.1093/qje/qjaa021
7. Frey CB, Osborne MA (2017). The future of employment: how susceptible are jobs to computerisation? Technological Forecasting & Social Change 114:254–280. https://doi.org/10.1016/j.techfore.2016.08.019
8. Brynjolfsson E, Mitchell T, Rock D (2018). What can machines learn, and what does it mean for occupations and the economy? AEA Papers & Proceedings 108:43–47. (The SML rubric — the declarative-anchor form R1 copies.) https://doi.org/10.1257/pandp.20181019
9. Pellegrino JW, Hilton ML (eds) (2012). Education for Life and Work: Developing Transferable Knowledge and Skills in the 21st Century. National Research Council. https://www.nationalacademies.org/read/13398/chapter/2
10. Measuring adaptive expertise and adaptive performance in (becoming) healthcare professionals: a scoping review of measurement instruments (2025). Advances in Health Sciences Education. https://doi.org/10.1007/s10459-025-10413-y
11. Long D, Magerko B (2020). What is AI literacy? Competencies and design considerations. CHI 2020. https://doi.org/10.1145/3313831.3376727
12. UNESCO (2024). AI competency framework for students. https://unesdoc.unesco.org/ark:/48223/pf0000391105
13. European Commission JRC — DigComp (Digital Competence Framework for Citizens); basis of the Australian Digital Capability Framework (DEWR, 2022).
14. Boyer EL (1990). Scholarship Reconsidered: Priorities of the Professoriate. Carnegie Foundation.
15. Brew A (2006). Research and Teaching: Beyond the Divide. Palgrave Macmillan.
16. Knight FH (1921). Risk, Uncertainty and Profit. Houghton Mifflin.
17. Kane MT (2013). Validating the interpretations and uses of test scores. Journal of Educational Measurement 50(1):1–73. (The validity-argument frame for the v4 evidence plan.)
18. Woods L, Lyons K, et al. (2026). Assessing the effectiveness of artificial intelligence education and training for healthcare workers: a systematic review. BMC Medical Education 26:549. (The construct-validity critique v4 answers.) https://doi.org/10.1186/s12909-026-08969-3
```

---

## Rubric quick reference (for authors; do not paste into reports)

| # | Item | 0 | 1 | 2 | 3 | Refs |
|---|---|---|---|---|---|---|
| C1 | Distributed cognition & relational capability | No collaborative, stakeholder or team-based work is assessed anywhere in the core. | Collaboration/teamwork/communication appears in learning outcomes, but no core unit assesses it. | At least one core unit assesses collaborative practice — group projects with individual accountability, client or stakeholder work, interprofessional activity. | Assessed collaborative practice recurs across the program AND at least one assessment requires coordinating work across people and tools/AI systems (e.g. team capstones with documented role/tool allocation, supervised placements with multidisciplinary accountability). | [1][5][7] |
| C2 | Hybrid metacognition & evaluative judgement | No assessment requires students to appraise the quality of work — their own, peers', or a tool's. | Reflection or self-assessment appears in outcomes or graduate attributes, but no core unit assesses it against criteria. | Core assessment includes criterion-referenced appraisal of quality: peer review, structured critique, portfolio with standards, marking against exemplars. | Assessment requires students to document and justify reliance decisions — when they relied on or overrode a tool, source or collaborator; defend judgements of AI-output quality; or evidence strategy adjustment over time (process-focused assessment). | [1][4][3] |
| C3 | Digital & AI literacy, including governance | No digital/AI content in any core unit or program-level outcome. | AI or digital tools appear only as electives or as tool operation/training — the operational level TEQSA identifies as non-durable. | Core units address AI capabilities AND limitations/ethics; use with limits discussed and assessed. | Core assessment requires critique or governance of AI systems in the discipline's own context — bias, accountability, transparency, regulation or data governance — beyond tool operation. | [1][13][11][12][2] |
| C4 | Life-long learning & transfer | Fixed content sequence; no assessment requires applying methods outside the taught context. | Transfer is claimed in outcomes ("apply knowledge in new settings") but not assessed. | At least one core assessment requires application to novel or unfamiliar problems — case variation, unseen datasets, cross-context projects. | The program documents structured progression toward independent learning: self-scoped capstone or research project, assessed identification of one's own knowledge gaps, or work-integrated learning requiring performance in a context not taught. | [1][9][10][2] |
| C5 | Inquiry & evidence generation | Secondary synthesis only; no research-methods training. | Introductory methods unit; literature-review assessment. | Students design and conduct an inquiry with methodology selection and data collection, assessed. | A substantial project generating primary evidence is REQUIRED (not one route among several), with methodology defended under scrutiny (viva, defence, or staged supervised review). | [14][15][7] |

## Lint rules (for the future v4 family in check-report-format.ts)

1. Header carries `**Instrument:** DFVA 4.0-draft`.
2. All six numbered sections present, in order, each with a `Basis:` tag.
3. Section 5 opens with the mandatory interpretation sentence.
4. Every scorecard row cites at least one reference number; every level-3 score
   quotes assessment evidence.
5. REFERENCES section matches the canonical list (generated, byte-exact).
6. No v1 composite ("N/36"), no Irreplaceability score, anywhere.
