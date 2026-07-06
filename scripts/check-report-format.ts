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

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const reportsDir = path.join(repoRoot, 'reports')

const REPORT_FILES = readdirSync(reportsDir).filter(
  (f) => f.startsWith('dfva-') && f.endsWith('.md') && !f.includes('recommend-') && !f.includes('market-') && !f.includes('faculty-')
)
const MARKET_FILES = readdirSync(reportsDir).filter((f) => f.startsWith('dfva-market-') && f.endsWith('.md'))
const RECOMMEND_FILES = readdirSync(reportsDir).filter((f) => f.startsWith('dfva-recommend-') && f.endsWith('.md'))

// ── GRANDFATHERED: files already non-conformant when this check was introduced ──
// Remove slugs here as phases 1-2 align them. End state = empty Set, strict for all.
const GRANDFATHERED = new Set<string>([])

// Market reports — grandfathered until phases 1-2 backfill them
const MARKET_GRANDFATHERED = new Set<string>([])

const RECOMMEND_GRANDFATHERED = new Set<string>([])

const errors: string[] = []
const warnings: string[] = []
const resolvable: string[] = []

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

  // Sections use ## (H2), not ### (H3)
  // Flag only mis-leveled numbered TOP-LEVEL sections (### N. NAME), not intentional
  // subsections like "### JF-1: ..." or "### Declining Demand".
  const h3Sections = content.split('\n').filter((l) => /^### \d+\.\s/.test(l))
  if (h3Sections.length > 0) {
    issues.push(`${h3Sections.length} section(s) use ### (H3) instead of ## (H2): ${h3Sections.slice(0, 3).join(', ')}`)
  }

  // 6 sections required
  const requiredSections = [
    'JOB FAMILY MAP', 'RECENT JOB AD SIGNALS', 'CURRENT DISCUSSION SIGNALS',
    'SKILL SHIFT SUMMARY', 'CURRICULUM IMPLICATIONS', 'EVIDENCE CONFIDENCE + GAPS',
  ]
  for (const sec of requiredSections) {
    // Sections are H2/H3 with an optional "N. " numeric prefix, e.g. "## 1. JOB FAMILY MAP"
    const secEsc = sec.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const secRe = new RegExp(`^#{2,3} (?:\\d+\\. )?${secEsc}`, 'm')
    if (!secRe.test(content)) {
      issues.push(`missing section "${sec}"`)
    }
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

  // Current/Target lines
  if (!content.match(/\*\*Current:\*\* \d{1,2}\/36/)) {
    issues.push('missing **Current:** N/36 line')
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

// ── Output ──

const totalFiles = REPORT_FILES.length + MARKET_FILES.length + RECOMMEND_FILES.length
console.log(
  `Reports: ${REPORT_FILES.length} assessment + ${MARKET_FILES.length} market + ${RECOMMEND_FILES.length} recommend = ${totalFiles} total`
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
