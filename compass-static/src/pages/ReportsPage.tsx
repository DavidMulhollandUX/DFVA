import { Link } from 'react-router-dom'
import { ArrowRight, BarChart2, ClipboardList, TrendingUp } from 'lucide-react'
import { PROGRAMS } from '../data/programData'
import { ScoreArc, DimensionRadar, DimensionSteps, ThresholdPanel, RISK_CONFIG } from '../components/dfva'

export default function ReportsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Assessment Reports</h1>
        <p className="mt-2 text-muted-foreground">
          DFVA reports generated to date. Each card shows the full scorecard,
          dimension radar, and companion market intelligence.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {PROGRAMS.map((p) => {
          const cfg = RISK_CONFIG[p.riskBand]
          const coreDims = p.dimensions.filter((d) => !d.label.includes('bonus'))

          return (
            <div
              key={p.assessmentSlug}
              className="overflow-hidden rounded-xl border"
              style={{ borderColor: cfg.color + '40' }}
            >
              {/* ── Header ── */}
              <div
                className="flex items-start justify-between gap-4 px-6 py-5"
                style={{ background: cfg.track }}
              >
                <div className="min-w-0">
                  <h2 className="text-lg font-bold leading-snug text-foreground">{p.program}</h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {p.institution} · {p.level}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Assessed {p.date}</p>
                </div>
                <ScoreArc score={p.score} max={p.maxScore} band={p.riskBand} size={104} />
              </div>

              {/* ── Body ── */}
              <div className="px-6 pb-6 pt-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Dimension Scores
                </p>
                <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-[1fr_auto]">
                  <DimensionSteps dimensions={coreDims} programSlug={p.assessmentSlug} />
                  <div className="hidden sm:block">
                    <DimensionRadar dimensions={coreDims} band={p.riskBand} size={180} />
                  </div>
                </div>

                <div className="mt-6 border-t border-border pt-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Threshold Questions
                  </p>
                  <ThresholdPanel thresholds={p.thresholds} />
                </div>

                {/* Report links */}
                <div
                  className="mt-6 overflow-hidden rounded-lg border"
                  style={{ borderColor: cfg.color + '40' }}
                >
                  <div className={['grid divide-x', p.recommendSlug ? 'grid-cols-3' : 'grid-cols-2'].join(' ')}>
                    <Link
                      to={`/reports/${p.assessmentSlug}`}
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors hover:opacity-80"
                      style={{ color: cfg.text }}
                    >
                      <BarChart2 className="h-4 w-4 shrink-0" />
                      <span className="truncate">Assessment</span>
                      <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0" />
                    </Link>
                    <Link
                      to={`/reports/${p.marketSlug}`}
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors hover:opacity-80"
                      style={{ color: cfg.text }}
                    >
                      <TrendingUp className="h-4 w-4 shrink-0" />
                      <span className="truncate">Market Intel</span>
                      <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0" />
                    </Link>
                    {p.recommendSlug && (
                      <Link
                        to={`/reports/${p.recommendSlug}`}
                        className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors hover:opacity-80"
                        style={{ color: cfg.text }}
                      >
                        <ClipboardList className="h-4 w-4 shrink-0" />
                        <span className="truncate">Improvement Plan</span>
                        <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
