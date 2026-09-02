/**
 * Report format lint — the guardrail for the canonical report template.
 * Run: npm --prefix scripts run dfva:report-lint
 *
 * Validates every reports/dfva-*.md against docs/report-template.md.
 * FAILS the build on new non-conformance; grandfathered files only warn.
 *
 * Ratchet: every file currently failing is in the GRANDFATHERED allowlist.
 * After phases 1-2 align a file, remove it from the list — the lint
 * tells you which ones are ready.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { V4_RESEARCH_DEGREES } from '../compass/app/src/compass/v4/data/v4PanelC'
import { loadV4Names, normaliseDegreeName } from './lib-v4-names'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const reportsDir = path.join(repoRoot, 'reports')

const REPORT_FILES = readdirSync(reportsDir).filter(
  (f) =>
    f.startsWith('dfva-') &&
    f.endsWith('.md') &&
    !f.includes('recommend-') &&
    !f.includes('market-') &&
    !f.includes('faculty-') &&
    !f.startsWith('dfva-v4-') &&
    !f.startsWith('dfva-v4r-')
)
const MARKET_FILES = readdirSync(reportsDir).filter((f) => f.startsWith('dfva-market-') && f.endsWith('.md'))
const RECOMMEND_FILES = readdirSync(reportsDir).filter((f) => f.startsWith('dfva-recommend-') && f.endsWith('.md'))
// v4 families — canonical templates in dfva/dist/v4/ (generated from dfva/source/rubricV4.ts)
const V4_FILES = readdirSync(reportsDir).filter(
  (f) => f.startsWith('dfva-v4-') && !f.startsWith('dfva-v4-recommend-') && f.endsWith('.md')
)
const V4_RECOMMEND_FILES = readdirSync(reportsDir).filter(
  (f) => f.startsWith('dfva-v4-recommend-') && f.endsWith('.md')
)
// Research degrees: no Panel C (no taught curriculum) and no Panel A (no
// destination basis resolves), so this family carries the v1 assessment as
// NARRATIVE ONLY. Scaffold: scripts/dfva-v4r-report-scaffold.ts
const V4R_FILES = readdirSync(reportsDir).filter(
  (f) => f.startsWith('dfva-v4r-') && f.endsWith('.md')
)

// ── GRANDFATHERED: files already non-conformant when this check was introduced ──
// Remove slugs here as phases 1-2 align them. End state = empty Set, strict for all.
const GRANDFATHERED = new Set<string>([])

// Market reports — grandfathered until phases 1-2 backfill them.
//
// §3 sourcing debt (added 2026-08-14) is fully backfilled — that grandfather
// list is empty. The 150 slugs below carry a DIFFERENT, newer debt: the §4
// SKILL SHIFT SUMMARY table-shape rule added 2026-09-01 (see the "canonical
// Skill|Direction|Rationale table" check below). A 2026-08-24 mechanical
// regeneration flattened most reports' §4 into a "### Declining Demand" /
// "### Rising Demand" bullet list. All 149 grandfathered reports were
// restored to the canonical table on 2026-09-01. End state reached: empty
// set. Leave empty; add a slug back only if a future report is intentionally
// shipped with a non-canonical §4 and needs to warn instead of fail.
const MARKET_GRANDFATHERED = new Set<string>([])

const RECOMMEND_GRANDFATHERED = new Set<string>([])

const errors: string[] = []
const warnings: string[] = []
const resolvable: string[] = []

const V4_NAMES = loadV4Names()

interface ReportIssue {
  slug: string
  issues: string[]
}

function readReport(filename: string): string {
  return readFileSync(path.join(reportsDir, filename), 'utf-8')
}

// ── Assessment report checks ──

for (const file of REPORT_FILES) {
  const slug = file.replace('.md', '')
  const grandfathered = GRANDFATHERED.has(slug)
  const issues: string[] = []
  const content = readReport(file)
  const lines = content.split('\n')

  // 1. Title: must be "## DFVA REPORT: <Name> (<CODE>)"
  const titleLine = lines.find((l) => l.startsWith('## DFVA REPORT:'))
  if (!titleLine) {
    issues.push('missing H2 title "## DFVA REPORT: <Name> (<CODE>)"')
  } else if (!/^## DFVA REPORT: .+ \(.+\)$/.test(titleLine.trim())) {
    issues.push(`title missing program code in parentheses: "${titleLine.trim()}"`)
  } else {
    checkTitleName(slug, titleLine.trim(), issues)
  }

  // 2. Metadata: single-line pipe-separated
  const metaLine = lines.find((l) => l.startsWith('**Institution:'))
  if (!metaLine) {
    issues.push('missing single-line metadata (**Institution:** ... | **Level:** ... | **Duration:** ...)')
  } else if (!metaLine.includes('|')) {
    issues.push('metadata not single-line pipe-separated')
  }

  // 3. Assessment date: lowercase "d"
  const dateLine = lines.find((l) => l.startsWith('**Assessment date:**'))
  const badDateLine = lines.find((l) => l.startsWith('**Assessment Date:**'))
  if (badDateLine && !dateLine) {
    issues.push('uses "**Assessment Date:**" (capital D) — should be lowercase "date"')
  }

  // 4. All 10 sections present and correctly numbered
  const sectionPatterns = [
    { num: 1, name: 'PROGRAM PROFILE' },
    { num: 2, name: 'AUTOMATION EXPOSURE PROFILE' },
    { num: 3, name: 'MARKET EVIDENCE SNAPSHOT' },
    { num: 4, name: 'DFVA SCORECARD' },
    { num: 5, name: 'THREE THRESHOLD QUESTIONS' },
    { num: 6, name: 'ANALOGUE GRADUATE PROFILE' },
    { num: 7, name: 'VERDICT' },
    { num: 8, name: 'RECOMMENDATIONS' },
    { num: 9, name: 'THE REDESIGNED GRADUATE PROFILE' },
    { num: 10, name: 'MARKET CONFIDENCE NOTE' },
  ]
  for (const { num, name } of sectionPatterns) {
    const heading = `### ${num}. ${name}`
    if (!content.includes(heading)) {
      // Try to find if the heading exists with wrong number
      const wrongNum = lines.find((l) => l.startsWith('###') && l.includes(name) && !l.startsWith(`### ${num}.`))
      if (wrongNum) {
        issues.push(`section "${name}" numbered "${wrongNum.trim()}" — should be "### ${num}. ${name}"`)
      } else {
        issues.push(`missing section "### ${num}. ${name}"`)
      }
    }
  }

  // 5. Scorecard: exactly 11 rows (D1-D10 + B), TOTAL line, Risk band line
  const scorecardHeader = lines.find((l) => l.includes('| # | Dimension |') && l.includes('Score'))
  if (scorecardHeader) {
    // Count data rows in scorecard (rows starting with | # | where # is 1-10 or B)
    const scorecardRows = lines.filter((l) => /^\| \d{1,2} \|/.test(l.trim()) || /^\| B \|/.test(l.trim()))
    if (scorecardRows.length > 0 && scorecardRows.length !== 11) {
      issues.push(`scorecard has ${scorecardRows.length} rows (expected 11: D1-D10 + B)`)
    }
  }

  // TOTAL line
  if (!content.match(/\*\*TOTAL: \d{1,2} \/ 36\*\*/)) {
    issues.push('missing or malformed TOTAL line (**TOTAL: N / 36**)')
  }

  // Risk band line
  if (
    !content.match(/\*\*Risk band: (RESILIENT|MODERATE RISK|HIGH RISK|CRITICAL|NOT RATABLE)/)
  ) {
    issues.push('missing or malformed Risk band line')
  }

  // 6. Q1-Q3 answer format
  for (const q of ['Q1', 'Q2', 'Q3']) {
    const qLine = lines.find((l) => l.includes(`**${q}:**`) || l.includes(`**${q}**`))
    if (!qLine) {
      issues.push(`missing threshold question ${q}`)
    }
  }

  // 7. MARKET DATA table
  if (!content.includes('### MARKET DATA')) {
    issues.push('missing "### MARKET DATA" section')
  }

  if (issues.length) {
    if (grandfathered) {
      warnings.push(...issues.map((i) => `${slug}: ${i} [grandfathered]`))
    } else {
      errors.push(...issues.map((i) => `${slug}: ${i}`))
    }
  }
  if (grandfathered && issues.length === 0) {
    resolvable.push(slug)
  }
}

