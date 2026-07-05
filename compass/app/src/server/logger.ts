/**
 * Minimal structured logger — one JSON object per line so platform log
 * viewers (Fly/Vercel) can search and filter.
 *
 * Sentry sink: set SENTRY_DSN (Fly: `fly secrets set -a compass-server-sxd
 * SENTRY_DSN=...`) and logger.error calls are also reported to Sentry.
 * Unset, this file has no runtime dependency (the import is dynamic).
 */
type LogLevel = "debug" | "info" | "warn" | "error";

type SentryModule = typeof import("@sentry/node");
let sentry: SentryModule | null = null;
if (process.env.SENTRY_DSN) {
  import("@sentry/node")
    .then((s) => {
      s.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV ?? "development",
      });
      sentry = s;
    })
    .catch((error) => {
      console.error(
        JSON.stringify({
          ts: new Date().toISOString(),
          level: "warn",
          msg: "Sentry init failed; continuing with console-only logging",
          errorMessage: error instanceof Error ? error.message : String(error),
        }),
      );
    });
}

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
  error: (msg: string, error?: unknown, ctx?: Record<string, unknown>) => {
    emit("error", msg, {
      ...ctx,
      ...(error === undefined ? {} : serializeError(error)),
    });
    if (sentry) {
      if (error instanceof Error) {
        sentry.captureException(error, { extra: { msg, ...ctx } });
      } else {
        sentry.captureMessage(msg, {
          level: "error",
          extra: { ...ctx, ...(error === undefined ? {} : { error }) },
        });
      }
    }
  },
};
