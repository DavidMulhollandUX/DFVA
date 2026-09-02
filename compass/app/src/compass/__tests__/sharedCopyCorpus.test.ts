import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { V4_PANEL_C } from "../v4/data/v4PanelC";
import { gateSummary } from "../v4/gateState";
import {
  describeBasis,
  basisFor,
  basisMedian,
  V4_TIER_LABELS,
} from "../v4/exposureBasis";
import { v4Quadrant, V4_QUADRANT_LABELS } from "../v4/v4Position";
import * as reportCopy from "../v4/report/copy";

/**
 * H8: shared page copy is written against the program in front of the author
 * and only tested by the next one. Three defects shipped in V4ReportPage.tsx
 * this way: hardcoded gate results (false for mc-envlaw and b-sci), a hardcoded
 * 20-page capture profile (false for every program — real captures run 7-47
 * pages), and an unconditional verification claim (false for 17). The useful
 * assertion is the negative one: a forbidden claim never appears for ANY
 * scored program.
 */
const CODES = Object.keys(V4_PANEL_C);

describe("gate copy is derived per program", () => {
  it("never claims every precondition met when a gate fails or is unrecorded", () => {
    for (const code of CODES) {
      const s = gateSummary(V4_PANEL_C[code]);
      const gates = V4_PANEL_C[code].gates;
      const allPass =
        gates && Object.values(gates).every((g) => !g || g.result === "PASS");
      if (!allPass) {
        expect(s, code).not.toBe("every precondition met");
        expect(s, code).not.toMatch(/every precondition met/);
      }
    }
  });

  it("produces a non-empty clause for every scored program", () => {
    for (const code of CODES) {
      expect(gateSummary(V4_PANEL_C[code]).length, code).toBeGreaterThan(0);
    }
  });
});

describe("basis copy is derived per program", () => {
  it("renders for every scored program and never leaks an undefined", () => {
    for (const code of CODES) {
      const basis = basisFor(code);
      const s = describeBasis(basis, null, null);
      expect(s.length, code).toBeGreaterThan(0);
      expect(s, code).not.toMatch(/undefined|null|NaN/);
      // A borrowed basis must SAY it is an estimate.
      if (basis?.tier === "cognate" || basis?.tier === "partial") {
        expect(s, code).toContain("an estimate");
      }
    }
  });

  it("labels every tier the registry can produce", () => {
    const tiers = new Set(CODES.map((c) => basisFor(c)?.tier).filter(Boolean));
    for (const t of tiers) {
      expect(V4_TIER_LABELS[t as keyof typeof V4_TIER_LABELS], t).toBeTruthy();
    }
    expect(tiers.size).toBeGreaterThan(0);
  });

  it("returns a median for any basis shape in the corpus", () => {
    for (const code of CODES) {
      const m = basisMedian(basisFor(code));
      if (m !== null) expect(Number.isFinite(m), code).toBe(true);
    }
  });
});

describe("quadrant labelling is derived per program", () => {
  it("maps only to known labels or null for every scored program", () => {
    let labelled = 0;
    for (const code of CODES) {
      const p = V4_PANEL_C[code];
      const exposure = (p as unknown as { exposure?: number }).exposure ?? 50;
      const q = v4Quadrant(exposure, p.adaptiveness, basisFor(code));
      if (q !== null) {
        labelled++;
        expect(V4_QUADRANT_LABELS[q], code).toBeTruthy();
      }
    }
    // With a complete migration cycle most programs get a label; zero would
    // mean the helper is silently refusing everything.
    expect(labelled).toBeGreaterThan(CODES.length / 2);
  });
});

/**
 * Item 17 (2026-09-02) split V4ReportPage.tsx into one file per visual part
 * with its prose in v4/report/copy.ts. Two things the corpus must keep true
 * of that directory: a reader is never shown a path into the repository (Part
 * C printed one for months), and every record-derived block still renders for
 * every scored program rather than only the one it was written against.
 */
const REPORT_DIR = join(__dirname, "..", "v4", "report");
const REPORT_FILES = readdirSync(REPORT_DIR).filter((f) => /\.tsx?$/.test(f));

/** A repository path — a directory segment plus a source-file extension.
 *  Routes ("/reports/dfva-v4-mc-cs") carry no extension and are not matched. */
const REPO_PATH = /[\w-]+\/[\w.-]+\.(md|ts|tsx|json|py|csv)\b/;

/** Read what a reader can see: comments are not copy. */
const stripComments = (s: string) =>
  s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

describe("the v4 report copy corpus", () => {
  it("covers every part file", () => {
    expect(REPORT_FILES).toContain("copy.ts");
    expect(REPORT_FILES.length).toBeGreaterThan(8);
  });

  for (const file of REPORT_FILES) {
    it(`${file} shows no repository path to a reader`, () => {
      const body = stripComments(readFileSync(join(REPORT_DIR, file), "utf8"));
      const match = body.match(REPO_PATH);
      expect(
        match,
        `${file}: "${match?.[0]}" is a path into the repo`,
      ).toBeNull();
    });
  }

  it("exports no empty or leaking string constant", () => {
    const strings: Array<[string, string]> = [];
    for (const [name, value] of Object.entries(reportCopy)) {
      if (typeof value === "string") strings.push([name, value]);
    }
    expect(strings.length).toBeGreaterThan(40);
    for (const [name, value] of strings) {
      expect(value.length, name).toBeGreaterThan(0);
      expect(value, name).not.toMatch(/undefined|NaN/);
      expect(value, name).not.toMatch(REPO_PATH);
    }
  });

  it("derives the strength and gap sentences for every scored program", () => {
    for (const code of CODES) {
      const record = V4_PANEL_C[code];
      for (const [label, s] of [
        ["strength", reportCopy.strengthSummary(record)],
        ["gap", reportCopy.gapSummary(record)],
      ] as const) {
        expect(s.length, `${code} ${label}`).toBeGreaterThan(0);
        expect(s, `${code} ${label}`).not.toMatch(/undefined|NaN/);
        expect(s.endsWith("."), `${code} ${label}`).toBe(true);
      }
    }
  });

  it("never hardcodes a gate outcome in the finding sentence", () => {
    for (const [name, value] of Object.entries(reportCopy)) {
      if (typeof value !== "string") continue;
      expect(value, name).not.toMatch(/both (gates|preconditions)/i);
      expect(value, name).not.toMatch(/every precondition met/);
    }
  });
});