// ── Market report checks ──

// An attribution is a dated month-year, a bracketed link, or a named
// outlet/commentator/study. Used both section-wide (3+ required) and per
// marked theme (1+ each).
const ATTRIBUTION_PATTERNS = [
  /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+20\d\d\b/g,
  /\]\(https?:\/\//g,
  /\b(?:HR Brew|HR Dive|HRD Australia|hcamag|SHRM|Personnel Today|Harvard Business Review|Fortune|LinkedIn|Deloitte|Greenhouse|Robert Half|Gartner|AHRI|Reddit|University of [A-Z][a-z]+)\b/g,
]
const countAttributions = (text: string): number =>
  ATTRIBUTION_PATTERNS.reduce((n, re) => n + [...text.matchAll(re)].length, 0)

// ── H9 guard: the H1 must name the RIGHT degree, not just any degree ──
// check-report-format used to verify the title's FORMAT only. A market report
// shipped titled "Master of Business Analytics" for an MBA/Master of Marketing
// program. Compare the parsed name against the generated v4 registry; compare
// only where the registry has a name for the code.
function checkTitleName(slug: string, firstLine: string, issues: string[]): void {
  const m = firstLine.match(/\(([^)]+)\)\s*$/)
  const nameMatch = firstLine.match(/^[^:]+:\s*(.+?)\s*\([^)]*\)\s*$/)
  if (!m || !nameMatch) return
  const code = m[1].toLowerCase()
  const expected = V4_NAMES.get(code)
  if (!expected) return
  if (normaliseDegreeName(nameMatch[1]) !== normaliseDegreeName(expected)) {
    issues.push(`title names "${nameMatch[1]}" but the registry has "${expected}" for ${m[1]}`)
  }
}

