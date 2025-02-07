import { test, expect } from '@playwright/test';




test.describe('SearchBar Component', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    //getting rid of tour
    const body = page.locator('body');
    await body.click();
  });

  test('should render the search input with the correct placeholder', async ({ page }) => {
    const searchInput = page.locator('input[type="text"]');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('placeholder', 'Quem você procura?');
  });

  test('should update the input value when the user types', async ({ page }) => {
    const searchInput = page.locator('input[type="text"]');
    await searchInput.fill('Rick Sanchez');
    const inputValue = await searchInput.inputValue();
    expect(inputValue).toBe('Rick Sanchez');
  });

  test('should have the correct styling classes', async ({ page }) => {
    const searchInput = page.locator('input[type="text"]');
    await expect(searchInput).toHaveClass(/bg-\[#cad4dd\]/);
    await expect(searchInput).toHaveClass(/hover:bg-\[#b7c3cf\]/);
    await expect(searchInput).toHaveClass(/border-s-\[#8e9194\]/);
  });


  test('all results should contain the search term', async ({ page }) => {
    const searchInput = page.locator('input[type="text"]');
    await searchInput.fill('Beth');
    const searchResults = await page.locator('#characters-grid').locator('.group').all();
    for (const result of searchResults) {
      const resultText = await result.textContent();
      expect(resultText).toContain('Beth');
    }
  });

});