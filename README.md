# playwright-e2e

Przykłady testów automatycznych playwright

## instruction
npm install


- **Run all tests**: `npx playwright test`
- **Run a specific test file**: `npx playwright test path/to/your/test.spec.ts`
- **Run tests with a specific tag**: `npx playwright test --grep @yourTag`
- **Open Playwright Test Runner**: `npx playwright open`
- **Generate a test**: `npx playwright codegen yourwebsite.com`
- **Run tests in headed mode (with browser UI)**: `npx playwright test --headed`
- **Run tests in a specific browser**: `npx playwright test --project=chromium` (options include `chromium`, `firefox`, and `webkit`)
- **Record video of test runs**: `npx playwright test --video`
- **Capture screenshots on failure**: `npx playwright test --screenshot-on-failure`