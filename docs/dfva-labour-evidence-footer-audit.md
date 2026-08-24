# LABOUR-EVIDENCE footers — audit and proposed dispositions

**Date:** 2026-08-24
**Status:** ACTIONED 2026-08-24. The proposal below was approved and carried out; §6
records what was done and how the scope grew. Sections 1–5 are kept as written for the
record, with corrections marked.
**Scope:** the `<!-- LABOUR-EVIDENCE:START/END -->` block in `reports/dfva-market-*.md`.
**Why it surfaced:** missing dollar signs (`median salary ,000`) in 16 files. The
formatting was the tell; it is not the defect.

## 1. What is actually wrong

The block is **hand-maintained by design** — `scripts/build-labour-evidence.py` says so
in its own docstring: *"Nothing injects the `<!-- LABOUR-EVIDENCE -->` block into
reports/dfva-market-*.md — that markdown is canonical and hand-maintained."* So an
authored block is not itself a violation.

The defect is that **15 of the 16 have no backing record to have been authored from**.
`data/labour-evidence.json` holds 41 programs; none of these 15 is among them. Their
footers nonetheless print a QILT full-time employment rate, a median salary, a JSA demand
grade, career-stage destination occupations *with percentage shares*, a named list of
"Adzuna AU live vacancies" employers, and an advertised salary range.

**The sixteenth is worse.** `439fs` *does* have a record, and its footer disagrees with it
on every line:

| Line | Printed in the report | `data/labour-evidence.json` |
| --- | --- | --- |
| Full-time employment | 86% | **79.3%** |
| Median salary | `,000` | **$100,000** |
| JSA occupation demand | "Moderate to High" | **RECRUITMENT_DIFFICULTY** |
| Advertised salary | `Ak–135k` | **A$73.4k–145k** |

A footer that contradicts its own source on four of four lines was not derived from it.
That settles the question for the other fifteen.

**And the shares are invented.** `195aa` prints entry destinations as *Construction
Lawyers 55%, Commercial Managers 25%, Contract Administrators 20%* under the heading
"JSA Higher Education Outcomes (ATO tax-linked administrative data, 090901)". The real
committed JSA HEO entry distribution for field `0909` (Law) is *Solicitor 37.8%, Law Clerk
6.1%, Legal Executive 2.8%, Accountant (General) 2.5%…* — different occupations, different
shares, long tail. The authored version is more flattering and reads as administrative data.

This is the failure class `conventions.md` exists to prevent, and it is on the page for
15 programs.

## 2. The good news — nearly all of it is recoverable from committed data

| Component | Committed source | Recoverable? |
| --- | --- | --- |
| Career-stage destinations + shares | `data/jsa/heo_field_destinations.json` (203 fields, real shares) | **Yes** |
| Program → ASCED field | `data/jsa/program_fields.json` | **Yes**, 15 of 16 |
| QILT employment rate + median salary | `compass/app/src/compass/marketData.ts` | **Yes**, by study area |
| Adzuna employers + advertised salary | `scratch/au-jobinsights/field_employers.json` | **No — file absent from the clone** |

## 3. Per-program disposition

Panel A tier from `npx tsx scripts/dfva-panela-audit.ts`; field from `program_fields.json`;
HEO = field present in `heo_field_destinations.json`.

| Code | Program | Tier | Field | HEO | Record | Proposed |
| --- | --- | --- | --- | --- | --- | --- |
| 038ab | Art Curatorship | exact | 0009 | ✓ | — | REGENERATE |
| 080cl | Psychology (Clinical)/PhD | partial | 090701 | ✓ | — | REGENERATE |
| 080cn | Psychology (Clin. Neuro)/PhD | partial | 090701 | ✓ | — | REGENERATE |
| 097ab | Development Studies | exact | 0903 | ✓ | — | REGENERATE |
| 175aa | Arts and Cultural Management | exact | 080399 | ✓ | — | REGENERATE |
| 192aa | International Tax | partial | 0909 | ✓ | — | REGENERATE |
| 195aa | Construction Law | exact | 0909 | ✓ | — | REGENERATE |
| 277aa | Intellectual Property Law | exact | 0909 | ✓ | — | REGENERATE |
| 305bb | Clinical Audiology | exact | 061709 | ✓ | — | REGENERATE |
| 342aa | Psychiatry | exact | 0601 | ✓ | — | REGENERATE |
| 344ab | Public Policy and Management | exact | 090103 | ✓ | — | REGENERATE |
| 706aa | Social Policy | exact | 090103 | ✓ | — | REGENERATE |
| 991aa | Biostatistics | field | 010103 | ✓ | — | REGENERATE |
| m04aa | Music Therapy | exact | 069999 | ✓ | — | REGENERATE |
| 439fs | Food Science | exact | 019905 | ✓ | **✓** | REGENERATE — **drift, see §1** |
| 244cw | Public Health | **none** | **none** | ✗ | — | **DECISION NEEDED** |

**In every case: REMOVE the "Hiring now (demand-side)" line.** No employer list in any of
these 16 can be traced — `field_employers.json` is not in the clone. Restoring it and
re-running is the only honest way to put employers back.

