# DFVA v4 — Panel A destination basis

**Status:** adopted 2026-08-22 (`PANELA_BASIS_VERSION = "1.0"`). Resolver:
`scripts/dfva-panela-basis.ts`; consumed by `scripts/dfva-v4-gen.ts` and guarded by
`scripts/dfva-panela-coverage-check.ts` (runs in `dfva:check` / CI).
LLM procedure for scoring a program: `docs/tasks/dfva-panela-scoring.SKILL.md`. Academic
methods note on the estimated tiers (assumptions, hold-out validity, permitted uses):
`docs/dfva-panela-estimated-basis-methods.md`.

## 1. Problem

Every v4 Durability Report needs a Destination AI Exposure value — the Felten, Raj &
Seamans AI Occupational Exposure index, min–max rescaled to 0–100, averaged over the
occupations a program's graduates enter. Until this revision the v4 generator computed it
only when a program's own name matched a record in `data/jir_data.json`. Eleven of the 25
scored v4-only programs therefore published "— · no alumni destination record", and 131 of
the 186-program extension cohort would have landed in the same state.

The original research never restricted itself that way. The reconciliation package that
validated the 34 reference programs (`data/aioe/reconciliation/v2_panelA_authoritative_aioe.csv`)
placed them on three tiers — `exact` (21), `cognate` (9, e.g. MC-SCIPHY on the BSc Physics
record), `partial` (10, e.g. MC-SURGED on the Master of Education record) — and v2 Panel A
used Jobs and Skills Australia Higher Education Outcomes field-of-education lists for
programs without alumni titles. The v4 generator had also lost two documented rules: the
`all`-key fallback and the pooling of per-major records for generalist bachelors.

## 2. What Felten, Raj & Seamans do, and what that licenses

Sources: Felten, Raj & Seamans (2021) *Strategic Management Journal* 42(12) 2195–2217,
doi:10.1002/smj.3286; Felten, Raj & Seamans (2023) *How will Language Modelers like ChatGPT
Affect Occupations and Industries?* arXiv:2303.01157; data at github.com/AIOE-Data/AIOE
(the repo's `data/aioe/felten_aioe.json` is Appendix A of that release — the original,
equal-weighted index).

| Element of the method | Statement | Consequence for DFVA |
| --- | --- | --- |
| Ability exposure (eq. 1) | `A_ij = Σ_{i=1..10} x_ij` — crowd-sourced relatedness of 10 AI applications to each of 52 O\*NET abilities | Inherited as published; DFVA never re-derives it. |
| Occupation exposure (eq. 2) | `AIOE_k = Σ_j A_ij·L_jk·I_jk / Σ_j L_jk·I_jk`, ability exposure weighted by O\*NET prevalence (L) and importance (I), standardised across occupations | The unit is the O\*NET-SOC occupation. Every DFVA basis must end at a SOC code carrying a published value. The title → SOC crosswalk is the one step Felten never needs, so it is the weakest link: every row keeps its SOC, confidence and rationale (`data/aioe/v31_extension_crosswalk.csv`, `data/aioe/program_scoped_crosswalk.csv`). |
| Standardisation | z-scores, mean 0 / SD 1 | DFVA's 0–100 min–max rescale is an affine transform of the same values; the mean of affine-transformed values is the affine transform of the mean, and medians and quadrants are order statistics, so nothing the instrument does is changed by the choice. Constants: z −2.670…1.528. |
| Aggregation to groupings | AIIE = "a weighted average of the AIOE using industry employment"; AIGE by county employment; the method "can be aggregated to other levels, such as the firm or subindustry level, using the distribution of employment or wages across occupations within a grouping" | A degree program is such a grouping. The tiers below are all groupings with their own destination distribution — program, program family, field of education. Felten's weighting is by employment share; alumni-title records carry no shares, so the program-grain mean is unweighted (v2 limitation L4 / open recommendation R5) and is kept as the headline for comparability with the 34 published values. Where shares exist (the field tier) the share-weighted mean is computed and carried alongside (`exposureWeighted`). |
| A grouping uses its own distribution | implicit in every aggregation the paper describes | Tiers `cognate` / `partial` borrow a *related* program's distribution. That is an assumption, not an aggregation; the original research made it for 19 of 34 reference programs. It ranks below every own-distribution tier and is labelled loudest. |
| Different aggregation levels are never compared on one scale | AIIE and AIGE are reported separately | Field-grain values sample a different occupation universe from alumni titles (reconciliation: median 79.7 vs 90.9). Field-tier programs are placed against a field-basis median computed on the same 34 reference programs, never against 90.9. |
| "Exposure" ≠ substitution | the measure "does not attempt to measure whether AI is a complement to or a substitute for labor" | Unchanged: every exposure figure carries the "exposure is not risk" caveat, now extended to say which grouping the value describes. |
| 2023 language-modelling variant (eq. 3) | `A_ij = Σ_i α_i x_ij`, α = 1 for language modelling only; ρ = 0.979 with the original | Not used. Every value records `indexVariant: "AIOE-2021"` so an LM-weighted sensitivity column can be added later without ambiguity. |
| Limitations stated by the authors | crowd-sourced matrix; US O\*NET definitions; static snapshot of current occupations; 10 applications | Inherited, plus DFVA's own: Australian titles (self-reported alumni titles and ANZSCO names) must be mapped onto US occupations by hand. |

