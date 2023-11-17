// import { RunnableFunctionWithParse } from "openai/lib/RunnableFunction";
import { string, z } from "zod";
import { loadSnippets } from "./utils";
import { createFile, createFolder, readFile } from "./lib/file";
import { Technology, TechnologySnippets } from "./types";
import { RunnableFunctionWithParse } from "openai/lib/RunnableFunction";

// export const createActions = (): Record<
//   string,
//   RunnableFunctionWithParse<any>
// > => {
export const createActions = (): Record<
  string,
  RunnableFunctionWithParse<any>
> => {
  return {
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
    getSnippets: {
      function: async (args: { technology: Technology }) => {
        return { snippets: await loadSnippets(args.technology) };
      },
      name: "getSnippets",
      description:
        "Returns the snippets for a given technology ('next13_4'...) which helps creating files with context.",
      parse: (args: string) => {
        return z
          .object({
            technology: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          technology: {
            type: "string",
          },
        },
      },
    },
    readSnippet: {
      function: async (args: { snippetName: string }) => {
        return { snippet: readFile(args.snippetName) }; // TODO: fix path
      },
      name: "readSnippet",
      description: "Returns the content of a snippet.",
      parse: (args: string) => {
        return z.object({ snippetName: z.string() }).parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          snippetName: {
            type: "string",
          },
        },
      },
    },
    readGeneralSnippet: {
      function: async (args: { snippetName: string }) => {
        return { snippet: readFile(args.snippetName) }; // TODO: fix path
      },
      name: "readSnippet",
      description: "Returns the general technology content of a snippet.",
      parse: (args: string) => {
        return z.object({ snippetName: z.string() }).parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          snippetName: {
            type: "string",
          },
        },
      },
    },
    createFile: {
      function: async (args: { filename: string; content: string }) => {
        await createFile(args.filename, args.content);
        return true;
      },
      name: "createFile",
      description: "write a new file with specified content (never empty).",
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
        await createFolder(args.directoryPath);
        return true;
      },
      name: "createDirectory",
      description:
        "Create a new directory from the relative current working directory.",
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
    // generateUsingSnippet: {
    //   // TODO: Generate a file using a snippet (& general snippets?)
    // },
  };
};
