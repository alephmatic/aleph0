type File = {
  name: string;
  file: string;
  explanation: string;
  references: string[];
};

export type Metadata = {
  name: string;
  description: string;
  path: string;
  files: File[];
};
