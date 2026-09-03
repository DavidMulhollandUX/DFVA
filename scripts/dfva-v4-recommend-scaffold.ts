/**
 * Scaffold a `reports/dfva-v4-recommend-<code>.md` from the verified scoring.
 *
 * Everything the recommend template fixes by rule is derived: the header and
 * position basis, the diagnostic table's scores and headroom, §2's verbatim
 * anchor text at each target level, §5's gate guardrails, §6's cumulative
 * arithmetic and the three standing "this does not move a score" rules, and
 * the byte-exact REFERENCES list. The author supplies the market columns, the
 * curriculum actions and the prose — as a fill object, never as the file.
 *
 *   npx tsx dfva-v4-recommend-scaffold.ts <code> [<code> …]      # unfilled scaffold (skips an existing file)
 *   npx tsx dfva-v4-recommend-scaffold.ts <code> --fill-template  # JSON skeleton + context for the author, to stdout
 *   npx tsx dfva-v4-recommend-scaffold.ts <code> --fill <json>    # render the scaffold with the author's cells (overwrites)
 *
 * A fill key that is missing renders as TO BE AUTHORED, and dfva:report-lint
 * refuses the file while any marker survives — so a partial fill cannot ship.
 * The scaffold is the only writer of the report; an authoring agent writes the
 * fill JSON and runs this script.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ALL_V4_ITEMS, GATES_V4, V4_REFERENCES, V4_VERSION, mdCiteByN } from '../dfva/source/rubricV4'
import { V4_ONLY_PROGRAMS, V4_PANEL_A_BASIS } from '../compass/app/src/compass/v4/data/v4PanelC'
import { V3_PROGRAMS } from '../compass/app/src/compass/v3/data/v3Programs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const A = 'TO BE AUTHORED'

/** The author's cells. Every field is optional; a missing one renders as TO BE AUTHORED. */
export interface RecommendFill {
  /** §1 opening paragraph. */
  preamble?: string
  /** §1 "Market evidence for the gap", keyed by item id (C1 … W3). */
  marketEvidence?: Record<string, string>
  /** §2 "Curriculum action", keyed by "<item>:<to>" (e.g. "C3:2"). */
  actions?: Record<string, string>
  /** §3 rows. */
  alignment?: Array<{ lever: string; item: string; evidence: string; location: string; confidence: string }>
  /** §4 rows, numbered P1..Pn in array order. */
  interventions?: Array<{ item: string; action: string; anchor: string; effort: string; sequence: string; sources: string }>
  /** §5 "Constraint on redesign", keyed by gate id (G1, G2). */
  constraints?: Record<string, string>
}

/** Reference number for a citation key. */
const refN = (key: string): number => V4_REFERENCES[key].n

const esc = (s: string) => s.replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ').trim()
const isAdaptive = (id: string) => id.startsWith('C')
const cell = (v: string | undefined): string => (v && v.trim() ? esc(v) : A)

