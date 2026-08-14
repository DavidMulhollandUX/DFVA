/**
 * DFVA Panel C v4.1 — canonical instrument definition (SINGLE SOURCE).
 *
 * Status: WORKING DRAFT — implements docs/dfva-panelc-v4-recommendation.md
 * (adopted per its §7 decision log, 2026-08-13) as extended by
 * docs/dfva-panelc-v41-recommendation.md (2026-08-14). Publication is gated on
 * the v4 §4 migration cycle. Nothing here changes v1–v3.1 scoring.
 *
 * Edit this file, then run `npm --prefix scripts run dfva:gen-v4` to regenerate:
 *   - dfva/dist/v4/DFVA-V4-SCORING-PROMPT.md   (the agent scoring harness)
 *   - dfva/dist/v4/report-template-v4.md        (the site report template)
 *
 * Nothing downstream may hand-define the v4 items, anchors, gates, or
 * references — same discipline as rubric.ts for v1.
 *
 * Construct authority, two sub-scales:
 *   - C1–C5 Adaptive capabilities — the four adaptive capabilities in Lodge et
 *     al. (2026), TEQSA. Trail: docs/dfva-adaptiveness-literature-review.md.
 *   - W1–W3 Workplace practice — HESF (Threshold Standards) 2021 cl. 1.4.2 and
 *     5.4.1, the QILT ESS attribute domains, and the authentic-assessment and
 *     WIL literatures. Trail: docs/dfva-workplace-readiness-literature-review.md.
 */

export const V4_VERSION = '4.1-draft'

/** Sub-scale A — adaptive capabilities: 5 items × 0–3 (v4.0 scale, unchanged). */
export const V4_ADAPTIVENESS_MAX = 15

/** Sub-scale W — workplace practice: 3 items × 0–3 (new in v4.1). */
export const V4_WORKPLACE_MAX = 9

