import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Symulacja zakupów', async ({ page }) => {
  // 1. Przejdź do strony sklepu
  await page.goto('https://twoj-sklep.pl');

  // 2. Wybierz losowy produkt
  const products = await page.$$('//div[contains(@class, "product")]');
  const randomProduct = products[faker.number.int({ min: 0, max: products.length - 1 })];
  await randomProduct.click();

  // 3. Dodaj produkt do koszyka
  await page.click('//button[contains(text(), "Dodaj do koszyka")]');

  // 4. Przejdź do koszyka
  await page.click('//a[contains(text(), "Koszyk")]');

  // 5. Zweryfikuj zawartość koszyka
  const productInCart = await page.$('//div[contains(text(), "Nazwa produktu")]');
  expect(productInCart).toBeTruthy();

  // 6. Przejdź do płatności
  await page.click('//button[contains(text(), "Przejdź do płatności")]');

  // 7. Wygeneruj losowe dane klienta (imię, nazwisko, adres itp.)
  const name = faker.person.fullName();
  const email = faker.internet.email();
  const address = faker.location.streetAddress();

  // 8. Wypełnij formularz płatności
  await page.fill('//input[@name="name"]', name);
  await page.fill('//input[@name="email"]', email);
  await page.fill('//input[@name="address"]', address);

  // 9. Złóż zamówienie
  await page.click('//button[contains(text(), "Złóż zamówienie")]');

  // 10. Zweryfikuj potwierdzenie zamówienia
  const orderConfirmation = await page.$('//div[contains(text(), "Dziękujemy za zamówienie")]');
  expect(orderConfirmation).toBeTruthy();
});