# DFVA v4.1 Agent Harness — Panel C report generation

**Status:** ready to run — the [v4 recommendation](dfva-panelc-v4-recommendation.md)'s
§7 decisions 1–2 were taken 2026-08-13 (adopted as working draft; IRR targets v4), and the
[v4.1 recommendation](dfva-panelc-v41-recommendation.md) added the workplace-practice
sub-scale on 2026-08-14. Output remains *draft* artifacts: nothing renders on the site
until the migration cycle is published (§4 of the v4 recommendation forbids silent
re-positioning).

**What v4.1 changed for the harness.** Panel C now carries **two sub-scales scored in one
pass**: C1–C5 adaptive capabilities (/15) and W1–W3 workplace practice (/9). Every stage
below handles eight ordinal items, not five. Three specific consequences:

1. The scoring schema requires `W1`–`W3` and `workplace`; a run that returns only C-items
   is a failed run, not a partial one — the two sub-scales are scored from the same extract
   in the same pass, so splitting them would double the handbook reading for nothing.
2. **`workplace` is never summed with `adaptiveness`.** No agent, template or page emits a
   combined `/24` as a headline figure.
3. The verifier gained a construct-boundary check (stage 3), because v4.1's anti-overlap
   edits only bind if something enforces them. Placement evidence must score in W3 and
   nowhere else; appraisal of quality in C2 and not W2.

**Re-scoring, never back-filling.** A program scored under `4.0-draft` has no W score and
none may be inferred from its C scores — it goes through the pipeline again from stage 2.
`V4_META.workplaceScored` tracks that coverage separately from `scored`, and the report
page states the absence rather than rendering empty rows.

**Instrument single source:** `dfva/source/rubricV4.ts` →
`npm --prefix scripts run dfva:gen-v4` →

| Generated artifact | Role |
| --- | --- |
| `dfva/dist/v4/DFVA-V4-SCORING-PROMPT.md` | The scoring agent's full prompt: both sub-scales' anchors, R1–R4 rules, the one-construct-one-home rule, gates, output JSON contract, numbered references |
| `dfva/dist/v4/DFVA-V4-RECOMMEND-PROMPT.md` | The recommender agent's prompt: derives an improvement plan from the verified `panelCv4` block + the market report, anchor-referenced and market-warranted |
| `dfva/dist/v4/report-template-v4.md` | Canonical report template for the site (`reports/dfva-v4-<code>.md` family), with literature references and per-section epistemic-status tags |
| `dfva/dist/v4/recommend-template-v4.md` | Canonical improvement-plan template (`reports/dfva-v4-recommend-<code>.md` family): score-to-action map, market alignment, P-lever table, gate guardrails, explicit score deltas |
| `compass/app/src/compass/v4/data/{v4Rubric,v4PanelC}.ts` | App data modules for the `/insights/v4/:code` page |

**Citations must work on the web.** Inline marks in report markdown use the
linked form `[[n]](url)` wherever the source has a URL (plain `[n]` otherwise,
resolving to the REFERENCES list that ends every file); the native page renders
every mark through the `Cite` component (tooltip + source link). A dead `[n]`
fails lint rule 3 of the recommend family.

Never hand-edit the dist files; edit `rubricV4.ts` and regenerate — the same
discipline `dfva:gen` enforces for v1.

---

## Pipeline (per program)

```text
handbook URL ─┐
              ├─ 1 SCRAPE    Crawl4AI → course page + core-unit pages (text extract)
program code ─┘
              2 SCORE        agent follows DFVA-V4-SCORING-PROMPT.md → panelCv4 JSON
                             (C1-C5 + W1-W3 in ONE pass, from the same extract)
              3 VERIFY       adversarial pass: refute every level-3 and every gate PASS;
                             mechanical pass: every evidenceLine greps verbatim in the scrape;
                             boundary pass: no evidence line scores in two items
              4 PERSIST      dfva/source/evidence/<code>.json gains the panelCv4 block
              4a EXPOSURE    resolver gives Panel A on a stated basis (exact → variant → pooled →
                             combined → cognate/partial → field); dfva:gen-v4 emits it with the label.
                             No basis / unmapped title = fix the DATA (skill: dfva-panela-scoring)
              5 REPORT       draft reports/dfva-v4-<code>.md per report-template-v4.md
              6 RECOMMEND    draft reports/dfva-v4-recommend-<code>.md per DFVA-V4-RECOMMEND-PROMPT.md
                             (inputs: the verified panelCv4 block + reports/dfva-market-<code>.md)
              7 LINT         both v4 families in check-report-format.ts (wired)
```

