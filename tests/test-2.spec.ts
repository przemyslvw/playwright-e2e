import { test, expect } from "@playwright/test";

/**
 * Przypadek testowy: Sprawdzenie obecności elementu z oczekiwanym tekstem na stronie
 *
 * Kroki:
 * 1. Przejdź na stronę https://example.com
 * 2. Inicjalizuj zmienne `conditionMet` na false, `attempts` na 0 oraz `maxAttempts` na 10
 * 3. Wykonuj poniższe kroki w pętli `while` dopóki `conditionMet` jest false i `attempts` jest mniejsze od `maxAttempts`:
 *    a. Sprawdź, czy element z identyfikatorem `#some-element` istnieje i zawiera oczekiwany tekst
 *    b. Jeśli warunek nie jest spełniony, poczekaj 1 sekundę i zwiększ licznik `attempts` o 1
 * 4. Sprawdź, czy warunek `conditionMet` jest spełniony
 */

test("example test with while loop", async ({ page }) => {
  await page.goto("https://example.com");

  let conditionMet = false;
  let attempts = 0;
  const maxAttempts = 10;

  while (!conditionMet && attempts < maxAttempts) {
    // Check for a specific condition on the page
    conditionMet = await page.evaluate(() => {
      const element = document.querySelector("#some-element");
      return element !== null && element.textContent !== null && element.textContent.includes("Expected Text");
    });

    if (!conditionMet) {
      // Wait for a short period before the next attempt
      await page.waitForTimeout(1000);
      attempts++;
    }
  }

  expect(conditionMet).toBe(true);
});
