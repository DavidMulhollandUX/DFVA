import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  Card,
  CardContent,
  CardTitle,
} from "../../client/components/ui/card";
import { InsightsGate } from "../InsightsGate";
import { MethodGlossary } from "../MethodGlossary";
import { findingFor } from "../reportFindings";
import { ReportMarkdownCard } from "../v2/components/ReportMarkdownCard";
import { DIMENSION_LABELS, QUADRANTS } from "../v2/quadrants";
import {
  V3_META,
  V3_PROGRAMS,
  v3ProgramByCode,
  type V3Program,
  type V3Quadrant,
} from "./data/v3Programs";

const X_MIN = 60;
const X_MAX = 100;

/** Measurement-first quadrant naming (v3 R10): the label states the
 * measurement; the v2 narrative name is retained as a secondary gloss. */
const V3_QUADRANT_LABELS: Record<
  V3Quadrant,
  { measured: string; compact: string; narrative: string }
> = {
  "well-positioned": { measured: "High exposure · high adaptiveness", compact: "High exp · high adapt", narrative: "Well-positioned" },
  comfortable: { measured: "Low exposure · high adaptiveness", compact: "Low exp · high adapt", narrative: "Comfortable" },
  attention: { measured: "High exposure · low adaptiveness", compact: "High exp · low adapt", narrative: "formerly “Attention”" },
  sheltered: { measured: "Low exposure · low adaptiveness", compact: "Low exp · low adapt", narrative: "formerly “Sheltered (for now)”" },
};

function quadrantAt(exposure: number, adaptiveness: number): V3Quadrant {
  return exposure > V3_META.expMedian
    ? adaptiveness >= V3_META.adaptMedian
      ? "well-positioned"
      : "attention"
    : adaptiveness >= V3_META.adaptMedian
      ? "comfortable"
      : "sheltered";
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-muted-foreground mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase">
      <span className="bg-secondary block h-3.5 w-0.5 rounded-full" />
      {children}
    </div>
  );
}

function PartHeading({ id, part, title }: { id: string; part: string; title: string }) {
  return (
    <div id={id} className="mt-14 mb-6 scroll-mt-6">
      <p className="text-secondary-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
        {part}
      </p>
      <h2 className="text-foreground font-serif text-2xl tracking-tight">{title}</h2>
    </div>
  );
}

function DimBar({ code, score }: { code: string; score: number }) {
  const pct = Math.round((score / 3) * 100);
  const color = score >= 3 ? QUADRANTS["well-positioned"].hex : "#E9A23B";
  return (
    <div className="flex items-center gap-3">
      <div className="text-muted-foreground w-28 shrink-0 text-sm">
        <span className="text-foreground block text-xs font-semibold tracking-[0.18em] uppercase">
          {code}
        </span>
        {DIMENSION_LABELS[code]}
      </div>
      <div className="bg-card-accent h-2.5 flex-1 overflow-hidden rounded-full">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <div className="w-7 shrink-0 text-right font-mono text-base font-semibold">
        {score}
      </div>
    </div>
  );
}

/** Quadrant display per R4: single label ≥0.80 modal probability, dual label
 * 0.60–0.80, coordinates only below 0.60. */
function PositionLabel({ program }: { program: V3Program }) {
  const modal = V3_QUADRANT_LABELS[program.quadrant];
  const q = QUADRANTS[program.quadrant];
  if (program.modalProb >= 0.8) {
    return (
      <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold ${q.badgeClass}`}>
        {modal.measured}
      </span>
    );
  }
  if (program.modalProb >= 0.6 && program.runnerUpQuadrant) {
    const runner = V3_QUADRANT_LABELS[program.runnerUpQuadrant];
    return (
      <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold ${q.badgeClass}`}>
        {modal.measured} / {runner.measured} — boundary case
      </span>
    );
  }
  return (
    <span className="bg-muted text-muted-foreground inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold">
      Coordinates only — quadrant not stable
    </span>
  );
}

