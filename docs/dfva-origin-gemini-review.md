# The February Origin: Review of "The Great Flattening" and Its Sources

Compiled 2026-08-16 · Service Experience & Design, University of Melbourne

On 2026-08-16 the actual first link in the DFVA provenance chain was
recovered: the **Gemini Deep Research thread of 18 February 2026** that
produced the report *"The Great Flattening: Structural Obsolescence of Human
Middleware Degrees in the Age of Agentic AI (2025–2027)"* — preserved
verbatim at [dfva-origin-gemini-report.md](dfva-origin-gemini-report.md) —
together with the seed prompt that started it. This document records the
seed, reviews the report and its 53 cited sources, and corrects the
provenance chain in the
[synthesis reverse-engineering](dfva-synthesis-reverse-engineering.md).

---

## 1. The seed prompt (verbatim, recorded here as the chain's first artifact)

DM's prompt to Gemini Deep Research, 18 February 2026 — by DM's own account
transcribed from a video (YouTube or TikTok):

> Hey AI which college degrees will be obsolete by 2027? What dies fast are
> degrees that train you to be a human middleware layer taking structured
> info, reformatting it summarizing it, routing it or doing template based
> analysis with light judgement. If your curriculum is mostly learn the tool
> follow the rubric, produce the report ai will eat the entry level job
> market attached to it and leave you with a credential and no leverage.
> That means the highest risk pass are the most generic versions of business
> administration, marketing communications, journalism as content production
> and information systems programs that are basically Powerpoint plus school
> light. Same for low rigor coding degrees that teach you to crank crud apps
> without systems thinking. Same for parallel tracks that focus on document
> churn instead of strategy. Same for finance, accounting programmes that
> stop at bookkeeping and standard models instead of decision making under
> uncertainty and a lot of Ux programmes that are really just figma boot
> camps with vibes. What survives is anything that touches reality liability
> or scares trust engineering with real math nursing and clinical paths hard
> sciences, cyber security with hands on ops law. When it's about argument
> and risk and business when it's about building and selling in the wild
> pick a degree like you're picking a weapon. Then spend the next 18 months
> building proof projects clients research, ship systems. Degrees don't get
> you hired. Demonstrated power does.

