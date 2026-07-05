// Mock for 'wasp/server' used by vitest server-side tests
// Provides HttpError matching Wasp's actual server API
export class HttpError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
}
