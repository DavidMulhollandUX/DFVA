import { QUADRANTS } from "../../v2/quadrants";
import { Cite } from "../HowThisRubricWorksDialog";
import type { V4RubricItem } from "../data/v4Rubric";
import type { V4ItemResult } from "../data/v4PanelC";
import {
  AWARDED_MARK,
  HEADING_HANDBOOK_EVIDENCE,
  HEADING_LEVEL_ANCHORS,
  HEADING_WHY_THIS_LEVEL,
  ITEM_NO_EVIDENCE,
} from "./copy";

export function DimBar({ label, score }: { label: string; score: number }) {
  const barPct = Math.round((score / 3) * 100);
  const color = score >= 3 ? QUADRANTS["well-positioned"].hex : "#E9A23B";
  return (
    <div className="flex items-center gap-3">
      <div className="text-foreground w-32 shrink-0 text-sm">{label}</div>
      <div className="bg-card-accent h-2.5 flex-1 overflow-hidden rounded-full">
        <div
          className="h-full rounded-full"
          style={{ width: `${barPct}%`, backgroundColor: color }}
        />
      </div>
      <div className="w-7 shrink-0 text-right font-mono text-base font-semibold">
        {score}
      </div>
    </div>
  );
}

/** One v4 item as an expandable row: score bar, then the published anchors
 * (awarded level highlighted), the rater's rationale, and the verbatim
 * handbook evidence lines behind the score. Same stacked layout as the v3.1
 * RatedDimension so it reads on a phone. */
export function RatedV4Item({
  item,
  result,
}: {
  item: V4RubricItem;
  result: V4ItemResult;
}) {
  return (
    <details className="group" data-testid={`rated-v4-${item.id}`}>
      <summary className="flex cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="text-muted-foreground shrink-0 text-xs transition-transform group-open:rotate-90"
        >
          ▶
        </span>
        <div className="min-w-0 flex-1">
          <DimBar label={item.short} score={result.score} />
        </div>
      </summary>
      <div className="bg-card-accent mt-2 mb-1 ml-5 rounded-md p-3">
        <p className="text-foreground text-sm font-medium">
          {item.id} · {item.name} <Cite refs={item.refs} />
        </p>
        <p className="text-muted-foreground mt-1 text-xs italic">
          {item.construct}
        </p>
        <p className="text-muted-foreground mt-3 mb-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase">
          {HEADING_LEVEL_ANCHORS}
        </p>
        <ol className="flex flex-col gap-1.5">
          {item.levels.map((anchor, level) => {
            const awarded = level === result.score;
            return (
              <li
                key={level}
                className={`flex items-start gap-2 rounded-md p-1.5 text-sm ${
                  awarded
                    ? "bg-background border-secondary border-l-2 font-medium"
                    : "text-muted-foreground"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold ${
                    awarded ? "bg-secondary/20 text-foreground" : "bg-muted"
                  }`}
                >
                  {level}
                </span>
                <span className="min-w-0">
                  {anchor}
                  {awarded && (
                    <span className="text-secondary-muted-foreground ml-1.5 text-xs font-semibold whitespace-nowrap">
                      {AWARDED_MARK}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ol>
        <p className="text-muted-foreground mt-3 mb-1 text-[10px] font-semibold tracking-[0.18em] uppercase">
          {HEADING_WHY_THIS_LEVEL}
        </p>
        <p className="text-foreground text-sm leading-relaxed">
          {result.rationale}
        </p>
        <p className="text-muted-foreground mt-3 mb-1 text-[10px] font-semibold tracking-[0.18em] uppercase">
          {HEADING_HANDBOOK_EVIDENCE}
        </p>
        {result.evidenceLines?.length ? (
          <ul className="flex flex-col gap-1">
            {result.evidenceLines.map((line) => (
              <li
                key={line}
                className="border-secondary text-muted-foreground border-l-2 pl-2 text-sm italic"
              >
                “{line}”
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm">{ITEM_NO_EVIDENCE}</p>
        )}
      </div>
    </details>
  );
}
