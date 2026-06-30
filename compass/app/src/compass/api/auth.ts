/**
 * DFVA API Key Authentication
 *
 * Pure functions for API key generation, validation, and Bearer token extraction.
 * Wasp operations that call these functions live in operations.ts.
 */
import crypto from 'crypto';

// --- Key Generation ---

export function hashApiKey(key: string): string {
  return crypto.createHash('sha256').update(key).digest('hex');
}

export function generateApiKey(): { rawKey: string; keyHash: string; keyPrefix: string } {
  const rawKey = `dfva_${crypto.randomBytes(32).toString('hex')}`;
  const keyHash = hashApiKey(rawKey);
  const keyPrefix = rawKey.slice(0, 11); // "dfva_" + first 6 chars of hex
  return { rawKey, keyHash, keyPrefix };
}

// --- Key Validation ---

export interface ApiKeyValidationResult {
  valid: boolean;
  institutionId?: string;
  keyId?: string;
}

export function validateApiKey(
  key: string,
  storedHash: string,
  isActive: boolean,
  institutionId: string,
  keyId: string
): ApiKeyValidationResult {
  if (!key || !key.startsWith('dfva_')) {
    return { valid: false };
  }
  const computedHash = hashApiKey(key);
  if (computedHash !== storedHash) {
    return { valid: false };
  }
  if (!isActive) {
    return { valid: false };
  }
  return { valid: true, institutionId, keyId };
}

// --- Bearer Token Extraction ---

/**
 * Extract the API key from an Authorization: Bearer <token> header.
 * Returns null if the header is missing, empty, or not a Bearer token.
 */
export function extractBearerToken(authHeader: string | undefined): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.slice(7);
}

// --- Rate Limiting (in-memory token bucket) ---

interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

const buckets = new Map<string, TokenBucket>();
const MAX_TOKENS = 100;       // 100 requests per minute
const REFILL_RATE = 1 / 0.6;  // 1 token every 0.6 seconds = 100 tokens/min

/**
 * Check if a request is rate-limited. Returns true if the request is allowed.
 * Token bucket algorithm: 100 tokens/min, refill 1 token/0.6s.
 */
export function checkRateLimit(keyId: string): boolean {
  const now = Date.now();
  let bucket = buckets.get(keyId);

  if (!bucket) {
    bucket = { tokens: MAX_TOKENS, lastRefill: now };
    buckets.set(keyId, bucket);
  }

  // Refill tokens
  const elapsed = (now - bucket.lastRefill) / 1000;
  const refill = Math.floor(elapsed * REFILL_RATE);
  if (refill > 0) {
    bucket.tokens = Math.min(MAX_TOKENS, bucket.tokens + refill);
    bucket.lastRefill = now;
  }

  // Consume 1 token
  if (bucket.tokens < 1) {
    return false; // rate limited
  }
  bucket.tokens -= 1;
  return true;
}

/**
 * Reset all rate limit buckets (for testing).
 */
export function resetRateLimitBuckets(): void {
  buckets.clear();
}

// --- Error Formatting ---

export interface ApiError {
  error: {
    code: string;
    message: string;
    docs_url: string;
  };
}

/**
 * Standardized API error response format.
 */
export function formatApiError(code: string, message: string, docsUrl?: string): ApiError {
  return {
    error: {
      code,
      message,
      docs_url: docsUrl || '/developers/reference#errors',
    },
  };
}
