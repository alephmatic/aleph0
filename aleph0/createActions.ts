import { RunnableFunctionWithParse } from "openai/lib/RunnableFunction";
import { z } from "zod";
import { loadSnippets } from "./utils";
import { readFile } from "fs";
import { TechnologySnippets } from "./types";

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
    listSnippets: {
      function: async(args: {technology: string}) => {
        return { snippets: await loadSnippets(args.technology) };
      },
      name: "listSnippets",
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
    }
    readSnippet: {
      function: async(args: {snippetName: string, snippets: TechnologySnippets}) => {
        return { snippet: await readFile(args.snippetName) };
      },
      name: "readSnippet",
      description: "Returns the textual context of a snippet.",
      parse: (args: string) => true,
      parameters: { },
    }
    readSnippet: {
      function: async (args: { snippetName: string }) => {
        return { snippetData: await readFile(args.elementId).innerHTML() };
      },
      name: "readSnippet",
      description: "Returns the element.innerHTML.",
      parse: (args: string) => {
        return z
          .object({
            elementId: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          elementId: {
            type: "string",
          },
        },
      },
    },
    writeNewFile: {

    },
    updateExistingFile: {

    }
  };
};
