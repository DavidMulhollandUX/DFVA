/**
 * Course director from a handbook capture.
 *
 * The course page's sidebar prints a role label on its own line and the
 * person on the next: "Program Director", "Director of Studies", "Course
 * Coordinators", "Principal Coordinator", "Course Convenor", "Associate Dean
 * (Juris Doctor)", or an inline "Program Director: Name". Some pages print
 * only a "Contact" block with the name and no label. Six pages name no person
 * at all (an email address, or a role title with no holder) and re-capturing
 * them returns the same text.
 *
 * Reads the versioned extract `scrapes/v4/<code>.txt` only.
 *
 *   npx tsx dfva-v4-director.ts           # table: code, rule, role, names, report value
 *   npx tsx dfva-v4-director.ts --diff    # codes whose report disagrees with the capture
 *   npx tsx dfva-v4-director.ts --apply   # fill reports still carrying the old fallback text
 *   npx tsx dfva-v4-director.ts --apply <code> …   # overwrite these reports' director lines
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export interface DirectorHit {
  names: string[]
  role: string | null
  rule: 'label' | 'contact-fallback'
}

/** Header value when the course page names no person. */
export const DIRECTOR_ABSENT = 'not listed on the handbook course page'
/** The wording the 2026-09-02 backfill left behind; the lint now rejects it. */
export const DIRECTOR_OLD_FALLBACK = "not recorded in this cycle's handbook capture"

