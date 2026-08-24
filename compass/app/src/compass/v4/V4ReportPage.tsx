import { Link, useParams } from "react-router";
import { Card, CardContent, CardTitle } from "../../client/components/ui/card";
import { InsightsGate } from "../InsightsGate";
import { hasReportContent } from "../reportContent/index";
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
  type V4RubricGate,
  type V4RubricItem,
} from "./data/v4Rubric";
import {
  V4_META,
  V4_PANEL_C,
  V4_RESEARCH_DEGREES,
  v4OnlyProgramByCode,
  v4PanelABasisByCode,
  v4PanelCByCode,
  type V4GateResult,
  type V4ItemResult,
  type V4PanelABasis,
  type V4PanelC,
} from "./data/v4PanelC";
import {
  V4_TIER_LABELS,
  basisMedian,
  describeBasis,
  isOwnRecord,
} from "./exposureBasis";
import { Cite, HowThisRubricWorksDialog } from "./HowThisRubricWorksDialog";
import { gateState, gateSummary, joinList, lowerFirst } from "./gateState";
import { PROGRAMS } from "../sharedProgramData";
import { getFaculty } from "../faculty";
import {
  V4_QUADRANT_LABELS as QUADRANT_LABELS,
  v4Quadrant,
} from "./v4Position";

const X_MIN = 60;
const X_MAX = 100;

/** v4 has no quadrant until the migration cycle re-bases the medians, so the
 * program dot is deliberately neutral — no quadrant colour may be implied. */
const NEUTRAL_DOT = "#6B7280";

const ITEM_IDS = ["C1", "C2", "C3", "C4", "C5"] as const;

/** Every scored item, in rubric order, with its result. */
const scoredItems = (
  r: V4PanelC,
): Array<{ item: V4RubricItem; score: number }> =>
  V4_RUBRIC.map((item) => ({
    item,
    score: (r[item.id as keyof V4PanelC] as V4ItemResult).score,
  }));

/** What the curriculum documents — named from the items that actually scored. */
function strengthSummary(r: V4PanelC): string {
  const strong = scoredItems(r).filter((s) => s.score >= 2);
  if (strong.length === 0) {
    return "No item reaches the level at which the instrument treats a capability as documented and assessed.";
  }
  return `The documented curriculum evidences ${joinList(
    strong.map((s) => lowerFirst(s.item.name)),
  )}.`;
}

/** What it does not — named from the items at or below the outcome-only level. */
function gapSummary(r: V4PanelC): string {
  const weak = scoredItems(r).filter((s) => s.score <= 1);
  if (weak.length === 0) {
    return "No item sits at or below the level where a capability is claimed but not assessed.";
  }
  const tail =
    " At these levels the capability is absent from the core, or stated in outcomes without an assessment that confirms it.";
  // When everything is weak the strength sentence has already said so; repeating
  // all eight item names adds length and no information.
  if (weak.length === V4_RUBRIC.length) {
    return `Every item sits at or below the level where a capability may be claimed but is not assessed.${tail}`;
  }
  const named = weak.map(
    (s) => `${s.item.id} ${lowerFirst(s.item.name)} (${s.score}/3)`,
  );
  return `It does not document assessed capability in ${joinList(
    named,
  )}.${tail}`;
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
        {result.evidenceLines?.length ? (
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
        ) : (
          <p className="text-muted-foreground text-sm">
            This record cites no verbatim handbook line for the item. The
            instrument requires one at every level, so the score above rests on
            the reasoning alone and should be read as uncited.
          </p>
        )}
      </div>
    </details>
  );
}

/** One gate as an expandable row. Gates used to render as a bare pill reading
 * "G1 Disciplinary foundation ✓", which named an internal identifier and left a
 * tick mark to carry the whole meaning — a reader had no way to learn what was
 * tested, what the result decides, or why it landed that way (the rationale sat
 * in a title attribute, invisible on touch devices). The identifier is now a
 * small notation and the row states the outcome in words, with the condition
 * and the rater's reasoning underneath. */
