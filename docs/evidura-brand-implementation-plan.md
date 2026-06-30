# Evidura — Brand Implementation Plan (Wasp app)

**Applying the Evidura identity — visual system + content/marketing — to the `compass/app` Wasp/OpenSaaS application**

**Prepared by:** David Mulholland, Associate Director, Service Experience & Design, University of Melbourne
**Date:** 2026-06-24
**Builds on:** [Brand strategy](compass-brand-strategy.md) · [Logo system](evidura-logo.md) · [Brand assets + tokens](../brand/evidura/) · [Naming & trademark DD](compass-naming.md)
**Target:** `compass/app` — Wasp 0.22, OpenSaaS, React 19, Tailwind v4.

---

## 0. Current state (what's branded as COMPASS today)

| Surface | File | Now |
|---|---|---|
| App title / OG / email sender | `main.wasp` (L6, L16–21, L35–36, L90–91) | "COMPASS – Degree Future-Viability Assessor"; OG on `compass.unimelb.edu.au`; `compass@unimelb.edu.au` |
| Logo + name | `src/client/components/NavBar/NavBar.tsx` (L74–87, `CompassSVG` L242–276) | Inline compass-needle SVG (north tick `#f97316`) + hardcoded "COMPASS" |
| Theme tokens | `src/client/Main.css` (`:root`, `@theme inline`, L9–148) | HSL vars: `--primary 210 100% 13%`, `--secondary 32 100% 37%`, `--accent 33 74% 62%`; **no web fonts** (system stack) |
| Risk bands | `src/compass/sharedProgramData.ts` (`riskBandConfig` L1153–1189) + duplicated inline in `Hero.tsx` (L42–48) & `ReportDetailPage.tsx` (L49–57) | Tailwind `emerald / yellow / orange / red` classes |
| Hero copy | `src/landing-page/components/Hero.tsx` (L15, L20–23) | "Does your curriculum prepare graduates for an AI-augmented workforce?" / "COMPASS gives…" |
| Features + FAQ | `src/landing-page/contentSections.tsx` | 9 features with emoji (🎯📊📈🤖…); FAQ refers to "COMPASS" |
| Brand strings | scattered across JSX | **No central brand-config file** |
| Favicon / OG image | `public/favicon.ico`, `public/public-banner.webp` | Compass icon; 800×400 banner |

**Implication:** brand strings are scattered, colours live in one `Main.css` token block (good — single re-theme point), and risk-band styling is duplicated in three places (consolidate). No fonts loaded (clean win available).

---

## 1. Principles

1. **One re-theme point.** Map Evidura tokens into the existing `Main.css` HSL vars; the whole app re-skins from there. Don't scatter hex values in components.
2. **Brand architecture in copy.** External surfaces say **Evidura** and **Durability Rating**; keep **DFVA** for internal/engine/docs only (rename `AssessorPage` subtitle, report titles, prompts last and carefully).
3. **Ink + one signal.** Amber is an accent, never body text on light. Inside a rating view, reserve amber for the **Moderate** band only — don't also use it as a generic accent there.
4. **Decision-support voice.** Sober, evidence-led, unhedged — never doom, never edtech-cute (this kills the emoji feature grid). See the [voice table](compass-brand-strategy.md) (§3).
5. **Clearance gate.** Rebrand freely in-repo and in dev. Do **not** ship `evidura.ai` public OG/canonical URLs or the public certification seal until trademark clearance passes (naming DD §4). The institutional pilot can run on a `unimelb` subdomain in the meantime.

---

## 2. Visual implementation

### 2.1 Tokens → Tailwind (`src/client/Main.css`)

Import [`brand/evidura/tokens.css`](../brand/evidura/tokens.css) as the source of truth, then set the app's HSL `:root` vars to these Evidura conversions:

