# Source analysis: the CSHE EOG deck

**A close reading of the seven contested citations, what each source actually says, and where the deck's argument diverges from its own evidence.**

**Prepared by:** David Mulholland · **Date:** 2026-09-12
**Companion to:** [Collaborator brief: the CSHE EOG team](collaborator-cshe-eog-team.md)
**Source:** *From Execution to Governance: A Systematic Analysis of Engineering Curricula in the GenAI Era*, Peng et al., CSHE, September 2026
**Method:** Full text obtained and read for Bell (2025), Chen et al. (2026) and Rahman et al. (2026); abstracts and bibliographic records via Crossref, OpenAlex and Semantic Scholar for the rest.

> **Correction of record.** An earlier pass reported six of seven citations as unlocated, on the basis of academic-index searches. All seven are real. Two of the misses were errors of my own; the rest reflect source types that scholarly indexes do not carry. That earlier conclusion is withdrawn in full. What follows replaces it and is based on the documents themselves.

---

## 1 · The headline

The citations are real, the sources are mostly well chosen, and the study's own data is untouched by any of this. But three specific gaps separate the deck's argument from the evidence it rests on, and one of them is a genuine misreading.

| # | Finding | Severity |
|---|---|---|
| 1 | **The EOG tier names do not appear in the source they are attributed to.** Bell (2025) never uses "orchestrator" or "governor". | Material — the framework is named after them |
| 2 | **van Esch (2026) is cited with its polarity inverted.** The paper is about AI orchestrating the *organisation*; the deck uses orchestration to mean the *human* orchestrating AI. | Material — a reviewer in organisation studies would catch it |
| 3 | **The tier order contradicts its own cognitive grounding.** In Krathwohl (2002), Create outranks Evaluate. EOG maps Orchestration to Create and Governance to Evaluate, making the top tier cognitively lower than the middle one. | Material — internal, and fixable in a sentence |
| 4 | Ahmed et al. (2025) is a research roadmap, not an empirical automation study. Apt in spirit, mismatched to the sentence it supports. | Minor |
| 5 | Hayden et al. (2026) is vendor research by two firms that sell reskilling. Real data, undisclosed interest. | Minor |
| 6 | **Bell (2025) contains Australian evidence that supports the deck's conclusion better than the claim it was cited for — and the deck does not use it.** | An opportunity, not a fault |

---

## 2 · The sources, one by one

### 2.1 Bell (2025) — Engineers Australia

**Michael Bell, *The impact of AI and generative technologies on the engineering profession*, Engineers Australia, January 2025. ISBN 978-1-925627-92-3.** Research by Ergo Strategy (Mintzes, Coultas, To), supported by the ITEE College.

**What it is.** A three-stage mixed-methods study: expert interviews, 34 qualitative interviews (10 decision makers, 9 early-career engineers, 5 students, 10 educators), then an online survey of **n = 2,197** — 1,465 engineering professionals and 448 students — weighted on age and company size to represent the Australian engineering workforce.

**What it actually argues.** Adoption, confidence and organisational culture. More than 70% of respondents agree GenAI will increase productivity. Larger firms are more likely to have AI policies and training. Engineers in workplaces where GenAI cannot be discussed openly are both less confident and less competent with it. The four recommendations are directed at *businesses*: deploy on labour-intensive tasks, set data and risk guidelines ensuring human oversight, share practice, and foster experimentation.

**What it does not say.** It does not describe a shift from "primary technical executor" to "orchestrator and governor of AI-assisted workflows." It contains neither term. Its nearest statement is the Foreword's: AI "allows some of the traditionally labour- and cognition-intensive tasks to be delegated to these new technologies… it elevates engineers' responsibility to do so with wisdom, and to apply engineering skills to higher-order tasks."

**The assessment.** That is compatible with the EOG framing and arguably implies it. It is not the same proposition, and the difference matters more than usual here because the framework's three tier names are the contribution. A reader who follows the citation to check where "orchestrator and governor" comes from will not find it. The honest fix is a sentence: the role construct is the authors' own, synthesised from Bell and others, not quoted from any of them.

**What the deck missed.** The report's education section reports two findings that support the paper's own conclusion more directly than the claim it was cited for:

- a **competency gap in engineering students on when and how to use GenAI**, leading to misuse and risks including data breaches; and
- **over-reliance on GenAI impairing the tacit knowledge needed to critically analyse GenAI outputs**, which industry has raised as a concern about whether future engineers will have the necessary competencies.

