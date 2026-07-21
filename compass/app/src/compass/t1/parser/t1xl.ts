// T1 .t1xl spreadsheet parser — feat-011
//
// Parses T1 spreadsheet exports (Office Open XML format, ZIP-wrapped Excel).
// Auto-detects the sheet containing program data and extracts rows as T1RawProgram.

import { read, utils } from "xlsx";
import type { T1RawProgram, T1RawCourse, T1ParseResult } from "../types";

/** Column name variants that T1 uses across versions */
const COLUMN_MAP: Record<string, keyof T1RawProgram> = {
  "program code": "programCode",
  "program_code": "programCode",
  programcode: "programCode",
  code: "programCode",
  "course code": "programCode", // Some exports use "Course Code" for program-level
  "program name": "programName",
  "program_name": "programName",
  programname: "programName",
  name: "programName",
  title: "programName",
  level: "level",
  "degree level": "level",
  degree_level: "level",
  enrolments: "enrolmentCount",
  enrolment: "enrolmentCount",
  enrollment: "enrolmentCount",
  "enrolment count": "enrolmentCount",
  applications: "applications",
  offers: "offers",
  acceptances: "acceptances",
  "retention rate": "retentionRate",
  retention_rate: "retentionRate",
  retention: "retentionRate",
  "progression rate": "progressionRate",
  progression_rate: "progressionRate",
  progression: "progressionRate",
};

/** Known column names that contain program-level data */
const PROGRAM_SHEET_COLUMNS = [
  "program code",
  "program_code",
  "program name",
  "program_name",
  "enrolments",
  "enrolment",
  "enrollment",
];

/**
 * Score how likely a given sheet is to be the program data sheet.
 * Higher score = more program-level columns detected.
 */
function scoreSheet(columns: string[]): number {
  const lowerColumns = columns.map((c) => c.toLowerCase().trim());
  return PROGRAM_SHEET_COLUMNS.filter((col) =>
    lowerColumns.some((c) => c.includes(col))
  ).length;
}

/**
 * Attempt to normalize a raw row value into the target T1RawProgram field.
 */
function mapField(
  row: Record<string, unknown>,
  header: string,
  target: keyof T1RawProgram
): unknown {
  const value = row[header];
  if (value === undefined || value === null) return undefined;

  switch (target) {
    case "enrolmentCount":
    case "applications":
    case "offers":
    case "acceptances":
      if (typeof value === "number") return value;
      if (typeof value === "string") {
        const parsed = parseInt(value.replace(/[^0-9.-]/g, ""), 10);
        return isNaN(parsed) ? undefined : parsed;
      }
      return undefined;
    case "retentionRate":
    case "progressionRate":
      if (typeof value === "number") return value;
      if (typeof value === "string") {
        // Handle "85%" format
        const pctMatch = value.match(/([0-9.]+)%/);
        if (pctMatch) return parseFloat(pctMatch[1]) / 100;
        const parsed = parseFloat(value.replace(/[^0-9.]/g, ""));
        return isNaN(parsed) ? undefined : parsed > 1 ? parsed / 100 : parsed;
      }
      return undefined;
    case "programCode":
    case "programName":
    case "level":
      return typeof value === "string" ? value.trim() : String(value).trim();
    default:
      return value;
  }
}

/**
 * Parse a .t1xl spreadsheet buffer and extract T1RawProgram records.
 */
export function parseT1xl(buffer: ArrayBuffer, filename: string): T1ParseResult {
  const workbook = read(buffer, { type: "array" });
  const warnings: string[] = [];
  const allPrograms: T1RawProgram[] = [];

  // Find the sheet most likely to contain program data
  let bestSheet = workbook.SheetNames[0];
  let bestScore = -1;

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const json = utils.sheet_to_json<string[]>(sheet, { header: 1 });
    if (json.length === 0) continue;

    const headerRow = json[0] as string[];
    const columns = headerRow
      .filter((h): h is string => typeof h === "string")
      .map((h) => h.toLowerCase().trim());

    const score = scoreSheet(columns);
    if (score > bestScore) {
      bestScore = score;
      bestSheet = sheetName;
    }
  }

  const sheet = workbook.Sheets[bestSheet];
  const rows = utils.sheet_to_json<Record<string, unknown>>(sheet);

  const rawHeaders = Object.keys(rows[0] || {});
  const detectedColumns = rawHeaders.map((h) => String(h));

  for (const row of rows) {
    const program: Partial<T1RawProgram> = { courses: [] };

    for (const [header, value] of Object.entries(row)) {
      const lowerHeader = header.toLowerCase().trim();
      const targetField = COLUMN_MAP[lowerHeader] || COLUMN_MAP[lowerHeader.replace(/[^a-z0-9]/g, "")];

      if (targetField) {
        (program as Record<string, unknown>)[targetField] = mapField(
          row,
          header,
          targetField
        );
      }
    }

    if (program.programCode && program.programName) {
      allPrograms.push({
        programCode: program.programCode,
        programName: program.programName,
        level: program.level,
        enrolmentCount: program.enrolmentCount,
        applications: program.applications,
        offers: program.offers,
        acceptances: program.acceptances,
        retentionRate: program.retentionRate,
        progressionRate: program.progressionRate,
        courses: program.courses as T1RawCourse[],
        rawRow: row,
      });
    } else {
      warnings.push(
        `Skipped row: missing programCode ("${program.programCode}") or programName ("${program.programName}")`
      );
    }
  }

  return {
    programs: allPrograms,
    warnings,
    detectedColumns,
    rowCount: rows.length,
    entityCount: allPrograms.length,
    entityTypes: ["program"],
  };
}
