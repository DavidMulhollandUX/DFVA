// compass/app/src/client/components/ProgramRadar.tsx
import { useState } from 'react';

export interface RadarDimension {
  label: string;
  score: number;
  max: number;
  target?: number; // optional target overlay
}

interface ProgramRadarProps {
  dimensions: RadarDimension[];
  size?: number;
  showTarget?: boolean;
  className?: string;
}

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function dimensionColor(score: number, max: number): string {
  const pct = score / max;
  if (pct >= 0.83) return 'rgb(16, 185, 129)'; // emerald-500
  if (pct >= 0.5) return 'rgb(234, 179, 8)';   // yellow-500
  return 'rgb(239, 68, 68)';                     // red-500
}

export function ProgramRadar({ dimensions, size = 280, showTarget = false, className = '' }: ProgramRadarProps) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.35;
  const levels = [1, 2, 3];
  const n = dimensions.length;
  const angleStep = 360 / n;

  // Grid rings
  const gridRings = levels.map(level => {
    const r = (level / 3) * maxR;
    const points = dimensions.map((_, i) => {
      const angle = i * angleStep;
      const pt = polarToCartesian(cx, cy, r, angle);
      return `${pt.x},${pt.y}`;
    }).join(' ');
    return <polygon key={`ring-${level}`} points={points} fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" opacity={0.3} />;
  });

  // Axis lines
  const axes = dimensions.map((_, i) => {
    const angle = i * angleStep;
    const pt = polarToCartesian(cx, cy, maxR, angle);
    return <line key={`axis-${i}`} x1={cx} y1={cy} x2={pt.x} y2={pt.y} stroke="currentColor" strokeWidth="0.5" className="text-border" opacity={0.2} />;
  });

  // Score polygon
  const scorePoints = dimensions.map((d, i) => {
    const angle = i * angleStep;
    const r = (d.score / d.max) * maxR;
    const pt = polarToCartesian(cx, cy, r, angle);
    return `${pt.x},${pt.y}`;
  }).join(' ');

  // Target polygon (optional)
  const targetPolygon = showTarget ? (
    <polygon
      points={dimensions.map((d, i) => {
        const angle = i * angleStep;
        const r = ((d.target || d.score) / d.max) * maxR;
        const pt = polarToCartesian(cx, cy, r, angle);
        return `${pt.x},${pt.y}`;
      }).join(' ')}
      fill="none"
      stroke="rgb(59, 130, 246)"
      strokeWidth="1.5"
      strokeDasharray="4 2"
      opacity={0.6}
    />
  ) : null;

  // Dots at each score point
  const dots = dimensions.map((d, i) => {
    const angle = i * angleStep;
    const r = (d.score / d.max) * maxR;
    const pt = polarToCartesian(cx, cy, r, angle);
    return <circle key={`dot-${i}`} cx={pt.x} cy={pt.y} r={3} fill={dimensionColor(d.score, d.max)} />;
  });

  // Labels
  const labels = dimensions.map((d, i) => {
    const angle = i * angleStep;
    const labelR = maxR + 28;
    const pt = polarToCartesian(cx, cy, labelR, angle);
    const rotation = angle > 90 && angle < 270 ? angle + 180 : angle;
    const anchor = angle > 90 && angle < 270 ? 'end' : 'start';
    return (
      <text
        key={`label-${i}`}
        x={pt.x}
        y={pt.y}
        textAnchor={anchor}
        dominantBaseline="middle"
        fontSize="9"
        className="fill-muted-foreground"
        transform={`rotate(${rotation}, ${pt.x}, ${pt.y})`}
      >
        {d.label.length > 12 ? d.label.slice(0, 11) + '…' : d.label}
      </text>
    );
  });

  // Score labels near each dot
  const scoreLabels = dimensions.map((d, i) => {
    const angle = i * angleStep;
    const r = (d.score / d.max) * maxR + 12;
    const pt = polarToCartesian(cx, cy, r, angle);
    return (
      <text
        key={`score-${i}`}
        x={pt.x}
        y={pt.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="8"
        fontWeight="600"
        fill={dimensionColor(d.score, d.max)}
      >
        {d.score}
      </text>
    );
  });

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {gridRings}
        {axes}
        <polygon
          points={scorePoints}
          fill={dimensionColor(
            dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length,
            3
          )}
          fillOpacity={0.15}
          stroke={dimensionColor(
            dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length,
            3
          )}
          strokeWidth="1.5"
        />
        {targetPolygon}
        {dots}
        {scoreLabels}
        {labels}
      </svg>
    </div>
  );
}
