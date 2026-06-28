import { howItWorks } from "../contentSections";
import Reveal from "./Reveal";

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-secondary font-mono text-sm font-medium uppercase tracking-[0.18em]">
          {howItWorks.eyebrow}
        </p>
        <h2 className="text-foreground mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          {howItWorks.title}
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {howItWorks.steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <Reveal
              key={step.title}
              delay={i * 80}
              className="bg-card border-border relative rounded-2xl border p-7"
            >
              <span className="text-muted-foreground/60 absolute right-6 top-6 font-mono text-sm tabular-nums">
                0{i + 1}
              </span>
              <div className="bg-secondary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                <Icon className="text-secondary h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-foreground mt-5 text-lg font-semibold">
                {step.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                {step.body}
              </p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
