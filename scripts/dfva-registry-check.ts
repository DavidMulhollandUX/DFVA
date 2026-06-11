/**
 * Report-registry drift check (CI guard). The 41-program report data is hand-
 * maintained in several parallel surfaces; this fails CI when they disagree:
 *   1. compass/app/src/compass/sharedProgramData.ts  (app registry)
 *   2. compass-static/src/data/programData.ts        (static demo registry)
 *   3. reports/dfva-*.md                             (generated markdown files)
 *   4. compass/app/src/compass/reportContent*.ts     (in-app report markdown, keyed by slug)
 *   5. compass/app/src/compass/ReportDetailPage.tsx  (reportMeta score/band map)
 * Band names are validated against the canonical RISK_BANDS in dfva/source/rubric.ts.
 * Run: npm --prefix scripts run dfva:check-registry  (also part of dfva:check)
 */
import { existsSync, readFileSync } from 'node:fs'
import * as path from 'node:path'
import { RISK_BANDS } from '../dfva/source/rubric'
import { PROGRAMS as APP_PROGRAMS } from '../compass/app/src/compass/sharedProgramData'
import { PROGRAMS as STATIC_PROGRAMS } from '../compass-static/src/data/programData'
import { REPORT_CONTENT } from '../compass/app/src/compass/reportContent'

export const repoRoot = path.resolve(__dirname, '..')

const errors: string[] = []
const warnings: string[] = []

function bandForScore(score: number): string {
  const b = RISK_BANDS.find((b) => score >= b.min && score <= b.max)
  return b ? b.band : `(no band for ${score})`
}

// --- A. Registry counts and slug sets ---------------------------------------
const appBySlug = new Map(APP_PROGRAMS.map((p) => [p.assessmentSlug, p]))
const staticBySlug = new Map(STATIC_PROGRAMS.map((p) => [p.assessmentSlug, p]))

// compass-static is a deployed snapshot that lags the app registry; its gaps are
// warnings (tracked, not CI-blocking). A program in static but NOT in the app
// registry is an error — the live app is the source of truth.
const staticMissing = [...appBySlug.keys()].filter((slug) => !staticBySlug.has(slug))
if (staticMissing.length > 0)
  warnings.push(
    `compass-static demo is ${staticMissing.length} program(s) behind the app registry (${APP_PROGRAMS.length} vs ${STATIC_PROGRAMS.length})`,
  )
for (const slug of staticBySlug.keys())
  if (!appBySlug.has(slug)) errors.push(`${slug}: in compass-static but missing from app registry`)

// --- B. Per-program agreement between the two registries --------------------
for (const [slug, a] of appBySlug) {
  const s = staticBySlug.get(slug)
  if (!s) continue
  if (a.score !== s.score) errors.push(`${slug}: score app=${a.score} static=${s.score}`)
  if (a.riskBand !== s.riskBand) errors.push(`${slug}: riskBand app=${a.riskBand} static=${s.riskBand}`)
  if (a.dimensions.length !== s.dimensions.length)
    errors.push(`${slug}: dimension count app=${a.dimensions.length} static=${s.dimensions.length}`)
  else
    a.dimensions.forEach((d, i) => {
      const sd = s.dimensions[i]
      if (d.label !== sd.label || d.score !== sd.score)
        errors.push(`${slug}: dimension[${i}] app=${d.label}:${d.score} static=${sd.label}:${sd.score}`)
    })
}

// --- C. Band-vs-score consistency against canonical RISK_BANDS --------------
for (const p of APP_PROGRAMS) {
  const expected = bandForScore(p.score)
  if (p.riskBand !== expected)
    errors.push(`${p.assessmentSlug}: score ${p.score} ⇒ ${expected}, registry says ${p.riskBand}`)
}

// --- D. Registry slugs vs reports/*.md files --------------------------------
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

// --- E. Registry slugs vs in-app REPORT_CONTENT keys ------------------------
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
for (const key of Object.keys(REPORT_CONTENT))
  if (!registrySlugs.has(key))
    warnings.push(`REPORT_CONTENT key "${key}" not referenced by any registry program`)

// --- F. reportMeta map in ReportDetailPage.tsx -------------------------------
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
  `dfva:check-registry OK — ${APP_PROGRAMS.length} programs consistent across app/static registries, reports/, REPORT_CONTENT and reportMeta (${warnings.length} warning(s)).`,
)
