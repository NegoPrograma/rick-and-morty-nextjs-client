import { test, expect } from "@playwright/test";


test.describe("Card Component", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/");       
        //getting rid of tour
        const body = page.locator('body');
        await body.click();
      });


  test("should render the character card with correct details", async ({ page }) => {
    const card = page.locator("[id='1-card']");
    await expect(card).toBeVisible();
    await expect(card).toContainText("Rick Sanchez");
    await expect(card).toContainText("Citadel of Ricks");
    await expect(card).toContainText("Earth (C-137)");
  });

  test("should apply hover background color on hover", async ({ page }) => {
    const card =  page.locator("[id='1-card']");
    const overlay = card.locator("div.absolute");

    await expect(overlay).toHaveCSS("opacity", "0"); 
    await overlay.hover();
    await expect(overlay).toHaveCSS("opacity", "1"); 
  });

  test("should trigger background color update on image load", async ({ page }) => {
    const image = page.locator("[id='1-image']");
    await image.dispatchEvent("load");

    const card =  page.locator("[id='1-card']");
    const style = await card.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(style).not.toBe("rgba(0, 0, 0, 0)");
  });
});
