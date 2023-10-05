import { Snippet } from "./types";
import { getSnippetFiles } from "./utils";

export const createTaskDescriptionPrompt = (options: { userText: string }) => {
  const { userText } = options;

  return `You are an expert full-stack developer.
Create a more complete description of this task to pass on to an AI agent.
The description should be kept to 1-2 lines if possible.
${userText}
  
Task description:`;
};

export const findRelevantSnippetPrompt = (options: {
  userText: string;
  snippets: Snippet[];
}) => {
  const { userText, snippets } = options;

  return `
Given the following snippets, in the following format per snippet: '{name} - {description} (path: {path})'\n
${JSON.stringify(snippets)}

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
You are an expert Next.js full-stack developer.
${generalKnowledge}

Your project has the following structure:
###
${projectStructure}
###

You are given the following snippet files:
###
${snippets.join("\n")}
###

You have received the following documentation:
${specificKnowledge}

Return the snippets and relative source files to create/modify.

Rules:
- Valid JSON array, no explanations or descriptions.
- If the file needs to be created, think about the most appropriate path and file name.
- snippetPath and sourcePath have to have the same file name (e.g. snippetPath="route.ts", then sourcePath must be a file named the same: "route.ts")
- Output in the following format example:
  [{snippetPath: "snippets/search-handler/route.ts", sourcePath: "app/search/route.ts"]

JSON result:
  `;
};

const CODE_GEN_RULES = `
RULES:
- MAKE SURE TO FILL ANY UNFINISHED CODE (TODO), MAKE THE CODE COMPLETE.
- OUTPUT MUST NOT BE A CONVERSATION OR DESCRIPTION, SOURCE CODE ONLY.
`;

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

This is a snippet you need to change to generate the final code:
###
${snippet}
###

Additional knowledge that can help you:
${specificKnowledge}

${CODE_GEN_RULES}

Final changed snippet code:
###
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

This is a snippet you need to use to generate the final code:
###
${snippet}
###

Additional knowledge that can help you:
${specificKnowledge}

Update this code, using the information and snippet above:
###
${fileContents}
###

${CODE_GEN_RULES}

Final updated code:
###
`;
};
