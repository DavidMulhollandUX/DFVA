# Evidence log — 45-2091 Agricultural Equipment Operators

Run: 2026-08-26, autoloop worker `autoloop`. Method: empirical-five-lane-v1.
Declared L5 window: 180 days to 2026-08-26. Record window: 2025-08-01 to 2026-08-26.

## c01 — GPA/TMA/SPAA autonomous farm machinery survey, second wave (L2)

- Source: Grain Producers Australia, Autonomous Farm Machinery / Code of Practice page. HTTP 200. Results stated as "published in April 2026".
- Quote: "Adoption of autonomous and semi-autonomous machinery has increased from 27 per cent to 45 per cent of growers, with tractors and sprayers the most common entry point for use on farm. Interest in the technology is also strengthening, with 69 per cent of growers indicating they want to learn more".
- Corroborating source: GPA post "Autonomous farm machinery uptake caught between interest and adoption realities", datePublished 2026-05-05. HTTP 200. Confirms barriers: "cost and connectivity issues are limiting uptake".

## c02 — Code of Practice for Agricultural Mobile Field Machinery with Autonomous Functions (L1 industry code)

- Source: same GPA page (HTTP 200); page update history includes 1 July 2021 (release period).
- Quote: "The Code is designed to guide: Mobile machinery with semi-autonomous and autonomous functions used in agricultural field operations; The development and evaluation of safe work procedures for use of this machinery."
- Scope note recorded on the claim: voluntary industry code, not statute.

## c03 — AS17002 driverless tractor demonstration, almonds (L3)

- Source: Hort Innovation project register, AS17002 page. HTTP 200. Register records the project as completed ("Completed project ... Demonstration of functional driverless tractor for Australian horticulture (AS17002)").
- Source: Tree Crop magazine report (HTTP 200, undated dateline — flagged on the claim).
- Quote (AME Group managing director Cam Clifford): "Trying to find staff to work those hours and sit in tractors going up and down rows is getting harder and harder, and that's aside from the cost side of it."

## L4 — Adzuna AU

Queries run 2026-08-26, max_days_old=90, raw payloads under `raw/`:

| Query | Count | Mean advertised salary |
|---|---|---|
| farm machinery operator | 113 | $89,434 |
| plant operator agriculture | 13 | $85,000 |

Skills recounted from raw listing text (farm machinery operator, n=20 returned listings): machinery
19, spray 6, livestock 7, tractor 5, maintenance 5, harvest 4, truck 4, driver 3. Precision-tech
keywords (autosteer/GPS/guidance) at or near zero — recorded in `jobAds.notes`.

## L5 — last30days engine

- Command and plan: `raw/l5-plan.json`, `--days 180 --as-of 2026-08-26 --subreddits farming,Tractors,Agriculture --max-source-fetches 6`.
- Outcome: reddit ok (8), hackernews ok (22), github ok (7), youtube ok (1), grounding no-results. X unauthenticated; TikTok/Instagram unconfigured; Factiva omitted (unattended run).
- **Zero items concern Australian machinery operators' experience of autonomy.** Reddit returns are US-politics and meme threads; the only tractor-adjacent content is a Clarkson's Farm trailer. No claim drawn from L5.

## Refute pass

Three lenses per claim. All three claims survived at least two lenses. Dissents carried into
scope: c03's trade article carries no dateline (dating lens overturned; claim survives on the
register plus corroborating reporting two-to-one). c01's adoption figure includes semi-autonomous
functions such as autosteer — captured explicitly in scope so it cannot read as driverless adoption.

## Caps reached

None.
