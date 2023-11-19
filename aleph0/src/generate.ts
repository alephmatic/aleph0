import consola from "consola";
import { createTaskDescriptionPrompt } from "./prompts";
import { ai } from "./openai";
import { completeTask } from "./completeTask";

type GenerateOptions = {
  projectDir: string;
  regenerateDescription: boolean;
  model?: string;
};

export async function generate(
  originalUserPrompt: string,
  options: GenerateOptions
) {
  consola.start("Creating:", originalUserPrompt, "\n");

  // TODO: maybe move to a function call?
  const userPrompt = await generateDescription(
    originalUserPrompt,
    options.regenerateDescription
  );

  const result = await completeTask(userPrompt, {
    projectDir: options.projectDir,
    model: options.model ?? "gpt-4-1106-preview",
  });

  consola.info("Result:", result);
}

async function generateDescription(
  originalUserPrompt: string,
  regenerateDescription: boolean
): Promise<string> {
  if (!regenerateDescription) return originalUserPrompt;

  consola.info(`Step 1a - create a cleaner task description`);
  const regeneratedUserPrompt = await ai(
    createTaskDescriptionPrompt({ userPrompt: originalUserPrompt })
  );
  if (!regeneratedUserPrompt) throw new Error(`AI didn't return a description`);

  return regeneratedUserPrompt;
}