// import { RunnableFunctionWithParse } from "openai/lib/RunnableFunction";
import { z } from "zod";
import { loadSnippets } from "./utils";
import { readFile } from "fs";
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
      description: "Returns the snippets for a given technology (next13...).",
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
        return { snippet: await readFile(args.snippets) }; // TODO: fix
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
        return { snippet: await readFile(args.snippets.generalSnippets) }; // TODO: fix
      },
      name: "readSnippet",
      description: "Returns the textual context of a snippet.",
      parse: (args: string) => true,
      parameters: {},
    },
    createFile: {
      // Write a new file using text
    },
    updateFile: {
      // TODO: Update an existing file using text
    },
    generateUsingSnippet: {
      // TODO: Generate a file using a snippet (& general snippets?)
    },
  };
};
