export const createTaskDescriptionPrompt = (options: {
  userPrompt: string;
}) => {
  const { userPrompt } = options;

  return `You are an expert full-stack developer.
Create a more complete description of this task to pass on to an AI agent.
The description should be kept to 1-2 lines if possible. Make sure to not deviate from the user's task:
${userPrompt}
  
Assume that the project structure exists already and you are adding files to it or modifying files.
Task description:`;
};

export const functionCallPrompt = (options: {
  userPrompt: string;
  projectDir: string;
}) => {
  const { userPrompt, projectDir } = options;

  return `This is your task: ${userPrompt}
  
  * Make sure you use the relevant snippets only for the task. Use the snippets metadata to understand what each snippet does.
  * Assume that the basic strucure of the project has already been created.
  * When writing or reading files, use the relative paths.
  * Only write or read files from this project directory: ${projectDir}
  * Current working directory: ${process.cwd()}
  * You must not derive data from thin air if you are able to do so by using one of the provided functions, e.g. readSnippet.
  * If a snippet contains a reference, read that reference file and use it together with the snippet file.
  * Make sure you use all files in a snippet and create all corresponding files in the project.`;
};
