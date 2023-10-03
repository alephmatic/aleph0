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

// export const FUNCTION_CALLS = {
//   readSnippet: function (snippetPath: string) {
//     console.log("Reading", snippetPath);
//   },
// };
