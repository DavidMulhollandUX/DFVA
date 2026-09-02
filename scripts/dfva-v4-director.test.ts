import assert from 'node:assert/strict'
import { test } from 'node:test'
import { DIRECTOR_ABSENT, extractDirector, renderDirector } from './dfva-v4-director'

const page = (body: string) =>
  `===== SOURCE: https://handbook.unimelb.edu.au/2026/courses/x =====\nCourse structure\n\n${body}\n\nOverview\nAward title\tMaster of X\n\nCoordinator\n\nSubject Person\n`

test('labelled block', () => {
  const hit = extractDirector(page('Contact\n\nProgram Director\n\nDr Kirsten Stevens\n\nEmail: x@unimelb.edu.au'), 'x')
  assert.deepEqual(hit, { names: ['Dr Kirsten Stevens'], role: 'Program Director', rule: 'label' })
  assert.equal(renderDirector(hit), 'Dr Kirsten Stevens')
})

test('colon label and inline label; a deputy line is ignored', () => {
  const colon = extractDirector(page('Contact\n\nProgram Director:\n\nDr Alexandra Dane\n\nEmail: arts-info@unimelb.edu.au'), 'x')
  assert.deepEqual(colon?.names, ['Dr Alexandra Dane'])
  const inline = extractDirector(
    page('Contact\n\nProgram Director: Associate Professor James Ziogas\nDeputy Program Director: Dr Some One'),
    'x',
  )
  assert.deepEqual(inline?.names, ['Associate Professor James Ziogas'])
})

test('semester split', () => {
  const hit = extractDirector(
    page('Contact\n\nProgram Director\n\nSemester 1\nDr Helen Zhao\nEmail: helen.zhao@unimelb.edu.au\n\nSemester 2\nDr Kellie Frost'),
    'x',
  )
  assert.equal(renderDirector(hit), 'Dr Helen Zhao (Semester 1); Dr Kellie Frost (Semester 2)')
})

test('degree sublines and a non-director role', () => {
  const hit = extractDirector(
    page(
      'Contact\n\nCourse Coordinators\n\nMaster of Construction Management\n\nRobert Crawford\n\nrhcr@unimelb.edu.au\n\nMaster of Property\n\nRaghu Dharmapuri Tirumala',
    ),
    'x',
  )
  assert.equal(hit?.role, 'Course Coordinators')
  assert.equal(
    renderDirector(hit),
    'Robert Crawford (Course Coordinator, Master of Construction Management); Raghu Dharmapuri Tirumala (Course Coordinator, Master of Property)',
  )
})

test('several names on consecutive lines', () => {
  const hit = extractDirector(page("Contact\n\nDirectors of Studies\n\nIan Freckleton\nPaula O'Brien\nMichelle Taylor-Sands\n\nMelbourne Law Masters"), 'x')
  assert.deepEqual(hit?.names, ['Ian Freckleton', "Paula O'Brien", 'Michelle Taylor-Sands'])
  assert.equal(renderDirector(hit), "Ian Freckleton (Director of Studies); Paula O'Brien (Director of Studies); Michelle Taylor-Sands (Director of Studies)")
})

test('email-only contact block names nobody', () => {
  const hit = extractDirector(page('Contact\n\nenquiry-psych@unimelb.edu.au\n\nMelbourne School of Psychological Sciences'), 'x')
  assert.equal(hit, null)
  assert.equal(renderDirector(hit), DIRECTOR_ABSENT)
})

test('director outranks principal coordinators printed first', () => {
  const hit = extractDirector(
    page('Contact\n\nPrincipal Coordinator\n\nAnna Person\n\nPrincipal Coordinator\n\nBob Person\n\nDirector\n\nJan Hodgson'),
    'x',
  )
  assert.deepEqual(hit, { names: ['Jan Hodgson'], role: 'Director', rule: 'label' })
})

test('bare contact fallback and associate dean rendering', () => {
  const fb = extractDirector(page('Contact\n\nMaster of Architecture\n\nDennis Prior\n\npriord@unimelb.edu.au\n\nMaster of Landscape Architecture\n\nWendy Walls'), 'x')
  assert.equal(fb?.rule, 'contact-fallback')
  assert.equal(renderDirector(fb), 'Dennis Prior (Master of Architecture); Wendy Walls (Master of Landscape Architecture)')
  const ad = extractDirector(page('Contact\n\nAssociate Dean (Juris Doctor)\n\nMegan Prictor'), 'x')
  assert.equal(renderDirector(ad), 'Megan Prictor (Associate Dean, Juris Doctor)')
})
