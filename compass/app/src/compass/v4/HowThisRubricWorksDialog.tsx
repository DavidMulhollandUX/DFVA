import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../client/components/ui/dialog";
import { V4_REFERENCES } from "./data/v4Rubric";

/** Inline citation marks. Each [n] resolves against the generated reference
 * list (single source: dfva/source/rubricV4.ts) and links to the source where
 * a URL exists; the full citation is always in the title tooltip. Exported so
 * every [n] on the v4 page is interactive, not a dead number. */
export function Cite({ refs }: { refs: number[] }) {
  return (
    <sup className="ml-0.5 whitespace-nowrap">
      {refs.map((n) => {
        const ref = V4_REFERENCES.find((r) => r.n === n);
        if (!ref) return null;
        const mark = `[${n}]`;
        return ref.url ? (
          <a
            key={n}
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            title={ref.citation}
            className="text-secondary-muted-foreground font-mono text-[10px] font-semibold underline decoration-dotted"
          >
            {mark}
          </a>
        ) : (
          <span
            key={n}
            title={ref.citation}
            className="text-secondary-muted-foreground cursor-help font-mono text-[10px] font-semibold"
          >
            {mark}
          </span>
        );
      })}
    </sup>
  );
}

function ModalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-foreground mb-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase">
        {title}
      </h3>
      <div className="text-muted-foreground flex flex-col gap-2 text-sm leading-relaxed">
        {children}
      </div>
    </section>
  );
}

/** The derivation chain per item: which construct it operationalises and the
 * literature that put it in the instrument. Reference numbers resolve to the
 * generated V4_REFERENCES list. */
const ITEM_DERIVATIONS: { id: string; name: string; refs: number[]; from: string }[] = [
  {
    id: "C1",
    name: "Distributed cognition & relational capability",
    refs: [1, 5, 7],
    from: "TEQSA capability #2 — cognition shared across people, tools and gen-AI systems. Deming's labour-market evidence: social-skill-intensive employment grew ~12 pp of the US workforce (1980–2012) while math-intensive/low-social work shrank, and social intelligence is one of Frey & Osborne's three automation bottlenecks.",
  },
  {
    id: "C2",
    name: "Hybrid metacognition & evaluative judgement",
    refs: [1, 4, 3],
    from: "TEQSA capability #3 — regulating thinking within human–AI networks. Its linchpin is evaluative judgement (Tai, Ajjawi, Boud, Dawson & Panadero: “the capability to make decisions about the quality of work of oneself and others”); TEQSA's 2023 paper calls self-regulated learning the foundational skill for the AI era.",
  },
  {
    id: "C3",
    name: "Digital & AI literacy, including governance",
    refs: [1, 13, 11, 12, 2],
    from: "TEQSA capability #1, on the DigComp-based Australian Digital Capability Framework, widened by the AI-literacy literature (Long & Magerko's competency framework; UNESCO's student framework). Anchored one level above tool operation because the frameworks warn tool-level skills are non-durable.",
  },
  {
    id: "C4",
    name: "Life-long learning & transfer",
    refs: [1, 9, 10, 2],
    from: "TEQSA capability #4, grounded in the National Research Council's account of deeper learning as the process that produces transferable knowledge, and the adaptive-expertise literature (flexibility, metacognition, preparation for future learning).",
  },
  {
    id: "C5",
    name: "Inquiry & evidence generation",
    refs: [14, 15, 7],
    from: "Boyer's scholarship framework and Brew's research–teaching linkage; creative intelligence is the second Frey & Osborne bottleneck. Retained from the previous instrument — it was the item whose grounding survived review.",
  },
];

