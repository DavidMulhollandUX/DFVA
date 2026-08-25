# Evidence log — 45-2011 Agricultural Inspectors

Run: 2026-08-26, autoloop worker `autoloop`. Method: empirical-five-lane-v1.
Declared L5 window: 180 days to 2026-08-26. Record window: 2025-08-01 to 2026-08-26.

## c01 — ANAO performance audit, Delivery of the Biosecurity Workforce (L1)

- Source: Auditor-General Report No. 32 2024-25, anao.gov.au PDF. HTTP 200. Tabled letter dated 21 May 2025.
- Quote (from the report front matter): "I have undertaken an independent performance audit in the Department of Agriculture, Fisheries and Forestry. The report is titled Delivery of the Biosecurity Workforce."
- Findings summary corroborated by Freight & Trade Alliance Biosecurity Report 20 (27 May 2025, HTTP 200): "The performance audit highlights shortcomings in workforce planning, skills tracking, scheduling, and data management... Seven recommendations were made — all accepted by DAFF — with remedial work underway through the Transformation Action Plan."

## c02 — Biosecurity Amendment (2025 Measures No. 1) Regulations, NSPAR (L1)

- Source: FTA / APSA Biosecurity Report 09, 3 March 2026. HTTP 200.
- Quote: "Amended pre-arrival reporting obligations under the Biosecurity Amendment (2025 Measures No. 1) Regulations 2025 take effect from 27 February 2026, applying to all international non-scheduled flights arriving in Australian territory."

## c03 — SAC ACCV expansion and BMSB season end (L1 via dated industry report)

- Source: FTA / APSA Biosecurity Report 18, 5 May 2026. HTTP 200.
- Quote: "The expanded program is intended to strengthen the department's evidence base for compliance trends, support more targeted risk profiling, and enhance early detection of emerging biosecurity risks." (SAC Air Cargo Compliance Verification); BMSB seasonal measures ceased for goods shipped on or after 1 May 2026.

## c04 — DAFF 3D x-ray trial with assistive algorithms (L1 background)

- Source: Global Agriculture reproduction of DAFF release, 06 September 2023. HTTP 200.
- Quote: "Biosecurity officers will assess the 3D x-ray images from a remote screening room, separate to officers working in the arrivals hall. They'll be supported by assistive biosecurity detection algorithms..." (Dr Chris Locke, Deputy Secretary of Biosecurity and Compliance).
- Corroborated by Mirage News reproduction (HTTP 200): "Initial testing commenced in August 2023".

## c05 — E-commerce parcel volume and triage-layer automation (L3 commentary)

- Source: forestry-quarantine.org blog, 5 May 2026. HTTP 200.
- Quote: "The pilot results that DAFF has shared publicly suggest false-positive rates remain too high for fully automated decisioning, but as a triage layer the technology is clearly useful."
- Scope warning recorded on the claim: unattributed blog; DAFF pilot details not verified against a primary source this run.

## L4 — Adzuna AU

Queries run 2026-08-26, max_days_old=90, raw payloads under `raw/`:

| Query | Count | Mean advertised salary |
|---|---|---|
| biosecurity officer | 17 | $73,303 |
| agricultural inspector | 0 | n/a |

Employers recounted from raw JSON: Hinchinbrook Shire Council (x2), DEECA, South Burnett Regional Council, NSW Primary Industries, Agriculture Victoria (x2).

## L5 — last30days engine

- Command and plan: `raw/l5-plan.json`, `--days 180 --as-of 2026-08-26 --subreddits biosecurity,invasivespecies,Agriculture --max-source-fetches 6`.
- Outcome: reddit ok (12 items), hackernews ok (12), github ok (5), youtube ok (1), grounding no-results. X unauthenticated; TikTok/Instagram unconfigured; Factiva omitted (unattended run).
- **Zero of the 30 items concern Australian biosecurity practitioners**; the nearest item ("Reasons to be pessimistic and optimistic on the future of biosecurity", owlposting.com) addresses pathogen biosecurity generally, not agricultural inspection work. No claim drawn from L5.

## Refute pass

Three lenses per claim. All five claims survived at least two lenses; dissents recorded in
`refuteNotes` (c02: regulation read via industry newsletter rather than the Federal Register
of Legislation; c04: primary DAFF page not located; c05: one refuter overturned on source
authority, claim survives two-to-one and is scoped accordingly).

## Caps reached

None.
