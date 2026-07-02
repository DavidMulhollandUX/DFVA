import { Link as RouterLink } from "react-router";
import { closingCta } from "../contentSections";
import { Button } from "../../client/components/ui/button";
import Reveal from "./Reveal";

export default function ClosingCTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
      <Reveal className="bg-primary text-primary-foreground relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16">
        <div
          className="bg-secondary/20 absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <h2 className="relative font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          {closingCta.title}
        </h2>
        <p className="text-primary-foreground/80 relative mx-auto mt-5 max-w-xl text-lg leading-8">
          {closingCta.body}
        </p>
        <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" variant="secondary" asChild>
            <RouterLink to="/reports">
              View an example report <span aria-hidden="true">→</span>
            </RouterLink>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            asChild
          >
            <RouterLink to="/assess">Assess a program</RouterLink>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
