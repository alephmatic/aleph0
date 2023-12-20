# Contributing to Aleph0

## Getting Started

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

## Test cases

Some test cases to try out:

```bash
npx tsx src/index.ts gen "add a form that creates a blog post" -p ./examples/next
npx tsx src/index.ts gen "create a prisma schema file with a blog model" -p ./examples/next
```

## Debug

You can set `CONSOLA_LEVEL=4` to see debug logs and see what the AI is doing at each step:

```bash
CONSOLA_LEVEL=4 npx tsx src/index.ts gen "add a file named agam.ts in the app/ folder" -p ./examples/next -rd false
```
