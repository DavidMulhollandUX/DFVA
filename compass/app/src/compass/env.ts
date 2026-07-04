import { defineEnvValidationSchema } from 'wasp/env';
import { z } from 'zod';

export const compassEnvSchema = defineEnvValidationSchema(
  z.object({
    DFVA_MOCK: z.enum(['true', 'false']).default('true'),
    // Used by the real LLM scoring pipeline (openaiLlmScorer) when DFVA_MOCK=false.
    OPENAI_API_KEY: z.string().optional().default(''),
  })
);
