/**
 * DFVA Panel C v4 — canonical instrument definition (SINGLE SOURCE).
 *
 * Status: WORKING DRAFT — implements docs/dfva-panelc-v4-recommendation.md,
 * adopted per its §7 decision log (2026-08-13). Publication is gated on the §4
 * migration cycle. Nothing here changes v1–v3.1 scoring.
 *
 * Edit this file, then run `npm --prefix scripts run dfva:gen-v4` to regenerate:
 *   - dfva/dist/v4/DFVA-V4-SCORING-PROMPT.md   (the agent scoring harness)
 *   - dfva/dist/v4/report-template-v4.md        (the site report template)
 *
 * Nothing downstream may hand-define the v4 items, anchors, gates, or
 * references — same discipline as rubric.ts for v1.
 *
 * Construct authority: the four adaptive capabilities in Lodge et al. (2026),
 * TEQSA. Full literature trail: docs/dfva-adaptiveness-literature-review.md.
 */

export const V4_VERSION = '4.0-draft'

/** Adaptiveness scale: 5 items × 0–3 (unchanged from v3.1, values NOT comparable). */
export const V4_ADAPTIVENESS_MAX = 15

export interface V4Item {
  /** C1..C5 */
  id: string
  /** 0-based display order */
  index: number
  name: string
  /** Short label for chart axes / chips */
  short: string
  /** The construct, stated independently of the anchors (LR §2.1 defect 1). */
  construct: string
  /** Keys into V4_REFERENCES — the literature this item is anchored on. */
  evidenceBase: string[]
  /** Migration disposition: which v3.1 item(s) this absorbs, restores or replaces. */
  absorbs: string
  /** The 0/1/2/3 anchors, each a declarative statement about documented curriculum evidence. */
  levels: [string, string, string, string]
}

export interface V4Gate {
  /** G1 | G2 */
  id: string
  name: string
  construct: string
  evidenceBase: string[]
  /** PASS criterion — declarative, handbook-checkable. */
  pass: string
  /** FAIL criterion. */
  fail: string
  absorbs: string
}

