import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "../utils";

/** The two widths every page converges on. Default matches the old `/reports`
 *  width (max-w-6xl); narrow matches `/assess` (max-w-3xl). Pages that used to
 *  carry a bespoke width (5xl on portfolio/faculty/dev, 7xl on insights) adopt
 *  the default and widen or narrow accordingly — see the review-backlog task
 *  for the full list of pages whose width changed. */
export type PageShellWidth = "default" | "narrow";

const WIDTH_CLASSES: Record<PageShellWidth, string> = {
  default: "max-w-6xl",
  narrow: "max-w-3xl",
};

interface PageShellOwnProps {
  /** Width variant. Defaults to `"default"` (max-w-6xl). Use `"narrow"`
   *  (max-w-3xl) for /assess. */
  width?: PageShellWidth;
  children: ReactNode;
}

type PageShellProps<T extends ElementType> = PageShellOwnProps & {
  /** Element to render as. Defaults to `"div"`; pass `"section"` for a page
   *  built from several stacked shell sections (e.g. the developer portal). */
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof PageShellOwnProps | "as">;

const DEFAULT_ELEMENT = "div";

/**
 * The one page container every top-level page adopts: `max-w-6xl px-4 py-10
 * mx-auto` by default, `max-w-3xl` for the narrow variant. Pass `className`
 * to override spacing where a page's existing rhythm needs to be kept (for
 * example a hero section with extra vertical padding); width and centring
 * stay shared either way.
 */
export function PageShell<T extends ElementType = typeof DEFAULT_ELEMENT>({
  as,
  width = "default",
  className,
  children,
  ...rest
}: PageShellProps<T>) {
  const Component = as ?? DEFAULT_ELEMENT;
  return (
    <Component
      className={cn("mx-auto px-4 py-10", WIDTH_CLASSES[width], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
