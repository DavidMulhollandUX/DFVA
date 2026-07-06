/**
 * DFVA canonical rubric — THE single source of truth.
 *
 * Edit this file, then run `npm --prefix scripts run dfva:gen` to propagate to:
 *   - the AI-tool prompt files (.github/copilot-instructions.md, .continue/prompts/*, .github/prompts/*, .github/agents/*)
 *
 * Nothing downstream should hand-define the rubric, risk bands, or threshold questions.
 */

export interface RubricLevel {
  score: 0 | 1 | 2 | 3
  criteria: string
}

export interface Dimension {
  /** Canonical id: 'D1'..'D10' for core dimensions, 'B' for the bonus. */
  id: string
  /** 0-based position; also the join key to programData.ts `dimensions[]` order. */
  index: number
  /** Canonical name (used in the rubric table / prompts). */
  name: string
  /** Short label as used in the demo's programData.ts `dimensions[].label`. */
  demoLabel: string
  /** Radar-chart abbreviation (empty for the bonus, which is excluded from the radar). */
  short: string
  /** True for the bonus dimension 'B'. */
  bonus?: boolean
  /** One-line "what this measures". */
  definition: string
  /** The 0/1/2/3 rubric column text, in order. */
  levels: [string, string, string, string]
}

export const RUBRIC: Dimension[] = [
  {
    id: 'D1',
    index: 0,
    name: 'Automation Exposure of Roles',
    demoLabel: 'Automation Exposure',
    short: 'Auto',
    definition:
      "Whether graduates' entry-level roles cluster in automatable tasks or require irreducible human judgment, design, and accountability.",
    levels: [
      'First 3-5 years mostly routine templated tasks',
      'Some judgment, mostly templated',
      'Mix of routine and non-routine work',
      'Judgment, design, accountability, or physical/relational skill from day one',
    ],
  },
  {
    id: 'D2',
    index: 1,
    name: 'Systems Thinking and Problem Framing',
    demoLabel: 'Systems Thinking',
    short: 'Systems',
    definition:
      'Whether the curriculum teaches hypothesis formation, constraint reasoning, and failure-mode analysis beyond template execution.',
    levels: [
      'Tool/process execution only',
      'Mentioned but not assessed',
      'Dedicated units with authentic assessment',
      'Integrated throughout with trade-off reasoning and failure-mode analysis',
    ],
  },
  {
    id: 'D3',
    index: 2,
    name: 'Technical and Quantitative Depth',
    demoLabel: 'Technical Depth',
    short: 'Tech',
    definition:
      'Whether the program builds genuine depth in statistics, data, coding, or domain-specific technical competence.',
    levels: [
      'No meaningful rigour',
      'Intro stats or basic tooling',
      'Solid grounding in stats/data/coding/domain science',
      'Strong technical core embedded and assessed throughout',
    ],
  },
  {
    id: 'D4',
    index: 3,
    name: 'Decision-Making Under Uncertainty',
    demoLabel: 'Decision-Making',
    short: 'Decide',
    definition:
      'Whether assessment requires graduates to defend trade-offs under real constraints rather than recall scripted answers.',
    levels: [
      'Recall/scripted responses',
      'Some case work with scripted answers',
      'Assessments require defended trade-offs',
      'Simulations/capstones/live projects with real uncertainty and accountability',
    ],
  },
  {
    id: 'D5',
    index: 4,
    name: 'AI Literacy and Governance',
    demoLabel: 'AI Literacy',
    short: 'AI Lit',
    definition:
      'Whether graduates understand AI as a system with failure modes and governance needs, not just a tool to consume.',
    levels: [
      'No AI coverage',
      'AI appears in one elective',
      'AI tools used with limits discussed',
      'Graduates can design/deploy/supervise/critique AI workflows incl. ethics/governance',
    ],
  },
  {
    id: 'D6',
    index: 5,
    name: 'Domain Depth and Specialisation',
    demoLabel: 'Domain Depth',
    short: 'Domain',
    definition:
      'Whether the degree builds durable specialist knowledge that takes years to develop.',
    levels: [
      'Generic/interchangeable',
      'Mild specialisation',
      'Clear specialist domain focus',
      'Deep regulatory/scientific/clinical/physical expertise',
    ],
  },
  {
    id: 'D7',
    index: 6,
    name: 'Research Methods Rigour',
    demoLabel: 'Research Rigour',
    short: 'Rsch',
    definition:
      'Whether graduates generate primary evidence and defend methodology, not only synthesize existing literature.',
    levels: [
      'Secondary summary only',
      'Intro research unit',
      'Can design and conduct research',
      'Routinely generate primary data and defend methods under scrutiny',
    ],
  },
  {
    id: 'D8',
    index: 7,
    name: 'Human and Relational Capability',
    demoLabel: 'Human & Relational',
    short: 'Human',
    definition:
      'Whether the curriculum builds interpersonal, ethical, or physical/clinical capability assessed as a core competency.',
    levels: [
      'No interpersonal/ethical/physical practice',
      'Ethics mention only',
      'Meaningful ethics or stakeholder practice',
      'Substantial clinical/care/interpersonal accountability or physical skill',
    ],
  },
  {
    id: 'D9',
    index: 8,
    name: 'Curriculum Currency and Adaptability',
    demoLabel: 'Curriculum Currency',
    short: 'Curric',
    definition:
      'Whether the program uses feedback loops and outcome tracking to stay current, especially on AI integration.',
    levels: [
      'No review in 3+ years, no AI content',
      'Minor updates',
      'Major refresh in last 2 years, AI in core units',
      'Living curriculum with advisory feedback and outcome tracking',
    ],
  },
  {
    id: 'D10',
    index: 9,
    name: 'Graduate Outcome Evidence',
    demoLabel: 'Outcome Evidence',
    short: 'Outcome',
    definition:
      'Whether the institution publishes detailed post-graduation employment outcomes, not just satisfaction surveys.',
    levels: [
      'No destination data',
      'Generic satisfaction data only',
      'Destination data published with partial detail',
      'Granular roles/industries/salary/time-to-employment data',
    ],
  },
  {
    id: 'B',
    index: 10,
    name: 'Irreplaceability Premium (Bonus)',
    demoLabel: 'Irreplaceability (bonus)',
    short: '',
    bonus: true,
    definition:
      'Whether the degree combines technical depth, specialist domain knowledge, and human judgment in a way that resists substitution.',
    levels: [
      'Easily substituted',
      'One weak differentiator',
      'Clear dual-skill value',
      'Rare integration of technical depth, domain expertise, and human judgment',
    ],
  },
]

