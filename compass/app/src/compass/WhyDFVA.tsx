import { validationSignals } from "./data/marketValidationData";
import type { ValidationSignalData } from "./data/marketValidationData";

export interface WhyDFVAProps {
  compact?: boolean;
}

function renderStars(score: number): string {
  const clamped = Math.max(0, Math.min(5, score));
  return "⭐".repeat(clamped) + "☆".repeat(5 - clamped);
}

function selectTopSignals(
  signals: ValidationSignalData[],
  count: number,
): ValidationSignalData[] {
  return [...signals]
    .sort((a, b) => b.credibilityScore - a.credibilityScore)
    .slice(0, count);
}

export default function WhyDFVA({ compact = false }: WhyDFVAProps) {
  const topSignals = selectTopSignals(validationSignals, 3);

  if (topSignals.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground italic">
        No market validation data available.
      </div>
    );
  }

  // Compact mode: source names/logos + one-line claim
  if (compact) {
    const bestSignal = topSignals[0];
    return (
      <div className="flex items-center gap-3 text-sm">
        <div className="flex items-center gap-1.5 shrink-0">
          {topSignals.map((s) => (
            <span
              key={s.source}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2 py-0.5 text-xs font-medium text-foreground"
            >
              {s.source}
              <span aria-hidden="true">{renderStars(s.credibilityScore)}</span>
            </span>
          ))}
        </div>
        {bestSignal.relevantClaim && (
          <p className="text-muted-foreground truncate">
            {bestSignal.relevantClaim}
          </p>
        )}
      </div>
    );
  }

  // Full mode: headline, 3 sources with stars, key excerpt, Learn more link
  return (
    <div className="rounded-lg border border-border bg-card p-5 text-sm">
      <h3 className="text-base font-bold text-foreground mb-3">Why DFVA?</h3>

      <ul className="space-y-2 mb-4">
        {topSignals.map((signal) => (
          <li key={signal.source} className="flex items-center gap-2">
            <span className="font-semibold text-foreground">
              {signal.source}
            </span>
            <span aria-hidden="true">
              {renderStars(signal.credibilityScore)}
            </span>
          </li>
        ))}
      </ul>

      {topSignals[0]?.excerpt && (
        <blockquote className="border-l-2 border-primary/30 pl-3 text-muted-foreground italic mb-4 leading-relaxed">
          {topSignals[0].excerpt}
        </blockquote>
      )}

      <a
        href="/insights"
        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
      >
        Learn more <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
