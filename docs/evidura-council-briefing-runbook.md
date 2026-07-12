# Evidura Council Briefing — Presenter Runbook

15 minutes total, including a live demo of the app. Deck:
`docs/evidura-council-briefing.html` (open in any browser, full-screen).
Demo = live deep-dive of the public report pages on evidura.ai. The
assessment-run flow (`/assess`) is not demoed — it is not live yet.

## Setup (before the room fills)

- [ ] Open the deck in Browser window 1, full-screen.
- [ ] Open Browser window 2 with three tabs pre-loaded and verified:
  - Tab A: <https://evidura.ai/reports/dfva-b-sci>
  - Tab B: <https://evidura.ai/insights/portfolio>
  - Tab C: <https://evidura.ai/insights/faculty/science>
- [ ] Click once inside the deck window so keyboard navigation has focus.

## Deck controls

| Key | Action |
| --- | ------ |
| `→` `↓` `PgDn` `Space` | next slide |
| `←` `↑` `PgUp` | previous slide |
| `1`–`9` | jump to slide 1–9 |
| `0` | jump to slide 10 (Discussion) |
| `Home` / `End` | first / last slide |

The demo CTA on slide 9 ("Open this report live ↗") opens the live report
in a new tab — the deck stays open behind it.

## Run of show (15:00)

| Clock | Beat | Slides |
| ----- | ---- | ------ |
| 0:00–2:00 | Title + origin story | 1–2 |
| 2:00–4:30 | Challenge + Council's questions | 3–4 |
| 4:30–6:00 | Introducing Evidura + alignment | 5–6 |
| 6:00–8:30 | Framework + capabilities | 7–8 |
| 8:30–13:30 | Worked example → live demo | 9 + app |
| 13:30–15:00 | Discussion close | 10 |

Beat notes:

- **Slides 1–2**: on the treemap, point at the graduate-role band; land
  "4.4 average exposure, 6.2 for Bachelor-level roles".
- **Slides 3–4**: the slide-4 payoff line bridges to Evidura — read it,
  don't improvise.
- **Slides 5–6**: slide 5 is one breath; slide 6 is three columns at ~20s
  each.
- **Slide 7**: do NOT read the grid. "Eleven dimensions — capability,
  evidence, currency, irreplaceability." Name only D1, D5, D10.
- **Slide 10**: land the 2026-priorities question and leave it on screen.

Slide 11 (Sources) is a leave-behind — never presented, but flick to it if
a figure is challenged.

## Demo script (~5:00, slide 9 → app → slide 10)

1. **Slide 9 (~1:00).** Walk the mock: 23/36 Moderate, two strong
   dimensions (technical depth, research rigour), two developing (AI
   literacy, human capability), QILT signal, redesign recommendation.
   "This is a real assessment — let me show you."
2. **Click "Open this report live ↗"** (or Cmd-Tab to window 2, Tab A).
   Same program, same 23/36 MODERATE header Council just saw — continuity
   is the point. Stay on the **Overview** tab. Click the **AI literacy &
   governance** and **Human & relational capability** dimension bars
   (1/3 each) to open their evidence popovers — these two developing
   dimensions drive the redesign recommendation. (~1:30)
3. **Tab B: portfolio view.** Risk distribution across the portfolio and
   "programs on the edge" — one insight, not a tour. (~1:00)
4. **Tab C: Faculty of Science.** 14-program table and the faculty
   dimension profile — "every faculty gets this view." (~1:00)
5. **Return to the deck** (Cmd-Tab), press `0` → slide 10. (~0:30 buffer)

## Hazards — do not touch during the demo

- **Curriculum Map tab** on the report page: non-working prototype. Never
  open it.
- **Market tab → "Alumni Data Calibration" upload**: fails with a 401 for
  anonymous visitors.
- **Redesign tab → owner-map assignment form**: also 401.
- Market and Redesign tabs are safe to *view* if a Council member asks —
  just never submit their forms.
- The Science faculty page has no Graduate Outcomes block (by design, not
  broken) — don't promise one.

## If running long — pre-planned cuts (buy back ~2:00)

1. Fold slide 4 into slide 3 verbally ("Council asked four questions —
   this instrument answers the first three") and skip ahead.
2. Skip slide 8; narrate the two capabilities over the demo instead
   ("what you're seeing is the market-intelligence scan feeding the
   redesign advisor").

## Fallback

If evidura.ai is unreachable on the day, slide 9 already contains the
full mock — narrate from it as if it were live, then continue to slide 10.
Nothing else in the deck depends on the network.

## Facts verified against source data (2026-07-12)

- Slide 9 mock matches `dfva/source/assessments.json` for `b-sci`: 23/36,
  MODERATE RISK, D3 3/3, D7 3/3, D5 1/3, D8 1/3, and the same redesign
  recommendation. The live report will not contradict the slide.
- All demo pages are public — no login required; the insights pages'
  premium gate is a pass-through in the current build.

## Note — Claude Design project divergence

Three edits were applied to the repo export only (the design project's
`EVIDURA Council Briefing.dc.html` could not be round-tripped from this
environment): slide 9's footer link became an accent button labelled
"Open this report live ↗" pointing at
`https://evidura.ai/reports/dfva-b-sci`; slide 4 gained a closing payoff
line under the four questions; the deck script gained `1`–`9`/`0`
jump-key navigation. Re-apply these in the Claude Design editor before
any future re-export, or the re-export will silently drop them.