/** Panel C total. NOT comparable to any v3.1 or v4.0 adaptiveness value. */
export const V4_PANEL_C_MAX = V4_ADAPTIVENESS_MAX + V4_WORKPLACE_MAX

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
    absorbs:
      'Absorbs D2 (integrative-reasoning half); restores D8, dropped from Panel C in v2. v4.1: the level-3 placement exemplar moves to W3, so C1 scores human-plus-tool coordination only (no double counting).',
    levels: [
      'No collaborative, stakeholder or team-based work is assessed anywhere in the core.',
      'Collaboration/teamwork appears in learning outcomes, but no core unit assesses it.',
      'At least one core unit assesses collaborative practice — group projects with individual accountability, client or stakeholder work, interprofessional activity.',
      'Assessed collaborative practice recurs across the program AND at least one assessment requires coordinating work across people AND tools/AI systems — e.g. a team capstone with documented role and tool allocation, or a task where the division of work between people and systems is itself assessed.',
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
      'Restores D9, re-anchored on transfer (observable in assessment design) rather than review recency, which was unscoreable from handbooks (v1 item–total r = 0.06). v4.1: the level-3 work-integrated-learning route moves to W3, leaving transfer and self-directed learning.',
    levels: [
      'Fixed content sequence; no assessment requires applying methods outside the taught context.',
      'Transfer is claimed in outcomes ("apply knowledge in new settings") but not assessed.',
      'At least one core assessment requires application to novel or unfamiliar problems — case variation, unseen datasets, cross-context projects.',
      "The program documents structured progression toward independent learning: a self-scoped capstone or research project, or assessed identification of one's own knowledge gaps together with the plan to close them.",
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

/**
 * Sub-scale W — Workplace practice (new in v4.1).
 *
 * The capabilities and curriculum forms that make a graduate effective in ANY
 * workplace, including AI-integrated ones. Added because C1–C5 derive top-down
 * from a framework whose scope is AI adaptation, so anything TEQSA's capability
 * set does not name, v4.0 could not see (A/Prof Lyons, Aug 2026).
 *
 * Reported as its own sub-score, never merged into the adaptiveness sub-score:
 * whether the two resolve as two correlated factors is the falsifiable
 * internal-structure prediction v4.1 exists to make.
 */
export const PANEL_W_V4: V4Item[] = [
  {
    id: 'W1',
    index: 0,
    name: 'Professional communication & conduct',
    short: 'Professional',
    construct:
      'Communicating disciplinary work, and conducting oneself, as a professional with people who are not your examiner — the genres the profession actually uses, audiences beyond the teaching team, and assessed standards of reliability, ethics and accountability. Generic skills "and their application in the context of the field(s) of education or disciplines involved" (HESF cl. 1.4.2(b)–(c)).',
    evidenceBase: ['hesf2021', 'qiltEss', 'csfw2013', 'nace2024', 'deming2017', 'heckman2006'],
    absorbs:
      'New. Distinct from C1: C1 scores coordination across people and tools/AI systems; W1 scores communication to audiences and professional conduct. Barrie (2006, 2007) forbids scoring stated graduate attributes — R2 applies with full force here.',
    levels: [
      'All core assessment is in academic genres addressed to the marker (exams, essays, lab reports); no professional-genre or spoken communication is assessed.',
      'Communication or professional conduct appears in learning outcomes or graduate attributes; core assessment adds presentation to peers/staff, but no professional genre and no audience beyond the teaching team.',
      'At least one core assessment requires a recognised professional genre or an audience beyond the teaching team — client brief, consultancy or policy advice, clinical handover, pitch, public-facing artefact — judged against criteria drawn from professional practice.',
      'Professional communication is assessed repeatedly and progressively across the program AND at least one core assessment is delivered to, or judged by, a real external audience or practitioner (industry panel, client, patient or simulated patient, public exhibition), with professional conduct or accountability explicitly among the assessed criteria.',
    ],
  },
  {
    id: 'W2',
    index: 1,
    name: 'Authentic task design',
    short: 'Authentic',
    construct:
      "How closely core assessment resembles the criterion situation of the discipline's own professional practice — the task, its context, the form of the result, and the criteria used to judge it (Gulikers et al. 2004), and its realism and cognitive challenge (Villarroel et al. 2018). Scored relative to the discipline's practice, never to a fixed exemplar. Explicitly EXCLUDES evaluative judgement, Villarroel's third dimension, which is C2.",
    evidenceBase: ['gulikers2004', 'villarroel2018', 'sokhanvar2021', 'gibbsSimpson2004', 'fawns2024'],
    absorbs:
      'New. Non-overlap is load-bearing: appraisal of quality scores in C2, the fidelity of the task scores here, and actual workplace immersion scores in W3.',
    levels: [
      'Core assessment is entirely decontextualised — exams, problem sets and essays with no situational framing.',
      'Contextualised or scenario-framed tasks appear (case studies, worked scenarios), but the artefact produced and the criteria applied remain academic.',
      'At least one core assessment reproduces a professional task end to end: a real or realistic problem, producing the artefact a practitioner would produce, judged against criteria drawn from practice.',
      "Such tasks are the program's assessment spine rather than a single instance (a capstone plus earlier scaffolding, or at least one per stage) AND at least one carries a genuine constraint of practice — an ambiguous or externally supplied problem, real resource/time limits, a consequential audience, or the profession's own standards of performance.",
    ],
  },
  {
    id: 'W3',
    index: 2,
    name: 'Work-situated learning',
    short: 'Situated',
    construct:
      'Extended, supervised, assessed participation in a real workplace or professional community — the "deeper learning approach" sense of placements: a high-impact practice (Kuh 2008) whose distinctive mechanism is membership and accountability in a community of practice, and with it pre-professional identity formation (Jackson 2016). Simulation is NOT scored here; it is W2.',
    evidenceBase: ['hesf2021', 'kuh2008', 'jackson2016', 'jacksonCollings2018', 'accord2024'],
    absorbs:
      "Takes the WIL evidence previously scored, inconsistently, inside C1 level 3 and C4 level 3. Warrant is skill development, employment relevance and professional identity — NOT employment rates, which Jackson & Collings (2018) found WIL does not raise.",
    levels: [
      'No work-integrated learning, placement, practicum or community-based project appears anywhere in the course structure.',
      'Work-situated learning exists only as an elective, an optional internship, or an unassessed extracurricular or careers activity.',
      'A core unit places students in a real workplace or professional-community setting with practitioner supervision and assessment — placement, practicum, live client project, community-based project — but it is short or stands alone.',
      'Substantial required work-situated learning: an extended placement or practicum, or a sequence of them, in the core, supervised by a practitioner, assessed, with accountability to the host and structured reflection on professional practice.',
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
  R4: "Authenticity is a continuum measured against the discipline's own criterion situation, not a label (Gulikers et al. 2004). Never score a program up because a handbook says 'authentic', 'real-world', 'industry-relevant' or 'work-ready' — score only the documented features of the task. Fawns et al. (2024) warn the label is otherwise a thought-terminating cliché.",
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

  // --- v4.1: the workplace-practice sub-scale (W1–W3). ------------------------
  // Trail: docs/dfva-workplace-readiness-literature-review.md. Numbering starts
  // at 19 so every v4.0 citation mark already in the wild keeps its referent.
  hesf2021: {
    n: 19,
    citation:
      'Higher Education Standards Framework (Threshold Standards) 2021, F2021L00488. Clause 1.4.2(b)–(d) (generic and employment-related learning outcomes, applied in disciplinary context), 1.4.3 (assessment must confirm the outcomes), 5.4.1 (work-integrated learning and placements are quality assured, including supervision).',
    url: 'https://www.legislation.gov.au/F2021L00488',
  },
  qiltEss: {
    n: 20,
    citation:
      'QILT Employer Satisfaction Survey (ESS) — national employer ratings across five graduate attribute domains: foundation, adaptive, collaborative, technical and employability skills. (2025 national results: technical 94.0%, foundation 93.3%, adaptive 90.7%, collaborative 88.6%, employability 86.2%.)',
    // Parentheses are percent-encoded: the raw form breaks every markdown
    // [[n]](url) citation mark the report generator emits.
    url: 'https://www.qilt.edu.au/surveys/employer-satisfaction-survey-%28ess%29',
  },
  csfw2013: {
    n: 21,
    citation:
      'Core Skills for Work Developmental Framework (Australian Government, 2013). Three clusters — navigate the world of work, interact with others, get the work done — over ten skill areas and five performance stages. Anchor-content source; a VET framework, not a higher-education construct authority.',
    url: 'https://www.dewr.gov.au/skills-information-training-providers/resources/core-skills-work-developmental-framework',
  },
  gulikers2004: {
    n: 22,
    citation:
      'Gulikers JTM, Bastiaens TJ, Kirschner PA (2004). A five-dimensional framework for authentic assessment. Educational Technology Research and Development 52(3):67–86. (Task, physical context, social context, result/form, criteria; authenticity is a continuum defined against the criterion situation — design rule R4.)',
    url: 'https://doi.org/10.1007/BF02504676',
  },
  villarroel2018: {
    n: 23,
    citation:
      'Villarroel V, Bloxham S, Bruna D, Bruna C, Herrera-Seda C (2018). Authentic assessment: creating a blueprint for course design. Assessment & Evaluation in Higher Education 43(5):840–854. (Realism, cognitive challenge, evaluative judgement — the third dimension is DFVA C2, not W2.)',
    url: 'https://doi.org/10.1080/02602938.2017.1412396',
  },
  fawns2024: {
    n: 24,
    citation:
      "Fawns T, Bearman M, Dawson P, Nieminen JH, Ashford-Rowe K, Willey K, Jensen LX, Damşa C, Press N (2024). Authentic assessment: from panacea to criticality. Assessment & Evaluation in Higher Education 50(3):396–408. (The label risks becoming a 'thought-terminating cliché' — the constraint behind R4.)",
    url: 'https://doi.org/10.1080/02602938.2024.2404634',
  },
  sokhanvar2021: {
    n: 25,
    citation:
      'Sokhanvar Z, Salehi K, Sokhanvar F (2021). Advantages of authentic assessment for improving the learning experience and employability skills of higher education students: a systematic literature review. Studies in Educational Evaluation 70:101030. (26 studies, 2010–2019; outcomes largely student self-report.)',
    url: 'https://doi.org/10.1016/j.stueduc.2021.101030',
  },
  gibbsSimpson2004: {
    n: 26,
    citation:
      "Gibbs G, Simpson C (2004). Conditions under which assessment supports students' learning. Learning and Teaching in Higher Education 1:3–31. (Assessment governs what and how students study — the mechanism warrant for scoring assessment design rather than curriculum statement.)",
  },
  kuh2008: {
    n: 27,
    citation:
      'Kuh GD (2008). High-Impact Educational Practices: What They Are, Who Has Access to Them, and Why They Matter. AAC&U. (Internships, capstones, undergraduate research, collaborative and community-based learning; shared features include sustained time and effort, feedback, and application in novel settings.)',
  },
  jacksonCollings2018: {
    n: 28,
    citation:
      'Jackson D, Collings D (2018). The influence of work-integrated learning and paid work during studies on graduate employment and underemployment. Higher Education 76:403–425. (WIL did NOT raise full-time employment rates; evidence for better relevance and quality of employment — the honest bound on the W3 claim.)',
    url: 'https://doi.org/10.1007/s10734-017-0216-z',
  },
  jackson2016: {
    n: 29,
    citation:
      'Jackson D (2016). Re-conceptualising graduate employability: the importance of pre-professional identity. Higher Education Research & Development 35(5):925–939. (Identity formed through participation in communities of practice — the mechanism distinguishing W3 from W2.)',
    url: 'https://doi.org/10.1080/07294360.2016.1139551',
  },
  accord2024: {
    n: 30,
    citation:
      'Australian Universities Accord Final Report (2024), Department of Education. (WIL as national priority; placement poverty and the Commonwealth Prac Payment — the equity limitation declared against W3.)',
    url: 'https://www.education.gov.au/australian-universities-accord/resources/final-report',
  },
  nace2024: {
    n: 31,
    citation:
      'NACE Career Readiness Competencies (rev. April 2024). Eight competencies: career & self-development, communication, critical thinking, equity & inclusion, leadership, professionalism, teamwork, technology.',
    url: 'https://www.naceweb.org/career-readiness/competencies/career-readiness-defined',
  },
  heckman2006: {
    n: 32,
    citation:
      'Heckman JJ, Stixrud J, Urzua S (2006). The effects of cognitive and noncognitive abilities on labor market outcomes and social behavior. Journal of Labor Economics 24(3):411–482.',
    url: 'https://doi.org/10.1086/504455',
  },
  barrie2006: {
    n: 33,
    citation:
      'Barrie SC (2006). Understanding what we mean by the generic attributes of graduates. Higher Education 51:215–241; and Barrie SC (2007), A conceptual framework for the teaching and learning of generic graduate attributes, Studies in Higher Education 32(4):439–458. (Stated graduate attributes are not evidence of attainment — why R2 binds hardest on W1.)',
  },
  tomlinson2017: {
    n: 34,
    citation:
      'Tomlinson M (2017). Forms of graduate capital and their relationship to graduate employability. Education + Training 59(4):338–352. (Scoping source: social, cultural and psychological capital are student and network properties, not curriculum properties, and are therefore out of scope.)',
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

/** Both sub-scales in scoring order — the full eight scored items. */
export const ALL_V4_ITEMS: V4Item[] = [...PANEL_C_V4, ...PANEL_W_V4]

/** The eight-item rubric as a markdown table with reference markers. */
export function renderV4RubricTable(): string {
  const head = '| # | Item | 0 | 1 | 2 | 3 | Refs |\n|---|---|---|---|---|---|---|'
  const rows = ALL_V4_ITEMS.map(
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
export function renderV4ItemBlocks(items: V4Item[] = PANEL_C_V4): string {
  return items.map((d) =>
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
