import * as React from 'react';

/**
 * CardHeader — from @evidura/ui@0.1.0.
 */
export interface CardHeaderProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
}

export declare const CardHeader: React.ComponentType<CardHeaderProps>;
