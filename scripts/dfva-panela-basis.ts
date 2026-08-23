/**
 * Panel A destination basis — the ONE resolver that gives a program its
 * Destination AI Exposure (Felten AIOE, min–max rescaled 0–100).
 *
 * Shared by scripts/dfva-v4-gen.ts (produces the values) and
 * scripts/dfva-panela-coverage-check.ts (guards them), so the two cannot drift
 * the way they did before 2026-08-22 (the generator had lost the `all`-key
 * fallback and the pooled-majors rule that the v3 generator still applied).
 *
 * Method: docs/dfva-v4-panela-basis.md. Every tier runs the identical
 * computation — distinct destination titles → O*NET-SOC 2010 via the crosswalk
 * → published AIOE value → unweighted mean, 2 dp. What differs between tiers is
 * only WHICH destination distribution stands for the program, and that is
 * recorded on the value as `basis` so an estimate never reads as a measurement.
 *
 * Resolution order (first tier yielding ≥1 title wins):
 *   exact    own JIR record (normalised-name match)
 *   variant  "(Enhanced)" / "(Extended)" / "Internship" / "in X" stripped → parent record
 *   pooled   no own record but "<name> (…)" major records exist → union of all of them
 *   combined "A/B" double degree → components resolved by the tiers above, unioned
 *   cognate | partial   curated borrow from a related program (panela_basis_overrides.json)
 *   field    JSA HEO occupation list for the program's ASCED field (the only tier with shares)
 *
 * An unmapped title never yields a subset mean: the resolver throws
 * UnmappedTitlesError carrying the titles, and the caller decides whether that
 * is a build failure (generator) or a report (guard).
 */
import { readFileSync, existsSync } from 'node:fs'
import * as path from 'node:path'

export const REPO_ROOT = path.resolve(__dirname, '..')

export const INDEX_VARIANT = 'AIOE-2021' as const
export const PANELA_BASIS_VERSION = '1.0' as const

/** Same three sources, same precedence, as the v3 generator. Last wins. */
export const CROSSWALK_SOURCES = [
  'data/aioe/reconciliation/reconcile_C_authoritative_288_index.csv',
  'data/aioe/reconciliation/v2_panelA_new_occupation_crosswalk.csv',
  'data/aioe/v31_extension_crosswalk.csv',
] as const

export const OVERRIDES_PATH = 'data/aioe/panela_basis_overrides.json'
export const REFUSED_PATH = 'data/aioe/crosswalk-refused.json'
export const SCOPED_CROSSWALK_PATH = 'data/aioe/program_scoped_crosswalk.csv'
export const JSA_FIELDS_PATH = 'data/jsa/heo_field_destinations.json'
export const PROGRAM_FIELDS_PATH = 'data/jsa/program_fields.json'

export type PanelATier = 'exact' | 'variant' | 'pooled' | 'combined' | 'cognate' | 'partial' | 'field'
export type PanelAGrain = 'program' | 'program-family' | 'related-program' | 'field'

export const TIER_GRAIN: Record<PanelATier, PanelAGrain> = {
  exact: 'program',
  variant: 'program',
  pooled: 'program-family',
  combined: 'program-family',
  cognate: 'related-program',
  partial: 'related-program',
  field: 'field',
}

export interface PanelABasis {
  tier: PanelATier
  grain: PanelAGrain
  /** The JIR record(s) — or the JSA field — whose destinations stand for the program. */
  sources: { name: string; n: number | null }[]
  /** ASCED field label (field tier only). */
  field?: string
  /** Pooled/combined: the source holding > 60 % of summed n, if any. */
  dominantShare?: { name: string; share: number }
  /** Multi-record tiers: records left out because they carry a title adjudicated
   *  unmappable (data/aioe/crosswalk-refused.json). A refused title is never
   *  dropped from a record — the record is. */
  excludedSources?: { name: string; refusedTitles: string[] }[]
  /** Field tier: share-weighted mean (Felten's aggregation rule). */
  exposureWeighted?: number
  /** Field tier: ANZSCO occupations in the field list adjudicated unmappable and set aside. */
  excludedTitles?: { title: string; share: number | null }[]
  /** Field tier: summed entry-stage share (%) of the occupations the value stands on. */
  coverage?: number
  indexVariant: typeof INDEX_VARIANT
  note?: string
}

