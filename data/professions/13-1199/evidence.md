# Evidence log — 13-1199 Business Operations Specialists, All Other

Run: 2026-08-30 (empirical-five-lane-v1). L1/L2 researched this run; L4 (LinkedIn) and L5
(last30days) carried from the 2026-08-29 pass; L3 (Factiva) pending re-auth.

## L1 — regulatory
- Clean Energy Council, "Application process" — https://cleanenergycouncil.org.au/application-process (2024)
  > "Once you have completed the required training, you can apply for provisional accreditation."
  Accreditation for design/install of solar & battery systems moved to Solar Accreditation Australia (SAA) in
  Feb 2024; only SAA-accredited designers/installers create Small-scale Technology Certificates under the CER
  scheme. Applies to the energy/solar consulting slice of this residual SOC; the broader category is not
  statutorily licensed as a whole.

## L2 — scholarly / institutional
- Jobs and Skills Australia, "Australia's AI Transition: Jobs, Skills and the Future of Work (Generative AI
  Capacity Study)" — https://www.jobsandskills.gov.au/studies/generative-artificial-intelligence-capacity-study (2025-08)
  > "about 79% of Australian workers face low or very low automation risk"
  Task-level study of 358 ANZSCO occupations; routine clerical/business roles (bookkeepers, receptionists,
  business analysis, sales/marketing/PR) carry the highest automation exposure. This residual business-operations
  SOC sits in that higher-exposure cluster.

## L3 — trade press (Factiva)
- GAP: OpenAthens session expired 2026-08-30; logged to data/professions/factiva_backlog.json (auth_expired).
  Backfill via `scripts/factiva_research.py --cookies data/factiva_cookies.json --log-backlog` after re-auth.

## L4 — demand-side job ads (carried 2026-08-29)
- LinkedIn (unofficial scrape) postings folded previously; see ledger claims l403–l412. Demand signal, not
  graduate destinations. Adzuna AU time-series not run this batch (Seek/trend + Adzuna recommended for refresh).

## L5 — practitioner discourse (carried 2026-08-29)
- last30days sweep (reddit/x/youtube/hackernews/polymarket/github/grounding) folded previously; declared sample
  in corpus.l5Sample. Broad AI-discourse sample (Hacker News / GitHub), not occupation-specific communities.
