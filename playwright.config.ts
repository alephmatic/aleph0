import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: "tests",

  // Run all tests in parallel.
  fullyParallel: true,

  // Reporter to use
  reporter: "html",

  // Timeout of each test - give more time for AI to finish
  timeout: 180_000,

  // Configure projects for major browsers.
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // // Run your local dev server before starting the tests.
  // webServer: {
  //   command: "cd test/temmp && npm run start",
  //   url: "http://127.0.0.1:3000",
  //   reuseExistingServer: !process.env.CI,
  // },
});
