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

## Snippets

Snippets are an essential part of aleph0. Snippets are pieces of data that add details for the ai.
Helping the ai understand how frameworks work and our code conventions and patterns should be implemented.

### Snippet structure

All technology snippets are stored in the `snippets` folder.

- "General technology snippets" - are general snippets that explain part of a framework, like how `page.tsx` means something special in next.js.
- `metadata.ts` - a file that we parse to understant the snippet, like an explanation of what it does, paths for files and references for framework related files that are related to the snippet (a form API might need a `route.ts` file included so we need to understand the general snippet of routes so we reference them).
- Any other file under snippets is usually a raw code example on how to implement the snippet.

Example

```
snippets/
  next14/
    metadata.ts - metadata for the nextjs general tech snippets (like route.ts)
    route.ts - a code example of a route in next version 14.
    toaster/ -- a toast snippet for next version 14.
      metadata.ts - holds metadata for the snippet.
      toaster.tsx - an example of a toaster in next version 14 using our conventions.
```
