# Reverse-Engineering the Origin Synthesis

Compiled 2026-08-16 · Service Experience & Design, University of Melbourne

The DFVA rubric descends from a single research synthesis — turn 1 of the
[origin conversation](dfva-origin-conversation.md). The
[source reconstruction](dfva-rubric-original-sources.md) verified what that
synthesis's citations actually say. This document goes one level deeper and
reverse-engineers the synthesis itself: what machine produced it, what its
prompt presupposed, how its retrieval worked, which of its claims were
retrieved versus generated, and — the finding that matters most for the
instrument — which layer the rubric actually inherited.

---

## 1. Product identification

The export's mechanics identify the producing system precisely:

- **Perplexity thread export.** The Perplexity logo header, the `[^1_N]`
  per-turn footnote convention, and the "⁂" turn separators are Perplexity's
  markdown-export format. The conversation is one thread of three turns
  (synthesis → rubric → agent prompt), so the rubric and the agent prompt
  were generated with the synthesis still in context.
- **89 retrieved, 56 cited.** The visible text carries citation marks
  `[^1_1]`–`[^1_56]`. Marks `[^1_57]`–`[^1_89]` exist only inside a
  `display:none` span — Perplexity's export convention for retrieved-but-
  uncited sources. The engine pulled at least 89 pages and the synthesis is a
  selection from them; 33 retrieved sources influenced nothing visibly and
  are unrecoverable as influences.
- **Retrieval-augmented generation, not reading.** The per-section citation
  clusters (below) show each section drawing on 3–8 pages that rank for one
  or two obvious search queries — the signature of query-decomposed RAG, not
  of a researcher working from a bibliography.

## 2. Prompt forensics: the eight-point brief

The query itself carries physical and logical evidence of its history.