function V3MiniMatrix({ program }: { program: V3Program }) {
  const W = 360;
  const H = 300;
  const PAD = 34;
  const x = (e: number) => PAD + ((e - X_MIN) / (X_MAX - X_MIN)) * (W - 2 * PAD);
  const y = (a: number) => H - PAD - (a / 15) * (H - 2 * PAD);
  const mx = x(V3_META.expMedian);
  const my = y(V3_META.adaptMedian);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="v3 exposure–adaptiveness matrix">
      <rect x={PAD} y={PAD} width={W - 2 * PAD} height={H - 2 * PAD} fill="none" stroke="var(--color-border)" />
      <line x1={mx} y1={PAD} x2={mx} y2={H - PAD} stroke="var(--color-border)" strokeDasharray="4 3" />
      <line x1={PAD} y1={my} x2={W - PAD} y2={my} stroke="var(--color-border)" strokeDasharray="4 3" />
      {V3_PROGRAMS.filter((p) => p.code !== program.code).map((p) => (
        <circle key={p.code} cx={x(p.exposure)} cy={y(p.adaptiveness)} r={3.5} fill={QUADRANTS[p.quadrant].hex} opacity={0.22} />
      ))}
      {/* adaptiveness perturbation interval (vertical) */}
      <line
        x1={x(program.exposure)}
        y1={y(program.adaptInterval[0])}
        x2={x(program.exposure)}
        y2={y(program.adaptInterval[1])}
        stroke={QUADRANTS[program.quadrant].hex}
        strokeWidth={2}
        opacity={0.45}
      />
      <circle cx={x(program.exposure)} cy={y(program.adaptiveness)} r={7} fill={QUADRANTS[program.quadrant].hex} stroke="var(--color-background)" strokeWidth={2} />
      <text x={PAD} y={H - 8} fontSize={10} fill="var(--color-muted-foreground)">{X_MIN}</text>
      <text x={W - PAD} y={H - 8} fontSize={10} textAnchor="end" fill="var(--color-muted-foreground)">{X_MAX}</text>
      <text x={W / 2} y={H - 8} fontSize={10} textAnchor="middle" fill="var(--color-muted-foreground)">Destination AI exposure (Felten AIOE)</text>
      <text x={10} y={H / 2} fontSize={10} fill="var(--color-muted-foreground)" transform={`rotate(-90 10 ${H / 2})`} textAnchor="middle">Adaptiveness /15</text>
    </svg>
  );
}