function canonicalReferences(): string {
  const tmpl = readFileSync(path.join(repoRoot, 'dfva', 'dist', 'v4', 'recommend-template-v4.md'), 'utf8')
  const block = (tmpl.split(/^## REFERENCES \(canonical\)$/m)[1] ?? '').split('```')[1] ?? ''
  const lines = block.split('\n').filter((l) => /^\d+\. /.test(l))
  if (!lines.length) throw new Error('recommend scaffold: cannot read the canonical REFERENCES list')
  return lines.join('\n')
}

interface Program {
  code: string
  name: string
  pc: any
  exposure: number
  basis: any
  estimated: boolean
  ranked: Array<{ it: (typeof ALL_V4_ITEMS)[number]; score: number; gap: number }>
  steps: Array<{ id: string; name: string; from: number; to: number; anchor: string }>
}

function load(code: string): Program {
  const ev = JSON.parse(readFileSync(path.join(repoRoot, 'dfva', 'source', 'evidence', `${code}.json`), 'utf8'))
  const pc = ev.panelCv4
  if (!pc) throw new Error(`${code}: no panelCv4 block`)
  if (pc.instrument !== V4_VERSION) throw new Error(`${code}: instrument "${pc.instrument}" ≠ ${V4_VERSION}`)

  const only = V4_ONLY_PROGRAMS[code]
  const v3 = (V3_PROGRAMS as any[]).find((p) => p.code?.toLowerCase() === code)
  const basis = V4_PANEL_A_BASIS[code]
  const name: string = only?.name ?? v3?.name ?? code.toUpperCase()
  const exposure: number | null = v3?.exposure ?? only?.exposure ?? null
  if (exposure === null) throw new Error(`${code}: no exposure`)
  const estimated = Boolean(basis && ['cognate', 'partial', 'field'].includes(basis.tier))

  // Items ranked by headroom, biggest gap first — §1's Priority column.
  const ranked = [...ALL_V4_ITEMS]
    .map((it) => ({ it, score: pc[it.id].score as number, gap: 3 - (pc[it.id].score as number) }))
    .sort((a, b) => b.gap - a.gap || a.it.id.localeCompare(b.it.id))

  // §2: one row per level step still available on each item, anchor verbatim.
  const steps: Program['steps'] = []
  for (const { it, score } of ranked) {
    for (let to = score + 1; to <= 3; to++) {
      steps.push({ id: it.id, name: it.name, from: to - 1, to, anchor: it.levels[to] })
    }
  }
  return { code, name, pc, exposure, basis, estimated, ranked, steps }
}

/** What the author needs to fill the cells, without reading the 12 KB template. */
export function fillTemplate(code: string): Record<string, unknown> {
  const p = load(code)
  // The workflow agent used to open the evidence file and the market report to
  // check these; the script refuses instead, so the agent reads neither.
  if (!p.pc.verified) throw new Error(`${code}: panelCv4 is not verified — run dfva-v4-verify-evidence.ts --stamp first`)
  if (!existsSync(path.join(repoRoot, 'reports', `dfva-market-${code}.md`)))
    throw new Error(`${code}: reports/dfva-market-${code}.md does not exist — author the market report first`)
  const priorityOf = new Map(p.ranked.map((r, i) => [r.it.id, i + 1]))
  return {
    code,
    preamble: '',
    marketEvidence: Object.fromEntries(p.ranked.map((r) => [r.it.id, ''])),
    actions: Object.fromEntries(p.steps.map((s) => [`${s.id}:${s.to}`, ''])),
    alignment: [],
    interventions: [],
    constraints: Object.fromEntries(GATES_V4.map((g) => [g.id, ''])),
    context: {
      name: p.name,
      exposure: p.exposure,
      basisTier: p.basis?.tier ?? null,
      exposureEstimated: p.estimated,
      adaptiveness: p.pc.adaptiveness,
      workplace: p.pc.workplace,
      items: p.ranked.map((r) => ({
        id: r.it.id,
        name: r.it.name,
        score: r.score,
        headroom: r.gap,
        priority: priorityOf.get(r.it.id),
        rationale: p.pc[r.it.id].rationale,
        sources: mdCiteByN(r.it.evidenceBase.map((k) => refN(k))),
      })),
      steps: p.steps.map((s) => ({ key: `${s.id}:${s.to}`, item: s.id, from: s.from, to: s.to, anchor: s.anchor })),
      gates: GATES_V4.map((g) => ({
        id: g.id,
        name: g.name,
        result: p.pc.gates?.[g.id]?.result ?? 'not recorded',
        rationale: p.pc.gates?.[g.id]?.rationale ?? '',
      })),
      references: Object.values(V4_REFERENCES).map((r) => ({ n: r.n, url: r.url ?? null })),
      rules: [
        'Every action targets a named item\'s NEXT anchor level and cites a named market signal from reports/dfva-market-<code>.md.',
        'Inline citations use the [[n]](url) form with n and url from context.references; plain [n] when there is no url.',
        'This context replaces the evidence file: do not open dfva/source/evidence/. Read only the recommend prompt and the market report.',
        'Options with costs, never directives. No exposure figure unless it is the measured one stated in context.',
        'Number §4 interventions in the order they should land; the # column is assigned by the scaffold.',
      ],
    },
  }
}

function scaffold(code: string, fill: RecommendFill = {}): string {
  const { name, pc, exposure, basis, estimated, ranked, steps } = load(code)
  const heading = `v${V4_VERSION.replace(/-draft$/, '')}`
  const priorityOf = new Map(ranked.map((r, i) => [r.it.id, i + 1]))

  const diagRow = (r: Program['ranked'][number], priority: number) =>
    `| ${r.it.id} ${r.it.name} | ${isAdaptive(r.it.id) ? 'Adaptive' : 'Workplace'} | ${r.score} / 3 | ${r.gap} | ${cell(fill.marketEvidence?.[r.it.id])} | ${priority} |`

  const adaptiveRanked = ranked.filter((r) => isAdaptive(r.it.id))
  const workplaceRanked = ranked.filter((r) => !isAdaptive(r.it.id))

  const diagnostic = [
    ...adaptiveRanked.map((r) => diagRow(r, priorityOf.get(r.it.id)!)),
    `| **Adaptive capabilities** | **Adaptive** | **${pc.adaptiveness} / 15** | **${15 - pc.adaptiveness}** | — | — |`,
    ...workplaceRanked.map((r) => diagRow(r, priorityOf.get(r.it.id)!)),
    `| **Workplace practice** | **Workplace** | **${pc.workplace} / 9** | **${9 - pc.workplace}** | — | — |`,
  ].join('\n')

  const stepRows = steps
    .map((s) => {
      const item = ALL_V4_ITEMS.find((i) => i.id === s.id)!
      return `| ${s.id} ${s.name} | ${s.from} → ${s.to} | "${esc(s.anchor)}" | ${cell(fill.actions?.[`${s.id}:${s.to}`])} | ${mdCiteByN(item.evidenceBase.map((k) => refN(k)))} |`
    })
    .join('\n')

  const gateRows = GATES_V4.map((g) => {
    const rec = pc.gates?.[g.id]
    return `| ${g.id} ${g.name} | ${rec?.result ?? 'not recorded'} | ${esc(rec?.rationale ?? '—')} | ${cell(fill.constraints?.[g.id])} | ${mdCiteByN(g.evidenceBase.map((k) => refN(k)))} |`
  }).join('\n')

  const alignmentRows = fill.alignment?.length
    ? fill.alignment.map((r) => `| ${cell(r.lever)} | ${cell(r.item)} | ${cell(r.evidence)} | ${cell(r.location)} | ${cell(r.confidence)} |`).join('\n')
    : `| ${A} | ${A} | ${A} | ${A} | ${A} |`
  const alignmentNote = fill.alignment?.length
    ? ''
    : `<!-- AUTHOR:S3 — one row per lever, evidence drawn from reports/dfva-market-${code}.md.
     Confidence is RESTATED from the market report, never re-derived. -->

`
  const interventionRows = fill.interventions?.length
    ? fill.interventions
        .map((r, i) => `| P${i + 1} | ${cell(r.item)} | ${cell(r.action)} | ${cell(r.anchor)} | ${cell(r.effort)} | ${cell(r.sequence)} | ${cell(r.sources)} |`)
        .join('\n')
    : `| ${A} | ${A} | ${A} | ${A} | ${A} | ${A} | ${A} |`
  const interventionNote = fill.interventions?.length
    ? ''
    : `<!-- AUTHOR:S4 — P1..Pn, documentation-only fixes first. Effort ∈ low/medium/high;
     Sequence is a term-level ordering. -->

`

  // §6 table 1: cumulative sub-scale totals as each step lands, in §1 priority order.
  let cumA = pc.adaptiveness
  let cumW = pc.workplace
  const deltaRows = steps
    .map((s, i) => {
      if (isAdaptive(s.id)) cumA += 1
      else cumW += 1
      return `| P${i + 1} | ${s.id} | ${s.from} | ${s.to} | +1 ${isAdaptive(s.id) ? 'adaptive' : 'workplace'} | ${cumA} / 15 | ${cumW} / 9 |`
    })
    .join('\n')

  const nonMovers = `| Rewriting a course or subject learning outcome to name the capability | An outcome statement is not assessment evidence; the item stays at the level its assessed evidence supports | R2 (level 3 needs assessment evidence); Barrie on stated attributes ${mdCiteByN([33])} | ${mdCiteByN([33])} |
| Relabelling an existing task "authentic", "real-world" or "industry-relevant" | W2 is scored from documented task features against the discipline's criterion situation, never from the label | R4; Gulikers et al. ${mdCiteByN([22])}; Fawns et al. on the label as a thought-terminating cliché ${mdCiteByN([24])} | ${mdCiteByN([22])}${mdCiteByN([24])} |
| Adding or promoting an elective that would satisfy the anchor | Every level-2 and level-3 anchor in this instrument requires CORE placement; an elective leaves the cohort's guaranteed curriculum unchanged | Anchor wording ("core unit", "required"); the cohort-wide reading of HESF 1.4.3 ${mdCiteByN([19])} | ${mdCiteByN([19])} |`

  const basisNote = estimated
    ? `\n>\n> The exposure value is an **estimate**: it rests on a ${basis!.tier} basis (${basis!.sources
        .map((s: any) => s.name)
        .join(' ∪ ')}), not on this program's own graduates. It is sound enough to say the destinations are highly exposed and not sound enough to rank this program against a peer on exposure alone — see [the estimated-basis methods note](../docs/dfva-panela-estimated-basis-methods.md).`
    : ''

  return `# DFVA v4 IMPROVEMENT PLAN: ${name} (${code.toUpperCase()})

**Instrument:** DFVA ${V4_VERSION} — Panel C ${heading} on the TEQSA adaptive capabilities ${mdCiteByN([1])} and the HESF generic and employment-related learning outcomes ${mdCiteByN([19])}
**Assessment date:** ${pc.verified?.date ?? 'unrecorded'} · **Derived from:** the verified panelCv4 scoring + reports/dfva-market-${code}.md
**Position basis:** Destination AI Exposure ${exposure.toFixed(2)} (${basis?.tier ?? 'unrecorded'} basis) × Curriculum Adaptiveness ${pc.adaptiveness}/15 (${heading} draft, sub-scale A) · Workplace practice ${pc.workplace}/9 (sub-scale W, reported beside the axis, not in it) — no v1 composite

> Citation marks in the Sources columns refer to the numbered list in
> [References](#references); full citations are given there and not repeated in
> the body.${basisNote}

## 1. DIAGNOSTIC SUMMARY — Basis: inferred

*This plan argues from the preceding scored evidence and market data; it is
interpretation, not observation.*

${fill.preamble?.trim() ? fill.preamble.trim() : A}

| Item | Sub-scale | Score | Levels below maximum | Market evidence for the gap | Priority |
|---|---|---|---|---|---|
${diagnostic}

Priority orders items by size of gap. The P-numbers in the tables that follow are a
different ordering — sequenced by effort and dependency — so an item's priority and its
P-number do not correspond.

## 2. SCORE-TO-ACTION MAP — Basis: inferred

| Item | Now → target | Anchor requirement at the target level (verbatim) | Curriculum action | Sources |
|---|---|---|---|---|
${stepRows}

## 3. MARKET ALIGNMENT — Basis: reported → inferred

${alignmentNote}| Lever | Item | Market evidence | Location in market report | Confidence |
|---|---|---|---|---|
${alignmentRows}

## 4. PRIORITISED INTERVENTIONS — Basis: inferred

${interventionNote}| # | Item | Action | Anchor satisfied | Effort | Sequence | Sources |
|---|---|---|---|---|---|---|
${interventionRows}

## 5. GATE GUARDRAILS — Basis: scored

| Gate | Status | Evidence carrying the gate | Constraint on redesign | Sources |
|---|---|---|---|---|
${gateRows}

## 6. WHAT WOULD CHANGE THE SCORE — Basis: inferred

Each row assumes the rows above it have landed; the cumulative columns are the two
sub-scales tracked separately, never summed.

| Lever | Item | From | To | Change | Cumulative adaptive | Cumulative workplace |
|---|---|---|---|---|---|---|
${deltaRows}

What does **not** move a score:

| Change | Why it does not move a score | Governing rule | Sources |
|---|---|---|---|
${nonMovers}

## REFERENCES

${canonicalReferences()}
`
}

function main(): void {
  const argv = process.argv.slice(2)
  const fillPath = argv.includes('--fill') ? argv[argv.indexOf('--fill') + 1] : null
  const codes = argv.filter((a) => !a.startsWith('--') && a !== fillPath)
  const TEMPLATE = argv.includes('--fill-template')
  if (!codes.length) {
    console.error('usage: npx tsx dfva-v4-recommend-scaffold.ts <code> [<code> …] [--fill-template | --fill <json>]')
    process.exit(1)
  }
  if (TEMPLATE) {
    try {
      console.log(JSON.stringify(fillTemplate(codes[0]), null, 2))
    } catch (e) {
      console.error(`skipped: ${(e as Error).message}`)
      process.exit(2)
    }
    return
  }
  if (fillPath) {
    if (codes.length !== 1) throw new Error('--fill takes exactly one code')
    const fill = JSON.parse(readFileSync(path.resolve(fillPath), 'utf8')) as RecommendFill
    const out = path.join(repoRoot, 'reports', `dfva-v4-recommend-${codes[0]}.md`)
    writeFileSync(out, scaffold(codes[0], fill), 'utf8')
    console.log(`wrote reports/dfva-v4-recommend-${codes[0]}.md from ${fillPath}`)
    return
  }
  for (const code of codes) {
    const out = path.join(repoRoot, 'reports', `dfva-v4-recommend-${code}.md`)
    if (existsSync(out)) {
      console.log(`skip reports/dfva-v4-recommend-${code}.md — already authored (use --fill to re-render)`)
      continue
    }
    writeFileSync(out, scaffold(code), 'utf8')
    console.log(`wrote reports/dfva-v4-recommend-${code}.md`)
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main()
