import { describe, expect, it } from "vitest";
import { stripSupersededCompositeLine } from "../reportMetadata";

describe("stripSupersededCompositeLine", () => {
  const header = [
    "## IMPROVEMENT PLAN: Master of Public Health",
    "",
    "**Current:** 23/36 MODERATE RISK (v1 composite, superseded — file metadata only, not rendered) | **Duration:** 24 months full-time (200 credit points)",
    "**v3.1 Position:** Low exposure · low adaptiveness — Destination AI Exposure 89.46 × Curriculum Adaptiveness 9/15 · position confidence: near a threshold (81%)",
    "**Goal:** Move the scored axis past the adaptiveness threshold.",
    "",
    "## 1. DIAGNOSTIC SUMMARY",
  ].join("\n");

  it("drops the superseded v1 composite line", () => {
    const out = stripSupersededCompositeLine(header);
    expect(out).not.toContain("**Current:**");
    expect(out).not.toContain("23/36");
  });

  it("keeps the v3.1 position and goal lines, which carry the current instrument", () => {
    const out = stripSupersededCompositeLine(header);
    expect(out).toContain("**v3.1 Position:**");
    expect(out).toContain("89.46");
    expect(out).toContain("9/15");
    expect(out).toContain("**Goal:**");
  });

  it("keeps the section structure intact", () => {
    const out = stripSupersededCompositeLine(header);
    expect(out).toContain("## IMPROVEMENT PLAN: Master of Public Health");
    expect(out).toContain("## 1. DIAGNOSTIC SUMMARY");
  });

  it("matches whatever band and score a report carries", () => {
    for (const line of [
      "**Current:** 24/36 MODERATE RISK",
      "**Current:** 9/36 CRITICAL",
      "**Current:**   30/36 RESILIENT",
    ]) {
      expect(stripSupersededCompositeLine(line)).toBe("");
    }
  });

  it("drops the paired Target/Gap line, so no orphan target is left behind", () => {
    // The older recommend format (62 of 67 reports) states the composite across
    // two lines; removing only the first would leave a gap with no baseline.
    const legacy = [
      "## IMPROVEMENT PLAN: Bachelor of Science (B-Sci)",
      "",
      "**Current:** 23/36 MODERATE RISK | **Duration:** 3 years (300 credit points)",
      "**Target:** 28/36 RESILIENT | **Gap:** 5 points",
      "",
      "## 1. DIAGNOSTIC SUMMARY",
    ].join("\n");
    const out = stripSupersededCompositeLine(legacy);
    expect(out).not.toContain("**Current:**");
    expect(out).not.toContain("**Target:**");
    expect(out).not.toContain("28/36");
    expect(out).not.toContain("Gap:");
    expect(out).toContain("## 1. DIAGNOSTIC SUMMARY");
  });

  it("leaves a non-composite Target line alone", () => {
    const src = "**Target:** adaptiveness 13/15 with both gates held";
    expect(stripSupersededCompositeLine(src)).toBe(src);
  });

  it("leaves other **Current:** prose alone", () => {
    // Not the metadata line: no N/36 composite follows the label.
    const src = "**Current:** enrolment is steady year on year.";
    expect(stripSupersededCompositeLine(src)).toBe(src);
  });

  it("leaves assessment and market reports untouched", () => {
    const assessment = [
      "## DFVA REPORT: Master of Public Health (244CW)",
      "**Institution:** University of Melbourne | **Level:** Graduate Coursework",
      "",
      "### 4. DFVA SCORECARD",
      "**TOTAL: 23 / 36**",
    ].join("\n");
    expect(stripSupersededCompositeLine(assessment)).toBe(assessment);
  });
});
