import { test, expect } from '@playwright/test';

test.describe('COMPASS assess flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/assess');
  });

  test('page loads with correct heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Assess a Program');
  });

  test('submit known program URL shows Complete badge', async ({ page }) => {
    await page.fill('input[type="url"]', 'https://handbook.unimelb.edu.au/2025/courses/b-des');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Complete')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Bachelor of Design')).toBeVisible();
  });

  test('View Report link navigates to report detail', async ({ page }) => {
    await page.fill('input[type="url"]', 'https://handbook.unimelb.edu.au/2025/courses/mc-is');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Complete')).toBeVisible({ timeout: 5000 });
    await page.click('text=View Report');
    
    await expect(page).toHaveURL(/\/reports\/dfva-mc-is/);
    await expect(page.locator('h1')).toContainText('Master of Information Systems');
  });

  test('unknown URL falls back gracefully', async ({ page }) => {
    await page.fill('input[type="url"]', 'https://example.com/courses/test');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Complete')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Program at')).toBeVisible();
  });

  test('assessment history persists — submit two URLs', async ({ page }) => {
    await page.fill('input[type="url"]', 'https://handbook.unimelb.edu.au/2025/courses/b-des');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Complete').first()).toBeVisible({ timeout: 5000 });

    await page.fill('input[type="url"]', 'https://handbook.unimelb.edu.au/2025/courses/mc-is');
    await page.click('button[type="submit"]');
    
    const completeBadges = page.locator('text=Complete');
    await expect(completeBadges).toHaveCount(2);
  });

  test('new MC-CS program works via mock service', async ({ page }) => {
    await page.fill('input[type="url"]', 'https://handbook.unimelb.edu.au/2026/courses/mc-cs');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Complete')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Master of Computer Science')).toBeVisible();
  });
});
