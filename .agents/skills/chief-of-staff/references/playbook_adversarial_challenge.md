# Playbook: Adversarial Pressure-Testing & Red-Teaming

## Objective
Attack venture assumptions, detect cognitive confirmation bias, and stress-test strategic hypotheses (H0–H4) against empirical reality.

---

## Operating Procedure

### Step 1: Hypothesis Decomposition
Audit the target proposition against `docs/cos-hypothesis-ledger.md`:
1. What is the fundamental assumption?
2. What is the explicit *"We are wrong if..."* refutation trigger?
3. What is the current empirical evidence weight (e.g. customer quotes, benchmark stats, pricing signals)?

### Step 2: Adversarial Red-Team Questions
When evaluating new features, copy, or strategy, apply the four adversarial lenses:
1. **The Skeptical Dean Lens**: *"Why should our faculty trust an automated AI score when our internal accreditation panel just approved this curriculum?"*
2. **The Incumbent Fast-Follow Lens**: *"If CourseLeaf or Coursedog ships an LLM labour-market module next quarter, what remains our moat?"*
3. **The Mom-Test Lens**: *"Did the interviewee actually commit budget or time, or were they just complimenting the concept?"*
4. **The Legal / Commercialisation Lens**: *"Does this create an unresolvable IP encumbrance with the University of Melbourne?"*

### Step 3: Logging Decisions & Refutations
If an assumption is refuted or modified:
1. Update `docs/cos-hypothesis-ledger.md`.
2. Record an ADR via `python3 scripts/cos-decision.py add "Title" "Context" "Decision" "Refutation"`.
3. Propagate corrections across dependent documentation (`docs/agent-harness.md` §18).
