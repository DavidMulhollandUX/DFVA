// Auto-generated from reports/*.md by scripts/dfva-content-generate.ts — do not edit by hand.
// Run: npm --prefix scripts run dfva:gen-content
const content = {
  title: "Master of Biostatistics (Enhanced) (MC-BIOSENH) — Improvement Plan (v4 draft)",
  institution: "University of Melbourne",
  markdown: `# DFVA v4 IMPROVEMENT PLAN: Master of Biostatistics (Enhanced) (MC-BIOSENH)

**Instrument:** DFVA 4.2-draft — Panel C v4 on the TEQSA adaptive capabilities [[1]](https://www.teqsa.gov.au/guides-resources/resources/corporate-publications/assuring-quality-learning-gen-ai-integrated-future-role-adaptive-capabilities)
**Assessment date:** 2026-09-01 · **Derived from:** the verified panelCv4 scoring + reports/dfva-market-mc-biosenh.md
**Position basis:** Destination AI Exposure 93.92 (measured) × Curriculum Adaptiveness 4/15 (v4.2 draft, sub-scale A) · Workplace practice 2/9 (sub-scale W, reported beside the axis, not in it) — no v1 composite, no position label until the v4 migration cycle

*Citation marks (\`[n]\` or \`[[n]](url)\`) refer to the numbered list in REFERENCES; full citations are not repeated in the body.*

## 1. DIAGNOSTIC SUMMARY — Basis: inferred

This plan argues from the preceding scored evidence and market data; it is interpretation, not observation.

The program reaches 4/15 on the adaptive sub-scale and 2/9 on the workplace sub-scale. The two widest gaps are both zero scores: C2 (no core assessment anywhere requires appraising the quality of work, a student's own, a peer's, or a tool's) and W3 (no work-integrated learning, placement or practicum appears anywhere in the course structure).

Both zero scores land directly under the market report's strongest signals — Theme 2's push toward statisticians auditing AI-produced output, and Theme 1's account of CROs automating exactly the entry-level, hands-on training pathway a placement would provide. By contrast, C4 and C5's gaps trace to an evidence-capture hole inside the Panel C file itself (the compulsory capstone's assessment-task pages were not captured), not a demonstrated curriculum weakness.

| Item | Sub-scale | Score | Levels below maximum | Market evidence for the gap | Priority |
|---|---|---|---|---|---|
| C1 | Adaptive | 1/3 | 2 | §3 Theme 2 — collaborative practice sits only in electives, against a push toward statisticians "co-leading interdisciplinary teams" | Medium |
| C2 | Adaptive | 0/3 | 3 | §3 Theme 2; §5 CI-1 — profession-body framing toward auditing/quality-controlling AI-produced output | High |
| C3 | Adaptive | 1/3 | 2 | §3 Themes 1 & 3; §5 CI-3 — CRO automation of routine programming and a broadening data-science toolchain | High |
| C4 | Adaptive | 1/3 | 2 | §3 Theme 3 (application breadth); §5 CI-4 — capped by an evidence-capture gap, not a demonstrated design gap | Low |
| C5 | Adaptive | 1/3 | 2 | §5 CI-4 — same capstone evidence-capture gap as C4 | Low |
| **Adaptive subtotal** | Adaptive | **4/15** | 11 | — | — |
| W1 | Workplace | 1/3 | 2 | None identified in this market report | None |
| W2 | Workplace | 1/3 | 2 | None identified in this market report | None |
| W3 | Workplace | 0/3 | 3 | §3 Theme 1; §5 CI-2 — the "junior hands-on pathway" CROs are already automating | High |
| **Workplace subtotal** | Workplace | **2/9** | 7 | — | — |

## 2. SCORE-TO-ACTION MAP — Basis: inferred

| Item | Now → target | Anchor requirement at the target level (verbatim) | Curriculum action | Sources |
|---|---|---|---|---|
| C1 | 1 → 2 | "At least one core unit assesses collaborative practice — group projects with individual accountability, client or stakeholder work, interprofessional activity." | Move a team-graded assessment with individual accountability into a compulsory subject or the capstone — the extract already documents this pattern in the elective INFO90002 database-design assignment and the ISYS90069 group project. | [1][5][7] |
| C2 | 0 → 2 | "Core assessment includes criterion-referenced appraisal of quality: peer review, structured critique, portfolio with standards, marking against exemplars." | Add a structured critique/appraisal task to a compulsory subject — for example, marking a peer's or an AI tool's statistical output against exemplar-graded criteria in Probability & Inference in Biostatistics or Introduction to Statistical Computing. | [1][4][3] |
| C3 | 1 → 2 | "Core units address AI capabilities AND limitations/ethics; use with limits discussed and assessed." | Extend the compulsory Introduction to Statistical Computing unit (or add a compulsory unit) to cover AI-tool capabilities and limitations/ethics, assessed, beyond Stata/R operation. | [1][13][11][12][2] |
| C3 | 2 → 3 | "Core assessment requires critique or governance of AI systems in the discipline's own context — bias, accountability, transparency, regulation or data governance — beyond tool operation." | Once Level 2 content exists, add an assessed governance/critique component set in the biostatistics/health-data context. | [1][13][11][12][2] |
| C4 | 1 → 2 | "At least one core assessment requires application to novel or unfamiliar problems — case variation, unseen datasets, cross-context projects." | Capture and verify the assessment-task pages for the compulsory capstone (POPH90288/POPH90289/POPH90149) before redesigning anything — the self-scoped Research Project plausibly already satisfies this anchor per the mc-biosenh.json ambiguity note. | [1][9][10][2] |
| C5 | 1 → 2 | "Students design and conduct an inquiry with methodology selection and data collection, assessed." | Same capstone evidence-capture action as C4: verify POPH90288/POPH90289/POPH90149's assessed methodology-selection and data-collection requirements before any redesign. | [1][14][15][7] |
| W3 | 0 → 2 | "A core unit places students in a real workplace or professional-community setting with practitioner supervision and assessment — placement, practicum, live client project, community-based project — OR, for a cohort documented as already practising in the profession, a core unit assesses activity conducted in the student's own professional practice with real recipients and a documented outcome measure — but it is short or stands alone." | Embed a supervised, assessed CRO- or pharma-partnered live project into the compulsory capstone Research Project, rather than adding an unassessed elective placement. | [19][27][29][28][35][30] |

## 3. MARKET ALIGNMENT — Basis: reported → inferred

| Lever | Item | Market evidence | Location in market report | Confidence |
|---|---|---|---|---|
| P5 | C1 | Two senior named practitioners argue the profession should reposition toward co-leading interdisciplinary teams, not solo analysis. | §3 Theme 2 | MEDIUM (discussion signal) |
| P1 | C2 | The same Theme 2 framing argues statisticians should move toward auditing/quality-controlling AI-produced output — the exact appraisal capability C2 lacks; CI-1 recommends a structured critique task directly. | §3 Theme 2; §5 CI-1 | MEDIUM (Theme 2); Interpretation, not observation (CI-1) |
| P2, P3 | C3 | Clinical Trials Arena/BusinessWire document CRO automation of entry-level statistical programming; STATtrak documents a shift toward a broader data-science toolchain; CI-3 recommends extending compulsory computing content to AI capabilities, limitations and governance. | §3 Themes 1 & 3; §5 CI-3 | MEDIUM (discussion signals); Interpretation, not observation (CI-3) |
| P6 | C4 | CI-4 identifies the capped C4 score as an evidence-capture gap in the Panel C file, not a demonstrated design weakness — the existing self-scoped Research Project plausibly already satisfies the target anchor. | §5 CI-4 | Interpretation, not observation |
| P7 | C5 | Same CI-4 evidence-capture reading applies to C5. | §5 CI-4 | Interpretation, not observation |
| P4 | W3 | Theme 1 documents CRO automation of entry-level programming and a stated industry concern that the junior hands-on training pathway is being disrupted — the exact pathway a placement or CRO-partnered project would provide; CI-2 recommends embedding a CRO/pharma-partnered project into the capstone. | §3 Theme 1; §5 CI-2 | MEDIUM (Theme 1); Interpretation, not observation (CI-2) |

## 4. PRIORITISED INTERVENTIONS — Basis: inferred

| # | Item | Action | Anchor satisfied | Effort | Sequence | Sources |
|---|---|---|---|---|---|---|
| P1 | C2 | Add a structured critique/appraisal task to a compulsory subject (e.g., marking AI-generated statistical output against exemplar criteria). | Level 2: "Core assessment includes criterion-referenced appraisal of quality..." | medium | Term 2 — within-unit redesign | [1][4][3] |
| P2 | C3 | Extend the compulsory Introduction to Statistical Computing unit to cover AI capabilities and limitations/ethics, assessed. | Level 2: "Core units address AI capabilities AND limitations/ethics..." | medium | Term 2 — within-unit redesign | [1][13][11][12][2] |
| P3 | C3 | Add an assessed AI-governance/critique component in the biostatistics/health-data context. | Level 3: "Core assessment requires critique or governance of AI systems..." | high | Term 3 — structural, follows P2 | [1][13][11][12][2] |
| P4 | W3 | Embed a supervised, assessed CRO- or pharma-partnered project into the compulsory capstone Research Project. | Level 2: "A core unit places students in a real workplace or professional-community setting..." | high | Term 3 — structural, external partnership | [19][27][29][28][35][30] |
| P5 | C1 | Move an existing team-graded elective assessment (or an equivalent) into a compulsory subject, with individual accountability preserved. | Level 2: "At least one core unit assesses collaborative practice..." | medium | Term 2 — within-unit redesign | [1][5][7] |
| P6 | C4 | Capture and verify the compulsory capstone's (POPH90288/89/149) assessment-task pages. | Level 2: "At least one core assessment requires application to novel or unfamiliar problems..." | low | Term 1 — documentation only | [1][9][10][2] |
| P7 | C5 | Same capstone evidence-capture action, verified against the C5 anchor. | Level 2: "Students design and conduct an inquiry with methodology selection and data collection, assessed." | low | Term 1 — documentation only | [1][14][15][7] |

## 5. GATE GUARDRAILS — Basis: scored

| Gate | Status | Evidence carrying the gate | Constraint on redesign | Sources |
|---|---|---|---|---|
| G1 Disciplinary foundation | PASS | An all-compulsory specialist core (Epidemiology 1, Introduction to Statistical Computing, Probability & Inference in Biostatistics, Foundations of Regression, Advanced Regression) with Statistical Society of Australia professional accreditation. | Any redesign above must preserve the all-compulsory specialist sequence and its accreditation — do not displace compulsory disciplinary content to make room for P1–P5's new assessed tasks. | [1][6] |
| G2 Decision-making under uncertainty | PASS | Compulsory core assesses interpretation of statistical uncertainty (deriving/interpreting likelihood-based estimates; critically interpreting p-values, confidence intervals, Bayesian posteriors), plus the compulsory capstone Research Project. | Redesign must not replace this assessed uncertainty-interpretation content with recall-based assessment. The capstone's own contribution to PASS is not yet confirmed by captured assessment-task evidence — P6/P7's evidence-capture action also protects this gate. | [16] |

## 6. WHAT WOULD CHANGE THE SCORE — Basis: inferred

| Lever | Item | From | To | Change | Cumulative adaptive | Cumulative workplace |
|---|---|---|---|---|---|---|
| P6 | C4 | 1 | 2 | Capstone assessment-task evidence captured and confirmed against the novel-problem anchor. | 5/15 | 2/9 |
| P7 | C5 | 1 | 2 | Same capstone evidence captured and confirmed against the inquiry-and-methodology anchor. | 6/15 | 2/9 |
| P1 | C2 | 0 | 2 | Structured critique/appraisal task added to a compulsory subject, assessed against criteria. | 8/15 | 2/9 |
| P5 | C1 | 1 | 2 | Core-unit assessed collaborative-practice task in place, with individual accountability. | 9/15 | 2/9 |
| P2 | C3 | 1 | 2 | Compulsory computing unit extended to cover AI capabilities and limitations/ethics, assessed. | 10/15 | 2/9 |
| P3 | C3 | 2 | 3 | Assessed AI-governance/critique component added on top of P2's Level 2 content. | 11/15 | 2/9 |
| P4 | W3 | 0 | 2 | Supervised, assessed CRO/pharma-partnered project embedded in the compulsory capstone. | 11/15 | 4/9 |

| Change | Why it does not move a score | Governing rule | Sources |
|---|---|---|---|
| Adding an unassessed outcome or graduate-attribute statement — e.g., the program's existing ILO naming communication skills "with clinical/health professionals" — without a corresponding assessed core task. | Every anchor above Level 0/1 requires assessed core practice, not a claimed outcome; this is precisely why W1 is currently capped at Level 1 despite the ILO already existing. | R2 | [33] |
| Relabelling an existing academic task as "real-world," "authentic" or "industry-relevant" — e.g., adding framing language to a core practical exercise — without changing the artefact produced or the criteria applied. | W2's Level 2 anchor requires the artefact and the marking criteria themselves to be practice-derived; a description added to an unchanged task does not satisfy it. | R4 | [22][24] |
| Adding or expanding elective content — e.g., the elective Machine Learning for Biostatistics unit, or the elective INFO90002/ISYS90069 team-graded assessments already documented in the extract — where the anchor requires core placement. | C1, C3 and W3's anchors all specify "core unit" or "core assessment"; elective-only content is explicitly excluded, which is why C1 and C3 are already capped at Level 1 despite qualifying elective content existing elsewhere in the handbook. | Anchor "core unit" scope (R1 anchor fidelity) | [1] |

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
35. Lester S, Costley C (2010). Work-based learning at higher education level: value, practice and critique. Studies in Higher Education 35(5):561–575. (Work-based learning in the learner's own employment as an established higher-education mode for in-practice cohorts — the warrant for W3's own-practice route, added in v4.2.) https://doi.org/10.1080/03075070903216635
`,
};

export default content;
