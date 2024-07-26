// Ten plik zawiera testy Playwright do nawigacji do różnych URL-i na stronie example.com.
// Każdy test weryfikuje, czy przeglądarka nawigowała do poprawnego URL-a.

import { test, expect } from "@playwright/test";

const urls = {
  home: "https://example.com",
  about: "https://example.com/about",
  contact: "https://example.com/contact",
};

test("powinien nawigować do URL-a strony głównej", async ({ page }) => {
  // Nawiguj do URL-a strony głównej i zweryfikuj, czy URL jest poprawny
  await page.goto(urls.home);
  expect(page.url()).toBe(urls.home + "/");
  // Sprawdź tytuł strony
  const title = await page.title();
  expect(title).toBe("Example Domain");
  // Sprawdź, czy strona zawiera określony tekst
  const content = await page.textContent("h1");
  expect(content).toBe("Example Domain");
});

test("powinien nawigować do URL-a strony 'O nas'", async ({ page }) => {
  // Nawiguj do URL-a strony 'O nas' i zweryfikuj, czy URL jest poprawny
  await page.goto(urls.about);
  expect(page.url()).toBe(urls.about);
  // Sprawdź tytuł strony
  const title = await page.title();
  expect(title).toBe("About Us - Example Domain");
  // Sprawdź, czy strona zawiera określony tekst
  const content = await page.textContent("h1");
  expect(content).toBe("About Us");
});

test("powinien nawigować do URL-a strony kontaktowej", async ({ page }) => {
  // Nawiguj do URL-a strony kontaktowej i zweryfikuj, czy URL jest poprawny
  await page.goto(urls.contact);
  expect(page.url()).toBe(urls.contact);
  // Sprawdź tytuł strony
  const title = await page.title();
  expect(title).toBe("Contact Us - Example Domain");
  // Sprawdź, czy strona zawiera określony tekst
  const content = await page.textContent("h1");
  expect(content).toBe("Contact Us");
});
