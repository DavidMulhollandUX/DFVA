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
const GRANDFATHERED = new Set<string>([
  // Category B — 5-section format (H1 title, 3-line metadata, capital-D Date)
  'dfva-b-sci', 'dfva-mc-ba', 'dfva-mc-arch', 'dfva-mc-eng', 'dfva-mc-it',
  'dfva-mc-env', 'dfva-gc-cert', 'dfva-gc-dip', 'dfva-ua', 'dfva-gd-arts',
  'dfva-mc-enveng', 'dfva-mc-engmgmt', 'dfva-mc-urbplan', 'dfva-gd-ag',
  // Category C — 8-section format (misnumbered sections)
  'dfva-746st', 'dfva-527cl', 'dfva-mc-urbdes',
  'dfva-mc-actsc', 'dfva-mc-apbusa', 'dfva-mc-bamktg', 'dfva-mc-base',
  'dfva-mc-clind', 'dfva-mc-datasc', 'dfva-mc-ed', 'dfva-mc-gencoun',
  'dfva-mc-indeng', 'dfva-mc-intedib', 'dfva-mc-is', 'dfva-mc-journ',
  'dfva-mc-nursc', 'dfva-mc-phtyph', 'dfva-mc-prop', 'dfva-mc-propsyc',
  'dfva-mc-scwr', 'dfva-mc-surged', 'dfva-mc-tesol',
  // Category D — PhD/doctorate stubs (~3 sections)
  'dfva-080cl', 'dfva-080cn', 'dfva-300bb', 'dfva-dh-lld', 'dfva-dh-sc',
  'dfva-dr-philabp', 'dfva-dr-philagr', 'dfva-dr-philart', 'dfva-dr-philbe',
  'dfva-dr-philedp', 'dfva-dr-philedu', 'dfva-dr-phileit', 'dfva-dr-philfam',
  'dfva-dr-philik', 'dfva-dr-phillaw', 'dfva-dr-philmdh', 'dfva-dr-philsci',
  'dfva-dr-philvet', 'dfva-mc-ddensur', 'dfva-mc-dmed', 'dfva-mc-doptom',
  'dfva-mc-dphysio', 'dfva-mc-dvetmed', 'dfva-me-dcd',
  // Science MSci stubs
  'dfva-mc-climsci', 'dfva-mc-envsc', 'dfva-mc-scibif', 'dfva-mc-scibio',
  'dfva-mc-scibit', 'dfva-mc-sciche', 'dfva-mc-sciear', 'dfva-mc-sciepi',
  'dfva-mc-sciphy',
  // Bare stubs (missing most sections)
  'dfva-439fs', 'dfva-mc-bmedsc', 'dfva-mc-busana', 'dfva-mc-envlaw',
  'dfva-mc-urbhort',
  // Canonical 10-section but metadata minor issues (single-line pipe not yet applied)
  'dfva-b-des', 'dfva-mc-cs', 'dfva-mc-jurisd',
])

// Market reports — grandfathered until phases 1-2 backfill them
const MARKET_GRANDFATHERED = new Set<string>([
  'dfva-market-b-des', // ### instead of ## section headings
  'dfva-market-b-sci', // ### instead of ##
  // Stub market reports (missing most sections)
  'dfva-market-080cl', 'dfva-market-080cn', 'dfva-market-300bb',
  'dfva-market-439fs', 'dfva-market-527cl', 'dfva-market-746st',
  'dfva-market-dh-lld', 'dfva-market-dh-sc',
  'dfva-market-dr-philabp', 'dfva-market-dr-philagr', 'dfva-market-dr-philart',
  'dfva-market-dr-philbe', 'dfva-market-dr-philedp', 'dfva-market-dr-philedu',
  'dfva-market-dr-phileit', 'dfva-market-dr-philfam', 'dfva-market-dr-philik',
  'dfva-market-dr-phillaw', 'dfva-market-dr-philmdh', 'dfva-market-dr-philsci',
  'dfva-market-dr-philvet',
  'dfva-market-mc-actsc', 'dfva-market-mc-apbusa', 'dfva-market-mc-arch',
  'dfva-market-mc-ba', 'dfva-market-mc-bamktg', 'dfva-market-mc-base',
  'dfva-market-mc-bmedsc', 'dfva-market-mc-busana', 'dfva-market-mc-climsci',
  'dfva-market-mc-clind', 'dfva-market-mc-cs', 'dfva-market-mc-datasc',
  'dfva-market-mc-ddensur', 'dfva-market-mc-dmed', 'dfva-market-mc-doptom',
  'dfva-market-mc-dphysio', 'dfva-market-mc-dvetmed', 'dfva-market-mc-ed',
  'dfva-market-mc-envlaw', 'dfva-market-mc-envsc', 'dfva-market-mc-gencoun',
  'dfva-market-mc-indeng', 'dfva-market-mc-intedib', 'dfva-market-mc-is',
  'dfva-market-mc-journ', 'dfva-market-mc-jurisd', 'dfva-market-mc-nursc',
  'dfva-market-mc-phtyph', 'dfva-market-mc-prop', 'dfva-market-mc-propsyc',
  'dfva-market-mc-scibif', 'dfva-market-mc-scibio', 'dfva-market-mc-scibit',
  'dfva-market-mc-sciche', 'dfva-market-mc-sciear', 'dfva-market-mc-sciepi',
  'dfva-market-mc-sciphy', 'dfva-market-mc-scwr', 'dfva-market-mc-surged',
  'dfva-market-mc-tesol', 'dfva-market-mc-urbdes', 'dfva-market-mc-urbhort',
  'dfva-market-me-dcd',
])

const RECOMMEND_GRANDFATHERED = new Set<string>([
  'dfva-recommend-b-des', 'dfva-recommend-b-sci', 'dfva-recommend-mc-is',
  'dfva-recommend-mc-scibit', 'dfva-recommend-mc-sciear', 'dfva-recommend-mc-sciepi',
])

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
  if (!content.match(/\*\*Risk band: (RESILIENT|MODERATE RISK|HIGH RISK|CRITICAL)/)) {
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
  const h3Sections = content.split('\n').filter((l) => l.startsWith('### ') && /\d/.test(l))
  if (h3Sections.length > 0) {
    issues.push(`${h3Sections.length} section(s) use ### (H3) instead of ## (H2): ${h3Sections.slice(0, 3).join(', ')}`)
  }

  // 6 sections required
  const requiredSections = [
    'JOB FAMILY MAP', 'RECENT JOB AD SIGNALS', 'CURRENT DISCUSSION SIGNALS',
    'WAGE PREMIUM LANDSCAPE', 'SECTOR CONTEXT', 'CURRICULUM SIGNALS SUMMARY',
  ]
  for (const sec of requiredSections) {
    if (!content.includes(`## ${sec}`) && !content.includes(`### ${sec}`)) {
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
  warnings.slice(0, 50).forEach((w) => console.log('  · ' + w))
  if (warnings.length > 50) console.log(`  … and ${warnings.length - 50} more`)
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