## 3. The resolver

One computation for every tier: distinct destination titles → O\*NET-SOC 2010 via the
crosswalk → published AIOE (rescaled) → **unweighted mean**, 2 dp; entry-stage mean over the
entry-list titles alongside. Titles are `entry + early_mid + mid_senior` deduplicated, with
the `all` key as fallback when the staged lists are empty (the reconciliation package rule).
An unmapped title never yields a subset mean: the build fails and names the title.

Resolution order — the first tier that yields ≥ 1 title wins:

| Tier | Rule | Grain | Placed against |
| --- | --- | --- | --- |
| `exact` | normalised program name = JIR record name | program | 90.9 |
| `variant` | `(Enhanced)`, `(Extended)`, `Internship`, `in …` stripped → parent record | program | 90.9 |
| `pooled` | no own record but `<name> (…)` major records exist (on the name or its variant parent) → union of all of them, n summed | program-family | 90.9 |
| `combined` | `A/B` double degree → each component resolved by the tiers above, titles unioned | program-family | 90.9 |
| `cognate` / `partial` / `exact` (renamed) | curated: `data/aioe/panela_basis_overrides.json` | related-program (or program, for a renamed/truncated record) | 90.9 |
| `field` | JSA HEO Table 3 occupation list for the program's ASCED field (`data/jsa/program_fields.json` → `data/jsa/heo_field_destinations.json`) | field | `V4_META.expMedianField` |

Pooled and combined values record every source record with its n; when one record holds
more than 60 % of the summed n the value is flagged `dominantShare` (Felten would n-weight the
majors; without title shares union-dedup is the only estimator, and the reader is told which
major the value leans on).

### Refused titles and program-scoped mappings

`data/aioe/crosswalk-refused.json` lists titles adjudicated as unmappable to one SOC because
the same string means different occupations in different programs ("Teacher": Elementary
84.74 vs Secondary 91.99). A record carrying a refused title can never clear on the global
crosswalk. Two rules handle that:

1. **Program-scoped rows.** `data/aioe/program_scoped_crosswalk.csv` maps
   `(program_code, title)` where the program's discipline fixes the occupation the global
   refusal could not. The resolver consults it before the global crosswalk, for that program
   only. `scripts/crosswalk-add.py` writes it when a batch row carries `program_scope`; a
   scoped row must still pass adversarial review and say which refusal reason it resolves.
