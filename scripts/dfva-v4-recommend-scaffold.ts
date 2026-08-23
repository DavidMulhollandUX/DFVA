/**
 * Scaffold a `reports/dfva-v4-recommend-<code>.md` from the verified scoring.
 *
 * Everything the recommend template fixes by rule is derived: the header and
 * position basis, the diagnostic table's scores and headroom, §2's verbatim
 * anchor text at each target level, §5's gate guardrails, §6's cumulative
 * arithmetic and the three standing "this does not move a score" rules, and
 * the byte-exact REFERENCES list. The author supplies the market columns, the
 * curriculum actions and the prose.
 *
 *   npx tsx dfva-v4-recommend-scaffold.ts <code> [<code> …]
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ALL_V4_ITEMS, GATES_V4, V4_REFERENCES, V4_VERSION, mdCiteByN } from '../dfva/source/rubricV4'
import { V4_ONLY_PROGRAMS, V4_PANEL_A_BASIS } from '../compass/app/src/compass/v4/data/v4PanelC'
import { V3_PROGRAMS } from '../compass/app/src/compass/v3/data/v3Programs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const A = 'TO BE AUTHORED'

/** Reference number for a citation key. */
const refN = (key: string): number => V4_REFERENCES[key].n

const esc = (s: string) => s.replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ').trim()
const isAdaptive = (id: string) => id.startsWith('C')

function canonicalReferences(): string {
  const tmpl = readFileSync(path.join(repoRoot, 'dfva', 'dist', 'v4', 'recommend-template-v4.md'), 'utf8')
  const block = (tmpl.split(/^## REFERENCES \(canonical\)$/m)[1] ?? '').split('```')[1] ?? ''
  const lines = block.split('\n').filter((l) => /^\d+\. /.test(l))
  if (!lines.length) throw new Error('recommend scaffold: cannot read the canonical REFERENCES list')
  return lines.join('\n')
}

function scaffold(code: string): string {
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
  const heading = `v${V4_VERSION.replace(/-draft$/, '')}`
  const estimated = basis && ['cognate', 'partial', 'field'].includes(basis.tier)

  // Items ranked by headroom, biggest gap first — §1's Priority column.
  const ranked = [...ALL_V4_ITEMS]
    .map((it) => ({ it, score: pc[it.id].score as number, gap: 3 - (pc[it.id].score as number) }))
    .sort((a, b) => b.gap - a.gap || a.it.id.localeCompare(b.it.id))

  const diagRow = (r: (typeof ranked)[number], priority: number) =>
    `| ${r.it.id} ${r.it.name} | ${isAdaptive(r.it.id) ? 'Adaptive' : 'Workplace'} | ${r.score} / 3 | ${r.gap} | ${A} | ${priority} |`

  const adaptiveRanked = ranked.filter((r) => isAdaptive(r.it.id))
  const workplaceRanked = ranked.filter((r) => !isAdaptive(r.it.id))
  const priorityOf = new Map(ranked.map((r, i) => [r.it.id, i + 1]))

  const diagnostic = [
    ...adaptiveRanked.map((r) => diagRow(r, priorityOf.get(r.it.id)!)),
    `| **Adaptive capabilities** | **Adaptive** | **${pc.adaptiveness} / 15** | **${15 - pc.adaptiveness}** | — | — |`,
    ...workplaceRanked.map((r) => diagRow(r, priorityOf.get(r.it.id)!)),
    `| **Workplace practice** | **Workplace** | **${pc.workplace} / 9** | **${9 - pc.workplace}** | — | — |`,
  ].join('\n')

  // §2: one row per level step still available on each item, anchor verbatim.
  const steps: Array<{ id: string; name: string; from: number; to: number; anchor: string; refs: number[] }> = []
  for (const { it, score } of ranked) {
    for (let to = score + 1; to <= 3; to++) {
      steps.push({ id: it.id, name: it.name, from: to - 1, to, anchor: it.levels[to], refs: [] })
    }
  }
  const stepRows = steps
    .map((s) => {
      const item = ALL_V4_ITEMS.find((i) => i.id === s.id)!
      return `| ${s.id} ${s.name} | ${s.from} → ${s.to} | "${esc(s.anchor)}" | ${A} | ${mdCiteByN(item.evidenceBase.map((k) => refN(k)))} |`
    })
    .join('\n')

  const gateRows = GATES_V4.map((g) => {
    const rec = pc.gates?.[g.id]
    return `| ${g.id} ${g.name} | ${rec?.result ?? 'not recorded'} | ${esc(rec?.rationale ?? '—')} | ${A} | ${mdCiteByN(g.evidenceBase.map((k) => refN(k)))} |`
  }).join('\n')

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

*This plan argues from the scored evidence and market data above; it is
interpretation, not observation.*

${A}

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

<!-- AUTHOR:S3 — one row per lever, evidence drawn from reports/dfva-market-${code}.md.
     Confidence is RESTATED from the market report, never re-derived. -->

| Lever | Item | Market evidence | Location in market report | Confidence |
|---|---|---|---|---|
| ${A} | ${A} | ${A} | ${A} | ${A} |

## 4. PRIORITISED INTERVENTIONS — Basis: inferred

<!-- AUTHOR:S4 — P1..Pn, documentation-only fixes first. Effort ∈ low/medium/high;
     Sequence is a term-level ordering. -->

| # | Item | Action | Anchor satisfied | Effort | Sequence | Sources |
|---|---|---|---|---|---|---|
| ${A} | ${A} | ${A} | ${A} | ${A} | ${A} | ${A} |

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

const codes = process.argv.slice(2)
if (!codes.length) {
  console.error('usage: npx tsx dfva-v4-recommend-scaffold.ts <code> [<code> …]')
  process.exit(1)
}
for (const code of codes) {
  const out = path.join(repoRoot, 'reports', `dfva-v4-recommend-${code}.md`)
  if (existsSync(out)) {
    console.log(`skip reports/dfva-v4-recommend-${code}.md — already authored`)
    continue
  }
  writeFileSync(out, scaffold(code), 'utf8')
  console.log(`wrote reports/dfva-v4-recommend-${code}.md`)
}