Stage rules:

- **1 SCRAPE** — `PYTHONPATH="" bash ~/.hermes/scripts/crawl4ai_scrape.sh "<url>"`.
  Score only from the scrape (prompt rule); same handbook vintage for every
  program in a cycle (recommendation §4.2).
- **2 SCORE** — the prompt enforces R1 (declarative evidence), R2 (level 3 needs
  *assessment* evidence; outcomes-only caps at 1), R3 (verbatim evidence lines),
  **R4** (authenticity scored from documented task features, never from the words
  "authentic", "real-world" or "industry-relevant"), ambiguity-resolves-down, and
  never emits an Irreplaceability score. Both sub-scales are scored in this one pass.
- **3 VERIFY** — three independent checks. *Adversarial:* a second agent, given only
  the scrape and the anchors, tries to refute each level-3 score and each gate
  PASS; a refuted claim drops a level and the disagreement is logged in
  `ambiguities`. *Mechanical:* every `evidenceLines` entry must appear verbatim
  in the scrape text — an unquotable line fails the run, mirroring the
  build-fails-on-unmapped-title rule in the Panel A extension protocol.
  *Boundary (new in v4.1):* the anti-overlap edits are only real if something
  enforces them, so the verifier checks that no evidence line is doing work in two
  items and records the result in `ambiguities` as an explicit construct-boundary
  note. The three pairs to check are the ones v4.1 separated:

  | Evidence | Scores in | Must NOT also score in |
  | --- | --- | --- |
  | placement / practicum / WIL | W3 | C1 (coordination), C4 (transfer) |
  | appraisal of the quality of work | C2 | W2 (task fidelity) |
  | group work | C1 | W1 (communication to audiences) |

  A same-evidence dependency across items is not automatically an error — MPH's three
  W scores all turn on one fact about its capstone routes — but it must be *stated*,
  because it means those items are not independent observations and the IRR analysis
  cannot treat them as such.
- **4 PERSIST** — the `panelCv4` block *extends* the existing evidence file; the
  v1 `byDimension` block stays untouched (both instruments coexist through the
  migration, as v2/v3/v3.1 do today).
- **4a EXPOSURE** — run `cd scripts && npx tsx dfva-panela-audit.ts | grep <code>`.
  The program must resolve to a tier with 0 unmapped titles before REPORT; if it does
  not, follow `docs/tasks/dfva-panela-scoring.SKILL.md` (override entry, field
  assignment, or crosswalk rows via the backfill skill with adversarial review). The
  scoring agent never writes an exposure figure; the page labels the basis from
  `V4_PANEL_A_BASIS`. What the estimated tiers mean and may be used for:
  `docs/dfva-panela-estimated-basis-methods.md`.
- **5 REPORT** — Panel A exposure, position and stability figures come from the
  generators (`dfva:gen-v4` for the v4 cohort; `dfva-v3-panela.ts` / `dfva-v31-panela.ts`
  machinery for the reference cohort), never from the scoring agent. Position renders only per the v3.1 §5.2
  stability rules, against medians re-based in the published v4 cycle.
- **6 LINT** — the six rules at the foot of `report-template-v4.md`, including:
  every scorecard row cites a reference number, section 5 opens with the
  mandatory interpretation sentence, and no v1 composite or Irreplaceability
  score appears anywhere.

## The panelCv4 evidence contract

