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
    console.log("Done copying examples/next to tests/temp");
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

test("Hello test", async ({ page }) => {
  await testCLI();
  // await page.goto("http://localhost:3000/hello");
  // await expect(page).toHaveTitle(/button/);
  // // test if clicking the button sends an api request
  // await page.click("text=button");
  // await expect(page).toHaveText("Hello aleph0");
});
