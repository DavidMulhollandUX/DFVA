import { Link, useParams } from "react-router";
import { Card, CardContent, CardTitle } from "../../client/components/ui/card";
import { InsightsGate } from "../InsightsGate";
import { MatrixAreaLabels } from "../matrixAreaLabels";
import { ReportMarkdownCard } from "../v2/components/ReportMarkdownCard";
import { QUADRANTS } from "../v2/quadrants";
import { V3_META, V3_PROGRAMS, v3ProgramByCode, type V3Program } from "../v3/data/v3Programs";
import {
  V4_GATES,
  V4_INSTRUMENT,
  V4_REFERENCES,
  V4_RUBRIC,
  type V4RubricItem,
} from "./data/v4Rubric";
import { v4PanelCByCode, type V4ItemResult, type V4PanelC } from "./data/v4PanelC";

const X_MIN = 60;
const X_MAX = 100;

/** v4 has no quadrant until the migration cycle re-bases the medians, so the
 * program dot is deliberately neutral — no quadrant colour may be implied. */
const NEUTRAL_DOT = "#6B7280";

const ITEM_IDS = ["C1", "C2", "C3", "C4", "C5"] as const;

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

function RefMarks({ refs }: { refs: number[] }) {
  return (
    <span className="text-secondary-muted-foreground font-mono text-xs">
      {refs.map((n) => `[${n}]`).join("")}
    </span>
  );
}

function DimBar({ label, score }: { label: string; score: number }) {
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
      <div className="w-7 shrink-0 text-right font-mono text-base font-semibold">{score}</div>
    </div>
  );
}

/** One v4 item as an expandable row: score bar, then the published anchors
 * (awarded level highlighted), the rater's rationale, and the verbatim
 * handbook evidence lines behind the score. Same stacked layout as the v3.1
 * RatedDimension so it reads on a phone. */
function RatedV4Item({ item, result }: { item: V4RubricItem; result: V4ItemResult }) {
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
          {item.id} · {item.name} <RefMarks refs={item.refs} />
        </p>
        <p className="text-muted-foreground mt-1 text-xs italic">{item.construct}</p>
        <p className="text-muted-foreground mt-3 mb-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase">
          How the levels are anchored
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
                      ← this program
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ol>
        <p className="text-muted-foreground mt-3 mb-1 text-[10px] font-semibold tracking-[0.18em] uppercase">
          Why this level and not the one above
        </p>
        <p className="text-foreground text-sm leading-relaxed">{result.rationale}</p>
        <p className="text-muted-foreground mt-3 mb-1 text-[10px] font-semibold tracking-[0.18em] uppercase">
          Handbook evidence (verbatim)
        </p>
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
      </div>
    </details>
  );
}

/** The exposure–adaptiveness plane with the v3.1 reference portfolio faded for
 * context. The medians are the v3.1 reference values — drawn for orientation
 * only, since v4 medians do not exist until the migration cycle. */