The second is the Governance capability, stated as an industry concern, in Australian data, by the national professional body, a year before the study. It belongs on slide 15, not slide 4.

---

### 2.2 Ahmed et al. (2025) — ACM TOSEM

**Ahmed, Aleti, Cai, Chatzigeorgiou, He, Hu, Pezzè, Poshyvanyk & Xia, *Artificial Intelligence for Software Engineering: The Journey So Far and the Road Ahead*, ACM Transactions on Software Engineering and Methodology 34(5), doi:10.1145/3719006.** 148 references, 28 citations.

**What it is.** A roadmap paper in the discipline's leading journal, by nine authors. It spotlights three challenges: generative AI and LLMs for engineering large software systems; the need for large unbiased datasets and benchmarks; and **the need for a new code of digital ethics to apply AI in software engineering** — framed throughout as applying AI "while still protecting fundamental human values."

**The assessment.** Real, authoritative, and a defensible citation. The mismatch is directional: it is a forward-looking research agenda for *applying* AI to software engineering, not an empirical finding that code generation and documentation *are now* machine-executed. Cited on slide 4 for the automation claim, it is doing work slightly outside its evidence.

**It is better used elsewhere.** Its digital-ethics argument is a top-venue statement of exactly the Governance tier the deck finds missing. Moving it from slide 4 to slide 15 would strengthen both.

---

### 2.3 van Esch (2026) — Business Horizons

**Patrick van Esch, *From agentic AI to AI-orchestrated organizations: Understanding the next surge in artificial intelligence*, Business Horizons, doi:10.1016/j.bushor.2026.03.003.** A conceptual article, 12 references.

**What it actually argues**, from the abstract:

> the next surge in artificial intelligence will be defined not by increasingly capable agents, but by the institutionalization of artificial intelligence as an organizing layer that **orchestrates coordination, embeds governance, and reallocates decision rights** across socio-technical systems.

**The assessment. This is the one real misreading, and it runs in two directions.**

First, it is cited on slide 4 for an empirical claim — that code generation, documentation, preliminary design and analytical support are machine-executed. It is a conceptual organisation-theory piece with twelve references. It makes no such measurement.

Second, and more seriously, **the orchestration runs the other way.** In van Esch, AI is the orchestrator: it is the organising layer that coordinates, embeds governance and reallocates decision rights away from existing structures. In EOG, orchestration is the *human* capability — the graduate as workflow architect directing modular AI agents. The deck borrows the vocabulary of a paper arguing something close to its opposite.

**Why this is worth more than a correction.** Taken seriously, van Esch is a challenge to the EOG framework's top tier rather than support for its middle one. If AI institutionalises as the organising layer that reallocates decision rights, then "the human is the ultimate auditor, verifying outputs from a probabilistic AI supplier" describes a transitional arrangement, not a stable destination. That is a sharper paper than the one the deck currently cites, and it is the same paper.

---

### 2.4 Álvarez Ariza et al. (2025) — IEEE Access

**Álvarez Ariza, Benitez Restrepo & Hernández Hernández, *Generative AI in Engineering and Computing Education: A Scoping Review of Empirical Studies and Educational Practices*, IEEE Access 13 (2025).** 146 studies from SCOPUS, Web of Science and ERIC, K-12 through tertiary.

**The assessment.** Correct, well matched and the strongest citation on slide 6. It is the scoping review that establishes what the field has studied, which is precisely what a gap claim requires.

---

### 2.5 Rahman et al. (2026) — Discover Education

**Rahman, Khandakar, Ayari, Naji, Al-Ali, Sellami & Alhazbi, *Artificial intelligence innovations challenges and emerging trends in engineering education*, Discover Education 5(1):179, doi:10.1007/s44217-026-01137-1.** Open access, 52 pages, 151 references. PRISMA-ScR scoping review over 3,000+ records from Scopus, WoS, IEEE Xplore, ERIC and Google Scholar (2000–2024), synthesising 200 studies.

**What it covers.** Intelligent tutoring systems, adaptive learning, VR/AR simulation, AI-driven assessment, emotion-sensitive learning analytics, teacher-in-the-loop grading. Reported outcomes: moderate improvements in performance and engagement, with gaps in ethics, equity and long-term evaluation.

