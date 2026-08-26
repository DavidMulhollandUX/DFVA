# Evidence log — 49-9062 Medical Equipment Repairers

Run: autoloop batch, 2026-08-26 (AEST). Window 2026-02-27 to 2026-08-26. Method empirical-five-lane-v1.
Raw payloads in `raw/` (gitignored); SHA-256 manifest committed at `raw/MANIFEST.sha256`.

## Research questions

See `raw/research-questions.txt` (7 occupation-specific questions framed before any search).

## Admitted claims

### mer-01 — L1 regulator procedure (TGA PRAC)
- Source: https://www.tga.gov.au/safety/recalls-and-other-market-actions/procedure-recalls-product-alerts-and-product-corrections-prac (HTTP 200, accessed 2026-08-26; undated page)
- Captured: "Repair, modification, adjustment, or re-labelling of products." — repair is a defined regulated action in the TGA's post-market corrections procedure.
- Refute pass: 3/3 failed to overturn.

### mer-02 — L2 institutional survey (US PIRG Education Fund)
- Source: https://pirg.org/edfund/resources/hospital-repair-restrictions-ii/ (HTTP 200), "Hospital Repair Restrictions II", March 2026; survey of 107 biomeds conducted Dec 2025–Jan 2026.
- Captured figures: 83% downtime increase from repair barriers ("Approximately 83% of biomeds report that equipment downtime increases from repair barriers either “somewhat frequently” or “most of the time.”"); 70% diagnostic-tool restrictions commonly delay patient care; 79% denied service info vs 64% in 2020; 94% believe Right to Repair improves safety. Rural respondents report more frequent delays (e.g. software locks 83% vs 61%).
- Scope preserved: US population, advocacy-funded, self-selected respondents.

### mer-03 — L3 trade press (24x7 Magazine)
- Source: https://24x7mag.com/professional-development/education/career-advancement/rise-cyber-biomed/ (HTTP 200), Aug 25 2026.
- Captured: "a distinct career track is emerging inside healthcare technology management (HTM): the cyber biomed"; Sodexo requires all 600+ HTM staff to complete six-week cybersecurity training and hires BMET cybersecurity specialists; VA embeds biomedical engineers in device network security.

### mer-04 — L3 vendor announcement + trade press corroboration
- Sources: PR Newswire PartsSource/Memorial Hermann release, Aug 25 2026 (HTTP 200); 24x7 Magazine coverage, Aug 25 2026 (HTTP 200).
- Captured: "PartsSource delivers real-time visibility into asset performance, predictive signals that anticipate failure risk, and prescriptive insights that reduce time to repair and lower cost of service."; 24x7: "helps health systems shift from reactive equipment repair to proactive, data-driven asset management"; investment amount undisclosed.

## Refuted candidates

1. 24x7 Magazine right-to-repair legislation overview (Apr 9 2025) — outside window.
2. Hacker News hospital-AI/radiologist items — population fit fails (doctors, not repairers).
3. Reddit career-choice threads (r/BiomedicalEngineers, Aug 2026) — student discussion, not practitioner discourse.
4. Factiva query results (20 items) — only the PartsSource item was relevant; admitted via public sources instead of the proxy URL.

## Lanes summary

| Lane | Outcome |
|---|---|
| L1 | 1 admitted (TGA PRAC procedure) |
| L2 | 1 admitted (PIRG survey, scoped); no AU scholarly effect study located |
| L3 | Factiva session live, one query, 20 items, one relevant lead folded into public sources; two dated trade-press claims admitted |
| L4 | Adzuna AU retrieved 2026-08-26: 9 listings for 'medical equipment repairer'; 0 for narrower queries |
| L5 | Declared corpus (5 reddit + 11 HN + 5 GH); no claim survived the refute pass — recorded as an empty-lane finding |

## Searches returning nothing

Recorded in the record's `corpus.searchesReturningNothing`.

## Caps reached

None.
