import { HttpError } from "wasp/server";
import * as z from "zod";
import { logger } from "./logger";

export function ensureArgsSchemaOrThrowHttpError<Schema extends z.ZodType>(
  schema: Schema,
  rawArgs: unknown,
): z.infer<Schema> {
  const parseResult = schema.safeParse(rawArgs);
  if (!parseResult.success) {
    logger.error(
      "Operation arguments validation failed",
      // Keep the `cause` chain so stack traces point at the original schema.
      new Error(z.prettifyError(parseResult.error), { cause: parseResult.error }),
    );

    throw new HttpError(400, "Operation arguments validation failed", {
      cause: parseResult.error,
    });
  } else {
    return parseResult.data;
  }
}
