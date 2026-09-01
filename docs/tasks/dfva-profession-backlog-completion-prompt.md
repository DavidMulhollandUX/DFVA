# Prompt: complete real L1–L3 research for the remaining profession backlog

Not run automatically. Paste this into a Claude Code session (or use as the `prompt`
input to a Workflow run) when you're ready to execute it.

Generated 2026-08-31 from the actual repo state — regenerate the SOC list with the
command in Section 1 before using this prompt if time has passed, since another
process (the Hermes autoloop) is actively working the same backlog.

---

## The prompt

```text
DFVA PROFESSION DEEP RESEARCH — COMPLETE THE BACKLOG

Working directory: /Users/djmulholland/Documents/SXD-Github/DFVA

NO-FABRICATION CONTRACT — binding, read before producing any sourced claim.
A prior automated pass fabricated L1/L2 claims for ~231 profession records using a
template URL pattern (psc.gov.au/standards/<code>, jobsandskills.gov.au/research/<code>)
that all 404, plus a fake "Australian Journal of Professional Studies" and
"Peak Body for <occupation>" publisher name. Root cause: this machine's python3.12 has
no working default CA bundle, so real HTTPS calls silently failed and something filled
the gap with synthesis instead of reporting the failure. Full incident writeup:
docs/tasks/dfva-profession-discourse.SKILL.md, "Fabrication incident 2026-08-24".

1. A source you have not actually retrieved does not exist. Before citing a URL,
   publisher, study, or figure, you must have made a real WebSearch/WebFetch call and
   observed real content confirming it. Never construct a URL from a pattern.
2. If a genuine search attempt (2-3 phrasings) finds nothing solid, return an EMPTY
   result with the failed queries logged in corpus.searchesReturningNothing. Empty is
   a pass. Fabricated is not.
3. Never write or run a "knowledge base" dict or template generator as a substitute for
   live research. scripts/dfva-deep-research.py is exactly this failure mode — it is
   neutralised (hard sys.exit) specifically to stop this; do not resurrect the pattern
   elsewhere, and do not remove its guard.
4. Every claim you produce will be independently re-verified by
   scripts/dfva-professions-verify-urls.py, which re-fetches every URL fresh and does
   not trust your output. Run it before committing (Section 5) and drop/re-source
   anything that fails.
5. If a tool call fails (auth, network, SSL cert, rate limit), report the failure
   explicitly and degrade per the rules in docs/tasks/dfva-profession-discourse.SKILL.md
   — never silently substitute invented content.

PRECONDITIONS

1. python3.12 resolves and can make a real, cert-verified HTTPS call:
   python3.12 -c "import urllib.request; urllib.request.urlopen('https://example.com', timeout=10)"
   If it fails with CERTIFICATE_VERIFY_FAILED, export
   SSL_CERT_FILE="$(python3.12 -m certifi)" for every python3.12 invocation this run.
2. Confirm which SOCs actually still need work — the backlog moves, because the Hermes
   autoloop works it independently and concurrently with any session you run this in:
   python3.12 -c "
   import json
   from pathlib import Path
   from collections import Counter
   DATA_DIR = Path('data/professions')
   socs = sorted(p.stem for p in DATA_DIR.glob('*.json')
                 if p.stem not in ('research-queue','url-audit','factiva_backlog','linkedin_backlog'))
   needs = []
   for soc in socs:
       d = json.loads((DATA_DIR / f'{soc}.json').read_text())
       lanes = Counter(c['lane'] for c in d.get('claims', []))
       if lanes.get('L1',0) + lanes.get('L2',0) + lanes.get('L3',0) == 0:
           needs.append(soc)
   print(len(needs), needs)
   "
   Take at most 4 SOCs from that list per batch (prefer a related cluster, same SOC
   major group). Re-run this check before every batch — do not trust a list generated
   more than an hour earlier.
3. Before touching git: run `git log --oneline -5` and `git status --short`. If commits
   exist that you didn't make, or files are dirty that you didn't touch, STOP and read
   them (git show <hash>) before doing anything — another session may be mid-write on
   the same files. Never run `git add -A` or `git add .`; stage only the exact files
   you reviewed and changed this batch.

PROCEDURE (per SOC, up to 4 per batch)

Follow docs/tasks/dfva-profession-discourse.SKILL.md and
docs/dfva-profession-deep-research.md in full. Summary:

1. Frame 5-8 questions the report needs answered before searching anything.
2. Run L1 (regulatory/standards), L2 (scholarly/institutional), L3 (trade press) as
   separate real-search passes — one agent each if using a Workflow, or done directly
   with WebSearch/WebFetch if working solo. Cap at 1-2 claims per lane. Real search
   evidence (query + a snippet you actually saw) is mandatory per claim.
3. Refute: three independent skeptics per candidate claim, distinct lenses (source
   real / population fit / in-window), each defaulting to "overturned" when uncertain.
   A claim survives when at least 2 of 3 fail to overturn it.
4. L4 (job ads): real Adzuna AU fetch (ADZUNA_APP_ID / ADZUNA_API_KEY are in
   .env.server or already exported in your shell) + optional LinkedIn via
   scripts/linkedin_l4.py + scripts/linkedin_fold.py (skip + log if unavailable, never
   block). Recompute jobAds fields from the live API response, not estimates.
5. L5 (practitioner discourse): check data/professions/<soc>/raw/ first — a previous
   real last30days sweep may already sit there ungitignored-but-unfolded. If so, fold
   it with scripts/l5_fold.py rather than re-running. Otherwise:
   python3.12 scripts/l5_plan.py "<title>" --soc <soc> --days 180 --out data/professions/<soc>/raw/l5_plan.json
   python3.12 ~/.claude/skills/last30days/scripts/last30days.py "<title> AI disruption" \
     --plan data/professions/<soc>/raw/l5_plan.json --emit json --json-profile raw \
     --days 180 --as-of $(date +%F) --save-dir data/professions/<soc>/raw/ \
     --max-source-fetches 6 --no-browser-cookies
   python3.12 scripts/l5_fold.py <soc>
6. Verify ANZSCO code via a real search rather than trusting whatever placeholder is
   already on the record (many still carry the fabricated "220000" filler).
7. Write claims into data/professions/<soc>.json in the Section 4 shape from
   docs/dfva-profession-deep-research.md. Recompute `confidence` — do not carry over
   an existing value:
     high   = >=2 combined L1/L2 claims AND a declared L5 corpus
     medium = >=1 L1/L2/L3 claim
     low    = zero L1/L2/L3 claims (L4/L5 only)
   (A known bug from the 2026-08-29 strip pass left several records marked "high" with
   zero L1-L3 claims — recompute for any record you touch, and feel free to fix this
   opportunistically on records you pass through even if not your primary target.)
8. Regenerate the evidence log:
   python3.12 scripts/dfva-professions-render-evidence.py <soc> [<soc> ...]

VERIFY BEFORE COMMIT

python3.12 scripts/dfva-professions-verify-urls.py --out data/professions/url-audit.json

Scope your read of the output to the SOCs you touched this batch — the full corpus
scan can take 15-25 minutes over ~2,500 URLs; that's fine to let run in the
background, but don't block a small batch's commit on the full-corpus number. Treat
any 404 or fabrication-template match among YOUR batch's claims as blocking; drop or
re-source before committing. A 401/403/429 on a real, specific, well-known domain
(reuters.com, mdpi.com, dl.acm.org, LinkedIn, Hacker News, aph.gov.au) is typically a
bot-block, not evidence of fabrication — corroborate with a second source or a direct
curl with a browser user-agent before deciding.

COMMIT

Stage exactly the files you changed (never `-A`/`.`). One commit per batch, following
the existing convention:

  fix(professions): complete empirical L1-L5 research batch (<soc>, <soc>, <soc>, <soc>)

Update data/professions/research-queue.json status for the SOCs you completed.

REPORT

One short paragraph: which SOCs, their confidence grades, how many claims admitted vs
refuted, which lanes returned nothing, and any URL that needed a stale-link fix.
```

