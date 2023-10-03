export const readSnippetFunction = function (snippetPath: string) {
  const routeFile = Bun.file("./snippets/form-api/route.ts.txt");
};

export const readSnippetFunctionSchema = {
  name: "readSnippetFunction",
  description: "Reads the code snippet contents from the snippets directory.",
  parameters: {
    type: "object",
    properties: {
      snippetPath: {
        type: "string",
        description: "An array of string snippet paths to read the values.",
      },
    },
    required: ["snippetPath"],
  },
};
export const findRelevantSnippets = (
  userText: string,
  snippetsText: string
) => `
Given the following snippets, 
in the following format per snippet: '{name} - {description} (path: {path})\n'
${snippetsText}

Output should be a valid json from abovesnippets.
return the most relevant snippet above to achieve: "${userText}":\n`;
