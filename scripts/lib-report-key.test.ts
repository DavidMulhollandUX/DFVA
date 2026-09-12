/**
 * The generator refused every Adelaide key outright until 2026-09-12: its
 * filename-safe class omitted the underscore, so `dfva:gen-content` threw on
 * the first Go8 code that carried one and no Adelaide report could reach the
 * app. These cases pin the two halves of the rule — the codes that must pass,
 * and the shapes that must never become a path.
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { isReportKeySafe } from './lib-report-key'

test('accepts the ordinary Melbourne keys', () => {
  assert.equal(isReportKeySafe('dfva-mc-cs'), true)
  assert.equal(isReportKeySafe('dfva-v4-recommend-mc-is'), true)
})

test('accepts the Go8 manifest codes that carry an underscore', () => {
  assert.equal(isReportKeySafe('dfva-market-adelaide-barts_bart'), true)
  assert.equal(isReportKeySafe('dfva-v4-adelaide-bcom_bcombcomacctbcomacctosbcomcorfin'), true)
})

test('refuses a key that would escape the content directory', () => {
  assert.equal(isReportKeySafe('dfva-../../etc/passwd'), false)
  assert.equal(isReportKeySafe('dfva-a/b'), false)
  assert.equal(isReportKeySafe('dfva-a\\b'), false)
})

test('refuses a key that is not a report key at all', () => {
  assert.equal(isReportKeySafe('report-mc-cs'), false)
  assert.equal(isReportKeySafe('dfva-'), false)
  assert.equal(isReportKeySafe('dfva-MC-CS'), false)
})
