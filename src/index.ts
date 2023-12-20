import { Command } from "commander";
import { generate } from "./generate";

const program = new Command();

program
  .command("gen <prompt>")
  .description("Generate code.")
  .requiredOption(
    "-p --project-dir <projectDir>",
    "Project directory to work on.",
    process.cwd()
  )
  .option(
    "-rd, --regenerate-description",
    "AI will regenerate the description",
    true
  )
  .option("-t, --technology", "The technology to use. eg. Next.js", "next14")
  .option(
    "-m, --model",
    "The model to use. eg. gpt-4-1106-preview",
    "gpt-4-1106-preview"
  )
  .option(
    "-c, --confirm-actions",
    "Whether to confirm the actions before executing them",
    true
  )
  .action((originalUserPrompt, options) => {
    generate(originalUserPrompt, options);
  });

program.parse(process.argv);
