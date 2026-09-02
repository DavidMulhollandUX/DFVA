import { test, expect, type Page } from '@playwright/test';
import { createRandomUser, logUserIn, signUserUp } from '../utils';

/**
 * The authenticated assess + submit flow, ported from the retired
 * smoke-run.mjs. Runs against the mock service (DFVA_MOCK=true): a known
 * handbook URL resolves to its program; an unknown one falls back to a
 * generic program named after the host. Needs SKIP_EMAIL_VERIFICATION_IN_DEV
 * in .env.server locally (CI sets it) or signup never completes.
 */
let page: Page;

test.describe.configure({ mode: 'serial' });

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  const user = createRandomUser();
  await signUserUp({ page, user });
  await logUserIn({ page, user });
});

test.afterAll(async () => {
  await page.close();
});

const submit = async (url: string) => {
  await page.goto('/assess');
  await page.fill('#handbook-url', url);
  await page.getByRole('button', { name: 'Analyse' }).click();
};

test.describe('/assess — authenticated submit', () => {
  test('a known handbook URL completes and names the program', async () => {
    await submit('https://handbook.unimelb.edu.au/2025/courses/b-des');
    await expect(page.getByText('Complete').first()).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText('Bachelor of Design').first()).toBeVisible();
  });

  test('an unknown handbook URL falls back to a generic program', async () => {
    await submit('https://handbook.unimelb.edu.au/2025/courses/zz-notreal');
    await expect(page.getByText('Program at handbook.unimelb.edu.au').first()).toBeVisible({
      timeout: 30_000,
    });
  });
});
