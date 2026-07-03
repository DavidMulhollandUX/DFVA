/**
 * Report-content drift check (CI guard). The app serves report bodies from
 * hand-maintained TypeScript in compass/app/src/compass/reportContent*.ts, while
 * the canonical linted source is reports/*.md. These two copies drift silently
 * (the Juris Doctor assessment, market, and improvement-plan reports were all
 * stale in the app three times running). This fails CI when any wired program's
 * embedded markdown no longer matches its reports/<key>.md source.
 *
 * Compares RUNTIME STRING VALUES (not source bytes), so em-dash escaping
 * (`—` in TS vs literal `—` in md) is irrelevant — both resolve to the same
 * character. Score/risk-band metadata is out of scope (guarded by
 * dfva-registry-check.ts).
 *
 * Run: npm --prefix scripts run dfva:content-check  (also part of dfva:check)
 */
import { existsSync, readFileSync } from 'node:fs'
import * as path from 'node:path'
import { REPORT_CONTENT } from '../compass/app/src/compass/reportContent'

const repoRoot = path.resolve(__dirname, '..')

/**
 * Collapse benign formatting differences so the check flags real content
 * divergence (a dropped section, changed prose) rather than whitespace noise.
 * Deliberately does NOT touch em-dashes, table-cell padding, or inner content —
 * keep it strict enough to catch a missing `##`/`###` section.
 */
function normalize(s: string): string {
  return s
    .replace(/\r\n/g, '\n') // CRLF → LF
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/, '')) // strip trailing whitespace
    .join('\n')
    .replace(/\n{3,}/g, '\n\n') // collapse 2+ blank lines to one
    .replace(/^\n+/, '') // strip leading blank lines
    .replace(/\n+$/, '') // strip trailing blank lines
}

/** First differing line (1-indexed) plus a short excerpt from each side. */
function firstDiff(a: string, b: string): string {
  const la = a.split('\n')
  const lb = b.split('\n')
  const n = Math.max(la.length, lb.length)
  for (let i = 0; i < n; i++) {
    if (la[i] !== lb[i]) {
      return [
        `    first diff at line ${i + 1}:`,
        `      embedded: ${JSON.stringify(la[i] ?? '<end of file>')}`,
        `      reports/: ${JSON.stringify(lb[i] ?? '<end of file>')}`,
      ].join('\n')
    }
  }
  return '    (differ only in length/trailing content)'
}

const drift: string[] = []
let compared = 0
let skipped = 0

for (const key of Object.keys(REPORT_CONTENT)) {
  const file = path.join(repoRoot, 'reports', `${key}.md`)
  if (!existsSync(file)) {
    // Coverage analysis found every embedded key has a source .md; guard anyway.
    skipped++
    continue
  }
  compared++
  const embedded = normalize(REPORT_CONTENT[key].markdown)
  const source = normalize(readFileSync(file, 'utf8'))
  if (embedded !== source) {
    drift.push(`  - ${key}\n${firstDiff(embedded, source)}`)
  }
}

if (drift.length > 0) {
  console.error(
    `dfva:content-check FAILED — ${drift.length} report(s) drifted between reports/*.md and app REPORT_CONTENT.\n` +
      `Fix: npm --prefix scripts run dfva:gen-content  (regenerates reportContent*.ts from reports/*.md;\n` +
      `port superior app prose up into the md first if the embedded copy is the better one):`,
  )
  for (const d of drift) console.error(d)
  process.exit(1)
}

console.log(
  `dfva:content-check OK — ${compared} report bodies match reports/*.md` +
    (skipped > 0 ? ` (${skipped} key(s) skipped: no source .md)` : '') +
    '.',
)
