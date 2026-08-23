# v4 report prose audit — deslop and Google developer style

**Date:** 2026-08-24
**Scope:** every markdown file rendered under a v4 program page on dev.evidura.ai —
96 files, 133,806 prose words, across the 83 programs in `v4PanelC.ts`.
**Method:** `scripts/check-report-prose.py`, built for this audit and checked in.
**Reports changed:** none. This audit is read-only by design.

---

## The short version

The hand-authored v4 layer is clean prose. The batch-generated market layer is not,
and its defects are about provenance rather than style.

| Genre | Files | Prose words | Tells per 100 words | Where it came from |
|---|---|---|---|---|
| `dfva-v4-<code>.md` | 20 | 49,958 | **0.014** | hand-authored, Aug 2026 |
| `dfva-v4-recommend-<code>.md` | 20 | 32,953 | **0.027** | hand-authored, Aug 2026 |
| `dfva-market-<code>.md` | 56 | 50,895 | **0.118** | `DFVA-COPILOT-MARKET-v1`, Jun–Jul 2026 |

Tier-1 AI vocabulary across all 133,806 words: **six hits** (`realm` ×2,
`transformative`, `actionable`, `delve`, `leverage`). Zero chatbot artifacts, zero
citation-markup leakage, zero signposting, zero generic conclusions, zero
authority tropes, zero idioms, zero vague link text. By the standard the deslop
skill sets, this corpus is in good shape, and the main risk in acting on this
audit is over-correcting prose that is already dense and specific.

Every substantive defect sits in the market layer, and the concentration tracks
the generation method rather than the subject. That is the finding worth acting on.

---

## Finding 1 — Reports assert a provenance they elsewhere deny

**Severity: high. This is a truth problem, not a style problem.**

`## 3. CURRENT DISCUSSION SIGNALS (X)` appears in **60 market reports**, 46 of them
rendered under a v4 page. The `(X)` names the platform X, which two files spell out
as "(professional discourse on X)". Fifteen reports go further in the body:

> Twitter/X and LinkedIn are actively debating whether tools like Midjourney…

The same files say retrieval never happened. From `dfva-market-746st.md`:

| Line | Text |
|---|---|
| 56 | `## 3. CURRENT DISCUSSION SIGNALS (X)` |
| 58 | `**Confidence: MEDIUM** — Pattern-based from known professional discourse.` |
| 31 | `**Confidence: MEDIUM** — Patterns from documented trend data; live scrape unavailable.` |
| 11 | Sources: WEF Future of Jobs 2025, LinkedIn *Workforce Insights* Q1 2026, Labour Market Insights, Seek trend data |

LinkedIn Workforce Insights is a published report. It is not the platform. The
heading claims a sample the file's own sources do not support.

**27 of 56 v4 market reports carry both claims at once.**

The repo already knows this. `.claude/rules/conventions.md` states the rule, and
`docs/dfva-report-section-authoring.md` names the exact defect and its 2026-08-23
count. The gap is enforcement, not knowledge: `dfva:report-lint` checks that §3
*declares* sources, and never checks whether the heading contradicts them.

**Recommendation.** Promote this to a build error, not guidance. It is a
one-line-per-file fix (`— <LEVEL> CONFIDENCE` in place of `(X)`), and the body
claims need re-authoring against what was actually consulted.

---

## Finding 2 — Claims with no owner

Two related patterns, both concentrated in §3.

**Phantom authority: 39 instances across 24 of 56 market reports.** A discourse
noun as the subject of a claim verb, with nobody accountable behind it. From
`dfva-market-mc-sciear.md`, one section:

> Repeated professional discourse emphasises… The consensus: … Ongoing discussion
> about… Professional discourse acknowledges… Emerging consensus that…
> Discussion frames this as… Discussion notes that…

Seven claims, no source behind any of them. This is deslop pattern 5 at scale, and
it collides with the repo's own §3 attribution rule.

**Quoted claims with nobody quoted: 34 of 188 theme headings (18%).** For example:

> **Theme 1 — "The geologist of 2030 is a data scientist who can swing a hammer."**

The quotation marks assert that somebody in the field said this. If nobody did,
they should come off. Under the deslop evidence boundary an invented quotation is a
defect regardless of how well it reads, and these headings are the most quotable
lines in the report — the ones most likely to be lifted into a slide.