function V4MiniMatrix({
  program,
  adaptiveness,
  envelope,
}: {
  program: V3Program;
  adaptiveness: number;
  envelope: [number, number];
}) {
  const W = 360,
    H = 300,
    PAD = 34;
  const x = (e: number) => PAD + ((e - X_MIN) / (X_MAX - X_MIN)) * (W - 2 * PAD);
  const y = (a: number) => H - PAD - (a / 15) * (H - 2 * PAD);
  const mx = x(V3_META.expMedian);
  const my = y(V3_META.adaptMedian);
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label="Exposure–adaptiveness plane with the v4 draft score; v3.1 reference medians shown for context only"
    >
      <rect
        x={PAD}
        y={PAD}
        width={W - 2 * PAD}
        height={H - 2 * PAD}
        fill="none"
        stroke="var(--color-border)"
      />
      <line x1={mx} y1={PAD} x2={mx} y2={H - PAD} stroke="var(--color-border)" strokeDasharray="4 3" />
      <line x1={PAD} y1={my} x2={W - PAD} y2={my} stroke="var(--color-border)" strokeDasharray="4 3" />
      <MatrixAreaLabels left={PAD} right={W - PAD} top={PAD} bottom={H - PAD} />
      {V3_PROGRAMS.filter((p) => p.code !== program.code).map((p) => (
        <circle
          key={p.code}
          cx={x(p.exposure)}
          cy={y(p.adaptiveness)}
          r={3.5}
          fill={QUADRANTS[p.quadrant].hex}
          opacity={0.14}
        />
      ))}
      <line
        x1={x(program.exposure)}
        y1={y(envelope[0])}
        x2={x(program.exposure)}
        y2={y(envelope[1])}
        stroke={NEUTRAL_DOT}
        strokeWidth={2}
        opacity={0.45}
      />
      <circle
        cx={x(program.exposure)}
        cy={y(adaptiveness)}
        r={7}
        fill={NEUTRAL_DOT}
        stroke="var(--color-background)"
        strokeWidth={2}
      />
      <text x={PAD} y={H - 8} fontSize={10} fill="var(--color-muted-foreground)">
        {X_MIN}
      </text>
      <text x={W - PAD} y={H - 8} fontSize={10} textAnchor="end" fill="var(--color-muted-foreground)">
        {X_MAX}
      </text>
      <text x={W / 2} y={H - 8} fontSize={10} textAnchor="middle" fill="var(--color-muted-foreground)">
        Destination AI exposure (Felten AIOE)
      </text>
      <text
        x={10}
        y={H / 2}
        fontSize={10}
        fill="var(--color-muted-foreground)"
        transform={`rotate(-90 10 ${H / 2})`}
        textAnchor="middle"
      >
        Adaptiveness /15 (v4 draft)
      </text>
    </svg>
  );
}

