import { Link, useParams } from "react-router";
import { Card, CardContent, CardTitle } from "../../client/components/ui/card";
import { InsightsGate } from "../InsightsGate";
import { MethodGlossary } from "../MethodGlossary";
import { SourceReferences } from "../SourceReferences";
import { DIMENSION_EVIDENCE } from "../data/dimensionEvidence";
import { MatrixAreaLabels } from "../matrixAreaLabels";
import { findingFor } from "../reportFindings";
import { PANEL_C_RUBRIC } from "../v3/data/panelCRubric";
import { ReportMarkdownCard } from "../v2/components/ReportMarkdownCard";
import { DIMENSION_LABELS, QUADRANTS } from "../v2/quadrants";
import {
  V3_META,
  V3_PROGRAMS,
  v3ProgramByCode,
  type V3Program,
  type V3Quadrant,
} from "../v3/data/v3Programs";
import {
  V31_META,
  v31StabilityByCode,
  type V31Stability,
} from "./data/v31Stability";

const X_MIN = 60;
const X_MAX = 100;

const LABELS: Record<V3Quadrant, { measured: string; compact: string }> = {
  "well-positioned": { measured: "High exposure · high adaptiveness", compact: "High exp · high adapt" },
  comfortable: { measured: "Low exposure · high adaptiveness", compact: "Low exp · high adapt" },
  attention: { measured: "High exposure · low adaptiveness", compact: "High exp · low adapt" },
  sheltered: { measured: "Low exposure · low adaptiveness", compact: "Low exp · low adapt" },
};

const pct = (p: number) => `${Math.round(p * 100)}%`;

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

function MethodDetails({ summary, children }: { summary: string; children: React.ReactNode }) {
  return (
    <details className="border-border mb-4 rounded-lg border">
      <summary className="text-foreground hover:bg-card-accent cursor-pointer rounded-lg px-5 py-4 text-sm font-medium">
        {summary}
      </summary>
      <div className="px-2 pb-2">{children}</div>
    </details>
  );
}

/** One Panel C dimension as an expandable row: the score bar, and behind it
 * the published 0–3 rating anchors (awarded level highlighted) plus the
 * assessor's evidence for this program. Stacked layout — no wide tables —
 * so it reads on a phone. */
