import * as React from 'react';

/**
 * Card — from @evidura/ui@0.1.0.
 */
export interface CardProps {
  /** Adds a hover-elevation transition (for clickable cards). */
  interactive?: boolean;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare const Card: React.ComponentType<CardProps>;