// ── Reader-facing vocabulary (review item 11, 2026-09-02) ──
// Acronyms that must be expanded somewhere in any report a reader sees. The
// check is order-insensitive so a generated block (the LABOUR-EVIDENCE footer)
// can carry the expansion.
const ACRONYM_EXPANSIONS: Array<[RegExp, RegExp, string]> = [
  [/\bAIOE\b/, /AI Occupational Exposure/, 'AIOE → "AI Occupational Exposure (AIOE)"'],
  [/\bJSA HEO\b/, /Jobs and Skills Australia/, 'JSA HEO → "Jobs and Skills Australia Higher Education Outcomes (JSA HEO)"'],
  [/\bSOC\b/, /Standard Occupational Classification/, 'SOC → "Standard Occupational Classification (SOC)"'],
  [/\bAQF\b/, /Australian Qualifications Framework/, 'AQF → "Australian Qualifications Framework (AQF)"'],
  [/\bJIR\b/, /Job Insights Report/, 'JIR → "Job Insights Report (JIR)"'],
  [/\bRHD\b/, /research higher degree/i, 'RHD → "research higher degree (RHD)"'],
]
function checkAcronyms(content: string, issues: string[]): void {
  for (const [use, expansion, hint] of ACRONYM_EXPANSIONS) {
    if (use.test(content) && !expansion.test(content)) issues.push(`uses an unexpanded acronym: ${hint}`)
  }
}