**It was transcribed, not typed fresh.** The brief renders "AI" as "Al"
(capital A, lower-case L) — the classic glyph confusion of OCR or manual
retyping from a sans-serif display — and contains mid-word hard line breaks
("'low rigor' coding ¶ degrees and bootcamps that teach CRUD ¶ app
creation"), the artifact of copying text out of a narrow column or image.
The brief existed somewhere else first — most plausibly as a screenshot of
another AI system's research plan or of a social-media post — and was carried
into Perplexity through an image or a lossy copy. (§6 records the hunt for
that upstream artifact.)

**Its style is machine-planner style.** Eight numbered imperatives
("Analyze… Evaluate… Investigate… Assess… Examine… Contrast… Synthesize"),
each scoped to one sub-topic, ending with a synthesis step — the exact house
style of deep-research query decomposition. Whether the plan was generated
by Perplexity's own planner in an earlier session or by another tool, the
brief reads as the output of a machine that had already decided the
structure of the answer.

**Every question presupposes its conclusion.** Point 2 asks to "evaluate the
*predicted obsolescence*" of named degrees — the prediction is given, not
asked. Point 4 has decided coding bootcamps are "low rigor"; point 6 has
decided UX programs are "Figma boot camps"; point 8 requests "a definitive
list of college degrees likely to be obsolete by 2027." The brief is a
verdict commissioning its evidence. A retrieval engine given a leading brief
does not push back; it searches for what the brief asserts — which is the
mechanism behind the distortion signature in §5.

**The 2027 deadline is native to the prompt and to nothing else.** No cited
source uses a 2027 horizon: WEF projects to 2030, McKinsey's band is
2030–2060 (midpoint 2045), the ILO index has no deadline. "By 2027" — which
became the instrument's defining timeframe ("will retain its economic value
proposition in an AI-augmented labour market by 2027 and beyond") — entered
through the brief and was never evidenced by anything the synthesis cited.

## 3. Retrieval reconstruction

Each section's citation cluster back-projects onto one or two search
queries. The tier profile of each section is a property of *what ranks for
that query*, not of the evidence landscape:

| Section | Inferable queries | What ranked (tier profile) |
| --- | --- | --- |
| §1 middleware | "human middleware AI"; "AI future of jobs 2025 displacement" | Speaker blog + vendor futurist + nonprofit note (the concept); WEF/McKinsey/ILO (the numbers) |
| §2 business/marketing | "AI impact marketing jobs"; "business administration degree AI risk" | Marketing-industry blogs, HubSpot-derived stats, one content farm (mooloo) for the degree ranking |
| §3 journalism/IS | "AI in journalism newsrooms"; "information systems degree useless" | Institutional (Reuters Inst. via vendor summary, IBM, Brookings, OSF) + two Reddit threads for the IS claim |
| §4 bootcamps | "criticisms of coding bootcamps"; "AI replace software developers" | Competitor SEO (AlgoCademy), three Reddit threads, bank digest (Morgan Stanley), agency blogs |
| §5 accounting/finance | "AI accounting jobs"; "WEF fastest declining jobs accounting" | Trade press + vendor marketing + MIT Sloan; WEF relayed via accountantsdaily |
| §6 UX | "UX bootcamp criticism Figma"; "AI impact UX jobs" | Two Reddit threads + three recruitment/vendor blogs |
| §7 resilient fields | "degrees safe from AI"; "jobs AI can't replace" | A college's enrolment-marketing page, an ed-platform blog, a degree-marketing site |
| §8 synthesis | (no new retrieval) | Re-cites §1–§7 plus two jobs-at-risk content farms |

Two mechanisms follow directly:

- **SERP-tier sampling.** The content farms are not there because anyone
  judged them credible; they are there because they SEO-rank for the exact
  phrasing of a leading query. "Degrees safe from AI" is a query only
  marketing pages compete for — so §7's evidence base is marketing pages.
- **Citation laundering.** The engine cites the page it read, not the
  canonical source: the ILO index arrives via a LinkedIn post, WEF's
  accounting figure via trade press, Reuters Institute findings via a
  publishing-tech vendor's summary. Every laundering hop shed caveats.

## 4. Claim decomposition: retrieved vs generated

Sorting the synthesis's claims by provenance:

**Retrieved and accurate** (verified in the
[source dossiers](dfva-rubric-original-sources.md)): the WEF churn and
clerk-decline figures, McKinsey's automation-potential band, the ILO
clerical-exposure finding, newsroom back-end automation, the accounting
re-tiering, Morgan Stanley's demand-shift argument.

**Retrieved but flattened** — accurate figures stripped of their
qualifying frame: churn presented as displacement; exposure presented
without the transformation framing; digitisation-driven layoffs presented
with AI "cited as part of the structural pressure"; clerk statistics
deployed in degree-level arguments.

**Generated — no citation exists, and none was possible.** These are the
synthesis's own contributions, and they are its intellectual core:

1. The **"degree archetype"** move — assessing "what they actually train
   for" rather than official titles.
2. The **boundary-of-obsolescence triad** — template execution vs original
   problem solving; information reformatting vs decision ownership; tool
   operation vs system design.
3. The **three risk criteria** of the "How to use this framing" coda.
4. The **"first 3–5 years"** graduate-exposure horizon.
5. The "document-churn UX" pattern (§6, offered with no citation at all).
6. Every **"2027 outlook" verdict** — each section's obsolescence call is an
   uncited inference layered on the retrieved material.

**Presupposed** — imported from the brief and never examined: the 2027
deadline, the "low rigor" and "Figma boot camp" characterisations, the
obsolescence-list deliverable itself.

The generated layer also contains the synthesis's signature inferential
move, repeated in every section: **task-automation evidence → occupational
forecast → degree verdict**. That chain crosses two levels of aggregation
(tasks to occupations, occupations to degrees) that none of the cited
sources crosses; the sources stop at tasks or occupations. The degree-level
claims — the ones the rubric operationalises — are all synthesis-generated.

## 5. The distortion signature

The verification pass found the synthesis's errors are not random; they
point one way. Churn became displacement; net job growth (+78M) went
unmentioned; transformation-framed sources (ILO, both Brookings pieces, CPA
Journal, MIT Sloan) were mined for their automation halves; a
digitisation-layoff story acquired an AI gloss. Nothing was fabricated —
every figure traces to a real page — but every flattening moved the same
direction: toward the obsolescence verdict the brief had commissioned. This
is confirmation-shaped retrieval: a leading brief, an engine that searches
for what the brief asserts, and a synthesis pass that keeps the halves of
sources that fit.

## 6. The upstream artifact (hunt results, 2026-08-16)

A directed search (~15 strategies across the open web, X, LinkedIn, Reddit,
Medium, Substack and YouTube) for the brief's origin returned a clear
negative and a clear positive.

**Negative: no public upstream post exists.** No post, thread, video or
newsletter containing the 8-point package — or the degree list under the
human-middleware frame with a 2027 deadline — could be located anywhere. If
a source post exists it is deleted, walled-garden, or was never public.

**Positive: every ingredient circulated separately; the assembly is the
brief's own.** The concept pool it drew from:

- **"Human middleware"** was established management discourse — but about
  *middle managers and workers*, never degrees: HFS Research's "The Great
  Human Middleware Opportunity" (2022), Sabato's "The Age of Human
  Middleware" (Sep 2025, workers as "expensive, carbon-based APIs"), and
  Workday-study coverage of workers as "the human middleware between
  disconnected AI systems." **Applying the term to degree programs is the
  brief's novel move** — the one genuinely original element of the whole
  chain.
- **The at-risk degree list** matches the 2025–26 listicle genre closely.
  The strongest proximate candidate is Jodie Cook's Forbes piece "10 College
  Degrees AI Is Making Redundant Right Now" (**7 April 2026** — the same
  month as the brief), which shares six of the brief's eight targets and the
  same "generic/basic" qualifier pattern; Rachel Wells (Forbes, Oct 2025)
  and Scesa's "College Majors for 2030" (May 2025) carry the rest, including
  the engineering/nursing/cyber resilient contrast.
