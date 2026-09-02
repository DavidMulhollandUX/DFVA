import { MatrixAreaLabels } from "../../matrixAreaLabels";
import { QUADRANTS } from "../../v2/quadrants";
import {
  V3_META,
  V3_PROGRAMS,
  v3ProgramByCode,
  type V3Program,
} from "../../v3/data/v3Programs";
import { V4_ADAPTIVENESS_MAX } from "../data/v4Rubric";
import {
  V4_META,
  V4_PANEL_C,
  type V4PanelABasis,
  type V4PanelC,
} from "../data/v4PanelC";
import { basisMedian, isOwnRecord } from "../exposureBasis";
// Scale bounds and the workplace-sizing rule come from plotScale.ts, shared
// with the insights portfolio matrix so both figures plot on one scale.
import { X_MAX, X_MIN, wRadius } from "../plotScale";
import { PLANE_SIZE_LEGEND, PLANE_X_AXIS_LABEL, planeAriaLabel } from "./copy";

/** v4 has no quadrant until the migration cycle re-bases the medians, so the
 * program dot is deliberately neutral — no quadrant colour may be implied. */
export const NEUTRAL_DOT = "#6B7280";

/** The exposure–adaptiveness plane. Two cohorts are drawn: the v3.1 reference
 * portfolio faded for orientation, and the programs already re-scored on v4.1,
 * sized by their workplace sub-score. The median lines follow whichever
 * instrument the position label is assigned against: v4 once the migration
 * cycle is complete, v3.1 (orientation only) while it is not. Drawing the v3.1
 * adaptiveness median under a v4 quadrant label would put a program on the
 * opposite side of the line from its own chip. */
export function V4MiniMatrix({
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
      aria-label={planeAriaLabel(onV4Medians)}
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
          <title>{`${peer.name} — adaptiveness ${r.adaptiveness}/${V4_ADAPTIVENESS_MAX}, workplace ${r.workplace}/9`}</title>
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
        <title>{`${
          program.name
        } — adaptiveness ${adaptiveness}/${V4_ADAPTIVENESS_MAX}${
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
        {PLANE_X_AXIS_LABEL}
      </text>
      <text
        x={10}
        y={H / 2}
        fontSize={10}
        fill="var(--color-muted-foreground)"
        transform={`rotate(-90 10 ${H / 2})`}
        textAnchor="middle"
      >
        Adaptiveness /{V4_ADAPTIVENESS_MAX} (v4 draft)
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
          {PLANE_SIZE_LEGEND}
        </text>
      </g>
    </svg>
  );
}
