/**
 * Report-content generator. Regenerates the app's embedded report bodies FROM
 * the canonical reports/*.md, so the markdown files are the single source of
 * truth. This is the one-command fix whenever dfva:content-check reports drift.
 *
 * Layout (all generated, never hand-edited):
 *   compass/app/src/compass/reportContent/<key>.ts  — one module per report body
 *   compass/app/src/compass/reportContent/index.ts  — lazy per-slug loaders (client;
 *     each report becomes its own Vite chunk instead of one 3.5MB page bundle)
 *   compass/app/src/compass/reportContent.ts        — eager aggregate map (server +
 *     pipeline scripts only; must never be imported from client pages)
 *
 * The key set is self-describing: it is parsed from the aggregator's entry lines,
 * so adding a course = add its keys there (see docs/adding-a-course.md) and rerun.
 *
 * Run: npm --prefix scripts run dfva:gen-content
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import * as path from 'node:path'

const repoRoot = path.resolve(__dirname, '..')
const compassDir = path.join(repoRoot, 'compass/app/src/compass')
const contentDir = path.join(compassDir, 'reportContent')
const reportsDir = path.join(repoRoot, 'reports')

const GEN_HEADER =
  '// Auto-generated from reports/*.md by scripts/dfva-content-generate.ts — do not edit by hand.\n' +
  '// Run: npm --prefix scripts run dfva:gen-content\n'

/** Ordered list of embedded keys in a reportContent source file (either the
 *  legacy inline `"key": {` entries or the current `"key": rN,` references). */
function keysInFile(file: string): string[] {
  const p = path.join(compassDir, file)
  if (!existsSync(p)) return []
  const src = readFileSync(p, 'utf8')
  const keys: string[] = []
  const re = /^ {2}"(dfva-[^"]+)":/gm
  for (let m; (m = re.exec(src)); ) keys.push(m[1])
  return keys
}

/**
 * Strip HTML comments (e.g. the `<!-- LABOUR-EVIDENCE:START/END -->` injection
 * markers) from the report body. They are pipeline machinery — they stay in the
 * canonical reports/*.md so the labour-evidence injection can find its block, but
 * they must never reach the app: react-markdown (no rehype-raw) renders raw HTML
 * as LITERAL TEXT, so an un-stripped comment shows up verbatim on the live site.
 * dfva-content-check.ts strips the same way, so source↔embedded parity holds.
 */
function stripHtmlComments(md: string): string {
  return md.replace(/[ \t]*<!--[\s\S]*?-->[ \t]*\n?/g, '')
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

/** Render one per-report module's source. */
function renderModule(key: string): string {
  const file = path.join(reportsDir, `${key}.md`)
  if (!existsSync(file)) throw new Error(`Missing source: reports/${key}.md (key "${key}")`)
  const md =
    stripHtmlComments(readFileSync(file, 'utf8').replace(/\r\n/g, '\n')).replace(/\s+$/, '') + '\n'
  const title = deriveTitle(key, md)
  return (
    GEN_HEADER +
    'const content = {\n' +
    `  title: "${escapeTitle(title)}",\n` +
    '  institution: "University of Melbourne",\n' +
    `  markdown: \`${escapeTemplate(md)}\`,\n` +
    '};\n\n' +
    'export default content;\n'
  )
}

// --- Collect the key set ------------------------------------------------------
// Parsed from the aggregator (self-describing). The two legacy sub-files are
// read too so a checkout that predates the per-module layout migrates cleanly;
// they are deleted after a successful run.
const LEGACY_SUBFILES = ['reportContent.doctorates.ts', 'reportContent.recommend-all.ts']
const keys = [
  ...new Set([...keysInFile('reportContent.ts'), ...LEGACY_SUBFILES.flatMap(keysInFile)]),
].sort()
if (keys.length === 0) throw new Error('No report keys found in reportContent.ts')
for (const key of keys) {
  if (!/^dfva-[a-z0-9.-]+$/.test(key)) {
    throw new Error(`Key "${key}" is not filename-safe — refusing to write reportContent/${key}.ts`)
  }
}

// --- Per-report modules -------------------------------------------------------
mkdirSync(contentDir, { recursive: true })
for (const key of keys) {
  writeFileSync(path.join(contentDir, `${key}.ts`), renderModule(key), 'utf8')
}

// Remove per-report modules whose key was dropped from the set.
let stale = 0
for (const f of readdirSync(contentDir)) {
  if (f === 'index.ts' || !f.endsWith('.ts')) continue
  if (!keys.includes(f.slice(0, -3))) {
    unlinkSync(path.join(contentDir, f))
    stale++
  }
}

// --- Lazy loader index (the only reportContent import client pages may use) ---
{
  const loaders = keys.map((k) => `  "${k}": () => import("./${k}"),\n`).join('')
  writeFileSync(
    path.join(contentDir, 'index.ts'),
    GEN_HEADER +
      '\n' +
      'export type ReportContent = {\n' +
      '  title: string;\n' +
      '  institution: string;\n' +
      '  markdown: string;\n' +
      '};\n\n' +
      '// Lazy per-report loaders: each report body is its own Vite chunk, so the\n' +
      '// client downloads only the report(s) it actually renders.\n' +
      'export const REPORT_CONTENT_LOADERS: Record<\n' +
      '  string,\n' +
      '  () => Promise<{ default: ReportContent }>\n' +
      '> = {\n' +
      loaders +
      '};\n\n' +
      'export function hasReportContent(slug: string): boolean {\n' +
      '  return slug in REPORT_CONTENT_LOADERS;\n' +
      '}\n\n' +
      'export async function loadReportContent(\n' +
      '  slug: string,\n' +
      '): Promise<ReportContent | undefined> {\n' +
      '  const loader = REPORT_CONTENT_LOADERS[slug];\n' +
      '  if (!loader) return undefined;\n' +
      '  return (await loader()).default;\n' +
      '}\n',
    'utf8',
  )
}

// --- Eager aggregate (server + scripts only) -----------------------------------
{
  const imports = keys.map((k, i) => `import r${i} from "./reportContent/${k}";\n`).join('')
  const entries = keys.map((k, i) => `  "${k}": r${i},\n`).join('')
  writeFileSync(
    path.join(compassDir, 'reportContent.ts'),
    GEN_HEADER +
      '// Eager aggregate of every report body — for the server (mock service) and\n' +
      '// pipeline scripts ONLY. Client pages must use the lazy loaders in\n' +
      '// ./reportContent/index instead, or every report ships in one bundle again.\n' +
      imports +
      '\n' +
      'export const REPORT_CONTENT: Record<\n' +
      '  string,\n' +
      '  { title: string; institution: string; markdown: string }\n' +
      '> = {\n' +
      entries +
      '};\n',
    'utf8',
  )
}

// --- Drop the legacy sub-files once their keys are migrated --------------------
for (const f of LEGACY_SUBFILES) {
  const p = path.join(compassDir, f)
  if (existsSync(p)) unlinkSync(p)
}

console.log(
  `dfva:gen-content OK — ${keys.length} report modules in src/compass/reportContent/` +
    (stale ? ` (${stale} stale removed)` : '') +
    ', plus lazy index + eager aggregate, from reports/*.md.',
)
