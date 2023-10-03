import fs from "fs/promises";
import path from "path";

/*
Finds all of the metadata.json files in the snippets directory returns json array
*/
export async function loadSnippets() {
  const snippetsDir = "./snippets";
  const snippetDirs = await fs.readdir(snippetsDir, { withFileTypes: true });
  const metadataFiles = await Promise.all(
    snippetDirs
      .filter((dir) => dir.isDirectory())
      .map((dir) => path.join(snippetsDir, dir.name, "metadata.json"))
      .map((metadataPath) => fs.readFile(metadataPath, "utf-8"))
  );
  const metadataObjects = metadataFiles
    .map((metadata) => metadata.replace(/[\n]/g, "").replace(/\s\s/g, ""))
    .join("\n");
  return metadataObjects;
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

export async function getKnowledge(projectType: string) {
  const folderPath = `./knowledge/${projectType}`;
  const files = await fs.readdir(folderPath);
  const fileContents = {};

  for (const file of files) {
    const fileName = file;
    const filePath = `${folderPath}/${file}`;
    const content = await fs.readFile(filePath, "utf-8");
    fileContents[fileName] = content;
  }

  return fileContents;
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
  return structure.join("\n");
}
