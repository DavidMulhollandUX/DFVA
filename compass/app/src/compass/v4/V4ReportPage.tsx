import { Link, useParams } from "react-router";
import { Card, CardContent, CardTitle } from "../../client/components/ui/card";
import { InsightsGate } from "../InsightsGate";
import { MatrixAreaLabels } from "../matrixAreaLabels";
import { ReportMarkdownCard } from "../v2/components/ReportMarkdownCard";
import { QUADRANTS } from "../v2/quadrants";
import {
  V3_META,
  V3_PROGRAMS,
  v3ProgramByCode,
  type V3Program,
} from "../v3/data/v3Programs";
import {
  V4_ADAPTIVENESS_MAX,
  V4_GATES,
  V4_INSTRUMENT,
  V4_REFERENCES,
  V4_RUBRIC,
  V4_WORKPLACE_MAX,
  type V4RubricItem,
} from "./data/v4Rubric";
import {
  V4_META,
  v4PanelCByCode,
  type V4ItemResult,
  type V4PanelC,
} from "./data/v4PanelC";
import { Cite, HowThisRubricWorksDialog } from "./HowThisRubricWorksDialog";

const X_MIN = 60;
const X_MAX = 100;

/** v4 has no quadrant until the migration cycle re-bases the medians, so the
 * program dot is deliberately neutral — no quadrant colour may be implied. */
const NEUTRAL_DOT = "#6B7280";

const ITEM_IDS = ["C1", "C2", "C3", "C4", "C5"] as const;

const QUADRANT_LABELS = {
  "well-positioned": "High exposure · high adaptiveness",
  comfortable: "Low exposure · high adaptiveness",
  attention: "High exposure · low adaptiveness",
  sheltered: "Low exposure · low adaptiveness",
} as const;

type Quadrant = keyof typeof QUADRANT_LABELS;

/**
 * The v3 quadrant rule, restated on the v4 medians: exposure strictly above
 * its median, adaptiveness at or above its median. Returns null while the
 * migration cycle is incomplete — no v4 median exists, so no label may be
 * shown. (The exposure median is inherited; v4 does not touch Panel A.)
 */
function v4Quadrant(exposure: number, adaptiveness: number): Quadrant | null {
  if (!V4_META.complete || V4_META.adaptMedian === null) return null;
  const highExp = exposure > V4_META.expMedian;
  const highAdapt = adaptiveness >= V4_META.adaptMedian;
  if (highExp) return highAdapt ? "well-positioned" : "attention";
  return highAdapt ? "comfortable" : "sheltered";
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-muted-foreground mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase">
      <span className="bg-secondary block h-3.5 w-0.5 rounded-full" />
      {children}
    </div>
  );
}

function PartHeading({
  id,
  part,
  title,
}: {
  id: string;
  part: string;
  title: string;
}) {
  return (
    <div id={id} className="mt-14 mb-6 scroll-mt-6">
      <p className="text-secondary-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
        {part}
      </p>
      <h2 className="text-foreground font-serif text-2xl tracking-tight">
        {title}
      </h2>
    </div>
  );
}

function MethodDetails({
  summary,
  children,
}: {
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <details className="border-border mb-4 rounded-lg border">
      <summary className="text-foreground hover:bg-card-accent cursor-pointer rounded-lg px-5 py-4 text-sm font-medium">
        {summary}
      </summary>
      <div className="px-2 pb-2">{children}</div>
    </details>
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
      <div className="w-7 shrink-0 text-right font-mono text-base font-semibold">
        {score}
      </div>
    </div>
  );
}

/** One v4 item as an expandable row: score bar, then the published anchors
 * (awarded level highlighted), the rater's rationale, and the verbatim
 * handbook evidence lines behind the score. Same stacked layout as the v3.1
 * RatedDimension so it reads on a phone. */
