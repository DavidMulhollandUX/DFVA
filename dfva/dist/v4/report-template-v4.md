<!-- GENERATED FILE — DO NOT EDIT.
     Source: dfva/source/rubricV4.ts · Generator: scripts/dfva-v4-gen.ts
     Regenerate: npm --prefix scripts run dfva:gen-v4 -->
# DFVA v4 Report Template — Canonical Spec (instrument 4.1-draft)

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

**Instrument:** DFVA 4.1-draft — Panel C v4 on the TEQSA adaptive capabilities [1]
**Assessment date:** <YYYY-MM-DD>
**Handbook vintage:** <year> · **Source URL(s):** <handbook url(s)>
**Coordinator:** <name (school)> — omit line if unknown
```

## Sections (all required, in order)

### 1. POSITION — Basis: measured × scored

Destination AI Exposure <NN.NN> (Felten AIOE, measured; portfolio median <NN.N>)
× Curriculum Adaptiveness <N>/15 (scored on Panel C v4.1 sub-scale A [1]).
The position axis remains adaptiveness alone; the workplace sub-score
<N>/9 is reported beside it, not folded into the axis, until the internal-structure
analysis says whether the two behave as one construct.
Position label only if stable per the v3.1 §5.2 rules; state modal probability
and stability class. Never render an unstable label.

### 2. PANEL C v4.1 SCORECARD — Basis: scored

One table, the two sub-scales kept visually separate with their own subtotals.
The two sub-scores are reported side by side and **never added together** —
Panel C's total is a bookkeeping figure, not a construct. Every row cites its
literature anchor by reference number and its handbook evidence:

```markdown
| Item | Score | Rationale (anchor-referenced) |
| --- | --- | --- |
| C1 Distributed cognition & relational capability [1][5][7] | <0–3> | <rationale citing the anchor met and the handbook evidence> |
| C2 Hybrid metacognition & evaluative judgement [1][4][3] | <0–3> | <rationale citing the anchor met and the handbook evidence> |
| C3 Digital & AI literacy, including governance [1][13][11][12][2] | <0–3> | <rationale citing the anchor met and the handbook evidence> |
| C4 Life-long learning & transfer [1][9][10][2] | <0–3> | <rationale citing the anchor met and the handbook evidence> |
| C5 Inquiry & evidence generation [14][15][7] | <0–3> | <rationale citing the anchor met and the handbook evidence> |
| **Adaptive capabilities** | **<N> / 15** | |
| W1 Professional communication & conduct [19][20][21][31][5][32] | <0–3> | <rationale citing the anchor met and the handbook evidence> |
| W2 Authentic task design [22][23][25][26][24] | <0–3> | <rationale citing the anchor met and the handbook evidence> |
| W3 Work-situated learning [19][27][29][28][30] | <0–3> | <rationale citing the anchor met and the handbook evidence> |
| **Workplace practice** | **<N> / 9** | |
```

Followed by one evidence paragraph per item quoting the decisive handbook
line(s). A level-3 claim must quote assessment evidence (R2).

### 3. GATES — Basis: scored

- **G1 Disciplinary foundation:** <PASS|FAIL> — <one-line evidence>
- **G2 Decision-making under uncertainty:** <PASS|FAIL> — <one-line evidence>

A G1 FAIL is flagged prominently regardless of the adaptiveness score.

### 4. MARKET EVIDENCE — Basis: reported

Condensed from the market report, in two tables — destination job families with
their exposure values, and signals/skill shifts with their direction and the
scored item each bears on. Confidence restated from the market report. No
scoring language.

### 5. CURRICULUM IMPLICATIONS — Basis: inferred

Opens with the mandatory sentence: *"This section argues from the evidence
above; it is interpretation, not observation."* Then a table:
`| Item | Score | Implication | Cost | Sources |`, ordered by priority and
pointing at the v4 improvement plan for anchor text and sequencing. Phrased as
options with costs, not directives.

### 6. EVIDENCE CONFIDENCE & LIMITATIONS — Basis: reported

Panel D metadata (JIR match tier, n, coverage), the crosswalk vintage note,
plus the v4 standing limitations verbatim:

- Scores describe **documented curriculum intent**, not demonstrated graduate
  capability; the extrapolation warrant is constructive alignment, stated as an
  assumption (Kane [17]).
- Indigenous data governance is not scored as a distinct construct; C3 level 3
  counts it where taught (CARE Principles; Lodge et al. 2025 Principle 4 [2]).
- Perception/manipulation (Frey & Osborne's third bottleneck [7]) is unscored.
- A high W3 score describes curriculum design, not student welfare: required
  placements can disadvantage students who cannot afford unpaid work or
  relocation (Accord [30]; Fawns et al. [24] on ableism and elitism).
- W2 is scored against each discipline's own criterion situation [22], so
  cross-disciplinary W2 comparison is weaker than within-discipline comparison.
- W3 excludes simulation by design (simulation scores in W2), so programs whose
  professional norm is high-fidelity simulation may score low on W3 for a
  defensible pedagogic choice. Read the two sub-scores together.
- The authentic-assessment employability evidence rests largely on student
  self-report [25]; W2's warrant is documented design fidelity plus the
  assessment-drives-learning mechanism [26], not demonstrated employment effects.
- Work-integrated learning is NOT claimed to raise employment rates — Jackson &
  Collings [28] found it does not. W3's warrant is skill development, employment
  relevance and professional identity formation [29].

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
19. Higher Education Standards Framework (Threshold Standards) 2021, F2021L00488. Clause 1.4.2(b)–(d) (generic and employment-related learning outcomes, applied in disciplinary context), 1.4.3 (assessment must confirm the outcomes), 5.4.1 (work-integrated learning and placements are quality assured, including supervision). https://www.legislation.gov.au/F2021L00488
20. QILT Employer Satisfaction Survey (ESS) — national employer ratings across five graduate attribute domains: foundation, adaptive, collaborative, technical and employability skills. (2025 national results: technical 94.0%, foundation 93.3%, adaptive 90.7%, collaborative 88.6%, employability 86.2%.) https://www.qilt.edu.au/surveys/employer-satisfaction-survey-%28ess%29
21. Core Skills for Work Developmental Framework (Australian Government, 2013). Three clusters — navigate the world of work, interact with others, get the work done — over ten skill areas and five performance stages. Anchor-content source; a VET framework, not a higher-education construct authority. https://www.dewr.gov.au/skills-information-training-providers/resources/core-skills-work-developmental-framework
22. Gulikers JTM, Bastiaens TJ, Kirschner PA (2004). A five-dimensional framework for authentic assessment. Educational Technology Research and Development 52(3):67–86. (Task, physical context, social context, result/form, criteria; authenticity is a continuum defined against the criterion situation — design rule R4.) https://doi.org/10.1007/BF02504676
23. Villarroel V, Bloxham S, Bruna D, Bruna C, Herrera-Seda C (2018). Authentic assessment: creating a blueprint for course design. Assessment & Evaluation in Higher Education 43(5):840–854. (Realism, cognitive challenge, evaluative judgement — the third dimension is DFVA C2, not W2.) https://doi.org/10.1080/02602938.2017.1412396
24. Fawns T, Bearman M, Dawson P, Nieminen JH, Ashford-Rowe K, Willey K, Jensen LX, Damşa C, Press N (2024). Authentic assessment: from panacea to criticality. Assessment & Evaluation in Higher Education 50(3):396–408. (The label risks becoming a 'thought-terminating cliché' — the constraint behind R4.) https://doi.org/10.1080/02602938.2024.2404634
25. Sokhanvar Z, Salehi K, Sokhanvar F (2021). Advantages of authentic assessment for improving the learning experience and employability skills of higher education students: a systematic literature review. Studies in Educational Evaluation 70:101030. (26 studies, 2010–2019; outcomes largely student self-report.) https://doi.org/10.1016/j.stueduc.2021.101030
26. Gibbs G, Simpson C (2004). Conditions under which assessment supports students' learning. Learning and Teaching in Higher Education 1:3–31. (Assessment governs what and how students study — the mechanism warrant for scoring assessment design rather than curriculum statement.)
27. Kuh GD (2008). High-Impact Educational Practices: What They Are, Who Has Access to Them, and Why They Matter. AAC&U. (Internships, capstones, undergraduate research, collaborative and community-based learning; shared features include sustained time and effort, feedback, and application in novel settings.)
28. Jackson D, Collings D (2018). The influence of work-integrated learning and paid work during studies on graduate employment and underemployment. Higher Education 76:403–425. (WIL did NOT raise full-time employment rates; evidence for better relevance and quality of employment — the honest bound on the W3 claim.) https://doi.org/10.1007/s10734-017-0216-z
29. Jackson D (2016). Re-conceptualising graduate employability: the importance of pre-professional identity. Higher Education Research & Development 35(5):925–939. (Identity formed through participation in communities of practice — the mechanism distinguishing W3 from W2.) https://doi.org/10.1080/07294360.2016.1139551
30. Australian Universities Accord Final Report (2024), Department of Education. (WIL as national priority; placement poverty and the Commonwealth Prac Payment — the equity limitation declared against W3.) https://www.education.gov.au/australian-universities-accord/resources/final-report
31. NACE Career Readiness Competencies (rev. April 2024). Eight competencies: career & self-development, communication, critical thinking, equity & inclusion, leadership, professionalism, teamwork, technology. https://www.naceweb.org/career-readiness/competencies/career-readiness-defined
32. Heckman JJ, Stixrud J, Urzua S (2006). The effects of cognitive and noncognitive abilities on labor market outcomes and social behavior. Journal of Labor Economics 24(3):411–482. https://doi.org/10.1086/504455
33. Barrie SC (2006). Understanding what we mean by the generic attributes of graduates. Higher Education 51:215–241; and Barrie SC (2007), A conceptual framework for the teaching and learning of generic graduate attributes, Studies in Higher Education 32(4):439–458. (Stated graduate attributes are not evidence of attainment — why R2 binds hardest on W1.)
34. Tomlinson M (2017). Forms of graduate capital and their relationship to graduate employability. Education + Training 59(4):338–352. (Scoping source: social, cultural and psychological capital are student and network properties, not curriculum properties, and are therefore out of scope.)
```

