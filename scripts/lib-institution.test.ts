/**
 * The quarantine is the only thing keeping 2,827 templated records off the site,
 * so its two routes to publication are worth pinning: an institution that has
 * cleared the guards, and a single record that has been re-scored and stamped.
 *
 * The property that makes the second route safe is that a templated record
 * carries no `verified` block at all — so these tests assert the shape of the
 * absence, not just the happy path.
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { institutionOf, isPublished, isPublishedRecord, levelOf, MELBOURNE } from './lib-institution'

const stamped = { adversarial: true, mechanical: true, date: '2026-09-07' }

test('an unprefixed code is University of Melbourne', () => {
  for (const code of ['mc-cs', 'b-arts', '244cw', 'dr-phil', 'me-dcd']) {
    assert.equal(institutionOf(code).slug, MELBOURNE.slug, code)
  }
})

test('a prefixed code resolves to its institution regardless of manifest spelling', () => {
  assert.equal(institutionOf('latrobe-aa003b').name, 'La Trobe University')
  assert.equal(institutionOf('unsw-3502').name, 'UNSW Sydney')
  assert.equal(institutionOf('usyd-education').name, 'The University of Sydney')
})

test('only Melbourne publishes as a whole institution', () => {
  assert.equal(isPublished('mc-cs'), true)
  for (const code of ['usyd-education', 'unsw-3502', 'latrobe-aa003b', 'monash-a2000']) {
    assert.equal(isPublished(code), false, code)
  }
})

test('a stamped record publishes even though its institution is quarantined', () => {
  assert.equal(isPublishedRecord('usyd-education', stamped), true)
  assert.equal(isPublishedRecord('monash-a2000', { date: '2026-09-08' }), true)
})

test('a record with no verification stays quarantined however it is expressed', () => {
  for (const verified of [undefined, null, {}, { date: undefined }, { date: '' }]) {
    assert.equal(isPublishedRecord('latrobe-aa003b', verified), false, JSON.stringify(verified))
  }
})

test('a Melbourne record publishes without a stamp of its own', () => {
  assert.equal(isPublishedRecord('mc-cs', null), true)
})

test('levelOf tests the compound awards before the bare ones', () => {
  assert.equal(levelOf('Graduate Certificate in Data Science'), 'graduate-certificate')
  assert.equal(levelOf('Graduate Diploma in Arts'), 'graduate-diploma')
  assert.equal(levelOf('Master of Public Health'), 'master')
  assert.equal(levelOf('Bachelor of Arts'), 'bachelor')
  assert.equal(levelOf('Doctor of Philosophy'), 'doctorate')
  assert.equal(levelOf('Built Environment'), 'other')
})
