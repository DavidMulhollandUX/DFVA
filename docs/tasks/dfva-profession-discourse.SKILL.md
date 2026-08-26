---
name: dfva-profession-discourse
description: Research one profession's market, discourse, news and job-ad signals into a persisted, refuted, source-indexed record that market §3 and v4 §4 are rendered from.
---

Research the professions that a DFVA program's graduates enter, covering market analysis,
practitioner discourse, blogs, news, and job ads, and persist the result per occupation so
later programs reuse it.

Working directory: /Users/djmulholland/Documents/SXD-Github/DFVA

Read [the plan](../dfva-profession-deep-research.md) before your first run. This file is
the procedure; the plan holds the evidence lanes (Section 3), the claim shape (Section 4),
the record contract (Section 6), and the four constraints (Section 11). Follow the plan
where this file is silent.

## What you produce

A claim ledger per profession, not prose.

- The unit is the profession, keyed by `onet_soc_code`. One record serves every program
  that feeds that occupation.
- No agent writes report prose in this task. Lanes return claims, claims are refuted and
  scoped, and rendering happens afterwards.
- A claim without a resolving URL does not exist. Dropping it is an acceptable outcome.
  Inventing an outlet, a date, or a figure to keep it is not.

## Check first, and exit cheaply

```bash
python3 scripts/professions-of.py <code>
```

The output gives the program's professions with their SOC codes at exact JIR grain, or
reports that the program resolves at field grain. At field grain the destinations come from
`data/jsa/heo_field_destinations.json` and every claim inherits field grain, so record that
on the profession record rather than researching the field as though it were the program.

When titles come back `UNMAPPED`, map them with `scripts/crosswalk-add.py`, following the
[crosswalk backfill procedure](dfva-crosswalk-backfill.SKILL.md), before you research them.
An unmapped title has no key to store a record against.

Then list the professions that already hold a record:

```bash
ls data/professions/*.json 2>/dev/null
```

Skip any record whose `expires` date is still in the future. If every profession is
current, say so in one line and stop. Otherwise take at most four professions. Each one is
a five-lane fan-out with a refute pass, roughly 20 agents, and the run shares a session
budget with the capture and scoring tasks. The next run picks up what you leave.

## Method

1. Write the five to eight questions the report needs answered for this occupation before
   you search anything. An unframed sweep returns whatever ranks well in search.
2. Run the five lanes in parallel, one agent each, all returning claims in the plan's
   Section 4 shape: L1 regulatory, L2 scholarly, L3 trade press, L4 job ads, L5
   practitioner discourse. Section 3 of the plan gives each lane's sources and the rule for
   what it cannot support.
3. Deduplicate by claim text and source URL, in code rather than with an agent.
4. Refute. Give each claim three independent skeptics with distinct lenses: whether the
   source is real, whether it measures this population, and whether it falls in the window.
   Each defaults to refuted when uncertain, and a claim survives when two of the three fail
   to overturn it.
5. Scope each survivor by writing what it does not support. This step is where a finding
   about AI screening stops becoming a claim about AI interviews.
6. Persist, then render.

### Running L5

