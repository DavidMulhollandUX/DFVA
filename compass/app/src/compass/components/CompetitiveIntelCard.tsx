import { COMPETITORS, DFVA_MODEL } from "../competitiveData";
import { ExternalLink } from "lucide-react";

export default function CompetitiveIntelCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-foreground">
          Why DFVA's data model is different
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Every competitor stores curriculum as unstructured HTML.
          DFVA stores it as structured, queryable JSON.
        </p>
      </div>

      <div className="space-y-3 mb-5">
        {COMPETITORS.map((competitor) => (
          <div
            key={competitor.name}
            className="flex items-start gap-3 rounded-lg border border-border/50 bg-destructive/5 p-3"
          >
            <span className="text-lg shrink-0 mt-0.5">{competitor.icon}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-foreground">
                  {competitor.name}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {competitor.tagline}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                <span className="text-red-500 font-medium">Stores curriculum as:</span>{" "}
                {competitor.dataModel}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                <span className="text-red-500/80">⚠</span> {competitor.problem}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {competitor.citations.map((citation, ci) => (
                  <a
                    key={ci}
                    href={citation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] text-primary/70 hover:text-primary underline underline-offset-2 transition-colors"
                  >
                    <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                    {citation.source}
                    {citation.date ? ` (${citation.date})` : ""}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
        <div className="flex items-start gap-3">
          <span className="text-lg shrink-0 mt-0.5">{DFVA_MODEL.icon}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-emerald-400">
                {DFVA_MODEL.name}
              </span>
              <span className="text-[11px] text-emerald-500/70">
                {DFVA_MODEL.tagline}
              </span>
            </div>
            <p className="mt-1 text-xs text-emerald-500/90 leading-relaxed">
              {DFVA_MODEL.advantage}
            </p>
            <ul className="mt-2 space-y-0.5">
              {DFVA_MODEL.features.slice(0, 3).map((feature, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
                  <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>
                  {feature}
                </li>
              ))}
              {DFVA_MODEL.features.length > 3 && (
                <li className="text-[11px] text-primary/70 pl-4">
                  +{DFVA_MODEL.features.length - 3} more advantages
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-[10px] text-muted-foreground">
        Sources: GitHub, ListEdTech, RFP.wiki, Gartner — verifiable citations for every claim
      </p>
    </div>
  );
}
