# Plan: close the v4 evidence gaps

**Status:** complete, 2026-08-25 · **Branch:** `feat/v4-global-queue`

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
| C. Subjects cited but never captured | 2 subjects, 2 programs | resolved — neither subject belongs to its program |
| D. Adversarial pass not run | 17 programs, 123 ambiguities | judgement |

**Every affected program is already fully captured** — zero pending pages across
all 23. So gaps A and B are re-reads of text already in the repository, not a
capture backlog. Only gap C needs the browser.

### The 144 unmatched lines split three ways

| Kind | Count | What it means | Can a score change? |
| --- | --- | --- | --- |
| Tail drift | 29 | the quote is right until its last clause — `mc-civeng` records "done in stages and completed as a final report" where the handbook reads "done in stages for a final submission in Week 10" | rarely |
| Paraphrase | 79 | the passage exists but was tidied — `mc-eco` records "Collaborate effectively in teams" for "collaborate and be effective in team work." | sometimes |
| No source | 36 | no near match anywhere in the capture — `mc-cm` records "critique project planning and scheduling strategies" | often |

Worst affected: `mc-civeng` (21), `mc-it` (17), `mc-spchpth` (17),
`mc-chemeng` (14), `mc-engysys` (10), `mc-gmcom` (9), `mc-mktcomm` (9).

An evidence line is what a rater chose to back a score, so replacing or
withdrawing one is a scoring decision. That is why none of this was done as a
transcription pass.

## Step 0 — build the tool that makes the rest cheap

**Done** — `--suggest` is on `dfva-v4-verify-evidence.ts`. For every unmatched line it
prints the closest passage in that program's capture, the similarity ratio and
the inferred kind, as a diff a rater can accept or reject:

```
mc-civeng C1  tail-drift  0.91
  recorded: ...done in stages and completed as a final report
  capture : ...done in stages for a final submission in Week 10
```

Without this, each of the 144 lines is a manual hunt through a 35-page capture.
With it, steps 2 and 3 become review rather than search.

```bash
npm --prefix scripts run dfva:verify-evidence -- --suggest --kind tail-drift
```

The kind boundaries are what separate a transcription fix from a scoring
decision, so they are set in the tool rather than judged per line: at or above
0.85 similarity to the nearest capture passage is tail drift, 0.55 to 0.85 is a
paraphrase, below that no source exists.

## Step 1 — the two missing subjects (gap C) — RESOLVED, no capture needed

`ABPL90396` (`mc-cm`) and `ACCT90029` (`mc-mgmtact`) were cited as evidence and
appeared in neither capture. Steps 2 to 5 cleared them from the evidence lines,
and checking the live handbook on 2026-08-25 showed why neither was ever
captured — capturing them was never the fix:

- **`ABPL90396` is MSD Minor Thesis Part 1**, a Melbourne School of Design
  thesis subject. `mc-cm`'s W3 rationale calls it "ABPL90396 Construction
  Internship". It is not a construction-management subject at all, which is why
  it is absent from that program's page set. `mc-urpl` cites the same code
  correctly, and it is present in `mc-urpl`'s capture.
- **`ACCT90029` does not exist.** The handbook returns 404. `mc-mgmtact`'s W3
  rationale offers it as an example of an internship or practicum elective.

Both survive only in **rationale** prose, which no guard checks. Neither
inflates a score: each supports a limiting finding — that work-integrated
learning is elective rather than compulsory — so the W3 conclusions do not
depend on the fabricated example. Correcting the prose is rater work; carried
into step 6.

## Step 2 — correct the tail-drift lines (29 lines) — DONE

Replace each recorded line with the capture text `--suggest` proposes. Same
passage, accurate transcription. Re-check the item score only where the
correction removes the clause the score rested on.

Exit: `dfva:verify-evidence` reports 0 tail-drift.

## Step 3 — resolve the paraphrases (79 lines) — DONE

For each, the rater decides whether the true text still evidences the score at
the recorded level. Most will hold — the passage exists and says materially the
same thing. Some will not: `mc-eco`'s "collaborate and be effective in team
work." is a learning outcome, and under design rule R2 an outcome that is never
assessed scores 1 regardless of wording.

Work program by program with the capture open, not line by line across programs.

## Step 4 — settle the no-source lines (36 lines) — DONE

The hard set. For each: find the real passage, or withdraw the line and re-score
the item without it. A withdrawal that leaves an item with no evidence must move
that item's score, or the score was never evidence-based.

Run `--suggest --kind no-source` first: a line whose nearest passage prints as
"no near passage in this capture" is the strongest candidate for withdrawal.

## Step 5 — source the gate evidence (gap B, 16 programs) — DONE

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
2. `unmatched == 0` across all scored programs. **Met 2026-08-25** — 5,404
   lines, 100% present, 104/104 programs confirmed.
3. Every scored program carries at least one gate evidence line per gate.
   **Met 2026-08-25.**
4. Every scored program carries `verified: {adversarial: true, mechanical: true}`.
   **Met 2026-08-25.**

5. Added after the fact: a program's own course page must name the program.
   `mc-evalo` passed checks 1 to 3 at 100% while scored on another degree — every
   line faithfully quoted from the wrong document. Reported by
   `dfva:verify-evidence`; not in `--strict`, since the failure it catches cannot
   be cleared by an edit.

6. Added after the fact: every published report block quote must be in the
   capture. The records are not the only copy — 25 report quotes had drifted from
   their corrected records. In `--strict`.

Never stamp `verified` from the matcher. The field is a record of work someone
did; deriving it from the tool that checks it would make the check circular, and
the seven withdrawn claims show the existing records cannot seed it either.

## Sequencing and why

```
Step 0  tooling     DONE ── unblocks 2,3,4
Step 1  capture     MOOT ── neither subject belongs to its program
Step 2  tail drift  DONE ── mechanical
Step 3  paraphrase  DONE ── judgement, no score moved
Step 4  no source   DONE ── judgement, no score moved
Step 5  gate evidence DONE ── judgement, no gate flipped
Step 6  adversarial DONE ── 16 demotions, one gate flip, one program re-scored
```

Steps 2 to 5 are program-scoped and parallelisable: 25 programs in the union,
worst-case `mc-civeng` at 21 lines plus 2 gates. Step 6 is cohort-scoped and
sequential.

## Related

- [docs/dfva-v4-agent-harness.md](dfva-v4-agent-harness.md) — scoring rules,
  including design rule R2 on unassessed outcomes
- [docs/dfva-v4-capture-system.md](dfva-v4-capture-system.md) — the capture
  runbook for step 1

## Carried into step 6: subject titles in rationales

The evidence lines are now all true; the **rationales** are not fully checked.
Five name a subject by a title the handbook gives to a different subject:

| Program | Rationale says | The 2026 handbook says |
| --- | --- | --- |
| `mc-civeng` C1, C4 | CVEN90044 "Sustainable Infrastructure Development" | CVEN90044 is Engineering Site Characterisation |
| `mc-civeng` C1 | CVEN90075 "Civil Engineering Management" | CVEN90075 is Transport Infrastructure Design |
| `mc-civeng` C1 | CVEN90050 "Transport Systems" | CVEN90050 is Geotechnical Engineering; Transport Systems is CVEN90048 |
| `mc-it` C1 | ELEN90095 "Internet of Things" | ELEN90095 is AI for Robotics |

Verified against the live handbook on 2026-08-25, which agrees with the captures
in every case. These were left unedited on purpose: correcting the code and
correcting the title make different claims, and choosing between them is the
rater's call. `mc-civeng` C3 also names analysis packages ("Space Gass",
"Strand7") that appear nowhere in its capture.
