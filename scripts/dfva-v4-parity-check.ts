/**
 * v4 Panel C content-parity guard (CI guard). dfva-v4-gen.ts's appPanelCModule()
 * renders the full compass/app/src/compass/v4/data/v4PanelC.ts module (banner,
 * interfaces, V4_META, V4_ONLY_PROGRAMS, V4_PANEL_A_BASIS, V4_RESEARCH_DEGREES
 * and V4_PANEL_C) from dfva/source/evidence/*.json + dfva/source/rubricV4.ts.
 * dfva-v4-schema-check.ts validates the JSON matches the V4PanelC TypeScript
 * interface SHAPE, but not that the generated file is in sync with the
 * evidence source — so editing an evidence file without running
 * `npm --prefix scripts run dfva:gen-v4` leaves v4PanelC.ts stale, and the
 * insights pages (/insights, /insights/faculty, /insights/portfolio — all of
 * which read v4PanelC.ts via v4PortfolioRows()) silently show the old scores.
 *
 * This catches that by importing the real generator function — the same
 * appPanelCModule() dfva-v4-gen.ts uses to write v4PanelC.ts — and diffing a
 * fresh render against the committed file text, byte-for-byte. This mirrors
 * how dfva-content-check.ts compares generated reportContent.ts against what
 * dfva:gen-content would produce.
 *
 * Run: npm --prefix scripts run dfva:v4-parity-check  (also part of dfva:check)
 */
import { readFileSync } from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { appPanelCModule } from './dfva-v4-gen'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const V4_PANEL_C_PATH = path.join(
  repoRoot,
  'compass',
  'app',
  'src',
  'compass',
  'v4',
  'data',
  'v4PanelC.ts',
)

/**
 * Pure comparison: given the committed file text and a freshly rendered
 * version, return the guard's issues — [] when they match. Exported so the
 * test file can assert on stale and identical inputs without touching disk
 * or the real evidence data.
 */
export function parityIssues(committed: string, rendered: string): string[] {
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
    'v4PanelC.ts is stale relative to dfva/source/evidence/*.json.\n' +
      '    The committed file does not match what dfva-v4-gen.ts would produce.\n' +
      '    Fix: npm --prefix scripts run dfva:gen-v4\n    ' +
      detail,
  ]
}

/** appPanelCModule() logs per-program diagnostics as it runs — useful for
 *  `dfva:gen-v4`, noise for a parity check that runs it purely to diff. */
async function renderSilently(): Promise<string> {
  const log = console.log
  const warn = console.warn
  console.log = () => {}
  console.warn = () => {}
  try {
    return await appPanelCModule()
  } finally {
    console.log = log
    console.warn = warn
  }
}

async function main(): Promise<void> {
  const committed = readFileSync(V4_PANEL_C_PATH, 'utf8')
  const rendered = await renderSilently()
  const issues = parityIssues(committed, rendered)

  if (issues.length) {
    console.error('dfva:v4-parity-check FAILED —')
    for (const issue of issues) console.error('  ' + issue)
    process.exit(1)
  }

  console.log('dfva:v4-parity-check OK — v4PanelC.ts matches dfva/source/evidence/*.json')
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(e)
    process.exit(1)
  })
}
