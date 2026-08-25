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
 *   npx tsx dfva-v4-verify-evidence.ts --suggest              # nearest capture text
 *   npx tsx dfva-v4-verify-evidence.ts --suggest --kind tail-drift
 *
 * CAPTURE IDENTITY. Matching every line against a capture proves nothing if the
 * capture is the wrong program. mc-evalo was scored on the Master of
 * Environment's Development specialisation: its courses/mc-evalo/course-structure
 * block came back byte-identical to the components/mc-env-spec-3 block, and the
 * queue then planned its subject pages off that wrong structure, so all 34
 * subject pages captured belong to the other program. Every evidence line
 * matched. The check below is the one that would have caught it: a program's own
 * course page must name the program or carry its code.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const EVIDENCE = path.join(ROOT, 'dfva/source/evidence')
const CAPTURE = path.join(ROOT, 'scrapes/v4')

const argv = process.argv.slice(2)
const STRICT = argv.includes('--strict')
const SUGGEST = argv.includes('--suggest')
const ONLY = argv.includes('--code') ? argv[argv.indexOf('--code') + 1] : null
const KIND = argv.includes('--kind') ? argv[argv.indexOf('--kind') + 1] : null

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

/** Dice coefficient over character bigrams. Cheap, order-insensitive enough to
 *  survive a reflowed clause, and strict enough that an unrelated passage does
 *  not score as a near miss. */
function similarity(a: string, b: string): number {
  const grams = (s: string): Map<string, number> => {
    const m = new Map<string, number>()
    for (let i = 0; i < s.length - 1; i++) {
      const g = s.slice(i, i + 2)
      m.set(g, (m.get(g) ?? 0) + 1)
    }
    return m
  }
  if (a.length < 2 || b.length < 2) return a === b ? 1 : 0
  const ga = grams(a), gb = grams(b)
  let shared = 0
  for (const [g, n] of ga) shared += Math.min(n, gb.get(g) ?? 0)
  return (2 * shared) / (a.length - 1 + b.length - 1)
}

/** How far the recorded line sits from the nearest real passage. The boundaries
 *  are what separate a transcription fix from a scoring decision: a tail-drift
 *  line can be corrected to the capture text, a no-source line cannot be
 *  corrected at all and has to be withdrawn or re-evidenced by a rater. */
export type Kind = 'tail-drift' | 'paraphrase' | 'no-source'
const kindOf = (ratio: number): Kind =>
  ratio >= 0.85 ? 'tail-drift' : ratio >= 0.55 ? 'paraphrase' : 'no-source'

/** The fragment that actually failed, so the suggestion targets the defect
 *  rather than the whole line. */
