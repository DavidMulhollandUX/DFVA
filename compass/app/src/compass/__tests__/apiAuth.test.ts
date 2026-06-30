import { describe, it, expect, vi, beforeEach } from 'vitest';
import crypto from 'crypto';

// We test the auth logic functions directly (no Wasp dependency needed)
// The middleware functions are pure logic: hash, validate, generate

// --- Key generation and validation logic (mirrors api/auth.ts) ---

function hashApiKey(key: string): string {
  return crypto.createHash('sha256').update(key).digest('hex');
}

function generateApiKey(): { rawKey: string; keyHash: string; keyPrefix: string } {
  const rawKey = `dfva_${crypto.randomBytes(32).toString('hex')}`;
  const keyHash = hashApiKey(rawKey);
  const keyPrefix = rawKey.slice(0, 11); // "dfva_" + first 6 chars
  return { rawKey, keyHash, keyPrefix };
}

function validateApiKey(
  key: string,
  storedHash: string,
  isActive: boolean,
  institutionId: string,
  keyId: string
): { valid: boolean; institutionId?: string; keyId?: string } {
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

function extractBearerToken(authHeader: string | undefined): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.slice(7);
}

describe('API Key Generation', () => {
  it('generates keys with dfva_ prefix', () => {
    const { rawKey } = generateApiKey();
    expect(rawKey.startsWith('dfva_')).toBe(true);
  });

  it('generates keys of sufficient length', () => {
    const { rawKey } = generateApiKey();
    // dfva_ + 64 hex chars = 69 chars
    expect(rawKey.length).toBeGreaterThanOrEqual(69);
  });

  it('generates unique keys', () => {
    const keys = new Set<string>();
    for (let i = 0; i < 100; i++) {
      keys.add(generateApiKey().rawKey);
    }
    expect(keys.size).toBe(100);
  });

  it('stores hash, not raw key', () => {
    const { rawKey, keyHash } = generateApiKey();
    // The hash should NOT contain the raw key
    expect(keyHash).not.toBe(rawKey);
    // But hashing the raw key should produce the same hash
    expect(hashApiKey(rawKey)).toBe(keyHash);
  });

  it('generates a key prefix for display', () => {
    const { rawKey, keyPrefix } = generateApiKey();
    expect(keyPrefix).toBe(rawKey.slice(0, 11));
    expect(keyPrefix.startsWith('dfva_')).toBe(true);
  });
});

describe('API Key Validation', () => {
  const testInstitutionId = 'inst-123';
  const testKeyId = 'key-456';

  it('validates a correct, active key', () => {
    const { rawKey, keyHash } = generateApiKey();
    const result = validateApiKey(rawKey, keyHash, true, testInstitutionId, testKeyId);
    expect(result.valid).toBe(true);
    expect(result.institutionId).toBe(testInstitutionId);
    expect(result.keyId).toBe(testKeyId);
  });

  it('rejects an invalid key (wrong hash)', () => {
    const { rawKey } = generateApiKey();
    const wrongHash = hashApiKey('some_other_key');
    const result = validateApiKey(rawKey, wrongHash, true, testInstitutionId, testKeyId);
    expect(result.valid).toBe(false);
  });

  it('rejects a revoked key', () => {
    const { rawKey, keyHash } = generateApiKey();
    const result = validateApiKey(rawKey, keyHash, false, testInstitutionId, testKeyId);
    expect(result.valid).toBe(false);
  });

  it('rejects an empty key', () => {
    const result = validateApiKey('', 'somehash', true, testInstitutionId, testKeyId);
    expect(result.valid).toBe(false);
  });

  it('rejects a key without dfva_ prefix', () => {
    const result = validateApiKey('sk-abc123', 'somehash', true, testInstitutionId, testKeyId);
    expect(result.valid).toBe(false);
  });

  it('rejects a malformed key with wrong prefix', () => {
    const { rawKey } = generateApiKey();
    const { keyHash } = generateApiKey(); // different key
    const result = validateApiKey(rawKey, keyHash, true, testInstitutionId, testKeyId);
    expect(result.valid).toBe(false);
  });
});

describe('Bearer Token Extraction', () => {
  it('extracts token from valid Bearer header', () => {
    expect(extractBearerToken('Bearer dfva_abc123')).toBe('dfva_abc123');
  });

  it('returns null for missing header', () => {
    expect(extractBearerToken(undefined)).toBeNull();
  });

  it('returns null for empty header', () => {
    expect(extractBearerToken('')).toBeNull();
  });

  it('returns null for non-Bearer header', () => {
    expect(extractBearerToken('Basic abc123')).toBeNull();
  });

  it('returns null for header without space', () => {
    expect(extractBearerToken('Bearerabc123')).toBeNull();
  });
});

describe('Hash Function', () => {
  it('produces consistent hashes', () => {
    const key = 'dfva_test_key_12345';
    const hash1 = hashApiKey(key);
    const hash2 = hashApiKey(key);
    expect(hash1).toBe(hash2);
  });

  it('produces different hashes for different keys', () => {
    const hash1 = hashApiKey('dfva_key_a');
    const hash2 = hashApiKey('dfva_key_b');
    expect(hash1).not.toBe(hash2);
  });

  it('produces 64-char hex output', () => {
    const hash = hashApiKey('dfva_test');
    expect(hash.length).toBe(64);
    expect(/^[0-9a-f]+$/.test(hash)).toBe(true);
  });
});