## 1. Regenerating the current SOC list

```bash
python3.12 -c "
import json
from pathlib import Path
from collections import Counter
DATA_DIR = Path('data/professions')
socs = sorted(p.stem for p in DATA_DIR.glob('*.json')
              if p.stem not in ('research-queue','url-audit','factiva_backlog','linkedin_backlog'))
needs = []
for soc in socs:
    d = json.loads((DATA_DIR / f'{soc}.json').read_text())
    lanes = Counter(c['lane'] for c in d.get('claims', []))
    if lanes.get('L1',0) + lanes.get('L2',0) + lanes.get('L3',0) == 0:
        needs.append(soc)
print(len(needs), needs)
"
```

As of 2026-08-31: **97 of 252 records** have zero L1/L2/L3 claims (stripped by the
Hermes autoloop's 2026-08-29 remediation pass, commit `bf0eba7c`, but not yet
re-researched). This number moves — the autoloop works the same list independently.

## 2. Notes for whoever runs this

- The Hermes autoloop (`Chief of Staff (autoloop) <cos@hermes.local>`) is already
  running against this exact backlog, on its own schedule, concurrently with anything
  you start manually. Precondition 3 above (check `git log`/`git status` before
  committing) exists because of a real incident: an autoloop commit
  (`4a6cbae`) once swept 195 dirty working-tree files into one commit via an
  unreviewed broad add, silently re-committing 14 records' worth of already-fixed
  fabrication as collateral damage. Stage narrowly.
- Running this as a Workflow (multiple SOCs, parallel lane agents, refute pass) is
  the pattern already proven to work — see the run this prompt's contract and
  procedure were extracted from (search this session's history for
  "dfva-profession-research-batch" if you want the exact script shape).
- Cost/scale note: 97 SOCs at 4 per batch is ~24 batches. At roughly 12-20 agents per
  batch (3 lanes x ~3-7 refuters), that's a substantial token spend if run all at
  once via nested Workflows — size the fan-out to the budget available, or let the
  hourly loop absorb it over ~24 hours unattended.
```
