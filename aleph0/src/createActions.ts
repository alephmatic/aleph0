import { z } from "zod";
import { loadSnippets } from "./lib/utils";
import { createFile, createFolder, readFile, readMetadata } from "./lib/file";
import { Technology, zodTechnology } from "./types";
import { RunnableFunctionWithParse } from "openai/lib/RunnableFunction.mjs";

export const createActions = (
  technology: Technology,
  projectRoot: string
): Record<string, RunnableFunctionWithParse<any>> => {
  return {
    getSnippets: {
      function: async (_args: {}) => {
        const snippets = await loadSnippets(technology);
        return { snippets };
      },
      name: "getSnippets",
      description:
        "Returns the snippets for a given technology which helps create files with context.",
      parse: (args: string) => {
        return z.object({}).parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {},
      },
    },
    readSnippetMetadata: {
      function: async (args: { filePath: string }) => {
        return { fileContents: await readMetadata(args.filePath) };
      },
      name: "readSnippetMetadata",
      description: "Returns the contents of a snippet metadata file as JSON.",
      parse: (args: string) => {
        return z.object({ filePath: z.string() }).parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          filePath: {
            type: "string",
          },
        },
      },
    },
    readSnippetReference: {
      function: async (args: { filePath: string }) => {
        return { fileContents: readFile(args.filePath) };
      },
      name: "readSnippetFile",
      description: "Returns the contents of a snippet file.",
      parse: (args: string) => {
        return z.object({ filePath: z.string() }).parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          filePath: {
            type: "string",
          },
        },
      },
    },
    createFile: {
      function: async (args: { filename: string; content: string }) => {
        createFile(`${projectRoot}/${args.filename}`, args.content);
        return { success: true };
      },
      name: "createFile",
      description:
        "Write a new file relative to the project root with specified content (never empty).",
      parse: (args: string) => {
        return z
          .object({
            filename: z.string(),
            content: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          filename: {
            type: "string",
          },
          content: {
            type: "string",
          },
        },
      },
    },
    createDirectory: {
      function: async (args: { directoryPath: string }) => {
        createFolder(`${projectRoot}/${args.directoryPath}`);
        return { success: true };
      },
      name: "createDirectory",
      description: "Create a new directory relative to the project root.",
      parse: (args: string) => {
        return z
          .object({
            directoryPath: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          directoryPath: {
            type: "string",
          },
        },
      },
    },
    // updateFile: {
    //   // TODO: Update an existing file using text
    // },
    // TODO: Other functions we might need:
    // readExistingProjectFile, getExistingProjectStrcuture, checkPotentialBugsInFiles, searchForBugSolutionOnline
    //
    // We might want to add this:
    // createTaskDescription: {
    //   function : async (args: { userPrompt: string }) => {
    //     return {
    //       taskDescription: await createTaskDescriptionPrompt(args.userPrompt), //TODO: need to call open AI here
    //     };
    //   },
    //   name: "createTaskDescription",
    //   description: "Returns a more complete task description before applying actions.",
    //   parse: (args: string) => {
    //     return z
    //       .object({
    //         userPrompt: z.string(),
    //       })
    //       .parse(JSON.parse(args));
    //   },
    //   parameters: {
    //     type: "object",
    //     properties: {
    //       userPrompt: {
    //         type: "string",
    //       },
    //     },
    //   },
    // },
  };
};
