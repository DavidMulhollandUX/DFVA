# Plan — deep-research destination profiles as a JIR substitute

**Status:** plan + drafted task file. Cron NOT registered — needs the §2 sign-off first.
**Written:** 2026-08-15. Follows [the backfill plan](dfva-v4-handbook-backfill-plan.md).

**The gap:** Wave 1 is 168 programs. **53 have a real JIR record. 115 do not.** Panel A
(destination AI exposure) cannot be computed for those 115 today.

> **Counts corrected 2026-08-18.** Written as 169/116; Wave 1 is 168 since `552aa`
> (Master of Surgery, thesis-only) was removed as a research degree. 53 has held.
> `v4_cohort_ext.json` is untracked and generated, so it moves without a commit —
> re-derive from `destination-profiles.py status` rather than trusting a number here.

---

## 1. What this produces, and what it is not

A JIR record is **measured**: LiveAlumni observed real graduates of a named program and
counted them (`n`). Deep research cannot produce that. It can produce an **inferred
destination profile** — a defensible estimate of where graduates of this program go,
assembled from labour-market evidence.

Those are different claims, and the difference has to survive all the way to the page.
This repo has already shipped one wrong Panel A claim to dev.evidura.ai (2026-08-14) by
reading one alumni source as though it were another, and `conventions.md` already carries
a rule against describing one kind of source as if it were a stronger one. This plan is
exactly that failure mode with a bigger blast radius, so the guardrails are the design,
not an addendum:

1. **Never write to `data/jir_data.json`.** Output goes to a new
   `data/destination-profiles.json`. Nothing merges the two files.
2. **`n` is `null`.** There is no graduate count. A plausible-looking number here would be
   fabrication, and `jirN` already flows through `dfva-v4-gen.ts` into the report.
3. **Every profile carries `provenance: "inferred"` and a `confidence` grade**, and the
   generator must refuse to emit an exposure figure that does not carry its provenance
   forward.
4. **Report pages must label the axis as estimated.** If that cannot be done cleanly in
   the v4 template, this workstream stops until it can — an estimated exposure rendered
   identically to a measured one is the whole problem.

**Naming.** Do not call these "JIR records" anywhere in code, data or copy. They are
destination profiles. The moment they are called JIR, the distinction is gone.

---

## 2. Decisions — SETTLED 2026-08-15

1. **Inferred exposure is INTERNAL-ONLY** until the §6 hold-out validation passes. It
   does not appear on public report pages before then.
2. **`low` confidence is held**, not published — treated as no-data.
3. **Inferred exposure suppresses the position label**, the same way a partial cohort
   suppresses the median. (A widened band sized from the §6 error distribution is the
   better long-term answer; revisit once §6 produces one.)

Also settled: the capture cap for combined degrees is doubled
(`DOUBLE_DEGREE_MULTIPLIER = 2` in `scripts/v4-capture-queue.py`), applied before any of
the 12 Wave 1 double degrees had captured a page.

## 2a. BLOCKER found while building the tooling — sequencing has changed

> **Substantially RESOLVED as of 2026-08-18 — read this box before acting on the section.**
> The numbers below are as written on 2026-08-15 and are now badly stale in the
> optimistic direction. Seventeen `dfva-crosswalk-backfill` runs have taken blocking
> titles **494 → 77** and blocked programs **48 → 14**. Fully mappable holdout programs
> are **39, not 5** — comfortably past the n≥10 floor, so §6 is viable *now*. Anyone
> reading the un-annotated section would conclude the hold-out is still hopeless at n=5
> and defer it; that is the wrong call.
>
> Two corrections to the section's own logic, not just its arithmetic:
>
> - **The remaining 77 will not all clear by mapping effort.** ~6 programs
>   (`mc-teachpr`, `mc-teachsa`, `274ab`, `mc-ib`, `mc-softeng`, `mc-apling`) are blocked
>   by titles the crosswalk *cannot* resolve while it is keyed on title alone — one
>   "Teacher" row must serve both primary (Elementary 84.74) and secondary (91.99). Those
>   wait on the key carrying the program. The realistic ceiling on the 53 is ~47.
> - **The crosswalk is no longer what gates §6.** `data/destination-profiles-holdout.json`
>   does not exist: the pipeline has never been run on the holdout set, so `compare` has
>   nothing to compare. That, not mapping, is step 0 today.
>
> Derive the live split with `destination-profiles.py ready` (fully mappable) against
> `holdout` (all 53) rather than from any number written here.

