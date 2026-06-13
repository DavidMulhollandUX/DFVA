import { Link } from 'react-router-dom'

const dimensions = [
  {
    id: 'D1',
    name: 'Automation Exposure',
    question: 'What share of program-level learning outcomes can be met by current-generation AI without human oversight?',
    scoring: '0 = >80% automatable · 1 = 50-80% · 2 = 20-50% · 3 = <20%',
  },
  {
    id: 'D2',
    name: 'AI Literacy',
    question: 'Do graduates learn to design, supervise, and critique AI workflows — not just use tools?',
    scoring: '0 = no AI content · 1 = tool use only · 2 = design + critique · 3 = governance + ethics',
  },
  {
    id: 'D3',
    name: 'Systems Thinking',
    question: 'Does the curriculum require graduates to reason about complex, adaptive systems from multiple disciplinary perspectives?',
    scoring: '0 = single-discipline siloed · 1 = some cross-referencing · 2 = deliberate multi-perspective · 3 = systems modelling + intervention design',
  },
  {
    id: 'D4',
    name: 'Decision Ownership',
    question: 'Are graduates assessed on their capacity to make consequential decisions under uncertainty — with accountability for outcomes?',
    scoring: '0 = no decision assessment · 1 = structured problems only · 2 = open-ended with justification · 3 = live/messy problems with stakeholder accountability',
  },
  {
    id: 'D5',
    name: 'Research Rigour',
    question: 'Can graduates design empirical investigations, evaluate evidence quality, and distinguish signal from noise in professional discourse?',
    scoring: '0 = no research component · 1 = literature review only · 2 = data collection + basic analysis · 3 = original empirical design + peer-level critique',
  },
  {
    id: 'D6',
    name: 'Interdisciplinary Integration',
    question: 'Does the program structure require graduates to synthesise knowledge across disciplinary boundaries to solve problems no single discipline can address?',
    scoring: '0 = no cross-disciplinary requirement · 1 = elective breadth only · 2 = required cross-disciplinary projects · 3 = integrated cross-faculty core with joint assessment',
  },
  {
    id: 'D7',
    name: 'Labour Market Alignment',
    question: 'Do current job-family hiring signals and professional discourse indicate sustained demand for the capabilities this program produces?',
    scoring: '0 = declining demand (-10%+ YoY) · 1 = flat/stagnant · 2 = moderate growth (0-10%) · 3 = strong growth (10%+), AI-complementary roles',
  },
]

const comparisons = [
  {
    aspect: 'What is scored',
    dfva: 'Curriculum design — the learning outcomes, assessment structures, and graduate capabilities the program deliberately builds',
    coursedog: 'Career alignment — whether courses map to job roles and NACE competencies based on syllabus scanning and LMI data',
  },
  {
    aspect: 'Methodology',
    dfva: '10-dimension rubric with published criteria, anchored to the question: "What does a graduate need to be durable in an AI-augmented labour market?"',
    coursedog: 'AI syllabus scanning + real-time job market data matching. Powerful but measures alignment to current jobs, not durability through market shifts.',
  },
  {
    aspect: 'Independence',
    dfva: 'Methodology-first. The rubric is published, citable, and independent of any SIS vendor. Universities can adopt the framework without adopting a platform.',
    coursedog: 'Platform-first. LMI is a feature of the Coursedog curriculum management suite, powered by Mapademics. Access requires the platform.',
  },
  {
    aspect: 'Outputs',
    dfva: 'Risk band classification, 2027 Graduate Profile, prioritised recommendations table with effort ratings, threshold questions — structured for curriculum committees and accreditation evidence.',
    coursedog: 'Career competency maps, Core IMPACTS compliance language, ROI transparency for students — structured for student-facing and compliance use cases.',
  },
  {
    aspect: 'Forward-looking',
    dfva: 'Dimensions include automation exposure trajectory, AI literacy depth, and systems thinking — capabilities that indicate durability through market shifts.',
    coursedog: 'LMI data reflects current market conditions. Excellent for immediate alignment; may lag structural shifts in workforce demand.',
  },
]

