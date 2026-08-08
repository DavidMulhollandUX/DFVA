import { Link, useParams } from "react-router";
import { Card, CardContent, CardTitle } from "../../client/components/ui/card";
import { InsightsGate } from "../InsightsGate";
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

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-muted-foreground mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase">
      <span className="bg-secondary block h-3.5 w-0.5 rounded-full" />
      {children}
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
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
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
  const boundaryChip =
    s.stabilityClass === "boundary" ? "bg-[#FEF5E7] text-[#B97E26]" : "bg-[#E8F5EE] text-[#1F9D6B]";

  return (
    <InsightsGate>
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Hero */}
        <div className="mb-10">
          <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
            Durability Assessment · v3.1 — exact position stability
          </p>
          <h1 className="text-foreground font-serif text-4xl tracking-tight">{program.name}</h1>
          <p className="text-muted-foreground mt-2 font-mono text-sm uppercase">
            {program.code} · University of Melbourne · {program.faculty}
          </p>
          <p className="text-muted-foreground mt-4 max-w-3xl text-sm">
            v3.1 replaces v3's 20,000-draw sampling with <em>exact enumeration</em> of
            all 243 perturbation states, publishes the stability result at three
            rater-error assumptions instead of one, and derives a stability class
            from the empirical structure of the distribution. Compare the{" "}
            <Link to="/insights/v3/mc-is" className="text-secondary-muted-foreground underline">
              v3 report (Master of Information Systems)
            </Link>{" "}
            and the{" "}
            <Link to="/insights/program/mc-cs" className="text-secondary-muted-foreground underline">
              v2 report (Master of Computer Science)
            </Link>
            .
          </p>
        </div>

        {/* Position + exact stability */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <CardLabel>Position · exact stability</CardLabel>
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
                      exact envelope {s.adaptEnvelope[0]}–{s.adaptEnvelope[1]} · median {V3_META.adaptMedian}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">Position</p>
                    <div className="mt-1">
                      <PositionLabel stability={s} />
                    </div>
                    <p className="text-muted-foreground mt-1 text-xs" data-testid="sensitivity-strip">
                      m = {s.modalProbability.toFixed(3)} ({s.modalProbabilityOptimistic.toFixed(3)} optimistic ·{" "}
                      {s.modalProbabilityPessimistic.toFixed(3)} pessimistic)
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">Stability</p>
                    <span
                      className={`mt-1 inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold ${boundaryChip}`}
                      data-testid="stability-class"
                    >
                      {s.stabilityClass}
                    </span>
                  </div>
                </div>

                {s.stabilityClass === "boundary" && (
                  <div className="bg-card-accent text-muted-foreground mt-5 flex items-start gap-2 rounded-md p-3 text-sm">
                    <span className="text-base">◔</span>
                    <span>
                      <strong className="text-foreground font-medium">Position stability: boundary.</strong>{" "}
                      This program sits {Math.abs(s.distToAdaptMedian) <= 0 ? "at" : `${Math.abs(s.distToAdaptMedian)} point from`}{" "}
                      the adaptiveness median, so its quadrant is sensitive to
                      single-item rating differences. This is a statement about
                      rating precision, not about program quality.
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
                      The stability layer models rating error on the scored axis
                      only — exposure carries systematic crosswalk uncertainty
                      that is disclosed, not distributed. A program this close to
                      the exposure threshold has quadrant uncertainty this page's
                      probabilities do not capture.
                    </span>
                  </div>
                )}

                {s.nearDisplayThreshold && (
                  <div className="bg-card-accent text-muted-foreground mt-3 flex items-start gap-2 rounded-md p-3 text-sm">
                    <span className="text-base">⚠</span>
                    <span data-testid="near-threshold-note">
                      <em>
                        This label sits near the display threshold (m ={" "}
                        {s.modalProbability.toFixed(3)} against a 0.80 rule). At a
                        pessimistic rater-error assumption (e = 0.20, m ={" "}
                        {s.modalProbabilityPessimistic.toFixed(3)}) it would be
                        reported as a boundary case.
                      </em>
                    </span>
                  </div>
                )}

                <div className="mt-6 grid max-w-md grid-cols-1 gap-x-8 gap-y-1.5 text-sm sm:grid-cols-2">
                  {(Object.entries(s.quadrantDist) as [V3Quadrant, number][]).map(([q, p]) => (
                    <div key={q} className="flex items-center justify-between gap-2">
                      <span className="text-muted-foreground flex items-center gap-1.5 text-xs whitespace-nowrap">
                        <span className="inline-block h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: QUADRANTS[q].hex }} />
                        {LABELS[q].compact}
                      </span>
                      <span className="font-mono text-xs">{(p * 100).toFixed(3)}%</span>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground mt-2 text-xs">
                  Exact probabilities over all 243 perturbation states — no sampling, no seed.
                </p>
              </div>
              <div className="w-full max-w-sm md:w-80">
                <MiniMatrix program={program} stability={s} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rater-error sensitivity */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <CardLabel>Rater-error sensitivity</CardLabel>
            <CardTitle className="text-lg">The assumption that decides the headline</CardTitle>
            <p className="text-muted-foreground mt-1 mb-4 text-sm">
              No inter-rater study has been run (open item R9), so the per-item
              error rate e is an <em>assumption</em>, not a measurement. Publishing
              only one value would present a choice of assumption as a property of
              the portfolio — so all three are published.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    {["Error rate", "This program's m", "Programs failing m ≥ 0.80 (portfolio)"].map((h) => (
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
                <strong className="text-foreground font-medium">
                  Precision in the computation must not be mistaken for accuracy in the model.
                </strong>{" "}
                Exact enumeration removes sampling error; it does not remove the
                fact that e = 0.10 was chosen rather than estimated. If raters
                agree at e ≈ 0.20, then 14 of 34 programs — not 2 — fail the
                single-label rule.
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Distribution structure */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <CardLabel>Distribution structure</CardLabel>
            <CardTitle className="text-lg">Stability is bimodal, with one cause</CardTitle>
            <p className="text-muted-foreground mt-1 mb-4 text-sm">
              The 34 exact modal probabilities form two well-separated clusters —{" "}
              {V31_META.boundaryCount} boundary (0.799–0.848) and {V31_META.stableCount}{" "}
              stable (0.979–1.000) — with a 0.13-wide empty band between them that
              no program occupies. The cause is distance from the adaptiveness
              median and nothing else: one point away, a single item's error can
              cross the threshold; two points away needs two coincident errors.
            </p>
            <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
              <div className="bg-card-accent rounded-md p-3">
                <p className="font-mono text-xl font-semibold">{s.stabilityClass}</p>
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
              <span className="text-base">◔</span>
              <span>
                <strong className="text-foreground font-medium">Error-model asymmetry (disclosed).</strong>{" "}
                Perturbation clamps at the 0–3 item bounds, so 53 of 170 scored
                items (31%) at ceiling can only be perturbed downward — an
                expected net drift of −0.075 adaptiveness points concentrated in
                high-adaptiveness programs. A symmetric alternative was tested:
                maximum modal-probability difference 0.0057, zero label-regime
                changes. Clamping is retained as the simpler rule.
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Panel C */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <CardLabel>Panel C</CardLabel>
            <CardTitle className="text-lg">Curriculum Adaptiveness</CardTitle>
            <p className="text-muted-foreground mt-1 mb-6 text-sm">
              Scored from curriculum evidence, 0–3 per dimension — unchanged from
              v3; the stability layer above quantifies what a ±1 rating
              difference on these items would do to the position.
            </p>
            <div className="flex flex-col gap-3">
              {(Object.entries(program.dimensionScores) as [string, number][]).map(([d, sc]) => (
                <DimBar key={d} code={d} score={sc} />
              ))}
            </div>
            <div className="border-border mt-4 flex items-center justify-between border-t pt-4">
              <span className="text-muted-foreground text-sm">Total adaptiveness (exact envelope)</span>
              <span className="font-mono text-xl font-semibold">
                {program.adaptiveness}
                <span className="text-muted-foreground text-sm">
                  {" "}
                  [{s.adaptEnvelope[0]}–{s.adaptEnvelope[1]}]
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
                    result === "PASS" ? "bg-[#E8F5EE] text-band-resilient" : "bg-[#FDE8E8] text-band-critical"
                  }`}
                >
                  {label} {result === "PASS" ? "✓" : "✗"}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* What changed from v3 */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <CardLabel>Version comparison</CardLabel>
            <CardTitle className="text-lg">What changed from v3</CardTitle>
            <p className="text-muted-foreground mt-1 mb-6 text-sm">
              v3.1 is a correctness amendment to the uncertainty layer only — no
              construct, panel, data source or exposure value changes. Exact
              enumeration agrees with v3's 20,000-draw estimate to a maximum
              deviation of 0.0038; v3's published dual-label count of 2 was
              correct, but was one draw from a seed-dependent distribution over
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
                      ["Published count of boundary cases", "Seed-dependent (0, 1 or 2 across seeds)", "Exact: 2 programs below m = 0.80 at e = 0.10"],
                      ["Error-rate assumption", "Single rate e = 0.10, implicit", "Three rates published (0.05 / 0.10 / 0.20); headline moves 0 → 2 → 14 of 34"],
                      ["Adaptiveness interval", "Observed range across draws", `Exact reachable envelope (${s.adaptEnvelope[0]}–${s.adaptEnvelope[1]} for this program)`],
                      ["Stability summary", "Modal probability only", `stabilityClass from the empirical empty band (this program: ${s.stabilityClass})`],
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

        {/* Market intelligence + redesign recommendations (canonical source:
            reports/dfva-market-*.md and reports/dfva-recommend-*.md; the card
            renders nothing for programs without those reports) */}
        <ReportMarkdownCard
          slug={`dfva-market-${program.code}`}
          label="Market Intelligence"
          title="Labour-Market Intelligence"
          subtitle="Job families, hiring signals, and discussion themes for this program's destinations — from the DFVA market-intelligence pipeline"
        />
        <ReportMarkdownCard
          slug={`dfva-recommend-${program.code}`}
          label="Redesign Recommendations"
          title="Improvement Plan"
          subtitle="Score-to-action mapping and prioritised interventions — from the DFVA recommendation pipeline"
        />

        <div className="text-muted-foreground border-border mt-12 flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-xs">
          <span>Evidura · Durability Assessment · v3.1 · exact enumeration, {V31_META.errorRates.published} published error rate</span>
          <span className="flex gap-4">
            <Link to={`/insights/v3/${program.code}`} className="underline">
              v3 report (this program)
            </Link>
            <Link to="/insights/v3/mc-is" className="underline">
              v3 (MC-IS)
            </Link>
            <Link to="/insights" className="underline">
              ← Portfolio matrix
            </Link>
          </span>
        </div>
      </div>
    </InsightsGate>
  );
}
