# Auth

Routes: `/login`, `/signup`, `/request-password-reset`, `/password-reset`,
`/email-verification`, `/account`.
Covered by: `compass/e2e-tests/tests/authRedirectTests.spec.ts` and the helpers
in `compass/e2e-tests/tests/utils.ts`.

## Sub-features

- Email and password signup and login (Wasp forms).
- Redirect: a signed-in visitor to `/login` or `/signup` lands on `/reports`.
- Account page (auth required).

## How to get to it (user POV)

Nav bar → Log in. Signup is linked from the login form.

## Driving it with Playwright

- Use `createRandomUser`, `signUserUp` and `logUserIn` from `tests/utils.ts`.
- Fields are Wasp's own: `input[name="email"]`, `input[name="password"]`;
  buttons `Log in` and `Sign up`.
- After login, wait for `**/reports`.

## Gotchas

- `SKIP_EMAIL_VERIFICATION_IN_DEV=true` must be in `compass/app/.env.server`
  or signup waits for a verification link that only appears in the server log.
  CI sets it; `scripts/doctor.sh` checks it.
- The nav bar is hidden on `/login` and `/signup`.
- The account page has no `h1` and no test ids; match "Account Information".
