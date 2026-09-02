import * as React from 'react';

/**
 * CardBody — from @evidura/ui@0.1.0.
 */
export interface CardBodyProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
}

export declare const CardBody: React.ComponentType<CardBodyProps>;
