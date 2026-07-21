// T1 .t1etlp Enrolment & Load Planning parser — feat-011
//
// Parses T1 Enrolment & Load Planning exports. Handles CSV, tab-delimited,
// and pipe-delimited variants. Extracts enrolment counts, load plans, and
// course-level detail.

import { parse } from "csv-parse/sync";
import type { T1RawProgram, T1RawCourse, T1ParseResult } from "../types";

/** Column name variants for ELP exports */
const ELP_COLUMN_MAP: Record<string, { field: keyof T1RawProgram; isCourse?: boolean }> = {
  // Program-level
  "program": { field: "programCode" },
  "program code": { field: "programCode" },
  "program_code": { field: "programCode" },
  programcode: { field: "programCode" },
  "program name": { field: "programName" },
  "program_name": { field: "programName" },
  programname: { field: "programName" },
  name: { field: "programName" },
  level: { field: "level" },
  degree: { field: "level" },

  // Enrolment counts
  enrolments: { field: "enrolmentCount" },
  enrolment: { field: "enrolmentCount" },
  enrollment: { field: "enrolmentCount" },
  "enrolment count": { field: "enrolmentCount" },
  headcount: { field: "enrolmentCount" },
  eftsl: { field: "enrolmentCount" }, // Equivalent Full-Time Student Load

  // Application funnel
  applications: { field: "applications" },
  apps: { field: "applications" },
  offers: { field: "offers" },
  acceptances: { field: "acceptances" },
  accepted: { field: "acceptances" },

  // Progression
  retention: { field: "retentionRate" },
  "retention rate": { field: "retentionRate" },
  retention_rate: { field: "retentionRate" },
  progression: { field: "progressionRate" },
  "progression rate": { field: "progressionRate" },
  progression_rate: { field: "progressionRate" },
  passrate: { field: "progressionRate" },

  // Course-level
  course: { field: "programCode", isCourse: true },
  "course code": { field: "programCode", isCourse: true },
  course_code: { field: "programCode", isCourse: true },
  subject: { field: "programCode", isCourse: true },
  "course name": { field: "programName", isCourse: true },
  course_name: { field: "programName", isCourse: true },

  // Semester/year
  year: { field: "programCode" }, // Used for grouping, not as program field
  semester: { field: "programCode" }, // Used for grouping
  period: { field: "programCode" },
};

/**
 * Detect the delimiter used in a CSV-like file.
 * Returns the most likely delimiter character.
 */
function detectDelimiter(firstLine: string): string {
  const candidates = [
    { char: "\t", count: (firstLine.match(/\t/g) || []).length },
    { char: "|", count: (firstLine.match(/\|/g) || []).length },
    { char: ",", count: (firstLine.match(/,/g) || []).length },
    { char: ";", count: (firstLine.match(/;/g) || []).length },
  ];
  candidates.sort((a, b) => b.count - a.count);
  return candidates[0].count > 0 ? candidates[0].char : ",";
}

/**
 * Parse a numeric value from a string, handling T1's formatting quirks.
 */
function parseELPNumber(value: unknown): number | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value === "number") return value;
  const cleaned = String(value).replace(/[^0-9.-]/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? undefined : parsed;
}

/**
 * Parse a .t1etlp buffer and extract T1RawProgram records.
 */