**The assessment.** Aptly cited, and in a way the deck may not have intended. It is squarely the "AI as a teaching technology" literature — which is exactly the body of work the gap claim says exists instead of degree-structure redesign. As an *instance* of the gap rather than a study of it, it is the right citation.

**One section deserves Evidura's attention.** §8.2.2, *AI-assisted curriculum mapping*, names as a high-potential research frontier the automatic mapping of course materials and assessments to competency frameworks or accreditation criteria, using models that consume job-market trends, exam requirements and alumni skill profiles to flag where a curriculum underserves an area. It also states the honest constraint: "Getting the recommendations right requires some level of judgment, which is difficult to program."

That is Evidura's category, described as an open research problem, in a peer-reviewed 2026 review. It is a better positioning citation than anything currently in the venture documents.

---

### 2.6 Chen et al. (2026) — Intelligent Technologies in Education

**Chen, Chai, Wijeratne, Naeem, Loo, Zhou & Lucas, *A GenAI Competence Framework for Engineering Curriculum Enhancement in Higher Education*, Intelligent Technologies in Education 1(1) art. 2, doi:10.53761/ITED/1.2.** Queen Mary University of London (School of EECS) and University of Leicester. Received January 2025, accepted June 2025. Open access, CC BY-ND.

**What it is.** A conceptual framework with four elements in a closed improvement loop: a GenAI Competence Model, Curriculum Integration, Implementation Strategies, and Evaluation & Impact Assessment. Anchored on the UK QAA Engineering Benchmark Statement and Engineering Council accreditation, not TEQSA.

**The competence model — three tiers, each mapped to Bloom:**

| Tier | Content | Bloom levels |
|---|---|---|
| 1 · Foundational GenAI literacy | Basic understanding, responsible use, prompt engineering, role of training data and models | Remember, Understand, Apply |
| 2 · Specialised technical proficiency | GenAI for data analysis, engineering design, problem-solving; optimising and fine-tuning models | Apply, Analyse, Evaluate |
| 3 · Domain-specific problem solving | Integrating human creativity with GenAI on complex real-world challenges | Analyse, Evaluate, Create |

**Plus an orthogonal strand.** Ethical, Legal and Regulatory (ELR) considerations — AI ethics, bias, data privacy — are embedded at **every** tier, escalating from bias awareness at Tier 1, through algorithmic auditing and privacy-by-design at Tier 2, to bias impact assessment and data sovereignty at Tier 3. Curriculum integration is staged by year and guided by TPACK, with modules triaged into high, medium and low amendment levels.

**The assessment, and a correction to my earlier note.** I previously called this Panel C's nearest methodological competitor. On reading it, that is wrong in an important way.

**Chen et al. is prescriptive; Panel C and EOG are descriptive.** Chen specifies what a curriculum *should* contain and how to get there. Its "Evaluation and Impact Assessment" is programme evaluation — formative and summative student assessment, tracer studies, alumni feedback, faculty surveys, periodic accreditation review. None of it scores a curriculum from documented evidence. Chen is the intervention Panel C measures, not a rival measuring instrument.

**But the structural comparison is the most interesting thing in this whole reading.** Three teams have now made three different choices about where governance lives:

| | Chen et al. 2026 | EOG (Peng et al. 2026) | Panel C v4.2 |
|---|---|---|---|
| Governance is… | an **orthogonal strand** present at every tier | the **top tier** of a single hierarchy | **split across two items** — C2 (reliance decisions) and C3 level 3 (critique/governance of AI systems) |
| Ascending axis is… | technical sophistication of AI use | human oversight of AI | not ordered — five parallel constructs |
| Purpose | design target | measurement | measurement |
| Jurisdictional anchor | QAA / Engineering Council (UK) | none stated | TEQSA (AU) |

Chen's choice is the strongest argument yet for the C3 split flagged in the collaborator brief. If ethical, legal and regulatory capability is a strand that runs the length of a degree rather than a capstone-level attainment, then compressing it into C3 level 3 — where it competes with tool literacy for the same score — will systematically under-detect it. Chen arrived at that structure from UK accreditation requirements; EOG's Civil Engineering result (5.5% governance, the highest of three disciplines, attributed to safety and compliance regulation) is the same finding from the data side.

**Recommendation.** Read Chen et al. in full before settling any v4.3 change to C3. Two specific things to take: the ELR-at-every-tier structure as evidence for the split, and the Tier 1–3 Bloom mappings as a cross-check on whether Panel C's anchors sit at the cognitive level they claim.

---

