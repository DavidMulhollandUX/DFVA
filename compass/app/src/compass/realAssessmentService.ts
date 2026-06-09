import type { AssessmentService, AssessmentResult } from './assessmentService';
import { PROGRAMS } from './sharedProgramData';

export class RealAssessmentService implements AssessmentService {
  async assess(handbookUrl: string): Promise<AssessmentResult> {
    const normalized = handbookUrl.trim().toLowerCase();
    const match = PROGRAMS.find(
      (p) => p.handbookUrl && p.handbookUrl.toLowerCase() === normalized
    );

    if (match) {
      return {
        courseCode: match.assessmentSlug.replace('dfva-', '').toUpperCase(),
        programName: match.program,
        score: match.score,
        maxScore: match.maxScore,
        riskBand: match.riskBand,
        thresholds: match.thresholds,
        dimensions: match.dimensions,
        reportJson: {
          assessmentSlug: match.assessmentSlug,
          marketSlug: match.marketSlug,
          recommendSlug: match.recommendSlug,
          date: match.date,
          institution: match.institution,
          level: match.level,
        },
      };
    }

    throw new Error(
      `No pre-computed assessment for ${handbookUrl}. ` +
      `This program has not yet been assessed by DFVA.`
    );
  }
}
