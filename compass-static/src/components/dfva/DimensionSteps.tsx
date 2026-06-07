import { useState } from 'react'
import type { DimensionScore } from '../../data/programData'
import { RUBRIC } from '../../data/rubric'
import { DIMENSION_EVIDENCE } from '../../data/dimensionEvidence'
import { stepColor } from './dimensionColors'
import { DimensionPopover } from './DimensionInfo'

interface DimensionStepsProps {
  dimensions: DimensionScore[]
  /** Assessment slug (e.g. "dfva-b-des") — enables the per-program evidence popover. */
  programSlug?: string
}

const dimByLabel = (label: string) => RUBRIC.find((r) => r.demoLabel === label)

/** Segmented step bars — 3 discrete slots filled left-to-right by score. Each row is a
 *  button that opens the rubric + evidence popover for that dimension. */
export function DimensionSteps({ dimensions, programSlug }: DimensionStepsProps) {
  const [open, setOpen] = useState<{ label: string; rect: DOMRect } | null>(null)
  const openDim = open ? dimByLabel(open.label) : undefined
  const openScore = open ? (dimensions.find((d) => d.label === open.label)?.score ?? 0) : 0
  const evidence = programSlug && openDim ? DIMENSION_EVIDENCE[programSlug]?.[openDim.id] : undefined

  return (
    <div className="space-y-2">
      {dimensions.map((d) => {
        const color = stepColor(d.score)
        const meta = dimByLabel(d.label)
        return (
          <button
            type="button"
            key={d.label}
            onClick={(e) => setOpen({ label: d.label, rect: e.currentTarget.getBoundingClientRect() })}
            className="grid w-full cursor-pointer items-center gap-x-2 rounded-md py-0.5 text-left transition-colors hover:bg-gray-50"
            style={{ gridTemplateColumns: '8rem 1fr 2rem' }}
            title={meta ? `${meta.id} — click for rubric & evidence` : d.label}
          >
            <span className="truncate text-xs text-muted-foreground">{d.label}</span>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: d.max }, (_, i) => (
                <div key={i} className="h-2.5 flex-1 rounded-sm" style={{ background: i < d.score ? color : '#e5e7eb' }} />
              ))}
            </div>
            <span
              className="text-right text-xs font-semibold tabular-nums"
              style={{ color: d.score === 0 ? '#9ca3af' : color }}
            >
              {d.score}/{d.max}
            </span>
          </button>
        )
      })}

      {open && openDim && (
        <DimensionPopover
          dim={openDim}
          score={openScore}
          evidence={evidence}
          anchorRect={open.rect}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  )
}
