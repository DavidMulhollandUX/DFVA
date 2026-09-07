import { test, expect } from '@playwright/test';

/**
 * The v4 portfolio overview at /insights.
 *
 * These assertions exist because the previous page rendered the v2/v3
 * instrument while every report page rendered v4, and nothing caught the
 * drift. Counts here are pinned to the generated data layer: if a count
 * changes legitimately (a program added, a research degree scored), the
 * unit suite in v4PortfolioStats.test.ts fails first with the derivation;
 * this spec pins what the page actually renders.
 */
test.describe('/insights — v4 portfolio overview', () => {
  test('renders every published program plus the research degrees', async ({ page }) => {
    // Counts are asserted as invariants, not as pinned totals. The published
    // cohort grows an institution at a time (docs/dfva-national-expansion-spec.md),
    // and a hardcoded 235/221/14 went stale the moment it did — three of these
    // assertions failed on 2026-09-07 for that reason alone.
    await page.goto('/insights');
    const rows = page.locator('[data-testid="program-row"]');
    const assessed = page.locator('[data-assessed="true"]');
    const unassessed = page.locator('[data-assessed="false"]');
    await expect(assessed.first()).toBeVisible({ timeout: 15_000 });

    const total = await rows.count();
    const nAssessed = await assessed.count();
    const nUnassessed = await unassessed.count();

    // Every row is one or the other; nothing is unclassified.
    expect(nAssessed + nUnassessed).toBe(total);
    // The research degrees are a fixed, named set — they never gain members
    // from a scoring run, because there is no taught curriculum to score.
    expect(nUnassessed).toBe(14);
    // The Melbourne cohort alone is 221, so this is a floor, not a ceiling.
    expect(nAssessed).toBeGreaterThanOrEqual(221);
  });

  test('compares universities, and keeps the faculty table Melbourne-only', async ({ page }) => {
    // Publishing the first non-Melbourne programs put a nameless row in the
    // faculty table linking to /insights/faculty/, because faculty grouping
    // keyed on a field those programs do not have.
    await page.goto('/insights');
    const institutions = page.locator('[data-testid="institution-row"]');
    await expect(institutions.first()).toBeVisible({ timeout: 15_000 });

    // Melbourne is always present; any other university appears only once one
    // of its programs is re-scored and verified, so this is a floor.
    await expect(institutions).not.toHaveCount(0);
    await expect(
      institutions.filter({ hasText: 'The University of Melbourne' }),
    ).toHaveCount(1);

    // No group renders without a name, in either table.
    await expect(page.locator('a[href="/insights/faculty/"]')).toHaveCount(0);
  });

  test('never labels an assessed row as pending', async ({ page }) => {
    await page.goto('/insights');
    // The old page's lie: 15 of the 29 rows showing it had a resolvable basis.
    await expect(page.locator('text=Destination data pending')).toHaveCount(0);
  });

  test('labels all 14 research degrees honestly', async ({ page }) => {
    await page.goto('/insights');
    await expect(page.locator('[data-testid="not-assessed-label"]')).toHaveCount(14);
    await expect(page.locator('text=Not assessed — research degree').first()).toBeVisible();
  });

  test('research rows stay last when sorting flips', async ({ page }) => {
    await page.goto('/insights');
    // aria-sort lives on the column header (th); the button inside it sorts.
    const adaptivenessHeader = page.getByRole('columnheader', { name: /Adaptiveness/ });
    const sortButton = adaptivenessHeader.getByRole('button');
    await sortButton.click();
    await expect(adaptivenessHeader).toHaveAttribute('aria-sort', 'ascending');

    const firstAssessed = page
      .locator('[data-testid="program-row"][data-assessed="true"]')
      .first();
    await expect(firstAssessed).toBeVisible();

    // A second click flips the direction…
    await sortButton.click();
    await expect(adaptivenessHeader).toHaveAttribute('aria-sort', 'descending');

    // …and in BOTH directions every unassessed row sits below every assessed one.
    const assessedRows = page.locator('[data-testid="program-row"][data-assessed="true"]');
    const unassessedRows = page.locator('[data-testid="program-row"][data-assessed="false"]');
    const assessedCount = await assessedRows.count();
    const unassessedCount = await unassessedRows.count();
    // Floors, not pins — the published cohort grows an institution at a time.
    expect(assessedCount).toBeGreaterThanOrEqual(221);
    expect(unassessedCount).toBe(14);

    const lastIndex = await rowsInOrder(page);
    for (let i = 0; i < assessedCount; i++) {
      expect(lastIndex[i]).toBe('true');
    }
    for (let i = assessedCount; i < assessedCount + unassessedCount; i++) {
      expect(lastIndex[i]).toBe('false');
    }
  });
});

/** Read data-assessed across all program rows in DOM order.
 *  $$eval is Playwright's read-only DOM query helper — it evaluates a pure
 *  attribute read inside the page, no user-supplied code involved. */
async function rowsInOrder(page: import('@playwright/test').Page): Promise<string[]> {
  return page.$$eval('[data-testid="program-row"]', (rows) =>
    rows.map((r) => r.getAttribute('data-assessed') ?? ''),
  );
}
