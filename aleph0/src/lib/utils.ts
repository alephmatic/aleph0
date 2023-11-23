import fs from "fs/promises";
import path from "path";
import consola from "consola";
import { Technology, Snippet, SnippetFile } from "../types";
import { readMetadata } from "./file";

export async function loadSnippets(technology: Technology) {
  const snippetsDir = path.join("./snippets", technology);
  const snippetDirs = await fs.readdir(snippetsDir, { withFileTypes: true });

  // Snippets are directories with a metadata.json file.
  const snippetsData = await Promise.all(
    snippetDirs
      .filter((dir) => dir.isDirectory())
      .map((dir) => path.join(snippetsDir, dir.name, "metadata.ts"))
      .map(async (metadataPath) => await readMetadata(metadataPath))
  );
  const technologySnippets: Snippet[] = snippetsData
    .map((metadata) => metadata.replace(/[\n]/g, "").replace(/\s\s/g, ""))
    .map((metadata) => JSON.parse(metadata))
    .map((metadata) => ({
      ...metadata,
      path: path.join("./snippets", technology, metadata.path) + "/",
      files: metadata.files.map((file: SnippetFile) => ({
        ...file,
        file: path.join("./snippets", technology, metadata.path, file.file),
        references: file.references?.map((reference: string) =>
          path.join("./snippets", technology, reference)
        ),
      })),
    }));

  return {
    snippets: technologySnippets,
  };
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
