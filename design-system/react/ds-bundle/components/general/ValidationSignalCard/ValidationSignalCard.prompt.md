ValidationSignalCard from @evidura/ui. Use via `window.EviduraUI.ValidationSignalCard` (bundle loaded from the root `_ds_bundle.js`).

A single piece of market evidence backing an assessment — source, excerpt,
credibility (0–5), and a link out. Refactored onto Evidura tokens.

## Props

```ts
interface ValidationSignalCardProps {
  signal?: ValidationSignal;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
```
