import { Command } from "commander";
import { generate } from "./generate";

new Command()
  .command("gen <text>")
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
  .option("-t, --technology", "The technology to use. eg. Next.js", "next13_4")
  .action(generate)
  .parse(process.argv);
