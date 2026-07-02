# Evidura — Logo & Identity Mark

**The primary brand mark, certification seal, lockups and usage rules for Evidura (evidura.ai)**

**Prepared by:** David Mulholland, Associate Director, Service Experience & Design, University of Melbourne
**Date:** 2026-06-24
**Builds on:** [Brand Strategy](compass-brand-strategy.md) · [Naming & DD](compass-naming.md) (Evidura selected; `evidura.ai`)
**Assets:** [`brand/evidura/`](../brand/evidura/)

---

## 1. Inputs

- **Name:** Evidura (coined from *evidence + durability*). Domain `evidura.ai`.
- **Core idea:** the independent durability rating for degrees — **"Durability, made visible."**
- **Personality:** rigorous · independent · precise · sober · premium · modern. *Sage + Magician.* "Instrument-grade trust, made human" — not edtech-playful.
- **Style:** combination mark; rating-agency gravitas (Morningstar) + Stripe clarity.

### Palette

| Token | Hex | Role |
|---|---|---|
| **Ink** | `#0F2236` | Primary. Wordmark, structural shapes, dark tiles. |
| **Signal (amber)** | `#E9A23B` | The single accent — "the signal made visible". One element per mark only. |
| **Paper** | `#F4F2EC` | Light background / reversed ink. Warm off-white, not stark `#FFF`. |
| **Slate** | `#5C7088` | Secondary text / UI only (not the logo). |

**Discipline:** the brand stays Ink + one Signal-amber element. In the *product*, let the rating scale carry green→red (Resilient→Critical); keep brand amber for identity only, so the brand colour never collides with a band colour.

---

## 2. The identity system

A rating agency needs two marks, not one. These share DNA (the Strata-E) and split the work — the Morningstar pattern (a corporate logo + a separate, ownable rating glyph).

- **Primary mark — Strata-E** ([`evidura-mark.svg`](../brand/evidura/evidura-mark.svg)). Three stacked bars that read simultaneously as the letter **E**, as **strata of evidence**, and as a **score made visible**. Top bar amber = the live signal. The everyday logo: app, favicon, UI, avatar. Most ownable, cleanest at 16px.
- **Certification seal — "Evidura-rated"** ([`evidura-seal.svg`](../brand/evidura/evidura-seal.svg)). The Strata-E nested in a ring (the independent standard) with an amber true-north marker. This is the strategy's endgame asset — the displayable badge institutions put on a program page (the B Corp / Health Star move).

---

## 3. Concepts explored

Four directions were generated; the system above is built from the strongest two.

1. **Durability seal** — the stampable certification badge (→ became the seal).
2. **Strata-E** — evidence layers + score made visible (→ became the primary mark). *Recommended.*
3. **Keystone tile** — an architectural spine-and-arms monogram in a rounded tile. *Explored, not shipped:* it introduced a second letterform, so the app tile ([`evidura-tile.svg`](../brand/evidura/evidura-tile.svg)) instead reverses the **Strata-E** out of the rounded ink tile — one glyph across the whole system (bars → bars-in-ring → bars-in-tile).
4. **Datum reticle** — a precision benchmark/reticle (most distinctive, instrument-grade; held as an alternate).

---

## 4. File manifest — [`brand/evidura/`](../brand/evidura/)

| File | What | Use | Background |
|---|---|---|---|
| `evidura-mark.svg` | Strata-E primary mark | App, UI, social, general | Light (set `color:#F4F2EC` for dark) |
| `evidura-mark-ondark.svg` | Strata-E, reversed | Drop-in for dark surfaces (`<img>`) | Dark |
| `evidura-seal.svg` | Certification seal | "Evidura-rated" badge, stamps | Light/dark via `color` |
| `evidura-lockup-horizontal.svg` | Mark + wordmark + strap | Site header, signatures, decks | Light |
| `evidura-lockup-horizontal-ondark.svg` | Horizontal, reversed | Dark headers/footers | Dark |
| `evidura-lockup-stacked.svg` | Mark over wordmark | Square/centred contexts, splash | Light/dark via `color` |
| `evidura-favicon.svg` | Strata-E, tightened | Favicon / ≤24px | Light/dark via `color` |
| `evidura-tile.svg` | Strata-E app tile (rounded container) | App icon, avatar, OG image | Any (fixed colours) |

---

## 5. Usage rules

- **Colour / mono / dark.** Ink parts use `currentColor`; set the root `color` to flip light↔dark. Monochrome = recolour the one amber shape to `currentColor` (it stays a distinct shape, so the mark survives in one colour). The tile is fixed-colour and background-independent by design.
- **Clear space.** Keep padding ≥ one bar-height around the mark; ≥ the ring's stroke width around the seal.
- **Minimum sizes.** Mark ≥ 16px · seal-with-no-text ≥ 20px · horizontal lockup ≥ 120px wide · favicon = the mark only (never the full seal).
- **Don't:** add a second colour; apply gradients/shadows/glow; stretch or re-proportion the bars; set the wordmark in a different typeface; put the brand amber on a rating band.

---

## 6. Production to-do

1. **Outline the `<text>` to vector paths** before shipping — the lockups currently reference Inter / SF Pro and will fall back to a system sans if the font isn't present.
2. **One E geometry everywhere** — mark, seal and tile now all use the strata bars; keep it that way.
3. **Custom-kern the wordmark** (`Ev`, `ra` pairs); evaluate a single-storey *a* and an **amber tittle on the lowercase _i_** — one amber dot ties wordmark to icon without a second colour.
4. **Optically equalise the strata bars** (the top pill reads slightly heavy at small sizes — trim ~4px or raise the radius).
5. **Trademark clearance before adoption** — see [naming DD §4](compass-naming.md): formal search in Nice classes 9 / 35 / 41 / 42, **IP Australia first**, plus vet the `evidura.app` operator and any Evidura/Evidera mark.

*All SVGs are hand-authored, single-accent, and validated at 16px. Type is editable `<text>` pending outlining.*
