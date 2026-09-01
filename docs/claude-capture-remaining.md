# DFVA v4 — Capture the remaining extension-cohort courses in Claude

**Status:** ready to run. This picks up the 24 courses that exist in
`scripts/v4_cohort_ext.json` (the 186-course extension cohort) but were never
merged into the active `scripts/v4_cohort.json` (34-course core). The queue
returns `idle` for them because they were never enrolled. This doc enrolls them
and captures them.

**Preconditions.**
- Working directory: `/Users/djmulholland/Documents/SXD-Github/DFVA`.
- **Google Chrome must be open** (capture drives a real Chrome tab).
- Read first: `docs/dfva-v4-agent-harness.md`, `docs/claude-capture-score.md`,
  `.agents/skills/v4-capture-routine/SKILL.md`.

## The 24 courses to capture

These are the codes `v4-capture-queue.py status` lists as `assembled: no`
that are NOT in the active cohort. All 24 are present in
`scripts/v4_cohort_ext.json` with handbook URLs.

```
572at   mc-apling   mc-arclarc   mc-biosenh   mc-cmprop   mc-cu
mc-culmc mc-desprod mc-entrpsp  mc-foodpi   mc-genohlt  mc-ibl
mc-mgmtscm mc-mti  mc-privlaw  mc-pubcom   mc-scl      mc-teachec
mc-teachpr mc-teachsa mc-thtrwri mc-tranint mc-upud    mc-ymhmo
```

(Master of Medicine, Applied Linguistics, Architectural Conservation,
Biomedical Science (Enhanced), Property, Culture and Communications,
Cultural Materials Conservation, Design and Production, Entrepreneurship,
Food and Packaging Innovation, Genetic Health, Industrial Biotechnology,
Supply Chain Management, Technological Innovation, Private Law, Public
Communication, Social Change, Teaching (Early Childhood), Teaching (Primary),
Teaching (Secondary), Theatre Writing, Transnational Law, Urban Design,
Youth Mental Health.)

## Procedure

### Step 1 — Enroll the 24 into the active cohort
The queue seeds from `scripts/v4_cohort.json` via `init`. The 24 are in
`v4_cohort_ext.json` but not the active file. Merge them:

```bash
python3 - <<'PY'
import json
core = json.load(open('scripts/v4_cohort.json'))
ext  = json.load(open('scripts/v4_cohort_ext.json'))
want = {'572at','mc-apling','mc-arclarc','mc-biosenh','mc-cmprop','mc-cu',
        'mc-culmc','mc-desprod','mc-entrpsp','mc-foodpi','mc-genohlt','mc-ibl',
        'mc-mgmtscm','mc-mti','mc-privlaw','mc-pubcom','mc-scl','mc-teachec',
        'mc-teachpr','mc-teachsa','mc-thtrwri','mc-tranint','mc-upud','mc-ymhmo'}
have = {c['code'] for c in core}
added = [e for e in ext if e['code'] in want and e['code'] not in have]
core.extend(added)
json.dump(core, open('scripts/v4_cohort.json','w'), indent=2)
print(f'added {len(added)} courses; active cohort now {len(core)}')
PY
```

### Step 2 — Re-seed the queue
```bash
python3 scripts/v4-capture-queue.py init
```
Verify they now appear: `python3 scripts/v4-capture-queue.py status` should show
the 24 as pending/assembled-no.

### Step 3 — Capture loop (per the capture routine)
For each batch until `plan` returns `idle`:
1. `python3 scripts/v4-capture-queue.py plan 2`
   - `capture`: continue. `attend`: stop, alert user (bot challenge). `idle`:
     done. `cooloff`: wait, retry later.
2. `python3 -u scripts/v4-capture-antigravity.py 2` (opens Chrome tabs).
3. `python3 scripts/v4-capture-land.py --sweep`
4. `python3 scripts/v4-capture-queue.py assemble`
5. Log heartbeat:
   `python3 scripts/llm-usage-register.py log --harness claude --model claude-sonnet-5 --job-id claude-capture --note "capture batch (remaining cohort)"`
6. Respect the 20-minute page lease and the cross-harness check
   (`python3 scripts/llm-usage-register.py status`) — Hermes/Antigravity may be
   capturing in parallel; trust `plan` for coordination.

### Step 4 — After capture, score (Stage 2 of `docs/claude-capture-score.md`)
Once a course's `scrapes/v4/<code>.txt` exists, score it per the score stage:
`Workflow({ scriptPath: "scripts/workflows/v4-score-cohort.js", args: [<codes>] })`,
exposure gate, deep research, market §3/§4/§5, `dfva:check`, commit.

### Step 5 — Commit the cohort enrollment separately
The `scripts/v4_cohort.json` change (Step 1) is a pipeline config change, not a
scored program. Commit it on its own:
```bash
git add scripts/v4_cohort.json && git commit -m "feat(v4): enroll 24 extension-cohort courses for capture"
```

## Safety
- Never run `block` unless you personally hit a challenge.
- If `plan` says `attend` (hCaptcha), stop and alert — do not retry.
- Trust `plan` for lease coordination across harnesses.

## Note
This captures only the 24 outstanding courses, not the full 186-course
extension cohort. If you later want the rest, repeat Step 1 with the remaining
`v4_cohort_ext.json` codes (excluding any already assembled or in
`v4_cohort_ext_exclusions.json`).
