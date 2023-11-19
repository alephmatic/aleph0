# aleph0

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts
```

## Test cases

```bash
CONSOLA_LEVEL=4 bun src/index.ts gen "add a form that creates a blog post" -p ../../examples/next
CONSOLA_LEVEL=4 bun src/index.ts gen "create a prisma schema file with a blog model" -p ../../examples/next
```

## Debug

```bash
CONSOLA_LEVEL=4 bun run src/index.ts gen "add a file named agam.ts in the app/ folder" -p ../../examples/next -rd false
```

## Snippets in aleph0

### Overview

Snippets are key components in aleph0, providing valuable context to the AI. They offer insights into how various frameworks are used and demonstrate our coding conventions and patterns.

### Snippet Structure

- **Location**: Snippets are located in the `snippets` folder.
- **Types of Snippets**:
  - **General Technology Snippets**: These explain aspects of a framework. For instance, `page.tsx` in Next.js.
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
