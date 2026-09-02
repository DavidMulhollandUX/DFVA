import { useEffect, useRef, useState } from "react";
import { cn } from "../../client/utils";

// Scroll-reveal wrapper: fades + lifts content into view on first intersection.
// Transform/opacity only (no layout-affecting props → no CLS).
// ponytail: prefers-reduced-motion short-circuits to static — content always renders.
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  // Reduced-motion visitors start already "shown" — computed synchronously
  // during the initial render instead of an effect, since it never changes
  // after mount.
  const [shown, setShown] = useState(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref}
      style={shown ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "transition-all duration-500 ease-out motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
