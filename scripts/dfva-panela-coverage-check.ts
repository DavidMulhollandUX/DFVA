/**
 * Panel A coverage guard — stops a program being reported as having no alumni
 * destination record when it has one.
 *
 * Run: npx tsx dfva-panela-coverage-check.ts   (wired into `dfva:check`)
 *
 * WHY THIS EXISTS (2026-08-14). MC-MGMTHRE was scored, published to the dev
 * site, and its report stated "no alumni destination record exists for this
 * program". It had one. Two independent things caused that:
 *
 *   1. WRONG SOURCE. The absence was checked against `data/labour-evidence.json`
 *      (41 programs, an enrichment layer) instead of `data/jir_data.json` (141
 *      records, the Panel A source of record). A program absent from the first
 *      and present in the second reads as "no record" and is not.
 *
 *   2. UNMAPPED TITLES. Even once found, 13 of its 15 destination titles were
 *      absent from the crosswalk, so the record yielded almost nothing and
 *      looked empty in a second, more convincing way.
 *
 * The second cause is not rare: at the time of writing 82 of 141 JIR records
 * carry at least one unmapped title and several carry none that are mapped. So
 * the next program to hit this is not hypothetical — it is most of them.
 *
 * Both failures are silent and both run one way: they only ever make a program
 * look less evidenced than it is. This check makes them loud.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import * as path from 'node:path'

const ROOT = path.resolve(__dirname, '..')

function parseCsv(p: string): Record<string, string>[] {
  const text = readFileSync(path.join(ROOT, p), 'utf8')
  const rows: string[][] = []
  let row: string[] = [], field = '', inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ } else inQuotes = false
      } else field += c
    } else if (c === '"') inQuotes = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n' || c === '\r') {
      if (field !== '' || row.length) { row.push(field); rows.push(row); row = []; field = '' }
      if (c === '\r' && text[i + 1] === '\n') i++
    } else field += c
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row) }
  const [header, ...body] = rows
  return body.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])))
}

const CROSSWALKS = [
  'data/aioe/reconciliation/reconcile_C_authoritative_288_index.csv',
  'data/aioe/reconciliation/v2_panelA_new_occupation_crosswalk.csv',
  'data/aioe/v31_extension_crosswalk.csv',
]
const crosswalk = new Set<string>()
for (const p of CROSSWALKS) for (const r of parseCsv(p)) {
  const t = (r.occupation || '').trim()
  if (t) crosswalk.add(t)
}

interface JirRecord { program: string; n?: number; job_titles?: Record<string, string[]> }
const jir = (JSON.parse(readFileSync(path.join(ROOT, 'data/jir_data.json'), 'utf8')) as { records: JirRecord[] }).records

/** Destination titles for a record: entry + early_mid + mid_senior, deduped. */
function titlesOf(rec: JirRecord): string[] {
  const out: string[] = [], seen = new Set<string>()
  for (const stage of ['entry', 'early_mid', 'mid_senior']) {
    for (const t of rec.job_titles?.[stage] ?? []) if (!seen.has(t)) { seen.add(t); out.push(t) }
  }
  return out
}

/** Loose comparison so a punctuation or case difference cannot hide a record. */
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '')
const jirByNorm = new Map(jir.map((r) => [norm(r.program), r]))

const errors: string[] = []
const notes: string[] = []

// --- which codes already have Panel A through the v3 pipeline ----------------
const v3Src = readFileSync(path.join(ROOT, 'compass/app/src/compass/v3/data/v3Programs.ts'), 'utf8')
const v3Codes = new Set([...v3Src.matchAll(/"code": "([a-z0-9-]+)"/g)].map((m) => m[1]))

// --- the v4-only programs and the exposure the generator gave them -----------
const v4Src = readFileSync(path.join(ROOT, 'compass/app/src/compass/v4/data/v4PanelC.ts'), 'utf8')
const v4OnlyBlock = v4Src.match(/export const V4_ONLY_PROGRAMS: Record<string, V4OnlyProgram> = (\{[\s\S]*?\n\});/)
const v4Only: Record<string, { code: string; name: string; exposure: number | null; nTitles: number | null }> =
  v4OnlyBlock ? JSON.parse(v4OnlyBlock[1]) : {}