function RatedV4Item({
  item,
  result,
}: {
  item: V4RubricItem;
  result: V4ItemResult;
}) {
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
          {item.id} · {item.name} <Cite refs={item.refs} />
        </p>
        <p className="text-muted-foreground mt-1 text-xs italic">
          {item.construct}
        </p>
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
        <p className="text-foreground text-sm leading-relaxed">
          {result.rationale}
        </p>
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
  const x = (e: number) =>
    PAD + ((e - X_MIN) / (X_MAX - X_MIN)) * (W - 2 * PAD);
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
      <line
        x1={mx}
        y1={PAD}
        x2={mx}
        y2={H - PAD}
        stroke="var(--color-border)"
        strokeDasharray="4 3"
      />
      <line
        x1={PAD}
        y1={my}
        x2={W - PAD}
        y2={my}
        stroke="var(--color-border)"
        strokeDasharray="4 3"
      />
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
      <text
        x={PAD}
        y={H - 8}
        fontSize={10}
        fill="var(--color-muted-foreground)"
      >
        {X_MIN}
      </text>
      <text
        x={W - PAD}
        y={H - 8}
        fontSize={10}
        textAnchor="end"
        fill="var(--color-muted-foreground)"
      >
        {X_MAX}
      </text>
      <text
        x={W / 2}
        y={H - 8}
        fontSize={10}
        textAnchor="middle"
        fill="var(--color-muted-foreground)"
      >
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
        <h1 className="text-foreground mb-3 font-serif text-3xl">
          No v4 draft assessment
        </h1>
        <p className="text-muted-foreground mb-6">
          No Panel C v4 scoring exists for “{code}” — v4 is a working-draft
          instrument and has been piloted on selected programs only.
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

  const scores = ITEM_IDS.map((id) => panelC[id].score);
  // Exact reachable envelope under ±1 rating error, clamped at the 0–3 bounds.
  const envelope: [number, number] = [
    panelC.adaptiveness - scores.filter((s) => s > 0).length,
    panelC.adaptiveness + scores.filter((s) => s < 3).length,
  ];
  const itemsAtCeiling = scores.filter((s) => s === 3).length;
  const position = v4Quadrant(program.exposure, panelC.adaptiveness);
  // v4.1 added W1–W3; a program scored on 4.0-draft has none of them.
  const workplaceScored =
    typeof panelC.workplace === "number" &&
    Boolean(panelC.W1 && panelC.W2 && panelC.W3);

  return (
    <InsightsGate>
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Hero */}
        <div className="mb-8">
          <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
            Durability Assessment · Panel C v4 pilot
          </p>
          <h1 className="text-foreground font-serif text-4xl tracking-tight">
            {program.name}
          </h1>
          <p className="text-muted-foreground mt-2 font-mono text-sm uppercase">
            {program.code} · University of Melbourne · {program.faculty}
          </p>
          <nav className="text-muted-foreground mt-5 flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <span className="text-foreground font-medium">In this report:</span>
            <a href="#finding" className="underline">
              Part A — The finding
            </a>
            <a href="#market" className="underline">
              Part B — Market evidence &amp; improvement plan
            </a>
            <a href="#method" className="underline">
              Part C — Method, instrument &amp; references
            </a>
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
                Panel C v4 anchors Curriculum Adaptiveness on the four adaptive
                capabilities defined in guidance commissioned by TEQSA (Lodge et
                al., 2026
                <Cite refs={[1]} />
                ). It is a working-draft instrument, applied here as a pilot.
                The adaptiveness score is not comparable with the published v3.1
                value, and no position label is reported until v4 portfolio
                medians exist. The v3.1 assessment remains the assessment of
                record:{" "}
                <Link
                  to={`/insights/v31/${program.code}`}
                  className="underline"
                >
                  same program on v3.1
                </Link>
                .
              </span>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <CardLabel>The finding</CardLabel>
                <p
                  className="text-foreground text-base leading-relaxed"
                  data-testid="finding-block"
                >
                  On the v4 draft instrument this program scores{" "}
                  {panelC.adaptiveness}/15 for curriculum adaptiveness, with
                  both gates passed. The documented curriculum shows a sound
                  disciplinary foundation and assessed collaborative, appraisal
                  and inquiry work. It does not document capability specific to
                  AI-mediated work: no assessment addresses AI capabilities and
                  limitations (C3 scores {panelC.C3.score}/3), requires
                  justified reliance decisions on machine-assisted work, or
                  involves coordination between people and AI tools.
                </p>
              </div>
              <div>
                <CardLabel>What this does and does not mean</CardLabel>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  The score describes what the 2026 handbook documents and
                  assesses; it is a measure of curriculum intent, not of
                  demonstrated graduate capability. Each score cites handbook
                  passages verbatim (the items below can be expanded to show
                  them), a capability stated only in learning outcomes is scored
                  at level 1, and ambiguous evidence is resolved to the lower
                  level.
                </p>
              </div>
              <div>
                <CardLabel>How firm is this</CardLabel>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  This is a single-rater pilot of a draft instrument. The
                  scoring was reviewed adversarially and its quoted evidence
                  verified against the source text
                  {panelC.verified ? ` (${panelC.verified.date})` : ""}; no
                  inter-rater study has yet been conducted on v4, and the
                  content-validity panel has not yet been convened.{" "}
                  <a
                    href="#method"
                    className="text-secondary-muted-foreground underline"
                  >
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
                    <p
                      className="font-mono text-4xl font-semibold"
                      data-testid="v4-exposure"
                    >
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
                    <p
                      className="font-mono text-4xl font-semibold"
                      data-testid="v4-adaptiveness"
                    >
                      {panelC.adaptiveness}
                      <span className="text-muted-foreground text-lg">/15</span>
                    </p>
                    <p className="text-muted-foreground text-xs">
                      under ±1 rating error the score could reach {envelope[0]}–
                      {envelope[1]}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                      Position
                    </p>
                    {position ? (
                      <span
                        className={`mt-1 inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold ${QUADRANTS[position].badgeClass}`}
                        data-testid="v4-position-chip"
                      >
                        {QUADRANT_LABELS[position]}
                      </span>
                    ) : (
                      <span
                        className="bg-muted text-muted-foreground mt-1 inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold"
                        data-testid="v4-position-chip"
                      >
                        No peer comparison yet — {V4_META.scored} of{" "}
                        {V4_META.cohortSize} programs re-scored
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground mt-4 text-sm">
                  The exposure value is independent of the scoring instrument
                  and is measured on the program's own alumni destination record
                  (n = {program.jirN}, {program.nTitles} titles).{" "}
                  {position ? (
                    <>
                      The position is assigned against the v4 medians (exposure{" "}
                      {V4_META.expMedian}, adaptiveness {V4_META.adaptMedian}),
                      computed from all {V4_META.cohortSize} reference-cohort
                      programs re-scored on this instrument.
                    </>
                  ) : (
                    <>
                      A position label states where a program sits relative to
                      its peers, so it requires a v4 adaptiveness median — and
                      that median only exists once all {V4_META.cohortSize}{" "}
                      reference-cohort programs have been re-scored on this
                      instrument ({V4_META.scored} done). Comparing a v4 score
                      against the v3.1 median would rank it against a different
                      instrument, so the label is withheld rather than
                      estimated. The dashed lines in the figure are the v3.1
                      medians, drawn for orientation only.
                    </>
                  )}
                </p>
                <div className="bg-card-accent text-muted-foreground mt-4 flex items-start gap-2 rounded-md p-3 text-sm">
                  <span className="text-base">⚠</span>
                  <span>
                    <strong className="text-foreground font-medium">
                      {itemsAtCeiling} of 5 items score the maximum (3/3).
                    </strong>{" "}
                    In v3.1, 31 per cent of scored items sat at the maximum and
                    could only be perturbed downward. Under v4 this program's
                    scores can move in either direction; the anchors require
                    assessment evidence at level 3, which is expected to keep
                    the maximum uncommon.
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
                  The grey point is this program on the v4 draft score; no
                  quadrant is implied. The faded points are the v3.1 reference
                  portfolio, shown for context.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Panel C v4 — the scored axis */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <CardLabel>Panel C v4.1 — two sub-scales</CardLabel>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CardTitle className="text-lg">
                Adaptive capabilities: the four TEQSA capabilities, plus inquiry
              </CardTitle>
              <HowThisRubricWorksDialog />
            </div>
            <p className="text-muted-foreground mt-1 mb-6 text-sm">
              Five items anchored on the TEQSA adaptive capabilities
              <Cite refs={[1]} />, scored 0–3 from 2026 handbook evidence — what
              makes a graduate durable as AI takes over tasks. Each item can be
              expanded to show the construct, the level anchors, the reasoning
              for the score, and the handbook passages quoted verbatim. Level 3
              requires assessment evidence; a capability stated only in learning
              outcomes is scored at level 1.
            </p>
            <div className="flex flex-col gap-3">
              {V4_RUBRIC.filter((item) => item.subscale === "adaptive").map(
                (item) => (
                  <RatedV4Item
                    key={item.id}
                    item={item}
                    result={panelC[item.id as (typeof ITEM_IDS)[number]]}
                  />
                ),
              )}
            </div>
            <div className="border-border mt-4 flex items-center justify-between border-t pt-4">
              <span className="text-muted-foreground text-sm">
                Total adaptiveness (v4 draft)
              </span>
              <span className="font-mono text-xl font-semibold">
                {panelC.adaptiveness}
                <span className="text-muted-foreground text-sm">
                  {" "}
                  / {V4_ADAPTIVENESS_MAX}
                </span>
              </span>
            </div>

            {/* Sub-scale W — added in v4.1. Programs scored under 4.0-draft carry
                no W items; they are re-scored, never back-filled, so the block
                states its own absence rather than rendering empty rows. */}
            <div className="border-border mt-8 border-t pt-6">
              <CardTitle className="text-lg">Workplace practice</CardTitle>
              <p className="text-muted-foreground mt-1 mb-6 text-sm">
                Three items covering what makes a graduate effective in any
                workplace, including AI-integrated ones: professional
                communication and conduct, authentic task design, and
                work-situated learning. Anchored on the Higher Education
                Standards Framework 2021
                <Cite refs={[19]} />, the national Employer Satisfaction Survey
                domains
                <Cite refs={[20]} />, and the authentic-assessment and
                work-integrated-learning literatures
                <Cite refs={[22, 23, 27]} />. Reported beside the adaptiveness
                score, never added to it.
              </p>
              {workplaceScored ? (
                <>
                  <div className="flex flex-col gap-3">
                    {V4_RUBRIC.filter(
                      (item) => item.subscale === "workplace",
                    ).map((item) => (
                      <RatedV4Item
                        key={item.id}
                        item={item}
                        result={panelC[item.id as "W1" | "W2" | "W3"]!}
                      />
                    ))}
                  </div>
                  <div className="border-border mt-4 flex items-center justify-between border-t pt-4">
                    <span className="text-muted-foreground text-sm">
                      Total workplace practice (v4.1 draft)
                    </span>
                    <span className="font-mono text-xl font-semibold">
                      {panelC.workplace}
                      <span className="text-muted-foreground text-sm">
                        {" "}
                        / {V4_WORKPLACE_MAX}
                      </span>
                    </span>
                  </div>
                </>
              ) : (
                <p
                  className="bg-card-accent text-muted-foreground rounded-md p-3 text-sm"
                  data-testid="v4-workplace-pending"
                >
                  Not yet scored. This program was assessed on the 4.0-draft
                  instrument, which had no workplace sub-scale. The W items
                  require their own handbook evidence and are scored in a
                  re-run, not inferred from the existing scores.
                </p>
              )}
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
                        ? "text-band-resilient bg-[#E8F5EE]"
                        : "text-band-critical bg-[#FDE8E8]"
                    }`}
                  >
                    {gate.id} {gate.name} {result === "PASS" ? "✓" : "✗"}
                  </span>
                );
              })}
            </div>
            <p className="text-muted-foreground mt-3 text-xs">
              The gates record preconditions rather than adaptiveness: G1 covers
              disciplinary depth, which the TEQSA framework places beneath the
              capabilities rather than among them
              <Cite refs={[1]} />, and G2 covers decision-making under
              uncertainty. The Irreplaceability item used in v3.1 has been
              removed in v4.
            </p>
          </CardContent>
        </Card>

        {/* ================= PART B — MARKET EVIDENCE ================= */}
        <PartHeading
          id="market"
          part="Part B"
          title="Market evidence & improvement plan"
        />
        <p className="text-muted-foreground mb-5 text-sm">
          The market evidence is independent of the scoring instrument and
          carries over unchanged; confidence levels are stated on each section.
          The improvement plan that follows is derived from two inputs, the
          verified Panel C v4 scoring in Part A and this market evidence. Each
          intervention addresses a named item's next anchor level and cites its
          sources (<Cite refs={[1]} />; the citation marks in each entry link to
          the source).
        </p>

        <ReportMarkdownCard
          slug={`dfva-market-${program.code}`}
          label="Market Intelligence"
          title="Labour-Market Intelligence"
          subtitle="Job families, hiring signals, and skill shifts for this program's destinations — confidence level stated per section"
        />
        <div id="plan" className="scroll-mt-6">
          <ReportMarkdownCard
            slug={`dfva-v4-recommend-${program.code}`}
            label="Redesign Recommendations · v4"
            title="Improvement Plan (Panel C v4)"
            subtitle="Anchor-referenced interventions derived from the v4 scoring and the market evidence — prioritised P1–P6, with gate guardrails and explicit score deltas"
          />
        </div>

        {/* ================= PART C — METHOD ================= */}
        <PartHeading
          id="method"
          part="Part C"
          title="Method, instrument & references"
        />
        <p className="text-muted-foreground mb-5 text-sm">
          This part records what the pilot rests on: a draft instrument with an
          external construct definition, a verified single-rater scoring, and a
          validation program that is specified but has not yet been conducted.
        </p>

        <MethodDetails summary="The instrument — why Panel C was re-anchored, and on what">
          <Card className="border-0 shadow-none">
            <CardContent className="pt-4">
              <p className="text-muted-foreground mb-3 text-sm">
                The five items of v3.1 (D2, D3, D7, B, D5) defined adaptiveness
                through their own anchors, without an external referent; the
                associated risk of construct underrepresentation is discussed by
                Woods, Lyons and colleagues
                <Cite refs={[18]} />. Version 4 adopts the definition of
                adaptive capabilities in the TEQSA-commissioned guidance (Lodge
                et al., 2026
                <Cite refs={[1]} />
                ): digital literacy, distributed cognition, hybrid metacognition
                and life-long learning, built on deep disciplinary knowledge.
                Items C1 to C4 correspond to the four capabilities and C5
                retains inquiry. Disciplinary depth is treated as gate G1,
                following the evidence in Deming and Noray
                <Cite refs={[6]} /> that applied technical skill functions as a
                precondition whose earnings premium declines with time. The
                Irreplaceability item has been removed on the grounds that its
                correlation with the total is better explained as a
                general-impression effect.
              </p>
              <p className="text-muted-foreground text-sm">
                Anchors are declarative statements about documented curriculum
                evidence (the Brynjolfsson–Mitchell–Rock SML form
                <Cite refs={[8]} />
                ); level 3 requires assessment evidence; every score cites
                verbatim handbook lines; ambiguity resolves down. Full
                derivation:{" "}
                <span className="font-mono text-xs">
                  docs/dfva-panelc-v4-recommendation.md
                </span>{" "}
                and the literature review beside it.
              </p>
            </CardContent>
          </Card>
        </MethodDetails>

        <MethodDetails
          summary={`Scoring integrity — adversarial + verbatim verification passed${
            panelC.verified ? ` (${panelC.verified.date})` : ""
          }; ${panelC.ambiguities.length} recorded ambiguit${
            panelC.ambiguities.length === 1 ? "y" : "ies"
          }`}
        >
          <Card className="border-0 shadow-none">
            <CardContent className="pt-4">
              <p className="text-muted-foreground mb-3 text-sm">
                Each evidence passage shown on this page was verified to appear
                verbatim in the captured 2026 handbook text (20 pages: the
                course, structure and attributes pages, the six compulsory
                subjects, and two capstone routes with their assessment pages),
                and each level-boundary judgement was reviewed adversarially.
                The judgements in which the evidence was consistent with two
                levels are recorded below:
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
                  <strong className="text-foreground font-medium">
                    No v4 medians or stability layer.
                  </strong>{" "}
                  Position labels, quadrant probabilities and stability classes
                  require the portfolio to be re-scored on v4, which is planned
                  as a published migration cycle with a v3.1-to-v4 comparison
                  table.
                </li>
                <li>
                  <strong className="text-foreground font-medium">
                    No inter-rater study on v4.
                  </strong>{" "}
                  The rater-reliability protocol was directed at the v4 items by
                  decision of 2026-08-13; until it has been conducted, these
                  scores are a single-rater application.
                </li>
                <li>
                  <strong className="text-foreground font-medium">
                    No content-validity panel yet.
                  </strong>{" "}
                  An expert panel with crosswalks to the CEPH, WHO-ASPHER and
                  AMIA competency frameworks is the specified next step,
                  following Kane's argument-based approach to validation
                  <Cite refs={[17]} />.
                </li>
                <li>
                  <strong className="text-foreground font-medium">
                    Declared scope limits.
                  </strong>{" "}
                  Scores describe documented curriculum intent, and the
                  inference to graduate capability rests on constructive
                  alignment, stated as an assumption. Indigenous data governance
                  is not scored as a distinct construct; it counts toward C3
                  level 3 where taught
                  <Cite refs={[2]} />. Physical and perceptual capability
                  <Cite refs={[7]} /> is not scored.
                </li>
              </ul>
            </CardContent>
          </Card>
        </MethodDetails>

        <MethodDetails
          summary={`References — the sources the instrument is anchored on (${V4_REFERENCES.length})`}
        >
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
            Evidura · Durability Assessment · Panel C {V4_INSTRUMENT} pilot ·
            single-rater scoring, verified against source
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
