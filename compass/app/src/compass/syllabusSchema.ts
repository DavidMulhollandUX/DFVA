import * as z from "zod";

/**
 * A single subject (course/unit) in a degree program.
 *
 * @example
 * { code: "COMP10001", name: "Foundations of Computing", level: 1, creditPoints: 12.5, type: "core" }
 */
export const SubjectSchema = z.object({
  code: z.string().describe("Subject code, e.g. COMP10001"),
  name: z.string().describe("Full subject name"),
  level: z.number().min(1).max(9).describe("Subject level (1-9)"),
  creditPoints: z.number().positive().describe("Credit point value"),
  type: z
    .enum(["core", "elective", "capstone", "research", "breadth", "major_core", "major_elective"])
    .describe("Subject role in the degree"),
  prerequisites: z.array(z.string()).default([]).describe("Prerequisite subject codes"),
  isCompulsory: z.boolean().default(true),
  isResearch: z.boolean().default(false),
  isCapstone: z.boolean().default(false),
  hasAIRelevance: z.boolean().optional().describe("Whether the subject has AI-relevant content"),
  semesterAvailability: z
    .array(z.enum(["Sem1", "Sem2", "Summer", "Winter"]))
    .default(["Sem1", "Sem2"]),
});

/**
 * A named stream/major/specialisation within a degree.
 *
 * @example
 * { name: "Computer Science", subjects: ["COMP10001", "COMP10002", ...], capstoneSubject: "COMP30022" }
 */
export const StreamSchema = z.object({
  name: z.string().describe("Stream/major/specialisation name"),
  subjects: z.array(z.string()).describe("Subject codes in this stream"),
  capstoneSubject: z.string().optional().describe("Capstone subject for this stream"),
  researchSubjects: z.array(z.string()).default([]).describe("Research-intensive subjects in this stream"),
  creditPoints: z.number().positive().describe("Total credit points for this stream"),
  isCompulsory: z.boolean().default(true),
});

/**
 * Credit point structure across the degree.
 */
export const CreditStructureSchema = z.object({
  total: z.number().positive().describe("Total credit points for the degree"),
  core: z.number().min(0).describe("Credit points from core subjects"),
  elective: z.number().min(0).describe("Credit points from elective subjects"),
  breadth: z.number().min(0).default(0).describe("Credit points from breadth subjects"),
  research: z.number().min(0).default(0).describe("Credit points from research components"),
  capstone: z.number().min(0).default(0).describe("Credit points from capstone subjects"),
});

/**
 * A prerequisite relationship between subjects.
 */
export const PrerequisiteSchema = z.object({
  subject: z.string().describe("Subject code that has the prerequisite"),
  requires: z.string().describe("Subject code that is required"),
  type: z.enum(["prerequisite", "corequisite", "recommended"]).default("prerequisite"),
});

/**
 * Structured snapshot of a degree program's curriculum.
 *
 * This is the central data model for DFVA's competitive advantage: every competitor
 * stores curriculum as unstructured HTML. DFVA stores it as typed, queryable JSON.
 *
 * @example
 * {
 *   programCode: "MC-CS",
 *   programName: "Master of Computer Science",
 *   institution: "University of Melbourne",
 *   year: 2026,
 *   totalCreditPoints: 200,
 *   creditStructure: { total: 200, core: 87.5, elective: 62.5, research: 50, capstone: 25 },
 *   subjects: [...],
 *   streams: [...],
 *   prerequisites: [...],
 *   researchComponent: { required: true, minCreditPoints: 25, capstoneRequired: true },
 *   aiRelevantSubjects: 4
 * }
 */
export const SyllabusSnapshotSchema = z.object({
  programCode: z.string().describe("Program code, e.g. MC-CS"),
  programName: z.string().describe("Full program name"),
  institution: z.string().default("University of Melbourne"),
  year: z.number().int().min(2020).max(2030).describe("Handbook year"),
  totalCreditPoints: z.number().positive(),
  creditStructure: CreditStructureSchema,
  subjects: z.array(SubjectSchema).min(1).describe("All subjects in the degree"),
  streams: z.array(StreamSchema).default([]).describe("Named streams/majors/specialisations"),
  prerequisites: z.array(PrerequisiteSchema).default([]).describe("Prerequisite relationships"),
  researchComponent: z.object({
    required: z.boolean(),
    minCreditPoints: z.number().min(0),
    capstoneRequired: z.boolean().default(false),
    thesisAvailable: z.boolean().default(false),
  }),
  aiRelevantSubjects: z.number().min(0).default(0),
  handbookUrl: z.string().url().optional(),
  extractedAt: z.string().optional().describe("ISO date when syllabus was extracted"),
});

// ---- Inferred TypeScript types ----

export type Subject = z.infer<typeof SubjectSchema>;
export type Stream = z.infer<typeof StreamSchema>;
export type CreditStructure = z.infer<typeof CreditStructureSchema>;
export type Prerequisite = z.infer<typeof PrerequisiteSchema>;
export type SyllabusSnapshot = z.infer<typeof SyllabusSnapshotSchema>;

// ---- Validation functions ----

/**
 * Validate a syllabus JSON object against the schema.
 * Returns { success: true, data } or { success: false, errors }.
 */
export function validateSyllabus(data: unknown):
  | { success: true; data: SyllabusSnapshot }
  | { success: false; errors: string[] } {
  const result = SyllabusSnapshotSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return {
    success: false,
    errors: result.error.issues.map(
      (i) => `[${i.path.join(".")}] ${i.message}`
    ),
  };
}
