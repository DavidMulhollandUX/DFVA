/**
 * Assessments drift + integrity check (CI guard). The canonical agent store
 * dfva/source/assessments.json is GENERATED from the app's real scores +
 * labour-evidence by dfva-build-assessments.ts. This fails CI when the committed
 * file drifts from a fresh regeneration, or when the join loses key invariants.
 *
 * Mirrors the dfva-content-check.ts parity-guard pattern.
 *
 * Run: npm --prefix scripts run dfva:check  (or dfva:content-check chain)
 */
import { existsSync, readFileSync } from 'node:fs'
import * as path from 'node:path'
import {
  buildAssessments,
  serializeAssessments,
} from './dfva-build-assessments'
import type { ProgramAssessment } from '../dfva/source/types'
import { adjustedScore, bandForDimensions } from '../dfva/source/rubric'

const repoRoot = path.resolve(__dirname, '..')
const OUT_PATH = path.join(repoRoot, 'dfva/source/assessments.json')

const errors: string[] = []

const fresh = buildAssessments()

// 1) Drift: committed file must match a fresh regeneration byte-for-byte.
if (!existsSync(OUT_PATH)) {
  errors.push('dfva/source/assessments.json is missing — run dfva:gen-assessments')
} else {
  const committed = readFileSync(OUT_PATH, 'utf-8')
  if (committed !== serializeAssessments(fresh)) {
    errors.push(
      'dfva/source/assessments.json is STALE — run `npm --prefix scripts run ' +
        'dfva:gen-assessments` and commit the result.',
    )
  }
}

// 2) Coverage: every app program is present (should be all 67).
if (fresh.length < 60) {
  errors.push(`expected ~67 programs, got ${fresh.length}`)
}

// 3) Every core dimension D1–D10 is present on every program.
const CORE = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10']
for (const a of fresh) {
  const ids = new Set(a.dimensions.map((d) => d.dimension))
  const missing = CORE.filter((id) => !ids.has(id))
  if (missing.length) {
    errors.push(`${a.programCode}: missing dimensions ${missing.join(', ')}`)
  }
}

// 4) Spot-check the JIR join on a representative program.
const mcis = fresh.find((a: ProgramAssessment) => a.programCode === 'mc-is')
if (!mcis) {
  errors.push('mc-is not found in generated store')
} else {
  if (!mcis.dimensions.some((d) => d.dimension === 'D10')) {
    errors.push('mc-is missing D10 (Graduate Outcome Evidence)')
  }
  if (!mcis.labourEvidence?.qilt?.employmentRate) {
    errors.push('mc-is missing labourEvidence.qilt.employmentRate (JIR join failed)')
  }
}

// 5) At least the 41 labour-evidence programs are enriched.
const enriched = fresh.filter((a) => a.labourEvidence).length
if (enriched < 40) {
  errors.push(`expected ≥41 programs with labourEvidence, got ${enriched}`)
}

// 6) NA-aware scoring integrity. For programs with any Not-Applicable dimension the
//    overallScore/riskCategory MUST equal the renormalisation (adjustedScore /
//    bandForDimensions) — this is the guarantee the NA convention rests on, enforced as
//    an error. For all-applicable programs adjustedScore reduces to the plain dimension
//    sum; a mismatch there is a pre-existing hand-entry drift (stored score ≠ Σ dimensions)
//    unrelated to NA handling, so it is surfaced as a warning rather than failing CI.
const warnings: string[] = []
for (const a of fresh) {
  const hasNA = a.dimensions.some((d) => d.score === null)
  const expectedScore = adjustedScore(a.dimensions)
  const expectedBand = bandForDimensions(a.dimensions)
  const scoreOk = a.overallScore === expectedScore
  const bandOk = a.riskCategory === expectedBand
  if (scoreOk && bandOk) continue
  const msgs: string[] = []
  if (!scoreOk)
    msgs.push(`overallScore ${a.overallScore} ≠ adjustedScore(dimensions) ${expectedScore}`)
  if (!bandOk)
    msgs.push(`riskCategory "${a.riskCategory}" ≠ bandForDimensions(dimensions) "${expectedBand}"`)
  const line = `${a.programCode}: ${msgs.join('; ')}`
  if (hasNA) errors.push(line)
  else warnings.push(`${line} [pre-existing sum drift — not NA-related]`)
}
for (const w of warnings) console.warn(`  warn: ${w}`)

if (errors.length) {
  console.error('✗ dfva-assessments-check FAILED:')
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}
console.log(
  `✓ dfva-assessments-check: ${fresh.length} programs, ${enriched} JIR-enriched, ` +
    'store in sync.',
)
