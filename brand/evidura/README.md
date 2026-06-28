# Evidura — Brand Assets

The visual identity for **Evidura** — *the independent durability rating for university degrees.* "Durability, made visible."

> Full rationale, concepts and usage rules: [`docs/evidura-logo.md`](../../docs/evidura-logo.md). Strategy: [`docs/compass-brand-strategy.md`](../../docs/compass-brand-strategy.md). Name selection & trademark DD: [`docs/compass-naming.md`](../../docs/compass-naming.md).

## Brand architecture

| Layer | Name | Use |
|---|---|---|
| **Master brand** | **Evidura** | The company / platform. Replaces the working name "COMPASS". |
| **Consumer signal** | **Durability Rating** | The score + bands (Resilient → Critical) shown to users. |
| **Methodology (engine)** | **DFVA** (Degree Future-Viability Assessment) | Internal — produces the rating. Not used in external/marketing copy. |

## Assets

| File | What | Use |
|---|---|---|
| `evidura-mark.svg` / `-ondark.svg` | Strata-E primary mark | App, UI, social, general |
| `evidura-seal.svg` | "Evidura-rated" certification seal | Displayable badge / stamps |
| `evidura-lockup-horizontal.svg` / `-ondark.svg` | Mark + wordmark + strap | Headers, signatures, decks |
| `evidura-lockup-stacked.svg` | Mark over wordmark | Square / centred contexts |
| `evidura-favicon.svg` | Strata-E, tightened | Favicon / ≤24px |
| `evidura-tile.svg` | Strata-E in rounded tile | App icon, avatar, OG image |
| `evidura-og.svg` | 1200×630 social card | Open Graph / Twitter card |
| `tokens.css` | Design tokens (colours, type, radius, band scale) | Single source of truth — import at app root |

## Palette (see `tokens.css` for the full set)

| Token | Hex | Role |
|---|---|---|
| Ink | `#0F2236` | Primary — text, structural shapes |
| Signal (amber) | `#E9A23B` | The single accent — fills/accents only, never body text on light |
| Paper | `#F4F2EC` | Warm off-white background |
| Slate | `#5C7088` | Secondary text / chrome |

**Rating bands (product UI):** Resilient `#1F9D6B` · Moderate `#E9A23B` · High `#E0742F` · Critical `#C7433A`.

## Type

- **Inter** — UI + the wordmark (geometric sans).
- **Fraunces** — editorial / marketing display headlines only.
- **Source Code Pro** — mono / data.

## Rules (short)

- One accent. Ink + a single amber element per mark — no second colour, no gradients/shadows/glow.
- `currentColor` drives ink parts: set root `color` to flip light ↔ dark. The tile and OG card are fixed-colour (background-independent).
- Monochrome = recolour the one amber shape to `currentColor`.
- Keep the brand amber off the rating bands in the same view (identity amber ≠ "Moderate" band).
- Min sizes: mark ≥ 16px · horizontal lockup ≥ 120px wide · favicon = the mark only (never the full seal).

## Before public launch

Trademark clearance is a hard gate — Nice classes 9 / 35 / 41 / 42, **IP Australia first**, plus vet the `evidura.app` operator (see [naming DD §4](../../docs/compass-naming.md)). Applying the brand inside this repo and the in-dev app is fine; public commercial launch (paid domain, the certification seal in market) waits on clearance.
