/**
 * Report-content generator. Regenerates the app's embedded report bodies in
 * compass/app/src/compass/reportContent*.ts FROM the canonical reports/*.md, so
 * the markdown files are the single source of truth. This is the one-command fix
 * whenever dfva:content-check reports drift.
 *
 * It preserves the existing three-file layout and each file's key set (parsed
 * from the file itself), rewriting only { title, institution, markdown } from
 * the source markdown. Score/risk-band metadata is untouched (owned elsewhere).
 *
 * Run: npm --prefix scripts run dfva:gen-content
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import * as path from 'node:path'

const repoRoot = path.resolve(__dirname, '..')
const compassDir = path.join(repoRoot, 'compass/app/src/compass')
const reportsDir = path.join(repoRoot, 'reports')

const GEN_HEADER =
  '// Auto-generated from reports/*.md by scripts/dfva-content-generate.ts — do not edit by hand.\n' +
  '// Run: npm --prefix scripts run dfva:gen-content\n'

// reportContent.ts keeps its imports + spread aggregator; only the inline entries
// (the keys matched below) are regenerated. This preamble is emitted verbatim.
const AGGREGATOR_PREAMBLE =
  GEN_HEADER +
  "import { RECOMMEND_CONTENT_ALL } from './reportContent.recommend-all';\n" +
  "import { REPORT_CONTENT_DOCTORATES } from './reportContent.doctorates';\n\n" +
  'export const REPORT_CONTENT: Record<\n' +
  '  string,\n' +
  '  { title: string; institution: string; markdown: string }\n' +
  '> = {\n' +
  '  ...RECOMMEND_CONTENT_ALL,\n' +
  '  ...REPORT_CONTENT_DOCTORATES,\n'

// Sub-files: each is a uniform `export const SYMBOL: Record<...> = { ... }`.
// Split from the aggregator purely for size (doctorates ~8k lines, recommend ~5k).
const SUBFILES: { file: string; symbol: string }[] = [
  { file: 'reportContent.doctorates.ts', symbol: 'REPORT_CONTENT_DOCTORATES' },
  { file: 'reportContent.recommend-all.ts', symbol: 'RECOMMEND_CONTENT_ALL' },
]

/** Ordered list of embedded keys in a reportContent*.ts file. */
function keysInFile(file: string): string[] {
  const src = readFileSync(path.join(compassDir, file), 'utf8')
  const keys: string[] = []
  const re = /^ {2}"(dfva-[^"]+)":\s*\{/gm
  for (let m; (m = re.exec(src)); ) keys.push(m[1])
  return keys
}

/** Escape markdown for a TS template literal. Order matters: backslash first. */
function escapeTemplate(md: string): string {
  return md.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

/** Escape a title for a double-quoted TS string. */
function escapeTitle(t: string): string {
  return t.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

/** Derive the app title from the md's first heading + a per-type suffix. */
function deriveTitle(key: string, md: string): string {
  const line1 = md.split('\n')[0]
  let name: string
  let suffix: string
  if (key.startsWith('dfva-market-')) {
    name = line1.replace(/^#+\s*DFVA MARKET INTELLIGENCE:\s*/, '')
    suffix = ' — Market Intelligence'
  } else if (key.startsWith('dfva-recommend-')) {
    name = line1.replace(/^#+\s*IMPROVEMENT PLAN:\s*/, '')
    suffix = ' — Improvement Plan'
  } else {
    name = line1.replace(/^#+\s*DFVA REPORT:\s*/, '')
    suffix = ' — DFVA Assessment'
  }
  if (name === line1) {
    throw new Error(
      `Cannot derive title for "${key}": first line ${JSON.stringify(line1)} ` +
        `does not match the expected heading for its report type. Fix reports/${key}.md (run dfva:report-lint).`,
    )
  }
  return name.trim() + suffix
}

/** Render one `"key": { title, institution, markdown }` entry. */
function renderEntry(key: string): string {
  const file = path.join(reportsDir, `${key}.md`)
  if (!existsSync(file)) throw new Error(`Missing source: reports/${key}.md (key "${key}")`)
  const md = readFileSync(file, 'utf8').replace(/\r\n/g, '\n').replace(/\s+$/, '') + '\n'
  const title = deriveTitle(key, md)
  return (
    `  "${key}": {\n` +
    `    title: "${escapeTitle(title)}",\n` +
    `    institution: "University of Melbourne",\n` +
    `    markdown: \`${escapeTemplate(md)}\`,\n` +
    `  },\n`
  )
}

let entriesWritten = 0

// --- Regenerate the aggregator (reportContent.ts) inline entries -------------
{
  const inlineKeys = keysInFile('reportContent.ts')
  const body = inlineKeys.map(renderEntry).join('')
  entriesWritten += inlineKeys.length
  writeFileSync(path.join(compassDir, 'reportContent.ts'), AGGREGATOR_PREAMBLE + body + '};\n', 'utf8')
}

// --- Regenerate each sub-file -----------------------------------------------
for (const { file, symbol } of SUBFILES) {
  const keys = keysInFile(file)
  const body = keys.map(renderEntry).join('')
  const preamble =
    GEN_HEADER +
    `export const ${symbol}: Record<string, { title: string; institution: string; markdown: string }> = {\n`
  entriesWritten += keys.length
  writeFileSync(path.join(compassDir, file), preamble + body + '};\n', 'utf8')
}

console.log(
  `dfva:gen-content OK — regenerated ${entriesWritten} embedded entries across ` +
    `${SUBFILES.length + 1} files from reports/*.md.`,
)