export function parseT1etlp(
  text: string,
  filename: string
): T1ParseResult {
  const warnings: string[] = [];

  // Detect delimiter from first non-empty line
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length === 0) {
    return {
      programs: [],
      warnings: ["File is empty"],
      detectedColumns: [],
      rowCount: 0,
      entityCount: 0,
      entityTypes: [],
    };
  }

  const delimiter = detectDelimiter(lines[0]);

  let rows: Record<string, unknown>[];
  try {
    rows = parse(text, {
      columns: true,
      skip_empty_lines: true,
      delimiter,
      trim: true,
      relaxColumnCount: true,
    });
  } catch (err) {
    throw new Error(
      `Failed to parse .t1etlp file "${filename}": ${err instanceof Error ? err.message : String(err)}`
    );
  }

  const rawHeaders = rows.length > 0 ? Object.keys(rows[0]) : [];
  const detectedColumns = rawHeaders.map((h) => String(h));

  // Group rows by program code (assuming program-level rows exist)
  const programMap = new Map<string, { program: Partial<T1RawProgram>; courses: T1RawCourse[] }>();
  let hasProgramLevel = false;

  for (const row of rows) {
    let programCode: string | undefined;
    let programName: string | undefined;
    const programFields: Partial<T1RawProgram> = {};
    const courseFields: Partial<T1RawCourse> = {};

    for (const [header, value] of Object.entries(row)) {
      const lowerHeader = header.toLowerCase().trim();
      const mapping = ELP_COLUMN_MAP[lowerHeader];

      if (!mapping) continue;

      if (mapping.isCourse) {
        // Course-level fields
        if (mapping.field === "programCode") {
          courseFields.courseCode = String(value).trim();
        } else if (mapping.field === "programName") {
          courseFields.courseName = String(value).trim();
        }
      } else {
        // Program-level fields
        if (mapping.field === "programCode") {
          programCode = String(value).trim();
        } else if (mapping.field === "programName") {
          programName = String(value).trim();
        } else if (mapping.field === "level") {
          programFields.level = String(value).trim();
        } else if (
          mapping.field === "enrolmentCount" ||
          mapping.field === "applications" ||
          mapping.field === "offers" ||
          mapping.field === "acceptances"
        ) {
          (programFields as Record<string, unknown>)[mapping.field] = parseELPNumber(value);
        } else if (
          mapping.field === "retentionRate" ||
          mapping.field === "progressionRate"
        ) {
          const num = parseELPNumber(value);
          if (num !== undefined) {
            // Normalize to 0-1 range if > 1
            (programFields as Record<string, unknown>)[mapping.field] = num > 1 ? num / 100 : num;
          }
        }
      }
    }

    if (programCode) {
      hasProgramLevel = true;
      if (!programMap.has(programCode)) {
        programMap.set(programCode, {
          program: { ...programFields, programCode, programName },
          courses: [],
        });
      }
      // Merge in any additional fields
      const existing = programMap.get(programCode)!;
      Object.assign(existing.program, programFields);

      if (courseFields.courseCode) {
        existing.courses.push({
          courseCode: courseFields.courseCode,
          courseName: courseFields.courseName || "",
        });
      }
    }
  }

  if (!hasProgramLevel && rows.length > 0) {
    // Fallback: treat the entire file as one program, each row is a course
    warnings.push(
      `No program-level column detected. Treating entire file as single program. ` +
        `Add "Program Code" or "Program" column for multi-program exports.`
    );
    const program: Partial<T1RawProgram> = {
      programCode: filename.replace(/\.(t1etlp|csv)$/i, ""),
      programName: filename,
    };
    const courses: T1RawCourse[] = rows.map((row, i) => ({
      courseCode: String(row["Course Code"] || row["course"] || `COURSE_${i + 1}`),
      courseName: String(row["Course Name"] || row["course_name"] || ""),
    }));
    return {
      programs: [
        {
          programCode: program.programCode!,
          programName: program.programName!,
          courses,
          rawRow: rows[0] || {},
        },
      ],
      warnings,
      detectedColumns,
      rowCount: rows.length,
      entityCount: 1,
      entityTypes: ["program", "course"],
    };
  }

  const programs: T1RawProgram[] = [];
  for (const [, entry] of programMap) {
    const p = entry.program;
    if (p.programCode && p.programName) {
      programs.push({
        programCode: p.programCode,
        programName: p.programName,
        level: p.level,
        enrolmentCount: p.enrolmentCount,
        applications: p.applications,
        offers: p.offers,
        acceptances: p.acceptances,
        retentionRate: p.retentionRate,
        progressionRate: p.progressionRate,
        courses: entry.courses,
        rawRow: {},
      });
    } else {
      warnings.push(
        `Skipped group: missing programCode or programName`
      );
    }
  }

  return {
    programs,
    warnings,
    detectedColumns,
    rowCount: rows.length,
    entityCount: programs.length,
    entityTypes: programs.some((p) => p.courses.length > 0)
      ? ["program", "course", "enrolment"]
      : ["program", "enrolment"],
  };
}
