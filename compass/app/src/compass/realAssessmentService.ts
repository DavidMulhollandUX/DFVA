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

    // Unknown URL — return a placeholder assessment rather than throwing.
    // In production, this would trigger the actual LLM-based DFVA pipeline.
    const courseCode = extractCourseCode(normalized);
    return {
      courseCode: courseCode ?? 'UNKNOWN',
      programName: `Program at ${new URL(handbookUrl).hostname}`,
      score: 0,
      maxScore: 36,
      riskBand: "HIGH RISK" as const,
      thresholds: { q1: "UNCERTAIN" as const, q2: "UNCERTAIN" as const, q3: "UNCERTAIN" as const },
      dimensions: [
        { label: "Automation Exposure", score: 0, max: 3 },
        { label: "Systems Thinking", score: 0, max: 3 },
        { label: "Technical Depth", score: 0, max: 3 },
        { label: "Decision-Making", score: 0, max: 3 },
        { label: "AI Literacy", score: 0, max: 3 },
        { label: "Domain Depth", score: 0, max: 3 },
        { label: "Research Rigour", score: 0, max: 3 },
        { label: "Human & Relational", score: 0, max: 3 },
        { label: "Curriculum Currency", score: 0, max: 3 },
        { label: "Outcome Evidence", score: 0, max: 3 },
        { label: "Irreplaceability (bonus)", score: 0, max: 3 },
      ],
      reportJson: {
        assessmentMarkdown: `## DFVA Assessment: Pending\n\n**Source URL:** ${handbookUrl}\n\n_This program has not yet been assessed by DFVA. Submit it for a full analysis._`,
        assessmentSlug: `dfva-${(courseCode ?? 'unknown').toLowerCase()}`,
        date: new Date().toISOString().split('T')[0],
        institution: "Unknown",
        level: "To be determined",
      },
    };
  }
}

function extractCourseCode(url: string): string | null {
  const match = url.match(/\/courses?\/([a-z0-9-]+)/i);
  return match ? match[1].toUpperCase() : null;
}