Written into `dfva/source/evidence/<code>.json` (shape defined in the scoring
prompt's output section):

```json
{
  "panelCv4": {
    "instrument": "4.1-draft",
    "C1": { "score": 2, "rationale": "…", "evidenceLines": ["…"] },
    "C2": { "score": 1, "rationale": "…", "evidenceLines": ["…"] },
    "C3": { "score": 2, "rationale": "…", "evidenceLines": ["…"] },
    "C4": { "score": 1, "rationale": "…", "evidenceLines": ["…"] },
    "C5": { "score": 2, "rationale": "…", "evidenceLines": ["…"] },
    "adaptiveness": 8,
    "W1": { "score": 2, "rationale": "…", "evidenceLines": ["…"] },
    "W2": { "score": 2, "rationale": "…", "evidenceLines": ["…"] },
    "W3": { "score": 2, "rationale": "…", "evidenceLines": ["…"] },
    "workplace": 6,
    "gates": {
      "G1": { "result": "PASS", "rationale": "…", "evidenceLines": ["…"] },
      "G2": { "result": "PASS", "rationale": "…", "evidenceLines": ["…"] }
    },
    "ambiguities": [],
    "notScoreable": [],
    "verified": { "adversarial": true, "mechanical": true, "date": "YYYY-MM-DD" }
  }
}
```

`adaptiveness` is the sum of C1–C5 only and `workplace` the sum of W1–W3 only. There is
no field for their total, deliberately: the shape of the record is what stops a combined
figure being computed by habit somewhere downstream. `instrument` records which version
scored the block, so a `4.0-draft` record is identifiable as needing a re-run rather than
mistaken for a program that scored zero on workplace practice.

At least one `ambiguities` entry should be a construct-boundary note naming what was
considered under two items and where it was scored (stage 3's boundary pass). A block with
an empty `ambiguities` array on a program with any placement, capstone-route choice or
peer-assessment structure has almost certainly not had that check run.

## Batch Workflow script

> **Capture serially, score in parallel.** The handbook rate-limits by IP, and a
> fast run trips a site-wide block ("Pardon Our Interruption") that persists for
> a long time and takes the whole cohort down with it — this happened on
> 2026-08-13 at ~0.4s spacing. A workflow that pipelines scrape→score per
> program runs ~10 concurrent scrapers and re-trips the block immediately, so
> **capture is not part of the workflow.** Capture with
> `scripts/scrape-v4-cohort.py` (serial, 3s paced, waits out blocks, resumable),
> then fan out scoring from the extracts on disk. The scoring workflow performs
> no network access at all.

The reusable scoring workflow is [`scripts/workflows/v4-score-cohort.js`](../scripts/workflows/v4-score-cohort.js).
Scout the work-list inline first, then pass only captured programs:

```bash
ls scrapes/v4/*.txt | xargs -n1 basename | sed 's/.txt//'
```

`Workflow({scriptPath: "scripts/workflows/v4-score-cohort.js", args: [<codes>]})`
— one chain per program (score → adversarially verify → persist), no barriers.
The scoring prompt is read from dist at run time, so the workflow never embeds a
copy of the rubric.

The single-program pipeline below remains the reference for the full per-program
flow including report drafting.

```js
export const meta = {
  name: 'dfva-v4-score',
  description: 'Score programs on Panel C v4 and draft v4 reports (draft artifacts only)',
  phases: [
    { title: 'Scrape', detail: 'Crawl4AI handbook extract per program' },
    { title: 'Score', detail: 'Panel C v4 scoring per DFVA-V4-SCORING-PROMPT.md' },
    { title: 'Verify', detail: 'adversarial refutation + verbatim evidence check' },
    { title: 'Draft', detail: 'evidence block + v4 report draft' },
  ],
}
const codes = args
if (!Array.isArray(codes) || codes.length === 0) throw new Error('args must be a non-empty array of program codes')

const ITEM = { type: 'object', required: ['score', 'rationale', 'evidenceLines'],
  properties: { score: { type: 'integer', minimum: 0, maximum: 3 }, rationale: { type: 'string' },
    evidenceLines: { type: 'array', items: { type: 'string' } } } }
const GATE = { type: 'object', required: ['result', 'rationale', 'evidenceLines'],
  properties: { result: { enum: ['PASS', 'FAIL'] }, rationale: { type: 'string' },
    evidenceLines: { type: 'array', items: { type: 'string' } } } }
// Both sub-scales are REQUIRED. A response carrying only C-items is a failed run.
const SCORE_SCHEMA = { type: 'object', required: ['code', 'panelCv4'],
  properties: { code: { type: 'string' },
    panelCv4: { type: 'object',
      required: ['C1','C2','C3','C4','C5','adaptiveness','W1','W2','W3','workplace','gates'],
      properties: { C1: ITEM, C2: ITEM, C3: ITEM, C4: ITEM, C5: ITEM,
        adaptiveness: { type: 'integer', minimum: 0, maximum: 15 },
        W1: ITEM, W2: ITEM, W3: ITEM,
        workplace: { type: 'integer', minimum: 0, maximum: 9 },
        gates: { type: 'object', required: ['G1','G2'], properties: { G1: GATE, G2: GATE } },
        ambiguities: { type: 'array', items: { type: 'string' } },
        notScoreable: { type: 'array', items: { type: 'string' } } } } } }
const VERDICT = { type: 'object', required: ['upheld', 'demotions'],
  properties: { upheld: { type: 'boolean' },
    demotions: { type: 'array', items: { type: 'object', required: ['item', 'to', 'why'],
      properties: { item: { type: 'string' }, to: { type: 'integer' }, why: { type: 'string' } } } } } }

const results = await pipeline(
  codes,
  (code) => agent(
    `Scrape the University of Melbourne handbook for program code ${code} using: ` +
    `PYTHONPATH="" bash ~/.hermes/scripts/crawl4ai_scrape.sh "<course url>" (find the URL from ` +
    `compass/app/src/compass/sharedProgramData.ts handbookUrl, or handbook.unimelb.edu.au search). ` +
    `Also scrape each CORE unit page linked from the course structure. Save the combined text ` +
    `extract to scrapes/v4/${code}.txt and return the absolute path plus a one-line coverage note.`,
    { label: `scrape:${code}`, phase: 'Scrape' }),
  (scrapeResult, code) => agent(
    `Read dfva/dist/v4/DFVA-V4-SCORING-PROMPT.md and follow it EXACTLY to score program ` +
    `${code} from the handbook extract described here: ${scrapeResult}. Read the extract file. ` +
    `Return the JSON contract the prompt specifies.`,
    { label: `score:${code}`, phase: 'Score', schema: SCORE_SCHEMA }),
  (scored, code) => agent(
    `Adversarially verify this Panel C v4.1 scoring for ${code}: ${JSON.stringify(scored.panelCv4)}. ` +
    `Read the anchors in dfva/dist/v4/DFVA-V4-SCORING-PROMPT.md and the extract at scrapes/v4/${code}.txt. ` +
    `Try to REFUTE every level-3 score across BOTH sub-scales (does quoted ASSESSMENT evidence really ` +
    `exist?) and every gate PASS. Also verify each evidenceLines entry appears verbatim in the extract; ` +
    `a missing line demotes that item to the highest level its remaining evidence supports. ` +
    `Then run the construct-boundary check: no evidence line may do work in two items. Placement ` +
    `evidence scores in W3 and must not also be carrying C1 or C4; appraisal of quality scores in C2 ` +
    `and must not also be carrying W2; group work scores in C1 and must not also be carrying W1. ` +
    `Report any shared-evidence dependency as a boundary note even where the scores are defensible.`,
    { label: `verify:${code}`, phase: 'Verify', schema: VERDICT })
    .then((v) => ({ scored, verdict: v })),
  (r, code) => agent(
    `Apply these verified Panel C v4.1 results for ${code}: ${JSON.stringify(r)}. ` +
    `(1) Apply any demotions and recompute adaptiveness (C1..C5) and workplace (W1..W3) ` +
    `separately. Never write their total anywhere. ` +
    `(2) Merge the panelCv4 block (with a "verified" stamp) into dfva/source/evidence/${code}.json, ` +
    `preserving the existing v1 byDimension content. ` +
    `(3) Draft reports/dfva-v4-${code}.md following dfva/dist/v4/report-template-v4.md exactly — ` +
    `including the Basis: tags, the mandatory section-5 opening sentence, scorecard reference ` +
    `numbers, and the verbatim REFERENCES list. Leave POSITION's exposure/stability figures as ` +
    `"pending v4 cycle" placeholders unless v3 Panel A data exists for this code. ` +
    `Return {code, adaptiveness, gates, reportPath}.`,
    { label: `draft:${code}`, phase: 'Draft',
      schema: { type: 'object', required: ['code', 'adaptiveness', 'workplace', 'reportPath'],
        properties: { code: { type: 'string' }, adaptiveness: { type: 'integer' },
          workplace: { type: 'integer' },
          gates: { type: 'object' }, reportPath: { type: 'string' } } } }),
  (draft, code) => agent(
    `Read dfva/dist/v4/DFVA-V4-RECOMMEND-PROMPT.md and follow it EXACTLY to write the ` +
    `improvement plan for ${code}. Inputs: the verified panelCv4 block in ` +
    `dfva/source/evidence/${code}.json and reports/dfva-market-${code}.md. Write ` +
    `reports/dfva-v4-recommend-${code}.md per dfva/dist/v4/recommend-template-v4.md — every ` +
    `intervention targets a named item's NEXT anchor level and cites a named market signal; ` +
    `inline citations use the web-linked [[n]](url) form. Then run ` +
    `"npm --prefix scripts run dfva:report-lint" and fix any v4-recommend errors. ` +
    `Return {code, levers, recommendPath}.`,
    { label: `recommend:${code}`, phase: 'Draft',
      schema: { type: 'object', required: ['code', 'recommendPath'],
        properties: { code: { type: 'string' }, levers: { type: 'integer' },
          recommendPath: { type: 'string' } } } })
    .then((r) => ({ ...draft, recommend: r })),
)
return { drafted: results.filter(Boolean) }
```

## Market reports: discussion signals must be sourced, not synthesised

A market report's §3 CURRENT DISCUSSION SIGNALS is the section most easily written from
general knowledge and passed off as observation — it reads like reporting whether or not
anyone reported anything. Two rules, enforced by `dfva:report-lint` (which runs in CI):

1. **Declare the sources.** §3 opens with what it rests on — trade press, named
   commentary, reported survey data, academic work — and says whether any platform was
   sampled directly.
2. **Attribute each theme.** Outlet, commentator or study, with a date where the source
   carries one. Three attributions minimum across the section, and **every `### Theme`
   heading must carry at least one of its own** — the lint checks per theme, because a
   section can clear the global minimum while its most quotable theme rests on nothing.
   That exact case shipped to dev on 2026-08-14: MC-MGMTHRE's theme 2 (the ~14%
   shortlist-overlap figure) carried zero attributions while themes 1, 3 and 4 covered
   the count.
