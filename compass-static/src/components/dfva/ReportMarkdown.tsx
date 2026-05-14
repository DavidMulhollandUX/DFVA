import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react'
import { RISK_CONFIG } from './ScoreArc'
import type { Components } from 'react-markdown'
import type { ReactNode } from 'react'

// ─── text extraction ──────────────────────────────────────────────────────────

function childText(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(childText).join('')
  if (node && typeof node === 'object' && 'props' in (node as object))
    return childText((node as { props: { children?: ReactNode } }).props.children)
  return ''
}

// ─── risk badges ──────────────────────────────────────────────────────────────

const RISK_BADGE_CFG: Record<string, { color: string; bg: string }> = {
  HIGH:         { color: '#dc2626', bg: '#fef2f2' },
  MEDIUM:       { color: '#d97706', bg: '#fffbeb' },
  LOW:          { color: '#16a34a', bg: '#f0fdf4' },
  'LOW–MEDIUM': { color: '#d97706', bg: '#fffbeb' },
}

function normaliseRisk(raw: string): string {
  return raw.toUpperCase().replace(/[-–—]/, '–').trim()
}

function RiskBadge({ token }: { token: string }) {
  const cfg = RISK_BADGE_CFG[token] ?? RISK_BADGE_CFG['MEDIUM']
  return (
    <span
      className="inline-flex shrink-0 items-center rounded px-1.5 py-0.5 text-[10px] font-bold leading-none tracking-wide"
      style={{ color: cfg.color, background: cfg.bg }}
    >
      {token}
    </span>
  )
}

function splitRisk(text: string): [string, string] | null {
  const m = text.match(/^(LOW[–\-]MEDIUM|HIGH|MEDIUM|LOW)\s*([—–\-(].*)$/i)
  if (!m) return null
  return [normaliseRisk(m[1]), m[2].trimStart()]
}

// ─── score dots ───────────────────────────────────────────────────────────────

const DOT_COLOR: Record<number, string> = {
  3: '#16a34a', 2: '#d97706', 1: '#ea580c', 0: '#e5e7eb',
}

function ScoreDots({ score }: { score: number }) {
  return (
    <span className="inline-flex items-center gap-1">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className="inline-block h-2 w-2 rounded-full"
          style={{ background: i <= score ? DOT_COLOR[score] : DOT_COLOR[0] }}
        />
      ))}
    </span>
  )
}

// ─── direction cell ───────────────────────────────────────────────────────────

function DirectionCell({ text }: { text: string }) {
  const t = text.trim()
  if (t === 'Up')
    return <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: '#16a34a' }}><TrendingUp className="h-3.5 w-3.5" />Up</span>
  if (t === 'Down')
    return <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: '#dc2626' }}><TrendingDown className="h-3.5 w-3.5" />Down</span>
  if (t === 'Emerging')
    return <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: '#d97706' }}><Sparkles className="h-3.5 w-3.5" />Emerging</span>
  return null
}

// ─── status chips ─────────────────────────────────────────────────────────────

function StatusChip({ text }: { text: string }) {
  if (text.includes('Critical gap'))
    return <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-semibold" style={{ color: '#d97706', background: '#fffbeb' }}>⚠ Critical gap</span>
  if (text === 'Adequate')
    return <span className="rounded px-1.5 py-0.5 text-[10px] font-medium" style={{ color: '#6b7280', background: '#f3f4f6' }}>Adequate</span>
  return null
}

// ─── effort badges ────────────────────────────────────────────────────────────

const EFFORT_CFG: Record<string, { color: string; bg: string }> = {
  Low:    { color: '#16a34a', bg: '#f0fdf4' },
  Medium: { color: '#d97706', bg: '#fffbeb' },
  High:   { color: '#dc2626', bg: '#fef2f2' },
}

function isEffortText(text: string): boolean {
  return /^(Low|Medium|High)([–\-]\w+)?$/i.test(text)
}

function EffortBadge({ text }: { text: string }) {
  const normalised = text.replace(/[-–—]/, '–').trim()
  const key = Object.keys(EFFORT_CFG).find(k => normalised.toLowerCase().startsWith(k.toLowerCase()))
  if (!key) return null
  const cfg = EFFORT_CFG[key]
  return (
    <span
      className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium leading-none"
      style={{ color: cfg.color, background: cfg.bg }}
    >
      {normalised}
    </span>
  )
}

// ─── risk-band colouring ──────────────────────────────────────────────────────

const BAND_PATTERN = /\b(HIGH RISK|MODERATE RISK|RESILIENT|CRITICAL)\b/

function colourBand(text: string): ReactNode {
  const parts = text.split(BAND_PATTERN)
  if (parts.length === 1) return text
  return (
    <>
      {parts.map((part, i) => {
        const band = part as keyof typeof RISK_CONFIG
        if (RISK_CONFIG[band]) return <strong key={i} style={{ color: RISK_CONFIG[band].color }}>{part}</strong>
        return part
      })}
    </>
  )
}

// ─── score summary bar ────────────────────────────────────────────────────────

