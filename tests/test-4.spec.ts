import { test, expect } from "@playwright/test";

/*
  Opis przypadków testowych:
  1. Oczekiwanie na widoczność elementu:
     - Nawiguje do strony example.com.
     - Czeka, aż element z ID "element-id" stanie się widoczny.
     - Sprawdza, czy element nie jest null, co oznacza, że jest obecny w DOM i widoczny.

  2. Oczekiwanie na pojawienie się elementu:
     - Nawiguje do strony example.com.
     - Czeka, aż element z ID "element-id" zostanie dodany do DOM.
     - Sprawdza, czy element nie jest null, co oznacza, że jest obecny w DOM.

  3. Oczekiwanie na zniknięcie elementu:
     - Nawiguje do strony example.com.
     - Czeka, aż element z ID "element-id" zostanie usunięty z DOM.
     - Sprawdza, czy element jest null, co oznacza, że nie jest już obecny w DOM.

  4. Oczekiwanie na tekst w elemencie:
     - Nawiguje do strony example.com.
     - Czeka, aż element z ID "element-id" będzie zawierał tekst "expected text".
     - Sprawdza, czy tekst zawartości elementu zawiera oczekiwany tekst.
*/

test("Oczekiwanie na widoczność elementu", async ({ page }) => {
  await page.goto("https://example.com");
  await page.waitForSelector("#element-id", { state: "visible" });
  const element = await page.$("#element-id");
  expect(element).not.toBeNull();
});

test("Oczekiwanie na pojawienie się elementu", async ({ page }) => {
  await page.goto("https://example.com");
  await page.waitForSelector("#element-id", { state: "attached" });
  const element = await page.$("#element-id");
  expect(element).not.toBeNull();
});

test("Oczekiwanie na zniknięcie elementu", async ({ page }) => {
  await page.goto("https://example.com");
  await page.waitForSelector("#element-id", { state: "detached" });
  const element = await page.$("#element-id");
  expect(element).toBeNull();
});

test("Oczekiwanie na tekst w elemencie", async ({ page }) => {
  await page.goto("https://example.com");
  await page.waitForFunction(() =>
    document
      .querySelector("#element-id")
      ?.textContent?.includes("expected text")
  );
  const elementText = await page.textContent("#element-id");
  expect(elementText).toContain("expected text");
});

test("Oczekiwanie na atrybut elementu", async ({ page }) => {
  await page.goto("https://example.com");
  await page.waitForFunction(
    () =>
      document.querySelector("#element-id")?.getAttribute("data-status") ===
      "loaded"
  );
  const element = await page.$("#element-id");
  const attribute = await element?.getAttribute("data-status");
  expect(attribute).toBe("loaded");
});
