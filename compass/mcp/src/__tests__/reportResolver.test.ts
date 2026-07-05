import { describe, it, expect } from "vitest";
import { resolveReportFile } from "../reportResolver.js";

const FILES = [
  "dfva-080cl.md",
  "dfva-527cl.md",
  "dfva-mc-cs.md",
  "dfva-mc-is.md",
  "dfva-b-sci.md",
  "dependabot-triage.md",
  "evidura-improvement-report.md",
  "notes.txt",
];

describe("resolveReportFile", () => {
  it("resolves an exact dfva-<code>.md match", () => {
    expect(resolveReportFile("mc-cs", FILES)).toEqual({
      kind: "found",
      file: "dfva-mc-cs.md",
    });
  });

  it("is case-insensitive and normalizes underscores to dashes", () => {
    expect(resolveReportFile("MC_CS", FILES)).toEqual({
      kind: "found",
      file: "dfva-mc-cs.md",
    });
  });

  it("resolves the legacy dfva-recommend-<code>.md name", () => {
    const files = ["dfva-recommend-mc-ds.md"];
    expect(resolveReportFile("mc-ds", files)).toEqual({
      kind: "found",
      file: "dfva-recommend-mc-ds.md",
    });
  });

  it("prefers the exact match over loose substring hits", () => {
    // "mc-cs" is a substring of nothing else here, but exact ordering matters
    // when a code is a substring of another file (e.g. "080cl" in dfva-080cl.md).
    expect(resolveReportFile("080cl", FILES)).toEqual({
      kind: "found",
      file: "dfva-080cl.md",
    });
  });

  it("reports ambiguity instead of returning an arbitrary file", () => {
    const result = resolveReportFile("cl", FILES);
    expect(result.kind).toBe("ambiguous");
    if (result.kind === "ambiguous") {
      expect(result.candidates).toEqual(["dfva-080cl.md", "dfva-527cl.md"]);
    }
  });

  it("never matches non-markdown files loosely", () => {
    expect(resolveReportFile("notes", FILES)).toEqual({ kind: "not-found" });
  });

  it("returns not-found for unknown codes", () => {
    expect(resolveReportFile("zz-nothing", FILES)).toEqual({ kind: "not-found" });
  });
});
