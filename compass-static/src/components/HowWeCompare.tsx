import { useState } from 'react'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'

interface ComparisonPoint {
  aspect: string
  dfva: string
  coursedog: string
}

const comparisons: ComparisonPoint[] = [
  {
    aspect: 'What is scored',
    dfva: 'Curriculum design — learning outcomes, assessment structures, graduate capabilities',
    coursedog: 'Career alignment — syllabus-to-job-role mapping via LMI data',
  },
  {
    aspect: 'Methodology',
    dfva: 'Published 10-dimension rubric with scored criteria',
    coursedog: 'AI syllabus scanning + real-time job market matching',
  },
  {
    aspect: 'Independence',
    dfva: 'Methodology-first. Vendor-neutral. Citable.',
    coursedog: 'Platform-first. Requires Coursedog SIS integration.',
  },
  {
    aspect: 'Forward-looking',
    dfva: 'Scores AI-durability — readiness for tomorrow\'s market',
    coursedog: 'Scores alignment with today\'s job market',
  },
]

export default function HowWeCompare() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-8 rounded-xl border border-border bg-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/50 transition-colors"
      >
        <div>
          <h3 className="font-semibold text-foreground">How we compare</h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            DFVA methodology vs ERP vendor LMI overlays
          </p>
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        )}
      </button>

      {open && (
        <div className="border-t border-border px-6 py-4 space-y-4">
          {comparisons.map((c) => (
            <div key={c.aspect}>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {c.aspect}
              </h4>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-orange-200 bg-orange-50/50 p-3 dark:border-orange-900 dark:bg-orange-950/10">
                  <div className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-1">
                    DFVA
                  </div>
                  <p className="text-sm text-foreground">{c.dfva}</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <div className="text-xs font-semibold text-muted-foreground mb-1">
                    ERP Vendor LMI
                  </div>
                  <p className="text-sm text-muted-foreground">{c.coursedog}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <a
              href="/#/methodology"
              className="inline-flex items-center gap-1 text-sm text-orange-500 hover:underline"
            >
              Read the full methodology
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
