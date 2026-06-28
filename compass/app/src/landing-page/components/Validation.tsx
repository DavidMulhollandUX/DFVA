import { Users } from "lucide-react";
import { validation } from "../contentSections";
import Reveal from "./Reveal";

export default function Validation() {
  return (
    <section className="bg-muted/30 border-border border-y">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-secondary font-mono text-sm font-medium uppercase tracking-[0.18em]">
            {validation.eyebrow}
          </p>
          <h2 className="text-foreground mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            {validation.title}
          </h2>
          <p className="text-muted-foreground mt-6 text-lg leading-8">
            {validation.description}
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {validation.roles.map((role, i) => (
            <Reveal
              key={role}
              delay={i * 70}
              className="bg-card border-border flex items-center gap-3 rounded-xl border p-5"
            >
              <div className="bg-secondary/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                <Users className="text-secondary h-5 w-5" aria-hidden="true" />
              </div>
              <span className="text-foreground text-sm font-medium leading-snug">
                {role}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