L5 uses the [last30days engine](https://github.com/mvanhorn/last30days-skill), installed at
`~/.claude/skills/last30days`. Diagnose before every run, because what is reachable
changes:

```bash
L30=~/.claude/skills/last30days/scripts/last30days.py
python3.12 $L30 --diagnose
```

Call `python3.12`, not `python3`: the engine needs 3.12 or later and the default is 3.9.
Write the query plan yourself, since the internal planner needs an LLM key and none is
configured, then emit items rather than prose:

```bash
python3.12 $L30 "<occupation> <what you are testing>" \
  --plan plan.json --emit json --json-profile raw \
  --days 180 --as-of <today> --subreddits <real,communities> \
  --save-dir data/professions/<soc>/raw/ --max-source-fetches 6
```

Run it in the background, because it hangs while fetching YouTube transcripts. As of
2026-08-24 TikTok and Instagram are unavailable (`has_scrapecreators: false`) and X is
unauthenticated, so read `source_status` and record those as coverage gaps rather than as
evidence that a platform was quiet. `--hiring-signals` belongs to L4.

Treat the engine's items as leads. They re-enter the pipeline as candidate claims and pass
through refute and scope like everything else. Do not copy its synthesis prose into §3.

## Prohibitions

- The UoM handbook is not admissible. Panel C is scored from it, so taking market claims
  from the same source collapses the independence of the two axes. Do not read
  `scrapes/v4/`.
- University marketing copy is promotional. It can seed a hypothesis and is never the only
  support.
- Never present trade press that quotes a platform's data as a sample of that platform.
  When you do sample a platform, declare which one, the query, the window, and the item
  count.
- Fetch public LinkedIn article URLs only, with no feed or post scraping (constraint 2).
- Factiva is the L3 trade-press lane's premium source and IS available to the
  loop, but only while a Factiva/OpenAthens session is live. The session requires
  an interactive UoM SSO login, which the loop cannot perform. Use the hybrid:
  run `python3.12 scripts/factiva_reauth.py` to open Chrome, log in once, and
  export cookies to `data/factiva_cookies.json`; the loop then runs
  `python3.12 scripts/factiva_research.py --cookies data/factiva_cookies.json
  --query "<occupation> AI disruption" --from <YYYY-MM-DD> --to <today>` until the
  session expires (hours–1 day). If `factiva_research.py` reports
  `authenticated: false`, re-run `factiva_reauth.py` to refresh. Do NOT let the
  loop attempt an interactive SSO login itself. If no session is available at run
  time, proceed without Factiva and record the omission in
  `corpus.searchesReturningNothing` — but prefer refreshing the session first.
- Job ads are demand, not destinations. A survey of employers is not a claim about
  recruiters.
- Quote at most one short passage per source, with attribution.
- Never report a lexicon sentiment score. State sentiment as a judgement anchored to
  quotes.
- Do not create accounts, complete OAuth flows, or solve CAPTCHAs to reach a source. Ask
  instead.
- Never pass `--publish-html` or `--publish` to `last30days`. Both publish publicly by
  default, and this task publishes nothing.

## Output contract

```text
data/professions/<soc>.json          committed: record shape in Section 6 of the plan
data/professions/<soc>/evidence.md   committed: verbatim log, one short quote per source
data/professions/<soc>/raw/          gitignored: payloads plus a committed sha256 manifest
```

Write incrementally. A subagent that dies mid-write has already cost a full pass once.

Derive `confidence` rather than asserting it: `high` needs at least two L1 or L2 claims and
a declared L5 corpus, `medium` is led by L3 claims, and `low` rests on a single lane. A
record built without Factiva cannot be graded `high` on an L3-led claim set.

## Verify, then render

Run all five checks. This class of check has caught an invented URL and five mis-attributed
handles in earlier work.

```text
1. every URL in the ledger resolves; record the HTTP status, and treat a 404 as invalidating the claim
2. every quotation matches the corpus after Unicode normalisation (’ ‘ “ ” cause false negatives)
3. every count is recomputed from raw data rather than estimated
4. the reference list is generated from the ledger rather than typed
5. no claim survives with zero sources or with refuted set to true
```

Then render market §3 from the ledger, following
[the authoring procedure](../dfva-report-section-authoring.md): house form, the literal
`What these sources are` string, and markdown links, since a bare citation such as
`(Journal, 2026)` counts as zero attributions. When an L5 corpus exists, replace the
sentence stating that no platform was sampled with the declared sample. When it does not,
leave that sentence alone, because it is true.

```bash
npm --prefix scripts run dfva:report-lint
npm --prefix scripts run dfva:gen-content
npm --prefix scripts run dfva:check
```

The lint is a floor rather than a target. Do not shape the research around it.

## Report

Write one short paragraph covering which professions you researched, their confidence
grades, how many claims were admitted against how many were refuted, which lanes returned
nothing, and every cap you reached.

A run that finds little and reports that plainly is a pass. Flag any profession whose
record rests on a single lane, and any claim you were tempted to keep without a source.