| `Main.css` var | Current (light) | → Evidura (light) | Maps to |
|---|---|---|---|
| `--primary` | `210 100% 13%` | `211 57% 13%` | **Ink** (text, primary buttons) |
| `--secondary` / `--accent` | `32 100% 37%` / `33 74% 62%` | `36 80% 57%` | **Signal** amber (accents only) |
| `--background` | `0 0% 100%` | `45 27% 94%` | **Paper** (warm off-white) |
| `--foreground` | `0 0% 3.9%` | `211 57% 13%` | **Ink** |
| `--muted-foreground` | (gray) | `213 19% 45%` | **Slate** |
| `--success` | `141 71% 48%` | `156 67% 37%` | band: Resilient |
| `--warning` | `36 100% 50%` | `36 80% 57%` | band: Moderate (= Signal) |
| `--destructive` | `0 84% 60%` | `4 56% 50%` | band: Critical |

Dark mode (`.dark` block): `--background → 211 57% 13%` (Ink) or deeper `210 50% 5%`; `--foreground → 45 27% 94%` (Paper); `--muted-foreground → 210 15% 65%`.

Add the **band ramp** to `@theme inline` so the product UI uses semantic utilities, not raw Tailwind colours:
`--color-band-resilient: #1F9D6B; --color-band-moderate: #E9A23B; --color-band-high: #E0742F; --color-band-critical: #C7433A;` → enables `bg-band-resilient`, `text-band-critical`, etc.

### 2.2 Logo & favicon

- **Replace `CompassSVG`** (NavBar.tsx L242–276) with an `EviduraMark` component rendering the Strata-E (port [`evidura-mark.svg`](../brand/evidura/evidura-mark.svg); use `currentColor` so it inherits nav text colour). Update the brand text "COMPASS" → "Evidura" (L85).
- **Favicon:** generate `favicon.ico` + `favicon-32.png` + `apple-touch-icon.png` from [`evidura-favicon.svg`](../brand/evidura/evidura-favicon.svg); also ship `public/favicon.svg` and reference it in `main.wasp` head (`<link rel="icon" href="/favicon.svg">`). Retire the compass `.ico`.
- **App tile / PWA:** use [`evidura-tile.svg`](../brand/evidura/evidura-tile.svg) for `apple-touch-icon` and any manifest icons.

### 2.3 Typography

No fonts load today. Add to `main.wasp` head (or self-host via `@fontsource`):
- **Inter** — UI + nav wordmark.
- **Fraunces** — marketing/editorial headlines only (hero H1, section titles).
- **Source Code Pro** — code/score/mono.
Then set Tailwind `fontFamily` (in `@theme inline`): `--font-sans: 'Inter',…`, `--font-serif: 'Fraunces',…`, `--font-mono:'Source Code Pro',…` (mirror [`tokens.css`](../brand/evidura/tokens.css)). Hero/section headings switch to `font-serif`; everything else `font-sans`.

### 2.4 Rating-band system

- **Consolidate to one source:** make `riskBandConfig` in `sharedProgramData.ts` the only definition; delete the inline band maps in `Hero.tsx` (L42–48) and `ReportDetailPage.tsx` (L49–57) and import the config.
- **Re-map to band tokens:** `emerald→band-resilient`, `yellow→band-moderate`, `orange→band-high`, `red→band-critical` (and the `dimBarColor` thresholds at L1197–1202).
- **Discipline:** in a score/report view, amber appears only as the Moderate band; use Ink/Slate for other UI accents so the brand colour never reads as a band signal.

### 2.5 Component restyle priority

1. **NavBar** — mark + "Evidura", Paper/Ink surfaces, Inter.
2. **Hero** — Fraunces H1, Ink on Paper, single amber CTA, the live score chip.
3. **Buttons / links** — primary = Ink; accent/CTA = Signal; radius from tokens.
4. **Cards / badges / FAQ** — Paper surfaces, Ink-100 hairlines, band tokens.
5. **Footer** — Evidura + UoM attribution, stacked lockup.
6. **Auth pages** (`AuthPageLayout.tsx`) — add the stacked lockup above the form.

### 2.6 Social / favicon assets

Regenerate from SVG: `public-banner.webp` → from [`evidura-og.svg`](../brand/evidura/evidura-og.svg) (export 1200×630 PNG/WebP); favicons per §2.2. Update OG/Twitter image refs in `main.wasp` (L20–21).

