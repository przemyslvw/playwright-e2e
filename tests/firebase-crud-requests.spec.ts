import { test, expect } from '@playwright/test';

test.describe('Firebase CRUD requests', () => {

  test('should send a correct request to create a new item in Firebase', async ({ page }) => {
    await page.goto('https://twoja-aplikacja-angular.com');

    // Monitoruj żądania do Firebase podczas tworzenia nowego elementu
    await page.route('https://firestore.googleapis.com/**', async route => {
      const request = route.request();

      if (request.method() === 'POST' && request.url().includes('/documents/')) {
        const requestBody = JSON.parse(request.postData() || '');

        // Weryfikacja danych wysyłanych w żądaniu POST
        expect(requestBody.fields.title.stringValue).toBe('Testowy element');
        expect(requestBody.fields.description.stringValue).toBe('Opis testowy');
        
        await route.continue();
      } else {
        await route.continue();
      }
    });

    // Dodaj nowy element przez UI
    await page.click('button#create-new-item');
    await page.fill('input[name="title"]', 'Testowy element');
    await page.fill('input[name="description"]', 'Opis testowy');
    await page.click('button#submit');
  });

  test('should send a correct request to fetch items from Firebase', async ({ page }) => {
    await page.goto('https://twoja-aplikacja-angular.com');

    // Monitoruj żądania do Firebase podczas odczytu danych
    await page.route('https://firestore.googleapis.com/**', async route => {
      const request = route.request();

      if (request.method() === 'GET' && request.url().includes('/documents/')) {
        expect(request.url()).toContain('/documents/');  // Sprawdzenie poprawności URL
        await route.continue();
      } else {
        await route.continue();
      }
    });

    // Sprawdź, czy elementy są wyświetlone na stronie po załadowaniu
    const items = await page.$$eval('.item', items => items.length);
    expect(items).toBeGreaterThan(0);
  });

  test('should send a correct request to update an item in Firebase', async ({ page }) => {
    await page.goto('https://twoja-aplikacja-angular.com');

    // Monitoruj żądania do Firebase podczas aktualizacji elementu
    await page.route('https://firestore.googleapis.com/**', async route => {
      const request = route.request();

      if (request.method() === 'PATCH' && request.url().includes('/documents/')) {
        const requestBody = JSON.parse(request.postData() || '');

        // Weryfikacja danych wysyłanych w żądaniu PATCH
        expect(requestBody.fields.title.stringValue).toBe('Zaktualizowany element');
        expect(requestBody.fields.description.stringValue).toBe('Zaktualizowany opis');

        await route.continue();
      } else {
        await route.continue();
      }
    });

    // Zaktualizuj element przez UI
    await page.click('button#edit-item-1');
    await page.fill('input[name="title"]', 'Zaktualizowany element');
    await page.fill('input[name="description"]', 'Zaktualizowany opis');
    await page.click('button#submit');
  });

  test('should send a correct request to delete an item from Firebase', async ({ page }) => {
    await page.goto('https://twoja-aplikacja-angular.com');

    // Monitoruj żądania do Firebase podczas usuwania elementu
    await page.route('https://firestore.googleapis.com/**', async route => {
      const request = route.request();

      if (request.method() === 'DELETE' && request.url().includes('/documents/')) {
        expect(request.url()).toContain('/documents/');  // Sprawdzenie poprawności URL
        await route.continue();
      } else {
        await route.continue();
      }
    });

    // Usuń element przez UI
    await page.click('button#delete-item-1');
    await page.click('button#confirm-delete');
  });

});