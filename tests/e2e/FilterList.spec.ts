import { test, expect } from "@playwright/test";

test.describe("FilterList Component", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        //getting rid of tour
        const body = page.locator('body');
        await body.click({clickCount: 2,delay: 2000});
    });

    test("should toggle gender filter button", async ({ page }) => {
        const maleFilter = page.locator("#male-filter");

        await maleFilter.click();
        await maleFilter.click();
        await expect(maleFilter).toHaveClass(/active/); 

        await maleFilter.click();
        await expect(maleFilter).not.toHaveClass(/active/); 
    });

    test("should allow only one gender filter to be active", async ({ page }) => {
        const maleFilter = page.locator("#male-filter");
        const femaleFilter = page.locator("#female-filter");

        await maleFilter.click();
        await maleFilter.click();
        await expect(maleFilter).toHaveClass(/active/);
        await expect(femaleFilter).not.toHaveClass(/active/);

        await page.waitForTimeout(500);
        await femaleFilter.click();
        await femaleFilter.click();
        await expect(femaleFilter).toHaveClass(/active/);
        await expect(maleFilter).not.toHaveClass(/active/);
    });

    test("should allow only one status filter to be active", async ({ page }) => {
        const aliveFilter = page.locator("#alive-filter");
        const deadFilter = page.locator("#dead-filter");

        await aliveFilter.click();
        await aliveFilter.click();
        await expect(aliveFilter).toHaveClass(/active/);
        await expect(deadFilter).not.toHaveClass(/active/);

        await deadFilter.click();
        await expect(deadFilter).toHaveClass(/active/);
        await expect(aliveFilter).not.toHaveClass(/active/);
    });

    test("should reset all active filters when reset button is clicked", async ({ page }) => {
        const maleFilter = page.locator("#male-filter");
        const aliveFilter = page.locator("#alive-filter");
        const resetButton = page.locator("button:has-text('Resetar Filtros')");

        await maleFilter.click();
        await maleFilter.click();
        await aliveFilter.click();
        await aliveFilter.click();

        await page.waitForTimeout(500);
        await expect(maleFilter).toHaveClass(/active/);
        await expect(aliveFilter).toHaveClass(/active/);

        await resetButton.click();
        await resetButton.click();
        
        await page.waitForTimeout(500);
        await expect(maleFilter).not.toHaveClass(/active/);
        await expect(aliveFilter).not.toHaveClass(/active/);
    });
});