const citations = [
  { text: 'Autor, D. (2024). "Applying AI to Rebuild Middle Class Jobs." NBER Working Paper.', url: '#' },
  { text: 'Deming, D. & Noray, K. (2020). "Earnings Dynamics, Changing Job Skills, and STEM Careers." Quarterly Journal of Economics.', url: '#' },
  { text: 'Frank, M. et al. (2019). "Toward understanding the impact of artificial intelligence on labor." PNAS.', url: '#' },
  { text: 'Lightcast (2026). "2026 Predictions: The State of the Labor Market."', url: '#' },
  { text: 'Mapademics (2026). "Coursedog Launches Labor Market Insights." Product announcement, May 22.', url: 'https://www.mapademics.com/resources/announcements/coursedog-mapademics-labor-market-insights' },
  { text: 'PwC (2024). "Global Workforce Hopes and Fears Survey 2024."', url: '#' },
]

export default function MethodologyPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="px-6 py-24 text-center lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-border bg-muted/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            Methodology · Independent Standard
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            AI-Durability Scoring
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Not a labour market data overlay. A published, citable rubric that scores curriculum design against the capabilities graduates need to remain durable in an AI-augmented labour market.
          </p>
        </div>
      </section>

      {/* Why this matters */}
      <section className="border-t border-border px-6 py-16 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground">Why methodology matters</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Labour market data tells you what jobs exist today. It cannot tell you whether a curriculum
            builds the capabilities graduates need when those jobs change. AI adoption is compressing
            demand for routine cognitive work while increasing the premium on AI literacy, systems thinking,
            interdisciplinary integration, and decision-making under uncertainty.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            DFVA's rubric was built from first principles: "What does a graduate need to be
            <em> durable </em> — not just employable — in a labour market where AI is a general-purpose
            technology?" Each dimension is scored against published criteria. Every score carries
            curriculum evidence and market signal rationale.
          </p>
          <div className="mt-8 rounded-xl border border-orange-200 bg-orange-50 p-6 dark:border-orange-900 dark:bg-orange-950/20">
            <p className="text-sm font-semibold text-orange-800 dark:text-orange-300">
              LMI data overlays show alignment with today's jobs. DFVA scores readiness for tomorrow's.
            </p>
            <p className="mt-2 text-sm text-orange-700 dark:text-orange-400">
              If a program had perfect LMI alignment in 2019, it would have been optimised for a labour market
              that no longer exists. AI-durability scoring asks a different question.
            </p>
          </div>
        </div>
      </section>

      {/* The 10 dimensions */}
      <section className="border-t border-border px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground">The 10-Dimension Rubric</h2>
          <p className="mt-2 text-muted-foreground">
            Each dimension is scored 0–3 against published criteria. The total (0–30 from core dimensions,
            plus up to 6 bonus from Labour Market Alignment) produces the overall DFVA score (0–36).
          </p>
          <div className="mt-8 space-y-6">
            {dimensions.map((d) => (
              <div key={d.id} className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-muted px-2 py-0.5 text-xs font-mono text-muted-foreground">{d.id}</span>
                      <h3 className="font-semibold text-foreground">{d.name}</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{d.question}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted-foreground border-t border-border pt-3">{d.scoring}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we compare */}
      <section className="border-t border-border px-6 py-16 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground">How we compare</h2>
          <p className="mt-2 text-muted-foreground">
            Curriculum assessment products take different approaches. Here's how DFVA's methodology differs
            from the labour-market-integration approach used by Coursedog (powered by Mapademics).
          </p>
          <div className="mt-8 space-y-4">
            {comparisons.map((c) => (
              <div key={c.aspect} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">{c.aspect}</h3>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider">DFVA</div>
                    <p className="mt-1 text-sm leading-relaxed text-foreground">{c.dfva}</p>
                  </div>
                  <div className="sm:border-l sm:border-border sm:pl-4">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Coursedog + Mapademics</div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.coursedog}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Citations */}
      <section className="border-t border-border px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground">Sources & citations</h2>
          <p className="mt-2 text-muted-foreground">
            The DFVA methodology draws on peer-reviewed research in labour economics, AI and the future of
            work, and higher education quality assurance.
          </p>
          <ul className="mt-6 space-y-3">
            {citations.map((c) => (
              <li key={c.text} className="text-sm text-muted-foreground pl-4 border-l-2 border-border">
                {c.text}
                {c.url !== '#' && (
                  <> — <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">source</a></>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-16 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-foreground">Try it on your program</h2>
          <p className="mt-3 text-muted-foreground">
            Paste a handbook URL and see the rubric applied to a real curriculum in minutes.
          </p>
          <Link
            to="/assess"
            className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
          >
            Assess a Program →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-12 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            DFVA Methodology · University of Melbourne · Published {new Date().getFullYear()}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/assess" className="hover:text-foreground transition-colors">Assess</Link>
            <Link to="/reports" className="hover:text-foreground transition-colors">Reports</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
