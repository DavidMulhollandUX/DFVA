import { describe, expect, it } from "vitest";
import { V3_PROGRAMS, v3ProgramByCode } from "../../v3/data/v3Programs";
import { V31_META, V31_STABILITY, v31StabilityByCode } from "../data/v31Stability";

const byCode = (code: string) => {
  const s = v31StabilityByCode(code);
  if (!s) throw new Error(`no v31 stability for ${code}`);
  return s;
};

describe("v3.1 exact position-stability layer", () => {
  it("covers exactly the v3 placed portfolio", () => {
    expect(V31_STABILITY).toHaveLength(V3_PROGRAMS.length);
    for (const s of V31_STABILITY) expect(v3ProgramByCode(s.code)).toBeDefined();
  });

  it("reproduces the spec's exact reference values (§5.2)", () => {
    expect(byCode("746st").modalProbability).toBeCloseTo(0.79855, 5);
    expect(byCode("mc-phtyph").modalProbability).toBeCloseTo(0.79855, 5);
    expect(byCode("mc-propsyc").modalProbability).toBeCloseTo(0.8062, 5);
    expect(byCode("mc-is").modalProbability).toBeCloseTo(0.98062, 5);
    expect(byCode("mc-cs").modalProbability).toBeCloseTo(1.0, 5);
    expect(byCode("mc-dvetmed").modalProbability).toBeCloseTo(0.99889, 5);
    expect(byCode("mc-jurisd").modalProbability).toBeCloseTo(0.81355, 5);
  });

  it("partitions the portfolio into 14 boundary / 20 stable", () => {
    expect(V31_STABILITY.filter((s) => s.stabilityClass === "boundary")).toHaveLength(14);
    expect(V31_STABILITY.filter((s) => s.stabilityClass === "stable")).toHaveLength(20);
    expect(V31_STABILITY.filter((s) => s.modalProbability < 0.8)).toHaveLength(2);
    expect(V31_STABILITY.filter((s) => s.nearDisplayThreshold)).toHaveLength(11);
  });

  it("the empirical empty band exists: no modal probability in (0.848, 0.979)", () => {
    for (const s of V31_STABILITY) {
      expect(s.modalProbability <= 0.848 || s.modalProbability >= 0.979).toBe(true);
    }
  });

  it("sensitivity is monotone: optimistic ≥ published ≥ pessimistic", () => {
    for (const s of V31_STABILITY) {
      expect(s.modalProbabilityOptimistic).toBeGreaterThanOrEqual(s.modalProbability);
      expect(s.modalProbability).toBeGreaterThanOrEqual(s.modalProbabilityPessimistic);
    }
  });

  it("distributions are exact probability distributions with the modal quadrant maximal", () => {
    for (const s of V31_STABILITY) {
      const probs = Object.values(s.quadrantDist);
      const sum = probs.reduce((a, b) => a + b, 0);
      // stored values are rounded to 5 dp; exactness is asserted pre-rounding in the generator
      expect(sum).toBeGreaterThan(0.9999);
      expect(sum).toBeLessThan(1.0001);
      expect(s.quadrantDist[s.modalQuadrant]).toBe(Math.max(...probs));
    }
  });

  it("envelopes are exact and consistent with ceiling counts", () => {
    for (const s of V31_STABILITY) {
      const p = v3ProgramByCode(s.code)!;
      const base = Object.values(p.dimensionScores);
      const expectedMax = base.reduce((a, b) => a + Math.min(3, b + 1), 0);
      const expectedMin = base.reduce((a, b) => a + Math.max(0, b - 1), 0);
      expect(s.adaptEnvelope).toEqual([expectedMin, expectedMax]);
      expect(s.itemsAtCeiling).toBe(base.filter((x) => x === 3).length);
      expect(s.adaptEnvelope[0]).toBeLessThanOrEqual(p.adaptiveness);
      expect(s.adaptEnvelope[1]).toBeGreaterThanOrEqual(p.adaptiveness);
    }
  });

  it("headline sensitivity result: 0 / 2 / 14 programs fail the single-label rule", () => {
    expect(V31_STABILITY.filter((s) => s.modalProbabilityOptimistic < 0.8)).toHaveLength(
      V31_META.failSingleLabel.optimistic,
    );
    expect(V31_STABILITY.filter((s) => s.modalProbability < 0.8)).toHaveLength(
      V31_META.failSingleLabel.published,
    );
    expect(V31_STABILITY.filter((s) => s.modalProbabilityPessimistic < 0.8)).toHaveLength(
      V31_META.failSingleLabel.pessimistic,
    );
    expect(V31_META.failSingleLabel).toEqual({ optimistic: 0, published: 2, pessimistic: 14 });
  });
});
