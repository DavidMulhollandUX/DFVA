/**
 * Persist a verified Panel C v4 scoring into dfva/source/evidence/<code>.json.
 *
 * This replaces the "persist" agent in scripts/workflows/v4-score-cohort.js. Every
 * step of that stage is arithmetic on two JSON objects — apply the reviewer's
 * demotions, delete the lines the mechanical check could not find, re-sum the
 * two sub-scales, merge into the evidence file — and a rule an agent follows is
 * weaker than a value it is never allowed to write. After this script no LLM
 * writes to dfva/source/evidence/ in the scoring workflow.
 *
 * Inputs (written by the workflow's Score and Verify stages):
 *   scrapes/v4/pending/<code>.scored.json   {code, panelCv4}   — the Score stage's block
 *   scrapes/v4/pending/<code>.verdict.json  {upheld, reviewed, demotions, unquotable}
 *
 *   npx tsx dfva-v4-persist.ts <code> [--pending <dir>] [--dry-run]
 *
 * Prints the change report as one JSON line: {code, adaptiveness, workplace, gates,
 * ambiguities, items: [{item, before, after}]}. Exits 1 with a one-line reason on
 * any contract violation — the workflow treats that as an unscored program.
 *
 * What this script refuses to decide: the level an item holds after losing a
 * line. That is a rating judgement, so the reviewer must name it in `demotions`
 * (a demotion `to` the current score means "the remaining evidence still holds").
 * It never writes `verified`; dfva-v4-verify-evidence.ts --stamp owns that field.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ALL_V4_ITEMS, V4_VERSION } from '../dfva/source/rubricV4'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export const SCORED_ITEMS = ALL_V4_ITEMS.map((i) => i.id) // C1..C5, W1..W3
const ADAPTIVE = SCORED_ITEMS.filter((id) => id.startsWith('C'))
const WORKPLACE = SCORED_ITEMS.filter((id) => id.startsWith('W'))
const GATES = ['G1', 'G2']

export interface ScoredItem { score: number; rationale: string; evidenceLines: string[] }
export interface Gate { result: 'PASS' | 'FAIL'; rationale: string; evidenceLines: string[] }
export interface PanelCv4 {
  instrument?: string
  adaptiveness: number
  workplace: number
  gates: Record<string, Gate>
  ambiguities?: string[]
  notScoreable?: string[]
  verified?: unknown
  [item: string]: unknown
}
export interface Demotion { item: string; to: number; why: string }
export interface Verdict { upheld: boolean; reviewed: string[]; demotions: Demotion[]; unquotable: string[] }
export interface ItemDelta { item: string; before: number; after: number }
export interface PersistReport {
  code: string
  adaptiveness: number
  workplace: number
  gates: Record<string, Gate>
  ambiguities: string[]
  items: ItemDelta[]
}

const item = (p: PanelCv4, id: string): ScoredItem => p[id] as ScoredItem

/** Apply a verdict to a scored block. Pure; throws with the reason on any violation. */
export function applyVerdict(code: string, scored: PanelCv4, verdict: Verdict): { panel: PanelCv4; report: PersistReport } {
  const panel: PanelCv4 = JSON.parse(JSON.stringify(scored))
  for (const id of SCORED_ITEMS) {
    const it = panel[id] as ScoredItem | undefined
    if (!it || typeof it.score !== 'number' || !Array.isArray(it.evidenceLines))
      throw new Error(`${code}: scored block has no usable ${id}`)
  }
  for (const g of GATES) {
    if (!panel.gates?.[g]) throw new Error(`${code}: scored block has no gate ${g}`)
  }
  const before = Object.fromEntries(SCORED_ITEMS.map((id) => [id, item(panel, id).score]))

  // 1. Delete every unquotable line. Exact string match: the mechanical check
  //    returns the recorded line itself, and a reviewer quoting something else
  //    is naming a line that does not exist.
  const lost = new Set<string>()
  for (const u of verdict.unquotable ?? []) {
    let found = false
    for (const id of [...SCORED_ITEMS, ...GATES]) {
      const holder = GATES.includes(id) ? panel.gates[id] : item(panel, id)
      const n = holder.evidenceLines.length
      holder.evidenceLines = holder.evidenceLines.filter((l) => l !== u)
      if (holder.evidenceLines.length < n) { found = true; lost.add(id) }
    }
    if (!found) throw new Error(`${code}: unquotable line not found in the scored block: "${u.slice(0, 80)}"`)
  }

  // 2. Every scored item that lost a line needs the reviewer's stated level.
  const named = new Set((verdict.demotions ?? []).map((d) => d.item))
  for (const id of lost) {
    if (GATES.includes(id)) {
      const g = panel.gates[id]
      if (g.result === 'PASS' && g.evidenceLines.length === 0)
        throw new Error(`${code}: gate ${id} PASS lost its only evidence — a gate needs a fresh scoring pass, not a rewrite`)
      continue
    }
    if (!named.has(id))
      throw new Error(`${code}: ${id} lost an unquotable line with no demotion naming ${id} — the reviewer states the level, the script does not infer it`)
  }

  // 3. Apply demotions. Never a raise, never a gate, never a move above the block.
  for (const d of verdict.demotions ?? []) {
    if (GATES.includes(d.item)) throw new Error(`${code}: demotion names gate ${d.item}; gates are not demotable here`)
    if (!SCORED_ITEMS.includes(d.item)) throw new Error(`${code}: demotion names unknown item ${d.item}`)
    if (!Number.isInteger(d.to) || d.to < 0 || d.to > 3) throw new Error(`${code}: demotion ${d.item} → ${d.to} is not a level`)
    const cur = item(panel, d.item)
    if (d.to > cur.score) throw new Error(`${code}: demotion would raise ${d.item} ${cur.score}→${d.to}`)
    cur.score = d.to
  }

  // 4. A level above 0 with nothing quoted is a claim with no evidence.
  for (const id of SCORED_ITEMS) {
    const it = item(panel, id)
    if (it.score > 0 && it.evidenceLines.length === 0)
      throw new Error(`${code}: ${id} is at level ${it.score} with no evidence line left`)
  }

  // 5. Sums, instrument, and the field this script never writes.
  panel.adaptiveness = ADAPTIVE.reduce((n, id) => n + item(panel, id).score, 0)
  panel.workplace = WORKPLACE.reduce((n, id) => n + item(panel, id).score, 0)
  panel.instrument = V4_VERSION
  delete panel.verified

  const report: PersistReport = {
    code,
    adaptiveness: panel.adaptiveness,
    workplace: panel.workplace,
    gates: panel.gates,
    ambiguities: panel.ambiguities ?? [],
    items: SCORED_ITEMS.map((id) => ({ item: id, before: before[id], after: item(panel, id).score })),
  }
  return { panel, report }
}

