import { describe, it, expect } from 'vitest';
import { computeMomentum, computeFreshness } from '../momentumScoring';

describe('computeMomentum', () => {
  it('returns 0 when no snapshots provided', () => {
    expect(computeMomentum([])).toBe(0);
  });

  it('returns 0 when only one snapshot exists', () => {
    const snapshots = [{ jobPostingCount: 100 }];
    expect(computeMomentum(snapshots)).toBe(0);
  });

  it('returns positive momentum when recent count exceeds baseline', () => {
    // 4 weeks averaging 150 vs 12 weeks (first 8 of 12) averaging 100
    const snapshots = Array.from({ length: 12 }, (_, i) => ({
      // First 8 weeks (baseline): ~100, last 4 weeks: ~150
      jobPostingCount: i < 8 ? 100 : 150,
    }));
    const result = computeMomentum(snapshots, 4, 8);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThanOrEqual(1);
  });

  it('returns negative momentum when recent count drops below baseline', () => {
    const snapshots = Array.from({ length: 12 }, (_, i) => ({
      jobPostingCount: i < 8 ? 100 : 50,
    }));
    const result = computeMomentum(snapshots, 4, 8);
    expect(result).toBeLessThan(0);
    expect(result).toBeGreaterThanOrEqual(-1);
  });

  it('returns momentum near 0 when recent equals baseline', () => {
    const snapshots = Array.from({ length: 12 }, () => ({
      jobPostingCount: 100,
    }));
    const result = computeMomentum(snapshots, 4, 8);
    expect(Math.abs(result)).toBeLessThan(0.1);
  });

  it('normalizes to range [-1, 1]', () => {
    const snapshots = Array.from({ length: 12 }, (_, i) => ({
      jobPostingCount: i < 8 ? 10 : 1000,
    }));
    const result = computeMomentum(snapshots, 4, 8);
    expect(result).toBeGreaterThanOrEqual(-1);
    expect(result).toBeLessThanOrEqual(1);
  });

  it('uses default windows (4 recent, 12 baseline) when not specified', () => {
    // 16 weeks total: 12 baseline + 4 recent
    const snapshots = Array.from({ length: 16 }, (_, i) => ({
      jobPostingCount: i < 12 ? 100 : 200,
    }));
    const result = computeMomentum(snapshots);
    expect(result).toBeGreaterThan(0);
  });

  it('handles missing jobPostingCount by skipping those snapshots', () => {
    const snapshots = [
      { jobPostingCount: null },
      { jobPostingCount: 100 },
      { jobPostingCount: 110 },
      { jobPostingCount: null },
      { jobPostingCount: 120 },
      { jobPostingCount: 130 },
    ];
    // Should not throw
    const result = computeMomentum(snapshots, 2, 2);
    expect(typeof result).toBe('number');
  });
});

describe('computeFreshness', () => {
  it('returns LIVE for data fetched within 7 days', () => {
    const sixDaysAgo = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000);
    expect(computeFreshness(sixDaysAgo)).toBe('LIVE');
  });

  it('returns RECENT for data fetched between 7 and 30 days ago', () => {
    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    expect(computeFreshness(fourteenDaysAgo)).toBe('RECENT');
  });

  it('returns STALE for data fetched more than 30 days ago', () => {
    const fortyDaysAgo = new Date(Date.now() - 40 * 24 * 60 * 60 * 1000);
    expect(computeFreshness(fortyDaysAgo)).toBe('STALE');
  });

  it('uses custom thresholds when provided', () => {
    const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
    expect(computeFreshness(tenDaysAgo, { live: 14, recent: 60 })).toBe('LIVE');
  });

  it('accepts Date objects and strings', () => {
    const sixDaysAgo = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000);
    expect(computeFreshness(sixDaysAgo.toISOString())).toBe('LIVE');
  });

  it('handles edge case at exact 7-day boundary', () => {
    const exactly7DaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    expect(computeFreshness(exactly7DaysAgo)).toBe('RECENT');
  });

  it('handles edge case at exact 30-day boundary', () => {
    const exactly30DaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    expect(computeFreshness(exactly30DaysAgo)).toBe('STALE');
  });
});
