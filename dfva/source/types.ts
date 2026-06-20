// Canonical types for DFVA assessments — shared by scripts, Wasp app, and MCP server

export interface DimensionScore {
  dimension: string;
  score: number;          // 0.0 - 3.0
  maxScore: number;
  criteria: string[];
  notes: string;
}

export interface ProgramAssessment {
  programCode: string;
  programName: string;
  faculty: string;
  level: 'undergraduate' | 'postgraduate' | 'graduate-research';
  overallScore: number;
  riskCategory: 'RESILIENT' | 'MODERATE RISK' | 'HIGH RISK' | 'CRITICAL';
  dimensions: DimensionScore[];
  aiLiteracyScore: number;
  labourMarketAlignment: number;
  assessedAt: string;
  recommendationSummary: string;
  marketReportPath: string;
}

export interface AssessmentQuery {
  programCode?: string;
  faculty?: string;
  riskCategory?: ProgramAssessment['riskCategory'];
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