The hold-out validation cannot run yet, and the reason matters more than the delay.

Of the 53 Wave 1 programs with a measured JIR record, **only 5 have a measured record
that is fully mappable to the crosswalk.** The other 48 are blocked by **494 destination
titles with no crosswalk row**, so their measured exposure cannot be computed either.

A hold-out validation on n=5 is not a validation. It cannot produce an error
distribution, and it cannot detect the directional bias that §6 exists to catch — the
`compare` command will not even warn about bias below n=10. Running it on 5 and calling
the method validated would be a worse outcome than not validating at all.

So a **crosswalk backfill becomes step 0**, ahead of both the hold-out run and the 116:

1. **Map the 494 blocking titles** → O*NET SOC → rescaled Felten AIOE, into
   `data/aioe/v31_extension_crosswalk.csv`.
2. **Hold-out validation** on the then-viable ~53 (§6).
3. **Inferred profiles** for the 116, if and only if §6 passes.

This is not a detour. Step 1 is worth doing on its own account, and arguably outranks
the rest of this document: those 48 programs have **measured** alumni destination data
sitting unused behind missing crosswalk rows. Mapping them yields real Panel A exposure
for 48 Wave 1 programs — strictly better evidence than any inferred profile. It is also a
prerequisite for scoring them at all, since `dfva-v4-gen.ts` throws on an unmapped title,
and `dfva:check` already reports 82 of 141 measured records carrying unmapped titles.

Mapping is a judgement task (which SOC does "Curatorial Assistant" belong to?), not a
lookup, so it needs an agent pass with the same adversarial verify — but it is
well-defined, checkable against 774 Felten occupations, and has no circularity risk.

---

## 3. Output contract

Shaped so Panel A can consume it unchanged, plus provenance:

```json
{
  "code": "mc-comfin",
  "program": "Master of Commerce (Finance)",
  "faculty": "Business and Economics",
  "n": null,
  "provenance": "inferred",
  "method": "analogy+research",
  "confidence": "high | medium | low",
  "generated": "2026-08-16",
  "job_titles": {
    "entry":      [{"title": "Financial Analyst", "onet_soc_code": "13-2051.00", "support": [1, 3]}],
    "early_mid":  [],
    "mid_senior": []
  },
  "analogues": [
    {"program": "Master of Finance", "source": "jir", "n": 88, "overlap": "high"}
  ],
  "employers": [{"name": "...", "support": [2]}],
  "sources": [
    {"n": 1, "publisher": "QILT GOS 2025", "url": "...", "date": "2025",
     "whatItSupports": "field-of-education employment destinations, not program-level"}
  ],
  "caveats": ["No program-level graduate destination data exists; profile is inferred from 2 cognate JIR records and field-level QILT."]
}
```

**`onet_soc_code` is mandatory on every title.** `dfva-v4-gen.ts` *throws* on any title
missing from `data/aioe/v31_extension_crosswalk.csv`, so a research pass that emits free
text titles produces ~1,740 new unmapped strings and blocks scoring. Requiring the SOC
code as part of the research output means the crosswalk row is generated alongside the
title instead of being reconstructed afterwards. This is the difference between the
workstream landing and stalling — `dfva:check` already reports 82 of 141 existing JIR
records carrying unmapped titles, including two Wave 1 programs at 15/15 and 14/15.

**`support` indexes into `sources`.** Any title, employer or claim with no support is
dropped, not softened. Employers especially: an invented employer name is the most
damaging possible output and the easiest for a model to produce fluently.

---

## 4. Method — analogy first, research second

The instinct is "search the web for where graduates go". That is the weaker half.

**We already hold 141 measured JIR records.** For most of the 116, one or more is a close
cognate: Master of Commerce (Finance) against a measured finance program, Master of
Urban Planning against measured built-environment programs. A measured destination
distribution from an adjacent program is far stronger evidence than a careers page.

So each program runs in this order:

1. **Analogue selection** — find the closest measured JIR records by discipline and
   level. Record the analogue, its `n`, and an honest overlap grade. If a strong analogue
   exists, the profile is largely inherited and confidence can be `high`.
