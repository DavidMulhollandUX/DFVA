/**
 * Minimal structured logger — one JSON object per line so platform log
 * viewers (Fly/Vercel) can search and filter. No dependency; swap the sink
 * for Sentry/pino later without touching call sites.
 */
type LogLevel = "debug" | "info" | "warn" | "error";

function serializeError(error: unknown): Record<string, unknown> {
  if (error instanceof Error) {
    return { errorMessage: error.message, stack: error.stack };
  }
  return { errorMessage: String(error) };
}

function emit(
  level: LogLevel,
  msg: string,
  ctx?: Record<string, unknown>,
): void {
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    level,
    msg,
    ...ctx,
  });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

export const logger = {
  debug: (msg: string, ctx?: Record<string, unknown>) =>
    emit("debug", msg, ctx),
  info: (msg: string, ctx?: Record<string, unknown>) => emit("info", msg, ctx),
  warn: (msg: string, ctx?: Record<string, unknown>) => emit("warn", msg, ctx),
  error: (msg: string, error?: unknown, ctx?: Record<string, unknown>) =>
    emit("error", msg, {
      ...ctx,
      ...(error === undefined ? {} : serializeError(error)),
    }),
};