// ── Regexes ────────────────────────────────────────────────────────────────
/** A role label on its own line (optionally a markdown heading, optionally colon-terminated). */
const LABEL_RE =
  /^(?:##\s*)?((?:Course |Program |Principal )?(?:Directors?|Coordinators?|Convenors?)|Directors? of Studies|Associate Dean(?: \([^)]*\))?)\s*:?\s*$/
/** "Program Director: Name", "Program Director, Name", "Coordinator (Curriculum) – Name". */
const INLINE_RE = /^((?:Course |Program |Principal )?(?:Director|Coordinator|Convenor)(?: \(([^)]*)\))?)\s*[:,–-]\s*(.+)$/
const CONTACT_RE = /^(?:##\s*)?Contact\s*$/
const WINDOW_END_RE = /^(?:##\s*)?Overview\s*$/
/** Sub-heading kept as an annotation on the name(s) that follow it. */
const ANNOT_RE =
  /^(Semester \d|(?:Master|Bachelor|Doctor|Graduate Certificate|Graduate Diploma) of [^:\n]{2,60}|Faculty of [^:\n]{2,60})\s*:?$/
/** Lines to step over inside a block. */
const SKIP_RE = /^(?:E(?:mail)?\s*:|Phone\b|Tel\b|\S+@\S+$)/
/** Words that never occur in a person-name line on these pages. */
const NOT_PERSON_RE =
  /\b(?:School|Faculty|Department|Institute|Centre|Center|Group|Office|Library|University|Campus|Street|Success|Coordination|Information|Enquir\w*|Students?|Australia|Hub|Level|Education|Services?|Support|Team|Unit|Handbook|Planner|Form|Online|Admissions?|Study|Research|Training|Graduate|Undergraduate|Courses?|Subjects?|Melbourne|Arts|Contact|Semester|Overview|Currently|Planning|Further|General|Future|Prospective|Stop\d*)\b/
const TITLE = String.raw`(?:Dr|Prof|Professor|A\/Prof|A\/PROF|Assoc(?:iate)? Prof(?:essor)?|Mr|Ms|Mrs|Miss)\.?`
const NAME_RE = new RegExp(
  String.raw`^(?:${TITLE}\s+)?\p{Lu}[\p{L}'’.-]+(?:\s+(?:\p{Lu}[\p{L}'’.-]+|de|van|der|von|da|di|la|le))+(?:\s*\([^)]*\))?$`,
  'u',
)
const PLURAL_RE = /^(?:Associate Professors|Professors|Drs)\s+(.+?)\s+and\s+(.+)$/
const TRAILING_EMAIL_RE = /\s*[-–:]?\s*\S+@\S+\s*$/

/** Person name(s) printed on one line, or [] if the line is not a name line. */
function namesOnLine(raw: string): string[] {
  const line = raw.replace(TRAILING_EMAIL_RE, '').trim()
  if (!line || line.includes('@') || /https?:|\.edu\.au|:$/.test(line)) return []
  const pm = line.match(PLURAL_RE)
  if (pm) return [pm[1], pm[2]].flatMap((n) => namesOnLine(n))
  const core = line.replace(/\s*\([^)]*\)$/, '')
  if (NOT_PERSON_RE.test(core) || core.split(/\s+/).length > 6) return []
  return NAME_RE.test(line) ? [line] : []
}

/** Director family first; the handbook prints several roles on one page. */
const RANK: [RegExp, number][] = [
  [/^(?:Course |Program )?Directors?$|^Directors? of Studies$/, 0],
  [/Convenor/, 1],
  [/^(?:Course )?Coordinators?(?: \(|$)/, 2],
  [/^Principal Coordinator/, 3],
  [/^Associate Dean/, 4],
]
const rank = (role: string) => RANK.find(([re]) => re.test(role))?.[1] ?? 9

interface Block {
  role: string
  names: string[]
}

const annotate = (name: string, annot: string | null) => (annot && !name.includes('(') ? `${name} (${annot})` : name)

function parseBlocks(lines: string[], start: number, end: number): Block[] {
  const blocks: Block[] = []
  let cur: Block | null = null
  let annot: string | null = null
  for (let i = start; i < end; i++) {
    const raw = lines[i].trim()
    if (!raw) continue
    const lm = raw.match(LABEL_RE)
    if (lm) {
      cur = { role: lm[1].trim(), names: [] }
      blocks.push(cur)
      annot = null
      continue
    }
    const im = raw.match(INLINE_RE)
    if (im) {
      const ns = namesOnLine(im[3]).map((n) => annotate(n, im[2] ?? null))
      if (ns.length) {
        const family = im[1].replace(/\s*\(.*$/, '')
        if (cur && cur.role.replace(/s?:?$/, '') === family) cur.names.push(...ns)
        else {
          cur = { role: family, names: ns }
          blocks.push(cur)
        }
        continue
      }
    }
    if (!cur) continue
    if (SKIP_RE.test(raw)) continue
    const am = raw.match(ANNOT_RE)
    if (am) {
      annot = am[1].trim()
      continue
    }
    const ns = namesOnLine(raw)
    if (ns.length) {
      cur.names.push(...ns.map((n) => annotate(n, annot)))
      annot = null
      continue
    }
    cur = null // any other line closes the block
    annot = null
  }
  return blocks
}

/** The course page's text: after its SOURCE marker, up to the next marker. */
function courseBlock(text: string, code: string): string {
  const re = new RegExp(`^===== SOURCE: https://handbook\\.unimelb\\.edu\\.au/\\d{4}/courses/${code} =====$`, 'm')
  const m = re.exec(text)
  if (!m) return text
  const rest = text.slice(m.index + m[0].length)
  const next = rest.search(/^===== SOURCE: /m)
  return next === -1 ? rest : rest.slice(0, next)
}

/** The person(s) the course page names for the program, or null when it names none. */
export function extractDirector(text: string, code: string): DirectorHit | null {
  const lines = courseBlock(text, code).split('\n')
  // Sidebar window: first Contact/role-label line → the body's "Overview" line.
  const start = lines.findIndex((l) => CONTACT_RE.test(l.trim()) || LABEL_RE.test(l.trim()))
  if (start === -1) return null
  let end = lines.length
  for (let i = start + 1; i < lines.length; i++) {
    if (WINDOW_END_RE.test(lines[i].trim())) {
      end = i
      break
    }
  }
  const blocks = parseBlocks(lines, start, end).filter((b) => b.names.length)
  if (blocks.length) {
    const best = blocks.reduce((a, b) => (rank(b.role) < rank(a.role) ? b : a))
    return { names: best.names, role: best.role, rule: 'label' }
  }
  const ci = lines.findIndex((l, i) => i >= start && CONTACT_RE.test(l.trim()))
  if (ci === -1) return null
  const names: string[] = []
  let annot: string | null = null
  let seen = 0
  for (let i = ci + 1; i < end && seen < 8; i++) {
    const raw = lines[i].trim()
    if (!raw) continue
    seen++
    if (LABEL_RE.test(raw)) continue
    const am = raw.match(ANNOT_RE)
    if (am) {
      annot = am[1].trim()
      continue
    }
    const ns = namesOnLine(raw)
    if (ns.length) {
      names.push(...ns.map((n) => annotate(n, annot)))
      annot = null
    }
  }
  return names.length ? { names, role: null, rule: 'contact-fallback' } : null
}

/** "Directors of Studies" → "Director of Studies"; "Associate Dean (X)" → "Associate Dean, X". */
function singularRole(role: string): string {
  return role
    .replace(/^((?:Course |Program |Principal )?(?:Director|Coordinator|Convenor))s\b/, '$1')
    .replace(/^Directors of Studies$/, 'Director of Studies')
    .replace(/^Associate Dean \(([^)]*)\)$/, 'Associate Dean, $1')
}

/** The header value: names joined with "; ", non-director roles inside the parenthetical. */
export function renderDirector(hit: DirectorHit | null): string {
  if (!hit) return DIRECTOR_ABSENT
  if (hit.role === null || /^(?:Course |Program )?Directors?$/.test(hit.role)) return hit.names.join('; ')
  const role = singularRole(hit.role)
  return hit.names
    .map((n) => {
      const m = n.match(/^(.*?)\s*\(([^)]*)\)$/)
      return m ? `${m[1]} (${role}, ${m[2]})` : `${n} (${role})`
    })
    .join('; ')
}

// ── CLI ────────────────────────────────────────────────────────────────────
const DIRECTOR_LINE_RE = /^\*\*(?:Course|Program) Director:\*\* (.+)$/m

function main(): void {
  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const dir = path.join(repoRoot, 'scrapes', 'v4')
  const mode = process.argv[2] ?? 'table'
  const forced = new Set(process.argv.slice(3))
  const files = readdirSync(dir)
    .filter((f) => f.endsWith('.txt') && !f.startsWith('.'))
    .sort()
  const bare = (s: string) => s.replace(/\s*\(.*\)$/, '')
  let applied = 0
  let diffs = 0
  for (const f of files) {
    const code = f.replace(/\.txt$/, '')
    const hit = extractDirector(readFileSync(path.join(dir, f), 'utf8'), code)
    const rendered = renderDirector(hit)
    const reportPath = path.join(repoRoot, 'reports', `dfva-v4-${code}.md`)
    const report = existsSync(reportPath) ? readFileSync(reportPath, 'utf8') : null
    const current = report?.match(DIRECTOR_LINE_RE)?.[1].trim() ?? null
    const stale = current === DIRECTOR_OLD_FALLBACK
    const agrees =
      current === null || stale || current === rendered || (hit !== null && bare(hit.names[0]) === current)
    if (mode === '--apply') {
      if (report && (stale || forced.has(code))) {
        writeFileSync(reportPath, report.replace(DIRECTOR_LINE_RE, `**Course Director:** ${rendered}`))
        applied++
        console.log(`${code}: ${rendered}`)
      }
      continue
    }
    if (mode === '--diff') {
      if (!agrees) {
        diffs++
        console.log(`${code.padEnd(11)} report="${current}"\n${''.padEnd(11)} capture="${rendered}"`)
      }
      continue
    }
    console.log(
      `${code.padEnd(11)} ${(hit?.rule ?? 'none').padEnd(16)} ${(hit?.role ?? '-').padEnd(34)} ${rendered}${
        current === null ? '' : agrees ? '' : '   ≠ report'
      }`,
    )
  }
  if (mode === '--apply') console.log(`applied ${applied}`)
  if (mode === '--diff') console.log(`${diffs} report(s) disagree with the capture`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main()
