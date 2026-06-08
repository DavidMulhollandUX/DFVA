import type { ProgramReport } from "./sharedProgramData";

/**
 * Pure function that converts an AssessmentJob DB record into the
 * ProgramReport shape that ReportsPage expects.
 *
 * Extracts structured data from job.reportJson (where assessment metadata
 * like institution, level, slugs, and date live) and falls back to job
 * fields where reportJson is unavailable.
 */
export function jobToReport(job: {
  createdAt: Date | string;
  handbookUrl: string;
  courseCode?: string | null;
  programName?: string | null;
  score?: number | null;
  maxScore?: number | null;
  riskBand?: string | null;
  thresholds?: unknown;
  dimensions?: unknown;
  reportJson?: unknown;
}): ProgramReport {
  const rj = job.reportJson as Record<string, unknown> | null | undefined;

  // --- date -----------------------------------------------------------
  const date: string =
    typeof rj?.date === "string" && rj.date.length > 0
      ? rj.date
      : job.createdAt instanceof Date
        ? job.createdAt.toISOString().split("T")[0]
        : typeof job.createdAt === "string"
          ? job.createdAt.split("T")[0]
          : new Date().toISOString().split("T")[0];

  // --- institution ----------------------------------------------------
  const institution: string =
    typeof rj?.institution === "string" && rj.institution.length > 0
      ? rj.institution
      : "University of Melbourne";

  // --- level ----------------------------------------------------------
  const level: string =
    typeof rj?.level === "string" && rj.level.length > 0
      ? rj.level
      : "To be determined";

  // --- slugs ----------------------------------------------------------
  const courseCode = (job.courseCode ?? "unknown").toLowerCase();

  const assessmentSlug: string =
    typeof rj?.assessmentSlug === "string" && rj.assessmentSlug.length > 0
      ? rj.assessmentSlug
      : `dfva-${courseCode}`;

  const marketSlug: string =
    typeof rj?.marketSlug === "string" && rj.marketSlug.length > 0
      ? rj.marketSlug
      : `dfva-market-${courseCode}`;

  const recommendSlug: string | undefined =
    typeof rj?.recommendSlug === "string" && rj.recommendSlug.length > 0
      ? rj.recommendSlug
      : undefined;

  // --- risk band ------------------------------------------------------
  const riskBand: ProgramReport["riskBand"] =
    job.riskBand === "RESILIENT" ||
    job.riskBand === "MODERATE RISK" ||
    job.riskBand === "HIGH RISK" ||
    job.riskBand === "CRITICAL"
      ? job.riskBand
      : "HIGH RISK";

  // --- thresholds -----------------------------------------------------
  const thresholds: ProgramReport["thresholds"] = (() => {
    const t = job.thresholds as Record<string, unknown> | null | undefined;
    const q = (v: unknown): "YES" | "NO" | "UNCERTAIN" =>
      v === "YES" || v === "NO" || v === "UNCERTAIN" ? v : "UNCERTAIN";
    return {
      q1: q(t?.q1),
      q2: q(t?.q2),
      q3: q(t?.q3),
    };
  })();

  // --- dimensions -----------------------------------------------------
  const dimensions: ProgramReport["dimensions"] = (() => {
    const d = job.dimensions;
    if (Array.isArray(d)) {
      return d
        .filter(
          (item): item is Record<string, unknown> =>
            item != null && typeof item === "object",
        )
        .map((item) => ({
          label: typeof item.label === "string" ? item.label : "Unknown",
          score: typeof item.score === "number" ? item.score : 0,
          max: typeof item.max === "number" ? item.max : 3,
        }));
    }
    return [];
  })();

  // --- assemble -------------------------------------------------------
  return {
    program: job.programName ?? "Unknown Program",
    institution,
    level,
    date,
    score: job.score ?? 0,
    maxScore: job.maxScore ?? 36,
    riskBand,
    thresholds,
    dimensions,
    assessmentSlug,
    marketSlug,
    recommendSlug,
    handbookUrl: job.handbookUrl,
  };
}
