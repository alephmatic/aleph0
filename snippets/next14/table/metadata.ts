import { Metadata } from "../../types";

export const metadata: Metadata = {
  name: "Table component",
  description: "A table that loads data from the API.",
  path: "table",
  files: [
    {
      name: "Table component",
      file: "table.tsx",
      explanation:
        "The table should be placed on the frontend in a `tables/<TABLE>.ts` file.",
      references: ["page.tsx"],
    },
  ],
};
