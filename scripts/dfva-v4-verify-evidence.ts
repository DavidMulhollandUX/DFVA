/**
 * Guard: an evidence line shown on a v4 report page must appear in that
 * program's captured handbook text.
 *
 * The page used to state "each evidence passage shown on this page was verified
 * to appear verbatim in the captured 2026 handbook text" as flat prose. Nothing
 * checked it, and `panelCv4.verified` was hand-written, so the claim was an
 * assertion rather than a result. This script makes it a result.
 *
 * MATCHING. Two citation forms are in use and both are legitimate:
 *
 *   verbatim  a contiguous quote, e.g. a learning outcome
 *   elided    fragments joined with "...", and handbook table rows rendered as
 *             "Title (1500 words, 20%)" — the cells are adjacent in the page but
 *             not contiguous in the extracted text
 *
 * So a line passes if the whole string is present, or if every atom of it is.
 * Atoms are the "..."-separated fragments, each further split into its head and
 * the comma-separated contents of a trailing parenthetical. A parenthetical
 * whose comma-split atoms do not all resolve is retried whole, so prose commas
 * ("a group verbal, visual and written report") do not produce false failures.
 *
 * REPORT-ONLY BY DEFAULT. This never writes `verified` into an evidence record:
 * stamping a verification from a matcher that is subtly wrong would recreate the
 * exact defect it exists to catch. Run it, read it, then decide.
 *
 *   npx tsx dfva-v4-verify-evidence.ts            # report, always exit 0
 *   npx tsx dfva-v4-verify-evidence.ts --strict   # fail on a false mechanical claim
 *   npx tsx dfva-v4-verify-evidence.ts --code mc-it
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const EVIDENCE = path.join(ROOT, 'dfva/source/evidence')
const CAPTURE = path.join(ROOT, 'scrapes/v4')

const argv = process.argv.slice(2)
const STRICT = argv.includes('--strict')
const ONLY = argv.includes('--code') ? argv[argv.indexOf('--code') + 1] : null

const ITEMS = ['C1', 'C2', 'C3', 'C4', 'C5', 'W1', 'W2', 'W3'] as const

interface ItemLike { evidenceLines?: string[] }
interface PanelC {
  gates?: Record<string, ItemLike | undefined>
  verified?: { adversarial: boolean; mechanical: boolean; date: string }
  [k: string]: unknown
}

/** Fold the differences that transcription introduces but meaning does not:
 *  non-breaking spaces (see the U+00A0 capture-fidelity note), smart quotes,
 *  dash width, and run-length whitespace. */
const norm = (s: string): string =>
  s
    .normalize('NFKC')
    .replace(/ /g, ' ')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()

/** Every fragment a line asserts, in the order a reader would check them. */
function atoms(line: string): string[] {
  const out: string[] = []
  for (const rawFrag of line.split(/\s*(?:\.\.\.|…)\s*/)) {
    const frag = rawFrag.trim()
    if (!frag) continue
    const m = frag.match(/^(.*?)\s*\(([^()]*(?:\([^()]*\)[^()]*)*)\)\s*$/)
    if (!m) { out.push(frag); continue }
    const head = m[1].trim()
    if (head) out.push(head)
    out.push(...m[2].split(/,\s*/).map((a) => a.trim()).filter(Boolean))
  }
  return out.map(norm).filter((a) => a.length > 2)
}

type Verdict = 'verbatim' | 'elided' | 'unmatched'

function classify(line: string, text: string): Verdict {
  if (text.includes(norm(line))) return 'verbatim'
  // Whole fragments first — this rescues prose commas inside a parenthetical.
  const frags = line
    .split(/\s*(?:\.\.\.|…)\s*/)
    .map((f) => norm(f))
    .filter((f) => f.length > 2)
  if (frags.length > 0 && frags.every((f) => text.includes(f))) return 'elided'
  const parts = atoms(line)
  if (parts.length > 0 && parts.every((a) => text.includes(a))) return 'elided'
  return 'unmatched'
}

const linesOf = (p: PanelC): string[] => {
  const out: string[] = []
  for (const id of ITEMS) {
    const item = p[id] as ItemLike | undefined
    if (item?.evidenceLines) out.push(...item.evidenceLines)
  }
  for (const g of ['G1', 'G2']) out.push(...(p.gates?.[g]?.evidenceLines ?? []))
  return out
}

