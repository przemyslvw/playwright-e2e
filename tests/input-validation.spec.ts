import { test, expect } from '@playwright/test';

test('sprawdzenie walidacji wszystkich pól input', async ({ page }) => {
  // Przejdź do strony, na której znajdują się pola input
  await page.goto('URL_TWOJEJ_STRONY');

  // Zbierz wszystkie pola input
  const inputs = await page.$$('input');

  // Pętla przez wszystkie pola input
  for (const input of inputs) {
    const inputName = await input.getAttribute('name') || await input.getAttribute('id');
    
    // Negatywna walidacja
    await input.fill('invalid value');
    await input.blur(); // Aby wywołać walidację po opuszczeniu pola
    const invalidState = await input.evaluate(input => input.checkValidity());
    console.log(`Negatywna walidacja dla ${inputName}: ${invalidState}`);
    expect(invalidState).toBe(false);

    // Pozytywna walidacja (przykładowe poprawne dane, dostosuj do swoich wymagań)
    await input.fill('valid value');
    await input.blur(); // Aby wywołać walidację po opuszczeniu pola
    const validState = await input.evaluate(input => input.checkValidity());
    console.log(`Pozytywna walidacja dla ${inputName}: ${validState}`);
    expect(validState).toBe(true);
  }
});