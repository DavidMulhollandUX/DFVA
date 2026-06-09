# COMPASS — Artifact-reaction tests

Three interview leave-behinds for the Wave-1 Validate interviews. The point of each is the **reaction**: put a real COMPASS output in front of someone and watch what they *do*, instead of asking "would you want this?". (Experiment backlog §"Artifact tests to prepare".)

| File | Artifact | Arms | What it shows |
|---|---|---|---|
| `01-portfolio-dashboard.pdf` | Portfolio durability read (A4 landscape) | **EXP-01**, EXP-07 | All six scored UoM programs on one page — score gauge, dimension fingerprint, threshold answers, and the one-line "so-what" per program. |
| `02-redesign-roadmap.pdf` | Curriculum redesign roadmap — MC-IS (A4 portrait) | **EXP-05** | The prioritised "what to change" output for one program: diagnosis → 24-month score trajectory (18→23-24→28-30) → sequenced priority moves. |
| `03-accreditation-evidence.pdf` | Accreditation-ready durability evidence (A4 portrait) | **EXP-03**, EXP-09, EXP-12 | What a panel would need to treat the signal as evidence: the frozen instrument, the honest claim, the PROSPECT-DiD protocol, and an illustrative AACSB/TEQSA mapping. |

## Provenance (data is real, not mocked)
- **Scores & dimensions:** `compass-static/src/data/programData.ts` (the frozen 10+1 rubric, 0–3 each, /36; bands RESILIENT 28–36 / MODERATE 20–27 / HIGH 12–19 / CRITICAL 0–11 from `LandingPage.tsx`).
- **Threshold questions & colour logic:** `compass-static/src/components/dfva/ThresholdPanel.tsx`, `DimensionSteps.tsx`, `ScoreArc.tsx` (gauge geometry reproduced as inline SVG).
- **Redesign content (#2):** `reports/dfva-recommend-mc-is.md`.
- **Evidence base & protocol (#3):** `docs/compass-exp04-causal-evidence.md` (the PROSPECT-DiD desk experiment).
- **Design tokens:** the COMPASS product palette (`--ink #11151F`, `--orange #F97316`, risk-band colours) — consistent with `docs/compass-market-map/`.

## Regenerate
Self-contained HTML → print-accurate PDF via Playwright/Chromium (§13.11):
```
cd docs/compass-artifacts
python3 render.py 01-portfolio-dashboard.html landscape
python3 render.py 02-redesign-roadmap.html portrait
python3 render.py 03-accreditation-evidence.html portrait
```
Visual QA (§13.12): `pdftoppm -png -r 150 <file>.pdf qa` then inspect the PNG; zoom suspect regions with `-r 300 -x -y -W -H`.

> Each PDF is an **illustrative artefact for discussion**, not a faculty directive — framing reinforced in each footer.
