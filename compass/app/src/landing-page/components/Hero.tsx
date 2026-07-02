import { Link as RouterLink } from "react-router";
import { brand } from "../../branding/brandConfig";
import { Button } from "../../client/components/ui/button";
import { ProgramRadar } from "../../client/components/ProgramRadar";
import {
  PROGRAMS,
  riskBandConfig,
  dimBarColor,
} from "../../compass/sharedProgramData";

// Real sample assessment — the rating is the hero asset. Honest, named, addressable.
const sample =
  PROGRAMS.find((p) => p.program === "Bachelor of Design") ?? PROGRAMS[0];

export default function Hero() {
  return (
    <div className="relative w-full overflow-hidden pt-14">
      <BackdropWash />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        {/* Left: the story */}
        <div className="max-w-2xl">
          <p className="font-mono text-sm font-medium uppercase tracking-[0.18em] text-secondary">
            {brand.tagline}
          </p>
          <h1 className="text-foreground mt-5 font-serif text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Will this degree still be{" "}
            <span className="text-secondary">worth choosing</span> in an
            AI-shaped labour market?
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-8">
            {brand.name} is the independent durability assessment for university
            degrees — a confidential, evidence-led analysis commissioned by the
            institution, delivered at the moment of design, approval and
            enrolment, not five years too late.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button size="lg" variant="default" asChild>
              <RouterLink to="/reports">
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

        {/* Right: the rating itself */}
        <SampleRatingCard />
      </div>
    </div>
  );
}

function SampleRatingCard() {
  const cfg = riskBandConfig[sample.riskBand];
  // Two weakest named dimensions — "the gaps are named, and addressable".
  const gaps = [...sample.dimensions]
    .filter((d) => !d.label.toLowerCase().includes("bonus"))
    .sort((a, b) => a.score / a.max - b.score / b.max)
    .slice(0, 3);

  return (
    <div className="bg-card border-border mx-auto w-full max-w-md rounded-2xl border p-6 shadow-card-2 transition-shadow duration-300 hover:shadow-default sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
            {sample.institution}
          </p>
          <h2 className="text-foreground mt-1 text-lg font-semibold">
            {sample.program}
          </h2>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${cfg.bg} ${cfg.text} ${cfg.border}`}
        >
          {sample.riskBand}
        </span>
      </div>

      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="text-foreground font-mono text-5xl font-bold tabular-nums">
          {sample.score}
        </span>
        <span className="text-muted-foreground font-mono text-lg tabular-nums">
          / {sample.maxScore}
        </span>
      </div>

      <ProgramRadar
        dimensions={sample.dimensions}
        baseScore={sample.score}
        size={220}
        className="my-2"
      />

      <div className="space-y-2.5">
        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
          Biggest gaps
        </p>
        {gaps.map((d) => (
          <div key={d.label} className="flex items-center gap-3">
            <span className="text-foreground w-36 shrink-0 truncate text-xs">
              {d.label}
            </span>
            <div className="bg-muted h-1.5 flex-1 overflow-hidden rounded-full">
              <div
                className={`h-full rounded-full ${dimBarColor(d.score, d.max)}`}
                style={{ width: `${(d.score / d.max) * 100}%` }}
              />
            </div>
            <span className="text-muted-foreground w-7 shrink-0 text-right font-mono text-xs tabular-nums">
              {d.score}/{d.max}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Restrained Ink/amber wash — replaces the old amber→purple blobs. Decorative only.
function BackdropWash() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <div className="absolute inset-x-0 top-0 h-[40rem] bg-gradient-to-b from-secondary/[0.07] to-transparent" />
    </div>
  );
}
