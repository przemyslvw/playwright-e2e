import { test, expect } from "@playwright/test";

test.describe("Test Suite", () => {
  test.beforeEach(async ({ page }) => {
    // Perform login
    await page.goto("https://example.com/login");
    await page.fill("#username", "your-username");
    await page.fill("#password", "your-password");
    await page.click("#login-button");
    await page.waitForNavigation();
  });

  test("test 1", async ({ page }) => {
    // Test 1 implementation
    await page.goto("https://example.com/page1");
    const title = await page.title();
    expect(title).toBe("Page 1 Title");
  });

  test("test 2", async ({ page }) => {
    // Test 2 implementation
    await page.goto("https://example.com/page2");
    const title = await page.title();
    expect(title).toBe("Page 2 Title");
  });
});
