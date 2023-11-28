import fs from "fs";
import path from "path";
import { consola } from "consola";

export function readFile(filePath: string) {
  return fs.readFileSync(filePath, "utf-8");
}

// from: https://github.com/nicoalbanese/kirimase/blob/master/src/utils.ts

export function createFile(filePath: string, content: string) {
  const resolvedPath = path.resolve(filePath);
  const dirName = path.dirname(resolvedPath);

  // Check if the directory exists
  if (!fs.existsSync(dirName)) {
    // If not, create the directory and any nested directories that might be needed
    fs.mkdirSync(dirName, { recursive: true });
    // consola.success(`Directory ${dirName} created.`);
  }

  fs.writeFileSync(resolvedPath, content);
  consola.success(`File created at ${filePath}`);
}

export function replaceFile(filePath: string, content: string, log = true) {
  const resolvedPath = path.resolve(filePath);
  const dirName = path.dirname(resolvedPath);

  // Check if the directory exists
  if (!fs.existsSync(dirName)) {
    // If not, create the directory and any nested directories that might be needed
    fs.mkdirSync(dirName, { recursive: true });
    // consola.success(`Directory ${dirName} created.`);
  }

  fs.writeFileSync(resolvedPath, content);
  if (log === true) {
    consola.success(`File replaced at ${filePath}`);
  }
}

export function createFolder(relativePath: string, log = true) {
  const fullPath = path.join(process.cwd(), relativePath);
  fs.mkdirSync(fullPath, { recursive: true });
  if (log) {
    consola.success(`Folder created at ${fullPath}`);
  }
}
