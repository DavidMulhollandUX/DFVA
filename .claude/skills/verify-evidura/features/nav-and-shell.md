# Navigation and page shell

Routes: `/`, `/pricing`, `/developers`, `/trust`, `/why-structured-data`,
`/privacy`, `/terms`.
Covered by: `compass/e2e-tests/tests/landingPageTests.spec.ts`,
`pricingPageTests.spec.ts` and `tests/compass/assess.spec.ts`.

## Sub-features

- Global nav bar (`compass/app/src/client/components/NavBar/`): Assess, Reports,
  Insights, brand link, theme toggle, login or user menu.
- Prototype banner (`compass/app/src/client/components/PrototypeBanner.tsx`).
- Cookie consent banner.
- Landing page (`compass/app/src/landing-page/`), pricing, developer portal,
  trust and legal pages.

## How to get to it (user POV)

Every page except `/login`, `/signup` and `/admin/*` renders the banner and nav.
Pricing, developers, trust and account are not in the nav; reach them by URL or
from the footer.

## Driving it with Playwright

- Nav: `nav[aria-label="Global"]`; links by text `Assess`, `Reports`, `Insights`.
- Landing `h1` contains "worth choosing"; the example-report link has the
  accessible name "View an example report".
- Cookie banner buttons: `Accept all`, `Reject all`; cookie name `cc_cookie`.
- Prototype banner: `role="status"`; dismissal is stored in `localStorage`
  under `evidura-prototype-banner-dismissed`.
- Pricing has no `h1`; its buy buttons read "Log in to buy plan" when signed out.
- Developer portal `h1` is "Developer Portal", with anchors `#code-snippets`
  and `#api-keys`.

## Gotchas

- The banner shifts layout on a fresh profile; dismiss it before pixel
  comparisons.
- A developers compare page is listed in some rules files but is not a route.
