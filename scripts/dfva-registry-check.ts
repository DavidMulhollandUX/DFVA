/**
 * Report-registry drift check (CI guard). The 41-program report data is hand-
 * maintained in several parallel surfaces; this fails CI when they disagree:
 *   1. compass/app/src/compass/sharedProgramData.ts  (app registry)
 *   2. reports/dfva-*.md                             (generated markdown files)
 *   3. compass/app/src/compass/reportContent*.ts     (in-app report markdown, keyed by slug)
 *   4. compass/app/src/compass/ReportDetailPage.tsx  (reportMeta score/band map)
 * (compass-static was decommissioned and removed from this cross-check.)
 * Band names are validated against the canonical RISK_BANDS in dfva/source/rubric.ts.
 * Run: npm --prefix scripts run dfva:check-registry  (also part of dfva:check)
 */
import { existsSync, readFileSync } from 'node:fs'
import * as path from 'node:path'
import { RISK_BANDS } from '../dfva/source/rubric'
import { PROGRAMS as APP_PROGRAMS } from '../compass/app/src/compass/sharedProgramData'
import { REPORT_CONTENT } from '../compass/app/src/compass/reportContent'
import { V4_ONLY_PROGRAMS, V4_RESEARCH_DEGREES } from '../compass/app/src/compass/v4/data/v4PanelC'

export const repoRoot = path.resolve(__dirname, '..')

const errors: string[] = []
const warnings: string[] = []

function bandForScore(score: number): string {
  const b = RISK_BANDS.find((b) => score >= b.min && score <= b.max)
  return b ? b.band : `(no band for ${score})`
}

// --- A. Band-vs-score consistency against canonical RISK_BANDS --------------
for (const p of APP_PROGRAMS) {
  const expected = bandForScore(p.score)
  if (p.riskBand !== expected)
    errors.push(`${p.assessmentSlug}: score ${p.score} ⇒ ${expected}, registry says ${p.riskBand}`)
}

// --- B. Registry slugs vs reports/*.md files --------------------------------
for (const p of APP_PROGRAMS) {
  for (const [kind, slug] of [
    ['assessment', p.assessmentSlug],
    ['market', p.marketSlug],
    ['recommend', p.recommendSlug],
  ] as const) {
    if (!slug) continue
    const file = path.join(repoRoot, 'reports', `${slug}.md`)
    if (!existsSync(file)) {
      // The app UI serves report bodies from REPORT_CONTENT; reports/*.md is the
      // archive. A missing assessment file is an error (canonical artifact);
      // missing market/recommend files are archive gaps — warnings.
      const msg = `${p.assessmentSlug}: ${kind} slug "${slug}" has no reports/${slug}.md`
      kind === 'assessment' ? errors.push(msg) : warnings.push(msg)
    }
  }
}

// --- C. Registry slugs vs in-app REPORT_CONTENT keys ------------------------
for (const p of APP_PROGRAMS) {
  for (const slug of [p.assessmentSlug, p.marketSlug, p.recommendSlug]) {
    if (!slug) continue
    if (!(slug in REPORT_CONTENT))
      errors.push(`${p.assessmentSlug}: slug "${slug}" missing from app REPORT_CONTENT (UI tab 404s)`)
  }
}
const registrySlugs = new Set(
  APP_PROGRAMS.flatMap((p) => [p.assessmentSlug, p.marketSlug, p.recommendSlug]).filter(Boolean),
)
// This registry's schema only ever modeled 3 slugs per program (assessment/market/
// recommend, from the pre-v4 report era). The v4 report family (v4 Durability Report,
// v4 improvement plan, and the v4r research-degree variant) has no field here for
// *any* program, v1-registered or v4-only — v4-only programs dispatch straight to
// <V4Report> (ReportPage.tsx) without ever consulting APP_PROGRAMS, and v1 programs
// with a supplementary v4 report (e.g. mc-cs, 244cw) have no v4Slug/v4RecommendSlug
// field to register it in either. Checking those prefixes against this registry
// would always be a false positive, so they're unconditionally out of scope for
// this reverse check; v4 content is instead validated by dfva-v4-verify-evidence.ts
// and dfva:report-lint.
const UNMODELED_V4_PREFIXES = ['dfva-v4-recommend-', 'dfva-v4r-', 'dfva-v4-']
// "dfva-market-" IS a modeled field (marketSlug) — but only for programs that live
// in APP_PROGRAMS. A market report for a v4-only or research-degree program was
// never meant to be registered there either, so exempt it by code, not by prefix,
// so a genuinely orphaned market report for a v1-modeled program still gets flagged.
const v4FamilyCodes = new Set([
  ...Object.keys(V4_ONLY_PROGRAMS),
  ...V4_RESEARCH_DEGREES,
])
for (const key of Object.keys(REPORT_CONTENT)) {
  if (registrySlugs.has(key)) continue
  if (UNMODELED_V4_PREFIXES.some((prefix) => key.startsWith(prefix))) continue
  if (key.startsWith('dfva-market-') && v4FamilyCodes.has(key.slice('dfva-market-'.length)))
    continue
  warnings.push(`REPORT_CONTENT key "${key}" not referenced by any registry program`)
}

// --- D. reportMeta map in ReportDetailPage.tsx -------------------------------
const detailSrc = readFileSync(
  path.join(repoRoot, 'compass/app/src/compass/ReportDetailPage.tsx'),
  'utf8',
)
const metaRe = /"(dfva-[^"]+)":\s*\{\s*score:\s*(?:"([^"]+)"|null),\s*riskBand:\s*(?:"([^"]+)"|null)\s*\}/g
const reportMeta = new Map<string, { score: string | null; riskBand: string | null }>()
for (let m; (m = metaRe.exec(detailSrc)); )
  reportMeta.set(m[1], { score: m[2] ?? null, riskBand: m[3] ?? null })
if (reportMeta.size === 0) {
  warnings.push('could not parse reportMeta from ReportDetailPage.tsx (regex found no entries)')
} else {
  for (const p of APP_PROGRAMS) {
    const meta = reportMeta.get(p.assessmentSlug)
    if (!meta) {
      errors.push(`${p.assessmentSlug}: missing from ReportDetailPage reportMeta (no score badge)`)
      continue
    }
    const expectedScore = `${p.score} / ${p.maxScore}`
    if (meta.score !== expectedScore)
      errors.push(`${p.assessmentSlug}: reportMeta score "${meta.score}" ≠ registry "${expectedScore}"`)
    if (meta.riskBand !== p.riskBand)
      errors.push(`${p.assessmentSlug}: reportMeta band "${meta.riskBand}" ≠ registry "${p.riskBand}"`)
  }
}

// --- Report ------------------------------------------------------------------
for (const w of warnings) console.warn('  warn: ' + w)
if (errors.length > 0) {
  console.error(`dfva:check-registry FAILED — ${errors.length} mismatch(es) across report surfaces:`)
  for (const e of errors) console.error('  - ' + e)
  process.exit(1)
}
console.log(
  `dfva:check-registry OK — ${APP_PROGRAMS.length} programs consistent across app registry, reports/, REPORT_CONTENT and reportMeta (${warnings.length} warning(s)).`,
)
