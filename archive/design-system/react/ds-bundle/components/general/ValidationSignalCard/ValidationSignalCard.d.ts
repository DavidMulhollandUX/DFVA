import * as React from 'react';

/**
 * ValidationSignalCard — from @evidura/ui@0.1.0.
 */
export interface ValidationSignalCardProps {
  signal?: ValidationSignal;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare const ValidationSignalCard: React.ComponentType<ValidationSignalCardProps>;
