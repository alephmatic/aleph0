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

export const functionCallPrompt = (options: { userPrompt: string }) => {
  const { userPrompt } = options;

  return `This is your task: ${userPrompt}
  
  * Make sure you use the relevant snippets only for the task. Use the snippets metadata to understand what each snippet does.
  * Assume that the basic strucure of the project has already been created.
  * When writing or reading files, use the relative paths (cwd: ${process.cwd()}).
  * You must not derive data from thin air if you are able to do so by using one of the provided functions, e.g. readSnippet.
  * If a snippet contains a reference, read that reference file and use it together with the snippet file.
  * Make sure you use all files in a snippet and create all corresponding files in the project.
  * Before creating files/folders, check if they already exist.
  * Try to use named imports instead of default imports.
  * If you are creating a component for another component, seperate the files.
  * Every place you see '_PLACEHOLDER_HERE_' (wrapped in '_' and snake_case with capital letters) should be replaced with the correct value.
    * Otherwise use common sense to change names / omit / include code segments to adhere to the user's task. `;
};
