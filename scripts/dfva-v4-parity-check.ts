/**
 * v4 data-module content-parity guard (CI guard). dfva-v4-gen.ts's
 * appV4DataModules() renders a family of generated modules from
 * dfva/source/evidence/*.json + dfva/source/rubricV4.ts, all under
 * compass/app/src/compass/v4/data/:
 *
 *   - v4Meta.ts (light — types, V4_META, V4_RESEARCH_DEGREES, V4_INDEX) —
 *     imported by the landing page, /reports and /insights.
 *   - v4Basis.ts (V4_ONLY_PROGRAMS, V4_PANEL_A_BASIS) — the report page.
 *   - v4PanelC/<code>.ts — one program's Panel C record per lazy chunk, plus
 *     v4PanelC/index.ts with the loaders the report page uses.
 *   - v4PanelC.ts — the eager map over the per-program modules (scripts and
 *     tests only).
 *
 * A stray file in v4PanelC/ that the generator would not write (a program
 * removed from the evidence set) is also an error.
 *
 * dfva-v4-schema-check.ts validates the JSON matches the V4PanelC TypeScript
 * interface SHAPE, but not that the generated files are in sync with the
 * evidence source — so editing an evidence file without running
 * `npm --prefix scripts run dfva:gen-v4` leaves them stale, and the insights
 * pages (/insights, /insights/faculty, /insights/portfolio — all of which
 * read v4Meta.ts via v4PortfolioRows()) silently show the old scores.
 *
 * This catches that by importing the real generator function — the same
 * appV4DataModules() dfva-v4-gen.ts uses to write both files — and diffing a
 * fresh render of EACH against its committed file text, byte-for-byte. This
 * mirrors how dfva-content-check.ts compares generated reportContent.ts
 * against what dfva:gen-content would produce.
 *
 * Run: npm --prefix scripts run dfva:v4-parity-check  (also part of dfva:check)
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { appV4DataModules } from './dfva-v4-gen'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const DATA_DIR = path.join(repoRoot, 'compass', 'app', 'src', 'compass', 'v4', 'data')
const PROGRAM_DIR = path.join(DATA_DIR, 'v4PanelC')

/**
 * Pure comparison: given the committed file text and a freshly rendered
 * version, return the guard's issues — [] when they match. Exported so the
 * test file can assert on stale and identical inputs without touching disk
 * or the real evidence data. `label` names the file in the message; it
 * defaults to v4PanelC.ts so the pre-split tests keep passing unchanged.
 */
export function parityIssues(
  committed: string,
  rendered: string,
  label = 'v4PanelC.ts',
): string[] {
  if (committed === rendered) return []

  const committedLines = committed.split('\n')
  const renderedLines = rendered.split('\n')
  const n = Math.max(committedLines.length, renderedLines.length)
  let firstDiff = -1
  for (let i = 0; i < n; i++) {
    if (committedLines[i] !== renderedLines[i]) {
      firstDiff = i
      break
    }
  }
  const detail =
    firstDiff >= 0
      ? [
          `first diff at line ${firstDiff + 1}:`,
          `      committed: ${JSON.stringify(committedLines[firstDiff] ?? '<end>')}`,
          `      expected:  ${JSON.stringify(renderedLines[firstDiff] ?? '<end>')}`,
        ].join('\n')
      : `lengths differ (committed ${committedLines.length} lines, expected ${renderedLines.length} lines)`

  return [
    `${label} is stale relative to dfva/source/evidence/*.json.\n` +
      '    The committed file does not match what dfva-v4-gen.ts would produce.\n' +
      '    Fix: npm --prefix scripts run dfva:gen-v4\n    ' +
      detail,
  ]
}

/** appV4DataModules() logs per-program diagnostics as it runs — useful for
 *  `dfva:gen-v4`, noise for a parity check that runs it purely to diff. */
async function renderSilently(): Promise<Awaited<ReturnType<typeof appV4DataModules>>> {
  const log = console.log
  const warn = console.warn
  console.log = () => {}
  console.warn = () => {}
  try {
    return await appV4DataModules()
  } finally {
    console.log = log
    console.warn = warn
  }
}

async function main(): Promise<void> {
  const rendered = await renderSilently()
  const expected = new Map<string, string>([
    ['v4Meta.ts', rendered.meta],
    ['v4Basis.ts', rendered.basis],
    ['v4PanelC.ts', rendered.panelC],
    ['v4PanelC/index.ts', rendered.loaders],
    ...Object.entries(rendered.programs).map(
      ([code, text]) => [`v4PanelC/${code}.ts`, text] as [string, string],
    ),
  ])
  const issues: string[] = []
  for (const [rel, text] of expected) {
    const abs = path.join(DATA_DIR, rel)
    if (!existsSync(abs)) {
      issues.push(`${rel} is missing. Fix: npm --prefix scripts run dfva:gen-v4`)
      continue
    }
    issues.push(...parityIssues(readFileSync(abs, 'utf8'), text, rel))
  }
  for (const f of existsSync(PROGRAM_DIR) ? readdirSync(PROGRAM_DIR) : []) {
    if (f.endsWith('.ts') && !expected.has(`v4PanelC/${f}`)) {
      issues.push(
        `v4PanelC/${f} has no program in dfva/source/evidence/*.json. Fix: npm --prefix scripts run dfva:gen-v4`,
      )
    }
  }

  if (issues.length) {
    console.error('dfva:v4-parity-check FAILED —')
    for (const issue of issues) console.error('  ' + issue)
    process.exit(1)
  }

  console.log(`dfva:v4-parity-check OK — ${expected.size} v4 data modules match dfva/source/evidence/*.json`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(e)
    process.exit(1)
  })
}
