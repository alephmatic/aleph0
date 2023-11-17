// import { RunnableFunctionWithParse } from "openai/lib/RunnableFunction";
import { z } from "zod";
import { loadSnippets } from "./utils";
import { createFile, readFile } from "./lib/file";
import { Technology, TechnologySnippets } from "./types";

// export const createActions = (): Record<
//   string,
//   RunnableFunctionWithParse<any>
// > => {
export const createActions = () => {
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
        "Returns the snippets for a given technology ('next13_4'...).",
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
      function: async (args: {
        snippetName: string;
        snippets: TechnologySnippets;
      }) => {
        return { snippet: readFile(args.snippetName) }; // TODO: fix
      },
      name: "readSnippet",
      description: "Returns the textual context of a snippet.",
      parse: (args: string) => true,
      parameters: {},
    },
    readGeneralSnippet: {
      function: async (args: {
        snippetName: string;
        snippets: TechnologySnippets;
      }) => {
        return { snippet: readFile(args.snippetName) }; // TODO: fix
      },
      name: "readSnippet",
      description: "Returns the textual context of a snippet.",
      parse: (args: string) => true,
      parameters: {},
    },
    createFile: {
      function: async (args: { filename: string }) => {
        return { snippet: createFile(args.filename, "") };
      },
      name: "createFile",
      description: "Create a new file.",
      parse: (args: string) => {
        return z
          .object({
            filename: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          filename: {
            type: "string",
          },
        },
      },
    },
    updateFile: {
      // TODO: Update an existing file using text
    },
    generateUsingSnippet: {
      // TODO: Generate a file using a snippet (& general snippets?)
    },
  };
};
