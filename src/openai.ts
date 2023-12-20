import dotenv from 'dotenv';
import consola from "consola";
import OpenAI from "openai";
import ora from "ora";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
dotenv.config();

export const openai = new OpenAI();

export async function ai(
  content: string,
  instructions?: string,
  model: "gpt-3.5-turbo" | "gpt-4" = "gpt-3.5-turbo"
): Promise<string> {
  const spinner = ora({
    text: "Calling OpenAI\n",
    isEnabled: process.env.PLAYWRIGHT_TEST !== "true",
  }).start();

  consola.debug("OpenAI content:", content);

  let messages: Array<ChatCompletionMessageParam> = [{ role: "user", content }];
  if (instructions)
    messages = [{ role: "system", content: instructions }, ...messages];

  const chatCompletion = await openai.chat.completions.create({
    messages,
    model,
    temperature: 0,
    frequency_penalty: 0,
  });

  spinner.succeed();

  const result = chatCompletion.choices[0].message.content;

  consola.debug("OpenAI result:", result);

  return result ?? "Failure to get result from OpenAI.";
}
