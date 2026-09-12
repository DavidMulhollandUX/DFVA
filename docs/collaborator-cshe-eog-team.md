# Evidura — Collaborator Brief: the CSHE EOG engineering-curriculum team

**Recommendations on a six-university group that has independently built a near-twin of Panel C, run it over 158 subjects and 963 learning outcomes, and published a finding Evidura needs but cannot generate on its own.**

**Prepared by:** David Mulholland, Associate Director, Service Experience & Design, University of Melbourne
**Date:** 2026-09-09
**Source:** *From Execution to Governance: A Systematic Analysis of Engineering Curricula in the GenAI Era* — CSHE EOG presentation, Peng et al. (attended 2026-09-08)
**Deep source reading:** [Source analysis of the EOG deck](cshe-eog-source-analysis.md) — supersedes §2.1a below on Chen et al.
**Reads with:** [Collaborator brief: Kayley Lyons](collaborator-kayley-lyons.md) · [Panel C v4](dfva-panelc-v4-recommendation.md) · [Panel C v4.1](dfva-panelc-v41-recommendation.md) · [IRR study protocol](evidura-inter-rater-reliability-study.md) · [UoM commercialisation reference](evidura-uom-commercialisation-reference.md) · [Independence structure](evidura-independence-structure.md)

> **Recommendations only.** Nothing here is a decision, and §5 is not legal advice. Verify author roles and the paper's publication status before acting; the deck was presented, not yet published, at the time of writing.

---

## 1 · Who they are, and why this one is different

Sixteen authors across six universities — Melbourne, Sydney, UTS, Queensland, UNSW and RMIT — with **stella.peng@unimelb.edu.au** as corresponding author and a UoM affiliation on the lead. This is a standing multi-institution network in engineering education, not a single lab.

Three facts make the group unusually valuable:

1. **They built the same instrument independently.** The Execution–Orchestration–Governance (EOG) tiers are Panel C's construct space arrived at from a different direction. Convergent instrument design is the strongest available evidence that Panel C measures something real rather than something Evidura invented.
2. **They ran it at scale, by hand, with two coders.** 158 core subjects, 963 coded learning outcomes, 308 coded changes, dual-coder classification, 2023 vs 2026 longitudinal comparison. Evidura has never produced a hand-coded corpus of that size.
3. **Three of the nine program–institution cells are already scored in Evidura.** `mc-civeng`, `mc-mecheng` and `mc-softeng` carry Panel C v4.2 scores today. A convergent-validity test needs no new fieldwork.

**Recommendation R1.** Treat this group as a *second* named academic collaborator alongside Kayley Lyons, filling a different gap. Lyons is the psychometrician who certifies the instrument. The EOG team is the corpus and the co-validation partner. Do not ask either to do the other's job.

---

## 2 · What their sources say, and where the deck overstates them

The evidence base is sound and largely already inside Evidura. Two claims need tightening before you repeat them.

| Source as cited in the deck | What it actually establishes | Action for Evidura |
|---|---|---|
| Brynjolfsson et al. 2025, via the 2026 AI Index — "~20% decline in employment among junior software developers (22–25) since 2024" | *Canaries in the Coal Mine* (ADP payroll microdata) finds a **19% relative gap** between young workers in AI-exposed occupations and their less-exposed peers, driven by reduced hiring rather than separations — a counterfactual gap, not an absolute headcount fall. The August 2026 revision widens it. | **Adopt the paper, not the deck's phrasing.** Cite it as a relative employment gap concentrated in automating (not augmenting) occupations. Panel A's exposure framing already matches this; the deck's wording would fail Evidura's own report lint. |
| Corbin, Dawson & Liu 2025 — employers expect capability, universities changed verification | *Talk is Cheap: Why Structural Assessment Changes Are Needed for a Time of GenAI* (Deakin CRADLE). Same research group as Tai, Ajjawi, Boud, Dawson & Panadero (2018), already the authority under C2 evaluative judgement. | **Add to the C2 and W2 evidence bases.** It is the theoretical statement of the empirical result the EOG study just produced. |
| Slide 5's "Assessment Principle 1 (Secure) / Open vs Secure" | This is the **University of Sydney two-lane framework** (Bridgeman & Liu, 2024–25), not a generic principle. Lane 1 secures attainment; Lane 2 is where AI-integrated authentic work belongs. | **Name it.** The deck's "verification reflex" critique lands on Lane 1 *used without Lane 2*. Framing it as a critique of two-lane assessment as such would be unfair and would cost you Sydney co-authors. |
| Jobs and Skills Australia 2025, *Our Gen AI Transition* | Augmentation outweighs automation overall; automation potential concentrates in routine roles; demand rises for digital literacy plus higher-order human skills. | Already in the repo under `data/jsa/` as the Panel A basis fallback. **Cite the shared dependency explicitly** — it is a credibility asset in the first meeting. |
| Krathwohl 2002 (Bloom revised) · Meadows 2008 (systems) · Amershi et al. 2019 · Hollnagel & Woods 2020 · Shneiderman 2022 | The EOG tier scaffolding: cognitive level × structural level × human–AI collaboration profile. | **Three of these are absent from Panel C's evidence base.** See R4. |
| Long & Magerko 2020 (AI literacy) · Lodge et al. (TEQSA adaptive capabilities) | Already the anchors for C3 and for Panel C v4 as a whole. | Shared authority. No action. |
| Bell 2025 · Ahmed et al. 2025 · van Esch 2026 · Álvarez Ariza et al. 2025 · Rahman et al. 2026 · Chen et al. 2026 · Hayden et al. 2026 | **All seven verified as real** (§2.1). Two are grey literature, one is a first-issue journal. | **Read Chen et al. 2026 and Ahmed et al. 2025 properly** — see §2.1. The only citation-practice issue left is traceability on the two corporate-authored sources. |

