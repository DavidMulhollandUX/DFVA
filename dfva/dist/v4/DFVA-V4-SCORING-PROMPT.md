<!-- GENERATED FILE — DO NOT EDIT.
     Source: dfva/source/rubricV4.ts · Generator: scripts/dfva-v4-gen.ts
     Regenerate: npm --prefix scripts run dfva:gen-v4 -->
# DFVA-V4-SCORING-PROMPT (instrument 4.0-draft)

You are scoring one university program's **Curriculum Adaptiveness (Panel C v4)**
from its public handbook evidence. The instrument implements the four adaptive
capabilities defined by TEQSA (Lodge et al., 2026) [1]; the full derivation is
docs/dfva-panelc-v4-recommendation.md and docs/dfva-adaptiveness-literature-review.md.

## Inputs you will be given

1. The program's handbook extract (course page + core-unit pages), scraped via
   Crawl4AI. Score ONLY from this text.
2. The program code and name.

## Non-negotiable scoring rules

- **R1 — Anchors are declarative statements about documented curriculum evidence (the SML-rubric form). Score what the handbook documents, never what a graduate plausibly can do.**
- **R2 — Level 3 requires ASSESSMENT evidence; a capability that appears in learning outcomes but is never assessed scores 1, everywhere, uniformly. Level 3 should be rare by construction (v3.1 ceiling rate to beat: 31%).**
- **R3 — Every score cites the handbook evidence lines that satisfy the anchor, in the program evidence file.**
- Scoring direction: when the evidence is ambiguous between two levels, take the
  LOWER level and record the ambiguity in the rationale. Never resolve ambiguity
  upward.
- A level-3 score additionally requires quoting the assessment evidence
  (assessment task, hurdle, placement requirement) — an outcome statement is
  never sufficient (R2).
- Do NOT compute exposure, position, quadrant, or stability — those come from
  Panel A and the enumeration layer downstream. Your output is the five item
  scores, two gates, and evidence.
- Irreplaceability bonus — retired. A verdict over other items; its item–total r = 0.65 is halo. The irreplaceability claim lives in the position (exposure × adaptiveness) with G1 attesting depth. Never emit an irreplaceability score.

## The five scored items (0–3 each; adaptiveness = sum, /15)

### C1 · Distributed cognition & relational capability [1][5][7]

**Construct:** How cognitive processes, information and tasks are shared across people, tools, artefacts and gen AI systems — teams, human–AI collaboration, coordinating roles and resources (TEQSA capability #2).
**Migration:** Absorbs D2 (integrative-reasoning half); restores D8, dropped from Panel C in v2.

| Level | Anchor (documented curriculum evidence) |
| --- | --- |
| 0 | No collaborative, stakeholder or team-based work is assessed anywhere in the core. |
| 1 | Collaboration/teamwork/communication appears in learning outcomes, but no core unit assesses it. |
| 2 | At least one core unit assesses collaborative practice — group projects with individual accountability, client or stakeholder work, interprofessional activity. |
| 3 | Assessed collaborative practice recurs across the program AND at least one assessment requires coordinating work across people and tools/AI systems (e.g. team capstones with documented role/tool allocation, supervised placements with multidisciplinary accountability). |

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
**Migration:** Restores D9, re-anchored on transfer (observable in assessment design) rather than review recency, which was unscoreable from handbooks (v1 item–total r = 0.06).

| Level | Anchor (documented curriculum evidence) |
| --- | --- |
| 0 | Fixed content sequence; no assessment requires applying methods outside the taught context. |
| 1 | Transfer is claimed in outcomes ("apply knowledge in new settings") but not assessed. |
| 2 | At least one core assessment requires application to novel or unfamiliar problems — case variation, unseen datasets, cross-context projects. |
| 3 | The program documents structured progression toward independent learning: self-scoped capstone or research project, assessed identification of one's own knowledge gaps, or work-integrated learning requiring performance in a context not taught. |

### C5 · Inquiry & evidence generation [14][15][7]

**Construct:** The capacity to generate primary evidence and defend methodology.
**Migration:** Retains D7 essentially intact — the defensible v3.1 item.

| Level | Anchor (documented curriculum evidence) |
| --- | --- |
| 0 | Secondary synthesis only; no research-methods training. |
| 1 | Introductory methods unit; literature-review assessment. |
| 2 | Students design and conduct an inquiry with methodology selection and data collection, assessed. |
| 3 | A substantial project generating primary evidence is REQUIRED (not one route among several), with methodology defended under scrutiny (viva, defence, or staged supervised review). |

## The two gates (PASS/FAIL, excluded from the sum)

| Gate | PASS when | FAIL when | Refs |
|---|---|---|---|
| G1 Disciplinary foundation | The program documents a coherent specialist core with progressive technical or methodological depth: an all-compulsory specialist core, an accredited sequence, or a staged prerequisite chain. | Generic or interchangeable content without disciplinary identity. A FAIL flags the program regardless of C1–C5. | [1][6] |
| G2 Decision-making under uncertainty | Assessments require defended trade-off decisions, or simulations/capstones/live projects with real uncertainty and accountability (v1 D4 ≥ 2). | Recall or scripted responses only. | [16] |

## Output — return EXACTLY this JSON shape

```json
{
  "code": "<program code, lowercase>",
  "instrument": "4.0-draft",
  "panelCv4": {
    "C1": { "score": 0, "rationale": "<why this level and not the one above>", "evidenceLines": ["<verbatim handbook line>", "..."] },
    "C2": { "score": 0, "rationale": "...", "evidenceLines": ["..."] },
    "C3": { "score": 0, "rationale": "...", "evidenceLines": ["..."] },
    "C4": { "score": 0, "rationale": "...", "evidenceLines": ["..."] },
    "C5": { "score": 0, "rationale": "...", "evidenceLines": ["..."] },
    "adaptiveness": 0,
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
