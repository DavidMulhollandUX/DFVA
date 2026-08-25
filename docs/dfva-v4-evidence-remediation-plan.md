# Plan: close the v4 evidence gaps

**Status:** proposed, 2026-08-25 · **Branch:** `feat/v4-global-queue`

Four gaps remain between the v4 corpus and a report page whose every claim is
backed. This plan sequences them, states what each one costs, and names the exit
condition that stops it recurring.

Run the current state at any time:

```bash
npm --prefix scripts run dfva:verify-evidence
```

## What is actually broken

`scripts/dfva-v4-verify-evidence.ts` checks every evidence line against that
program's captured handbook text in `scrapes/v4/<code>.txt`. Over 104 scored
programs and 5,315 lines: 97.3% present, 144 unmatched, 81 programs fully
confirmed.

| Gap | Size | Kind of work |
| --- | --- | --- |
| A. Unmatched evidence lines | 144 lines, 23 programs | mixed — see the split |
| B. Gate records with no evidence | 16 programs, 32 gate records | sourcing from captures on disk |
| C. Subjects cited but never captured | 2 subjects, 2 programs | capture, needs an attended run |
| D. Adversarial pass not run | 17 programs, 123 ambiguities | judgement |

**Every affected program is already fully captured** — zero pending pages across
all 23. So gaps A and B are re-reads of text already in the repository, not a
capture backlog. Only gap C needs the browser.

### The 144 unmatched lines split three ways

| Kind | Count | What it means | Can a score change? |
| --- | --- | --- | --- |
| Tail drift | 30 | the quote is right until its last clause — `mc-civeng` records "done in stages and completed as a final report" where the handbook reads "done in stages for a final submission in Week 10" | rarely |
| Paraphrase | 73 | the passage exists but was tidied — `mc-eco` records "Collaborate effectively in teams" for "collaborate and be effective in team work." | sometimes |
| No source | 41 | no near match anywhere in the capture — `mc-cm` records "critique project planning and scheduling strategies" | often |

Worst affected: `mc-civeng` (21), `mc-it` (17), `mc-spchpth` (17),
`mc-chemeng` (14), `mc-engysys` (10), `mc-gmcom` (9), `mc-mktcomm` (9).

An evidence line is what a rater chose to back a score, so replacing or
withdrawing one is a scoring decision. That is why none of this was done as a
transcription pass.

## Step 0 — build the tool that makes the rest cheap

Add `--suggest` to `dfva-v4-verify-evidence.ts`. For every unmatched line it
prints the closest passage in that program's capture, the similarity ratio and
the inferred kind, as a diff a rater can accept or reject:

```
mc-civeng C1  tail-drift  0.91
  recorded: ...done in stages and completed as a final report
  capture : ...done in stages for a final submission in Week 10
```

Without this, each of the 144 lines is a manual hunt through a 35-page capture.
With it, batches 1 and 2 become review rather than search. Build this first.

## Step 1 — capture the two missing subjects (gap C)

`ABPL90396` (`mc-cm`) and `ACCT90029` (`mc-mgmtact`) are cited as evidence and
appear in neither capture. Neither was ever **planned** for capture — they are
absent from the queue's page list, so no amount of re-running the queue finds
them. Fix the queue plan, then capture.

This runs first because `mc-cm` carries 4 no-source lines and some may resolve
once its missing subject page exists.

Needs an attended session: the handbook serves a real hCaptcha and unattended
capture cannot clear it. Pace at one page per 20–30s.

```bash
python3 scripts/build-capture-queue.py
python3 scripts/v4-capture-queue.py
```

## Step 2 — correct the tail-drift lines (30 lines)

Replace each recorded line with the capture text `--suggest` proposes. Same
passage, accurate transcription. Re-check the item score only where the
correction removes the clause the score rested on.

Exit: `dfva:verify-evidence` reports 0 tail-drift.

## Step 3 — resolve the paraphrases (73 lines)

For each, the rater decides whether the true text still evidences the score at
the recorded level. Most will hold — the passage exists and says materially the
same thing. Some will not: `mc-eco`'s "collaborate and be effective in team
work." is a learning outcome, and under design rule R2 an outcome that is never
assessed scores 1 regardless of wording.

Work program by program with the capture open, not line by line across programs.

## Step 4 — settle the no-source lines (41 lines)

The hard set. For each: find the real passage, or withdraw the line and re-score
the item without it. A withdrawal that leaves an item with no evidence must move
that item's score, or the score was never evidence-based.

Concentrate on `mc-chemeng` (8), `mc-civeng` (7), `mc-it` (7) and `mc-gmcom` (6),
which hold 68% of them.

## Step 5 — source the gate evidence (gap B, 16 programs)

All 16 carry gate **rationales** but no `evidenceLines`. Both gates are
sourceable from captures already on disk:

- **G1 Disciplinary foundation** — the compulsory core, accredited sequence or
  prerequisite chain, from the `course`, `structure` and `comp` pages.
- **G2 Decision-making under uncertainty** — assessments requiring defended
  trade-offs, from the `subj` assessment pages.

Quote the passages behind each existing rationale. Where a rationale cannot be
sourced, the gate result is wrong and must change — that is the point of the
exercise, not a side effect. A gate decides whether a rating applies at all, so
this outranks the item-level work in consequence even though it comes later.

## Step 6 — run the adversarial pass (gap D, 17 programs)

The 17 share one scoring run, so review them as a cohort against the anchors,
concentrating on the 123 recorded ambiguities. This runs **last**: steps 2 to 5
can move scores, and an adversarial review of a superseded score is wasted.

On completion set `verified.adversarial` and, once `--strict` passes,
`verified.mechanical`.

## Exit conditions

Wire each into `dfva-v4-verify-evidence.ts --strict` as it is met, so the gap
cannot reopen:

1. No record claims a verification pass it fails. **Already met and guarded** —
   `--strict` is in the `dfva:check` chain.
2. `unmatched == 0` across all scored programs.
3. Every scored program carries at least one gate evidence line per gate.
4. Every scored program carries `verified: {adversarial: true, mechanical: true}`.

Never stamp `verified` from the matcher. The field is a record of work someone
did; deriving it from the tool that checks it would make the check circular, and
the seven withdrawn claims show the existing records cannot seed it either.

## Sequencing and why

```
Step 0  tooling          ── unblocks 2,3,4
Step 1  capture (2 subj) ── unblocks part of 4        [attended]
Step 2  tail drift  (30) ── mechanical
Step 3  paraphrase  (73) ── judgement, scores may move
Step 4  no source   (41) ── judgement, scores likely move
Step 5  gate evidence    ── judgement, gates may flip
Step 6  adversarial      ── reviews the settled scores
```

Steps 2 to 5 are program-scoped and parallelisable: 25 programs in the union,
worst-case `mc-civeng` at 21 lines plus 2 gates. Step 6 is cohort-scoped and
sequential.

## Related

- [docs/dfva-v4-agent-harness.md](dfva-v4-agent-harness.md) — scoring rules,
  including design rule R2 on unassessed outcomes
- [docs/dfva-v4-capture-system.md](dfva-v4-capture-system.md) — the capture
  runbook for step 1
