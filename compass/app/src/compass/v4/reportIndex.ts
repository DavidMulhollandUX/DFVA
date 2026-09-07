import { PROGRAMS } from "../sharedProgramData";
import { getFaculty } from "../faculty";
import { v3ProgramByCode } from "../v3/data/v3Programs";
import {
  V4_INDEX,
  V4_RESEARCH_DEGREES,
  v4IndexByCode,
  type V4Level,
  type V4PanelATier,
} from "./data/v4Meta";
import { v4Quadrant, type V4Quadrant } from "./v4Position";

/** One row of the /reports index: every program the site knows about, on v4
 *  terms. `status` is the only thing a card needs to decide how to present
 *  itself — "current" programs carry a v4 Durability Report, "archived" ones
 *  only an earlier-instrument report pending a v4 score, and "research"
 *  degrees are out of Panel C's scope (no taught curriculum) so never pending. */
export interface ReportIndexEntry {
  code: string;
  name: string;
  /** Owning university, e.g. "The University of Melbourne". */
  institution: string;
  /** URL-safe institution key, used as the /reports?university= value. */
  institutionSlug: string;
  /** Award level, derived in the generator so this file never parses a title. */
  level: V4Level;
  /** Faculty is a University of Melbourne concept: `faculty.ts` maps names onto
   *  UoM's nine official faculties. Empty for every other institution rather
   *  than a plausible-looking UoM faculty the program does not belong to. */
  faculty: string;
  status: "current" | "archived" | "research";
  exposure: number | null;
  /** Which destination distribution the exposure was computed on. */
  exposureTier: V4PanelATier | null;
  adaptiveness: number | null;
  workplace: number | null;
  position: V4Quadrant | null;
  /** Earlier-instrument reports that exist for the program. */
  archived: { v1: boolean; v31: boolean };
}

function entry(
  code: string,
  name: string,
  faculty: string,
  v1: boolean,
): ReportIndexEntry {
  const v3 = v3ProgramByCode(code);
  const idx = v4IndexByCode(code);
  const melbourne = !idx || idx.institutionSlug === "unimelb";
  const exposure = v3?.exposure ?? idx?.exposure ?? null;
  const exposureTier: V4PanelATier | null = idx?.exposureTier ?? null;
  const adaptiveness = idx?.adaptiveness ?? null;
  return {
    code,
    name,
    institution: idx?.institution ?? "The University of Melbourne",
    institutionSlug: idx?.institutionSlug ?? "unimelb",
    level: idx?.level ?? "other",
    faculty: melbourne ? v3?.faculty || faculty : "",
    status: idx
      ? "current"
      : V4_RESEARCH_DEGREES.includes(code)
        ? "research"
        : "archived",
    exposure,
    exposureTier,
    adaptiveness,
    workplace: typeof idx?.workplace === "number" ? idx.workplace : null,
    position:
      exposure !== null && adaptiveness !== null
        ? v4Quadrant(
            exposure,
            adaptiveness,
            exposureTier ? { tier: exposureTier } : undefined,
          )
        : null,
    archived: { v1, v31: Boolean(v3) },
  };
}

/** Every program: the 67 with a v1 report plus those scored on v4 only. */
export const REPORT_INDEX: ReportIndexEntry[] = [
  ...PROGRAMS.map((p) =>
    entry(
      p.assessmentSlug.replace(/^dfva-/, ""),
      p.program,
      getFaculty(p.program),
      true,
    ),
  ),
  ...Object.values(V4_INDEX)
    .filter((p) => !PROGRAMS.some((q) => q.assessmentSlug === `dfva-${p.code}`))
    .map((p) => entry(p.code, p.name, getFaculty(p.name), false)),
]
  // Research degrees sort last regardless of name. They carry no Durability
  // Rating and never will, so they are a footnote to the portfolio rather than
  // a run of D-named programs interrupting it; everything else stays A–Z.
  .sort(
    (a, b) =>
      Number(a.status === "research") - Number(b.status === "research") ||
      a.name.localeCompare(b.name),
  );
