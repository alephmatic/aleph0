import { z } from "zod";

// https://stackoverflow.com/a/53276873/2602771
export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

// type guard for filters that removed undefined and null values
export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

export const zodTechnology = z.enum(["next14"]); // may include Nuxt or other platforms in the future
export type Technology = z.infer<typeof zodTechnology>;

const snippetFileSchema = z.object({
  name: z.string(),
  file: z.string(),
  explanation: z.string(),
  references: z.array(z.string()).optional(),
});
export type SnippetFile = z.infer<typeof snippetFileSchema>;

export const snippetSchema = z.object({
  name: z.string(),
  description: z.string(),
  files: z.array(snippetFileSchema).optional(), // TODO: this is for general snippets to work - maybe create a new type for them?
  path: z.string(),
});
export type Snippet = z.infer<typeof snippetSchema>;

const technologySnippetsSchema = z.object({
  generalSnippets: z.array(snippetSchema),
  snippets: z.array(snippetSchema),
});
export type TechnologySnippets = z.infer<typeof technologySnippetsSchema>;

export type FunctionCallingResult = {
  assertion?: boolean;
  query?: string;
  errorMessage?: string;
};