function RatedDimension({
  programCode,
  dim,
  score,
}: {
  programCode: string;
  dim: string;
  score: number;
}) {
  const rubric = PANEL_C_RUBRIC[dim];
  const rationale = DIMENSION_EVIDENCE[`dfva-${programCode}`]?.[dim]?.rationale;
  if (!rubric) return <DimBar code={dim} score={score} />;
  return (
    <details className="group" data-testid={`rated-dim-${dim}`}>
      <summary className="flex cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="text-muted-foreground shrink-0 text-xs transition-transform group-open:rotate-90"
        >
          ▶
        </span>
        <div className="min-w-0 flex-1">
          <DimBar code={dim} score={score} />
        </div>
      </summary>
      <div className="bg-card-accent mt-2 mb-1 ml-5 rounded-md p-3">
        <p className="text-muted-foreground text-xs italic">{rubric.definition}</p>
        <p className="text-muted-foreground mt-3 mb-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase">
          How the levels are anchored
        </p>
        <ol className="flex flex-col gap-1.5">
          {rubric.levels.map((anchor, level) => {
            const awarded = level === score;
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
                      ← this program
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ol>
        {rationale && (
          <>
            <p className="text-muted-foreground mt-3 mb-1 text-[10px] font-semibold tracking-[0.18em] uppercase">
              Evidence for this rating
            </p>
            <p className="text-foreground text-sm leading-relaxed">{rationale}</p>
          </>
        )}
      </div>
    </details>
  );
}

function DimBar({ code, score }: { code: string; score: number }) {
  const barPct = Math.round((score / 3) * 100);
  const color = score >= 3 ? QUADRANTS["well-positioned"].hex : "#E9A23B";
  return (
    <div className="flex items-center gap-3">
      <div className="text-foreground w-32 shrink-0 text-sm">
        {DIMENSION_LABELS[code]}
      </div>
      <div className="bg-card-accent h-2.5 flex-1 overflow-hidden rounded-full">
        <div className="h-full rounded-full" style={{ width: `${barPct}%`, backgroundColor: color }} />
      </div>
      <div className="w-7 shrink-0 text-right font-mono text-base font-semibold">{score}</div>
    </div>
  );
}

function MiniMatrix({ program, stability }: { program: V3Program; stability: V31Stability }) {
  const W = 360, H = 300, PAD = 34;
  const x = (e: number) => PAD + ((e - X_MIN) / (X_MAX - X_MIN)) * (W - 2 * PAD);
  const y = (a: number) => H - PAD - (a / 15) * (H - 2 * PAD);
  const mx = x(V3_META.expMedian);
  const my = y(V3_META.adaptMedian);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="v3.1 exposure–adaptiveness matrix with exact envelope">
      <rect x={PAD} y={PAD} width={W - 2 * PAD} height={H - 2 * PAD} fill="none" stroke="var(--color-border)" />
      <line x1={mx} y1={PAD} x2={mx} y2={H - PAD} stroke="var(--color-border)" strokeDasharray="4 3" />
      <line x1={PAD} y1={my} x2={W - PAD} y2={my} stroke="var(--color-border)" strokeDasharray="4 3" />
      <MatrixAreaLabels left={PAD} right={W - PAD} top={PAD} bottom={H - PAD} />
      {V3_PROGRAMS.filter((p) => p.code !== program.code).map((p) => (
        <circle key={p.code} cx={x(p.exposure)} cy={y(p.adaptiveness)} r={3.5} fill={QUADRANTS[p.quadrant].hex} opacity={0.22} />
      ))}
      <line
        x1={x(program.exposure)}
        y1={y(stability.adaptEnvelope[0])}
        x2={x(program.exposure)}
        y2={y(stability.adaptEnvelope[1])}
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

function PositionLabel({ stability }: { stability: V31Stability }) {
  const q = QUADRANTS[stability.modalQuadrant];
  const m = stability.modalProbability;
  if (m >= 0.8) {
    return (
      <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold ${q.badgeClass}`}>
        {LABELS[stability.modalQuadrant].measured}
      </span>
    );
  }
  if (m >= 0.6 && stability.runnerUpQuadrant) {
    return (
      <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold ${q.badgeClass}`}>
        {LABELS[stability.modalQuadrant].measured} / {LABELS[stability.runnerUpQuadrant].measured} — boundary case
      </span>
    );
  }
  return (
    <span className="bg-muted text-muted-foreground inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold">
      Coordinates only — quadrant not stable
    </span>
  );
}

export default function V31ReportPage() {
  const { code } = useParams<{ code: string }>();
  const program = code ? v3ProgramByCode(code) : undefined;
  const stability = code ? v31StabilityByCode(code) : undefined;

  if (!program || !stability) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-foreground mb-3 font-serif text-3xl">Program not found</h1>
        <p className="text-muted-foreground mb-6">
          No v3.1 assessment exists for “{code}” — v3.1 covers the {V3_META.placed} placed programs.
        </p>
        <Link to="/insights" className="text-secondary-muted-foreground underline">
          Back to the portfolio matrix
        </Link>
      </div>
    );
  }

  const s = stability;
  const finding = findingFor(program);
  // "Position confidence" wording (U9): the stability class is about rating
  // precision, never about program quality — the label itself must not read
  // as a grade.
  const confidenceLabel = s.stabilityClass === "boundary" ? "near a threshold" : "firm";
  const confidenceChip =
    s.stabilityClass === "boundary" ? "bg-[#FEF5E7] text-[#B97E26]" : "bg-[#E8F5EE] text-[#1F9D6B]";

  return (
    <InsightsGate>
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Hero — the program, not the changelog (U3) */}
        <div className="mb-8">
          <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
            Durability Assessment
          </p>
          <h1 className="text-foreground font-serif text-4xl tracking-tight">{program.name}</h1>
          <p className="text-muted-foreground mt-2 font-mono text-sm uppercase">
            {program.code} · University of Melbourne · {program.faculty}
          </p>
          {/* In this report — three-part map (U10) */}
          <nav className="text-muted-foreground mt-5 flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <span className="text-foreground font-medium">In this report:</span>
            <a href="#finding" className="underline">Part A — The finding</a>
            <a href="#market" className="underline">Part B — Market evidence &amp; improvement plan</a>
            <a href="#method" className="underline">Part C — Method &amp; uncertainty</a>
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
                    Full precision analysis: Part C.
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
                  Scoped with owners and a 12-month sequence in{" "}
                  <a href="#plan" className="underline">Part B</a>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Position card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <CardLabel>Position · with its precision</CardLabel>
            <div className="grid gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
                  <div>
                    <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">Exposure (AIOE)</p>
                    <p className="font-mono text-4xl font-semibold" data-testid="v31-exposure">
                      {program.exposure.toFixed(2)}
                    </p>
                    <p className="text-muted-foreground text-xs">portfolio median {V3_META.expMedian}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">Adaptiveness</p>
                    <p className="font-mono text-4xl font-semibold">
                      {program.adaptiveness}
                      <span className="text-muted-foreground text-lg">/15</span>
                    </p>
                    <p className="text-muted-foreground text-xs">
                      median {V3_META.adaptMedian} · under ±1 rating error the score could reach{" "}
                      {s.adaptEnvelope[0]}–{s.adaptEnvelope[1]}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">Position</p>
                    <div className="mt-1">
                      <PositionLabel stability={s} />
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">Position confidence</p>
                    <span
                      className={`mt-1 inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold ${confidenceChip}`}
                      data-testid="stability-class"
                    >
                      {confidenceLabel}
                    </span>
                  </div>
                </div>

                {/* Plain-language probability (U8) */}
                <p className="text-muted-foreground mt-4 text-sm" data-testid="sensitivity-strip">
                  There is a{" "}
                  <strong className="text-foreground">{pct(s.modalProbability)} chance</strong> this
                  program's position is the one shown, given the assumed rater-error rate (no rater
                  study has been run — under an optimistic assumption {pct(s.modalProbabilityOptimistic)},
                  pessimistic {pct(s.modalProbabilityPessimistic)}; details in{" "}
                  <a href="#method" className="underline">Part C</a>).
                </p>

                {/* Exposure ≠ displacement, adjacent to the figure (U5) */}
                <div className="bg-card-accent text-muted-foreground mt-4 flex items-start gap-2 rounded-md p-3 text-sm">
                  <span className="text-base">⚠</span>
                  <span data-testid="exposure-explainer">
                    <strong className="text-foreground font-medium">What exposure means.</strong>{" "}
                    AIOE is the AI Occupational Exposure index (
                    <a
                      href="https://doi.org/10.1002/smj.3286"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Felten, Raj &amp; Seamans, 2021
                    </a>
                    ): a published
                    measure, for each of ~770 occupations, of how much that occupation's tasks
                    overlap with what current AI can do, rescaled 0–100. A value of{" "}
                    {program.exposure.toFixed(2)} says a large share of the tasks in this program's
                    destination occupations overlap with AI capability. It does{" "}
                    <strong className="text-foreground">not</strong> mean those jobs are
                    disappearing — across the Australian labour market, the most AI-exposed
                    occupations are projected to grow, because exposed work tends to be skilled
                    work. Exposure indicates where the <em>content</em> of work is likely to
                    change; what that change means for graduates depends on the adaptiveness axis.
                  </span>
                </div>

                {s.stabilityClass === "boundary" && (
                  <div className="bg-card-accent text-muted-foreground mt-3 flex items-start gap-2 rounded-md p-3 text-sm">
                    <span className="text-foreground text-xs font-semibold tracking-wide uppercase">Note</span>
                    <span>
                      This program sits{" "}
                      {Math.abs(s.distToAdaptMedian) === 0 ? "exactly at" : `${Math.abs(s.distToAdaptMedian)} point from`}{" "}
                      the adaptiveness median, so its quadrant is sensitive to single-item rating
                      differences. This is a statement about rating precision, not about program
                      quality.
                    </span>
                  </div>
                )}

                {Math.abs(program.exposure - V3_META.expMedian) <= 2.5 && (
                  <div className="bg-card-accent text-muted-foreground mt-3 flex items-start gap-2 rounded-md p-3 text-sm">
                    <span className="text-base">⚠</span>
                    <span data-testid="exposure-proximity-note">
                      <strong className="text-foreground font-medium">
                        Near the exposure median ({Math.abs(program.exposure - V3_META.expMedian).toFixed(2)} AIOE away).
                      </strong>{" "}
                      The precision analysis models rating error on the scored axis only — exposure
                      carries systematic crosswalk uncertainty that is disclosed, not distributed. A
                      program this close to the exposure threshold has quadrant uncertainty these
                      probabilities do not capture.
                    </span>
                  </div>
                )}

                {s.nearDisplayThreshold && (
                  <div className="bg-card-accent text-muted-foreground mt-3 flex items-start gap-2 rounded-md p-3 text-sm">
                    <span className="text-base">⚠</span>
                    <span data-testid="near-threshold-note">
                      <em>
                        This label sits near the display threshold ({pct(s.modalProbability)} against
                        an 80% rule). At a pessimistic rater-error assumption ({pct(s.modalProbabilityPessimistic)})
                        it would be reported as a boundary case.
                      </em>
                    </span>
                  </div>
                )}
              </div>
              <div className="w-full max-w-sm md:w-80">
                <MiniMatrix program={program} stability={s} />
                <p className="text-muted-foreground mt-1 text-xs">
                  The vertical bar is the score range reachable under ±1 rating error.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Panel C — the scored axis behind the finding */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <CardLabel>Curriculum Adaptiveness — the scored axis</CardLabel>
            <CardTitle className="text-lg">Where the defences are, and aren't</CardTitle>
            <p className="text-muted-foreground mt-1 mb-6 text-sm">
              Scored from curriculum evidence, 0–3 per dimension. Tap a dimension
              to see how the four levels are anchored and the evidence behind
              this program's score. The precision analysis in Part C quantifies
              what a ±1 rating difference on these items would do to the
              position.
            </p>
            <div className="flex flex-col gap-3">
              {(Object.entries(program.dimensionScores) as [string, number][]).map(([d, sc]) => (
                <RatedDimension key={d} programCode={program.code} dim={d} score={sc} />
              ))}
            </div>
            <div className="border-border mt-4 flex items-center justify-between border-t pt-4">
              <span className="text-muted-foreground text-sm">Total adaptiveness</span>
              <span className="font-mono text-xl font-semibold">
                {program.adaptiveness}
                <span className="text-muted-foreground text-sm"> / 15</span>
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {(
                [
                  ["Decision-making", program.gateD4],
                  ["Domain depth", program.gateD6],
                ] as const
              ).map(([label, result]) => (
                <span
                  key={label}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase ${
                    result === "PASS" ? "bg-[#E8F5EE] text-band-resilient" : "bg-[#FDE8E8] text-band-critical"
                  }`}
                >
                  {label} {result === "PASS" ? "✓" : "✗"}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ================= PART B — MARKET EVIDENCE & PLAN ================= */}
        <PartHeading id="market" part="Part B" title="Market evidence & improvement plan" />
        <p className="text-muted-foreground mb-5 text-sm">
          Confidence is stated on each section below; every data source behind these figures is
          cited in full in{" "}
          <a href="#sources" className="underline">
            Data sources &amp; references
          </a>{" "}
          (Part C).
        </p>

        {/* Market intelligence + redesign recommendations (canonical source:
            reports/dfva-market-*.md and reports/dfva-recommend-*.md; the card
            renders nothing for programs without those reports) */}
        <ReportMarkdownCard
          slug={`dfva-market-${program.code}`}
          label="Market Intelligence"
          title="Labour-Market Intelligence"
          subtitle="Job families, hiring signals, and skill shifts for this program's destinations — confidence level stated per section"
        />
        <div id="plan" className="scroll-mt-6">
          <ReportMarkdownCard
            slug={`dfva-recommend-${program.code}`}
            label="Redesign Recommendations"
            title="Improvement Plan"
            subtitle="Score-to-action mapping and prioritised interventions, with owners and timelines"
          />
        </div>

        {/* ================= PART C — METHOD & UNCERTAINTY ================= */}
        <PartHeading id="method" part="Part C" title="Method & uncertainty" />
        <p className="text-muted-foreground mb-5 text-sm">
          Everything the position claims, with its assumptions exposed. Precision in the computation
          must not be mistaken for accuracy in the model — the sections below say exactly which
          numbers rest on which assumptions.
        </p>

        <MethodDetails
          summary={`Rater-error sensitivity — there is no rater study yet, and the assumed error rate decides the headline (this program: ${pct(s.modalProbability)}, ${pct(s.modalProbabilityOptimistic)} optimistic, ${pct(s.modalProbabilityPessimistic)} pessimistic)`}
        >
          <Card className="border-0 shadow-none">
            <CardContent className="pt-4">
              <p className="text-muted-foreground mb-4 text-sm">
                No inter-rater study has been run (open item R9), so the per-item error rate e is
                an <em>assumption</em>, not a measurement. Publishing only one value would present
                a choice of assumption as a property of the portfolio — so all three are published.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      {["Error rate", "This program's stability", "Programs failing the single-label rule (portfolio)"].map((h) => (
                        <th key={h} className="text-muted-foreground border-border border-b-2 px-3 py-2 text-left text-xs font-medium tracking-[0.18em] uppercase">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(
                      [
                        ["e = 0.05 (optimistic)", s.modalProbabilityOptimistic, V31_META.failSingleLabel.optimistic],
                        ["e = 0.10 (published assumption)", s.modalProbability, V31_META.failSingleLabel.published],
                        ["e = 0.20 (pessimistic)", s.modalProbabilityPessimistic, V31_META.failSingleLabel.pessimistic],
                      ] as [string, number, number][]
                    ).map(([label, m, fails]) => (
                      <tr key={label} className="border-border border-b">
                        <td className="px-3 py-2">{label}</td>
                        <td className="px-3 py-2 font-mono">{m.toFixed(5)}</td>
                        <td className="px-3 py-2 font-mono">{fails} of 34</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-card-accent text-muted-foreground mt-4 flex items-start gap-2 rounded-md p-3 text-sm">
                <span className="text-base">⚠</span>
                <span>
                  If raters agree at e ≈ 0.20, then 14 of 34 programs — not 2 — fail the
                  single-label rule, and the current report understates instability for a third of
                  the placed portfolio.
                </span>
              </div>
            </CardContent>
          </Card>
        </MethodDetails>

        <MethodDetails
          summary={`Distribution structure — stability is bimodal (${V31_META.boundaryCount} near-threshold · ${V31_META.stableCount} firm), with distance to the adaptiveness median as the single cause`}
        >
          <Card className="border-0 shadow-none">
            <CardContent className="pt-4">
              <p className="text-muted-foreground mb-4 text-sm">
                The 34 exact stability values form two well-separated clusters — {V31_META.boundaryCount}{" "}
                near-threshold (0.799–0.848) and {V31_META.stableCount} firm (0.979–1.000) — with a
                0.13-wide empty band between them that no program occupies. The cause is distance
                from the adaptiveness median and nothing else: one point away, a single item's
                error can cross the threshold; two points away needs two coincident errors.
              </p>
              <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
                <div className="bg-card-accent rounded-md p-3">
                  <p className="font-mono text-xl font-semibold">{confidenceLabel}</p>
                  <p className="text-muted-foreground text-xs">This program's cluster</p>
                </div>
                <div className="bg-card-accent rounded-md p-3">
                  <p className="font-mono text-xl font-semibold">
                    {s.distToAdaptMedian > 0 ? "+" : ""}
                    {s.distToAdaptMedian}
                  </p>
                  <p className="text-muted-foreground text-xs">Points from adaptiveness median</p>
                </div>
                <div className="bg-card-accent rounded-md p-3">
                  <p className="font-mono text-xl font-semibold">{s.itemsAtCeiling}/5</p>
                  <p className="text-muted-foreground text-xs">Items at ceiling (3/3)</p>
                </div>
                <div className="bg-card-accent rounded-md p-3">
                  <p className="font-mono text-xl font-semibold">{V31_META.stabilityClassCut}</p>
                  <p className="text-muted-foreground text-xs">Class cut (any value in 0.85–0.98 identical)</p>
                </div>
              </div>
              <div className="bg-card-accent text-muted-foreground mt-4 flex items-start gap-2 rounded-md p-3 text-sm">
                <span className="text-foreground text-xs font-semibold tracking-wide uppercase">Disclosure</span>
                <span>
                  <strong className="text-foreground font-medium">Error-model asymmetry.</strong>{" "}
                  Perturbation clamps at the 0–3 item bounds, so 53 of 170 scored items (31%) at
                  ceiling can only be perturbed downward — an expected net drift of −0.075
                  adaptiveness points concentrated in high-adaptiveness programs. A symmetric
                  alternative was tested: maximum stability difference 0.0057, zero label-regime
                  changes. Clamping is retained as the simpler rule.
                </span>
              </div>
            </CardContent>
          </Card>
        </MethodDetails>

        <MethodDetails summary="What changed from v3 — exact enumeration replaced sampling; the numbers are the same, their standing is not">
          <Card className="border-0 shadow-none">
            <CardContent className="pt-4">
              <p className="text-muted-foreground mb-4 text-sm">
                v3.1 is a correctness amendment to the uncertainty layer only — no construct,
                panel, data source or exposure value changes. Exact enumeration agrees with v3's
                20,000-draw estimate to a maximum deviation of 0.0038; v3's published dual-label
                count of 2 was correct, but was one draw from a seed-dependent distribution over
                {" {0, 1, 2}"}.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      {["", "v3", "v3.1 (this report)"].map((h, i) => (
                        <th key={i} className="text-muted-foreground border-border border-b-2 px-3 py-2 text-left text-xs font-medium tracking-[0.18em] uppercase">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(
                      [
                        ["Stability computation", "20,000-draw Monte-Carlo, seeded RNG", "Exact enumeration of all 243 states — deterministic, seedless"],
                        ["Published count of boundary cases", "Seed-dependent (0, 1 or 2 across seeds)", "Exact: 2 programs below the 80% rule at e = 0.10"],
                        ["Error-rate assumption", "Single rate e = 0.10, implicit", "Three rates published (0.05 / 0.10 / 0.20); headline moves 0 → 2 → 14 of 34"],
                        ["Adaptiveness interval", "Observed range across draws", `Exact reachable envelope (${s.adaptEnvelope[0]}–${s.adaptEnvelope[1]} for this program)`],
                        ["Stability summary", "Modal probability only", `Position-confidence class from the empirical empty band (this program: ${confidenceLabel})`],
                        ["Near-threshold disclosure", "None", "Mandatory note within 0.02 of a display threshold (11 of 34 trigger)"],
                        ["Clamping asymmetry", "Implicit", "Disclosed: 31% of items at ceiling, net drift −0.075, label-equivalent to symmetric alternative"],
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
        </MethodDetails>

        <MethodGlossary
          terms={[
            "aioe",
            "destinationExposure",
            "adaptiveness",
            "gates",
            "medianQuadrant",
            "positionConfidence",
            "envelope",
            "raterError",
            "jir",
            "crosswalk",
            "v1Composite",
            "qilt",
            "jsaHeo",
          ]}
        />

        <SourceReferences
          sources={[
            "felten2021",
            "aioeAppendix",
            "jirDataset",
            "onetSoc",
            "handbook",
            "dfvaRubric",
            "qiltGos",
            "jsaHeoData",
            "adzunaData",
            "ibisworldP8102",
            "wefFoj",
            "linkedinEg",
            "stackOverflow",
            "gartnerIt",
            "isacaSoc",
            "pmiPulse",
            "mckinseyAi",
            "seekObs",
          ]}
        />

        {/* Footer — links labelled by destination and purpose (U12) */}
        <div className="text-muted-foreground border-border mt-12 flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-xs">
          <span>Evidura · Durability Assessment · v3.1 · exact enumeration, assumed rater-error rate {V31_META.errorRates.published}</span>
          <span className="flex gap-4">
            <Link to={`/insights/v3/${program.code}`} className="underline">
              Same program, previous report format (v3)
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
