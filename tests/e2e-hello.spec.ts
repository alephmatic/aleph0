import dotenv from "dotenv";
import { existsSync, mkdirSync, cpSync, rmdirSync } from "fs";
import { join } from "path";
import { test, expect } from "@playwright/test";
import { GenerateOptions, generate } from "../src/generate";
import { ExecaChildProcess, execa } from "execa";
import consola from "consola";
dotenv.config();

function createTempDir(dir: string) {
  if (!existsSync(dir)) {
    mkdirSync(dir);

    const examplesDir = join(process.cwd(), "./examples/next");
    cpSync(examplesDir, dir, { recursive: true });
    console.log("Done copying examples/next to tests/temp");
  }
}

const options: GenerateOptions = {
  projectDir: "./tests/temp",
  regenerateDescription: true,
  technology: "next14",
  model: "gpt-4-1106-preview",
};

test.beforeEach(async () => {
  // const tempDir = join(process.cwd(), options.projectDir);
  // rmdirSync(tempDir, { recursive: true });
  // createTempDir(tempDir);
});

test.only("Hello test", async ({ page, request }) => {
  test.setTimeout(120000);
  await generate(
    "create an api at /api/hello that returns 'Hello aleph0' as text/plain.",
    options
  );

  // await generate(
  //   "create a component for a form that upon submittion on a button click, calls the api at /api/hello and displays the response. ",
  //   options
  // );
  // await generate(
  //   "Using the previous form component you created, create a page at /hello that uses the form component.",
  //   options
  // );
  // Run `npm run dev` in the temp dir
  // Test the API endpoint
  const apiResponse = await request.get("/api/hello");
  expect(apiResponse.status()).toBe(200);
  const responseBody = await apiResponse.text();
  expect(responseBody).toBe("Hello aleph0");
  // // Test the page and button functionality
  // await page.goto("/hello");
  // const button = page.locator("button"); // This will select the first button found
  // await button.click();
  // // Check if the text "Hello aleph0" is present on the page
  // await expect(page.locator("body")).toHaveText("Hello aleph0");
});
