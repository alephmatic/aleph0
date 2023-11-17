import fs from "fs/promises";
import path from "path";
import consola from "consola";
import { TechnologySnippets, Technology, Snippet } from "./types";
import { readFile } from "./lib/file";

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/*
Finds all of the metadata.json files in the snippets directory returns json array
*/
export async function loadSnippets(
  technology: Technology
): Promise<TechnologySnippets> {
  const snippetsDir = path.join("./snippets", technology);
  const snippetDirs = await fs.readdir(snippetsDir, { withFileTypes: true });

  // Files directly under the technology are general snippets.
  const technologyGeneralSnippets: Snippet[] = snippetDirs
    .filter((fd) => fd.isFile())
    .map((fd) => ({
      name: capitalize(fd.name),
      file: fd.name,
      explanation: `Details about ${fd.name} files when using ${technology}.`,
    }));

  // Snippets are directories with a metadata.json file.
  const snippetsData = await Promise.all(
    snippetDirs
      .filter((dir) => dir.isDirectory())
      .map((dir) => path.join(snippetsDir, dir.name, "metadata.json"))
      .map((metadataPath) => readFile(metadataPath))
  );
  const technologySnippets: Snippet[] = snippetsData
    .map((metadata) => metadata.replace(/[\n]/g, "").replace(/\s\s/g, ""))
    .map((metadata) => JSON.parse(metadata));

  return {
    generalSnippets: technologyGeneralSnippets,
    snippets: technologySnippets,
  };
}

export async function getSnippetFile(snippetsDir: string, snippetFile: string) {
  const path = `./snippets/${snippetsDir}/${snippetFile}`;
  const fileContents = readFile(path);
  return fileContents;
}

export async function getSnippetFiles(snippetPath: string) {
  const snippetsDir = `./snippets/${snippetPath}`;
  const files = await fs.readdir(snippetsDir);
  const snippetFiles = await Promise.all(
    files
      .filter((file) => !file.endsWith(".json"))
      .map(async (file) => {
        const filePath = path.join(snippetsDir, file);
        return filePath;
      })
  );
  return snippetFiles;
}

async function getKnowledge(projectType: string) {
  const folderPath = `./knowledge/${projectType}`;
  const files = await fs.readdir(folderPath);
  const fileContents: { [key: string]: string } = {};

  for (const file of files) {
    const fileName = file;
    const filePath = `${folderPath}/${file}`;
    const content = readFile(filePath);
    fileContents[fileName] = content;
  }

  return fileContents;
}

/*
Find knowledge relevant to the files, that might help openai decide what and how to change files
*/
export async function getGeneralAndRoutesKnowledge(projectType: string) {
  const knowledge = await getKnowledge("nextjs13_4");
  const generalKnowledge = knowledge["general.txt"];
  const routesKnowledge = Object.keys(knowledge)
    .filter((k) => k != "general.txt")
    .map((k) => knowledge[k])
    .join("\n");

  return { knowledge, generalKnowledge, routesKnowledge };
}

/*
Returns something akin to:
 .gitignore
  package.json
  public/
    vercel.svg
    next.svg
  app/
    globals.css
    favicon.ico
  ...
*/
export async function getProjectStructure(
  projectRoot: string,
  indent = "  "
): Promise<string> {
  const contents = await fs.readdir(projectRoot, { withFileTypes: true });
  const structure = await Promise.all(
    contents.map(async (entry) => {
      const entryPath = path.join(projectRoot, entry.name);
      // TODO use .gitignore here?
      if (entry.name === "node_modules" || entry.name === ".next") {
        consola.log('Skipping "node_modules" or ".next" folder');
        return "";
      }
      if (entry.isDirectory()) {
        const subStructure = await getProjectStructure(
          entryPath,
          `${indent}  `
        );
        return `${indent}${entry.name}/\n${subStructure}`;
      } else {
        return `${indent}${entry.name}`;
      }
    })
  );
  return structure.filter(Boolean).join("\n");
}

export function removeCodeWrapper(code: string) {
  return code.replace(/^###$/gm, "");
}
