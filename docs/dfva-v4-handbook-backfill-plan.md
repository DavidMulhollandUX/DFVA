# Plan — scheduled scrape for the rest of the handbook

**Status:** proposal, not started. Needs a scope decision (§2) before anything is seeded.
**Written:** 2026-08-15, off the full handbook scan in
[handbook-2026-coverage-gap.md](handbook-2026-coverage-gap.md).

---

## 1. The good news, first

The existing machinery already handles this shape of work, and the one thing that
looked like it would break does not.

**The median gate is safe.** `scripts/dfva-v4-gen.ts` derives the reference cohort by
parsing `"cohort": "reference"` out of `compass/app/src/compass/v3/data/v3Programs.ts`
— **not** from `scripts/v4_cohort.json`. There are 34 reference programs and 4 extension
programs today. Extension programs are placed against reference thresholds and never
re-base the median (v3.1 §10a rule 2). So an arbitrary number of new programs can be
captured and scored without touching the median, **provided they are added as
`extension`**.

This is also the single biggest footgun in the whole plan — see §6.1.

**The capture queue needs almost nothing.** `cmd_init` reads only `code`, `name` and
`url` from `v4_cohort.json`; the `v31` field is not used by the queue at all. Seeding
172 more programs is a data edit, not a code change.

---

## 2. Scope — the decision that has to come first

The handbook has 543 courses for 2026. 480 are live (not discontinued, not exit-only).
We cover 68. The remainder splits into tiers that are genuinely different propositions:

| Tier | What | Count | Est. pages | Recommendation |
|---|---|---:|---:|---|
| **1** | Coursework masters + bachelors, deduplicated | **172** | ~5,850 | **Do this** |
| 1b | + 19 `mr-*` Master of Philosophy | 19 | ~650 | Exclude — research degrees |
| 1c | + 10 `bh-*` honours variants | 10 | ~340 | Exclude — variants, not programs |
| 1d | + 6 redundant duplicate codes | 6 | ~200 | Exclude — same program, multiple codes |
| 1e | + 5 diplomas, 3 exec/enabling | 8 | ~270 | Optional |
| **2** | GradCert / GradDip / SpecCert / ProfCert | **197** | ~2,800 | **Defer** |

**Recommended Wave 1 = 172 programs** (156 masters + 16 bachelors).

**Capture order, decided 2026-08-18: measured-JIR-first.** Wave 1 is captured in
priority order rather than alphabetically, via
`v4-capture-queue.py prioritise` seeded from `destination-profiles.py ready`. The
priority set is the **39** holdout programs whose measured JIR record is fully
crosswalk-mappable — the only ones where capture yields a complete two-axis record
(Panel A *and* Panel C) rather than Panel C alone, and the set the §6 hold-out
validation runs on. ~1,030 pages, days rather than the weeks the full cohort needs.
Deliberately **not** the full 53: Panel A is all-or-nothing, so a holdout program with
one unmapped title yields nothing more than a Panel-C-only program would. The set grows
as the crosswalk backfill clears more; re-run both commands. The remaining 115 continue
as background fill, and `prioritise --clear` reverts.

The exclusions are judgement calls, and each is reversible:

- **19 `mr-*` MPhil codes** sit in the "Masters" bucket by name but are graduate
  *research* degrees. The v4 Panel C rubric scores taught curriculum structure; a thesis
  MPhil has almost none of what the items look for. Scoring them would produce low
  adaptiveness scores that mean "this is a research degree", not "this program is
  fragile" — a systematically misleading result.
- **`552aa` Master of Surgery — caught after seeding (2026-08-18).** The same rule as the
  `mr-*` codes, missed by the filter that applied it: its code is not `mr-*` and its name
  does not say "Philosophy", so it was seeded into Wave 1. It is a thesis-only research
  degree — candidates enrol in a thesis subject for the duration and nothing else. Its
  course-structure page carries no component or subject links, so capture completed all
  four fixed pages and then stalled permanently with nothing left to fetch. Removed from
  `scripts/v4_cohort_ext.json` (169 → 168) and from `scrapes/v4/queue.json`; `cmd_init`
  only ever adds, so the queue entry had to be deleted, not just de-listed. The four
  captured pages are left in place under `scrapes/v4/pages/552aa__*.txt`. Note this is a
  Panel C v4 scoping decision only — research degrees do carry DFVA evidence files (the
  12 `dr-phil*` codes each have one), none of which carries a `panelCv4` block.
