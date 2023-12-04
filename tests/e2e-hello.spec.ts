import dotenv from "dotenv";
import { test, expect } from "@playwright/test";
import { GenerateOptions, generate } from "../src/generate";
dotenv.config();

const options: GenerateOptions = {
  projectDir: "./tests/temp",
  regenerateDescription: true,
  technology: "next14",
  model: "gpt-4-1106-preview",
};

test.only("Hello test", async ({ page, request }) => {
  test.setTimeout(200000);
  await generate(
    "create an api at /api/hello that returns 'Hello aleph0' as text/plain.",
    options
  );

  const apiResponse = await request.get("/api/hello");
  expect(apiResponse.status()).toBe(200);
  const responseBody = await apiResponse.text();
  expect(responseBody).toBe("Hello aleph0");

  await generate(
    "create a form component that calls the api at /api/hello and displays the response.",
    options
  );

  await generate(
    "create a page under /hello that uses the form you just created.",
    options
  );

  await page.goto("/hello");
  const button = page.locator("button").first();
  await button.click();
  await expect(page.locator("body")).toHaveText("Hello aleph0");
});
