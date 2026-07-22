import { Layers, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router";

/**
 * PlatformAgnosticSection — positions DFVA (Evidura) as the analytics layer that
 * works with any curriculum management platform. Part of feat-018 (CourseLeaf
 * Analytics Expansion response).
 *
 * Uses ecosystem framing — acknowledges platforms DFVA works with without claiming
 * partnership or endorsement. The message: "We don't replace your system; we make
 * its data strategically valuable."
 */
export default function PlatformAgnosticSection() {
  const platforms = ["CourseLeaf", "Coursedog", "CourseLoop", "Modern Campus"];

  return (
    <section
      className="bg-background relative overflow-hidden"
      aria-labelledby="platform-agnostic-heading"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        {/* Section badge */}
        <p className="text-secondary mb-4 text-center font-mono text-sm font-medium tracking-[0.18em] uppercase">
          Platform-agnostic
        </p>

        <h2
          id="platform-agnostic-heading"
          className="text-foreground mb-6 text-center font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Your curriculum data, made analytically powerful
        </h2>

        <p className="text-muted-foreground mx-auto mb-16 max-w-2xl text-center text-base leading-relaxed">
          Evidura works with any curriculum management platform. We don't replace
          your curriculum system — we make its data strategically valuable with
          independent, methodology-driven assessment.
        </p>

        {/* 2-column layout */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left: Works with your existing tools */}
          <div className="border-teal-500/20 bg-teal-500/5 rounded-xl border p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-teal-500/10 rounded-lg p-2">
                <Layers className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-foreground text-lg font-semibold">
                Works with your existing tools
              </h3>
            </div>

            {/* Platform pills */}
            <div className="mb-6 flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <span
                  key={platform}
                  className="bg-muted text-muted-foreground inline-block rounded-full px-3 py-1.5 text-sm font-medium"
                  aria-label={`Compatible with ${platform}`}
                >
                  {platform}
                </span>
              ))}
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              Ingest handbook URLs, program data, or structured exports from any
              curriculum system. Evidura's 11-dimension scoring works regardless
              of where your curriculum data lives — no migration required.
            </p>
          </div>

          {/* Right: Why platforms alone can't deliver this depth */}
          <div className="border-muted bg-muted/20 rounded-xl border p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-muted/50 rounded-lg p-2">
                <BarChart3 className="text-muted-foreground h-6 w-6" />
              </div>
              <h3 className="text-muted-foreground text-lg font-semibold">
                Why platforms alone can't deliver this depth
              </h3>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <BarChart3 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                <p className="text-muted-foreground text-sm">
                  Curriculum platforms store degree requirements as HTML blocks —
                  not structured, queryable data. Deep analysis requires a
                  structured data model.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <BarChart3 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                <p className="text-muted-foreground text-sm">
                  Platform analytics are descriptive — they tell you what IS
                  happening. Evidura is prescriptive — it tells you what SHOULD
                  exist in a durable degree.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <BarChart3 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                <p className="text-muted-foreground text-sm">
                  Platform-locked assessment optimises the vendor's workflow.
                  Independent assessment informs the institution's strategy —
                  unbiased by any vendor's product roadmap.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/developers/compare"
            className="bg-teal-600 hover:bg-teal-700 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-colors"
          >
            See the analytics difference
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
