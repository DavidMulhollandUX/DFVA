import { describe, expect, it } from "vitest";
import { V4_INDEX } from "../v4/data/v4Meta";
import { relatedPrograms, subjectOf } from "../v4/relatedPrograms";

/**
 * Matching across universities cannot go through the program name. UNSW names
 * 316 of its programs by the bare field, Sydney names sub-pages after
 * programs, and Adelaide gives a single and a double degree the same name
 * (docs/dfva-national-expansion-spec.md). These tests pin the subject rule
 * that survives all three, and the two claims a reader would act on: that a
 * listed program is at another university, and that it is the same subject.
 */
describe("subjectOf", () => {
  it("strips the award so an awardless handbook name still matches", () => {
    expect(subjectOf("Master of Public Health")).toBe("public health");
    expect(subjectOf("Public Health")).toBe("public health");
    expect(subjectOf("Bachelor of Arts")).toBe(subjectOf("Arts"));
  });

  it("treats a variant qualifier as the same subject", () => {
    expect(subjectOf("Bachelor of Laws (Honours)")).toBe("laws");
    expect(subjectOf("Bachelor of Science (Extended)")).toBe("science");
    expect(
      subjectOf(
        "Master of Public Health (coursework or coursework and dissertation)",
      ),
    ).toBe("public health");
  });

  it("normalises the one spelling the Go8 disagree on", () => {
    expect(subjectOf("Law")).toBe(subjectOf("Bachelor of Laws"));
  });

  it("returns nothing for a name that is only an award word", () => {
    expect(subjectOf("Master of")).toBe("");
  });
});

describe("relatedPrograms", () => {
  it("never returns the program itself or its own university", () => {
    for (const code of Object.keys(V4_INDEX)) {
      const self = V4_INDEX[code];
      for (const { entry } of relatedPrograms(code)) {
        expect(entry.code, code).not.toBe(code);
        expect(entry.institutionSlug, code).not.toBe(self.institutionSlug);
      }
    }
  });

  it("returns one program per university", () => {
    for (const code of Object.keys(V4_INDEX)) {
      const slugs = relatedPrograms(code).map((r) => r.entry.institutionSlug);
      expect(new Set(slugs).size, code).toBe(slugs.length);
    }
  });

  it("only ever returns the same subject", () => {
    for (const code of Object.keys(V4_INDEX)) {
      const subject = subjectOf(V4_INDEX[code].name);
      for (const { entry } of relatedPrograms(code)) {
        expect(subjectOf(entry.name), `${code} → ${entry.code}`).toBe(subject);
      }
    }
  });

  it("reports the delta the card shows, signed peer minus current", () => {
    const code = "244cw";
    for (const { entry, delta } of relatedPrograms(code)) {
      expect(delta.adaptiveness).toBe(
        entry.adaptiveness - V4_INDEX[code].adaptiveness,
      );
    }
  });

  it("finds the whole published public health row from either end", () => {
    // Melbourne's Master of Public Health is the reference the row is read
    // against; Sydney's is named "Public Health" with no award word at all.
    expect(
      relatedPrograms("244cw")
        .map((r) => r.entry.institutionSlug)
        .sort(),
    ).toEqual(["adelaide", "anu", "monash", "unsw", "uq", "usyd", "uwa"]);
    expect(
      relatedPrograms("usyd-public-health").map((r) => r.entry.institutionSlug),
    ).toContain("unimelb");
  });

  it("ranks a known different level last, but not an unknown one", () => {
    // Sydney and UNSW name public health with no award word, so their level is
    // "other". Ordering them below the master's peers would demote the widest
    // gap in the row for a handbook convention.
    const row = relatedPrograms("244cw");
    expect(row[0].entry.institutionSlug).toBe("usyd");
    // A Master of Computer Science does lead with UNSW's unknown-level program
    // rather than with the bachelor's degrees that are a different award.
    const cs = relatedPrograms("mc-cs");
    expect(cs[0].entry.level).toBe("other");
    expect(cs[cs.length - 1].entry.level).toBe("bachelor");
  });

  it("returns nothing for a subject no other published university runs", () => {
    expect(relatedPrograms("038ab")).toEqual([]);
  });

  it("returns nothing for a code with no score", () => {
    expect(relatedPrograms("not-a-program")).toEqual([]);
  });
});
