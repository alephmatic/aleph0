import consola from "consola";
import { createActions } from "./createActions";
import { functionCallPrompt } from "./prompts";
import { ActionList, Technology } from "./types";
import { openai } from "./openai";

export const completeTask = async (
  userPrompt: string,
  options: {
    technology: Technology;
    projectDir: string;
    model?: string;
  }
): Promise<ActionList> => {
  const promptString = functionCallPrompt({ userPrompt });
  const actionFactory = await createActions(
    options.technology,
    options.projectDir
  );

  const runner = openai.beta.chat.completions
    .runFunctions({
      model: options?.model ?? "gpt-4-1106-preview",
      messages: [{ role: "user", content: promptString }],
      functions: Object.values(actionFactory.availableActions),
      temperature: 0,
      frequency_penalty: 0,
    })
    .on("message", (message) => {
      consola.debug("> message", message);
    });

  const finalContent = await runner.finalContent();

  consola.debug("> finalContent", finalContent);
  return actionFactory.actionList;
};
