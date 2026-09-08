/**
 * The selector's bare-name path needs a study level, and for a while only UNSW
 * could supply one — it is the only handbook that prints a `Study Level` line.
 * Sydney states the level in its URL instead, so every Sydney program the
 * manifest names with a bare field ("Public Health", "Commerce") was dropped
 * from the cross-section without a word. These tests pin both name sources.
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { captureTitle, crossSection, GO8, studyLevelOf } from './dfva-go8-crosssection'

const sydney = (path: string): string => `https://www.sydney.edu.au/handbooks/${path}`

test('a stated Study Level line wins over the URL', () => {
  assert.equal(studyLevelOf('**Study Level**: Postgraduate', sydney('arts/coursework/x.html')), 'Postgraduate')
  assert.equal(studyLevelOf('**Study Level**: Research', ''), 'Research')
})

test("Sydney's postgraduate URL forms resolve without a Study Level line", () => {
  for (const path of [
    'medicine-health-pg/coursework/public-health.html',
    'business-school-pg/coursework/mba.html',
    'law/postgraduate/juris-doctor.html',
  ]) {
    assert.equal(studyLevelOf('', sydney(path)), 'Postgraduate', path)
  }
})

test("Sydney's undergraduate URL forms resolve too", () => {
  for (const path of ['arts/coursework/arts.html', 'architecture/undergraduate/design.html']) {
    assert.equal(studyLevelOf('', sydney(path)), 'Undergraduate', path)
  }
})

test('a URL that states no level stays null, so the candidate is skipped', () => {
  assert.equal(studyLevelOf('', ''), null)
  assert.equal(studyLevelOf('', 'https://handbook.unimelb.edu.au/2026/courses/244cw'), null)
})

test('the Public health row reaches every Go8 institution', () => {
  const row = crossSection().filter((p) => p.discipline === 'Public health')
  assert.deepEqual(
    row.map((p) => p.slug).sort(),
    [...GO8].sort(),
    `missing: ${GO8.filter((s) => !row.some((p) => p.slug === s)).join(', ')}`,
  )
})

test("Melbourne's Master of Public Health is the row's reference cell", () => {
  const mel = crossSection().find((p) => p.discipline === 'Public health' && p.slug === 'unimelb')
  // 244cw is in the generated registry but in neither cohort manifest, so a
  // manifest-only name lookup drops the reference the whole row is read against.
  assert.equal(mel?.code, '244cw')
})

test('captureTitle drops a repeated code but keeps a qualifying word', () => {
  assert.equal(captureTitle('# Bachelor of Arts (BA)', 'adelaide-barts_bart'), 'Bachelor of Arts')
  assert.equal(captureTitle('# Public Health (public-health)', 'usyd-public-health'), 'Public Health')
  assert.equal(captureTitle('# Bachelor of Arts (Extended)', 'usyd-arts-extended'), 'Bachelor of Arts (Extended)')
})
