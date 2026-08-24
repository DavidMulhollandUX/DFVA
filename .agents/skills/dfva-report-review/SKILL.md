---
name: dfva-report-review
description: Review a DFVA report's prose before it ships — provenance, machine-authorship tells, and developer-documentation style, scoped to the register each report genre is actually written in. Use when authoring or revising any reports/dfva-*.md file, when a report is about to be regenerated into the app, or when asked to review, audit, deslop, or copy-check a DFVA report. Runs after dfva:report-lint, which checks structure and sourcing; this checks how the prose reads.
---

# DFVA report review

`dfva:report-lint` checks that a report has the right sections and declares its
sources. It cannot tell whether a sentence is true, whether a claim has an owner,
or whether the prose reads as though a person wrote it. This skill covers that.

Run it on one report at a time. Reviewing a batch produces batch-shaped advice,
and the defects that matter here are specific to a sentence.

## What this corpus is, and why that changes the rules

Three genres, three registers. Get this wrong and the review does damage.

| Genre | File | Register | What good looks like |
|---|---|---|---|
| Durability report | `dfva-v4-<code>.md` | scientific/technical | Precision over liveliness. Repeat the exact term. Anchors quoted verbatim. |
| Improvement plan | `dfva-v4-recommend-<code>.md` | policy/advisory | Options with costs, never directives. Every claim traceable to the scored evidence. |
| Market intelligence | `dfva-market-<code>.md` | reported evidence | Every signal carries an owner, a date and a link. |

All three sit under the deslop skill's strictest evidence rules: **never add a
fact, name, number, date, quote, owner or obligation the source does not state.**
These reports are read by faculty leadership and cited in curriculum decisions. A
fabricated specific is a defect even when it reads better than the vague original.

Plain and neutral is the human voice here. Do not inject personality. The most
common way to fail this review is to over-correct: this corpus measured
**0.06 tells per 100 words** in the August 2026 audit — 0.014 for durability
reports, 0.118 for market reports. Most of what a generic slop checklist flags in
this material is precision, not slop.

**Leave it alone is often the correct output.**

## Report prose review — provenance and machine-authorship

These rules apply to every agent that authors or edits `reports/dfva-*.md`,
whatever model is behind it. They are enforced mechanically by
`scripts/check-report-prose.py`, which runs in `dfva:check` and does not care
which tool wrote the text — so a violation blocks the build regardless.

Run it before handing work back:

```bash
python3 scripts/check-report-prose.py --file dfva-market-<code>.md
python3 scripts/check-report-prose.py --file <code>.json   # an evidence file
python3 scripts/check-report-prose.py                      # everything
```

It covers three things, not one:

- **`reports/dfva-v4-*.md` and `dfva-market-*.md`** — the full rule set.
- **`reports/dfva-*.md` otherwise** (archived v1, faculty and research-degree
  reports, genre `legacy`) — the error rules only. They still render at
  `/reports/archive`, so they must be true; they are not held to house style.
- **`dfva/source/evidence/*.json`** — the fields you write: `rationale`, `note`,
  `basis`, `ambiguities`. **Never** run prose rules over `evidenceLines`, `quote`
  or `anchor`. Those hold handbook text quoted as proof, and `json.loads` has
  already stripped the quotation marks that would otherwise protect them.
  Rewriting one breaks the citation.

`error` findings must not ship. `warn` findings need your judgement. `style`
findings are Google developer-documentation deviations the house may knowingly
decline — check the declined list before acting on one.

### The evidence boundary

Never add a fact, name, number, date, quote, owner or obligation the source does
not state. These reports are read by faculty leadership and cited in curriculum
decisions. A fabricated specific is a defect even when it reads better than the
vague original. If there is no source, say so or cut the claim — never invent one
to make a sentence look sourced.

### The four defects that actually recur

**Provenance drift.** A section says where evidence came from while the same file
says retrieval was not performed. Trade press reporting what people said on a
platform is not a sample of that platform. Check that a §3 heading, its body and
the Evidence Confidence Note agree about what was actually consulted. Never write
`## 3. CURRENT DISCUSSION SIGNALS (X)` — use `— <LEVEL> CONFIDENCE`.

**Phantom authority.** "Professional discourse emphasises", "the consensus is",
"emerging consensus that". A discourse noun as the subject of a claim verb means
nobody is accountable for it. Name the outlet, commentator or study with a date.

**Quoted claims with nobody quoted.** A theme heading in quotation marks reads as
a quotation from the field. If nobody said it, drop the quotation marks and state
it as the report's own claim.

**Unsourced causal glosses.** A participle tail — ", reflecting the
post-Royal Commission workforce uplift agenda" — smuggles a causal claim into a
sourced document without sourcing it. Promote it to a sentence with a source, or
cut it. Same for "This represents a structural shift": state the fact and let the
reader judge what it represents.

