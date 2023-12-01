import dotenv from "dotenv";
import { existsSync, mkdirSync, cpSync } from "fs";
import { join } from "path";
import { test, expect } from "@playwright/test";
import { GenerateOptions, generate } from "../src/generate";
dotenv.config();

// End-to-end test function
async function testCLI() {
  // Step 1: Create a temp directory
  const tempDir = join(process.cwd(), "./tests/temp");
  if (!existsSync(tempDir)) {
    mkdirSync(tempDir);

    const examplesDir = join(process.cwd(), "./examples/next");
    cpSync(examplesDir, tempDir, { recursive: true });
  }

  const options: GenerateOptions = {
    projectDir: tempDir,
    regenerateDescription: true,
    technology: "next14",
    model: "gpt-4-1106-preview",
  };

  await generate(
    "create an api at /api/hello that returns 'Hello aleph0'",
    options
  );
  await generate(
    "create a page at /hello with a button that calls the api at /api/hello and displays it",
    options
  );
}

test("Hello test", async ({ page, request }) => {
  await testCLI();

  // Test the API endpoint
  const apiResponse = await request.get("/api/hello");
  expect(apiResponse.status()).toBe(200);
  const responseBody = await apiResponse.text();
  expect(responseBody).toBe("Hello aleph0");

  // Test the page and button functionality
  await page.goto("/hello");
  const button = page.locator("button"); // This will select the first button found
  await button.click();

  // Check if the text "Hello aleph0" is present on the page
  // await expect(page.locator("body")).toHaveText("Hello aleph0");
});
