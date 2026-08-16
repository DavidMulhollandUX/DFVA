<!-- GENERATED FILE — DO NOT EDIT.
     Source: dfva/source/rubricV4.ts · Generator: scripts/dfva-v4-gen.ts
     Regenerate: npm --prefix scripts run dfva:gen-v4 -->
# DFVA v4 Improvement Plan Template — Canonical Spec (instrument 4.2-draft)

Every `reports/dfva-v4-recommend-<code>.md` must follow this template.

## Header

```markdown
# DFVA v4 IMPROVEMENT PLAN: <Program Name> (<CODE>)

**Instrument:** DFVA 4.2-draft — Panel C v4 on the TEQSA adaptive capabilities [[1]](<teqsa url>)
**Assessment date:** <YYYY-MM-DD> · **Derived from:** the verified panelCv4 scoring + reports/dfva-market-<code>.md
**Position basis:** Destination AI Exposure <NN.NN> (measured) × Curriculum Adaptiveness <N>/15 (v4.1 draft, sub-scale A) · Workplace practice <N>/9 (sub-scale W, reported beside the axis, not in it) — no v1 composite, no position label until the v4 migration cycle
```

A note under the header states that citation marks refer to the numbered list in
References and that full citations are not repeated in the body.

## Sections (all required, in order) — each carries its content in a TABLE

1. **DIAGNOSTIC SUMMARY — Basis: inferred** — opens with the mandatory
   sentence: *"This plan argues from the scored evidence and market data
   above; it is interpretation, not observation."* Two short paragraphs, then:
   `| Item | Sub-scale | Score | Levels below maximum | Market evidence for the gap | Priority |`
   with an adaptive subtotal row and a workplace subtotal row — never a
   combined Panel C total.
2. **SCORE-TO-ACTION MAP — Basis: inferred** —
   `| Item | Now → target | Anchor requirement at the target level (verbatim) | Curriculum action | Sources |`
   One row per level step, including any second step on the same item.
3. **MARKET ALIGNMENT — Basis: reported → inferred** —
   `| Lever | Item | Market evidence | Location in market report | Confidence |`
   Confidence restated from the market report, not re-derived.
4. **PRIORITISED INTERVENTIONS — Basis: inferred** —
   `| # | Item | Action | Anchor satisfied | Effort | Sequence | Sources |`
   Levers numbered P1..Pn. Effort ∈ low/medium/high; Sequence is a term-level
   ordering with documentation-only fixes first.
5. **GATE GUARDRAILS — Basis: scored** —
   `| Gate | Status | Evidence carrying the gate | Constraint on redesign | Sources |`
6. **WHAT WOULD CHANGE THE SCORE — Basis: inferred** — two tables:
   `| Lever | Item | From | To | Change | Cumulative adaptive | Cumulative workplace |` and
   `| Change | Why it does not move a score | Governing rule | Sources |`
   The second must cover outcome-statement edits (rule R2), authenticity
   relabelling (rule R4), and electives where the anchor requires core placement.
7. **REFERENCES** — the canonical list, verbatim, ending the file.

## Lint rules (v4 recommend family in check-report-format.ts)

1. Title `# DFVA v4 IMPROVEMENT PLAN:`; header carries `**Instrument:** DFVA 4.2-draft`.
2. Sections 1–6 present, in order, each with a `Basis:` tag; §1 opens with the mandatory sentence.
3. At least one web-linked citation mark `[[n]](http...)`.
4. REFERENCES matches the canonical generated list, byte-exact.
5. No v1 composite ("N/36"), no Irreplaceability score, anywhere.
6. Every section 1–6 contains at least one markdown table.

## REFERENCES (canonical)

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
35. Lester S, Costley C (2010). Work-based learning at higher education level: value, practice and critique. Studies in Higher Education 35(5):561–575. (Work-based learning in the learner's own employment as an established higher-education mode for in-practice cohorts — the warrant for W3's own-practice route, added in v4.2.) https://doi.org/10.1080/03075070903216635
```