export const PANEL_C_V4: V4Item[] = [
  {
    id: 'C1',
    index: 0,
    name: 'Distributed cognition & relational capability',
    short: 'Distributed',
    construct:
      'How cognitive processes, information and tasks are shared across people, tools, artefacts and gen AI systems — teams, human–AI collaboration, coordinating roles and resources (TEQSA capability #2).',
    evidenceBase: ['teqsa2026', 'deming2017', 'freyOsborne2017'],
    absorbs: 'Absorbs D2 (integrative-reasoning half); restores D8, dropped from Panel C in v2.',
    levels: [
      'No collaborative, stakeholder or team-based work is assessed anywhere in the core.',
      'Collaboration/teamwork/communication appears in learning outcomes, but no core unit assesses it.',
      'At least one core unit assesses collaborative practice — group projects with individual accountability, client or stakeholder work, interprofessional activity.',
      'Assessed collaborative practice recurs across the program AND at least one assessment requires coordinating work across people and tools/AI systems (e.g. team capstones with documented role/tool allocation, supervised placements with multidisciplinary accountability).',
    ],
  },
  {
    id: 'C2',
    index: 1,
    name: 'Hybrid metacognition & evaluative judgement',
    short: 'Metacognition',
    construct:
      'Regulation of thinking and learning within any cognitive system including human–AI networks — evaluative judgement, deciding when to rely on or override a tool, co-regulation, ethical reasoning about use (TEQSA capability #3).',
    evidenceBase: ['teqsa2026', 'tai2018', 'lodge2023'],
    absorbs: 'New — the largest single construct gap in v3.1 Panel C (LR §2.1 defect 2).',
    levels: [
      "No assessment requires students to appraise the quality of work — their own, peers', or a tool's.",
      'Reflection or self-assessment appears in outcomes or graduate attributes, but no core unit assesses it against criteria.',
      'Core assessment includes criterion-referenced appraisal of quality: peer review, structured critique, portfolio with standards, marking against exemplars.',
      'Assessment requires students to document and justify reliance decisions — when they relied on or overrode a tool, source or collaborator; defend judgements of AI-output quality; or evidence strategy adjustment over time (process-focused assessment).',
    ],
  },
  {
    id: 'C3',
    index: 2,
    name: 'Digital & AI literacy, including governance',
    short: 'AI Literacy',
    construct:
      'Using digital tools including gen AI effectively, ethically and safely — extended, per TEQSA, to critical understanding of principles, limitations, ethics, societal impact and power structures (TEQSA capability #1).',
    evidenceBase: ['teqsa2026', 'digcomp', 'longMagerko2020', 'unesco2024', 'lodge2025'],
    absorbs:
      "Re-anchors D5 one level up: tool-operation content caps at level 1, per the Lodge et al. (2025) Principle 6 warning against skills of 'limited future utility'.",
    levels: [
      'No digital/AI content in any core unit or program-level outcome.',
      'AI or digital tools appear only as electives or as tool operation/training — the operational level TEQSA identifies as non-durable.',
      'Core units address AI capabilities AND limitations/ethics; use with limits discussed and assessed.',
      "Core assessment requires critique or governance of AI systems in the discipline's own context — bias, accountability, transparency, regulation or data governance — beyond tool operation.",
    ],
  },
  {
    id: 'C4',
    index: 3,
    name: 'Life-long learning & transfer',
    short: 'Transfer',
    construct:
      'Sustaining motivation, capability and adaptability to learn continuously — identifying knowledge gaps, independently acquiring skills, transferring learning across tasks, domains and tools (TEQSA capability #4).',
    evidenceBase: ['teqsa2026', 'nrc2012', 'ahse2025', 'lodge2025'],
    absorbs:
      'Restores D9, re-anchored on transfer (observable in assessment design) rather than review recency, which was unscoreable from handbooks (v1 item–total r = 0.06).',
    levels: [
      'Fixed content sequence; no assessment requires applying methods outside the taught context.',
      'Transfer is claimed in outcomes ("apply knowledge in new settings") but not assessed.',
      'At least one core assessment requires application to novel or unfamiliar problems — case variation, unseen datasets, cross-context projects.',
      "The program documents structured progression toward independent learning: self-scoped capstone or research project, assessed identification of one's own knowledge gaps, or work-integrated learning requiring performance in a context not taught.",
    ],
  },
  {
    id: 'C5',
    index: 4,
    name: 'Inquiry & evidence generation',
    short: 'Inquiry',
    construct: 'The capacity to generate primary evidence and defend methodology.',
    evidenceBase: ['boyer1990', 'brew2006', 'freyOsborne2017'],
    absorbs: 'Retains D7 essentially intact — the defensible v3.1 item.',
    levels: [
      'Secondary synthesis only; no research-methods training.',
      'Introductory methods unit; literature-review assessment.',
      'Students design and conduct an inquiry with methodology selection and data collection, assessed.',
      'A substantial project generating primary evidence is REQUIRED (not one route among several), with methodology defended under scrutiny (viva, defence, or staged supervised review).',
    ],
  },
]

export const GATES_V4: V4Gate[] = [
  {
    id: 'G1',
    name: 'Disciplinary foundation',
    construct:
      "Deep disciplinary knowledge as the epistemic foundation for authentic judgement and expertise — TEQSA places it UNDER the four capabilities, not among them, and Deming & Noray (2020) show why it is a precondition rather than adaptiveness evidence (the applied-technical premium decays 44% → 14% between ages 24 and 35).",
    evidenceBase: ['teqsa2026', 'demingNoray2020'],
    pass: 'The program documents a coherent specialist core with progressive technical or methodological depth: an all-compulsory specialist core, an accredited sequence, or a staged prerequisite chain.',
    fail: 'Generic or interchangeable content without disciplinary identity. A FAIL flags the program regardless of C1–C5.',
    absorbs: 'Absorbs D3 (Technical Depth) and the v2/v3.1 D6 gate.',
  },
  {
    id: 'G2',
    name: 'Decision-making under uncertainty',
    construct:
      'Assessment requires defended trade-offs under real constraints rather than scripted answers. Saturated as a scored item (62.1% modal) but still a meaningful floor.',
    evidenceBase: ['knight1921'],
    pass: 'Assessments require defended trade-off decisions, or simulations/capstones/live projects with real uncertainty and accountability (v1 D4 ≥ 2).',
    fail: 'Recall or scripted responses only.',
    absorbs: 'The v2/v3.1 D4 gate, unchanged.',
  },
]

/** The three anchor-design rules every score must observe (recommendation §2.1). */
export const V4_DESIGN_RULES = {
  R1: 'Anchors are declarative statements about documented curriculum evidence (the SML-rubric form). Score what the handbook documents, never what a graduate plausibly can do.',
  R2: 'Level 3 requires ASSESSMENT evidence; a capability that appears in learning outcomes but is never assessed scores 1, everywhere, uniformly. Level 3 should be rare by construction (v3.1 ceiling rate to beat: 31%).',
  R3: 'Every score cites the handbook evidence lines that satisfy the anchor, in the program evidence file.',
} as const

