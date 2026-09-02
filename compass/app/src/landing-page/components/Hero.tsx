import { Link as RouterLink } from "react-router";
import { brand } from "../../branding/brandConfig";
import { Button } from "../../client/components/ui/button";
import { MatrixAreaLabels } from "../../compass/matrixAreaLabels";
import { programReportPath } from "../../compass/reportLinks";
import { QUADRANTS } from "../../compass/v2/quadrants";
import { V4_META } from "../../compass/v4/data/v4PanelC";
import { V4_ADAPTIVENESS_MAX } from "../../compass/v4/data/v4Rubric";
import {
  V4_ITEMS,
  v4PortfolioRows,
  type V4PortfolioRow,
} from "../../compass/v4/portfolioStats";
import { V4_QUADRANT_LABELS } from "../../compass/v4/v4Position";

// Real sample assessment — the position is the hero asset. Honest, named,
// addressable, and computed on the same v4 rows the report page renders.
const SAMPLE_CODE = "mc-jurisd";

const ROWS = v4PortfolioRows();
/** Rows that can be drawn: assessed on v4 with an exposure and a position. */
const PLACED = ROWS.filter(
  (r) =>
    r.assessed &&
    r.exposure !== null &&
    r.adaptiveness !== null &&
    r.position !== null,
);

export default function Hero() {
  return (
    <div className="relative w-full overflow-hidden pt-14">
      <BackdropWash />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        {/* Left: the story */}
        <div className="max-w-2xl">
          <p className="text-secondary font-mono text-sm font-medium tracking-[0.18em] uppercase">
            {brand.tagline}
          </p>
          <h1 className="text-foreground mt-5 font-serif text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Will this degree still be{" "}
            <span className="text-secondary">worth choosing</span> in an
            AI-shaped labour market?
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-8">
            {brand.name} is the independent durability assessment for university
            degrees — how exposed a program's real graduate destinations are to
            AI, how well its curriculum prepares graduates for that change, and
            how confident the answer is. Delivered at the moment of design,
            approval and enrolment, not five years too late.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button size="lg" variant="default" asChild>
              <RouterLink to={programReportPath(SAMPLE_CODE)}>
                View an example report <span aria-hidden="true">→</span>
              </RouterLink>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <RouterLink to="/assess">Assess a program</RouterLink>
            </Button>
          </div>
          <p className="text-muted-foreground mt-4 text-xs">
            {brand.confidentialityNote}
          </p>
        </div>

        {/* Right: the position itself */}
        <SamplePositionCard />
      </div>
    </div>
  );
}

/** The weakest scored items, weakest first: where the highest-value changes sit. */
function weakestItems(row: V4PortfolioRow, limit = 2): string[] {
  if (!row.items) return [];
  return V4_ITEMS.map((item) => ({ item, score: row.items?.[item.id] }))
    .filter(
      (s): s is { item: (typeof V4_ITEMS)[number]; score: number } =>
        typeof s.score === "number" && !Number.isNaN(s.score) && s.score <= 1,
    )
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map((s) => `${s.item.name} (${s.score} of 3)`);
}

