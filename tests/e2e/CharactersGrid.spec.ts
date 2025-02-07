import { test, expect } from "@playwright/test";

test.describe("CharactersGrid Component", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/");       
        //getting rid of tour
        const body = page.locator('body');
        await body.click();
      });

    test("should display loading state", async ({ page }) => {
        const grid = page.locator("#characters-grid");
        await expect(grid).toBeVisible();

        const loadingDivs =  (await grid.locator(".animate-pulse").all()).length;
        expect(loadingDivs).toBe(3); 
    });

    test("should render character cards when data is available", async ({ page }) => {
        await page.waitForTimeout(5000); // wait for the API call to complete
        const cards = await page.locator("[id*='-card']").all();

        for (const card of cards) {
            await expect(card).toBeVisible();
        }

        expect(cards.length).toBeGreaterThan(0);
        expect(cards.length).toBe(20);
    });

    test("should show 'not found' message when no characters exist", async ({ page }) => {
        await page.waitForTimeout(5000); // wait for the API call to complete
        const searchInput = page.locator('input[type="text"]');
        await searchInput.fill('Invalid Character Name');

        const notFoundMessage = await page.locator("#not-found-text");
        await expect(notFoundMessage).toBeVisible();
        await expect(await notFoundMessage.innerText()).toContain("Nenhum personagem encontrado, procure em outra dimensão!");
    });
});
