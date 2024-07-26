/**
 * Ten plik zawiera zestaw testów automatycznych dla różnych URL-i aplikacji internetowej.
 * Testy są napisane przy użyciu Playwright.
 *
 * Kroki testowe:
 * 1. Przejdź do strony logowania.
 * 2. Wypełnij pola logowania i zaloguj się.
 * 3. Upewnij się, że logowanie się powiodło i użytkownik jest na stronie głównej.
 * 4. Przejdź do strony produktów.
 * 5. Dodaj kilka przedmiotów do koszyka.
 * 6. Przejdź do strony koszyka i sprawdź, czy przedmioty zostały dodane.
 * 7. Przeprowadź testy dla różnych URL-i (koszyk, checkout, płatność, potwierdzenie).
 */

import { test, expect } from "@playwright/test";

const BASE_URL = "https://example.com/";

const urls = [
  `${BASE_URL}/cart`,
  `${BASE_URL}/checkout`,
  `${BASE_URL}/payment`,
  `${BASE_URL}/confirmation`,
];

test.describe("Testy dla różnych URL-i", () => {
  test.beforeEach(async ({ page }) => {
    // Przeprowadź logowanie
    await page.goto(`${BASE_URL}login`);
    await page.fill("#username", "your-username");
    await page.fill("#password", "your-password");
    await page.click("#login-button");
    // Upewnij się, że logowanie się powiodło
    await expect(page).toHaveURL(`${BASE_URL}dashboard`);
  });

  test("Dodaj kilka przedmiotów do koszyka", async ({ page }) => {
    await page.goto(`${BASE_URL}products`);
    // Symulacja dodawania przedmiotów do koszyka
    await page.click("#add-to-cart-item-1");
    await page.click("#add-to-cart-item-2");
    await page.click("#add-to-cart-item-3");
    // Sprawdź, czy przedmioty zostały dodane do koszyka
    await page.goto(`${BASE_URL}cart`);
    const cartItems = await page.locator(".cart-item").count();
    expect(cartItems).toBe(3);
  });

  for (const url of urls) {
    test(`Test for ${url}`, async ({ page }) => {
      await page.goto(url);
      // Dodaj tutaj swoje asercje i inne kroki testowe
      expect(await page.title()).not.toBeNull();
    });
  }
});
