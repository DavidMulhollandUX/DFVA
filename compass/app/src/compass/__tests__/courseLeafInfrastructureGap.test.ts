import { describe, it, expect } from "vitest";
import {
  INFRASTRUCTURE_GAP_EVENT,
  INFRASTRUCTURE_GAP_SIGNALS,
} from "../seedCourseLeafInfrastructureGapResponse";

/**
 * Tests for the CourseLeaf Infrastructure Gap competitive intelligence data.
 * feat-014: third-party tool ecosystem as go-to-market evidence.
 *
 * Verifies the seed data contract: event shape, signal categories and
 * scores, source uniqueness (no collision with feat-018's API-poverty
 * signal), and valid URLs.
 */

const FEAT_018_SOURCE_PREFIX = "Open-source ecosystem analysis";

describe("INFRASTRUCTURE_GAP_EVENT", () => {
  it("targets CourseLeaf with the ANNOUNCEMENT event type", () => {
    expect(INFRASTRUCTURE_GAP_EVENT.competitor).toBe("CourseLeaf");
    expect(INFRASTRUCTURE_GAP_EVENT.eventType).toBe("ANNOUNCEMENT");
  });

  it("is scored as an opportunity, not a threat", () => {
    expect(INFRASTRUCTURE_GAP_EVENT.impactScore).toBe(2);
    expect(INFRASTRUCTURE_GAP_EVENT.marketWindowEffect).toBe("OPENING");
    expect(INFRASTRUCTURE_GAP_EVENT.isActive).toBe(true);
  });

  it("has date fields as Date instances", () => {
    expect(INFRASTRUCTURE_GAP_EVENT.dateOccurred).toBeInstanceOf(Date);
    expect(INFRASTRUCTURE_GAP_EVENT.dateDiscovered).toBeInstanceOf(Date);
  });

  it("description names all four ecosystem projects", () => {
    const description = INFRASTRUCTURE_GAP_EVENT.description;
    expect(description).toContain("Azure");
    expect(description).toContain("APInception");
    expect(description).toContain("cc-coursemap");
    expect(description).toContain("UniPaith");
  });

  it("frames custom builds as demand-side proof, not vendor news", () => {
    const description = INFRASTRUCTURE_GAP_EVENT.description.toLowerCase();
    expect(description).toContain("29%");
  });
});

describe("INFRASTRUCTURE_GAP_SIGNALS", () => {
  it("contains exactly three signals", () => {
    expect(INFRASTRUCTURE_GAP_SIGNALS).toHaveLength(3);
  });

  it("uses two competitor_weakness and one market_gap category", () => {
    const categories = INFRASTRUCTURE_GAP_SIGNALS.map((s) => s.category);
    expect(categories.filter((c) => c === "competitor_weakness")).toHaveLength(2);
    expect(categories.filter((c) => c === "market_gap")).toHaveLength(1);
  });

  it("carries the specified credibility scores (5, 5, 4)", () => {
    const scores = INFRASTRUCTURE_GAP_SIGNALS
      .map((s) => s.credibilityScore)
      .sort((a, b) => b - a);
    expect(scores).toEqual([5, 5, 4]);
    for (const s of INFRASTRUCTURE_GAP_SIGNALS) {
      expect(s.credibilityScore).toBeGreaterThanOrEqual(1);
      expect(s.credibilityScore).toBeLessThanOrEqual(5);
    }
  });

  it("has pairwise-distinct sources", () => {
    const sources = INFRASTRUCTURE_GAP_SIGNALS.map((s) => s.source);
    expect(new Set(sources).size).toBe(sources.length);
  });

  it("does not collide with feat-018's API-poverty signal source", () => {
    for (const s of INFRASTRUCTURE_GAP_SIGNALS) {
      expect(s.source.startsWith(FEAT_018_SOURCE_PREFIX)).toBe(false);
    }
  });

  it("documents UniPaith as the second independent scraper", () => {
    const uniPaith = INFRASTRUCTURE_GAP_SIGNALS.find((s) =>
      s.excerpt.includes("UniPaith"),
    );
    expect(uniPaith).toBeDefined();
    expect(uniPaith!.category).toBe("competitor_weakness");
  });

  it("includes the go-to-market implication as a market_gap signal", () => {
    const gtm = INFRASTRUCTURE_GAP_SIGNALS.find(
      (s) => s.category === "market_gap",
    );
    expect(gtm).toBeDefined();
    expect(gtm!.relevantClaim.toLowerCase()).toContain("analytics layer");
  });

  it("every signal has non-empty excerpt, relevantClaim and a parseable URL", () => {
    for (const s of INFRASTRUCTURE_GAP_SIGNALS) {
      expect(s.excerpt.trim().length).toBeGreaterThan(0);
      expect(s.relevantClaim.trim().length).toBeGreaterThan(0);
      expect(() => new URL(s.url)).not.toThrow();
    }
  });

  it("every signal is active with a discovery date", () => {
    for (const s of INFRASTRUCTURE_GAP_SIGNALS) {
      expect(s.isActive).toBe(true);
      expect(s.dateDiscovered).toBeInstanceOf(Date);
    }
  });
});
