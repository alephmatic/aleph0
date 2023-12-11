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

const instructions: string[] = [
  // "Initialize a new Next.js project with TypeScript support.",
  // "Set up Prisma and create a Prisma schema for your database.",
  "Add a 'Video' model to the Prisma schema with fields like 'id', 'title', 'url', 'createdAt', and 'votes'.",
  // "Set up your database (e.g., PostgreSQL, MySQL) and run Prisma migrations.",
  "Create a page with a list of videos. Fetch video data from the database and display it.",
  "Add an API route in Next.js to handle video submissions.",
  "Create a form on the front-end to submit new videos. This form should make a POST request to your submission API route.",
  "Add an API route for upvoting a video. This route should update the 'votes' field of a video in the database.",
  "Implement a button or a mechanism on the video list page to upvote videos, making a request to your upvote API route.",
  // "Implement user authentication (e.g., with NextAuth.js) to allow only authenticated users to submit and upvote videos.",
  // "Style the application using your preferred CSS solution (e.g., Tailwind CSS, Styled Components).",
  // "Add error handling and validation both on the client-side (form submission) and server-side (API routes).",
  // "Write unit and integration tests for your API routes and components.",
  // "Deploy your application on a platform like Vercel or Netlify.",
];

test.only("VideoHunt test", async ({ page, request }) => {
  test.setTimeout(300000);
  const actionlist: ActionList = [];

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
