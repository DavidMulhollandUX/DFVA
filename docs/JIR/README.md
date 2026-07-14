# JIR Reports — docs/JIR/

141 **Job Insights Reports** from `careersonline.unimelb.edu.au/s/jobinsightsreports`, re-pulled **2026-07-14** via Firecrawl browser auth (UoM SSO → Okta → Salesforce Experience Cloud).

## Structure

```
docs/JIR/
├── README.md                          ← this file
├── manifest.json                      ← all 141 URLs
├── dfva_jir_map.json                  ← DFVA program ↔ JIR mapping (21 exact, 9 cognate, 10 partial, 7 none)
├── build_manifest.py                  ← rebuild manifest from scraped data
├── build_map.py                       ← rebuild DFVA-JIR map
├── parse_jir.py                       ← structured parser (limited by PDF garbling)
├── Faculty of Arts/                   ← 33 reports
├── Faculty of Architecture Building & Planning/ ← 11 reports
├── Faculty of Business & Economics/   ← 15 reports
├── Faculty of Education/              ← 7 reports
├── Faculty of Engineering & IT/       ← 12 reports
├── Faculty of Fine Arts & Music/      ← 2 reports
├── Faculty of Medicine Dentistry & Health/ ← 23 reports
├── Faculty of Science/                ← 31 reports
└── Melbourne Law School/              ← 7 reports
```

## Known limitations

### 1. PDF text garbling (two-column extraction artifact)
Firecrawl's text extraction from two-column PDFs inserts spacing artifacts that garble job titles, skills, and body text. The **employer names** are generally legible. For clean extraction, use the Firecrawl interact vision model (see `build_map.py` for the approach — the vision model reads the rendered PDF screenshot perfectly, extracting n, job titles, employers, and skills). The interact approach is rate-limited (10 req/min, 2 concurrent jobs) and takes ~25s per report.

### 2. No continuous outcome variable
The JIRs contain destination job titles, employers, and skills — but **no continuous outcome variable** (salary, employment rate, satisfaction score). A criterion must be **constructed** by coding destination job titles for AI-substitution exposure (title → ANZSCO/O*NET → exposure index). That coding scheme must be **pre-registered** before it is applied to DFVA scores, or the result is not credible.

### 3. Content is backward-looking (2015–2025)
These are where graduates *went*, partly pre-AI-disruption (pre-2023). DFVA is forward-looking to 2027+. Use JIR as the **evidence base**, DFVA's analysis as the **projection** — don't let historical destinations override a forward automation judgement.

### 4. LiveAlumni coverage is partial
Each report states it is based on data of N alumni "who studied this degree… (not all alumni)." n is a floor and skews to alumni with discoverable (LinkedIn-style) profiles. 61 reports have n ≥ 100; 10 have n < 30.

## DFVA integration coverage

| Tier | Programs | Meaning |
|------|---------:|---------|
| Exact same-name | 21 | Identical degree — drop-in real data |
| Cognate | 9 | Same field, different level — transferable with caveat |
| Partial | 10 | Related-field proxy exists |
| None | 7 | No good UoM proxy |

~32 matched programs (21 exact + ~11 cognate) = ~48% of the 66-program DFVA portfolio. The 21 exact matches are **ready for immediate integration**.

## Provenance

- **Source:** `careersonline.unimelb.edu.au/s/jobinsightsreports` (UoM SSO, LiveAlumni platform)
- **Authentication:** Okta SSO via Firecrawl browser profile `uom-jir`
- **Date collected:** 2026-07-14
- **Each report footer states:** "processed with assistance of a university AI tool and reviewed and curated by University of Melbourne Careers Specialists"
- **Redistribution note:** These PDFs sit behind UoM SSO; keep provenance lines but check redistribution norms before any external publication.

## Re-pull instructions

```bash
# Requires: firecrawl CLI logged in, UoM SSO credentials, Okta MFA access

# 1. Authenticate (interactive browser session — needs username + password + Okta push)
firecrawl scrape "https://careersonline.unimelb.edu.au/s/jobinsightsreports" --profile uom-jir

# 2. Rebuild manifest (if URLs changed)
python3 build_manifest.py

# 3. Rebuild DFVA-JIR map (if programs change)
python3 build_map.py

# 4. Download all 141 (uses authenticated profile)
python3 download_jir.py   # requires firecrawl CLI + uom-jir profile

# 5. For clean extraction (vision model, 21 exact matches, ~9 min):
python3 reparse_exact.py  # rate-limited; 8s between requests
```

## Related

- `docs/jobinsights-dfva-integration.md` — original integration analysis (2026-06-21)
- `docs/dfva-graduate-outcomes-report.md` — D10 re-scoring report with band changes
- `data/labour-evidence.json` — structured labour evidence for DFVA pipeline
- `docs/JIR/dfva_jir_map.json` — 47-program mapping with tiers and sample sizes
