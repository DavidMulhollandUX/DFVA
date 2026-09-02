import { HERO_NAV_LEAD, eyebrow, heroMeta } from "./copy";

export interface HeroNavItem {
  href: string;
  label: string;
}

/** The report hero: instrument eyebrow, program name, the code/institution
 *  line, and the in-page navigation. The research-degree and coursework
 *  bodies differ only in the eyebrow and the Part B/C labels. */
export function ReportHero({
  instrument,
  pilot,
  name,
  code,
  faculty,
  nav,
}: {
  instrument: string;
  /** Coursework reports are a pilot of the draft instrument; the
   *  research-degree body carries no score, so it is not. */
  pilot: boolean;
  name: string;
  code: string;
  faculty: string;
  nav: HeroNavItem[];
}) {
  return (
    <div className="mb-8">
      <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
        {eyebrow(instrument, pilot)}
      </p>
      <h1 className="text-foreground font-serif text-4xl tracking-tight">
        {name}
      </h1>
      <p className="text-muted-foreground mt-2 font-mono text-sm uppercase">
        {heroMeta(code, faculty)}
      </p>
      <nav className="text-muted-foreground mt-5 flex flex-wrap gap-x-6 gap-y-1 text-sm">
        <span className="text-foreground font-medium">{HERO_NAV_LEAD}</span>
        {nav.map((item) => (
          <a key={item.href} href={item.href} className="underline">
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
