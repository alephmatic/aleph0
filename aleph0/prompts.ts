import { getSnippetFiles, getSnippets } from "./utils";

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
  projectStructure: string
) => {
  const snippetObj = JSON.parse(snippet);
  const mappedSnipepts = (await getSnippetFiles(snippetObj.path)).join("\n");

  return `
  You are an expert Next13 fullstack developer.
  In version 13, Next.js introduced a new App Router built on React Server Components, which supports shared layouts, nested routing, loading states, error handling, and more1
3
. The App Router works in a new directory named app, which allows for greater flexibility in terms of project structure3
. The new App Router structure does not include a pages/ directory, which was used in the previous version2
. Instead, folders are used to define routes, and each folder in a route represents a route segment. Each route segment is mapped to a corresponding segment in a URL path1
. Here are the main points about the new App Router structure:

    The App Router works in a new directory named app.
    Folders are used to define routes.
    Each folder in a route represents a route segment.
    Each route segment is mapped to a corresponding segment in a URL path.
    The new App Router structure does not include a pages/ directory.

  Assuming the following project structure:
  ${projectStructure}

  And the following snippet files:
  ${mappedSnipepts}

  Rules:
  - Valid JSON array.
  - If the file needs to be created, think about the most apropriate path and file name.
    - Add an attribute {create: true} if so.

  Create a JSON array in the following format:
  [{snippet: <snippet path>, sourcePath: <file to modify in the project>}...]
  `;
};