- **10 `bh-*` honours variants** (`bh-arts`, `bh-com`, `bh-sci`…) are honours years
  attached to a base bachelor we would already be scoring. Treat as variants.
- **6 duplicate codes.** These are real and need a policy, not just a filter:
  - Master of Marketing = `294be` / `294fn` / `294pn`
  - MBA = `mc-ba218` / `mc-baol` / `mc-baptme`
  - Master of Education = `960ba` / `mc-edmo`
  - Master of Psychiatry = `342aa` / `mc-po`
  Recommend scoring the on-campus full-time code and recording the others as aliases,
  because the curriculum is the same and three separate scores for one MBA would look
  like three findings.

Tier 2 is deferred not because it is hard but because sub-degree awards are 4–8 subjects
and the Panel C items (C4/C5 especially) are built around a full program arc. They need
a rubric applicability review before they are worth capturing.

---

## 3. Volume and elapsed time

**Pages per program:** median 35, mean 33.6, range 13–42 across the 35 programs already
captured (1,177 pages). Capped by `MAX_COMPONENTS = 6` and `MAX_SUBJECTS = 16`, so ~41
is the ceiling.

**Wave 1 = 172 × 34 ≈ 5,850 pages.**

**Observed capture throughput** from the queue's own timestamps:

| Day | Pages |
|---|---:|
| 2026-08-13 | 382 |
| 2026-08-14 | 316 |
| 2026-08-15 | 479 |

Median 61 pages per *active* hour, peak 228. The whole 1,177-page cohort took ~2 days.
The capture task runs every 10 minutes (`4,14,24,34,44,54 * * * *`) asking for 30 pages,
so the cadence is not the binding constraint — the ~20–30s pacing floor and session
limits are.

| Assumption | Rate | Wave 1 elapsed |
|---|---:|---:|
| Observed daily average | ~390/day | **~15 days** |
| Sustained 61/active hour, ~16h/day | ~975/day | **~6 days** |
| Theoretical (144 runs × 30) | 4,320/day | not achievable — pacing floor |

**Plan for 1–2 weeks of capture.** Do not tighten the cron to chase the optimistic end;
the pacing rule is what keeps site access.

**Scoring is roughly balanced with capture, not free.** `dfva-v4-score-assembled` runs
every 2 hours and takes at most 3 programs, so 36/day is the ceiling and 172 programs
needs ≥5 days of perfect runs. The task file already records that 3-per-run has twice
exhausted the session limit mid-run. Realistically scoring trails capture by about a
week, and total wall-clock for Wave 1 is **~3 weeks**.

---

## 4. Panel A is the real coverage gap, not the handbook

Handbook capture only feeds **Panel C** (adaptiveness). A complete v4 report page needs
Panel A (destination AI exposure) too, and that comes from `data/jir_data.json` — 141
alumni records keyed by **program name**, not code.

Of the 207 missing degree programs, **60 have a JIR record by exact name match; 147 do
not.** So roughly 70% of Wave 1 can only produce a Panel C score.

This needs a decision alongside §2, and it is not a scraping problem:

- **Option A** — capture and score Panel C for all 172, publish adaptiveness only, mark
  exposure as unavailable. Honest, and the report template already withholds labels when
  data is missing.
- **Option B** — restrict Wave 1 to the ~60 with JIR records, produce complete two-axis
  reports, and treat the rest as a separate Panel A sourcing problem.

Recommend **A**, because Panel C coverage is what the migration cycle is for, and a
one-axis report is still useful — but it must be labelled as one-axis, not quietly shown
with a blank half.

Either way, expect crosswalk work: the gotchas file records that 82 of 141 existing JIR
records already carry destination titles missing from
`data/aioe/v31_extension_crosswalk.csv`. New programs will add more. Map titles
**before** scoring, not after — `npx tsx scripts/dfva-panela-coverage-check.ts` catches
this and is already wired into `dfva:check`.

---

## 5. Implementation steps

Nothing here is started. In order:

