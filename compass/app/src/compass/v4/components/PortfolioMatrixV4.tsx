import { useState } from "react";
import { useNavigate } from "react-router";
import { programReportPath } from "../../reportLinks";
import { MatrixAreaLabels } from "../../matrixAreaLabels";
import { QUADRANTS } from "../v2/quadrants";
import { X_MAX, X_MIN, Y_MAX, wRadius } from "./plotScale";
import { V4_RUBRIC } from "./data/v4Rubric";
import type { V4PortfolioRow } from "./portfolioStats";

/** Short item labels for the tooltip, read off the generated rubric once at
 *  module load — never a hand-maintained map. */
const ITEM_SHORT: Record<string, string> = Object.fromEntries(
  V4_RUBRIC.map((i) => [i.id, i.short]),
);

const NEUTRAL_DOT = "#5C7088";

/** Marker vocabulary by exposure basis, extending what V4MiniMatrix
 *  established on the report page:
 *  — own: filled dot; the exposure was measured on the program's OWN
 *    graduates;
 *  — borrowed: hollow ring; taken from a family or related record (an
 *    estimate);
 *  — field: hollow square; field-of-education grain, placed against its own
 *    fainter median line because it samples a different occupation universe.
 *  39 of 104 exposures are borrowed; without this treatment every dot plots
 *  as if measured. */
type MarkerKind = "own" | "borrowed" | "field";

function markerFor(row: V4PortfolioRow): MarkerKind {
  if (row.exposureTier === "field") return "field";
  return row.ownRecord ? "own" : "borrowed";
}

interface TooltipState {
  row: V4PortfolioRow;
  x: number;
  y: number;
}

