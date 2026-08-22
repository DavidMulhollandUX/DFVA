# DFVA v4.1 Socialisation Harness — guide, deck, and the link back

**Status:** ready to run. Produces the artifacts for the session in which subject-matter
experts and curriculum staff **correct** a v4 report — not the session in which they
receive it.

**Runs after** the [scoring harness](dfva-v4-agent-harness.md) has produced
`reports/dfva-v4-<code>.md` and, ideally, its market and recommend siblings. It reads
those files and writes nothing back into the scores: **the socialisation harness never
re-scores anything.** A score changes only by going through the scoring pipeline again
with new evidence, which is the entire premise the session is run on.

| Command | What it does |
| --- | --- |
| `Workflow({scriptPath: "scripts/workflows/socialisation-pack.js", args: ["<code>"]})` | The whole pack, one chain per program |
| `/socialise <code>` | The same thing, from a slash command |
| `python3 scripts/build-evidura-deck.py <spec.json> -o <out.pptx>` | Deck only, from an existing spec |

---

## Why this exists as a harness and not a prompt

The first socialisation guide was written by hand, and writing it surfaced three things
that recur for every program and that an ad-hoc prompt gets wrong:

1. **The guide and the deck must not disagree.** Written independently from the same
   report, they drift — a score rounded differently, a finding phrased as fact in one and
   as a question in the other. Both are therefore generated from **one structured brief**
   (stage 1), which is itself nothing but quotations and numbers lifted from the report.
2. **The validity questions are already in the report.** §6's *Ambiguities* paragraph
   records every straddle the rater resolved downward. Those are the close calls, stated
   in advance, and they are what the room is uniquely able to settle. A guide that invents
   its own discussion questions has thrown away the most useful thing the report knows
   about itself.
3. **The guide is not publishable.** It carries the objections the room will raise and how
   to answer them. Linking it from the report's public page would hand a program's staff
   the crib sheet about handling their own objections. Hence the link discipline in stage 5.

## Pipeline (per program)

```text
reports/dfva-v4-<code>.md ─┐
reports/dfva-market-<code>.md ─┼─ 1 BRIEF    read the family → one structured brief
reports/dfva-v4-recommend-… ─┘               (quotations and numbers only, nothing composed)

                             2 GUIDE    docs/evidura-facilitation-guide-<code>.md
                                        program-independent sections carried across;
                                        §5, §6.B and Appendix A rewritten from the brief

                             3 VERIFY   adversarial: every claim traceable to the family;
                                        no position label, no summed sub-scores, no
                                        promise the harness cannot keep

                             4 DECK     docs/decks/evidura-socialisation-<code>.deck.json
                                        → build-evidura-deck.py → .pptx
                                        → render → inspect every slide → fix → rebuild

                             5 LINK     HTML comment in the report (repo-visible,
                                        web-stripped) + reverse links
                                        ── then, once for the whole run: dfva:gen-content
```

### Stage rules

- **1 BRIEF** — the schema requires all eight items, both sub-scores as separate strings,
  the declared gaps and the straddles. `adaptiveness` and `workplace` are strings
  (`"8 / 15"`, `"4 / 9"`) and there is no field for a total — the same shape discipline the
  `panelCv4` evidence contract uses, for the same reason. `corrections` may legitimately be
  empty; an invented correction is worse than none.
- **2 GUIDE** — Appendix B of the reference guide is the authority on what is
  program-independent. §0 (framing), §2 (what Evidura is), §3 (the method and the four
  rules), §7 (objections) and §9 (follow-through) carry across almost unchanged. §5
  (findings), §6.B (the validity questions) and Appendix A (the printed one-pager) are
  rewritten from the brief every time.
- **3 VERIFY** — a second agent tries to find claims the report family does not support.
  This is not ceremony: the guide is read by people who know the program better than the
  rater does, and a single invented fact costs the room's attention for the rest of the
  session. Seven specific checks are in the script; the one that catches the most is
  quotations attributed to the handbook that appear nowhere in the report.
