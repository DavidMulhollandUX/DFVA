import type { AssessmentJob } from "wasp/entities";

export interface AssessmentResult {
  courseCode: string | null;
  programName: string;
  score: number;
  maxScore: number;
  riskBand: "RESILIENT" | "MODERATE RISK" | "HIGH RISK" | "CRITICAL" | "NOT RATABLE";
  thresholds: { q1: string; q2: string; q3: string };
  // score === null marks a Not-Applicable dimension (construct doesn't exist for this program).
  dimensions: { label: string; score: number | null; max: number }[];
  reportJson: Record<string, unknown>;
  syllabusJson?: Record<string, any>;
  validationErrors?: string[];
}

export interface AssessmentService {
  assess(handbookUrl: string): Promise<AssessmentResult>;
}

// Service resolver
import { MockAssessmentService } from "./mockAssessmentService";
import { RealAssessmentService } from "./realAssessmentService";

let _service: AssessmentService | null = null;

export function getAssessmentService(): AssessmentService {
  if (!_service) {
    const useMock = process.env.DFVA_MOCK !== "false";
    _service = useMock
      ? new MockAssessmentService()
      : new RealAssessmentService();
  }
  return _service;
}