### Do not flag these

Each was a checked false positive. Over-correcting this corpus is the more common
failure: it measured 0.06 machine-authorship tells per 100 words, which is low.

- **Absolutes that are method statements** — "the sub-scores are never added".
  Cutting them loses meaning.
- **Repeated technical terms** — `C3`, `adaptiveness`, `anchor`, `basis`. Never
  vary a rubric term for elegance.
- **Domain vocabulary a generic list calls jargon** — `modality` in a clinical
  outcome, `scaffolding` in an education one.
- **Anything inside quotation marks** — handbook verbatim and anchor text are
  evidence; rewriting them breaks the citation.
- **Australian spelling and the omitted serial comma** — deliberate house style.
- **Third-person address** — these assess a program, they do not instruct a reader.
- **All-caps section headings** — established house form.

Plain and neutral is the human voice here. Do not inject personality, and do not
rewrite prose that is already dense and specific. "Leave it alone" is often the
correct output.

## The pass

### 1. Read the whole report before changing a word

Note the register, then lock the facts: every number, date, subject code, credit
point, anchor quotation, citation and score. A phrasing pass changes none of them.
If you cannot restate the report's core finding in one sentence, stop and ask.

### 2. Gate every candidate

In order. A candidate surviving all five is a real finding.

1. Does cutting it lose meaning? If yes it is content. It stays.
2. Formula or choice? Could the author defend it? If not, it arrived by reflex.
3. Does it announce rather than deliver?
4. Heat or light? Cut heat.
5. Would a sceptical faculty reader trust the sentence more or less without it?

**Cluster rule.** One participle tail in otherwise specific prose is a person
writing. Flag a pattern when several tells co-occur in the same passage. This
gate should discard more candidates than it keeps.

### 3. Google style, where it applies

The rules the house accepts, in the order they come up:

- **Directional language.** "the evidence above" fails for a screen reader and in
  translation. Use "the preceding section", or name it. Check the scaffold
  templates, not just the report — at audit, 40 of 51 instances came from two
  template strings shared across 40 files.
- **Descriptive link text.** Never "here" or "this document".
- **Sentence case headings.** The house uses all-caps section headings
  (789 instances). That is a knowing deviation; do not churn existing reports for
  it, but do not add all-caps headings to a new genre.
- **Plain word over long word.** before, not prior to. use, not utilise.
- **Shorter sentences.** Market reports run 9.8% of sentences over 30 words. Long
  is fine when the sentence is a list of evidence; split it when it is an argument.
- **"Note that"** tells the reader to notice instead of stating the thing.

### 4. Self-audit before delivering

Answer honestly, in two or three bullets:

- What still reads as machine-written here?
- Does this state any fact, name, number, date or citation not in the source?
- Did I change more than about a fifth of a passage that already had a pulse?

Then make one corrective pass against exactly those answers.

## Deliver

State findings as: rule, quoted line, one-line fix. Where a call was close, say
which candidates you deliberately kept and why — that judgement is the reviewable
part.

Do not rewrite the report unless asked. If the request was a review, deliver the
review.

## Adding a rule

A rule earns its place by surviving the corpus, not by sounding right. Before
adding one to `scripts/check-report-prose.py`:

1. Run it across `reports/` and read every hit.
2. If it produces false positives on this material, remove it rather than tune it,
   and record why in the `RETIRED` dict. Four checks died that way — noun stacks,
   lazy extremes, exclamation marks and em-dash counts — and the note is what
   stops someone re-adding them.
3. Classify severity: `error` for a truth or provenance defect, `warn` for a
   prose tell, `style` for a Google deviation the house may decline.
4. Re-run `--write-baseline` only when the team has agreed the new rule's existing
   hits are tracked debt rather than a release blocker.

## Related

- [docs/dfva-report-section-authoring.md](../../../docs/dfva-report-section-authoring.md) — how to author §3, §4, §5
- [docs/dfva-v4-report-prose-audit.md](../../../docs/dfva-v4-report-prose-audit.md) — the audit these rules came from

## Where this file lives

Generated. Source: `dfva/source/targets/report-review-skill/SKILL.md.tmpl`, with
the shared rules in `dfva/source/blocks/report-review.md` — the same block is
emitted into `.github/copilot-instructions.md` and `.continue/prompts/dfva.md`,
so agents that are not Claude get them too. Edit the source, then run
`npm --prefix scripts run dfva:gen`. Do not edit the generated file.
- `.claude/rules/conventions.md` — the §3 sourcing rule
- `scripts/check-report-format.ts` — structure and sourcing lint
