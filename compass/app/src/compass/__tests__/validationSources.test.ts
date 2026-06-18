import { describe, it, expect } from "vitest";
import {
  getValidationSources,
  getSourcesForTest,
  type ValidationSource,
} from "../../shared/validationSources";

describe("validationSources", () => {
  describe("getValidationSources", () => {
    it("returns at least one validation source", () => {
      const sources = getValidationSources();
      expect(sources.length).toBeGreaterThanOrEqual(1);
    });

    it("includes Lightcast 2026 entry", () => {
      const sources = getValidationSources();
      const lightcast = sources.find((s) => s.publisher === "Lightcast");
      expect(lightcast).toBeDefined();
      expect(lightcast!.year).toBe(2026);
      expect(lightcast!.url).toContain("lightcast.io");
    });

    it("every source has required fields", () => {
      const sources = getValidationSources();
      for (const s of sources) {
        expect(s.name).toBeTruthy();
        expect(s.publisher).toBeTruthy();
        expect(s.url).toBeTruthy();
        expect(s.keyStat).toBeTruthy();
        expect(s.relevance).toBeTruthy();
        expect(typeof s.year).toBe("number");
      }
    });

    it("every source URL is a valid URL string", () => {
      const sources = getValidationSources();
      for (const s of sources) {
        expect(() => new URL(s.url)).not.toThrow();
      }
    });

    it("Lightcast source supports EXP-01", () => {
      const sources = getValidationSources();
      const lightcast = sources.find((s) => s.publisher === "Lightcast");
      expect(lightcast!.supportsTests).toContain("EXP-01");
    });
  });

  describe("getSourcesForTest", () => {
    it("filters sources by test ID", () => {
      const sources = getSourcesForTest("EXP-01");
      expect(sources.length).toBeGreaterThanOrEqual(1);
      for (const s of sources) {
        expect(s.supportsTests).toContain("EXP-01");
      }
    });

    it("returns empty array for unknown test ID", () => {
      const sources = getSourcesForTest("NONEXISTENT");
      expect(sources).toEqual([]);
    });

    it("all filtered sources are Lightcast or relevant", () => {
      const sources = getSourcesForTest("EXP-05");
      const lightcast = sources.find((s) => s.publisher === "Lightcast");
      expect(lightcast).toBeDefined();
      expect(lightcast!.supportsTests).toContain("EXP-05");
    });
  });
});
