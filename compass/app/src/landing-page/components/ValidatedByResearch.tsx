import { BarChart3, ArrowRight } from "lucide-react";
import { brand } from "../../branding/brandConfig";
import Reveal from "./Reveal";
import { Link } from "react-router";

/**
 * "Validated by Industry Research" — landing page social proof section.
 * Cites the Lightcast 2026 Customer Impact Report as third-party validation.
 */
export default function ValidatedByResearch() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-secondary font-mono text-sm font-medium tracking-[0.18em] uppercase">
            Validated by Industry Research
          </p>
          <h2 className="text-foreground mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            The market is racing toward this
          </h2>
          <p className="text-muted-foreground mt-6 text-lg leading-8">
            Lightcast surveyed ~1,000 institutions for their 2026 Customer
            Impact Report. The findings confirm what {brand.name} was built for:{" "}
            <strong className="text-foreground">
              96% of institutions say LMI is essential
            </strong>
            , and{" "}
            <strong className="text-foreground">
              89% say AI makes it more critical than ever
            </strong>
            .
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
          {[
            {
              stat: "96%",
              label:
                "of ~1,000 customers say LMI is essential to their operations",
            },
            {
              stat: "90%",
              label:
                "of education customers use LMI for program review — the exact use case {brand.name} serves",
            },
            {
              stat: "89%",
              label:
                "say LMI becomes MORE critical as their organisation adopts AI",
            },
          ].map((item, i) => (
            <Reveal
              key={i}
              delay={i * 70}
              className="bg-card border-border rounded-xl border p-6 text-center"
            >
              <div className="text-primary mb-2 font-mono text-4xl font-bold tracking-tight">
                {item.stat}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.label.replace("{brand.name}", brand.name)}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={210} className="mx-auto mt-10 max-w-3xl text-center">
          <p className="text-muted-foreground text-sm">
            Source:{" "}
            <a
              href="https://lightcast.io/resources/research/customer-impact-report-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Lightcast 2026 Customer Impact Report
            </a>
            {" · "}
            <span className="inline-flex items-center gap-1">
              <BarChart3 className="h-3.5 w-3.5" />
              TIME Top WorkTech Companies 2026
            </span>
          </p>
          <div className="mt-4">
            <Link
              to="/insights"
              className="text-primary hover:bg-primary/10 inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors"
            >
              See the evidence <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
