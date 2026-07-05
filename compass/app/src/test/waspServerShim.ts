/**
 * Test-only stand-in for 'wasp/server' (aliased in vite.config.ts).
 *
 * The real module's './server' subpath only resolves after a full wasp dev
 * run has generated and built the SDK — which never exists on a fresh CI
 * checkout, so `wasp test client run` failed there with ERR_MODULE_NOT_FOUND
 * for every test that (transitively) imports operations.ts.
 *
 * Only what the operations under test actually use is shimmed.
 */
export class HttpError extends Error {
  statusCode: number;
  data?: unknown;

  constructor(statusCode: number, message?: string, data?: unknown) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
    this.data = data;
  }
}
