# DFVA Score Reconciliation (2026-06-22)

## The scoring formula (the answer)

A program's total is the **plain sum of all 11 dimension scores** — D1–D10 (core) + B (Irreplaceability bonus), each 0–3, **bonus counted ×1, no weighting**:

```
total = Σ dimensions[i].score        max achievable = 11 × 3 = 33
```

Evidence: 22 of 41 programs already had `score == sum(dimensions)` exactly, and no other formula (e.g. core-only, or bonus ×2) reproduces those totals. There is **no 12th dimension** and the bonus is **not** double-weighted, so the documented "**/36**" / `MAX_SCORE = 36` is a **legacy nominal ceiling** — nothing can score above 33. This is now codified in [dfva/source/rubric.ts](../dfva/source/rubric.ts) as `MAX_ACHIEVABLE_SCORE = 33`, `totalScore(dimensions)`, and `bandForScore(score)`, with a comment establishing the invariant `score === totalScore(dimensions)`.

## What was wrong

- **19 of 41** programs had `score ≠ sum(dimensions)` (Δ from −4 to +2), in both directions — i.e. independently hand-entered totals that drifted from the dimension breakdown.
- The `reportMeta` badge map in `ReportDetailPage.tsx` was *already* inconsistent with the registry for 4 programs, so `dfva:check` was failing before this work.

## What changed (source-of-truth first)

| Surface | Change |
|---|---|
| [dfva/source/rubric.ts](../dfva/source/rubric.ts) | Documented the formula; added `MAX_ACHIEVABLE_SCORE`, `totalScore()`, `bandForScore()`. Passes `dfva:check` (not part of generated output). |
| [sharedProgramData.ts](../compass/app/src/compass/sharedProgramData.ts) | Set `score = sum(dimensions)` for the **39 complete-dim programs** (17 actually changed); updated `riskBand` to match. **Dimensions are treated as authoritative** (rubric-grounded). |
| `ReportDetailPage.tsx` | `reportMeta` score/band map re-synced to the registry (all 41). |
| `reports/dfva-recommend-*.md` + `reportContent.recommend-all.ts` | Regenerated so the recommend reports (archive **and** the app-served copy) show reconciled totals. |

`npm --prefix scripts run dfva:check` → **OK** (41 programs consistent across app registry, reports/, REPORT_CONTENT, and reportMeta; the one warning — compass-static 35 behind — is pre-existing/decommissioned).

## Risk-band changes (review these)

Reconciliation moved 3 programs across a band boundary. These follow directly from the dimension scores; if a *dimension* (not the total) was the original error, revisit:

| Program | Score | Band: was → now |
|---|---|---|
| 527cl (Clinical Psychology) | 27 → **28** | MODERATE RISK → **RESILIENT** |
| mc-base (Social Enterprise) | 18 → **20** | HIGH RISK → **MODERATE RISK** |
| mc-scwr (Screenwriting) | 11 → **12** | CRITICAL → **HIGH RISK** |

## Structurally-broken programs — NOT auto-fixed (flagged in-code)

Two programs have **only 10 of 11 dimensions** recorded *and* a stored score that is **mathematically impossible** for any 11-dimension completion. Their `score` was left unchanged and a `FIXME(dfva-data)` comment was added; they need reassessment (the missing dimension's score cannot be inferred):

| Program | Dims | 10 present sum to | Stored score | Max possible (sum + 3) |
|---|---|---|---|---|
| mc-tesol (TESOL) | 10 | 19 | 23 | 22 → **impossible** |
| mc-urbhort (Urban Horticulture) | 10 | 21 | 25 | 24 → **impossible** |

## Known remaining work (out of safe scope here)

1. **Assessment-report narrative bodies** (`reports/dfva-{code}.md` and the app-served inline copies in `reportContent.ts`) still contain LLM-generated prose referencing the old totals/bands for the 17 changed programs. `dfva:check` does **not** value-check these, so CI is green, but the assessment *body* text lags the badge/recommend. Faithful correction needs the report pipeline (`scripts/generate-full-reports.py`), not hand-edits — re-run it for the 17 changed programs, especially the 3 band-changers.
2. **The "/36" denominator**: achievable max is 33. Migrating `MAX_SCORE`/`maxScore`/"/36"/band ceilings to 33 is a wide, separate change; kept as the nominal published scale for now and documented via `MAX_ACHIEVABLE_SCORE`.
