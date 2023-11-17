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

export const functionCallPrompt = (options: {
  userPrompt: string;
  projectDir: string;
}) => {
  const { userPrompt, projectDir } = options;

  return `This is your task: ${userPrompt}
  
  * When writing/reading files, use the absolute paths.
  * Only write/read files from this project directory: ${projectDir}
  * Current working directory: ${process.cwd()}
  `;
  //  * You must not derive data from thin air if you are able to do so by using one of the provided functions, e.g. readSnippet.`;
};

// export const findRelevantSnippetPrompt = (options: {
//   userPrompt: string;
//   snippets: SnippetMetadata[];
// }) => {
//   const { userPrompt, snippets } = options;

//   return `
// Given the following snippets, in the following format per snippet: '{name} - {description} (path: {path})'\n
// ${JSON.stringify(snippets)}

// Output should be a valid json from snippets above.
// return the most relevant snippet above to achieve: "${userPrompt}":\n`;
// };

// export const chooseFilePathsPrompt = async (options: {
//   userPrompt: string;
//   snippetMetadata: SnippetMetadata;
//   projectStructure: string;
// }) => {
//   const { userPrompt, snippetMetadata, projectStructure } = options;

//   return `You are an expert Next.js full-stack developer.

// Your feedback is needed to create a new feature in the app:
// "${userPrompt}"

// You are given a collection of snippets to add to a project.

// A general description of the snippets:
// ${snippetMetadata.description}

// The snippets:
// ${JSON.stringify(snippetMetadata, null, 2)}

// Placeholders are surrounded with < and >. Replace placeholders with the correct values.",

// It is your job to choose the relative paths for where these snippets should be added to the project.

// Return a JSON array in the following format:
// [
//   { "snippetName": "SNIPPET_NAME_1", "filePath": "PATH_1" },
//   { "snippetName": "SNIPPET_NAME_2", "filePath": "PATH_2" }
// ]

// "filePath" is relative to the project root directory and where the snippet should be added.

// DO NOT PLACE FILES IN COMPONENTS/UI FOLDER. CREATE NEW FILES.
// DO NOT EXPLAIN YOUR DECISIONS, ONLY RETURN A VALID JSON ARRAY.

// This is the current file tree of the project:
// ${projectStructure}
// `;
// };

// const CODE_GEN_RULES = `
// RULES:
// - MAKE SURE TO FILL ANY UNFINISHED CODE (TODO), MAKE THE CODE COMPLETE.
// - ONLY RETURN ONE FILE CONTENTS, NOT MULTIPLE.
// - OUTPUT MUST NOT BE A CONVERSATION OR DESCRIPTION, SOURCE CODE ONLY.
// `;

// export const createFilePrompt = async (options: {
//   snippet: string;
//   userPrompt: string;
//   snippetKnowledge: string;
// }) => {
//   const { snippet, userPrompt, snippetKnowledge } = options;

//   return `You are an expert Next.js full-stack developer.
// You are following the user instructions to write code: ${userPrompt}

// This is a snippet you need to change to generate the final code:
// ###
// ${snippet}
// ###

// Additional knowledge that can help you:
// ${snippetKnowledge}

// ${CODE_GEN_RULES}

// Final changed snippet code:
// ###
// `;
// };

// export const updateFilePrompt = async (options: {
//   snippet: string;
//   userPrompt: string;
//   snippetKnowledge: string;
//   fileContents: string;
// }) => {
//   const { snippet, userPrompt, snippetKnowledge, fileContents } = options;

//   return `You are an expert Next.js full-stack developer.
// You are following the user instructions to write code: ${userPrompt}

// This is a snippet you need to use to generate the final code:
// ###
// ${snippet}
// ###

// Additional knowledge that can help you:
// ${snippetKnowledge}

// Update this code, using the information and snippet above:
// ###
// ${fileContents}
// ###

// ${CODE_GEN_RULES}

// Final updated code:
// ###
// `;
// };
