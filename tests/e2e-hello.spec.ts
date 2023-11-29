import { existsSync, mkdirSync, copySync } from "fs-extra";
import { join } from "path";
import { GenerateOptions, generate } from "../src/generate";

// End-to-end test function
async function testCLI() {
  // Step 1: Create a temp directory
  const tempDir = join(__dirname, "temp");
  if (!existsSync(tempDir)) {
    mkdirSync(tempDir);

    const examplesDir = join(__dirname, "../examples/next/");
    copySync(examplesDir, tempDir);
  }

  const options: GenerateOptions = {
    projectDir: tempDir,
    regenerateDescription: true,
    technology: "next14",
    model: "gpt-4-1106-preview",
  };

  generate("create an api at /api/hello that returns 'Hello aleph0'", options);
  generate(
    "create a page at /hello with a button that calls the api at /api/hello and displays it",
    options
  );
}

// Execute the test
testCLI();
