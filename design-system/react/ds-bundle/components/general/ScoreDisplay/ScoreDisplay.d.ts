import * as React from 'react';

/**
 * ScoreDisplay — from @evidura/ui@0.1.0.
 */
export interface ScoreDisplayProps {
  /** Durability score. */
  score: number;
  /** Denominator shown after the score (e.g. 100 or 110). */
  outOf?: number;
  /** Force a band; otherwise derived from the score. */
  band?: "resilient" | "moderate" | "high" | "critical" | "na";
  /** Show the band pill beside the number. */
  showBand?: boolean;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare const ScoreDisplay: React.ComponentType<ScoreDisplayProps>;
