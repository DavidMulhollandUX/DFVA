import { defineEnvValidationSchema } from 'wasp/env';
import { z } from 'zod';

export const compassEnvSchema = defineEnvValidationSchema(
  z.object({
    DFVA_MOCK: z.enum(['true', 'false']).default('true'),
  })
);