3. **Scope the claim to what the source measured.** A survey about AI *screening* does
   not support a sentence about AI *interviews*; a figure about employers does not
   support one about recruiters. When attributing after the fact, adjust the claim to
   the evidence, not the evidence to the claim.

**The distinction that matters most.** "Sourced from LinkedIn" and "a named outlet
reported LinkedIn's data" are different claims, and in practice only the second is true.
Write the second. If you did sample a platform, say which, over what window, and how many
items — the lint asks for exactly that when it sees a sampling claim.

Ranked by what survives scrutiny, best first:

| Source type | Example from MC-MGMTHRE §3 | Why it ranks here |
| --- | --- | --- |
| Named regulatory instrument | WHS Amendment (Digital Work Systems) Act 2026 | Dated, checkable, binding — belongs in §2 |
| Academic study with an effect size | Exeter RCT, n > 3,000: one-way AI interviews cut application continuation >50% | An effect, not an opinion |
| Dated trade-press item | HR Brew, 7 April 2026, on AI pre-screening under volume | Attributable and datable |
| Named commentator with affiliation | Ramak Salamat (RVP JAPAC, Staffbase), HRD Australia, 28 May 2026 | A person who can be quoted and checked |
| Survey figure reported second-hand | LinkedIn/Robert Half/Greenhouse percentages via trade press | Indicative; say it is second-hand |
| Unattributed "industry commentary suggests…" | — | Fails the lint, and should |

