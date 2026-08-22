/**
 * Reference-cohort guard.
 *
 * The v4 adaptiveness median may only publish once EVERY program in the reference
 * cohort carries a v4 score (see the gate in dfva-v4-gen.ts). That cohort is derived
 * by parsing `"cohort": "reference"` out of v3Programs.ts — so silently adding
 * programs there as `reference` instead of `extension` does not fail anything, does
 * not look wrong in review, and simply moves the median's finish line further away.
 *
 * The Wave 1 backfill adds 169 programs. If any of them landed as `reference`, the
 * median would stop being one program away and become 170 away, and the report pages
 * would keep withholding the position label for weeks while looking healthy.
 *
 * So the size is pinned. Changing the reference cohort is a methodology decision:
 * bump EXPECTED_REFERENCE_SIZE deliberately and say why in the methodology notes.
 *
 * Run: npx tsx scripts/dfva-reference-cohort-check.ts   (wired into dfva:check)
 */
import { promises as fs } from 'node:fs'
import * as path from 'node:path'
import { repoRoot } from './dfva-lib'

/** Pinned 2026-08-15. Raising this is a methodology change, not a chore. */
const EXPECTED_REFERENCE_SIZE = 34

const V3_PROGRAMS = path.join(
  repoRoot,
  'compass/app/src/compass/v3/data/v3Programs.ts'
)

export async function checkReferenceCohort(): Promise<string[]> {
  const src = await fs.readFile(V3_PROGRAMS, 'utf8')

  // Same extraction the generator uses, so the guard cannot drift from the gate.
  const refs = [...src.matchAll(/"?code"?: "([a-z0-9-]+)",[\s\S]*?"?cohort"?: "reference"/g)].map(
    (m) => m[1]
  )
  const errors: string[] = []

  if (refs.length !== EXPECTED_REFERENCE_SIZE) {
    errors.push(
      `Reference cohort is ${refs.length}, expected ${EXPECTED_REFERENCE_SIZE}. ` +
        `The v4 median gate requires every reference program to be scored, so changing ` +
        `this size changes when (or whether) the median publishes. If this is deliberate, ` +
        `update EXPECTED_REFERENCE_SIZE in scripts/dfva-reference-cohort-check.ts and ` +
        `record the reason. If it is not, the new programs belong in the extension ` +
        `cohort ("cohort": "extension").`
    )
  }

  const dupes = refs.filter((c, i) => refs.indexOf(c) !== i)
  if (dupes.length) {
    errors.push(`Duplicate reference codes: ${[...new Set(dupes)].join(', ')}`)
  }

  // Wave 1 backfill programs must never be reference — they are the extension cohort.
  const extPath = path.join(repoRoot, 'scripts/v4_cohort_ext.json')
  try {
    const ext: { code: string }[] = JSON.parse(await fs.readFile(extPath, 'utf8'))
    const leaked = ext.map((p) => p.code).filter((c) => refs.includes(c))
    if (leaked.length) {
      errors.push(
        `Backfill programs marked as reference cohort: ${leaked.join(', ')}. ` +
          `These must be "cohort": "extension" — they are placed against the reference ` +
          `thresholds and must never re-base them.`
      )
    }
  } catch {
    // No extension cohort file yet — nothing to cross-check.
  }

  return errors
}

if (import.meta.url === `file://${process.argv[1]}`) {
  checkReferenceCohort().then((errors) => {
    if (errors.length) {
      console.error('Reference-cohort check FAILED:')
      for (const e of errors) console.error('  - ' + e)
      process.exit(1)
    }
    console.log(`reference-cohort check OK — ${EXPECTED_REFERENCE_SIZE} reference programs.`)
  })
}
