/**
 * Panel A basis audit over the whole v4 cohort (reference + extension).
 * Run: npx tsx scripts/dfva-panela-audit.ts [--json out.json]
 *
 * Prints, per program, the tier it resolves to; collects every unmapped
 * destination title (the crosswalk backlog) and every program with no tier
 * (needs an override or a field). Read-only.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import * as path from 'node:path'
import { REPO_ROOT, UnmappedTitlesError, loadPanelAContext, resolvePanelA } from './dfva-panela-basis'

const ctx = loadPanelAContext()
const ext = JSON.parse(readFileSync(path.join(REPO_ROOT, 'scripts/v4_cohort_ext.json'), 'utf8')) as { code: string; name: string }[]
const ref = JSON.parse(readFileSync(path.join(REPO_ROOT, 'scripts/v4_cohort.json'), 'utf8')) as { code: string; name: string }[]
const excl = JSON.parse(readFileSync(path.join(REPO_ROOT, 'scripts/v4_cohort_ext_exclusions.json'), 'utf8')) as { excludedResearch?: string[] }
const research = new Set(excl.excludedResearch ?? [])

const tiers: Record<string, string[]> = {}
const unmapped = new Map<string, string[]>() // title → codes
const noBasis: { code: string; name: string }[] = []
const rows: { code: string; name: string; tier: string | null; exposure: number | null; sources?: string[] }[] = []

for (const p of [...ref, ...ext]) {
  if (research.has(p.code)) continue
  try {
    const r = resolvePanelA(p.code, p.name, ctx)
    if (!r) { noBasis.push(p); rows.push({ code: p.code, name: p.name, tier: null, exposure: null }); continue }
    ;(tiers[r.basis.tier] ??= []).push(p.code)
    rows.push({ code: p.code, name: p.name, tier: r.basis.tier, exposure: r.exposure, sources: r.basis.sources.map((s) => s.name) })
  } catch (e) {
    if (!(e instanceof UnmappedTitlesError)) throw e
    ;(tiers[`${e.tier} (unmapped)`] ??= []).push(p.code)
    rows.push({ code: p.code, name: p.name, tier: `${e.tier}*`, exposure: null })
    for (const t of e.titles) (unmapped.get(t) ?? unmapped.set(t, []).get(t)!).push(p.code)
  }
}

for (const r of rows) console.log(`${r.code.padEnd(12)} ${(r.tier ?? 'NONE').padEnd(12)} ${r.exposure ?? '—'}  ${r.name}${r.sources ? '  ← ' + r.sources.slice(0, 3).join(' ∪ ') + (r.sources.length > 3 ? ` (+${r.sources.length - 3})` : '') : ''}`)
console.log('\nTier counts:', Object.fromEntries(Object.entries(tiers).map(([k, v]) => [k, v.length])))
console.log(`No basis (${noBasis.length}):`, noBasis.map((p) => p.code).join(' '))
console.log(`Unmapped titles: ${unmapped.size}`)

const out = process.argv.indexOf('--json')
if (out > -1 && process.argv[out + 1]) {
  writeFileSync(process.argv[out + 1], JSON.stringify({ rows, noBasis, unmapped: [...unmapped.entries()].map(([title, codes]) => ({ title, codes })) }, null, 2))
}