### 2.1 Citation verification — all seven are real

**Correction, 2026-09-12.** An earlier version of this brief reported that six of
seven citations could not be located, based on searches of Consensus (Semantic
Scholar, PubMed, Scopus, arXiv) and general web search on author surname plus year.
That conclusion was wrong. DJ supplied the source links; every one resolves. Two
failures were mine outright — van Esch 2026 appeared in my own search results and I
did not match it to the citation, and Ahmed et al. 2025 is a major ACM journal
article I should have found on the first query. The rest are explained by source
type: academic indexes do not carry professional-body reports, vendor research, or
a journal in its first issue. **Absence from an index is not absence from the
literature, and I treated it as such.**

| Citation | What it actually is | Type |
|---|---|---|
| **Bell 2025** | Engineers Australia, *The impact of AI and generative technologies on the engineering profession*, January 2025 | Professional-body report |
| **Ahmed et al. 2025** | Ahmed, Aleti, Cai, Chatzigeorgiou, He, Hu, Pezzè, Poshyvanyk & Xia, *Artificial Intelligence for Software Engineering: The Journey So Far and the Road Ahead*, **ACM TOSEM 34(5)**, doi:10.1145/3719006 | Peer-reviewed, top venue |
| **van Esch 2026** | van Esch, *From agentic AI to AI-orchestrated organizations: Understanding the next surge in artificial intelligence*, **Business Horizons**, doi:10.1016/j.bushor.2026.03.003 | Peer-reviewed |
| **Álvarez Ariza et al. 2025** | Álvarez Ariza, Benitez Restrepo & Hernández Hernández, *Generative AI in Engineering and Computing Education: A Scoping Review*, **IEEE Access 13**. 146 studies | Peer-reviewed |
| **Rahman et al. 2026** | Rahman, Khandakar, Ayari, Naji, Al-Ali, Sellami & Alhazbi, *Artificial intelligence innovations challenges and emerging trends in engineering education*, **Discover Education 5(1)**, doi:10.1007/s44217-026-01137-1 | Peer-reviewed |
| **Chen et al. 2026** | Chen, Chai, Wijeratnre, Naeem, Loo, Zhou & Lucas, *A GenAI competence framework for engineering curriculum enhancement in higher education*, **Intelligent Technologies in Education 1(1) art. 2**, doi:10.53761/ITED/1.2 | Peer-reviewed, first issue |
| **Hayden et al. 2026** | Hayden, DeMarrais, Cheung, Newman, Abelson, Kroeker & Dietz (with Pearson), *The AI workforce pulse: The adaptability imperative*, Cognizant, 18 June 2026. Survey of 750 HR directors+, US/UK/India, 1,000+ employee firms | Vendor research with data |

**Recommendation R2 (revised).** Drop the reference audit from the opening approach.
It was built on a false premise and the email that carried it would have damaged the
relationship at first contact. Ask for the reference list if you want it, as an
ordinary courtesy, not as a correction.

