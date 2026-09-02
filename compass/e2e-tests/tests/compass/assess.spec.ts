import { test, expect } from '@playwright/test';

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

  test('key programs appear on reports page', async ({ page }) => {
    await page.goto('/reports');
    await expect(page.locator('text=Bachelor of Design')).toBeVisible();
    await expect(page.locator('text=Master of Information Systems')).toBeVisible();
    await expect(page.locator('text=Master of Computer Science')).toBeVisible();
    await expect(page.locator('text=Master of Data Science')).toBeVisible();
    await expect(page.locator('text=Master of Climate Science')).toBeVisible();
  });
});
