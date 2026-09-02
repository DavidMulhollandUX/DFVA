import assert from 'node:assert/strict'
import { test } from 'node:test'
import { purityIssues } from './dfva-instrument-purity-check'

test('a clean page with no legacy-instrument imports passes', () => {
  const source = [
    'import { v4PortfolioRows } from "../v4/portfolioStats";',
    'import { V4_PANEL_C } from "./data/v4PanelC";',
    '',
    '// v3 is mentioned here in prose only, never imported.',
    'export const Page = () => null;',
  ].join('\n')
  assert.deepEqual(purityIssues(source), [])
})

test('an import from the v3 instrument fails', () => {
  const source = [
    'import { v4PortfolioRows } from "../v4/portfolioStats";',
    'import { V3_PROGRAMS } from "../v3/data/v3Programs";',
  ].join('\n')
  const issues = purityIssues(source)
  assert.equal(issues.length, 1)
  assert.match(issues[0], /v3 instrument/)
})

test('an import from the v3.1 instrument fails', () => {
  const source = 'import { V31_PROGRAMS } from "../v31/data/v31Programs";'
  const issues = purityIssues(source)
  assert.equal(issues.length, 1)
  assert.match(issues[0], /v3\.1 instrument/)
})