- **4 DECK** — the spec carries **words and numbers only**. Colours, type, geometry and the
  mark come from the builder and from `brand/evidura/tokens.css`. A hex value in a spec is
  a defect, not a shortcut.
- **5 LINK** — see below.

## The deck: content in JSON, brand in the builder

`scripts/build-evidura-deck.py` renders a spec to a 16:9 deck. Nine layouts:

| Layout | Use | Key fields |
| --- | --- | --- |
| `title` | Opening slide, ink ground | `title`, `subtitle`, `eyebrow`, `meta[]`, `stamp` |
| `statement` | One idea, full bleed, ink ground | `kicker`, `statement`, `attribution` |
| `bullets` | Lead-and-body list | `bullets[{lead, text}]`, `note` |
| `two-col` | Is / is not, before / after | `left{heading, items[]}`, `right{…}` |
| `scores` | The scorecard | `exposure{}`, `subscales[]`, `items[]`, `gates[]`, `note` |
| `findings` | Numbered finding cards | `findings[{n, heading, text}]` |
| `table` | Any table | `columns[]`, `rows[][]`, `widths[]`, `note` |
| `questions` | The elicitation blocks, ink ground | `blocks[{tag, heading, prompt}]` |
| `closing` | What happens next | `items[{lead, text}]`, `footerNote` |

An unknown layout is a hard error. A silently dropped slide is worse than a failed build.

**The mark is drawn, not embedded.** PowerPoint cannot render SVG and a rasterised logo
goes soft on a projector, so the Strata-E mark is redrawn as three native rounded bars from
the geometry in `brand/evidura/evidura-mark.svg`. If that file's proportions change, change
`Deck._mark`.

**Score chips are coloured from the band scale** (`--evidura-band-*`), by proportion of
maximum: 3/3 Resilient, 2/3 Moderate, 1/3 High, 0/3 Critical. This is the one place the
deck applies a colour judgement, and it uses the product's own published scale rather than
a new one.

### Overflow is a build failure, not a rendering quirk

PowerPoint's autofit only applies when a human edits a box, so a headlessly built deck
overflows **silently** — text simply runs out of the bottom of its card and nobody notices
until it is on a screen in front of the room. This happened on four slides of the first
build of this script.

The builder therefore measures every block itself (`Deck._fit`, and the row-height
estimator in `Deck.table`), steps the type size down until it fits, and if even the floor
size will not fit, prints the slide and **exits 2**.

```text
  overflow: slide 9 (findings): copy too long — trim it
```

**The fix is always in the spec — trim the copy, or set `widths` on a table. Never widen
the boxes in the builder to make a specific deck fit.** The measurement constants are
deliberately pessimistic (`GLYPH`, `LEADING`) because the deck is opened on a machine that
may not have Inter installed and will substitute something wider.

A clean exit proves the estimate fit, not that the slide reads well. **Render and look at
every slide before shipping** — this is the last stage of the deck agent's instructions, and
it is not optional:

```bash
/Applications/LibreOffice.app/Contents/MacOS/soffice --headless --convert-to pdf --outdir /tmp/qa docs/decks/evidura-socialisation-mc-mgmthre.pptx
pdftoppm -png -r 70 /tmp/qa/evidura-socialisation-mc-mgmthre.pdf /tmp/qa/s
```

## The link discipline

`reports/*.md` is the source of the **published** page. The facilitator's guide is the
facilitator's crib sheet. Those two facts settle how the link is made:

| Direction | Form | Why |
| --- | --- | --- |
| report → pack | HTML comment in the header block | `dfva:gen-content` strips HTML comments, so the pointer reaches everyone who opens the report file and nobody who opens the web page |
| guide → report family | Visible markdown links in the guide header | The guide is internal; it should link everywhere |
| harness → packs | The table at the foot of this document | One place to find every pack |

```html
<!-- Socialisation pack (internal — stripped from the published page by dfva:gen-content):
     guide:   docs/evidura-facilitation-guide-mc-mgmthre.md
     deck:    docs/decks/evidura-socialisation-mc-mgmthre.pptx (spec: .deck.json alongside)
     harness: docs/dfva-v4-socialisation-harness.md -->
```