---

## 3. Content & marketing implementation

### 3.0 Confidentiality-first framing (post-premortem update, June 2026)

The brand strategy was written for a public rating agency. The premortem identified that universities are reputation-protection machines — they will suppress unfavourable ratings, not pay for them. The survivable model is confidential benchmarking with opt-in public display.

**Vocabulary changes across all copy:**
- "Rating" → "Assessment" (where public-facing or institutional-customer-facing)
- "Durability Rating" → "Durability Assessment" (the consumer signal name)
- "Rating agency" → "Confidential benchmarking service" (in strategy docs, investor comms, partner briefings)
- "The signal everyone demands" → "The insight institutions commission" (in narrative/messaging)

**What does NOT change:**
- The band vocabulary (RESILIENT / MODERATE / HIGH / CRITICAL) — confidentiality doesn't change the verdict
- The scoring system (0–36, 11 dimensions) — the product is the same, the distribution model is different
- The visual identity — instrument-grade trust works for confidential assessments too
- The tagline "Durability, made visible" — it's about insight, not publication

**Routing rule:** Any copy that describes who *sees* the score must include the confidentiality guarantee. Any copy that describes the score itself is unchanged.

### 3.1 Central brand config

Create `src/branding/brandConfig.ts` — `{ name: "Evidura", legalNote, signalName: "Durability Assessment", methodology: "DFVA", domain: "evidura.ai", tagline: "Durability, made visible.", confidentialityNote }` — and replace every scattered "COMPASS" string (NavBar, Hero, contentSections, AssessorPage, main.wasp where possible) with imports. One place to evolve copy.

### 3.2 Messaging pillars → page structure

Turn the strategy's four pillars into the landing narrative (one section each):
1. **Durability, made visible** — the hero.
2. **Independent · evidence-led · citable** — the trust section (rubric, sources: QILT/JSA/AIOE).
3. **At the moment of decision** — design / approval / enrolment use-cases.
4. **An instrument for the decision-maker, not a verdict** — the human-in-the-loop / governance section (the NTEU-safe framing).

### 3.3 Hero rewrite (Hero.tsx)

- **H1 (Fraunces):** "Will this degree still be worth choosing in an AI-shaped labour market?" — or the proposition lead, "Durability, made visible."
- **Sub:** "Evidura is the independent durability rating for university degrees — a trusted, comparable signal of economic durability, delivered at the point of design, approval and enrolment."
- **Badge:** keep "Prototype · University of Melbourne" (honest); drop once launched.
- **CTAs:** primary "See a Durability Rating →" (Signal), secondary "Example reports" (ghost).

### 3.4 Feature grid & FAQ (contentSections.tsx)

- **Remove emoji** — replace with restrained line icons or the band/score motif; emoji contradicts "instrument-grade trust".
- Reframe feature names around the rating ("Durability score", "Risk bands", "Labour-market signal", "AI-literacy gap", "Redesign roadmap").
- FAQ: swap "COMPASS" → "Evidura"; add "What is a Durability Rating?" and "Does Evidura decide which programs to cut?" (answer: no — decision-support).

### 3.5 Voice & microcopy

Apply the [voice rules](compass-brand-strategy.md) (§3): lead with the verdict, cite the number, no hype, no doom, no academic hedging. Audit button labels, empty states, loading copy, toasts.

### 3.6 SEO / metadata (`main.wasp`)

- Title → "Evidura — the durability rating for degrees"; description/keywords reframed around "degree durability rating", "AI labour-market", "curriculum durability".
- OG title/site_name → Evidura; OG image → new card.
- **Canonical domain:** decide `evidura.ai` (public) vs a `unimelb` subdomain (pilot). Keep the pilot subdomain and `noindex` until clearance + DNS; don't publish `evidura.ai` URLs early.

### 3.7 Content-marketing surfaces