function SamplePositionCard() {
  const row = PLACED.find((r) => r.code === SAMPLE_CODE);
  if (!row || row.position === null || row.exposure === null) return null;
  const q = QUADRANTS[row.position];
  const confidenceLabel = row.atThreshold ? "near a threshold" : "firm";
  const confidenceChip = row.atThreshold
    ? "bg-[#FEF5E7] text-[#B97E26]"
    : "bg-[#E8F5EE] text-[#1F9D6B]";
  const exposureMedian = row.exposureMedian ?? V4_META.expMedian;
  const exposureMedianLabel =
    row.exposureTier === "field" ? "field median" : "portfolio median";
  const weakest = weakestItems(row);

  return (
    <div className="bg-card border-border shadow-card-2 hover:shadow-default mx-auto w-full max-w-md rounded-2xl border p-6 transition-shadow duration-300 sm:p-8">
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        {brand.institution}
      </p>
      <h2 className="text-foreground mt-1 text-lg font-semibold">{row.name}</h2>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${q.badgeClass}`}
        >
          {V4_QUADRANT_LABELS[row.position]}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${confidenceChip}`}
        >
          confidence: {confidenceLabel}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <p className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
            Destination AI exposure
          </p>
          <p className="text-foreground font-mono text-3xl font-bold tabular-nums">
            {row.exposure.toFixed(1)}
          </p>
          <p className="text-muted-foreground text-xs">
            {exposureMedianLabel} {exposureMedian}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
            Curriculum adaptiveness
          </p>
          <p className="text-foreground font-mono text-3xl font-bold tabular-nums">
            {row.adaptiveness}
            <span className="text-muted-foreground text-lg">
              /{V4_ADAPTIVENESS_MAX}
            </span>
          </p>
          <p className="text-muted-foreground text-xs">
            portfolio median {V4_META.adaptMedian ?? "—"}
          </p>
        </div>
      </div>

      <HeroMiniMatrix row={row} />

      <div className="mt-4 space-y-2">
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          Where the highest-value changes sit
        </p>
        {weakest.length ? (
          <ol className="text-foreground list-decimal space-y-1 pl-4 text-xs leading-relaxed">
            {weakest.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ol>
        ) : (
          <p className="text-foreground text-xs leading-relaxed">
            No item sits below the level at which a capability is assessed.
          </p>
        )}
      </div>

      <RouterLink
        to={programReportPath(SAMPLE_CODE)}
        className="text-secondary-muted-foreground mt-4 inline-block text-xs font-semibold underline"
      >
        Read the full report →
      </RouterLink>
    </div>
  );
}

function HeroMiniMatrix({ row }: { row: V4PortfolioRow }) {
  const W = 340;
  const H = 190;
  const PAD = 26;
  const X_MAX = 100;
  const X_MIN = Math.min(
    60,
    Math.floor(Math.min(...PLACED.map((p) => p.exposure as number)) / 10) * 10,
  );
  const x = (e: number) =>
    PAD + ((e - X_MIN) / (X_MAX - X_MIN)) * (W - 2 * PAD);
  const y = (a: number) => H - PAD - (a / V4_ADAPTIVENESS_MAX) * (H - 2 * PAD);
  if (row.exposure === null || row.adaptiveness === null || !row.position)
    return null;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="mt-5 w-full"
      role="img"
      aria-label="Portfolio matrix: destination AI exposure by curriculum adaptiveness, this program highlighted"
    >
      <rect
        x={PAD}
        y={PAD / 2}
        width={W - 2 * PAD}
        height={H - PAD - PAD / 2}
        fill="none"
        stroke="var(--color-border)"
      />
      <line
        x1={x(V4_META.expMedian)}
        y1={PAD / 2}
        x2={x(V4_META.expMedian)}
        y2={H - PAD}
        stroke="var(--color-border)"
        strokeDasharray="4 3"
      />
      {V4_META.adaptMedian !== null && (
        <line
          x1={PAD}
          y1={y(V4_META.adaptMedian)}
          x2={W - PAD}
          y2={y(V4_META.adaptMedian)}
          stroke="var(--color-border)"
          strokeDasharray="4 3"
        />
      )}
      <MatrixAreaLabels
        left={PAD}
        right={W - PAD}
        top={PAD / 2}
        bottom={H - PAD}
        fontSize={8}
      />
      {PLACED.filter((p) => p.code !== row.code).map((p) => (
        <circle
          key={p.code}
          cx={x(p.exposure as number)}
          cy={y(p.adaptiveness as number)}
          r={3}
          fill={QUADRANTS[p.position as keyof typeof QUADRANTS].hex}
          opacity={0.25}
        />
      ))}
      <circle
        cx={x(row.exposure)}
        cy={y(row.adaptiveness)}
        r={6}
        fill={QUADRANTS[row.position].hex}
        stroke="var(--color-background)"
        strokeWidth={2}
      />
      <text
        x={W / 2}
        y={H - 6}
        fontSize={9}
        textAnchor="middle"
        fill="var(--color-muted-foreground)"
      >
        Destination AI exposure → · each dot is an assessed program
      </text>
      <text
        x={8}
        y={H / 2}
        fontSize={9}
        fill="var(--color-muted-foreground)"
        transform={`rotate(-90 8 ${H / 2})`}
        textAnchor="middle"
      >
        Adaptiveness →
      </text>
    </svg>
  );
}

// Restrained Ink/amber wash — replaces the old amber→purple blobs. Decorative only.
function BackdropWash() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <div className="from-secondary/[0.07] absolute inset-x-0 top-0 h-[40rem] bg-gradient-to-b to-transparent" />
    </div>
  );
}