export type RiskBandName = 'RESILIENT' | 'MODERATE RISK' | 'HIGH RISK' | 'CRITICAL'

export interface RiskBand {
  min: number
  max: number
  band: RiskBandName
  interpretation: string
}

export const RISK_BANDS: RiskBand[] = [
  { min: 28, max: 36, band: 'RESILIENT', interpretation: 'AI augments rather than displaces graduates.' },
  { min: 20, max: 27, band: 'MODERATE RISK', interpretation: 'Pivot required; a clear path to resilience is available.' },
  { min: 12, max: 19, band: 'HIGH RISK', interpretation: 'Value proposition eroding; structural change needed.' },
  { min: 0, max: 11, band: 'CRITICAL', interpretation: 'Human middleware; graduates face rapid displacement.' },
]

export const THRESHOLD_QUESTIONS = {
  q1: "Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?",
  q2: 'Does this program train graduates to design systems, own decisions, or generate original insight?',
  q3: 'Will these graduates be more employable in 5 years than today, given AI trends?',
} as const

/**
 * Scoring formula — THE definition.
 *
 * A program is scored on 11 dimensions (D1–D10 core + bonus B), each 0–3, with NO weighting
 * and the bonus counting ×1. A dimension can also be **Not Applicable** (`score: null`) when
 * its underlying construct does not exist for the program — e.g. a higher doctorate by
 * examination has no graduate cohort (D1), no curriculum (D9) and no outcome data (D10). NA is
 * distinct from a genuine 0: it means "cannot be assessed", not "worst performance".
 *
 * The reported total is the **renormalised** (pro-rata) score over the applicable dimensions:
 *   adjusted = round( Σ(applicable scores) × 11 / (count of applicable) )
 * This is algebraically identical to imputing each NA dimension at the program's own
 * applicable-dimension mean. When nothing is NA the factor is ×11/11 = 1, so `adjustedScore`
 * equals the plain sum `totalScore` — normal programs are unaffected.
 *
 * If fewer than `MIN_APPLICABLE_TO_RATE` (7) dimensions are applicable the renormalised number
 * is too fragile to band, so the program is `'NOT RATABLE'` — its report keeps its qualitative
 * verdict but asserts no numeric risk band.
 *
 * `MAX_SCORE = 36` is a LEGACY nominal ceiling, kept only as the published "/36" denominator
 * and the upper bound of the RESILIENT band. Nothing can actually score above 33 — there is no
 * 12th dimension and the bonus is not double-weighted. `programData.ts` `score` MUST equal
 * `adjustedScore(dimensions)`; where it diverges, the stored score is a data-entry error.
 */
