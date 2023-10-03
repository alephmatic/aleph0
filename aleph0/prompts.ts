import { getSnippets } from "./utils";

export const findRelevantSnippets = (
  userText: string,
  snippetsText: string
) => `
Given the following snippets, 
in the following format per snippet: '{name} - {description} (path: {path})\n'
${snippetsText}

Output should be a valid json from abovesnippets.
return the most relevant snippet above to achieve: "${userText}":\n`;

export const createFsActions = async (
  text: string,
  relevantSnippet: string,
  projectStructure: string
) => {
  const snippet = JSON.parse(relevantSnippet);
  const mappedSnipept = await getSnippets(snippet.path);

  console.log(`
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
    
  Your goal is to create ${text} within this project strucutre:
  ${projectStructure}
  
  Use these relevant snippet to create the "${text}".
  ${mappedSnipept}
  Output format (valid JSON): [{filePath: <path>, contents: <contents>}...]
  `);
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

  Your goal is to create ${text} within this project strucutre:
  ${projectStructure}
  
  Use these relevant snippet to create the "${text}".
  Output format (valid JSON): [{filePath: <path>, contents: <contents>}...]
  `;
};
