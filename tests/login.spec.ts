import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('https://www.saucedemo.com/')
})
test("Login sukses dengan standar user", async ({ page }) => {
  // await page.goto(''); has been replaced by Hooks @hooks.spec.ts
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="username"]').fill("secret_sauce");
  await page.locator('[data-test="username"]').click();
});
