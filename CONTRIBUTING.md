# aleph0

To install dependencies:

```bash
pnpm install
```

To run:

```bash
pnpm run src/index.ts
```

## Test cases

```bash
CONSOLA_LEVEL=4 pnpm src/index.ts gen "add a form that creates a blog post" -p ../examples/next
CONSOLA_LEVEL=4 pnpm src/index.ts gen "create a prisma schema file with a blog model" -p ../examples/next
```

## Debug

```bash
CONSOLA_LEVEL=4 pnpm run src/index.ts gen "add a file named agam.ts in the app/ folder" -p ../examples/next -rd false
```
