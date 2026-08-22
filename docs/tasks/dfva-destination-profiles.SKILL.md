---
name: dfva-destination-profiles
description: Build inferred graduate destination profiles (JIR substitute) for Wave 1 programs that have no measured alumni record.
---

Build inferred graduate destination profiles for DFVA Wave 1 programs that have no
measured JIR alumni record, so Panel A exposure can be estimated for them.

Working directory: /Users/djmulholland/Documents/SXD-Github/DFVA

Read `docs/dfva-destination-profiles-plan.md` before the first run. The rules below are
load-bearing, not stylistic.

## What you are producing — read this first

A JIR record is **measured** (real graduates, counted). You are producing an **inferred
destination profile**. These are different claims and must never be merged.

- Write ONLY to `data/destination-profiles.json`. **Never touch `data/jir_data.json`.**
- `n` is always `null`. There is no graduate count. Never invent one.
- Every profile carries `"provenance": "inferred"` and a `confidence` grade.
- Never call these "JIR records" in code, data, output or commit messages.

## Check first — exit cheaply if there is nothing to do

```bash
cd /Users/djmulholland/Documents/SXD-Github/DFVA && python3 scripts/destination-profiles.py pending
```

If that prints `[]`, every Wave 1 program without a measured record has a profile. Reply
with one line saying so and STOP.

Otherwise take **at most the first 4 codes**. The cap is deliberate: each program is a
4-stage pipeline with an adversarial verify, so 4 programs is ~16 agents, and this task
shares a session budget with the 10-minute capture task and the 2-hourly scoring task.
Leftovers are picked up next run — `pending` recomputes from disk, so taking fewer loses
nothing.

## Method — analogy first, research second

For each program, in this order:

1. **Analogue selection.** Search the 141 measured records in `data/jir_data.json` for the
   closest cognate programs by discipline and level. A measured destination distribution
   from an adjacent program is STRONGER evidence than any careers page. Record each
   analogue with its `n` and an honest overlap grade.
2. **Field-level outcomes.** QILT GOS/GOSL in `data/qilt/` for the field of education.
   Real outcomes, but field grain and no employers — it constrains the profile, it cannot
   populate it.
3. **Deep research.** Fill gaps and actively challenge steps 1–2. Occupation-level sources
   (JSA, ABS, O*NET) rank above job ads. Job ads are demand-side, not destination — if
   used, label them as such.
4. **Adversarial verify.** A separate agent tries to REFUTE each title: is this actually
   reachable from this degree, or is it aspirational? Default to rejecting when unsure.

### Hard prohibitions

- **The UoM handbook is NOT an admissible source.** Panel C is scored from the handbook
  curriculum; inferring Panel A destinations from the same page destroys the independence
  of the two axes while looking perfectly normal. Do not read the captured extracts in
  `scrapes/v4/`. Reject any profile whose support resolves only to handbook URLs.
- **University marketing copy is promotional, not outcomes data.** "Our graduates go on to
  become…" describes ambition. It may seed a hypothesis; it may never be the sole support
  for a title.
- **Every title, employer and claim must index to a source.** Anything unsupported is
  dropped, not hedged. An invented employer name is the worst possible output here.

## Output contract

Append to `data/destination-profiles.json`, one object per program:

```json
{
  "code": "mc-comfin",
  "program": "Master of Commerce (Finance)",
  "faculty": "Business and Economics",
  "n": null,
  "provenance": "inferred",
  "method": "analogy+research",
  "confidence": "high | medium | low",
  "generated": "<today>",
  "job_titles": {
    "entry":      [{"title": "Financial Analyst", "onet_soc_code": "13-2051.00", "support": [1]}],
    "early_mid":  [],
    "mid_senior": []
  },
  "analogues": [{"program": "Master of Finance", "source": "jir", "n": 88, "overlap": "high"}],
  "employers": [{"name": "...", "support": [2]}],
  "sources": [{"n": 1, "publisher": "...", "url": "...", "date": "...", "whatItSupports": "..."}],
  "caveats": ["..."]
}
```

**`onet_soc_code` is mandatory on every title.** `scripts/dfva-v4-gen.ts` throws on any
title missing from `data/aioe/v31_extension_crosswalk.csv`. Emitting free-text titles
without SOC codes creates ~15 unmapped strings per program and blocks scoring downstream.
Emit the crosswalk row with the title, not afterwards.

Aim for roughly 15 titles per program across the three stages — that is the median of the
141 measured records. Do not pad to hit it.

## Then

```bash
python3 scripts/destination-profiles.py validate   # schema, support indices, handbook-source rejection, SOC coverage
npm --prefix scripts run dfva:check
```

If `validate` fails, fix the profile — do not weaken the validator. If `dfva:check` fails,
report the failure verbatim and do not hand-edit generated files.

## Report

One short paragraph: which programs were profiled, their confidence grades, which
analogues were used, any program where no defensible profile could be built (say so
plainly — "no profile" is a valid and useful outcome), and how many of the 116 remain.

Flag immediately if a program's profile rests on a single source, or if the only analogues
available had `low` overlap. Those are the ones a reader would most likely over-trust.
