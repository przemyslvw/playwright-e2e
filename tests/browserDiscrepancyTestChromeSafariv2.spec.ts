const { test, expect } = require('@playwright/test');

test.describe('Testowanie rozbieżności między Chrome na Windows a Safari na macOS', () => {

  test('Sprawdzenie wyglądu inputów tekstowych, przycisków oraz elementów z gradientami i cieniami', async ({ page, browserName }) => {
    // Przejście na stronę testową
    await page.goto('https://example.com/form'); // Zmień na właściwy URL testowanej aplikacji

    // Test 1: Sprawdzenie wyglądu i działania inputów tekstowych
    const textInput = await page.locator('input[type="text"]');

    // Sprawdzenie, czy input tekstowy jest widoczny i dostępny do edycji
    await expect(textInput).toBeVisible();
    await expect(textInput).toBeEnabled();

    // Wprowadzenie tekstu i sprawdzenie, czy pojawia się w polu
    const inputText = 'Test Playwright';
    await textInput.fill(inputText);
    const inputValue = await textInput.inputValue();
    expect(inputValue).toBe(inputText);

    // Sprawdzenie stylizacji placeholdera (w Safari może się różnić od Chrome)
    const placeholderStyle = await textInput.evaluate((el) => window.getComputedStyle(el, '::placeholder').color);
    if (browserName === 'webkit') {
      expect(placeholderStyle).toBe('rgb(128, 128, 128)'); // Przykładowy kolor placeholdera w Safari
    } else if (browserName === 'chromium') {
      expect(placeholderStyle).toBe('rgb(169, 169, 169)'); // Przykładowy kolor placeholdera w Chrome
    }

    // Test 2: Sprawdzenie wyglądu przycisków
    const button = await page.locator('button#submit-button'); // Zmień selektor na odpowiedni dla testowanej aplikacji

    // Sprawdzenie, czy przycisk jest widoczny i ma odpowiednią stylizację
    await expect(button).toBeVisible();
    const buttonBgColor = await button.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    if (browserName === 'webkit') {
      expect(buttonBgColor).toBe('rgb(0, 122, 255)'); // Przykładowy kolor przycisku w Safari
    } else if (browserName === 'chromium') {
      expect(buttonBgColor).toBe('rgb(66, 133, 244)'); // Przykładowy kolor przycisku w Chrome
    }

    // Sprawdzenie efektu hover na przycisku
    await button.hover();
    const hoverButtonBgColor = await button.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    if (browserName === 'webkit') {
      expect(hoverButtonBgColor).toBe('rgb(0, 105, 217)'); // Przykładowy kolor przycisku po najechaniu w Safari
    } else if (browserName === 'chromium') {
      expect(hoverButtonBgColor).toBe('rgb(57, 114, 237)'); // Przykładowy kolor przycisku po najechaniu w Chrome
    }

    // Test 3: Sprawdzenie elementów z gradientami i cieniami
    const gradientElement = await page.locator('.gradient-box');

    // Sprawdzenie, czy element z gradientem jest widoczny
    await expect(gradientElement).toBeVisible();

    // Sprawdzenie wartości gradientu
    const gradientStyle = await gradientElement.evaluate((el) => window.getComputedStyle(el).backgroundImage);
    if (browserName === 'webkit') {
      expect(gradientStyle).toContain('linear-gradient(to right, rgb(255, 0, 0), rgb(255, 255, 0))'); // Przykładowy gradient w Safari
    } else if (browserName === 'chromium') {
      expect(gradientStyle).toContain('linear-gradient(to right, rgb(255, 0, 0), rgb(255, 255, 0))'); // Przykładowy gradient w Chrome
    }

    // Sprawdzenie wartości cienia
    const shadowStyle = await gradientElement.evaluate((el) => window.getComputedStyle(el).boxShadow);
    if (browserName === 'webkit') {
      expect(shadowStyle).toBe('rgba(0, 0, 0, 0.2) 0px 4px 6px'); // Przykładowy cień w Safari
    } else if (browserName === 'chromium') {
      expect(shadowStyle).toBe('rgba(0, 0, 0, 0.15) 0px 4px 6px'); // Przykładowy cień w Chrome
    }
  });

});
