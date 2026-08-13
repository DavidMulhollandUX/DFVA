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
  (f) =>
    f.startsWith('dfva-') &&
    f.endsWith('.md') &&
    !f.includes('recommend-') &&
    !f.includes('market-') &&
    !f.includes('faculty-') &&
    !f.startsWith('dfva-v4-')
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

// ── v4 report checks (rules 1–6 at the foot of dfva/dist/v4/report-template-v4.md) ──

const V4_TEMPLATE = path.join(repoRoot, 'dfva', 'dist', 'v4', 'report-template-v4.md')

for (const file of V4_FILES) {
  const slug = file.replace('.md', '')
  const content = readReport(file)
  const lines = content.split('\n')
  const issues: string[] = []

  // 1. Instrument line in the header
  if (!content.includes('**Instrument:** DFVA 4.0-draft')) {
    issues.push('missing "**Instrument:** DFVA 4.0-draft" header line')
  }

  // 2. Six numbered sections, in order, each with a Basis: tag
  const sectionHeads = lines.filter((l) => /^## \d\. /.test(l))
  const expected = ['## 1. POSITION', '## 2. PANEL C v4 SCORECARD', '## 3. GATES', '## 4. MARKET EVIDENCE', '## 5. CURRICULUM IMPLICATIONS', '## 6. EVIDENCE CONFIDENCE']
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
  if (!s5.includes('This section argues from the evidence above; it is interpretation, not observation.')) {
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
  if (!content.includes('**Instrument:** DFVA 4.0-draft')) {
    issues.push('missing "**Instrument:** DFVA 4.0-draft" header line')
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
  if (!s1.includes('This plan argues from the scored evidence and market data')) {
    issues.push('section 1 must open with the mandatory interpretation sentence')
  }

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

const totalFiles =
  REPORT_FILES.length + MARKET_FILES.length + RECOMMEND_FILES.length + V4_FILES.length + V4_RECOMMEND_FILES.length
console.log(
  `Reports: ${REPORT_FILES.length} assessment + ${MARKET_FILES.length} market + ${RECOMMEND_FILES.length} recommend + ${V4_FILES.length} v4 + ${V4_RECOMMEND_FILES.length} v4-recommend = ${totalFiles} total`
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
