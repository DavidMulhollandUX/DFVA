import { describe, expect, it } from "vitest";
import { V4_INDEX, V4_RESEARCH_DEGREE_INSTITUTION } from "../v4/data/v4Meta";
import { heroMeta } from "../v4/report/copy";

/** The report hero hardcoded "University of Melbourne" until 2026-09-12, so
 *  every non-Melbourne Durability Report named the wrong university — live on
 *  dev.evidura.ai for 58 programs at seven other institutions. The shared page
 *  derives the institution from the record; these cases keep it that way. */
describe("report hero institution", () => {
  it("names the institution it is given, and no other", () => {
    expect(
      heroMeta("adelaide-mph_mpubhlt", "The University of Adelaide", ""),
    ).toBe("adelaide-mph_mpubhlt · The University of Adelaide");
    expect(heroMeta("mc-cs", "The University of Melbourne", "Science")).toBe(
      "mc-cs · The University of Melbourne · Science",
    );
  });

  it("omits an institution it does not have rather than guessing one", () => {
    expect(heroMeta("mc-cs", "", "")).toBe("mc-cs");
  });

  it("carries no university name of its own", () => {
    // A literal here would reappear on every report regardless of the record.
    expect(heroMeta("x", "", "")).not.toMatch(/universit/i);
  });

  it("can resolve an institution for every program the hero renders", () => {
    const missing = Object.values(V4_INDEX)
      .filter((e) => !e.institution)
      .map((e) => e.code);
    expect(missing).toEqual([]);
  });

  it("can resolve an institution for every research degree", () => {
    // Research degrees carry no Panel C score, so they are absent from V4_INDEX
    // and the hero reads this map instead.
    const missing = Object.entries(V4_RESEARCH_DEGREE_INSTITUTION)
      .filter(([, name]) => !name)
      .map(([code]) => code);
    expect(missing).toEqual([]);
  });

  it("does not report every program as Melbourne", () => {
    const slugs = new Set(
      Object.values(V4_INDEX).map((e) => e.institutionSlug),
    );
    expect(slugs.size).toBeGreaterThan(1);
  });
});
