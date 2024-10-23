import { test, expect, Page } from '@playwright/test';

test('Test with Promise.race for two elements', async ({ page }) => {
  
  // Funkcja pomocnicza czekająca na element lub timeout
  async function waitForElementOrTimeout(page: Page, selector: string, timeout: number) {
    try {
      await page.waitForSelector(selector, { timeout });
      return selector;
    } catch (e) {
      return null;
    }
  }

  // Definicja dwóch selektorów, na które chcemy czekać
  const element1Selector = '#element1'; // pierwszy element
  const element2Selector = '#element2'; // drugi element
  
  const timeout = 5000; // 5 sekund timeoutu

  // Promise.race - czekanie na jeden z dwóch elementów
  const result = await Promise.race([
    waitForElementOrTimeout(page, element1Selector, timeout),
    waitForElementOrTimeout(page, element2Selector, timeout),
  ]);

  // Scenariusze zależne od tego, który element się pojawił
  if (result === element1Selector) {
    console.log('Element 1 appeared first');
    // Akcja dla elementu 1
    await page.click(element1Selector);
    // Możesz dodać dodatkowe asercje i logikę
  } else if (result === element2Selector) {
    console.log('Element 2 appeared first');
    // Akcja dla elementu 2
    await page.click(element2Selector);
    // Możesz dodać dodatkowe asercje i logikę
  } else {
    console.log('Neither element appeared within the timeout');
    // Opcjonalnie asercja, że żaden element się nie pojawił
    expect(result).not.toBe(null);
  }
});