export function HowThisRubricWorksDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="border-border text-secondary-muted-foreground hover:bg-card-accent rounded-full border px-3 py-1 text-xs font-semibold"
          data-testid="how-rubric-works-trigger"
        >
          How this rubric works ↗
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">How this rubric works</DialogTitle>
          <DialogDescription>
            What Panel C v4 measures, where every item comes from, and how a score is decided —
            each claim cited; [n] links open the source.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <ModalSection title="What it measures">
            <p>
              Curriculum adaptiveness: how far the documented curriculum builds the{" "}
              <em>adaptive capabilities</em> defined in TEQSA's 2026 guidance —{" "}
              <span className="text-foreground">
                “the high-level, integrated capacities that enable graduates to navigate complex,
                novel and gen AI-integrated environments … to deploy, adapt and transfer their
                specific, demonstrable skills effectively and ethically”
              </span>
              <Cite refs={[1]} />. The previous instrument defined this construct only through
              its own five anchors; re-anchoring it on an external, regulator-commissioned
              framework answers the construct-underrepresentation critique published in the
              measurement literature this rubric was reviewed against
              <Cite refs={[18]} />.
            </p>
          </ModalSection>

          <ModalSection title="Where each item comes from">
            <ul className="flex flex-col gap-2.5">
              {ITEM_DERIVATIONS.map((d) => (
                <li key={d.id} className="border-secondary border-l-2 pl-3">
                  <span className="text-foreground font-medium">
                    {d.id} · {d.name}
                  </span>
                  <Cite refs={d.refs} />
                  <p className="mt-0.5">{d.from}</p>
                </li>
              ))}
            </ul>
          </ModalSection>

          <ModalSection title="Why disciplinary depth is a gate, not a score">
            <p>
              TEQSA's framework places deep disciplinary knowledge <em>under</em> the four
              capabilities — “the epistemic foundation for authentic judgement and expertise” —
              not among them
              <Cite refs={[1]} />. The labour economics agrees from the other direction: the
              applied-STEM wage premium falls from 44% at age 24 to 14% by 35, because applied
              technical content is where skill obsolescence is fastest
              <Cite refs={[6]} />. Depth is therefore a precondition (gate G1), and its absence
              flags a program regardless of the adaptiveness score. The old Irreplaceability
              bonus is retired: its anchors restated other items, so its high item–total
              correlation was a general-impression halo, not a distinct signal.
            </p>
          </ModalSection>

          <ModalSection title="How a score is decided">
            <ul className="list-disc space-y-1 pl-5">
              <li>
                Anchors are declarative statements about documented curriculum evidence — the
                form of the Brynjolfsson–Mitchell–Rock Suitability-for-Machine-Learning rubric
                <Cite refs={[8]} /> — never holistic impressions of what a graduate can
                plausibly do.
              </li>
              <li>
                <span className="text-foreground font-medium">Level 3 requires assessment evidence.</span>{" "}
                A capability stated only in learning outcomes scores 1, everywhere, uniformly —
                which is why the ceiling is rare by construction.
              </li>
              <li>
                Every score cites verbatim handbook lines (visible under each item on this
                page), mechanically verified against the scraped source.
              </li>
              <li>Where evidence straddles two levels, the score resolves downward and the
                ambiguity is published, not hidden.</li>
            </ul>
          </ModalSection>

          <ModalSection title="Where this instrument stands">
            <p>
              v4 is the adopted working draft, piloted here by a single verified rater. The
              validity argument is being assembled in Kane's argument-based frame
              <Cite refs={[17]} />: a content-validity panel with competency-framework
              crosswalks, then an inter-rater reliability study on these items, are specified
              and not yet run. Until they are, treat these scores as a disciplined reading of
              the handbook — conservative by construction, but not yet independently
              replicated.
            </p>
          </ModalSection>

          <ModalSection title="Reference material">
            <p>
              The full numbered reference list is in{" "}
              <span className="text-foreground font-medium">
                Part C → References
              </span>{" "}
              below this page, and every report in the v4 family ends with the same list,
              byte-identical, generated from the instrument's single source. The complete
              derivation — literature review, defect analysis of the previous instrument, and
              the migration protocol — is in the project's Panel C v4 recommendation and
              literature review documents.
            </p>
          </ModalSection>
        </div>
      </DialogContent>
    </Dialog>
  );
}
