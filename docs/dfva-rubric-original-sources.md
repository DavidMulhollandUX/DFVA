# What the Original Rubric Was Based On: Source Reconstruction

Compiled 2026-08-16 · Service Experience & Design, University of Melbourne

This document reconstructs the evidential basis of the original DFVA rubric
from its origin conversation — the April 2026 Perplexity session preserved
verbatim at [dfva-origin-conversation.md](dfva-origin-conversation.md) — and
verifies what the cited source material actually is and says. It answers one
question: **when each of the eleven v1 dimensions was written, what evidence
was it actually standing on?**

Companion documents: [rubric evolution](dfva-rubric-evolution.md) ·
[v1 methodology](dfva-methodology.md) (the June 2026 retrospective academic
grounding, which this document predates and reconstructs beneath).

---

## 1. The origin conversation: three turns, one rubric

The rubric was created in a single conversational sequence:

| Turn | Prompt | Output |
| --- | --- | --- |
| 1 | An eight-point research brief: define "human middleware," evaluate obsolescence risk for Business Administration, Marketing Communications, Journalism, shallow Information Systems, CRUD bootcamps, bookkeeping-centred Finance/Accounting, and "Figma bootcamp" UX; contrast with resilient fields; synthesise a list of degrees likely obsolete by 2027 | An eight-section synthesis with ~56 distinct cited sources (89 citation marks) |
| 2 | *"create an assessment based on the above which can be applied to any course"* | The DFVA rubric: 10 dimensions + Irreplaceability bonus, 0–3 anchors, risk bands, threshold questions |
| 3 | *"Turn this into a context engineered agent prompt"* | The DFVA agent prompt — the system prompt the repo's initial commit packaged |

The critical fact is in turn 2's wording: the rubric was derived **from the
synthesis**, not from the underlying sources. No source was consulted during
rubric construction; the dimensions are a generalisation of the risk patterns
the synthesis had just described. The rubric therefore inherits both the
synthesis's evidence and its distortions, at one remove.

## 2. Dimension-by-dimension provenance

Each v1 dimension traces to specific sections (§) of the turn-1 synthesis and
their citations. Anchor phrases shown in quotes survive into the rubric text
nearly verbatim.

### D1 · Automation Exposure of Roles — from §1 (human middleware)

The founding dimension. §1's working definition of human middleware —
reformatting and routing structured information "without deep domain
judgment, original modelling, or accountability for decisions" — became D1's
0-anchor ("first 3–5 years… data entry, template reports, routine content"),
and the CRITICAL band's gloss ("human middleware trap"). Sources: the Foster
& Fletcher "human middleware" essay, the Citrix "AI will be the interface to
knowledge work" corporate blog, McKinsey's 2023 generative-AI report, and the
WEF Future of Jobs 2025 displacement figures. The "first 3–5 years" horizon —
which survives into every later exposure discussion — appears first in §1's
description of graduate outcomes.

### D2 · Systems Thinking & Problem Framing — from §4 (CRUD bootcamps) and §6 (UX)

The bootcamp critique supplied the construct: graduates who "can build simple
CRUD apps but struggle with complexity, system design, and reading large
codebases," where "without systems thinking, such graduates compete directly
with AI agents rather than leveraging them." The UX section's "problem
framing" and "systems and service design" language supplied the other half of
the dimension's name. Sources: an ed-tech blog's bootcamp critique, Reddit
threads, Morgan Stanley's AI-and-developers piece, and recruitment-agency UX
commentary. The "tool operation vs system design" boundary — one of §8's
three boundary contrasts — is D2's construct stated as a slogan.

### D3 · Technical & Quantitative Depth — from §4, §5 and §7

From the CS-fundamentals critique (§4), the finance re-tiering argument (§5),
and §7's second resilience feature: "deep technical or mathematical
structure: building and safeguarding the systems AI runs on." The
substitution-barrier logic — technical depth as what separates leveraging AI
from competing with it — is §4's argument generalised.

