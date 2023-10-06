import { Command } from "commander";
import path from "path";
import consola from "consola";
import {
  getGeneralAndRoutesKnowledge,
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
import { ChangesSchema, Snippet, changesSchema, snippetSchema } from "./types";

const PROJECT_DIR = "../examples/next";

async function generate(
  originalUserPrompt: string,
  regenerateDescription: boolean
) {
  consola.start("Creating:", originalUserPrompt, "\n");

  const { knowledge, generalKnowledge, routesKnowledge } =
    await getGeneralAndRoutesKnowledge("nextjs13");

  const userPrompt = await generateDescription(
    originalUserPrompt,
    regenerateDescription
  );
  const snippet = await chooseSnippet(userPrompt);
  const changes = await findProjectFiles(
    userPrompt,
    snippet,
    generalKnowledge,
    routesKnowledge
  );
  return // TODO remove
  const newFiles = await generateNewFiles(userPrompt, changes, knowledge);

  return newFiles;
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

async function chooseSnippet(userPrompt: string): Promise<Snippet> {
  consola.info(`Step 1b - choose the snippet to use for this task`);
  const snippets = await loadSnippets();
  const snippetString = await ai(
    findRelevantSnippetPrompt({ userPrompt, snippets })
  );
  if (!snippetString) throw new Error(`AI didn't return a snippet`);

  const snippet = snippetSchema.parse(JSON.parse(snippetString));
  return snippet;
}

async function findProjectFiles(
  userPrompt: string,
  snippet: Snippet,
  generalKnowledge: string,
  routesKnowledge: string
): Promise<ChangesSchema> {
  consola.info(`Step 2 - find the project files to edit`);
  const projectStructure = await getProjectStructure(PROJECT_DIR);

  const changesRaw = await ai(
    await createChangesArrayPrompt({
      userPrompt,
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

  const changes = changesSchema.parse(JSON.parse(changesRaw));

  return changes;
}

async function generateNewFiles(
  userPrompt: string,
  changes: ChangesSchema,
  knowledge: Record<string, string>
) {
  consola.info(
    `Step 3 - for each file in the changes array, ask GPT 4 for the new file and create/modify it.`
  );

  for (const change of changes) {
    consola.log(`Change operation: ${JSON.stringify(change, null, 2)}`);

    const sourceFilePath = path.join(PROJECT_DIR, change.filePath);
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
          userPrompt,
          routeKnowledge,
          fileContents: currentFileContents,
        }),
        undefined,
        "gpt-4"
      );
    } else {
      consola.info("Creating a new file");
      fileContents = await ai(
        await createFilePrompt({ snippet, userPrompt, routeKnowledge }),
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
    "AI will skip regenerating the description"
  )
  .action((text, options) => {
    generate(text, !options.skipRegenerateDescription);
  });
program.parse(process.argv);
