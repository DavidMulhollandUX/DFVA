import { test, expect } from '@playwright/test';

test.describe('COMPASS pages', () => {
  test('landing page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('worth choosing');
  });

  test('reports page loads without auth', async ({ page }) => {
    await page.goto('/reports');
    await expect(page.locator('h1')).toContainText('Assessment Reports');
  });

  // /assess is authRequired:true — anonymous users are redirected to login.
  // The authenticated assess+submit flow is covered by smoke-run.mjs.
  test('/assess redirects anonymous users to login', async ({ page }) => {
    await page.goto('/assess');
    await page.waitForURL('**/login');
    await expect(page).toHaveURL(/\/login/);
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
