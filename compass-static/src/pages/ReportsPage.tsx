import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { ArrowRight, BarChart2, TrendingUp } from 'lucide-react'

interface DimensionScore {
  label: string
  score: number
  max: number
}

interface ProgramReport {
  program: string
  institution: string
  level: string
  date: string
  score: number
  maxScore: number
  riskBand: 'RESILIENT' | 'MODERATE RISK' | 'HIGH RISK' | 'CRITICAL'
  thresholds: { q1: string; q2: string; q3: string }
  dimensions: DimensionScore[]
  assessmentSlug: string
  marketSlug: string
}

const PROGRAMS: ProgramReport[] = [
  {
    program: 'Bachelor of Design',
    institution: 'University of Melbourne',
    level: 'Bachelor · 3 years',
    date: '2026-04-21',
    score: 17,
    maxScore: 36,
    riskBand: 'HIGH RISK',
    thresholds: { q1: 'YES', q2: 'UNCERTAIN', q3: 'NO' },
    dimensions: [
      { label: 'Automation Exposure', score: 1, max: 3 },
      { label: 'Systems Thinking', score: 2, max: 3 },
      { label: 'Technical Depth', score: 1, max: 3 },
      { label: 'Decision-Making', score: 2, max: 3 },
      { label: 'AI Literacy', score: 1, max: 3 },
      { label: 'Domain Depth', score: 2, max: 3 },
      { label: 'Research Rigour', score: 1, max: 3 },
      { label: 'Human & Relational', score: 2, max: 3 },
      { label: 'Curriculum Currency', score: 2, max: 3 },
      { label: 'Outcome Evidence', score: 1, max: 3 },
      { label: 'Irreplaceability (bonus)', score: 2, max: 3 },
    ],
    assessmentSlug: 'dfva-b-des',
    marketSlug: 'dfva-market-b-des',
  },
]

const riskBandConfig: Record<
  string,
  { bg: string; text: string; border: string; bar: string; label: string }
> = {
  RESILIENT: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
    bar: 'bg-emerald-500',
    label: 'Resilient',
  },
  'MODERATE RISK': {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    text: 'text-yellow-700 dark:text-yellow-300',
    border: 'border-yellow-200 dark:border-yellow-800',
    bar: 'bg-yellow-500',
    label: 'Moderate Risk',
  },
  'HIGH RISK': {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-700 dark:text-orange-300',
    border: 'border-orange-200 dark:border-orange-800',
    bar: 'bg-orange-500',
    label: 'High Risk',
  },
  CRITICAL: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-200 dark:border-red-800',
    bar: 'bg-red-500',
    label: 'Critical',
  },
}

const thresholdConfig: Record<string, string> = {
  YES: 'text-red-600 dark:text-red-400',
  NO: 'text-emerald-600 dark:text-emerald-400',
  UNCERTAIN: 'text-yellow-600 dark:text-yellow-400',
}

function dimBarColor(score: number, max: number) {
  const pct = score / max
  if (pct >= 0.67) return 'bg-emerald-500'
  if (pct >= 0.34) return 'bg-yellow-500'
  return 'bg-orange-500'
}

function ScoreGauge({ score, max, band }: { score: number; max: number; band: string }) {
  const cfg = riskBandConfig[band]
  const pct = Math.round((score / max) * 100)
  const circumference = 2 * Math.PI * 44
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`relative flex h-24 w-24 items-center justify-center rounded-full border-4 ${cfg.border} ${cfg.bg}`}
      >
        <div className="text-center">
          <span className={`text-2xl font-bold ${cfg.text}`}>{score}</span>
          <span className="block text-xs text-muted-foreground">/ {max}</span>
        </div>
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 96 96" fill="none">
          <circle cx="48" cy="48" r="44" strokeWidth="4" className="stroke-border" />
          <circle
            cx="48"
            cy="48"
            r="44"
            strokeWidth="4"
            strokeDasharray={`${(pct / 100) * circumference} ${circumference}`}
            strokeLinecap="round"
            className={`${cfg.bar} opacity-80`}
            stroke="currentColor"
          />
        </svg>
      </div>
      <span
        className={`mt-2 rounded-full px-3 py-0.5 text-xs font-semibold ${cfg.bg} ${cfg.text} border ${cfg.border}`}
      >
        {cfg.label}
      </span>
    </div>
  )
}

function DimensionBars({ dimensions }: { dimensions: DimensionScore[] }) {
  return (
    <div className="mt-4 space-y-2">
      {dimensions.map((d) => (
        <div key={d.label} className="flex items-center gap-3">
          <span className="w-40 shrink-0 truncate text-xs text-muted-foreground">{d.label}</span>
          <div className="flex flex-1 items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all ${dimBarColor(d.score, d.max)}`}
                style={{ width: `${(d.score / d.max) * 100}%` }}
              />
            </div>
            <span className="w-8 shrink-0 text-right text-xs font-medium text-foreground">
              {d.score}/{d.max}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

function ThresholdPills({ thresholds }: { thresholds: { q1: string; q2: string; q3: string } }) {
  const items = [
    { label: 'AI replaces output?', value: thresholds.q1 },
    { label: 'Designs systems / owns decisions?', value: thresholds.q2 },
    { label: 'More employable in 5 years?', value: thresholds.q3 },
  ]
  return (
    <div className="mt-4 space-y-1.5">
      {items.map((item) => (
        <div key={item.label} className="flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground">{item.label}</span>
          <span className={`text-xs font-bold ${thresholdConfig[item.value] ?? ''}`}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function ReportsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Assessment Reports</h1>
        <p className="mt-2 text-muted-foreground">
          DFVA reports generated to date. Each card includes the full scorecard assessment and
          companion market intelligence.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {PROGRAMS.map((p) => {
          const cfg = riskBandConfig[p.riskBand]
          return (
            <Card key={p.assessmentSlug} className={`border ${cfg.border} overflow-hidden`}>
              {/* Header */}
              <CardHeader className={`${cfg.bg} pb-4`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg leading-snug">{p.program}</CardTitle>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {p.institution} · {p.level}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Assessed {p.date}</p>
                  </div>
                  <ScoreGauge score={p.score} max={p.maxScore} band={p.riskBand} />
                </div>
              </CardHeader>

              <CardContent className="pt-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Dimension Scores
                </p>
                <DimensionBars dimensions={p.dimensions} />

                <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Threshold Questions
                </p>
                <ThresholdPills thresholds={p.thresholds} />

                {/* Report links */}
                <div
                  className={`mt-6 grid grid-cols-2 divide-x overflow-hidden rounded-lg border ${cfg.border}`}
                >
                  <Link
                    to={`/reports/${p.assessmentSlug}`}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${cfg.text} transition-colors hover:${cfg.bg}`}
                  >
                    <BarChart2 className="h-4 w-4 shrink-0" />
                    <span>DFVA Assessment</span>
                    <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0" />
                  </Link>
                  <Link
                    to={`/reports/${p.marketSlug}`}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${cfg.text} transition-colors hover:${cfg.bg}`}
                  >
                    <TrendingUp className="h-4 w-4 shrink-0" />
                    <span>Market Intelligence</span>
                    <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
