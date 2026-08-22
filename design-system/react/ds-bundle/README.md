# Evidura UI — how to build with it

Evidura is a **rating-agency** design system: sober, evidence-led, one amber accent on ink and warm paper. Components are imported from `@evidura/ui` and rendered from `window.EviduraUI.*`.

## Setup

Import the stylesheet **once** at the app root — it carries the tokens, the component styles, and the brand webfonts (Inter, Source Code Pro, Fraunces, loaded from Google Fonts):

```jsx
import "@evidura/ui/styles.css";
import { Button, ScoreDisplay, BandBadge } from "@evidura/ui";
```

**No provider or context wrapper is required.** Light/dark follow `prefers-color-scheme`; to pin a theme, set `color`/`background` (or the tokens) on a container.

## Styling idiom — props, then tokens

Components are styled through **props, not utility classes** — there is no Tailwind/utility vocabulary here. Compose behaviour via the documented props:

- `Button` — `variant`: `primary` | `accent` | `secondary` | `ghost`; `size`: `sm` | `md` | `lg`. Use **`accent` at most once per view** (it's the single amber CTA).
- `BandBadge` — `band`: `resilient` | `moderate` | `high` | `critical` | `na`. This is the durability rating scale; never use the brand amber as a band.
- `ScoreDisplay` — `score`, `outOf`, `showBand`; derives the band from the score unless you pass `band`.
- `Card` / `CardHeader` / `CardTitle` / `CardBody` — surface container and its parts.
- `StrataMark` — the Evidura logo mark; `size`, `mono`.
- `ValidationSignalCard` — an evidence card; pass a `signal` object.

For **your own layout glue** (grids, spacing, one-off text), style with the Evidura CSS custom properties — never hardcode hex or invent class names:

- Colour: `var(--evidura-ink)`, `var(--evidura-signal)`, `var(--evidura-paper)`, `var(--evidura-fg)`, `var(--evidura-bg)`, `var(--evidura-muted)`, `var(--evidura-border)`, band colours `var(--evidura-band-resilient|moderate|high|critical)`
- Space (4px scale): `var(--evidura-space-1…24)`
- Radius: `var(--evidura-radius-sm|md|lg|pill)`
- Type: `var(--evidura-font-sans)` (Inter — UI/body), `var(--evidura-font-mono)` (scores, data), `var(--evidura-font-serif)` (Fraunces — marketing display only)

## Where the truth lives

Read `styles.css` and its `@import`s (tokens + `_ds_bundle.css`) for the full token set, and each component's `<Name>.d.ts` (props) and `<Name>.prompt.md` (usage) before composing.

## Idiomatic example

```jsx
import { Card, CardHeader, CardTitle, CardBody, ScoreDisplay, Button } from "@evidura/ui";

<Card interactive style={{ maxWidth: "var(--evidura-space-24)" }}>
  <CardHeader><CardTitle>Master of Computer Science</CardTitle></CardHeader>
  <CardBody>
    <ScoreDisplay score={72} outOf={100} />
    <p style={{ marginTop: "var(--evidura-space-3)", color: "var(--evidura-muted)" }}>
      Durability rating for the 2027 cohort.
    </p>
    <div style={{ marginTop: "var(--evidura-space-4)" }}>
      <Button variant="accent">View rating</Button>
    </div>
  </CardBody>
</Card>
```

# EviduraUI (@evidura/ui@0.1.0)

This design system is the published @evidura/ui React library, bundled as a single
browser global. All 9 components are the real upstream code.

## Where things are

- `_ds_bundle.js` — the whole-DS bundle at the project root; loads every component to `window.EviduraUI`. First line is a `/* @ds-bundle: … */` metadata header.
- `styles.css` — the single stylesheet entry: it `@import`s the tokens, fonts, and component styles (`_ds_bundle.css`). Link this one file.
- `components/<group>/<Name>/<Name>.prompt.md` (example JSX + variants), `<Name>.d.ts` (types), `<Name>.html` (variant grid).
- `tokens/*.css` — CSS custom properties, names verbatim from upstream.
- `fonts/` — `@font-face` files + `fonts.css` (when the package ships fonts).

For a specific component, `read_file("components/<group>/<Name>/<Name>.prompt.md")`.

## Loading

Add these two lines to your page once (React must be on the page first):

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
```

Components are then available at `window.EviduraUI.*`. Mount into a dedicated child node (e.g. `<div id="ds-root">`), not the host page's own React root, so the two trees don't collide:

```jsx
const { BandBadge } = window.EviduraUI;
ReactDOM.createRoot(document.getElementById('ds-root')).render(<BandBadge />);
```

## Tokens

61 CSS custom properties from @evidura/ui. Names are
preserved verbatim from upstream. They are declared inside `_ds_bundle.css` (this DS ships one compiled stylesheet rather than separate token files).

- **color** (9): `--evidura-bg-2`, `--evidura-text-xs`, `--evidura-text-sm`, …
- **spacing** (9): `--evidura-space-1`, `--evidura-space-2`, `--evidura-space-3`, …
- **typography** (7): `--evidura-font-sans`, `--evidura-font-serif`, `--evidura-font-mono`, …
- **radius** (4): `--evidura-radius-sm`, `--evidura-radius-md`, `--evidura-radius-lg`, …
- **shadow** (3): `--evidura-shadow-sm`, `--evidura-shadow-md`, `--evidura-shadow-lg`
- **other** (29): `--evidura-ink`, `--evidura-signal`, `--evidura-paper`, …

## Components

### general
- `BandBadge` — Durability-rating band pill (Resilient  Critical). Product-UI only  this
- `Button` — Evidura button. One accent per view  reserve variantaccent for the
- `Card` — Surface container  radius md, soft ink shadow, bg-2/border chrome.
- `CardBody`
- `CardHeader`
- `CardTitle`
- `ScoreDisplay` — The durability score, set in the mono face (a score is data), with its band
- `StrataMark` — The Evidura primary mark (Strata-E): three stacked pill bars reading as the
- `ValidationSignalCard` — A single piece of market evidence backing an assessment  source, excerpt,