export interface PanelAResult {
  exposure: number
  entryExposure: number | null
  jirN: number | null
  nTitles: number
  nMedium: number
  basis: PanelABasis
}

export class UnmappedTitlesError extends Error {
  constructor(
    public readonly code: string,
    public readonly tier: PanelATier,
    public readonly titles: string[],
  ) {
    super(
      `${code}: ${titles.length} unmapped destination title(s) on the ${tier} tier — ` +
        `add to data/aioe/v31_extension_crosswalk.csv:\n` +
        titles.map((t) => `      - ${t}`).join('\n'),
    )
  }
}

// ---------------------------------------------------------------------------
// Inputs
// ---------------------------------------------------------------------------

export function parseCsv(p: string): Record<string, string>[] {
  const text = readFileSync(path.join(REPO_ROOT, p), 'utf8')
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

export interface CrosswalkHit { aioe: number; confidence: string }

export function loadCrosswalk(): Map<string, CrosswalkHit> {
  const xw = new Map<string, CrosswalkHit>()
  for (const p of CROSSWALK_SOURCES) {
    for (const r of parseCsv(p)) {
      const t = (r.occupation || '').trim()
      if (t) xw.set(t, { aioe: parseFloat(r.ai_exposure_index), confidence: r.mapping_confidence || 'high' })
    }
  }
  return xw
}

export interface JirRecord { program: string; n?: number; job_titles?: Record<string, string[]> }

export function loadJir(): JirRecord[] {
  return (JSON.parse(readFileSync(path.join(REPO_ROOT, 'data/jir_data.json'), 'utf8')) as { records: JirRecord[] }).records
}

/** Loose comparison so punctuation or case cannot hide a record (511aa's record
 *  is "Master of Public And International Law", capital "And"). */
export const normProgramName = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]+/g, '')

export interface OverrideEntry { tier: 'exact' | 'cognate' | 'partial'; sources: string[]; note?: string }

export interface JsaFieldDestinations {
  name?: string
  broad?: string
  entry?: { title: string; share: number | null }[]
  early?: { title: string; share: number | null }[]
  senior?: { title: string; share: number | null }[]
}

export interface PanelAContext {
  jir: JirRecord[]
  jirByNorm: Map<string, JirRecord>
  crosswalk: Map<string, CrosswalkHit>
  /** Titles adjudicated as not mappable to one SOC (crosswalk-refused.json). */
  refused: Set<string>
  /** (program code, title) → hit: mappings valid inside one program's record only. */
  scoped: Map<string, CrosswalkHit>
  overrides: Record<string, OverrideEntry>
  jsaFields: Record<string, JsaFieldDestinations>
  /** code → ASCED field code (from data/jsa/program_fields.json). */
  cohortFields: Map<string, string>
}

export function loadPanelAContext(): PanelAContext {
  const jir = loadJir()
  const jirByNorm = new Map(jir.map((r) => [normProgramName(r.program), r]))
  const readJson = <T>(p: string, fallback: T): T => {
    const abs = path.join(REPO_ROOT, p)
    return existsSync(abs) ? (JSON.parse(readFileSync(abs, 'utf8')) as T) : fallback
  }
  const overridesRaw = readJson<{ programs?: Record<string, OverrideEntry> }>(OVERRIDES_PATH, {})
  const refused = new Set(readJson<{ refused?: { title: string }[] }>(REFUSED_PATH, {}).refused?.map((r) => r.title) ?? [])
  const jsaRaw = readJson<{ fields?: Record<string, JsaFieldDestinations> }>(JSA_FIELDS_PATH, {})
  const cohortFields = new Map<string, string>()
  const pf = readJson<{ programs?: Record<string, { field?: string }> }>(PROGRAM_FIELDS_PATH, {})
  for (const [code, p] of Object.entries(pf.programs ?? {})) {
    if (p.field) cohortFields.set(code, p.field)
  }
  const scoped = new Map<string, CrosswalkHit>()
  if (existsSync(path.join(REPO_ROOT, SCOPED_CROSSWALK_PATH))) {
    for (const r of parseCsv(SCOPED_CROSSWALK_PATH)) {
      const t = (r.occupation || '').trim()
      if (t) scoped.set(`${r.program_code.trim().toLowerCase()}\u0000${t}`, { aioe: parseFloat(r.ai_exposure_index), confidence: r.mapping_confidence || 'high' })
    }
  }
  return {
    jir,
    jirByNorm,
    crosswalk: loadCrosswalk(),
    refused,
    scoped,
    overrides: overridesRaw.programs ?? {},
    jsaFields: jsaRaw.fields ?? {},
    cohortFields,
  }
}

