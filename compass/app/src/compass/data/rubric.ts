// AUTO-GENERATED from dfva/source/rubric.ts — do not edit by hand.
// Run `npm --prefix scripts run dfva:gen` to regenerate.

export interface RubricLevel {
  score: 0 | 1 | 2 | 3
  criteria: string
}

export interface Dimension {
  id: string
  index: number
  name: string
  demoLabel: string
  short: string
  bonus?: boolean
  definition: string
  levels: RubricLevel[]
}

export type RiskBandName = 'RESILIENT' | 'MODERATE RISK' | 'HIGH RISK' | 'CRITICAL'

export const RUBRIC: Dimension[] = [
  {
    id: "D1", index: 0, name: "Automation Exposure of Roles",
    demoLabel: "Automation Exposure", short: "Auto",
    definition: "Whether graduates' entry-level roles cluster in automatable tasks or require irreducible human judgment, design, and accountability.",
    levels: [
      { score: 0, criteria: "First 3-5 years mostly routine templated tasks" },
      { score: 1, criteria: "Some judgment, mostly templated" },
      { score: 2, criteria: "Mix of routine and non-routine work" },
      { score: 3, criteria: "Judgment, design, accountability, or physical/relational skill from day one" }
    ],
  },
  {
    id: "D2", index: 1, name: "Systems Thinking and Problem Framing",
    demoLabel: "Systems Thinking", short: "Systems",
    definition: "Whether the curriculum teaches hypothesis formation, constraint reasoning, and failure-mode analysis beyond template execution.",
    levels: [
      { score: 0, criteria: "Tool/process execution only" },
      { score: 1, criteria: "Mentioned but not assessed" },
      { score: 2, criteria: "Dedicated units with authentic assessment" },
      { score: 3, criteria: "Integrated throughout with trade-off reasoning and failure-mode analysis" }
    ],
  },
  {
    id: "D3", index: 2, name: "Technical and Quantitative Depth",
    demoLabel: "Technical Depth", short: "Tech",
    definition: "Whether the program builds genuine depth in statistics, data, coding, or domain-specific technical competence.",
    levels: [
      { score: 0, criteria: "No meaningful rigour" },
      { score: 1, criteria: "Intro stats or basic tooling" },
      { score: 2, criteria: "Solid grounding in stats/data/coding/domain science" },
      { score: 3, criteria: "Strong technical core embedded and assessed throughout" }
    ],
  },
  {
    id: "D4", index: 3, name: "Decision-Making Under Uncertainty",
    demoLabel: "Decision-Making", short: "Decide",
    definition: "Whether assessment requires graduates to defend trade-offs under real constraints rather than recall scripted answers.",
    levels: [
      { score: 0, criteria: "Recall/scripted responses" },
      { score: 1, criteria: "Some case work with scripted answers" },
      { score: 2, criteria: "Assessments require defended trade-offs" },
      { score: 3, criteria: "Simulations/capstones/live projects with real uncertainty and accountability" }
    ],
  },
  {
    id: "D5", index: 4, name: "AI Literacy and Governance",
    demoLabel: "AI Literacy", short: "AI Lit",
    definition: "Whether graduates understand AI as a system with failure modes and governance needs, not just a tool to consume.",
    levels: [
      { score: 0, criteria: "No AI coverage" },
      { score: 1, criteria: "AI appears in one elective" },
      { score: 2, criteria: "AI tools used with limits discussed" },
      { score: 3, criteria: "Graduates can design/deploy/supervise/critique AI workflows incl. ethics/governance" }
    ],
  },
  {
    id: "D6", index: 5, name: "Domain Depth and Specialisation",
    demoLabel: "Domain Depth", short: "Domain",
    definition: "Whether the degree builds durable specialist knowledge that takes years to develop.",
    levels: [
      { score: 0, criteria: "Generic/interchangeable" },
      { score: 1, criteria: "Mild specialisation" },
      { score: 2, criteria: "Clear specialist domain focus" },
      { score: 3, criteria: "Deep regulatory/scientific/clinical/physical expertise" }
    ],
  },
  {
    id: "D7", index: 6, name: "Research Methods Rigour",
    demoLabel: "Research Rigour", short: "Rsch",
    definition: "Whether graduates generate primary evidence and defend methodology, not only synthesize existing literature.",
    levels: [
      { score: 0, criteria: "Secondary summary only" },
      { score: 1, criteria: "Intro research unit" },
      { score: 2, criteria: "Can design and conduct research" },
      { score: 3, criteria: "Routinely generate primary data and defend methods under scrutiny" }
    ],
  },
  {
    id: "D8", index: 7, name: "Human and Relational Capability",
    demoLabel: "Human & Relational", short: "Human",
    definition: "Whether the curriculum builds interpersonal, ethical, or physical/clinical capability assessed as a core competency.",
    levels: [
      { score: 0, criteria: "No interpersonal/ethical/physical practice" },
      { score: 1, criteria: "Ethics mention only" },
      { score: 2, criteria: "Meaningful ethics or stakeholder practice" },
      { score: 3, criteria: "Substantial clinical/care/interpersonal accountability or physical skill" }
    ],
  },
  {
    id: "D9", index: 8, name: "Curriculum Currency and Adaptability",
    demoLabel: "Curriculum Currency", short: "Curric",
    definition: "Whether the program uses feedback loops and outcome tracking to stay current, especially on AI integration.",
    levels: [
      { score: 0, criteria: "No review in 3+ years, no AI content" },
      { score: 1, criteria: "Minor updates" },
      { score: 2, criteria: "Major refresh in last 2 years, AI in core units" },
      { score: 3, criteria: "Living curriculum with advisory feedback and outcome tracking" }
    ],
  },
  {
    id: "D10", index: 9, name: "Graduate Outcome Evidence",
    demoLabel: "Outcome Evidence", short: "Outcome",
    definition: "Whether the institution publishes detailed post-graduation employment outcomes, not just satisfaction surveys.",
    levels: [
      { score: 0, criteria: "No destination data" },
      { score: 1, criteria: "Generic satisfaction data only" },
      { score: 2, criteria: "Destination data published with partial detail" },
      { score: 3, criteria: "Granular roles/industries/salary/time-to-employment data" }
    ],
  },
  {
    id: "B", index: 10, name: "Irreplaceability Premium (Bonus)",
    demoLabel: "Irreplaceability (bonus)", short: "", bonus: true,
    definition: "Whether the degree combines technical depth, specialist domain knowledge, and human judgment in a way that resists substitution.",
    levels: [
      { score: 0, criteria: "Easily substituted" },
      { score: 1, criteria: "One weak differentiator" },
      { score: 2, criteria: "Clear dual-skill value" },
      { score: 3, criteria: "Rare integration of technical depth, domain expertise, and human judgment" }
    ],
  },
]

