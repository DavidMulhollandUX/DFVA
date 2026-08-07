import { Link, useParams } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../client/components/ui/card";
import { InsightsGate } from "../InsightsGate";
import { ExposureMatrix } from "./components/ExposureMatrix";
import { V2_META, V2_PROGRAMS, programByCode } from "./data/v2Programs";
import { DIMENSION_LABELS, QUADRANTS } from "./quadrants";

const X_MIN = 30;
const X_MAX = 80;

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
        <Link to="/insights" className="text-secondary-muted-foreground underline">
          Back to the portfolio matrix
        </Link>
      </div>
    );
  }

  const q = QUADRANTS[program.quadrant];
  const gaugePct =
    program.exposure !== null
      ? Math.round(
          ((program.exposure - X_MIN) / (X_MAX - X_MIN)) * 100,
        )
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
    ["D1 Automation Exposure", "→ Panel A (measured)", "Labour-market claim; moved from scoring to measurement"],
    ["D2 Systems Thinking", "→ Panel C (scored)", "Retained; evidence from handbook curriculum"],
    ["D3 Technical Depth", "→ Panel C (scored)", "Retained"],
    ["D4 Decision-making", "→ Gate (binary)", ">70% of programs use same level; gate, not measure"],
    ["D5 AI Literacy", "→ Panel C (scored)", "Retained with guardrail anchors"],
    ["D6 Domain Depth", "→ Gate (binary)", ">83% modal; gate, not measure"],
    ["D7 Research Methods", "→ Panel C (scored)", "Retained"],
    ["D8 Human/Relational", "→ Panel A (measured)", "Property of destination, not curriculum"],
    ["D9 Curriculum Currency", "→ Dropped", "Item-total correlation 0.06; unscorable from handbook"],
    ["D10 Outcome Evidence", "→ Panel D (metadata)", "Moved to evidence confidence"],
    ["B Irreplaceability", "→ Panel C (scored)", "Retained; highest v1 dimension coherence"],
  ];

  return (
    <InsightsGate>
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Hero */}
        <div className="mb-12">
          <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
            Durability Assessment · v2
          </p>
          <h1 className="text-foreground font-serif text-4xl tracking-tight">
            {program.name}
          </h1>
          <p className="text-muted-foreground mt-2 font-mono text-sm uppercase">
            {program.code} · University of Melbourne
          </p>
          <div className="mt-6 flex flex-wrap gap-8">
            <div>
              <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                Faculty
              </p>
              <p>{program.faculty}</p>
            </div>
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
            <div>
              <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                v1 Assessment
              </p>
              <p>
                {program.v1_score}/36 · {program.v1_band}
              </p>
            </div>
          </div>
        </div>

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
                    <span>
                      <strong className="text-foreground font-medium">
                        Exposure is not risk.
                      </strong>{" "}
                      This axis encodes how much of the destination work current
                      AI touches, not the direction of the effect. Per the
                      Felten et al. (2023) AI Occupational Exposure Index.
                    </span>
                  </div>
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
                      ? "bg-[#E8F5EE] text-band-resilient"
                      : "bg-[#FDE8E8] text-band-critical"
                  }`}
                >
                  D4 Decision-making {program.gate_D4 === "PASS" ? "✓" : "✗"}
                </span>
                <span
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase ${
                    program.gate_D6 === "PASS"
                      ? "bg-[#E8F5EE] text-band-resilient"
                      : "bg-[#FDE8E8] text-band-critical"
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
                      v1 composite (superseded)
                    </td>
                    <td className="py-2 font-mono">
                      {program.v1_score}/36 · {program.v1_band}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* What changed from v1 */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <CardLabel>Version comparison</CardLabel>
            <CardTitle className="text-lg">What changed from DFVA v1</CardTitle>
            <p className="text-muted-foreground mt-1 mb-6 text-sm">
              The v1 composite scored {program.v1_score}/36 ({program.v1_band}).
              v2 decomposes into measured exposure and scored adaptiveness —
              never summed across evidence types.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    {["v1 Dimension", "v2 Disposition", "Rationale"].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-muted-foreground border-border border-b-2 px-3 py-2 text-left text-xs font-medium tracking-[0.18em] uppercase"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {v1Rows.map(([dim, disposition, rationale]) => (
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

        <div className="text-muted-foreground border-border mt-12 flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-xs">
          <span>Evidura · Durability Assessment · v2</span>
          <Link to="/insights" className="underline">
            ← Back to the portfolio matrix
          </Link>
        </div>
      </div>
    </InsightsGate>
  );
}
