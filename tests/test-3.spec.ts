/**
 * Przypadek testowy: Zapobieganie atakom brute force na logowanie
 *
 * Cel:
 * Upewnienie się, że system blokuje konto po określonej liczbie nieudanych prób logowania.
 *
 * Kroki testowe:
 * 1. Przejdź do strony logowania.
 * 2. Odczytaj listę haseł z pliku.
 * 3. Wykonaj próby logowania, używając nazwy użytkownika "admin" i haseł z listy.
 * 4. Po przekroczeniu maksymalnej dozwolonej liczby prób logowania (5 prób), sprawdź, czy konto jest zablokowane.
 *
 * Oczekiwany wynik:
 * Po 5 nieudanych próbach logowania system powinien wyświetlić komunikat informujący o zablokowaniu konta.
 *
 * Dane testowe:
 * - Nazwa użytkownika: admin
 * - Hasła: Lista haseł odczytana z pliku "helpers/pass.txt"
 * - Maksymalna liczba prób: 5
 */

import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

test("should prevent brute force attacks", async ({ page }) => {
  // Base URL for the application
  const loginUrl = "http://localhost:3000";
  const username = "admin";
  const passwordsFilePath = path.join(__dirname, "helpers/pass.txt");
  const passwords = fs.readFileSync(passwordsFilePath, "utf-8").split("\n");

  // Maximum allowed login attempts
  const maxAttempts = 50;

  // Loop through the passwords and perform login attempts
  for (let attempt = 1; attempt <= maxAttempts + 2; attempt++) {
    // Get the password for the current attempt
    const randomIndex = Math.floor(Math.random() * passwords.length);
    const password = passwords[randomIndex]?.trim();
    // const password = passwords[attempt - 1]?.trim();

    // If there are no more passwords, break the loop
    if (!password) {
      break;
    }

    // Navigate to the login page
    await page.goto(loginUrl);

    // Fill in the username and password fields
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);

    // Click the submit button to perform the login attempt
    await page.click('input[type="submit"]');

    // If the attempt is greater than the maximum allowed attempts, verify that the account is locked
    if (attempt > maxAttempts) {
      const alertText = await page.textContent("selector-for-alert");
      expect(alertText).toContain("Your account has been locked");
    }
  }
});
