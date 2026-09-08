import { Link } from "react-router";
import { Card, CardContent } from "../../../client/components/ui/card";
import { programReportPath } from "../../reportLinks";
import {
  V4_ADAPTIVENESS_MAX,
  V4_RUBRIC,
  V4_WORKPLACE_MAX,
} from "../data/v4Rubric";
import type { V4IndexEntry } from "../data/v4Meta";
import { subjectOf, type RelatedProgram } from "../relatedPrograms";
import { CardLabel } from "./ReportChrome";
import {
  LABEL_RELATED,
  RELATED_PROFILE_LEGEND,
  RELATED_UNSCORED_WORKPLACE,
  TITLE_RELATED,
  relatedIntro,
  relatedProfileAria,
  relatedRank,
} from "./copy";

const ITEM_MAX = 3;

/** Signed difference, with the sign shown so a reader never has to work out
 *  which way a bare number points. Zero reads as "same", not "+0". */
function Delta({ value, label }: { value: number | null; label: string }) {
  if (value === null) return null;
  return (
    <span
      className="text-muted-foreground text-xs"
      data-testid="related-delta"
      data-value={value}
    >
      {value === 0
        ? `same ${label}`
        : `${value > 0 ? "+" : "−"}${Math.abs(value)} ${label}`}
    </span>
  );
}

/**
 * Eight columns, one per rubric item. The bar is the other program's score and
 * the rule across it is this program's, so the comparison is read down the
 * figure rather than by holding two numbers in mind. An item neither program
 * carries (a 4.0-draft record has no W1–W3) is drawn as an empty column rather
 * than as a zero, which would assert a score nobody gave.
 */
function ItemProfile({
  peer,
  self,
  peerName,
  programName,
}: {
  peer: V4IndexEntry;
  self: V4IndexEntry;
  peerName: string;
  programName: string;
}) {
  const W = 208;
  const H = 52;
  const gap = 4;
  const barW = (W - gap * (V4_RUBRIC.length - 1)) / V4_RUBRIC.length;
  const h = (score: number) => (score / ITEM_MAX) * (H - 12);
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="mt-3 w-full max-w-[208px]"
      role="img"
      aria-label={relatedProfileAria(peerName, programName)}
    >
      {V4_RUBRIC.map((item, i) => {
        const id = item.id as keyof V4IndexEntry;
        const peerScore = peer[id];
        const selfScore = self[id];
        const x = i * (barW + gap);
        const base = H - 10;
        return (
          <g key={item.id}>
            <rect
              x={x}
              y={base - (H - 12)}
              width={barW}
              height={H - 12}
              fill="var(--color-border)"
              opacity={0.35}
            />
            {typeof peerScore === "number" && (
              <rect
                x={x}
                y={base - h(peerScore)}
                width={barW}
                height={h(peerScore)}
                fill="var(--color-secondary)"
                data-testid="related-item-bar"
                data-item={item.id}
                data-score={peerScore}
              />
            )}
            {typeof selfScore === "number" && (
              <line
                x1={x}
                x2={x + barW}
                y1={base - h(selfScore)}
                y2={base - h(selfScore)}
                stroke="var(--color-foreground)"
                strokeWidth={1.5}
              />
            )}
            <text
              x={x + barW / 2}
              y={H - 1}
              fontSize={6}
              textAnchor="middle"
              fill="var(--color-muted-foreground)"
            >
              {item.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Programs in the same subject at other universities, at the foot of the
 * report.
 */
export function RelatedCourses({
  related,
  self,
  programName,
}: {
  related: RelatedProgram[];
  /** The program being read, as its index row. Undefined for a program with no
   *  index entry, which has no score to compare. */
  self: V4IndexEntry | undefined;
  programName: string;
}) {
  // A subject no other published university runs has nothing to compare with,
  // and an empty module would read as an absence of programs rather than an
  // absence of published scores.
  if (!self || !related.length) return null;
  const ranked = [self, ...related.map((r) => r.entry)].sort(
    (a, b) => b.adaptiveness - a.adaptiveness,
  );
  const rank = ranked.findIndex((e) => e.code === self.code) + 1;
  return (
    <section id="related" className="mt-14 scroll-mt-6">
      <Card>
        <CardContent className="pt-6">
          <CardLabel>{LABEL_RELATED}</CardLabel>
          <h2 className="text-foreground font-serif text-2xl tracking-tight">
            {TITLE_RELATED}
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            {relatedIntro(subjectOf(self.name), related.length)}
          </p>
          <p
            className="text-foreground mt-2 text-sm"
            data-testid="related-rank"
          >
            {relatedRank(
              programName,
              self.adaptiveness,
              V4_ADAPTIVENESS_MAX,
              rank,
              ranked.length,
            )}
          </p>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {related.map(({ entry, delta }) => (
              <li key={entry.code}>
                <Link
                  to={programReportPath(entry.code)}
                  data-testid="related-course"
                  data-code={entry.code}
                  className="border-border hover:bg-card-accent block h-full rounded-lg border p-4 transition-colors"
                >
                  <p className="text-secondary-muted-foreground text-xs font-semibold tracking-[0.14em] uppercase">
                    {entry.institution}
                  </p>
                  <p className="text-foreground mt-1 font-medium">
                    {entry.name}
                  </p>
                  <p className="text-foreground mt-2 text-sm">
                    {entry.adaptiveness}/{V4_ADAPTIVENESS_MAX} adaptiveness
                    {typeof entry.workplace === "number"
                      ? ` · ${entry.workplace}/${V4_WORKPLACE_MAX} workplace`
                      : ""}
                  </p>
                  <p className="mt-1 flex flex-wrap gap-x-3">
                    <Delta value={delta.adaptiveness} label="adaptiveness" />
                    <Delta value={delta.workplace} label="workplace" />
                  </p>
                  {typeof entry.workplace !== "number" && (
                    <p className="text-muted-foreground mt-1 text-xs">
                      {RELATED_UNSCORED_WORKPLACE}
                    </p>
                  )}
                  <ItemProfile
                    peer={entry}
                    self={self}
                    peerName={entry.name}
                    programName={programName}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground mt-4 text-xs">
            {RELATED_PROFILE_LEGEND}
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