1. **Decide §2 scope and §4 Panel A option.** Everything downstream depends on both.
2. **Write the Wave 1 cohort file.** New `scripts/v4_cohort_ext.json` (do not overwrite
   `v4_cohort.json` — it is the reference-cohort record) with `{code, name, url}` per
   program, generated from `data/handbook-2026-gap.json`.
3. **Teach `cmd_init` to read both files**, or run it twice. A three-line change; keep
   the two cohorts as separate files so the reference set stays auditable.
4. **Add the 172 to `v3Programs.ts` as `"cohort": "extension"`.** Never `reference`
   (§6.1).
5. **Seed and sanity-check:** `python3 scripts/v4-capture-queue.py init` then `status`.
   Expect ~516 new pending pages immediately (3 fixed pages × 172); the subject and
   component pages only enter the queue as each `course-structure` page is captured.
6. **Let the existing capture task drain it.** No new scheduled task is needed —
   `dfva-v4-handbook-capture` already loops on whatever the queue holds, every 10
   minutes. This is the cheapest part of the plan: it is already running and currently
   no-ops.
7. **Raise the scoring cap only if the session limit allows.** Leave at 3 initially and
   watch for mid-run failures before touching it.
8. **Run `dfva:gen-v4` + `dfva:check`** after each scoring batch, as today.

Step 6 is worth restating: **"a scheduled scrape" is already built and running.** The
work is scoping and seeding, not scheduling.

---

## 6. Risks

### 6.1 The median gate — highest severity

If new programs are added to `v3Programs.ts` as `"cohort": "reference"`, the gate in
`dfva-v4-gen.ts` requires *every* reference program to carry a v4 score before the median
publishes. The reference cohort is currently 34, of which 33 are scored and `mc-surged`
is the last one outstanding. Adding 172 unscored programs as `reference` would move the
finish line from **one program away** to 173 programs away, and the 244CW position label
— the thing this whole cycle is meant to unlock — would silently stay hidden for weeks.

Mitigation: add as `extension`, and assert it. Worth a guard in `dfva:check` that fails
if the reference cohort size ever changes from 34 without an explicit methodology note.

### 6.2 Site access

The handbook already refuses Crawl4AI. Access is held by behaving like a reader at
~1 page per 20–30s. Wave 1 is 5× the request volume of everything captured so far, over
a longer window. Do not parallelise, do not raise the batch size, and keep the existing
"blocked page → stop the batch immediately" rule. If access is lost mid-wave the queue is
resumable, but recovery is not guaranteed.

Note the full handbook scan of 2026-08-15 (~90 requests) also hit this host. Space large
one-off scans away from capture windows.

### 6.3 Silent truncation

`MAX_SUBJECTS = 16` already cost a real error once — 439fs hit the cap before two of its
four capstone routes were captured, which depresses C4/C5 for a reason about the capture
rather than the curriculum. Larger programs (double masters like `mc-archup`,
`mc-cmprop`) will hit this more often. Before Wave 1, either raise the cap for
double-degree codes or record cap-hit as a flag on the extract so scorers can see it.

### 6.4 Cost

~5,850 page captures in subagents plus ~172 scoring runs at 3 agents each, with
adversarial verification per level-3 score. This is the largest single spend in the
project so far. Worth a budget check before seeding, and worth sequencing Wave 1 in
sub-batches (say 40 programs) so it can be stopped after the first batch if the
per-program cost is higher than expected.

### 6.5 `data/all_course_codes.json` is stale

It lists 6 codes (`gd-spmed`, `gda-bltenv`, `pr-anamgt`, `pr-iap`, `sc-dhw`, `sc-gclaw`)
with no evidence file and no report. It is not a reliable coverage source; use evidence
files plus reports. Either fix it or delete it before it is used to seed anything.

---

## 7. What I recommend

Do Wave 1 at 172 programs, Panel C only, seeded in sub-batches of ~40, on the existing
schedule with no cadence change. Fix `MAX_SUBJECTS` for double degrees and add the
reference-cohort guard first — both are small and both prevent errors that are invisible
in the output. Defer the 197 sub-degree awards until the rubric applicability question is
answered.

Expect ~3 weeks wall-clock and treat the first 40-program batch as the cost probe.
