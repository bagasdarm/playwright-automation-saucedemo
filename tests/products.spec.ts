import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("https://www.saucedemo.com/");
  await page
    .locator('[data-test="username"]')
    .fill(process.env.SAUCE_USERNAME_STANDARD as string);
  await page
    .locator('[data-test="password"]')
    .fill(process.env.SAUCE_PASSWORD as string);
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL("/inventory.html");
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(2000);
});

test.describe("TS2", { tag: "@TS2" }, () => {
  test("TS2 - PR - 1", { tag: "@PR1" }, async ({ page }) => {
    // await page.locator('[data-test="product-sort-container"]').click();
    await page
      .locator('[data-test="product-sort-container"]')
      .selectOption({ label: "Name (A to Z)" });
    const productNames = await page
      .locator(".inventory_item_name")
      .allTextContents();
    const filteredProductNames = [...productNames].sort();
    expect(productNames).toEqual(filteredProductNames);
    console.log("productNames: " + productNames);
    console.log("filteredProductNames: " + filteredProductNames);
  });

  test("TS2 - PR - 2", { tag: "@PR2" }, async ({ page }) => {
    // await page.locator('[data-test="product-sort-container"]').click();
    await page
      .locator('[data-test="product-sort-container"]')
      .selectOption({ label: "Name (Z to A)" });
    const productNames = await page
      .locator(".inventory_item_name")
      .allTextContents();
    const filteredProductNames = [...productNames].sort();
    const reversedProductNames = [...filteredProductNames].reverse();
    expect(productNames).toEqual(reversedProductNames);
    console.log("productNames: " + productNames);
    console.log("filteredProductNames: " + reversedProductNames);
  });

  test("TS2 - PR - 3", { tag: "@PR3" }, async ({ page }) => {
    // await page.locator('[data-test="product-sort-container"]').click();
    await page
      .locator('[data-test="product-sort-container"]')
      .selectOption({ label: "Price (low to high)" });
    const rawPrices = await page
      .locator(".inventory_item_price")
      .allTextContents();
    const productPrices = rawPrices.map((price) =>
      parseFloat(price.replace("$", "")),
    );
    const filteredProductPrices = [...productPrices].sort((a, b) => a - b);
    expect(productPrices).toEqual(filteredProductPrices);
    console.log("productPrices: " + productPrices);
    console.log("filteredProductPrices: " + filteredProductPrices);
  });
  test("TS2 - PR - 4", { tag: "@PR4" }, async ({ page }) => {
    // await page.locator('[data-test="product-sort-container"]').click();
    await page
      .locator('[data-test="product-sort-container"]')
      .selectOption({ label: "Price (high to low)" });
    const rawPrices = await page
      .locator(".inventory_item_price")
      .allTextContents();
    const productPrices = rawPrices.map((price) =>
      parseFloat(price.replace("$", "")),
    );
    const filteredProductPrices = [...productPrices].sort((a, b) => b - a);
    expect(productPrices).toEqual(filteredProductPrices);
    console.log("productPrices: " + productPrices);
    console.log("filteredProductPrices: " + filteredProductPrices);
  });
});
