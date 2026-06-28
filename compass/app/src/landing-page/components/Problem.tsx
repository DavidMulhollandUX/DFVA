import { problem } from "../contentSections";
import Reveal from "./Reveal";

export default function Problem() {
  return (
    <section className="bg-muted/30 border-border border-y">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-secondary font-mono text-sm font-medium uppercase tracking-[0.18em]">
            {problem.eyebrow}
          </p>
          <h2 className="text-foreground mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            {problem.title}
          </h2>
          <p className="text-muted-foreground mt-6 text-lg leading-8">
            {problem.body}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {problem.stats.map((stat, i) => (
            <Reveal
              key={stat.value}
              delay={i * 80}
              className="bg-card border-border rounded-2xl border p-6"
            >
              <div className="text-foreground font-mono text-3xl font-bold tabular-nums">
                {stat.value}
              </div>
              <p className="text-muted-foreground mt-3 text-sm leading-6">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
