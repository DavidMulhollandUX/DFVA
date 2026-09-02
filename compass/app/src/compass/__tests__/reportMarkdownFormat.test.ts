import { describe, expect, it } from "vitest";
import { REPORT_CONTENT } from "../reportContent";
import {
  preserveLabelLineBreaks,
  splitSections,
} from "../v2/components/ReportMarkdownCard";
import {
  V4_AUTHORED,
  V4_CURRICULUM_IMPLICATIONS,
  V4_MARKET_EVIDENCE,
} from "../v4/authoredSections";

describe("preserveLabelLineBreaks", () => {
  it("gives every label in a run its own line", () => {
    const out = preserveLabelLineBreaks(
      [
        "**Typical entry titles:** Graduate Lawyer, Solicitor, Associate",
        "**Core tasks:** Contract drafting/review, due diligence",
        "**AI substitution pressure:** HIGH",
        "",
      ].join("\n"),
    );
    const lines = out.split("\n");
    expect(lines[0].endsWith("  ")).toBe(true);
    expect(lines[1].endsWith("  ")).toBe(true);
    // last label of the run ends the paragraph — no break needed
    expect(lines[2].endsWith("  ")).toBe(false);
  });

  it("leaves prose, tables and headings untouched", () => {
    const src = [
      "### Private practice",
      "",
      "| a | b |",
      "| --- | --- |",
      "Plain prose line.",
    ].join("\n");
    expect(preserveLabelLineBreaks(src)).toBe(src);
  });

  it("does not add a break when the label ends a block", () => {
    const src = "**Evidence:** Advocacy remains human-only\n\n### Next family";
    expect(preserveLabelLineBreaks(src)).toBe(src);
  });
});

describe("authored v4 sections reach the report page", () => {
  const v4Slugs = Object.keys(REPORT_CONTENT).filter(
    (k) =>
      k.startsWith("dfva-v4-") &&
      !k.startsWith("dfva-v4-recommend-") &&
      !k.startsWith("dfva-v4r-"),
  );

  it("covers the whole v4 family", () => {
    expect(v4Slugs.length).toBeGreaterThan(100);
  });

  it("yields exactly §4 then §5 through the V4_AUTHORED filter, for every report", () => {
    for (const slug of v4Slugs) {
      const sections = splitSections(
        preserveLabelLineBreaks(REPORT_CONTENT[slug].markdown),
      ).filter((s) => V4_AUTHORED(s.title));
      expect(sections.length, slug).toBe(2);
      expect(V4_MARKET_EVIDENCE(sections[0].title), slug).toBe(true);
      expect(V4_CURRICULUM_IMPLICATIONS(sections[1].title), slug).toBe(true);
      // The canonical tables are what makes §4 readable on the page.
      expect(sections[0].body, slug).toContain(
        "| Signal or shift | Direction | Bearing on the scored items |",
      );
      expect(sections[0].body, slug).toContain(
        "| Job family | Entry titles | AI substitution pressure | Skills rising in that family |",
      );
    }
  });
});
