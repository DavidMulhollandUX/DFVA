import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CompetitorPoint {
  name: string;
  analyticsMaturity: number;
  marketShare: number;
  fill: string;
  annotation?: string;
}

const competitors: CompetitorPoint[] = [
  {
    name: "DFVA",
    analyticsMaturity: 5,
    marketShare: 2,
    fill: "#2563eb",
    annotation: "No vendor owns\nthe analytics layer",
  },
  { name: "Coursedog", analyticsMaturity: 3, marketShare: 4, fill: "#6b7280" },
  { name: "CourseLoop", analyticsMaturity: 2, marketShare: 4, fill: "#9ca3af" },
  {
    name: "Modern Campus",
    analyticsMaturity: 1,
    marketShare: 3,
    fill: "#d1d5db",
  },
  {
    name: "Curriculog",
    analyticsMaturity: 1,
    marketShare: 3,
    fill: "#e5e7eb",
  },
];

function CustomDot(props: any) {
  const { cx, cy, payload } = props;
  if (!cx || !cy) return null;

  const isDFVA = payload.name === "DFVA";
  const r = isDFVA ? 10 : 7;
  const strokeWidth = isDFVA ? 3 : 1.5;
  const stroke = isDFVA ? "#1d4ed8" : payload.fill;

  return (
    <>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={payload.fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={isDFVA ? 1 : 0.85}
      />
      {isDFVA && (
        <text
          x={cx + 14}
          y={cy - 8}
          fontSize={11}
          fill="#1e40af"
          fontWeight={600}
          textAnchor="start"
        >
          {payload.annotation?.split("\n").map((line: string, i: number) => (
            <tspan key={i} x={cx + 14} dy={i === 0 ? 0 : 14}>
              {line}
            </tspan>
          ))}
        </text>
      )}
    </>
  );
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload as CompetitorPoint;
  return (
    <div className="border-border bg-card rounded-md border px-3 py-2 text-xs shadow-lg">
      <p className="text-foreground font-semibold">{d.name}</p>
      <p className="text-muted-foreground">
        Analytics Maturity:{" "}
        <span className="font-medium">{d.analyticsMaturity}/5</span>
      </p>
      <p className="text-muted-foreground">
        Market Share / Traction:{" "}
        <span className="font-medium">{d.marketShare}/5</span>
      </p>
      {d.annotation && (
        <p className="mt-1 font-medium whitespace-pre-line text-blue-600 dark:text-blue-400">
          {d.annotation}
        </p>
      )}
    </div>
  );
}

export default function CompetitiveLandscape() {
  return (
    <div className="w-full">
      <h3 className="text-foreground mb-2 text-center text-lg font-semibold">
        Competitive Landscape — Curriculum Analytics
      </h3>
      <p className="text-muted-foreground mb-4 text-center text-xs">
        Bubble size reflects relative market presence. DFVA is highlighted in
        blue — positioned to own the analytics layer.
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 180, bottom: 40, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis
            type="number"
            dataKey="analyticsMaturity"
            domain={[0.5, 5.5]}
            ticks={[1, 2, 3, 4, 5]}
            tick={{ fontSize: 12 }}
            label={{
              value: "Analytics Maturity →",
              position: "insideBottom",
              offset: -10,
              style: { fontSize: 13, fontWeight: 500 },
            }}
          />
          <YAxis
            type="number"
            dataKey="marketShare"
            domain={[0.5, 5.5]}
            ticks={[1, 2, 3, 4, 5]}
            tick={{ fontSize: 12 }}
            label={{
              value: "Market Share / Traction →",
              angle: -90,
              position: "insideLeft",
              offset: 0,
              style: { fontSize: 13, fontWeight: 500 },
            }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ strokeDasharray: "3 3" }}
          />
          <Scatter
            data={competitors}
            shape={<CustomDot />}
            isAnimationActive={false}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