function GateResult({
  gate,
  result,
}: {
  gate: V4RubricGate;
  result: V4GateResult | undefined;
}) {
  const state = gateState(result);
  const met = state === "met";
  const chip =
    state === "met"
      ? { text: "✓ Met", tone: "text-band-resilient bg-[#E8F5EE]" }
      : state === "not-met"
        ? { text: "✗ Not met", tone: "text-band-critical bg-[#FDE8E8]" }
        : { text: "— Not recorded", tone: "text-muted-foreground bg-muted" };
  const line =
    state === "met"
      ? "The curriculum documents what this precondition requires, so the scores above rest on it"
      : state === "not-met"
        ? "The curriculum does not document what this precondition requires, which flags the program whatever it scores"
        : "This program's record carries no readable result for this precondition";
  return (
    <details className="group flex-1" data-testid={`gate-${gate.id}`}>
      <summary className="border-border hover:bg-card-accent flex cursor-pointer list-none items-center gap-3 rounded-lg border p-3 [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="text-muted-foreground shrink-0 text-xs transition-transform group-open:rotate-90"
        >
          ▶
        </span>
        <span className="min-w-0 flex-1">
          <span className="text-foreground block text-sm font-medium">
            {gate.name}
          </span>
          <span className="text-muted-foreground block text-xs">{line}</span>
        </span>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase ${chip.tone}`}
        >
          {chip.text}
        </span>
        <span className="text-muted-foreground shrink-0 font-mono text-[10px]">
          {gate.id}
        </span>
      </summary>
      <div className="bg-card-accent mt-2 mb-1 ml-5 rounded-md p-3">
        <p className="text-muted-foreground mb-1 text-[10px] font-semibold tracking-[0.18em] uppercase">
          What this precondition tests
        </p>
        <p className="text-muted-foreground text-xs italic">{gate.construct}</p>
        <p className="text-muted-foreground mt-3 mb-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase">
          How it is decided
        </p>
        <ul className="flex flex-col gap-1.5">
          {[
            { label: "Met", text: gate.pass, applies: state === "met" },
            { label: "Not met", text: gate.fail, applies: state === "not-met" },
          ].map((condition) => (
            <li
              key={condition.label}
              className={`flex items-start gap-2 rounded-md p-1.5 text-sm ${
                condition.applies
                  ? "bg-background border-secondary border-l-2 font-medium"
                  : "text-muted-foreground"
              }`}
            >
              <span
                className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] uppercase ${
                  condition.applies
                    ? "bg-secondary/20 text-foreground"
                    : "bg-muted"
                }`}
              >
                {condition.label}
              </span>
              <span className="min-w-0">
                {condition.text}
                {condition.applies && (
                  <span className="text-secondary-muted-foreground ml-1.5 text-xs font-semibold whitespace-nowrap">
                    ← this program
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground mt-3 mb-1 text-[10px] font-semibold tracking-[0.18em] uppercase">
          {state === "unrecorded"
            ? "What the record says"
            : `Why this program was recorded as ${met ? "met" : "not met"}`}
        </p>
        <p className="text-foreground text-sm leading-relaxed">
          {result?.rationale ??
            "The rater's reasoning for this precondition is not present in this program's record."}
        </p>
        <p className="text-muted-foreground mt-3 mb-1 text-[10px] font-semibold tracking-[0.18em] uppercase">
          Handbook evidence (verbatim)
        </p>
        {result?.evidenceLines?.length ? (
          <ul className="flex flex-col gap-1">
            {result.evidenceLines.map((evidence) => (
              <li
                key={evidence}
                className="border-secondary text-muted-foreground border-l-2 pl-2 text-sm italic"
              >
                “{evidence}”
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm">
            This record cites no verbatim handbook line for the precondition —
            the reasoning above is all it carries. The scored items are cited
            line by line; this one is not.
          </p>
        )}
      </div>
    </details>
  );
}

/** Dot radius encoding the workplace sub-score. W is not on either axis — the
 * position runs on adaptiveness alone — so size is how it earns its place on
 * the figure. It also does the work the axes cannot: six scored programs sit at
 * adaptiveness 9 with W spanning the full 2–9 range, and without this they plot
 * as one indistinguishable stack. */
const wRadius = (workplace: number) =>
  3 + (Math.max(0, Math.min(9, workplace)) / 9) * 5;

/** The exposure–adaptiveness plane. Two cohorts are drawn: the v3.1 reference
 * portfolio faded for orientation, and the programs already re-scored on v4.1,
 * sized by their workplace sub-score. The median lines follow whichever
 * instrument the position label is assigned against: v4 once the migration
 * cycle is complete, v3.1 (orientation only) while it is not. Drawing the v3.1
 * adaptiveness median under a v4 quadrant label would put a program on the
 * opposite side of the line from its own chip. */
function V4MiniMatrix({
  program,
  adaptiveness,
  envelope,
  workplace,
  basis,
}: {
  /** Only the fields the plane needs: a v4-only program supplies the same
   *  three, so registry membership is not what decides whether it renders. */
  program: Pick<V3Program, "code" | "name" | "exposure">;
  adaptiveness: number;
  envelope: [number, number];
  workplace?: number;
  /** Decides which exposure median is drawn and whether the point is drawn
   *  as a measurement (filled) or an estimate (dashed ring). */
  basis?: V4PanelABasis;
}) {
  // Peers re-scored on v4.1: plotted on their v4 adaptiveness (not their v3.1
  // value, which is a different instrument) and sized by W. Programs without a
  // W score are omitted rather than drawn at an implied zero.
  const v4Peers = Object.entries(V4_PANEL_C)
    .filter(([c, r]) => c !== program.code && typeof r.workplace === "number")
    .map(([c, r]) => ({ peer: v3ProgramByCode(c), r }))
    .filter((e): e is { peer: V3Program; r: V4PanelC } => e.peer !== undefined);
  // Landscape plane: spans the full report column at a readable height.
  const W = 720,
    H = 300,
    PAD = 34;
  const x = (e: number) =>
    PAD + ((e - X_MIN) / (X_MAX - X_MIN)) * (W - 2 * PAD);
  const y = (a: number) => H - PAD - (a / 15) * (H - 2 * PAD);
  // Same condition the position label uses, so the lines and the chip can never
  // disagree about which instrument's median a program sits above.
  const v4Adapt = V4_META.complete ? V4_META.adaptMedian : null;
  const onV4Medians = v4Adapt !== null;
  // Field-tier values sit on a different occupation universe and are placed
  // against the field-basis median; everything else against the alumni-title
  // median. Same helper the position chip uses, so line and chip agree.
  const expMedian = basisMedian(basis) ?? V4_META.expMedian;
  const ownRecord = basis === undefined || isOwnRecord(basis);
  const mx = x(onV4Medians ? expMedian : V3_META.expMedian);
  const my = y(v4Adapt ?? V3_META.adaptMedian);
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label={
        onV4Medians
          ? "Exposure–adaptiveness plane with the v4 draft score, against the v4 portfolio medians"
          : "Exposure–adaptiveness plane with the v4 draft score; v3.1 reference medians shown for context only"
      }
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
      {v4Peers.map(({ peer, r }) => (
        <circle
          key={`v4-${peer.code}`}
          cx={x(peer.exposure)}
          cy={y(r.adaptiveness)}
          r={wRadius(r.workplace as number)}
          fill="none"
          stroke={NEUTRAL_DOT}
          strokeWidth={1.25}
          opacity={0.5}
        >
          <title>{`${peer.name} — adaptiveness ${r.adaptiveness}/15, workplace ${r.workplace}/9`}</title>
        </circle>
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
        r={typeof workplace === "number" ? wRadius(workplace) : 7}
        fill={ownRecord ? NEUTRAL_DOT : "var(--color-background)"}
        stroke={ownRecord ? "var(--color-background)" : NEUTRAL_DOT}
        strokeWidth={2}
        strokeDasharray={ownRecord ? undefined : "3 2"}
        data-testid="v4-program-point"
        data-basis={basis?.tier ?? "exact"}
      >
        <title>{`${program.name} — adaptiveness ${adaptiveness}/15${
          typeof workplace === "number" ? `, workplace ${workplace}/9` : ""
        }`}</title>
      </circle>
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
      {/* Size legend — a size encoding is unreadable without one. */}
      <g transform={`translate(${W - PAD - 74} ${PAD + 10})`}>
        <circle
          cx={0}
          cy={0}
          r={wRadius(0)}
          fill="none"
          stroke={NEUTRAL_DOT}
          strokeWidth={1.25}
        />
        <circle
          cx={22}
          cy={0}
          r={wRadius(9)}
          fill="none"
          stroke={NEUTRAL_DOT}
          strokeWidth={1.25}
        />
        <text x={36} y={3} fontSize={9} fill="var(--color-muted-foreground)">
          W 0→9
        </text>
      </g>
    </svg>
  );
}

/** Section routing for the research-degree body. Its four sections map onto the
 *  same three parts every other Durability Report uses, so a reader moving
 *  between a scored program and a research degree meets one layout, not two. */
const V4R_FINDING = (t: string) => /NO v4 SCORE|CARRIED FORWARD/i.test(t);
const V4R_MARKET = (t: string) => /^MARKET EVIDENCE/i.test(t);
const V4R_LIMITS = (t: string) => /^LIMITATIONS/i.test(t);

/**
 * A research degree rendered in the v4 report format.
 *
 * It carries no Durability Rating and never will — a research degree is
 * examined on an original contribution rather than a taught curriculum, and no
 * destination distribution resolves for one. The page therefore has no score
 * panel, no matrix and no gates. Everything else is the v4 layout: the same
 * hero, the same Part A / B / C spine, the same cards. The body is the v4r
 * report, whose content is carried from the retired v1 instrument.
 */
function V4ResearchReport({
  code,
  name,
  faculty,
  v1,
}: {
  code: string;
  name: string;
  faculty: string;
  v1: (typeof PROGRAMS)[number] | undefined;
}) {
  return (
    <InsightsGate>
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Hero */}
        <div className="mb-8">
          <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
            Durability Assessment · Panel C {V4_INSTRUMENT}
          </p>
          <h1 className="text-foreground font-serif text-4xl tracking-tight">
            {name}
          </h1>
          <p className="text-muted-foreground mt-2 font-mono text-sm uppercase">
            {code.toUpperCase()} · University of Melbourne
            {faculty ? ` · ${faculty}` : ""}
          </p>
          <nav className="text-muted-foreground mt-5 flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <span className="text-foreground font-medium">In this report:</span>
            <a href="#finding" className="underline">
              Part A — The finding
            </a>
            <a href="#market" className="underline">
              Part B — Market evidence
            </a>
            <a href="#method" className="underline">
              Part C — Method &amp; limitations
            </a>
          </nav>
        </div>

        {/* ================= PART A — THE FINDING ================= */}
        <PartHeading id="finding" part="Part A" title="The finding" />

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div
              className="bg-card-accent text-muted-foreground mb-5 flex items-start gap-2 rounded-md p-3 text-sm"
              data-testid="v4-research-notice"
            >
              <span className="text-foreground text-xs font-semibold tracking-wide uppercase">
                No rating
              </span>
              <span>
                Research degrees are examined on an original contribution rather
                than a taught curriculum, and no graduate destination data is
                published for them, so a Durability Rating does not apply to
                this program. Part A sets out both reasons in full. The
                assessment that follows is carried from an earlier instrument
                and is narrative only — it produces no score, and none should be
                read into it.
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <CardLabel>Exposure</CardLabel>
                <p className="text-foreground font-mono text-2xl">—</p>
                <p className="text-muted-foreground text-xs">
                  no destination basis
                </p>
              </div>
              <div>
                <CardLabel>Adaptiveness</CardLabel>
                <p className="text-foreground font-mono text-2xl">—</p>
                <p className="text-muted-foreground text-xs">
                  no taught curriculum to score
                </p>
              </div>
              <div>
                <CardLabel>Position</CardLabel>
                <p className="text-foreground font-mono text-2xl">—</p>
                <p className="text-muted-foreground text-xs">needs both axes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <ReportMarkdownCard
          slug={`dfva-v4r-${code}`}
          label="Research degree · v4 era"
          title="Why this program carries no rating"
          subtitle="The two independent reasons, and the earlier assessment carried forward as narrative"
          sectionFilter={V4R_FINDING}
        />

        {/* ================= PART B — MARKET EVIDENCE ================= */}
        <PartHeading id="market" part="Part B" title="Market evidence" />
        <p className="text-muted-foreground mb-5 text-sm">
          The market evidence is independent of the scoring instrument, so it
          stands for this program whether or not a rating applies. No
          improvement plan follows it: an improvement plan is derived from a
          curriculum score, and there is none here.
        </p>
        <ReportMarkdownCard
          slug={`dfva-v4r-${code}`}
          label="Provenance"
          title="How this market evidence was sourced"
          subtitle="What the market report below rests on, and what it does not"
          sectionFilter={V4R_MARKET}
        />
        <ReportMarkdownCard
          slug={`dfva-market-${code}`}
          label="Market Intelligence"
          title="Labour-Market Intelligence"
          subtitle="Job families, hiring signals, and skill shifts for this program's destinations — confidence level stated per section"
        />

        {/* ================= PART C — METHOD & LIMITATIONS ================= */}
        <PartHeading id="method" part="Part C" title="Method & limitations" />
        <ReportMarkdownCard
          slug={`dfva-v4r-${code}`}
          label="Limitations"
          title="What this report does not establish"
          subtitle="Stated bounds on the reading above"
          sectionFilter={V4R_LIMITS}
        />
        {v1 && (
          <Card className="mt-6">
            <CardContent className="pt-6">
              <CardLabel>Earlier instrument</CardLabel>
              <CardTitle className="text-lg">Archived assessment</CardTitle>
              <p className="text-muted-foreground mt-1 mb-4 text-sm">
                The retired v1 assessment this report draws its narrative from,
                kept for reference. Its composite score and dimension ratings
                were produced by a different instrument measuring a different
                construct, and do not carry over.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link
                  to={`/reports/${v1.assessmentSlug}`}
                  className="text-secondary-muted-foreground underline"
                  data-testid="archived-v1-link"
                >
                  Archived v1 assessment
                </Link>
                {v1.recommendSlug && (
                  <Link
                    to={`/reports/${v1.recommendSlug}`}
                    className="text-secondary-muted-foreground underline"
                  >
                    Archived v1 improvement plan
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-10">
          <Link
            to="/reports"
            className="text-secondary-muted-foreground underline"
          >
            Back to all reports
          </Link>
        </div>
      </div>
    </InsightsGate>
  );
}

export default function V4ReportPage({ code: codeProp }: { code?: string }) {
  const { code: paramCode } = useParams<{ code: string }>();
  const code = codeProp ?? paramCode;
  // Archived v1 report (the format this page replaced), where one exists.
  const v1 = code
    ? PROGRAMS.find((p) => p.assessmentSlug === `dfva-${code}`)
    : undefined;
  const v3 = code ? v3ProgramByCode(code) : undefined;
  const panelC: V4PanelC | undefined = code ? v4PanelCByCode(code) : undefined;
  // A program can be scored on Panel C without being in the assessed portfolio:
  // no exposure, no alumni destinations, no market report. That is half a DFVA
  // position, and the page says so rather than pretending the assessment does
  // not exist (the old behaviour) or estimating the missing half.
  const v4Only = !v3 && code ? v4OnlyProgramByCode(code) : undefined;
  const program: Pick<V3Program, "code" | "name" | "faculty"> | undefined =
    v3 ?? v4Only
      ? {
          code: (v3?.code ?? v4Only?.code) as string,
          name: (v3?.name ?? v4Only?.name) as string,
          faculty: v3?.faculty ?? "",
        }
      : undefined;

  // A research degree renders the whole v4 layout, minus the parts that need a
  // score. It is not a "no report" state: the report exists and says why no
  // rating applies.
  if (
    code &&
    V4_RESEARCH_DEGREES.includes(code) &&
    hasReportContent(`dfva-v4r-${code}`)
  )
    return (
      <V4ResearchReport
        code={code}
        name={v1?.program ?? v3?.name ?? code}
        faculty={v3?.faculty ?? (v1 ? getFaculty(v1.program) : "")}
        v1={v1}
      />
    );

  if (!program || !panelC) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
          Durability Assessment · Panel C {V4_INSTRUMENT}
        </p>
        <h1 className="text-foreground mb-3 font-serif text-3xl">
          {v1 ? v1.program : "No Durability Report"}
        </h1>
        {v1 ? (
          <>
            {code && V4_RESEARCH_DEGREES.includes(code) ? (
              // Reached only by a research degree whose v4r report has not been
              // authored yet; the 14 that have one render the full layout above.
              <p
                className="text-muted-foreground mb-6"
                data-testid="v4-research-notice"
              >
                Research degrees are examined on an original contribution rather
                than a taught curriculum, and no graduate destination data is
                published for them, so a Durability Rating does not apply. Its
                earlier assessment and market intelligence stand as its report.
              </p>
            ) : (
              <p
                className="text-muted-foreground mb-6"
                data-testid="v4-pending-notice"
              >
                This program has not yet been scored on the v4 instrument, so it
                has no current Durability Report. Its earlier assessment is kept
                as an archived report.
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                to={`/reports/${v1.assessmentSlug}`}
                className="text-secondary-muted-foreground underline"
                data-testid="archived-v1-link"
              >
                Archived v1 assessment
              </Link>
              {v1.recommendSlug && (
                <Link
                  to={`/reports/${v1.recommendSlug}`}
                  className="text-secondary-muted-foreground underline"
                >
                  Archived v1 improvement plan
                </Link>
              )}
              <Link
                to={`/reports/${v1.marketSlug}`}
                className="text-secondary-muted-foreground underline"
              >
                Market intelligence
              </Link>
            </div>
          </>
        ) : (
          <p className="text-muted-foreground mb-6">
            No Panel C v4 scoring exists for “{code}”.
          </p>
        )}
        <div className="mt-8">
          <Link
            to="/reports"
            className="text-secondary-muted-foreground underline"
          >
            Back to all reports
          </Link>
        </div>
      </div>
    );
  }

  const scores = ITEM_IDS.map((id) => panelC[id].score);
  // Exact reachable envelope under ±1 rating error, clamped at the 0–3 bounds.
  const envelope: [number, number] = [
    panelC.adaptiveness - scores.filter((s) => s > 0).length,
    panelC.adaptiveness + scores.filter((s) => s < 3).length,
  ];
  // Exposure is instrument-independent, so a v4-only program with its own JIR
  // record carries a measured value computed by the same Panel A procedure.
  const exposure = v3 ? v3.exposure : v4Only?.exposure ?? null;
  // Which destination distribution the value was computed on (own record,
  // program family, related program, or field list). Drives the label, the
  // median it is placed against, and how the plane draws it.
  const basis = code ? v4PanelABasisByCode(code) : undefined;
  const expMedian = basisMedian(basis);
  const position =
    exposure !== null ? v4Quadrant(exposure, panelC.adaptiveness, basis) : null;
  const jirN = v3 ? v3.jirN : v4Only?.jirN ?? null;
  const nTitles = v3 ? v3.nTitles : v4Only?.nTitles ?? null;
  const weightedDiffers =
    basis?.exposureWeighted !== undefined &&
    exposure !== null &&
    Math.abs(basis.exposureWeighted - exposure) > 2.5;
  // v4.1 added W1–W3; a program scored on 4.0-draft has none of them.
  const workplaceScored =
    typeof panelC.workplace === "number" &&
    Boolean(panelC.W1 && panelC.W2 && panelC.W3);
  const wScores = workplaceScored
    ? [panelC.W1!.score, panelC.W2!.score, panelC.W3!.score]
    : [];
  const wEnvelope: [number, number] = [
    (panelC.workplace ?? 0) - wScores.filter((s) => s > 0).length,
    (panelC.workplace ?? 0) + wScores.filter((s) => s < 3).length,
  ];
  // Both sub-scales get the same ceiling accounting; W joins once scored.
  const allScores = [...scores, ...wScores];
  const itemsAtCeiling = allScores.filter((s) => s === 3).length;

  return (
    <InsightsGate>
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Hero */}
        <div className="mb-8">
          <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
            Durability Assessment · Panel C {V4_INSTRUMENT} pilot
          </p>
          <h1 className="text-foreground font-serif text-4xl tracking-tight">
            {program.name}
          </h1>
          <p className="text-muted-foreground mt-2 font-mono text-sm uppercase">
            {program.code} · University of Melbourne
            {program.faculty ? ` · ${program.faculty}` : ""}
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
                value
                {V4_META.complete
                  ? ", so any position label on this page is assigned against the v4 medians, never the v3.1 ones"
                  : ", and no position label is reported until v4 portfolio medians exist"}
                .{" "}
                {v3 ? (
                  <>
                    The earlier v3.1 assessment is kept as an archived report:{" "}
                    <Link
                      to={`/insights/v31/${program.code}`}
                      className="underline"
                    >
                      same program on v3.1 (archived)
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    This program has never been assessed on v3.1 or any earlier
                    instrument, so there is no assessment of record to compare
                    against — a v4 draft score is all that exists for it.
                  </>
                )}
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
                  {panelC.adaptiveness}/{V4_ADAPTIVENESS_MAX} for curriculum
                  adaptiveness and {panelC.workplace}/{V4_WORKPLACE_MAX} for
                  workplace practice, with {gateSummary(panelC)}.{" "}
                  {strengthSummary(panelC)} {gapSummary(panelC)}
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
            <div className="grid gap-6">
              <div>
                <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
                  <div>
                    <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                      Exposure (AIOE)
                    </p>
                    {exposure !== null ? (
                      <>
                        <p
                          className="font-mono text-4xl font-semibold"
                          data-testid="v4-exposure"
                        >
                          {exposure.toFixed(2)}
                        </p>
                        <p
                          className="text-muted-foreground text-xs"
                          data-testid="v4-exposure-basis"
                        >
                          {basis ? V4_TIER_LABELS[basis.tier] : "measured"}
                          {expMedian !== null
                            ? ` · ${
                                basis?.tier === "field"
                                  ? "field-basis"
                                  : "portfolio"
                              } median ${expMedian}`
                            : " · no median published for this basis"}
                        </p>
                        {weightedDiffers && basis && (
                          <p
                            className="text-muted-foreground text-xs"
                            data-testid="v4-exposure-weighted"
                          >
                            share-weighted {basis.exposureWeighted?.toFixed(2)}
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <p
                          className="text-muted-foreground font-mono text-4xl font-semibold"
                          data-testid="v4-exposure"
                        >
                          —
                        </p>
                        <p className="text-muted-foreground text-xs">
                          not available · no destination basis resolved
                        </p>
                      </>
                    )}
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
                        {exposure === null
                          ? "Not placed — no exposure value for this program"
                          : expMedian === null
                            ? "Not placed — no field-basis median published yet"
                            : `No peer comparison yet — ${V4_META.scored} of ${V4_META.cohortSize} programs re-scored`}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground mt-4 text-sm">
                  {exposure !== null ? (
                    <>
                      The exposure value is independent of the scoring
                      instrument. Basis:{" "}
                      <span data-testid="v4-basis-description">
                        {describeBasis(basis, jirN, nTitles)}
                      </span>
                      . Every basis runs through the same Panel A procedure
                      (destination title → O*NET-SOC → published Felten AIOE →
                      unweighted mean); what differs is whose destinations stand
                      for the program, and that is stated rather than hidden.{" "}
                      {basis?.dominantShare && (
                        <>
                          {basis.dominantShare.name} holds{" "}
                          {Math.round(basis.dominantShare.share * 100)}% of the
                          pooled graduates, so the family value leans on it.{" "}
                        </>
                      )}
                      {basis?.excludedSources?.length ? (
                        <>
                          Set aside:{" "}
                          {basis.excludedSources
                            .map(
                              (x) =>
                                `${x.name} (carries ${x.refusedTitles.join(
                                  ", ",
                                )}, adjudicated unmappable)`,
                            )
                            .join("; ")}
                          .{" "}
                        </>
                      ) : null}
                      {basis?.tier === "field" && (
                        <>
                          Field-grain values sample a different occupation
                          universe from alumni titles, so this program is placed
                          against the field-basis median of the same reference
                          cohort, not the alumni-title median.{" "}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      No destination basis could be resolved for this program —
                      no alumni record, no program-family or related record, and
                      no field-of-education list. What is on this page is the
                      Panel C half of a DFVA assessment — the curriculum half —
                      and the position axis stays empty until a basis is
                      recorded.{" "}
                    </>
                  )}
                  {position ? (
                    <>
                      The position is assigned against the v4 medians (exposure{" "}
                      {expMedian}
                      {basis?.tier === "field" ? " on the field basis" : ""},
                      adaptiveness {V4_META.adaptMedian}), computed from all{" "}
                      {V4_META.cohortSize} reference-cohort programs re-scored
                      on this instrument.
                    </>
                  ) : exposure !== null ? (
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
                  ) : (
                    <>
                      The label is withheld: there is no exposure value to place
                      this program on the x-axis
                      {V4_META.adaptMedian === null
                        ? `, and no v4 adaptiveness median yet (${V4_META.scored} of ${V4_META.cohortSize} reference programs re-scored)`
                        : ""}
                      .
                    </>
                  )}
                </p>
                <div className="bg-card-accent text-muted-foreground mt-4 flex items-start gap-2 rounded-md p-3 text-sm">
                  <span className="text-base">⚠</span>
                  <span>
                    <strong className="text-foreground font-medium">
                      {itemsAtCeiling} of {allScores.length} items score the
                      maximum (3/3).
                    </strong>{" "}
                    In v3.1, 31 per cent of scored items sat at the maximum and
                    could only be perturbed downward. Under v4 this program's
                    scores can move in either direction; the anchors require
                    assessment evidence at level 3, which is expected to keep
                    the maximum uncommon.
                  </span>
                </div>
              </div>
              <div className="w-full">
                {exposure !== null ? (
                  <>
                    <V4MiniMatrix
                      program={{
                        code: program.code,
                        name: program.name,
                        exposure,
                      }}
                      adaptiveness={panelC.adaptiveness}
                      envelope={envelope}
                      workplace={panelC.workplace}
                      basis={basis}
                    />
                    <p className="text-muted-foreground mt-1 text-xs">
                      {isOwnRecord(basis) || !basis
                        ? "The filled point is this program on the v4 draft score"
                        : `The dashed point is this program on the v4 draft score — dashed because its exposure is a ${
                            V4_TIER_LABELS[basis.tier]
                          } estimate, not its own graduates`}
                      {basis?.tier === "field"
                        ? "; the vertical line is the field-basis exposure median"
                        : ""}
                      ; no quadrant is implied. Faded fills are the v3.1
                      reference portfolio, shown for context. Open rings are the
                      programs already re-scored on v4, and each ring&rsquo;s
                      size is its workplace sub-score — W is not an axis, so
                      size is how it is read. Rings at the same height score
                      identically on adaptiveness and differ on workplace
                      practice.
                    </p>
                  </>
                ) : (
                  <div
                    className="border-border text-muted-foreground rounded-lg border border-dashed p-5 text-sm"
                    data-testid="v4-no-matrix"
                  >
                    <p className="text-foreground mb-1 font-medium">
                      No position figure
                    </p>
                    <p>
                      The exposure–adaptiveness plane needs both coordinates.
                      This program has one. Plotting it at an assumed or
                      inherited exposure would put a measured-looking point on a
                      measured-looking axis, which is the specific error the
                      figure exists to avoid.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Panel C v4 — the scored axis */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <CardLabel>Panel C v4 — two sub-scales</CardLabel>
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
                      Total workplace practice (v4 draft)
                    </span>
                    <span className="font-mono text-xl font-semibold">
                      {panelC.workplace}
                      <span className="text-muted-foreground text-sm">
                        {" "}
                        / {V4_WORKPLACE_MAX}
                      </span>
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-1 text-right text-xs">
                    under ±1 rating error the score could reach {wEnvelope[0]}–
                    {wEnvelope[1]}
                  </p>
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
            <div className="border-border mt-6 border-t pt-4">
              <CardLabel>Preconditions</CardLabel>
              <p className="text-muted-foreground mb-3 text-sm">
                The conditions below sit beneath the scored items and are
                recorded as met or not met rather than scored, so they add
                nothing to the totals and subtract nothing from them. They say
                whether the foundation the scores rest on is documented at all.
                A precondition that is not met flags the program whatever its
                adaptiveness total, because a capability score is evidence of
                adaptiveness only where that foundation holds. Open a row for
                what the condition tests, the wording it was decided against,
                and why this program was recorded that way.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                {V4_GATES.map((gate) => (
                  <GateResult
                    key={gate.id}
                    gate={gate}
                    result={panelC.gates?.[gate.id as "G1" | "G2"]}
                  />
                ))}
              </div>
              <p className="text-muted-foreground mt-3 text-xs">
                Disciplinary foundation is a precondition because the TEQSA
                framework places deep disciplinary knowledge beneath the four
                capabilities rather than among them
                <Cite refs={[1]} />. Decision-making under uncertainty was a
                scored item in earlier versions and became a floor once most
                programs cleared it. The Irreplaceability item used in v3.1 has
                been removed in v4.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ================= PART B — MARKET EVIDENCE ================= */}
        <PartHeading
          id="market"
          part="Part B"
          title="Market evidence & improvement plan"
        />
        {v3 || v4Only?.hasMarketReport ? (
          <p className="text-muted-foreground mb-5 text-sm">
            The market evidence is independent of the scoring instrument and
            carries over unchanged; confidence levels are stated on each
            section. The improvement plan that follows is derived from two
            inputs, the verified Panel C v4 scoring in Part A and this market
            evidence. Each intervention addresses a named item's next anchor
            level and cites its sources (<Cite refs={[1]} />; the citation marks
            in each entry link to the source).
          </p>
        ) : (
          <div
            className="border-border text-muted-foreground mb-5 rounded-lg border border-dashed p-5 text-sm"
            data-testid="v4-no-market"
          >
            <p className="text-foreground mb-1 font-medium">
              No market evidence for this program
            </p>
            <p>
              There is no market intelligence report for {program.name}, so this
              part is empty rather than populated from a related program —
              substituting a generic profile for the discipline would present
              inference as observation.
              {exposure !== null && isOwnRecord(basis) && (
                <>
                  {" "}
                  Its alumni destination record does exist, and is where the
                  exposure value in Part A comes from; what is missing is the
                  job-family, hiring-signal and skill-shift analysis built on
                  top of it.
                </>
              )}
            </p>
            <p className="mt-2">
              This also bounds Part A: the curriculum implications there argue
              from scored evidence
              {exposure !== null
                ? " and the destination profile"
                : " alone"}{" "}
              and cannot say which capabilities the labour market is now pricing
              at those destinations, which is normally half the case for
              prioritising one intervention over another. A market report for
              this program is the precondition for an improvement plan.
            </p>
          </div>
        )}

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
            subtitle="Anchor-referenced interventions derived from the v4 scoring and the market evidence — prioritised levers with gate guardrails and explicit score deltas"
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
                {(panelC.notScoreable ?? []).map((n) => (
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
                  {V4_META.complete ? (
                    <>
                      <strong className="text-foreground font-medium">
                        No v4 stability layer.
                      </strong>{" "}
                      The migration cycle is complete, so v4 medians exist and
                      position labels are reported. Quadrant probabilities and
                      stability classes are not: those need a rating-error model
                      on v4, which the specified validation program has not yet
                      run. The v3.1-to-v4 comparison table is still to publish.
                    </>
                  ) : (
                    <>
                      <strong className="text-foreground font-medium">
                        No v4 medians or stability layer.
                      </strong>{" "}
                      Position labels, quadrant probabilities and stability
                      classes require the portfolio to be re-scored on v4, which
                      is planned as a published migration cycle with a
                      v3.1-to-v4 comparison table.
                    </>
                  )}
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
                  An expert panel with crosswalks to the discipline's own
                  competency frameworks — CEPH and WHO-ASPHER for public health,
                  AHRI and SHRM for human resources — is the specified next
                  step, following Kane's argument-based approach to validation
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
          <span className="flex flex-wrap gap-4">
            {(v3 || v1) && (
              <span
                className="flex flex-wrap gap-3"
                data-testid="archived-reports"
              >
                <span className="text-foreground font-medium">Archived:</span>
                {v1 && (
                  <Link
                    to={`/reports/${v1.assessmentSlug}`}
                    className="underline"
                  >
                    v1 assessment
                  </Link>
                )}
                {v1?.recommendSlug && (
                  <Link
                    to={`/reports/${v1.recommendSlug}`}
                    className="underline"
                  >
                    v1 improvement plan
                  </Link>
                )}
                {v3 && (
                  <Link
                    to={`/insights/v31/${program.code}`}
                    className="underline"
                  >
                    v3.1 assessment
                  </Link>
                )}
              </span>
            )}
            {hasReportContent(`dfva-v4-${program.code}`) && (
              <Link
                to={`/reports/dfva-v4-${program.code}`}
                className="underline"
              >
                Full v4 report (markdown)
              </Link>
            )}
            <Link to="/reports" className="underline">
              All reports
            </Link>
          </span>
        </div>
      </div>
    </InsightsGate>
  );
}
