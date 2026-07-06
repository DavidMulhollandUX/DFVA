// Canonical types for DFVA assessments — shared by scripts, Wasp app, and MCP server

export interface DimensionScore {
  dimension: string;
  score: number | null;   // 0.0 - 3.0, or null when Not Applicable (construct doesn't exist)
  maxScore: number;
  criteria: string[];
  notes: string;
}

/** The four numeric risk bands, plus 'NOT RATABLE' for programs with too few applicable dimensions. */
export type RiskCategory =
  | 'RESILIENT'
  | 'MODERATE RISK'
  | 'HIGH RISK'
  | 'CRITICAL'
  | 'NOT RATABLE';

/**
 * Real graduate-outcome (JIR / QILT / demand-side) evidence for a program.
 * Sourced from data/labour-evidence.json; attached to enrich agent/MCP responses.
 * Optional — only ~41 taught programs have it (doctorate/stub programs do not).
 */
export interface LabourEvidence {
  field: string;
  qiltStudyArea: string;
  qilt: {
    employmentRate: number;      // 0.0 - 1.0, full-time employment within ~4 months
    medianSalary: number;        // AUD
    employmentRate3yr: number;   // 0.0 - 1.0
    occupationDemand: string;    // e.g. 'SHORTAGE'
    year: number;
  };
  /** Top graduate destinations (role + share) at entry/early/senior career stages. */
  destinations: { entry: string[]; early: string[]; senior: string[] };
  /** Demand-side employers actively hiring (from job-ad evidence). */
  demandEmployers: string[];
  /** Advertised salary range from demand-side job ads, e.g. 'A$95k–160k'. */
  demandSalary: string;
}

export interface ProgramAssessment {
  programCode: string;
  programName: string;
  faculty: string;
  level: 'undergraduate' | 'postgraduate' | 'graduate-research';
  overallScore: number;
  riskCategory: RiskCategory;
  dimensions: DimensionScore[];
  aiLiteracyScore: number;
  labourMarketAlignment: number;
  assessedAt: string;
  recommendationSummary: string;
  marketReportPath: string;
  /** Real graduate-outcome evidence; present only for programs covered by JIR/QILT data. */
  labourEvidence?: LabourEvidence;
}

export interface AssessmentQuery {
  programCode?: string;
  faculty?: string;
  riskCategory?: RiskCategory;
  minScore?: number;
  maxScore?: number;
  limit?: number;
}

export interface CrossProgramAnalysis {
  totalPrograms: number;
  riskDistribution: Record<ProgramAssessment['riskCategory'], number>;
  weakestDimension: string;
  averageScores: Record<string, number>;
  aiLiteracyAverage: number;
  programsNearResilient: string[];
}
