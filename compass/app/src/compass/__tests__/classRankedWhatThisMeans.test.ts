import { describe, it, expect } from "vitest";
import { whatThisMeans } from "../CompetitiveThreatCard";

/**
 * Tests for the whatThisMeans function in CompetitiveThreatCard.
 *
 * Verifies the ClassRanked acquisition case returns the correct
 * counter-positioning analysis — 4 paragraphs on independence as
 * structural advantage, prescriptive vs descriptive methodology,
 * and the vendor conflict of interest.
 */

describe("whatThisMeans — ClassRanked acquisition case", () => {
  const classRankedTitle =
    "Coursedog Acquires ClassRanked, Rebrands to Intelligent Academic Operations Platform";

  it("returns 4 paragraphs for ClassRanked title", () => {
    const result = whatThisMeans(classRankedTitle);
    expect(result.paragraphs).toHaveLength(4);
  });

  it("returns a non-null sourceUrl for ClassRanked title", () => {
    const result = whatThisMeans(classRankedTitle);
    expect(result.sourceUrl).not.toBeNull();
    expect(result.sourceUrl).toContain("coursedog.com");
  });

  it("first paragraph mentions validation of the assessment category", () => {
    const result = whatThisMeans(classRankedTitle);
    expect(result.paragraphs[0].toLowerCase()).toContain("validates");
  });

  it("mentions independence as the product", () => {
    const result = whatThisMeans(classRankedTitle);
    const allText = result.paragraphs.join(" ").toLowerCase();
    expect(allText).toContain("independence");
    expect(allText).toContain("product");
  });

  it("mentions prescriptive vs descriptive distinction", () => {
    const result = whatThisMeans(classRankedTitle);
    const allText = result.paragraphs.join(" ").toLowerCase();
    expect(allText).toContain("prescriptive");
    expect(allText).toContain("descriptive");
  });

  it("mentions structural conflict of interest", () => {
    const result = whatThisMeans(classRankedTitle);
    const allText = result.paragraphs.join(" ").toLowerCase();
    expect(allText).toContain("conflict of interest");
  });

  it("is distinct from the default case (2 paragraphs, null sourceUrl)", () => {
    const classRankedResult = whatThisMeans(classRankedTitle);
    const defaultResult = whatThisMeans("Some unrelated event title");
    expect(classRankedResult.paragraphs.length).not.toBe(
      defaultResult.paragraphs.length,
    );
    expect(classRankedResult.sourceUrl).not.toBe(defaultResult.sourceUrl);
  });

  it("is distinct from the Assessment Cloud case", () => {
    const classRankedResult = whatThisMeans(classRankedTitle);
    const assessmentCloudResult = whatThisMeans(
      "Coursedog Elevates Assessment to Third Product Pillar",
    );
    // Both return 4 paragraphs, but the content must differ
    expect(classRankedResult.paragraphs[0]).not.toBe(
      assessmentCloudResult.paragraphs[0],
    );
  });

  it("is distinct from the CourseLeaf Analytics case", () => {
    const classRankedResult = whatThisMeans(classRankedTitle);
    const courseLeafResult = whatThisMeans(
      "CourseLeaf Adds Analytics Features to Product Listing",
    );
    expect(classRankedResult.paragraphs[0]).not.toBe(
      courseLeafResult.paragraphs[0],
    );
    expect(classRankedResult.sourceUrl).not.toBe(courseLeafResult.sourceUrl);
  });

  it("matches on 'ClassRanked' substring in a longer title", () => {
    const result = whatThisMeans(
      "Coursedog Acquires ClassRanked in Major AI Push",
    );
    expect(result.paragraphs).toHaveLength(4);
    expect(result.sourceUrl).not.toBeNull();
  });
});
