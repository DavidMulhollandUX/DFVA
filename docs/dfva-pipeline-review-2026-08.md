# DFVA course pipeline review — scored vs. shipped

**Date:** 2026-08-22 · **Branch:** `claude/scored-courses-dev-review-aph7ve`
**Question asked:** which courses are scored / handbook-captured / crosswalked but **not yet in the dev environment**?

---

## Headline

**None.** There is no scored-but-unshipped backlog. Every assessment in
`dfva/source/assessments.json` is present in the app, with all six required
artifacts, and all four guardrails pass on a clean checkout.

| Layer | Coverage |
|---|---|
| Programs in `sharedProgramData.ts` (the dev environment) | **66** |
| Assessments in `dfva/source/assessments.json` (scored) | **66** |
| Assessment + market + redesign reports in `reports/` | **66 + 66 + 66 = 198** |
| `REPORT_CONTENT` keys (assessment / market / recommend) | **66 / 66 / 66** |
| Redesign plan linked (`recommendSlug` resolves) | **66/66** |

```
dfva:check          OK — 5 generated files match dfva/source
dfva:content-check  OK — 198 report bodies match reports/*.md
dfva:check-registry OK — 66 programs consistent across registry, reports/, REPORT_CONTENT, reportMeta
dfva:assessments-check ✓ 66 programs, 41 JIR-enriched, store in sync
dfva:completeness   ✅ passed
dfva:report-lint    ✅ passed (198 reports)
```

The bottleneck is **upstream of scoring**, not between scoring and the app.
Everything below is what that reframing surfaces.

---

## 1. The real backlog is unscored candidates

| Pool | Count | State |
|---|---:|---|
| June-2026 "cached & unscored" batch (`docs/dfva-batch-backlog.md`) | 74 | **9 scored, 65 still unscored** |
| Discovered course codes (`data/handbook_discovered.json`) | 390 | **385 unscored** (mc 146, gc 86, gd 43, sc 31, pr 17, legacy numeric ~50) |
| Overlap between the two | 2 | they are effectively **two separate discovery sets** |

The 65-course remnant of the June batch is the highest-value cohort — all
coursework masters, and it fills exactly the faculties the portfolio is thinnest in:

| Faculty | Scored now | If the 65 land |
|---|---:|---:|
| Engineering & IT | 4 | **15** |
| Arts | 3 | **12** |
| Fine Arts & Music | 1 | **7** |
| Law | 3 | **8** |
| Business & Economics | 7 | 17 |
| Medicine, Dentistry & Health | 19 | 32 |
| Science | 17 | 22 |
| Education | 5 | 8 |
| Architecture, Building & Planning | 5 | 8 |

## 2. The capture layer is not reproducible

The June backlog says those 65 courses "have valid handbook content in the cache".
That cache is `compass/app/.handbook-cache/` — **gitignored** (`.gitignore:57`) and
**empty on a fresh clone**. The 93 cached pages that made those courses
ready-to-score existed only on one local machine.

`data/handbook_data.json` holds 43 entries (36 successful, 7 blocked) and
`data/handbook_doctorate_data.json` holds 24 — 66 total, i.e. exactly the
already-scored set. **Nothing is staged and waiting to be scored.**

## 3. Documented Go8 tooling is absent from the repo

`CLAUDE.md` documents a Go8 scraping workflow, but none of it is checked in:

- `scripts/scrape-go8-handbooks.py` — missing
- `scripts/go8_handbook_config.json` — missing
- `~/.hermes/scripts/crawl4ai_scrape.sh` — missing
- `data/go8_{unikey}_handbook_data.json` — none exist for any of the 7 universities

`docs/dfva-go8-comparison.md` (2026-06-10) is hand-authored from `web_extract`
output that was never persisted. The Go8 benchmark cannot currently be
reproduced or extended from this repo.

## 4. An evidence-depth cliff inside the shipped set

The 24 research/professional doctorates were scored from far thinner source text
than everything else:

| Cohort | n | Handbook text (median chars) | Mean score |
|---|---:|---:|---:|
| Coursework programs | 42 | **19,273** (range 6,341–35,417) | 23.7 |
| Doctorates (`dr-phil*`, `dh-*`, `mc-d*`, `me-dcd`, `080*`, `300bb`) | 24 | **392** (range 179–936) | **25.0** |

~50× less evidence, and they score *higher* on average. That is at minimum an
unvalidated asymmetry — thin sources make weaknesses unobservable, which biases
scores upward. These 24 are also, exactly:

- the entire `GRANDFATHERED` allowlist in `check-course-completeness.ts`, and
- 24 of the 25 programs with **no JIR/QILT labour evidence** (the 25th is `mc-jurisd`).

They nonetheless carry full 11-dimension evidence and redesign plans, and in the
UI are indistinguishable from a 20k-char-backed assessment.

## 5. Coverage and correctness gaps inside the dev environment

