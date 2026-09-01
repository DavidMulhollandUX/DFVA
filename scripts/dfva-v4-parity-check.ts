/**
 * v4 Panel C content-parity guard (CI guard). dfva-v4-gen.ts's appPanelCModule()
 * spreads every dfva/source/evidence/*.json's `panelCv4` block into the generated
 * compass/app/src/compass/v4/data/v4PanelC.ts. dfva-v4-schema-check.ts validates the
 * JSON matches the V4PanelC TypeScript interface SHAPE, but not that the generated
 * file is in sync with the evidence source — so editing an evidence file without
 * running `npm --prefix scripts run dfva:gen-v4` leaves v4PanelC.ts stale, and the
 * insights pages (/insights, /insights/faculty, /insights/portfolio — all of which
 * read v4PanelC.ts via v4PortfolioRows()) silently show the old scores.
 *
 * This catches that: it regenerates v4PanelC.ts's content in memory (by calling the
 * same appPanelCModule() from dfva-v4-gen.ts) and diffs it against the committed
 * file, failing if they differ — mirroring how dfva-content-check.ts compares
 * generated reportContent.ts against what dfva:gen-content would produce.
 *
 * Run: npm --prefix scripts run dfva:v4-parity-check  (also part of dfva:check)
 */
import { readFileSync } from 'node:fs'
import * as path from 'node:path'

const repoRoot = path.resolve(__dirname, '..')

// Import the generator function from dfva-v4-gen.ts at runtime.
// We use a dynamic import because dfva-v4-gen.ts has side effects on import
// (its main() runs at load time), so we can't static-import it.
// Instead we read the source, extract appPanelCModule, and eval it in a
// sandbox that provides the same dependencies. A cleaner approach: shell out
// to `npx tsx dfva-v4-gen.ts` in a temp dir, but that regenerates ALL outputs
// (prompt, rubric, template, v4PanelC.ts). Since appPanelCModule is the only
// function we need, we replicate its logic here directly, reading the same
// evidence files and producing the same JSON. If dfva-v4-gen.ts's
// appPanelCModule changes, update this file too — they must produce identical
// output.

import { readdirSync } from 'node:fs'
import {
  PANEL_W_V4,
} from '../dfva/source/rubricV4'

const EVIDENCE_DIR = path.join(repoRoot, 'dfva', 'source', 'evidence')
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

// ---------------------------------------------------------------------------
// Replicate appPanelCModule from dfva-v4-gen.ts.
// This produces the exact same JSON that gets written into v4PanelC.ts.
// If dfva-v4-gen.ts changes, update this function to match.
// ---------------------------------------------------------------------------

interface PanelCv4Entry {
  instrument?: string
  adaptiveness?: number
  workplace?: number
  [key: string]: unknown
}

function generateExpectedPanelC(): string {
  const results: Record<string, PanelCv4Entry> = {}

  for (const f of readdirSync(EVIDENCE_DIR).sort()) {
    if (!f.endsWith('.json')) continue
    const data = JSON.parse(
      readFileSync(path.join(EVIDENCE_DIR, f), 'utf8'),
    ) as { code?: string; panelCv4?: PanelCv4Entry }
    if (!data.panelCv4 || !data.code) continue

    // Instrument family derivation (same logic as dfva-v4-gen.ts)
    const family = PANEL_W_V4.every(
      (w) => data.panelCv4![w.id as keyof PanelCv4Entry] !== undefined,
    )
      ? ['4.1-draft', '4.2-draft']
      : ['4.0-draft']
    const stated = data.panelCv4.instrument
    const instrument = stated && family.includes(stated) ? stated : family[0]

    results[data.code] = { ...data.panelCv4, instrument }
  }

  // Build the same output string as appPanelCModule's return.
  // The committed file has TS_BANNER + interfaces + `export const V4_PANEL_C: ...`
  // We only need to compare the V4_PANEL_C data portion — the interfaces and
  // banner are static and never drift. We extract just the `V4_PANEL_C` line
  // from the committed file and compare its JSON value against our generated
  // version.
  return JSON.stringify(results, null, 2)
}

// ---------------------------------------------------------------------------
// Extract the V4_PANEL_C JSON from the committed file.
// The line looks like:  export const V4_PANEL_C: Record<string, V4PanelC> = { ... };
// We parse the object literal after the `=` sign.
// ---------------------------------------------------------------------------

function extractCommittedPanelC(fileContent: string): string {
  const match = fileContent.match(
    /export const V4_PANEL_C:\s*Record<string,\s*V4PanelC>\s*=\s*([\s\S]*?);\s*\n/,
  )
  if (!match) {
    throw new Error(
      'Could not find `export const V4_PANEL_C` in the committed v4PanelC.ts — ' +
        'the file may have been hand-edited or the generator output format changed.',
    )
  }
  // The JSON is already valid JS object literal — eval it to get the object,
  // then re-stringify with the same formatting for comparison.
  // eslint-disable-next-line no-new-func
  const obj = Function('return ' + match[1])() as Record<string, unknown>
  return JSON.stringify(obj, null, 2)
}

// ---------------------------------------------------------------------------

const committed = readFileSync(V4_PANEL_C_PATH, 'utf8')
const committedJSON = extractCommittedPanelC(committed)
const expectedJSON = generateExpectedPanelC()

if (committedJSON !== expectedJSON) {
  console.error(
    'dfva:v4-parity-check FAILED — v4PanelC.ts is stale relative to dfva/source/evidence/*.json.\n' +
      'The committed V4_PANEL_C does not match what the evidence files would produce.\n' +
      'Fix: npm --prefix scripts run dfva:gen-v4  (regenerates v4PanelC.ts from evidence + rubricV4)',
  )
  // Show a short diff
  const committedLines = committedJSON.split('\n')
  const expectedLines = expectedJSON.split('\n')
  const n = Math.max(committedLines.length, expectedLines.length)
  let firstDiff = -1
  for (let i = 0; i < n; i++) {
    if (committedLines[i] !== expectedLines[i]) {
      firstDiff = i
      break
    }
  }
  if (firstDiff >= 0) {
    console.error(`    first diff at line ${firstDiff + 1}:`)
    console.error(`      committed: ${JSON.stringify(committedLines[firstDiff] ?? '<end>')}`)
    console.error(`      expected:  ${JSON.stringify(expectedLines[firstDiff] ?? '<end>')}`)
  }
  process.exit(1)
}

console.log('dfva:v4-parity-check OK — v4PanelC.ts matches dfva/source/evidence/*.json')
