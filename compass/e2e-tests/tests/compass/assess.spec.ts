import { test, expect } from '@playwright/test';

test.describe('COMPASS pages', () => {
  test('landing page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('prepare graduates');
  });

  test('reports page loads without auth', async ({ page }) => {
    await page.goto('/reports');
    await expect(page.locator('h1')).toContainText('Assessment Reports');
  });

  test('/assess page loads with URL input', async ({ page }) => {
    await page.goto('/assess');
    await expect(page.locator('h1')).toContainText('Assess a Program');
    await expect(page.locator('input[type="url"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('all 19 programs appear on reports page', async ({ page }) => {
    await page.goto('/reports');
    await expect(page.locator('text=Bachelor of Design')).toBeVisible();
    await expect(page.locator('text=Master of Information Systems')).toBeVisible();
    await expect(page.locator('text=Master of Computer Science')).toBeVisible();
    await expect(page.locator('text=Master of Data Science')).toBeVisible();
    await expect(page.locator('text=Master of Climate Science')).toBeVisible();
  });
});
