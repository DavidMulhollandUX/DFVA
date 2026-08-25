# Evidence log — 45-2093 Farmworkers, Farm and Ranch Animals

Window: 2025-08-01 to 2026-08-26. Generated 2026-08-26 by autoloop (empirical-five-lane-v1).
One short quote per source, captured verbatim from the page at retrieval time.

## L1 — Regulatory and standards instruments

**Government of Victoria (Premier) — "Victoria Gives Virtual Fencing The Green Light"**
https://www.premier.vic.gov.au/victoria-gives-virtual-fencing-green-light — published Wednesday 10 December 2025. HTTP 200.
> "Victorian cattle producers can now harness cutting-edge technology to guide and contain livestock without physical fences, with the Allan Labor Government approving the safe use of virtual fencing."

Also states the conditions: "using approved technologies, completing manufacturer training, maintaining a physical boundary fence or barrier and ensuring collars are checked regularly", and that electronic collars for species other than cattle require a scientific licence under the POCTA Act.

## L2 — Scholarly and institutional studies

**ABARES — "Snapshot of Australian Agriculture 2026"**
https://www.agriculture.gov.au/abares/products/insights/snapshot-of-australian-agriculture — 2026 edition. HTTP 200.
> "the Australian agricultural sector employed 247,000 people on average over the four quarters to November 2025, down 10.3% from the previous year and 11.6% from a decade earlier."

Page also flags: "official statistics do not easily capture seasonal workers, labour hire workers and the agricultural workforce that extends beyond the farm gate". Underlying measure: ABS Labour Force Survey (cited as ABS 2025e).

**USDA Economic Research Service — "Robotic milking gains ground, especially among midsized dairies" (chart of note)**
http://www.ers.usda.gov/data-products/charts-of-note/114194 — dateline 6/2/2026. HTTP 200.
> "13 percent of dairy farms with 150−499 head used robotic milking."

United States data; admitted only as directional evidence, scoped as non-AU.

## L3 — Trade press and professional-body publications

**Beef Central — "Two states approve virtual fencing for commercial use"**
https://www.beefcentral.com/news/two-states-approve-virtual-fencing-for-commercial-use/ — dateline 12/12/2025. HTTP 200.
> "VICTORIAN and News South Wales cattle producers now have access to virtual fencing with both State's approving the technology for commercial use this week."

NSW requirements reported: supplier/manufacturer training; regular monitoring; vibrational or audio cues before electric cues; cattle only. Providers named: Halter and Gallagher eShepherd.

## L4 — Demand-side job ads (Adzuna AU)

Query `farm hand livestock`, retrieved 2026-08-26, count **13**.
Raw payload: `raw/adzuna-farm-hand.json`.
Top employers: University of Tasmania (2), Stone Axe Pastoral Company, CP Farm Operations, JW & AJ Caldwell Family Trust, Paspaley Pastoral, Gunn Agri Partners, Stockyard Beef, Drover Ag Recruitment, Donohoe Pastoral Co.
Skills mentioned across descriptions: cattle work (4), sheep work (3), breeding programs (2), fencing (1), irrigation (1). No listing mentions automation or AI skills.

## L5 — Practitioner discourse (last30days engine)

Engine: `last30days.py`, plan `raw/l5-plan.json`, window 180 days ending 2026-08-26 (`range_from` 2026-02-27), subreddits r/farming, r/Agriculture, `--max-source-fetches 6`. Raw payload: `raw/l5-out.json`.

source_status: reddit ok (3 items), hackernews ok (24), youtube ok (1), github ok (3), grounding **no-results** (0). X degraded (bird_authenticated false); TikTok/Instagram unconfigured.

**Finding: no in-scope items.** All returned items were US farm-policy, cropping-machinery, or off-topic content. No Australian livestock-worker practitioner corpus exists in this sweep; recorded as an empty declared sample, not platform silence.

## Searches returning nothing / omissions

- Factiva omitted: unattended run.
- last30days grounding: no-results.
- No in-scope practitioner items on reddit/HN/youtube/github despite clean source runs.

## Refute pass

Each admitted claim passed three lenses (source real / population fit / in window) with refuters defaulting to refuted when uncertain; outcomes recorded per claim in `<soc>.json` `refuteNotes`. c04 carries a recorded dissent on population fit and survives only because two lenses failed to overturn, hence its explicit non-AU scope.