function probeOf(line: string, text: string): string {
  const frags = line
    .split(/\s*(?:\.\.\.|…)\s*/)
    .map((f) => norm(f))
    .filter((f) => f.length > 2)
  const bad = frags.filter((f) => !text.includes(f))
  if (bad.length > 0) return bad[0]
  const a = atoms(line).filter((x) => !text.includes(x))
  return a[0] ?? norm(line)
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

const linesOf = (p: PanelC): Array<[string, string]> => {
  const out: Array<[string, string]> = []
  for (const id of ITEMS) {
    const item = p[id] as ItemLike | undefined
    for (const l of item?.evidenceLines ?? []) out.push([id, l])
  }
  for (const g of ['G1', 'G2'])
    for (const l of p.gates?.[g]?.evidenceLines ?? []) out.push([g, l])
  return out
}

interface Suggestion {
  item: string
  kind: Kind
  ratio: number
  recorded: string
  capture: string
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
  suggestions: Suggestion[]
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
    suggestions: [],
  }
  if (!row.noCapture) {
    const raw = readFileSync(capturePath, 'utf8')
    const text = norm(raw)
    // Candidate passages for a suggestion: capture lines long enough to be a
    // quotable claim rather than a table cell or a heading fragment.
    const candidates = raw
      .split(/\r?\n/)
      .map((l) => norm(l))
      .filter((l) => l.length > 20)
    const seen = new Set<string>()
    for (const [item, line] of linesOf(p)) {
      const v = classify(line, text)
      if (v === 'verbatim') row.verbatim++
      else if (v === 'elided') row.elided++
      else {
        row.unmatched.push(line)
        const probe = probeOf(line, text)
        let best = '', ratio = 0
        for (const c of candidates) {
          // Length gate first: scoring every candidate against every probe is
          // the only slow part of this script.
          if (Math.abs(c.length - probe.length) > Math.max(60, probe.length))
            continue
          const r = similarity(probe, c)
          if (r > ratio) { ratio = r; best = c }
        }
        row.suggestions.push({
          item,
          kind: kindOf(ratio),
          ratio,
          recorded: probe,
          capture: best,
        })
      }
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
if (SUGGEST) {
  const all = rows.flatMap((r) => r.suggestions.map((s) => ({ ...s, code: r.code })))
  const shown = KIND ? all.filter((s) => s.kind === KIND) : all
  const tally = new Map<Kind, number>()
  for (const s of all) tally.set(s.kind, (tally.get(s.kind) ?? 0) + 1)
  console.log('\nUnmatched lines by kind:')
  for (const k of ['tail-drift', 'paraphrase', 'no-source'] as Kind[]) {
    console.log(`  ${k.padEnd(12)} ${tally.get(k) ?? 0}`)
  }
  console.log(
    `\n${shown.length} suggestion(s)${KIND ? ` of kind ${KIND}` : ''} — ` +
      'accept a tail-drift by replacing the recorded text with the capture text; ' +
      'a paraphrase and a no-source are rater decisions, not transcription fixes.',
  )
  let current = ''
  for (const s of shown) {
    if (s.code !== current) { current = s.code; console.log(`\n${s.code}`) }
    console.log(`  ${s.item}  ${s.kind}  ${s.ratio.toFixed(2)}`)
    console.log(`    recorded: ${s.recorded.slice(0, 160)}`)
    console.log(`    capture : ${s.capture ? s.capture.slice(0, 160) : '— no near passage in this capture —'}`)
  }
} else if (tu > 0 && !STRICT) {
  console.log('\nUnmatched lines (first 3 per program). Run --suggest for the nearest capture text.')
  for (const r of rows.filter((x) => x.unmatched.length)) {
    console.log(`  ${r.code}`)
    for (const l of r.unmatched.slice(0, 3)) console.log(`    ${l.slice(0, 150)}`)
  }
}
// --- capture identity ------------------------------------------------------
// A page fetched under /courses/<code> that names neither the program nor the
// code is not that program's page. Reported, not yet wired into --strict: the
// one known case cannot be cleared by an edit, only by a recapture and a
// re-score, and failing the build before that work exists would only teach
// people to pass --no-verify.
const V4_NAMES = new Map<string, string>()
{
  const panelSrc = readFileSync(
    path.join(ROOT, 'compass/app/src/compass/v4/data/v4PanelC.ts'),
    'utf8',
  )
  const re = /"code":\s*"([^"]+)",\s*\n\s*"name":\s*"([^"]+)"/g
  let m: RegExpExecArray | null
  while ((m = re.exec(panelSrc))) if (!V4_NAMES.has(m[1])) V4_NAMES.set(m[1], m[2])
}

const misidentified: Array<{ code: string; url: string; name: string }> = []
const badCapture = new Set<string>()
for (const r of rows) {
  if (r.noCapture) continue
  const name = V4_NAMES.get(r.code)
  if (!name) continue
  const raw = readFileSync(path.join(CAPTURE, `${r.code}.txt`), 'utf8')
  const parts = raw.split(/^===== SOURCE: (\S+) =====$/m)
  for (let i = 1; i < parts.length; i += 2) {
    const url = parts[i]
    const body = parts[i + 1] ?? ''
    if (!new RegExp(`/courses/${r.code}(/|$)`).test(url)) continue
    if (body.trim().length < 400) continue
    const nb = norm(body)
    if (nb.includes(norm(name)) || nb.includes(r.code.toLowerCase())) continue
    misidentified.push({ code: r.code, url, name })
    badCapture.add(r.code)
  }
}
if (misidentified.length) {
  console.log(
    `\n❌ ${misidentified.length} capture(s) hold a page that is not the program's:`,
  )
  for (const m of misidentified) {
    console.log(`   ${m.code} (${m.name}) — ${m.url} names neither the program nor its code`)
  }
  console.log(
    '   A capture that is the wrong program makes every matched line meaningless.\n' +
      '   Fix by recapturing and re-scoring, never by editing the evidence.',
  )
} else {
  console.log('\n✓ capture identity: every own-course page names its program')
}

// --- subject scope -----------------------------------------------------------
// A fragment found SOMEWHERE in the capture proves less than it looks. mc-mgmtfin
// cited "FNCE90056 Investment Management ... Assignment (1000 words equivalent)";
// FNCE90056 assesses ten weekly quizzes and two examinations and has no
// assignment, but the word "Assignment" and the figure "1000 words (equivalent)"
// both occur elsewhere in the file, so the unscoped check passed it. Where a line
// names a subject whose pages were captured, its remaining fragments must sit on
// that subject's own pages — or on the program's course, structure and component
// pages, which legitimately carry statements like "Capstone Option 1".
const outOfScope: Array<{ code: string; line: string; fragment: string }> = []
for (const r of rows) {
  if (r.noCapture || badCapture.has(r.code)) continue
  const raw = readFileSync(path.join(CAPTURE, `${r.code}.txt`), 'utf8')
  const bySubject = new Map<string, string[]>()
  const coursePages: string[] = []
  const parts = raw.split(/^===== SOURCE: (\S+) =====$/m)
  for (let i = 1; i < parts.length; i += 2) {
    const body = norm(parts[i + 1] ?? '')
    const m = parts[i].match(/\/subjects\/([a-z]{4}\d{5})/)
    if (m) {
      const k = m[1].toUpperCase()
      bySubject.set(k, [...(bySubject.get(k) ?? []), body])
    } else {
      coursePages.push(body)
    }
  }
  const course = coursePages.join(' | ')
  const doc = JSON.parse(
    readFileSync(path.join(EVIDENCE, `${r.code}.json`), 'utf8'),
  ) as { panelCv4?: PanelC }
  for (const [, line] of linesOf(doc.panelCv4 ?? {})) {
    const frags = line.split(/\s*(?:\.\.\.|…)\s*/).map((f) => f.trim()).filter(Boolean)
    const named = frags[0]?.match(/^([A-Z]{4}\d{5})\b/)?.[1]
    if (!named || !bySubject.has(named)) continue
    const scope = `${(bySubject.get(named) ?? []).join(' | ')} | ${course}`
    for (const f of frags.slice(1)) {
      if (scope.includes(norm(f))) continue
      const a = atoms(f)
      if (a.length > 0 && a.every((x) => scope.includes(x))) continue
      outOfScope.push({ code: r.code, line: line.slice(0, 80), fragment: f.slice(0, 70) })
      break
    }
  }
}
if (outOfScope.length) {
  console.log(`\n❌ ${outOfScope.length} evidence line(s) quote text that is not on the subject they name:`)
  for (const o of outOfScope) console.log(`   ${o.code}: ${o.line}\n      off-subject: ${o.fragment}`)
} else {
  console.log('✓ subject scope: every quoted fragment sits on the subject it names')
}

// --- rationale subject codes --------------------------------------------------
// Rationale prose is published on the page and no check reads it. A full
// code-to-title check is not viable — "LAWS90352 Legal Research Brief" names an
// assessment, not the subject, and that is legitimate — but a code cited for a
// program whose capture never mentions it cannot be evidence about that program.
// This is the ABPL90396 / ACCT90029 / CVEN90067 class.
const phantomCodes: Array<{ code: string; item: string; subject: string }> = []
for (const r of rows) {
  if (r.noCapture) continue
  const cap = norm(readFileSync(path.join(CAPTURE, `${r.code}.txt`), 'utf8'))
  const doc = JSON.parse(
    readFileSync(path.join(EVIDENCE, `${r.code}.json`), 'utf8'),
  ) as { panelCv4?: PanelC }
  const p = doc.panelCv4 ?? {}
  const prose: Array<[string, string]> = []
  for (const id of [...ITEMS, 'G1', 'G2']) {
    const holder = (id === 'G1' || id === 'G2' ? p.gates?.[id] : p[id]) as
      | { rationale?: string }
      | undefined
    if (holder?.rationale) prose.push([id, holder.rationale])
  }
  for (const a of (p.ambiguities as string[] | undefined) ?? []) prose.push(['ambiguity', a])
  const seen = new Set<string>()
  for (const [item, t] of prose) {
    for (const m of t.matchAll(/\b([A-Z]{4}\d{5})\b/g)) {
      const subj = m[1]
      if (cap.includes(norm(subj)) || seen.has(subj)) continue
      seen.add(subj)
      phantomCodes.push({ code: r.code, item, subject: subj })
    }
  }
}
if (phantomCodes.length) {
  console.log(`\n❌ ${phantomCodes.length} subject code(s) named in rationale prose but absent from the capture:`)
  for (const c of phantomCodes) console.log(`   ${c.code} ${c.item}: ${c.subject}`)
} else {
  console.log('✓ rationale subjects: every code named in prose appears in its capture')
}

// --- report block quotes ---------------------------------------------------
// The record is not the only place a handbook quote is published. Each
// reports/dfva-v4-<code>.md repeats evidence as block quotes, and those are a
// separate copy that drifts: the Aug-2026 adversarial pass corrected records and
// left 25 report quotes behind, including a "FNCE90056 ... Assignment (1000
// words equivalent)" that fused a non-existent task to another row's word count.
// This checks the published copy, not just the record.
const staleQuotes: Array<{ code: string; quote: string }> = []
for (const r of rows) {
  if (r.noCapture) continue
  // A capture that is the wrong program fails identity below; its quotes are
  // stale for that reason and are not a separate, fixable defect.
  if (badCapture.has(r.code)) continue
  const reportPath = path.join(ROOT, `reports/dfva-v4-${r.code}.md`)
  if (!existsSync(reportPath)) continue
  const text = norm(readFileSync(path.join(CAPTURE, `${r.code}.txt`), 'utf8'))
  for (const line of readFileSync(reportPath, 'utf8').split(/\r?\n/)) {
    if (!line.startsWith('> ')) continue
    const body = line.slice(2).trim()
    // Only quotes that name a subject — prose pull-quotes are not evidence.
    if (!/^[A-Z]{4}\d{5}/.test(body)) continue
    if (classify(body, text) !== 'unmatched') continue
    staleQuotes.push({ code: r.code, quote: body.slice(0, 110) })
  }
}
if (staleQuotes.length) {
  console.log(`\n❌ ${staleQuotes.length} published report quote(s) not in the capture:`)
  for (const q of staleQuotes) console.log(`   ${q.code}: ${q.quote}`)
} else {
  console.log('✓ report quotes: every published block quote is in its capture')
}

if (
  STRICT &&
  (falseClaims.length || staleQuotes.length || outOfScope.length || phantomCodes.length)
)
  process.exit(1)
