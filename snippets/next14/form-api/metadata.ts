import { Metadata } from "../../types";

export const metadata: Metadata = {
  name: "Form API",
  description: "This snippet adds a form with the Next.js API route for submission.",
  path: "form-api",
  files: [
    {
      name: "Form component",
      file: "form.tsx",
      explanation: "The form component should be placed in the components directory as `components/form/<FORM>.ts` file.",
      references: ["component.tsx"]
    },
    {
      name: "Route file",
      file: "route.ts",
      explanation: "The `route.ts` file should be placed at `app/api/<FEATURE>/route.ts`. This can be imported as import '@/app/api/<FEATURE>/route.ts'.",
      references: ["route.ts"]
    },
    {
      name: "Validation util file",
      file: "validation.ts",
      explanation: "The `validation.ts` file should be placed at `app/api/<FEATURE>/validation.ts`. This can be imported as import '@/app/api/<FEATURE>/validation.ts'.",
      references: []
    }
  ]
};