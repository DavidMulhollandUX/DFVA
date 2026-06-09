// compass/app/src/compass/openaiLlmScorer.ts
import type { LlmScorer, HandbookPages } from './llmScorer';
import type { AssessmentResult } from './assessmentService';
import { buildDfvaPrompt } from './dfvaPrompt';

/**
 * OpenAI-based DFVA scorer.
 * Requires OPENAI_API_KEY in .env.server.
 */
export class OpenAiLlmScorer implements LlmScorer {
  async score(pages: HandbookPages): Promise<AssessmentResult> {
    const prompt = buildDfvaPrompt(pages);
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey === '***' || apiKey.startsWith('sk-dummy')) {
      throw new Error(
        'OPENAI_API_KEY not configured. Set a valid key in .env.server. ' +
        `Prompt ready for: ${pages.programName} (${prompt.length} chars)`
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are the Degree Future-Viability Assessor. Return only valid JSON. Score honestly against the rubric — do not inflate.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`OpenAI API error ${response.status}: ${body.slice(0, 200)}`);
    }

    const data = await response.json() as any;
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('Empty response from OpenAI API');
    }

    // Parse JSON — may be wrapped in ```json blocks
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, content];
    const result = JSON.parse(jsonMatch[1].trim()) as AssessmentResult;

    // Validate
    if (typeof result.score !== 'number' || !Array.isArray(result.dimensions) || result.dimensions.length < 10) {
      throw new Error(`Invalid assessment: score=${result.score}, dimensions=${result.dimensions?.length}`);
    }

    return result;
  }
}
