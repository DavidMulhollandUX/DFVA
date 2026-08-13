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
    from: "Operationalises the second TEQSA capability: cognitive work shared across people, tools and generative AI systems. Deming (2017) finds that employment in occupations requiring high levels of social interaction grew by approximately twelve percentage points of the United States workforce between 1980 and 2012, while mathematics-intensive occupations with low social requirements contracted; social intelligence is also one of the three engineering bottlenecks identified by Frey and Osborne.",
  },
  {
    id: "C2",
    name: "Hybrid metacognition & evaluative judgement",
    refs: [1, 4, 3],
    from: "Operationalises the third TEQSA capability: the regulation of thinking and learning within human–AI networks. Its central component is evaluative judgement, defined by Tai, Ajjawi, Boud, Dawson and Panadero as the capability to make decisions about the quality of the work of oneself and others. The 2023 TEQSA discussion paper identifies self-regulated learning as foundational for study and work with generative AI.",
  },
  {
    id: "C3",
    name: "Digital & AI literacy, including governance",
    refs: [1, 13, 11, 12, 2],
    from: "Operationalises the first TEQSA capability, which rests on the Australian Digital Capability Framework (derived from the European DigComp framework), extended by the AI-literacy literature (Long and Magerko; UNESCO). The anchors are set above the level of tool operation because the frameworks converge in expecting operational skills tied to particular tools to lose currency as the tools change.",
  },
  {
    id: "C4",
    name: "Life-long learning & transfer",
    refs: [1, 9, 10, 2],
    from: "Operationalises the fourth TEQSA capability. The transfer component follows the National Research Council's account of deeper learning as the process by which knowledge becomes transferable to new situations, and the adaptive-expertise literature, in which flexibility and metacognition are recurring themes.",
  },
  {
    id: "C5",
    name: "Inquiry & evidence generation",
    refs: [14, 15, 7],
    from: "The capacity to generate and defend primary evidence, following Boyer's account of scholarship and Brew's analysis of the relation between research and teaching. Creative intelligence is a second Frey and Osborne bottleneck. The item is retained from the previous instrument, where its grounding was not in question.",
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
            What Panel C v4 measures, the sources of each item, and how scores are decided.
            Citation marks [n] open the source where one is available online.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <ModalSection title="What it measures">
            <p>
              The rubric measures curriculum adaptiveness: the extent to which the documented
              curriculum develops the <em>adaptive capabilities</em> defined in guidance
              commissioned by TEQSA in 2026 —{" "}
              <span className="text-foreground">
                “the high-level, integrated capacities that enable graduates to navigate complex,
                novel and gen AI-integrated environments … to deploy, adapt and transfer their
                specific, demonstrable skills effectively and ethically”
              </span>
              <Cite refs={[1]} />. The previous version of this instrument defined the construct
              only through its own scoring anchors. Anchoring the present version on an external
              framework addresses a limitation identified in the measurement literature, where
              locally developed instruments without external referents are noted to risk
              construct underrepresentation
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

          <ModalSection title="Why disciplinary depth is a gate rather than a scored item">
            <p>
              The TEQSA framework places deep disciplinary knowledge beneath the four
              capabilities, describing it as “the epistemic foundation for authentic judgement
              and expertise”, rather than listing it among them
              <Cite refs={[1]} />. The labour-market evidence supports the same treatment:
              Deming and Noray estimate that the earnings premium for applied science and
              engineering degrees declines from 44 per cent at age 24 to 14 per cent by the
              mid-thirties, which they attribute to the comparatively rapid obsolescence of
              applied technical skills
              <Cite refs={[6]} />. Disciplinary depth is accordingly treated as a precondition
              (gate G1): a program that lacks it is flagged whatever its adaptiveness score.
              The Irreplaceability item used in earlier versions has been removed. Its anchors
              restated the content of other items, so its high item–total correlation is better
              explained as a general-impression effect than as a distinct signal.
            </p>
          </ModalSection>

          <ModalSection title="How a score is decided">
            <ul className="list-disc space-y-1 pl-5">
              <li>
                Each anchor is a declarative statement about documented curriculum evidence,
                following the form of the Suitability-for-Machine-Learning rubric of
                Brynjolfsson, Mitchell and Rock
                <Cite refs={[8]} />. Scores are not holistic impressions of graduate
                capability.
              </li>
              <li>
                Level 3 requires assessment evidence. A capability that appears in learning
                outcomes but is not assessed is scored at level 1 in every item.
              </li>
              <li>
                Each score cites the handbook passages that satisfy the anchor (shown under
                each item on this page); the quoted passages are verified against the captured
                source text.
              </li>
              <li>
                Where the evidence is consistent with two levels, the lower level is recorded
                and the ambiguity is documented.
              </li>
            </ul>
          </ModalSection>

          <ModalSection title="The current status of the instrument">
            <p>
              Version 4 is a working draft, applied here by a single rater whose scoring was
              checked against the source text and reviewed adversarially. The validity argument
              is being assembled following Kane's argument-based approach
              <Cite refs={[17]} />. A content-validity panel with competency-framework
              crosswalks, and an inter-rater reliability study on these items, are specified
              but have not yet been conducted. Until they have, these scores should be read as
              a systematic single-rater reading of the handbook, conservative in construction
              but not independently replicated.
            </p>
          </ModalSection>

          <ModalSection title="Reference material">
            <p>
              The numbered reference list appears under{" "}
              <span className="text-foreground font-medium">
                Part C → References
              </span>{" "}
              on this page, and the same list, generated from the instrument's source
              definition, ends every report in the v4 family. The full derivation of the
              instrument — the literature review, the analysis of the previous version, and the
              migration protocol — is recorded in the project's Panel C v4 recommendation and
              literature review documents.
            </p>
          </ModalSection>
        </div>
      </DialogContent>
    </Dialog>
  );
}