// Internal pipeline vocabulary that must not reach a market report's reader.
// "Adzuna" is a named source and is allowed; repo paths, field names and the
// instrument's internal panel name are not.
const MARKET_DENYLIST: Array<[RegExp, string]> = [
  [/\bcrosswalk/i, '"crosswalk" (say "mapped to the exposure index")'],
  [/\bjobAds\b/, '"jobAds" (say "the job-advertisement sample")'],
  [/\btopSkills\b/, '"topSkills" (describe the skill-keyword extraction)'],
  [/\btopEmployers\b/, '"topEmployers" (describe the named-employer list)'],
  [/\bmechanical:\s*true\b/, '"mechanical: true" (say the evidence was checked mechanically)'],
  [/\bdata\/(?:aioe|jsa|professions|labour|handbook)/, 'a data/ repository path'],
  [/\bdfva\/source\b/, 'a dfva/source repository path'],
  [/\bscratch\//, 'a scratch/ repository path'],
  [/\bPanel C\b/, '"Panel C" (say "the durability report\'s curriculum evidence")'],
]
const stripLabourBlock = (content: string): string =>
  content.replace(/<!-- LABOUR-EVIDENCE:START -->[\s\S]*?<!-- LABOUR-EVIDENCE:END -->/g, '')

// The set of scored coursework programs: the family whose report page renders
// the market card, so its market report must carry the destinations footer.
const SCORED_CODES = new Set(V4_FILES.map((f) => f.slice('dfva-v4-'.length, -'.md'.length)))

for (const file of MARKET_FILES) {
  const slug = file.replace('.md', '')
  const grandfathered = MARKET_GRANDFATHERED.has(slug)
  const issues: string[] = []
  const content = readReport(file)

  // Title: "# DFVA MARKET INTELLIGENCE: <Name> (<CODE>)"
  const firstLine = content.split('\n')[0].trim()
  if (!/^# DFVA MARKET INTELLIGENCE: .+ \(.+\)$/.test(firstLine)) {
    issues.push(`title mismatch: "${firstLine}"`)
  }
  checkTitleName(slug, firstLine, issues)

  // Sections use ## (H2), not ### (H3)
  // Flag only mis-leveled numbered TOP-LEVEL sections (### N. NAME), not intentional
  // subsections like "### JF-1: ..." or "### Declining Demand".
  const h3Sections = content.split('\n').filter((l) => /^### \d+\.\s/.test(l))
  if (h3Sections.length > 0) {
    issues.push(`${h3Sections.length} section(s) use ### (H3) instead of ## (H2): ${h3Sections.slice(0, 3).join(', ')}`)
  }

  // 6 sections required. The third slot accepts either title: files whose
  // section 3 is a salary table (not discourse) use INDICATIVE SALARY BANDS
  // per the 2026-08 UX review (U11 — heading must match content).
  const requiredSections: string[][] = [
    ['JOB FAMILY MAP'], ['RECENT JOB AD SIGNALS'],
    ['CURRENT DISCUSSION SIGNALS', 'INDICATIVE SALARY BANDS'],
    ['SKILL SHIFT SUMMARY'], ['CURRICULUM IMPLICATIONS'], ['EVIDENCE CONFIDENCE + GAPS'],
  ]
  for (const alternatives of requiredSections) {
    // Sections are H2/H3 with an optional "N. " numeric prefix, e.g. "## 1. JOB FAMILY MAP";
    // a confidence suffix after the name (e.g. " — LOW CONFIDENCE") is allowed.
    const found = alternatives.some((sec) => {
      const secEsc = sec.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      return new RegExp(`^#{2,3} (?:\\d+\\. )?${secEsc}`, 'm').test(content)
    })
    if (!found) {
      issues.push(`missing section "${alternatives.join('" or "')}"`)
    }
  }

  // Discussion signals must be SOURCED, not synthesised.
  //
  // Added 2026-08-14. A market report's §3 is the section most easily written
  // from general knowledge and passed off as observation — it reads like
  // reporting whether or not anyone reported anything. Two rules:
  //
  //   (a) it must declare what kind of sources it rests on, and
  //   (b) it must actually attribute — outlets, dates, named commentators.
  //
  // The specific failure this prevents: describing discourse as if sampled from
  // X or LinkedIn when what was really consulted was trade press quoting those
  // platforms' data. Those are different claims and only one is usually true.
  const discussion = content.split(/^#{2,3} (?:\d+\. )?CURRENT DISCUSSION SIGNALS/m)[1]
  if (discussion) {
    // Body runs to the next KNOWN top-level section, not the next capitalised
    // heading — "### Theme N" subheadings are part of §3 and must stay in scope.
    // (The original boundary cut at the first theme heading, so the global
    // count only ever saw the preamble; found 2026-08-14 while proving the
    // per-theme check fires.)
    const body = discussion.split(/^#{2,3} (?:\d+\. )?(?:SKILL SHIFT SUMMARY|CURRICULUM IMPLICATIONS|EVIDENCE CONFIDENCE)/m)[0] ?? ''
    const declares = /What these sources are|Sourcing basis|Sources for this section/i.test(body)
    if (!declares) {
      issues.push(
        'section 3 has no sourcing declaration — state what the sources are (trade press, ' +
        'named commentary, reported survey data, academic work) and whether any platform ' +
        'was sampled directly',
      )
    }
    // Attribution: a dated month-year, a named outlet, or a bracketed link.
    const attributions = countAttributions(body)
    if (attributions < 3) {
      issues.push(
        `section 3 carries ${attributions} attribution(s) (need 3+): name the outlet, the ` +
        'commentator or the study behind each theme, with a date where the source has one',
      )
    }
    // Each marked theme must also carry its own attribution — the section total
    // can clear 3 while one theme (often the most quotable) rests on nothing.
    // That shipped to dev on 2026-08-14 (MC-MGMTHRE theme 2). Fires only where
    // themes are marked as "### Theme" headings; prose-style sections are
    // covered by the global count above.
    const themes = body.split(/^### Theme\b/m).slice(1)
    for (const [i, theme] of themes.entries()) {
      if (countAttributions(theme) === 0) {
        issues.push(
          `section 3 theme ${i + 1} carries no attribution — every theme needs an outlet, ` +
          'commentator or study of its own, with a date where the source has one',
        )
      }
    }
    // Claiming a platform sample is a specific, checkable claim.
    if (/\bwe (?:sampled|scraped|extracted)\b/i.test(body) && !/not (?:a )?(?:scrape|sampled)/i.test(body)) {
      issues.push('section 3 claims a platform sample — say which platform, over what window, and how many items')
    }
  }

  // Section 4 (SKILL SHIFT SUMMARY) must be the canonical Skill|Direction|Rationale
  // table (docs/report-template.md), not a bullet list. A 2026-08-24 mechanical
  // regeneration flattened it to "### Declining Demand"/"### Rising Demand" bullets
  // on many reports; this is what would have caught that regression at commit time.
  const skillShift = content.split(/^#{2,3} (?:\d+\. )?SKILL SHIFT SUMMARY/m)[1]
  if (skillShift) {
    const body = skillShift.split(/^#{2,3} (?:\d+\. )?CURRICULUM IMPLICATIONS/m)[0] ?? ''
    const hasCanonicalTable = /\|\s*Skill\s*\|\s*Direction\s*\|\s*Rationale\s*\|/i.test(body)
    if (!hasCanonicalTable) {
      issues.push(
        'section 4 is not the canonical "| Skill | Direction | Rationale |" table ' +
        '(docs/report-template.md) — a bullet list or a different column set was found instead',
      )
    }
  }

  // §4 heading is anchored: no "(DECLINING vs RISING)" suffix or other decoration.
  if (/^## 4\. SKILL SHIFT SUMMARY/m.test(content) && !/^## 4\. SKILL SHIFT SUMMARY$/m.test(content)) {
    issues.push('section 4 heading must be exactly "## 4. SKILL SHIFT SUMMARY"')
  }

  // Confidence vocabulary is closed to HIGH / MEDIUM / LOW.
  for (const m of content.matchAll(/\b([A-Z][A-Z-]*) CONFIDENCE\b/g)) {
    if (!['HIGH', 'MEDIUM', 'LOW', 'EVIDENCE'].includes(m[1])) {
      issues.push(`"${m[1]} CONFIDENCE" is outside the HIGH / MEDIUM / LOW vocabulary`)
    }
  }

  // No stray H2 outside the six numbered sections (a "## Key Signals" shipped in mc-climsci).
  for (const l of content.split('\n')) {
    if (/^## /.test(l) && !/^## \d\. /.test(l) && !/^## REAL GRADUATE DESTINATIONS/.test(l)) {
      issues.push(`stray H2 outside the numbered sections: "${l.trim()}"`)
    }
  }

  // Reader-facing vocabulary.
  const readerBody = stripLabourBlock(content)
  for (const [re, what] of MARKET_DENYLIST) {
    if (re.test(readerBody)) issues.push(`carries internal vocabulary: ${what}`)
  }
  checkAcronyms(content, issues)

  // Destinations footer for every scored coursework program.
  const code = slug.slice('dfva-market-'.length)
  if (SCORED_CODES.has(code) && !(content.includes('<!-- LABOUR-EVIDENCE:START -->') && content.includes('<!-- LABOUR-EVIDENCE:END -->'))) {
    issues.push('missing the LABOUR-EVIDENCE destinations footer — run: python3 scripts/build-market-footer.py ' + code + ' --apply')
  }

  if (issues.length) {
    if (grandfathered) {
      warnings.push(...issues.map((i) => `${slug}: ${i} [grandfathered]`))
    } else {
      errors.push(...issues.map((i) => `${slug}: ${i}`))
    }
  }
  if (grandfathered && issues.length === 0) {
    resolvable.push(slug)
  }
}

// ── Recommend report checks ──

for (const file of RECOMMEND_FILES) {
  const slug = file.replace('.md', '')
  const grandfathered = RECOMMEND_GRANDFATHERED.has(slug)
  const content = readReport(file)
  const issues: string[] = []

  // Title: "## IMPROVEMENT PLAN: <Name>"
  const firstLine = content.split('\n')[0].trim()
  if (!firstLine.startsWith('## IMPROVEMENT PLAN:')) {
    issues.push(`title mismatch: "${firstLine}"`)
  }

  // No N/36 requirement: ReportMarkdownCard strips the v1 composite as a UX
  // defect, so demanding it here contradicted the renderer (review item 11).

  if (issues.length) {
    if (grandfathered) {
      warnings.push(...issues.map((i) => `${slug}: ${i} [grandfathered]`))
    } else {
      errors.push(...issues.map((i) => `${slug}: ${i}`))
    }
  }
  if (grandfathered && issues.length === 0) {
    resolvable.push(slug)
  }
}

// ── v4 report checks (rules 1–6 at the foot of dfva/dist/v4/report-template-v4.md) ──

const V4_TEMPLATE = path.join(repoRoot, 'dfva', 'dist', 'v4', 'report-template-v4.md')

// The instrument version is read from the canonical source, never hardcoded — a
// v4.x bump must not require editing the linter (and must not silently pass
// reports still stamped with the previous version).
const V4_INSTRUMENT_VERSION = (() => {
  const src = readFileSync(path.join(repoRoot, 'dfva', 'source', 'rubricV4.ts'), 'utf8')
  const m = src.match(/export const V4_VERSION = '([^']+)'/)
  if (!m) throw new Error('check-report-format: cannot read V4_VERSION from dfva/source/rubricV4.ts')
  return m[1]
})()
const V4_INSTRUMENT_LINE = `**Instrument:** DFVA ${V4_INSTRUMENT_VERSION}`
/** "4.1-draft" → "v4.1", the form the section-2 heading uses. */
const V4_HEADING_VERSION = `v${V4_INSTRUMENT_VERSION.replace(/-draft$/, '')}`

for (const file of V4_FILES) {
  const slug = file.replace('.md', '')
  const content = readReport(file)
  const lines = content.split('\n')
  const issues: string[] = []

  // 1. Instrument line in the header; title names the registry's program
  if (!content.includes(V4_INSTRUMENT_LINE)) {
    issues.push(`missing "${V4_INSTRUMENT_LINE}" header line`)
  }
  checkTitleName(slug, lines[0].trim(), issues)

  // 1b. Frontmatter: a real assessment date and a director line (review item 11).
  if (!/^\*\*Assessment date:\*\* \d{4}-\d{2}-\d{2}\b/m.test(content)) {
    issues.push('header needs "**Assessment date:** YYYY-MM-DD" ("unrecorded" is not a date)')
  }
  if (!/^\*\*(?:Course|Program) Director:\*\* \S/m.test(content)) {
    issues.push('header needs a "**Course Director:** …" line (scripts/dfva-v4-director.ts reads it from the capture; "not listed on the handbook course page" when the page names nobody)')
  }
  if (content.includes("not recorded in this cycle's handbook capture")) {
    issues.push('director line carries the retired fallback text; run `npx tsx scripts/dfva-v4-director.ts --apply`')
  }

  // 2. Six numbered sections, in order, each with a Basis: tag
  const sectionHeads = lines.filter((l) => /^## \d\. /.test(l))
  const expected = ['## 1. POSITION', `## 2. PANEL C ${V4_HEADING_VERSION} SCORECARD`, '## 3. GATES', '## 4. MARKET EVIDENCE', '## 5. CURRICULUM IMPLICATIONS', '## 6. EVIDENCE CONFIDENCE']
  expected.forEach((prefix, i) => {
    const head = sectionHeads[i]
    if (!head || !head.startsWith(prefix)) {
      issues.push(`section ${i + 1}: expected heading starting "${prefix}", got "${head ?? 'missing'}"`)
    } else if (!head.includes('Basis:')) {
      issues.push(`section ${i + 1}: heading is missing its "Basis:" tag`)
    }
  })

  // 3. Section 5 opens with the mandatory interpretation sentence
  const s5 = content.split(/^## 5\. /m)[1] ?? ''
  if (!s5.includes('This section argues from the preceding evidence; it is interpretation, not observation.')) {
    issues.push('section 5 must open with the mandatory interpretation sentence')
  }

  // 4. Every scorecard item row cites at least one [n] reference marker.
  //    Scoped to §2: other sections (e.g. §5 implications) also key rows by item.
  const scorecardSection = (content.split(/^## 2\. /m)[1] ?? '').split(/^## \d\. /m)[0] ?? ''
  const scorecardRows = scorecardSection.split('\n').filter((l) => /^\| C\d /.test(l.trim()))
  if (scorecardRows.length !== 5) {
    issues.push(`section 2 scorecard: expected 5 item rows (C1–C5), found ${scorecardRows.length}`)
  }
  scorecardRows.forEach((row) => {
    if (!/\[\d+\]/.test(row)) issues.push(`scorecard row lacks a reference marker: "${row.slice(0, 60)}…"`)
  })

  // 5. REFERENCES section matches the canonical generated list, byte-exact per entry
  if (existsSync(V4_TEMPLATE)) {
    const tmpl = readFileSync(V4_TEMPLATE, 'utf-8')
    // The canonical list lives in the fenced block under "### REFERENCES".
    const refBlock = (tmpl.split(/^### REFERENCES$/m)[1] ?? '').split('```')[1] ?? ''
    const canonical = refBlock.split('\n').filter((l) => /^\d+\. /.test(l))
    const inReport = (content.split(/^## REFERENCES$/m)[1] ?? '').split('\n').filter((l) => /^\d+\. /.test(l))
    if (canonical.length && inReport.join('\n') !== canonical.slice(0, inReport.length).join('\n')) {
      issues.push('REFERENCES section does not match the canonical generated list (dfva/dist/v4/report-template-v4.md)')
    }
    if (inReport.length !== canonical.length) {
      issues.push(`REFERENCES: expected ${canonical.length} entries, found ${inReport.length}`)
    }
  } else {
    issues.push('canonical v4 template missing — run: npm --prefix scripts run dfva:gen-v4')
  }

  // 6. No v1 composite, no Irreplaceability score, anywhere
  if (/\d{1,2}\/36/.test(content)) issues.push('carries a v1 composite ("N/36") — forbidden in the v4 family')
  if (/Irreplaceability.*\d\/3|\bB:\s*\d\/3/.test(content)) issues.push('carries an Irreplaceability score — retired in v4')

  // 6b. §4 carries the two canonical tables (docs/dfva-report-section-authoring.md),
  //     each exactly once, with well-formed rows. These sections are rendered on
  //     the report page (review item 16), so a drifted header is a visible defect.
  {
    const s4 = (content.split(/^## 4\. /m)[1] ?? '').split(/^## \d\. /m)[0] ?? ''
    const s4Lines = s4.split('\n')
    const t1 = '| Job family | Entry titles | AI substitution pressure | Skills rising in that family |'
    const t2 = '| Signal or shift | Direction | Bearing on the scored items |'
    const count = (h: string) => s4Lines.filter((l) => l.trim() === h).length
    if (count(t1) !== 1) issues.push(`section 4: expected exactly one canonical Table 1 header "${t1}", found ${count(t1)}`)
    if (count(t2) !== 1) issues.push(`section 4: expected exactly one canonical Table 2 header "${t2}", found ${count(t2)}`)
    const cellsOf = (l: string) => l.trim().split(/(?<!\\)\|/).slice(1, -1)
    for (const header of [t1, t2]) {
      const at = s4Lines.findIndex((l) => l.trim() === header)
      if (at < 0) continue
      const width = cellsOf(header).length
      let rows = 0
      for (let i = at + 2; i < s4Lines.length && s4Lines[i].trim().startsWith('|'); i++) {
        rows++
        const cells = cellsOf(s4Lines[i])
        if (cells.length !== width) issues.push(`section 4 table row has ${cells.length} cells, expected ${width}: "${s4Lines[i].slice(0, 60)}…"`)
        if (cells.some((c) => /^\s*(?:—|-|)\s*$/.test(c))) issues.push(`section 4 table row has an empty cell: "${s4Lines[i].slice(0, 60)}…"`)
      }
      if (rows === 0) issues.push(`section 4 table under "${header.slice(0, 30)}…" has no rows`)
    }
  }
  checkAcronyms(content, issues)

  // 7. No unfilled scaffold left behind. dfva-v4-report-scaffold.ts derives the
  //    machine-checkable sections and marks §4/§5 for an author; a report still
  //    carrying those marks would publish an empty market and implications
  //    section that every other rule here would happily pass.
  if (content.includes('TO BE AUTHORED') || /<!-- AUTHOR:S\d/.test(content)) {
    issues.push('carries unfilled scaffold markers — §4/§5 still need authoring (scripts/dfva-v4-report-scaffold.ts)')
  }

  if (issues.length) errors.push(...issues.map((i) => `${slug}: ${i}`))
}

// ── v4 recommend checks (rules at the foot of dfva/dist/v4/recommend-template-v4.md) ──

const V4_RECOMMEND_TEMPLATE = path.join(repoRoot, 'dfva', 'dist', 'v4', 'recommend-template-v4.md')

for (const file of V4_RECOMMEND_FILES) {
  const slug = file.replace('.md', '')
  const content = readReport(file)
  const lines = content.split('\n')
  const issues: string[] = []

  // 1. Title + instrument line
  if (!lines[0].startsWith('# DFVA v4 IMPROVEMENT PLAN:')) {
    issues.push(`title mismatch: "${lines[0]}"`)
  }
  if (!content.includes(V4_INSTRUMENT_LINE)) {
    issues.push(`missing "${V4_INSTRUMENT_LINE}" header line`)
  }

  // 2. Sections 1–6 in order, each with a Basis: tag; §1 opens with the mandatory sentence
  const sectionHeads = lines.filter((l) => /^## \d\. /.test(l))
  const expected = ['## 1. DIAGNOSTIC SUMMARY', '## 2. SCORE-TO-ACTION MAP', '## 3. MARKET ALIGNMENT', '## 4. PRIORITISED INTERVENTIONS', '## 5. GATE GUARDRAILS', '## 6. WHAT WOULD CHANGE THE SCORE']
  expected.forEach((prefix, i) => {
    const head = sectionHeads[i]
    if (!head || !head.startsWith(prefix)) {
      issues.push(`section ${i + 1}: expected heading starting "${prefix}", got "${head ?? 'missing'}"`)
    } else if (!head.includes('Basis:')) {
      issues.push(`section ${i + 1}: heading is missing its "Basis:" tag`)
    }
  })
  const s1 = content.split(/^## 1\. /m)[1] ?? ''
  if (!s1.includes('This plan argues from the preceding scored evidence and market data')) {
    issues.push('section 1 must open with the mandatory interpretation sentence')
  }
  checkTitleName(slug, lines[0].trim(), issues)
  checkAcronyms(content, issues)

  // 3. At least one web-linked citation mark
  if (!/\[\[\d+\]\]\(http/.test(content)) {
    issues.push('no web-linked citation mark ("[[n]](http…)") found')
  }

  // 4. REFERENCES byte-exact against the canonical generated list
  if (existsSync(V4_RECOMMEND_TEMPLATE)) {
    const tmpl = readFileSync(V4_RECOMMEND_TEMPLATE, 'utf-8')
    const refBlock = (tmpl.split(/^## REFERENCES \(canonical\)$/m)[1] ?? '').split('```')[1] ?? ''
    const canonical = refBlock.split('\n').filter((l) => /^\d+\. /.test(l))
    const inReport = (content.split(/^## REFERENCES$/m)[1] ?? '').split('\n').filter((l) => /^\d+\. /.test(l))
    if (canonical.length === 0 || inReport.join('\n') !== canonical.join('\n')) {
      issues.push('REFERENCES section does not match the canonical generated list (dfva/dist/v4/recommend-template-v4.md)')
    }
  } else {
    issues.push('canonical v4 recommend template missing — run: npm --prefix scripts run dfva:gen-v4')
  }

  // 5. No v1 composite, no Irreplaceability
  if (/\d{1,2}\/36/.test(content)) issues.push('carries a v1 composite ("N/36") — forbidden in the v4 family')
  if (/Irreplaceability.*\d\/3|\bB:\s*\d\/3/.test(content)) issues.push('carries an Irreplaceability score — retired in v4')

  // 6. Every section 1–6 carries its content in a table, not flat prose
  const sectionBodies = content.split(/^## (?=\d\. )/m).slice(1)
  sectionBodies.forEach((body, i) => {
    if (!/^\|.*\|\s*$/m.test(body)) {
      issues.push(`section ${i + 1}: no markdown table — v4 recommend sections are tabular`)
    }
  })

  // 7. Full citations belong in REFERENCES, not inline: bare URLs outside the
  //    reference list defeat the linked-mark form and clutter the body.
  const bodyOnly = content.split(/^## REFERENCES$/m)[0] ?? ''
  const bareUrls = (bodyOnly.match(/(?<!\()https?:\/\/\S+/g) ?? []).filter(
    (u) => !u.includes('handbook.unimelb.edu.au')
  )
  if (bareUrls.length) {
    issues.push(`${bareUrls.length} bare URL(s) in the body — cite as [[n]](url) and keep full citations in REFERENCES`)
  }

  if (issues.length) errors.push(...issues.map((i) => `${slug}: ${i}`))
}

// ── Output ──

// ── v4r research-degree checks ─────────────────────────────────────────────
// This family exists because a research degree can carry NO v4 score: Panel C
// has no taught curriculum to read (a category fact) and Panel A resolves to no
// destination basis (an evidence gap). The report's whole job is to say both and
// then carry the v1 assessment as narrative. So the rules enforce exactly that:
// the two reasons are stated, and no score of any instrument appears.
for (const file of V4R_FILES) {
  const slug = file.replace('.md', '')
  const content = readReport(file)
  const lines = content.split('\n')
  const issues: string[] = []

  if (!/^# DFVA RESEARCH DEGREE REPORT: .+ \(.+\)$/.test(lines[0].trim())) {
    issues.push(`title mismatch: "${lines[0].trim()}"`)
  }
  checkTitleName(slug, lines[0].trim(), issues)
  checkAcronyms(content, issues)

  // Four numbered sections, in order, each carrying a Basis: tag.
  const heads = lines.filter((l) => /^## \d\. /.test(l))
  const expected = [
    '## 1. WHY THIS PROGRAM CARRIES NO v4 SCORE',
    '## 2. ASSESSMENT CARRIED FORWARD',
    '## 3. MARKET EVIDENCE',
    '## 4. LIMITATIONS',
  ]
  for (const [i, prefix] of expected.entries()) {
    const head = heads[i]
    if (!head?.startsWith(prefix)) {
      issues.push(`section ${i + 1}: expected heading starting "${prefix}", got "${head ?? 'missing'}"`)
    } else if (!/Basis:/.test(head)) {
      issues.push(`section ${i + 1}: heading is missing its "Basis:" tag`)
    }
  }

  // Both non-applicability reasons must be stated. Stating only the curriculum
  // one reads as "Panel A is pending", which is the misreading this family exists
  // to prevent.
  const s1 = (content.split(/^## 1\. /m)[1] ?? '').split(/^## \d\. /m)[0] ?? ''
  if (!/Panel C has nothing to score/.test(s1)) {
    issues.push('section 1 must state the Panel C reason ("Panel C has nothing to score" — no taught curriculum)')
  }
  if (!/Panel A has no destination basis/.test(s1)) {
    issues.push('section 1 must state the Panel A reason ("Panel A has no destination basis" — the resolver returns none)')
  }

  // Narrative only: no score from any instrument, v1 or v4.
  if (/\b\d{1,2}\/36\b/.test(content)) issues.push('carries a v1 composite ("N/36") — this family is narrative only')
  if (/\b\d\/3\b/.test(content)) issues.push('carries a dimension or Panel C score ("d/3") — this family is narrative only')
  if (/Irreplaceability[^.]*\b\d\b/.test(content)) issues.push('carries an Irreplaceability score — retired, and this family is narrative only')

  // A scored program must not be in this family, and vice versa.
  const code = slug.replace(/^dfva-v4r-/, '')
  if (!V4_RESEARCH_DEGREES.includes(code)) {
    issues.push(`${code} is not in V4_RESEARCH_DEGREES — only research degrees belong in this family`)
  }

  if (issues.length) {
    errors.push(...issues.map((i) => `${slug}: ${i}`))
  }
}

// ── Cross-family coverage: every scored coursework program ships all three v4 artefacts ──
// V4ReportPage renders the market card and the improvement-plan card for every
// program in the dfva-v4- family. A missing sibling renders as a silent blank
// (b-famusth and b-fapro shipped that way on 2026-09-01), so the set identity
// is asserted here rather than discovered on the page.
{
  const codesOf = (files: string[], prefix: string) =>
    new Set(files.map((f) => f.slice(prefix.length, -'.md'.length)))
  const v4 = codesOf(V4_FILES, 'dfva-v4-')
  const market = codesOf(MARKET_FILES, 'dfva-market-')
  const plans = codesOf(V4_RECOMMEND_FILES, 'dfva-v4-recommend-')
  for (const code of v4) {
    if (!market.has(code)) errors.push(`dfva-v4-${code}: no dfva-market-${code}.md — the report page renders an empty market card`)
    if (!plans.has(code)) errors.push(`dfva-v4-${code}: no dfva-v4-recommend-${code}.md — the report page promises an improvement plan and renders none`)
  }
  for (const code of plans) {
    if (!v4.has(code)) errors.push(`dfva-v4-recommend-${code}: no dfva-v4-${code}.md — a plan without a scored report`)
  }
}

const totalFiles =
  REPORT_FILES.length + MARKET_FILES.length + RECOMMEND_FILES.length + V4_FILES.length + V4_RECOMMEND_FILES.length + V4R_FILES.length
console.log(
  `Reports: ${REPORT_FILES.length} assessment + ${MARKET_FILES.length} market + ${RECOMMEND_FILES.length} recommend + ${V4_FILES.length} v4 + ${V4_RECOMMEND_FILES.length} v4-recommend + ${V4R_FILES.length} v4r-research = ${totalFiles} total`
)

if (warnings.length) {
  console.log(`\n${warnings.length} grandfathered issue(s) (tracked debt, not a failure):`)
  warnings.slice(0, 9999).forEach((w) => console.log('  · ' + w))
  if (warnings.length > 9999) console.log(`  … and ${warnings.length - 50} more`)
}

if (resolvable.length) {
  console.log(`\n🎉 ${resolvable.length} grandfathered file(s) are now aligned — remove from GRANDFATHERED:`)
  resolvable.forEach((s) => console.log('  - ' + s))
}

if (errors.length) {
  console.error(`\n❌ ${errors.length} report format error(s):`)
  errors.forEach((e) => console.error('  - ' + e))
  process.exit(1)
}

console.log('\n✅ Report format check passed.')
