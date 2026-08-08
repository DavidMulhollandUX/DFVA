import { describe, expect, it } from "vitest";
import { V3_META, V3_PROGRAMS, v3ProgramByCode } from "../data/v3Programs";

describe("v3 Panel A dataset invariants", () => {
  it("covers exactly the placed portfolio with pinned provenance", () => {
    expect(V3_PROGRAMS).toHaveLength(V3_META.placed);
    expect(V3_META.placed).toBe(34);
    // R1: the four required provenance fields are non-empty
    expect(V3_META.exposureIndexName).toBe("Felten-AIOE");
    expect(V3_META.exposureIndexVintage).toMatch(/AIOE_DataAppendix/);
    expect(V3_META.exposureRescaling).toMatch(/min-max 0-100/);
    expect(V3_META.exposureComputedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("R2: every program reports full destination coverage", () => {
    for (const p of V3_PROGRAMS) {
      expect(p.coverage).toBe(1);
      expect(p.nTitles).toBeGreaterThan(0);
      expect(p.destinations).toHaveLength(p.nTitles);
      expect(p.nMedium).toBeLessThanOrEqual(p.nTitles);
    }
  });

  it("R4: quadrant distributions are proper probability distributions", () => {
    for (const p of V3_PROGRAMS) {
      const probs = Object.values(p.quadrantDist);
      const sum = probs.reduce((a, b) => a + b, 0);
      // entries are rounded to 3 dp, so the sum can drift by ±0.002
      expect(sum).toBeGreaterThan(0.998);
      expect(sum).toBeLessThan(1.002);
      expect(p.modalProb).toBe(Math.max(...probs));
      expect(p.adaptInterval[0]).toBeLessThanOrEqual(p.adaptiveness);
      expect(p.adaptInterval[1]).toBeGreaterThanOrEqual(p.adaptiveness);
    }
  });

  it("quadrant assignment is consistent with the portfolio medians", () => {
    for (const p of V3_PROGRAMS) {
      const highExp = p.exposure > V3_META.expMedian;
      const adaptive = p.adaptiveness >= V3_META.adaptMedian;
      const expected = highExp
        ? adaptive ? "well-positioned" : "attention"
        : adaptive ? "comfortable" : "sheltered";
      expect(p.quadrant).toBe(expected);
    }
  });

  it("adaptiveness equals the Panel C item sum", () => {
    for (const p of V3_PROGRAMS) {
      const { D2, D3, D7, B, D5 } = p.dimensionScores;
      expect(p.adaptiveness).toBe(D2 + D3 + D7 + B + D5);
    }
  });

  it("program grain: mc-is and mc-cs are separately measured from their own alumni titles", () => {
    const mcIs = v3ProgramByCode("mc-is")!;
    const mcCs = v3ProgramByCode("mc-cs")!;
    // authoritative CSV values (reconciliation package, Aug 2026)
    expect(mcIs.exposure).toBe(91.69);
    expect(mcCs.exposure).toBe(92.8);
    expect(mcIs.jirN).toBe(257);
    expect(mcCs.jirN).toBe(41);
    expect(mcIs.adaptiveness).not.toBe(mcCs.adaptiveness);
  });

  it("reproduces the August 2026 revision note exactly", () => {
    const counts: Record<string, number> = {};
    for (const p of V3_PROGRAMS) counts[p.quadrant] = (counts[p.quadrant] ?? 0) + 1;
    expect(counts).toEqual({
      "well-positioned": 9,
      comfortable: 14,
      attention: 8,
      sheltered: 3,
    });
    const flips = V3_PROGRAMS.filter((p) => p.quadrant !== p.v2Quadrant).length;
    expect(flips).toBe(20);
    expect(V3_META.adaptMedian).toBe(10);
    expect(V3_META.expMedian).toBe(90.9);
    expect(V3_META.expRange).toEqual([61, 97.2]);
  });
});
