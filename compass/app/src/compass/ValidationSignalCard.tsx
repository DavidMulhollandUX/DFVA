import { ExternalLink } from "lucide-react";

export interface ValidationSignalCardProps {
  signal?: {
    source?: string;
    excerpt?: string;
    url?: string;
    dateDiscovered?: string;
    credibilityScore?: number;
    relevantClaim?: string;
  } | null;
}

export default function ValidationSignalCard({
  signal,
}: ValidationSignalCardProps) {
  if (!signal) return null;

  const {
    source = "Unknown Source",
    excerpt = "",
    url,
    dateDiscovered,
    credibilityScore = 0,
  } = signal;

  const clampedScore = Math.max(0, Math.min(5, credibilityScore));
  const filledStars = "⭐".repeat(clampedScore);
  const emptyStars = "☆".repeat(5 - clampedScore);
  const starsDisplay = filledStars + emptyStars;

  const formattedDate = dateDiscovered
    ? new Date(dateDiscovered).toLocaleDateString("en-AU", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div
      className="rounded-lg border border-border bg-card p-4 text-sm"
      aria-label={`Validation from ${source}, credibility ${clampedScore} out of 5`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0">
          <p className="font-semibold text-foreground truncate">{source}</p>
          <div className="text-xs mt-0.5" aria-hidden="true">
            {starsDisplay}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {formattedDate && (
            <span className="text-xs text-muted-foreground">
              {formattedDate}
            </span>
          )}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:underline"
              aria-label={`Open ${source} source (external link)`}
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>

      {excerpt && (
        <p className="text-muted-foreground leading-relaxed">{excerpt}</p>
      )}
    </div>
  );
}
