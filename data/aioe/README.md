# AIOE data — v3 Panel A inputs

## Files

- `felten_aioe.json` — 774 occupations extracted from the published Felten,
  Raj & Seamans data appendix (`AIOE_DataAppendix.xlsx`, Appendix A, retrieved
  2026-08-08 from `github.com/AIOE-Data/AIOE`). Raw z range −2.670…1.528.
  The v3 pipeline min-max rescales to 0–100 over this full population.
- `occupation_crosswalk.json` — hand-authored mapping of the 111 distinct
  destination titles (JSA HEO field-level destinations from
  `data/labour-evidence.json`, plus JIR/LiveAlumni alumni titles from
  `data/jir_data.json` for the 6 programs without a JSA field match) to
  O*NET-SOC 2010 codes. Every code is validated against `felten_aioe.json`
  by the generator; no invented codes.

Generator: `scripts/dfva-v3-panela.ts` → `compass/app/src/compass/v3/data/v3Programs.ts`.

## Open reconciliation vs the August 2026 revision note

The independent analysis session that produced `v2_panelA_revision_note.md`
computed Panel A from the same published index but its CSV deliverables
(`v2_panelA_authoritative_aioe.csv`, `v2_panelA_new_occupation_crosswalk.csv`)
were never saved locally. Comparison of this repo's recomputation against the
note's reported figures:

| Quantity | This repo | Revision note |
| --- | --- | --- |
| Quadrant counts (wp/cf/at/sh) | 9/14/8/3 | 9/14/8/3 (exact) |
| Quadrant changes vs v2 proxy | 20/34 | 20/34 (exact) |
| Adaptiveness median (34) | 10 | 10.0 (exact) |
| Exposure range | 63.3–95.0 | 61.0–97.2 |
| Exposure median | 79.7 | 90.9 |
| Doctor of Veterinary Medicine | 67.7 | 62.4 |

Sensitivity tests (2026-08-08) rule out aggregation rules as the cause:
per-stage occurrence weighting leaves the median at 79.6, and excluding
support/assistant SOC families (31-/39-/41-/43-) lifts it only to 81.4.
The level offset is therefore dominated by **per-title SOC assignment
differences** between the two crosswalks. Resolution requires the note's
crosswalk CSV; until reconciled, this repo's crosswalk is canonical and any
change to it lands as a documented revision here, never as a silent value
change.
