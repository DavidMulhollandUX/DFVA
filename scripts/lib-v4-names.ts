/**
 * Shared name resolution from the GENERATED v4 registry
 * (compass/app/src/compass/v4/data/v4Basis.ts). One parse, three consumers:
 * capture identity and subject scope in dfva-v4-verify-evidence.ts, and the
 * report-title guard in check-report-format.ts.
 *
 * compass/app/src/compass/sharedProgramData.ts is NOT the source — it holds 65
 * entries against 104 v4-scored programs.
 */
import { V4_ONLY_PROGRAMS } from '../compass/app/src/compass/v4/data/v4Basis'

export function loadV4Names(): Map<string, string> {
  // Read as a module, not as text. v4Basis.ts stopped being one big literal
  // when the per-program chunks landed, and a regex over its source now finds
  // nothing at all — silently, which is the worst way for a name lookup to
  // fail.
  const names = new Map<string, string>()
  for (const [code, p] of Object.entries(V4_ONLY_PROGRAMS)) {
    if (!names.has(code)) names.set(code, p.name)
  }
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
