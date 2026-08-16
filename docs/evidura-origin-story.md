# Evidura — The Origin Story (External-Facing Draft)

Draft v1 · 2026-08-16 · For: website "Our story" page, deck slide, boilerplate
Voice: Economist × Stripe × credit-rating note (verdict first, then the
working). Brand rules applied: master brand **Evidura**; the product is the
**Durability Assessment**; the internal methodology name is never used in
external copy.

---

## The story (long form — "Our story" page)

### Every degree now gets asked the same question — almost nobody answers it properly

Will this degree still be economically valuable in five years?

Students ask it before they enrol. Parents ask it over dinner. Vice-
chancellors ask it in planning rounds. And the internet answers it every
day — loudly, confidently, and without evidence. By early 2026 the discourse
had a script: viral videos naming the degrees AI would kill, listicles
ranking majors by doom, hot takes with deadlines attached. The claims were
sometimes right. They were never *checkable*.

Evidura began inside that noise — literally. Our first prototype started
from the same provocative question the videos were asking, and used the same
AI tools they were warning about, to score real university programs against
it. Within weeks we had assessed dozens of programs at one of Australia's
leading universities. The prototype produced what the discourse produces: a
confident number for every degree.

Then we did the thing the discourse never does. **We tried to break our own
answer.**

### The audit that became a company

We put our first instrument's scores under the kind of scrutiny usually
reserved for other people's claims, and we published what we found — the
failures included. That audit, and the three that followed it, are why
Evidura exists in its current form:

- **Some of our measures didn't measure.** Items that couldn't tell one
  program from another, or that scored things public evidence can't show,
  were deleted or demoted — not kept for continuity.
- **We had been mixing kinds of evidence.** A labour-market fact, a
  curriculum judgment, and a data-availability note are different things.
  Summing them into one score lets a program offset a real weakness with a
  paperwork strength. We stopped. What can be measured is measured; what
  requires judgment is scored against published anchors; the two are never
  arithmetically blended.
- **Some of our numbers didn't reproduce.** When we found figures in our own
  reports that couldn't be regenerated from our own data, we corrected them
  in public errata — and then built a pipeline in which every published
  number carries its provenance and the system refuses to publish anything
  it cannot reproduce.
- **Our confidence outran our precision.** Early reports stated positions as
  facts. Now every rating is published with its uncertainty computed
  exactly — every possible way rating error could move a score, enumerated,
  not sampled — and when a program sits too close to a boundary for its
  label to be stable, **we suppress our own label** and show the coordinates
  instead. A rating you can trust must be allowed to say "too close to
  call."
- **We stopped grading ourselves against ourselves.** Our curriculum
  measures are now anchored on Australia's regulator-commissioned framework
  for learning in an AI-integrated future, reviewed by independent
  academics — whose criticisms we adopted, on the record. Where an expert
  told us the instrument was missing something, the fix shipped with their
  reasoning attached.

Four generations of the instrument later, almost nothing of the first
prototype survives except the question — and the discipline that answering
it honestly demands.

### Why "Evidura"

The name is the method: **evidence + durability**. Every claim traceable to
its source; every rating built to survive scrutiny, revision, and time. Our
first prototype taught us exactly how the confident version of this story
gets built — and how little it holds up. Everything since has been the
replacement of confidence with evidence.

### What Evidura is today

Evidura provides the **Durability Assessment** — an independent, evidence-
based read of how a degree program is positioned for an AI-shaped labour
market. It measures where a program's graduates actually go and how exposed
that work is, on published occupational data. It scores what the curriculum
demonstrably builds — the adaptive capabilities and workplace practice that
resist substitution — against published anchors, from public evidence,
with every score citing its source. And it states, with every rating, how
sure we are.

We measure durability, not prestige. A sandstone program can rate Critical;
a regional program can rate Resilient. The rating is confidential to the
commissioning institution, the bands are plain — Resilient to Critical —
and the working is always shown.

Built inside a university, by people who needed the instrument to exist.
Durability, made visible.

---

## Short version (boilerplate, ~120 words)

Evidura began with the question everyone was asking and nobody was
answering properly: *will this degree still be economically valuable in
five years?* Our first prototype answered it the way the internet does —
fast, AI-assisted, and confident. Then we spent four generations of the
instrument trying to break that answer: deleting measures that didn't
measure, separating evidence types that should never be summed, issuing
public corrections when our numbers didn't reproduce, computing the
uncertainty on every rating exactly — and suppressing our own labels when
they aren't stable. The result is the Durability Assessment: an
independent, evidence-anchored rating of degree-program durability in an
AI-shaped labour market, built inside a university, with the working always
shown. Evidence + durability: Evidura.

---

## One-liner options

1. Evidura is what a hot take becomes when you audit it for four
   generations.
2. We answered the internet's favourite question about degrees — then spent
   a year trying to break our own answer. What survived is Evidura.
3. Durability, made visible: the evidence-anchored rating of how degrees
   hold up in an AI-shaped labour market.

---

## Usage notes (internal)

- The origin is told truthfully at external altitude: "began inside the
  noise / used the same AI tools" covers the viral-video seed and
  AI-assisted prototype without narrating the provenance chain. The full
  internal history: [dfva-rubric-evolution.md](dfva-rubric-evolution.md).
- Candour is the differentiator: the self-audit arc is the trust argument.
  Never sand it down to a generic "we iterate" claim — the specifics
  (public errata, suppressed labels, adopted criticisms) are the story.
- Claims kept checkable against the internal record: "dozens of programs"
  (41 pilot, later 66/67), "four generations" (v1 → v2 → v3/v3.1 → v4.x),
  "every possible way rating error could move a score, enumerated" (exact
  enumeration replacing Monte Carlo), "regulator-commissioned framework"
  (TEQSA adaptive capabilities), "reviewed by independent academics —
  criticisms adopted" (the workplace-practice sub-scale).
- Do not name the internal methodology, panel letters, or item codes in any
  external rendering of this story.
- Public use is gated on trademark clearance (naming DD §4); this draft is
  for the in-repo/in-dev rollout until then.