**The one point that survives, and it is minor.** *Bell, 2025* and *Hayden et al.,
2026* are both hard to trace from the citation string alone: the Engineers Australia
report is corporate-authored on its landing page, and the Cognizant piece is a
seven-author industry blog. A reader cannot get from either string to the document.
That is a formatting note for a copy-editor, not a methodological objection, and it
is not worth raising in a first email.

### 2.1a What the verified sources change for Evidura

Two of them matter more than the citation question ever did.

**Chen et al. 2026 is the closest thing to a direct methodological competitor Panel C
has.** *A GenAI competence framework for engineering curriculum enhancement* proposes
competence tiers for integrating GenAI into engineering programs, built on AI-literacy
concepts and validated through stakeholder surveys, focus groups and interviews — with
impact-assessment mechanisms and an implementation roadmap. That is Panel C's problem,
addressed by a different method, published in 2026.

**Recommendation R2d.** Read Chen et al. 2026 in full before the first meeting, and
before adopting any of the §3.3 changes to Panel C. Three questions to answer from it:
does its tier structure agree with C1–C5; does its stakeholder-validated derivation
supply the content-validity evidence Panel C still lacks (v4.1 §6, the precondition on
IRR recruitment); and is it a citation, a collaboration, or a competing instrument.
This single paper may matter more to the methodology than the whole EOG deck.

**Ahmed et al. 2025 (ACM TOSEM) is a better authority than anything currently in Panel
C's evidence base for the automation claim.** A roadmap paper from nine authors in the
discipline's leading journal, explicitly framed around applying AI in software
engineering while protecting fundamental human values.

**Recommendation R2e.** Add Ahmed et al. 2025 to the C3 evidence base alongside the
existing TEQSA and Long & Magerko anchors, and van Esch 2026 (Business Horizons) to
C1, where AI-orchestrated organisation is precisely the coordination-across-people-
and-systems construct the C1 level 3 anchor is reaching for. Both are peer-reviewed,
both are 2025–26, and neither requires a new item.

**The Engineers Australia report is an asset, not a weakness.** For an Australian
engineering-education paper, the national professional body's own position on the role
shift is the *right* source — more authoritative with a TEQSA or Engineers Australia
audience than a journal article would be. Evidura should read it too: it is the
accreditation-adjacent statement of what the profession expects, and Panel C currently
cites no Australian professional body at all.

**Recommendation R2f.** Obtain and read the Engineers Australia report. If it names
capabilities, check them against C1–C5 and W1–W3 for anything the instrument cannot
see — the same construct-underrepresentation test that produced v4.1.

### 2.2 Additional sources located during this search

These came out of the verification pass and are worth having on their own merits. They
are additions to Panel C's evidence base, not replacements for anything in the deck.

| Source | Why it matters to Evidura |
|---|---|
| **Shapiro et al. 2026**, *Metacognitive AI literacy: going beyond the AI skills gap agenda*, **Learning, Media and Technology** | Argues functional AI-literacy frameworks are obsolete against probabilistic, epistemically opaque systems, and recasts literacy as metacognitive social practice including governance. **The strongest single addition to C3** — the peer-reviewed statement of why C3 level 1 ("tool operation") is not durable |
| **Guo 2026**, *From Technical Skill to Creative Agency* | Prompt logs, rationale statements and revision histories as assessment artefacts, to make agency observable. **Independent arrival at C2 level 3** from another discipline |
| **Kofinas et al. 2025**, **BJET** | Markers cannot distinguish GenAI-assisted work, and authenticity does not protect integrity. **A scope boundary on W2** — it scores task fidelity, not integrity assurance, and this is why those must stay separate |
| **Jones 2026**, *On the Measurement of AI Literacy Among Students in Higher Education: A Scoping Review* | 39 studies, mostly self-report, few objective or performance-based. The answer to "how is this better than asking people?", written by someone with no stake in Evidura |
| **Alenezi 2026** (three archival papers on agentic software engineering) | A five-category competency framework (technical, cognitive, socio-technical, governance, organisational) — the closest external analogue to Panel C's item structure |
| **Martin et al. 2025**, **IJ STEM Education**; **Muzulon et al. 2025** | Engineering-specific graduate and employer evidence; Muzulon supplies a junior/mid/senior competency progression |
| **Lee et al. 2026** (NUS–Google workshops) | Curricula must shift to verifying AI-generated artefacts — corroborates the EOG conclusion from an industry–academy panel |

