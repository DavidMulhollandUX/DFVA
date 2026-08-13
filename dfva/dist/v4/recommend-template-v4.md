<!-- GENERATED FILE — DO NOT EDIT.
     Source: dfva/source/rubricV4.ts · Generator: scripts/dfva-v4-gen.ts
     Regenerate: npm --prefix scripts run dfva:gen-v4 -->
# DFVA v4 Improvement Plan Template — Canonical Spec (instrument 4.0-draft)

Every `reports/dfva-v4-recommend-<code>.md` must follow this template.

## Header

```markdown
# DFVA v4 IMPROVEMENT PLAN: <Program Name> (<CODE>)

**Instrument:** DFVA 4.0-draft — Panel C v4 on the TEQSA adaptive capabilities [[1]](<teqsa url>)
**Assessment date:** <YYYY-MM-DD> · **Derived from:** the verified panelCv4 scoring + reports/dfva-market-<code>.md
**Position basis:** Destination AI Exposure <NN.NN> (measured) × Curriculum Adaptiveness <N>/15 (v4 draft) — no v1 composite, no position label until the v4 migration cycle
```

## Sections (all required, in order)

1. **DIAGNOSTIC SUMMARY — Basis: inferred** — opens with the mandatory
   sentence: *"This plan argues from the scored evidence and market data
   above; it is interpretation, not observation."* Then: where the score
   concentrates, which single item is the binding constraint, and why.
2. **SCORE-TO-ACTION MAP — Basis: inferred** — one block per item scoring
   below 3: current level → the NEXT anchor's text (quoted) → the concrete
   curriculum action that would satisfy it, cited to the item's evidence base.
3. **MARKET ALIGNMENT — Basis: reported → inferred** — each intervention
   mapped to the skill-shift rows / signals that warrant it, with the market
   report's own confidence level restated.
4. **PRIORITISED INTERVENTIONS — Basis: inferred** — table:
   `| # | Item(s) | Action | Anchor satisfied | Market warrant | Evidence base | Effort | Sequence |`
   with levers numbered P1..Pn. Effort ∈ low/medium/high; Sequence is a
   term-level ordering with documentation-only fixes first.
5. **GATE GUARDRAILS — Basis: scored** — G1 and G2 restated as regression
   checks: what any redesign must not break.
6. **WHAT WOULD CHANGE THE SCORE — Basis: inferred** — explicit anchor
   deltas per lever, AND what would NOT move a score (outcome-statement
   edits per rule R2; electives where the anchor requires core).
7. **REFERENCES** — the canonical list, verbatim, ending the file.

## Lint rules (v4 recommend family in check-report-format.ts)

1. Title `# DFVA v4 IMPROVEMENT PLAN:`; header carries `**Instrument:** DFVA 4.0-draft`.
2. Sections 1–6 present, in order, each with a `Basis:` tag; §1 opens with the mandatory sentence.
3. At least one web-linked citation mark `[[n]](http...)`.
4. REFERENCES matches the canonical generated list, byte-exact.
5. No v1 composite ("N/36"), no Irreplaceability score, anywhere.

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
```
