/**
 * Shared name resolution from the GENERATED v4 registry
 * (compass/app/src/compass/v4/data/v4Basis.ts). One parse, three consumers:
 * capture identity and subject scope in dfva-v4-verify-evidence.ts, and the
 * report-title guard in check-report-format.ts.
 *
 * compass/app/src/compass/sharedProgramData.ts is NOT the source — it holds 65
 * entries against 104 v4-scored programs.
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export function loadV4Names(): Map<string, string> {
  const panelSrc = readFileSync(
    path.join(ROOT, 'compass/app/src/compass/v4/data/v4Basis.ts'),
    'utf8',
  )
  const names = new Map<string, string>()
  const re = /"code":\s*"([^"]+)",\s*\n\s*"name":\s*"([^"]+)"/g
  let m: RegExpExecArray | null
  while ((m = re.exec(panelSrc))) if (!names.has(m[1])) names.set(m[1], m[2])
  return names
}

/** Normalise a degree name for comparison: PhD abbreviation, slash spacing, case. */
export function normaliseDegreeName(s: string): string {
  return s
    .replace(/\bPhD\b/gi, 'Doctor of Philosophy')
    .replace(/\s*\/\s*/g, '/')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}