### 2.7 Hayden et al. (2026) — Cognizant

**Thea Hayden, Jeff DeMarrais, Katrina K. Cheung, Marlowe Newman, Bill Abelson, Marcie Kroeker & Amy Dietz, *The AI workforce pulse: The adaptability imperative*, Cognizant, in collaboration with Pearson, 18 June 2026.** Survey of 750 director-level-and-above HR professionals in the US, UK and India at firms with 1,000+ employees.

**What it reports.** Roughly one-third of traditional entry-level tasks are now AI-completed. The emerging junior profile "manages AI outputs, validates AI decisions, interprets results and escalates edge cases requiring human judgment." 98% of HR leaders report greater emphasis on AI fluency when hiring for non-technical roles; 99% say AI has enabled employees to focus more on high-value work.

**The assessment.** Real research with a real sample, and it supports the claim on slides 2–3 closely — the junior profile it describes *is* orchestration plus verification. Two caveats. It surveys HR leaders' perceptions, not observed task allocation, so "one-third of tasks are AI-completed" is a reported belief. And both Cognizant and Pearson sell AI reskilling services, which is a commercial interest in this finding that a peer reviewer will expect to see disclosed.

---

## 3 · The internal inconsistency: Bloom's order

This is independent of any citation and is the cleanest thing to fix.

Krathwohl's 2002 revision of Bloom's taxonomy orders the cognitive process dimension: **Remember → Understand → Apply → Analyse → Evaluate → Create.** Create is the highest level; Evaluate sits below it.

The EOG framework maps:

- Execution → **Apply / Understand** (levels 3 and 2)
- Orchestration → **Analyse / Create** (levels 4 and 6)
- Governance → **Evaluate** (level 5)

So the framework's top tier is grounded in a *lower* Bloom level than its middle tier. The slide 7 table asserts a hierarchy that its own cited authority does not support.

This is not fatal and it is not hard to repair. The EOG hierarchy is plainly not a cognitive one — it is an ordering by resistance to automation, or by locus of accountability, which is a defensible and more interesting claim. The fix is to say so: the tiers ascend in human accountability, and the Bloom column describes each tier's characteristic cognitive demand rather than its rank. Chen et al. avoid the problem by mapping Tier 3 to Analyse, Evaluate *and* Create together.

Panel C is not exposed to the same objection, because C1–C5 are five parallel constructs with no claimed order. That is worth knowing: the absence of a hierarchy is a design property to defend, not an omission to fix.

---

## 4 · What this changes for Evidura

1. **Obtain and use the Engineers Australia report.** n = 2,197 weighted Australian engineers is the largest domestic dataset in this literature, and Panel C currently cites no Australian professional body at all. Its two education findings — the student competency gap on *when and how* to use GenAI, and over-reliance impairing the tacit knowledge needed to critique GenAI outputs — are direct evidence for the C2 and C3 constructs from the accreditation-adjacent body whose view a course director will weigh most.

2. **Cite Rahman et al. §8.2.2 in Evidura's positioning.** AI-assisted curriculum mapping named as a research frontier, with the judgement constraint stated honestly, in a 2026 peer-reviewed review. Better than any internal argument for why the category exists.

3. **Read Chen et al. before touching C3.** Its ELR-at-every-tier structure is independent support for splitting governance from tool literacy, arrived at from UK accreditation requirements rather than from Australian data.

4. **Record van Esch as a scope note on C2 and C3.** If AI institutionalises as the organising layer that reallocates decision rights, "human as ultimate auditor" is a claim with a shelf life. Panel C should know which of its items depend on that assumption holding.

5. **Add Ahmed et al. (2025) to the C3 evidence base.** A nine-author ACM TOSEM roadmap calling for a new code of digital ethics in software engineering is stronger venue authority than anything C3 currently carries.

---

## 5 · What to do with this in the collaboration

**Do not send this document.** It reads as an audit, and it is far too much for a first contact with someone who has not asked for it.

**Two of the six findings are worth raising, and only once the relationship exists.** The van Esch polarity and the Bloom ordering are both substantive, both fixable in a sentence each, and both are the kind of thing a co-author raises rather than a reviewer. The Bell wording point follows naturally from the first two.

**The Engineers Australia observation is the one to lead with, whenever the moment comes.** "Your own Australian source contains the evidence for your conclusion, and it is on the wrong slide" is a contribution. Everything else in this document is a correction, and corrections are what collaborators earn the right to offer.