Legacy market reports (66 of them) predate this rule and are grandfathered in
`check-report-format.ts`; they warn rather than fail. Remove a slug from
`MARKET_GRANDFATHERED` once its §3 complies — the lint prints which are ready.

## The insights page is shared: copy must survive the next program

`V4ReportPage.tsx` renders every v4 program, present and future. A live-page review
(2026-08-14) found four defect classes that all trace to one habit: writing page copy
that was true for the program in front of you. Each shipped to dev; each is cheap to
avoid at write time and embarrassing to find in review.

| Class | What shipped | The rule |
| --- | --- | --- |
| Discipline-specific copy in shared components | "crosswalks to the CEPH, WHO-ASPHER and AMIA competency frameworks" — public-health frameworks, rendered on an HR program's page | Shared copy is program-agnostic or explicitly multi-discipline. Anything naming a discipline, framework, employer, or accreditor belongs in per-program report markdown or data, never in the shared component. |
| Hardcoded counts and ranges | "prioritised P1–P6" (this program has P7); "0 of 5 items" (v4.1 scores 8) | Derive every count, range, and version string from data: `{allScores.length}`, `{V4_INSTRUMENT}`. If a literal number in shared JSX describes the data, it is a bug waiting for the next program. |
| Asymmetric sub-scale treatment | Adaptiveness carried a ±1 uncertainty band and a ceiling callout; the workplace sub-score carried neither | The two sub-scales get identical epistemic furniture. Any caveat, band, or callout added to one is added to the other in the same edit. |
| Colliding numbering systems | A "Priority" column ranked 1–8 by gap size beside P1–P7 levers sequenced by effort — same-looking numbers, different orderings | If a report carries two orderings, name them differently ("Gap rank" vs "P-lever") and say in one line that they do not correspond. |
| Unconditional links to per-program artifacts | "Full v4 report (markdown)" linked to `/reports/dfva-v4-<code>` for all 20 v4-scored programs when only 3 have a markdown report — 17 dead links | Gate every per-program link on existence (`hasReportContent(slug)`, `hasMarketReport`). A link is a claim that the target exists. |

