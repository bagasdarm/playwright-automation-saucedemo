import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("https://www.saucedemo.com/");
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(2000);
});

test.describe("TS1 - Login", { tag: "@TS1" }, () => {
  test("TS1 - LG - 1", { tag: "@LG1" }, async ({ page }) => {
    // await page.goto(''); has been replaced by Hooks @hooks.spec.ts
    await page
      .locator('[data-test="username"]')
      .fill(process.env.SAUCE_USERNAME_STANDARD as string);
    await page
      .locator('[data-test="password"]')
      .fill(process.env.SAUCE_PASSWORD as string);
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL("/inventory.html");
  });

  test("TS1 - LG - 2", { tag: "@LG2" }, async ({ page }) => {
    await page
      .locator('[data-test="username"]')
      .fill(process.env.SAUCE_USERNAME_STANDARD as string);
    await page
      .locator('[data-test="password"]')
      .fill((process.env.SAUCE_PASSWORD as string) + "404");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });

  test("TS1 - LG - 3", { tag: "@LG3" }, async ({ page }) => {
    await page
      .locator('[data-test="username"]')
      .fill(
        (process.env.SAUCE_USERNAME_STANDARD as string) + "awowakawdwaodkwawa",
      );
    await page
      .locator('[data-test="password"]')
      .fill(process.env.SAUCE_PASSWORD as string);
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });

  test("TS1 - LG - 4", { tag: "@LG4" }, async ({ page }) => {
    await page
      .locator('[data-test="username"]')
      .fill(process.env.SAUCE_USERNAME_LOCKED as string);
    await page
      .locator('[data-test="password"]')
      .fill(process.env.SAUCE_PASSWORD as string);
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });
  test("TS1 - LG - 5", { tag: "@LG5" }, async ({ page }) => {
    await page.locator('[data-test="username"]').fill("");
    await page
      .locator('[data-test="password"]')
      .fill(process.env.SAUCE_PASSWORD as string);
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Username is required",
    );
  });
  test("TS1 - LG - 6", { tag: "@LG6" }, async ({ page }) => {
    await page
      .locator('[data-test="username"]')
      .fill(process.env.SAUCE_USERNAME_STANDARD as string);
    await page.locator('[data-test="password"]').fill("");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Password is required",
    );
  });
  test("TS1 - LG - 7", { tag: "@LG7" }, async ({ page }) => {
    await page.locator('[data-test="username"]').fill("");
    await page
      .locator('[data-test="password"]')
      .fill(process.env.SAUCE_PASSWORD as string);
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Username is required",
    );
  });

  test("TS1 - LG - 8", { tag: "@LG8" }, async ({ page }) => {
    await page
      .locator('[data-test="username"]')
      .fill(process.env.SAUCE_USERNAME_STANDARD_CAPITAL as string);
    await page
      .locator('[data-test="password"]')
      .fill(process.env.SAUCE_PASSWORD as string);
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });

  test("TS1 - LG - 9", { tag: "@LG9" }, async ({ page }) => {
    await page
      .locator('[data-test="username"]')
      .fill(process.env.SAUCE_USERNAME_STANDARD as string);
    await page
      .locator('[data-test="password"]')
      .fill(process.env.SAUCE_PASSWORD_CAPITAL as string);
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });
});
