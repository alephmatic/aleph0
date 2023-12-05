import dotenv from "dotenv";
import { test, expect } from "@playwright/test";
import { GenerateOptions, generate } from "../src/generate";
import { ActionList } from "../src/types";
dotenv.config();

const options: GenerateOptions = {
  projectDir: "./tests/temp",
  regenerateDescription: true,
  technology: "next14",
  model: "gpt-4-1106-preview",
};

test.only("Hello test", async ({ page, request }) => {
  test.setTimeout(300000);
  const actionlist: ActionList = [];

  let actions = await generate(
    "create an api at /api/hello that returns 'Hello aleph0' as text/plain.",
    options
  );
  actionlist.push(...actions);

  // Test the created API
  const apiResponse = await request.get("/api/hello");
  expect(apiResponse.status()).toBe(200);
  const responseBody = await apiResponse.text();
  expect(responseBody).toBe("Hello aleph0");

  actions = await generate(
    "create a form component that calls the api at /api/hello and displays the response.",
    options
  );
  actionlist.push(...actions);

  actions = await generate(
    "create a page under /hello that uses the form you just created.",
    options
  );
  actionlist.push(...actions);

  actions = await generate(
    `Using the past actions you've made: ${JSON.stringify(
      actionlist
    )} check for bugs in the created files, specifically how they relate to each other.`,
    options
  );
  actionlist.push(...actions);

  console.log(
    "Did the following actions:",
    JSON.stringify(actionlist, null, 2)
  );

  // Test the form component and page.
  await page.goto("/hello");
  const button = page.locator("button").first();
  await button.click();
  await expect(page.locator("body")).toHaveText("Hello aleph0");
});
