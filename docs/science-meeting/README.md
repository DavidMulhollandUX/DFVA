# Faculty of Science meeting — deliverables

Conversation props for the COMPASS **validation** meeting with the UoM Faculty of Science. The meeting is a discovery session — these are artifacts to provoke a reaction (see [compass-science-faculty-questions.md](../compass-science-faculty-questions.md) §3), not slides to lecture from.

All figures are generated from the canonical registry (`compass/app/src/compass/sharedProgramData.ts` + `faculty.ts`) — no hand-typed numbers. The Faculty of Science roster is the 11 programs `getFaculty()` assigns to "Science & Environment" (verified against the UoM Handbook 2026-06; Data Science is Science-owned/jointly-delivered, Biomedical & Epidemiology are MDHS and excluded).

| File | What it is | Artifact-reaction test |
|---|---|---|
| `01-science-onepager.pdf` | A4 portrait — faculty durability read: stats, 11-program table, the twin gap, near-threshold callout | EXP-01 (portfolio read) |
| `02-science-dashboard.pdf` | A4 landscape — per-program cards: score gauge, dimension fingerprint, threshold answers, distance-to-RESILIENT | EXP-01/07 |
| `03-science-rollup.pdf` | A4 portrait — improvement priorities: two moves, illustrative projections, before→after portfolio shift | EXP-05 (redesign reaction) |
| `04-science-deck.html` | 12-slide live deck (arrow keys · F = fullscreen · prints to PDF) — ends on the questions, not an ask | the whole session |

## Regenerate

```bash
# 1. regenerate the three PDF source HTMLs from live data
cd scripts && npx tsx build-science-meeting.ts

# 2. render to PDF (node playwright; python render.py also works if playwright is pip-installed)
cd ../compass/e2e-tests && node -e "see build-science-meeting.ts header for the one-liner"

# 3. visual QA: rasterise + inspect
cd ../../docs/science-meeting && pdftoppm -png -r 150 01-science-onepager.pdf qa && open qa-1.png
```

The deck (`04-science-deck.html`) is hand-maintained; its program list is baked from the registry — refresh it if scores change.

> Brand: COMPASS product tokens (positions the venture). Switch to UoM brand via the `uom-design-system` skill if the collateral should read as official university material.