2. **Record exclusion.** On a multi-record tier (pooled, combined, multi-source override) a
   record still carrying a refused title is set aside — recorded on the value as
   `excludedSources`, shown on the page — and the tier stands on the remaining records. A
   single-record tier with an unresolved refused title falls through to the next tier. A
   refused title is never dropped from a record; the record is, or the tier is.

### Field tier data

`data/jsa/higher_education_work_and_occupation.xlsx` — Jobs and Skills Australia, *Higher
Education Outcomes: Exploring Administrative Data*, "Work and occupation" workbook, file dated
2025-12-04, retrieved 2026-08-22 from
<https://www.jobsandskills.gov.au/publications/higher-education-outcomes-exploring-administrative-data>.
Table 3 gives ASCED field of education (2-, 4- and 6-digit) × ANZSCO-6 occupation, with
counts and shares of graduates in wage/salary work 1, 3 and 5 years after completion,
ATO-linked, all completion levels. `scripts/jsa-heo-extract.py` keeps the top 10 classified
occupations per stage by share (ties kept; the unclassified `MISSING` row dropped) and records
the summed share as `coverage`. `scripts/jsa-heo-extract.py` is deterministic; re-running it
on the same workbook reproduces `data/jsa/heo_field_destinations.json`.

Field assignment (`data/jsa/program_fields.json`): the most specific ASCED field the
program's graduates are reported under; double degrees take the first component's field;
variants take the parent's; 65 of 220 assignments are marked medium confidence with the
alternative named. Optometry (060901) and Curatorial Studies (091303) are absent from the
JSA table and fall back to their broad field.

Field-tier values carry `exposureWeighted` — the share-weighted mean over the listed
occupations, renormalised to the listed shares — which is the Felten-faithful figure; the
unweighted mean remains the headline for comparability and the page shows both when they
differ by more than 2.5.

## 4. Labelling

Every exposure value carries
`exposureBasis: { tier, grain, sources[{name, n}], field?, dominantShare?, excludedSources?, exposureWeighted?, indexVariant, note }`
(`V4_PANEL_A_BASIS` in `compass/app/src/compass/v4/data/v4PanelC.ts`, for the reference
cohort as well as v4-only programs — `v3Programs.ts` records the reference cohort's reconciled
basis as `matchTier: "exact"` even where the package borrowed a record, so the label comes from
the resolver, and the guard asserts the resolver reproduces every published v3 value).

On the report page: the exposure card states the tier and the median it is placed against;
the prose describes the basis in one sentence; the plane draws own-record programs as a
filled point and every other basis as a dashed ring, with the field-basis median line for
field-tier programs; the `/reports` index shows the tier under the value.

## 5. Guards

`scripts/dfva-panela-coverage-check.ts` fails the build when: a reference program no longer
reproduces its v3 exposure through the resolver (tier drift); a v4-only program has no basis,
or a generated value/tier that differs from the resolver; a field-tier program is published
while `expMedianField` is null; or any ANZSCO title in a field list in use is unmapped. It
reports (non-fatally) the standing JIR unmapped-title backlog.

## 6. Limitations

- **L-A-1 Crosswalk.** Title → SOC mapping is hand-made (confidence graded, rationale per
  row, adversarially reviewed). Two crosswalk generations sit at different levels (inherited
  median 92.3 vs new 77.3, v3 methodology §3.3); absolute levels depend on crosswalk
  composition, structural results do not.
- **L-A-2 Borrowed distributions.** Cognate/partial values assume a related program's
  graduates stand for this program's. The assumption is stated on the page and the tier
  ranks last among JIR-based tiers.
- **L-A-3 Field grain.** Field-tier values describe a whole ASCED field across institutions
  and completion levels, not this program; same-field programs receive the same value. They
  are placed against their own median and never mixed with program-grain values in a
  portfolio statistic.
- **L-A-4 Unweighted mean.** Program-grain tiers cannot be share-weighted (R5 open). The
  field tier is the first DFVA basis that can be, and is.
- **L-A-5 Index vintage.** Original equal-weighted AIOE; the 2023 language-modelling variant
  is a future sensitivity column, not a replacement.
