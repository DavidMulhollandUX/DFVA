/**
 * Select the Go8 cross-section: one program per flagship discipline per
 * Group of Eight university.
 *
 * WHY A SAMPLE. Re-scoring all 2,827 quarantined programs costs roughly 155M
 * input tokens (docs/dfva-national-expansion-spec.md). A cross-section buys the
 * thing the insights pages actually need — the same discipline compared across
 * institutions — for about 2% of that. What it does NOT buy is an institution
 * that can publish as a cohort: a sample cannot satisfy the distinctness guard's
 * cohort-shape test, so these programs publish as individually verified records
 * and their institutions stay quarantined.
 *
 * DISCIPLINE CHOICE. "Top" is not in the data — the repo has no enrolment or
 * ranking figures. What is in the data is which disciplines every Go8 runs, so
 * "top" here means flagship-and-comparable: a named degree that most of the
 * eight offer, so every row of the cross-section is a like-for-like comparison
 * and no institution's score is an artifact of which programs got sampled.
 *
 * NAME SOURCES DISAGREE. `scripts/v4_cohort_ext.json` names most programs with
 * their award ("Bachelor of Commerce"), but 316 of UNSW's 486 entries carry the
 * bare field ("Commerce") because that is how the UNSW handbook heads its pages.
 * The capture cannot supply the award either — its `# Title (code)` heading is
 * the same bare field. So UNSW is disambiguated on the capture's `Study Level`
 * line instead, which is present for every UNSW program.
 *
 * Run: npx tsx scripts/dfva-go8-crosssection.ts          # print the matrix
 *      npx tsx scripts/dfva-go8-crosssection.ts --codes  # codes to re-score, one per line
 *      npx tsx scripts/dfva-go8-crosssection.ts --json   # full pick list
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import * as path from 'node:path'
import { institutionOf, MELBOURNE } from './lib-institution'

const ROOT = path.resolve(__dirname, '..')
const CAPTURES = path.join(ROOT, 'scrapes/v4')

/** The Group of Eight, in the order the matrix prints. Melbourne first: its
 *  programs are already scored and verified, and are the reference the others
 *  are placed against (v3.1 §10a rule 2). */
export const GO8 = ['unimelb', 'usyd', 'unsw', 'monash', 'uq', 'adelaide', 'anu', 'uwa'] as const

export type Level = 'bachelor' | 'master'

export interface Discipline {
  label: string
  level: Level
  /** Matches a manifest name that carries its award word. */
  award: RegExp
  /** Matches a bare field name (UNSW's handbook form). */
  bare: RegExp
  /** The plain award title. A candidate whose own handbook page is titled this
   *  is the flagship; anything longer is a variant, a double degree or a
   *  specialisation stream. */
  canonical: string[]
}

/** Flagship disciplines: named degrees most of the Go8 run. */
export const DISCIPLINES: Discipline[] = [
  { label: 'Arts', level: 'bachelor', award: /^bachelor of arts$/i, bare: /^arts$/i, canonical: ['bachelor of arts'] },
  { label: 'Science', level: 'bachelor', award: /^bachelor of science$/i, bare: /^science$/i, canonical: ['bachelor of science'] },
  { label: 'Commerce', level: 'bachelor', award: /^bachelor of commerce$/i, bare: /^commerce$/i, canonical: ['bachelor of commerce'] },
  { label: 'Engineering', level: 'bachelor', award: /^bachelor of engineering( \(honours\))?$/i, bare: /^engineering( \(honours\))?$/i, canonical: ['bachelor of engineering', 'bachelor of engineering (honours)'] },
  { label: 'Laws', level: 'bachelor', award: /^bachelor of laws( \(honours\))?$/i, bare: /^laws?( \(honours\))?$/i, canonical: ['bachelor of laws', 'bachelor of laws (honours)'] },
  { label: 'Computing', level: 'bachelor', award: /^bachelor of (computer science|information technology)$/i, bare: /^(computer science|information technology)$/i, canonical: ['bachelor of computer science', 'bachelor of information technology'] },
  { label: 'Business administration', level: 'master', award: /^master of business administration$/i, bare: /^business administration$/i, canonical: ['master of business administration'] },
  { label: 'Public health', level: 'master', award: /^master of public health$/i, bare: /^public health$/i, canonical: ['master of public health'] },
  { label: 'Data science', level: 'master', award: /^master of data science$/i, bare: /^data science$/i, canonical: ['master of data science'] },
]

interface Candidate {
  code: string
  name: string
  slug: string
  url: string
  capturePath: string
  captureBytes: number
  studyLevel: string | null
  isResearch: boolean
  isTable: boolean
  hasStructure: boolean
  title: string | null
}

/** A handbook unit-of-study or elective listing, not a program. Sydney's
 *  manifest names three of these "Bachelor of Laws"; scoring one produces a
 *  Panel C block about a table. */
const TABLE_PAGE = /(unit-of-study-table|-table\.html|electives|subject-areas|unit-search|study-plan)/i

/** The handbook's own title for the page, which is the only name source that
 *  distinguishes a flagship from a double degree: the manifest calls both
 *  `adelaide-barts_bart` and `adelaide-haala_hbaadvblaw` "Bachelor of Arts",
 *  while their pages are titled "Bachelor of Arts (BA)" and "Bachelor of Arts
 *  (Advanced) with Bachelor of Laws (Honours)". Trailing abbreviation and code
 *  parentheticals are dropped; anything left is part of the award. */
