import { useState } from "react";
import { useNavigate } from "react-router";
import { MatrixAreaLabels } from "../../matrixAreaLabels";
import { DIMENSION_LABELS, QUADRANTS } from "../../v2/quadrants";
import { V3_META, type V3Program } from "../data/v3Programs";
import { DIMENSION_ORDER } from "../data/portfolioStats";

// Scale bounds match the report-page matrices so a program sits in the same
// visual place on both surfaces.
const X_MIN = 60;
const X_MAX = 100;
const Y_MAX = 15;

interface TooltipState {
  program: V3Program;
  x: number;
  y: number;
}

export function PortfolioMatrix({
  programs,
  activeFaculty = null,
}: {
  programs: V3Program[];
  activeFaculty?: string | null;
}) {
  const navigate = useNavigate();
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const W = 800;
  const H = 520;
  const pad = { top: 40, right: 40, bottom: 52, left: 54 };
  const pw = W - pad.left - pad.right;
  const ph = H - pad.top - pad.bottom;
  const sx = (v: number) => pad.left + ((v - X_MIN) / (X_MAX - X_MIN)) * pw;
  const sy = (v: number) => pad.top + ph - (v / Y_MAX) * ph;

  const active = activeFaculty
    ? programs.filter((p) => p.faculty === activeFaculty)
    : programs;
  const faded = activeFaculty
    ? programs.filter((p) => p.faculty !== activeFaculty)
    : [];

  const mx = sx(V3_META.expMedian);
  const my = sy(V3_META.adaptMedian);

  // Sparse name labels: skip when too close to an already-labelled dot.
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

        {/* Median thresholds — the only lines that define position */}
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
        {faded.map((p) => (
          <circle
            key={`f-${p.code}`}
            cx={sx(p.exposure)}
            cy={sy(p.adaptiveness)}
            r={3}
            fill="#5C7088"
            opacity="0.18"
          />
        ))}

        {active.map((p) => {
          const x = sx(p.exposure);
          const y = sy(p.adaptiveness);
          return (
            <g key={p.code}>
              <circle
                cx={x}
                cy={y}
                r={5.5}
                fill={QUADRANTS[p.quadrant].hex}
                stroke="var(--color-background)"
                strokeWidth={1}
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
                onClick={() => navigate(`/insights/v31/${p.code}`)}
              />
              {showLabel(x, y) && (
                <text
                  x={x}
                  y={y - 9}
                  fill="#0F2236"
                  fontSize={9}
                  textAnchor="middle"
                  opacity="0.75"
                >
                  {p.name.replace(/^(Master|Bachelor) of /, "")}
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
          Destination AI exposure — how much graduates' occupations overlap with
          what AI can do →
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
        {[60, 70, 80, 90, 100].map((x) => (
          <text
            key={`tx${x}`}
            x={sx(x)}
            y={H - pad.bottom + 16}
            fill="#8593A6"
            fontSize={10}
            textAnchor="middle"
          >
            {x}
          </text>
        ))}
        {[0, 3, 6, 9, 12, 15].map((y) => (
          <text
            key={`ty${y}`}
            x={pad.left - 8}
            y={sy(y) + 4}
            fill="#8593A6"
            fontSize={10}
            textAnchor="end"
          >
            {y}
          </text>
        ))}
      </svg>

      {tooltip && (
        <div
          className="border-border bg-card pointer-events-none absolute z-10 max-w-xs rounded-md border p-3 text-xs shadow-lg"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="text-foreground mb-1.5 font-semibold">
            {tooltip.program.name}
          </div>
          <div
            className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[0.7rem] font-medium ${
              QUADRANTS[tooltip.program.quadrant].badgeClass
            }`}
          >
            {QUADRANTS[tooltip.program.quadrant].desc}
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-muted-foreground">Destination exposure</span>
            <span>{tooltip.program.exposure.toFixed(1)}</span>
          </div>
          <div className="mb-1.5 flex justify-between gap-6">
            <span className="text-muted-foreground">
              Curriculum adaptiveness
            </span>
            <span>{tooltip.program.adaptiveness}/15</span>
          </div>
          {DIMENSION_ORDER.map((d) => (
            <div key={d} className="flex justify-between gap-6 text-[0.7rem]">
              <span className="text-muted-foreground">
                {DIMENSION_LABELS[d]}
              </span>
              <span>{tooltip.program.dimensionScores[d]}/3</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
