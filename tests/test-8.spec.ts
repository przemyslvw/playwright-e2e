import { test, expect } from '@playwright/test';

test.describe('Sorting functionality', () => {
  test('should sort items by title', async ({ page }) => {
    await page.goto('https://twoja-aplikacja-angular.com');

    // Kliknij, aby posortować elementy po tytule
    await page.click('button#sort-by-title');

    // Pobierz tytuły wszystkich elementów na stronie
    const itemTitles = await page.$$eval('.item-title', items => items.map(item => item.textContent?.trim()));

    // Sprawdź, czy tytuły są w porządku alfabetycznym
    const sortedTitles = [...itemTitles].sort();
    expect(itemTitles).toEqual(sortedTitles);
  });
});