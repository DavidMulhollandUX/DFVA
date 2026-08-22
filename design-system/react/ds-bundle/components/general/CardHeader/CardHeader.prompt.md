CardHeader from @evidura/ui. Use via `window.EviduraUI.CardHeader` (bundle loaded from the root `_ds_bundle.js`).

## Props

```ts
interface CardHeaderProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
}
```
