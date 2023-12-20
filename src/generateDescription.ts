import consola from "consola";
import { createTaskDescriptionPrompt } from "./prompts";
import { ai } from "./openai";

export async function generateDescription(
  originalUserPrompt: string,
  regenerateDescription: boolean
): Promise<string> {
  if (!regenerateDescription) return originalUserPrompt;

  consola.info(`Step 1a - create a cleaner task description`);
  const regeneratedUserPrompt = await ai(
    createTaskDescriptionPrompt({ userPrompt: originalUserPrompt })
  );
  if (!regeneratedUserPrompt) throw new Error(`AI didn't return a description`);

  consola.info("Expanded user prompt:", regeneratedUserPrompt);

  return regeneratedUserPrompt;
}
