# Evidence log — 47-2111 Electricians

Window: 2025-08-01 to 2026-08-26. Generated 2026-08-26 by autoloop (empirical-five-lane-v1).
One short quote per source, captured verbatim from the page at retrieval time.

## L1 — Regulatory and standards instruments

**Clean Energy Regulator — "Solar battery installers and designers"**
https://cer.gov.au/schemes/renewable-energy-target/renewable-energy-target-participants-and-industry/solar-battery-installers-and-designers — last updated 31 July 2026. HTTP 200.
> "Designers and installers must be accredited by Solar Accreditation Australia (SAA). Accreditation requirements cover design, installation, supervision and system safety for the relevant system type (off-grid, on-grid, solar batteries)."

> "Installations must use products listed by the Clean Energy Council (CEC)."

New critical labelling photo requirements are in place for solar battery installations; supervision must be on-site.

**Clean Energy Council — "Apply to join the approved products list"**
https://cleanenergycouncil.org.au/industry-programs/products-program/apply — 2026 page. HTTP 200.
> "From 1 May 2026, new applications for products to feature on the CEC's approved PV module list must be certified to IEC 61730:2023."

## L3 — Trade press and professional-body publications

**Fuse Recruitment — "Renewable Energy Workforce Shortage Australia 2026"**
https://www.fuserecruitment.com/blogs/renewable-energy-workforce-shortage-australia-2026/ — 2026 analysis. HTTP 200.
> "Under the Step Change scenario, electricity sector employment will need to double to approximately 66,300 full-time equivalent workers by 2029."

Vendor workforce analysis; scenario projection, not official employment data.

## L4 — Demand-side job ads (Adzuna AU)

Query `electrician`, retrieved 2026-08-26, count **13,417** (largest of the four occupations in this batch).
Raw payload: `raw/adzuna-electrician.json`.
Top employers are recruitment firms: Skill Match Recruit (5), Konecranes (3), Engineering Trades Australia (3), 2XM Recruit (2), IntoWork Australia (2), Core Talent (2), CGC Recruitment (2). Skill mentions (from sampled descriptions): maintenance (17), solar (5), battery (2), licence (2), apprentice (2), EV (1). Electrification-specific skills remain a small share.

## L5 — Practitioner discourse (last30days engine)

Engine: `last30days.py`, plan `raw/l5-plan.json`, window 180 days ending 2026-08-26 (`range_from` 2026-02-27), subreddits r/electricians, r/solar (engine also reached r/AskAusElectricians), `--max-source-fetches 6`. Raw payload: `raw/l5-out.json`.

source_status: reddit ok (13), hackernews ok (10), youtube **no-results** (0), github ok (12), grounding **no-results** (0). X degraded (bird_authenticated false); TikTok/Instagram unconfigured.

In-scope Australian item found: r/AskAusElectricians thread "Underground Coal Mine Electrician from India - Need Honest Advice on Jobs, Licen[ce]" — an overseas-trained electrician seeking Australian licence recognition. Most other reddit/HN/YouTube/github items were US-centric or off-topic. Recorded as a thin but non-empty corpus (unlike the other three SOCs this batch).

## Searches returning nothing / omissions

- Factiva omitted: unattended run.
- last30days grounding: no-results; youtube: no-results.
- Most L5 items were US-centric; only one in-scope AU practitioner item returned.

## Refute pass

Each admitted claim (c01-c04) passed three lenses (source real / population fit / in window) with refuters defaulting to refuted when uncertain; outcomes recorded per claim in `<soc>.json` `refuteNotes`. c03 and c04 carry recorded dissent (vendor source; single anecdotal post) and survive 2-of-3 with explicit scoping.
