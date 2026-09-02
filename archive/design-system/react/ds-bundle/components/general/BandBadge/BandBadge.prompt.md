BandBadge from @evidura/ui. Use via `window.EviduraUI.BandBadge` (bundle loaded from the root `_ds_bundle.js`).

Durability-rating band pill (Resilient → Critical). Product-UI only — this
is the rating scale, never the brand identity. Uses the band-colour tokens,
not the brand amber.

## Props

```ts
interface BandBadgeProps {
  band: "resilient" | "moderate" | "high" | "critical" | "na";
  /** Override the label text (defaults to the band's name). */
  label?: string;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
```
