/**
 * Fail-closed gates for user-facing commercial claims.
 *
 * The pattern comes from `src/compass/TrustPage.tsx`, which guards its
 * security claims with `ZERO_RETENTION_CONFIRMED`. A claim that rests on a fact
 * nobody has verified is a constant that defaults to `false`, and the UI renders
 * the claim only once someone verifies it and flips the constant. An unverified
 * claim then cannot ship by accident.
 *
 * Flip a constant only when the evidence exists, and say in the comment what
 * that evidence is.
 *
 * Background: docs/dfva-copy-audit.md
 */

/** Ranking one plan above another needs sales data. None exists. */
export const PLAN_POPULARITY_CONFIRMED = false;

/** "Best deal" is a comparative claim. No published comparison supports it. */
export const BEST_DEAL_CONFIRMED = false;

/**
 * `User.credits` is incremented on purchase (`payment/user.ts`) and shown on the
 * account page, but nothing in `src` decrements it. Until something spends
 * credits, no copy may say what a credit buys.
 */
export const CREDITS_SPENDABLE = false;
