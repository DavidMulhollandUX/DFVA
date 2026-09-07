import { describe, expect, it } from "vitest";
import { REPORT_INDEX } from "../v4/reportIndex";
import { V4_INDEX } from "../v4/data/v4Meta";

/**
 * Institution identity on the /reports index.
 *
 * WHY THIS EXISTS (2026-09-07). 2,838 non-Melbourne programs were published
 * carrying a University of Melbourne faculty, because `reportIndex` ran
 * `getFaculty(name)` — a map onto UoM's nine official faculties — over every
 * program regardless of who awards it. A La Trobe program was listed under
 * "Medicine, Dentistry & Health". These guard the shape that replaced it.
 */
describe("ReportIndexEntry institution", () => {
  it("gives every row an institution and a slug", () => {
    for (const e of REPORT_INDEX) {
      expect(e.institution, e.code).toBeTruthy();
      expect(e.institutionSlug, e.code).toMatch(/^[a-z-]+$/);
    }
  });

  it("never labels a non-Melbourne program with a Melbourne faculty", () => {
    // Faculty is a UoM concept. Any other institution carries no faculty at
    // all rather than a plausible-looking one it does not belong to.
    const wrong = REPORT_INDEX.filter(
      (e) => e.institutionSlug !== "unimelb" && e.faculty !== "",
    );
    expect(wrong.map((e) => `${e.code}: ${e.faculty}`)).toEqual([]);
  });

  it("agrees with the generated index on institution", () => {
    for (const e of REPORT_INDEX) {
      const idx = V4_INDEX[e.code];
      if (!idx) continue;
      expect(e.institution, e.code).toBe(idx.institution);
      expect(e.institutionSlug, e.code).toBe(idx.institutionSlug);
    }
  });

  it("classifies every row to a known award level", () => {
    const known = new Set([
      "bachelor",
      "master",
      "graduate-certificate",
      "graduate-diploma",
      "doctorate",
      "other",
    ]);
    for (const e of REPORT_INDEX) expect(known.has(e.level), e.code).toBe(true);
  });
});

describe("published cohort", () => {
  it("publishes no program without a verification date", () => {
    // The quarantine exists because 2,838 records reached the generated data
    // with verifiedAt null. This is the invariant that keeps that impossible.
    const unverified = Object.values(V4_INDEX).filter((e) => !e.verifiedAt);
    expect(unverified.map((e) => e.code)).toEqual([]);
  });

  it("spans both halves of the adaptiveness range", () => {
    // A cohort in which no program scores below the median it is placed
    // against has not been discriminated — the signature of the templated
    // national scores. See docs/dfva-national-expansion-spec.md.
    const values = Object.values(V4_INDEX).map((e) => e.adaptiveness);
    expect(Math.min(...values)).toBeLessThan(9);
    expect(Math.max(...values)).toBeGreaterThanOrEqual(9);
  });
});
