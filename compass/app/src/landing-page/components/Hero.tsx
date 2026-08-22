import { Link as RouterLink } from "react-router";
import { brand } from "../../branding/brandConfig";
import { Button } from "../../client/components/ui/button";
import { MatrixAreaLabels } from "../../compass/matrixAreaLabels";
import { findingFor } from "../../compass/reportFindings";
import { QUADRANTS } from "../../compass/v2/quadrants";
import {
  V3_META,
  V3_PROGRAMS,
  v3ProgramByCode,
} from "../../compass/v3/data/v3Programs";
import { v31StabilityByCode } from "../../compass/v31/data/v31Stability";

// Real sample assessment — the position is the hero asset. Honest, named,
// addressable, and rendered exactly as the report renders it.
const SAMPLE_CODE = "mc-jurisd";

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
              <RouterLink to={`/insights/v31/${SAMPLE_CODE}`}>
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

function SamplePositionCard() {
  const program = v3ProgramByCode(SAMPLE_CODE);
  const stability = v31StabilityByCode(SAMPLE_CODE);
  if (!program || !stability) return null;
  const finding = findingFor(program);
  const q = QUADRANTS[program.quadrant];
  const confidenceLabel =
    stability.stabilityClass === "boundary" ? "near a threshold" : "firm";
  const confidenceChip =
    stability.stabilityClass === "boundary"
      ? "bg-[#FEF5E7] text-[#B97E26]"
      : "bg-[#E8F5EE] text-[#1F9D6B]";
  const measured =
    program.quadrant === "well-positioned"
      ? "High exposure · high adaptiveness"
      : program.quadrant === "comfortable"
        ? "Low exposure · high adaptiveness"
        : program.quadrant === "attention"
          ? "High exposure · low adaptiveness"
          : "Low exposure · low adaptiveness";

  return (
    <div className="bg-card border-border shadow-card-2 hover:shadow-default mx-auto w-full max-w-md rounded-2xl border p-6 transition-shadow duration-300 sm:p-8">
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        University of Melbourne
      </p>
      <h2 className="text-foreground mt-1 text-lg font-semibold">
        {program.name}
      </h2>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${q.badgeClass}`}
        >
          {measured}
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
            {program.exposure.toFixed(1)}
          </p>
          <p className="text-muted-foreground text-xs">
            portfolio median {V3_META.expMedian}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
            Curriculum adaptiveness
          </p>
          <p className="text-foreground font-mono text-3xl font-bold tabular-nums">
            {program.adaptiveness}
            <span className="text-muted-foreground text-lg">/15</span>
          </p>
          <p className="text-muted-foreground text-xs">
            portfolio median {V3_META.adaptMedian}
          </p>
        </div>
      </div>

      <HeroMiniMatrix code={SAMPLE_CODE} />

      <div className="mt-4 space-y-2">
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          The highest-value changes
        </p>
        <ol className="text-foreground list-decimal space-y-1 pl-4 text-xs leading-relaxed">
          {finding.actions.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ol>
      </div>

      <RouterLink
        to={`/insights/v31/${SAMPLE_CODE}`}
        className="text-secondary-muted-foreground mt-4 inline-block text-xs font-semibold underline"
      >
        Read the full report →
      </RouterLink>
    </div>
  );
}

function HeroMiniMatrix({ code }: { code: string }) {
  const W = 340;
  const H = 190;
  const PAD = 26;
  const X_MIN = 60;
  const X_MAX = 100;
  const x = (e: number) =>
    PAD + ((e - X_MIN) / (X_MAX - X_MIN)) * (W - 2 * PAD);
  const y = (a: number) => H - PAD - (a / 15) * (H - 2 * PAD);
  const program = v3ProgramByCode(code);
  if (!program) return null;
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
        x1={x(V3_META.expMedian)}
        y1={PAD / 2}
        x2={x(V3_META.expMedian)}
        y2={H - PAD}
        stroke="var(--color-border)"
        strokeDasharray="4 3"
      />
      <line
        x1={PAD}
        y1={y(V3_META.adaptMedian)}
        x2={W - PAD}
        y2={y(V3_META.adaptMedian)}
        stroke="var(--color-border)"
        strokeDasharray="4 3"
      />
      <MatrixAreaLabels
        left={PAD}
        right={W - PAD}
        top={PAD / 2}
        bottom={H - PAD}
        fontSize={8}
      />
      {V3_PROGRAMS.filter((p) => p.code !== code).map((p) => (
        <circle
          key={p.code}
          cx={x(p.exposure)}
          cy={y(p.adaptiveness)}
          r={3}
          fill={QUADRANTS[p.quadrant].hex}
          opacity={0.25}
        />
      ))}
      <circle
        cx={x(program.exposure)}
        cy={y(program.adaptiveness)}
        r={6}
        fill={QUADRANTS[program.quadrant].hex}
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