export const MAX_SCORE = 36

/** Maximum total that is actually reachable (11 dimensions × 3). The "/36" is nominal. */
export const MAX_ACHIEVABLE_SCORE = 33

/** Number of scored dimensions (D1–D10 + bonus B). Used as the renormalisation numerator. */
export const DIMENSION_COUNT = 11

/** Below this many applicable dimensions a program is 'NOT RATABLE' rather than banded. */
export const MIN_APPLICABLE_TO_RATE = 7

/** A dimension is applicable when it carries a real 0–3 score (null/undefined = Not Applicable). */
export function isApplicable(d: { score: number | null | undefined }): boolean {
  return d.score !== null && d.score !== undefined
}

/** Count of applicable (non-NA) dimensions. */
export function applicableCount(dimensions: ReadonlyArray<{ score: number | null | undefined }>): number {
  return dimensions.filter(isApplicable).length
}

/** Plain sum over the applicable dimensions only (0 if all NA). */
export function rawApplicableTotal(dimensions: ReadonlyArray<{ score: number | null | undefined }>): number {
  return dimensions.reduce((sum, d) => sum + (isApplicable(d) ? (d.score as number) : 0), 0)
}

/**
 * Canonical total: the renormalised (pro-rata) score over applicable dimensions, on the /36
 * scale. Equals the plain sum when no dimension is NA. Returns 0 when every dimension is NA.
 *
 * Ties round DOWN (round-half-down): an imputed program is never promoted into a higher risk
 * band by a rounding tie alone — e.g. an applicable mean of 2.5/3 renormalises to 27.5 → 27
 * (MODERATE), not 28 (RESILIENT). All-applicable programs sum to integers, so this only ever
 * affects NA programs whose renormalised value lands exactly on x.5.
 */
export function adjustedScore(dimensions: ReadonlyArray<{ score: number | null | undefined }>): number {
  const n = applicableCount(dimensions)
  if (n === 0) return 0
  // round-half-down: Math.ceil(v - 0.5) rounds normally but breaks x.5 ties downward.
  return Math.ceil((rawApplicableTotal(dimensions) * DIMENSION_COUNT) / n - 0.5)
}

/**
 * Legacy plain sum of dimension scores (NA counts as 0). Retained for callers that want the raw
 * total; the canonical, band-determining figure is `adjustedScore`. Identical to `adjustedScore`
 * when no dimension is NA.
 */
export function totalScore(dimensions: ReadonlyArray<{ score: number | null | undefined }>): number {
  return dimensions.reduce((sum, d) => sum + (d.score ?? 0), 0)
}

