import { test, expect } from '@playwright/test';

test.describe('SideFilterOption Component', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/");       
        //getting rid of tour
        const body = page.locator('body');
        await body.click({clickCount: 2,delay: 2000});
      });

    test('Toggles active class on click', async ({ page }) => {
        const ricksFilter = page.locator('#Ricks-side-filter');
        await expect(ricksFilter).toBeVisible();
        await expect(ricksFilter).not.toHaveClass(/active/);

        await ricksFilter.click();
        await ricksFilter.click();
        await expect(ricksFilter).toHaveClass(/active/);

        await ricksFilter.click();
        await expect(ricksFilter).not.toHaveClass(/active/);
    });

    test('Only one is active at a time', async ({ page }) => {
        const ricksFilter = page.locator('#Ricks-side-filter');
        const mortysFilter = page.locator('#Mortys-side-filter');

        await ricksFilter.click();
        await ricksFilter.click();
        await page.mouse.move(0, 0);
      
        await expect(ricksFilter).toHaveClass(/active/);
        await expect(mortysFilter).not.toHaveClass(/active/);

        await mortysFilter.click();
        await page.mouse.move(0, 0);
        await page.waitForTimeout(1000);
        await expect(ricksFilter).not.toHaveClass(/active/);
        await expect(mortysFilter).toHaveClass(/active/);
        
    });

    test('Displays correct text and image', async ({ page }) => {
        const ricksFilter = page.locator('#Ricks-side-filter');
        await expect(ricksFilter).toContainText('Ricks');

        const ricksImage = ricksFilter.locator('img[alt="icon"]');
        await expect(ricksImage).toBeVisible();

        const mortysFilter = page.locator('#Mortys-side-filter');
        await expect(mortysFilter).toContainText('Mortys');
        const mortysImage = mortysFilter.locator('img[alt="icon"]');
        await expect(mortysImage).toBeVisible();
    });

});
