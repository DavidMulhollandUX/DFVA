## Report prose review — provenance and machine-authorship

These rules apply to every agent that authors or edits `reports/dfva-*.md`,
whatever model is behind it. They are enforced mechanically by
`scripts/check-report-prose.py`, which runs in `dfva:check` and does not care
which tool wrote the text — so a violation blocks the build regardless.

Run it before handing work back:

```bash
python3 scripts/check-report-prose.py --file dfva-market-<code>.md
```

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