// --- every program carrying a v4 score --------------------------------------
const evidenceDir = path.join(ROOT, 'dfva/source/evidence')
const scored: string[] = []
for (const f of readdirSync(evidenceDir)) {
  if (!f.endsWith('.json')) continue
  const d = JSON.parse(readFileSync(path.join(evidenceDir, f), 'utf8')) as { code?: string; panelCv4?: unknown }
  if (d.panelCv4 && d.code) scored.push(d.code)
}

for (const code of scored.sort()) {
  if (v3Codes.has(code)) continue // Panel A comes from the v3 generator, guarded there
  const entry = v4Only[code]
  if (!entry) {
    errors.push(`${code}: has a panelCv4 block but no V4_ONLY_PROGRAMS entry — run dfva:gen-v4`)
    continue
  }
  const rec = jir.find((r) => r.program === entry.name) ?? jirByNorm.get(norm(entry.name))

  // Cause 1: a record exists but the program reports no exposure.
  if (rec && entry.exposure === null) {
    errors.push(
      `${code} ("${entry.name}") reports NO exposure, but data/jir_data.json holds a record ` +
      `"${rec.program}" (n=${rec.n ?? '?'}, ${titlesOf(rec).length} titles). ` +
      `Absence of alumni data must be checked against jir_data.json — labour-evidence.json ` +
      `covers only a subset and is not evidence that no record exists.`,
    )
    continue
  }

  if (!rec) {
    notes.push(`${code} ("${entry.name}"): no JIR record under that name — Panel C only, correctly.`)
    continue
  }

  // Cause 2: the exposure was computed over fewer titles than the record holds,
  // which can only happen by dropping unmapped ones.
  const titles = titlesOf(rec)
  const unmapped = titles.filter((t) => !crosswalk.has(t))
  if (unmapped.length) {
    errors.push(
      `${code} ("${entry.name}"): ${unmapped.length} of ${titles.length} destination titles are ` +
      `not in the crosswalk, so its exposure is computed over a subset — a different statistic ` +
      `from the one it will be read as. Map them in data/aioe/v31_extension_crosswalk.csv:\n` +
      unmapped.map((t) => `      - ${t}`).join('\n'),
    )
  } else if (entry.nTitles !== null && entry.nTitles !== titles.length) {
    errors.push(
      `${code}: exposure covers ${entry.nTitles} titles but the JIR record holds ${titles.length}.`,
    )
  }
}

// --- standing backlog, reported but not fatal --------------------------------
// Not an error: these programs are not scored yet, so nothing is being published
// on partial evidence. It is here so the blocker is visible BEFORE someone
// scores one of them and reads the silence as an absence of destinations.
let recordsWithGaps = 0
const worst: { unmapped: number; total: number; program: string }[] = []
for (const r of jir) {
  const t = titlesOf(r)
  if (!t.length) continue
  const u = t.filter((x) => !crosswalk.has(x))
  if (u.length) { recordsWithGaps++; worst.push({ unmapped: u.length, total: t.length, program: r.program }) }
}
worst.sort((a, b) => b.unmapped - a.unmapped)

console.log(`crosswalk: ${crosswalk.size} titles across ${CROSSWALKS.length} sources`)
console.log(`JIR records: ${jir.length}; ${recordsWithGaps} carry at least one unmapped destination title`)
if (worst.length) {
  console.log(`  most affected: ${worst.slice(0, 3).map((w) => `${w.program} (${w.unmapped}/${w.total})`).join(', ')}`)
  console.log(`  these are not failures — none of them is scored. Map before scoring, not after.`)
}
for (const n of notes) console.log(`  note: ${n}`)

if (errors.length) {
  console.error(`\n❌ Panel A coverage check: ${errors.length} problem(s)\n`)
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}
console.log(`✓ dfva-panela-coverage: ${scored.length} v4-scored program(s), no silent exposure gaps.`)
