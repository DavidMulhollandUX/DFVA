# AIOE data — v3 Panel A inputs

## Current basis (reconciled 2026-08-08)

v3 Panel A adopts the **Panel A reconciliation package** in `reconciliation/`
(the original saved artifacts from the revision analysis, received 2026-08-08):

- Destination titles are **JIR/LiveAlumni alumni titles at program grain** for
  all 34 placed programs (`data/jir_data.json` via `docs/JIR/dfva_jir_map.json`;
  entry + early_mid + mid_senior deduplicated, `all`-key fallback). JSA HEO is
  **not** used on this axis.
- Title → SOC-2010 → AIOE via the package's two crosswalks, values verbatim:
  `reconciliation/reconcile_C_authoritative_288_index.csv` (inherited, 288
  titles) + `reconciliation/v2_panelA_new_occupation_crosswalk.csv` (80 titles
  mapped Aug 2026). Merged: 368 titles.
- The generator (`scripts/dfva-v3-panela.ts`) validates every per-program mean
  and quadrant against `reconciliation/v2_panelA_authoritative_aioe.csv` and
  fails the build on any mismatch — headline figures: range 61.0–97.2, median
  90.9, quadrant counts 9/14/8/3, 20/34 changes vs the v2 proxy.
- Known caveat (disclosed on the report page): the two crosswalks sit at
  different levels (inherited median AIOE 92.3 vs new 77.3). Structural results
  are robust to crosswalk choice; absolute levels are not. See
  `reconciliation/README.txt`.

## v4 destination basis (2026-08-22)

v4 reports resolve Panel A through one tiered resolver, `scripts/dfva-panela-basis.ts`
(method: `docs/dfva-v4-panela-basis.md`): own record → variant parent → pooled majors →
combined components → curated cognate/partial (`panela_basis_overrides.json`) → JSA HEO
field list (`../jsa/`). Every value carries its basis. `program_scoped_crosswalk.csv`
holds (program, title) mappings for titles refused globally in `crosswalk-refused.json`.
The resolver reproduces every reference-cohort value in `v2_panelA_authoritative_aioe.csv`
exactly (guarded by `dfva-panela-coverage-check.ts`).

## Other files

- `felten_aioe.json` — 774 occupations extracted from the published Felten,
  Raj & Seamans data appendix (`AIOE_DataAppendix.xlsx`, Appendix A, retrieved
  2026-08-08 from `github.com/AIOE-Data/AIOE`). Raw z range −2.670…1.528.
  Used to validate the package's rescaling; also the index for the alternative
  JSA-based computation below.
- `occupation_crosswalk.json` — the independent 111-title crosswalk authored
  2026-08-08 for the earlier JSA-first recomputation (retained as the basis
  for any future JSA field-grain sensitivity axis; not used by the current
  generator).

## Reconciliation history

An independent recomputation (this repo, 2026-08-08, JSA HEO field-level
destinations for 28 programs + JIR titles for 6, uniform 111-title crosswalk)
reproduced the package's structural results exactly — quadrant counts 9/14/8/3,
20/34 quadrant changes, adaptiveness median 10 — while differing on absolute
level (range 63.3–95.0, median 79.7 vs 61.0–97.2, median 90.9). The package's
`README.txt` resolved the discrepancy: a different destination-title universe
(JIR alumni titles at program grain vs JSA field grain) and the hybrid
two-crosswalk levels. The package basis was adopted per recommendation R1
("adopt the revised values"); the structural agreement across two independent
bases is itself a robustness result and is cited on the report page.
