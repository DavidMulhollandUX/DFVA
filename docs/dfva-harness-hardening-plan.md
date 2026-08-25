# Harness hardening plan

**Status:** implemented, 2026-08-25. Every item below is built and verified; see
"Verification" for the evidence each guard was made to bite.
**Scope:** the v4 scoring harness (`scripts/workflows/`), its guards (`scripts/*.ts`),
the shared report page, and the project hooks.

The August 2026 evidence audit moved the corpus from 97.3% to 100% of evidence lines present
in capture, closed 17 programs that carried no verification record, and applied 17 score or
gate changes. The remediation itself is closed —
[remediation plan](dfva-v4-evidence-remediation-plan.md) carries that record.

This plan addresses the second finding: **how the bad state was reached**. Nine defect
classes reached a committed record or a published page during that work. Six of them were
prevented only by an instruction in an agent prompt, the weakest available mechanism and the
one that failed. The intended outcome, achieved: after this work none of the nine can recur
silently — each is either impossible to express, caught by a deterministic check, or reported
by a command someone actually runs.

## What the audit showed

| # | Defect | Reached | Mechanism before | Mechanism now |
| --- | --- | --- | --- | --- |
| H1 | The persist agent certified its own mechanical stamp | 7 records, live page | prompt instruction | machine-owned stamp (`--stamp`), bidirectional `--strict` |
| H2 | A verify phase reviewed a subset silently | 7 of 10 items unreviewed | prompt instruction | `VERDICT.reviewed` schema + coverage throw + persisted record |
| H3 | The writer raised a score no reviewer proposed | W2 1→2 at write-up | prompt instruction | persist returns before/after per item; raise or unproposed change throws |
| H4 | A capture belonged to another degree | mc-evalo, 34 pages | symptom check only | `check-capture-duplicates.ts`, wired into `dfva:check` |
| H5 | Completion read from agent reports, not disk | 4 interrupted batches | none | `dfva-reports-index-check.ts --status / --incomplete` |
| H6 | `wasp build` wiped the generated SDK | one local outage | documented only | PreToolUse hook refusing bare `wasp build` by name |
| H7 | Sweep counts quoted before validation | 4 wrong counts reported | none | harness-document rules (discipline, recorded as such) |
| H8 | Shared page copy asserted what the record lacked | 3 instances in one file | one test | corpus tests for gate, basis and quadrant copy |
| H9 | A report named the wrong degree in its H1 | mc-bamktg title | format-only lint | name-vs-registry comparison via shared helper |

## Design principles

1. **A rule an agent follows is weaker than a schema it cannot satisfy without following the
   rule, which is weaker than a value it is never allowed to write.** Each fix moved its
   defect at least one tier stronger. Where a fix cannot move tiers (H7 is a discipline, not
   a mechanism) it is recorded as such rather than dressed up as enforcement.
2. **Prefer a narrow reliable guard to a broad noisy one.** A guard that produces false
   alarms trains people to skip it, and consumes the attention that would have found the real
   defect. Every guard here was measured against the corpus before it shipped.

---

## H1 — Make the mechanical stamp machine-owned

The persist prompt told the agent to write `"verified": {"adversarial": true,
"mechanical": true, "date": "<today>"}`. Seven programs recorded `mechanical: true` and
failed the check; the shared page rendered the claim to readers. `mechanical` is a
deterministic property of two files the persist agent cannot establish.

Built:

1. `--stamp` on `scripts/dfva-v4-verify-evidence.ts`. It writes
   `panelCv4.verified.mechanical` from its own computed result per program and refreshes
   `date` only when the boolean changes. It never touches `adversarial`, and it never
   invents a `verified` block where none exists.
2. `--strict` fails on disagreement in BOTH directions: a false claim (claims true, lines
   unmatched) and an under-claim (stamps false while every line passes).
3. The persist prompt now prohibits writing `verified`; the guard owns that field.

Sequencing note preserved for the next cohort: the corpus does not start green after audit
demotions. Run `--stamp` once to settle under-claiming records, THEN enable bidirectional
`--strict`. The other order fails CI immediately.

## H2 — Enumerate adversarial coverage, and persist it

An ad-hoc workflow inlined `JSON.stringify(scored).slice(0, 6000)`, cutting the payload
mid-item. The reviewer saw C1–C3 only and returned a verdict that read as complete; C4, C5,
W1–W3, G1 and G2 reached the record unattacked, and one was wrong.

Built:

- `VERDICT.required += 'reviewed'`, an array over
  `['C1','C2','C3','C4','C5','W1','W2','W3','G1','G2']` with `minItems` = full length.
- After the verify stage, JavaScript throws on any missing item. A thrown stage drops the
  program to `null`, skips persist, and shows in the run's `unscored` tally — an
  incompletely reviewed program is never written.
- The generator's `V4PanelC.verified.adversarial` type is widened to
  `boolean | { reviewed: string[]; date: string }`. Legacy records keep the boolean; new
  records carry the object form naming what was attacked. `verificationState.ts` copy gains a
  coverage clause when the object form is present; both forms are truthy so nothing else
  changes.
- The 104 legacy records were deliberately NOT migrated: which items were attacked
  historically is not recoverable, and inventing a `reviewed` list to satisfy a type would be
  precisely the defect this plan exists to remove.

## H3 — Forbid the writer from raising a score

W2 moved 1→2 at write-up with no reviewer proposing it. Persist now returns per-item
before/after values; JavaScript throws if any item rises, or moves at all without a matching
entry in `verdict.demotions`. An increase needs a fresh capture and a fresh scoring pass,
not a rewrite from the same evidence.

## H4 — Detect a capture belonging to another program

