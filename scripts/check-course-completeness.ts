/**
 * Course completeness check — the guardrail for adding a new course.
 * Run: npm --prefix scripts run dfva:completeness
 *
 * A new course is only "done" when all of its linked artifacts exist and agree.
 * The Juris Doctor shipped assessment-only, so the redesign link, redesign plan,
 * and dimension evidence were each missing and had to be backfilled one request
 * at a time. This asserts the invariants so a partial course fails CI instead.
 *
 * FAILS the build on:
 *   1. a program whose assessmentSlug has no REPORT_CONTENT entry
 *   2. a recommendSlug that points at missing redesign-plan content (dangling link)
 *   3. dimension evidence that is incomplete (missing any of the 11 dimensions)
 *   4. dimension evidence with NO dfva/source/evidence/<code>.json — a fragile
 *      hand-edit that the next `dfva:gen` will silently delete (the JD bug)
 *   5. an orphan DIMENSION_EVIDENCE key with no matching program
 * WARNS (informational) on programs with no dimension evidence yet.
 */
import { existsSync } from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PROGRAMS } from '../compass/app/src/compass/sharedProgramData'
import { REPORT_CONTENT } from '../compass/app/src/compass/reportContent'
import { DIMENSION_EVIDENCE } from '../compass/app/src/compass/data/dimensionEvidence'

const DIMS = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'B']
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const evidenceDir = path.join(repoRoot, 'dfva/source/evidence')

// Ratchet: programs already incomplete when this check was introduced (mostly
// dev-loop-added doctorate/PhD stubs). Grandfathered so CI is green today; a
// NEW incomplete course still fails. Delete a slug here once it's backfilled —
// the check tells you when it can be removed.
const GRANDFATHERED = new Set<string>([
  'dfva-080cl', 'dfva-080cn', 'dfva-300bb', 'dfva-dh-lld', 'dfva-dh-sc',
  'dfva-dr-philabp', 'dfva-dr-philagr', 'dfva-dr-philart', 'dfva-dr-philbe',
  'dfva-dr-philedp', 'dfva-dr-philedu', 'dfva-dr-phileit', 'dfva-dr-philfam',
  'dfva-dr-philik', 'dfva-dr-phillaw', 'dfva-dr-philmdh', 'dfva-dr-philsci',
  'dfva-dr-philvet', 'dfva-mc-ddensur', 'dfva-mc-dmed', 'dfva-mc-doptom',
  'dfva-mc-dphysio', 'dfva-mc-dvetmed', 'dfva-me-dcd',
])

const errors: string[] = []
const warnings: string[] = []
const resolvable: string[] = []

for (const p of PROGRAMS) {
  const grandfathered = GRANDFATHERED.has(p.assessmentSlug)
  const contentGaps: string[] = []

  // 1. assessment content must exist
  if (!REPORT_CONTENT[p.assessmentSlug]) {
    contentGaps.push(`no assessment content for ${p.assessmentSlug}`)
  }

  // 2. a declared redesign link must resolve to redesign-plan content
  if (p.recommendSlug && !REPORT_CONTENT[p.recommendSlug]) {
    contentGaps.push(`recommendSlug "${p.recommendSlug}" has no redesign-plan content (dangling Redesign Plan link)`)
  }

  // New courses must be complete; grandfathered ones only warn (tracked debt).
  for (const gap of contentGaps) {
    ;(grandfathered ? warnings : errors).push(`${p.program}: ${gap}`)
  }
  if (grandfathered && contentGaps.length === 0) {
    resolvable.push(p.assessmentSlug)
  }

  // 3 & 4. dimension evidence (optional) must be complete and source-backed
  const ev = DIMENSION_EVIDENCE[p.assessmentSlug]
  if (ev) {
    const missing = DIMS.filter((d) => !ev[d] || !ev[d].rationale)
    if (missing.length) {
      errors.push(`${p.assessmentSlug}: dimension evidence missing/blank rationale for ${missing.join(', ')}`)
    }
    const code = p.assessmentSlug.replace(/^dfva-/, '')
    if (!existsSync(path.join(evidenceDir, `${code}.json`))) {
      errors.push(`${p.assessmentSlug}: dimension evidence has NO source file dfva/source/evidence/${code}.json — a dfva:gen run will delete it`)
    }
  } else {
    warnings.push(`${p.program} (${p.assessmentSlug}): no dimension evidence yet — rubric popover shows no linked recommendations`)
  }
}

// 5. every DIMENSION_EVIDENCE key must map to a real program
for (const slug of Object.keys(DIMENSION_EVIDENCE)) {
  if (!PROGRAMS.some((p) => p.assessmentSlug === slug)) {
    errors.push(`DIMENSION_EVIDENCE has orphan key "${slug}" (no matching program)`)
  }
}

// Coverage matrix (informational)
const withRecommend = PROGRAMS.filter((p) => p.recommendSlug && REPORT_CONTENT[p.recommendSlug!]).length
const withEvidence = PROGRAMS.filter((p) => DIMENSION_EVIDENCE[p.assessmentSlug]).length
console.log(
  `Programs: ${PROGRAMS.length} | redesign plan: ${withRecommend}/${PROGRAMS.length} | dimension evidence: ${withEvidence}/${PROGRAMS.length}`,
)
if (warnings.length) {
  console.log(`\n${warnings.length} grandfathered/informational gap(s) (tracked debt, not a failure):`)
  warnings.slice(0, 40).forEach((w) => console.log('  · ' + w))
  if (warnings.length > 40) console.log(`  … and ${warnings.length - 40} more`)
}
if (resolvable.length) {
  console.log(`\n🎉 ${resolvable.length} grandfathered program(s) are now complete — remove from GRANDFATHERED:`)
  resolvable.forEach((s) => console.log('  - ' + s))
}

if (errors.length) {
  console.error(`\n❌ ${errors.length} completeness error(s):`)
  errors.forEach((e) => console.error('  - ' + e))
  process.exit(1)
}
console.log('\n✅ Course completeness check passed.')
