import { describe, it, expect } from "vitest";
import {
  SyllabusSnapshotSchema,
  SubjectSchema,
  CreditStructureSchema,
  validateSyllabus,
} from "../syllabusSchema";

function makeValidSyllabus(overrides: Record<string, unknown> = {}): unknown {
  const base = {
    programCode: "MC-CS",
    programName: "Master of Computer Science",
    institution: "University of Melbourne",
    year: 2026,
    totalCreditPoints: 200,
    creditStructure: { total: 200, core: 100, elective: 50, research: 50, capstone: 25 },
    subjects: [
      { code: "COMP90041", name: "Programming and Software Development", level: 9, creditPoints: 12.5, type: "core", prerequisites: [], isCompulsory: true, isResearch: false, isCapstone: false, hasAIRelevance: true },
      { code: "COMP90049", name: "Introduction to Machine Learning", level: 9, creditPoints: 12.5, type: "elective", prerequisites: ["COMP90041"], isCompulsory: false, isResearch: false, isCapstone: false, hasAIRelevance: true },
      { code: "COMP90055", name: "Research Project", level: 9, creditPoints: 25, type: "research", prerequisites: [], isCompulsory: true, isResearch: true, isCapstone: false },
    ],
    streams: [{ name: "Artificial Intelligence", subjects: ["COMP90049", "COMP90051"], capstoneSubject: "COMP90055", researchSubjects: ["COMP90055"], creditPoints: 100, isCompulsory: false }],
    prerequisites: [{ subject: "COMP90049", requires: "COMP90041", type: "prerequisite" as const }],
    researchComponent: { required: true, minCreditPoints: 25, capstoneRequired: true, thesisAvailable: true },
    aiRelevantSubjects: 2,
    handbookUrl: "https://handbook.unimelb.edu.au/2026/courses/mc-cs",
    extractedAt: "2026-06-22",
  };
  return { ...base, ...overrides };
}

describe("SubjectSchema", () => {
  it("accepts a valid subject", () => {
    const result = SubjectSchema.safeParse({ code: "COMP10001", name: "Foundations of Computing", level: 1, creditPoints: 12.5, type: "core" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.code).toBe("COMP10001");
      expect(result.data.prerequisites).toEqual([]);
    }
  });

  it("rejects missing required fields", () => {
    const result = SubjectSchema.safeParse({ name: "No Code Subject" });
    expect(result.success).toBe(false);
  });

  it("rejects wrong type for creditPoints", () => {
    const result = SubjectSchema.safeParse({ code: "COMP10001", name: "Foundations", level: 1, creditPoints: "twelve", type: "core" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid subject type", () => {
    const result = SubjectSchema.safeParse({ code: "COMP10001", name: "Foundations", level: 1, creditPoints: 12.5, type: "workshop" });
    expect(result.success).toBe(false);
  });
});

describe("CreditStructureSchema", () => {
  it("accepts valid credit structure", () => {
    const result = CreditStructureSchema.safeParse({ total: 200, core: 100, elective: 50 });
    expect(result.success).toBe(true);
  });

  it("defaults breadth, research, capstone to 0", () => {
    const result = CreditStructureSchema.safeParse({ total: 200, core: 100, elective: 50 });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.breadth).toBe(0);
      expect(result.data.research).toBe(0);
      expect(result.data.capstone).toBe(0);
    }
  });
});

describe("SyllabusSnapshotSchema", () => {
  it("accepts a valid full syllabus", () => {
    const result = SyllabusSnapshotSchema.safeParse(makeValidSyllabus());
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.programCode).toBe("MC-CS");
  });

  it("rejects empty subjects array", () => {
    const result = SyllabusSnapshotSchema.safeParse(makeValidSyllabus({ subjects: [] }));
    expect(result.success).toBe(false);
  });

  it("rejects missing required fields", () => {
    const result = SyllabusSnapshotSchema.safeParse({ programCode: "MC-CS" });
    expect(result.success).toBe(false);
  });

  it("rejects negative credit points", () => {
    const result = SyllabusSnapshotSchema.safeParse(makeValidSyllabus({ totalCreditPoints: -1 }));
    expect(result.success).toBe(false);
  });

  it("rejects year outside valid range", () => {
    const result = SyllabusSnapshotSchema.safeParse(makeValidSyllabus({ year: 2015 }));
    expect(result.success).toBe(false);
  });

  it("defaults empty streams and prerequisites", () => {
    const data: any = makeValidSyllabus();
    delete data.streams;
    delete data.prerequisites;
    const result = SyllabusSnapshotSchema.safeParse(data);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.streams).toEqual([]);
      expect(result.data.prerequisites).toEqual([]);
    }
  });
});

describe("validateSyllabus", () => {
  it("returns success for valid data", () => {
    const result = validateSyllabus(makeValidSyllabus());
    expect(result.success).toBe(true);
  });

  it("returns errors for invalid data", () => {
    const result = validateSyllabus({});
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.length).toBeGreaterThan(0);
  });

  it("returns errors with path information", () => {
    const result = validateSyllabus(makeValidSyllabus({ totalCreditPoints: -5 }));
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.some((e: string) => e.includes("totalCreditPoints"))).toBe(true);
  });

  it("accepts single-stream programs", () => {
    const data: any = makeValidSyllabus();
    delete data.streams;
    const result = validateSyllabus(data);
    expect(result.success).toBe(true);
  });

  it("accepts programs with 0 electives", () => {
    const result = validateSyllabus(makeValidSyllabus({
      creditStructure: { total: 200, core: 150, elective: 0, research: 50 },
    }));
    expect(result.success).toBe(true);
  });

  it("accepts programs with large research components", () => {
    const result = validateSyllabus(makeValidSyllabus({
      creditStructure: { total: 200, core: 50, elective: 25, research: 125 },
    }));
    expect(result.success).toBe(true);
  });
});