### D4 · Decision-Making Under Uncertainty — from §5 (finance) and §7

§5's finance analysis supplied the construct almost verbatim: the emerging
premium is on "designing robust decision frameworks under uncertainty," while
roles "built primarily on spreadsheet modelling and standard factor models"
are automated. §7's third resilience feature — "high-stakes judgment and
accountability: roles where someone must own decisions under uncertainty" —
completed it. The Knightian framing arrived only in the June 2026 methodology.

### D5 · AI Literacy & Governance — from §8's third risk criterion

The "How to use this framing" coda states criterion 3: a degree is at risk if
it "does not integrate AI as native infrastructure: teaching students how to
*design, supervise, and govern* AI-enabled workflows, rather than compete
with them." That phrase is D5's level-3 anchor, word for word. No dedicated
research section exists for AI literacy; the dimension is the synthesis's
prescription turned into a measure. (It became the portfolio's weakest
dimension in the pilot — mean 1.1/3 — and the most-revised item across v3.1
R7 and v4's C3.)

### D6 · Domain Depth & Specialisation — from §2 (generic business degrees) and §7

§2's core contrast — the "generic BBA" training template work vs. business
degrees with "domain specialisation (e.g., healthcare operations, energy
transition, supply chain)" — became D6, whose 0-anchor ("generic and
interchangeable — indistinguishable from many other graduates in adjacent
fields") restates the section's verdict. §7 added the accreditation/
regulatory form of depth (engineering, nursing).

### D7 · Rigorous, Authentic Research Methods — from §3 (journalism)

The journalism section's durable core — "investigative reporting,
verification and OSINT, data journalism" vs. "commodity content producers" —
generalised into research methods: the 0-anchor "literature reviews or
summarising secondary sources — tasks AI does fluently" is the journalism
risk restated for any discipline. "Generate original insight, not just
synthesise existing information" is §3's boundary as a construct.

### D8 · Human & Relational Capability — from §7's first resilience feature

"Physical instantiation and embodied skill: hands-on, safety-critical, or
care work (e.g., nursing, allied health, trades)" became D8, with the
"irreducibly human" phrase in its level-3 anchor coming from the same
section's framing. Sources here are the weakest of any dimension's: a small
US college's marketing page ("degrees safe from AI") and an online-learning
provider's blog.

### D9 · Curriculum Currency & Adaptability — no research section

D9 has **no corresponding section in the synthesis**. It appears first in
turn 2, as an institutional-process intuition ("is the program frozen in a
pre-2020 model?") with anchors about review cycles and advisory boards —
evidence types §1–§8 never discussed and, as v2 later found, evidence that
public handbooks do not carry. The dimension with the thinnest provenance
became the rubric's psychometric failure (item–total r = 0.06; dropped in
v2; restored only in v4 after re-anchoring on transfer).

### D10 · Graduate Outcome Evidence — one passing phrase

D10's basis is a single phrase in the turn-3 agent prompt's authority list
("labour market outcome data for graduate roles") and the general
data-availability theme. Like D9, it measures an institutional property the
research sections never analysed. It survived v1 only through external
enrichment (QILT/JSA), and v2 demoted it to metadata on exactly the grounds
this provenance predicts: it scores evidence availability, not curriculum.

### B · Irreplaceability Premium — from §8's synthesis verdict

The bonus operationalises §8's summary reasoning — the "skill bundle harder
to replicate than any single component," a "multiplier effect above the
middleware layer." It is the synthesis's *conclusion* recast as an item,
which is precisely the halo structure v4 diagnosed when it retired it: a
verdict over the other items, not an independent observation.

### The three threshold questions — from §8's "How to use this framing"

