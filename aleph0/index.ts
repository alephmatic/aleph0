import { Command } from "commander";
import { z } from "zod";
import path from "path";
import consola from "consola";
import {
  getKnowledge,
  getKnowledgeForSnippet,
  getProjectStructure,
  loadSnippets,
} from "./utils";
import {
  createChangesArray,
  findRelevantSnippet,
  generateFile,
} from "./prompts";
import { ai } from "./openai";
import { createFile, readFile } from "./lib/file";
import { snippetSchema } from "./types";

async function generate(userText: string) {
  consola.start("Creating:", userText);

  // 1. Find the relevant snippet
  consola.info(`Step 1 - find the relevant snippet`);
  const snippets = await loadSnippets();
  const snippetString = await ai(findRelevantSnippet({ userText, snippets }));
  if (!snippetString) throw new Error(`AI didn't return a snippet`);

  const snippet = snippetSchema.parse(JSON.parse(snippetString));

  consola.log("Using snippet:", snippet);

  // 2. Find the relevant files we are dealing with
  // For each snippet file, find the corresponding file to be created/modified
  // const changes = [{snippet: 'path', sourceFile: 'path'}]
  consola.info(`Step 2 - find the relevant files we are dealing with`);
  const projectStructure = await getProjectStructure("../examples/next");

  // Find knowledge relevant to the files, that might help openai decide what and how to change files
  const knowledge = await getKnowledge("nextjs13");
  const generalKnowledge = knowledge["general.txt"];
  const specificKnowledge = await getKnowledgeForSnippet(snippet, "nextjs13");

  const changesRaw = await ai(
    await createChangesArray({
      snippet,
      projectStructure,
      generalKnowledge,
      specificKnowledge,
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

  // 3. For each file in the changes array, ask GPT 4 for the new file and create/modify it.
  const RELATIVE_DIR = "../examples/next";
  consola.info(
    `Step 3 - for each file in the changes array, ask GPT 4 for the new file and create/modify it.`
  );
  for (const change of changes) {
    consola.log(`Change: ${JSON.stringify(change, null, 2)}`);
    const snippet = readFile(change.snippetPath);
    const fileContents = await ai(
      await generateFile({ snippet, userText, specificKnowledge }),
      undefined,
      "gpt-4"
    );
    if (!fileContents) throw new Error(`AI returned a bad file`);
    const sourceFilePath = path.join(RELATIVE_DIR, change.sourcePath);
    createFile(sourceFilePath, fileContents);
  }
}

const program = new Command();
program
  .command("gen <text>")
  .description("Generate nextjs snippet.")
  .action((text) => {
    generate(text);
  });
program.parse(process.argv);
