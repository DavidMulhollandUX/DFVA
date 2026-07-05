// compass/app/src/compass/llmScorer.ts
import type { AssessmentResult } from "./assessmentService";

export interface LlmScorer {
  score(pages: HandbookPages): Promise<AssessmentResult>;
}

export interface HandbookPages {
  overview: string;
  courseStructure: string;
  attributes: string;
  courseCode: string;
  programName: string;
  level: string;
  duration: string;
}
