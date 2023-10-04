import OpenAI from "openai";
import ora from "ora";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export async function ai(
  content: string,
  instructions?: string,
  model: "gpt-3.5-turbo" | "gpt-4" = "gpt-3.5-turbo"
) {
  const spinner = ora("Calling OpenAI").start();

  let messages: OpenAI.Chat.ChatCompletionMessage[] = [
    { role: "user", content: content },
  ];
  if (instructions)
    messages = [{ role: "system", content: instructions }, ...messages];
  const chatCompletion = await openai.chat.completions.create({
    messages,
    model,
  });

  spinner.succeed();

  return chatCompletion.choices[0].message.content;
}
