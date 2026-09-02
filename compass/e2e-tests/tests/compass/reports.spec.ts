import { test, expect, type Page } from '@playwright/test';

/**
 * The v4-first reports index and the report-page dispatcher, ported from the
 * retired smoke-run.mjs. Every selector here is a data-testid the page owns;
 * .claude/skills/verify-evidura/features/report-page.md lists them.
 *
 * Report bodies are lazy chunks, so first paint on a dev server can take
 * longer than the default expect timeout; LOAD is the allowance for that.
 */
const LOAD = { timeout: 15_000 };

// v1 instrument vocabulary must never reach a reader through a v4 page.
// renderedV4Bodies.test.ts pins the markdown; this pins the rendered DOM.
const V1_VOCABULARY = /\b\d{1,2}\/36\b|\b(MODERATE|HIGH|LOW) RISK\b|\bRESILIENT\b/;

const cardsOn = async (page: Page) => {
  const cards = page.locator('[data-testid="report-card"]');
  await expect(cards.first()).toBeVisible(LOAD);
  return cards;
};

test.describe('/reports — v4-first index', () => {
  test('lists every program with one report link each', async ({ page }) => {
    await page.goto('/reports');
    const cards = await cardsOn(page);
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(90);
    await expect(page.locator('[data-testid="durability-report-link"]')).toHaveCount(count);
    // No card links to a legacy dfva-* slug; those are reached from the report page.
    await expect(page.locator('[data-testid="report-card"] a[href^="/reports/dfva-"]')).toHaveCount(0);
  });

  test('shows current and research statuses', async ({ page }) => {
    await page.goto('/reports');
    await cardsOn(page);
    expect(await page.locator('[data-testid="status-current"]').count()).toBeGreaterThanOrEqual(60);
    expect(await page.locator('[data-testid="status-research"]').count()).toBeGreaterThan(0);
  });

  test('the Status facet narrows the list', async ({ page }) => {
    await page.goto('/reports');
    const cards = await cardsOn(page);
    const all = await cards.count();
    await page.getByLabel('Status').selectOption('research');
    await expect.poll(() => cards.count()).toBeLessThan(all);
    expect(await cards.count()).toBeGreaterThan(0);
  });
});

test.describe('/reports/:slug — dispatcher', () => {
  test('a scored program renders the v4 finding', async ({ page }) => {
    await page.goto('/reports/mc-mgmthre');
    await expect(page.locator('[data-testid="finding-block"]')).toHaveCount(1, LOAD);
  });

  test('a scored program links its archived v1 reports', async ({ page }) => {
    await page.goto('/reports/mc-cs');
    await expect(page.locator('[data-testid="archived-reports"]')).toHaveCount(1, LOAD);
  });

  test('an archived (v1-only) program shows the pending state with an archived link', async ({ page }) => {
    // Pick the program from the index rather than hardcoding a code: which
    // programs are still v1-only changes as the v4 cycle scores them, and
    // once every coursework program is scored there is nothing to exercise.
    await page.goto('/reports');
    await cardsOn(page);
    const archived = page.locator('[data-testid="status-archived"]');
    test.skip((await archived.count()) === 0, 'no v1-only program left in the index');
    await page.getByLabel('Status').selectOption('archived');
    await page.locator('[data-testid="durability-report-link"]').first().click();
    await expect(page).toHaveURL(/\/reports\/[^/]+$/);
    await expect(page.locator('[data-testid="v4-pending-notice"]')).toHaveCount(1, LOAD);
    await expect(page.locator('[data-testid="archived-v1-link"]')).toHaveCount(1, LOAD);
  });

  test('a dfva-* slug renders the archived v1 page with its banner', async ({ page }) => {
    await page.goto('/reports/dfva-b-des');
    await expect(page.locator('[data-testid="archived-report-banner"]').first()).toBeVisible(LOAD);
  });

  test('a research degree renders the research notice and no v1 vocabulary', async ({ page }) => {
    await page.goto('/reports/dr-philsci');
    await expect(page.locator('[data-testid="v4-research-notice"]').first()).toBeVisible(LOAD);
    const body = await page.locator('main, body').first().innerText();
    expect(body).not.toMatch(V1_VOCABULARY);
  });
});

test.describe('console hygiene', () => {
  const pages = ['/', '/reports', '/reports/mc-cs', '/reports/dr-philsci', '/insights'];

  const collect = (page: Page) => {
    const errors: string[] = [];
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text().slice(0, 200));
    });
    return errors;
  };

  test('no console errors across the main pages', async ({ page }) => {
    const errors = collect(page);
    for (const path of pages) {
      await page.goto(path, { waitUntil: 'networkidle' });
    }
    const real = errors.filter((e) => !/vite|favicon|cookieconsent/i.test(e));
    expect(real).toEqual([]);
  });
});