| Gap | Detail | Impact |
|---|---|---|
| Dimension evidence | **31/66** — 35 programs have none | rubric popover shows no linked recommendations |
| Labour evidence (JIR/QILT crosswalk) | **41/66** — 25 missing | D10 / market sections unevidenced |
| Unresolved faculty | `dh-lld`, `dr-philik` → `"Other"` | dropped from `/insights` faculty pages and MCP `faculty` filter |
| Level mislabelling | 16 research doctorates labelled `postgraduate`, not `graduate-research` | `query_assessments` level filtering is wrong; only 3 of ~25 research degrees are findable as such |
| Score ceiling | all 66 entries carry `maxScore: 36`; `rubric.ts` sets `MAX_ACHIEVABLE_SCORE = 33` | every program renders ~8% lower than its true ceiling |
| Ratchet slack | **all 24** grandfathered programs are now complete | the completeness guardrail is not yet enforcing anything |

## 6. Portfolio shape

66 programs: **52 MODERATE RISK · 8 RESILIENT · 6 HIGH RISK · 0 CRITICAL**.
Scores cluster 23–27 (median 24, range 12–30). Assessment dates: 1 in April,
5 in May, 35 in June, 25 in July — **nothing scored since 2026-07**; the last
six commits are dev-loop no-op timestamp bumps.

A 79% single-band concentration with no CRITICAL results is worth pressure-testing:
either the rubric under-discriminates in the middle, or the sampled portfolio is
genuinely homogeneous. More coursework programs across more faculties (§1) is the
cheapest way to find out.

---

## Recommendations

### P0 — cheap, this week (correctness of what's already shipped)

1. **Empty the `GRANDFATHERED` set** in `scripts/check-course-completeness.ts`.
   All 24 entries are now complete; the check itself prints this. Until it's
   emptied the guardrail cannot fail on a regression.
2. **Resolve the two `"Other"` faculties** (`dh-lld` → Law, `dr-philik` →
   Arts/Indigenous per institutional mapping) so they stop disappearing from
   `/insights` and MCP faculty queries.
3. **Fix the 16 mislabelled levels** (`postgraduate` → `graduate-research`) in
   `dfva/source/assessments.json` and regenerate.
4. **Settle /36 vs /33.** Either set `maxScore: 33` across the registry, or add a
   comment recording that /36 is a deliberate legacy nominal ceiling.

### P1 — unblocks everything else (make capture reproducible)

5. **Commit the capture layer, or delete the claim.** Check in
   `scripts/scrape-go8-handbooks.py` + `go8_handbook_config.json` (and the
   Crawl4AI wrapper, or vendor its invocation), *or* strike the Go8 section from
   `CLAUDE.md`. A documented workflow that doesn't exist in the repo is worse
   than none.
6. **Persist handbook captures to versioned `data/`**, not gitignored
   `.handbook-cache/`. The cache is fine as a fetch accelerator; it must not be
   the only copy of the evidence an assessment rests on.
7. **Re-capture the 65-course backlog** via Crawl4AI (unblocked since 2026-07-01)
   into a `handbook_data.json`-shaped file, and re-run the 7 currently-blocked
   fetches while you're there.

### P2 — the actual expansion

8. **Score in faculty-coherent tranches**, starting with **Engineering & IT (11)**
   and **Law (5)**. Rationale: largest ready cohort in the most under-represented
   faculties, and Engineering gives the Go8 comparison a second discipline
   beyond Computer Science.
9. **Decide the dimension-evidence policy** for the 35 programs without it —
   backfill, or scope evidence to programs that get surfaced. Right now the
   rubric popover silently degrades and there's no signal to the user which is which.
10. **Re-base the 24 thin-evidence doctorates.** Either re-capture richer sources
    (graduate-research program pages + faculty RHD pages) and re-score, or label
    them "indicative — limited source evidence" in the UI. Publishing a 392-char
    assessment beside a 20k-char one under the same Durability Rating is the
    single biggest defensibility risk in the shipped set.

### P3 — benchmark

11. Once #5–#6 land, run `discover` + `scrape` for `usyd`, `unsw`, `anu` and
    regenerate `docs/dfva-go8-comparison.md` from persisted data rather than
    from an un-reproducible extract.

---

## Suggested sequencing

```
P0 (1 PR, ~1 day)         → registry correctness + ratchet tightened
P1 (1 PR, ~2 days)        → capture reproducible + 65 courses re-captured
P2 tranche 1 (Eng & IT)   → 11 programs through the 6-artifact pipeline
P2 tranche 2 (Law)        →  5 programs
  … re-check band distribution after each tranche (§6)
P3                        → Go8 benchmark rebuilt on persisted data
```

Everything in P0 is a small, well-guarded change against green CI. P1 is the one
that matters: without it, every subsequent tranche re-creates the same
un-reproducible state that made this review necessary.
