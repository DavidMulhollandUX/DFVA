# Atomic Jolt — Atomic Curriculum Analysis Tool (Atomic CAT)

**Sources:** [Product page](https://www.atomicjolt.com/products/atomic-curriculum-analysis-tool), [blog post](https://www.atomicjolt.com/post/curriculum-gap-analysis), [EDUCAUSE Demo Day, April 2025](https://www.youtube.com/watch?v=uvY5YY8s7gk) (Nick Revy, VP Revenue; Justin Ball, co-founder/CTO), sales flyer PDF (~July 2025, with product screenshots), [official user guide](https://support.atomicjolt.com/knowledgebase/atomic-cat-curriculum-analysis-tool-user-guide)
**Last updated:** 2026-08-13
**Status:** Adjacent, not competing — high complementarity, moderate encroachment risk. **Beachhead is medical education, not curriculum strategy.**

> **Currency caveat:** the demo evidence is from April 2025, ~16 months stale. Site copy as of today still shows no accreditation-body mappings and no student-performance layer, which suggests the roadmap items below have not shipped — but treat any "they don't do X" claim as needing a re-check before it goes in front of a customer.

## What They Built

Atomic Jolt is a ~10-year-old edtech vendor (20 years counting founders' prior ventures) with a large installed base: Canvas/Brightspace/Blackboard/Moodle/Schoology add-ons, ~3M learners annually, 500+ custom dev projects, a seat on the 1EdTech LTI working group. Logos on the site include Oxford, Penn, Harvard, Duke, Brown, Northwestern.

Atomic CAT is a new AI layer on top of **Atomic Search**, their long-standing LMS content-indexing product. The pipeline:

```text
LMS content (pages, files, PPTX, PDFs, video transcripts)
        ↓  Atomic Search — indexes everything, incl. inside files
Atomic Intelligence platform (LLM)
        ↓  extracts topics from every resource → tens of thousands of topics
Clustering algorithm
        ↓  rolls up into a few hundred "major topics"
Program dashboard  (a "program" = a user-assembled bag of courses)
        ↓
"Medical safety: 4 of 13 courses · 52 of 650 resources"  → drill down to the artefact
```

### Capabilities

| Capability | How It Works | DFVA / Evidura Equivalent |
|------------|-------------|---------------------------|
| Topic extraction | LLM reads actual LMS materials, extracts topics per resource | Handbook prose → rubric-scored dimensions |
| Topic clustering | Algorithmic roll-up of ~10k topics into major topics | Fixed 11-dimension ontology (no clustering needed) |
| Coverage counts | % of courses / resources covering a topic | Dimension scores + bands (Resilient→Critical) |
| Over-coverage detection | Flags topics taught redundantly across courses | **No equivalent — genuine gap in DFVA** |
| Manual topic add | Human types a topic, re-runs analysis across corpus | Rubric is fixed and published |
| Resource drill-down | Click through to the specific PowerPoint / assignment | Evidence citations at dimension level |
| Scoped search | Atomic Search constrained to a program | N/A |

### The Design Decision That Defines Them

Ball is explicit and deliberate about it: they chose not to impose an ontology or a predetermined set of learning objectives on the analysis. The stated reason is that institutions have preconceived notions of what their programs contain, and the point is to surface the gap between believed and actual content.

**This is the exact inverse of DFVA.** Atomic CAT is inductive and descriptive — topics emerge from the corpus, and the tool has no opinion about them. DFVA is deductive and normative — an 11-dimension rubric with criterion scaffolds, bands, and a published method, applied *to* the corpus.

That inversion drives everything below — but the flyer complicates it, and the complication is the most useful thing in this document.

## What the Flyer Reveals

### 1. The beachhead is medical education

The demo used generic nursing and engineering examples. The *sales collateral* — what they actually put in front of buyers — leads with a program called **"Pathways Preclerkship"** and a topic of **"Sexual and Gender Minority Health"**, with related topics covering gender-affirming care, health disparities and social determinants, and inclusive clinical practice.

"Pathways" is the name of Harvard Medical School's curriculum and "preclerkship" is its phase terminology. Harvard's logo appears on their site. **Inference, not confirmed fact:** HMS is a customer or design partner, and med ed is the design target.

The vertical signal is solid regardless of which school it is, and it reframes the whole competitive picture:

- **Med ed is the ideal substrate for their method.** Centrally managed, session-based, fully in the LMS, high content density. The three-level grain visible in the UI — **Courses → Sessions → Resources** — is a med-ed structure, finer than anything DFVA models.
- **The buyer question is compliance, not viability.** SGM health coverage maps directly onto LCME Element 7.6 (cultural competence and health care disparities). "Where in our integrated curriculum do we teach X, and can we prove it?" is *the* accreditation question in med ed, and it is precisely what topic-coverage counting answers well.
- **It is a vertical where Evidura is structurally weak and should stay out.** Medicine is licensure-protected with low AI-displacement exposure; a durability rating for an MD program answers a question nobody is asking.

This is good news. Their wedge is narrower and more defensible than the demo implied, and it barely intersects ours. Revise the head-to-head threat *down*; treat the market as genuinely split rather than contested.

### 2. They do generate normative recommendations — correcting the earlier read

The screenshot shows AI-generated prose, not just counts. The pattern, paraphrased: the program covers SGM health through modules on disparities, cultural competence and inclusive practice; clinical scenarios help students provide affirming care; the program offers a solid foundation, and expanding content on long-term care and intersectional barriers could further enhance coverage.

That is a judgement — "solid foundation", "could further enhance" — plus specific gap nominations. My earlier claim that they output counts and leave interpretation entirely to the reader was wrong, and I'd have lost that exchange in front of a customer.

### 3. …which makes the "no ontology" position incoherent — and this is the real attack line

Ask where "long-term care and intersectional barriers" comes from. Nothing in the institution's corpus can produce it: by definition those topics are *absent*. It comes from the model's own priors about what adequate SGM-health teaching comprises.

**They do not have no ontology. They have an invisible one.** The standard didn't disappear when they declined to publish a rubric — it relocated into the opaque weights of a frontier LLM, where it cannot be inspected, cited, versioned, contested, or tested for reliability. Re-run next quarter on a new model and the recommendations change with no changelog.

For accreditation evidence, where defensibility is the entire product, that is a serious exposure. The [Lyons](../../docs/collaborator-kayley-lyons.md) validity critique lands far harder here than on DFVA: our ontology is at least *visible*, published, scaffolded, and about to have an IRR study attached to it. Theirs is a black box making normative claims about curricular adequacy in a regulated setting.

This is the strongest single differentiator in the file. Lead with it in any room where both tools are present.

### 4. The claims have escalated well past what ships — now verified against their own documentation

The flyer asserts, in the five-step "How Atomic CAT Works" sequence and the comparison table:

| Flyer claim | Verdict |
|---|---|
| Benchmarks against accreditation frameworks | **Unsupported.** Ball denied it in the April 2025 Q&A; the user guide documents no framework import or comparison. |
| Benchmarks against job descriptions and industry skill models | **Unsupported.** No external data source appears anywhere in demo, guide, or support docs. |
| Detects "missing skills" | **Unsupported as stated.** Requires a reference list; topics are generated purely from selected course content. |
| Detects outdated content | Weak. Demo showed sort-by-date. Recency is not currency; superseded ≠ old. |
| Detects "misaligned assessments" | Never demonstrated or documented. Without stated objectives this can only be topic-coherence, not alignment. |
| Real-time / continuously updated | Weak. Batch analysis triggered by course-list changes, taking minutes. |

**Verification (desk research, 2026-08-13).** The [official user guide](https://support.atomicjolt.com/knowledgebase/atomic-cat-curriculum-analysis-tool-user-guide) documents the complete workflow — select courses, generate topics, review coverage via bar chart and drill-down — and contains **no external-reference comparison of any kind**: no job descriptions, no skill models, no accreditation frameworks, no labour-market data, no framework import, and no export. Topics are stated to be generated from the content of the selected courses, full stop.

Three independent sources now agree — the April 2025 demo, the CTO's direct answer in Q&A, and the current support documentation. **Treat both High-threat claims as copywriting, not capability.** The closed-loop finding at the heart of this document holds, and the complementarity thesis does not need revisiting.

Residual uncertainty, stated honestly: user guides lag releases, the fetched guide may be partial, and "Add New Topic" appears in the flyer screenshot but is *not* in the guide — so the docs are demonstrably not exhaustive. This is strong desk evidence, not proof. It is enough to stop hedging in internal strategy; if the claim is ever put to us directly by a prospect who has seen otherwise in their own tenant, ask what they saw rather than asserting it doesn't exist.

Handle the gap carefully in the market. It is legitimate to say the shipped product is narrower than the collateral and to ask a prospect what they saw working in *their* tenant. It is not legitimate to assert they can't build it — Ball said the existing mapping makes accreditation alignment straightforward, and 16 months have passed.

### 5. "Add New Topic" is a first-class button

It sits in the primary toolbar of the topics view, not buried in settings — and Ball demonstrated it live, adding a topic and re-running analysis across the corpus. So assembling your own topic list and measuring coverage against it is a real, promoted workflow: a determined customer builds a crude rubric proxy without the vendor shipping one.

Curiously it is **absent from the user guide**, which describes topics as generated from course content only. Either it postdates the guide or the guide is incomplete. Don't over-read it as a strategic bet — but don't assume it's minor either, given it's the one place a customer can inject an external standard.

### 6. They are straddling higher ed and corporate L&D

The flyer addresses "educators and training professionals" and promises better "student or employee outcomes". Corporate L&D is a larger market with faster cycles and less validity scrutiny. If they drift that way — and the framing suggests pull in that direction — they exit our market by choice. Watch for it.

## The Core Distinction: Coverage vs. Viability

Atomic CAT can tell you a topic appears in 4 of 13 courses across 52 of 650 resources. **It has no way to tell you whether that is good.** There is no external referent anywhere in the system — no labour-market signal, no AI-exposure measure, no time dimension, no threshold, no benchmark. Every number it produces is internal to the institution's own content.

The consequence is sharp: a program can score perfect topical coherence on Atomic CAT while teaching a curriculum that is being automated away. Coverage is not viability.

> **Positioning line:** Atomic CAT answers *"what do we actually teach?"* Evidura answers *"will it still be worth teaching?"* One is an inventory. The other is a judgement.

Their own framing of "gap analysis" confirms this — a gap means *believed coverage vs. actual coverage*, or *over-coverage vs. under-coverage*. It never means *coverage vs. what the labour market will require in 2030*.

The flyer's recommendation prose does not change this, and the SGM example shows why. "Expand content on long-term care and intersectional barriers" is a recommendation to cover *more of the topic you are already covering* — the referent is a fuller version of the same subject, supplied by the model's priors. It is a completeness judgement, not a viability judgement. Nothing in the loop can ever ask whether the subject itself is still worth teaching.

**Refined positioning line:** they assess *whether you teach a topic thoroughly*. We assess *whether the topic still earns its place*. Both are real questions; only one of them is answerable from inside the LMS.

## Where They Beat Us

Be honest about this — it is the stronger half of the comparison.

1. **Ground-truth evidence.** They read the actual PowerPoint, the actual assignment, the actual video transcript. DFVA reads handbook prose — a marketing-adjacent artefact written years ago. Their evidence base is closer to what students actually experience, and this is structural, not a matter of effort.
2. **Zero-effort collection.** The content is already indexed for institutions running Atomic Search. No scraping, no data request, no faculty burden.
3. **Distribution.** Hundreds of institutions already have the substrate installed. Atomic CAT is an upsell into an existing LMS relationship, not a new vendor decision. Low friction, probably modest ACV, very short sales cycle.
4. **Resource-level granularity.** Drill-down to the specific artefact is genuinely useful for a curriculum committee and DFVA has nothing at that grain.
5. **Over-coverage detection.** Their redundancy finding — five courses all teaching experimental design, students fatigued — is a real, actionable insight DFVA does not produce. Consider whether this belongs in the roadmap.
6. **Finer grain.** Courses → Sessions → Resources, with per-course coverage ranked in a bar chart. DFVA operates at program and dimension level. For "where exactly do we teach this?", they win outright.
7. **Fluent narrative output.** The topic summaries read well and are immediately usable in a self-study document. Ours are more defensible; theirs are faster to paste.

## Where We Beat Them

1. **External referent.** Panel A's AIOE-based exposure, the labour-evidence layer, and the JIR graduate-outcomes data all anchor scores to something outside the institution's own content. Atomic CAT is a closed loop.
2. **Cross-institutional benchmarking.** DFVA scores any program from public handbooks — including competitors', including the whole Go8. Atomic CAT is confined to one institution's LMS and can never answer "how do we compare to UNSW?"
3. **Auditable standard.** The sharpest edge, and stronger after the flyer than before it. They make normative claims about curricular adequacy with no published method, no rubric, no inter-rater reliability, opaque cluster boundaries, and a standard that lives in model weights. We make the same class of claim from a published, versioned, scaffolded rubric with an IRR study behind it. In a regulated setting the difference is not academic — it is whether the finding survives a question from a review panel. See [collaborator-kayley-lyons](../../docs/collaborator-kayley-lyons.md).
4. **Structured decision output.** DFVA outputs bands, prioritised recommendations with effort ratings, threshold questions, and a 2027 Graduate Profile. Atomic CAT outputs coverage counts plus a paragraph of prose per topic — readable, but unranked, uncosted, and with no mechanism for deciding which of two hundred topics to act on first. Their output supports writing a self-study; ours supports making a portfolio decision.
5. **LMS independence.** Their coverage is bounded by LMS hygiene — their own demo surfaced a 2017 calculus exam as the newest material in a program. Programs that teach well but post little are penalised; content-heavy online programs look strong regardless of quality. DFVA has no such bias.
6. **AU / TEQSA context.** They are US-centric and Canvas-first. Nothing addresses AU handbook structure, TEQSA adaptive-capability expectations, or QILT.

## Threat Assessment: Moderate, and Structurally Bounded

The encroachment path that would matter is Atomic CAT adding a normative layer — a rubric that scores extracted topics against an external standard. Assess this as **less likely than it looks**, because rejecting an imposed ontology is a stated architectural principle their CTO defended publicly, not an oversight. Reversing it means contradicting their own pitch.

The flyer forces one revision to that argument. They have *already* crossed into normative territory via the recommendation prose — they just did it without admitting an ontology exists. So the barrier to shipping a real rubric is lower than "reverse a public principle"; it is closer to "make explicit what the model is already doing implicitly". Hold the assessment at moderate rather than low, and note that the step they'd have to take is one that also *exposes* them to validity scrutiny they currently avoid by keeping it invisible. There is a genuine incentive for them not to.

The realistic encroachment path is unchanged but now confirmed as designed-for: **"Add New Topic"** is a primary toolbar button. A motivated customer hand-enters DFVA-adjacent topics — AI literacy, systems thinking, decision ownership — and gets coverage percentages back. That is a crude approximation of Panel B/C rubric scoring, assembled by the customer rather than shipped by the vendor. It has no bands, no weighting, no criterion scaffolds, no validity claim, and no external referent — but it may be *good enough* for a budget-constrained buyer who has already paid for the LMS add-on.

Roadmap and claims, in rough order of threat to us:

| Item | Status | Threat |
|------|--------|--------|
| Accreditation-framework benchmarking | Marketing only — **verified absent** from user guide | Medium (was High) — aspiration, not capability; but the marketing is live and the gap is theirs to close |
| Job descriptions / industry skill models | Marketing only — **verified absent** from user guide | Medium (was High) — would be the external referent if built; no evidence it exists |
| "Missing skills" detection | Marketing only — **verified absent** | Low-Medium — implies a reference list they don't have |
| Student performance metrics tied to topics | Demo roadmap | Medium — powerful, but still internal |
| LMS behavioural data integration | Demo roadmap | Low — deepens the closed loop |
| Resource→keyword export | Demo roadmap, **not yet in guide** | Low as threat, **high as opportunity** (see below) |
| Agentic "ask for a report" layer | Demo roadmap | Low — interface convenience |

Post-verification, nothing in the shipped product breaks the complementarity thesis. The threat is that they *ship the marketing* — the copy has run ahead of the build, which usually means it is on the plan. The signal to watch is the user guide, not the website: marketing pages will keep claiming external benchmarking regardless, but the support docs only change when something real lands.

## The Complementarity Case

These are not substitutes, and the pipeline fits almost too neatly. Atomic CAT is an extraction layer over what is actually taught; DFVA is a scoring layer over curriculum content. Their output — resource-level topic maps — is a materially better input to DFVA's curriculum-facing dimensions than handbook prose is.

Ball raised this himself, unprompted, when asked about customised learning solutions: he described the keyword/topic export becoming the data source for another tool that feeds AI, and said that while it isn't what CAT does, CAT could be the stepping stone. That is an integration invitation from the CTO on a public webinar.

Practical enablers: they run a 500-project custom dev practice, they sit on the LTI working group, and everything they build is LTI 1.3. An Evidura scoring panel delivered via LTI over their extraction layer is technically unremarkable.

The strategic question is whether that is a partnership or a dependency. Feeding on their extraction makes our curriculum dimensions better but ties us to their install base; staying on handbooks keeps us vendor-neutral and cross-institutional, which is the independent-standard moat. **Recommendation: pursue export-level integration (spreadsheet/API in, no runtime dependency), not platform integration.** We consume their output where a customer has it; we degrade gracefully to handbooks where they don't.

## Response Strategy

1. **Do not position against them.** They are not selling what we sell, and their beachhead is a vertical we should not enter. Positioning Evidura as "better curriculum analysis" invites a comparison we lose on evidence depth and grain.
2. **Cede med ed explicitly.** If a prospect's problem is LCME/AMC content-coverage evidence, Atomic CAT is the better answer and saying so buys more credibility than it costs. Our question doesn't apply to an MD program.
3. **Name the distinction.** Thorough coverage vs. continued relevance. If a prospect has Atomic CAT: "good — you know what you teach and how well. We tell you which of it still earns its place."
4. **Lead with the auditable standard, not just the external referent.** Post-flyer this is the stronger of the two. Both tools now make normative claims; only one can show its working. Frame as a question rather than an attack: *where does the recommendation to add long-term care content come from, and can you show a review panel?*
5. **Lead second with the external referent.** Panel A exposure, labour evidence, graduate outcomes, cross-institutional benchmark. None available to a closed-loop LMS tool.
6. ~~Verify the two High-threat flyer claims.~~ **Done 2026-08-13** — both unsupported by their own user guide. Proceed on the closed-loop thesis without hedging.
7. **Consider over-coverage detection for the roadmap.** Their redundancy insight is good and we don't have it.
8. **Explore the export bridge.** Low cost, and the invitation is on record. Note the export is still not in the user guide, so it may not have shipped either — worth confirming before building against it.

### Reassess triggers

Watch the **[user guide](https://support.atomicjolt.com/knowledgebase/atomic-cat-curriculum-analysis-tool-user-guide)**, not the marketing pages. The website already claims most of the below; the support docs are the honest signal. A re-check every quarter is enough.

- **Any external reference appears in the docs** — imported framework, competency list, skill model, job-description corpus, labour-market feed. This is the one that would move them from adjacent to competing, and it is now a documentation diff rather than an open question.
- They publish a rubric or fixed ontology — makes the implicit standard explicit and contestable.
- Accreditation-body requirement mapping demonstrably ships.
- Cross-institutional benchmarking appears (needs multi-tenant analysis).
- Movement out of med ed into general HE program strategy, or hard pivot to corporate L&D (the latter is good news).
- Australian institutional customers or TEQSA-specific messaging.

## Comparison to Coursedog + Mapademics

Worth holding the two competitor notes side by side — they threaten from opposite directions. See [coursedog-mapademics](coursedog-mapademics.md).

| | Atomic CAT | Coursedog + Mapademics | Evidura / DFVA |
|---|---|---|---|
| Evidence base | Actual LMS materials | Submitted syllabi | Public handbooks |
| Grain | Course → session → resource | Course | Program → dimension |
| Standard | **Implicit — LLM priors** | NACE competency framework | 11-dimension published rubric |
| Auditable? | **No** | Partly (framework is public) | Yes — published, versioned, IRR |
| External referent | None (claimed, unverified) | Current labour market | Labour market + AI exposure + forward horizon |
| Time horizon | Present | Present | 2027+ |
| Scope | One institution | One institution | Cross-institutional |
| Beachhead | Medical education | US compliance (Core IMPACTS) | AU Go8 program portfolios |
| Sold as | LMS add-on | SIS platform feature | Independent standard |

Atomic CAT is deep evidence judged against an invisible standard. Mapademics is shallow evidence judged against today's job market. DFVA is the only one of the three whose standard is both forward-looking *and* inspectable — and after this flyer, inspectability is the more defensible half of that claim. It is worth more than either of their data advantages, provided the IRR work lands.
