import { z } from "zod";

// https://stackoverflow.com/a/53276873/2602771
export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

// type guard for filters that removed undefined and null values
export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

const snippetSchema = z.object({
  name: z.string(),
  file: z.string(),
  explanation: z.string(),
  knowledgeFiles: z.array(z.string()),
});
type Snippet = z.infer<typeof snippetSchema>;

export const snippetMetadataSchema = z.object({
  name: z.string(),
  description: z.string(),
  snippets: z.array(snippetSchema),
  path: z.string(),
});
export type SnippetMetadata = z.infer<typeof snippetMetadataSchema>;

const changeFileSchema = z.object({
  snippetName: z.string(),
  filePath: z.string(),
});
type ChangeFileSchema = z.infer<typeof changeFileSchema>;

export const changeFilesSchema = z.array(changeFileSchema);
export type ChangeFilesSchemaWithSnippet = (ChangeFileSchema & {
  snippet: Snippet;
})[];
