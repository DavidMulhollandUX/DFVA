# Estimating Destination AI Exposure for programs without an alumni destination record

**Methods note, DFVA v4 Panel A.** Companion to `docs/dfva-v4-panela-basis.md` (the
operational specification). This note is written for citation in academic and evaluative
contexts and states, for each estimation route, what is assumed, what evidence supports the
assumption, and what the figure may and may not be used for. Resolver version
`PANELA_BASIS_VERSION = "1.0"`, 2026-08-23.

## 1. The measurement and what it requires

DFVA's Destination AI Exposure is the Felten, Raj & Seamans AI Occupational Exposure index
(AIOE; Felten, Raj & Seamans 2021, *Strategic Management Journal* 42(12), doi:10.1002/smj.3286;
data: github.com/AIOE-Data/AIOE), aggregated from occupations to a degree program. Felten et
al. define AIOE at the O\*NET-SOC occupation and show it "can be aggregated to other levels …
using the distribution of employment or wages across occupations within a grouping". The
program-grain statistic is therefore a two-step construction:

1. an **occupation distribution** for the grouping — which occupations the program's
   graduates enter; and
2. the **AIOE of each occupation**, inherited from the published index (min–max rescaled to
   0–100; an affine transform that preserves means, medians and rank).

Step 2 is never in question. Step 1 is the whole difficulty. The measured case is a program
whose own graduates' destination titles are recorded (University of Melbourne Job Insights /
LiveAlumni, 141 program records, entry / early-mid / mid-senior stages). Of the 220 programs
in the v4 cohort, 66 have such a record under their own name and 7 under a parent name
(`exact`, `variant`). The remaining 147 do not, and this note concerns them.

## 2. Why estimation rather than omission

Omitting the value is not neutral. The v4 Durability Report places every program on an
exposure × adaptiveness plane; a missing x-coordinate removes the program from the
portfolio view and from every cross-program statistic, and in practice biases the visible
portfolio toward large, long-established programs (the ones alumni platforms track).
Felten et al.'s own industry and geographic indices (AIIE, AIGE) are estimates built from an
employment distribution, not from surveyed workers, so estimation from a grouping's
occupation distribution is the method's native move, not a departure from it.

The constraint adopted instead is **disclosure**: every value carries a machine-readable
basis (`tier`, `grain`, `sources`, `n`, and where relevant `field`, `dominantShare`,
`excludedSources`, `excludedTitles`, `coverage`, `exposureWeighted`), the report page states
it beside the figure, and estimated points are drawn differently from measured ones. No
estimated value is presented, computed, or stored in a form indistinguishable from a
measurement.

## 3. The estimation routes

All routes share the computation: distinct destination titles → O\*NET-SOC 2010 (hand
crosswalk, confidence-graded, adversarially reviewed) → AIOE → unweighted mean. They differ
only in whose distribution is used. They are tried in a fixed order and the first to yield at
least one mappable title is used; the order is from least to most assumption.

### 3.1 `pooled` — the program as the union of its recorded majors (n = 8)

**Assumption.** A generalist degree's destination distribution is the union of its majors'
distributions. **Support.** This is an aggregation, not a substitution: the majors are the
program. Felten would weight each major by its employment share; alumni-title records carry
no title-level shares, so the union is deduplicated and unweighted, and the per-major *n*
is recorded so a reader can see the mix. Where one major holds more than 60 % of summed *n*
the value is flagged `dominantShare`. **Example.** Bachelor of Arts ← 10 major records,
n = 2,596, 101 distinct titles.

### 3.2 `combined` — double degrees as the union of both components (n = 6)

**Assumption.** Graduates of *A/B* enter the union of *A*'s and *B*'s destinations.
**Support.** The same aggregation logic; each component is itself resolved by the routes
above, so the assumption is only that the double degree adds no third destination set.

### 3.3 `cognate` and `partial` — a related program's distribution (n = 38 + 38)

**Assumption.** Graduates of program *P*, for which no record exists, enter the same
occupations as graduates of a recorded related program *Q*. `cognate`: same discipline,
different level or specialisation (Master of Science (Physics) ← Bachelor of Science
(Physics)). `partial`: a broader or adjacent program with overlapping destinations
(Master of Surgical Education ← Master of Education; the law specialisations ← Master of
Laws). **Support.** This is the one route that is an *assumption about similarity* rather
than an aggregation. It was the route the original DFVA reconciliation used for 19 of the 34
reference programs, so it is not new; what is new is that it is now labelled. Each mapping is
curated with a written rationale (`data/aioe/panela_basis_overrides.json`) and ranks below
every own-distribution route. **Validity.** Cannot be tested against the programs it is
used for (they have no record by construction). The observation that `partial` values
cluster tightly (median 92.85, SD 2.15 across 38 programs) reflects that many share a
small number of source records (Master of Laws, Master of Management, Master of Education)
and should be read as *low information*, not as agreement.

### 3.4 `field` — the ASCED field-of-education occupation distribution (n = 57)

**Source.** Jobs and Skills Australia, *Higher Education Outcomes: Exploring Administrative
Data*, "Work and occupation" workbook (file dated 2025-12-04; retrieved 2026-08-22). Table 3
gives, for each ASCED field of education, the ANZSCO occupations of graduates in wage and
salary employment 1, 3 and 5 years after completion, linked through ATO records, all
institutions and completion levels. The top ten classified occupations per stage are kept
with their shares (`coverage` records the summed entry-stage share).