The generalisation: before adding copy or a literal to the shared page, ask "is this a
fact about *the instrument* or about *this program*?" Instrument facts may be shared
(and should be imported from `rubricV4.ts`, not retyped); program facts come from the
per-program data or stay in the report markdown.

## Panel A for a program outside the v3 registry

A program can be scored on Panel C without being in the assessed portfolio. Exposure is
instrument-independent, so it is still computable — but **not** through the v3 Panel A
generator, which places a program against the reference medians on both axes and so needs
a v2/v3.1 adaptiveness score the program has never had. `dfva:gen-v4` computes it instead,
by the identical procedure (destination titles → SOC-2010 → published Felten index → min–max
rescale), and carries it on the v4 record with its **basis**.

Since 2026-08-22 every coursework program in the cohort resolves to a basis
(`scripts/dfva-panela-basis.ts`; method and Felten justification in
`docs/dfva-v4-panela-basis.md`; step-by-step for an LLM: `docs/tasks/dfva-panela-scoring.SKILL.md`): own JIR record (`exact`) → variant parent (`variant`) →
pooled major records (`pooled`) → double-degree components (`combined`) → curated borrow
from a related program (`cognate` / `partial`, `data/aioe/panela_basis_overrides.json`) →
JSA HEO field-of-education list (`field`, `data/jsa/`). The report page names the tier; a
borrowed or field-grain value is drawn as a dashed ring, never a filled point, and
field-tier programs are placed against `V4_META.expMedianField`, never 90.9. **"No
exposure" is no longer a legitimate published state for a coursework program** — if the
generator reports one, the fix is a basis entry, not page copy.

Three traps sit on this path. All are silent, all only ever make a program look *less*
evidenced than it is, and all are caught by `scripts/dfva-panela-coverage-check.ts`
(wired into `dfva:check`):

| Trap | What it looks like | The rule |
| --- | --- | --- |
| Wrong source | Program absent from `data/labour-evidence.json` (41 programs) reads as "no alumni record" | `data/jir_data.json` (141 records) is the source of record. labour-evidence is an enrichment layer and is **not** evidence of absence. |
| Unmapped titles | Record found, but destination titles are missing from the crosswalk | Map into `data/aioe/v31_extension_crosswalk.csv` via `scripts/crosswalk-add.py` (procedure: `docs/tasks/dfva-crosswalk-backfill.SKILL.md`) before scoring. The resolver throws rather than averaging a subset. |
| Refused titles | A record carries a title adjudicated unmappable (`data/aioe/crosswalk-refused.json`, e.g. bare "Teacher") and can never clear globally | Add a **program-scoped** row (`crosswalk-add.py` with `"program_scope"`) where the program's discipline fixes the occupation; otherwise the record is set aside on multi-record tiers (`excludedSources`) or the program falls to the next tier. Never force a global mapping. |

