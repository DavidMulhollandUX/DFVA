import type { DimensionScore } from '../../data/programData'
import { RISK_CONFIG, type RiskBand } from './ScoreArc'
import { RADAR_LABELS } from '../../data/rubric'

interface DimensionRadarProps {
  /** Pass only the 10 core dimensions (no bonus) */
  dimensions: DimensionScore[]
  band: RiskBand
  size?: number
}

/** Pure SVG radar chart. 10 axes from top, clockwise. Grid at levels 1/2/3. */
export function DimensionRadar({ dimensions, band, size = 200 }: DimensionRadarProps) {
  const cfg = RISK_CONFIG[band]
  const cx = size / 2
  const cy = size / 2
  const maxR = size / 2 - 26
  const n = Math.min(dimensions.length, 10)

  const angle = (i: number) => (i / n) * 2 * Math.PI - Math.PI / 2

  const polar = (r: number, i: number) => ({
    x: cx + r * Math.cos(angle(i)),
    y: cy + r * Math.sin(angle(i)),
  })

  const gridPolygon = (level: number) =>
    Array.from({ length: n }, (_, i) => {
      const p = polar((level / 3) * maxR, i)
      return `${p.x.toFixed(2)},${p.y.toFixed(2)}`
    }).join(' ')

  const dataPolygon = dimensions
    .slice(0, n)
    .map((d, i) => {
      const p = polar((d.score / 3) * maxR, i)
      return `${p.x.toFixed(2)},${p.y.toFixed(2)}`
    })
    .join(' ')

  return (
    // Padding gives overflowing axis labels room; overflow:visible lets SVG paint into it
    <div style={{ padding: '6px 32px' }}>
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ overflow: 'visible' }}
      aria-label="Dimension radar chart"
    >
      {[1, 2, 3].map((level) => (
        <polygon
          key={level}
          points={gridPolygon(level)}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={0.75}
        />
      ))}
      {Array.from({ length: n }, (_, i) => {
        const p = polar(maxR, i)
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="#e5e7eb"
            strokeWidth={0.75}
          />
        )
      })}
      <polygon
        points={dataPolygon}
        fill={cfg.color}
        fillOpacity={0.15}
        stroke={cfg.color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {dimensions.slice(0, n).map((d, i) => {
        const p = polar((d.score / 3) * maxR, i)
        return <circle key={i} cx={p.x} cy={p.y} r={2.5} fill={cfg.color} />
      })}
      {dimensions.slice(0, n).map((_, i) => {
        const p = polar(maxR + 14, i)
        const cosA = Math.cos(angle(i))
        const sinA = Math.sin(angle(i))
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor={cosA > 0.3 ? 'start' : cosA < -0.3 ? 'end' : 'middle'}
            dominantBaseline={sinA > 0.3 ? 'hanging' : sinA < -0.3 ? 'auto' : 'middle'}
            fontSize={8}
            fill="#6b7280"
          >
            {RADAR_LABELS[i] ?? ''}
          </text>
        )
      })}
    </svg>
    </div>
  )
}