The three risk criteria in the synthesis's coda map one-to-one onto the
threshold questions, complete with untested calibration claims ("If yes:
score likely ≤11, red band") that asserted a relationship between the quick
diagnostic and the composite that was never validated.

## 3. The arithmetic drift: where /36 came from

The origin conversation contains **three inconsistent maxima in one
document**:

| Location | Stated maximum | Arithmetic reality |
| --- | --- | --- |
| Turn 2, "How to Score" | "Total score range: 0–42" | Would require 14 items; none exist |
| Turn 2, "Scoring & Risk Bands" | "Maximum = 33 (or 36 with bonus)" | 10 × 3 + bonus 3 = 33; "36 with bonus" double-counts the bonus |
| Turn 3, agent prompt | "0–33 (0–36 with bonus)"; scorecard totals **/36**; bands 28–36 | The /36 that shipped |

Eleven 0–3 items sum to 33. The production /36 scale — and the band
definitions against it — came from the third restatement winning by virtue of
being embedded in the output template, not from a scoring decision. Every
subsequent artifact (v1 reports, the methodology paper, the risk-band
thresholds' "mean dimension score" interpretations) inherited a denominator
three points above the instrument's true maximum.

## 4. What the original evidence base was — and was not

The turn-1 synthesis cites ~56 distinct sources. Verification of the
load-bearing ones (see the §5–§7 dossiers) gives this picture:

**Present and real (Tier 1 — institutional research):** WEF Future of Jobs
2025, McKinsey's 2023 generative-AI economic-potential report, the ILO/NASK
exposure index (via a secondhand citation chain), Brookings commentary, MIT
Sloan's coverage of a real working paper, Reuters Institute leader surveys,
and the Open Society journalism-futures project. These carry the synthesis's
quantitative claims, and the claims themselves largely verify — with a
consistent pattern of flattened caveats: churn reported as displacement,
exposure reported without the transformation framing, clerk statistics
extended toward professional roles, and one layoff wave re-attributed from
digitisation to AI.

**Present and load-bearing but non-scholarly (Tier 2–3):** the founding
"human middleware" definition comes from a keynote speaker's personal blog
(misread as a two-author firm, and not the term's originator); the
software-development claims from a bank's research digest and dev-agency
marketing; the UX claims from recruitment-agency and SaaS-vendor marketing
whose statistics mutate between page refreshes; and the degree-by-degree
AI-exposure ranking from a personal-finance content farm whose page has
since vanished without archive. The bootcamp and Figma-bootcamp critiques
rest substantially on **anonymous Reddit threads that can no longer be
located**.

**Absent from the original basis entirely:**

- **Felten/AIOE** — the occupational-exposure index that later became Panel
  A's foundation appears nowhere in the origin conversation. It entered in
  the June 2026 methodology's market-data integration.
- **All the academic theory** the v1 methodology cites per dimension (Autor,
  Levy & Murnane; Frey & Osborne; Becker; Knight; Meadows; Noddings; Boyer;
  Spence…) — none is in the origin conversation. The June 2026 grounding was
  a retrofit onto dimensions derived from the synthesis.
- **QILT, JSA, and any Australian administrative outcome data** — added in
  the v1 methodology's enrichment pipeline.
- **Any psychometric consideration** — no thought to item independence,
  discrimination, saturation, or rater reliability; those arrived only when
  the 66-program score matrix forced them (v2).

## 5. Source dossier — institutional sources (verified 2026-08-16)

The quantitative backbone of the synthesis. All five check out as real
institutional publications, with caveats the synthesis flattened.

| Source | What it is | Claim as used | Verdict |
| --- | --- | --- | --- |
| **WEF Future of Jobs Report 2025** (Jan 2025; survey of 1,000+ employers, 14M workers, 55 economies) | Employer-expectation survey, not an econometric forecast | 170M jobs created / 92M displaced by 2030; ~22% of employment reshaped; accounting/bookkeeping/payroll clerks fastest-declining (~20%) | **Accurate** — but the 22% is *churn* (creation + displacement); the report's own headline is **net +78M jobs**, and the declines are attributed to digitisation broadly, not GenAI alone |
| **McKinsey (14 Jun 2023), "The economic potential of generative AI"** | MGI/McKinsey Digital scenario analysis | ~Half of work activities automatable 2030–2060; GenAI accelerates knowledge-work automation ("applying expertise") | **Accurate** — midpoint 2045; "applying expertise" is verbatim McKinsey; "managing information" is a paraphrase. The report is fundamentally a productivity-upside document ($2.6–4.4T) — citing only the automation share inverts its emphasis |
| **ILO/NASK Working Paper 140** (Gmyrek et al., May 2025, DOI 10.54394/HETP0387) | Joint ILO–NASK refined global GenAI exposure index (29,753 tasks) | Clerical roles highest AI exposure; "one in four jobs" | **Accurate findings, weak citation chain** — the synthesis cited a LinkedIn post relaying a headline, not the paper. The paper's own framing: 24% of employment has *some* exposure, only **3.3% sits in the highest gradient**, and "transformation of jobs is the most likely impact," explicitly not job-loss projection. Data-entry clerks (0.70) and accounting/bookkeeping clerks (0.64) top the gradient — the strongest real support for the middleware thesis |
| **Brookings (Turner Lee & Radsch, Dec 2024), journalism** | Equity-focused commentary from a convening | "Hundreds of layoffs in early 2024… with AI and automation cited as part of the structural pressure" | **Accurate fact, shifted causation** — the article reports 500+ January-2024 layoffs but attributes them to *digitisation eroding revenue*, with AI as what newsrooms adopt *after* cutting staff, not the cause |
| **Brookings (Levy Yeyati, Jul 2025), "Hybrid jobs" in finance** | Single-author commentary | Finance re-tiering toward interpreting/validating AI outputs | **Accurate** — its thesis is explicitly transformation, not destruction: value shifts to "those who know when *not* to trust" the models |

**The Frey & Osborne anomaly, confirmed.** Frey & Osborne (2013 working
paper / 2017 in *Technological Forecasting & Social Change*) — the most-cited
paper in the entire automation-exposure literature and the methodological
ancestor of both the ILO index and McKinsey's task approach — appears
**nowhere in the origin synthesis**. Its presence in the June 2026 v1
methodology is retrospective grounding, added ~two months after the rubric
existed. (One origin source, replacemeter.com, was unknowingly recycling
Frey–Osborne probabilities re-badged as 2025 AI analysis — the closest the
origin material came to the paper.)

## 6. Source dossier — concept and sector sources (verified 2026-08-16)

**The founding concept has the weakest provenance in the corpus.** "Foster &
Fletcher," credited with defining human middleware, is **one person**:
Richard Foster-Fletcher, a UK AI keynote speaker, and the cited page is a
personal blog essay on his speaker site (25 Jan 2026). The synthesis's
definition matches his essay almost verbatim — but he is **not the term's
originator**: "human middleware" was in wide circulation through 2025 (e.g.
Sabato's "The Age of Human Middleware," Sep 2025; a late-2025 workplace study
on workers as "human middleware between disconnected AI systems"), and the
underlying concept goes back at least to Gray & Suri's *Ghost Work* (2019).
The two supporting middleware citations are a Citrix VP-futurist's marketing
post (whose "essentially human parity" claim for computer-using agents rests
on an unnamed ~70% benchmark score) and a nonprofit's interview note relaying
a startup CEO's conference remarks.

| Source | What it is | Verdict |
| --- | --- | --- |
| Foster-Fletcher, "Human middleware" (Jan 2026) | Personal blog of a keynote speaker | Definition accurately paraphrased; authorship garbled ("Foster & Fletcher"); not the term's origin |
| Citrix (Madden, Dec 2025), "AI will be the interface to knowledge work" | Vendor futurist marketing | Synthesis was *more conservative* than the source ("near-human" vs "essentially human parity"); benchmark unnamed |
| AskAI field note (Nov 2025) | Nonprofit note relaying a startup CEO | Exists; motivational commentary, no data — weakest source verified |
| **Reuters Institute** Trends & Predictions 2025 (Newman & Cherubini; 326 leaders, 51 countries) | University-affiliated institutional research | **Accurate**: ~60% of news leaders named back-end automation the most important AI use — but cited via a publishing-tech vendor's summary, and the audience-side finding (52–63% uncomfortable with AI-produced news) was omitted |
| IBM "AI in journalism" | Corporate explainer | **Stale fact conflation**: AP's ~3,700 automated earnings stories is a **2014–15 templated-NLG achievement** (Automated Insights Wordsmith), presented in the synthesis as current GenAI-era evidence |
| Open Society Foundations, "AI in Journalism Futures" (Caswell & Fang, Aug 2024) | Institutional foresight (880 scenarios, 60-person workshop) | **Accurate** — near-unanimous participant view that AI transforms the information ecosystem; but explicitly scenario planning, "does not seek to predict the future" |
| Thomson Reuters accounting blog (Jun 2025) | SEO marketing for CoCounsel | WEF clerk-decline relay is accurate; the scope trap is that the WEF figure concerns **clerks**, while the BLS projects **+91,000 jobs (5.8% growth)** for professional accountants/auditors 2023–2033 |
| CPA Journal (LoBianco, Sun & Zhao, 2025) | Refereed practitioner journal | Real; evidence is informal ChatGPT-4 prompt tests; conclusion is transformation-not-replacement — the *opposite* direction from the clerk statistic |
| MIT Sloan (Church, Aug 2025, covering Xie & Choi) | News coverage of a real working paper (79 firms, 277 accountants) | **Accurate**: ~8.5% of accountant time reallocated from data entry; gains concentrated in *experienced* accountants — which cuts against a naive "AI replaces juniors first" reading |

## 7. Source dossier — practitioner and content-farm sources (verified 2026-08-16)

The batch that carried the rubric's most vivid constructs. Composition: **0
peer-reviewed, 0 academic-institutional; ~10 vendor/agency marketing pages; 2
unverifiable social-media clusters.**

| Source | What it is | Verdict |
| --- | --- | --- |
| Morgan Stanley, "AI in Software Development" | Sell-side research digest (AlphaWise survey) | Best of the batch; genuinely argues demand shifts toward system architecture/integration/validation — the one defensible anchor for D2's directional claim |
| AlgoCademy bootcamp critique | Anonymous SEO listicle by a bootcamp *competitor* selling algorithm prep | Live and says it; zero citations, direct commercial conflict |
| Brainhub | Polish dev-agency content marketing | Named authors, second-hand stats; conclusion is its business model |
| Reddit r/codingbootcamp etc. | Anonymous threads; **specific cited threads cannot be located or dated** | Sentiment real and independently echoed; unverifiable as evidence |
| Aquent AU (Hanley) | Recruitment-agency blog by a named practitioner | Predicts pure-UI decline and entry-pathway squeeze; informed opinion, no data |
| Upskilled | Training-provider marketing by a marketing specialist, promoting its own UX diploma | Headline statistics **mutate between page refreshes** ($4T→$4.5T; 1700%→2000%) with no source ever given |
| Looppanel | SaaS-vendor blog (sells AI tools *to* UX researchers) | Structural bias: cannot conclude its customers are replaceable |
| Reddit r/UXDesign "designer factories" | Anonymous threads, unverifiable | With the bootcamp threads, the **only** direct support for the Figma-bootcamp framing as lived hiring experience |
| **mooloo.net degree ranking** | Personal-finance content farm | **The page no longer exists**: 404, no Wayback snapshot, zero search-index trace of the title on the site. It was the synthesis's *only* source ranking degrees by AI exposure |
| makiai.com | Anonymous, apparently machine-translated AI-content blog | A laundering layer: institutional findings paraphrased without traceable citations |
| replacemeter.com | Anonymous "job risk calculator" | Recycles Frey–Osborne 2013 probabilities (via "Will Robots Take My Job?") re-badged as 2025 AI analysis |
| rosemont.edu "degrees safe from AI" | Enrolment marketing by a small US college (now closing into Villanova) | Reasons backwards from its own course catalogue, citing pop-press listicles; the .edu domain confers no research weight |

Two structural findings from this batch:

1. **The rubric's most vivid risk claims rest on its least citable sources.**
   The CRUD-bootcamp construct behind D2 and the Figma-bootcamp construct are
   supported directly only by anonymous, now-unlocatable social threads plus
   competitors' marketing — with a single bank research digest as the one
   defensible anchor.
2. **The only degree-level AI-exposure ranking in the origin material has
   vanished without archive.** The instrument's later adoption of the Felten
   AIOE (v1 methodology onward, then Panel A) replaced this — the in-repo
   crosswalk is a strictly better basis — but at origin, the degree-ranking
   claim was resting on a deleted content-farm page.

## 8. Reading: what the provenance explains

The reconstruction resolves several later puzzles:

1. **Why D9 and D10 failed.** The two dimensions without any research-section
   basis — added in turn 2 as institutional-process intuitions — are exactly
   the two that failed psychometrically (D9 dropped as noise) or were demoted
   (D10 to metadata). Dimensions grounded in a described risk pattern
   discriminated; dimensions invented to round out the instrument did not.
2. **Why B was halo.** It was born as the synthesis's verdict restated as an
   item; v4's diagnosis ("a verdict over other items") is a rediscovery of
   its construction.
3. **Why the composite was /36.** Arithmetic drift inside the origin
   conversation, frozen by a template.
4. **Why exposure and curriculum were conflated.** The synthesis analysed
   *degree archetypes* — bundles of curriculum and destination — so the
   rubric scored both in one list. v2's Panel A/Panel C decomposition undid a
   conflation that was native to the origin material's unit of analysis.
5. **Why the instrument was frank by design.** The synthesis was written to
   name degrees "effectively obsolete… even if universities keep selling
   it"; the rubric inherited that rhetorical posture ("do not soften
   findings"), which v3 later had to invert into calibrated display.
6. **Why "exposure is not risk" had to be relearned.** The strongest origin
   sources already carried the caveat the instrument later made central: the
   ILO paper's core framing is transformation-not-replacement with only 3.3%
   of employment in its highest exposure gradient, WEF's headline is net job
   *growth* (+78M), and both Brookings pieces argue role transformation
   rather than destruction. The synthesis flattened those caveats into a
   displacement narrative; v2's principle P3 and v3's §5.6 co-location rule
   effectively restored what the primary sources had said all along.

**Corrections this reconstruction places on the record:**

- "Foster & Fletcher" is one person (Richard Foster-Fletcher), his essay is
  a personal blog post, and he did not coin "human middleware" — the term
  circulated through 2025 and the concept dates at least to *Ghost Work*
  (2019).
- The AP automated-earnings-stories fact relayed via IBM is a 2014–15
  templated-NLG achievement, not evidence about generative AI.
- The WEF fastest-declining figure concerns accounting *clerks*; the BLS
  projects growth (+5.8%, 2023–2033) for professional accountants — the
  clerk/professional split matters for any degree-level claim.
- The only degree-level AI-exposure ranking in the origin corpus
  (mooloo.net) no longer exists and was never archived.

None of this discredits the founding insight — task-level substitution risk,
the middleware boundary, curriculum defences — which the subsequent literature
(TEQSA's adaptive capabilities, Deming's social-skills economics) has largely
vindicated in more careful form. What the provenance shows is the distance
between a persuasive synthesis and a measurement instrument, and how much of
the v1→v4.2 evolution consisted of closing exactly that distance.
