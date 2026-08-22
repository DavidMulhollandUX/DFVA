import { PROGRAMS, type ProgramReport } from "./sharedProgramData";

/**
 * What the assessor can tell the user about a pasted URL *before* they submit.
 *
 * The assessment services match a submitted URL against `PROGRAMS[].handbookUrl`
 * by exact (lowercased) string equality; anything else falls through to a
 * provisional placeholder rather than a real report. Classifying up front is
 * what lets the page say which of those two the user is about to get.
 */
export type HandbookUrlCheck =
  | { kind: "empty" }
  | { kind: "invalid" }
  | { kind: "not-course" }
  | { kind: "unknown"; courseCode: string }
  | { kind: "known"; program: ProgramReport; canonicalUrl: string };

/** Same course-code shape the assessment pipeline extracts. */
const COURSE_PATH = /\/courses?\/([a-z0-9-]+)/i;

/** Trailing slashes and case don't change the page, but do break exact matching. */
function normalise(url: string): string {
  return url.trim().toLowerCase().replace(/\/+$/, "");
}

export function checkHandbookUrl(input: string): HandbookUrlCheck {
  const trimmed = input.trim();
  if (!trimmed) return { kind: "empty" };

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return { kind: "invalid" };
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { kind: "invalid" };
  }

  const normalised = normalise(trimmed);
  const program = PROGRAMS.find(
    (p) => p.handbookUrl && normalise(p.handbookUrl) === normalised,
  );
  if (program?.handbookUrl) {
    // Submit the canonical form: the services compare without normalising, so a
    // trailing slash on an otherwise-known URL would silently miss the match.
    return { kind: "known", program, canonicalUrl: program.handbookUrl };
  }

  const courseCode = parsed.pathname.match(COURSE_PATH)?.[1];
  if (!courseCode) return { kind: "not-course" };

  return { kind: "unknown", courseCode: courseCode.toUpperCase() };
}

/** Every program the assessor can return a full, pre-written report for. */
export const ASSESSABLE_PROGRAMS: Array<
  ProgramReport & { handbookUrl: string }
> = PROGRAMS.filter((p): p is ProgramReport & { handbookUrl: string } =>
  Boolean(p.handbookUrl),
);
