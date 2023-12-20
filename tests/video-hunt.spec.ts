import dotenv from "dotenv";
import { test, expect } from "@playwright/test";
import { GenerateOptions, generate } from "../src/generate";
import { ActionList } from "../src/types";
dotenv.config();

const options: GenerateOptions = {
  projectDir: "./tests/temp",
  regenerateDescription: false,
  technology: "next14",
  model: "gpt-4-1106-preview",
};

const instructions: string[] = [
  "Add a 'Video' model to the Prisma schema with fields like 'id', 'title', 'url', 'createdAt', and 'votes'.",
  "Create a page with a list of videos. Fetch video data from the database and display it.",
  "Add an API route in Next.js to handle video submissions.",
  "Create a form on the front-end to submit new videos. This form should make a POST request to your submission API route.",
  "Add an API route for upvoting a video. This route should update the 'votes' field of a video in the database.",
  "Implement a button or a mechanism on the video list page to upvote videos, making a request to your upvote API route.",
];

test.only("VideoHunt test", async ({ page, request }) => {
  test.setTimeout(1200000);
  const actionlist: ActionList = [];

  // // one big instruction:
  // const actions = await generate(instructions.join("\n"), options);
  // actionlist.push(...actions);

  // break it down into smaller parts
  for (const instruction of instructions) {
    const actions = await generate(instruction, options);
    actionlist.push(...actions);
  }

  console.log(
    "Did the following actions:",
    JSON.stringify(actionlist, null, 2)
  );

  // // Test the form component and page.
  // await page.goto("/hello");
  // const input = page.locator("input");
  // input.fill("Hello aleph0");
  // const button = page.locator("button").first();
  // await button.click();
  // // await expect(input).toHaveText("Hello aleph0");
});
