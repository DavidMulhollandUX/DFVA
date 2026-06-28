import { decisionMoments } from "../contentSections";
import Reveal from "./Reveal";

export default function MomentOfDecision() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-secondary font-mono text-sm font-medium uppercase tracking-[0.18em]">
          {decisionMoments.eyebrow}
        </p>
        <h2 className="text-foreground mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          {decisionMoments.title}
        </h2>
        <p className="text-muted-foreground mt-6 text-lg leading-8">
          {decisionMoments.description}
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {decisionMoments.moments.map((moment, i) => {
          const Icon = moment.icon;
          return (
            <Reveal
              key={moment.title}
              delay={i * 80}
              className="border-border hover:border-secondary/40 rounded-2xl border p-7 transition-colors duration-300"
            >
              <div className="bg-secondary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                <Icon className="text-secondary h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-foreground mt-5 text-lg font-semibold">
                {moment.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                {moment.body}
              </p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
