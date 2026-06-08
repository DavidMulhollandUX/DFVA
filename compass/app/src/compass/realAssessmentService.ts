import type { AssessmentService, AssessmentResult } from './assessmentService';

export class RealAssessmentService implements AssessmentService {
  async assess(handbookUrl: string): Promise<AssessmentResult> {
    throw new Error(
      'Real assessment pipeline not yet implemented. ' +
      'Set DFVA_MOCK=true to use mock assessments.'
    );
  }
}