- The **CRUD-bootcamp** and **Figma-shortcut** critiques existed diffusely
  (Skillfoundry's bootcamp "death spiral," Nisslmüller's "not just Figma
  shortcuts") — but the epithet "Figma boot camp" for university UX
  programs appears nowhere before the brief.

**Format attribution.** The brief's shape — parenthesised numbered
imperatives ("(1) Analyze… (2) Evaluate…") ending in a synthesis step — is
the fingerprint of **Gemini Deep Research's editable research-plan card**,
which decomposes a seed prompt into exactly this form. Perplexity's own
deep-research mode does not present an upfront numbered plan (it shows a
live progress sidebar), so the plan appearing *as the query* of a Perplexity
thread means it was pasted in from elsewhere. Combined with the transcription
artifacts ("Al" for "AI"; mid-word line wraps from a narrow card), the best
reconstruction of the chain is:

1. A short, opinionated seed prompt about AI-obsolete degrees was given to a
   plan-card assistant (most consistent with Gemini Deep Research), which
   generated the 8-step plan — importing the seed's verdicts ("low rigor,"
   "Figma boot camps," 2027) into the plan's wording.
2. The plan card was captured as an image and transcribed (OCR or an LLM
   reading a screenshot), producing the glyph error and line breaks.
3. The transcription was pasted into Perplexity, which executed it as a
   research brief.

Confidence: transcribed-from-image, high; Gemini specifically as the
planner, moderate; no public upstream post, moderate (X and LinkedIn are
poorly indexed and deletion is common). The provenance chain is therefore
**at least four systems deep**: seed prompt → plan-generating assistant →
image transcription → Perplexity synthesis → (turn 2) the rubric. Only the
person who pasted the brief can confirm the first two links from memory.

