---
name: dfva-panela-scoring
description: Give a DFVA program its Destination AI Exposure (Panel A) value on a stated basis — own alumni record, program family, related program, or JSA field list — by the one procedure the resolver implements. For any LLM doing v4 scoring work.
---

Give a program its Panel A value. Never compute it by hand; make the resolver able to
compute it, then run the generator. The value is a by-product of the data being right.

Working directory: /Users/djmulholland/Documents/SXD-Github/DFVA
Method and Felten justification: `docs/dfva-v4-panela-basis.md` (read §2–§3 first).
Academic statement of the estimated tiers: `docs/dfva-panela-estimated-basis-methods.md`.

## The one rule

**A program's exposure is whatever `scripts/dfva-panela-basis.ts` resolves, and nothing
else.** If the resolver gives no value, or the wrong tier, fix the data it reads — never the
page, never the generated module, never a number typed into a report. The guard
(`scripts/dfva-panela-coverage-check.ts`, in `dfva:check`/CI) fails on any value the
resolver cannot reproduce.

## What a value is

Distinct destination titles → O\*NET-SOC 2010 via the crosswalk → published Felten AIOE
(min–max rescaled 0–100) → **unweighted mean**, 2 dp. Same computation on every tier; the
tiers differ only in *whose* destination titles stand for the program. An unmapped title
never yields a subset mean — the build throws and names it.

| Tier | Whose titles | Placed against | Label shown |
| --- | --- | --- | --- |
| `exact` | program's own JIR record | 90.9 | measured |
| `variant` | parent record (`(Enhanced)`, `(Extended)`, `Internship`, `in …` stripped) | 90.9 | measured · parent record |
| `pooled` | union of `<name> (major)` records | 90.9 | program family |
| `combined` | `A/B` double degree → both components | 90.9 | both components |
| `cognate` / `partial` | curated related program (`data/aioe/panela_basis_overrides.json`) | 90.9 | cognate / related program |
| `field` | JSA HEO ASCED field list (`data/jsa/program_fields.json`) | `V4_META.expMedianField` | field grain |

First tier that yields ≥ 1 mappable title wins. Do not skip a tier because a lower one looks
"cleaner"; do not promote a tier because the number looks better.

## Procedure for one program

```bash
cd scripts && npx tsx dfva-panela-audit.ts | grep -i '<code>'
```

Read the line. Then, by outcome:

**1. Resolves, tier is defensible → done.** Run `npm --prefix scripts run dfva:gen-v4` and
`npm --prefix scripts run dfva:check`. The page labels itself from the basis.

**2. `No basis`.** The program has no own record, no family records, no override and no
field. In order of preference:
- Search `data/jir_data.json` for a *related* record (`program` field) — a parent degree,
  the non-specialised master, the professional degree this one feeds. Add an override:
  `{ "<code>": { "tier": "cognate" | "partial", "sources": ["<JIR record name>"], "note": "<why these graduates stand for this program>" } }`.
  `cognate` = same discipline, different level or specialisation (MC-SCIPHY ← BSc Physics);
  `partial` = a broader or adjacent program whose graduates overlap (MC-SURGED ← Master of
  Education). One or more sources; every source must resolve on its own.
- Otherwise assign an ASCED field in `data/jsa/program_fields.json` (6-digit where the JSA
  table has it, else 4- or 2-digit), with `confidence` and `rationale`. Check the field
  exists in `data/jsa/heo_field_destinations.json`; if not, fall back to the broad field and
  say so in the rationale.

**3. `UnmappedTitlesError`.** A title on the resolved record has no crosswalk row. Map it
with the crosswalk skill (`docs/tasks/dfva-crosswalk-backfill.SKILL.md`) — always
map-then-adversarial-review, never a single-pass guess. Rules that matter here:
- Only the 774 Felten occupations exist; 6-digit SOC-2010; never write an index value,
  `crosswalk-add.py` computes it.
- Match the *work*, not the rank; a qualifier re-points only when it names a different
  occupation.
- If the same string means different occupations in different programs (Teacher, University
  Lecturer, School Teachers nfd, Analyst…), it is **refused** globally
  (`data/aioe/crosswalk-refused.json`) and mapped with a `program_scope` — the program code,
  or `field:<ASCED>` for a field-list title. A scoped row must say which refusal it resolves.
- Refuse when the candidates spread > ~10 index points with no tiebreak in the title, the
  record, or the field list. A refusal is a finding, not a failure; record the spread.

**4. Resolves on the wrong tier.** Usually a name mismatch: check `normProgramName` in the
resolver against the JIR `program` string, or a missing `variant` pattern. Fix the
matching, not the data.

## What the resolver does with refused titles (so you do not fight it)

- Multi-record tier (`pooled`, `combined`, multi-source override): a record still carrying
  a refused title is set aside, recorded as `excludedSources`, and the tier stands on the
  rest.
- Single-record tier: falls through to the next tier.
- `field` tier: a refused ANZSCO title is excluded, recorded as `excludedTitles` with the
  share it carried, and `coverage` reports how much of the entry-stage distribution the value
  stands on.

A refused title is never silently dropped from a record; the record, or the tier, is.

## Things that have gone wrong before (do not repeat)

- Concluding "no alumni record" from `data/labour-evidence.json` (41 programs). The source
  of record is `data/jir_data.json` (141). Shipped a false claim on 2026-08-14.
- Computing a mean over the titles that happened to map. 82/141 records have at least one
  unmapped title; a partial mean reads as a measurement and is not one.
- Placing a field-tier value against 90.9. Field lists sample a different occupation
  universe (reference cohort: program-grain − field-grain ≈ +5, r = 0.86); the field median
  is 83.21 and the position chip uses it. Mixing them moves programs across the median line.
- Typing a tier into prose. The page derives every label from `V4_PANEL_A_BASIS`; report
  markdown must not restate the basis in words that can drift.
- Adding a global crosswalk row for a title the refused list already holds.
  `crosswalk-add.py` rejects it; the fix is a scoped row.

## Done means

`dfva-panela-audit.ts` shows the code on a tier with 0 unmapped titles; `dfva:gen-v4`
writes `V4_PANEL_A_BASIS[<code>]`; `dfva:check` passes; the report page shows the tier label
and the correct median. Commit data + generated module together.
