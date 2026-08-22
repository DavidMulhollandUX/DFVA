import { PROGRAMS } from "../sharedProgramData";
import { getFaculty } from "../faculty";
import { v3ProgramByCode } from "../v3/data/v3Programs";
import {
  V4_ONLY_PROGRAMS,
  V4_RESEARCH_DEGREES,
  v4PanelCByCode,
} from "./data/v4PanelC";
import { v4Quadrant, type V4Quadrant } from "./v4Position";

/** One row of the /reports index: every program the site knows about, on v4
 *  terms. `status` is the only thing a card needs to decide how to present
 *  itself — "current" programs carry a v4 Durability Report, "archived" ones
 *  only an earlier-instrument report pending a v4 score, and "research"
 *  degrees are out of Panel C's scope (no taught curriculum) so never pending. */
export interface ReportIndexEntry {
  code: string;
  name: string;
  faculty: string;
  status: "current" | "archived" | "research";
  exposure: number | null;
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
  const panelC = v4PanelCByCode(code);
  const exposure = v3?.exposure ?? V4_ONLY_PROGRAMS[code]?.exposure ?? null;
  const adaptiveness = panelC?.adaptiveness ?? null;
  return {
    code,
    name,
    faculty: v3?.faculty || faculty,
    status: panelC
      ? "current"
      : V4_RESEARCH_DEGREES.includes(code)
        ? "research"
        : "archived",
    exposure,
    adaptiveness,
    workplace: typeof panelC?.workplace === "number" ? panelC.workplace : null,
    position:
      exposure !== null && adaptiveness !== null
        ? v4Quadrant(exposure, adaptiveness)
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
  ...Object.values(V4_ONLY_PROGRAMS)
    .filter((p) => !PROGRAMS.some((q) => q.assessmentSlug === `dfva-${p.code}`))
    .map((p) => entry(p.code, p.name, getFaculty(p.name), false)),
].sort((a, b) => a.name.localeCompare(b.name));
