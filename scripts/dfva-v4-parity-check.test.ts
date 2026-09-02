import assert from 'node:assert/strict'
import { test } from 'node:test'
import { parityIssues } from './dfva-v4-parity-check'

const module = (score: number) =>
  [
    '// GENERATED FILE — DO NOT EDIT.',
    '',
    'export const V4_PANEL_C = {',
    '  "mc-cs": {',
    '    "instrument": "4.2-draft",',
    `    "adaptiveness": ${score},`,
    '    "workplace": 7',
    '  }',
    '};',
    '',
  ].join('\n')

test('identical committed and rendered text passes', () => {
  const text = module(9)
  assert.deepEqual(parityIssues(text, text), [])
})

test('a deliberately stale module — one score changed — fails', () => {
  const committed = module(9)
  const rendered = module(10)
  const issues = parityIssues(committed, rendered)
  assert.equal(issues.length, 1)
  assert.match(issues[0], /stale relative to dfva\/source\/evidence/)
  assert.match(issues[0], /first diff at line 6/)
  assert.ok(issues[0].includes('committed: "    \\"adaptiveness\\": 9,"'))
  assert.ok(issues[0].includes('expected:  "    \\"adaptiveness\\": 10,"'))
})

test('a length mismatch is reported without a false line match', () => {
  const committed = module(9)
  const rendered = committed + 'export const EXTRA = 1;\n'
  const issues = parityIssues(committed, rendered)
  assert.equal(issues.length, 1)
  assert.match(issues[0], /first diff at line/)
})
