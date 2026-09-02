# Archived: Evidura React design-system bundle

Archived on 2026-09-02. `react/ds-bundle` is a generated component bundle
(`@evidura/ui`: Button, BandBadge, ScoreDisplay, Card, StrataMark,
ValidationSignalCard) produced by the `.ds-sync` converter. Nothing in
`compass/app` ever imported it, and the app's components live in
`compass/app/src/client/components/ui` (shadcn style) with tokens in
`compass/app/src/client/Main.css`.

Brand tokens and assets: [`brand/evidura/`](../../brand/evidura/README.md).
Reactivate only by wiring `BandBadge` and `ScoreDisplay` into
`compass/app/src/compass/v4/V4StatusBadge.tsx` and the `Stat` components,
which is the adoption path the 2026-09-02 review described.
