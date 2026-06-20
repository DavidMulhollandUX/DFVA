export interface MarketWindowIndicatorProps {
  windowSnapshot?: {
    status?: string;
    urgencyText?: string;
    keyThreats?: string[];
    recommendedActions?: string[];
    updatedAt?: string;
  } | null;
}

const STATUS_STYLES: Record<string, { badge: string; dot: string; label: string }> = {
  OPEN: {
    badge: "bg-green-100 text-green-800 border-green-300",
    dot: "bg-green-500",
    label: "OPEN",
  },
  NARROWING: {
    badge: "bg-amber-100 text-amber-800 border-amber-300",
    dot: "bg-amber-500",
    label: "NARROWING",
  },
  CLOSED: {
    badge: "bg-red-100 text-red-800 border-red-300",
    dot: "bg-red-500",
    label: "CLOSED",
  },
  MISSED: {
    badge: "bg-slate-200 text-slate-600 border-slate-400",
    dot: "bg-slate-500",
    label: "MISSED",
  },
};

function relativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "in the future";
  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  }
  const years = Math.floor(diffDays / 365);
  return `${years} ${years === 1 ? "year" : "years"} ago`;
}

export default function MarketWindowIndicator({
  windowSnapshot,
}: MarketWindowIndicatorProps) {
  if (!windowSnapshot) return null;

  const {
    status = "OPEN",
    urgencyText,
    keyThreats,
    recommendedActions,
    updatedAt,
  } = windowSnapshot;

  const style = STATUS_STYLES[status] || STATUS_STYLES.OPEN;
  const threats = keyThreats?.length ? keyThreats : null;
  const actions = recommendedActions?.length ? recommendedActions : null;

  return (
    <div className="rounded-lg border border-border bg-card p-4 text-sm">
      {/* Status badge */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${style.badge}`}
        >
          <span
            className={`inline-block h-2 w-2 rounded-full ${style.dot}`}
            aria-hidden="true"
          />
          {style.label}
        </span>
        {updatedAt && (
          <span className="text-xs text-muted-foreground">
            Last assessed: {relativeTime(updatedAt)}
          </span>
        )}
      </div>

      {/* Urgency text */}
      {urgencyText && (
        <p className="text-muted-foreground leading-relaxed mb-3">
          {urgencyText}
        </p>
      )}

      {/* Key threats */}
      {threats && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1.5">
            Key Threats
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {threats.map((threat, i) => (
              <li key={i}>{threat}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommended actions */}
      {actions && (
        <div>
          <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1.5">
            Recommended Actions
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {actions.map((action, i) => (
              <li key={i}>{action}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Empty state when no content */}
      {!urgencyText && !threats && !actions && (
        <p className="text-muted-foreground italic">
          No market window data available.
        </p>
      )}
    </div>
  );
}