**Phrase-originality results** (searched for pre-April-2026 uses, excluding
this project's own material):

| Phrase | Verdict |
| --- | --- |
| "template execution vs original problem solving" | Concept ubiquitous (BCG, HBS); the pairing is model-generated |
| "information reformatting vs decision ownership" | Model-generated pairing; halves separately retrievable |
| "tool operation vs system design" (as the dividing line) | Model-generated pairing of a commonplace |
| "boundary of obsolescence" | No prior use in any AI/degrees sense — original to the chain |
| "analogue graduate profile" | No prior use — original to the chain |
| "first 3–5 years" exposure horizon | Concept widespread (entry-level task absorption); the specific number is model-supplied |
| "degree archetypes" (AI-risk context) | No prior use — original to the chain |

This confirms §4's decomposition empirically: the synthesis's evidence layer
is retrieved 2025–26 discourse; its conceptual scaffolding — the layer the
rubric inherited — has no locatable prior existence. Classic deep-research
signature: real citations, invented vocabulary. (One attribution nuance: the
scaffolding phrases could have been coined at step 1 or 2 of the chain
rather than by Perplexity itself; wherever in the chain they arose, they are
machine-coined and uncited.)

> **Confirmed (2026-08-16).** DM subsequently recovered the upstream thread:
> a **Gemini Deep Research session of 18 February 2026**, whose plan card is
> the 8-point brief and whose report ("The Great Flattening") is preserved
> at [dfva-origin-gemini-report.md](dfva-origin-gemini-report.md). The seed
> prompt was DM's transcription of a **video monologue** (YouTube/TikTok) —
> which is why no public post could be located. The reconstruction above
> was correct on the mechanism (plan-card assistant → image transcription →
> Perplexity) and on the tool; the attribution of the scaffolding shifts
> partly further upstream: the middleware-applied-to-degrees move, the
> degree list, the 2027 deadline, "systems thinking" and "decision making
> under uncertainty" come from the video seed; "the boundary of
> obsolescence" from Gemini's planner; the boundary triad and "degree
> archetypes" from the Perplexity pass. Full analysis:
> [dfva-origin-gemini-review.md](dfva-origin-gemini-review.md).

## 7. What the rubric actually inherited

The decomposition in §4 yields the finding that matters for the instrument:
**the rubric descends almost entirely from the generated layer, not the
retrieved layer.**

- D1's anchors are the "first 3–5 years" horizon (generated).
- D2 and D5 operationalise two legs of the boundary triad (generated).
- D4 operationalises "decision ownership" (generated) plus the finance
  re-tiering (retrieved).
- D6, D7, D8 generalise archetype-section verdicts (generated inferences on
  retrieved material).
- B restates the §8 synthesis verdict (generated).
- The three threshold questions are the three risk criteria (generated).
- The 2027 horizon and the risk-band rhetoric come from the brief
  (presupposed).

The retrieved layer — the WEF, McKinsey and ILO figures, the one part of the
synthesis that verifies cleanly — appears **nowhere in the rubric's
anchors**. Not one dimension references an exposure statistic, an
occupational projection, or any cited quantity. The instrument kept the
model's bridging concepts and discarded the evidence they were bridged from.

This inverts the natural assumption about the rubric's origins. It was not
distilled from labour-market research; it was distilled from an LLM's
uncited conceptual scaffolding *over* labour-market research — scaffolding
that happened to be genuinely good (the boundary triad anticipates the
substance of TEQSA's 2026 adaptive-capabilities architecture; the
archetype-over-title move anticipates the instrument's curriculum-evidence
discipline). The subsequent history reads accordingly: v1's academic
retrofit gave the generated concepts scholarly ancestors; v2 reattached the
retrieved layer the rubric had dropped (measured exposure, Panel A); v4
finally replaced the generated construct with an externally authored one.
The evolution of the instrument is, in large part, the progressive
replacement of the synthesis's generated layer with things that can be
cited.

## 8. Reproducibility of the synthesis

The synthesis is in principle re-runnable — the brief survives verbatim —
but in practice it is already irreproducible: its only degree-ranking source
has vanished unarchived, several marketing pages have silently rewritten
their statistics between refreshes, and the Reddit threads cannot be
identified. A 2026 re-run of the same brief would produce a different
citation set from a different SERP. The origin synthesis is therefore best
understood as a **snapshot of what ranked for a set of leading queries in
April 2026**, and the instrument's later insistence on pinned, versioned,
machine-checked provenance (v3 §3.5–3.6) is the exact repair for the class
of artifact that produced it.