The first two fired on MC-MGMTHRE (2026-08-14) and a wrong "no alumni destination record
exists" claim reached the dev site before either was noticed. The check reproduces all three,
and additionally asserts that the resolver reproduces every published reference-cohort value.

## Worked examples

Two reports are maintained as the reference output of this harness, chosen because they
score **identically on adaptiveness and four points apart on workplace practice** — which
is the whole case for the v4.1 sub-scale, in two files:

| Report | Program | A /15 | W /9 |
| --- | --- | --- | --- |
| [`reports/dfva-v4-244cw.md`](../reports/dfva-v4-244cw.md) | Master of Public Health | 9 | 6 |
| [`reports/dfva-v4-mc-cs.md`](../reports/dfva-v4-mc-cs.md) | Master of Computer Science | 9 | 2 |

Under v4.0 these two programs were indistinguishable on the scored axis. Read them as a
pair when checking a new run's output: MPH is the case where all three W items turn on one
structural fact (capstone-route choice), and MC-CS is the case where the W sub-scale reads
near-floor while adaptiveness reads mid-range — the two shapes a rater is most likely to
get wrong.

## W3 and in-practice cohorts: the v4.2 amendment

v4.1's W3 anchors presumed a **pre-professional cohort placed into a host workplace** — the
level-2/3 clauses named placement, practitioner supervision and accountability to a host.
That presumption fails for mid-career cohorts who are already practising, where the
workplace is the student's own practice and no host, placement or supervisor exists to be
documented. The failure was not that such a program scored low; it was that **W3 stopped
discriminating** — levels 0 and 2 were excluded by the evidence, level 1's exemplars
(*elective, optional, unassessed*) fit its opposite, and the strongest available in-practice
evidence (core, assessed, real recipients, measured outcome) landed on the same score as an
unassessed elective. Like the Panel A traps above, the error had a direction: it only ever
made such a program look *less* evidenced than it is.

**v4.2 repairs this in the anchors themselves.** W3 levels 2–3 now carry an explicit
in-practice route — grounded in the work-based-learning literature (Lester & Costley 2010),
which recognises assessed learning in the student's own employment as an established
higher-education mode. The construct is unchanged: for a cohort documented as already
practising, community-of-practice membership already exists, so the item scores the
program's documented **use** of that practice rather than its acquisition:

| Level | In-practice route (placement route unchanged) |
| --- | --- |
| 2 | A core unit assesses activity conducted in the student's own professional practice, with real recipients and a documented outcome measure — but short or standing alone |
| 3 | A **required sequence** of assessed own-practice activity with structured reflection and documented accountability to workplace stakeholders (trainees, patients, clients or employer) |

Scoring notes for this route:

- **The cohort must be documented as practising in the extract** (entry requirements,
  cohort description) — never assumed from the program's title.
- One-construct-one-home still binds: the authentic-artefact spine homed in W2 does not
  also score here. W3 takes the participation evidence, W2 the artefact evidence.
- The amendment is **additive**: the placement route is word-for-word unchanged, so every
  v4.1 score taken on that route carries forward without re-scoring. Records keep the
  instrument label of the run that produced them (`4.1-draft` or `4.2-draft`); the
  generator accepts both within the 8-item family.
- Amending W3 touches only the workplace sub-scale. The published adaptiveness median is
  computed over C1–C5 and is untouched, as are position labels.

