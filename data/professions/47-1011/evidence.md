# Evidence log — 47-1011 First-Line Supervisors/Managers of Construction Trades and Extraction Workers

Window: 2025-08-01 to 2026-08-26. Generated 2026-08-26 by autoloop (empirical-five-lane-v1).
One short quote per source, captured verbatim from the page at retrieval time.

## L2 — Scholarly and institutional studies

**Infrastructure Australia — "2025 Infrastructure Market Capacity Report"**
https://www.infrastructureaustralia.gov.au/reports/2025-infrastructure-market-capacity-report — released 13 November 2025. HTTP 200 (full PDF captured).
> "As at October 2025, Australia's current infrastructure workforce stands at 204,000 workers. There is an estimated shortage of 141,000 workers, which could reach a peak of 300,000 by 2027."

Also: the five-year Major Public Infrastructure Pipeline "has grown 14% over the last year and now stands at $242 billion".

**Jobs and Skills Australia — "Construction - Occupation and Industry Profiles"**
https://www.jobsandskills.gov.au/data/occupation-and-industry-profiles/industries/construction — data current March 2026 (February 2026 reference period). HTTP 200.
> Construction employment: February 2026 = 1,371,500. Page notes ABS has temporarily suspended publishing some LFS industry series during survey modernisation.

## L3 — Trade press and professional-body publications

**Reuters — "Australia promised 1.2 million new homes, but builders are at their limits"**
https://www.reuters.com/world/asia-pacific/australia-promised-12-million-new-homes-builders-are-their-limits-2026-08-12/ — dateline 12 August 2026. HTTP 200.
> "new dwelling commencements in Australia fell in the first quarter of 2026 by 11.2% compared to the previous quarter, and year-on-year growth slowed sharply to 0.2% from 26.1%".

Report cites builders working night shifts because daytime labour is unavailable.

## L1 — Regulatory and standards instruments

No instrument inside the 2025-08-01 to 2026-08-26 window names this occupation directly. Jurisdictional industrial-manslaughter provisions (Victoria workplace manslaughter under the OHS Act from July 2020; Tasmania from 2 October 2024) predate the window. Recorded as a lane gap rather than padded.

## L4 — Demand-side job ads (Adzuna AU)

Query `construction site supervisor`, retrieved 2026-08-26, count **127**.
Raw payload: `raw/adzuna-site-supervisor.json`.
Top employers: Enerven (3), W3Global (3), Indev (2), Mellross Homes (2), SEE Group / See Group (2 each), PRC Building Services (2), Weyn Constructions, Nexta Homes.
Skill mentions (word-boundary counted from 127 descriptions): quality assurance (18), commercial management (17), residential (15), civil works (9), safety/WHS (4), white card (1). The bare token "AI" did not appear as a word in any listing; the 32 raw substring hits were inside words such as "maintain".

## L5 — Practitioner discourse (last30days engine)

Engine: `last30days.py`, plan `raw/l5-plan.json`, window 180 days ending 2026-08-26 (`range_from` 2026-02-27), subreddits r/Construction, r/ConstructionManagers, `--max-source-fetches 6`. Raw payload: `raw/l5-out.json`.

source_status: reddit ok (6 items), hackernews ok (20), youtube ok (1), github ok (12), grounding **no-results** (0). X degraded (bird_authenticated false); TikTok/Instagram unconfigured.

**Finding: no in-scope items.** Reddit threads were US/UK practitioner posts (e.g. "Thinking of becoming a site supervisor (UK)"), HN/youtube/github results were off-topic (software "construction kits", AI data-centre theft, German policy repos). No Australian site-supervisor practitioner corpus exists in this sweep; recorded as an empty declared sample.

## Searches returning nothing / omissions

- Factiva omitted: unattended run.
- last30days grounding: no-results.
- No in-scope L5 items on reddit/HN/youtube/github.
- L1: no in-window occupation-specific instrument.

## Refute pass

Each admitted claim (c01, c02, c03) passed three lenses (source real / population fit / in window) with refuters defaulting to refuted when uncertain; outcomes recorded per claim in `<soc>.json` `refuteNotes`. All three survive 2-of-3 with explicit population-fit scoping.
