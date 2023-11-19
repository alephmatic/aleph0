import { z } from "zod";
import { loadSnippets } from "./lib/utils";
import { createFile, createFolder, readFile } from "./lib/file";
import { Technology, technologies, zodTechnology } from "./types";
import { RunnableFunctionWithParse } from "openai/lib/RunnableFunction.mjs";

export const createActions = (): Record<
  string,
  RunnableFunctionWithParse<any>
> => {
  return {
    getSnippets: {
      // TODO: maybe we should allow passing an array of technologies?
      function: async (args: { technology: Technology }) => {
        return { snippets: await loadSnippets(args.technology) };
      },
      name: "getSnippets",
      description:
        "Returns the snippets for a given technology which helps create files with context.",
      parse: (args: string) => {
        return z.object({ technology: zodTechnology }).parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          technology: {
            type: "string",
            enum: [...technologies],
          },
        },
      },
    },
    readFile: {
      function: async (args: { filePath: string }) => {
        return { fileContents: readFile(args.filePath) };
      },
      name: "readFile",
      description: "Returns the contents of a file.",
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
        createFile(args.filename, args.content);
        return `file ${args.filename} created.`;
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
        createFolder(args.directoryPath);
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