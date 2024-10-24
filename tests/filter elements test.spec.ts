import { test, expect } from '@playwright/test';

test.describe('Filtering functionality', () => {
  test('should filter items by category', async ({ page }) => {
    await page.goto('https://twoja-aplikacja-angular.com');

    // Wybierz kategorię w polu filtrującym
    await page.selectOption('select#filter-category', 'Kategoria1');

    // Sprawdź, czy wyświetlane elementy należą tylko do wybranej kategorii
    const filteredItems = await page.$$eval('.item-category', items => items.map(item => item.textContent?.trim()));
    filteredItems.forEach(itemCategory => {
      expect(itemCategory).toBe('Kategoria1');
    });
  });
});