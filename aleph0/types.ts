export interface Snippet {
  name: string;
  description: string;
  path: string;
  knowledgeMapping: {
    [key: string]: string;
  };
}
