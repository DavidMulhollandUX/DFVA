# Copy audit: everything except the v4 reports

This document reports a review of all authored text in this repository except
`reports/dfva-v4-*.md`. The review applies two standards: the `deslop` rule set,
which finds phrasing that signals machine authorship, and the
[Google developer documentation style guide](https://developers.google.com/style).

Nothing was changed. This document is analysis and recommendations only.

**Snapshot:** commit `eb818b7`, including the working tree. A concurrent session
added reports during the review, so the file counts moved from 215 to 229. Treat
the file counts as a snapshot and the rates per 1,000 words as the stable figures.
Counts for `docs/` exclude this file.

**Style note.** This document follows the Google style guide except for two rules
that conflict with documented house style: it uses Australian spelling, and it
omits the serial comma. `AGENTS.md` records both as deliberate.

## Terms used in this document

The word *gate* means two different things in this codebase. This document uses
each term in only one sense.

| Term | What it means | Where you see it |
|---|---|---|
| **Rubric gate** | A PASS or FAIL precondition that a *degree program* must meet before Panel C scores it. There are two: G1 (disciplinary foundation) and G2. A program can fail a rubric gate and still be assessed. | v4 report pages, as a `Gate / PASS when / FAIL when` table |
| **Prose check** | An automated script, `scripts/check-report-prose.py`, that reads report text and reports writing problems. It has nothing to do with rubric gates and it scores *text*, not programs. | Your terminal, and CI |

The earlier version of this document called the prose check "the gate", which
collided with the rubric meaning. This version says "prose check" throughout.

### How the prose check works, in plain language

The prose check is a script that reads each report and looks for about 25 specific
writing problems. It sorts what it finds into three levels:

- **Error.** The text claims something the source does not support. For example,
  a heading says the evidence came from a platform that nobody sampled. An error
  must never ship.
- **Warn.** The phrasing reads as machine-written, such as "professional discourse
  emphasises", where no person or publication is named. Use your judgement.
- **Style.** The text departs from the Google style guide in a way the house may
  knowingly accept, such as an all-capitals heading.

The script uses a **ratchet**. On the first run, someone records every existing
finding in a baseline file, `scripts/report-prose-baseline.json`. After that, the
script prints those recorded findings but does not fail the build. It fails the
build only when a *new* finding appears. This lets a check protect new writing
without requiring anyone to rewrite hundreds of existing reports first.

Two more terms appear throughout:

- A **tell** is a phrase that signals machine authorship.
- A **false positive** is a finding the script reports that turns out to be correct
  writing once you read it in context.

To run the prose check yourself:

```bash
npm --prefix scripts run dfva:report-prose
```

## What this audit covered

The audit read 717 files and 1,072,639 words.

| Surface | Files | Words | Share | Prose check runs on it |
|---|---:|---:|---:|---|
| `reports/`: v4 and market | 229 | 548,382 | 51.1% | Yes |
| `docs/*.md` | 89 | 178,298 | 16.6% | No |
| `dfva/source/evidence/*.json` | 98 | 164,744 | 15.4% | No |
| `reports/`: v1, faculty, research | 145 | 114,933 | 10.7% | No |
| `features/*.md` | 16 | 32,018 | 3.0% | No |
| `compass/app/src`, authored files only | 114 | 13,789 | 1.3% | No |
| Root `*.md` | 5 | 12,865 | 1.2% | No |
| Agent instructions | 20 | 6,618 | 0.6% | No |

The audit excluded generated files, because reviewing a generated file reviews the
wrong artifact. Excluded: `reportContent/**`, `v4PanelC.ts`, `dimensionEvidence.ts`,
`v3Programs.ts`, `v2Programs.ts`, `rubric.ts`, `v4Rubric.ts`, `facultyOutcomes.ts`,
`.wasp/out/**`, and `dfva/dist/**`.

## Result: the writing meets the standard

**All 31 error-level findings are false positives.** The audit read every one in
context before classifying it. The two largest warn categories are also false
positives.

| Reported finding | Count | Why it is a false positive |
|---|---:|---|
| Platform sampling in `dfva-market-s3-provenance-rewrites.md` | 15 | The document quotes the defect it records fixing |
| Unattributed discourse in `dfva-v4-report-prose-audit.md` | 6 | Block-quoted examples of the defect |
| Platform sampling in the two provenance forensics documents | 4 | The document criticises v1's sourcing; that criticism is its purpose |
| `TO BE AUTHORED` | 2 | Inside backticks, naming the string the linter detects |
| "track LinkedIn posts from product team members" | 1 | A recommended future action, not a claim about a source |
| "A consensus study" | 1 | A National Academies publication type |
| "we're wrong if experts say…" | 1 | A stated falsification condition |
| Generic conclusion, "Overall" | 28 | The field label `**Overall Section Exposure:**` |
| AI vocabulary, "leverage" | About 10 | *Leverage points*, a term of art in systems thinking |

Tell rates run from 0.05 to 0.91 per 1,000 words. The v4 report corpus measured
0.6 per 1,000 words.

| Surface | Words | Error | Warn | Style | Tells per 1,000 words |
|---|---:|---:|---:|---:|---:|
| `dfva/source/evidence` | 164,744 | 0 | 9 | 29 | 0.05 |
| `features/*.md` | 32,018 | 0 | 3 | 60 | 0.09 |
| `compass/app/src` | 13,789 | 0 | 2 | 9 | 0.15 |
| Root `*.md` | 12,865 | 0 | 4 | 67 | 0.31 |
| `docs/*.md` | 178,298 | 30 | 62 | 528 | 0.52 |
| `reports/`, unchecked | 114,933 | 0 | 65 | 1,599 | 0.57 |
| Agent instructions | 6,618 | 0 | 6 | 35 | 0.91 |

The authored rationale text in `dfva/source/evidence/*.json` is the cleanest
writing in the repository, at 0.05 tells per 1,000 words.

The landing page is concrete, cites its figures to QILT 2024, and describes its
own evidence accurately. The validation section lists participant roles rather than
names and labels them participants rather than endorsers.

## Three defects you can fix today

Reading found these. No automated check reported them, because each surface scores
as clean.

### The pricing page ships template copy on a public route

Files: `compass/app/src/payment/PricingPage.tsx` lines 36 to 53, and
`compass/app/src/payment/plans.ts` lines 9 to 41. The route `/pricing` does not
set `authRequired`, so anyone can read it.

| Field | Current value |
|---|---|
| Plan names | Hobby, $9.99; Pro, $19.99 |
| Hobby description | All you need to get started |
| Pro description | Our most popular plan |
| Credits feature | Use credits for e.g. OpenAI API calls |

"Our most popular plan" states popularity data that does not exist. That breaks the
evidence rule, not a style preference. "All you need to get started" could appear on
any software product, so it tells a reader nothing. "Use credits for e.g. OpenAI API
calls" describes the OpenSaaS starter template, not Evidura.

The product asks faculty leadership to commit between $40,000 and $200,000 per
degree on better evidence. Its own pricing page carries copy from a starter template.

### Public copy uses the internal methodology name

`CLAUDE.md` states that DFVA is the internal methodology name and does not appear in
external copy. Eleven rendered strings use it on routes that do not require sign-in:

| File | String |
|---|---|
| `compass/WhyDFVA.tsx:57` | Why DFVA? (a page heading) |
| `compass/CompetitiveThreatCard.tsx:55,178,179` | What this means for DFVA |
| `compass/ImpactReportCard.tsx:75,140` | …the exact use case DFVA serves |
| `compass/CompetitiveLandscape.tsx:21,48` | DFVA |
| `compass/SourceReferences.tsx:156` | DFVA assessment rubric |
| `compass/v2/V2ReportPage.tsx:625` | …from the DFVA recommendation pipeline |

The naming rule is the smaller problem. The register is the larger one. These
components show competitive strategy material to the institutions being assessed.
`compass/app/src/compass/data/marketValidationData.ts:87` renders:

> This represents a market gap DFVA can exploit.

Evidura's first trust pillar is independence. Telling an assessed university which
market gap you plan to exploit works against that claim.

### The admin settings page contains Lorem ipsum

File: `compass/app/src/admin/elements/settings/SettingsPage.tsx:126`. The field sets
a `defaultValue` of Lorem ipsum. Only administrators see it, but it is placeholder
text in a running interface.

## What already works: claims that fail closed

`compass/app/src/compass/TrustPage.tsx` is the strongest control in the repository.
When a claim depends on an operational fact that nobody has verified, a constant
guards it, and that constant defaults to `false`:

```ts
const ZERO_RETENTION_CONFIRMED = false;      // TrustPage.tsx:32
```

Because the constant is `false`, the page does not render the zero-retention claim.
`compass/app/main.wasp.ts` lines 335 to 338 record why. No unverified claim can reach
that page by accident. No other surface in the application has this property.

## Limitations in the prose check

The audit proved four defects in `scripts/check-report-prose.py`. These affect the
reports the script already covers, not only any extension of it.

| Limitation | Evidence | Cost |
|---|---|---|
| The quotation pattern excludes newlines, so the script never masks a quotation that spans two lines | `mask_quotes()` leaves "LinkedIn" visible inside a two-line quotation | 15 false errors in one file |
| The script does not strip block quotes | `strip_markup("> a quoted line")` returns the line unchanged | 6 false errors |
| The script does not strip inline code before rules that read raw text | The script flags the literal string `TO BE AUTHORED` | 2 false errors |
| `prose_lines()` deletes filtered lines instead of blanking them | Every reported line number after the first table or heading is wrong | Sends you to the wrong line |

The line-number defect matters most and hides best. Ratchet mode records each
finding as `file::rule` and never records the line, so a wrong line number never
fails a build. It costs time only when you act on a finding, which is what happened
during this audit.

## Recommendations

### R1: Fix the three shipping defects

Effort: small. Needs no tooling.

Rewrite the `/pricing` plan names and descriptions to describe what Evidura sells.
Delete "Our most popular plan" unless you have the data to support it. Move the
competitive strategy commentary behind sign-in, or restate it in Evidura's voice.
Delete the Lorem ipsum.

### R2: Extend the prose check to `dfva/source/evidence/*.json`

This is the largest unchecked surface that a reader sees: 164,744 authored words
that render on every v4 report page.

Scan authored fields only: `rationale`, `note`, `basis`, and `ambiguities`. Never
scan a verbatim field. Scanning every field produced 62 warns and 1 error, all of
them false, because handbook quotations are evidence rather than authored prose.
Excluding `evidenceLines` and similar fields reduced the same corpus to 9 warns and
0 errors.

The existing `mask_quotes()` function cannot solve this, because `json.loads()`
removes the quotation marks that mark the span before the script sees the text.

### R3: Fix the four limitations first

Effort: a few lines each.

Start with the line numbers: blank filtered lines instead of deleting them. Then
mask quotations that span lines, strip block-quote markers, and strip inline code
before rules that read raw text.

### R4: Do not extend the prose check to `docs/` yet

The audit produced 30 findings in `docs/` and all 30 are false positives.
Documentation quotes the defects it documents, and this repository does that
constantly. The provenance rewrites log and the v4 audit exist to record bad
sentences.

If you add `docs/` before R3 lands, the baseline fills with noise, and a ratchet
built on noise stops meaning anything. Revisit after R3, using error-level rules
only.

### R5: Apply the fail-closed pattern to other claims

`ZERO_RETENTION_CONFIRMED` is the right idea, implemented in one file. Make every
user-facing claim that rests on an unverified operational fact a constant that
defaults to `false` and renders nothing until someone verifies it. That pattern
would have caught "Our most popular plan".

### R6: Retire the rules this corpus disproved

`scripts/check-report-prose.py` already keeps a `RETIRED` list that records why each
removed check was removed, so nobody adds it back. Add three entries:

- `generic-conclusion` on the bare word "Overall": 28 findings, all of them the
  field label `**Overall Section Exposure:**`.
- `ai-vocabulary` on "leverage": a term of art in systems thinking material.
- `unattributed-discourse` where the phrase is "consensus study": a publication type.

### R7: Cover the 135 archived report pages, or stop rendering them

135 of the 145 reports outside the v4 and market families compile into
`reportContent/` modules and resolve at `/reports/archive`. They carry 114,933 words
and no prose check.

Running the v4 rules over them produces a baseline of 1,599 style findings, most of
them the all-capitals heading form that the prose check already accepts elsewhere.
So either add a `legacy` genre with a reduced rule set, or retire the route.

### R8: Keep the current tooling model

The prose check is one Python script wired into `dfva:check`, so it binds every
agent regardless of which model or tool runs it. Put extensions in that script
rather than in a second reviewer skill.

New rule text belongs in `dfva/source/blocks/report-review.md`, which already
generates `.claude/skills/`, `.agents/skills/`, `.github/copilot-instructions.md`,
and `.continue/prompts/dfva.md`.

## How to reproduce this audit

The scanner imports `RULES` from `scripts/check-report-prose.py`, so the two audits
cannot drift apart. The scanner performs analysis only and lives in the session
scratchpad. Promoting it to `scripts/` is the implementation work in R2.

One result is worth carrying forward: **31 of 31 errors and the two largest warn
categories were false positives.** On this corpus, checking each candidate in
context discarded more findings than it kept, which is what the `deslop` rule set
predicts for writing that is already dense and specific. Over-correcting this
material would cost more than leaving it alone.

## Status: R1 to R8 implemented, 2026-08-24

| Rec | Status | What changed |
|---|---|---|
| R1 | Done | Pricing copy, `/insights/v1` behind sign-in, Lorem ipsum removed |
| R2 | Done | The prose check reads `dfva/source/evidence/*.json`, authored fields only |
| R3 | Done | All four precision limitations fixed |
| R4 | Recorded | `docs/` stays out; the reason sits in `check-report-prose.py` |
| R5 | Done | `compass/app/src/payment/claims.ts`, fail-closed |
| R6 | Done | Three rules narrowed, each recorded in `RETIRED` |
| R7 | Done | Genre `legacy`, error rules only |
| R8 | Done | Rule text in `dfva/source/blocks/report-review.md`, fanned out |

The check now reads **446 files and 478,815 words**, up from 191 files and
202,104 words. `dfva:check` and `dfva:report-lint` both exit 0.

### What R3 changed on the existing corpus

R3 removed 9 findings and added none. Four were error-level: two
`quoted-theme-without-source` false positives in market reports, and two more
removed by masking quotations that span lines. R6 removed 3 more.

### Two findings that came out of the implementation

**Nothing spends credits.** `payment/user.ts` increments `User.credits` on
purchase, `schema.prisma` defaults it to 3, and `AccountPage` displays it. No
code in `src` decrements it. The Credits10 plan sells 10 units of something the
product never consumes, so no copy may state what a credit buys. `CREDITS_SPENDABLE`
in `payment/claims.ts` records this and defaults to `false`.

**The pricing page carried more template text than the audit found.** The page
rendered the OpenSaaS setup instructions to the public: "Just add your Product
IDs! Try it out below with test credit card number 4242 4242 4242 4242 4242".
That told a visitor the payment path was a demonstration.

### Still open

**17 `unattributed-discourse` errors** sit in market reports as tracked debt:
`mc-bamktg` (3), `mc-clind` (2), `mc-envlaw` (2), `mc-indeng` (2), `mc-urbdes` (2),
`mc-urbhort` (2), `mc-base`, `mc-prop`, `mc-propsyc`, `me-dcd`. R3 fixed the line
numbers, so they are now actionable. Each needs a named outlet, commentator or
study, which is sourcing judgement rather than a mechanical edit.

**Two dead components** carry the internal name and render nowhere:
`compass/CompetitiveLandscape.tsx` and `compass/WhyDFVA.tsx`. Delete them, or wire
them into an authenticated route.

**Plan naming remains a commercial decision.** The display names now read
"Standard" and "Unlimited", derived from the one thing the plans differ on: whether
monthly usage is capped. The enum values still map to Stripe price IDs and did not
change.