**Recommendation R2b (unchanged).** Add Shapiro et al. 2026 to the C3 evidence base,
Guo 2026 to C2, and Kofinas et al. 2025 to W2 as an explicit scope boundary. All three
are v4.3 candidates that need no new item and no new fieldwork.

**Recommendation R2c (unchanged).** Cite Jones 2026 in Evidura's own methodology
defence. The most common challenge to a curriculum-scoring instrument is "how is this
better than asking people?", and a 2026 scoping review answering it is worth more than
an internal argument.

**Recommendation R2g.** Offer the §2.2 list to the EOG team as a reading contribution,
not a correction — several of these post-date their June 2026 data collection and would
strengthen their discussion section.


**Recommendation R2.** Ask for the reference list before the first meeting. It is a low-cost, flattering request, and it converts a slide deck into a bibliography you can lint against.

---

## 3 · Where EOG and Panel C overlap, and what each has that the other lacks

### 3.1 The mapping

| EOG tier | Nearest Panel C construct | Fit |
|---|---|---|
| **Execution** — Apply/Understand, component level, AI as primary doer | The *absence* of C1–C5 evidence; the population Panel A calls exposed | Complement, not overlap. Panel C has no item that scores "this outcome is at the automatable tier". |
| **Orchestration** — Analyse/Create, emergence, human as workflow architect | **C1** distributed cognition (coordination across people *and* tools/AI systems) | Strong. C1 level 3 is EOG Orchestration stated as an assessment requirement. |
| **Governance** — Evaluate, socio-technical boundary control, human as auditor of a probabilistic supplier | **C3** level 3 (critique or governance of AI systems) and **C2** level 3 (document and justify reliance decisions) | Strong, and split across two items — which is a finding in itself. |
| Their "verification reflex" (243 AT changes vs 48 LO vs 17 GA) | **W2** authentic task design, and design rule **R2** (level 3 requires assessment evidence) | Panel C already encodes the assumption; EOG supplies the first Australian measurement of it. |
| Their disciplinary variation (Civil governance 5.5%, Mechanical 0.3%) | Panel C scored per program, never aggregated by discipline | Evidura can reproduce this at national scale. They cannot. |

### 3.2 The convergent-validity test — do this first

Evidura scores `mc-civeng` C3=1, `mc-mecheng` C3=1, `mc-softeng` C3=1 (level 1 = "AI or digital tools appear only as electives or as tool operation/training"). EOG independently reports UniMelb governance in "trace amounts throughout" and dedicated AI literacy "nearly absent". Two instruments, two teams, two methods, one conclusion.

**Recommendation R3.** Run a nine-cell convergent-validity study as the opening collaboration: UQ × USYD × UniMelb across Civil, Mechanical and Software. Score the six non-Melbourne cells to Panel C v4.2 from existing captures, correlate C1 against EOG Orchestration share and C2+C3 against EOG Governance share, and publish the agreement — *including* the disagreements. This is a fortnight of work, produces a joint paper, and gives Evidura the one thing the IRR study cannot: evidence that the instrument agrees with a human-coded instrument built by someone else.

### 3.3 What to import into Panel C

**Recommendation R4.** Consider four changes. Each is a v4.3 candidate, not a decision.

1. **Add the human–AI collaboration profile as an explicit anchor dimension.** EOG's third column — delegation / co-creation / oversight — is the cleanest statement yet of what C1 level 3 and C2 level 3 are reaching for. Amershi et al. 2019, Hollnagel & Woods 2020 and Shneiderman 2022 are absent from Panel C's evidence base and would strengthen C1–C3 without adding an item.
2. **Score the Execution tier explicitly, or state why not.** Panel C's design rule R2 means an execution-heavy program scores low by omission. EOG scores it positively as a share. A positive share is more defensible under challenge than an inference from absence, and it is what a course director will ask about first.
3. **Add a longitudinal item or a change flag.** EOG's 2023 vs 2026 comparison is the highest-signal part of the study, and Panel C is entirely cross-sectional. C4 was re-anchored on transfer precisely because review recency was unscoreable from handbooks — but *change between two captured handbook years* is mechanically scoreable, and Evidura holds the captures.
4. **Split C3 governance from C3 literacy, or accept the coupling knowingly.** EOG separates the auditing-a-probabilistic-supplier construct from tool literacy. Panel C compresses both into C3, so a program with strong data-governance teaching and no AI content scores the same as one with the reverse. Raise this at the v4.1 content-validity step, not after.

