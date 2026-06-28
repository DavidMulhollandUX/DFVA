import { trustPillars } from "../contentSections";
import Reveal from "./Reveal";

export default function Trust() {
  return (
    <section className="bg-muted/30 border-border border-y">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-secondary font-mono text-sm font-medium uppercase tracking-[0.18em]">
            {trustPillars.eyebrow}
          </p>
          <h2 className="text-foreground mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            {trustPillars.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {trustPillars.pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={i * 80}>
                <div className="bg-secondary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                  <Icon className="text-secondary h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-foreground mt-5 text-lg font-semibold">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {pillar.body}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