/** What was retired, so no generated artifact resurrects it. */
export const V4_RETIRED = {
  B: 'Irreplaceability bonus — retired. A verdict over other items; its item–total r = 0.65 is halo. The irreplaceability claim lives in the position (exposure × adaptiveness) with G1 attesting depth.',
} as const

export interface V4Reference {
  /** Numbered order in the rendered REFERENCES list. */
  n: number
  citation: string
  url?: string
}

/**
 * The literature the instrument is anchored on. Keys are cited by items/gates;
 * the full verification trail is docs/dfva-adaptiveness-literature-review.md.
 */
export const V4_REFERENCES: Record<string, V4Reference> = {
  teqsa2026: {
    n: 1,
    citation:
      'Lodge JM, de Barba P, Ainscough L, et al. (2026). Assuring quality learning in a gen AI-integrated future: The role of adaptive capabilities. TEQSA.',
    url: 'https://www.teqsa.gov.au/guides-resources/resources/corporate-publications/assuring-quality-learning-gen-ai-integrated-future-role-adaptive-capabilities',
  },
  lodge2025: {
    n: 2,
    citation:
      'Lodge JM, et al. (2025). Australian Framework for Artificial Intelligence in Higher Education. ACSES. (Principles 4 & 6.)',
    url: 'https://www.acses.edu.au/publication/australian-framework-for-artificial-intelligence-in-higher-education/',
  },
  lodge2023: {
    n: 3,
    citation:
      'Lodge JM, Howard S, Bearman M, Dawson P & Associates (2023). Assessment reform for the age of artificial intelligence. TEQSA.',
    url: 'https://www.teqsa.gov.au/sites/default/files/2023-09/assessment-reform-age-artificial-intelligence-discussion-paper.pdf',
  },
  tai2018: {
    n: 4,
    citation:
      'Tai J, Ajjawi R, Boud D, Dawson P, Panadero E (2018). Developing evaluative judgement: enabling students to make decisions about the quality of work. Higher Education 76:467–481.',
    url: 'https://doi.org/10.1007/s10734-017-0220-3',
  },
  deming2017: {
    n: 5,
    citation:
      'Deming DJ (2017). The growing importance of social skills in the labor market. Quarterly Journal of Economics 132(4):1593–1640.',
    url: 'https://doi.org/10.1093/qje/qjx022',
  },
  demingNoray2020: {
    n: 6,
    citation:
      'Deming DJ, Noray K (2020). Earnings dynamics, changing job skills, and STEM careers. Quarterly Journal of Economics 135(4):1965–2005.',
    url: 'https://doi.org/10.1093/qje/qjaa021',
  },
  freyOsborne2017: {
    n: 7,
    citation:
      'Frey CB, Osborne MA (2017). The future of employment: how susceptible are jobs to computerisation? Technological Forecasting & Social Change 114:254–280.',
    url: 'https://doi.org/10.1016/j.techfore.2016.08.019',
  },
  sml2018: {
    n: 8,
    citation:
      'Brynjolfsson E, Mitchell T, Rock D (2018). What can machines learn, and what does it mean for occupations and the economy? AEA Papers & Proceedings 108:43–47. (The SML rubric — the declarative-anchor form R1 copies.)',
    url: 'https://doi.org/10.1257/pandp.20181019',
  },
  nrc2012: {
    n: 9,
    citation:
      'Pellegrino JW, Hilton ML (eds) (2012). Education for Life and Work: Developing Transferable Knowledge and Skills in the 21st Century. National Research Council.',
    url: 'https://www.nationalacademies.org/read/13398/chapter/2',
  },
  ahse2025: {
    n: 10,
    citation:
      'Measuring adaptive expertise and adaptive performance in (becoming) healthcare professionals: a scoping review of measurement instruments (2025). Advances in Health Sciences Education.',
    url: 'https://doi.org/10.1007/s10459-025-10413-y',
  },
  longMagerko2020: {
    n: 11,
    citation:
      'Long D, Magerko B (2020). What is AI literacy? Competencies and design considerations. CHI 2020.',
    url: 'https://doi.org/10.1145/3313831.3376727',
  },
  unesco2024: {
    n: 12,
    citation: 'UNESCO (2024). AI competency framework for students.',
    url: 'https://unesdoc.unesco.org/ark:/48223/pf0000391105',
  },
  digcomp: {
    n: 13,
    citation:
      'European Commission JRC — DigComp (Digital Competence Framework for Citizens); basis of the Australian Digital Capability Framework (DEWR, 2022).',
  },
  boyer1990: {
    n: 14,
    citation: 'Boyer EL (1990). Scholarship Reconsidered: Priorities of the Professoriate. Carnegie Foundation.',
  },
  brew2006: {
    n: 15,
    citation: 'Brew A (2006). Research and Teaching: Beyond the Divide. Palgrave Macmillan.',
  },
  knight1921: {
    n: 16,
    citation: 'Knight FH (1921). Risk, Uncertainty and Profit. Houghton Mifflin.',
  },
  kane2013: {
    n: 17,
    citation:
      'Kane MT (2013). Validating the interpretations and uses of test scores. Journal of Educational Measurement 50(1):1–73. (The validity-argument frame for the v4 evidence plan.)',
  },
  woodsLyons2026: {
    n: 18,
    citation:
      'Woods L, Lyons K, et al. (2026). Assessing the effectiveness of artificial intelligence education and training for healthcare workers: a systematic review. BMC Medical Education 26:549. (The construct-validity critique v4 answers.)',
    url: 'https://doi.org/10.1186/s12909-026-08969-3',
  },
} as const

