import { Snippet } from "./types";
import { getSnippetFiles } from "./utils";

export const createTaskDescriptionPrompt = (options: {
  userPrompt: string;
}) => {
  const { userPrompt } = options;

  return `You are an expert full-stack developer.
Create a more complete description of this task to pass on to an AI agent.
The description should be kept to 1-2 lines if possible.
${userPrompt}
  
Task description:`;
};

export const findRelevantSnippetPrompt = (options: {
  userPrompt: string;
  snippets: Snippet[];
}) => {
  const { userPrompt, snippets } = options;

  return `
Given the following snippets, in the following format per snippet: '{name} - {description} (path: {path})'\n
${JSON.stringify(snippets)}

Output should be a valid json from snippets above.
return the most relevant snippet above to achieve: "${userPrompt}":\n`;
};

export const createChangesArrayPrompt = async (options: {
  userPrompt: string;
  snippet: Snippet;
  projectStructure: string;
  generalKnowledge: string;
  routesKnowledge: string;
}) => {
  const { userPrompt, snippet, projectStructure, generalKnowledge, routesKnowledge } =
    options;

  const snippets: string[] = await getSnippetFiles(snippet.path);

  return `You are an expert Next.js full-stack developer.

Your feedback is needed to create a new feature in the app:
"${userPrompt}"

You are given snippets to add to a project:

- FORM
- ROUTE
- VALIDATION

It is your job to choose the relative paths for where these snippets should be added in the project.

General instructions about this collection of snippets:

${[
  "This snippet collection adds a form with an API endpoint to the app.",
  "The form should be placed on the frontend in a `forms/<FORM>.ts` file.",
  "The `route.ts` file should be placed at `app/api/<FEATURE>/route.ts`. This can be imported as import '@/app/api/<FEATURE>/route.ts'.",
  "The `validation.ts` file should be placed at `app/api/<FEATURE>/validation.ts`. This can be imported as import '@/app/api/<FEATURE>/validation.ts'.",
  "<FEATURE> and <FORM> are placeholders that should be replaced with the correct values.",
].join("\n")}

Return a JSON array of the following format:
[
  { "snippetName": "SNIPPET_NAME_1", "filePath": "PATH_1" },
  { "snippetName": "SNIPPET_NAME_2", "filePath": "PATH_2" }
]

"filePath" is relative to the project root directory and where the snippet should be added.
`;

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
${routesKnowledge}

Return the snippets and relative source files to create/modify.

Rules:
- Valid JSON array, no explanations or descriptions.
- If the file needs to be created, think about the most appropriate path and file name.
- snippetPath and sourcePath have to have the same file name (e.g. snippetPath="route.ts", then sourcePath must be a file named the same: "route.ts")
- Output in the following format example:
  [{snippetPath: "snippets/search-handler/route.ts", sourcePath: "app/search/route.ts"]
- DO NOT USE THE FOLLOWING PATHS as sourcePaths:
components/
  ui/
    form.tsx
    label.tsx
    toaster.tsx
    use-toast.ts
    input.tsx
    select.tsx
    button.tsx
    table.tsx
    toast.tsx

JSON result:
  `;
};

const CODE_GEN_RULES = `
RULES:
- MAKE SURE TO FILL ANY UNFINISHED CODE (TODO), MAKE THE CODE COMPLETE.
- ONLY RETURN ONE FILE CONTENTS, NOT MULTIPLE.
- OUTPUT MUST NOT BE A CONVERSATION OR DESCRIPTION, SOURCE CODE ONLY.
`;

export const createFilePrompt = async (options: {
  snippet: string;
  userPrompt: string;
  routeKnowledge: string;
}) => {
  const { snippet, userPrompt, routeKnowledge } = options;

  return `You are an expert Next.js full-stack developer.
You are following the user instructions to write code: ${userPrompt}

This is a snippet you need to change to generate the final code:
###
${snippet}
###

Additional knowledge that can help you:
${routeKnowledge}

${CODE_GEN_RULES}

Final changed snippet code:
###
`;
};

export const updateFilePrompt = async (options: {
  snippet: string;
  userPrompt: string;
  routeKnowledge: string;
  fileContents: string;
}) => {
  const { snippet, userPrompt, routeKnowledge, fileContents } = options;

  return `You are an expert Next.js full-stack developer.
You are following the user instructions to write code: ${userPrompt}

This is a snippet you need to use to generate the final code:
###
${snippet}
###

Additional knowledge that can help you:
${routeKnowledge}

Update this code, using the information and snippet above:
###
${fileContents}
###

${CODE_GEN_RULES}

Final updated code:
###
`;
};
