// TechnologyOne Data Connector — feat-011

export enum T1FileType {
  T1XL = "T1XL",
  T1ETLP = "T1ETLP",
  T1DM = "T1DM",
  T1DB = "T1DB",
}

export interface T1RawCourse {
  courseCode: string;
  courseName: string;
  enrolment?: number;
  level?: string;
  semester?: string;
}

export interface T1RawProgram {
  programCode: string;
  programName: string;
  level?: string;
  enrolmentCount?: number;
  applications?: number;
  offers?: number;
  acceptances?: number;
  retentionRate?: number;
  progressionRate?: number;
  courses: T1RawCourse[];
  rawRow: Record<string, unknown>; // Original row for audit trail
}

export interface T1ParseResult {
  programs: T1RawProgram[];
  warnings: string[];
  detectedColumns: string[];
  rowCount: number;
  entityCount: number;
  entityTypes: string[];
}
