import { test, expect } from '@playwright/test';

test.describe('Authentication with Firebase', () => {
  test('should sign in with email and password', async ({ page }) => {
    await page.goto('https://twoja-aplikacja-angular.com/login');

    // Wprowadź dane logowania
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'password123');

    // Kliknij przycisk logowania
    await page.click('button#login');

    // Sprawdź, czy użytkownik został zalogowany i przekierowany na stronę główną
    await expect(page).toHaveURL('https://twoja-aplikacja-angular.com/dashboard');

    // Sprawdź, czy wyświetla się powitanie użytkownika
    const userGreeting = await page.textContent('.user-greeting');
    expect(userGreeting).toContain('Witaj, testuser@example.com');
  });

  test('should sign out successfully', async ({ page }) => {
    await page.goto('https://twoja-aplikacja-angular.com/dashboard');

    // Kliknij przycisk wylogowania
    await page.click('button#logout');

    // Sprawdź, czy użytkownik został przekierowany na stronę logowania
    await expect(page).toHaveURL('https://twoja-aplikacja-angular.com/login');
  });
});