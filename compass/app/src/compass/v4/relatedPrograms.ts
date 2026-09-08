import { V4_INDEX, type V4IndexEntry } from "./data/v4Meta";

/** Award words a program name may lead with. Stripping them leaves the
 *  subject, which is the only part two universities reliably agree on: UNSW
 *  names 316 of its programs by the bare field ("Commerce"), so a name-to-name
 *  comparison finds nothing at all. */
const AWARD =
  /^(bachelor|master|doctor|graduate certificate|graduate diploma|associate degree)\s+of\b\s*/i;

/** Qualifiers that name a variant of the same subject rather than a different
 *  one. "Bachelor of Laws (Honours)" and "Bachelor of Laws" are the same course
 *  to a reader comparing universities. */
const VARIANT = /\s*\((honours|hons|advanced|extended|coursework[^)]*)\)\s*/gi;

/** Spelling and number differences between handbooks for one subject. UNSW
 *  writes "Law" where every other Go8 writes "Laws". */
const SYNONYM: Record<string, string> = {
  law: "laws",
  "information technology": "information technology",
  "computer science": "computer science",
};

/**
 * The comparable subject of a program name: the award word removed, variant
 * qualifiers dropped, spelling normalised. Returns "" when nothing but an
 * award word remains, which excludes the program from matching rather than
 * matching it against every other awardless name.
 */
export function subjectOf(name: string): string {
  const stripped = name
    .replace(VARIANT, " ")
    .replace(AWARD, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return SYNONYM[stripped] ?? stripped;
}

/** A related program and how it compares with the one being read. */
export interface RelatedProgram {
  entry: V4IndexEntry;
  /** Peer minus current, on each sub-scale. Null where either is unscored. */
  delta: { adaptiveness: number; workplace: number | null };
}

/**
 * Programs in the same subject at other universities, best match first.
 *
 * Matching is on subject, not on name or level. Level is a tiebreaker, not a
 * filter: a name with no award word ("Public Health") generates level "other",
 * and gating on level would drop every UNSW program — the one institution
 * whose handbook never states the award — from every comparison.
 *
 * Ordering puts a level agreement first so a Bachelor of Arts leads with other
 * bachelor's degrees, then the widest adaptiveness gap, which is the
 * comparison worth reading: a peer scoring the same tells you nothing.
 *
 * One program per university. Melbourne runs both a Bachelor of Science and a
 * Bachelor of Science (Extended), and listing a university twice reads as two
 * institutions rather than two variants of one course.
 *
 * The default limit holds a whole Group of Eight row — seven peers — because
 * that is the comparison the published set was built for, and cutting it at
 * six drops a university without saying so.
 */
export function relatedPrograms(code: string, limit = 8): RelatedProgram[] {
  const self = V4_INDEX[code];
  if (!self) return [];
  const subject = subjectOf(self.name);
  if (!subject) return [];
  return Object.values(V4_INDEX)
    .filter(
      (e) =>
        e.code !== code &&
        e.institutionSlug !== self.institutionSlug &&
        subjectOf(e.name) === subject,
    )
    .map((entry) => ({
      entry,
      delta: {
        adaptiveness: entry.adaptiveness - self.adaptiveness,
        workplace:
          typeof entry.workplace === "number" &&
          typeof self.workplace === "number"
            ? entry.workplace - self.workplace
            : null,
      },
    }))
    .sort((a, b) => {
      // "other" is an unknown level, not a different one: it is what a name
      // with no award word generates. Ranking it below a known match would
      // push UNSW and Sydney to the bottom of every list for a handbook
      // convention rather than for anything about the program.
      const levelRank = (e: V4IndexEntry) =>
        e.level === self.level || e.level === "other" || self.level === "other"
          ? 0
          : 1;
      return (
        levelRank(a.entry) - levelRank(b.entry) ||
        Math.abs(b.delta.adaptiveness) - Math.abs(a.delta.adaptiveness) ||
        a.entry.institution.localeCompare(b.entry.institution)
      );
    })
    .filter((r, i, all) => {
      const first = all.findIndex(
        (o) => o.entry.institutionSlug === r.entry.institutionSlug,
      );
      return first === i;
    })
    .slice(0, limit);
}
