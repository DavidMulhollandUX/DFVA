import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'
import { checkV4Report, checkMarketReport, checkRecommendReport } from './check-report-format'

// Fixtures: mutate a real, currently-passing report one thing at a time
// rather than hand-authoring a synthetic report — the 2026-09-02 rules key
// off exact table headers, heading text and header lines that are easy to
// get subtly wrong in a hand-built fixture, and a real base proves the rule
// actually passes on real content, not just on a fixture shaped to please it.
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const reportsDir = path.join(repoRoot, 'reports')
const read = (f: string) => readFileSync(path.join(reportsDir, f), 'utf8')

const v4Base = read('dfva-v4-mc-cs.md')
const marketBase = read('dfva-market-mc-cs.md')

// ── base fixtures pass cleanly ──

test('the unmodified v4 base report carries no issues', () => {
  assert.deepEqual(checkV4Report('dfva-v4-mc-cs', v4Base), [])
})

test('the unmodified market base report carries no issues', () => {
  assert.deepEqual(checkMarketReport('dfva-market-mc-cs', marketBase), [])
})

// ── v4 §4 canonical tables (docs/dfva-report-section-authoring.md) ──

const T1 = '| Job family | Entry titles | AI substitution pressure | Skills rising in that family |'
const T2 = '| Signal or shift | Direction | Bearing on the scored items |'

test('§4 table 1 missing its canonical header fails', () => {
  const mutated = v4Base.replace(T1, '| Job family | Entry titles | AI substitution pressure |')
  const issues = checkV4Report('x', mutated)
  assert.ok(issues.some((i) => i.includes('expected exactly one canonical Table 1 header') && i.includes('found 0')))
})

test('§4 table 2 duplicated header fails', () => {
  const mutated = v4Base.replace(T2, `${T2}\n${T2}`)
  const issues = checkV4Report('x', mutated)
  assert.ok(issues.some((i) => i.includes('expected exactly one canonical Table 2 header') && i.includes('found 2')))
})

test('§4 table row with an empty cell fails', () => {
  const mutated = v4Base.replace(
    '| Manual CRUD web development | Falling very fast | — entry-role output, not curriculum |',
    '| Manual CRUD web development | Falling very fast | — |',
  )
  const issues = checkV4Report('x', mutated)
  assert.ok(issues.some((i) => i.includes('table row has an empty cell')))
})

// ── acronym first-use expansion ──

test('AIOE used without its expansion fails', () => {
  const mutated = v4Base.replace('Felten AI Occupational Exposure (AIOE) index', 'Felten AIOE index')
  const issues = checkV4Report('x', mutated)
  assert.ok(issues.some((i) => i.includes('AIOE → "AI Occupational Exposure (AIOE)"')))
})

test('JIR used without its expansion fails', () => {
  const mutated = v4Base.replace('Job Insights Report (JIR)', 'JIR')
  const issues = checkV4Report('x', mutated)
  assert.ok(issues.some((i) => i.includes('JIR → "Job Insights Report (JIR)"')))
})

test('JSA HEO used without its expansion fails', () => {
  const mutated = marketBase.replace(
    'Jobs and Skills Australia Higher Education Outcomes (JSA HEO)',
    'JSA HEO',
  )
  const issues = checkMarketReport('x', mutated)
  assert.ok(issues.some((i) => i.includes('JSA HEO → "Jobs and Skills Australia Higher Education Outcomes (JSA HEO)"')))
})

test('SOC, AQF and RHD each fail when used with no expansion anywhere in the file', () => {
  const cases: [string, string][] = [
    ['SOC codes classify occupations.', 'SOC → "Standard Occupational Classification (SOC)"'],
    ['The AQF sets qualification levels.', 'AQF → "Australian Qualifications Framework (AQF)"'],
    ['Graduates may pursue an RHD.', 'RHD → "research higher degree (RHD)"'],
  ]
  for (const [injected, expectedHint] of cases) {
    const issues = checkV4Report('x', `${v4Base}\n\n${injected}\n`)
    assert.ok(
      issues.some((i) => i.includes(expectedHint)),
      `expected an issue containing ${JSON.stringify(expectedHint)} for input ${JSON.stringify(injected)}`,
    )
  }
})

test('an acronym that IS expanded in the same file does not fail', () => {
  const mutated = `${v4Base}\n\nStandard Occupational Classification (SOC) codes are unrelated to this scoring.\n`
  const issues = checkV4Report('x', mutated)
  assert.ok(!issues.some((i) => i.includes('SOC →')))
})

// ── market denylist (internal pipeline vocabulary must not reach the reader) ──

