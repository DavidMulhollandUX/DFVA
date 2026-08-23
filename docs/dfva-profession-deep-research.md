# Deep research task: profession discourse, market, and news

**Status:** plan. Only the profession resolver (`scripts/professions-of.py`) exists; the
lanes, the ledger, and `data/professions/` do not.
**Written:** 2026-08-24.
**Output feeds:** market report §2 and §3, v4 §4, and v4 §5 by way of
`reports/dfva-v4-recommend-<code>.md`.

Read [Authoring market §3, and v4 §4 and §5](dfva-report-section-authoring.md) and the
harness section on [sourced, not synthesised](dfva-v4-agent-harness.md#market-reports-discussion-signals-must-be-sourced-not-synthesised)
first. Those documents set the rules of admissibility for report prose. This plan
describes the research that produces admissible material.

---

## 1. What the task produces

The unit of research is the profession, not the program. You research an occupation once,
persist it, and join it to every program whose graduates enter it.

The join key is `onet_soc_code`, from `data/aioe/v31_extension_crosswalk.csv`. A program's
professions are its destination titles, taken from its Job Insights Report (JIR) alumni
record and mapped through the crosswalk, so `scripts/dfva-panela-basis.ts` already computes
the join.

Three results follow from the profession grain:

- Marginal cost per program falls after the first few in a discipline. Wave 1 holds 168
  programs and far fewer distinct destination occupations.
- Two programs that feed the same occupation cannot describe it differently in print.
- A correction propagates, instead of applying only to the report someone happens to
  reread.

Each run writes a record per profession to `data/professions/<soc>.json`, plus an evidence
log. Section 6 gives the full contract.

## 2. Scope of one run

Pass either one program code or one SOC code.

For a program code, resolve its professions first, then research only the ones with no
current record:

```bash
python3 scripts/professions-of.py <code>           # destination titles to SOC, or field grain
python3 scripts/professions-of.py <code> --json    # same output, machine-readable
ls data/professions/*.json                         # professions that already have a record
```

`professions-of.py` is a read-only view over `data/jir_data.json` and the two crosswalks.
Authoritative tier resolution, which covers pooling, overrides, and exclusions, stays in
`scripts/dfva-panela-basis.ts`. That file is a library rather than a command, so for a
whole-cohort view run `npx tsx scripts/dfva-panela-audit.ts [--json out.json]`.

Research at most four professions per run. Each profession is a five-lane fan-out with a
refute pass, so four professions is roughly 20 agents, and a run shares its session budget
with the capture and scoring tasks.

## 3. Evidence lanes

Each lane fails differently, so each carries its own admissibility rule. The table is
ordered by what survives scrutiny, and it extends the source ranking in the harness rather
than replacing it.

| Lane | Where to look | What it supports | What it cannot support |
| --- | --- | --- | --- |
| L1 regulatory and standards instruments | Legislation registers, regulator media releases, accreditation bodies, standard forms | What binds the occupation, with a date | Sentiment, or what the profession thinks |
| L2 scholarly and institutional studies | Consensus MCP, NBER, SSRN, OpenAthens (Business Source Complete), JSA, ABS, Productivity Commission | An effect with a size and a population | A US effect applied to Australia without saying so |
| L3 trade press and professional-body publications | Factiva through OpenAthens (`uom-library-scan`), IBISWorld AU, firecrawl search, Perplexity | Dated, attributable reporting | The primary study it summarises |
| L4 demand-side job ads | Adzuna AU (existing workflow), Seek trend pages, `last30days --hiring-signals` | Who advertises, and what they ask for | Destinations. Ads are demand; graduates are supply |
| L5 practitioner discourse | The `last30days` engine (Section 3.1), Reddit census through arctic-shift (`social-listening-voc/scripts/harvest_reddit.py`), practitioner blogs and newsletters through firecrawl | What practitioners raise unprompted, with counts | Prevalence in the profession. A forum is self-selected |

L5 is what makes this a research task rather than a prompt. Report §3 currently states
that no platform was sampled, which is true and also means the evidence closest to the
program has never been collected. A declared sample replaces that sentence and is the only
route to a §3 above medium confidence.

### 3.1 The last30days engine

[last30days-skill](https://github.com/mvanhorn/last30days-skill) is installed at
`~/.claude/skills/last30days`. It sweeps Reddit, X, YouTube, Hacker News, GitHub, and
grounded web in one pass over a window you declare, which is the shape L5 needs.

Call the engine, not the skill. The `/last30days` skill applies a strict output contract:
a mandatory badge line, five formatting laws, no section headers, and a verbatim
pass-through footer. That contract produces a brief for a human reader, and the ledger
needs items and counts. Run the script and read its JSON:

```bash
L30=~/.claude/skills/last30days/scripts/last30days.py
python3.12 $L30 --diagnose
python3.12 $L30 "construction lawyer AI contract review" \
  --plan plan.json --emit json --json-profile raw \
  --days 180 --as-of 2026-08-24 \
  --subreddits auslaw,LawFirm --save-dir raw/ --store
```

Run `--diagnose` before every research run. The following results are from 2026-08-24 on
this machine, and they are a starting position rather than a fixed state:

| Diagnostic result | What it means for a run |
| --- | --- |
| The engine requires Python 3.12 or later; the default `python3` is 3.9.6 | Call `python3.12` explicitly, or the engine exits before doing any work |
| Available sources: `reddit x youtube hackernews polymarket github grounding` | These are the L5 platforms currently reachable |
| `has_scrapecreators: false` | TikTok and Instagram are unavailable, which is different from quiet. Record it as coverage, never as a finding |
| All five LLM providers report `false` | The internal planner cannot run, so `--plan` is required and you write the plan |
| `bird_authenticated: false` | X coverage is degraded. Check `source_status` before writing anything about X |

Flags that matter here:

| Flag | Why you use it |
| --- | --- |
| `--plan` | Supplies the query plan the internal planner would otherwise generate, and makes the run reproducible |
| `--emit json --json-profile raw` | Returns items instead of prose, which is what the ledger consumes |
| `--days`, `--as-of` | Declare the window. `--as-of` lets a later run reproduce this one |
| `--subreddits`, `--dedicated-subreddits` | Scope the sweep to the occupation's real communities |
| `--corpus DIR` | Ranks committed local evidence alongside retrieved items |
| `--save-dir`, `--store` | Persist payloads to `data/professions/<soc>/raw/` |
| `--max-source-fetches 6` | The engine hangs while fetching YouTube transcripts. Run it in the background |
| `--hiring-signals` | Reads public jobs and careers postings, which belongs to L4 rather than L5 |

Read `source_status` before you write a sentence about any platform. The engine reports
`no-results` when a source ran and found nothing, and reports `partial`, `rate-limited`,
`auth-failed`, `unreachable`, `timeout`, or `skipped-unconfigured` when it did not. Only
`no-results` supports a statement that a platform was quiet. Record every other status in
`corpus.searchesReturningNothing`.

Treat engine output as leads. Each item re-enters the pipeline as a candidate claim and
passes through the refute and scope steps like any other candidate. Do not copy the
skill's synthesis into §3; that prose follows a different contract and carries none of the
scoping this task applies.

Never pass `--publish-html` or `--publish`. Both publish publicly by default, and this
task publishes nothing.

Four further constraints apply across L5:

- `old.reddit.com/*.json`, `api.reddit.com`, and WebFetch against reddit.com are blocked.
  Use arctic-shift, whose full-text search requires a subreddit or author scope.
- Most occupations hold their professional discourse somewhere other than Reddit. Expect
  practitioner blogs, professional-body newsletters, public LinkedIn articles, and podcast
  transcripts. Search for the communities that exist rather than forcing a subreddit that
  does not.
- Never report a lexicon sentiment score. State sentiment as a judgement and anchor it to
  quotes.
- Keyword coding over-captures, so recount every reported frequency against the item text.
  Record blocks and paywalls as limitations.

## 4. The claim ledger

Every lane returns claims rather than prose. You admit, scope, or drop each claim before
anything is written, and §3 and §4 are rendered from the result.

```json
{
  "id": "c07",
  "text": "AI contract-review tools are used for first-pass mark-up of standard forms",
  "lane": "L3",
  "tier": "trade-press-dated",
  "sources": [{"publisher": "…", "title": "…", "url": "…", "date": "2026-04-07",
               "whatItMeasured": "vendor adoption among AU firms >200 lawyers, n=41"}],
  "scope": "Firms above 200 lawyers. Not evidence about in-house or government counsel.",
  "disposition": "sourced | scoped | corrected | removed",
  "supersedes": null,
  "bearing": ["C3", "W2"],
  "refuted": false,
  "refuteNotes": "2 of 3 refuters failed to overturn; dissent recorded."
}
```

`disposition` uses the four outcomes the §3 authoring procedure already defines, so a
re-sourcing pass over an existing report fits this format without a second vocabulary.
`bearing` maps a claim to scored items, which is what makes the ledger usable in v4 §4
table 2 and in §5.

## 5. Procedure

1. **Resolve the professions** for the program, as in Section 2. Record the basis tier: a
   field-tier program has field-grain professions, and every claim inherits that grain.
2. **Frame the questions.** Write the five to eight questions the report needs answered,
   covering task composition, what is being automated, what is being regulated, who is
   hiring, and what practitioners complain about. An unframed sweep returns whatever ranks
   well in search.
3. **Run the five lanes in parallel**, one agent per lane, each returning claims in the
   Section 4 shape. No agent writes prose.
4. **Deduplicate and cluster** the claims into candidate themes, by claim text and source
   URL. Use code for this step rather than an agent.
5. **Refute.** Give each surviving claim three independent skeptics, each prompted to
   overturn it and each defaulting to refuted when uncertain. A claim survives when two of
   the three fail to overturn it. Where a claim can fail in more than one way, give the
   skeptics distinct lenses: whether the source is real, whether it measures this
   population, and whether it falls in the window.
6. **Scope.** For each survivor, write what it does not support. This step catches the
   error class where a finding about AI screening becomes a claim about AI interviews, and
   it costs less here than in review.
7. **Persist** the record, as in Section 6, and only then render §3 from the ledger.
8. **Verify** mechanically, as in Section 8.
9. **Report** what you found, what was refuted, and every search that returned nothing.

## 6. Output contract

```text
data/professions/<soc>.json          committed: the record below
data/professions/<soc>/evidence.md   committed: verbatim log, one short quote per source
data/professions/<soc>/raw/          gitignored: payloads, with a committed sha256 manifest
```

Commit the derived record and the evidence log. Payloads stay out of version control, and
the manifest lets you trace a claim after a raw file is gone. `CLAUDE.md` requires captured
material to land in a versioned file for this reason.

```json
{
  "onet_soc_code": "23-1011",
  "title": "Lawyers",
  "aliases": ["Construction Lawyer", "Project Legal Counsel"],
  "anzsco": "271311",
  "window": {"from": "2025-08-01", "to": "2026-08-24"},
  "generated": "2026-08-24",
  "expires": "2027-02-24",
  "programs": ["195aa"],
  "claims": [ "…Section 4 shape…" ],
  "jobAds": {"source": "adzuna-au", "query": "construction lawyer", "window": "…",
             "count": 0, "topEmployers": [], "topSkills": []},
  "corpus": {"platforms": [{"name": "reddit", "scope": "r/auslaw", "items": 0}],
             "retrieved": "2026-08-24", "searchesReturningNothing": []},
  "confidence": "high | medium | low",
  "caveats": []
}
```

Derive `confidence` rather than asserting it. A record is `high` when it carries at least
two L1 or L2 claims and a declared L5 corpus, `medium` when L3 claims lead it, and `low`
when it rests on a single lane. You can publish a `low` record with its grade stated,
because a discourse record does not feed a score the way a destination profile does.

## 7. How the output reaches the reports

| Target | What it consumes | Constraint |
| --- | --- | --- |
| Market §1 job family map | `aliases`, `jobAds.topSkills` | The skills column comes from data rather than prose |
| Market §2 job ad signals | `jobAds` | Each signal carries its query, window, and count |
| Market §3 discussion signals | Claims with a `sourced` or `scoped` disposition, grouped into themes | A declared sample replaces the no-platform-sampled sentence only when a corpus exists |
| v4 §4 market evidence | The same claims, condensed, with `bearing` filling table 2 | §4 still condenses §3, and the order is unchanged |
| v4 §5 curriculum implications | `reports/dfva-v4-recommend-<code>.md` | Options with costs, never directives |

`dfva:report-lint` is a floor rather than a target. It accepts a markdown link or a
month-and-year string, both of which this task produces anyway, and a bare citation such
as `(Journal, 2026)` still counts as zero attributions. Do not shape the research around
it.

## 8. Verification and acceptance

```text
1. every URL in the ledger resolves; record the HTTP status, and treat a 404 as invalidating the claim
2. every quotation matches the corpus after Unicode normalisation (’ ‘ “ ” cause false negatives)
3. every count is recomputed from raw data rather than estimated
4. the reference list is generated from the ledger rather than typed
5. no claim survives with zero sources or with refuted set to true
```

A run passes when every profession record validates, every claim carries a resolving URL
and a `whatItMeasured` value, the refute pass covered every survivor, and the searches that
returned nothing are listed. A run that finds little and reports that plainly is a pass.

## 9. Prohibitions

- The UoM handbook is not admissible. Panel C is scored from the handbook, so taking
  market claims from it collapses the independence of the two axes while looking ordinary.
  The same rule governs
  [destination profiles](tasks/dfva-destination-profiles.SKILL.md).
- University marketing copy is promotional. It can seed a hypothesis, and it is never the
  only support for a claim.
- Never invent an outlet, a date, or a figure to make a sentence look sourced. Removing a
  claim is an acceptable outcome; a fabricated citation is not.
- Never describe trade press that quotes a platform's data as a sample of that platform.
- Job ads are not destinations, and a survey of employers is not a claim about recruiters.
- Quote at most one short passage per source, with attribution.
- Do not create accounts, complete OAuth flows, or solve CAPTCHAs to reach a source. Ask
  instead.

## 10. Cost, caps, and freshness

- Four professions per run, at most five lane agents, and at most three refuters per
  claim. Stop at the run's budget.
- Log every cap you reach. A silent truncation reads as complete coverage.
- Records expire after six months. L1 and L2 claims age well and L3 and L5 claims do not,
  so rerunning only those two lanes refreshes a record at roughly a third of the cost.
- Apify actors bill per run, and at least one has returned `{"demo": true}` rows while
  reporting `SUCCEEDED`. Check that actor output carries real fields before trusting the
  spend.
- `last30days` is free on the sources configured here, which reach public endpoints and
  the local `gh` command. Two flags are not free: `--deep-research` bills Perplexity at
  roughly $0.90 per query, and the ScrapeCreators-backed sources need a key. Neither is
  configured, so both are opt-in. The engine defaults to a 30-day window while a profession
  record usually needs `--days 180` or more, so set the window explicitly and record it as
  `window`.

## 11. Constraints

These four are decided. The runnable form of this plan,
[dfva-profession-discourse.SKILL.md](tasks/dfva-profession-discourse.SKILL.md), carries
them as constraints; reopening one means changing both files.

1. **Storage.** Records live in `data/professions/<soc>.json`, not in
   `data/labour-evidence.json`. Readers already mistake that file for an alumni source of
   record, as `.claude/rules/gotchas.md` describes, and adding a third kind of evidence to
   it raises the chance of the next misreading.
2. **LinkedIn.** Fetch public article URLs only. Feed and post scraping is out of scope,
   because it breaches the terms of service and produces a corpus you cannot declare. A
   record whose L5 lane found only LinkedIn material has no L5 corpus, and its confidence
   grade reflects that.
3. **Factiva.** OpenAthens authentication is interactive, so Factiva is available only in
   an attended run. An unattended run proceeds without it, records the omission in
   `corpus.searchesReturningNothing`, and cannot grade an L3-led claim set as `high`.
4. **Rendering §3.** An agent renders §3 from the ledger for now. A script is the better
   end state, because it is testable and removes the last point where prose can drift from
   evidence, but writing one against a schema no program has exercised costs more than it
   returns. Revisit after four or five professions have been through the ledger.

## 12. Failure modes

| Failure | Response |
| --- | --- |
| A lane returns nothing and the run compensates by padding the others | An empty lane is a finding. Record it and lower `confidence` |
| A theme count is quoted from keyword codes | Recount against the item text |
| A US study is applied to Australia silently | `scope` is mandatory and names the population |
| Refuters agree because they share a prompt | Give each a distinct lens: source real, population fit, in window |
| A subagent dies mid-write and loses a lane | Instruct agents to write to the record file incrementally |
| Research is tuned until the lint passes | The lint runs last, against prose already rendered from an admitted ledger |
