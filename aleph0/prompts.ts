import { Snippet } from "./types";
import { getSnippetFiles } from "./utils";

export const findRelevantSnippetPrompt = (options: {
  userText: string;
  snippets: string;
}) => {
  const { userText, snippets } = options;

  return `
Given the following snippets, 
in the following format per snippet: '{name} - {description} (path: {path})\n'
${snippets}

Output should be a valid json from snippets above.
return the most relevant snippet above to achieve: "${userText}":\n`;
};

export const createChangesArrayPrompt = async (options: {
  snippet: Snippet;
  projectStructure: string;
  generalKnowledge: string;
  specificKnowledge: string;
}) => {
  const { snippet, projectStructure, generalKnowledge, specificKnowledge } =
    options;

  const snippets: string[] = await getSnippetFiles(snippet.path);

  return `
  You are an expert Next13 fullstack developer.
  ${generalKnowledge}

  Assuming the following project structure:
  ${projectStructure}

  And the following snippet files:
  ${snippets.join("\n")}

  And the snippet file definitions:
  ${specificKnowledge}

  Return the snippets and relative source files to create/modify.

  Rules:
  - Valid JSON array, no explanations or descriptions.
  - If the file needs to be created, think about the most apropriate path and file name.
  - snippetPath and sourcePath have to have the same file name (e.g. snippetPath="route.ts", then sourcePath must be a file named the same: "route.ts")
  - Output in the following format example:
    [{snippetPath: "snippets/search-handler/route.ts", sourcePath: "app/search/route.ts"]

  JSON result:
  `;
};

export const createFilePrompt = async (options: {
  snippet: string;
  userText: string;
  specificKnowledge: string;
}) => {
  const { snippet, userText, specificKnowledge } = options;

  return `You are an expert Next.js full-stack developer.
You are following the user instructions to write code:
###
${userText}
###

Only return valid code that can be pasted directly into the project without editing.
DO NOT ADD ADDITIONAL COMMENTS OR EXPLANATIONS, NO "\`\`\` MARKDOWN.

This is an example of a valid file from the project. YOU MUST CHANGE THIS TO BE THE ACTUAL FILE FOR OUR USE CASE:

###
${snippet}
###

Additional knowledge that can help you:
${specificKnowledge}

Changed snippet code:
`;
};

export const updateFilePrompt = async (options: {
  snippet: string;
  userText: string;
  specificKnowledge: string;
  fileContents: string;
}) => {
  const { snippet, userText, specificKnowledge, fileContents } = options;

  return `You are an expert Next.js full-stack developer.
You are following the user instructions to write code:
###
${userText}
###

Only return valid code that can be pasted directly into the project without editing.
DO NOT ADD ADDITIONAL COMMENTS OR EXPLANATIONS, NO "\`\`\` MARKDOWN, JUST VALID CODE.

This is an example of a valid file from the project.

Using this snippet:
###
${snippet}
###

Additional knowledge that can help you:
${specificKnowledge}

Update this code, using the information above:
###
${fileContents}
###

Updated code:
`;
};
