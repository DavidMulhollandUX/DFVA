import { describe, expect, it } from "vitest";
import { PROGRAMS } from "../sharedProgramData";
import { V4_ONLY_PROGRAMS, V4_PANEL_C } from "../v4/data/v4PanelC";
import { V4_RESEARCH_DEGREES } from "../v4/data/v4Meta";
import { REPORT_INDEX } from "../v4/reportIndex";
import {
  assessmentSlugFor,
  codeFromSlug,
  hasV4,
  parseSlug,
  programReportPath,
  v4rReportSlug,
} from "../reportLinks";
import { hasReportContent } from "../reportContent/index";

/**
 * /reports is v4-first: every program the site knows about appears exactly
 * once, carries a status a card can render without further lookups, and
 * resolves to the single canonical /reports/:code URL.
 */
describe("REPORT_INDEX", () => {
  it("lists every v1 program and every v4-only program exactly once", () => {
    const codes = REPORT_INDEX.map((e) => e.code);
    expect(new Set(codes).size).toBe(codes.length);
    for (const p of PROGRAMS)
      expect(codes).toContain(codeFromSlug(p.assessmentSlug));
    for (const code of Object.keys(V4_ONLY_PROGRAMS))
      expect(codes).toContain(code);
  });

  it("marks a program current iff it has a Panel C v4 score, research if excluded", () => {
    for (const e of REPORT_INDEX) {
      const expected =
        e.code in V4_PANEL_C
          ? "current"
          : V4_RESEARCH_DEGREES.includes(e.code)
            ? "research"
            : "archived";
      expect(e.status).toBe(expected);
      if (e.status === "current") expect(e.adaptiveness).not.toBeNull();
      else expect(e.archived.v1).toBe(true); // a non-current row must have something to show
    }
  });

  it("never lets a research degree carry a v4 score or read as pending", () => {
    for (const code of V4_RESEARCH_DEGREES) {
      expect(V4_PANEL_C[code]).toBeUndefined();
      expect(REPORT_INDEX.find((e) => e.code === code)?.status).toBe(
        "research",
      );
    }
    expect(V4_RESEARCH_DEGREES.length).toBe(14);
  });

  it("always has at least one archived or current report to link to", () => {
    for (const e of REPORT_INDEX) {
      expect(e.status === "current" || e.archived.v1 || e.archived.v31).toBe(
        true,
      );
    }
  });
});

describe("reportLinks", () => {
  it("routes every program to the canonical /reports/:code", () => {
    expect(programReportPath("mc-mgmthre")).toBe("/reports/mc-mgmthre");
    expect(programReportPath("b-des")).toBe("/reports/b-des");
  });
  it("knows which programs carry a v4 score", () => {
    expect(hasV4("mc-mgmthre")).toBe(true);
    // A research degree, not an unscored coursework program: Panel C has no
    // taught curriculum to read, so this stays false by design. The previous
    // case (mc-urbhort) went stale the moment that program was scored.
    expect(hasV4("dr-philsci")).toBe(false);
  });
  it("strips the legacy slug prefix", () => {
    expect(codeFromSlug("dfva-mc-cs")).toBe("mc-cs");
  });

  // A v4r slug read as "everything after dfva-" yields the code "v4r-dr-philsci",
  // which matches no program and no market report. The report page then fell
  // through to its literal 20 / 36 default and rendered an archived-v1 banner
  // over a report whose whole point is that no score applies.
  it("reads a research-degree slug as its own family, not as a program code", () => {
    expect(parseSlug("dfva-v4r-dr-philsci")).toEqual({
      code: "dr-philsci",
      type: "assessment",
      family: "v4r",
    });
    expect(assessmentSlugFor(parseSlug("dfva-v4r-dr-philsci"))).toBe(
      "dfva-v4r-dr-philsci",
    );
  });

  it("leaves every other slug family parsing as before", () => {
    expect(parseSlug("dfva-mc-cs")).toEqual({
      code: "mc-cs",
      type: "assessment",
      family: "v1",
    });
    expect(parseSlug("dfva-market-mc-cs").type).toBe("market");
    expect(parseSlug("dfva-recommend-mc-cs").type).toBe("recommend");
    expect(assessmentSlugFor(parseSlug("dfva-v4-mc-cs"))).toBe("dfva-v4-mc-cs");
  });
});

describe("research-degree reports", () => {
  // The /reports card links dfva-v4r-<code> directly. Authoring a report the
  // index cannot reach — which is how the family shipped — is the failure here.
  it("gives every research degree a reachable v4r report", () => {
    for (const code of V4_RESEARCH_DEGREES)
      expect([code, hasReportContent(v4rReportSlug(code))]).toEqual([
        code,
        true,
      ]);
  });

  it("keeps the market and recommend siblings on the plain program code", () => {
    const parsed = parseSlug(v4rReportSlug("dr-philsci"));
    expect(hasReportContent(`dfva-market-${parsed.code}`)).toBe(true);
    expect(hasReportContent(`dfva-recommend-${parsed.code}`)).toBe(true);
  });

  // They carry no rating and never will, so they belong after the portfolio
  // rather than interleaved into it by name.
  it("sorts every research degree below every other program", () => {
    const lastNonResearch = REPORT_INDEX.reduce(
      (acc, e, i) => (e.status !== "research" ? i : acc),
      -1,
    );
    const firstResearch = REPORT_INDEX.findIndex(
      (e) => e.status === "research",
    );
    expect(firstResearch).toBeGreaterThan(lastNonResearch);
  });

  it("still sorts A-Z within each of the two groups", () => {
    for (const group of ["research", "other"]) {
      const names = REPORT_INDEX.filter((e) =>
        group === "research"
          ? e.status === "research"
          : e.status !== "research",
      ).map((e) => e.name);
      expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
    }
  });
});
