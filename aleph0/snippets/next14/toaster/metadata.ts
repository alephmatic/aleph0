import { Metadata } from "../../types";

export const metadata: Metadata = {
  name: "Toaster",
  description:
    "A toast component example - A short message that is displayed temporarily.",
  path: "toaster",
  files: [
    {
      name: "Toaster Component",
      file: "toaster.tsx",
      explanation:
        "The toaster should be placed on the frontend in a `toasters/<TOASTER>.ts` file.",
      references: ["page.tsx"],
    },
  ],
};
