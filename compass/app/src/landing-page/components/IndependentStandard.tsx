import { ShieldCheck, Scale, ArrowRight } from "lucide-react";
import { Link } from "react-router";

/**
 * IndependentStandardSection — positions DFVA as an independent assessment standard
 * vs integrated platform assessment tools. Part of feat-017 (Coursedog Assessment Cloud response).
 *
 * Never names competitors explicitly on the landing page — uses generic structural framing.
 */
export default function IndependentStandardSection() {
  return (
    <section className="bg-background relative overflow-hidden" aria-labelledby="independent-standard-heading">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        {/* Section badge */}
        <p className="text-secondary mb-4 text-center font-mono text-sm font-medium tracking-[0.18em] uppercase">
          Why Evidura is different
        </p>

        <h2
          id="independent-standard-heading"
          className="text-foreground mb-6 text-center font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          The Independent Assessment Standard
        </h2>

        <p className="text-muted-foreground mx-auto mb-16 max-w-2xl text-center text-base leading-relaxed">
          Most curriculum platforms now include basic analytics. But those analytics exist
          to optimise the platform — not to inform the institution. Evidura is different:
          we're not tied to any curriculum system. Our methodology works for anyone.
        </p>

        {/* 2-column comparison */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {/* DFVA / Evidura column */}
          <div className="border-primary/20 bg-primary/5 rounded-xl border p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-primary/10 rounded-lg p-2">
                <ShieldCheck className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-foreground text-lg font-semibold">
                Evidura's approach
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Scale className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="text-foreground text-sm font-semibold">
                    Methodology-first
                  </p>
                  <p className="text-muted-foreground text-sm">
                    11-dimension durability scoring — prescriptive: evaluates
                    what SHOULD exist, not just what IS happening.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Scale className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="text-foreground text-sm font-semibold">
                    Platform-agnostic
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Works with any curriculum management system. No lock-in.
                    No required migration. Just evidence.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Scale className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="text-foreground text-sm font-semibold">
                    Third-party standard
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Methodology is public and auditable. Not tied to a vendor's
                    product roadmap or upselling incentives.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Integrated platform column */}
          <div className="border-muted bg-muted/20 rounded-xl border p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-muted/50 rounded-lg p-2">
                <ShieldCheck className="text-muted-foreground h-6 w-6" />
              </div>
              <h3 className="text-muted-foreground text-lg font-semibold">
                Integrated Platform Assessment
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="text-muted-foreground/60 mt-0.5 shrink-0 text-sm">
                  —
                </div>
                <div>
                  <p className="text-muted-foreground text-sm font-semibold">
                    Descriptive analytics
                  </p>
                  <p className="text-muted-foreground/70 text-sm">
                    Tied to a single platform's data. Tells you what IS
                    happening in that system, not what should exist for a
                    durable degree.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="text-muted-foreground/60 mt-0.5 shrink-0 text-sm">
                  —
                </div>
                <div>
                  <p className="text-muted-foreground text-sm font-semibold">
                    Vendor-locked
                  </p>
                  <p className="text-muted-foreground/70 text-sm">
                    Assessment exists to optimise the vendor's platform.
                    Switching systems means losing your analytics.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="text-muted-foreground/60 mt-0.5 shrink-0 text-sm">
                  —
                </div>
                <div>
                  <p className="text-muted-foreground text-sm font-semibold">
                    HTML-inferred data
                  </p>
                  <p className="text-muted-foreground/70 text-sm">
                    Program structures inferred from catalog HTML — fragile,
                    error-prone, and not auditable for institutional governance.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/developers/compare"
            className="text-primary hover:text-primary/80 inline-flex items-center gap-2 text-base font-medium transition-colors"
          >
            See how we compare <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
