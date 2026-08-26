# Evidence log — 49-2094 Electrical and Electronics Repairers, Commercial and Industrial Equipment

Run: autoloop batch, 2026-08-26 (AEST). Window 2026-02-27 to 2026-08-26. Method empirical-five-lane-v1.
Raw payloads in `raw/` (gitignored); SHA-256 manifest committed at `raw/MANIFEST.sha256`.

## Research questions

See `raw/research-questions.txt` (7 occupation-specific questions framed before any search).

## Admitted claims

### eer-01 — L1 regulator licensing instrument (Energy Safe Victoria)
- Source: https://www.energysafe.vic.gov.au/licensing/electrical-licences/licence-types/restricted-electrical-workers-licence-rel (HTTP 200, accessed 2026-08-26; undated page)
- Captured: "Board or component level repair or replacement of electronic components in VSDs, radar, UPS, instrumentation, PLCs, process equipment, LED / LCD signs" — the REL Electronics class work-function table. The page also cites regulation 18(d) of the Electricity Safety (Registration and Licensing) Regulations 2020 (Vic) for Class 1 fault-finding on connected fixed equipment.
- Refute pass: source real / population fit (names this occupation's exact functions) / current at access date — 3/3 failed to overturn.

### eer-02 — L2 institutional statistics (Jobs and Skills Australia)
- Source: https://www.jobsandskills.gov.au/data/occupation-and-industry-profiles/occupations-anzsco/342313-electronic-equipment-trades-workers (HTTP 200, data file "ANZSCO Occupation data - February 2026.xlsx")
- Captured figures: Employed 15,000; full-time share 73%; female share 5%; median age 40; NSW 31.3%, Vic 25.6%, Qld 22.2%. Page states ANZSCO-based profiles will not be updated again and OSCA profiles release mid-2026. Underlying census 2021.
- Refute pass: 3/3 failed to overturn.

### eer-03 — L2 working paper (SSRN, aviation predictive maintenance)
- Source: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6117408 — MoghadasNian, "AI-Powered Predictive Maintenance in Aviation Operations", posted 2026-02-06 (scripted request returns HTTP 403 bot-block; abstract captured via search on 2026-08-26)
- Captured: "AI-driven predictive maintenance can reduce maintenance costs by 12-18% and decrease unplanned downtime by 15-20%, thereby increasing aircraft availability." Mixed-methods: maintenance logs, sensor outputs, cost reports, expert interviews; MTBF/FDR/CASK KPIs; concludes targeted workforce training is essential.
- Refute pass: 2/3 failed to overturn; dissent (no AU replication) recorded in scope.

### eer-04 — L5 practitioner forum sample
- last30days run 2026-08-26, plan `raw/last30days-plan.json`, output `raw/last30days-out.json`: reddit 21 items, hackernews 25, youtube 1, github 5, polymarket 0 (no-results), grounding unreachable.
- arctic-shift thread harvest `raw/arctic-shift-threads.json`:
  - r/IndustrialAutomation "Moving from industrial electrical maintenance to Remote PLC customer support" (2026-08-19). Comment captured verbatim: "Job security these days is only attached to those who are production critical."
  - r/PLC "PLC jobs & classifieds - Jul 2026" (2026-07-10): monthly hiring thread rules captured.
  - r/PLC "Allen Bradley 6300-SW0 discontinued" (2026-08-25): "almost all of them marked as end of life, discontinued as of end of the year".
- Refute pass: existence/window verified via arctic-shift dates; claim restricted to what threads show.

## Refuted candidates

1. r/IndustrialMaintenance thread id 1usgsky, "AI-Based Predictive Maintenance: Is It Actually Worth the Investment?" (2026-07-10, 8 comments) — refuted on authenticity: vendor-marketing structure, removed comments, unsolicited product endorsements.
2. Hacker News AI-labour-displacement items — refuted on population fit.
3. Factiva results (40 items across two queries) — none measured this occupation.

## Lanes summary

| Lane | Outcome |
|---|---|
| L1 | 1 admitted (Energy Safe Victoria REL) |
| L2 | 2 admitted (JSA profile; SSRN aviation PdM), both scoped |
| L3 | Factiva session live; two queries ran, 40 items, none occupation-relevant. No free trade-press claim survived the refute pass |
| L4 | Adzuna AU retrieved 2026-08-26: 233 broad / 15 narrow / 2 narrowest listings; skills motor, PCB, fault finding, soldering |
| L5 | Declared corpus (21 reddit + 25 HN + 1 YT + 5 GH); 1 composite practitioner claim admitted |

## Searches returning nothing

Recorded in the record's `corpus.searchesReturningNothing`.

## Caps reached

None. No lane hit its fetch cap.