const SCORE_SUMMARY_RE = /TOTAL[:.]?\s*(\d+)\s*[\/\\]\s*(\d+)/i
const RISK_BAND_LINE_RE = /Risk\s+band[:.]?\s*(.+)/i

function ScoreSummaryBar({ children }: { children: ReactNode }) {
  const text = childText(children)
  const scoreMatch = text.match(SCORE_SUMMARY_RE)
  const bandMatch  = text.match(RISK_BAND_LINE_RE)
  const score = scoreMatch ? Number(scoreMatch[1]) : null
  const max   = scoreMatch ? Number(scoreMatch[2]) : null
  const bandText = bandMatch ? bandMatch[1].trim() : null
  const band = bandText
    ? (Object.keys(RISK_CONFIG) as Array<keyof typeof RISK_CONFIG>).find(k => bandText.includes(k))
    : null
  const cfg = band ? RISK_CONFIG[band] : null
  return (
    <div
      className="my-5 flex flex-wrap items-center gap-4 rounded-lg border px-5 py-4"
      style={cfg ? { borderColor: cfg.color + '40', background: cfg.track } : {}}
    >
      {score !== null && max !== null && (
        <span className="tabular-nums">
          <span className="text-2xl font-bold leading-none" style={cfg ? { color: cfg.color } : {}}>{score}</span>
          <span className="text-sm text-muted-foreground"> / {max}</span>
        </span>
      )}
      {cfg && band && (
        <span
          className="rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide"
          style={{ color: cfg.text, background: cfg.color + '1a' }}
        >
          {cfg.label}
        </span>
      )}
    </div>
  )
}

// ─── roadmap timeline card ────────────────────────────────────────────────────

const ROADMAP_RE = /^(?:Month|Months)\s+([\d–\-]+)\s+[—–\-]+\s+([^:]+):\s*(.*)/s