**Unsourced causal glosses: 35 participle tails, 21 symbolic glosses.** A comma
followed by "reflecting the post-Royal Commission workforce uplift agenda" adds a
causal claim to a sourced document without sourcing it. Same for "This represents a
structural shift from 2023".

**Recommendation.** These are §3 authoring defects with a documented fix already
written in the authoring guide. The guide works — the August reports authored under
it are clean. What is missing is applying it retroactively to the June–July batch.

---

## Finding 3 — Google style: three real deviations, three declined

Measured against the Google developer documentation style guide
([highlights](https://developers.google.com/style/highlights),
[global audience](https://developers.google.com/style/translation),
[accessibility](https://developers.google.com/style/accessibility)).

### Worth fixing

**Directional language — 59 instances.** "the evidence above" breaks for screen
reader users and in translation; Google asks for "preceding". The leverage here is
unusual: **40 of the instances are two template strings**, shared verbatim across
40 files —

> This section argues from the evidence above; it is interpretation, not observation.
> This plan argues from the scored evidence and market data above; it is interpretation, not observation.

Both come from the v4 scaffolds — `dfva-v4-report-scaffold.ts:306` and
`dfva-v4-recommend-scaffold.ts:123`. Note that `check-report-format.ts` asserts
both strings *verbatim* (lines 428 and 505), so this is a coordinated four-line
change across two scaffolds and two lint assertions, not a single edit. Done
together, it clears 40 reports on the next regeneration.

**Long sentences.** Market reports run 9.8% of prose sentences over 30 words
against 4.2% for v4 reports. The longest genuine sentence in the corpus is 153
words (`dfva-v4-b-des.md`). Long is defensible when the sentence lists evidence;
it is not when the sentence carries an argument.

**Minor mechanical items:** 19 `prior to` / `utilise` where a plain word is
precise enough, 4 `note that`, 4 `simply` / `straightforward`.

### Deliberately declined — record these so nobody "fixes" them

| Google rule | House position |
|---|---|
| American spelling | Australian. University of Melbourne. |
| Serial commas (223 instances) | Australian house style omits them. |
| Second person "you" | These assess a program; they do not instruct a reader. |
| Sentence-case headings (789 instances) | All-caps section headings are established house form. Not worth churning 110 reports; do not extend to new genres. |

Declining a rule with a stated reason is a decision. Leaving it undecided means
re-arguing it every review, which is what a review skill should prevent.

---

## Finding 4 — Coverage gaps in what actually renders

Not prose, but it shapes what a reader sees, and it surfaced while mapping the corpus.

- **27 of 83 v4 program pages render no market card at all** (`038ab`, `097ab`,
  `175aa`, `192aa`, `195aa`, `277aa`, `305bb`, `342aa`, `344ab`, `502cw`, `504aa`,
  `507aa`, `510aa`, `511aa`, `526aa`, `527cn`, `706aa`, `742ab`, `761em`, `841ac`,
  `872bb`, `991aa`, `b-agr`, `b-arts`, `b-bmed`, `b-com`, `m04aa`).
- **63 of 83 render no recommendations card.** Only 20 improvement plans exist.
- **13–17% of body sentences are verbatim shared across three or more reports.**
  Most is legitimate methodological boilerplate. It matters because this is a
  comparison product: a reader opening two programs side by side sees roughly one
  sentence in six repeated.

---

## Finding 5 — The lint passes because 62 files are exempt

`dfva:report-lint` reports **109 grandfathered issues across 62 files** and exits
green. 62 are missing §3 sourcing declarations; 47 are attribution shortfalls.

Grandfathering was the right call — it let the rule land without blocking the
build. But the exemption list has no burn-down and no expiry, so a permanent
exemption reads the same as compliance from the outside. The count has no
direction attached to it.

**Recommendation.** Keep grandfathering, add a ratchet: record the count, require
it to fall, and fail if it rises. The new prose check ships with this behaviour
already (`scripts/report-prose-baseline.json`).

---

## Finding 6 — The rules the pipeline depends on are not version controlled

`.gitignore:39` excludes `.claude/` entirely, and `git ls-files .claude/` returns
nothing. The §3 sourcing rule quoted at the top of Finding 1 lives in
`.claude/rules/conventions.md`, which exists only on the machine that wrote it.
So do the module, stack, architecture and gotchas rules that the root `CLAUDE.md`
tells every agent to read.

This is the same class of failure the repo already documents for handbook capture:
*"Capture that exists on one machine cannot be re-examined, re-scored, or audited."*
A fresh clone gets `CLAUDE.md` pointing at rules it does not have.

**Recommendation.** Keep a canonical copy of anything an agent is expected to obey
in a tracked path, and mirror it into `.claude/`. This audit follows that pattern:
the review skill's canonical source is `dfva/skills/dfva-report-review/SKILL.md`,
mirrored by `npm --prefix scripts run dfva:sync-report-review`. The existing
`dfva:sync-skill` script is the precedent. The `.claude/rules/` files deserve the
same treatment, but that is a separate change and is not made here.

---

## What was measured, and what this audit cannot tell you

The detector was built in two passes. The first pass produced four findings that
did not survive checking, and they are worth recording because each looked
convincing in aggregate:

| Discarded check | Apparent count | What it actually was |
|---|---|---|
| Exclamation marks | 87 | `<!--` HTML comment markers |
| Noun stacks | 803 | a broken regex — "the identical", "a" |
| Lazy extremes | 84 | "the sub-scores are never added" — a precise method statement |
| Em-dash density | 78/1k | table cells; prose-only density is 10–22/1k, which is style |

All four are recorded in the `RETIRED` dict in `scripts/check-report-prose.py` so
they do not get re-added.

**Limits.** Sentence-length figures come from a regex splitter that treats a bullet
line as a sentence; the corrected prose-only figures are the ones quoted here. The
detector cannot judge whether a sourced claim is *true*, only whether it has a
source. And it says nothing about the rendered page — the shared copy in
`V4ReportPage.tsx`, which appears on all 83 pages, was reviewed by hand and is
specific, evidence-bound and honest about what does not exist yet.

---

## Recommendations

### For the reports

1. **Fix the `(X)` heading** in all 60 market reports. Mechanical, and it removes a
   false provenance claim from 46 live v4 pages.
2. **Re-author §3 for the June–July batch** against the authoring guide, which
   already produces clean sections. Prioritise the 27 files carrying the
   provenance contradiction.
3. **Drop the quotation marks** from the 34 theme headings that quote nobody, or
   attribute them.
4. **Fix the two scaffold strings** carrying "above" — one edit, 40 reports.

### For the workflow

5. **Add a review step between authoring and generation.** The pipeline today runs
   author → `dfva:gen-content` → `dfva:check`. Every check in it is structural. Add:

   ```bash
   npm --prefix scripts run dfva:report-lint     # structure and sourcing (exists)
   python3 scripts/check-report-prose.py         # prose and provenance (new)
   npm --prefix scripts run dfva:gen-content
   ```

6. **Wire the prose check into `dfva:check`** so CI runs it, with the ratchet
   preventing new debt while leaving the existing 345 tracked findings alone.
7. **Put a ratchet on the report-lint grandfathering** too, so the 109 known issues
   can only fall.
8. **Have the authoring agent run the review skill on its own output** before
   handing back. The August reports show the guide works when followed; the failure
   mode is skipping it, which a mechanical gate closes.

### For the harness

9. **The new skill is `.claude/skills/dfva-report-review/`.** It carries the
   register map, the corpus-validated do-not-flag list, the five-step gate, the
   four recurring defects, and the declined Google rules. It is deliberately scoped
   to one report at a time.
10. **Rules earn their place by surviving the corpus.** The skill documents the
    procedure: run a candidate rule across `reports/`, read every hit, and delete
    rather than tune anything that produces false positives — recording why, so it
    does not come back.

---

## Artifacts from this audit

| Path | What it is |
|---|---|
| `scripts/check-report-prose.py` | The prose and provenance linter. Read-only, ratcheted, genre-aware. |
| `scripts/report-prose-baseline.json` | 345 tracked findings across 110 reports. |
| `dfva/skills/dfva-report-review/SKILL.md` | The review skill (canonical, version controlled). |
| `.claude/skills/dfva-report-review/SKILL.md` | Mirror Claude Code loads. Regenerate with `dfva:sync-report-review`. |
| `docs/dfva-v4-report-prose-audit.md` | This document. |

Two npm scripts were added to `scripts/package.json`:

```bash
npm --prefix scripts run dfva:report-prose         # run the prose check
npm --prefix scripts run dfva:sync-report-review   # mirror the skill into .claude/
```