Worked example — **MC-SURGED** (Master of Surgical Education). Under v4.1 it scored W3 = 1
as the lower live reading of anchors that fit at neither 0, 1 nor 2 (scored 2026-08-15; the
misfit is preserved in that run's `ambiguities`). MEDS90007 requires participants to
design, deliver and reflect on their own teaching in workplace-based activity, with a
measure of outcome for the real trainees receiving it; the program is delivered online,
places nobody, and names no supervisor or host anywhere in the extract; the cohort are
practising surgeons. Under v4.2's in-practice route this evidence is scorable as itself.

**Cohort audit (2026-08-16):** all 36 scored records were reviewed for the same misfit when
the route was introduced; mc-surged is the only re-score. Three negative examples fix the
route's boundaries. **MC-ED** fails the cohort gate — the handbook serves "current educators
*as well as* those who are interested in" education, a mixed cohort, and its capstone
inquiry is "related to their own professional practice **and/or** within their area of
specialisation", making own-practice optional even there. **MC-TESOL** fails it decisively
(the two-year stream is "designed for people with little or no prior education
qualifications or experience"). **MC-INTEDIB** is the instructive near-miss: the cohort gate
*passes* ("a specialist degree for teachers and administrators working at all levels of
education") but the activity condition fails — the compulsory subjects assess critical
readings, presentations and essays, and the capstone is explicitly desk-based on a prior
project's data, so no core unit assesses activity conducted in anyone's classroom. Both
conditions are required; a practising cohort with a desk-based curriculum scores exactly as
before.

A residual construct question is deliberately left open for the IRR study: whether
consequentiality (real recipient, real outcome) and external accountability structure
(supervision, host judgement) should become **separate items** — they decouple in this
population, and the argument for reporting decoupled things separately is the same one that
justifies the C/W split. That is a structural change (W max moves), so it waits for
inter-rater evidence rather than one program's.

## Guards & open wiring (in dependency order)

1. **Now enforced by the prompt/template:** R1–R4, ambiguity-down, one-construct-one-home,
   no Irreplaceability, reference-numbered scorecard, epistemic-status tags, both sub-scale
   subtotals with no combined total.
   **Enforced in CI since 2026-08-23 (`dfva-panela-coverage-check.ts`):** every v4-scored
   coursework program carries an exposure on a stated basis; the generated value and tier
   equal the resolver's; the reference cohort reproduces its published v3 values; every
   ANZSCO title in a field list in use is mapped or refused; field-tier programs are never
   published without `expMedianField`.
2. **To wire when v4 is adopted (§7 yes):**
   - v4 family in `check-report-format.ts` (lint rules are already written at the
     foot of the template);
   - `panelCv4` awareness in `check-course-completeness.ts`;
   - medians + migration table generator (extend `dfva-v31-panela.ts` machinery —
     the 3⁵ enumeration transfers unchanged);
   - ~~site surface~~ **built 2026-08-13**: `V4ReportPage` at `/insights/v4/:code`
     reuses the v3.1 display grammar (Part A/B/C, expandable rated items, mini
     matrix with a neutral dot and v3.1 reference medians drawn for context
     only). Data: `dfva:gen-v4` now also emits
     `compass/app/src/compass/v4/data/{v4Rubric,v4PanelC}.ts` from
     `rubricV4.ts` + the evidence files' `panelCv4` blocks.
3. **Deliberately not built:** anything that re-bases the published v3.1 medians
   or renders a v4 position on the site — that is the published migration cycle,
   a decision, not a script.

## After scoring: socialising the report

A scored report is not the end of the pipeline — the first thing that happens to it is a
session with subject-matter experts and curriculum staff, whose purpose is to **correct**
it. That pack (facilitator's guide + Evidura-branded deck + the link back) has its own
harness: [socialisation harness](dfva-v4-socialisation-harness.md),
`Workflow({scriptPath: "scripts/workflows/socialisation-pack.js", args: [<codes>]})` or
`/socialise <code>`.

It reads the report family and never writes a score. Evidence the session produces re-enters
*this* harness at stage 1 (capture) or 2 (score) — a score never changes because a room
disagreed with it, only because new evidence was captured and re-scored.

## Literature trail

Item-level references are embedded in the instrument
([rubricV4.ts](../dfva/source/rubricV4.ts) `V4_REFERENCES`, rendered into both
dist artifacts and every report's REFERENCES section). Verification of each source against
full text: [adaptiveness literature review](dfva-adaptiveness-literature-review.md) for
refs 1–18 (C1–C5) and [workplace readiness literature review](dfva-workplace-readiness-literature-review.md)
for refs 19–34 (W1–W3). Construct authority: Lodge et al. (2026), TEQSA, for the adaptive
sub-scale; HESF (Threshold Standards) 2021 cl. 1.4.2 and 5.4.1 for the workplace sub-scale.
Validity-argument frame for the evidence plan: Kane (2013), per v4 recommendation §5.
