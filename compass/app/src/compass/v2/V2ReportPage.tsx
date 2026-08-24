import { Link, useParams } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../client/components/ui/card";
import { InsightsGate } from "../InsightsGate";
import { MethodGlossary } from "../MethodGlossary";
import { SourceReferences } from "../SourceReferences";
import { ExposureMatrix } from "./components/ExposureMatrix";
import { ReportMarkdownCard } from "./components/ReportMarkdownCard";
import { V2_META, V2_PROGRAMS, programByCode } from "./data/v2Programs";
import { reportDetailFor } from "./data/v2ReportDetails";
import { DIMENSION_LABELS, QUADRANTS } from "./quadrants";

const X_MIN = 30;
const X_MAX = 80;

/** Answer-first finding blocks (UX review U13), in v2's own numbers — the v2
 * page never quotes v3 figures, so the two instruments are not mixed. */
const V2_FINDINGS: Record<
  string,
  { finding: string; meaning: string; actions: string[] }
> = {
  "mc-cs": {
    finding:
      "Graduates enter among the most AI-exposed destinations in the portfolio (exposure 71.3, against a portfolio median of 61.8), and the curriculum builds the strongest defences in the portfolio against that overlap: adaptiveness 14 of 15, with one remaining scored gap (systems thinking 2/3).",
    meaning:
      "Exposed destinations with an adaptive curriculum is the strongest position in the portfolio, not a warning: these graduates work where AI is the tool, and the curriculum trains them to design and supervise it. The management task is to hold the position as destination exposure keeps rising.",
    actions: [
      "Close the last scored gap: embed cross-disciplinary trade-off and failure-mode case studies in each core unit (systems thinking to 3/3).",
      "Steer destination mix toward low-substitution families: ML platform engineering, security, AI governance.",
    ],
  },
};

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-muted-foreground mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase">
      <span className="bg-secondary block h-3.5 w-0.5 rounded-full" />
      {children}
    </div>
  );
}

