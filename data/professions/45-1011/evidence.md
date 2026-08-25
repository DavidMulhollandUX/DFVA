# Evidence log — 45-1011 First-Line Supervisors/Managers of Farming, Fishing, and Forestry Workers

Run: 2026-08-26, autoloop worker `autoloop`. Method: empirical-five-lane-v1.
Declared L5 window: 180 days to 2026-08-26 (from 2026-02-27). Record window: 2025-08-01 to 2026-08-26.

One short quote per admitted source, verbatim after Unicode normalisation. Raw payloads under
`raw/` (gitignored) with a committed sha256 manifest.

## c01 — SafeWork NSW Farm Safety Training Program pilot (L1)

- Source: SafeWork NSW media release, 21 May 2026. URL resolves HTTP 200.
- Quote: "SafeWork NSW launched a 12-month pilot Farm Safety Training Program, inviting up to 1,000 agricultural workers to complete a certificate course for working on farms." (as quoted in the Work Safety Hub round-up of the release; the SafeWork NSW page itself carries the program name and 21 May 2026 date)
- Corroborating source: Work Safety Hub, Weekly WHS Round-Up 12th–26th May 2026 (HTTP 200): "SafeWork NSW launched a 12-month pilot Farm Safety Training Program, inviting up to 1,000 agricultural workers to complete a certificate course for working on farms."
- Raw copy: not stored (page fetched for status/date verification only); manifest covers Adzuna and last30days payloads.

## c02 — Model WHS duties, agriculture duties tool (L1)

- Source: Safe Work Australia, duties tool, agriculture/general duties. HTTP 200. Page undated standing guidance; retrieved 2026-08-26.
- Quote: "As a PCBU, you must, so far as is reasonably practicable: ensure the health and safety of yourself, workers and others (including your family and visitors) at work".
- Note: worker duty referenced to s28 model WHS Act as stated on the same page ("See s28 of the model WHS Act for more information" appears on the companion workers page).

## c03 — NSW farm fatalities and women's safety workshops (L1 via regional press)

- Source: Moree Online News, 29 May 2026. HTTP 200.
- Quote: "Agriculture remains one of the most dangerous industries in NSW with 11 workplace fatalities on farms in 2025."
- Also states: drone rebate expansion (August 2025) with "More than 20 applications for drones have been received."

## c04 — RDC Digital Capability Framework (L2)

- Source: CRDC, "Digital technology reinventing the agricultural workforce", page dated 30 June 2025. HTTP 200.
- Quote: "The most influential technologies likely to augment the future workforce capabilities will include navigation robotics, process automation and decision support tools."

## c05 — CSIRO Ag2050 / Responsible AI in agriculture (L2)

- Source: research.csiro.au Ag2050 Responsible AI in agriculture page, metadata date 2024-11-18. HTTP 200.
- Quote: "We will develop a series of papers that: Examine how Australia's AI innovation in agriculture compares globally and establish a specific vision for AI in Australian agriculture within the Ag2050 framework."
- Related fact from the same program family: Ag2050 Scenarios Report published April 2024 in collaboration with DAFF (stated on the Ag2050 program pages).

## c06 — Recruiter placement commentary, horticulture supervision tier (L3)

- Source: March Talent Partners, "Australian Horticulture 2026: 5 Critical Hires on Water", datePublished 2026-07-14. HTTP 200.
- Quote: "Not one of the irrigation roles we placed in the twelve months to July 2026 came from an advertisement."
- Second source: March Talent Partners, "Orchard Manager 2026", 21 May 2026. HTTP 200. Cites Indeed Hiring Lab: agriculture and forestry posted a 3.3% monthly job-switch rate in October 2025 (secondary citation, not independently verified this run).

## c07 — FWC 2025-26 wage review effect on horticulture awards (L3)

- Source: Australian Rural & Regional News, 4 June 2026. HTTP 200.
- Quote: "While the general increase to modern award rates has been set at 4.75 per cent, the Commission also ruled that the lowest award classifications must be lifted to match the new National Minimum Wage of $26.44 per hour."

## c08 — Workforce level and supervisor award rate (L3 aggregator)

- Source: Farm Work Australia, State of Farm Work Australia 2026, updated April 2026. HTTP 200.
- Quote: "258,900 Total agricultural employment (May 2025)" and "Pastoral Level 4 (supervisor) $27.08/hr $33.85/hr".
- Caveat: third-party aggregation citing ABS and award data; primary documents not opened this run.

## L4 — Adzuna AU

Queries run 2026-08-26, `max_days_old=90`, results_per_page=20, raw payloads committed under `raw/`:

| Query | Count returned | Mean advertised salary |
|---|---|---|
| farm supervisor | 37 | $96,197 |
| horticulture team leader | 8 | n/a |

Counts recomputed from raw JSON (`count` field). Top employers and skills recounted from listing text:
livestock, leadership/supervision, machinery operation, irrigation, poultry husbandry, team leadership.

## L5 — last30days engine

- Diagnostic 2026-08-26: sources reddit, x, youtube, hackernews, polymarket, github, grounding; `bird_authenticated: false`; `has_scrapecreators: false`.
- Command: plan at `raw/l5-plan.json`, `--emit json --json-profile raw --days 180 --as-of 2026-08-26 --subreddits Agriculture,farming,horticulture,ausagriculture --max-source-fetches 6`.
- Outcome: reddit ok (5 items), hackernews ok (6), youtube ok (4), github no-results, grounding no-results. X unauthenticated; TikTok/Instagram unconfigured.
- **Zero of the 15 retrieved items concern this occupation's practitioners** — all are generic AI-industry content, and the engine's returned Reddit items sit outside the requested subreddits. No claim was drawn from L5. The corpus is declared so that §3 can cite it as sampled-and-empty rather than unsampled.

## Refute pass

Three lenses per claim (source real; population fit; in window), each defaulting to refuted
when uncertain. All eight claims survived with at least two lenses failing to overturn;
dissent notes are recorded in each claim's `refuteNotes`. Claims considered and dropped
before admission: the guessed Safe Work Australia strategy-priority URL (404 — dropped);
a Bullagreen law-firm blog on rural WHS inspections (secondary, low value beyond what SafeWork
NSW sources already carry — dropped).

## Caps reached

None. Factiva omitted per constraint 3 (unattended run).