/** R12(c): enumerate reachable positions under Panel C improvements. */
function InterventionSimulator({ program }: { program: V3Program }) {
  const base = program.dimensionScores;
  const [sim, setSim] = useState<Record<string, number>>({ ...base });
  const simAdapt = Object.values(sim).reduce((a, b) => a + b, 0);
  const simQuadrant = quadrantAt(program.exposure, simAdapt);
  const changed = simQuadrant !== program.quadrant;

  const singleMoves = (Object.entries(base) as [string, number][])
    .filter(([, s]) => s < 3)
    .map(([d, s]) => {
      const adapt = program.adaptiveness + 1;
      return { dim: d, from: s, to: s + 1, adapt, quadrant: quadrantAt(program.exposure, adapt) };
    });
  const anySingleFlips = singleMoves.some((m) => m.quadrant !== program.quadrant);

  return (
    <div>
      <div className="mb-5 flex flex-col gap-2">
        {(Object.keys(base) as (keyof typeof base)[]).map((d) => (
          <div key={d} className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground w-36 shrink-0">
              <span className="text-foreground font-mono text-xs font-semibold">{d}</span>{" "}
              {DIMENSION_LABELS[d]}
            </span>
            <button
              type="button"
              aria-label={`decrease ${d}`}
              className="border-border text-muted-foreground h-7 w-7 rounded border font-mono disabled:opacity-30"
              disabled={sim[d] <= base[d]}
              onClick={() => setSim((s) => ({ ...s, [d]: s[d] - 1 }))}
            >
              −
            </button>
            <span className="w-10 text-center font-mono">
              {sim[d]}
              {sim[d] !== base[d] && (
                <span className="text-secondary-muted-foreground text-xs"> ({base[d]})</span>
              )}
            </span>
            <button
              type="button"
              aria-label={`increase ${d}`}
              className="border-border text-muted-foreground h-7 w-7 rounded border font-mono disabled:opacity-30"
              disabled={sim[d] >= 3}
              onClick={() => setSim((s) => ({ ...s, [d]: s[d] + 1 }))}
            >
              +
            </button>
          </div>
        ))}
      </div>
      <div className="bg-card-accent flex flex-wrap items-center justify-between gap-3 rounded-md p-3 text-sm">
        <span>
          Simulated adaptiveness{" "}
          <span className="font-mono font-semibold">{simAdapt}/15</span>{" "}
          (threshold {V3_META.adaptMedian})
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${QUADRANTS[simQuadrant].badgeClass}`}
          data-testid="sim-quadrant"
        >
          {V3_QUADRANT_LABELS[simQuadrant].measured}
          {changed ? " — position changes" : " — unchanged"}
        </span>
        <button
          type="button"
          className="text-muted-foreground text-xs underline"
          onClick={() => setSim({ ...base })}
        >
          Reset
        </button>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {["Single improvement", "Adaptiveness", "Resulting position"].map((h) => (
                <th key={h} className="text-muted-foreground border-border border-b-2 px-3 py-2 text-left text-xs font-medium tracking-[0.18em] uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {singleMoves.map((m) => (
              <tr key={m.dim} className="border-border border-b">
                <td className="px-3 py-2">
                  {m.dim} {DIMENSION_LABELS[m.dim]} {m.from}→{m.to}
                </td>
                <td className="px-3 py-2 font-mono">{m.adapt}/15</td>
                <td className="px-3 py-2">
                  {V3_QUADRANT_LABELS[m.quadrant].measured}
                  {m.quadrant !== program.quadrant && (
                    <span className="text-band-resilient font-semibold"> ← changes</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!anySingleFlips && (
        <div className="bg-card-accent text-muted-foreground mt-4 flex items-start gap-2 rounded-md p-3 text-sm">
          <span className="text-foreground text-xs font-semibold tracking-wide uppercase">Note</span>
          <span>
            <strong className="text-foreground font-medium">
              No single-dimension improvement moves this program's position.
            </strong>{" "}
            The scored axis needs{" "}
            <span className="font-mono">
              {Math.max(0, V3_META.adaptMedian - program.adaptiveness)}
            </span>{" "}
            points to reach the adaptiveness threshold — and the exposure
            coordinate is a property of the destinations, not the curriculum.
            Exposure generates steering interventions, not scoring
            interventions (recommendation rule R2).
          </span>
        </div>
      )}
    </div>
  );
}

export default function V3ReportPage() {
  const { code } = useParams<{ code: string }>();
  const program = code ? v3ProgramByCode(code) : undefined;

  if (!program) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-foreground mb-3 font-serif text-3xl">
          Program not found
        </h1>
        <p className="text-muted-foreground mb-6">
          No v3 assessment exists for “{code}” — v3 covers the{" "}
          {V3_META.placed} programs with a destination exposure measurement.
        </p>
        <Link to="/insights" className="text-secondary-muted-foreground underline">
          Back to the portfolio matrix
        </Link>
      </div>
    );
  }

  const gaugePct = Math.round(((program.exposure - X_MIN) / (X_MAX - X_MIN)) * 100);
  const medianPct = Math.round(((V3_META.expMedian - X_MIN) / (X_MAX - X_MIN)) * 100);
  const quadrantMoved = program.quadrant !== program.v2Quadrant;
  const finding = findingFor(program);

  return (
    <InsightsGate>
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Hero */}
        <div className="mb-10">
          <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
            Durability Assessment · v3 preview — confidence-first
          </p>
          <h1 className="text-foreground font-serif text-4xl tracking-tight">
            {program.name}
          </h1>
          <p className="text-muted-foreground mt-2 font-mono text-sm uppercase">
            {program.code} · University of Melbourne · {program.faculty}
          </p>
          {/* In this report — three-part map (U10) */}
          <nav className="text-muted-foreground mt-5 flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <span className="text-foreground font-medium">In this report:</span>
            <a href="#finding" className="underline">Part A — The finding</a>
            <a href="#market" className="underline">Part B — Market evidence &amp; improvement plan</a>
            <a href="#method" className="underline">Part C — Method &amp; provenance</a>
          </nav>
        </div>

        {/* ================= PART A — THE FINDING ================= */}
        <PartHeading id="finding" part="Part A" title="The finding" />

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-5">
              <div>
                <CardLabel>The finding</CardLabel>
                <p className="text-foreground text-base leading-relaxed" data-testid="finding-block">
                  {finding.finding}
                </p>
              </div>
              <div>
                <CardLabel>What this does and does not mean</CardLabel>
                <p className="text-muted-foreground text-sm leading-relaxed">{finding.meaning}</p>
              </div>
              <div>
                <CardLabel>How firm is this</CardLabel>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {finding.firmness}{" "}
                  <a href="#method" className="text-secondary-muted-foreground underline">
                    Full measurement provenance: Part C.
                  </a>
                </p>
              </div>
              <div>
                <CardLabel>The highest-value changes</CardLabel>
                <ol className="text-foreground list-decimal space-y-1 pl-5 text-sm">
                  {finding.actions.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ol>
                <p className="text-muted-foreground mt-2 text-xs">
                  Scoped with owners and timelines in{" "}
                  <a href="#market" className="underline">Part B</a>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Position + confidence (R12a, R4) */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <CardLabel>Position · with uncertainty</CardLabel>
            <div className="grid gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
                  <div>
                    <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                      Exposure (AIOE)
                    </p>
                    <p className="font-mono text-4xl font-semibold" data-testid="v3-exposure">
                      {program.exposure.toFixed(1)}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      portfolio median {V3_META.expMedian}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                      Adaptiveness
                    </p>
                    <p className="font-mono text-4xl font-semibold">
                      {program.adaptiveness}
                      <span className="text-muted-foreground text-lg">/15</span>
                    </p>
                    <p className="text-muted-foreground text-xs">
                      ±1 interval {program.adaptInterval[0]}–{program.adaptInterval[1]} · median{" "}
                      {V3_META.adaptMedian}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                      Position
                    </p>
                    <div className="mt-1">
                      <PositionLabel program={program} />
                    </div>
                    <p className="text-muted-foreground mt-1 text-xs">
                      there is a {Math.round(program.modalProb * 100)}% chance
                      this is the position shown, under ±1 rating error ·{" "}
                      {V3_QUADRANT_LABELS[program.quadrant].narrative}
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid max-w-md grid-cols-1 gap-x-8 gap-y-1.5 text-sm sm:grid-cols-2">
                  {(Object.entries(program.quadrantDist) as [V3Quadrant, number][]).map(
                    ([q, p]) => (
                      <div key={q} className="flex items-center justify-between gap-2">
                        <span className="text-muted-foreground flex items-center gap-1.5 text-xs whitespace-nowrap">
                          <span
                            className="inline-block h-2 w-2 shrink-0 rounded-full"
                            style={{ backgroundColor: QUADRANTS[q].hex }}
                          />
                          {V3_QUADRANT_LABELS[q].compact}
                        </span>
                        <span className="font-mono text-xs">{(p * 100).toFixed(1)}%</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="w-full max-w-sm md:w-80">
                <V3MiniMatrix program={program} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Panel A */}
          <Card>
            <CardContent className="pt-6">
              <CardLabel>Panel A</CardLabel>
              <CardTitle className="text-lg">Destination AI Exposure</CardTitle>
              <p className="text-muted-foreground mt-1 mb-6 text-sm">
                Felten AIOE over destination occupations — measured, not scored
              </p>
              <div className="mb-6 flex items-end gap-6">
                <div className="font-mono text-4xl leading-none font-semibold">
                  {Math.trunc(program.exposure)}
                  <sup className="text-base font-normal">
                    .{Math.round((program.exposure % 1) * 10)}
                  </sup>
                </div>
                <div className="flex-1">
                  <div className="bg-card-accent relative h-3 overflow-hidden rounded-full">
                    <div
                      className="bg-secondary h-full rounded-full"
                      style={{ width: `${gaugePct}%` }}
                    />
                    <div
                      className="bg-foreground/40 absolute -top-1 h-5 w-0.5 rounded-sm"
                      style={{ left: `${medianPct}%` }}
                    />
                  </div>
                  <div className="text-muted-foreground mt-1 flex justify-between text-xs">
                    <span>{X_MIN}</span>
                    <span>{X_MAX}</span>
                  </div>
                  <p className="text-muted-foreground text-right text-xs">
                    Portfolio median <span className="font-mono">{V3_META.expMedian}</span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-card-accent rounded-md p-3">
                  <p className="font-mono text-xl font-semibold">{program.exposure.toFixed(1)}</p>
                  <p className="text-muted-foreground text-xs">Unweighted mean (axis)</p>
                </div>
                <div className="bg-card-accent rounded-md p-3">
                  <p className="font-mono text-xl font-semibold">
                    {program.entryExposure === null ? "—" : program.entryExposure.toFixed(1)}
                  </p>
                  <p className="text-muted-foreground text-xs">Entry-stage only (R6)</p>
                </div>
                <div className="bg-card-accent rounded-md p-3">
                  <p className="font-mono text-xl font-semibold">—</p>
                  <p className="text-muted-foreground text-xs">
                    Share-weighted (R5) — no shares at alumni-title grain
                  </p>
                </div>
              </div>
              <div className="bg-card-accent text-muted-foreground mt-4 flex items-start gap-2 rounded-md p-3 text-sm">
                <span className="text-base">⚠</span>
                <span data-testid="exposure-explainer">
                  <strong className="text-foreground font-medium">
                    What exposure means.
                  </strong>{" "}
                  AIOE is the AI Occupational Exposure index (Felten et al.,
                  2023): a published measure, for each of ~770 occupations, of
                  how much that occupation's tasks overlap with what current AI
                  can do, rescaled 0–100. A value of{" "}
                  {program.exposure.toFixed(1)} says a large share of the tasks
                  in this program's destination occupations overlap with AI
                  capability. It does <strong className="text-foreground">not</strong>{" "}
                  mean those jobs are disappearing — across the Australian
                  labour market, the most AI-exposed occupations are projected
                  to grow, because exposed work tends to be skilled work.
                  Exposure indicates where the <em>content</em> of work is
                  likely to change; what that change means for graduates depends
                  on the adaptiveness axis. (Every placed program sits high on
                  AIOE — portfolio minimum {V3_META.expRange[0]} — because the
                  index's low end is physical and manual work graduates do not
                  enter.)
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Panel C */}
          <Card>
            <CardContent className="pt-6">
              <CardLabel>Panel C</CardLabel>
              <CardTitle className="text-lg">Curriculum Adaptiveness</CardTitle>
              <p className="text-muted-foreground mt-1 mb-6 text-sm">
                Scored from curriculum evidence, 0–3 per dimension
              </p>
              <div className="flex flex-col gap-3">
                {(Object.entries(program.dimensionScores) as [string, number][]).map(
                  ([d, s]) => (
                    <DimBar key={d} code={d} score={s} />
                  ),
                )}
              </div>
              <div className="border-border mt-4 flex items-center justify-between border-t pt-4">
                <span className="text-muted-foreground text-sm">
                  Total adaptiveness (±1 interval)
                </span>
                <span className="font-mono text-xl font-semibold">
                  {program.adaptiveness}
                  <span className="text-muted-foreground text-sm">
                    {" "}
                    [{program.adaptInterval[0]}–{program.adaptInterval[1]}]
                  </span>{" "}
                  / 15
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {(
                  [
                    ["D4 Decision-making", program.gateD4],
                    ["D6 Domain depth", program.gateD6],
                  ] as const
                ).map(([label, result]) => (
                  <span
                    key={label}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase ${
                      result === "PASS"
                        ? "bg-[#E8F5EE] text-band-resilient"
                        : "bg-[#FDE8E8] text-band-critical"
                    }`}
                  >
                    {label} {result === "PASS" ? "✓" : "✗"}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ================= PART B — MARKET EVIDENCE & PLAN ================= */}
        <PartHeading id="market" part="Part B" title="Market evidence & improvement plan" />

        {/* Destinations table */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <CardLabel>Destination occupations</CardLabel>
            <CardTitle className="text-lg">
              What the exposure mean is computed over
            </CardTitle>
            <p className="text-muted-foreground mt-1 mb-4 text-sm">
              {program.nTitles} distinct destination titles, each mapped to an
              O*NET-SOC 2010 occupation with a published AIOE value — no title
              is silently dropped.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    {["Destination title", "SOC occupation", "AIOE", "Stages", "Crosswalk", "Mapping"].map((h) => (
                      <th key={h} className="text-muted-foreground border-border border-b-2 px-3 py-2 text-left text-xs font-medium tracking-[0.18em] uppercase">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...program.destinations]
                    .sort((a, b) => b.aioe - a.aioe)
                    .map((d) => (
                      <tr key={d.title} className="border-border border-b">
                        <td className="px-3 py-2">{d.title}</td>
                        <td className="text-muted-foreground px-3 py-2">
                          {d.socTitle} <span className="font-mono text-xs">({d.soc})</span>
                        </td>
                        <td className="px-3 py-2 font-mono">{d.aioe.toFixed(1)}</td>
                        <td className="text-muted-foreground px-3 py-2 text-xs">
                          {d.stages.join(", ")}
                        </td>
                        <td className="text-muted-foreground px-3 py-2 text-xs">
                          {d.crosswalkSource === "preexisting_288" ? "inherited" : "Aug 2026"}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={
                              d.confidence === "high"
                                ? "text-band-resilient"
                                : d.confidence === "medium"
                                  ? "text-band-moderate"
                                  : "text-band-critical"
                            }
                          >
                            ● {d.confidence}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Market intelligence + redesign recommendations (canonical source:
            reports/dfva-market-*.md and reports/dfva-recommend-*.md; the card
            renders nothing for programs without those reports) */}
        <ReportMarkdownCard
          slug={`dfva-market-${program.code}`}
          label="Market Intelligence"
          title="Labour-Market Intelligence"
          subtitle="Job families, hiring signals, and skill shifts for this program's destinations — confidence level stated per section"
        />
        <ReportMarkdownCard
          slug={`dfva-recommend-${program.code}`}
          label="Redesign Recommendations"
          title="Improvement Plan"
          subtitle="Score-to-action mapping and prioritised interventions, with owners and timelines"
        />

        {/* Intervention simulator (R12c) */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <CardLabel>Intervention simulator</CardLabel>
            <CardTitle className="text-lg">
              What would actually move this program — and what wouldn't
            </CardTitle>
            <p className="text-muted-foreground mt-1 mb-6 text-sm">
              Panel C is a small integer space: every reachable position under
              curriculum improvement can be enumerated. Exposure is not
              simulatable — it belongs to the destinations.
            </p>
            <InterventionSimulator program={program} />
          </CardContent>
        </Card>

        {/* ================= PART C — METHOD & PROVENANCE ================= */}
        <PartHeading id="method" part="Part C" title="Method & provenance" />

        {/* Provenance + coverage (R1, R2) */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <CardLabel>Measurement provenance</CardLabel>
            <CardTitle className="text-lg">
              What produced these numbers
            </CardTitle>
            <p className="text-muted-foreground mt-1 mb-4 text-sm">
              Every published exposure value carries its index provenance —
              required fields, not documentation notes.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <tbody>
                  {(
                    [
                      ["exposure_index_name", V3_META.exposureIndexName],
                      ["exposure_index_vintage", V3_META.exposureIndexVintage],
                      ["exposure_rescaling", V3_META.exposureRescaling],
                      ["exposure_computed_at", V3_META.exposureComputedAt],
                      [
                        "destination_source",
                        `JIR / LiveAlumni alumni titles, program grain (cohort n = ${program.jirN})`,
                      ],
                      [
                        "coverage",
                        `${(program.coverage * 100).toFixed(0)}% — ${program.nTitles}/${program.nTitles} destination titles mapped (${program.nMedium} medium/low-confidence)`,
                      ],
                      [
                        "crosswalk_mix",
                        `${program.nInherited} titles via inherited 288-title index · ${program.nNewlyMapped} newly mapped Aug 2026`,
                      ],
                      ["crosswalk_authored", V3_META.crosswalkAuthored],
                    ] as [string, string][]
                  ).map(([k, v]) => (
                    <tr key={k} className="border-border border-b">
                      <td className="text-muted-foreground py-2 pr-4 font-mono text-xs">{k}</td>
                      <td className="py-2">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-card-accent text-muted-foreground mt-4 flex items-start gap-2 rounded-md p-3 text-sm">
              <span className="text-base">⚠</span>
              <span>
                <strong className="text-foreground font-medium">
                  Known provenance caveat: this value draws on two crosswalks
                  built at different times.
                </strong>{" "}
                Titles mapped via the inherited index sit systematically higher
                (median AIOE 92.3) than the Aug 2026 mappings (median 77.3). A
                uniform re-mapping of all 368 titles would shift absolute
                levels; structural results (quadrant counts, 20/34 changes vs
                the v2 proxy) are robust to crosswalk choice — verified by an
                independent recomputation.
              </span>
            </div>
          </CardContent>
        </Card>

        {/* What changed from v2 */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <CardLabel>Version comparison</CardLabel>
            <CardTitle className="text-lg">What changed from DFVA v2</CardTitle>
            <p className="text-muted-foreground mt-1 mb-6 text-sm">
              v2 published exposure {program.v2Exposure} from a provisional
              LLM-scored proxy (Spearman ρ = 0.42 against the specified index).
              v3 measures {program.exposure.toFixed(1)} on the published Felten
              AIOE —{" "}
              {quadrantMoved
                ? `this program's position changes (${program.v2Quadrant} → ${program.quadrant})`
                : `this program's position holds (${V3_QUADRANT_LABELS[program.quadrant].measured.toLowerCase()}), now with a stated ${Math.round(program.modalProb * 100)}% stability`}
              . Across the portfolio, 20 of 34 placed programs change quadrant
              under the authoritative index.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    {["", "v2 (published)", "v3 (this report)"].map((h, i) => (
                      <th key={i} className="text-muted-foreground border-border border-b-2 px-3 py-2 text-left text-xs font-medium tracking-[0.18em] uppercase">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(
                    [
                      ["Exposure index", "Provisional LLM proxy (marked for replacement)", "Felten AIOE, published appendix, provenance pinned (R1)"],
                      ["This program's exposure", String(program.v2Exposure), program.exposure.toFixed(1)],
                      ["Portfolio exposure median", String(V3_META.v2ExpMedian), String(V3_META.expMedian)],
                      ["Destination coverage", "Not reported per program", `Reported and enforced — ${program.nTitles}/${program.nTitles} titles mapped (R2)`],
                      ["Quadrant label", "Categorical, narrative name", `Probability-qualified, measurement-first name (R4, R10) — ${Math.round(program.modalProb * 100)}% modal`],
                      ["Uncertainty", "Not stated", `Adaptiveness ±1 interval [${program.adaptInterval[0]}–${program.adaptInterval[1]}]; full quadrant distribution shown`],
                      ["Destination grain", "Proxy scored per program from mixed evidence", "Alumni titles of this program's own graduates (JIR cohort n = " + program.jirN + "); entry-stage exposure published (R6); share-weighting (R5) open — no shares at alumni-title grain"],
                    ] as [string, string, string][]
                  ).map(([k, a, b]) => (
                    <tr key={k} className="border-border border-b">
                      <td className="text-muted-foreground px-3 py-2">{k}</td>
                      <td className="px-3 py-2">{a}</td>
                      <td className="px-3 py-2">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <MethodGlossary
          terms={[
            "aioe",
            "destinationExposure",
            "adaptiveness",
            "gates",
            "medianQuadrant",
            "positionConfidence",
            "envelope",
            "jir",
            "crosswalk",
            "v1Composite",
            "qilt",
            "jsaHeo",
          ]}
        />

        {/* Footer — links labelled by destination and purpose (U12) */}
        <div className="text-muted-foreground border-border mt-12 flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-xs">
          <span>
            Evidura · Durability Assessment · v3 preview · computed{" "}
            {V3_META.exposureComputedAt}
          </span>
          <span className="flex gap-4">
            <Link to={`/insights/v31/${program.code}`} className="underline">
              Same program, current report format (v3.1)
            </Link>
            <Link to="/insights" className="underline">
              See all 34 assessed programs (portfolio matrix)
            </Link>
          </span>
        </div>
      </div>
    </InsightsGate>
  );
}
