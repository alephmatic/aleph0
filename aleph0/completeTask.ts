import OpenAI from "openai";
import { createActions } from "./createActions";
import { FunctionCallingResult } from "./types";
import { functionCallPrompt } from "./prompts";
import consola from "consola";

const openai = new OpenAI();
export const completeTask = async (
  userOriginalPrompt: string,
  options: {
    technology: string;
    projectDir: string;
    model?: string;
  }
): Promise<FunctionCallingResult> => {
  let lastFunctionResult: null | { errorMessage: string } | { query: string } =
    null;

  const actions = createActions({ technology: options.technology });
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

      if (
        message.role === "assistant" &&
        message.function_call?.name.startsWith("result")
      ) {
        lastFunctionResult = JSON.parse(message.function_call.arguments);
      }
    });

  const finalContent = await runner.finalContent();

  consola.debug("> finalContent", finalContent);

  consola.debug("> lastFunctionResult", lastFunctionResult);
};
