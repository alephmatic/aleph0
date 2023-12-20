# Aleph0

Aleph0 is an AI that generates code from natural language.

## Usage

```bash
export OPENAI_API_KEY=API_KEY
npx @alephmatic/aleph0 gen "add a form that creates a blog post"
```

Or with global install:

```bash
npm install -g @alephmatic/aleph0
export OPENAI_API_KEY=API_KEY
aleph0 gen "create a blog"
```

If you'd like to clone this repo locally and run it see `CONTRIBUTING.md` on how to use it.

## Snippets

### Overview

Snippets are key components in aleph0, providing valuable context to the AI. They offer insights into how various frameworks are used and demonstrate our coding conventions and patterns.

### Snippet Structure

- **Location**: Snippets are located in the `snippets` folder.
- **Types of Snippets**:
  - **General Technology Snippets**: These explain general aspects of a framework. For instance how `page.tsx` is a special file in Next.js.
  - **Metadata.ts**: This file contains details about the snippet, like its purpose, file paths, and references to framework-related files. It helps the AI understand the snippet's context.
  - **Code Examples**: Other files in the snippets directory typically contain raw code examples showing how to implement the snippet.

### Example Structure

Here's how snippets are organized:

```
snippets/
  next14/
    metadata.ts - Metadata for Next.js general tech snippets.
    route.ts - Example of a route in Next.js version 14 (general tech snippet).
    toaster/
      metadata.ts - Metadata for the toaster snippet.
      toaster.tsx - Example of a toaster in Next.js version 14.
```

## Conventions

- For placeholders use this format: `_PLACEHOLDER_HERE_`.

## Example metadata.ts

```ts
export const metadata: Metadata = {
  name: "Toaster",
  description:
    "A toast component example - A short message that is displayed temporarily.",
  // comment
  path: "toaster", // directory path for the snippet
  long: `multiline
  
multiline`,
  files: [
    {
      name: "Toaster Component",
      file: "toaster.tsx",
      explanation:
        "The toaster should be placed on the frontend in a `toasters/_TOASTER_NAME_.ts` file.",
      references: ["page.tsx"], // extra information related to the snippet like next.js's `page.tsx` conventions.
    },
  ],
};
```

## Contributing to Aleph0

### Getting Started

```bash
pnpm install
```

To run with `bun`:

```bash
export OPENAI_API_KEY=API_KEY
bun run src/index.ts gen "add a form that creates a blog post"
```

Alternatively use `tsx`:

```bash
npx tsx src/index.ts gen "add a form that creates a blog post"
```

If you want to test the exact build output with `tsup`:

```bash
pnpm run watch
# in another terminal:
pnpm run start
```

### Test cases

Some test cases to try out:

```bash
npx tsx src/index.ts gen "add a form that creates a blog post" -p ./examples/next
npx tsx src/index.ts gen "create a prisma schema file with a blog model" -p ./examples/next
```

### Debug

You can set `CONSOLA_LEVEL=4` to see debug logs and see what the AI is doing at each step:

```bash
CONSOLA_LEVEL=4 npx tsx src/index.ts gen "add a file named agam.ts in the app/ folder" -p ./examples/next -rd false
```