function DimBar({
  code,
  label,
  score,
}: {
  code: string;
  label: string;
  score: number;
}) {
  const pct = Math.round((score / 3) * 100);
  const color = score >= 3 ? QUADRANTS["well-positioned"].hex : "#E9A23B";
  return (
    <div className="flex items-center gap-3">
      <div className="text-muted-foreground w-28 shrink-0 text-sm">
        <span className="text-foreground block text-xs font-semibold tracking-[0.18em] uppercase">
          {code}
        </span>
        {label}
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

export default function V2ReportPage() {
  const { code } = useParams<{ code: string }>();
  const program = code ? programByCode(code) : undefined;

  if (!program) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-foreground mb-3 font-serif text-3xl">
          Program not found
        </h1>
        <p className="text-muted-foreground mb-6">
          No v2 assessment exists for “{code}”.
        </p>
        <Link
          to="/insights"
          className="text-secondary-muted-foreground underline"
        >
          Back to the portfolio overview
        </Link>
      </div>
    );
  }

  const q = QUADRANTS[program.quadrant];
  const detail = reportDetailFor(program.code);
  const gaugePct =
    program.exposure !== null
      ? Math.round(((program.exposure - X_MIN) / (X_MAX - X_MIN)) * 100)
      : null;
  const medianPct = Math.round(
    ((V2_META.exp_median - X_MIN) / (X_MAX - X_MIN)) * 100,
  );

  const dims: { code: string; score: number }[] = [
    { code: "D2", score: program.D2 },
    { code: "D3", score: program.D3 },
    { code: "D7", score: program.D7 },
    { code: "B", score: program.B_irreplaceable },
    { code: "D5", score: program.D5_ai_literacy },
  ];

  const v1Rows: [string, string, string][] = [
    [
      "D1 Automation Exposure",
      "→ Panel A (measured)",
      "Labour-market claim; moved from scoring to measurement",
    ],
    [
      "D2 Systems Thinking",
      "→ Panel C (scored)",
      "Retained; evidence from handbook curriculum",
    ],
    ["D3 Technical Depth", "→ Panel C (scored)", "Retained"],
    [
      "D4 Decision-making",
      "→ Gate (binary)",
      ">70% of programs use same level; gate, not measure",
    ],
    ["D5 AI Literacy", "→ Panel C (scored)", "Retained with guardrail anchors"],
    ["D6 Domain Depth", "→ Gate (binary)", ">83% modal; gate, not measure"],
    ["D7 Research Methods", "→ Panel C (scored)", "Retained"],
    [
      "D8 Human/Relational",
      "→ Panel A (measured)",
      "Property of destination, not curriculum",
    ],
    [
      "D9 Curriculum Currency",
      "→ Dropped",
      "Item-total correlation 0.06; unscorable from handbook",
    ],
    [
      "D10 Outcome Evidence",
      "→ Panel D (metadata)",
      "Moved to evidence confidence",
    ],
    [
      "B Irreplaceability",
      "→ Panel C (scored)",
      "Retained; highest v1 dimension coherence",
    ],
  ];

  return (
    <InsightsGate>
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Hero */}
        <div className="mb-12">
          <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
            Durability Assessment
          </p>
          <h1 className="text-foreground font-serif text-4xl tracking-tight">
            {program.name}
          </h1>
          <p className="text-muted-foreground mt-2 font-mono text-sm uppercase">
            {program.code} · University of Melbourne
            {detail ? ` · ${detail.creditPoints}` : ""}
          </p>
          <div className="mt-6 flex flex-wrap gap-8">
            <div>
              <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                Faculty
              </p>
              <p>{program.faculty}</p>
            </div>
            {detail && (
              <div>
                <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                  Level
                </p>
                <p>{detail.level}</p>
              </div>
            )}
            <div>
              <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                Position
              </p>
              <span
                className={`mt-0.5 inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold ${q.badgeClass}`}
              >
                {q.short}
              </span>
            </div>
          </div>
        </div>

        {/* Answer-first finding block (U13) — rendered when authored */}
        {V2_FINDINGS[program.code] && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-5">
                <div>
                  <CardLabel>The finding</CardLabel>
                  <p
                    className="text-foreground text-base leading-relaxed"
                    data-testid="finding-block"
                  >
                    {V2_FINDINGS[program.code].finding}
                  </p>
                </div>
                <div>
                  <CardLabel>What this does and does not mean</CardLabel>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {V2_FINDINGS[program.code].meaning}
                  </p>
                </div>
                <div>
                  <CardLabel>The highest-value changes</CardLabel>
                  <ol className="text-foreground list-decimal space-y-1 pl-5 text-sm">
                    {V2_FINDINGS[program.code].actions.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Panel A */}
          <Card>
            <CardContent className="pt-6">
              <CardLabel>Panel A</CardLabel>
              <CardTitle className="text-lg">Destination AI Exposure</CardTitle>
              <p className="text-muted-foreground mt-1 mb-6 text-sm">
                How much of the destination work current AI touches — measured,
                not scored
              </p>
              {program.exposure !== null && gaugePct !== null ? (
                <>
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
                        Portfolio median{" "}
                        <span className="font-mono">{V2_META.exp_median}</span>
                      </p>
                    </div>
                  </div>
                  <div className="bg-card-accent text-muted-foreground flex items-start gap-2 rounded-md p-3 text-sm">
                    <span className="text-base">⚠</span>
                    <span data-testid="exposure-explainer">
                      <strong className="text-foreground font-medium">
                        What exposure means.
                      </strong>{" "}
                      Exposure is measured on the AI Occupational Exposure index
                      (AIOE;{" "}
                      <a
                        href="https://doi.org/10.1002/smj.3286"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        Felten, Raj &amp; Seamans, 2021
                      </a>
                      ) — a published measure, per occupation, of how much the
                      occupation's tasks overlap with what current AI can do.
                      This figure says how much of the destination work current
                      AI touches. It does{" "}
                      <strong className="text-foreground">not</strong> mean
                      those jobs are disappearing — across the Australian labour
                      market, the most AI-exposed occupations are projected to
                      grow, because exposed work tends to be skilled work.
                      Exposure indicates where the <em>content</em> of work is
                      likely to change; what that means for graduates depends on
                      the adaptiveness axis.
                    </span>
                  </div>
                  {detail && (
                    <div className="mt-6">
                      <p className="text-muted-foreground mb-3 text-xs tracking-[0.18em] uppercase">
                        Top Graduate Destinations
                      </p>
                      <div className="flex flex-col gap-2">
                        {detail.destinations.map((d) => (
                          <div
                            key={d.title}
                            className="flex justify-between text-sm"
                          >
                            <span>{d.title}</span>
                            <span className="text-muted-foreground font-mono">
                              {d.share}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-card-accent text-muted-foreground rounded-md p-4 text-sm">
                  No JIR destination data for this program yet — it appears in
                  the migration table but not on the exposure axis. Awaiting
                  destination mapping.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Panel C */}
          <Card>
            <CardContent className="pt-6">
              <CardLabel>Panel C</CardLabel>
              <CardTitle className="text-lg">Curriculum Adaptiveness</CardTitle>
              <p className="text-muted-foreground mt-1 mb-6 text-sm">
                How the program builds skills that resist AI substitution —
                scored, 0–3 per dimension
              </p>
              <div className="flex flex-col gap-3">
                {dims.map((d) => (
                  <DimBar
                    key={d.code}
                    code={d.code}
                    label={DIMENSION_LABELS[d.code]}
                    score={d.score}
                  />
                ))}
              </div>
              <div className="border-border mt-4 flex items-center justify-between border-t pt-4">
                <span className="text-muted-foreground text-sm">
                  Total adaptiveness
                </span>
                <span className="font-mono text-xl font-semibold">
                  {program.adaptiveness_raw} / 15
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <span
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase ${
                    program.gate_D4 === "PASS"
                      ? "text-band-resilient bg-[#E8F5EE]"
                      : "text-band-critical bg-[#FDE8E8]"
                  }`}
                >
                  D4 Decision-making {program.gate_D4 === "PASS" ? "✓" : "✗"}
                </span>
                <span
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase ${
                    program.gate_D6 === "PASS"
                      ? "text-band-resilient bg-[#E8F5EE]"
                      : "text-band-critical bg-[#FDE8E8]"
                  }`}
                >
                  D6 Domain depth {program.gate_D6 === "PASS" ? "✓" : "✗"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Matrix position */}
          <Card>
            <CardContent className="pt-6 text-center">
              <CardLabel>Where this program sits</CardLabel>
              <CardTitle className="text-lg">2×2 Matrix Position</CardTitle>
              <p className="text-muted-foreground mt-1 mb-4 text-sm">
                Curriculum Adaptiveness × Destination AI Exposure — median
                thresholds
              </p>
              {program.has_jir ? (
                <>
                  <div className="mx-auto max-w-sm">
                    <ExposureMatrix
                      programs={V2_PROGRAMS.filter(
                        (p) => p.code === program.code,
                      )}
                      compact
                      highlightCode={program.code}
                    />
                  </div>
                  <p className="text-muted-foreground mt-3 text-sm">
                    {program.code.toUpperCase()} is{" "}
                    <strong className="text-foreground">{q.short}</strong> —{" "}
                    {q.desc.toLowerCase()}.
                    {detail ? ` ${detail.positionNarrative}` : ""}
                  </p>
                </>
              ) : (
                <div className="bg-card-accent text-muted-foreground rounded-md p-4 text-left text-sm">
                  Not plotted — no destination exposure measurement. Quadrant:{" "}
                  <strong className="text-foreground">{q.label}</strong>.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Panel D */}
          <Card>
            <CardContent className="pt-6">
              <CardLabel>Panel D</CardLabel>
              <CardTitle className="text-lg">Evidence Confidence</CardTitle>
              <p className="text-muted-foreground mt-1 mb-6 text-sm">
                Metadata about the evidence base — never scored, never on an
                axis
              </p>
              {detail ? (
                <table className="w-full border-collapse text-sm">
                  <tbody>
                    {(
                      [
                        [
                          "Evidence tier",
                          <span key="t" className="text-band-resilient">
                            ● {detail.evidence.tier}
                          </span>,
                        ],
                        ["JIR match", detail.evidence.jirMatch],
                        ["Employers", detail.evidence.employersSummary],
                        ["Prestige employers", detail.evidence.prestigeSummary],
                        ["QILT study area", detail.evidence.qiltStudyArea],
                        [
                          "Short-term employment",
                          <span key="s" className="font-mono">
                            {detail.evidence.shortTermEmployment}
                          </span>,
                        ],
                        [
                          "Mid-term employment",
                          <span key="m" className="font-mono">
                            {detail.evidence.midTermEmployment}
                          </span>,
                        ],
                        [
                          "Median salary",
                          <span key="sal" className="font-mono">
                            {detail.evidence.medianSalary}
                          </span>,
                        ],
                        [
                          "Advertised salary range",
                          <span key="adv" className="font-mono">
                            {detail.evidence.advertisedSalaryRange}
                          </span>,
                        ],
                        ["Occupation demand", detail.evidence.occupationDemand],
                        [
                          "Evidence score",
                          <span key="ev" className="font-mono">
                            {detail.evidence.evidenceScore}
                          </span>,
                        ],
                      ] as [string, React.ReactNode][]
                    ).map(([label, value]) => (
                      <tr key={label} className="border-border border-b">
                        <td className="text-muted-foreground py-2 pr-4">
                          {label}
                        </td>
                        <td className="py-2">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full border-collapse text-sm">
                  <tbody>
                    <tr className="border-border border-b">
                      <td className="text-muted-foreground py-2">JIR match</td>
                      <td className="py-2">
                        {program.has_jir
                          ? "Destination data matched"
                          : "No JIR match — handbook evidence only"}
                      </td>
                    </tr>
                    <tr className="border-border border-b">
                      <td className="text-muted-foreground py-2">
                        Evidence tier
                      </td>
                      <td className="py-2">
                        {program.has_jir ? (
                          <span className="text-band-resilient">● Strong</span>
                        ) : (
                          <span className="text-band-moderate">● Limited</span>
                        )}
                      </td>
                    </tr>
                    <tr className="border-border border-b">
                      <td className="text-muted-foreground py-2">
                        Exposure measurement
                      </td>
                      <td className="py-2 font-mono">
                        {program.exposure !== null
                          ? `${program.exposure.toFixed(1)} AIOE`
                          : "—"}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-muted-foreground py-2">
                        Destination data
                      </td>
                      <td className="py-2">
                        {program.has_jir
                          ? "Program-level alumni destinations matched"
                          : "Awaiting destination mapping"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* What changed from v1 — method detail, collapsed by default (U7/U10) */}
        <details className="border-border mt-6 rounded-lg border">
          <summary className="text-foreground hover:bg-card-accent cursor-pointer rounded-lg px-5 py-4 text-sm font-medium">
            What changed from DFVA v1 — the composite ({program.v1_score}/36) is
            superseded; how each v1 dimension was re-treated
          </summary>
          <Card className="border-0 shadow-none">
            <CardContent className="pt-2">
              <CardLabel>Version comparison</CardLabel>
              <CardTitle className="text-lg">
                What changed from DFVA v1
              </CardTitle>
              <p className="text-muted-foreground mt-1 mb-6 text-sm">
                The v1 composite scored {program.v1_score}/36 ({program.v1_band}
                ). v2 decomposes into measured exposure and scored adaptiveness
                — never summed across evidence types.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      {(detail
                        ? [
                            "v1 Dimension",
                            "v1 Score",
                            "v2 Disposition",
                            "Rationale",
                          ]
                        : ["v1 Dimension", "v2 Disposition", "Rationale"]
                      ).map((h) => (
                        <th
                          key={h}
                          className="text-muted-foreground border-border border-b-2 px-3 py-2 text-left text-xs font-medium tracking-[0.18em] uppercase"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {detail
                      ? detail.v1Comparison.map((row) => (
                          <tr
                            key={row.dimension}
                            className="border-border border-b"
                          >
                            <td className="px-3 py-2">{row.dimension}</td>
                            <td className="px-3 py-2 font-mono">
                              {row.v1Score ?? "—"}
                            </td>
                            <td className="px-3 py-2">{row.disposition}</td>
                            <td className="text-muted-foreground px-3 py-2">
                              {row.rationale}
                            </td>
                          </tr>
                        ))
                      : v1Rows.map(([dim, disposition, rationale]) => (
                          <tr key={dim} className="border-border border-b">
                            <td className="px-3 py-2">{dim}</td>
                            <td className="px-3 py-2">{disposition}</td>
                            <td className="text-muted-foreground px-3 py-2">
                              {rationale}
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </details>

        {/* Market intelligence + redesign recommendations (generated from
            reports/dfva-market-*.md and reports/dfva-recommend-*.md; render
            nothing for programs without those reports) */}
        <ReportMarkdownCard
          slug={`dfva-market-${program.code}`}
          label="Market Intelligence"
          title="Labour-Market Intelligence"
          subtitle="Job families, hiring signals, and discussion themes for this program's destinations — from the Evidura market-intelligence pipeline"
        />
        <ReportMarkdownCard
          slug={`dfva-recommend-${program.code}`}
          label="Redesign Recommendations"
          title="Improvement Plan"
          subtitle="Score-to-action mapping and prioritised interventions — from the Evidura recommendation pipeline"
        />

        <div className="mt-6">
          <MethodGlossary
            terms={[
              "aioe",
              "destinationExposure",
              "adaptiveness",
              "gates",
              "panels",
              "medianQuadrant",
              "evidenceTier",
              "jir",
              "v1Composite",
              "qilt",
              "jsaHeo",
            ]}
          />
          <SourceReferences
            sources={[
              "jirDataset",
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
        </div>

        <div className="text-muted-foreground border-border mt-12 flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-xs">
          <span>Evidura · Durability Assessment · v2</span>
          {detail && (
            <span>
              Assessment date: {detail.assessmentDate} · Source: {detail.source}
            </span>
          )}
          <span className="flex gap-4">
            <Link to={`/insights/v31/${program.code}`} className="underline">
              Same program, current report format (v3.1)
            </Link>
            <Link to="/insights" className="underline">
              See all assessed programs (portfolio overview)
            </Link>
          </span>
        </div>
      </div>
    </InsightsGate>
  );
}