/** New evidence document: the existing one with only panelCv4 replaced. Any
 *  existing `verified` stamp is carried through unchanged — the guard owns it. */
export function mergeEvidence(existing: Record<string, unknown> | null, code: string, panel: PanelCv4): Record<string, unknown> {
  const prior = (existing?.panelCv4 as PanelCv4 | undefined)?.verified
  const next: PanelCv4 = prior !== undefined ? { ...panel, verified: prior } : panel
  if (!existing) return { code, panelCv4: next }
  return { ...existing, code: (existing.code as string | undefined) ?? code, panelCv4: next }
}

function main(): void {
  const argv = process.argv.slice(2)
  const code = argv.find((a) => !a.startsWith('--'))
  const DRY = argv.includes('--dry-run')
  const pending = argv.includes('--pending') ? path.resolve(argv[argv.indexOf('--pending') + 1]) : path.join(ROOT, 'scrapes/v4/pending')
  if (!code) {
    console.error('usage: npx tsx dfva-v4-persist.ts <code> [--pending <dir>] [--dry-run]')
    process.exit(2)
  }
  const scoredPath = path.join(pending, `${code}.scored.json`)
  const verdictPath = path.join(pending, `${code}.verdict.json`)
  for (const p of [scoredPath, verdictPath]) {
    if (!existsSync(p)) { console.error(`${code}: missing ${path.relative(ROOT, p)}`); process.exit(1) }
  }
  const scoredDoc = JSON.parse(readFileSync(scoredPath, 'utf8')) as { code?: string; panelCv4?: PanelCv4 }
  const verdict = JSON.parse(readFileSync(verdictPath, 'utf8')) as Verdict
  if (scoredDoc.code !== code || !scoredDoc.panelCv4) {
    console.error(`${code}: ${path.relative(ROOT, scoredPath)} is not {code: "${code}", panelCv4}`)
    process.exit(1)
  }
  let result: ReturnType<typeof applyVerdict>
  try {
    result = applyVerdict(code, scoredDoc.panelCv4, verdict)
  } catch (e) {
    console.error((e as Error).message)
    process.exit(1)
  }
  const evPath = path.join(ROOT, 'dfva/source/evidence', `${code}.json`)
  const existing = existsSync(evPath) ? (JSON.parse(readFileSync(evPath, 'utf8')) as Record<string, unknown>) : null
  const doc = mergeEvidence(existing, code, result.panel)
  if (!DRY) {
    mkdirSync(path.dirname(evPath), { recursive: true })
    writeFileSync(evPath, `${JSON.stringify(doc, null, 2)}\n`)
  }
  console.log(JSON.stringify(result.report))
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main()
