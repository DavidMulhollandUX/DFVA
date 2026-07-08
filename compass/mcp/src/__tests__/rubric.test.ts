import { describe, it, expect } from "vitest";
import {
  adjustedScore,
  bandForDimensions,
  totalScore,
  bandForScore,
  applicableCount,
  rawApplicableTotal,
  MIN_APPLICABLE_TO_RATE,
} from "dfva-source/source/rubric.js";

// A full 11-dimension program with no NA (scores chosen so the sum lands in a
// known band). Mirrors the DimensionScore shape the rubric helpers accept.
const dims = (scores: (number | null)[]) =>
  scores.map((score, i) => ({ dimension: `D${i + 1}`, score }));

describe("NA-aware scoring — no Not-Applicable dimensions", () => {
  it("adjustedScore equals the plain sum when nothing is NA", () => {
    const d = dims([1, 2, 3, 0, 2, 3, 1, 2, 2, 2, 3]); // sum = 21
    expect(rawApplicableTotal(d)).toBe(21);
    expect(applicableCount(d)).toBe(11);
    expect(adjustedScore(d)).toBe(21);
    expect(adjustedScore(d)).toBe(totalScore(d));
    expect(bandForDimensions(d)).toBe(bandForScore(21)); // MODERATE RISK
  });

  it("a resilient all-applicable program keeps its band", () => {
    const d = dims([3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3]); // sum = 31
    expect(adjustedScore(d)).toBe(31);
    expect(bandForDimensions(d)).toBe("RESILIENT");
  });
});

describe("NA-aware scoring — renormalisation", () => {
  it("dh-lld NA set → 22/36 MODERATE RISK", () => {
    // D1, D9, D10 NA; applicable = {3,1,2,0,3,3,1,3} = 16 over 8 → round(16*11/8)=22
    const d = dims([null, 3, 1, 2, 0, 3, 3, 1, null, null, 3]);
    expect(applicableCount(d)).toBe(8);
    expect(rawApplicableTotal(d)).toBe(16);
    expect(adjustedScore(d)).toBe(22);
    expect(bandForDimensions(d)).toBe("MODERATE RISK");
  });

  it("dh-sc NA set → 27/36 MODERATE (27.5 tie rounds down)", () => {
    // D1, D9, D10 NA; applicable = {3,3,3,1,3,3,1,3} = 20 over 8 → 20*11/8 = 27.5 → round-half-down → 27
    const d = dims([null, 3, 3, 3, 1, 3, 3, 1, null, null, 3]);
    expect(applicableCount(d)).toBe(8);
    expect(rawApplicableTotal(d)).toBe(20);
    expect(adjustedScore(d)).toBe(27);
    expect(bandForDimensions(d)).toBe("MODERATE RISK");
  });

  it("rounds half down (ties never promote a band)", () => {
    // 27.5 → 27, but a clear majority still rounds up: 20/8*11 = 27.5 → 27; check a non-tie rounds normally
    // 7 dims of 3 + 1 dim of 2 = 23 over 8 → 23*11/8 = 31.625 → 32
    const d = dims([3, 3, 3, 3, 3, 3, 3, 2, null, null, null]);
    expect(adjustedScore(d)).toBe(32);
  });

  it("renormalisation is mean-imputation of NA dimensions", () => {
    // 4 dims all scoring 2, plus 7 NA → mean 2 → 2*11 = 22
    const d = dims([2, 2, 2, 2, null, null, null, null, null, null, null]);
    expect(adjustedScore(d)).toBe(22);
  });
});

describe("NOT RATABLE gate", () => {
  it("fewer than MIN_APPLICABLE_TO_RATE applicable → NOT RATABLE", () => {
    // 6 applicable (below the 7 threshold), 5 NA
    const d = dims([3, 3, 3, 3, 3, 3, null, null, null, null, null]);
    expect(applicableCount(d)).toBeLessThan(MIN_APPLICABLE_TO_RATE);
    expect(bandForDimensions(d)).toBe("NOT RATABLE");
  });

  it("exactly MIN_APPLICABLE_TO_RATE applicable is still ratable", () => {
    // 7 applicable, 4 NA
    const d = dims([3, 3, 3, 3, 3, 3, 3, null, null, null, null]);
    expect(applicableCount(d)).toBe(MIN_APPLICABLE_TO_RATE);
    expect(bandForDimensions(d)).not.toBe("NOT RATABLE");
  });

  it("all NA → adjustedScore 0", () => {
    const d = dims([null, null, null, null, null, null, null, null, null, null, null]);
    expect(adjustedScore(d)).toBe(0);
    expect(bandForDimensions(d)).toBe("NOT RATABLE");
  });
});
