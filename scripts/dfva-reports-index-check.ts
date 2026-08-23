/**
 * Guard: /reports must show every program that has been scored.
 *
 * The index at https://dev.evidura.ai/reports is derived, not curated —
 * `compass/app/src/compass/v4/reportIndex.ts` marks a program "current" iff
 * `v4PanelCByCode(code)` returns a block, i.e. iff the code is a key of the
 * GENERATED map `compass/app/src/compass/v4/data/v4PanelC.ts`. That map is
 * produced from the `panelCv4` blocks in `dfva/source/evidence/*.json` by
 * `npm --prefix scripts run dfva:gen-v4`.
 *
 * So scoring a program does NOT put it on /reports. Running the generator does.
 * Miss that step and the program stays "archived" — pending a v4 score it
 * already has — and nothing tells you.
 *
 * `dfva-panela-coverage-check.ts` catches this for v4-only programs, but it
 * skips the v3 cohort (`if (v3Codes.has(code)) continue`) because their Panel A
 * comes from the v3 generator. That left the larger half of the portfolio
 * unguarded: a v1-cohort program scored on v4 could sit unscored on the index
 * indefinitely. This check covers every scored program, both cohorts.
 *
 *   npx tsx dfva-reports-index-check.ts
 */
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { V4_PANEL_C, V4_RESEARCH_DEGREES } from '../compass/app/src/compass/v4/data/v4PanelC'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const evidenceDir = path.join(ROOT, 'dfva/source/evidence')

const scored: string[] = []
for (const f of readdirSync(evidenceDir)) {
  if (!f.endsWith('.json')) continue
  const d = JSON.parse(readFileSync(path.join(evidenceDir, f), 'utf8')) as {
    code?: string
    panelCv4?: unknown
  }
  if (d.panelCv4 && d.code) scored.push(d.code)
}

const errors: string[] = []
const published = new Set(Object.keys(V4_PANEL_C))

// 1. Scored but absent from the generated map: /reports still calls it archived.
const stale = scored.filter((c) => !published.has(c)).sort()
for (const code of stale) {
  errors.push(
    `${code}: scored (panelCv4 block present) but missing from V4_PANEL_C, so /reports ` +
      `still shows it as archived — run \`npm --prefix scripts run dfva:gen-v4\` and commit the result`,
  )
}

// 2. The inverse: a published block with no evidence behind it would put a
//    program on /reports as "current" on data that no longer exists.
const orphaned = [...published].filter((c) => !scored.includes(c)).sort()
for (const code of orphaned) {
  errors.push(
    `${code}: in V4_PANEL_C but has no panelCv4 block in dfva/source/evidence — ` +
      `/reports would present a score with no evidence behind it`,
  )
}

// 3. A research degree is out of Panel C's scope; scoring one is a data error,
//    and the index would show it as "current" rather than "research".
const research = scored.filter((c) => V4_RESEARCH_DEGREES.includes(c)).sort()
for (const code of research) {
  errors.push(
    `${code}: is in V4_RESEARCH_DEGREES but carries a panelCv4 block — a research degree ` +
      `has no taught curriculum to score, and /reports cannot show it as both`,
  )
}

console.log(
  `Scored programs: ${scored.length} | on /reports as current: ${published.size} | research degrees excluded: ${V4_RESEARCH_DEGREES.length}`,
)

if (errors.length) {
  console.error(`\n❌ /reports index check: ${errors.length} problem(s)\n`)
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}
console.log('✓ dfva-reports-index: every scored program is published on /reports.')
