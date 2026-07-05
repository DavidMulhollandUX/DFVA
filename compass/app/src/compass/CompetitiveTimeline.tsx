import { ExternalLink } from "lucide-react";

export interface CompetitiveTimelineEvent {
  competitor: string;
  eventType: string;
  title: string;
  description: string;
  dateOccurred: string; // ISO date
  marketWindowEffect: string; // "OPENING" | "NEUTRAL" | "CLOSING"
  url?: string;
}

export interface CompetitiveTimelineProps {
  events?: CompetitiveTimelineEvent[] | null;
}

const EVENT_TYPE_LABELS: Record<string, string> = {
  PRODUCT_LAUNCH: "Launch",
  FUNDING: "Funding",
  PARTNERSHIP: "Partnership",
  ACQUISITION: "Acquisition",
  ANNOUNCEMENT: "Announcement",
};

const EFFECT_BADGE: Record<string, { className: string; label: string }> = {
  OPENING: {
    className:
      "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
    label: "→ Opens window",
  },
  NEUTRAL: {
    className:
      "bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",
    label: "— Neutral",
  },
  CLOSING: {
    className:
      "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
    label: "→ Closes window",
  },
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function truncateText(text: string, maxLines = 2): string {
  const lines = text.split("\n");
  return lines.slice(0, maxLines).join(" ");
}

function sortByDateDesc(
  a: CompetitiveTimelineEvent,
  b: CompetitiveTimelineEvent,
): number {
  return (
    new Date(b.dateOccurred).getTime() - new Date(a.dateOccurred).getTime()
  );
}

export default function CompetitiveTimeline({
  events,
}: CompetitiveTimelineProps) {
  // Empty state
  if (!events || events.length === 0) {
    return (
      <div className="border-border bg-card rounded-lg border p-6 text-center">
        <p className="text-muted-foreground text-sm italic">
          No competitive events tracked yet.
        </p>
      </div>
    );
  }

  const sorted = [...events].sort(sortByDateDesc);

  return (
    <div className="relative space-y-0">
      {/* Vertical line */}
      <div
        className="bg-border absolute top-0 bottom-0 left-[19px] w-px"
        aria-hidden="true"
      />

      <div className="space-y-6">
        {sorted.map((event, i) => {
          const eventTypeLabel =
            EVENT_TYPE_LABELS[event.eventType] || event.eventType;
          const effectBadge = EFFECT_BADGE[event.marketWindowEffect] || {
            className:
              "bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",
            label: event.marketWindowEffect,
          };

          return (
            <div key={i} className="relative flex gap-4 pl-10">
              {/* Timeline dot */}
              <div
                className="border-border bg-card absolute top-1.5 left-[11px] h-4 w-4 rounded-full border-2"
                aria-hidden="true"
              />

              {/* Content */}
              <div className="border-border bg-card min-w-0 flex-1 rounded-lg border p-4 text-sm">
                {/* Date */}
                <p className="text-muted-foreground mb-2 text-xs">
                  {formatDate(event.dateOccurred)}
                </p>

                {/* Competitor + event type badge */}
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="text-foreground font-semibold">
                    {event.competitor}
                  </span>
                  <span className="border-border bg-secondary text-secondary-foreground inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium">
                    {eventTypeLabel}
                  </span>
                </div>

                {/* Title */}
                <p className="text-foreground mb-1 leading-snug font-medium">
                  {event.title}
                </p>

                {/* Description (2 lines max) */}
                {event.description && (
                  <p className="text-muted-foreground mb-2 line-clamp-2 leading-relaxed">
                    {truncateText(event.description)}
                  </p>
                )}

                {/* Market window effect badge */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${effectBadge.className}`}
                  >
                    {effectBadge.label}
                  </span>

                  {/* External link */}
                  {event.url && (
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary inline-flex items-center gap-1 text-xs hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
