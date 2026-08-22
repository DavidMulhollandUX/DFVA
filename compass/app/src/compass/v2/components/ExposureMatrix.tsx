import { useState } from "react";
import { useNavigate } from "react-router";
import { programReportPath } from "../../reportLinks";
import { V2_META, type V2Program } from "../data/v2Programs";
import { QUADRANTS } from "../quadrants";

// Scale bounds mirror the prototype: AIOE 30–80 × adaptiveness 0–16.
const X_MIN = 30;
const X_MAX = 80;
const Y_MIN = 0;
const Y_MAX = 16;

interface TooltipState {
  program: V2Program;
  x: number;
  y: number;
}

interface ExposureMatrixProps {
  programs: V2Program[];
  /** When set, non-matching plotted programs render as faded context dots. */
  activeFaculty?: string | null;
  /** Compact mode for the mini matrix on the report page. */
  compact?: boolean;
  /** Highlight a single program (report page position card). */
  highlightCode?: string;
}

export function ExposureMatrix({
  programs,
  activeFaculty = null,
  compact = false,
  highlightCode,
}: ExposureMatrixProps) {
  const navigate = useNavigate();
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const W = compact ? 320 : 800;
  const H = compact ? 240 : 500;
  const pad = compact
    ? { top: 30, right: 20, bottom: 40, left: 35 }
    : { top: 40, right: 40, bottom: 50, left: 50 };
  const pw = W - pad.left - pad.right;
  const ph = H - pad.top - pad.bottom;
  const sx = (v: number) => pad.left + ((v - X_MIN) / (X_MAX - X_MIN)) * pw;
  const sy = (v: number) => pad.top + ph - ((v - Y_MIN) / (Y_MAX - Y_MIN)) * ph;

  const plotted = programs.filter(
    (p) => p.has_jir && p.exposure !== null,
  ) as (V2Program & { exposure: number })[];
  const active = activeFaculty
    ? plotted.filter((p) => p.faculty === activeFaculty)
    : plotted;
  const faded = activeFaculty
    ? plotted.filter((p) => p.faculty !== activeFaculty)
    : [];

  const qx = {
    left: (X_MIN + V2_META.exp_median) / 2,
    right: (V2_META.exp_median + X_MAX) / 2,
  };
  const qy = {
    top: (V2_META.adapt_median + Y_MAX) / 2,
    bottom: (Y_MIN + V2_META.adapt_median) / 2,
  };

  const gridX: number[] = [];
  for (let x = X_MIN; x <= X_MAX; x += 10) gridX.push(x);
  const gridY: number[] = [];
  for (let y = Y_MIN; y <= 15; y += 3) gridY.push(y);

  // Sparse code labels: skip when too close to an already-labelled dot.
  const labelled: { x: number; y: number }[] = [];
  const showLabel = (x: number, y: number) => {
    const clash = labelled.some(
      (l) => Math.abs(x - l.x) < 25 && Math.abs(y - l.y) < 20,
    );
    if (!clash) labelled.push({ x, y });
    return !clash;
  };

  const fontSize = compact ? 9 : 11;
  const tickSize = compact ? 8 : 10;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        className="block w-full"
        onMouseLeave={() => setTooltip(null)}
      >
        {gridX.map((x) => (
          <line
            key={`gx${x}`}
            x1={sx(x)}
            y1={pad.top}
            x2={sx(x)}
            y2={H - pad.bottom}
            stroke="#DDE3EB"
            strokeWidth="0.5"
          />
        ))}
        {gridY.map((y) => (
          <line
            key={`gy${y}`}
            x1={pad.left}
            y1={sy(y)}
            x2={W - pad.right}
            y2={sy(y)}
            stroke="#DDE3EB"
            strokeWidth="0.5"
          />
        ))}

        {/* Median thresholds */}
        <line
          x1={sx(V2_META.exp_median)}
          y1={pad.top}
          x2={sx(V2_META.exp_median)}
          y2={H - pad.bottom}
          stroke="#5C7088"
          strokeWidth="1.5"
          strokeDasharray="6,4"
          opacity="0.5"
        />
        <line
          x1={pad.left}
          y1={sy(V2_META.adapt_median)}
          x2={W - pad.right}
          y2={sy(V2_META.adapt_median)}
          stroke="#5C7088"
          strokeWidth="1.5"
          strokeDasharray="6,4"
          opacity="0.5"
        />

        {/* Quadrant labels */}
        <text
          x={sx(qx.right)}
          y={sy(qy.top) + 5}
          fill={QUADRANTS["well-positioned"].hex}
          fontSize={fontSize}
          textAnchor="middle"
          opacity="0.7"
        >
          Well-positioned
        </text>
        <text
          x={sx(qx.left)}
          y={sy(qy.top) + 5}
          fill={QUADRANTS.comfortable.hex}
          fontSize={fontSize}
          textAnchor="middle"
          opacity="0.7"
        >
          Comfortable
        </text>
        <text
          x={sx(qx.right)}
          y={sy(qy.bottom) + 5}
          fill={QUADRANTS.attention.hex}
          fontSize={fontSize}
          textAnchor="middle"
          opacity="0.7"
        >
          Attention
        </text>
        <text
          x={sx(qx.left)}
          y={sy(qy.bottom) + 5}
          fill={QUADRANTS.sheltered.hex}
          fontSize={fontSize}
          textAnchor="middle"
          opacity="0.7"
        >
          Sheltered
        </text>

        {/* Axis labels + ticks */}
        <text
          x={W / 2}
          y={H - 5}
          fill="#5C7088"
          fontSize={fontSize}
          textAnchor="middle"
        >
          Destination AI Exposure (AIOE) →
        </text>
        <text
          x={12}
          y={H / 2}
          fill="#5C7088"
          fontSize={fontSize}
          textAnchor="middle"
          transform={`rotate(-90, 12, ${H / 2})`}
        >
          Curriculum Adaptiveness →
        </text>
        {!compact &&
          [35, 45, 55, 65, 75].map((x) => (
            <text
              key={`tx${x}`}
              x={sx(x)}
              y={H - pad.bottom + 18}
              fill="#8593A6"
              fontSize={tickSize}
              textAnchor="middle"
            >
              {x}
            </text>
          ))}
        {!compact &&
          gridY.map((y) => (
            <text
              key={`ty${y}`}
              x={pad.left - 8}
              y={sy(y) + 4}
              fill="#8593A6"
              fontSize={tickSize}
              textAnchor="end"
            >
              {y}
            </text>
          ))}

        {/* Faded context dots (other faculties) */}
        {faded.map((p) => (
          <circle
            key={`f-${p.code}`}
            cx={sx(p.exposure)}
            cy={sy(p.adaptiveness_raw)}
            r={3}
            fill="#5C7088"
            opacity="0.2"
          />
        ))}

        {/* Active programs */}
        {active.map((p) => {
          const x = sx(p.exposure);
          const y = sy(p.adaptiveness_raw);
          const isHighlight = highlightCode === p.code;
          const label = isHighlight || (!compact && showLabel(x, y));
          return (
            <g key={p.code}>
              <circle
                cx={x}
                cy={y}
                r={isHighlight ? 7 : 5}
                fill={QUADRANTS[p.quadrant].hex}
                stroke={isHighlight ? "#fff" : "#F4F2EC"}
                strokeWidth={isHighlight ? 2 : 1}
                className="cursor-pointer"
                onMouseEnter={(e) => {
                  const rect = (
                    e.currentTarget.ownerSVGElement
                      ?.parentElement as HTMLElement
                  )?.getBoundingClientRect();
                  if (rect) {
                    setTooltip({
                      program: p,
                      x: e.clientX - rect.left + 15,
                      y: e.clientY - rect.top - 10,
                    });
                  }
                }}
                onMouseLeave={() => setTooltip(null)}
                onClick={() => navigate(programReportPath(p.code))}
              />
              {label && (
                <text
                  x={x}
                  y={y - (isHighlight ? 12 : 9)}
                  fill="#0F2236"
                  fontSize={isHighlight ? 10 : 8}
                  fontWeight={isHighlight ? 600 : 400}
                  textAnchor="middle"
                  opacity={isHighlight ? 1 : 0.7}
                >
                  {p.code}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {tooltip && (
        <div
          className="border-border bg-card pointer-events-none absolute z-10 max-w-xs rounded-md border p-3 text-xs shadow-lg"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="text-foreground mb-1 font-semibold">
            {tooltip.program.code}: {tooltip.program.name}
          </div>
          <div className="text-band-high mb-1 text-[0.7rem]">
            v1: {tooltip.program.v1_band}
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-muted-foreground">Exposure</span>
            <span>{tooltip.program.exposure?.toFixed(0)}</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-muted-foreground">Adaptiveness</span>
            <span>{tooltip.program.adaptiveness_raw}/15</span>
          </div>
          <div className="text-muted-foreground mt-1 text-[0.7rem]">
            D2:{tooltip.program.D2} D3:{tooltip.program.D3} D7:
            {tooltip.program.D7} B:{tooltip.program.B_irreplaceable} D5:
            {tooltip.program.D5_ai_literacy}
          </div>
          <div className="flex justify-between text-[0.7rem]">
            <span>D4 gate: {tooltip.program.gate_D4}</span>
            <span>D6 gate: {tooltip.program.gate_D6}</span>
          </div>
        </div>
      )}
    </div>
  );
}
