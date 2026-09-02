/** Layout primitives shared by every part of the v4 report: the small caps
 *  card label, the Part A/B/C heading, and the collapsible method block. */

export function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-muted-foreground mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase">
      <span className="bg-secondary block h-3.5 w-0.5 rounded-full" />
      {children}
    </div>
  );
}

export function PartHeading({
  id,
  part,
  title,
}: {
  id: string;
  part: string;
  title: string;
}) {
  return (
    <div id={id} className="mt-14 mb-6 scroll-mt-6">
      <p className="text-secondary-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
        {part}
      </p>
      <h2 className="text-foreground font-serif text-2xl tracking-tight">
        {title}
      </h2>
    </div>
  );
}

export function MethodDetails({
  summary,
  children,
}: {
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <details className="border-border mb-4 rounded-lg border">
      <summary className="text-foreground hover:bg-card-accent cursor-pointer rounded-lg px-5 py-4 text-sm font-medium">
        {summary}
      </summary>
      <div className="px-2 pb-2">{children}</div>
    </details>
  );
}