interface Row {
  code: string
  verbatim: number
  elided: number
  unmatched: string[]
  noCapture: boolean
  gateLines: number
  missingSubjects: string[]
  claimsMechanical: boolean
}

const rows: Row[] = []
for (const f of readdirSync(EVIDENCE).sort()) {
  if (!f.endsWith('.json')) continue
  const doc = JSON.parse(readFileSync(path.join(EVIDENCE, f), 'utf8')) as {
    code?: string; panelCv4?: PanelC
  }
  if (!doc.panelCv4 || !doc.code) continue
  if (ONLY && doc.code !== ONLY) continue
  const p = doc.panelCv4
  const capturePath = path.join(CAPTURE, `${doc.code}.txt`)
  const row: Row = {
    code: doc.code,
    verbatim: 0,
    elided: 0,
    unmatched: [],
    noCapture: !existsSync(capturePath),
    gateLines: ['G1', 'G2'].reduce((n, g) => n + (p.gates?.[g]?.evidenceLines?.length ?? 0), 0),
    missingSubjects: [],
    claimsMechanical: p.verified?.mechanical === true,
  }
  if (!row.noCapture) {
    const text = norm(readFileSync(capturePath, 'utf8'))
    const seen = new Set<string>()
    for (const line of linesOf(p)) {
      const v = classify(line, text)
      if (v === 'verbatim') row.verbatim++
      else if (v === 'elided') row.elided++
      else row.unmatched.push(line)
      // A cited subject whose code is absent was scored from a page never captured.
      for (const code of line.match(/\b[A-Z]{4}\d{5}\b/g) ?? []) {
        if (!text.includes(norm(code)) && !seen.has(code)) { seen.add(code); row.missingSubjects.push(code) }
      }
    }
  }
  rows.push(row)
}

const pad = (s: string, n: number) => s.padEnd(n)
let tv = 0, te = 0, tu = 0
console.log(`${pad('program', 14)}${'verbatim'.padStart(9)}${'elided'.padStart(8)}${'unmatched'.padStart(11)}${'gate ev'.padStart(9)}  notes`)
for (const r of rows) {
  tv += r.verbatim; te += r.elided; tu += r.unmatched.length
  const notes: string[] = []
  if (r.noCapture) notes.push('NO CAPTURE FILE')
  if (r.gateLines === 0) notes.push('gates carry no evidence')
  if (r.missingSubjects.length) notes.push(`uncaptured subject: ${r.missingSubjects.join(', ')}`)
  if (r.claimsMechanical && r.unmatched.length) notes.push('CLAIMS mechanical:true with unmatched lines')
  console.log(
    pad(r.code, 14) + String(r.verbatim).padStart(9) + String(r.elided).padStart(8) +
    String(r.unmatched.length).padStart(11) + String(r.gateLines).padStart(9) +
    (notes.length ? `  ${notes.join('; ')}` : ''),
  )
}
const total = tv + te + tu
console.log(`\n${rows.length} scored program(s); ${total} evidence line(s)`)
console.log(`  present in capture : ${tv + te} (${((100 * (tv + te)) / total).toFixed(1)}%) — ${tv} verbatim, ${te} elided`)
console.log(`  unmatched          : ${tu}`)

const gapless = rows.filter((r) => !r.noCapture && r.unmatched.length === 0)
console.log(`  programs fully confirmed: ${gapless.length}/${rows.length}`)

const falseClaims = rows.filter((r) => r.claimsMechanical && (r.unmatched.length > 0 || r.noCapture))
if (falseClaims.length) {
  console.log(`\n❌ ${falseClaims.length} record(s) claim mechanical verification they do not pass:`)
  for (const r of falseClaims) console.log(`   ${r.code}: ${r.unmatched.length} unmatched`)
}
if (tu > 0 && !STRICT) {
  console.log('\nUnmatched lines (first 3 per program):')
  for (const r of rows.filter((x) => x.unmatched.length)) {
    console.log(`  ${r.code}`)
    for (const l of r.unmatched.slice(0, 3)) console.log(`    ${l.slice(0, 150)}`)
  }
}
if (STRICT && falseClaims.length) process.exit(1)