**Recommendation R5.** Do not adopt EOG's three-tier structure as a replacement for Panel C. It codes learning outcomes; Panel C codes assessment evidence, which is the harder and more defensible target (design rule R2). Adopting their tiers would trade Evidura's strongest methodological claim for their strongest dataset. Take the dataset.

### 3.4 What Evidura brings that they do not have

State these plainly in the first meeting. They are the reason to collaborate rather than be scooped.

- **Scale.** 3,073 evidence files across nine institutions versus 158 subjects across three. Their study is one discipline family; the Evidura corpus spans faculties.
- **Assessment-level evidence with verbatim provenance.** Every Panel C score cites handbook lines, verified mechanically by `dfva:verify-evidence --strict`. Their coding is at learning-outcome level and its provenance lives in a spreadsheet.
- **The exposure axis.** EOG measures curriculum only. Panel A supplies the labour-market side — AIOE exposure via graduate destinations — which their own Brynjolfsson citation implies but their method cannot deliver.
- **Reproducibility.** The instrument, the anchors, the generator and the guards are versioned in a repository. A qualitative document analysis is not re-runnable next year without re-doing it by hand.
- **A reliability protocol already designed.** The IRR study (5 raters × 10 programs × 8 items + 2 gates) is the study they will need if a reviewer asks about their dual-coder agreement.

---

## 4 · Recommended collaboration sequence

**Recommendation R6.** Sequence the approach in four steps and do not skip step 1.

| Step | Action | Why this order |
|---|---|---|
| **1. Ask, do not pitch** | Email Stella Peng within a fortnight of the talk. Ask for the coding protocol, and offer the three UniMelb Panel C v4.2 records as a cross-check on their UniMelb column. Do not mention Evidura, a company or a product. | The [Mom Test discipline](compass-expert-conversations.md) applies. The opening ask is method comparison between two people who coded the same programs — which is true, specific and flattering. |
| **2. Convergent-validity note** | Co-author a short methods paper on the nine-cell comparison (R3). Joint first authorship or theirs first. | It is genuinely their corpus. It establishes the relationship on academic terms before any commercial question exists. |
| **3. Recruit into the IRR study** | Their dual-coders are trained raters in exactly the target domain, and the protocol needs a stratified rater pool. Recruiting from six universities also breaks the single-institution objection. | The IRR study is the single most important validation step before any external sale. |
| **4. Only then, and only if asked, describe the platform** | If they ask what tooling produced 3,073 records, answer honestly and briefly. | See §5. Volunteering commercial intent early converts a research relationship into an IP negotiation you are not ready for. |

**Recommendation R7.** Offer them something they cannot get elsewhere and that costs Evidura nothing to give: **national disciplinary base rates**. Their Mechanical governance gap (0.3%) is a three-institution finding. Evidura can say whether it holds across nine. That single contribution makes Evidura a co-author rather than a vendor.

**Recommendation R8.** Do not offer, imply or accept a data-sharing arrangement that moves their coded corpus into the Evidura repository until §5 is resolved. Cite it, correlate against it, publish alongside it — but a copy of their dataset inside a repository that later becomes company property is exactly the fact pattern that ends collaborations badly.

---

## 5 · Rules for collaborating with university academics, and what it means for IP

The commercialisation position is documented: UoM owns IP developed in the course of employment, Commercialisation involvement is triggered automatically by IP transfer to an external entity, and the standard terms are 30–50% equity, a board seat and first-refusal rights. See [the commercialisation reference](evidura-uom-commercialisation-reference.md). Academic collaboration does not change that, but it can make it substantially worse if handled carelessly, because it adds **co-owners at other universities**.

### 5.1 The eight rules

**Recommendation R9.** Adopt these as standing rules for every academic collaboration, not just this one.

1. **Publishing is safe; transferring is not.** Publishing the methodology is normal scholarly activity and does not trigger Commercialisation. Licensing it to an entity, taking payment for it or issuing equity against it does. Keep every interaction with the EOG team on the publishing side of that line until the DVC-R sponsorship question is settled.

2. **Six universities means six IP policies.** Every co-author brings their employer's IP position with them. A joint paper is low risk. A jointly *developed instrument* is co-owned by up to six institutions, each with its own commercialisation office and its own claim. **Never co-develop a scored item, an anchor or a generator with an external academic.** Co-author findings; keep the instrument single-owner.