> **Correction (2026-08-24, after the fix ran).** That sentence is too strong. It holds for
> the 16 audited here, none of which has a record. But 27 *other* market reports carry an
> employer line whose names come from `demandEmployers` in the committed
> `data/labour-evidence.json` — traceable to a committed record, even though the upstream
> Adzuna pull is gone. Those were left untouched. Of the 18 further reports fixed in §6,
> 12 had such a record and lost a traceable employer line to the "drop everywhere"
> instruction; `build-market-footer.py` can put it back in one edit if that is preferred.

**`244cw` is the one real decision.** Master of Public Health has no `program_fields.json`
entry and does not appear in the Panel A audit at all, despite being one of the two v4
worked examples. Assign it a field (`0613` Public Health is the obvious candidate) and it
joins the REGENERATE group; otherwise its footer is unbackable and goes.

## 4. Two independent bugs found on the way

1. **`REPORT_CODES` has drifted.** `build-labour-evidence.py` derives its target list from
   `reports/dfva-*.md` minus market/recommend/cross/faculty. That glob now returns **111
   codes, 44 of them `v4-` prefixed** (`v4-038ab`, `v4-080cl`, …). Re-running the script
   today would write 44 junk keys into `data/labour-evidence.json`. Fix the filter before
   any regeneration.
2. **`scratch/au-jobinsights/` does not exist in this clone**, so the script cannot run at
   all: the 41-program file is currently **unreproducible**. Same class as the Go8
   comparison. Either the inputs come back under `data/`, or the file is frozen and
   labelled as such.

## 5. Recommended sequence

1. Fix the `REPORT_CODES` filter (bug 1). One line, blocks everything else.
2. Assign `244cw` a field, or decide its footer goes.
3. Write a small generator that emits the block from **committed** data only
   (`heo_field_destinations.json` + `program_fields.json` + `marketData.ts`), with no
   employer line. Injecting the block ends the hand-maintenance the docstring describes,
   which is what allowed the drift.
4. Regenerate all 16. Diff `439fs` first — it is the one case where a correct answer
   already exists, so it validates the generator.
5. `npm --prefix scripts run dfva:gen-content` · `dfva:report-lint` · `dfva:check`.
6. Restore `scratch/au-jobinsights/` under `data/` (bug 2) before employers return.

Do **not** simply reinstate the dollar signs. Correct formatting on an unsourced figure
makes the defect invisible, which is how it survived 16 files.

## 6. What was actually done — 2026-08-24

Approved as proposed, with one correction and a larger scope than §3 states.

**The generator.** `scripts/build-market-footer.py` regenerates the block from committed
data only — `program_fields.json` → `heo_field_destinations.json` for destinations with
real shares, and `labour-evidence.json` for QILT where a record exists. It takes codes or
`--all`, prints by default and rewrites in place with `--apply`, touching nothing outside
the two markers. No `scratch/` input, so it runs on a fresh clone.

**Scope grew from 16 to 35.** The audit's 16 were market reports matching the
stripped-currency tell at the time it was written. Re-running the same test after fixing
them found **18 more**, and two programs from the audit's own "absent from
`labour-evidence`" list — `mc-anp` and `mc-ap` — never had the currency tell and so were
missed by the §3 table entirely. Final tally:

| Set | n | Disposition |
| --- | --- | --- |
| Audited in §3 | 16 | regenerated |
| Same tell, found on re-test | 18 | regenerated |
| No tell, but no backing record | 2 (`mc-anp`, `mc-ap`) | regenerated |
| Employer line from a committed record | 27 | **left alone** — traceable |

Zero market reports now carry a stripped currency value or an untraceable employer line.

**244cw.** Assigned ASCED `0613` Public Health in `data/jsa/program_fields.json`
(confidence high; the narrow-field aggregate, not one specialisation). Panel A is
unaffected — it already resolved on its own exact JIR record, n = 562. Its absence from
**both** `scripts/v4_cohort.json` and `v4_cohort_ext.json`, despite being v4-scored and
published, is a separate gap and is **not** fixed here.

**Bug 1 — `REPORT_CODES` glob.** Fixed: the filter is now anchored
(`re.match(r'dfva-(market|recommend|v\d|cross|faculty)')`) so the v4 families cannot leak
in. 111 codes with 44 junk `v4-` keys → 67 real v1-report codes.

**Bug 2 — missing inputs.** Not fixable here; the data is not in the repository. The script
now exits with a named error listing the missing paths, says the file is frozen, and points
at `build-market-footer.py` for the report block. `data/labour-evidence.json` can still be
read; it cannot be rebuilt until `work_and_occupation.xlsx` and `program_labour_map.json`
are restored **under `data/`**.

**Verification.** `dfva:gen-content` → 321 modules. `dfva:report-lint` passes.
`dfva:check`'s five hard checks pass, including `content-check`, which was **failing before
this work** on unrelated drift. The one remaining failure is
`reports/dfva-v4-recommend-mc-doptom.md` — an untracked, half-authored file created by a
concurrent session, carrying 29 `TO BE AUTHORED` placeholders. Not touched.
