import * as React from 'react';

/**
 * Button — from @evidura/ui@0.1.0.
 * @replaces button
 */
export interface ButtonProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "accent" | "secondary" | "ghost";
}

export declare const Button: React.ComponentType<ButtonProps>;
