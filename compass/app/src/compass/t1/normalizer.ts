// T1 Normalizer — feat-011
//
// Maps parsed T1RawProgram records to T1ProgramSnapshot shape.
// Handles field name normalization, code cleanup, enrolment aggregation,
// progression rate calculation, and institution linking.

import type { T1RawProgram, T1RawCourse } from "./types";

/** Normalized snapshot ready for persistence */
export interface NormalizedT1Program {
  programCode: string;
  programName: string;
  level: string | null;
  handbookUrl: string | null;
  enrolmentCount: number | null;
  applications: number | null;
  offers: number | null;
  acceptances: number | null;
  retentionRate: number | null;
  progressionRate: number | null;
  courseList: {
    courseCode: string;
    courseName: string;
    enrolment?: number;
    level?: string;
  }[];
}

/** Normalization result with validation warnings */
export interface NormalizationResult {
  programs: NormalizedT1Program[];
  warnings: string[];
  programCount: number;
  courseCount: number;
}

/**
 * Normalize program code to a standard format.
 * T1 codes vary widely: "B-SCI", "BSC", "SCIENCE-B", "BACHELOR OF SCIENCE"
 */
function normalizeCode(code: string): string {
  return code
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^A-Za-z0-9-]/g, "")
    .toUpperCase();
}

/**
 * Trim and title-case a program name.
 */
function normalizeName(name: string): string {
  return name
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Compute program-level enrolment count from course-level data.
 */
function aggregateEnrolment(courses: T1RawCourse[]): number | null {
  if (courses.length === 0) return null;
  const courseEnrolments = courses
    .map((c) => c.enrolment)
    .filter((e): e is number => typeof e === "number");
  if (courseEnrolments.length === 0) return null;
  return courseEnrolments.reduce((sum, e) => sum + e, 0);
}

/**
 * Normalize raw parsed T1 programs into structured snapshot records.
 */
export function normalizePrograms(
  raw: T1RawProgram[],
  _institutionCode: string,
): NormalizationResult {
  const warnings: string[] = [];
  const programs: NormalizedT1Program[] = [];
  let courseCount = 0;

  for (const rawProg of raw) {
    if (!rawProg.programCode || !rawProg.programName) {
      warnings.push(
        `Skipping program: missing code or name in raw record "${
          rawProg.programCode || "?"
        }"`,
      );
      continue;
    }

    const enrolment =
      rawProg.enrolmentCount ?? aggregateEnrolment(rawProg.courses);

    const courses = rawProg.courses.map((c) => ({
      courseCode: c.courseCode || "",
      courseName: c.courseName || "",
      enrolment: c.enrolment,
      level: c.level,
    }));
    courseCount += courses.length;

    programs.push({
      programCode: normalizeCode(rawProg.programCode),
      programName: normalizeName(rawProg.programName),
      level: rawProg.level?.trim() || null,
      handbookUrl: null,
      enrolmentCount: enrolment ?? null,
      applications: rawProg.applications ?? null,
      offers: rawProg.offers ?? null,
      acceptances: rawProg.acceptances ?? null,
      retentionRate: rawProg.retentionRate ?? null,
      progressionRate: rawProg.progressionRate ?? null,
      courseList: courses,
    });
  }

  // Deduplicate by program code (keep last occurrence — most recent data)
  const deduped = new Map<string, NormalizedT1Program>();
  for (const prog of programs) {
    deduped.set(prog.programCode, prog);
    if (deduped.size < programs.length) {
      // We replaced a duplicate — track this silently since it's normal
    }
  }
  const uniquePrograms = Array.from(deduped.values());

  if (uniquePrograms.length < programs.length) {
    warnings.push(
      `Deduplicated ${
        programs.length - uniquePrograms.length
      } duplicate program codes (kept most recent).`,
    );
  }

  return {
    programs: uniquePrograms,
    warnings,
    programCount: uniquePrograms.length,
    courseCount,
  };
}