**Assumption.** A program's graduates enter the occupations of its ASCED field in roughly
the field's proportions. **Support.** This is the closest DFVA has to Felten's own
construction — a grouping with a real employment distribution over occupations — and it is
the only route on which a share-weighted mean (Felten's AIIE rule) can be computed. Both
the unweighted mean (comparable with every other tier) and the share-weighted mean
(`exposureWeighted`) are stored; across the 57 field-tier programs the two differ by
−0.67 on average, by more than 2.5 points for 20 programs, with a range of −14.5 to +9.0.
Where they diverge the page shows both.

**Validity — hold-out.** The 34 reference programs all have a measured own-record value
*and* a field value, so the field route can be tested against measurement:

| Statistic (program-grain vs field-grain, n = 34) | Value |
| --- | --- |
| Mean difference (program − field) | +5.04 (SD 5.28; range −6.25 to +16.61) |
| Pearson *r* | 0.857 |
| Spearman ρ | 0.675 |
| Programs on the same side of their own median (90.9 vs 83.21) | 22 / 34 (65 %) |

Two things follow. The field value tracks the measured value well in level (*r* ≈ 0.86) but
sits about five points lower, because the JSA occupation universe is broader (all
institutions, all completion levels, administrative occupation coding) than self-reported
alumni titles from one Group of Eight university. **Field-tier values are therefore placed
against a field-basis median (83.21) computed on the same 34 programs, never against the
program-grain median (90.9)** — the analogue of Felten et al. reporting AIIE and AIGE on
their own scales rather than against AIOE. Second, rank agreement is moderate (ρ ≈ 0.68)
and quadrant agreement is 65 %: a field-tier position label is a reasonable prior for
where a program sits, not a measurement of it. This is stated on every field-tier page.

**Known gaps.** Optometry (060901) and Curatorial Studies (091303) are absent from Table 3
and take their broad field. 65 of 220 field assignments are marked medium confidence with
the alternative named. Programs in the same field receive the same value — the route
cannot distinguish programs, only fields.

## 4. The crosswalk: the step Felten never needs

Felten et al. begin in O\*NET-SOC. DFVA begins in Australian job-title strings — alumni
self-descriptions and ANZSCO occupation names — and must map them onto US occupations by
hand. This is the weakest link in every route and is handled identically for measured and
estimated values: 1,325 global rows and 55 program- or field-scoped rows, each with SOC
code, confidence and rationale, produced by a propose-then-adversarially-review protocol
(one agent maps, an independent agent attempts to overturn each row against the
published list; only surviving rows are applied). Forty-seven titles are **refused** —
adjudicated as not mappable to a single SOC because candidate occupations spread more than
about ten index points with no tiebreak (e.g. "Teacher": Elementary 84.7 vs Secondary 92.0;
"University Lecturer": 67.5–97.8 across disciplines). A refused title is never guessed: it
is resolved with a program- or field-scoped row where the program's discipline or the
field list fixes the occupation, or the record/title is excluded and the exclusion recorded
on the value. Unmapped titles fail the build rather than produce a mean over the subset that
happened to map.

## 5. What the estimated figures may be used for

- **Yes:** placing a program on the plane with its basis shown; ordering programs within
  the same tier; flagging programs whose field- or cognate-grain exposure is far from the
  relevant median as candidates for collecting their own destination data.
- **With care:** comparing an estimated value with a measured one. Program-grain estimates
  (`pooled`, `combined`, `cognate`, `partial`) are on the same scale as measurements;
  field-grain values are not and must be read against their own median.
- **No:** treating any estimated value as evidence about *this program's* graduates;
  portfolio statistics that pool field-grain and program-grain values; inferring that two
  programs sharing a source record or field are alike beyond what the shared source implies.

## 6. Reproducibility

`scripts/dfva-panela-basis.ts` is the single implementation; `scripts/dfva-panela-audit.ts`
prints every program's tier, value and sources; `scripts/dfva-v4-gen.ts` emits
`V4_PANEL_A_BASIS`; `scripts/dfva-panela-coverage-check.ts` asserts in CI that the resolver
reproduces every published reference value and that no program is published without a basis.
`scripts/jsa-heo-extract.py` regenerates the field distributions deterministically from the
JSA workbook. All inputs are in the repository (`data/jir_data.json`, `data/aioe/`,
`data/jsa/`).

## 7. Limitations carried forward

- **L-A-1** Hand crosswalk; two crosswalk generations at different levels (v3 §3.3).
- **L-A-2** Borrowed distributions (`cognate`/`partial`) are untestable for the programs
  that use them.
- **L-A-3** Field grain cannot distinguish programs within a field; hold-out rank agreement
  is moderate.
- **L-A-4** Program-grain means are unweighted (no title shares); only the field tier can be
  share-weighted.
- **L-A-5** Original 2021 equal-weighted AIOE; the 2023 language-model-weighted variant
  (ρ = 0.979 with the original) is a future sensitivity column.
- **L-A-6** Inherited from Felten et al.: crowd-sourced application–ability matrix; US
  occupational definitions applied to Australian titles; a static snapshot of occupations.

## References

Felten, E., Raj, M. & Seamans, R. (2021). Occupational, industry, and geographic exposure to
artificial intelligence: A novel dataset and its potential uses. *Strategic Management
Journal*, 42(12), 2195–2217. https://doi.org/10.1002/smj.3286

Felten, E., Raj, M. & Seamans, R. (2023). How will language modelers like ChatGPT affect
occupations and industries? arXiv:2303.01157.

Jobs and Skills Australia (2025). *Higher Education Outcomes: Exploring Administrative Data —
Work and occupation* [data workbook].
https://www.jobsandskills.gov.au/publications/higher-education-outcomes-exploring-administrative-data
