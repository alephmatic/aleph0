import { z } from "zod";

export const snippetSchema = z.object({
  name: z.string(),
  description: z.string(),
  path: z.string(),
  knowledgeMapping: z.record(z.string(), z.string()),
});
export type Snippet = z.infer<typeof snippetSchema>;
