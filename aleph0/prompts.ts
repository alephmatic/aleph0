import {
  getKnowledge,
  getSnippetFiles,
  getSnippets,
  loadSnippetMetadata,
} from "./utils";
import path from "path";

export const findRelevantSnippets = (
  userText: string,
  snippetsText: string
) => `
Given the following snippets, 
in the following format per snippet: '{name} - {description} (path: {path})\n'
${snippetsText}

Output should be a valid json from abovesnippets.
return the most relevant snippet above to achieve: "${userText}":\n`;

export const createChangesArray = async (
  snippet: string,
  projectStructure: string,
  projectType: string
) => {
  const snippetObj = JSON.parse(snippet);
  const snippets: string[] = await getSnippetFiles(snippetObj.path);
  const snippetsKnowledgeMapping = snippetObj.knowledgeMapping;

  const knowledge = await getKnowledge(projectType);

  // Find knowledge relevant to the files, that might help openai decide what and how to change files
  const relevantSnippetKnowledge = Object.keys(snippetsKnowledgeMapping)
    .map((sk) => {
      return knowledge[snippetsKnowledgeMapping[sk]];
    })
    .join("\n");

  return `
  You are an expert Next13 fullstack developer.
  ${knowledge["general.txt"]}

  Assuming the following project structure:
  ${projectStructure}

  And the following snippet files:
  ${snippets.join("\n")}

  And the snippet file definitions:
  ${relevantSnippetKnowledge}

  Return the snippets and relative source files to create/modify.

  Rules:
  - Valid JSON array, no explanations.
  - If the file needs to be created, think about the most apropriate path and file name.
    - Add an attribute {create: true} if so.
  - snippet and sourcePath have to have the same file name (e.g. snippet="route.ts", then sourcePath must be a file named the same: "route.ts")
  - Output in the following format example:
    [{snippet: "snippets/search-handler/route.ts", sourcePath: "app/search/route.ts"]
  `;
};
