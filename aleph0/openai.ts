import consola from "consola";
import OpenAI from "openai";
import ora from "ora";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

let assistant = await openai.beta.assistants.retrieve("Aleph0-Nextjs");
if (!assistant)
  assistant = await openai.beta.assistants.create({
    name: "Aleph0-Nextjs",
    instructions:
      "You are an expert fullstack developer, knowledgeable with Nextjs, Tailwind, Zod, React hooks.",
    model: "gpt-4-1106-preview",
    tools: [{ type: "code_interpreter" }],
  });
const thread = await openai.beta.threads.create();

export async function ai(
  content: string,
  instructions?: string,
  model: "gpt-3.5-turbo" | "gpt-4" = "gpt-3.5-turbo"
) {
  const spinner = ora("Calling OpenAI\n").start();

  consola.debug("OpenAI content:");
  consola.debug(content);

  if (instructions)
    await openai.beta.threads.messages.create(thread.id, {
      role: "user", // should be system. but then it isn't supported
      content: instructions,
    });

  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content,
  });

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
    instructions: "Please do what the user asked for.",
  });

  let status = await openai.beta.threads.runs.retrieve(thread.id, run.id);

  // Wait for result
  while (
    status.status === "queued" ||
    status.status === "in_progress" ||
    status.status === "cancelling"
  ) {
    status = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  }

  spinner.succeed();

  const result = chatCompletion.choices[0].message.content;

  consola.debug("OpenAI result:");
  consola.debug(result);

  return result;
}
