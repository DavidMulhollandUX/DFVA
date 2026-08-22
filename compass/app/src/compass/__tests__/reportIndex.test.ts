import { describe, expect, it } from "vitest";
import { PROGRAMS } from "../sharedProgramData";
import {
  V4_ONLY_PROGRAMS,
  V4_PANEL_C,
  V4_RESEARCH_DEGREES,
} from "../v4/data/v4PanelC";
import { REPORT_INDEX } from "../v4/reportIndex";
import { codeFromSlug, hasV4, programReportPath } from "../reportLinks";

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
    expect(hasV4("b-des")).toBe(false);
  });
  it("strips the legacy slug prefix", () => {
    expect(codeFromSlug("dfva-mc-cs")).toBe("mc-cs");
  });
});
