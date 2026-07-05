// compass/app/src/compass/assessmentPipeline.ts
import type { AssessmentResult } from "./assessmentService";
import type { LlmScorer, HandbookPages } from "./llmScorer";
import { validateSyllabus } from "./syllabusSchema";
import {
  fetchCourseOverview,
  fetchCourseStructure,
  fetchCourseAttributes,
} from "./handbookFetcher";

export async function runAssessmentPipeline(
  handbookUrl: string,
  scorer: LlmScorer,
): Promise<AssessmentResult> {
  const codeMatch = handbookUrl.match(/\/courses?\/([a-z0-9-]+)/i);
  const courseCode = codeMatch ? codeMatch[1] : "unknown";

  const [overview, structure, attributes] = await Promise.all([
    fetchCourseOverview(courseCode),
    fetchCourseStructure(courseCode),
    fetchCourseAttributes(courseCode),
  ]);

  const programName = extractProgramName(overview.content) ?? overview.title;
  const level = extractLevel(overview.content) ?? "Graduate Coursework";
  const duration = extractDuration(overview.content) ?? "To be determined";

  const pages: HandbookPages = {
    overview: overview.content,
    courseStructure: structure.content,
    attributes: attributes.content,
    courseCode: courseCode.toUpperCase(),
    programName,
    level,
    duration,
  };

  const result = await scorer.score(pages);

  // Validate syllabusJson against Zod schema (best-effort, non-blocking)
  if (result.syllabusJson) {
    const validation = validateSyllabus(result.syllabusJson);
    if (!validation.success) {
      result.validationErrors = validation.errors;
      console.warn(
        `[DFVA] Syllabus validation warnings for ${courseCode}:`,
        validation.errors.slice(0, 5),
      );
    }
  }

  result.reportJson = {
    ...result.reportJson,
    assessmentSlug: `dfva-${courseCode}`,
    marketSlug: `dfva-market-${courseCode}`,
    date: new Date().toISOString().split("T")[0],
    institution: "University of Melbourne",
    level,
  };

  return result;
}

function extractProgramName(content: string): string | null {
  const match = content.match(/Award title\s+(.+)/i);
  return match ? match[1].trim() : null;
}

function extractLevel(content: string): string | null {
  if (content.includes("Graduate Coursework")) return "Master (Coursework)";
  if (content.includes("Graduate Research")) return "Master (Research)";
  if (content.includes("Undergraduate")) return "Bachelor";
  return null;
}

function extractDuration(content: string): string | null {
  const match = content.match(/(\d+)\s*months?\s*full-time/i);
  return match ? `${match[1]} months full-time` : null;
}
