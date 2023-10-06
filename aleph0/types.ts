import { z } from "zod";

export const snippetSchema = z.object({
  name: z.string(),
  description: z.string(),
  path: z.string(),
  knowledgeMapping: z.record(z.string(), z.string()),
});
export type Snippet = z.infer<typeof snippetSchema>;

export const changesSchema = z.array(
  z.object({
    snippetPath: z.string(),
    sourcePath: z.string(),
  })
);
export type ChangesSchema = z.infer<typeof changesSchema>;
