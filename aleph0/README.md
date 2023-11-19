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
```

## Debug

```bash
CONSOLA_LEVEL=4 bun run src/index.ts gen "add a file named agam.ts in the app/ folder" -p ../../examples/next -srd
```
