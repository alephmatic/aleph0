import consola from "consola";
import { completeTask } from "./completeTask";
import { ActionList, Technology } from "./types";
import { generateDescription } from "./generateDescription";

export type GenerateOptions = {
  projectDir: string;
  technology: Technology;
  regenerateDescription: boolean;
  model?: string;
};

export async function generate(
  originalUserPrompt: string,
  options: GenerateOptions
): Promise<ActionList> {
  consola.start("Creating:", originalUserPrompt, "\n");

  const userPrompt = await generateDescription(
    originalUserPrompt,
    options.regenerateDescription
  );

  const actions = await completeTask(userPrompt, options);

  consola.info("Final actions:", actions);
  return actions;
}
