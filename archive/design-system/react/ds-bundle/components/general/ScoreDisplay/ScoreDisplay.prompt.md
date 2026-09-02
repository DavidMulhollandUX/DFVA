ScoreDisplay from @evidura/ui. Use via `window.EviduraUI.ScoreDisplay` (bundle loaded from the root `_ds_bundle.js`).

The durability score, set in the mono face (a score is data), with its band
pill beside it. Never colour the number by band — the badge carries the band.

## Props

```ts
interface ScoreDisplayProps {
  /** Durability score. */
  score: number;
  /** Denominator shown after the score (e.g. 100 or 110). */
  outOf?: number;
  /** Force a band; otherwise derived from the score. */
  band?: "resilient" | "moderate" | "high" | "critical" | "na";
  /** Show the band pill beside the number. */
  showBand?: boolean;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
```
