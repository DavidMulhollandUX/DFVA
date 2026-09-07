# National expansion spec

Status: active. Written 2026-09-07, after the expansion it governs had already landed.

## Why this document exists

Commits `f5023817`..`0473f135` (2026-09-07) added 2,838 `panelCv4` blocks covering eight
Australian universities besides Melbourne, taking the corpus from 221 to 3,059 scored programs.
None of those commits added a check, a document or a test, and no spec described what a
publishable national record must look like.

The records did not meet the standard the Melbourne cohort was held to. This document states the
standard, so the re-score has something to be measured against.

## What went wrong

Measured across `dfva/source/evidence/*.json`, grouped by code prefix:

| Institution | n | Mean rationale chars | Mean ambiguities | Verified |
| --- | --- | --- | --- | --- |
| Melbourne | 221 | 5,890 | 5.86 | 221 |
| La Trobe | 637 | 1,013 | 1.99 | 0 |
| UNSW | 486 | 1,041 | 1.97 | 0 |
| Monash | 383 | 1,088 | 1.98 | 0 |
| UQ | 336 | 1,022 | 1.99 | 0 |
| Adelaide | 289 | 1,037 | 2.00 | 0 |
| ANU | 283 | 1,024 | 1.92 | 0 |
| UWA | 240 | 1,021 | 2.00 | 0 |
| Sydney | 184 | 1,010 | 2.00 | 0 |

Not quite all of them: **2,827 of the 2,838 are templated, and 11 Monash programs are genuinely
scored** — the ones whose `scrapes/v4/pending/*.scored.json` files survive from a real
`v4-score-cohort.js` run before the batch templating replaced it. `monash-f2010` cites unit codes
(COL3001, COL3002, DGN1000) and quotes real handbook text, and its committed record matches its
pending file exactly. That is what the pipeline produces when it is actually run, and it is the
standard the re-score restores. An institution is still published as a unit, so Monash's 372
templated records keep it quarantined.

Four signatures of template output, each independently checkable:

1. **Rationale repetition.** 2,742 of the 2,838 records (96.6%) share one C1 rationale, opening
   `Level 3: Structured communication of complex disciplinary concepts and technical arguments to
   diverse stakeholders in <discipline>.` There are 94 distinct C1 rationales across 2,838
   programs.
2. **Uniform ambiguity counts.** Mean recorded ambiguities is 2.00 at eight independent
   institutions. Ambiguity is where the evidence straddled two levels; it does not average to the
   same value everywhere.
3. **Compressed score range.** No national record scores below 9 on adaptiveness — the exact
   value of the published Melbourne median. C1 is 3 for 2,798 of 2,838; Melbourne never scores
   C1 above 2. C4 is 3 for 2,811 of 2,838.
4. **Unsupported evidence lines.** `dfva/source/evidence/latrobe-aa003b.json` scores C1 at 3/3
   citing "Reflect critically on your own cultural attitudes, values and beliefs", an Indigenous
   perspectives outcome, and a line of course marketing. None concerns structured communication
   to stakeholders, and rubric rules R2/R4 exclude marketing prose from scoring.

The consequence at publication: `v4Quadrant` sets `highAdapt = adaptiveness >= adaptMedian`, so
all 2,838 land in the high-adaptiveness half — 1,655 "well-positioned", 1,183 "comfortable", and
**none** in "attention", the state the instrument exists to find. Melbourne, scored honestly,
puts 146 of 221 in the low-adaptiveness half.

## The publication standard

A program reaches the generated app data only when all of the following hold. The gate is
`isPublished()` in `scripts/lib-institution.ts`, which is keyed by institution, not by program:
an institution is published as a unit, once its whole cohort clears these.

1. **Capture.** A committed extract in `scrapes/v4/<code>.txt` of at least 2,000 characters,
   naming the program or carrying its code, per
   [the capture contract](handbook-capture-contract.md). Already true for all 3,059; medians run
   23–58 KB per institution against Melbourne's 69 KB, so no recapture is needed.
2. **Scoring.** Produced by `scripts/workflows/v4-score-cohort.js` — one agent per program
   against `DFVA-V4-SCORING-PROMPT.md`. No batch templating, and no scoring pass that writes
   `dfva/source/evidence/` directly; `scripts/dfva-v4-persist.ts` is the only writer.
3. **Verbatim evidence.** Every `evidenceLines` entry appears in the capture, checked by
   `dfva-v4-verify-evidence.ts --strict`. An unquotable claim is not evidence (R3).
4. **Construct fit.** Each evidence line supports the item it is filed under. Placement evidence
   scores W3, never C1 or C4; appraisal of work quality scores C2, never W2.
5. **Adversarial verification.** `panelCv4.verified` carries both an `adversarial` and a
   `mechanical` result with a date. `verifiedAt: null` may not reach `/reports` — enforced by
   `dfva-reports-index-check.ts`.
6. **Distinctness.** The cohort's rationales must vary. A cohort where one rationale covers more
   than a quarter of programs is template output and fails.
7. **Range.** The cohort's adaptiveness distribution must span below the Melbourne median. A
   cohort with no program under the median has not been discriminated.

## Placement of non-Melbourne programs

Non-Melbourne programs are placed against the **Melbourne reference cohort of 34 programs**
(`V4_META.cohortSize`, `adaptMedian` 9). This follows v3.1 §10a rule 2: extension programs are
placed against the reference thresholds and never re-base them. `dfva-reference-cohort-check.ts`
pins the reference size at 34 so the finish line cannot move.

The report page must say so on any non-Melbourne program. A reader comparing a La Trobe program
to a median is entitled to know whose median it is.

## Re-score order

Smallest institution first, each one a gate. After the first, confirm the distinctness and range
tests above before committing to the rest.

| Order | Institution | n | Median capture |
| --- | --- | --- | --- |
| 1 | Sydney | 184 | 33.1 KB |
| 2 | UWA | 240 | 57.5 KB |
| 3 | ANU | 283 | 22.8 KB |
| 4 | Adelaide | 289 | 31.7 KB |
| 5 | UQ | 336 | 44.4 KB |
| 6 | Monash | 383 | 35.5 KB |
| 7 | UNSW | 486 | 40.4 KB |
| 8 | La Trobe | 637 | 24.3 KB |

Per institution: re-score, `dfva:gen-v4`, add the slug to `PUBLISHED_INSTITUTIONS` in
`scripts/lib-institution.ts`, `dfva:check`, merge. A published institution is one that passed the
guards, not one that has been scored.

## Profession ledgers

`data/professions/*.json` has a parallel problem that gates market reports rather than scores:
80.2% of 19,692 claims are L5 practitioner discourse, only 20.1% of L5 claim texts contain a
keyword from their own profession title, and `data/professions/url-audit.json` records 3,474 of
19,438 URLs (17.9%) not resolving. `25-1071.json` ("Health Specialties Teachers,
Postsecondary", `confidence: high`) cites GitHub issues from an unrelated game app and a German
impact-economy site.

`select_claims` in `scripts/dfva-market-scaffold.py` ranks L1–L3 and falls back to L5 only when
fewer than three claims survive, so most published market reports are unaffected — but that must
be confirmed per report, not assumed.

## Related

- [Report section authoring](dfva-report-section-authoring.md)
- [Handbook capture contract](handbook-capture-contract.md)
- [v4 agent harness](dfva-v4-agent-harness.md)
- [Panel A basis](dfva-v4-panela-basis.md)
