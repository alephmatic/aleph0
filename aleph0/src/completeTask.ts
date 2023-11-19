import OpenAI from "openai";
import consola from "consola";
import { createActions } from "./createActions";
import { functionCallPrompt } from "./prompts";
import { Technology } from "./types";

export const completeTask = async (
  userOriginalPrompt: string,
  options: {
    technology: Technology;
    projectDir: string;
    model?: string;
  }
) => {
  const openai = new OpenAI({ apiKey: process.env["OPENAI_API_KEY"] });

  let lastFunctionResult: null | { errorMessage: string } | { query: string } =
    null;

  const actions = createActions(options.technology);
  const promptString = functionCallPrompt({
    userPrompt: userOriginalPrompt,
    projectDir: options?.projectDir,
  });

  const runner = openai.beta.chat.completions
    .runFunctions({
      model: options?.model ?? "gpt-4-1106-preview",
      messages: [{ role: "user", content: promptString }],
      functions: Object.values(actions),
      temperature: 0,
      frequency_penalty: 0,
    })
    .on("message", (message) => {
      consola.debug("> message", message);
    });

  const finalContent = await runner.finalContent();

  consola.debug("> finalContent", finalContent);

  consola.debug("> lastFunctionResult", lastFunctionResult);
};
