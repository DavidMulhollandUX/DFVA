import { test, expect } from '@playwright/test';
import { acceptAllCookies } from '../utils';

test.describe('COMPASS pages', () => {
  test('landing page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('worth choosing');
  });

  test('reports page loads without auth', async ({ page }) => {
    await page.goto('/reports');
    await expect(page.locator('h1')).toContainText('Program reports');
  });

  // /assess is public — a program can be assessed without an account.
  // The authenticated assess+submit flow is covered by assessFlow.spec.ts.
  test('/assess loads without auth', async ({ page }) => {
    await page.goto('/assess');
    await expect(page).toHaveURL(/\/assess/);
    await expect(page.locator('h1')).toContainText('Assess a Program');
  });

  // First anonymous visit: the cookie banner is up and must not block the
  // form. A visitor who has not touched the banner still gets a result.
  test('/assess submits with the cookie banner still open', async ({ page }) => {
    await page.goto('/assess');
    await expect(page.getByRole('button', { name: 'Accept all' })).toBeVisible();
    await page.fill('#handbook-url', 'https://handbook.unimelb.edu.au/2026/courses/zz-notreal');
    await page.getByRole('button', { name: 'Analyse' }).click({ timeout: 5_000 });
    await expect(page.getByText('Program at handbook.unimelb.edu.au')).toBeVisible({ timeout: 30_000 });
  });

  test('key programs appear on reports page', async ({ page }) => {
    await page.goto('/reports');
    await expect(page.locator('text=Bachelor of Design')).toBeVisible();
    await expect(page.locator('text=Master of Information Systems')).toBeVisible();
    await expect(page.locator('text=Master of Computer Science')).toBeVisible();
    await expect(page.locator('text=Master of Data Science')).toBeVisible();
    await expect(page.locator('text=Master of Climate Science')).toBeVisible();
  });
});

// On a phone the consent box would cover the Analyse button, so the page is
// blocked until the visitor chooses. After the choice the form must work.
test.describe('/assess on a phone', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('cookie choice first, then Analyse works', async ({ page }) => {
    await page.goto('/assess');
    await expect(page.locator('html')).toHaveClass(/disable--interaction/);
    await acceptAllCookies(page);
    await expect(page.locator('html')).not.toHaveClass(/disable--interaction/);
    await page.fill('#handbook-url', 'https://handbook.unimelb.edu.au/2026/courses/zz-notreal');
    await page.getByRole('button', { name: 'Analyse' }).click({ timeout: 5_000 });
    await expect(page.getByText('Program at handbook.unimelb.edu.au')).toBeVisible({ timeout: 30_000 });
  });
});
