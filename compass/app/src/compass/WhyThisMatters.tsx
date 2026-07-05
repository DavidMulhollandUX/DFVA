import { ExternalLink } from "lucide-react";
import {
  type ValidationSource,
  getValidationSources,
  getSourcesForTest,
} from "../shared/validationSources";

function SourceCard({ source }: { source: ValidationSource }) {
  return (
    <div className="border-border bg-muted/30 rounded-lg border p-4 text-sm">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-foreground font-semibold">{source.name}</p>
          <p className="text-muted-foreground text-xs">
            {source.publisher} · {source.year}
          </p>
        </div>
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary inline-flex shrink-0 items-center gap-1 text-xs hover:underline"
          aria-label={`Open ${source.name} on ${source.publisher} (external link)`}
        >
          Source <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <blockquote className="border-primary/30 text-muted-foreground mb-2 border-l-2 pl-3 italic">
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
  const sources = testId ? getSourcesForTest(testId) : getValidationSources();

  if (sources.length === 0) return null;

  return (
    <div className="border-border bg-card mt-8 rounded-xl border p-6">
      <h2 className="text-foreground mb-4 flex items-center gap-2 text-lg font-bold">
        <span className="bg-primary/10 text-primary inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
          ✓
        </span>
        {title}
      </h2>
      <p className="text-muted-foreground mb-4 text-sm">
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