export default function V4ReportPage() {
  const { code } = useParams<{ code: string }>();
  const program = code ? v3ProgramByCode(code) : undefined;
  const panelC: V4PanelC | undefined = code ? v4PanelCByCode(code) : undefined;

  if (!program || !panelC) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-foreground mb-3 font-serif text-3xl">No v4 draft assessment</h1>
        <p className="text-muted-foreground mb-6">
          No Panel C v4 scoring exists for “{code}” — v4 is a working-draft instrument and has
          been piloted on selected programs only.
        </p>
        <Link to="/insights" className="text-secondary-muted-foreground underline">
          Back to the portfolio overview
        </Link>
      </div>
    );
  }

  const scores = ITEM_IDS.map((id) => panelC[id].score);
  // Exact reachable envelope under ±1 rating error, clamped at the 0–3 bounds.
  const envelope: [number, number] = [
    panelC.adaptiveness - scores.filter((s) => s > 0).length,
    panelC.adaptiveness + scores.filter((s) => s < 3).length,
  ];
  const itemsAtCeiling = scores.filter((s) => s === 3).length;

  return (
    <InsightsGate>
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Hero */}
        <div className="mb-8">
          <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
            Durability Assessment · Panel C v4 pilot
          </p>
          <h1 className="text-foreground font-serif text-4xl tracking-tight">{program.name}</h1>
          <p className="text-muted-foreground mt-2 font-mono text-sm uppercase">
            {program.code} · University of Melbourne · {program.faculty}
          </p>
          <nav className="text-muted-foreground mt-5 flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <span className="text-foreground font-medium">In this report:</span>
            <a href="#finding" className="underline">Part A — The finding</a>
            <a href="#market" className="underline">Part B — Market evidence &amp; implications</a>
            <a href="#method" className="underline">Part C — Method, instrument &amp; references</a>
          </nav>
        </div>

        {/* ================= PART A — THE FINDING ================= */}
        <PartHeading id="finding" part="Part A" title="The finding" />

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="bg-card-accent text-muted-foreground mb-5 flex items-start gap-2 rounded-md p-3 text-sm">
              <span className="text-foreground text-xs font-semibold tracking-wide uppercase">
                Draft instrument
              </span>
              <span data-testid="v4-draft-notice">
                Panel C v4 re-anchors Curriculum Adaptiveness on the four{" "}
                <strong className="text-foreground font-medium">
                  TEQSA adaptive capabilities
                </strong>{" "}
                (Lodge et al., 2026 [1]) and is the adopted working draft, piloted on this
                program. Its adaptiveness score is{" "}
                <strong className="text-foreground font-medium">not comparable</strong> to the
                published v3.1 value, and no position label exists until the v4 migration cycle
                re-bases the portfolio medians. The published v3.1 assessment remains the
                instrument of record:{" "}
                <Link to={`/insights/v31/${program.code}`} className="underline">
                  same program on v3.1
                </Link>
                .
              </span>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <CardLabel>The finding</CardLabel>
                <p className="text-foreground text-base leading-relaxed" data-testid="finding-block">
                  Scored on the v4 draft instrument, this program's curriculum adaptiveness is{" "}
                  {panelC.adaptiveness}/15 with both gates held: a strong disciplinary foundation
                  and assessed collaborative, appraisal and inquiry practice, but no documented
                  AI-era capability — no assessment addresses AI capabilities and limits (C3 at{" "}
                  {panelC.C3.score}/3), documents reliance decisions on machine-assisted work, or
                  coordinates human–AI teamwork.
                </p>
              </div>
              <div>
                <CardLabel>What this does and does not mean</CardLabel>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  The score describes what the 2026 handbook documents and assesses — curriculum
                  intent, not demonstrated graduate capability. Every score cites verbatim
                  handbook evidence (expand the items below), a capability stated only in
                  learning outcomes is capped at level 1, and ambiguity resolves downward, so
                  these scores are conservative by construction.
                </p>
              </div>
              <div>
                <CardLabel>How firm is this</CardLabel>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  This is a single-rater pilot of a draft instrument: the scoring passed an
                  adversarial refutation pass and a verbatim evidence check
                  {panelC.verified ? ` (${panelC.verified.date})` : ""}, but no inter-rater study
                  has been run on v4 and the content-validity panel is still ahead.{" "}
                  <a href="#method" className="text-secondary-muted-foreground underline">
                    What exists and what doesn't: Part C.
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Position card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <CardLabel>Position · coordinates only</CardLabel>
            <div className="grid gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
                  <div>
                    <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                      Exposure (AIOE)
                    </p>
                    <p className="font-mono text-4xl font-semibold" data-testid="v4-exposure">
                      {program.exposure.toFixed(2)}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      measured · v3.1 reference median {V3_META.expMedian}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                      Adaptiveness (v4 draft)
                    </p>
                    <p className="font-mono text-4xl font-semibold" data-testid="v4-adaptiveness">
                      {panelC.adaptiveness}
                      <span className="text-muted-foreground text-lg">/15</span>
                    </p>
                    <p className="text-muted-foreground text-xs">
                      under ±1 rating error the score could reach {envelope[0]}–{envelope[1]}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                      Position
                    </p>
                    <span
                      className="bg-muted text-muted-foreground mt-1 inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold"
                      data-testid="v4-position-chip"
                    >
                      Pending the v4 migration cycle
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4 text-sm">
                  Exposure is instrument-independent and stands as measured on the program's own
                  alumni destination record (n = {program.jirN}, {program.nTitles} titles).
                  Quadrant assignment needs v4 portfolio medians, which do not exist until the
                  portfolio is re-scored — publishing a label against v3.1 medians would mix
                  instruments. The dashed lines in the figure are the{" "}
                  <strong className="text-foreground font-medium">v3.1 reference medians</strong>,
                  drawn for orientation only.
                </p>
                <div className="bg-card-accent text-muted-foreground mt-4 flex items-start gap-2 rounded-md p-3 text-sm">
                  <span className="text-base">⚠</span>
                  <span>
                    <strong className="text-foreground font-medium">
                      No item sits at its ceiling ({itemsAtCeiling}/5 at 3/3).
                    </strong>{" "}
                    Unlike v3.1, where 31% of scored items sat at ceiling and could only be
                    perturbed downward, this program's v4 scores can move in both directions —
                    the anchors were deliberately written so that level 3 requires assessment
                    evidence and stays rare.
                  </span>
                </div>
              </div>
              <div className="w-full max-w-sm md:w-80">
                <V4MiniMatrix
                  program={program}
                  adaptiveness={panelC.adaptiveness}
                  envelope={envelope}
                />
                <p className="text-muted-foreground mt-1 text-xs">
                  Grey dot: this program on the v4 draft score (no quadrant colour is implied).
                  Faded dots: the v3.1 reference portfolio, for context.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Panel C v4 — the scored axis */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <CardLabel>Curriculum Adaptiveness — Panel C v4</CardLabel>
            <CardTitle className="text-lg">
              The four adaptive capabilities, plus inquiry
            </CardTitle>
            <p className="text-muted-foreground mt-1 mb-6 text-sm">
              Five items anchored on the TEQSA adaptive capabilities [1], scored 0–3 from 2026
              handbook evidence. Tap an item to see the construct, the level anchors, the
              rater's reasoning, and the verbatim handbook lines behind the score. Level 3
              always requires <em>assessment</em> evidence — outcomes-only claims cap at 1.
            </p>
            <div className="flex flex-col gap-3">
              {V4_RUBRIC.map((item) => (
                <RatedV4Item
                  key={item.id}
                  item={item}
                  result={panelC[item.id as (typeof ITEM_IDS)[number]]}
                />
              ))}
            </div>
            <div className="border-border mt-4 flex items-center justify-between border-t pt-4">
              <span className="text-muted-foreground text-sm">Total adaptiveness (v4 draft)</span>
              <span className="font-mono text-xl font-semibold">
                {panelC.adaptiveness}
                <span className="text-muted-foreground text-sm"> / 15</span>
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {V4_GATES.map((gate) => {
                const result = panelC.gates[gate.id as "G1" | "G2"].result;
                return (
                  <span
                    key={gate.id}
                    title={panelC.gates[gate.id as "G1" | "G2"].rationale}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase ${
                      result === "PASS"
                        ? "bg-[#E8F5EE] text-band-resilient"
                        : "bg-[#FDE8E8] text-band-critical"
                    }`}
                  >
                    {gate.id} {gate.name} {result === "PASS" ? "✓" : "✗"}
                  </span>
                );
              })}
            </div>
            <p className="text-muted-foreground mt-3 text-xs">
              Gates are preconditions, not adaptiveness: G1 holds disciplinary depth (which TEQSA
              places <em>under</em> the capabilities, not among them [1]), G2 holds
              decision-making under uncertainty. The v3.1 Irreplaceability bonus is retired in
              v4.
            </p>
          </CardContent>
        </Card>

        {/* ================= PART B — MARKET EVIDENCE ================= */}
        <PartHeading id="market" part="Part B" title="Market evidence & implications" />
        <p className="text-muted-foreground mb-5 text-sm">
          The market evidence is instrument-independent and carries over unchanged; confidence is
          stated on each section. Curriculum implications keyed to the v4 items are in the{" "}
          <Link to={`/reports/dfva-v4-${program.code}`} className="underline">
            full v4 report
          </Link>{" "}
          (§5, marked as interpretation).
        </p>

        <ReportMarkdownCard
          slug={`dfva-market-${program.code}`}
          label="Market Intelligence"
          title="Labour-Market Intelligence"
          subtitle="Job families, hiring signals, and skill shifts for this program's destinations — confidence level stated per section"
        />

        {/* ================= PART C — METHOD ================= */}
        <PartHeading id="method" part="Part C" title="Method, instrument & references" />
        <p className="text-muted-foreground mb-5 text-sm">
          What this pilot rests on, stated plainly: a draft instrument with an authoritative
          construct behind it, a verified single-rater scoring, and a validation program that is
          specified but not yet run.
        </p>

        <MethodDetails summary="The instrument — why Panel C was re-anchored, and on what">
          <Card className="border-0 shadow-none">
            <CardContent className="pt-4">
              <p className="text-muted-foreground mb-3 text-sm">
                v3.1's five items (D2, D3, D7, B, D5) defined adaptiveness by their own anchors,
                with no external referent — the construct-underrepresentation critique published
                by Woods, Lyons et al. [18]. v4 adopts the regulator-commissioned definition of{" "}
                <em>adaptive capabilities</em> (Lodge et al., 2026 [1]): digital literacy,
                distributed cognition, hybrid metacognition and life-long learning, built on deep
                disciplinary knowledge. C1–C4 map those four; C5 retains inquiry; disciplinary
                depth moves to gate G1 (per Deming &amp; Noray [6], technical depth is a
                precondition whose premium decays, not adaptiveness evidence); the
                Irreplaceability bonus is retired as a halo item.
              </p>
              <p className="text-muted-foreground text-sm">
                Anchors are declarative statements about documented curriculum evidence (the
                Brynjolfsson–Mitchell–Rock SML form [8]); level 3 requires assessment evidence;
                every score cites verbatim handbook lines; ambiguity resolves down. Full
                derivation:{" "}
                <span className="font-mono text-xs">docs/dfva-panelc-v4-recommendation.md</span>{" "}
                and the literature review beside it.
              </p>
            </CardContent>
          </Card>
        </MethodDetails>

        <MethodDetails
          summary={`Scoring integrity — adversarial + verbatim verification passed${panelC.verified ? ` (${panelC.verified.date})` : ""}; ${panelC.ambiguities.length} recorded ambiguit${panelC.ambiguities.length === 1 ? "y" : "ies"}`}
        >
          <Card className="border-0 shadow-none">
            <CardContent className="pt-4">
              <p className="text-muted-foreground mb-3 text-sm">
                Every evidence line shown on this page was mechanically verified to appear
                verbatim in the scraped 2026 handbook extract (20 pages: course, structure,
                attributes, all six compulsory subjects and two capstone routes with their
                assessment pages), and every level-boundary judgement passed an adversarial
                refutation pass. The judgements that straddled two levels are recorded, not
                hidden:
              </p>
              <ul className="text-muted-foreground flex flex-col gap-2 text-sm">
                {panelC.ambiguities.map((a) => (
                  <li key={a} className="border-secondary border-l-2 pl-3">
                    {a}
                  </li>
                ))}
                {panelC.notScoreable.map((n) => (
                  <li key={n} className="border-border border-l-2 pl-3">
                    <span className="text-foreground text-xs font-semibold uppercase">
                      Not in extract:
                    </span>{" "}
                    {n}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </MethodDetails>

        <MethodDetails summary="What does not exist yet — the validation program is specified, not run">
          <Card className="border-0 shadow-none">
            <CardContent className="pt-4">
              <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-sm">
                <li>
                  <strong className="text-foreground font-medium">No v4 medians or stability layer.</strong>{" "}
                  Position labels, quadrant probabilities and stability classes require the
                  portfolio re-scored on v4 — a published migration cycle with a v3.1 → v4 table,
                  not an in-place edit.
                </li>
                <li>
                  <strong className="text-foreground font-medium">No inter-rater study on v4.</strong>{" "}
                  The R1–R5 protocol targets the v4 items by decision of 2026-08-13; until it
                  runs, these scores are a single-rater application.
                </li>
                <li>
                  <strong className="text-foreground font-medium">No content-validity panel yet.</strong>{" "}
                  CVI panel + crosswalk to CEPH / WHO-ASPHER / AMIA frameworks is the specified
                  next step (Kane's argument-based frame [17]).
                </li>
                <li>
                  <strong className="text-foreground font-medium">Declared scope limits.</strong>{" "}
                  Scores describe documented curriculum intent (the constructive-alignment
                  warrant is an assumption); Indigenous data governance is not a distinct
                  construct (counted under C3 level 3 where taught [2]); perception/manipulation
                  [7] is unscored.
                </li>
              </ul>
            </CardContent>
          </Card>
        </MethodDetails>

        <MethodDetails summary={`References — the literature the instrument is anchored on (${V4_REFERENCES.length} sources)`}>
          <Card className="border-0 shadow-none">
            <CardContent className="pt-4">
              <ol className="text-muted-foreground flex flex-col gap-2 text-sm">
                {V4_REFERENCES.map((r) => (
                  <li key={r.n} className="flex gap-2">
                    <span className="text-foreground shrink-0 font-mono text-xs font-semibold">
                      [{r.n}]
                    </span>
                    <span>
                      {r.citation}
                      {r.url && (
                        <>
                          {" "}
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary-muted-foreground underline"
                          >
                            {r.url.replace(/^https?:\/\//, "").split("/")[0]}
                          </a>
                        </>
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </MethodDetails>

        {/* Footer */}
        <div className="text-muted-foreground border-border mt-12 flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-xs">
          <span>
            Evidura · Durability Assessment · Panel C {V4_INSTRUMENT} pilot · single-rater,
            verified scoring
          </span>
          <span className="flex gap-4">
            <Link to={`/insights/v31/${program.code}`} className="underline">
              Same program, published instrument (v3.1)
            </Link>
            <Link to={`/reports/dfva-v4-${program.code}`} className="underline">
              Full v4 report (markdown)
            </Link>
            <Link to="/insights" className="underline">
              See all assessed programs
            </Link>
          </span>
        </div>
      </div>
    </InsightsGate>
  );
}