3. **Write the authorship and IP terms down before the first draft, not after the first result.** One page, agreed by email, covering: who authors what, who owns the coded data, who owns any instrument change that comes out of the work, and what each party may do commercially afterwards. The moment to ask is while everyone is enthusiastic and nothing is valuable yet.

4. **Background IP stays background.** State in writing that Panel C v4.2, the DFVA rubric and the Evidura corpus predate the collaboration and remain the originating party's background IP. Anything created jointly is foreground IP and is governed by the one-pager. This distinction is standard, uncontroversial and is the single most protective sentence available to you.

5. **Do not let an external academic's contribution enter the canonical source.** If R4's changes are adopted after discussion with the EOG team, derive them from the *published literature* they pointed at — Amershi, Hollnagel & Woods, Shneiderman — not from their unpublished framework. Cite a published source; do not incorporate an unpublished one. This is both the ethical position and the clean-IP position, and they coincide.

6. **A reviewer is not a co-owner, and neither is a critic.** Kayley Lyons reviewing an instrument does not give her a claim on it. Neither does the EOG team critiquing it. Contribution to *evaluation* is authorship-worthy and not ownership-worthy. Keep the roles named explicitly in the one-pager so nobody has to infer it later.

7. **Declare the conflict early and in writing.** A conflict-of-interest disclosure to HR is separate from Commercialisation and does not trigger it. Filing one before any commercial step — and telling collaborators that a commercial venture is contemplated *before* they invest effort — is what keeps the relationship intact when the venture becomes visible. Discovering it later is what ends collaborations.

8. **Get the external opinion before you need it.** A university IP attorney or commercialisation consultant, one engagement, on the specific question of multi-institution foreground IP in an education-research collaboration. The [pre-meeting checklist](evidura-uom-commercialisation-reference.md) already lists an external opinion as a prerequisite; this collaboration is the reason to obtain it now rather than at the first Commercialisation meeting.

### 5.2 What this collaboration is worth under Option C

**Recommendation R10.** Evaluate the EOG collaboration against the **academic-only fallback**, not against the spin-out plan. If Commercialisation cannot be moved and Evidura stays internal — publish the methodology, build the benchmark, rate UoM programs — then a six-university validation network is not a consolation prize. It is the core asset of that path, and it is the one asset that appreciates while the commercial question stays unresolved.

That makes this collaboration unusual: it is the rare move that is correct under both outcomes. Pursue it on academic terms, keep the instrument single-owner, and let the commercial question resolve on its own timeline.

---

## 6 · Recommendation summary

| # | Recommendation | Cost |
|---|---|---|
| R1 | Treat the EOG team as a second named collaborator, distinct in role from Lyons | — |
| R2 | **Revised** — drop the reference audit. All seven citations verified real (§2.1) | — |
| R2b | Add Shapiro 2026 to C3, Guo 2026 to C2, Kofinas 2025 to W2 as a scope boundary | Design time |
| R2c | Cite Jones 2026 in Evidura's measurement defence against the self-report challenge | Hours |
| **R2d** | **Read Chen et al. 2026 in full before the first meeting** — a GenAI competence framework for engineering curriculum, and Panel C's nearest methodological neighbour | Hours |
| R2e | Add Ahmed et al. 2025 (ACM TOSEM) to C3 and van Esch 2026 (Business Horizons) to C1 | Design time |
| R2f | Obtain the Engineers Australia report; test its capability list against C1–C5 and W1–W3 | Hours |
| R2g | Offer the §2.2 reading list as a contribution, not a correction | — |
| R3 | Run the nine-cell convergent-validity study (UQ/USYD/UniMelb × Civil/Mech/Software) | ~2 weeks |
| R4 | Consider four Panel C v4.3 candidates: collaboration-profile anchors, positive Execution scoring, a longitudinal change flag, C3 governance/literacy split | Design time |
| R5 | Do not replace Panel C's assessment-evidence basis with EOG's outcome-coding basis | — |
| R6 | Approach in four steps: ask → co-author → recruit to IRR → disclose commercial intent last | Weeks |
| R7 | Offer national disciplinary base rates as the contribution only Evidura can make | Days |
| R8 | Do not ingest their coded corpus into the repository | — |
| R9 | Adopt the eight collaboration rules as standing policy | — |
| R10 | Judge this collaboration against the academic-only fallback, where it is the core asset | — |
