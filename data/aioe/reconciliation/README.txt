# Panel A Reconciliation Package

DFVA v2 Panel A recomputed on the authoritative Felten AIOE index, with full
destination coverage and the material needed to reconcile against an independent
recomputation. Prepared August 2026.

All files are the original saved artifacts -- nothing in this package was
regenerated. No DFVA scores were modified: Panel C adaptiveness, gates and v1
scores are read unchanged from dfva/source/assessments.json. Only the measured
exposure axis is recomputed.

## Contents

  v2_panelA_authoritative_aioe.csv          (A) Drop-in replacement table.
                                            34 programs x 22 columns: exposure,
                                            adaptiveness, gates, both quadrant
                                            assignments, change flag, and
                                            provenance columns (exposure_source,
                                            index_vintage, coverage,
                                            n_newly_mapped, n_medium_conf).

  v2_panelA_new_occupation_crosswalk.csv    (B) The 80 destination titles newly
                                            mapped to O*NET-SOC 2010 to reach
                                            100% coverage. 69 high / 11 medium
                                            confidence; every SOC code validated
                                            against the published AIOE list.

  reconcile_B_crosswalk_with_programs.csv   (B+) The same 80 mappings with
                                            source_programs / n_source_programs
                                            showing which program(s) each title
                                            came from.

  reconcile_C_authoritative_288_index.csv   (C) The inherited 288-occupation
                                            index (exposure_index_authoritative.csv)
                                            with per-row rescaling validation:
                                            recomputed_from_appendix and abs_diff.
                                            278 rows carry a SOC code present in
                                            the published population; max abs
                                            deviation 0.005.

  reconcile_E_spotcheck_traces.csv          (E) Per-title traces for Doctor of
                                            Veterinary Medicine, Master of
                                            Computer Science, portfolio min
                                            (mc-clind, 60.96) and portfolio max
                                            (mc-propsyc, 97.19):
                                            title -> SOC -> rescaled AIOE ->
                                            program mean.

  v2_panelA_revised_matrix.png              Two-panel figure: revised matrix, and
                                            proxy-vs-authoritative comparison.

  v2_panelA_revision_note.md                Method, three-way cause decomposition
                                            (index change / coverage repair /
                                            threshold drift), full quadrant
                                            transition table, and five
                                            recommended methodology amendments.

  dfva-v3-recommendations.md                Twelve recommendations for the next
                                            instrument version, ordered by
                                            severity x cheapness, with a staged
                                            scope table and an appendix of every
                                            recomputed value.

## Aggregation rules (as used)

  Destination titles   JIR / LiveAlumni only (data/jir_data.json). JSA HEO was
                       NOT used for any of the 34 programs. Per program:
                       entry + early_mid + mid_senior concatenated, deduplicated
                       preserving order, falling back to the 'all' key when those
                       three are empty.

  Stage handling       A title appearing at multiple career stages counts ONCE.
                       Verified immaterial: dedup, raw occurrences, and the 'all'
                       key alone all give median 90.9, range 61.0-97.2.

  Exclusions           None. No support-role or "Research Assistant" filter.

  Coverage denominator The deduplicated title count per program
                       (DVM 12, Optometry 15, MC-CS 15).

  Aggregation          Unweighted arithmetic mean over distinct titles.
                       Destination shares NOT applied -- this is v2 limitation
                       L4, and recommendation R5 proposes fixing it.

  Index                Felten AIOE, AIOE_DataAppendix.xlsx (AIOE-Data/AIOE @ main),
                       Appendix A, n=773 parsed, raw z -2.670..1.528, min-max
                       rescaled to 0-100.

## Known provenance defect in these numbers

Exposure values draw on TWO crosswalks built at different times:

  inherited 288-occupation mapping   288 distinct titles, 399 title instances
                                     (81% of all), median AIOE 92.3
  new mappings (this session)         80 distinct titles,  87 title instances
                                     (19%), median AIOE 77.3

A recomputation that maps all 368 distinct titles uniformly will land between
these two levels. This hybrid is itself the kind of provenance defect that
recommendation R1 exists to prevent; a uniform re-mapping is arguably the better
basis for absolute levels.

Structural results appear robust to crosswalk choice -- an independent
recomputation reproduced quadrant counts (9/14/8/3), 20/34 quadrant changes and
adaptiveness median 10.0 while differing on absolute level.

The crosswalk collapses 368 distinct titles onto 106 SOC codes (3.47:1), because
seniority and specialisation words are stripped: Senior / Head / Equine /
Emergency / Small Animal Veterinarian all map to 29-1131 Veterinarians.

## Interpretation caveat

AIOE encodes task overlap with AI capability -- exposure, NOT direction of effect.
High exposure does not imply displacement. The "Attention" quadrant is a
hypothesis about where review is warranted, not a finding that those programs
face demonstrated labour-market risk. See the revision note section 4 and
recommendation R10.