The text carries speech-to-text artifacts consistent with transcription from
spoken video: "highest risk **pass**" (paths), "**scares** trust" (scarce
trust), run-on clause boundaries ("cyber security with hands on ops law.
When it's about argument and risk"), and the influencer cadence of the close
("pick a degree like you're picking a weapon… Degrees don't get you hired.
Demonstrated power does."). **The DFVA's ultimate intellectual ancestor is
an unidentified social-media monologue.**

**Video-identification hunt (2026-08-16): negative, with two corrections
and a hypothesis.** A directed search (exact phrases, site-scoped queries,
YouTube caption search engines, repost hunting) found **no indexed trace of
the monologue anywhere on the open web** — no video, transcript, quote or
repost, before or after February 2026. Two further probable transcription
corrections emerged from the analysis: "Powerpoint plus **school light**" is
plausibly "PowerPoint plus **SQLite**" (a jab at shallow IS curricula), and
"**parallel** tracks that focus on document churn" is plausibly
"**paralegal** tracks" — which makes the sentence cohere and quietly adds a
law-adjacent middleware target to the seed's list. The structural
observation that matters: the monologue itself has the shape of **an LLM
answer read aloud** — it restates the question, runs a tidy parallel
scaffold ("What dies fast… Same for… Same for… What survives…"), and closes
with imperatives — matching the late-2025 short-form genre of creators (or
faceless AI-voice accounts) reading "brutally honest" chatbot answers to
camera. If so, the script never existed as indexed text, which would explain
the total search silence — and would make the DFVA's provenance chain **five
AI systems deep**, beginning with an unknown model that wrote the video's
script. The genre attribution (Naval-derivative "leverage/proof-of-work"
short-form; candidates of that register rather than any identified
individual) is inference, not fact.

## 2. The corrected provenance chain

The recovery confirms the forensic reconstruction in the
[reverse-engineering document](dfva-synthesis-reverse-engineering.md) §6 —
Gemini Deep Research plan card, transcribed and re-run — and completes it:

| Link | Artifact | Date | Status |
| --- | --- | --- | --- |
| 0 | A video monologue (YouTube/TikTok) on degrees obsolete by 2027 | ≤ Feb 2026 | Unidentified; survives only as the transcribed seed |
| 1 | Seed prompt (video transcript) → **Gemini Deep Research** | 2026-02-18 | Recovered; recorded verbatim above |
| 2 | Gemini's 8-point research plan + "The Great Flattening" report (53 citations) | 2026-02-18 | Recovered; preserved in-repo |
| 3 | The plan card, transcribed (OCR artifacts) → pasted into **Perplexity** | ~Apr 2026 | The origin-conversation brief |
| 4 | Perplexity synthesis (~56 citations) → *"create an assessment"* → the rubric | ~Apr 2026 | Previously reconstructed |
| 5 | COMPASS Discover proposal · repo initial commit | 2026-04-22 · 2026-05-07 | Documented in the evolution doc |

Two corrections to earlier analysis follow:

- **The upstream hunt's negative result is explained.** No public post
  assembling the package could be found because the assembly happened in a
  video (avenue searched, but video content is effectively unindexable) and
  in DM's transcription of it.
- **The attribution of the "generated layer" shifts backward.** Phrases the
  reverse-engineering credited to the chain's machine layers distribute as:
  the *video* contributed the middleware-applied-to-degrees move, the degree
  list, "systems thinking," "decision making under uncertainty," "document
  churn," "figma boot camps," the liability/trust survival test, and the
  2027 deadline; the *Gemini planner* coined "the boundary of obsolescence"
  (plan point 7) and the analytic decomposition; the *Perplexity pass*
  crystallised the three-contrast boundary triad and "degree archetypes."

## 3. What the video seed contributed to the rubric — directly

Reading the seed against the v1 instrument shows how much survived three
machine hops essentially intact:

| Seed phrase | v1 rubric element |
| --- | --- |
| "human middleware layer taking structured info, reformatting it summarizing it, routing it" | D1's construct; the CRITICAL band's "human middleware" gloss |
| "template based analysis with light judgement" | D1 anchors 0–1 |
| "learn the tool follow the rubric, produce the report" | The tool-operation boundary → D2/D5 anchor language |
| "crank crud apps **without systems thinking**" | **D2's name** and construct |
| "stop at bookkeeping and standard models instead of **decision making under uncertainty**" | **D4's name, verbatim** |
| "touches reality liability or scare[c]e trust" | D1 level 3 ("regulatory gatekeeping"), D6 ("deep regulatory… expertise"), D8 (accountability) |
| "engineering with real math nursing and clinical paths hard sciences, cyber security" | The resilient-contrast that shaped D3/D6/D8 |
| "which college degrees will be **obsolete by 2027**" | The instrument's defining horizon |
| "Degrees don't get you hired. Demonstrated power does." | The frank advisory posture; the agent prompt's enrolment-advisory rule |

Two of the eleven dimensions carry names lifted near-verbatim from the
video, and the instrument's timeframe, unit of analysis (degree programs),
risk vocabulary, and rhetorical stance are all seed inheritances. The
February–April machinery elaborated, evidenced and structured the seed; it
did not redirect it.

## 4. Review of the report itself

"The Great Flattening" is a more substantial document than the April
Perplexity synthesis — longer, more conceptually organised, with a stronger
citation set — and, crucially, **almost none of its body survived into the
DFVA**, because only its research *plan* crossed the transcription gap.

**Its argument.** Agentic AI (2025–2027) eliminates the "cognitive
middleman": entry-level execution roles are automated ("the broken rung"),
middle management is delayered ("the Great Flattening"), and degrees
training for coordination and execution lose their labour-market warrant.
Resilience comes from three moats — legal liability ("society requires a
throat to choke"), physical ground truth (Moravec's paradox), and
adversarial/high-ambiguity judgment — plus a shift from credentials to
"proof of work."

**What it added beyond the seed** (and beyond what later reached the
rubric): the agentic-AI mechanism (the seed never says *why* 2027; the
report supplies Gartner adoption forecasts and agent-capability curves); the
broken-rung apprenticeship analysis; the liability moat as a named
principle; the middleware definition operationalised as three testable
characteristics (procedural volume, low strategic discretion, information
transformation); the credential-devaluation argument; and the T-shaped
prescription.

**What the DFVA lost at the transcription bottleneck.** Each hop compressed:
a ~350-word monologue → an 8-line plan → a fresh synthesis regenerated from
a different (and mostly weaker) search pass. The report's most
instrument-relevant ideas — the liability moat, the broken-rung mechanism,
the three middleware characteristics — never reached the rubric as such;
fragments were partially rediscovered later (regulatory gatekeeping in D1/D6
anchors; the entry-port focus that v3 formalised as entry-stage exposure).
The strongest idea that never made it: **liability as a distinct,
handbook-visible defence** — professional-accreditation gatekeeping as a
moat — which the DFVA only ever scored obliquely and TEQSA-era v4 folds into
G1 without the liability rationale.

**Where the report is weakest.** Its quantitative spine leans on vendor
forecasting (Gartner adoption percentages via a blog, McKinsey
agentic-organisation essays, Workday/Salesforce/IBM/Deloitte marketing), its
2027 timeline is partly supported by **ai-2027.com — a speculative scenario
document, not institutional research** — and several sections cite pages
that only weakly address their claims. Like the Perplexity pass after it, it
was commissioned by a leading prompt and it delivers the commissioned
verdict; unlike the Perplexity pass, its conceptual organisation (moats,
rungs, flattening) is genuinely stronger than its evidence.

## 5. Source dossier — forecast backbone (verified 2026-08-16)

The nine sources carrying the report's quantitative and timeline claims:

| Source | What it is | Verdict |
| --- | --- | --- |
| McKinsey MGI, "Agents, robots, and us" (Nov 2025) | Consultancy scenario research | Accurate but stretched — 2030 horizon, explicit *partnership* framing, "most human skills will endure" |
| McKinsey, "Superagency in the workplace" (Jan 2025) | Adoption survey | Accurate figures used out of register: only **1% of companies call their gen-AI rollout mature** — which cuts against a 2027 mass-displacement timeline — and its thesis is human empowerment |
| McKinsey, "The agentic organization" (Sep 2025) | Consultancy essay | The "four days of unsupervised work by 2027" quote is real — but it is a **straight-line extrapolation of METR's task-horizon curve, measured at a 50% success rate**, hedged by McKinsey as "could potentially" and arriving in the report as a finding |
| McKinsey, "The future of middle management" | **A 2023 podcast** promoting *Power to the Middle* | **Inverted**: the source is pre-agentic and *pro*-middle-manager — its "player-coach" is a warning about overload, and its authors argue delayered companies "become less connected." "The Great Flattening" is media coinage, not a McKinsey term |
| Gartner figures via modernzen.co | Uncited consulting-blog intermediary | **Laundered and date-shifted**: both predictions are real Gartner, but for **2028, not 2027** — the shift to 2027 was introduced by the Gemini report itself. The same June 2025 Gartner release headline: **over 40% of agentic-AI projects will be canceled by end-2027** |
| ai-2027.com (Apr 2025) | The AI Futures Project's **speculative scenario narrative** (Kokotajlo et al., styled by Scott Alexander) | Category error as evidence: a deliberately provocative fictional forecast cited as timeline support, lending the 2027 date a false air of independent convergence |
| Stanford "Canaries in the Coal Mine" (Brynjolfsson, Chandar & Chen, Aug 2025) via a Constellation blog | Real working paper, ADP payroll microdata | **The report's one strong empirical anchor** — the ~20% figure for developers aged 22–25 exists (raw peak-to-trough; 13%→~19% relative to counterfactual) — but the authors' explicit disclaimer ("we do not claim that these findings are fully driven by AI"), the reduced-hiring mechanism, and the stable-where-AI-augments finding were all stripped |
| Deloitte Tech Trends 2026, "The agentic reality check" (Dec 2025) | Consultancy chapter | **Framing inverted**: the chapter's headline evidence is that agentic AI is *behind* the hype — only 11% of surveyed initiatives in production — cited for the vocabulary while the reality-check data was discarded |
| IBM IBV, "Agentic AI's strategic ascent" (Oct 2025) | Vendor survey of 800 executives | Accurate but weak: executive *opinions*, human-in-command framing, most firms stuck in incremental mode |

**The 2027 pattern.** Everything in the report dated "2027" gets there by one
of three moves: shifting Gartner's 2028 predictions to 2027; adopting the
McKinsey/METR extrapolation without its 50%-reliability definition; or
borrowing a speculative AGI scenario's title year. The seed prompt asserted
2027; the report manufactured its convergence.

## 6. Source dossier — sector, institutional and long-tail sources (verified 2026-08-16)

Of the report's ~46 examined citations, the tier tally:

| Tier | Count | Note |
| --- | --- | --- |
| Peer-reviewed | 6 (~13%) | Of which four pre-date generative AI or concern unrelated topics (a 2013 strategy-tools study; a 2009 NSF program-evaluation paper; a 2021 medical-liability article; an AMLE essay about neoliberalism and the humanities). Dodds, Zamith & Lewis (2025, *Journalism*) is the sole peer-reviewed AI-and-journalism source — a conceptual essay, not labour data |
| Institutional / university / association | ~14 | Including genuine data points (Burning Glass Institute major-shift figures; NACE's 70% skills-based-hiring finding) and several university enrolment-marketing or PR pages |
| Think tank | 3 | Brookings ×2; TRENDS (a UAE state-adjacent institute) |
| Vendor & consultancy marketing | ~10 | Workday, Salesforce, IBM, Wolters Kluwer, Runeleven, Averi, Lowtouch, upGrad, Constellation, HR Executive — the entire "role becomes strategic advisor / AI supervisor" storyline rests on vendors selling that transition |
| Content sites & Medium | ~11 | research.com's programmatic template series; five Medium posts; a pay-to-play Forbes Council piece; one unlocatable blog (Modern Zen) |
| Social media | 2 | Reddit threads |

**Zero peer-reviewed labour-economics studies underpin the central 2027
obsolescence forecast.**

**The inverted-thesis catalogue.** The most striking verification finding is
how many sources argue *against* the report's fatalism and are cited within
it anyway: Harvard Business Publishing's "Perils" piece (Edmondson &
Chamorro-Premuzic — an explicit warning against cutting entry-level roles);
Brookings/Kinder (a proposal to *save* the career ladder via
residency-style training); SSIR/Manno (rebuild the ladder; and the source of
"proof beats pedigree"); Education Next/Hess ("AI Changes NOTHING About What
Students Need to Learn" — cited in a report claiming it changes everything);
a Medium post titled "Why AI Won't Fully Replace Marketing"; and the Milbank
liability article, whose actual argument is that physician-centred liability
is *unstable and should be reformed* — weak support for the report's
liability moat resting on it. Wrong-subject citations include an employer-
recruitment page for supply-chain student projects cited for a curriculum
claim, and the AMLE "End of History" essay (about Fukuyama and the
humanities) cited for business-school stasis.

## 7. Reading

The recovered thread completes a provenance arc that now runs: **a
social-video monologue → four AI systems → a scored instrument governing
real curriculum assessments.** Each machine hop added structure and shed
context: Gemini added mechanism and moats but its body was abandoned at the
transcription gap; Perplexity re-evidenced the plan from a weaker SERP;
the rubric operationalised what survived. The two ideas that proved most
durable across every hop — task-level substitution of routine information
work, and judgment-under-uncertainty as the human defence — are also the two
the subsequent scholarly literature (and the DFVA's own v4 re-anchoring)
independently vindicated. The instrument's history since is the story of
replacing every unexamined inheritance in that chain — the 2027 deadline,
the /36 arithmetic, the verdict-first posture, the uncited constructs — with
things that can be measured, cited, and falsified. What began as "pick a
degree like you're picking a weapon" became, four generations later, an
instrument that suppresses its own labels when their modal probability
drops below 0.80.
