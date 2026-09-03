<!-- GENERATED FILE — DO NOT EDIT.
     Source: dfva/source/rubricV4.ts · Generator: scripts/dfva-v4-gen.ts
     Regenerate: npm --prefix scripts run dfva:gen-v4 -->
# DFVA-V4-RECOMMEND-PROMPT (instrument 4.2-draft)

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
- **R4 discipline carries over:** relabelling an existing task "authentic",
  "real-world" or "industry-relevant" moves nothing. A W2 step requires a change
  to the task, the artefact produced, or the criteria applied.
- **Both sub-scales get plans.** Adaptive (C1–C5) and workplace (W1–W3)
  interventions appear in the same tables, each row naming its sub-scale, with
  separate cumulative subtotals in §6. Never present a combined Panel C total.
- **W3 honesty rule:** never justify a placement intervention by employment
  rates — Jackson & Collings [28] found WIL does not raise them. Justify it by
  skill development, employment relevance or professional identity [29], and
  note the equity cost of unpaid or relocation-dependent placements [30].

## The instrument you are planning against

| # | Item | 0 | 1 | 2 | 3 | Refs |
|---|---|---|---|---|---|---|
| C1 | Distributed cognition & relational capability | No collaborative, stakeholder or team-based work is assessed anywhere in the core. | Collaboration/teamwork appears in learning outcomes, but no core unit assesses it. | At least one core unit assesses collaborative practice — group projects with individual accountability, client or stakeholder work, interprofessional activity. | Assessed collaborative practice recurs across the program AND at least one assessment requires coordinating work across people AND tools/AI systems — e.g. a team capstone with documented role and tool allocation, or a task where the division of work between people and systems is itself assessed. | [1][5][7] |
| C2 | Hybrid metacognition & evaluative judgement | No assessment requires students to appraise the quality of work — their own, peers', or a tool's. | Reflection or self-assessment appears in outcomes or graduate attributes, but no core unit assesses it against criteria. | Core assessment includes criterion-referenced appraisal of quality: peer review, structured critique, portfolio with standards, marking against exemplars. | Assessment requires students to document and justify reliance decisions — when they relied on or overrode a tool, source or collaborator; defend judgements of AI-output quality; or evidence strategy adjustment over time (process-focused assessment). | [1][4][3] |
| C3 | Digital & AI literacy, including governance | No digital/AI content in any core unit or program-level outcome. | AI or digital tools appear only as electives or as tool operation/training — the operational level TEQSA identifies as non-durable. | Core units address AI capabilities AND limitations/ethics; use with limits discussed and assessed. | Core assessment requires critique or governance of AI systems in the discipline's own context — bias, accountability, transparency, regulation or data governance — beyond tool operation. | [1][13][11][12][2] |
| C4 | Life-long learning & transfer | Fixed content sequence; no assessment requires applying methods outside the taught context. | Transfer is claimed in outcomes ("apply knowledge in new settings") but not assessed. | At least one core assessment requires application to novel or unfamiliar problems — case variation, unseen datasets, cross-context projects. | The program documents structured progression toward independent learning: a self-scoped capstone or research project, or assessed identification of one's own knowledge gaps together with the plan to close them. | [1][9][10][2] |
| C5 | Inquiry & evidence generation | Secondary synthesis only; no research-methods training. | Introductory methods unit; literature-review assessment. | Students design and conduct an inquiry with methodology selection and data collection, assessed. | A substantial project generating primary evidence is REQUIRED (not one route among several), with methodology defended under scrutiny (viva, defence, or staged supervised review). | [14][15][7] |
| W1 | Professional communication & conduct | All core assessment is in academic genres addressed to the marker (exams, essays, lab reports); no professional-genre or spoken communication is assessed. | Communication or professional conduct appears in learning outcomes or graduate attributes; core assessment adds presentation to peers/staff, but no professional genre and no audience beyond the teaching team. | At least one core assessment requires a recognised professional genre or an audience beyond the teaching team — client brief, consultancy or policy advice, clinical handover, pitch, public-facing artefact — judged against criteria drawn from professional practice. | Professional communication is assessed repeatedly and progressively across the program AND at least one core assessment is delivered to, or judged by, a real external audience or practitioner (industry panel, client, patient or simulated patient, public exhibition), with professional conduct or accountability explicitly among the assessed criteria. | [19][20][21][31][5][32] |
| W2 | Authentic task design | Core assessment is entirely decontextualised — exams, problem sets and essays with no situational framing. | Contextualised or scenario-framed tasks appear (case studies, worked scenarios), but the artefact produced and the criteria applied remain academic. | At least one core assessment reproduces a professional task end to end: a real or realistic problem, producing the artefact a practitioner would produce, judged against criteria drawn from practice. | Such tasks are the program's assessment spine rather than a single instance (a capstone plus earlier scaffolding, or at least one per stage) AND at least one carries a genuine constraint of practice — an ambiguous or externally supplied problem, real resource/time limits, a consequential audience, or the profession's own standards of performance. | [22][23][25][26][24] |
| W3 | Work-situated learning | No work-integrated learning, placement, practicum or community-based project appears anywhere in the course structure. | Work-situated learning exists only as an elective, an optional internship, or an unassessed extracurricular or careers activity. | A core unit places students in a real workplace or professional-community setting with practitioner supervision and assessment — placement, practicum, live client project, community-based project — OR, for a cohort documented as already practising in the profession, a core unit assesses activity conducted in the student's own professional practice with real recipients and a documented outcome measure — but it is short or stands alone. | Substantial required work-situated learning: an extended placement or practicum, or a sequence of them, in the core, supervised by a practitioner, assessed, with accountability to the host and structured reflection on professional practice — OR, for a cohort documented as already practising, a required sequence of assessed own-practice activity with structured reflection and documented accountability to workplace stakeholders (trainees, patients, clients or employer). | [19][27][29][28][35][30] |

Gates (regression checks during redesign — a change that breaks one is
flagged regardless of its adaptiveness effect):

| Gate | PASS when | FAIL when | Refs |
|---|---|---|---|
| G1 Disciplinary foundation | The program documents a coherent specialist core with progressive technical or methodological depth: an all-compulsory specialist core, an accredited sequence, or a staged prerequisite chain. | Generic or interchangeable content without disciplinary identity. A FAIL flags the program regardless of C1–C5. | [1][6] |
| G2 Decision-making under uncertainty | Assessments require defended trade-off decisions, or simulations/capstones/live projects with real uncertainty and accountability (v1 D4 ≥ 2). | Recall or scripted responses only. | [16] |

## REFERENCES

Omitted from this agent-facing copy. The numbered citations resolve in dfva/dist/v4/DFVA-V4-RECOMMEND-PROMPT.md; cite by [n] exactly as the anchors do.
