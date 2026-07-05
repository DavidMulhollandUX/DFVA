import { describe, it, expect } from "vitest";
import {
  loadAssessments,
  queryAssessments,
  getAssessment,
  crossProgramAnalysis,
  listProgramCodes,
} from "dfva-source/source/report-store.js";

// Integration-style tests over the real dfva/source/assessments.json (the
// store the MCP tools serve). Assertions are structural, not tied to exact
// program counts, so re-generated assessment data doesn't break them.

describe("queryAssessments filters", () => {
  it("returns everything with an empty query", () => {
    expect(queryAssessments({})).toHaveLength(loadAssessments().length);
  });

  it("applies inclusive score bounds", () => {
    const all = loadAssessments();
    const min = 20;
    const max = 27;
    const results = queryAssessments({ minScore: min, maxScore: max });
    for (const a of results) {
      expect(a.overallScore).toBeGreaterThanOrEqual(min);
      expect(a.overallScore).toBeLessThanOrEqual(max);
    }
    const expected = all.filter((a) => a.overallScore >= min && a.overallScore <= max);
    expect(results).toHaveLength(expected.length);
  });

  it("filters riskCategory exactly", () => {
    const results = queryAssessments({ riskCategory: "RESILIENT" });
    for (const a of results) expect(a.riskCategory).toBe("RESILIENT");
  });

  it("matches faculty as a case-insensitive substring", () => {
    const anyFaculty = loadAssessments()[0].faculty;
    const needle = anyFaculty.slice(0, 4).toUpperCase();
    const results = queryAssessments({ faculty: needle });
    expect(results.length).toBeGreaterThan(0);
    for (const a of results) {
      expect(a.faculty.toLowerCase()).toContain(needle.toLowerCase());
    }
  });

  it("caps results at limit", () => {
    expect(queryAssessments({ limit: 3 })).toHaveLength(3);
  });
});

describe("getAssessment", () => {
  it("finds a program case-insensitively", () => {
    const code = listProgramCodes()[0];
    expect(getAssessment(code.toUpperCase())?.programCode).toBe(code);
  });

  it("returns undefined for unknown codes", () => {
    expect(getAssessment("zz-does-not-exist")).toBeUndefined();
  });
});

describe("crossProgramAnalysis", () => {
  it("risk distribution sums to the total program count", () => {
    const analysis = crossProgramAnalysis();
    const sum = Object.values(analysis.riskDistribution).reduce((a, b) => a + b, 0);
    expect(sum).toBe(analysis.totalPrograms);
    expect(analysis.totalPrograms).toBe(loadAssessments().length);
  });

  it("weakestDimension has the lowest average score", () => {
    const analysis = crossProgramAnalysis();
    const weakestAvg = analysis.averageScores[analysis.weakestDimension];
    for (const avg of Object.values(analysis.averageScores)) {
      expect(weakestAvg).toBeLessThanOrEqual(avg);
    }
  });

  it("programsNearResilient are non-RESILIENT with score >= 24", () => {
    const analysis = crossProgramAnalysis();
    for (const code of analysis.programsNearResilient) {
      const a = getAssessment(code)!;
      expect(a.riskCategory).not.toBe("RESILIENT");
      expect(a.overallScore).toBeGreaterThanOrEqual(24);
    }
  });
});
