import { useParams } from "react-router";
import { InsightsGate } from "../InsightsGate";
import { hasReportContent } from "../reportContent/index";
import { PROGRAMS } from "../sharedProgramData";
import { getFaculty } from "../faculty";
import { v3ProgramByCode, type V3Program } from "../v3/data/v3Programs";
import { V4_INSTRUMENT } from "./data/v4Rubric";
import { V4_RESEARCH_DEGREES } from "./data/v4Meta";
import { v4OnlyProgramByCode, v4PanelABasisByCode } from "./data/v4Basis";
import { useV4PanelC } from "./useV4PanelC";
import { basisMedian } from "./exposureBasis";
import { v4Quadrant } from "./v4Position";
import { FindingPanel } from "./report/FindingPanel";
import { MarketPart } from "./report/MarketPart";
import { MethodPart } from "./report/MethodPart";
import { PendingReport } from "./report/PendingReport";
import { PositionCard } from "./report/PositionCard";
import { ReportFooter } from "./report/ReportFooter";
import { ReportHero } from "./report/ReportHero";
import { PartHeading } from "./report/ReportChrome";
import { Scorecard } from "./report/Scorecard";
import { V4ResearchReport } from "./report/ResearchReport";
import {
  NAV_PART_A,
  NAV_PART_B,
  NAV_PART_C,
  PART_A,
  PART_A_TITLE,
  PART_B,
  PART_B_TITLE,
  PART_C,
  PART_C_TITLE,
} from "./report/copy";

const ITEM_IDS = ["C1", "C2", "C3", "C4", "C5"] as const;

/**
 * The v4 Durability Report. This file resolves the program record and derives
 * the figures the page reports; every visual part lives under ./report, and
 * every block of reader-facing prose in ./report/copy.ts.
 */
export default function V4ReportPage({ code: codeProp }: { code?: string }) {
  const { code: paramCode } = useParams<{ code: string }>();
  const code = codeProp ?? paramCode;
  // Archived v1 report (the format this page replaced), where one exists.
  const v1 = code
    ? PROGRAMS.find((p) => p.assessmentSlug === `dfva-${code}`)
    : undefined;
  const v3 = code ? v3ProgramByCode(code) : undefined;
  // The record is its own chunk; `ready` is false until it has arrived.
  const { panelC, ready } = useV4PanelC(code);
  // A program can be scored on Panel C without being in the assessed portfolio:
  // no exposure, no alumni destinations, no market report. That is half a
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

  if (!ready) {
    return (
      <div
        role="status"
        aria-label="Loading report"
        className="mx-auto max-w-5xl px-4 py-10"
      />
    );
  }

  if (!program || !panelC) {
    return (
      <PendingReport
        code={code}
        v1={v1}
        isResearchDegree={Boolean(code && V4_RESEARCH_DEGREES.includes(code))}
      />
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
        <ReportHero
          instrument={V4_INSTRUMENT}
          pilot
          name={program.name}
          code={program.code}
          faculty={program.faculty}
          nav={[
            { href: "#finding", label: NAV_PART_A },
            { href: "#market", label: NAV_PART_B },
            { href: "#method", label: NAV_PART_C },
          ]}
        />

        {/* ================= PART A — THE FINDING ================= */}
        <PartHeading id="finding" part={PART_A} title={PART_A_TITLE} />
        <FindingPanel panelC={panelC} hasV31={Boolean(v3)} />
        <PositionCard
          program={program}
          panelC={panelC}
          exposure={exposure}
          basis={basis}
          expMedian={expMedian}
          position={position}
          jirN={jirN}
          nTitles={nTitles}
          weightedDiffers={weightedDiffers}
          envelope={envelope}
          itemsAtCeiling={itemsAtCeiling}
          itemCount={allScores.length}
        />
        <Scorecard
          panelC={panelC}
          workplaceScored={workplaceScored}
          wEnvelope={wEnvelope}
        />

        {/* ================= PART B — MARKET EVIDENCE ================= */}
        <PartHeading id="market" part={PART_B} title={PART_B_TITLE} />
        <MarketPart
          program={program}
          hasMarketReport={Boolean(v3 || v4Only?.hasMarketReport)}
          exposure={exposure}
          basis={basis}
        />

        {/* ================= PART C — METHOD ================= */}
        <PartHeading id="method" part={PART_C} title={PART_C_TITLE} />
        <MethodPart panelC={panelC} />

        <ReportFooter programCode={program.code} hasV31={Boolean(v3)} v1={v1} />
      </div>
    </InsightsGate>
  );
}
