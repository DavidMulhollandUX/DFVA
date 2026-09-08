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
 *
 * --status (H5). Usage limits killed four apply batches mid-run; some wrote
 * files and reported nothing, one left its program untouched while its return
 * value looked complete. All were found by inspecting file state, because no
 * command answered "what is actually done". --status answers it from disk:
 *
 *   npx tsx dfva-reports-index-check.ts --status       # every code, all columns
 *   npx tsx dfva-reports-index-check.ts --incomplete   # only codes missing something,
 *                                                      # as workflow args
 *
 * --status never changes the exit code — a status view that fails CI stops
 * being run.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { V4_PANEL_C } from '../compass/app/src/compass/v4/data/v4PanelC'
import { V4_RESEARCH_DEGREES } from '../compass/app/src/compass/v4/data/v4Meta'
import { institutionOf, isPublishedRecord } from './lib-institution'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const evidenceDir = path.join(ROOT, 'dfva/source/evidence')

const STATUS = process.argv.includes('--status')
const INCOMPLETE = process.argv.includes('--incomplete')

// Fresh mechanical computation — same matcher semantics as the verifier's
// whole-string-or-atoms rule, inlined here to avoid importing that script.
const norm = (s: string): string =>
  s.normalize('NFKC').replace(/\s+/g, ' ').trim().toLowerCase()

function mechanicalPass(code: string): boolean {
  const capture = path.join(ROOT, 'scrapes/v4', `${code}.txt`)
  if (!existsSync(capture)) return false
  const doc = JSON.parse(
    readFileSync(path.join(evidenceDir, `${code}.json`), 'utf8'),
  ) as {
    panelCv4?: {
      C1?: { evidenceLines?: string[] }
      C2?: { evidenceLines?: string[] }
      C3?: { evidenceLines?: string[] }
      C4?: { evidenceLines?: string[] }
      C5?: { evidenceLines?: string[] }
      W1?: { evidenceLines?: string[] }
      W2?: { evidenceLines?: string[] }
      W3?: { evidenceLines?: string[] }
      gates?: Record<string, { evidenceLines?: string[] }>
    }
  }
  const text = norm(readFileSync(capture, 'utf8'))
  const p = doc.panelCv4
  if (!p) return false
  const lines = ['C1', 'C2', 'C3', 'C4', 'C5', 'W1', 'W2', 'W3'].flatMap(
    (k) => (p[k as keyof typeof p] as { evidenceLines?: string[] } | undefined)?.evidenceLines ?? [],
  )
  lines.push(...['G1', 'G2'].flatMap((g) => p.gates?.[g]?.evidenceLines ?? []))
  // Same whole-string-or-atoms rule as the verifier: elided lines pass when
  // every fragment is present.
  const atomsOf = (l: string): string[] => {
    const frags = l.split(/\s*(?:\.\.\.|…)\s*/).map(norm).filter((f) => f.length > 2)
    if (frags.every((f) => text.includes(f))) return []
    return frags
  }
  return lines.every((l) => {
    if (text.includes(norm(l))) return true
    return atomsOf(l).length === 0 && atomsOf(l).every(() => true)
  })
}

if (STATUS || INCOMPLETE) {
  const rows: Array<{ code: string; missing: string[] }> = []
  for (const f of readdirSync(evidenceDir).sort()) {
    if (!f.endsWith('.json')) continue
    let d: { code?: string; panelCv4?: unknown }
    try {
      d = JSON.parse(readFileSync(path.join(evidenceDir, f), 'utf8'))
    } catch {
      continue
    }
    if (!d.code) continue
    const code = d.code
    const scored = Boolean(d.panelCv4)
    const mech = scored && mechanicalPass(code)
    const published = Boolean((V4_PANEL_C as Record<string, unknown>)[code.toLowerCase()])
    const has = (kind: string) =>
      existsSync(path.join(ROOT, 'reports', `dfva-${kind}-${code}.md`))
    const report = has('v4')
    const recommend = has('v4-recommend')
    const market = has('market')
    const missing: string[] = []
    if (!scored) missing.push('scored')
    if (scored && !mech) missing.push('mechanical')
    if (scored && !published) missing.push('published')
    if (!report) missing.push('report')
    if (!recommend) missing.push('recommend')
    if (!market) missing.push('market')
    if (!INCOMPLETE || missing.length) rows.push({ code, missing })
  }

  if (INCOMPLETE) {
    // Pipe straight back into v4-score-cohort args for whatever is still open.
    console.log(JSON.stringify(rows.map((r) => r.code)))
    console.error(
      rows.length ? `${rows.length} incomplete: ${rows.map((r) => `${r.code}[${r.missing.join('+')}]`).join(', ')}` : '✓ everything complete',
    )
  } else {
    const pad = (s: string, n: number) => s.padEnd(n)
    console.log(`${pad('program', 14)}scored  mechanical  published  report  recommend  market`)
    for (const r of rows.sort((a, b) => a.code.localeCompare(b.code))) {
      const ok = (k: string) => (r.missing.includes(k) ? '·' : '✓')
      console.log(
        pad(r.code, 14) +
          [ok('scored'), ok('mechanical').padStart(9), ok('published').padStart(9), ok('report').padStart(7), ok('recommend').padStart(10), ok('market').padStart(7)].join('  '),
      )
    }
    const done = rows.filter((r) => r.missing.length === 0).length
    console.log(`\n${done}/${rows.length} complete`)
  }
  process.exit(0)
}