---

## Rubric quick reference (for authors; do not paste into reports)

| # | Item | 0 | 1 | 2 | 3 | Refs |
|---|---|---|---|---|---|---|
| C1 | Distributed cognition & relational capability | No collaborative, stakeholder or team-based work is assessed anywhere in the core. | Collaboration/teamwork appears in learning outcomes, but no core unit assesses it. | At least one core unit assesses collaborative practice — group projects with individual accountability, client or stakeholder work, interprofessional activity. | Assessed collaborative practice recurs across the program AND at least one assessment requires coordinating work across people AND tools/AI systems — e.g. a team capstone with documented role and tool allocation, or a task where the division of work between people and systems is itself assessed. | [1][5][7] |
| C2 | Hybrid metacognition & evaluative judgement | No assessment requires students to appraise the quality of work — their own, peers', or a tool's. | Reflection or self-assessment appears in outcomes or graduate attributes, but no core unit assesses it against criteria. | Core assessment includes criterion-referenced appraisal of quality: peer review, structured critique, portfolio with standards, marking against exemplars. | Assessment requires students to document and justify reliance decisions — when they relied on or overrode a tool, source or collaborator; defend judgements of AI-output quality; or evidence strategy adjustment over time (process-focused assessment). | [1][4][3] |
| C3 | Digital & AI literacy, including governance | No digital/AI content in any core unit or program-level outcome. | AI or digital tools appear only as electives or as tool operation/training — the operational level TEQSA identifies as non-durable. | Core units address AI capabilities AND limitations/ethics; use with limits discussed and assessed. | Core assessment requires critique or governance of AI systems in the discipline's own context — bias, accountability, transparency, regulation or data governance — beyond tool operation. | [1][13][11][12][2] |
| C4 | Life-long learning & transfer | Fixed content sequence; no assessment requires applying methods outside the taught context. | Transfer is claimed in outcomes ("apply knowledge in new settings") but not assessed. | At least one core assessment requires application to novel or unfamiliar problems — case variation, unseen datasets, cross-context projects. | The program documents structured progression toward independent learning: a self-scoped capstone or research project, or assessed identification of one's own knowledge gaps together with the plan to close them. | [1][9][10][2] |
| C5 | Inquiry & evidence generation | Secondary synthesis only; no research-methods training. | Introductory methods unit; literature-review assessment. | Students design and conduct an inquiry with methodology selection and data collection, assessed. | A substantial project generating primary evidence is REQUIRED (not one route among several), with methodology defended under scrutiny (viva, defence, or staged supervised review). | [14][15][7] |
| W1 | Professional communication & conduct | All core assessment is in academic genres addressed to the marker (exams, essays, lab reports); no professional-genre or spoken communication is assessed. | Communication or professional conduct appears in learning outcomes or graduate attributes; core assessment adds presentation to peers/staff, but no professional genre and no audience beyond the teaching team. | At least one core assessment requires a recognised professional genre or an audience beyond the teaching team — client brief, consultancy or policy advice, clinical handover, pitch, public-facing artefact — judged against criteria drawn from professional practice. | Professional communication is assessed repeatedly and progressively across the program AND at least one core assessment is delivered to, or judged by, a real external audience or practitioner (industry panel, client, patient or simulated patient, public exhibition), with professional conduct or accountability explicitly among the assessed criteria. | [19][20][21][31][5][32] |
| W2 | Authentic task design | Core assessment is entirely decontextualised — exams, problem sets and essays with no situational framing. | Contextualised or scenario-framed tasks appear (case studies, worked scenarios), but the artefact produced and the criteria applied remain academic. | At least one core assessment reproduces a professional task end to end: a real or realistic problem, producing the artefact a practitioner would produce, judged against criteria drawn from practice. | Such tasks are the program's assessment spine rather than a single instance (a capstone plus earlier scaffolding, or at least one per stage) AND at least one carries a genuine constraint of practice — an ambiguous or externally supplied problem, real resource/time limits, a consequential audience, or the profession's own standards of performance. | [22][23][25][26][24] |
| W3 | Work-situated learning | No work-integrated learning, placement, practicum or community-based project appears anywhere in the course structure. | Work-situated learning exists only as an elective, an optional internship, or an unassessed extracurricular or careers activity. | A core unit places students in a real workplace or professional-community setting with practitioner supervision and assessment — placement, practicum, live client project, community-based project — but it is short or stands alone. | Substantial required work-situated learning: an extended placement or practicum, or a sequence of them, in the core, supervised by a practitioner, assessed, with accountability to the host and structured reflection on professional practice. | [19][27][29][28][30] |

## Lint rules (for the future v4 family in check-report-format.ts)

1. Header carries `**Instrument:** DFVA 4.1-draft`.
2. All six numbered sections present, in order, each with a `Basis:` tag.
3. Section 5 opens with the mandatory interpretation sentence.
4. Every scorecard row cites at least one reference number; every level-3 score
   quotes assessment evidence.
5. REFERENCES section matches the canonical list (generated, byte-exact).
6. No v1 composite ("N/36"), no Irreplaceability score, anywhere.
7. The scorecard carries all eight item rows (C1–C5, W1–W3) and both subtotal
   rows, and states no combined "/24" Panel C figure as a headline score.
