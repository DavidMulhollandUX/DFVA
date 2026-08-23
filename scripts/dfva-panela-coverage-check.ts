/**
 * Panel A coverage guard — stops a program being reported with no exposure, or
 * with an exposure computed on something other than the basis the resolver
 * assigns it.
 *
 * Run: npx tsx dfva-panela-coverage-check.ts   (wired into `dfva:check`)
 *
 * WHY THIS EXISTS (2026-08-14). MC-MGMTHRE was scored, published to the dev
 * site, and its report stated "no alumni destination record exists for this
 * program". It had one. Two independent things caused that:
 *
 *   1. WRONG SOURCE. The absence was checked against `data/labour-evidence.json`
 *      (41 programs, an enrichment layer) instead of `data/jir_data.json` (141
 *      records, the Panel A source of record).
 *   2. UNMAPPED TITLES. Even once found, 13 of its 15 destination titles were
 *      absent from the crosswalk, so the record yielded almost nothing.
 *
 * Since 2026-08-22 (docs/dfva-v4-panela-basis.md) every cohort program resolves
 * to SOME basis — own record, program family, related program, or the JSA HEO
 * field list — so "no exposure" is never a legitimate published state for a
 * coursework program, and this guard fails on it. The generator and this guard
 * share one resolver (dfva-panela-basis.ts) so they cannot disagree about what
 * a program's basis is; what this guard checks is that the generated module
 * actually carries what the resolver says.
 */
import { readFileSync, readdirSync } from 'node:fs'
import * as path from 'node:path'
import {
  CROSSWALK_SOURCES,
  UnmappedTitlesError,
  loadPanelAContext,
  lookup,
  resolvePanelA,
  titlesOf,
  type PanelABasis,
} from './dfva-panela-basis'

const ROOT = path.resolve(__dirname, '..')
const ctx = loadPanelAContext()

const errors: string[] = []
const notes: string[] = []

// --- which codes already have Panel A through the v3 pipeline ----------------
const v3Src = readFileSync(path.join(ROOT, 'compass/app/src/compass/v3/data/v3Programs.ts'), 'utf8')
const v3Codes = new Set([...v3Src.matchAll(/"?code"?: "([a-z0-9-]+)"/g)].map((m) => m[1]))
const v3Exposure = new Map(
  [...v3Src.matchAll(/code: "([a-z0-9-]+)",[\s\S]*?exposure: ([\d.]+)/g)].map((m) => [m[1], parseFloat(m[2])]),
)

// --- the v4-only programs and the exposure the generator gave them -----------
const v4Src = readFileSync(path.join(ROOT, 'compass/app/src/compass/v4/data/v4PanelC.ts'), 'utf8')
const v4OnlyBlock = v4Src.match(/export const V4_ONLY_PROGRAMS: Record<string, V4OnlyProgram> = (\{[\s\S]*?\n\});/)
interface V4Only { code: string; name: string; exposure: number | null; nTitles: number | null; exposureBasis: PanelABasis | null }
const v4Only: Record<string, V4Only> = v4OnlyBlock ? JSON.parse(v4OnlyBlock[1]) : {}
const metaBlock = v4Src.match(/export const V4_META: V4Meta = (\{[\s\S]*?\n\});/)
const meta = metaBlock ? (JSON.parse(metaBlock[1]) as { expMedianField: number | null }) : { expMedianField: null }

// --- every program carrying a v4 score --------------------------------------
const evidenceDir = path.join(ROOT, 'dfva/source/evidence')
const scored: string[] = []
for (const f of readdirSync(evidenceDir)) {
  if (!f.endsWith('.json')) continue
  const d = JSON.parse(readFileSync(path.join(evidenceDir, f), 'utf8')) as { code?: string; panelCv4?: unknown }
  if (d.panelCv4 && d.code) scored.push(d.code)
}

// --- 1. reference cohort: the resolver must reproduce the published v3 values -
// The v3 values were validated against the reconciliation package; if the
// resolver ever drifts from them, the tiers have changed meaning.
const refNames = JSON.parse(readFileSync(path.join(ROOT, 'scripts/v4_cohort.json'), 'utf8')) as { code: string; name: string }[]
for (const p of refNames) {
  const want = v3Exposure.get(p.code)
  if (want === undefined) continue
  try {
    const r = resolvePanelA(p.code, p.name, ctx)
    if (!r) errors.push(`${p.code}: reference program resolves to no basis (v3 publishes ${want})`)
    else if (Math.abs(r.exposure - want) > 0.011) errors.push(`${p.code}: resolver gives ${r.exposure} (${r.basis.tier}) but v3 publishes ${want} — the tiers have drifted`)
  } catch (e) {
    if (e instanceof UnmappedTitlesError) errors.push(`${p.code}: reference program hits unmapped titles through the resolver:\n${e.message}`)
    else throw e
  }
}

