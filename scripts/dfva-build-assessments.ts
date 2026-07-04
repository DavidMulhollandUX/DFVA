/**
 * Generator: builds the canonical dfva/source/assessments.json — the store the
 * dfva-mcp server serves to agents — FROM the real per-program scores in the app
 * (compass/app/src/compass/sharedProgramData.ts), and ENRICHES each with real
 * graduate-outcome (JIR / QILT) evidence from data/labour-evidence.json.
 *
 * Why: assessments.json was hand-seeded with a single stale program (mc-cs), so
 * the agent-first MCP surface returned nothing usable. This joins the three
 * previously-parallel datasets (app scores + labour evidence + evidence rationales)
 * into one canonical, agent-queryable store.
 *
 * Enrichment only: D1–D10 (+ bonus B) scores are copied verbatim from the app;
 * no dimension score or risk band is recomputed.
 *
 * Run: npm --prefix scripts run dfva:gen-assessments
 * The output is drift-guarded by dfva-assessments-check.ts (part of dfva:check).
 */
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import * as path from 'node:path'
import { PROGRAMS, type ProgramReport } from '../compass/app/src/compass/sharedProgramData'
import { getFaculty } from '../compass/app/src/compass/faculty'
import { RUBRIC } from '../dfva/source/rubric'
import type {
  ProgramAssessment,
  DimensionScore,
  LabourEvidence,
} from '../dfva/source/types'

const repoRoot = path.resolve(__dirname, '..')

/** demoLabel (as used in sharedProgramData) → canonical rubric dimension. */
const BY_DEMO_LABEL = new Map(RUBRIC.map((d) => [d.demoLabel, d]))

interface LabourFile {
  programs: Record<
    string,
    {
      field: string
      qiltStudyArea: string
      qilt?: LabourEvidence['qilt']
      destinations: LabourEvidence['destinations']
      demandEmployers?: string[]
      demandSalary?: string
    }
  >
}

const LABOUR: LabourFile = JSON.parse(
  readFileSync(path.join(repoRoot, 'data/labour-evidence.json'), 'utf-8'),
)

/** "dfva-mc-is" → "mc-is". */
function codeFromSlug(slug: string): string {
  return slug.replace(/^dfva-/, '')
}

/** Map the app's human level string to the canonical enum. */
function levelOf(level: string): ProgramAssessment['level'] {
  const w = level.trim().toLowerCase()
  if (w.startsWith('bachelor')) return 'undergraduate'
  if (w.startsWith('doctor') || /\bphd\b/.test(w)) return 'graduate-research'
  return 'postgraduate'
}

/** Optional per-dimension rationale + recommendations from the evidence layer. */
function loadEvidence(code: string): {
  byDimension?: Record<
    string,
    { rationale?: string; recommendations?: { action: string; priority?: string }[] }
  >
} | null {
  const p = path.join(repoRoot, 'dfva/source/evidence', `${code}.json`)
  return existsSync(p) ? JSON.parse(readFileSync(p, 'utf-8')) : null
}

function labourEvidenceFor(code: string): LabourEvidence | undefined {
  const e = LABOUR.programs[code]
  if (!e || !e.qilt) return undefined
  return {
    field: e.field,
    qiltStudyArea: e.qiltStudyArea,
    qilt: e.qilt,
    destinations: e.destinations,
    demandEmployers: e.demandEmployers ?? [],
    demandSalary: e.demandSalary ?? '',
  }
}

/** Short, deterministic summary from the top-priority recommendations. */
function recommendationSummary(
  ev: ReturnType<typeof loadEvidence>,
  band: string,
): string {
  const recs: { action: string; priority: string }[] = []
  if (ev?.byDimension) {
    for (const dim of Object.values(ev.byDimension)) {
      for (const r of dim.recommendations ?? []) {
        recs.push({ action: r.action, priority: r.priority ?? 'P99' })
      }
    }
  }
  recs.sort(
    (a, b) =>
      (parseInt(a.priority.replace(/\D/g, ''), 10) || 99) -
      (parseInt(b.priority.replace(/\D/g, ''), 10) || 99),
  )
  const top = [...new Set(recs.map((r) => r.action))].slice(0, 2)
  if (top.length) return `${top.join('; ')}.`
  return `Assessed ${band}; see the full recommendation report for the improvement pathway.`
}

function buildOne(p: ProgramReport): ProgramAssessment {
  const code = codeFromSlug(p.assessmentSlug)
  const ev = loadEvidence(code)
  const labourEvidence = labourEvidenceFor(code)

  const dimensions: DimensionScore[] = p.dimensions
    .map((d): DimensionScore | null => {
      const dim = BY_DEMO_LABEL.get(d.label)
      if (!dim) return null
      return {
        dimension: dim.id,
        score: d.score,
        maxScore: d.max,
        criteria: [...dim.levels],
        notes: ev?.byDimension?.[dim.id]?.rationale ?? '',
      }
    })
    .filter((d): d is DimensionScore => d !== null)

  const d5 = dimensions.find((d) => d.dimension === 'D5')
  const d1 = dimensions.find((d) => d.dimension === 'D1')

  // labourMarketAlignment: MCP-only aggregate (NOT a displayed dimension). Derived
  // from real QILT employment when available, else the D1 score as a proxy.
  const labourMarketAlignment = labourEvidence
    ? Math.round(labourEvidence.qilt.employmentRate * 3 * 10) / 10
    : (d1?.score ?? 0)

  const assessment: ProgramAssessment = {
    programCode: code,
    programName: p.program,
    faculty: getFaculty(p.program),
    level: levelOf(p.level),
    overallScore: p.score, // /36 — consistent with rubric RISK_BANDS + riskBand
    riskCategory: p.riskBand,
    dimensions,
    aiLiteracyScore: d5?.score ?? 0,
    labourMarketAlignment,
    assessedAt: `${p.date}T00:00:00Z`,
    recommendationSummary: recommendationSummary(ev, p.riskBand),
    marketReportPath: `reports/${p.marketSlug}.md`,
  }
  if (labourEvidence) assessment.labourEvidence = labourEvidence
  return assessment
}

export function buildAssessments(): ProgramAssessment[] {
  const missingFaculty: string[] = []
  const out = PROGRAMS.map((p) => {
    const a = buildOne(p)
    if (!a.faculty || a.faculty === 'Other') missingFaculty.push(a.programCode)
    return a
  }).sort((a, b) => a.programCode.localeCompare(b.programCode))
  if (missingFaculty.length) {
    console.warn(`⚠ unresolved faculty for: ${missingFaculty.join(', ')}`)
  }
  return out
}

/** Canonical serialization — the single source of truth for the on-disk file. */
export function serializeAssessments(a: ProgramAssessment[]): string {
  return `${JSON.stringify(a, null, 2)}\n`
}

const OUT_PATH = path.join(repoRoot, 'dfva/source/assessments.json')

// Run as a script → write the file. Imported (by the check) → no side effects.
if (require.main === module) {
  const assessments = buildAssessments()
  writeFileSync(OUT_PATH, serializeAssessments(assessments), 'utf-8')
  const enriched = assessments.filter((a) => a.labourEvidence).length
  console.log(
    `✓ wrote ${assessments.length} programs to dfva/source/assessments.json ` +
      `(${enriched} with labour-evidence)`,
  )
}
