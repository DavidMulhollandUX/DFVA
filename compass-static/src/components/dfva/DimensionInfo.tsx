import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { Dimension } from '../../data/rubric'
import type { DimensionEvidence } from '../../data/dimensionEvidence'
import { stepColor } from './dimensionColors'

interface DimensionPopoverProps {
  dim: Dimension
  /** This program's score for the dimension (0-3). */
  score: number
  /** Per-program evidence, if available. */
  evidence?: DimensionEvidence
  /** Bounding rect of the clicked trigger (used to anchor the floating panel). */
  anchorRect: DOMRect | null
  onClose: () => void
}

const PANEL_W = 340

/**
 * Floating, clip-safe dimension detail panel. Uses fixed positioning so it escapes
 * the report cards' `overflow-hidden`. Shows the rubric definition, the 0-3 criteria
 * (this program's level highlighted), the program's rationale, and recommendations —
 * i.e. a score traced back to the rubric and the evidence behind it.
 */
export function DimensionPopover({ dim, score, evidence, anchorRect, onClose }: DimensionPopoverProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    const onReflow = () => onClose()
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    window.addEventListener('scroll', onReflow, true)
    window.addEventListener('resize', onReflow)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('scroll', onReflow, true)
      window.removeEventListener('resize', onReflow)
    }
  }, [onClose])

  if (!anchorRect) return null

  const margin = 8
  // Prefer the right of the trigger; flip left if it would overflow the viewport.
  let left = anchorRect.right + margin
  if (left + PANEL_W > window.innerWidth - margin) {
    left = Math.max(margin, anchorRect.left - PANEL_W - margin)
  }
  const top = Math.max(margin, Math.min(anchorRect.top, window.innerHeight - 340))

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label={`${dim.id} ${dim.name}`}
      className="rounded-xl border bg-white p-4 text-left shadow-xl"
      style={{ position: 'fixed', top, left, width: PANEL_W, zIndex: 50, maxHeight: '72vh', overflowY: 'auto' }}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h4 className="text-sm font-bold leading-snug text-foreground">
          <span className="mr-1.5 rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[11px] text-gray-600">{dim.id}</span>
          {dim.name}
        </h4>
        <button type="button" onClick={onClose} aria-label="Close" className="shrink-0 text-gray-400 hover:text-gray-600">
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="mb-3 text-xs leading-relaxed text-muted-foreground">{dim.definition}</p>

      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Rubric (0–3)</p>
      <div className="mb-3 space-y-1">
        {dim.levels.map((l) => {
          const active = l.score === score
          const c = stepColor(score)
          return (
            <div
              key={l.score}
              className="flex gap-2 rounded-md px-2 py-1 text-xs"
              style={{
                background: active ? c + '1f' : 'transparent',
                border: active ? `1px solid ${c}66` : '1px solid transparent',
              }}
            >
              <span className="font-semibold tabular-nums" style={{ color: active ? c : '#9ca3af' }}>
                {l.score}
              </span>
              <span className={active ? 'text-foreground' : 'text-muted-foreground'}>{l.criteria}</span>
            </div>
          )
        })}
      </div>

      {evidence?.rationale ? (
        <>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Why this program scored {score}/3
          </p>
          <p className="mb-3 text-xs leading-relaxed text-foreground">{evidence.rationale}</p>
        </>
      ) : null}

      {evidence?.recommendations?.length ? (
        <>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Linked recommendations</p>
          <ul className="space-y-1.5">
            {evidence.recommendations.map((r, i) => (
              <li key={i} className="text-xs leading-snug text-foreground">
                {(r.priority || r.effort) && (
                  <span className="mr-1 inline-block rounded bg-gray-100 px-1 py-0.5 text-[10px] font-semibold text-gray-600">
                    {[r.priority, r.effort].filter(Boolean).join(' · ')}
                  </span>
                )}
                {r.action}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  )
}
