# Evidence log — 47-2061 Construction Laborers

Window: 2025-08-01 to 2026-08-26. Generated 2026-08-26 by autoloop (empirical-five-lane-v1).
One short quote per source, captured verbatim from the page at retrieval time.

## L1 — Regulatory and standards instruments

**Safe Work Australia — "Workplace Exposure Limits - airborne contaminants"**
https://www.safeworkaustralia.gov.au/safety-topic/managing-health-and-safety/workplace-exposure-limits-airborne-contaminants — current 2026 page. HTTP 200.
> "From 1 December 2026 Australia will adopt the Workplace exposure limits for airborne contaminants (WEL list)."

Page also states WHS ministers agreed to a harmonised transition to adopt the WEL list on 1 December 2026, following implementation into the WHS laws of the Commonwealth, states and territories, replacing the Workplace Exposure Standards (WES list).

## L3 — Trade press and professional-body publications

**Australian Centre for Disease Control (CDC) — "Updated national guidance helps doctors protect Aussie workers from silica dust"**
https://www.cdc.gov.au/newsroom/news-and-articles/updated-national-guidance-helps-doctors-protect-aussie-workers-silica-dust — published 1 July 2026. HTTP 200.
> "Around 4% of Australian workers risk exposure to respirable crystalline silica, across industries from engineered stone and masonry to tunnelling, mining, construction, demolition and jewellery polishing."

> "Researchers estimate current workplace exposure could lead to more than 83,000 future cases in Australia."

Reaffirms the 2024 nationwide ban on the importation and use of engineered stone (1% or more crystalline silica).

**EIR Labour Hire — "CW1 vs CW4 vs EBA - Construction Rates 2026"**
https://eirlabourhire.com.au/cw1-vs-cw4-vs-eba-construction-rates — 2026 rate card. HTTP 200.
> "The CW4 award pay rate is what the worker receives per hour ($38.36–$39.46/hr under the Building & Construction General On-site Award MA000020, effective from 1 July 2025)."

> "CW1 (general labourer) charges $51–$64/hr."

Vendor-stated; the CW1 award pay floor is given as $33.94–$38.00/hr; EBA site CW1 $63–$82/hr charge.

## L4 — Demand-side job ads (Adzuna AU)

Query `construction labourer`, retrieved 2026-08-26, count **589**.
Raw payload: `raw/adzuna-labourer.json`.
Top employers are labour-hire firms: Buildsafe (15+3 Qld), EIR Labour Hire (5), HAYS (4), Synaco Global Recruitment (3), JV Recruitment, DSC Personnel, Dash Group. Skill mentions (from 127 sampled descriptions; full set in raw): construction (42), labouring (34), safety (17), white card (13), civil (10), driver licence (7), tickets (4). No listing mentions AI skills.

## L5 — Practitioner discourse (last30days engine)

Engine: `last30days.py`, plan `raw/l5-plan.json`, window 180 days ending 2026-08-26 (`range_from` 2026-02-27), subreddits r/Construction, r/ConstructionWorkers, `--max-source-fetches 6`. Raw payload: `raw/l5-out.json`.

source_status: reddit ok (3), hackernews ok (3), youtube ok (2), github ok (12), grounding **no-results** (0). X degraded (bird_authenticated false); TikTok/Instagram unconfigured.

**Finding: no in-scope items.** Reddit threads were US/UK (e.g. "Civil construction - free heavy truck licence"), HN/youtube/github off-topic (software, audiobooks, game dev). No Australian construction-labourer practitioner corpus exists in this sweep; recorded as an empty declared sample.

## Searches returning nothing / omissions

- Factiva omitted: unattended run.
- last30days grounding: no-results.
- No in-scope L5 items on reddit/HN/youtube/github.

## Refute pass

Each admitted claim (c01, c02, c03) passed three lenses (source real / population fit / in window) with refuters defaulting to refuted when uncertain; outcomes recorded per claim in `<soc>.json` `refuteNotes`. c02 and c03 carry recorded dissent (forward estimate; vendor-stated) and survive 2-of-3 with explicit scoping.
