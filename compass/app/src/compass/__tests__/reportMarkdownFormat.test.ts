import { describe, expect, it } from "vitest";
import { preserveLabelLineBreaks } from "../v2/components/ReportMarkdownCard";

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
    const src = ["### Private practice", "", "| a | b |", "| --- | --- |", "Plain prose line."].join(
      "\n",
    );
    expect(preserveLabelLineBreaks(src)).toBe(src);
  });

  it("does not add a break when the label ends a block", () => {
    const src = "**Evidence:** Advocacy remains human-only\n\n### Next family";
    expect(preserveLabelLineBreaks(src)).toBe(src);
  });
});