export function captureTitle(text: string, code = ''): string | null {
  const m = text.slice(0, 4000).match(/^#{1,3}\s+([A-Za-z].*?)\s*$/m)
  if (!m) return null
  let t = m[1].trim()
  // Drop only trailing parentheticals that repeat the code or abbreviate the
  // award — "(BA)", "(BE(Hons)(Civil))", "(2000)", "(arts-extended)". A word
  // like "(Extended)", "(Honours)" or "(Civil)" names a different award and
  // stays, or the picker would rank a variant as the flagship.
  const abbreviation = (tok: string): boolean => (tok.match(/[A-Z]/g) ?? []).length >= 2
  const bare = code.replace(/^[a-z]+-/, '')
  const droppable = (inner: string): boolean =>
    inner === code ||
    inner === bare ||
    /^\d+$/.test(inner) ||
    inner.split(/\s+/).every(abbreviation)
  for (;;) {
    const m2 = t.match(/^(.*?)\s*\(([^()]*(?:\([^()]*\)[^()]*)*)\)$/)
    if (!m2 || !m2[1].trim() || !droppable(m2[2])) break
    t = m2[1].trim()
  }
  return t || null
}

/** Language every real program page carries somewhere in its structure. */
const STRUCTURE =
  /(award requirements|course structure|program structure|requirements for the (degree|award)|core units|credit points|units of credit|course rules|resolutions of the)/i

function loadCandidates(): Candidate[] {
  const man = JSON.parse(readFileSync(path.join(ROOT, 'scripts/v4_cohort_ext.json'), 'utf8')) as {
    code: string
    name: string
    url?: string
  }[]
  const names = new Map(man.map((m) => [m.code, m.name]))
  const urls = new Map(man.map((m) => [m.code, m.url ?? '']))
  const out: Candidate[] = []
  for (const f of readdirSync(path.join(ROOT, 'dfva/source/evidence'))) {
    if (!f.endsWith('.json')) continue
    const code = f.slice(0, -5)
    const name = names.get(code)
    if (!name) continue
    const capturePath = path.join(CAPTURES, `${code}.txt`)
    if (!existsSync(capturePath)) continue
    const text = readFileSync(capturePath, 'utf8')
    const head = text.slice(0, 3000)
    const url = urls.get(code) ?? ''
    out.push({
      code,
      name,
      slug: institutionOf(code).slug,
      url,
      capturePath,
      captureBytes: statSync(capturePath).size,
      studyLevel: head.match(/\*\*Study Level\*\*:\s*(\w+)/i)?.[1] ?? null,
      // A research degree is out of scope for Panel C v4 at any institution:
      // the instrument reads coursework structure and assessment.
      isResearch: /\/research\/programs\//.test(head) || /\*\*Study Level\*\*:\s*Research/i.test(head),
      isTable: TABLE_PAGE.test(url) || TABLE_PAGE.test(code),
      hasStructure: STRUCTURE.test(text),
      title: captureTitle(text, code),
    })
  }
  return out
}

const LEVEL_OF_STUDY: Record<Level, string> = { bachelor: 'undergraduate', master: 'postgraduate' }

/** The one program that best represents a discipline at an institution:
 *  award-named matches beat bare-named ones, then the plainest name (a flagship
 *  single degree, not a double), then the fullest capture. */
export function pick(cands: Candidate[], slug: string, d: Discipline): Candidate | null {
  const mine = cands.filter((c) => c.slug === slug && !c.isResearch && !c.isTable && c.hasStructure)
  const byAward = mine.filter((c) => d.award.test(c.name))
  const byBare = mine.filter(
    (c) =>
      d.bare.test(c.name) &&
      c.studyLevel !== null &&
      c.studyLevel.toLowerCase() === LEVEL_OF_STUDY[d.level],
  )
  const hits = byAward.length ? byAward : byBare
  if (!hits.length) return null
  const isFlagship = (c: Candidate): number =>
    c.title && d.canonical.includes(c.title.toLowerCase()) ? 0 : 1
  return hits.sort(
    (a, b) =>
      isFlagship(a) - isFlagship(b) ||
      (a.title?.length ?? 999) - (b.title?.length ?? 999) ||
      b.captureBytes - a.captureBytes,
  )[0]
}

export interface Pick {
  code: string
  name: string
  slug: string
  url: string
  discipline: string
  level: Level
  captureBytes: number
}

export function crossSection(): Pick[] {
  const cands = loadCandidates()
  const out: Pick[] = []
  for (const d of DISCIPLINES) {
    for (const slug of GO8) {
      const c = pick(cands, slug, d)
      if (c) out.push({ code: c.code, name: c.title ?? c.name, slug, url: c.url, discipline: d.label, level: d.level, captureBytes: c.captureBytes })
    }
  }
  return out
}

if (require.main === module) {
  const picks = crossSection()
  const toScore = picks.filter((p) => p.slug !== MELBOURNE.slug)

  if (process.argv.includes('--codes')) {
    for (const p of toScore) console.log(p.code)
  } else if (process.argv.includes('--json')) {
    console.log(JSON.stringify(picks, null, 2))
  } else {
    console.log(`Go8 cross-section: ${picks.length} programs across ${DISCIPLINES.length} disciplines\n`)
    console.log('discipline'.padEnd(24) + GO8.map((s) => s.padEnd(10)).join(''))
    for (const d of DISCIPLINES) {
      const row = GO8.map((s) => {
        const p = picks.find((x) => x.slug === s && x.discipline === d.label)
        return (p ? p.code.replace(/^[a-z]+-/, '') : '—').padEnd(10)
      })
      console.log(d.label.padEnd(24) + row.join(''))
    }
    const mb = (toScore.reduce((a, p) => a + p.captureBytes, 0) / toScore.length / 1024).toFixed(1)
    console.log(`\nMelbourne, already scored : ${picks.length - toScore.length}`)
    console.log(`to re-score               : ${toScore.length}  (mean capture ${mb} KB)`)
  }
}
