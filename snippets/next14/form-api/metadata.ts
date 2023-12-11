import { Metadata } from "../../types";

export const metadata: Metadata = {
  name: "Form API",
  description:
    "This snippet adds a form component and a page with the Next.js API route for submission.",
  path: "form-api",
  files: [
    {
      name: "Form component",
      file: "form.tsx",
      explanation:
        "The form component should be placed in the components directory as `components/form/_FORM_.tsx` file. Make sure to use only necessary inputs requested. Use the referencce file but don't blindly copy it 1:1 - it should cover what the user asked for. You must keep the 'use client' at the top of the file for it to work Next.js 14 app router.",
      references: ["component.tsx"],
    },
    {
      name: "Route file",
      file: "route.ts",
      explanation:
        "The `route.ts` file should be placed at `app/api/_FEATURE_/route.ts`. `route.ts` is a reserved file name. This can be imported as import '@/app/api/_FEATURE_/route.ts'.",
      references: ["route.ts"],
    },
    {
      name: "Validation util file",
      file: "validation.ts",
      explanation:
        "The `validation.ts` file should be placed at `app/api/_FEATURE_/validation.ts`. This can be imported as import '@/app/api/_FEATURE_/validation.ts'.",
      references: [],
    },
    {
      name: "Page file",
      file: "page.tsx",
      explanation:
        "The `page.tsx` file should be placed at `app/_PAGE_ROUTE_PATH_/page.ts`. Using the Form component you just created.",
      references: ["page.tsx"],
    },
  ],
};
