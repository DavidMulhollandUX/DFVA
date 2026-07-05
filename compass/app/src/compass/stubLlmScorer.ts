// compass/app/src/compass/stubLlmScorer.ts
import type { LlmScorer, HandbookPages } from "./llmScorer";
import type { AssessmentResult } from "./assessmentService";
import { buildDfvaPrompt } from "./dfvaPrompt";

/**
 * Stub LLM scorer for development.
 * Logs the prompt that would be sent and throws a clear error.
 * Replace with OpenAI/Claude API call for production.
 */
export class StubLlmScorer implements LlmScorer {
  async score(pages: HandbookPages): Promise<AssessmentResult> {
    const prompt = buildDfvaPrompt(pages);

    // Log the prompt so the developer can see what would be sent
    console.log("[DFVA StubScorer] Prompt built:", {
      programName: pages.programName,
      courseCode: pages.courseCode,
      promptLength: prompt.length,
    });

    throw new Error(
      "LLM scorer not configured. Set OPENAI_API_KEY or ANTHROPIC_API_KEY " +
        "and implement the API call in StubLlmScorer.score(). " +
        `Prompt ready for: ${pages.programName} (${prompt.length} chars)`,
    );
  }
}