// ---------------------------------------------------------------------------
// The computation (identical for every tier)
// ---------------------------------------------------------------------------

interface Title { title: string; entry: boolean; share?: number | null }

/** Package aggregation rule: entry + early_mid + mid_senior, deduplicated,
 *  falling back to the `all` key when the staged lists are empty. */
export function titlesOf(rec: JirRecord): Title[] {
  const jt = rec.job_titles ?? {}
  const out: Title[] = []
  const seen = new Set<string>()
  const staged = (['entry', 'early_mid', 'mid_senior'] as const).some((k) => (jt[k] ?? []).length > 0)
  const stages: [string, boolean][] = staged
    ? [['entry', true], ['early_mid', false], ['mid_senior', false]]
    : [['all', false]]
  for (const [stage, entry] of stages) {
    for (const t of jt[stage] ?? []) {
      if (seen.has(t)) continue
      seen.add(t)
      out.push({ title: t, entry })
    }
  }
  return out
}

/** Union across records: a title in several records counts once; it is
 *  entry-stage if it is entry-stage in any of them. */
function unionTitles(recs: JirRecord[]): Title[] {
  const byTitle = new Map<string, Title>()
  for (const rec of recs) {
    for (const t of titlesOf(rec)) {
      const e = byTitle.get(t.title)
      if (e) e.entry = e.entry || t.entry
      else byTitle.set(t.title, { ...t })
    }
  }
  return [...byTitle.values()]
}

const round2 = (x: number) => Math.round(x * 100) / 100
const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length

/** Program-scoped row first, then the global crosswalk. */
export function lookup(code: string, title: string, ctx: PanelAContext, field?: string): CrosswalkHit | undefined {
  return (
    ctx.scoped.get(`${code.toLowerCase()}\u0000${title}`) ??
    (field ? ctx.scoped.get(`field:${field}\u0000${title}`) : undefined) ??
    ctx.crosswalk.get(title)
  )
}

function compute(code: string, titles: Title[], ctx: PanelAContext, basis: PanelABasis, jirN: number | null): PanelAResult {
  const unmapped = titles.filter((t) => !lookup(code, t.title, ctx, basis.field)).map((t) => t.title)
  if (unmapped.length) throw new UnmappedTitlesError(code, basis.tier, unmapped)
  const vals = titles.map((t) => ({ ...t, ...lookup(code, t.title, ctx, basis.field)! }))
  const entry = vals.filter((v) => v.entry)
  const weighted = vals.filter((v) => typeof v.share === 'number' && v.share! > 0)
  if (weighted.length === vals.length && vals.length) {
    const w = weighted.reduce((a, v) => a + v.share!, 0)
    basis.exposureWeighted = round2(weighted.reduce((a, v) => a + v.aioe * v.share!, 0) / w)
  }
  return {
    exposure: round2(mean(vals.map((v) => v.aioe))),
    entryExposure: entry.length ? round2(mean(entry.map((v) => v.aioe))) : null,
    jirN,
    nTitles: vals.length,
    nMedium: vals.filter((v) => v.confidence !== 'high').length,
    basis,
  }
}

function sumN(recs: JirRecord[]): number | null {
  const ns = recs.map((r) => r.n).filter((n): n is number => typeof n === 'number')
  return ns.length ? ns.reduce((a, b) => a + b, 0) : null
}

function dominant(recs: JirRecord[]): PanelABasis['dominantShare'] | undefined {
  const total = sumN(recs)
  if (!total || recs.length < 2) return undefined
  const top = recs.reduce((a, b) => ((b.n ?? 0) > (a.n ?? 0) ? b : a))
  const share = (top.n ?? 0) / total
  return share > 0.6 ? { name: top.program, share: Math.round(share * 100) / 100 } : undefined
}

const sourcesOf = (recs: JirRecord[]) => recs.map((r) => ({ name: r.program, n: r.n ?? null }))

