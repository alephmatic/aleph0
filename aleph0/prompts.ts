import { getKnowledge, getKnowledgeForSnippet, getSnippetFiles } from "./utils";

export const findRelevantSnippets = (
  userText: string,
  snippetsText: string
) => `
Given the following snippets, 
in the following format per snippet: '{name} - {description} (path: {path})\n'
${snippetsText}

Output should be a valid json from snippets above.
return the most relevant snippet above to achieve: "${userText}":\n`;

export const createChangesArray = async (
  snippet: string,
  projectStructure: string,
  projectType: string
) => {
  const snippetObj = JSON.parse(snippet);
  const snippets: string[] = await getSnippetFiles(snippetObj.path);

  const knowledge = await getKnowledge(projectType);

  // Find knowledge relevant to the files, that might help openai decide what and how to change files
  const relevantSnippetKnowledge = getKnowledgeForSnippet(snippet, projectType);

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
  - Valid JSON array, no explanations or descriptions.
  - If the file needs to be created, think about the most apropriate path and file name.
    - Add an attribute {create: true} if so.
  - snippetPath and sourcePath have to have the same file name (e.g. snippetPath="route.ts", then sourcePath must be a file named the same: "route.ts")
  - Output in the following format example:
    [{snippetPath: "snippets/search-handler/route.ts", sourcePath: "app/search/route.ts"]

  JSON result:
  `;
};

export const generateFile = async (
  snippet: string,
  userText: string,
  projectType: string
) => {
  const relevantSnippetKnowledge = getKnowledgeForSnippet(snippet, projectType);

  return `You are an expert Next.js full-stack developer.
You are following the user instructions to write code:
###
${userText}
###

Only return valid code that can be pasted directly into the project without editing.
DO NOT ADD ADDITIONAL COMMENTS OR EXPLANATIONS.

This is an example of a valid file from the project. YOU MUST CHANGE THIS TO BE THE ACTUAL FILE FOR OUR USE CASE:

###
${snippet}
###
`;
};
