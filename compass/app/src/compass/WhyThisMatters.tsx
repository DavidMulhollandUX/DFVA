import { ExternalLink } from "lucide-react";
import {
  type ValidationSource,
  getValidationSources,
  getSourcesForTest,
} from "../../shared/validationSources";

function SourceCard({ source }: { source: ValidationSource }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <p className="font-semibold text-foreground">{source.name}</p>
          <p className="text-xs text-muted-foreground">
            {source.publisher} · {source.year}
          </p>
        </div>
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline shrink-0"
          aria-label={`Open ${source.name} on ${source.publisher} (external link)`}
        >
          Source <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <blockquote className="border-l-2 border-primary/30 pl-3 text-muted-foreground italic mb-2">
        {source.keyStat}
      </blockquote>
      <p className="text-muted-foreground text-xs leading-relaxed">
        {source.relevance}
      </p>
    </div>
  );
}

export interface WhyThisMattersProps {
  /** If provided, only show sources relevant to this test. Otherwise show all. */
  testId?: string;
  /** Optional heading override */
  title?: string;
}

export function WhyThisMatters({
  testId,
  title = "Why This Matters",
}: WhyThisMattersProps) {
  const sources = testId
    ? getSourcesForTest(testId)
    : getValidationSources();

  if (sources.length === 0) return null;

  return (
    <div className="mt-8 rounded-xl border border-border bg-card p-6">
      <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
          ✓
        </span>
        {title}
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        DFVA's methodology is grounded in independent, third-party research.
        These sources validate the premise that AI-readiness and workforce
        durability must be core concerns for higher education programs.
      </p>
      <div className="space-y-3">
        {sources.map((s) => (
          <SourceCard key={s.name + s.year} source={s} />
        ))}
      </div>
    </div>
  );
}
