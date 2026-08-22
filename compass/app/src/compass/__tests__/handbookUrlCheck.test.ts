import { describe, it, expect } from "vitest";
import { checkHandbookUrl, ASSESSABLE_PROGRAMS } from "../handbookUrlCheck";

const known = ASSESSABLE_PROGRAMS[0];

describe("checkHandbookUrl", () => {
  it("treats blank input as empty", () => {
    expect(checkHandbookUrl("   ").kind).toBe("empty");
  });

  it("rejects non-URLs and non-http(s) schemes", () => {
    expect(checkHandbookUrl("mc-cs").kind).toBe("invalid");
    expect(
      checkHandbookUrl("ftp://handbook.unimelb.edu.au/2026/courses/mc-cs").kind,
    ).toBe("invalid");
  });

  it("recognises an assessable program", () => {
    const result = checkHandbookUrl(known.handbookUrl);
    expect(result).toMatchObject({
      kind: "known",
      canonicalUrl: known.handbookUrl,
    });
  });

  it("still recognises it despite case and trailing-slash noise", () => {
    const result = checkHandbookUrl(`  ${known.handbookUrl.toUpperCase()}/  `);
    // The services match by exact string, so the canonical form is what must
    // be submitted — otherwise the user gets a placeholder we promised them not.
    expect(result).toMatchObject({
      kind: "known",
      canonicalUrl: known.handbookUrl,
    });
  });

  it("flags a course page that has no assessment yet", () => {
    expect(
      checkHandbookUrl("https://handbook.unimelb.edu.au/2026/courses/zz-none"),
    ).toEqual({ kind: "unknown", courseCode: "ZZ-NONE" });
  });

  it("flags a URL that is not a course page", () => {
    expect(
      checkHandbookUrl(
        "https://handbook.unimelb.edu.au/2026/subjects/comp90041",
      ).kind,
    ).toBe("not-course");
    expect(checkHandbookUrl("https://example.com").kind).toBe("not-course");
  });
});

describe("ASSESSABLE_PROGRAMS", () => {
  it("lists only programs that carry a handbook URL", () => {
    expect(ASSESSABLE_PROGRAMS.length).toBeGreaterThan(0);
    expect(ASSESSABLE_PROGRAMS.every((p) => Boolean(p.handbookUrl))).toBe(true);
  });
});
