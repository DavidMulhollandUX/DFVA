import * as React from 'react';

/**
 * BandBadge — from @evidura/ui@0.1.0.
 */
export interface BandBadgeProps {
  band: "resilient" | "moderate" | "high" | "critical" | "na";
  /** Override the label text (defaults to the band's name). */
  label?: string;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare const BandBadge: React.ComponentType<BandBadgeProps>;
