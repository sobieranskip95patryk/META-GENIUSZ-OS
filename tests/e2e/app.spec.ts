import { test, expect } from '@playwright/test';

test.describe('Frontend smoke', () => {
  test('loads homepage and key entry points', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/META-GENIUSZ OS|META-GENIUSZ/i);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('a[href="#modules"]')).toBeVisible();
    await expect(page.locator('a[href="/hhu"]')).toBeVisible();
    await expect(page.locator('a[href="/rfg"]')).toBeVisible();
    await expect(page.locator('a[href="/ai-studio"]')).toBeVisible();
    await expect(page.locator('a[href="/admin"]')).toBeVisible();
  });
});
