import { test, expect } from '@playwright/test';

test.describe('CRUD operations in Angular Firebase app', () => {
  
  // URL Twojej aplikacji
  const baseURL = 'http://localhost:4200';

  // Przykładowe dane dla testu
  const item = {
    name: 'Test Item',
    updatedName: 'Updated Test Item'
  };

  test.beforeEach(async ({ page }) => {
    // Otwórz stronę aplikacji
    await page.goto(baseURL);
  });

  // Test "Create"
  test('should create a new item', async ({ page }) => {
    // Kliknij przycisk dodawania nowego elementu
    await page.click('text=Add New Item');

    // Wypełnij formularz nowym elementem
    await page.fill('input[name="itemName"]', item.name);

    // Wyślij formularz
    await page.click('button[type="submit"]');

    // Sprawdź, czy nowy element został dodany na stronie
    await expect(page.locator(`text=${item.name}`)).toBeVisible();
  });

  // Test "Read"
  test('should read the created item', async ({ page }) => {
    // Sprawdź, czy nowy element jest wyświetlany na liście
    await expect(page.locator(`text=${item.name}`)).toBeVisible();
  });

  // Test "Update"
  test('should update an existing item', async ({ page }) => {
    // Znajdź i kliknij przycisk edycji dla elementu
    await page.click(`text=${item.name} >> text=Edit`);

    // Zmień nazwę elementu
    await page.fill('input[name="itemName"]', item.updatedName);

    // Wyślij formularz
    await page.click('button[type="submit"]');

    // Sprawdź, czy element został zaktualizowany
    await expect(page.locator(`text=${item.updatedName}`)).toBeVisible();
  });

  // Test "Delete"
  test('should delete an item', async ({ page }) => {
    // Znajdź i kliknij przycisk usunięcia dla elementu
    await page.click(`text=${item.updatedName} >> text=Delete`);

    // Potwierdź usunięcie (jeśli jest potwierdzenie)
    await page.click('button.confirm-delete'); // Zakładam, że jest potwierdzenie

    // Sprawdź, czy element został usunięty
    await expect(page.locator(`text=${item.updatedName}`)).not.toBeVisible();
  });

});