// ---------------------------------------------------------------------------
// Tiers
// ---------------------------------------------------------------------------

function findExact(name: string, ctx: PanelAContext): JirRecord | undefined {
  return ctx.jir.find((r) => r.program === name) ?? ctx.jirByNorm.get(normProgramName(name))
}

/** Parent names a variant could reduce to, most specific first. */
export function variantParents(name: string): string[] {
  const out: string[] = []
  const push = (s: string) => { s = s.replace(/\s+/g, ' ').trim(); if (s && s !== name && !out.includes(s)) out.push(s) }
  // "(Enhanced)", "(Extended)", "(… Internship)" and any other parenthetical
  push(name.replace(/\s*\([^()]*\)\s*$/, ''))
  // "Master of Teaching (Secondary) Internship"
  push(name.replace(/\s+Internship\s*$/i, ''))
  // "Master of Education in Evidence-Based Teaching"
  push(name.replace(/\s+in\s+.+$/i, ''))
  return out
}

function findPooled(name: string, ctx: PanelAContext): JirRecord[] {
  const prefix = normProgramName(name)
  return ctx.jir.filter((r) => /\(/.test(r.program) && normProgramName(r.program.split('(')[0]) === prefix)
}

type Resolved = { recs: JirRecord[]; tier: PanelATier; note?: string; excluded?: { name: string; refusedTitles: string[] }[] }

/**
 * Refused titles (crosswalk-refused.json) can never map, so a record carrying
 * one can never clear. Rather than stall the program on that tier forever, the
 * record is set aside — recorded on the basis, never silently — and the tier
 * stands on the remaining records, or falls through when none remain.
 */
function withoutRefused(code: string, recs: JirRecord[], ctx: PanelAContext): { recs: JirRecord[]; excluded: { name: string; refusedTitles: string[] }[] } {
  const excluded: { name: string; refusedTitles: string[] }[] = []
  const kept = recs.filter((r) => {
    const refusedTitles = titlesOf(r).map((t) => t.title).filter((t) => ctx.refused.has(t) && !ctx.scoped.has(`${code.toLowerCase()}\u0000${t}`))
    if (refusedTitles.length) excluded.push({ name: r.program, refusedTitles })
    return !refusedTitles.length
  })
  return { recs: kept, excluded }
}

function finish(code: string, r: Resolved | null, ctx: PanelAContext): Resolved | null {
  if (!r) return null
  const { recs, excluded } = withoutRefused(code, r.recs, ctx)
  if (!recs.length) return null
  return { ...r, recs, ...(excluded.length ? { excluded } : {}) }
}

/** Own-distribution tiers only (exact → variant → pooled). */
function resolveOwn(code: string, name: string, ctx: PanelAContext): Resolved | null {
  const exact = findExact(name, ctx)
  if (exact && titlesOf(exact).length) {
    const r = finish(code, { recs: [exact], tier: 'exact' }, ctx)
    if (r) return r
  }
  for (const parent of variantParents(name)) {
    const rec = findExact(parent, ctx)
    if (rec && titlesOf(rec).length) {
      const r = finish(code, { recs: [rec], tier: 'variant', note: `variant of "${rec.program}"` }, ctx)
      if (r) return r
    }
  }
  // Pooled on the name itself, then on its variant parents: "Master of
  // Teaching (Early Childhood)" has no record and no parent record, but the
  // parent's family "Master of Teaching (…)" does.
  for (const stem of [name, ...variantParents(name)]) {
    const pooled = findPooled(stem, ctx).filter((r) => titlesOf(r).length)
    if (pooled.length) {
      const r = finish(code, { recs: pooled, tier: 'pooled', note: `union of ${pooled.length} "${stem} (…)" records` }, ctx)
      if (r) return r
    }
  }
  return null
}

function resolveCombined(code: string, name: string, ctx: PanelAContext): Resolved | null {
  const parts = name.split('/').map((s) => s.trim()).filter(Boolean)
  if (parts.length < 2) return null
  const recs: JirRecord[] = []
  const notes: string[] = []
  for (const part of parts) {
    const r = resolveOwn(code, part, ctx)
    if (!r) return null
    recs.push(...r.recs)
    notes.push(`${part} (${r.tier})`)
  }
  return finish(code, { recs, tier: 'combined', note: `components: ${notes.join(' ∪ ')}` }, ctx)
}

function resolveOverride(code: string, ctx: PanelAContext): Resolved | null {
  const o = ctx.overrides[code]
  if (!o) return null
  const recs = o.sources.map((s) => {
    const r = findExact(s, ctx)
    if (!r) throw new Error(`${code}: override source "${s}" is not a JIR record`)
    return r
  })
  return finish(code, { recs, tier: o.tier, note: o.note }, ctx)
}

function resolveField(code: string, ctx: PanelAContext): PanelAResult | null {
  const field = ctx.cohortFields.get(code)
  if (!field) return null
  const f = ctx.jsaFields[field]
  if (!f) throw new Error(`${code}: field "${field}" is not in ${JSA_FIELDS_PATH}`)
  if (!(f as { name?: string }).name) throw new Error(`${code}: field "${field}" has no name`)
  const byTitle = new Map<string, Title>()
  const add = (list: JsaFieldDestinations['entry'], entry: boolean) => {
    for (const d of list ?? []) {
      const e = byTitle.get(d.title)
      if (e) { e.entry = e.entry || entry; if (entry) e.share = d.share }
      else byTitle.set(d.title, { title: d.title, entry, share: d.share })
    }
  }
  // Shares are taken from the entry-stage list (the graduate's first destination);
  // a title only present at later stages keeps the share of the list it came from.
  add(f.senior, false); add(f.early, false); add(f.entry, true)
  // A refused ANZSCO occupation (two-SOC residuals, military codes absent from
  // Felten…) is set aside rather than guessed; the share it carried is reported
  // so the reader sees how much of the field's distribution the value stands on.
  const all = [...byTitle.values()]
  const excluded = all.filter((t) => ctx.refused.has(t.title) && !ctx.scoped.has(`${code.toLowerCase()}\u0000${t.title}`) && !ctx.scoped.has(`field:${field}\u0000${t.title}`))
  const titles = all.filter((t) => !excluded.includes(t))
  if (!titles.length) return null
  const entryShare = (ts: Title[]) => ts.filter((t) => t.entry).reduce((a, t) => a + (t.share ?? 0), 0)
  const basis: PanelABasis = {
    tier: 'field',
    grain: 'field',
    sources: [{ name: `JSA HEO · ${field} ${(f as { name?: string }).name ?? ''}`.trim(), n: null }],
    field,
    indexVariant: INDEX_VARIANT,
    coverage: Math.round(entryShare(titles) * 10) / 10,
    note: 'field-of-education occupation list (ATO-linked), not this program\'s own graduates',
    ...(excluded.length ? { excludedTitles: excluded.map((t) => ({ title: t.title, share: t.share ?? null })) } : {}),
  }
  return compute(code, titles, ctx, basis, null)
}

/**
 * Resolve Panel A for one program. Returns null only when no tier applies at
 * all (no JIR basis and no field assigned) — the caller reports that, never
 * hides it. Throws UnmappedTitlesError when a tier applies but a title is
 * missing from the crosswalk.
 */
export function resolvePanelA(code: string, name: string, ctx: PanelAContext): PanelAResult | null {
  const resolved = resolveOwn(code, name, ctx) ?? resolveCombined(code, name, ctx) ?? resolveOverride(code, ctx)
  if (resolved) {
    const { recs, tier, note, excluded } = resolved
    const basis: PanelABasis = {
      tier,
      grain: TIER_GRAIN[tier],
      sources: sourcesOf(recs),
      indexVariant: INDEX_VARIANT,
      ...(note ? { note } : {}),
      ...(excluded ? { excludedSources: excluded } : {}),
    }
    const dom = dominant(recs)
    if (dom) basis.dominantShare = dom
    return compute(code, unionTitles(recs), ctx, basis, sumN(recs))
  }
  return resolveField(code, ctx)
}

/** Field-basis exposure for any code that has a field, regardless of JIR
 *  coverage — used to compute the reference cohort's field-basis median. */
export function fieldExposure(code: string, ctx: PanelAContext): number | null {
  return resolveField(code, ctx)?.exposure ?? null
}

export function median(xs: number[]): number | null {
  if (!xs.length) return null
  const s = [...xs].sort((a, b) => a - b)
  const m = Math.floor(s.length / 2)
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}
