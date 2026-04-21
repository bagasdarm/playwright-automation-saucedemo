import { test, expect } from "@playwright/test";

test.describe('TS2', {tag: "@TS2"}, () => {
    test('TS1 - PR - 1', {tag: "@PR1"}, async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').click();
    await page.locator('[data-test="product-sort-container"] option[value="Name (A to Z)"]').click();

    })
    
})
