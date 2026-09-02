Button from @evidura/ui. Use via `window.EviduraUI.Button` (bundle loaded from the root `_ds_bundle.js`).

Evidura button. One accent per view — reserve `variant="accent"` for the
single most important action; everything else is `primary` or `secondary`.

## Props

```ts
interface ButtonProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "accent" | "secondary" | "ghost";
}
```
