import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type {
  ProgramAssessment,
  AssessmentQuery,
  CrossProgramAnalysis,
} from './types.js';

// ── Internal helpers ──────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));

let _assessments: ProgramAssessment[] | null = null;

/** Load assessments from the seed JSON file (cached after first read). */
export function loadAssessments(): ProgramAssessment[] {
  if (_assessments) return _assessments;
  const raw = readFileSync(join(__dirname, 'assessments.json'), 'utf-8');
  _assessments = JSON.parse(raw) as ProgramAssessment[];
  return _assessments;
}

// ── Public API ───────────────────────────────────────────────────────────────

/** Query assessments with optional filters. */
export function queryAssessments(q: AssessmentQuery): ProgramAssessment[] {
  let results = loadAssessments();

  if (q.programCode) {
    results = results.filter(
      (a) => a.programCode.toLowerCase() === q.programCode!.toLowerCase(),
    );
  }
  if (q.faculty) {
    results = results.filter(
      (a) => a.faculty.toLowerCase().includes(q.faculty!.toLowerCase()),
    );
  }
  if (q.riskCategory) {
    results = results.filter((a) => a.riskCategory === q.riskCategory);
  }
  if (q.minScore !== undefined) {
    results = results.filter((a) => a.overallScore >= q.minScore!);
  }
  if (q.maxScore !== undefined) {
    results = results.filter((a) => a.overallScore <= q.maxScore!);
  }

  if (q.limit !== undefined && q.limit > 0) {
    results = results.slice(0, q.limit);
  }

  return results;
}

/** Get a single assessment by program code (case-insensitive). */
export function getAssessment(
  programCode: string,
): ProgramAssessment | undefined {
  const code = programCode.toLowerCase();
  return loadAssessments().find(
    (a) => a.programCode.toLowerCase() === code,
  );
}

/** Aggregate cross-program analysis across all assessments. */
export function crossProgramAnalysis(): CrossProgramAnalysis {
  const all = loadAssessments();
  const totalPrograms = all.length;

  // Risk distribution
  const riskDistribution: Record<ProgramAssessment['riskCategory'], number> = {
    RESILIENT: 0,
    'MODERATE RISK': 0,
    'HIGH RISK': 0,
    CRITICAL: 0,
  };
  for (const a of all) {
    riskDistribution[a.riskCategory] =
      (riskDistribution[a.riskCategory] || 0) + 1;
  }

  // Per-dimension average scores
  const dimensionTotals: Record<string, { total: number; count: number }> = {};
  let aiLiteracyTotal = 0;

  for (const a of all) {
    aiLiteracyTotal += a.aiLiteracyScore;
    for (const d of a.dimensions) {
      if (!dimensionTotals[d.dimension]) {
        dimensionTotals[d.dimension] = { total: 0, count: 0 };
      }
      dimensionTotals[d.dimension].total += d.score;
      dimensionTotals[d.dimension].count += 1;
    }
  }

  const averageScores: Record<string, number> = {};
  let weakestDimension = '';
  let weakestScore = Infinity;

  for (const [dim, { total, count }] of Object.entries(dimensionTotals)) {
    const avg = total / count;
    averageScores[dim] = Math.round(avg * 100) / 100;
    if (avg < weakestScore) {
      weakestScore = avg;
      weakestDimension = dim;
    }
  }

  const aiLiteracyAverage =
    totalPrograms > 0
      ? Math.round((aiLiteracyTotal / totalPrograms) * 100) / 100
      : 0;

  // Programs near RESILIENT: within striking distance of the 28/36 RESILIENT
  // floor (rubric RISK_BANDS) but not yet there. overallScore is on the /36
  // scale, consistent with the risk bands and the app's real scores.
  const programsNearResilient = all
    .filter((a) => a.riskCategory !== 'RESILIENT' && a.overallScore >= 24)
    .map((a) => a.programCode);

  return {
    totalPrograms,
    riskDistribution,
    weakestDimension,
    averageScores,
    aiLiteracyAverage,
    programsNearResilient,
  };
}

/** List all program codes. */
export function listProgramCodes(): string[] {
  return loadAssessments().map((a) => a.programCode);
}

/** Get the market report path for a program, or null if not found. */
export function getReportPath(programCode: string): string | null {
  const a = getAssessment(programCode);
  return a ? a.marketReportPath : null;
}
