async function main() {
  const data = `export const text = "AI generated file.";`;
  await Bun.write("../examples/next/output.ts", data);
}

main();