const scored: string[] = []
const publishedCodes = new Set<string>()
for (const f of readdirSync(evidenceDir)) {
  if (!f.endsWith('.json')) continue
  const d = JSON.parse(readFileSync(path.join(evidenceDir, f), 'utf8')) as {
    code?: string
    panelCv4?: { verified?: { date?: string } | null }
  }
  if (!d.panelCv4 || !d.code) continue
  scored.push(d.code)
  if (isPublishedRecord(d.code, d.panelCv4.verified)) publishedCodes.add(d.code)
}

const errors: string[] = []
const published = new Set(Object.keys(V4_PANEL_C))

// A quarantined institution is absent from the generated map on purpose, so it
// is not a drift error. Report it as a separate count instead of failing: the
// state is "scored, not yet publishable", and lib-institution.ts owns the list.
const quarantined = scored.filter((c) => !publishedCodes.has(c))
const publishable = scored.filter((c) => publishedCodes.has(c))

// 1. Scored but absent from the generated map: /reports still calls it archived.
const stale = publishable.filter((c) => !published.has(c)).sort()
for (const code of stale) {
  errors.push(
    `${code}: scored (panelCv4 block present) but missing from V4_PANEL_C, so /reports ` +
      `still shows it as archived — run \`npm --prefix scripts run dfva:gen-v4\` and commit the result`,
  )
}

// 2. The inverse: a published block with no evidence behind it would put a
//    program on /reports as "current" on data that no longer exists.
const orphaned = [...published].filter((c) => !publishable.includes(c)).sort()
for (const code of orphaned) {
  errors.push(
    `${code}: in V4_PANEL_C but has no panelCv4 block in dfva/source/evidence — ` +
      `/reports would present a score with no evidence behind it`,
  )
}

// 3. A research degree is out of Panel C's scope; scoring one is a data error,
//    and the index would show it as "current" rather than "research".
const research = publishable.filter((c) => V4_RESEARCH_DEGREES.includes(c)).sort()
for (const code of research) {
  errors.push(
    `${code}: is in V4_RESEARCH_DEGREES but carries a panelCv4 block — a research degree ` +
      `has no taught curriculum to score, and /reports cannot show it as both`,
  )
}

// 4. Nothing reaches /reports unverified. The quarantine exists because 2,838
//    records were published with verifiedAt null; this is the guard that makes
//    that state impossible rather than merely undone.
for (const code of [...published].sort()) {
  const rec = (V4_PANEL_C as Record<string, { verified?: { date?: string } }>)[code]
  if (!rec?.verified?.date) {
    errors.push(
      `${code}: published in V4_PANEL_C with no verification date — a score reaches ` +
        `/reports only after adversarial and mechanical verification have been stamped`,
    )
  }
}

if (quarantined.length) {
  const byInst: Record<string, number> = {}
  for (const c of quarantined) {
    const n = institutionOf(c).name
    byInst[n] = (byInst[n] ?? 0) + 1
  }
  console.log(
    `Quarantined (scored, not publishable): ${quarantined.length} — ` +
      Object.entries(byInst)
        .sort((a, b) => b[1] - a[1])
        .map(([n, k]) => `${n} ${k}`)
        .join(', '),
  )
}

console.log(
  `Scored programs: ${scored.length} | publishable: ${publishable.length} | on /reports as current: ${published.size} | research degrees excluded: ${V4_RESEARCH_DEGREES.length}`,
)

if (errors.length) {
  console.error(`\n❌ /reports index check: ${errors.length} problem(s)\n`)
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}
console.log('✓ dfva-reports-index: every scored program is published on /reports.')
