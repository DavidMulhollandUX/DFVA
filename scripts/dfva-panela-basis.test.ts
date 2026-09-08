/**
 * Alumni destination records in this repo are 141 University of Melbourne Job
 * Insights Reports. The resolver's own-record tiers matched on program NAME,
 * so a Master of Public Health at Monash resolved to Melbourne's record and
 * published as tier `exact` — whose page copy reads "measured on the program's
 * own alumni destination record (n = 562)". That was live on 15 programs, with
 * 17 more claiming a Melbourne program family, until 2026-09-09.
 *
 * The assertion that matters is the negative one: no non-Melbourne program may
 * carry a tier that asserts alumni data.
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import * as path from 'node:path'
import { loadPanelAContext, resolvePanelA } from './dfva-panela-basis'
import { institutionOf, MELBOURNE } from './lib-institution'

/** Every tier that asserts a real graduate-destination distribution. */
const ALUMNI_TIERS = ['exact', 'variant', 'pooled', 'combined', 'cognate', 'partial']

const ROOT = path.resolve(__dirname, '..')

test('no non-Melbourne program resolves to an alumni destination tier', () => {
  const ctx = loadPanelAContext()
  const manifest = JSON.parse(
    readFileSync(path.join(ROOT, 'scripts/v4_cohort_ext.json'), 'utf8'),
  ) as { code: string; name: string }[]
  let checked = 0
  for (const { code, name } of manifest) {
    if (institutionOf(code).slug === MELBOURNE.slug) continue
    let result
    try {
      result = resolvePanelA(code, name, ctx)
    } catch {
      continue // unmapped titles are a different guard's business
    }
    if (!result) continue
    checked++
    assert.ok(
      !ALUMNI_TIERS.includes(result.basis.tier),
      `${code} (${name}) resolved to tier "${result.basis.tier}" — that tier claims alumni destinations, and only Melbourne has them`,
    )
  }
  assert.ok(checked > 100, `expected to check many non-Melbourne codes, checked ${checked}`)
})

test('a Melbourne program still resolves to its own record', () => {
  const ctx = loadPanelAContext()
  const r = resolvePanelA('244cw', 'Master of Public Health', ctx)
  assert.equal(r?.basis.tier, 'exact')
})
