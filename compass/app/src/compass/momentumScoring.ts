// feat-005: Market signal momentum scoring and freshness computation

export type Freshness = 'LIVE' | 'RECENT' | 'STALE';

export interface FreshnessThresholds {
  live: number;    // days — below this = LIVE
  recent: number;  // days — below this = RECENT, above = STALE
}

const DEFAULT_THRESHOLDS: FreshnessThresholds = {
  live: 7,
  recent: 30,
};

export interface MomentumInput {
  jobPostingCount?: number | null;
}

/**
 * Compute market momentum score as the percentage change between
 * a recent window and a baseline window, normalized to [-1, +1].
 *
 * Positive = job postings increasing. Negative = decreasing.
 *
 * @param snapshots  Array of weekly snapshots, oldest first
 * @param recentWeeks  Number of most-recent weeks to use (default: 4)
 * @param baselineWeeks  Number of baseline weeks before the recent window (default: 12)
 */
export function computeMomentum(
  snapshots: MomentumInput[],
  recentWeeks: number = 4,
  baselineWeeks: number = 12,
): number {
  // Need at least recentWeeks + 1 snapshots
  const valid = snapshots.filter((s) => s.jobPostingCount != null && s.jobPostingCount > 0);
  if (valid.length < 2) return 0;

  const totalNeeded = recentWeeks + baselineWeeks;
  const slice = valid.length >= totalNeeded
    ? valid.slice(-totalNeeded)
    : valid;

  const recentSlice = slice.length > recentWeeks
    ? slice.slice(-recentWeeks)
    : slice;

  const baselineSlice = slice.length - recentSlice.length > 0
    ? slice.slice(0, slice.length - recentSlice.length)
    : slice.slice(0, 1);

  const recentAvg = average(recentSlice);
  const baselineAvg = average(baselineSlice);

  if (baselineAvg === 0) return 0;
  if (recentAvg === 0) return 0;

  const pctChange = (recentAvg - baselineAvg) / baselineAvg;

  // Normalize to [-1, 1]: tanh clamps to [-1, 1] and is smooth
  return Math.tanh(pctChange * 2);
}

function average(snapshots: MomentumInput[]): number {
  if (snapshots.length === 0) return 0;
  const sum = snapshots.reduce((acc, s) => acc + (s.jobPostingCount ?? 0), 0);
  return sum / snapshots.length;
}

/**
 * Compute freshness category based on how recently data was fetched.
 *
 * LIVE:    fetched within `thresholds.live` days
 * RECENT:  fetched within `thresholds.recent` days
 * STALE:   fetched longer ago than `thresholds.recent` days
 */
export function computeFreshness(
  lastFetched: Date | string,
  thresholds: FreshnessThresholds = DEFAULT_THRESHOLDS,
): Freshness {
  const fetchedDate = typeof lastFetched === 'string' ? new Date(lastFetched) : lastFetched;
  const ageMs = Date.now() - fetchedDate.getTime();
  const ageDays = ageMs / (1000 * 60 * 60 * 24);

  if (ageDays < thresholds.live) return 'LIVE';
  if (ageDays < thresholds.recent) return 'RECENT';
  return 'STALE';
}
