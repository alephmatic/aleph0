import consola from "consola";
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
  const spinner = ora("Calling OpenAI\n").start();

  consola.debug("OpenAI content:");
  consola.debug(content);


  let messages: OpenAI.Chat.ChatCompletionMessage[] = [
    { role: "user", content },
  ];
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

  consola.debug("OpenAI result:");
  consola.debug(result);

  return result;

}