2. **Field-level outcomes** — QILT GOS/GOSL (`data/qilt/`) for the field of education.
   Real outcomes data, but field grain, no employers. Constrains the profile; cannot
   populate it.
3. **Deep research** — fills gaps and *challenges* steps 1–2. Occupation-level sources
   (JSA, ABS, O*NET) rank above job ads; job ads are demand-side, not destination, and
   must be labelled as such if used.
4. **Adversarial check** — a second agent tries to refute the profile: is this title
   actually reachable from this degree, or is it aspirational? Titles that survive stay.

**Source ranking** follows `docs/dfva-v4-agent-harness.md`. One addition specific to
this task: **university marketing copy — including our own course pages — is a promotional
source, not an outcomes source.** "Our graduates go on to become..." is a claim about
ambition. It may seed a hypothesis; it may never be the sole support for a title.

### 4.1 The circularity ban — the deepest risk here

Panel A (exposure) and Panel C (adaptiveness) must stay independent. Panel C is scored
from the handbook curriculum. **If destination titles are inferred from that same
handbook page, Panel A stops being an independent axis** and the two-axis chart becomes
one variable plotted against itself — while looking exactly as informative as before.

So: **the handbook course page is not an admissible source for a destination profile.**
The research agent must not be given the captured extract, and any profile whose support
resolves only to handbook URLs is rejected. This is worth a hard check in the validator,
not a note in a prompt.

---

## 5. The scheduled task

**Drafted at `docs/tasks/dfva-destination-profiles.SKILL.md`** — ready to register once
§2 is signed off.

| | |
|---|---|
| Cadence | every 3 hours, offset from the other two DFVA tasks |
| Batch | 4 programs per run |
| Volume | 116 programs → 29 runs → **~4 days** |
| Collision | must not overlap `dfva-v4-handbook-capture` (10-min) or `dfva-v4-score-assembled` (2-hourly, :38) — those two have already exhausted the session limit between them |

Batch size is deliberately small. Each program is a 4-stage pipeline with an adversarial
verify, so 4 programs is ~12–16 agents per run. That is the same shape that has twice
blown the session limit at 3 programs in the scoring task, so it starts at 4 and only
moves on evidence.

Runs are idempotent and recompute from disk: a program already in
`data/destination-profiles.json` is skipped, so a dead run costs nothing but time.

---

## 6. Validation before any of this is trusted

**Hold out the 53.** Wave 1 has 53 programs with *both* a real JIR record and everything
needed to infer one. Run the pipeline blind on those 53, then compare inferred exposure
against measured exposure.

That gives a real error distribution instead of a vibe, and it is the only thing that
turns "estimated" into a number with a stated tolerance. Concretely:

- If mean absolute exposure error is small and unbiased → publish inferred exposure with
  the error band stated.
- If it is biased in one direction → say so, or do not publish. A bias that only ever
  moves scores one way is the same failure the `MAX_SUBJECTS` cap produced on 439fs:
  wrong in a consistent direction, and authoritative-looking.
- If error is large → the workstream produces internal triage only, not a published axis.

**Do this first, on the 53, before generating any of the 116.** It is ~2 days of the same
pipeline and it determines whether the other 4 days are worth spending.

---

## 7. Risks

| Risk | Mitigation |
|---|---|
| Inferred data read as measured | Separate file, `n: null`, provenance required end-to-end, never called "JIR" |
| Circularity with Panel C | Handbook inadmissible as a source; validator rejects handbook-only support |
| Fabricated employers/titles | Every claim indexed to a source; unsupported claims dropped, not hedged |
| Crosswalk blowout (~1,740 titles) | SOC code mandatory in the output contract, so rows generate with the title |
| Promotional sources | University copy is hypothesis-only, never sole support |
| Session-limit collision | 4/run, 3-hourly, offset; idempotent and resumable |
| Silent quality drift across 116 runs | Hold-out validation (§6) first; re-run a sample periodically |

---

## 8. Recommendation

Sign off §2, run the §6 hold-out validation on the 53 known-answer programs, and only
then register the cron for the 116. The validation is the deliverable that makes the rest
defensible — without it this produces 116 confident-looking numbers with no stated
accuracy, sitting on the same axis as measured ones.
