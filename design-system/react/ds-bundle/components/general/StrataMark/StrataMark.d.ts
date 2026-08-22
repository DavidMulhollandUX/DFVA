import * as React from 'react';

/**
 * StrataMark — from @evidura/ui@0.1.0.
 */
export interface StrataMarkProps {
  /** Pixel size (width & height). */
  size?: number;
  /** Render all three bars in one colour (no amber signal bar). */
  mono?: boolean;
  /** Accessible title; set to "" for a decorative mark. */
  title?: string;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
}

export declare const StrataMark: React.ComponentType<StrataMarkProps>;