mc-evalo was scored entirely against the Master of Environment: its course-structure page
was byte-identical to mc-env's, and every evidence line matched, so the verifier was silent.

`scripts/check-capture-duplicates.ts` hashes the text of each `scrapes/v4/raw/<code>__<slug>.json`
and reports hashes appearing under two program codes, excluding `subj-` pages (legitimately
shared between degrees). Measured before shipping:

| Variant | Pages compared | Shared hashes | Useful |
| --- | --- | --- | --- |
| All pages | 3,478 | 244 | no |
| Excluding `subj-` | 412 | 1 | yes — the mc-evalo defect |

Duplicates under a course / structure / component / attributes path FAIL; others are
reported without failing. Wired into `dfva:check`.

Live finding resolved as part of this item: the stale wrong-degree raw pages
(`scrapes/v4/raw/mc-evalo__structure.json` and `mc-evalo__comp-mc-env-spec-3.json`) were
deleted after confirming the aggregate `scrapes/v4/mc-evalo.txt` is clean. `raw/` is
gitignored, so the deletion is not recoverable through git.

## H5 — Answer "what is actually done" from disk

Usage limits killed four apply batches mid-run; some wrote files and reported nothing, one
left its program untouched while its return value looked complete.

`dfva-reports-index-check.ts --status` prints per code: scored (panelCv4 present),
mechanical (fresh computation, not the stored stamp), published (in `V4_PANEL_C`), and
report/recommend/market file existence. `--incomplete` prints only codes missing something,
as a JSON args list that pipes straight back into the workflow. `--status` never changes the
exit code — a status view that fails CI stops being run.

## H6 — Two hooks

In `.claude/settings.json`, scripts in `.claude/hooks/`:

1. `block-bare-wasp-build.sh` — PreToolUse(Bash). A bare `wasp build` under compass/app
   clears `.wasp/out` before failing on `emailSender: "Dummy"`, taking the generated SDK
   with it. The refusal names `wasp-build.sh` rather than just refusing.
2. `verify-evidence-on-change.sh` — PostToolUse(Edit|Write) matching
   `dfva/source/evidence/*.json`, running the verifier scoped to the changed code so a
   corpus-wide audit becomes immediate feedback while the context still exists.

## H7 — Three rules for the harness document

Added to `docs/dfva-v4-agent-harness.md` under "Batch Workflow script", recorded as
disciplines, not mechanisms: never truncate agent input; validate a sweep before quoting its
number (367→2, 109→1 class); prefer a narrow reliable guard to a broad noisy one.

## H8 — Test shared page copy against the whole corpus

`V4ReportPage.tsx` produced three instances of one class: hardcoded gate results, a
hardcoded 20-page capture profile, and an unconditional verification claim.

`compass/app/src/compass/__tests__/sharedCopyCorpus.test.ts` extends the
`verificationState.test.ts` pattern to `gateSummary`, `describeBasis`/`basisFor`/
`basisMedian`/`V4_TIER_LABELS` and `v4Quadrant`/`V4_QUADRANT_LABELS`: run each across every
key of `V4_PANEL_C` and assert the negative — a forbidden substring never appears for any
program (a failing or unrecorded gate can never render "every precondition met"; a borrowed
basis must say "an estimate").

## H9 — Assert a report names the right degree

A market report shipped titled "Master of Business Analytics" for an MBA/Master of Marketing
program; the lint checked the H1 format but never the name.

`scripts/lib-v4-names.ts` lifts the registry-name parse out of the verifier (one source:
the GENERATED `v4PanelC.ts` — not `sharedProgramData.ts`, which holds 65 entries against 104
scored programs). `check-report-format.ts` compares every market H1 against it with
normalisation (`PhD` ↔ `Doctor of Philosophy`, slash spacing, case).

Three mismatches found and fixed so the guard starts green: `526aa` ("Banking and Financial
Services Law" → "Banking and Finance Law"), plus two further real drifts surfaced by running
it over the full corpus (`872bb` dropped "(Clinical)", `mc-sciepi` was titled plain "Master
of Science").

---

## Verification performed

Each guard was validated against the defect that motivated it, not just observed passing.

```text
H1  dfva:verify-evidence --stamp      → exactly 7 files changed (192aa, 277aa, mc-chemeng,
                                        mc-civeng, mc-cm, mc-eco, mc-engysys)
    gen-v4 then --strict              → exit 0
    hand-flip mc-it mechanical:false  → exit 1, naming the disagreement; reverted → exit 0
H2  synthetic verdict listing FAKE instead of W3/G1/G2 → throws "verify:mc-it missing …"
H3  synthetic persist C2 1→2          → throws "persist:mc-it raised C2 1→2"
    demotion to a different target    → throws "changed C2 with no matching demotion"
    matching demotion                 → green path completes
H4  check-capture-duplicates          → exactly the mc-evalo wrong-degree pages, exit 1;
    delete both stale raw pages       → 3476 pages compared, 0 hits, exit 0
H9  dfva:report-lint                  → 3 real title mismatches; fixed all three; re-run green
H5  --status                          → per-code table; --incomplete lists genuinely open codes
H6  hook smoke tests                  → bare wasp build refused naming the wrapper; wrapper passes
H8  vitest sharedCopyCorpus           → 11 tests green alongside verificationState tests
```

## Deliberately not built

- **A full subject-code-to-title guard** — rejected on measurement (H7 rule 3).
- **A migration of the 104 legacy `adversarial` booleans** — the historical reviewed set is
  not recoverable and must not be invented.
- **Capture identity in `--strict`** — the failure it reports cannot be cleared by an edit,
  only by a recapture, so failing CI on it would block unrelated work.
- **A semantic check on rationale prose** — whether an argument is sound is a rater
  judgement. H2 makes the adversarial pass trustworthy instead.
