import { Link } from 'react-router-dom'

const features = [
  {
    name: 'Curriculum Viability Score',
    description:
      '10-dimension rubric scores each program 0–36. Dimensions cover automation exposure, AI literacy, systems thinking, decision ownership, research rigour, and more.',
    emoji: '🎯',
  },
  {
    name: 'Risk Band Classification',
    description:
      'RESILIENT, MODERATE RISK, HIGH RISK, or CRITICAL — giving committees a clear signal for where to act before the next accreditation cycle.',
    emoji: '📊',
  },
  {
    name: 'Labour Market Intelligence',
    description:
      'Job-family hiring signals mapped directly to curriculum outcomes so academic staff can see which graduate capabilities are compressing under AI pressure.',
    emoji: '📈',
  },
  {
    name: 'AI Literacy and Governance',
    description:
      'Explicit scoring of whether graduates can design, supervise, and critique AI workflows — not just use tools — including ethics and accountability dimensions.',
    emoji: '🤖',
  },
  {
    name: 'Redesign Roadmap',
    description:
      'Prioritised recommendations table linked to specific dimensions, with effort ratings and market signal evidence — ready to take to a curriculum committee.',
    emoji: '🔧',
  },
  {
    name: '2027 Graduate Profile',
    description:
      'A concrete description of the resilient graduate the program should produce — usable as a program learning outcome statement or accreditation brief.',
    emoji: '🎓',
  },
  {
    name: 'Three Threshold Questions',
    description:
      'YES / NO / UNCERTAIN verdicts on AI replaceability, decision ownership, and 5-year employability — anchored to curriculum evidence, not opinion.',
    emoji: '❓',
  },
  {
    name: 'Outcome Evidence Scoring',
    description:
      'Scores how well the program publishes destination data — roles, industries, salary, and time-to-employment — to support quality assurance reporting.',
    emoji: '🔬',
  },
  {
    name: 'Handbook URL Input',
    description:
      'Paste any university handbook URL. COMPASS retrieves the curriculum and generates a full report in minutes — no manual data entry required.',
    emoji: '⚡',
  },
]

const faqs = [
  {
    q: 'Who is COMPASS for?',
    a: 'Program directors, curriculum committees, academic quality assurance teams, careers services, and faculty leadership who need to make evidence-based decisions about curriculum relevance in an AI-augmented labour market.',
  },
  {
    q: 'What does the risk band mean for my program?',
    a: 'Programs score 0–36 across 10 dimensions. RESILIENT (28–36) means graduates are well-positioned. MODERATE RISK (20–27) signals targeted action is needed. HIGH RISK (12–19) indicates systemic curriculum gaps. CRITICAL (0–11) requires urgent redesign before the next cohort enrols.',
  },
  {
    q: 'What evidence does COMPASS use?',
    a: 'COMPASS combines your published handbook curriculum with current labour market hiring signals and professional discourse analysis. Each dimension score includes curriculum evidence and market signal rationale — not opinion.',
  },
  {
    q: 'How does this support accreditation and quality cycles?',
    a: 'The 2027 Graduate Profile output is designed to function as a program learning outcome statement. The recommendations table maps directly to accreditation dimensions and includes effort ratings, making it straightforward to incorporate into a periodic program review.',
  },
]

export default function LandingPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 text-center lg:px-8 lg:py-32">
        <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-orange-50/60 to-transparent dark:from-orange-950/20" />
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-border bg-muted/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            Prototype · Education Innovation · University of Melbourne
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Does your curriculum{' '}
            <span className="text-orange-500 italic">prepare graduates</span>{' '}
            for an AI-augmented workforce?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            COMPASS gives program directors, curriculum committees, and quality assurance teams an
            evidence-based scorecard to assess labour-market durability — and a prioritised redesign
            roadmap — before the next accreditation cycle.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/assess"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
            >
              Assess a Program →
            </Link>
            <Link
              to="/reports"
              className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
            >
              See Example Reports
            </Link>
          </div>
        </div>

        {/* Risk band preview */}
        <div className="mx-auto mt-16 grid max-w-xl grid-cols-3 gap-4">
          {[
            {
              band: 'RESILIENT',
              score: '28–36',
              cls: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
            },
            {
              band: 'MODERATE RISK',
              score: '20–27',
              cls: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
            },
            {
              band: 'HIGH RISK',
              score: '12–19',
              cls: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
            },
          ].map((b) => (
            <div key={b.band} className={`rounded-xl px-4 py-5 text-center ${b.cls}`}>
              <div className="text-xl font-bold">{b.score}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wide">{b.band}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Independent Methodology */}
      <section className="border-t border-border px-6 py-16 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Independent Methodology
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground">
            Not a vendor add-on. A published rubric.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            COMPASS uses DFVA — a 10-dimension, peer-reviewed scoring methodology built at the
            University of Melbourne. Unlike labour market data overlays that tell you what jobs
            exist today, DFVA scores whether a curriculum builds the capabilities graduates need
            when those jobs change.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="rounded-full border border-border px-3 py-1">AI-Durability Scoring</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="rounded-full border border-border px-3 py-1">Published Criteria</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="rounded-full border border-border px-3 py-1">Vendor-Neutral</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="rounded-full border border-border px-3 py-1">Accreditation-Ready</span>
          </div>
          <Link
            to="/methodology"
            className="mt-6 inline-block rounded-lg border border-orange-200 bg-orange-50 px-6 py-3 text-sm font-semibold text-orange-700 hover:bg-orange-100 dark:border-orange-900 dark:bg-orange-950/20 dark:text-orange-300 transition-colors"
          >
            Read the full methodology →
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            What COMPASS assesses
          </p>
          <h2 className="mt-3 text-center text-3xl font-bold text-foreground">
            Built for curriculum committees
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.name}
                className="rounded-xl border border-border bg-card p-6 hover:border-orange-200 dark:hover:border-orange-900 transition-colors"
              >
                <span className="text-2xl">{f.emoji}</span>
                <h3 className="mt-3 font-semibold text-foreground">{f.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-border px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-border">
            {faqs.map((faq) => (
              <div key={faq.q} className="pt-6">
                <dt className="font-semibold text-foreground">{faq.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-12 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            COMPASS — Degree Future-Viability Assessor · University of Melbourne · Prototype
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/assess" className="hover:text-foreground transition-colors">
              Assess a Program
            </Link>
            <Link to="/reports" className="hover:text-foreground transition-colors">
              Reports
            </Link>
            <a
              href="https://unimelb.edu.au"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              University of Melbourne
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