export function PortfolioMatrixV4({
  rows,
  activeFaculty = null,
}: {
  rows: V4PortfolioRow[];
  activeFaculty?: string | null;
}) {
  const navigate = useNavigate();
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const W = 800;
  const H = 520;
  const pad = { top: 40, right: 40, bottom: 52, left: 54 };
  const pw = W - pad.left - pad.right;
  const ph = H - pad.top - pad.bottom;
  // The same single 0–100 AIOE scale as V4MiniMatrix — never normalised to
  // "distance from own median", which would destroy the AIOE value a reader
  // can carry between this page and a report page.
  const sx = (v: number) => pad.left + ((v - X_MIN) / (X_MAX - X_MIN)) * pw;
  const sy = (v: number) => pad.top + ph - (v / Y_MAX) * ph;

  // Only placed rows draw. Research degrees carry no Panel C score and never
  // appear here — they live in the table's separated group instead.
  const drawable = rows.filter(
    (r) => r.exposure !== null && r.adaptiveness !== null,
  );
  const active = activeFaculty
    ? drawable.filter((r) => r.faculty === activeFaculty)
    : drawable;
  const faded = activeFaculty
    ? drawable.filter((r) => r.faculty !== activeFaculty)
    : [];

  // Program-grain median line. The field tier gets its own fainter line: only
  // mc-bamktg actually moves between the two medians, but drawing one line
  // while five dots are placed against the other would assert a placement the
  // data does not make.
  const mx = sx(90.9);
  const mxField = sx(83.21);
  const my = sy(9);

  // Sparse name labels: skip when too close to an already-labelled marker.
  const labelled: { x: number; y: number }[] = [];
  const showLabel = (x: number, y: number) => {
    const clash = labelled.some(
      (l) => Math.abs(x - l.x) < 60 && Math.abs(y - l.y) < 16,
    );
    if (!clash) labelled.push({ x, y });
    return !clash;
  };

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        className="block w-full"
        role="img"
        aria-label="Portfolio matrix: curriculum adaptiveness against destination AI exposure"
        onMouseLeave={() => setTooltip(null)}
      >
        <rect
          x={pad.left}
          y={pad.top}
          width={pw}
          height={ph}
          fill="none"
          stroke="var(--color-border)"
        />

        {/* Median thresholds — the lines that define position */}
        <line
          x1={mx}
          y1={pad.top}
          x2={mx}
          y2={H - pad.bottom}
          stroke="#5C7088"
          strokeWidth="1.5"
          strokeDasharray="6,4"
          opacity="0.5"
        />
        <line
          x1={mxField}
          y1={pad.top}
          x2={mxField}
          y2={H - pad.bottom}
          stroke="#5C7088"
          strokeWidth="1"
          strokeDasharray="3,4"
          opacity="0.35"
        />
        <line
          x1={pad.left}
          y1={my}
          x2={W - pad.right}
          y2={my}
          stroke="#5C7088"
          strokeWidth="1.5"
          strokeDasharray="6,4"
          opacity="0.5"
        />

        <MatrixAreaLabels
          left={pad.left}
          right={W - pad.right}
          top={pad.top}
          bottom={H - pad.bottom}
          fontSize={11}
        />

        {/* Context dots for the faculties not currently selected */}
        {faded.map((r) => (
          <circle
            key={`f-${r.code}`}
            cx={sx(r.exposure as number)}
            cy={sy(r.adaptiveness as number)}
            r={3}
            fill="#5C7088"
            opacity="0.18"
          />
        ))}

        {active.map((r) => {
          const x = sx(r.exposure as number);
          const y = sy(r.adaptiveness as number);
          const kind = markerFor(r);
          const hex =
            r.position !== null ? QUADRANTS[r.position].hex : NEUTRAL_DOT;
          const sized = r.workplace !== null;
          const radius = sized ? wRadius(r.workplace as number) : 7;
          const common = {
            className: "cursor-pointer",
            onClick: () => navigate(programReportPath(r.code)),
            onMouseEnter: (e: React.MouseEvent<SVGElement>) => {
              const rect = (
                e.currentTarget.ownerSVGElement?.parentElement as HTMLElement
              )?.getBoundingClientRect();
              if (rect) {
                setTooltip({
                  row: r,
                  x: e.clientX - rect.left + 15,
                  y: e.clientY - rect.top - 10,
                });
              }
            },
            onMouseLeave: () => setTooltip(null),
          };
          const basisTitle =
            kind === "own"
              ? `${r.name} — measured`
              : kind === "field"
                ? `${r.name} — field-grain estimate`
                : `${r.name} — ${r.exposureTierLabel ?? "estimated"}`;
          return (
            <g key={r.code}>
              {kind === "own" ? (
                <circle
                  {...common}
                  cx={x}
                  cy={y}
                  r={radius}
                  fill={hex}
                  stroke="var(--color-background)"
                  strokeWidth={1}
                />
              ) : kind === "borrowed" ? (
                <circle
                  {...common}
                  cx={x}
                  cy={y}
                  r={radius}
                  fill="var(--color-background)"
                  stroke={hex}
                  strokeWidth={2}
                />
              ) : (
                <rect
                  {...common}
                  x={x - radius}
                  y={y - radius}
                  width={radius * 2}
                  height={radius * 2}
                  fill="var(--color-background)"
                  stroke={hex}
                  strokeWidth={2}
                  strokeDasharray="3 2"
                />
              )}
              <title>{basisTitle}</title>
              {showLabel(x, y) && (
                <text
                  x={x}
                  y={y - radius - 4}
                  fill="#0F2236"
                  fontSize={9}
                  textAnchor="middle"
                  opacity="0.75"
                >
                  {r.name.replace(/^(Master|Bachelor|Doctor) of /, "")}
                </text>
              )}
            </g>
          );
        })}

        {/* Axis labels, in words */}
        <text
          x={W / 2}
          y={H - 10}
          fill="#5C7088"
          fontSize={11}
          textAnchor="middle"
        >
          Destination AI exposure — how much graduates' occupations overlap
          with what AI can do →
        </text>
        <text
          x={14}
          y={H / 2}
          fill="#5C7088"
          fontSize={11}
          textAnchor="middle"
          transform={`rotate(-90, 14, ${H / 2})`}
        >
          Curriculum adaptiveness (out of 15) →
        </text>
        {[60, 70, 80, 90, 100].map((tick) => (
          <text
            key={`tx${tick}`}
            x={sx(tick)}
            y={H - pad.bottom + 16}
            fill="#8593A6"
            fontSize={10}
            textAnchor="middle"
          >
            {tick}
          </text>
        ))}
        {[0, 3, 6, 9, 12, 15].map((tick) => (
          <text
            key={`ty${tick}`}
            x={pad.left - 8}
            y={sy(tick) + 4}
            fill="#8593A6"
            fontSize={10}
            textAnchor="end"
          >
            {tick}
          </text>
        ))}
      </svg>

      <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
        Filled dot — exposure measured on the program's own graduates · Hollow
        ring — exposure borrowed from a related or pooled record (an estimate)
        · Hollow dashed square — field-of-education grain, placed against its
        own faint line at 83.2 rather than the program-grain line at 90.9.
      </p>

      {tooltip && (
        <div
          className="border-border bg-card pointer-events-none absolute z-10 max-w-xs rounded-md border p-3 text-xs shadow-lg"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="text-foreground mb-1.5 font-semibold">
            {tooltip.row.name}
          </div>
          {tooltip.row.position !== null && (
            <div
              className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[0.7rem] font-medium ${
                QUADRANTS[tooltip.row.position].badgeClass as string
              }`}
            >
              {QUADRANTS[tooltip.row.position].desc}
            </div>
          )}
          <div className="flex justify-between gap-6">
            <span className="text-muted-foreground">Destination exposure</span>
            <span>{(tooltip.row.exposure as number).toFixed(1)}</span>
          </div>
          <div className="mb-1 flex justify-between gap-6">
            <span className="text-muted-foreground">Basis</span>
            <span>{tooltip.row.exposureTierLabel}</span>
          </div>
          <div className="mb-1.5 flex justify-between gap-6">
            <span className="text-muted-foreground">
              Curriculum adaptiveness
            </span>
            <span>{tooltip.row.adaptiveness}/15</span>
          </div>
          {tooltip.row.items &&
            Object.entries(tooltip.row.items).map(([id, score]) => (
              <div
                key={id}
                className="flex justify-between gap-6 text-[0.7rem]"
              >
                <span className="text-muted-foreground">
                  {ITEM_SHORT[id] ?? id}
                </span>
                <span>
                  {Number.isFinite(score) ? `${score}/3` : "—"}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
