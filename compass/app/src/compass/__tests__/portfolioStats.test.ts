import { describe, expect, it } from "vitest";
import {
  DIMENSION_ORDER,
  dimensionAverages,
  facultyRows,
  nearThresholdCount,
  needsAttention,
  portfolioRows,
  positionCounts,
  quickWins,
} from "../v3/data/portfolioStats";
import { V3_META, V3_PROGRAMS } from "../v3/data/v3Programs";

const rows = portfolioRows();

describe("portfolioRows", () => {
  it("covers every assessed program exactly once", () => {
    expect(rows).toHaveLength(V3_META.total);
    expect(new Set(rows.map((r) => r.code)).size).toBe(V3_META.total);
  });

  it("marks exactly the programs with destination data as placed", () => {
    const placed = rows.filter((r) => r.placed);
    expect(placed).toHaveLength(V3_META.placed);
    expect(placed.every((r) => r.exposure !== null && r.position)).toBe(true);
    expect(
      rows.filter((r) => !r.placed).every((r) => r.exposure === null),
    ).toBe(true);
  });

  it("carries the current exposure measurement, not the superseded one", () => {
    for (const p of V3_PROGRAMS) {
      const row = rows.find((r) => r.code === p.code);
      expect(row?.exposure).toBe(p.exposure);
      expect(row?.adaptiveness).toBe(p.adaptiveness);
    }
  });
});

describe("derivations", () => {
  it("averages all five curriculum dimensions within range", () => {
    const dims = dimensionAverages(rows);
    expect(dims.map((d) => d.key)).toEqual(DIMENSION_ORDER);
    expect(dims.every((d) => d.avg >= 0 && d.avg <= 3)).toBe(true);
    expect(dims.every((d) => d.label && !/^[BD]\d?$/.test(d.label))).toBe(true);
  });

  it("counts every placed program into exactly one position", () => {
    const counts = positionCounts(rows);
    const sum = Object.values(counts).reduce((a, b) => a + b, 0);
    expect(sum).toBe(V3_META.placed);
  });

  it("only proposes quick wins that a single point would move", () => {
    for (const r of quickWins(rows)) {
      expect(r.position).toBe("attention");
      expect(V3_META.adaptMedian - r.adaptiveness).toBe(1);
    }
  });

  it("ranks the least-defended exposed programs first", () => {
    const list = needsAttention(rows);
    expect(list.every((r) => r.position === "attention")).toBe(true);
    for (let i = 1; i < list.length; i++) {
      expect(list[i].adaptiveness).toBeGreaterThanOrEqual(
        list[i - 1].adaptiveness,
      );
    }
  });

  it("partitions the portfolio across faculties", () => {
    const fac = facultyRows(rows);
    expect(fac.reduce((s, f) => s + f.programs, 0)).toBe(V3_META.total);
    expect(fac.reduce((s, f) => s + f.placed, 0)).toBe(V3_META.placed);
    expect(fac.every((f) => f.avgAdaptiveness >= 0 && f.avgAdaptiveness <= 15)).toBe(true);
  });

  it("reports the near-threshold count from the exact stability layer", () => {
    const n = nearThresholdCount();
    expect(n).toBeGreaterThan(0);
    expect(n).toBeLessThanOrEqual(V3_META.placed);
  });
});