test('each denylisted term fails when it appears outside the LABOUR-EVIDENCE footer', () => {
  const cases: [string, string][] = [
    ['This score was mapped via the crosswalk.', '"crosswalk"'],
    ['This uses jobAds internally.', '"jobAds"'],
    ['See topSkills for the extraction.', '"topSkills"'],
    ['See topEmployers for the list.', '"topEmployers"'],
    ['Source file: data/aioe/felten_aioe.json.', 'a data/ repository path'],
    ['See Panel C for the curriculum evidence.', '"Panel C"'],
  ]
  for (const [injected, expectedHint] of cases) {
    const mutated = marketBase.replace(
      '## 6. EVIDENCE CONFIDENCE + GAPS',
      `## 6. EVIDENCE CONFIDENCE + GAPS\n\n${injected}\n`,
    )
    const issues = checkMarketReport('x', mutated)
    assert.ok(
      issues.some((i) => i.includes('carries internal vocabulary') && i.includes(expectedHint)),
      `expected a denylist issue containing ${JSON.stringify(expectedHint)} for input ${JSON.stringify(injected)}`,
    )
  }
})

test('denylisted terms inside the LABOUR-EVIDENCE footer are ignored', () => {
  assert.ok(marketBase.includes('<!-- LABOUR-EVIDENCE:START -->'))
  // The footer's own content (crosswalk vintage note etc.) never trips the
  // rule — it is stripped before the denylist scan runs.
  const withCrosswalkInFooter = marketBase.replace(
    '<!-- LABOUR-EVIDENCE:START -->',
    '<!-- LABOUR-EVIDENCE:START -->\n(mapped via the crosswalk)',
  )
  const issues = checkMarketReport('x', withCrosswalkInFooter)
  assert.ok(!issues.some((i) => i.includes('crosswalk')))
})

// ── director line ──

test('the retired director fallback text fails', () => {
  const mutated = v4Base.replace(
    '**Course Director:** Ling Luo',
    "**Course Director:** not recorded in this cycle's handbook capture",
  )
  const issues = checkV4Report('x', mutated)
  assert.ok(issues.some((i) => i.includes('retired fallback text')))
})

test('a missing director line fails', () => {
  const mutated = v4Base.replace('**Course Director:** Ling Luo\n', '')
  const issues = checkV4Report('x', mutated)
  assert.ok(issues.some((i) => i.includes('needs a "**Course Director:**')))
})

test('a director line with no name after the colon fails', () => {
  const mutated = v4Base.replace('**Course Director:** Ling Luo', '**Course Director:**')
  const issues = checkV4Report('x', mutated)
  assert.ok(issues.some((i) => i.includes('needs a "**Course Director:**')))
})

// ── assessment date ──

test('**Assessment date:** must be YYYY-MM-DD', () => {
  const mutated = v4Base.replace('**Assessment date:** 2026-08-14', '**Assessment date:** unrecorded')
  const issues = checkV4Report('x', mutated)
  assert.ok(issues.some((i) => i.includes('needs "**Assessment date:** YYYY-MM-DD"')))
})

test('a well-formed **Assessment date:** line passes', () => {
  assert.ok(!checkV4Report('x', v4Base).some((i) => i.includes('Assessment date')))
})

// ── market §4 heading and confidence vocabulary ──

test('a decorated §4 heading fails — must be exactly "## 4. SKILL SHIFT SUMMARY"', () => {
  const mutated = marketBase.replace(
    '## 4. SKILL SHIFT SUMMARY',
    '## 4. SKILL SHIFT SUMMARY (DECLINING vs RISING)',
  )
  const issues = checkMarketReport('x', mutated)
  assert.ok(issues.some((i) => i.includes('section 4 heading must be exactly "## 4. SKILL SHIFT SUMMARY"')))
})

test('confidence vocabulary outside HIGH / MEDIUM / LOW fails', () => {
  const mutated = marketBase.replace('MEDIUM CONFIDENCE', 'MODERATE CONFIDENCE')
  const issues = checkMarketReport('x', mutated)
  assert.ok(issues.some((i) => i.includes('"MODERATE CONFIDENCE" is outside the HIGH / MEDIUM / LOW vocabulary')))
})

test('HIGH / MEDIUM / LOW confidence markers pass', () => {
  const mutated = marketBase.replace('MEDIUM CONFIDENCE', 'LOW CONFIDENCE')
  const issues = checkMarketReport('x', mutated)
  assert.ok(!issues.some((i) => i.includes('is outside the HIGH / MEDIUM / LOW vocabulary')))
})

// ── v1 recommend family (trivial title check) ──

test('a v1 recommend report with the right title passes', () => {
  assert.deepEqual(checkRecommendReport('dfva-recommend-x', '## IMPROVEMENT PLAN: Master of X\n\nBody.\n'), [])
})

test('a v1 recommend report with the wrong title fails', () => {
  const issues = checkRecommendReport('dfva-recommend-x', '## PLAN: Master of X\n\nBody.\n')
  assert.ok(issues.some((i) => i.includes('title mismatch')))
})
