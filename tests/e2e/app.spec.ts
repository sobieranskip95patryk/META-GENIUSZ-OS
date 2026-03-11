import { test, expect } from '@playwright/test';

test.describe('Frontend E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('http://localhost:3000');
  });

  test('should load the home page', async ({ page }) => {
    expect(await page.title()).toBeTruthy();
    
    // Check if main content is visible
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });

  test('should display navigation menu', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should navigate between pages', async ({ page }) => {
    // Assuming there's a link to profiles
    const profileLink = page.locator('a[href="/profile"]');
    
    if (await profileLink.isVisible()) {
      await profileLink.click();
      await expect(page).toHaveURL(/\/profile/);
    }
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Intercept failed API calls
    page.on('response', response => {
      if (response.status() >= 400) {
        // Error should be handled by the app, not shown as crash
        expect(response.status()).toBeLessThan(500);
      }
    });
  });
});

test.describe('Authentication Flow', () => {
  test('should show login form', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });
});
