<!-- GENERATED FILE — DO NOT EDIT.
     Source: dfva/source/rubricV4.ts · Generator: scripts/dfva-v4-gen.ts
     Regenerate: npm --prefix scripts run dfva:gen-v4 -->
# DFVA-V4-SCORING-PROMPT (instrument 4.1-draft)

You are scoring one university program's **Panel C v4.1** from its public
handbook evidence. Panel C has TWO sub-scales, scored independently:

- **Adaptive capabilities (C1–C5, /15)** — the four adaptive capabilities
  defined by TEQSA (Lodge et al., 2026) [1]. What makes a graduate durable as AI
  takes over tasks. Derivation: docs/dfva-panelc-v4-recommendation.md and
  docs/dfva-adaptiveness-literature-review.md.
- **Workplace practice (W1–W3, /9)** — what makes a graduate effective in ANY
  workplace, including AI-integrated ones: professional communication and conduct,
  authentic task design, and work-situated learning. Anchored on the Higher
  Education Standards Framework 2021 cl. 1.4.2 and 5.4.1 [19], the QILT Employer
  Satisfaction Survey domains [20], and the authentic-assessment and WIL
  literatures. Derivation: docs/dfva-panelc-v41-recommendation.md and
  docs/dfva-workplace-readiness-literature-review.md.

Report the two sub-scores separately. **Never sum them into a single figure in
your output** — whether they behave as one construct or two is an open empirical
question the instrument exists to test.

## Inputs you will be given

1. The program's handbook extract at scrapes/v4/<code>.txt — the course, outcomes
   and structure pages plus the core subject and assessment pages, concatenated
   and each headed by a "===== SOURCE: <url> =====" line. Score ONLY from this
   text. It is captured page text, so structure is carried by headings and
   whitespace rather than markup: a subject's assessment table reads as
   description / timing / percentage on consecutive lines. Quote whichever lines
   carry the evidence; do not expect markdown tables.
2. The program code and name.

## Non-negotiable scoring rules

- **R1 — Anchors are declarative statements about documented curriculum evidence (the SML-rubric form). Score what the handbook documents, never what a graduate plausibly can do.**
- **R2 — Level 3 requires ASSESSMENT evidence; a capability that appears in learning outcomes but is never assessed scores 1, everywhere, uniformly. Level 3 should be rare by construction (v3.1 ceiling rate to beat: 31%).**
- **R3 — Every score cites the handbook evidence lines that satisfy the anchor, in the program evidence file.**
- **R4 — Authenticity is a continuum measured against the discipline's own criterion situation, not a label (Gulikers et al. 2004). Never score a program up because a handbook says 'authentic', 'real-world', 'industry-relevant' or 'work-ready' — score only the documented features of the task. Fawns et al. (2024) warn the label is otherwise a thought-terminating cliché.**
- Scoring direction: when the evidence is ambiguous between two levels, take the
  LOWER level and record the ambiguity in the rationale. Never resolve ambiguity
  upward.
- A level-3 score additionally requires quoting the assessment evidence
  (assessment task, hurdle, placement requirement) — an outcome statement is
  never sufficient (R2).
- **One construct, one home.** Each piece of evidence scores in exactly one
  item. Placement evidence scores in W3, never in C1 or C4. Appraisal of the
  quality of work scores in C2, never in W2. If evidence seems to fit two items,
  say so in `ambiguities` and score it in the one whose construct names it.
- Do NOT compute exposure, position, quadrant, or stability — those come from
  Panel A and the enumeration layer downstream. Your output is the eight item
  scores, two gates, and evidence.
- Irreplaceability bonus — retired. A verdict over other items; its item–total r = 0.65 is halo. The irreplaceability claim lives in the position (exposure × adaptiveness) with G1 attesting depth. Never emit an irreplaceability score.

## Sub-scale A — adaptive capabilities (0–3 each; adaptiveness = sum, /15)

### C1 · Distributed cognition & relational capability [1][5][7]

