import cors from "cors";
import { config, type MiddlewareConfigFn } from "wasp/server";

// The dev/demo frontend (deployed via deploy-dev.sh) shares this backend.
// Wasp's default CORS allowlist is only WASP_WEB_CLIENT_URL, so the extra
// origins must be spliced in here or dev.evidura.ai gets silent network errors.
const EXTRA_ORIGINS = ["https://dev.evidura.ai"];

export const serverMiddlewareConfigFn: MiddlewareConfigFn = (
  middlewareConfig,
) => {
  middlewareConfig.set(
    "cors",
    cors({ origin: [...config.allowedCORSOrigins, ...EXTRA_ORIGINS] }),
  );
  return middlewareConfig;
};
