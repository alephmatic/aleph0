import consola from "consola";
import { completeTask } from "./completeTask";
import { Technology } from "./types";
import { generateDescription } from "./generateDescription";

type GenerateOptions = {
  projectDir: string;
  technology: Technology;
  regenerateDescription: boolean;
  model?: string;
};

export async function generate(
  originalUserPrompt: string,
  options: GenerateOptions
) {
  consola.start("Creating:", originalUserPrompt, "\n");

  const userPrompt = await generateDescription(
    originalUserPrompt,
    options.regenerateDescription
  );

  const result = await completeTask(userPrompt, options);

  consola.info("Result:", result);
}
