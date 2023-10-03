import { Command } from "commander";
import { getProjectStructure, loadSnippets } from "./utils";
import { createChangesArray, findRelevantSnippets } from "./prompts";
import { ai } from "./openai";

async function generate(text: string) {
  console.log("Creating:", text);

  // 1. Find the relevant snippet
  const snippets = await loadSnippets();
  const relevantSnippet = await ai(findRelevantSnippets(text, snippets));
  if (!relevantSnippet)
    throw new Error(`AI returned a bad snippet: ${relevantSnippet}`);

  console.log("Found snippet:", relevantSnippet);

  // 2. Find the relevant files we are dealing with
  // For each snippet file, find the corresponding file to be created/modified
  // const changes = [{snippet: 'path', sourceFile: 'path'}]
  const projectSturcutre = await getProjectStructure("../examples/next");
  const changesRaw = await ai(
    await createChangesArray(relevantSnippet, projectSturcutre),
    "Find what files are relevant for theseS snippets in this project.",
    "gpt-4"
  );
  if (!changesRaw)
    throw new Error(`AI returned a bad changes array: ${relevantSnippet}`);

  const changes = JSON.parse(changesRaw);
  console.log(changes);

  // 3. For each file in the changes array, ask GPT 4 for the new file and create/modify it.
  // for(const change of changes) {
  //   if(change.create)
  //   fs.mkdirSync(<the path to create>, { recursive: true });
  // }
}

const program = new Command();
program
  .command("gen <text>")
  .description("Generate nextjs snippet.")
  .action((text) => {
    generate(text);
  });
program.parse(process.argv);

// example to create an "article" component with an api route
// in the future the AI will write the file contents

//   console.log(`Adding form with API route...`);

//   // route
//   const routeFile = Bun.file("./snippets/form-api/route.ts.txt");
//   const routeContents = await routeFile.text();
//   if (!fs.existsSync("../examples/next/app/api/article"))
//     fs.mkdirSync("../examples/next/app/api/article", { recursive: true });
//   await Bun.write("../examples/next/app/api/article/route.ts", routeContents);

//   // form
//   const formFile = Bun.file("./snippets/form-api/form.tsx.txt");
//   const formContents = await formFile.text();
//   if (!fs.existsSync("../examples/next/app"))
//     fs.mkdirSync("../examples/next/app", { recursive: true });
//   await Bun.write("../examples/next/app/ArticleForm.tsx", formContents);

//   // toaster - replace file example
//   const existLayoutFile = Bun.file("../examples/next/app/layout.tsx");
//   const existingLayoutContents = await existLayoutFile.text();

//   const layoutFile = Bun.file("./snippets/toaster/toaster.tsx.txt");
//   const layoutContents = await layoutFile.text();

//   const updatedLayoutContents = existingLayoutContents
//     .replace(
//       "<body className={inter.className}>{children}</body>",
//       layoutContents
//     )
//     .replace(
//       `import { Inter } from 'next/font/google'`,
//       `import { Inter } from 'next/font/google'
// import { Toaster } from '@/components/ui/toaster'`
//     );

//   await Bun.write("../examples/next/app/layout.tsx", updatedLayoutContents);

//   console.log(`✅ Added form with API route`);
