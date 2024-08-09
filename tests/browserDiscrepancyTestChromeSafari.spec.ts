const { test, expect } = require('@playwright/test');

test.describe('Testowanie rozbieżności między Chrome na Windows a Safari na macOS', () => {

  test('Sprawdzenie wyglądu i działania kalendarza, checkboxów oraz list kontrolnych', async ({ page, browserName }) => {
    // Przejście na stronę testową
    await page.goto('https://example.com/form'); // Zmień na właściwy URL testowanej aplikacji

    // Test 1: Sprawdzenie wyglądu i funkcji kalendarza
    if (browserName === 'webkit' || browserName === 'chromium') {
      const dateInput = await page.locator('input[type="date"]');
      
      // Sprawdzenie, czy element kalendarza jest widoczny i poprawnie renderowany
      await expect(dateInput).toBeVisible();

      // Kliknięcie na pole daty, aby otworzyć kalendarz
      await dateInput.click();
      
      // Sprawdzenie, czy kalendarz otwiera się poprawnie
      // (uwaga: interfejs kalendarza może być różny w zależności od przeglądarki, więc można sprawdzić tylko podstawowe funkcje)
      if (browserName === 'webkit') {
        // Safari macOS: Sprawdzenie natywnego kalendarza
        const calendarPopup = await page.locator('.calendar-popup');
        await expect(calendarPopup).toBeVisible();
      } else if (browserName === 'chromium') {
        // Chrome Windows: Sprawdzenie natywnego kalendarza
        const calendarPopup = await page.locator('.calendar-popup');
        await expect(calendarPopup).toBeVisible();
      }
    }

    // Test 2: Sprawdzenie wyglądu i zachowania checkboxów
    const checkbox = await page.locator('input[type="checkbox"]');
    
    // Sprawdzenie, czy checkbox jest widoczny i nie jest zaznaczony na początku
    await expect(checkbox).toBeVisible();
    await expect(checkbox).not.toBeChecked();

    // Kliknięcie na checkbox, aby go zaznaczyć
    await checkbox.click();
    
    // Sprawdzenie, czy checkbox został zaznaczony
    await expect(checkbox).toBeChecked();

    // Test 3: Sprawdzenie wyglądu list kontrolnych (checklists)
    const checklistItem = await page.locator('ul.checklist > li');
    
    // Sprawdzenie, czy wszystkie elementy listy kontrolnej są widoczne
    const checklistCount = await checklistItem.count();
    for (let i = 0; i < checklistCount; i++) {
      await expect(checklistItem.nth(i)).toBeVisible();
    }

    // Sprawdzenie, czy marginesy i odstępy są zgodne z oczekiwaniami
    const firstItemMargin = await checklistItem.first().evaluate((el) => window.getComputedStyle(el).marginBottom);
    const lastItemMargin = await checklistItem.last().evaluate((el) => window.getComputedStyle(el).marginBottom);
    
    // Przykładowe porównanie marginesów
    if (browserName === 'webkit') {
      expect(firstItemMargin).toBe('10px'); // Załóżmy, że margines dla Safari powinien wynosić 10px
    } else if (browserName === 'chromium') {
      expect(lastItemMargin).toBe('8px'); // Załóżmy, że margines dla Chrome powinien wynosić 8px
    }
  });

});
