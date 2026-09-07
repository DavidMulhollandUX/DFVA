/**
 * Guard: a scored cohort must be discriminated, not templated.
 *
 * WHY THIS EXISTS (2026-09-07). 2,838 `panelCv4` blocks covering eight
 * universities were committed as scored assessments. They were template output:
 * 2,742 of them shared one C1 rationale, mean recorded ambiguities was 2.00 at
 * eight independent institutions, and no record scored below 9 on adaptiveness —
 * the exact value of the published Melbourne median, so every one of them would
 * have published in the high-adaptiveness half and none could ever have surfaced
 * as "attention". Every other guard passed, because each record was individually
 * well-formed. What gave it away was the shape of the cohort, not the shape of a
 * record.
 *
 * So this check runs per institution over the whole evidence store, published or
 * not, and reports. It fails only for institutions that are published — a
 * quarantined cohort is expected to be bad, that is why it is quarantined.
 *
 * Run: npx tsx dfva-v4-distinctness-check.ts   (wired into `dfva:check`)
 *      npx tsx dfva-v4-distinctness-check.ts --all   (fail for every institution)
 *
 * See docs/dfva-national-expansion-spec.md, "The publication standard", 6 and 7.
 */
import { readdirSync, readFileSync } from 'node:fs'
import * as path from 'node:path'
import { institutionOf, isPublished } from './lib-institution'

const ROOT = path.resolve(__dirname, '..')
const ALL = process.argv.includes('--all')

/** A rationale shared by more than this share of a cohort is a template. The
 *  Melbourne cohort's most-repeated C1 rationale covers well under 5%. */
const MAX_SHARE = 0.25
/** Below this many programs a cohort is too small for the share test to mean
 *  anything — three programs in one discipline may legitimately read alike. */
const MIN_COHORT = 25

const ITEMS = ['C1', 'C2', 'C3', 'C4', 'C5', 'W1', 'W2', 'W3'] as const

interface Rec {
  code: string
  adaptiveness: number
  rationales: Record<string, string>
}

const byInstitution = new Map<string, Rec[]>()
const evidenceDir = path.join(ROOT, 'dfva/source/evidence')
for (const f of readdirSync(evidenceDir)) {
  if (!f.endsWith('.json')) continue
  const d = JSON.parse(readFileSync(path.join(evidenceDir, f), 'utf8')) as {
    code?: string
    panelCv4?: Record<string, { score?: number; rationale?: string }> & { adaptiveness?: number }
  }
  const p = d.panelCv4
  if (!p || !d.code || typeof p.adaptiveness !== 'number') continue
  const rationales: Record<string, string> = {}
  for (const it of ITEMS) if (p[it]?.rationale) rationales[it] = p[it]!.rationale!
  const slug = institutionOf(d.code).slug
  const list = byInstitution.get(slug) ?? []
  list.push({ code: d.code, adaptiveness: p.adaptiveness, rationales })
  byInstitution.set(slug, list)
}

/** The Melbourne median every other cohort is placed against (v3.1 §10a rule 2). */
const metaSrc = readFileSync(
  path.join(ROOT, 'compass/app/src/compass/v4/data/v4Meta.ts'),
  'utf8',
)
const medianMatch = metaSrc.match(/"adaptMedian":\s*([\d.]+)/)
const adaptMedian = medianMatch ? parseFloat(medianMatch[1]) : null

const errors: string[] = []
const rows: string[] = []

for (const [slug, recs] of [...byInstitution.entries()].sort()) {
  const name = institutionOf(recs[0].code).name
  const published = isPublished(recs[0].code)
  const fatal = published || ALL

  // 6. Distinctness: no single rationale may cover more than MAX_SHARE of the cohort.
  let worstItem = ''
  let worstShare = 0
  for (const it of ITEMS) {
    const counts = new Map<string, number>()
    let n = 0
    for (const r of recs) {
      const t = r.rationales[it]
      if (!t) continue
      n++
      counts.set(t, (counts.get(t) ?? 0) + 1)
    }
    if (!n) continue
    const top = Math.max(...counts.values())
    const share = top / n
    if (share > worstShare) {
      worstShare = share
      worstItem = it
    }
  }

  // 7. Range: the cohort must span below the median it is placed against.
  const below =
    adaptMedian === null ? null : recs.filter((r) => r.adaptiveness < adaptMedian).length

  rows.push(
    `${name.padEnd(38)} n=${String(recs.length).padStart(5)}  ` +
      `top-${worstItem || '--'} ${(worstShare * 100).toFixed(1).padStart(5)}%  ` +
      `below median ${below === null ? '  ?' : String(below).padStart(4)}  ` +
      (published ? 'published' : 'quarantined'),
  )

  if (recs.length < MIN_COHORT) continue

  if (worstShare > MAX_SHARE) {
    const msg =
      `${name}: one ${worstItem} rationale covers ${(worstShare * 100).toFixed(1)}% of ` +
      `${recs.length} programs (limit ${(MAX_SHARE * 100).toFixed(0)}%) — this is template ` +
      `output, not scoring. See docs/dfva-national-expansion-spec.md.`
    if (fatal) errors.push(msg)
  }

  if (below === 0 && adaptMedian !== null) {
    const msg =
      `${name}: no program of ${recs.length} scores below the reference median ` +
      `(${adaptMedian}) on adaptiveness — the cohort has not been discriminated, and every ` +
      `program would publish in the high-adaptiveness half.`
    if (fatal) errors.push(msg)
  }
}

console.log(rows.join('\n'))

if (errors.length) {
  console.error(`\n❌ v4 distinctness: ${errors.length} problem(s)\n`)
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}
console.log('\n✓ dfva-v4-distinctness: every published cohort is discriminated.')
