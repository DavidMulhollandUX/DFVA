# Authoring market §3, and v4 §4 and §5

Three sections in the DFVA report families are written by judgement rather than derived by
a generator. Everything else on a v4 page — Panel A figures, the scorecard, the gates, the
references — comes from `scripts/dfva-v4-report-scaffold.ts` and must never be typed by an
author. These three are the exceptions, and each has a specific way to go wrong.

- **Market report §3 — CURRENT DISCUSSION SIGNALS.** Reads like reporting whether or not
  anyone reported anything.
- **v4 report §4 — MARKET EVIDENCE.** Condenses §3, so it inherits §3's defects.
- **v4 report §5 — CURRICULUM IMPLICATIONS.** Interpretation that can slide into directives.

The *principles* for §3 live in [the v4 agent harness](dfva-v4-agent-harness.md#market-reports-discussion-signals-must-be-sourced-not-synthesised)
— source ranking, the platform-sampling distinction, scope-to-what-was-measured. This
document is the **procedure and the mechanics**: what to run, in what order, and the exact
strings the lint keys on. Read the harness section first; it is not repeated here.

The procedure below re-sources prose that already exists. The task that produces sourced
material *before* any prose is written — profession-grain, five evidence lanes, a claim
ledger — is [Deep research task: profession discourse, market, and news](dfva-profession-deep-research.md).

## Order of operations (this matters)

**§3 before §4.** §4 condenses the market report's §3. Authoring §4 from an unsourced §3
propagates unattributed claims into a newly published report, and the grandfathering that
keeps the old market report legal does not make its content a sound input for a new one.
Source §3 first, then scaffold, then author.

```
market §3 sourced  →  dfva-v4-report-scaffold.ts <code>  →  author §4  →  author §5
                                                              ↑
                                        (§4 must already exist to write §5 honestly)
```

---

## Market report §3

### The procedure

1. **Read the existing §3 and list every claim.** Treat each as a hypothesis to check, not
   as prose to attribute after the fact.
2. **Search per claim.** Prefer the source types the harness ranks highest: named
   regulatory instruments, academic studies with an effect size, dated trade press, named
   commentators with affiliation.
3. **Decide per claim — and there are four outcomes, not two:**
   - **Sourced.** Attach the outlet/study, with a date and a link.
   - **Scoped.** The source is real but measures something narrower than the claim. Rewrite
     the claim down to what was measured, and say so in the text.
   - **Corrected.** The source contradicts the claim. Fix it, and state in the section that
     the earlier version said otherwise — a silent reversal is worse than the error.
   - **Removed.** Nothing found. Delete it and declare the removal in the opening paragraph.
     Do not reword an unsourceable claim into vaguer language to make it survive.
4. **Rewrite the section** in the house form below.
5. **Un-grandfather.** Delete the slug from `MARKET_GRANDFATHERED` in
   `scripts/check-report-format.ts`. The lint prints which files are ready:
   `🎉 N grandfathered file(s) are now aligned — remove from GRANDFATHERED`.
6. `npm --prefix scripts run dfva:report-lint`

### What the lint actually checks

These are string-level checks. Knowing them saves a cycle.

| Rule | What satisfies it |
| --- | --- |
| Sourcing declaration | The section body must literally contain **`What these sources are`**, `Sourcing basis`, or `Sources for this section` (case-insensitive). No other phrasing counts. |
| 3+ attributions section-wide | Counted by three patterns only: a **full month name + year** (`April 2024`), a **markdown link** (`](https://…`), or a name from a hardcoded outlet list (HR Brew, HR Dive, LinkedIn, Deloitte, Robert Half, Gartner, …). |
| 1+ attribution per theme | Fires **only** on `### Theme` headings. Bold `**Theme 1 — …**` prose is covered by the global count instead. |
| No unbacked sampling claim | Fires on `we sampled/scraped/extracted` without a nearby `not a scrape` / `not sampled`. |

**The trap that costs a cycle:** a bare journal citation like `(Clinical and Translational
Science, 2026)` counts as **zero** attributions — the year alone is not a month-year, and the
journal is not on the outlet list. **Use markdown links.** They satisfy the check and make
the claim verifiable, which is the actual point.

The outlet list is HR-centric because the rule was written for an HR program. For science,
policy or screen programs, links and month-year dates are the route.

### House form

```markdown
## 3. CURRENT DISCUSSION SIGNALS — MEDIUM CONFIDENCE

**What these sources are.** <source types, named>. Direct extraction from X or LinkedIn was
**not** performed and no professional forum was sampled — <what "discourse" means here>.
Dates are given where the source carries one. <Declare removals and corrections.>

### Theme 1 — <lowercase claim, not a topic label>

<Prose with named outlets, dates and links. Bold the figures.>

<Scoping sentence: what this supports, and what it does not.>

**Bearing:** C3 and W1.
```

Heading: drop any `(X)` — most legacy market reports still carry it (60 as of 2026-08-23),
and it asserts a platform sample that was not performed. `## 3. CURRENT DISCUSSION SIGNALS — <LEVEL> CONFIDENCE`.

---

## v4 report §4 — MARKET EVIDENCE

Basis line: **reported**. This is condensation, not new analysis.

### What goes in

Two tables and a confidence paragraph.

**Table 1 — destination job families.**
`| Job family | Entry titles | AI substitution pressure | Skills rising in that family |`

Three or so families, drawn from the market report's destinations and the LABOUR-EVIDENCE
footer. Substitution pressure is a *reported* judgement with its reason stated, not a score.

**Then state what the §1 exposure number is.** This is the paragraph most likely to mislead,
because the number looks like a measurement of this program whatever its basis. Say which
of the three it is:

| Basis | How to phrase it |
| --- | --- |
| Own alumni record | This program's own graduates. |
| Cognate / partial borrow | "**Borrowed** from <source program> (n = …, k titles) — an estimate for a related population, not a measurement of this cohort." |
| JSA HEO field list | "Rests on a **field-of-education** basis — graduates of the whole field, not this program." |

Carry the mapping-confidence caveat when it is material (e.g. "37 of 55 titles carry only
medium mapping confidence"), and say whether the program sits above or below the relevant
median — field-basis values are compared against the field median, not the portfolio median.

**Table 2 — signals and skill shifts.**
`| Signal or shift | Direction | Bears on |`

`Bears on` maps each row to scored items (C1–C5, W1–W3). This is the join between market
evidence and the instrument, and it is what makes §5 arguable.

**Confidence, restated from the market report.** Restate the source's own confidence and its
declared weaknesses. If §3 was re-sourced, say what changed — corrections and removals both.

### The rule that is easy to break

**No scoring language.** §4 reports what the market says. It does not argue that the program
should score differently, and it never introduces a v1 composite or an Irreplaceability
score. Judgement about the curriculum belongs in §5.

---

## v4 report §5 — CURRICULUM IMPLICATIONS

Basis line: **inferred**. The scaffold writes the mandatory opening sentence — *"This section
argues from the evidence above; it is interpretation, not observation."* — keep it verbatim.

The scaffold emits every row pre-filled with `Item`, `Score` and `Sources`, ordered by
headroom, and leaves two columns:

`| Item | Score | Implication | Cost | Sources |`

**Implication** — what this score means *given §4*, in one or two sentences. It should be
falsifiable against the market evidence directly above it. If an implication would read the
same for any program, it is too generic.

**Cost** — what acting would actually take: displaced core subjects, staff capability that
does not currently exist, placement capacity outside the faculty's control, marking and
moderation load. **Options with costs, never directives.** "Adding X would require displacing
Y" is right; "the program should add X" is not.

Source both columns from `reports/dfva-v4-recommend-<code>.md`, whose diagnostic table
already carries per-item headroom, direction and rationale. §5 is the readable face of that
plan; it must not contradict it.

Rows at the instrument maximum still need both cells filled — say what carries the score, and
put `None — no intervention proposed and none needed.` in Cost.

Ordering is **headroom**, which is deliberately *not* the improvement plan's P-lever order.
The scaffold's boilerplate says so; leave it.

---

## Finishing

The lint fails while **any** of these remain, so a half-authored report cannot reach the site:

- the literal string `TO BE AUTHORED`
- an `<!-- AUTHOR:S4 … -->` comment
- an `<!-- AUTHOR:S5 … -->` comment

Deleting the §4 block does not remove the §5 comment. Both go.

```bash
npm --prefix scripts run dfva:gen-content
npm --prefix scripts run dfva:report-lint
npm --prefix scripts run dfva:check
```

## Worked example

The 2026-08-23 pass over `mc-scibif`, `mc-scibio`, `mc-sciepi` and `mc-scwr` did all three
sections for four programs. It corrected three claims (the AWG published a position paper
and did not bargain AI provisions; environmental-consulting employment is declining, not
stable; CSIRO is cutting posts, not recruiting), scoped one down (the Australian epidemiology
shortage is a 2009 structural finding, not post-COVID demand), and removed eight themes for
which no source existed. Those four sections are the current reference for house form.
