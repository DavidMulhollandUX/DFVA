import type { AssessmentService, AssessmentResult } from './assessmentService';
import { PROGRAMS } from './sharedProgramData';
import { REPORT_CONTENT } from './reportContent';
import { generateMockSyllabus } from './mockSyllabusData';

export class MockAssessmentService implements AssessmentService {
  async assess(handbookUrl: string): Promise<AssessmentResult> {
    // Simulate processing delay (200-800ms)
    const delay = 200 + Math.random() * 600;
    await new Promise((r) => setTimeout(r, delay));

    const normalized = handbookUrl.trim().toLowerCase();
    
    // Match against known programs by URL
    const match = PROGRAMS.find(
      (p) => p.handbookUrl && p.handbookUrl.toLowerCase() === normalized
    );

    if (match) {
      const assessmentContent = REPORT_CONTENT[match.assessmentSlug];
      const syllabusJson = generateMockSyllabus(match.assessmentSlug);
      
      return {
        courseCode: match.assessmentSlug.replace('dfva-', '').toUpperCase(),
        programName: match.program,
        score: match.score,
        maxScore: match.maxScore,
        riskBand: match.riskBand,
        thresholds: match.thresholds,
        dimensions: match.dimensions,
        syllabusJson: syllabusJson as any,
        reportJson: {
          assessmentMarkdown: assessmentContent?.markdown ?? '',
          assessmentSlug: match.assessmentSlug,
          marketSlug: match.marketSlug,
          recommendSlug: match.recommendSlug,
          date: match.date,
          institution: match.institution,
          level: match.level,
        },
      };
    }

    // Unknown URL: fallback
    const courseCode = extractCourseCode(normalized) ?? 'UNKNOWN';
    const syllabusJson = generateMockSyllabus(`dfva-${courseCode.toLowerCase()}`);
    return {
      courseCode,
      programName: `Program at ${new URL(handbookUrl).hostname}`,
      score: 18,
      maxScore: 36,
      riskBand: "HIGH RISK",
      thresholds: { q1: "UNCERTAIN", q2: "UNCERTAIN", q3: "UNCERTAIN" },
      dimensions: [
        { label: "Automation Exposure", score: 1, max: 3 },
        { label: "Systems Thinking", score: 2, max: 3 },
        { label: "Technical Depth", score: 2, max: 3 },
        { label: "Decision-Making", score: 2, max: 3 },
        { label: "AI Literacy", score: 1, max: 3 },
        { label: "Domain Depth", score: 2, max: 3 },
        { label: "Research Rigour", score: 2, max: 3 },
        { label: "Human & Relational", score: 2, max: 3 },
        { label: "Curriculum Currency", score: 2, max: 3 },
        { label: "Outcome Evidence", score: 1, max: 3 },
        { label: "Irreplaceability (bonus)", score: 1, max: 3 },
      ],
      syllabusJson: syllabusJson as any,
      reportJson: {
        assessmentMarkdown: `## DFVA Assessment: Pending\n\n**Source URL:** ${handbookUrl}\n\n_Automated assessment not yet available for this program. A detailed analysis will be generated soon._`,
        assessmentSlug: `dfva-${courseCode.toLowerCase()}`,
        date: new Date().toISOString().split('T')[0],
        institution: "University of Melbourne",
        level: "To be determined",
      },
    };
  }
}

function extractCourseCode(url: string): string | null {
  const match = url.match(/\/courses?\/([a-z0-9-]+)/i);
  return match ? match[1].toUpperCase() : null;
}
