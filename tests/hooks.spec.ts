import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('https://www.saucedemo.com/')
})

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(2000);
})