/** The four numeric risk bands, plus 'NOT RATABLE' for programs with too few applicable dimensions. */
export type RiskCategory = RiskBandName | 'NOT RATABLE'

/** The risk band for a given numeric total, per RISK_BANDS. */
export function bandForScore(score: number): RiskBandName {
  return (RISK_BANDS.find((b) => score >= b.min && score <= b.max) ?? RISK_BANDS[RISK_BANDS.length - 1]).band
}

/**
 * The canonical risk category for a set of dimensions: 'NOT RATABLE' when fewer than
 * MIN_APPLICABLE_TO_RATE are applicable, otherwise the band of the renormalised adjustedScore.
 */
export function bandForDimensions(
  dimensions: ReadonlyArray<{ score: number | null | undefined }>,
): RiskCategory {
  if (applicableCount(dimensions) < MIN_APPLICABLE_TO_RATE) return 'NOT RATABLE'
  return bandForScore(adjustedScore(dimensions))
}

// ---------------------------------------------------------------------------
// Render helpers — the generator uses these so every downstream copy is derived,
// never hand-maintained. Output must match the existing committed prompt files.
// ---------------------------------------------------------------------------

const numCol = (d: Dimension): string => (d.bonus ? 'B' : String(d.index + 1))

/** The "## DFVA Rubric (0-3)" markdown table. */
export function renderRubricTable(): string {
  const head = '| # | Dimension | 0 | 1 | 2 | 3 |\n|---|---|---|---|---|---|'
  const rows = RUBRIC.map(
    (d) => `| ${numCol(d)} | ${d.name} | ${d.levels[0]} | ${d.levels[1]} | ${d.levels[2]} | ${d.levels[3]} |`,
  )
  return [head, ...rows].join('\n')
}

/** The "## Risk Bands" markdown table. */
export function renderRiskBandsTable(): string {
  const head = '| Score | Band |\n|---|---|'
  const rows = RISK_BANDS.map((b) => `| ${b.min}-${b.max} | ${b.band} |`)
  return [head, ...rows].join('\n')
}

/** The three threshold questions, one per line (Q1/Q2/Q3). */
export function renderThresholdQuestions(): string {
  return `Q1: ${THRESHOLD_QUESTIONS.q1}\nQ2: ${THRESHOLD_QUESTIONS.q2}\nQ3: ${THRESHOLD_QUESTIONS.q3}`
}

/** Inline middot form: "28–36 RESILIENT · 20–27 MODERATE RISK · …" (en-dash + middot). */
export function renderRiskBandsInline(): string {
  return RISK_BANDS.map((b) => `${b.min}–${b.max} ${b.band}`).join(' · ')
}

/** Indented bullet-list form matching the Continue prompt:
 *   "  - 28-36 RESILIENT\n  - 20-27 MODERATE RISK\n …". */
export function renderRiskBandsList(): string {
  return RISK_BANDS.map((b) => `  - ${b.min}-${b.max} ${b.band}`).join('\n')
}

/** Condensed 2-criteria rubric table (for the Claude skill): `| # | Dimension | 0 (worst) | 3 (best) |`. */
export function renderRubricTableCondensed(): string {
  const head = '| # | Dimension | 0 (worst) | 3 (best) |\n|---|---|---|---|'
  const rows = RUBRIC.map((d) => `| ${d.bonus ? 'B' : d.index + 1} | ${d.demoLabel} | ${d.levels[0]} | ${d.levels[3]} |`)
  return [head, ...rows].join('\n')
}

/** Threshold questions as a bold bullet list: `- **Q1:** …`. */
export function renderThresholdQuestionsList(): string {
  return `- **Q1:** ${THRESHOLD_QUESTIONS.q1}\n- **Q2:** ${THRESHOLD_QUESTIONS.q2}\n- **Q3:** ${THRESHOLD_QUESTIONS.q3}`
}

