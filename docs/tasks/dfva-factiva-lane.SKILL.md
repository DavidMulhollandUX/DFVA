---
name: dfva-factiva-lane
description: "Use when the DFVA profession research loop needs Factiva (L3 premium trade-press lane). Covers the hybrid auth model: a one-time interactive UoM OpenAthens SSO login exports cookies, after which the loop drives Factiva headlessly until the session expires."
version: 1.0.0
author: DJ Mulholland
license: MIT
metadata:
  hermes:
    tags: [dfva, factiva, openathens, uom, library, trade-press, research]
    related_skills: [dfva-profession-discourse, uom-library-scan]
---

# DFVA Factiva Lane (hybrid auth)

Factiva is the premium L3 trade-press source for the DFVA profession research
workflow. It authenticates through University of Melbourne OpenAthens SSO, which
requires an **interactive username + password** step. The autonomous loop cannot
type your password, so the lane runs as a hybrid:

1. **You** authenticate once (the loop cannot) → cookies are exported.
2. The loop drives Factiva headlessly on those cookies until the server-side
   session expires (typically hours to ~1 day).
3. When searches start returning 403 / Sign-In, re-run step 1 to refresh.

## Why not fully unattended?

Three probes (2026-08-26) confirmed the constraint is structural, not a missing
capability:

| Probe | Method | Result |
|---|---|---|
| 1 | `browser_cookie3` → fresh headless Chromium | Lands at UoM SSO, not authenticated |
| 2 | Direct HTTP POST with extracted cookies | 403 everywhere — session dead server-side |
| 3 | Copied real Chrome profile → persistent context | Lands at OpenAthens sign-in — expired in source too |

OpenAthens holds the session at the IdP. Any headless reuse (cookie-inject or
profile-copy) bounces to the SSO wall once the server-side session lapses. The
loop must therefore treat Factiva as **optional-but-preferred**: use it when a
live session exists, degrade to free L3 sources otherwise, and never attempt an
interactive login itself.

## Re-authenticate (run once, or when cookies expire)

```bash
python3.12 scripts/factiva_reauth.py --port 9223 --export data/factiva_cookies.json --timeout 540
```

This launches an **isolated** Chrome (own temp profile + debug port 9223) so it
does not collide with your live Chrome ("Opening in existing browser session"
was the v1 bug — fixed by forcing `--user-data-dir`). Log in via UoM SSO in the
opened window. The script polls every 10s, then auto-exports cookies from the
CDP session to `data/factiva_cookies.json` and exits.

> NOTE: never run this foreground through a terminal tool with a short timeout —
> the poll can take the full window. Launch detached (nohup / background) and
> read `/tmp/factiva_reauth.log`.

## Search (loop or manual)

```bash
python3.12 scripts/factiva_research.py \
  --cookies data/factiva_cookies.json \
  --query "<occupation> AI disruption OR automation" \
  --from 2025-01-01 --to $(date +%Y-%m-%d) --max 20 \
  --out data/professions/<soc>/raw/factiva.json
```

Modes:
- `--cookies <file>` — headless run on exported session (preferred for loops).
- `--cdp http://127.0.0.1:9222` — drive a live Chrome you have open instead.

Output: JSON `{authenticated, query, window, count, results[]}` where each
result has `{headline, source, date, snippet, url, accessDate}`.

On `authenticated: false` → the session expired. Do NOT attempt SSO. Record the
omission in `corpus.searchesReturningNothing` and fall back to the plan's free
L3 sources, or re-run `factiva_reauth.py`.

## Loop integration

The autoloop job prompt (cron `d533705d8d43`) runs this in L3 step 5. It checks
the cookie file first; if dead, it degrades gracefully and continues. The loop
never blocks on Factiva.

## Coverage gap rule

A record built without Factiva cannot be graded `high` on an L3-led claim set
(per the discourse skill). When Factiva is unavailable, say so plainly in the
report; the omission is a known constraint, not a failure.