**Construct:** How cognitive processes, information and tasks are shared across people, tools, artefacts and gen AI systems — teams, human–AI collaboration, coordinating roles and resources (TEQSA capability #2).
**Migration:** Absorbs D2 (integrative-reasoning half); restores D8, dropped from Panel C in v2. v4.1: the level-3 placement exemplar moves to W3, so C1 scores human-plus-tool coordination only (no double counting).

| Level | Anchor (documented curriculum evidence) |
| --- | --- |
| 0 | No collaborative, stakeholder or team-based work is assessed anywhere in the core. |
| 1 | Collaboration/teamwork appears in learning outcomes, but no core unit assesses it. |
| 2 | At least one core unit assesses collaborative practice — group projects with individual accountability, client or stakeholder work, interprofessional activity. |
| 3 | Assessed collaborative practice recurs across the program AND at least one assessment requires coordinating work across people AND tools/AI systems — e.g. a team capstone with documented role and tool allocation, or a task where the division of work between people and systems is itself assessed. |

### C2 · Hybrid metacognition & evaluative judgement [1][4][3]

**Construct:** Regulation of thinking and learning within any cognitive system including human–AI networks — evaluative judgement, deciding when to rely on or override a tool, co-regulation, ethical reasoning about use (TEQSA capability #3).
**Migration:** New — the largest single construct gap in v3.1 Panel C (LR §2.1 defect 2).

| Level | Anchor (documented curriculum evidence) |
| --- | --- |
| 0 | No assessment requires students to appraise the quality of work — their own, peers', or a tool's. |
| 1 | Reflection or self-assessment appears in outcomes or graduate attributes, but no core unit assesses it against criteria. |
| 2 | Core assessment includes criterion-referenced appraisal of quality: peer review, structured critique, portfolio with standards, marking against exemplars. |
| 3 | Assessment requires students to document and justify reliance decisions — when they relied on or overrode a tool, source or collaborator; defend judgements of AI-output quality; or evidence strategy adjustment over time (process-focused assessment). |

### C3 · Digital & AI literacy, including governance [1][13][11][12][2]

**Construct:** Using digital tools including gen AI effectively, ethically and safely — extended, per TEQSA, to critical understanding of principles, limitations, ethics, societal impact and power structures (TEQSA capability #1).
**Migration:** Re-anchors D5 one level up: tool-operation content caps at level 1, per the Lodge et al. (2025) Principle 6 warning against skills of 'limited future utility'.

| Level | Anchor (documented curriculum evidence) |
| --- | --- |
| 0 | No digital/AI content in any core unit or program-level outcome. |
| 1 | AI or digital tools appear only as electives or as tool operation/training — the operational level TEQSA identifies as non-durable. |
| 2 | Core units address AI capabilities AND limitations/ethics; use with limits discussed and assessed. |
| 3 | Core assessment requires critique or governance of AI systems in the discipline's own context — bias, accountability, transparency, regulation or data governance — beyond tool operation. |

### C4 · Life-long learning & transfer [1][9][10][2]

**Construct:** Sustaining motivation, capability and adaptability to learn continuously — identifying knowledge gaps, independently acquiring skills, transferring learning across tasks, domains and tools (TEQSA capability #4).
**Migration:** Restores D9, re-anchored on transfer (observable in assessment design) rather than review recency, which was unscoreable from handbooks (v1 item–total r = 0.06). v4.1: the level-3 work-integrated-learning route moves to W3, leaving transfer and self-directed learning.

| Level | Anchor (documented curriculum evidence) |
| --- | --- |
| 0 | Fixed content sequence; no assessment requires applying methods outside the taught context. |
| 1 | Transfer is claimed in outcomes ("apply knowledge in new settings") but not assessed. |
| 2 | At least one core assessment requires application to novel or unfamiliar problems — case variation, unseen datasets, cross-context projects. |
| 3 | The program documents structured progression toward independent learning: a self-scoped capstone or research project, or assessed identification of one's own knowledge gaps together with the plan to close them. |

### C5 · Inquiry & evidence generation [14][15][7]

**Construct:** The capacity to generate primary evidence and defend methodology.
**Migration:** Retains D7 essentially intact — the defensible v3.1 item.

| Level | Anchor (documented curriculum evidence) |
| --- | --- |
| 0 | Secondary synthesis only; no research-methods training. |
| 1 | Introductory methods unit; literature-review assessment. |
| 2 | Students design and conduct an inquiry with methodology selection and data collection, assessed. |
| 3 | A substantial project generating primary evidence is REQUIRED (not one route among several), with methodology defended under scrutiny (viva, defence, or staged supervised review). |

## Sub-scale W — workplace practice (0–3 each; workplace = sum, /9)

### W1 · Professional communication & conduct [19][20][21][31][5][32]

**Construct:** Communicating disciplinary work, and conducting oneself, as a professional with people who are not your examiner — the genres the profession actually uses, audiences beyond the teaching team, and assessed standards of reliability, ethics and accountability. Generic skills "and their application in the context of the field(s) of education or disciplines involved" (HESF cl. 1.4.2(b)–(c)).
**Migration:** New. Distinct from C1: C1 scores coordination across people and tools/AI systems; W1 scores communication to audiences and professional conduct. Barrie (2006, 2007) forbids scoring stated graduate attributes — R2 applies with full force here.

| Level | Anchor (documented curriculum evidence) |
| --- | --- |
| 0 | All core assessment is in academic genres addressed to the marker (exams, essays, lab reports); no professional-genre or spoken communication is assessed. |
| 1 | Communication or professional conduct appears in learning outcomes or graduate attributes; core assessment adds presentation to peers/staff, but no professional genre and no audience beyond the teaching team. |
| 2 | At least one core assessment requires a recognised professional genre or an audience beyond the teaching team — client brief, consultancy or policy advice, clinical handover, pitch, public-facing artefact — judged against criteria drawn from professional practice. |
| 3 | Professional communication is assessed repeatedly and progressively across the program AND at least one core assessment is delivered to, or judged by, a real external audience or practitioner (industry panel, client, patient or simulated patient, public exhibition), with professional conduct or accountability explicitly among the assessed criteria. |

### W2 · Authentic task design [22][23][25][26][24]

**Construct:** How closely core assessment resembles the criterion situation of the discipline's own professional practice — the task, its context, the form of the result, and the criteria used to judge it (Gulikers et al. 2004), and its realism and cognitive challenge (Villarroel et al. 2018). Scored relative to the discipline's practice, never to a fixed exemplar. Explicitly EXCLUDES evaluative judgement, Villarroel's third dimension, which is C2.
**Migration:** New. Non-overlap is load-bearing: appraisal of quality scores in C2, the fidelity of the task scores here, and actual workplace immersion scores in W3.

| Level | Anchor (documented curriculum evidence) |
| --- | --- |
| 0 | Core assessment is entirely decontextualised — exams, problem sets and essays with no situational framing. |
| 1 | Contextualised or scenario-framed tasks appear (case studies, worked scenarios), but the artefact produced and the criteria applied remain academic. |
| 2 | At least one core assessment reproduces a professional task end to end: a real or realistic problem, producing the artefact a practitioner would produce, judged against criteria drawn from practice. |
| 3 | Such tasks are the program's assessment spine rather than a single instance (a capstone plus earlier scaffolding, or at least one per stage) AND at least one carries a genuine constraint of practice — an ambiguous or externally supplied problem, real resource/time limits, a consequential audience, or the profession's own standards of performance. |

### W3 · Work-situated learning [19][27][29][28][30]

**Construct:** Extended, supervised, assessed participation in a real workplace or professional community — the "deeper learning approach" sense of placements: a high-impact practice (Kuh 2008) whose distinctive mechanism is membership and accountability in a community of practice, and with it pre-professional identity formation (Jackson 2016). Simulation is NOT scored here; it is W2.
**Migration:** Takes the WIL evidence previously scored, inconsistently, inside C1 level 3 and C4 level 3. Warrant is skill development, employment relevance and professional identity — NOT employment rates, which Jackson & Collings (2018) found WIL does not raise.

| Level | Anchor (documented curriculum evidence) |
| --- | --- |
| 0 | No work-integrated learning, placement, practicum or community-based project appears anywhere in the course structure. |
| 1 | Work-situated learning exists only as an elective, an optional internship, or an unassessed extracurricular or careers activity. |
| 2 | A core unit places students in a real workplace or professional-community setting with practitioner supervision and assessment — placement, practicum, live client project, community-based project — but it is short or stands alone. |
| 3 | Substantial required work-situated learning: an extended placement or practicum, or a sequence of them, in the core, supervised by a practitioner, assessed, with accountability to the host and structured reflection on professional practice. |

## The two gates (PASS/FAIL, excluded from the sum)

| Gate | PASS when | FAIL when | Refs |
|---|---|---|---|
| G1 Disciplinary foundation | The program documents a coherent specialist core with progressive technical or methodological depth: an all-compulsory specialist core, an accredited sequence, or a staged prerequisite chain. | Generic or interchangeable content without disciplinary identity. A FAIL flags the program regardless of C1–C5. | [1][6] |
| G2 Decision-making under uncertainty | Assessments require defended trade-off decisions, or simulations/capstones/live projects with real uncertainty and accountability (v1 D4 ≥ 2). | Recall or scripted responses only. | [16] |

## Output — return EXACTLY this JSON shape

```json
{
  "code": "<program code, lowercase>",
  "instrument": "4.1-draft",
  "panelCv4": {
    "C1": { "score": 0, "rationale": "<why this level and not the one above>", "evidenceLines": ["<verbatim handbook line>", "..."] },
    "C2": { "score": 0, "rationale": "...", "evidenceLines": ["..."] },
    "C3": { "score": 0, "rationale": "...", "evidenceLines": ["..."] },
    "C4": { "score": 0, "rationale": "...", "evidenceLines": ["..."] },
    "C5": { "score": 0, "rationale": "...", "evidenceLines": ["..."] },
    "adaptiveness": 0,
    "W1": { "score": 0, "rationale": "...", "evidenceLines": ["..."] },
    "W2": { "score": 0, "rationale": "...", "evidenceLines": ["..."] },
    "W3": { "score": 0, "rationale": "...", "evidenceLines": ["..."] },
    "workplace": 0,
    "gates": {
      "G1": { "result": "PASS", "rationale": "...", "evidenceLines": ["..."] },
      "G2": { "result": "PASS", "rationale": "...", "evidenceLines": ["..."] }
    },
    "ambiguities": ["<each place the evidence straddled two levels, and which rule resolved it>"],
    "notScoreable": ["<any item whose evidence was absent from the extract, if any>"]
  }
}
```

Rationales must reference the anchor text, not restate the score. Every
`evidenceLines` entry must appear verbatim in the supplied extract — an
unquotable claim is not evidence (R3).

## REFERENCES

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
20. QILT Employer Satisfaction Survey (ESS) — national employer ratings across five graduate attribute domains: foundation, adaptive, collaborative, technical and employability skills. (2025 national results: technical 94.0%, foundation 93.3%, adaptive 90.7%, collaborative 88.6%, employability 86.2%.) https://www.qilt.edu.au/surveys/employer-satisfaction-survey-(ess)
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
