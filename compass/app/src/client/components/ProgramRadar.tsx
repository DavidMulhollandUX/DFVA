import { RADAR_LABELS } from "../../compass/data/rubric";

export interface RadarDimension {
  label: string;
  score: number;
  max: number;
}

interface ProgramRadarProps {
  dimensions: RadarDimension[];
  size?: number;
  className?: string;
  baseScore?: number;
}

export function ProgramRadar({
  dimensions,
  size = 220,
  className = "",
  baseScore = 20,
}: ProgramRadarProps) {
  // Filter out any bonus dimension to ensure exactly 10 core dimensions are rendered
  const coreDims = dimensions.filter(
    (d) =>
      !d.label.toLowerCase().includes("bonus") &&
      !d.label.toLowerCase().includes("irreplaceability"),
  );
  const n = Math.min(coreDims.length, 10);

  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - 26;

  // Determine risk band color from baseScore
  let color = "#ea580c"; // default high risk (orange)
  if (baseScore >= 28) color = "#16a34a"; // resilient (green)
  else if (baseScore >= 20) color = "#d97706"; // moderate risk (amber)
  else if (baseScore >= 12) color = "#ea580c"; // high risk (orange)
  else color = "#dc2626"; // critical (red)

  const angle = (i: number) => (i / n) * 2 * Math.PI - Math.PI / 2;

  const polar = (r: number, i: number) => ({
    x: cx + r * Math.cos(angle(i)),
    y: cy + r * Math.sin(angle(i)),
  });

  const gridPolygon = (level: number) =>
    Array.from({ length: n }, (_, i) => {
      const p = polar((level / 3) * maxR, i);
      return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
    }).join(" ");

  const dataPolygon = coreDims
    .slice(0, n)
    .map((d, i) => {
      const p = polar((d.score / 3) * maxR, i);
      return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <div
      className={`flex flex-col items-center ${className}`}
      style={{ padding: "6px 32px" }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ overflow: "visible" }}
        aria-label="Dimension radar chart"
      >
        {[1, 2, 3].map((level) => (
          <polygon
            key={level}
            points={gridPolygon(level)}
            fill="none"
            stroke="currentColor"
            className="text-muted-foreground/15 dark:text-zinc-800"
            strokeWidth={0.75}
          />
        ))}
        {Array.from({ length: n }, (_, i) => {
          const p = polar(maxR, i);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="currentColor"
              className="text-muted-foreground/15 dark:text-zinc-800"
              strokeWidth={0.75}
            />
          );
        })}
        <polygon
          points={dataPolygon}
          fill={color}
          fillOpacity={0.15}
          stroke={color}
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
        {coreDims.slice(0, n).map((d, i) => {
          const p = polar((d.score / 3) * maxR, i);
          return <circle key={i} cx={p.x} cy={p.y} r={2.5} fill={color} />;
        })}
        {coreDims.slice(0, n).map((_, i) => {
          const p = polar(maxR + 14, i);
          const cosA = Math.cos(angle(i));
          const sinA = Math.sin(angle(i));
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              textAnchor={cosA > 0.3 ? "start" : cosA < -0.3 ? "end" : "middle"}
              dominantBaseline={
                sinA > 0.3 ? "hanging" : sinA < -0.3 ? "auto" : "middle"
              }
              fontSize={8}
              className="fill-muted-foreground font-medium dark:fill-zinc-400"
            >
              {RADAR_LABELS[i] ?? ""}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