// --- 2. v4-only programs: generated module must match the resolver ---------
let fieldTier = 0
for (const code of scored.sort()) {
  if (v3Codes.has(code)) continue // Panel A comes from the v3 generator, guarded above
  const entry = v4Only[code]
  if (!entry) {
    errors.push(`${code}: has a panelCv4 block but no V4_ONLY_PROGRAMS entry — run dfva:gen-v4`)
    continue
  }
  let r: ReturnType<typeof resolvePanelA> = null
  try {
    r = resolvePanelA(code, entry.name, ctx)
  } catch (e) {
    if (!(e instanceof UnmappedTitlesError)) throw e
    errors.push(e.message)
    continue
  }
  if (!r) {
    errors.push(`${code} ("${entry.name}"): no Panel A basis — add a data/aioe/panela_basis_overrides.json entry or a data/jsa/program_fields.json field`)
    continue
  }
  if (entry.exposure === null || !entry.exposureBasis) {
    errors.push(`${code}: generated module carries no exposure, but the resolver gives ${r.exposure} on the ${r.basis.tier} tier — run dfva:gen-v4`)
    continue
  }
  if (Math.abs(entry.exposure - r.exposure) > 0.011 || entry.exposureBasis.tier !== r.basis.tier) {
    errors.push(`${code}: generated ${entry.exposure} (${entry.exposureBasis.tier}) ≠ resolver ${r.exposure} (${r.basis.tier}) — run dfva:gen-v4`)
  }
  if (entry.nTitles !== r.nTitles) errors.push(`${code}: generated nTitles ${entry.nTitles} ≠ resolver ${r.nTitles}`)
  if (r.basis.tier === 'field') fieldTier++
  if (r.basis.tier !== 'exact') notes.push(`${code}: ${r.basis.tier} basis ← ${r.basis.sources.map((s) => s.name).join(' ∪ ')}`)
  if (r.basis.excludedSources?.length) notes.push(`${code}: excluded ${r.basis.excludedSources.map((x) => `${x.name} (refused: ${x.refusedTitles.join(', ')})`).join('; ')}`)
}
if (fieldTier && meta.expMedianField === null) {
  errors.push(`${fieldTier} field-tier program(s) published but V4_META.expMedianField is null — they cannot be placed`)
}

// --- 3. every JSA field list in use must be fully mapped ---------------------
for (const [code, field] of ctx.cohortFields) {
  const f = ctx.jsaFields[field]
  if (!f) { errors.push(`${code}: field ${field} is not in data/jsa/heo_field_destinations.json`); continue }
  const missing = new Set<string>()
  for (const stage of ['entry', 'early', 'senior'] as const) for (const d of f[stage] ?? []) if (!lookup(code, d.title, ctx, field) && !ctx.refused.has(d.title)) missing.add(d.title)
  if (missing.size) errors.push(`field ${field} (${f.name}) used by ${code}: ${missing.size} ANZSCO title(s) unmapped: ${[...missing].join('; ')}`)
}

// --- standing backlog, reported but not fatal --------------------------------
let recordsWithGaps = 0
const worst: { unmapped: number; total: number; program: string }[] = []
for (const r of ctx.jir) {
  const t = titlesOf(r)
  if (!t.length) continue
  const u = t.filter((x) => !ctx.crosswalk.has(x.title) && !ctx.refused.has(x.title))
  if (u.length) { recordsWithGaps++; worst.push({ unmapped: u.length, total: t.length, program: r.program }) }
}
worst.sort((a, b) => b.unmapped - a.unmapped)

console.log(`crosswalk: ${ctx.crosswalk.size} titles across ${CROSSWALK_SOURCES.length} sources (+${ctx.scoped.size} program-scoped, ${ctx.refused.size} refused)`)
console.log(`JIR records: ${ctx.jir.length}; ${recordsWithGaps} carry at least one unmapped (non-refused) destination title`)
if (worst.length) console.log(`  most affected: ${worst.slice(0, 3).map((w) => `${w.program} (${w.unmapped}/${w.total})`).join(', ')}`)
for (const n of notes) console.log(`  note: ${n}`)

if (errors.length) {
  console.error(`\n❌ Panel A coverage check: ${errors.length} problem(s)\n`)
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}
console.log(`✓ dfva-panela-coverage: ${scored.length} v4-scored program(s), every one on a stated basis; reference cohort reproduces v3.`)