function RoadmapCard({ range, phase, body }: { range: string; phase: string; body: string }) {
  const items = body.split(/\s*·\s*/).map(s => s.trim()).filter(Boolean)
  return (
    <div className="mb-3 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="flex items-center gap-2.5 border-b border-border bg-muted/50 px-4 py-2.5">
        <span className="rounded-full bg-foreground px-2.5 py-0.5 text-[10px] font-bold tabular-nums text-background">
          {range}
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest text-foreground">{phase}</span>
      </div>
      <ul className="space-y-1.5 px-4 py-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
            {colourBand(item)}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── section header ───────────────────────────────────────────────────────────

const NUMBERED_H3 = /^(\d+)\.\s+(.*)/

function SectionHeader({ children }: { children: ReactNode }) {
  const text = childText(children)
  const m = text.match(NUMBERED_H3)
  const [num, label] = m ? [m[1], m[2]] : [null, text]
  return (
    <div className="mb-1.5 mt-14 flex items-center gap-3 border-t border-border/60 pt-8 first:mt-0 first:border-t-0 first:pt-0">
      {num && (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-foreground text-[10px] font-bold tabular-nums text-background">
          {num}
        </span>
      )}
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground">{label}</h3>
    </div>
  )
}

// ─── smart table cell ─────────────────────────────────────────────────────────
// react-markdown v9 converts hast properties.align → style.textAlign on the td props

function SmartCell({ children, textAlign }: { children: ReactNode; textAlign?: string }) {
  const text = childText(children).trim()
  const isRightAligned = textAlign === 'right'

  // Right-aligned single digit 0–3 → score dots (score column)
  if (isRightAligned && /^[0-3]$/.test(text)) {
    return (
      <td className="px-3 py-2.5 text-right">
        <ScoreDots score={Number(text)} />
      </td>
    )
  }

  // Fraction x/3 → coloured fraction text (Score-to-Action Mapping table)
  if (/^[0-3]\/3$/.test(text)) {
    const n = Number(text[0])
    return (
      <td className="px-3 py-2.5 tabular-nums text-xs font-semibold" style={{ color: DOT_COLOR[n] }}>
        {text}
      </td>
    )
  }

  // Direction indicators (Market Intel table) — regex pre-check, not JSX truthiness
  if (/^(Up|Down|Emerging)$/.test(text)) {
    return <td className="px-3 py-2.5"><DirectionCell text={text} /></td>
  }

  // Status chips (Diagnostic Summary table) — regex pre-check, not JSX truthiness
  if (text.includes('Critical gap') || text === 'Adequate') {
    return <td className="px-3 py-2.5"><StatusChip text={text} /></td>
  }

  // Standalone risk level (entire cell is just HIGH / MEDIUM / LOW)
  if (/^(LOW[–\-]MEDIUM|HIGH|MEDIUM|LOW)$/i.test(text)) {
    return <td className="px-3 py-2.5"><RiskBadge token={normaliseRisk(text)} /></td>
  }

  // Risk level + separator → badge + remainder
  const riskSplit = splitRisk(text)
  if (riskSplit) {
    const [token, rest] = riskSplit
    return (
      <td className="px-3 py-2.5 align-top">
        <div className="flex flex-wrap items-baseline gap-1.5">
          <RiskBadge token={token} />
          <span className="text-xs leading-relaxed text-muted-foreground">{rest}</span>
        </div>
      </td>
    )
  }

  // Effort badges (Low, Medium, High)
  if (isEffortText(text)) {
    return <td className="px-3 py-2.5"><EffortBadge text={text} /></td>
  }

  // Priority labels (P1, P2, P3)
  if (/^P[1-3]$/.test(text)) {
    const priority = Number(text[1])
    const pColor = priority === 1 ? '#dc2626' : priority === 2 ? '#d97706' : '#6b7280'
    return (
      <td className="w-10 px-3 py-2.5 text-center">
        <span
          className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold"
          style={{ color: pColor, background: pColor + '14' }}
        >
          {text}
        </span>
      </td>
    )
  }

  // Left-aligned single digit (# columns) → numbered circle
  if (!isRightAligned && /^[1-9]$/.test(text)) {
    return (
      <td className="w-8 px-3 py-2.5 text-center">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-foreground/10 text-[10px] font-bold tabular-nums text-foreground">
          {text}
        </span>
      </td>
    )
  }

  // Default — pass children through preserving all inline markup
  return (
    <td className="px-3 py-2.5 align-top text-xs leading-relaxed text-muted-foreground">
      {children}
    </td>
  )
}

// ─── components map ───────────────────────────────────────────────────────────

const components: Components = {
  // Suppress duplicate title
  h2: () => null,

  h3: ({ children }) => <SectionHeader>{children}</SectionHeader>,

  blockquote: ({ children }) => (
    <div
      className="mb-4 mt-2.5 rounded-r-lg border-l-4 px-4 py-3 text-xs leading-relaxed text-muted-foreground"
      style={{ borderColor: '#d97706', background: '#fffbeb' }}
    >
      {children}
    </div>
  ),

  // Table wrapper — elevated card with refined borders
  table: ({ children }) => (
    <div className="mb-5 mt-2 overflow-x-auto rounded-lg border border-border/80 shadow-sm">
      <table className="w-full text-xs [&_thead]:border-b [&_thead]:border-border [&_thead]:bg-muted/50 [&_tbody_tr]:border-b [&_tbody_tr]:border-border/40 [&_tbody_tr:last-child]:border-0 [&_tbody_tr:hover]:bg-muted/30 [&_tbody_tr]:transition-colors">
        {children}
      </table>
    </div>
  ),

  th: ({ children }) => (
    <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">
      {children}
    </th>
  ),

  // react-markdown v9 passes alignment as style.textAlign, not as an align prop
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  td: ({ children, style }: any) => (
    <SmartCell textAlign={style?.textAlign}>{children}</SmartCell>
  ),

  strong: ({ children }) => {
    const text = childText(children)
    const m = text.match(BAND_PATTERN)
    if (m) {
      const band = m[1] as keyof typeof RISK_CONFIG
      return <strong style={{ color: RISK_CONFIG[band]?.color }}>{children}</strong>
    }
    return <strong className="font-semibold text-foreground">{children}</strong>
  },

  p: ({ children }) => {
    const text = childText(children)

    if (SCORE_SUMMARY_RE.test(text)) return <ScoreSummaryBar>{children}</ScoreSummaryBar>

    const rm = text.match(ROADMAP_RE)
    if (rm) return <RoadmapCard range={`Month ${rm[1]}`} phase={rm[2].trim()} body={rm[3]} />

    if (text.length > 80 && BAND_PATTERN.test(text)) {
      const m = text.match(BAND_PATTERN)!
      const band = m[1] as keyof typeof RISK_CONFIG
      const cfg = RISK_CONFIG[band]
      return (
        <div
          className="mb-5 mt-3 rounded-lg border-l-4 px-5 py-4 shadow-sm"
          style={{ borderColor: cfg.color, background: cfg.track }}
        >
          <p className="text-sm leading-relaxed text-foreground/90">{children}</p>
        </div>
      )
    }

    return <p className="mb-3 mt-2 text-[13px] leading-relaxed text-muted-foreground">{children}</p>
  },

  ul: ({ children }) => <ul className="mb-3.5 mt-2 list-none space-y-2.5 pl-0">{children}</ul>,

  ol: ({ children }) => (
    <ol className="mb-3.5 mt-2 list-decimal space-y-1.5 pl-5 text-[13px] leading-relaxed text-muted-foreground">
      {children}
    </ol>
  ),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  li: ({ children, ...rest }: any) => {
    if (rest.ordered) {
      return <li className="pl-0.5 leading-relaxed">{children}</li>
    }
    return (
      <li className="flex items-start gap-2.5 text-[13px] leading-relaxed text-muted-foreground">
        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
        <span>{children}</span>
      </li>
    )
  },

  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary/70"
    >
      {children}
    </a>
  ),
}

// ─── public component ─────────────────────────────────────────────────────────

interface ReportMarkdownProps {
  markdown: string
}

export function ReportMarkdown({ markdown }: ReportMarkdownProps) {
  return (
    <div className="space-y-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
