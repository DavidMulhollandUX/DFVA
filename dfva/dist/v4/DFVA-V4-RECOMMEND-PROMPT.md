<!-- GENERATED FILE — DO NOT EDIT.
     Source: dfva/source/rubricV4.ts · Generator: scripts/dfva-v4-gen.ts
     Regenerate: npm --prefix scripts run dfva:gen-v4 -->
# DFVA-V4-RECOMMEND-PROMPT (instrument 4.0-draft)

You are writing the **improvement plan** for a program already scored on Panel
C v4. The plan derives every intervention from two inputs and nothing else:

1. The program's verified `panelCv4` block (scores, rationales, evidence
   lines, gates, ambiguities) from `dfva/source/evidence/<code>.json`.
2. The program's market intelligence report
   (`reports/dfva-market-<code>.md`) — job families, signals, skill shifts.

Write `reports/dfva-v4-recommend-<code>.md` following
`dfva/dist/v4/recommend-template-v4.md` EXACTLY. Non-negotiable rules:

- **Anchor-referenced actions.** An intervention targets a named item's NEXT
  anchor level, quoting the anchor text it would satisfy. Never recommend
  toward a capability the anchors do not describe.
- **Market-warranted.** Each intervention names the skill-shift row or signal
  from the market report that makes it worth doing. An action no market
  evidence supports does not appear.
- **Tabular.** Sections 1–6 carry their content in tables, not in prose
  paragraphs. Prose is limited to the mandatory sentence in §1, one or two
  framing sentences per section, and any note a table cannot hold.
- **Cited, with the citations collected.** Citation marks belong in a dedicated
  `Sources` column (or the table's last column), NOT scattered through
  sentences. Use the web-linked form `[[n]](url)` for URL-bearing sources and
  plain `[n]` otherwise. Full citations appear only in the REFERENCES section
  at the end of the file, never inline.
- **Interpretation is marked.** The diagnostic summary opens with the
  mandatory sentence — this document argues from evidence; it is not itself
  evidence.
- **No v1 composite ("N/36"), no Irreplaceability, anywhere.** Do not state a
  quadrant/position label if none is published for this program.
- **R2 discipline carries over:** an intervention that only edits outcome
  statements cannot claim to move a score — say so explicitly in §6.

## The instrument you are planning against

| # | Item | 0 | 1 | 2 | 3 | Refs |
|---|---|---|---|---|---|---|
| C1 | Distributed cognition & relational capability | No collaborative, stakeholder or team-based work is assessed anywhere in the core. | Collaboration/teamwork/communication appears in learning outcomes, but no core unit assesses it. | At least one core unit assesses collaborative practice — group projects with individual accountability, client or stakeholder work, interprofessional activity. | Assessed collaborative practice recurs across the program AND at least one assessment requires coordinating work across people and tools/AI systems (e.g. team capstones with documented role/tool allocation, supervised placements with multidisciplinary accountability). | [1][5][7] |
| C2 | Hybrid metacognition & evaluative judgement | No assessment requires students to appraise the quality of work — their own, peers', or a tool's. | Reflection or self-assessment appears in outcomes or graduate attributes, but no core unit assesses it against criteria. | Core assessment includes criterion-referenced appraisal of quality: peer review, structured critique, portfolio with standards, marking against exemplars. | Assessment requires students to document and justify reliance decisions — when they relied on or overrode a tool, source or collaborator; defend judgements of AI-output quality; or evidence strategy adjustment over time (process-focused assessment). | [1][4][3] |
| C3 | Digital & AI literacy, including governance | No digital/AI content in any core unit or program-level outcome. | AI or digital tools appear only as electives or as tool operation/training — the operational level TEQSA identifies as non-durable. | Core units address AI capabilities AND limitations/ethics; use with limits discussed and assessed. | Core assessment requires critique or governance of AI systems in the discipline's own context — bias, accountability, transparency, regulation or data governance — beyond tool operation. | [1][13][11][12][2] |
| C4 | Life-long learning & transfer | Fixed content sequence; no assessment requires applying methods outside the taught context. | Transfer is claimed in outcomes ("apply knowledge in new settings") but not assessed. | At least one core assessment requires application to novel or unfamiliar problems — case variation, unseen datasets, cross-context projects. | The program documents structured progression toward independent learning: self-scoped capstone or research project, assessed identification of one's own knowledge gaps, or work-integrated learning requiring performance in a context not taught. | [1][9][10][2] |
| C5 | Inquiry & evidence generation | Secondary synthesis only; no research-methods training. | Introductory methods unit; literature-review assessment. | Students design and conduct an inquiry with methodology selection and data collection, assessed. | A substantial project generating primary evidence is REQUIRED (not one route among several), with methodology defended under scrutiny (viva, defence, or staged supervised review). | [14][15][7] |

Gates (regression checks during redesign — a change that breaks one is
flagged regardless of its adaptiveness effect):

| Gate | PASS when | FAIL when | Refs |
|---|---|---|---|
| G1 Disciplinary foundation | The program documents a coherent specialist core with progressive technical or methodological depth: an all-compulsory specialist core, an accredited sequence, or a staged prerequisite chain. | Generic or interchangeable content without disciplinary identity. A FAIL flags the program regardless of C1–C5. | [1][6] |
| G2 Decision-making under uncertainty | Assessments require defended trade-off decisions, or simulations/capstones/live projects with real uncertainty and accountability (v1 D4 ≥ 2). | Recall or scripted responses only. | [16] |

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
