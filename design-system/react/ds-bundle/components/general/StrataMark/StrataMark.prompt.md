StrataMark from @evidura/ui. Use via `window.EviduraUI.StrataMark` (bundle loaded from the root `_ds_bundle.js`).

The Evidura primary mark (Strata-E): three stacked pill bars reading as the
letter E, strata of evidence, and a score made visible. Ink parts use
`currentColor` — set `color` on an ancestor to flip light ↔ dark. The top
bar is the amber signal unless `mono`.

## Props

```ts
interface StrataMarkProps {
  /** Pixel size (width & height). */
  size?: number;
  /** Render all three bars in one colour (no amber signal bar). */
  mono?: boolean;
  /** Accessible title; set to "" for a decorative mark. */
  title?: string;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
}
```
