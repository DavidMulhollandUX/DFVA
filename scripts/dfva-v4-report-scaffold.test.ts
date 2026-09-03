import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'
import { exposureBasisSentence, readMarket } from './dfva-v4-report-scaffold'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const market = readFileSync(path.join(repoRoot, 'reports', 'dfva-market-mc-cs.md'), 'utf8')
const marketTable = readFileSync(path.join(repoRoot, 'reports', 'dfva-market-mc-scibif.md'), 'utf8')

test('readMarket resolves the four §1 columns on a report whose §1 is a table', () => {
  const m = readMarket(marketTable)
  assert.ok(m.jobFamilies.length >= 3)
  for (const f of m.jobFamilies) {
    for (const v of [f.family, f.titles, f.pressure, f.skills]) assert.ok(v.length > 0)
  }
})

test('readMarket reads the §4 rows and §3 confidence on the lint base report; a prose §1 yields no rows', () => {
  const m = readMarket(market)
  assert.deepEqual(m.jobFamilies, [])
  assert.ok(m.skillShifts.length >= 3)
  assert.ok(m.skillShifts.every((s) => /Rising|Stable|Falling/.test(s.direction)))
  assert.ok(['HIGH', 'MEDIUM', 'LOW'].includes(m.confidence ?? ''))
})

test('readMarket maps a legacy six-column §1 by header text', () => {
  const legacy = `# DFVA MARKET INTELLIGENCE: X (X)
## 1. JOB FAMILY MAP
| Job Family | Typical Entry Titles | Core Tasks | AI Substitution Pressure | Skills Increasing in Demand | Evidence Notes |
|---|---|---|---|---|---|
| Analyst | Graduate Analyst | tasks | **LOW** — reason | Modelling | notes |
## 2. RECENT JOB AD SIGNALS
`
  const m = readMarket(legacy)
  assert.deepEqual(m.jobFamilies, [{ family: 'Analyst', titles: 'Graduate Analyst', pressure: '**LOW** — reason', skills: 'Modelling' }])
  assert.equal(m.confidence, null)
  assert.deepEqual(m.skillShifts, [])
})

test('an empty or dashed cell reads as "not stated in the market report"', () => {
  const s = `## 1. JOB FAMILY MAP
| Job family | Entry titles | AI substitution pressure | Skills rising in that family |
| --- | --- | --- | --- |
| Analyst | — | LOW |  |
`
  const m = readMarket(s)
  assert.equal(m.jobFamilies[0].titles, 'not stated in the market report')
  assert.equal(m.jobFamilies[0].skills, 'not stated in the market report')
})

const src = (n: number) => [{ name: 'Master of X', n }] as never

test('exposure sentence: own record', () => {
  const s = exposureBasisSentence({ tier: 'exact', sources: src(41) } as never, 92.8, 90.9, 15, 0)
  assert.match(s, /This program's own graduates \(n = 41, 15 titles\)/)
  assert.match(s, /\*\*above\*\* the portfolio median of 90.9/)
})

test('exposure sentence: borrowed basis names the source and calls it an estimate', () => {
  const s = exposureBasisSentence({ tier: 'cognate', sources: src(20) } as never, 80, 90.9, 55, 37)
  assert.match(s, /\*\*Borrowed\*\* from Master of X/)
  assert.match(s, /not a measurement of this cohort/)
  assert.match(s, /37 of 55 titles carry only medium mapping confidence/)
  assert.match(s, /\*\*at or below\*\* the portfolio median/)
})

test('exposure sentence: field basis is compared against the field median', () => {
  const s = exposureBasisSentence({ tier: 'field', sources: [{ name: '0803 Business and Management' }] } as never, 85, 84, null, null)
  assert.match(s, /\*\*field-of-education\*\* basis \(0803 Business and Management\)/)
  assert.match(s, /the field median of 84/)
})
