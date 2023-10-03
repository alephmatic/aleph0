import fs from "node:fs";
import { Command } from "commander";
import { getProjectStructure, loadSnippets } from "./utils";
import { findRelevantSnippets } from "./prompts";
import { ai } from "./openai";

async function generate(text: string) {
  const snippets = await loadSnippets();
  // console.log(snippets);
  // console.log(await getProjectStructure("../examples/next"));

  console.log("Creating:", text);

  // 1. Find the relevant snippet
  const relevantSnippet = await ai(findRelevantSnippets(text, snippets));
  console.log("Relevant snippet:", relevantSnippet);
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
