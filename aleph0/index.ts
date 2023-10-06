import { Command } from "commander";
import { z } from "zod";
import path from "path";
import consola from "consola";
import {
  getKnowledge,
  getProjectStructure,
  loadSnippets,
  removeCodeWrapper,
} from "./utils";
import {
  createTaskDescriptionPrompt,
  findRelevantSnippetPrompt,
  createChangesArrayPrompt,
  createFilePrompt,
  updateFilePrompt,
} from "./prompts";
import { ai } from "./openai";
import { createFile, readFile } from "./lib/file";
import { snippetSchema } from "./types";

async function generate(
  originalUserText: string,
  regenerateDescription: boolean
) {
  consola.start("Creating:", originalUserText, "\n");

  let userText = originalUserText;

  if (regenerateDescription) {
    consola.info(`Step 1a - create a cleaner task description`);
    const regeneratedUserText = await ai(
      createTaskDescriptionPrompt({ userText: originalUserText })
    );
    if (!regeneratedUserText) throw new Error(`AI didn't return a description`);
    userText = regeneratedUserText;
  }

  consola.info(`Step 1b - find the relevant snippet`);
  const snippets = await loadSnippets();
  const snippetString = await ai(
    findRelevantSnippetPrompt({ userText, snippets })
  );
  if (!snippetString) throw new Error(`AI didn't return a snippet`);

  const snippet = snippetSchema.parse(JSON.parse(snippetString));

  consola.log("Using snippet:", snippet, "\n");

  // For each snippet file, find the corresponding file to be created/modified
  // const changes = [{snippet: 'path', sourceFile: 'path'}]
  consola.info(`Step 2 - find the relevant files we are dealing with`);
  const projectStructure = await getProjectStructure("../examples/next");

  // Find knowledge relevant to the files, that might help openai decide what and how to change files
  const knowledge = await getKnowledge("nextjs13");
  const generalKnowledge = knowledge["general.txt"];
  const routesKnowledge = Object.keys(knowledge)
    .filter((k) => k != "general.txt")
    .map((k) => knowledge[k])
    .join("\n");

  const changesRaw = await ai(
    await createChangesArrayPrompt({
      snippet,
      projectStructure,
      generalKnowledge,
      routesKnowledge,
    }),
    "Find what files are relevant for these snippets in this project.",
    "gpt-4"
  );
  if (!changesRaw)
    throw new Error(`AI returned a bad changes array: ${snippet}`);

  const changesSchema = z.array(
    z.object({
      snippetPath: z.string(),
      sourcePath: z.string(),
    })
  );
  const changes = changesSchema.parse(JSON.parse(changesRaw));

  consola.log(changes);
  consola.log("\n");

  const RELATIVE_DIR = "../examples/next";
  consola.info(
    `Step 3 - for each file in the changes array, ask GPT 4 for the new file and create/modify it.`
  );
  for (const change of changes) {
    consola.log(`Change operation: ${JSON.stringify(change, null, 2)}`);

    const sourceFilePath = path.join(RELATIVE_DIR, change.sourcePath);
    const sourceFile = Bun.file(sourceFilePath);
    const snippet = readFile(change.snippetPath);
    const routeKnowledge =
      knowledge[change.snippetPath.split("/").at(-1) || ""]; // TODO fix this

    let fileContents;
    if (await sourceFile.exists()) {
      consola.info("Updating existing file");
      const currentFileContents = await sourceFile.text();
      fileContents = await ai(
        await updateFilePrompt({
          snippet,
          userText,
          routeKnowledge,
          fileContents: currentFileContents,
        }),
        undefined,
        "gpt-4"
      );
    } else {
      consola.info("Creating a new file");
      fileContents = await ai(
        await createFilePrompt({ snippet, userText, routeKnowledge }),
        undefined,
        "gpt-4"
      );
    }

    if (!fileContents) throw new Error(`AI returned a bad file`);

    const cleanCode = removeCodeWrapper(fileContents);
    createFile(sourceFilePath, cleanCode);
  }
}

const program = new Command();
program
  .command("gen <text>")
  .description("Generate nextjs snippet.")
  .option(
    "-srd, --skip-regenerate-description",
    "AI will skip regenerating the description",
  )
  .action((text, options) => {
    generate(text, !options.skipRegenerateDescription);
  });
program.parse(process.argv);