- **"Insights" route already exists** — make it the content hub: short evidence-led pieces in the brand voice (the methodology, dimension explainers, sector signals).
- **The annual index** — scaffold a "State of Degree Durability" report page (owns the category conversation; feeds the legitimacy/citation moat).
- **The "Evidura-rated" seal** — a `/rated` explainer + the embeddable badge ([`evidura-seal.svg`](../brand/evidura/evidura-seal.svg)) — **post-clearance**.
- **Agent-native angle** — a page documenting the MCP (`dfva-mcp`) as "the durability signal your AI agents can cite" — a genuinely differentiated 2027 content pillar.

---

## 4. Phased rollout

| Phase | Scope | Key files | Done when |
|---|---|---|---|
| **P0 — Foundation** | tokens→`Main.css`; fonts; `EviduraMark` + nav name; favicon/svg; `brandConfig.ts` | `Main.css`, `NavBar.tsx`, `main.wasp`, `public/`, new `brandConfig.ts` | App renders in Ink/Signal/Paper + Inter; nav shows Evidura mark; favicon swapped |
| **P1 — Front door** | hero, footer, auth lockup, SEO/OG metadata | `Hero.tsx`, `Footer.tsx`, `AuthPageLayout.tsx`, `main.wasp` | Landing reads as Evidura; OG card correct; light+dark pass |
| **P2 — Product UI** | consolidate + re-map risk bands; dimension bars; `AssessorPage`/report copy (DFVA→Durability Rating externally) | `sharedProgramData.ts`, `Hero.tsx`, `ReportDetailPage.tsx`, `AssessorPage.tsx` | One band config; band tokens everywhere; no emerald/red literals |
| **P3 — Content** | features/FAQ rewrite (de-emoji); Insights hub; voice audit | `contentSections.tsx`, Insights pages | Copy on-voice; pillars live; no emoji |
| **P4 — Launch (gated)** | `evidura.ai` canonical + OG; certification seal `/rated`; index page | `main.wasp`, new routes | **Only after** trademark clearance |

---

## 5. File-change map

| File | Change | Phase |
|---|---|---|
| `src/client/Main.css` | HSL token re-map + band ramp + fontFamily | P0 |
| `main.wasp` | title/desc/OG/email sender; font `<link>`; favicon | P0/P1 |
| `src/client/components/NavBar/NavBar.tsx` | `CompassSVG`→`EviduraMark`; "COMPASS"→"Evidura" | P0 |
| `public/favicon.*`, `public/public-banner.webp` | regenerate from SVGs | P0/P1 |
| `src/branding/brandConfig.ts` *(new)* | central strings | P0 |
| `src/landing-page/components/Hero.tsx` | copy + bands import + type | P1/P2 |
| `src/landing-page/components/Footer.tsx` | lockup + attribution | P1 |
| `src/auth/AuthPageLayout.tsx` | stacked lockup | P1 |
| `src/compass/sharedProgramData.ts` | sole `riskBandConfig`; band tokens; `dimBarColor` | P2 |
| `src/compass/ReportDetailPage.tsx`, `AssessorPage.tsx` | use shared config; DFVA→Durability Rating in user copy | P2 |
| `src/landing-page/contentSections.tsx` | de-emoji + reframe + FAQ | P3 |

---

## 6. Verification & guardrails

- **Verify** after P0/P1: `cd compass/app && wasp start`; check nav mark, hero, buttons in **light and dark**; favicon in the tab; OG card via a link-preview; bands on a report. Screenshot before/after.
- **Don't:** introduce a second accent colour; keep emoji in the brand surface; hardcode hex in components (use tokens); surface "DFVA" in marketing copy; publish `evidura.ai` URLs or the seal pre-clearance.
- **Accessibility:** Signal amber fails contrast as text on Paper — use Ink for text, `--evidura-signal-700` for amber links; verify band badges meet 4.5:1.
- **Rename caution:** changing `dfvaPrompt.ts` / report-content strings affects scoring output and saved reports — do P2 last, with a smoke test (`.hermes/smoke-test-runbook.md`).

*Source of truth for all colours/type: [`brand/evidura/tokens.css`](../brand/evidura/tokens.css). Logo rules: [`docs/evidura-logo.md`](evidura-logo.md).*
