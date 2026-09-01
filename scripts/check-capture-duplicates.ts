/**
 * H4 guard: detect a raw capture belonging to another program.
 *
 * mc-evalo was scored entirely against the Master of Environment: its
 * courses/mc-evalo/course-structure page came back byte-identical to
 * components/mc-env-spec-3/course-structure, and the capture queue derived all
 * 34 subject pages from the wrong degree. Every evidence line matched, so the
 * verifier was silent — this check catches the CAUSE, not the symptom: the same
 * text appearing in two programs' captures.
 *
 * NARROWING (measured over the 3,478 raw pages of 500+ chars):
 *   all pages            244 shared hashes  — nearly all legitimately shared subjects
 *   excluding subj-*       1 shared hash    — the mc-evalo defect itself
 *
 * `subj-` pages are excluded because subjects are legitimately shared between
 * degrees. A duplicate under a course / structure / component / attributes path
 * FAILS; any other duplicate is reported without failing.
 *
 *   npx tsx check-capture-duplicates.ts
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const RAW = path.join(ROOT, 'scrapes/v4/raw')

// scrapes/v4/raw/ is a gitignored capture intermediate (CLAUDE.md: "capture
// runs locally"). A CI checkout never has it, so there is nothing to check —
// that is not a finding, it is the expected state of a fresh clone.
if (!existsSync(RAW)) {
  console.log('check-capture-duplicates: skipped — no local scrapes/v4/raw/ (gitignored, capture runs locally)')
  process.exit(0)
}

// <code>__<slug>.json with a "text" field.
interface RawPage {
  file: string
  code: string
  slug: string
  text: string
}

const pages: RawPage[] = []
for (const f of readdirSync(RAW).sort()) {
  const m = f.match(/^([a-z0-9-]+)__(.+)\.json$/i)
  if (!m) continue
  try {
    const doc = JSON.parse(readFileSync(path.join(RAW, f), 'utf8')) as { text?: unknown }
    if (typeof doc.text !== 'string' || doc.text.length < 500) continue // below quoting size; noise
    pages.push({ file: f, code: m[1].toLowerCase(), slug: m[2], text: doc.text })
  } catch {
    // unreadable page is not this guard's defect
  }
}

const byHash = new Map<string, RawPage[]>()
for (const p of pages) {
  const h = createHash('sha256').update(p.text).digest('hex').slice(0, 16)
  byHash.set(h, [...(byHash.get(h) ?? []), p])
}

const failures: string[] = []
const others: string[] = []
for (const [hash, group] of byHash) {
  if (group.length < 2) continue
  const codes = new Set(group.map((g) => g.code))
  if (codes.size < 2) continue // same program, duplicated slug — not cross-program
  if (group.every((g) => g.slug.startsWith('subj-'))) continue // legitimate subject sharing
  const desc = group.map((g) => `${g.file}`).join(' ≡ ')
  if (group.some((g) => /^(course|structure|component|attributes)/.test(g.slug))) {
    failures.push(`${desc}  (sha256:${hash})`)
  } else {
    others.push(desc)
  }
}

console.log(`check-capture-duplicates: compared ${pages.length} raw page(s) across programs`)

if (failures.length) {
  console.error(`\n❌ ${failures.length} page(s) appear verbatim under TWO program codes on a program-owned path:`)
  for (const f of failures) console.error(`   ${f}`)
  console.error(
    '   A course/structure/component page that is byte-identical to another program\'s means\n' +
      '   one of the captures fetched the wrong degree. Recapture and re-score; never edit evidence to match.',
  )
}
if (others.length) {
  console.log(`\n${others.length} duplicate(s) on other paths (reported, not failing):`)
  for (const o of others.slice(0, 10)) console.log(`   ${o}`)
}
if (!failures.length && !others.length) console.log('✓ no capture appears under two program codes')

if (failures.length) process.exit(1)