/** Core (radar) dimensions, excluding the bonus. */
export const CORE_DIMENSIONS: Dimension[] = RUBRIC.filter((d) => !d.bonus)

/** Lookup a dimension by its 0-based position in programData.ts dimensions[]. */
export const dimensionByIndex = (i: number): Dimension | undefined => RUBRIC.find((d) => d.index === i)

/** Lookup a dimension by id ('D1'..'D10','B'). */
export const dimensionById = (id: string): Dimension | undefined => RUBRIC.find((d) => d.id === id)

/** Radar-chart abbreviations, in order (core dimensions only). */
export const RADAR_LABELS: string[] = CORE_DIMENSIONS.map((d) => d.short)

export const RISK_BANDS = [
  { min: 28, max: 36, band: "RESILIENT", interpretation: "AI augments rather than displaces graduates." },
  { min: 20, max: 27, band: "MODERATE RISK", interpretation: "Pivot required; a clear path to resilience is available." },
  { min: 12, max: 19, band: "HIGH RISK", interpretation: "Value proposition eroding; structural change needed." },
  { min: 0, max: 11, band: "CRITICAL", interpretation: "Human middleware; graduates face rapid displacement." },
] as const

export const THRESHOLD_QUESTIONS = {
  q1: "Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?",
  q2: "Does this program train graduates to design systems, own decisions, or generate original insight?",
  q3: "Will these graduates be more employable in 5 years than today, given AI trends?",
} as const
