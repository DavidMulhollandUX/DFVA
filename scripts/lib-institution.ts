/**
 * Institution identity for a v4 program code, and which institutions may be
 * published.
 *
 * The code prefix is the only reliable institution key we have. The cohort
 * manifest (`scripts/v4_cohort_ext.json`) carries a `faculty` field that mostly
 * holds a university name, but it is inconsistently spelled — "La Trobe
 * University" (337) alongside "Latrobe University" (294), "UNSW Sydney" (285)
 * alongside "Unsw University" (186), three spellings of Adelaide, 56 distinct
 * values and 16 nulls. Deriving from the prefix gives one name per institution.
 *
 * University of Melbourne codes carry no prefix of their own: they are the bare
 * handbook codes plus the `mc-`, `b-`, `dr-`, `dh-` and `me-` families. UoM is
 * therefore the fallback, not an entry in the table.
 */

export interface Institution {
  slug: string
  name: string
}

/** Code prefix → institution. Order is irrelevant; prefixes are disjoint. */
const BY_PREFIX: Record<string, Institution> = {
  latrobe: { slug: 'la-trobe', name: 'La Trobe University' },
  unsw: { slug: 'unsw', name: 'UNSW Sydney' },
  monash: { slug: 'monash', name: 'Monash University' },
  uq: { slug: 'uq', name: 'The University of Queensland' },
  adelaide: { slug: 'adelaide', name: 'The University of Adelaide' },
  anu: { slug: 'anu', name: 'The Australian National University' },
  uwa: { slug: 'uwa', name: 'The University of Western Australia' },
  usyd: { slug: 'usyd', name: 'The University of Sydney' },
}

export const MELBOURNE: Institution = {
  slug: 'unimelb',
  name: 'The University of Melbourne',
}

/** Every institution the corpus knows about, Melbourne first. */
export const ALL_INSTITUTIONS: Institution[] = [
  MELBOURNE,
  ...Object.values(BY_PREFIX).sort((a, b) => a.name.localeCompare(b.name)),
]

/** The institution that owns a program code. Never returns undefined: an
 *  unprefixed code is a University of Melbourne handbook code. */
export function institutionOf(code: string): Institution {
  const prefix = code.toLowerCase().split('-')[0]
  return BY_PREFIX[prefix] ?? MELBOURNE
}

/**
 * Institutions whose scores may reach the generated app data.
 *
 * Quarantine, 2026-09-07. The 2,838 non-Melbourne `panelCv4` blocks committed in
 * f5023817..0473f135 are template output, not scored assessments: 2,742 of them
 * share one C1 rationale, mean rationale length is ~1,020 characters against
 * Melbourne's 5,890, mean recorded ambiguities is 2.00 at eight independent
 * institutions, and no record scores below 9 on adaptiveness — the exact value
 * of the published Melbourne median, so every one of them would publish in the
 * high-adaptiveness half and none could ever surface as "attention".
 *
 * The evidence JSON and all 3,059 handbook captures stay in the repo; only the
 * published set narrows. An institution rejoins this list when it has been
 * re-scored through `scripts/workflows/v4-score-cohort.js` and clears the
 * distinctness and verification guards. See docs/dfva-national-expansion-spec.md.
 */
export const PUBLISHED_INSTITUTIONS: ReadonlySet<string> = new Set([MELBOURNE.slug])

/** True when a program code may reach the generated app data. */
export const isPublished = (code: string): boolean =>
  PUBLISHED_INSTITUTIONS.has(institutionOf(code).slug)

/** Award level, for the /reports level facet. Derived from the program name in
 *  the generator so the component never parses titles. Order matters: "Master of
 *  Philosophy" is a master's, and "Graduate Diploma" must beat the bare
 *  "Diploma" test. */
export type V4Level =
  | 'bachelor'
  | 'master'
  | 'graduate-certificate'
  | 'graduate-diploma'
  | 'doctorate'
  | 'other'

export function levelOf(name: string): V4Level {
  const n = name.toLowerCase()
  if (/\bgraduate certificate|\bpostgraduate certificate/.test(n)) return 'graduate-certificate'
  if (/\bgraduate diploma|\bpostgraduate diploma/.test(n)) return 'graduate-diploma'
  if (/\bmaster\b|\bmasters\b/.test(n)) return 'master'
  if (/\bbachelor\b|\bassociate degree\b/.test(n)) return 'bachelor'
  if (/\bdoctor\b|\bdoctorate\b|\bphd\b/.test(n)) return 'doctorate'
  return 'other'
}
