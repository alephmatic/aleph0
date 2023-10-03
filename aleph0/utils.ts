import fs from "fs/promises";
import path from "path";

export async function loadSnippets() {
  const snippetsDir = "./snippets";
  const snippetDirs = await fs.readdir(snippetsDir, { withFileTypes: true });
  const metadataFiles = await Promise.all(
    snippetDirs
      .filter((dir) => dir.isDirectory())
      .map((dir) => path.join(snippetsDir, dir.name, "metadata.json"))
      .map((metadataPath) => fs.readFile(metadataPath, "utf-8"))
  );
  const metadataObjects = metadataFiles.map((metadata) => JSON.parse(metadata));
  const formattedMetadata = metadataObjects
    .map((metadata) => `${metadata.name} - ${metadata.description}`)
    .join("\n");
  return formattedMetadata;
}
