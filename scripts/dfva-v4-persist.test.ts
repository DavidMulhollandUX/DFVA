import assert from 'node:assert/strict'
import { test } from 'node:test'
import { applyVerdict, mergeEvidence, type PanelCv4, type Verdict } from './dfva-v4-persist'
import { V4_VERSION } from '../dfva/source/rubricV4'

const SCORES: Record<string, number> = { C1: 3, C2: 2, C3: 1, C4: 0, C5: 2, W1: 1, W2: 2, W3: 3 }

function block(): PanelCv4 {
  const p: PanelCv4 = {
    adaptiveness: 8,
    workplace: 6,
    gates: {
      G1: { result: 'PASS', rationale: 'g1', evidenceLines: ['gate one line'] },
      G2: { result: 'PASS', rationale: 'g2', evidenceLines: ['gate two line'] },
    },
    ambiguities: ['one'],
    notScoreable: [],
  }
  for (const [id, score] of Object.entries(SCORES)) {
    p[id] = { score, rationale: `${id} rationale`, evidenceLines: score === 0 ? [] : [`${id} line a`, `${id} line b`] }
  }
  return p
}
const upheld: Verdict = { upheld: true, reviewed: [], demotions: [], unquotable: [] }
const scoreOf = (p: PanelCv4, id: string) => (p[id] as { score: number }).score
const linesOf = (p: PanelCv4, id: string) => (p[id] as { evidenceLines: string[] }).evidenceLines

test('an upheld verdict changes no score, sets the instrument and the sums', () => {
  const { panel, report } = applyVerdict('x', block(), upheld)
  assert.equal(panel.instrument, V4_VERSION)
  assert.equal(panel.adaptiveness, 8)
  assert.equal(panel.workplace, 6)
  assert.equal(report.items.length, 8)
  assert.ok(report.items.every((i) => i.before === i.after))
  assert.equal(panel.verified, undefined)
})

test('a demotion is applied and the sub-scale re-summed', () => {
  const { panel, report } = applyVerdict('x', block(), { ...upheld, demotions: [{ item: 'C1', to: 1, why: 'outcome statement' }] })
  assert.equal(scoreOf(panel, 'C1'), 1)
  assert.equal(panel.adaptiveness, 6)
  assert.equal(panel.workplace, 6)
  assert.deepEqual(report.items.find((i) => i.item === 'C1'), { item: 'C1', before: 3, after: 1 })
})

test('an unquotable line is deleted; a same-level demotion keeps the score', () => {
  const { panel } = applyVerdict('x', block(), {
    ...upheld,
    unquotable: ['C2 line a'],
    demotions: [{ item: 'C2', to: 2, why: 'remaining line still supports level 2' }],
  })
  assert.deepEqual(linesOf(panel, 'C2'), ['C2 line b'])
  assert.equal(scoreOf(panel, 'C2'), 2)
})

test('an unquotable line with no demotion naming the item is refused', () => {
  assert.throws(() => applyVerdict('x', block(), { ...upheld, unquotable: ['C2 line a'] }), /no demotion naming C2/)
})

test('an unquotable string absent from the block is refused', () => {
  assert.throws(() => applyVerdict('x', block(), { ...upheld, unquotable: ['nowhere'] }), /not found in the scored block/)
})

test('a demotion above the scored level is refused as a raise', () => {
  assert.throws(() => applyVerdict('x', block(), { ...upheld, demotions: [{ item: 'C3', to: 2, why: '' }] }), /raise/)
})

test('a gate cannot be demoted here', () => {
  assert.throws(() => applyVerdict('x', block(), { ...upheld, demotions: [{ item: 'G1', to: 0, why: '' }] }), /gates are not demotable/)
})

test('a level above 0 with every line deleted is refused', () => {
  assert.throws(
    () =>
      applyVerdict('x', block(), {
        ...upheld,
        unquotable: ['C1 line a', 'C1 line b'],
        demotions: [{ item: 'C1', to: 2, why: '' }],
      }),
    /no evidence line left/,
  )
})

test('a PASS gate that loses its only line is refused', () => {
  assert.throws(() => applyVerdict('x', block(), { ...upheld, unquotable: ['gate one line'] }), /gate G1 PASS lost its only evidence/)
})

test('mergeEvidence keeps byDimension and the existing verified stamp byte for byte', () => {
  const existing = {
    code: 'x',
    programSlug: 'x',
    byDimension: { D1: { rationale: 'r', recommendations: ['p1'] } },
    panelCv4: { ...block(), verified: { adversarial: true, mechanical: true, date: '2026-08-01' } },
  }
  const { panel } = applyVerdict('x', block(), upheld)
  const doc = mergeEvidence(existing, 'x', panel) as typeof existing
  assert.deepEqual(doc.byDimension, existing.byDimension)
  assert.deepEqual(doc.panelCv4.verified, existing.panelCv4.verified)
  assert.equal(doc.panelCv4.instrument, V4_VERSION)
  assert.deepEqual(Object.keys(doc), ['code', 'programSlug', 'byDimension', 'panelCv4'])
})

test('mergeEvidence on no existing file writes {code, panelCv4} and nothing else', () => {
  const { panel } = applyVerdict('x', block(), upheld)
  const doc = mergeEvidence(null, 'x', panel)
  assert.deepEqual(Object.keys(doc), ['code', 'panelCv4'])
  assert.equal((doc.panelCv4 as PanelCv4).verified, undefined)
})