// ---------------------------------------------------------------------------
// Render helpers — generators use these; downstream copies are derived,
// never hand-maintained.
// ---------------------------------------------------------------------------

/** Reference markers for a set of citation keys, e.g. "[1][4][3]". */
export const refMarks = (keys: string[]): string =>
  keys.map((k) => `[${V4_REFERENCES[k].n}]`).join('')

/**
 * Web-linked citation marks for report markdown: `[[n]](url)` renders as a
 * clickable "[n]" wherever the source has a URL, so an annotation is never a
 * dead number on a web page. URL-less sources stay plain `[n]` — their full
 * citation is in the REFERENCES section that ends every v4 report.
 */
export const mdCiteByN = (ns: number[]): string =>
  ns
    .map((n) => {
      const ref = Object.values(V4_REFERENCES).find((r) => r.n === n)
      if (!ref) throw new Error(`mdCiteByN: no reference numbered ${n}`)
      return ref.url ? `[[${n}]](${ref.url})` : `[${n}]`
    })
    .join('')

export const mdCite = (keys: string[]): string =>
  mdCiteByN(keys.map((k) => V4_REFERENCES[k].n))

/** The C1–C5 rubric as a markdown table with reference markers. */
export function renderV4RubricTable(): string {
  const head = '| # | Item | 0 | 1 | 2 | 3 | Refs |\n|---|---|---|---|---|---|---|'
  const rows = PANEL_C_V4.map(
    (d) =>
      `| ${d.id} | ${d.name} | ${d.levels[0]} | ${d.levels[1]} | ${d.levels[2]} | ${d.levels[3]} | ${refMarks(d.evidenceBase)} |`,
  )
  return [head, ...rows].join('\n')
}

/** The G1/G2 gates as a markdown table. */
export function renderV4GatesTable(): string {
  const head = '| Gate | PASS when | FAIL when | Refs |\n|---|---|---|---|'
  const rows = GATES_V4.map(
    (g) => `| ${g.id} ${g.name} | ${g.pass} | ${g.fail} | ${refMarks(g.evidenceBase)} |`,
  )
  return [head, ...rows].join('\n')
}

/** Numbered REFERENCES list, ordered by n. */
export function renderV4References(): string {
  return Object.values(V4_REFERENCES)
    .sort((a, b) => a.n - b.n)
    .map((r) => `${r.n}. ${r.citation}${r.url ? ` ${r.url}` : ''}`)
    .join('\n')
}

/** Per-item construct blocks (construct + evidence base + migration note + anchors). */
export function renderV4ItemBlocks(): string {
  return PANEL_C_V4.map((d) =>
    [
      `### ${d.id} · ${d.name} ${refMarks(d.evidenceBase)}`,
      '',
      `**Construct:** ${d.construct}`,
      `**Migration:** ${d.absorbs}`,
      '',
      '| Level | Anchor (documented curriculum evidence) |',
      '| --- | --- |',
      ...d.levels.map((l, i) => `| ${i} | ${l} |`),
    ].join('\n'),
  ).join('\n\n')
}