If a program's guide is ever cleared for publication, the change is to move it into the
report family as its own `reports/` file with its own lint rules — **not** to turn this
comment into a link. The objection-handling section would have to come out first.

**Regeneration runs once per run, not once per program.** `reportContent*.ts` is a single
generated surface; N concurrent `dfva:gen-content` calls interleave and the last writer
wins. The workflow therefore makes the markdown edits inside the fan-out and regenerates
after the barrier.

## Contracts

Deck spec (`docs/decks/evidura-socialisation-<code>.deck.json`):

```json
{
  "program": { "code": "mc-mgmthre", "name": "Master of Management (Human Resources)" },
  "meta": {
    "instrument": "4.1-draft",
    "assessmentDate": "2026-08-14",
    "generatedFrom": "docs/evidura-facilitation-guide-mc-mgmthre.md"
  },
  "slides": [{ "layout": "title", "title": "…" }]
}
```

The brief schema is in `scripts/workflows/socialisation-pack.js` (`BRIEF`). Its two
load-bearing fields:

- `straddles[]` — one per recorded ambiguity, each phrased as **the question a facilitator
  puts to the room**, not as a statement. These become §6.B of the guide and are the
  session's highest-value fifteen minutes.
- `declaredGaps[]` — from §6 *Not scoreable* and the evidence-confidence paragraph. The
  guide concedes these **before** asking the room what else is missing. A room that hears
  you list your own gaps starts listing theirs.

## Guards

1. **Enforced by the builder:** unknown layout fails; overflow exits non-zero; the palette
   comes from `tokens.css` with the published values as fallback; both sub-scores are drawn
   as separate cards, so no combined figure can appear by accident.
2. **Enforced by the verify stage:** no claim without support in the report family; no
   position label unless §1 states one; the two sub-scores never added; no promise of a date
   for the content-validity panel or the IRR study.
3. **Enforced by the content pipeline:** `dfva:gen-content` strips the link comment;
   `dfva:report-lint` and `dfva:check` run after regeneration.
4. **Deliberately not built:** any path that publishes a facilitator's guide to the site,
   and any path that lets session feedback change a score without going back through the
   scoring harness. Both are decisions, not scripts.

## Where session output goes afterwards

The pack produces three capture tables (§8 of the guide). Their routing is the harness's
only claim on what happens next, and it is the one the room is promised:

| Output | Destination |
| --- | --- |
| Evidence supplied | Re-capture (`/v4-capture`) → re-score (`v4-score-cohort.js`) → republished report with a dated correction note |
| Factual errors | Corrected in the report markdown, regenerate |
| Item disagreements | Rater-disagreement cases for the [IRR study](evidura-inter-rater-reliability-study.md) — disagreement about whether a line satisfies an anchor is a finding there, not noise |
| Construct challenges | The Panel C decision log in the [v4.1 recommendation](dfva-panelc-v41-recommendation.md), and the content-validity panel |

## Worked example

`mc-mgmthre` is the reference pack, hand-built before the harness existed and then adopted
as its template. Read the guide's Appendix B before running the harness on a new program —
it names exactly which sections are program-independent.

| Artifact | Path |
| --- | --- |
| Facilitator's guide | [`docs/evidura-facilitation-guide-mc-mgmthre.md`](evidura-facilitation-guide-mc-mgmthre.md) |
| Deck spec | [`docs/decks/evidura-socialisation-mc-mgmthre.deck.json`](decks/evidura-socialisation-mc-mgmthre.deck.json) |
| Deck (13 slides) | `docs/decks/evidura-socialisation-mc-mgmthre.pptx` |
| Report it socialises | [`reports/dfva-v4-mc-mgmthre.md`](../reports/dfva-v4-mc-mgmthre.md) |

### Packs built

| Program | Guide | Deck | Session held |
| --- | --- | --- | --- |
| MC-MGMTHRE | ✅ 2026-08-15 | ✅ 13 slides | — |
