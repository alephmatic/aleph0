import { Metadata } from "../types";

export const metadata: Metadata = {
  name: "Next.js 14, zod & shadcn snippets",
  description: `Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.
    Project Sturcutre
    Top-level folders
      app/	App Router
      components/ Reusable react components that you can use inside the app directory.
      pages/	Pages Router (compatability for next js 12)
      public/	Static assets to be served
      src/	Optional application source folder

    app Routing Conventions
      Routing Files
      layout	.js .jsx .tsx	Layout
      page	.js .jsx .tsx	Page
      loading	.js .jsx .tsx	Loading UI
      not-found	.js .jsx .tsx	Not found UI
      error	.js .jsx .tsx	Error UI
      global-error	.js .jsx .tsx	Global error UI
      route	.js .ts	API endpoint
      template	.js .jsx .tsx	Re-rendered layout
      default	.js .jsx .tsx	Parallel route fallback page

    Creating Routes
      Next.js uses a file-system based router where folders are used to define routes.
      Each folder represents a route segment that maps to a URL segment. To create a nested route, you can nest folders inside each other.
      A Dynamic Segment can be created by wrapping a folder's name in square brackets: [folderName]. For example, [id] or [slug].

    Notes
      DO NOT update files in this path (components/ui/...), only create new ones.
      components/
        ui/
          form.tsx
          label.tsx
          toaster.tsx
          use-toast.ts
          input.tsx
          select.tsx
          button.tsx
          table.tsx
          toast.tsx`,
  path: "form-api",
  files: [
    {
      name: "Generic Component",
      file: "component.tsx",
      explanation: `A component is UI that is reusale. You can define components by exporting a component from a component.tsx file. 

        Path:
        [next-project-path]/ 
          app/
          components/ <--  place new components here.
        
        File Path Examples:
        app/components/ui/Label.tsx.
                
        Rules:
        .jsx, or .tsx file extensions can be used for Components.
        A component is always the leaf of the route subtree.
        Use the existing next-project/components directory as it most likely exists.
        Create a new folder for new components under \`components/\` directory (not under \`components/ui\` though).`,
      references: [],
    },
    {
      name: "Page file",
      file: "page.tsx",
      explanation: `A page is UI that is unique to a route. You can define pages by exporting a component from a page.tsx file. Use nested folders to define a route and a page.js file to make the route publicly accessible.

      Examples:
      app/page.tsx
      
      \`app/page.tsx\` is the UI for the \`/\` URL
      \`app/dashboard/page.tsx\` is the UI for the \`/dashboard\` URL

      Good to know:
      A page is always the leaf of the route subtree.
      .jsx, or .tsx file extensions can be used for Pages.
      A page.tsx file is required to make a route segment publicly accessible.

      Rules:
      Make sure that every API route in your code correlates directly to where route.ts will be placed.
      Place page files only under app/ NOT under app/components/
      Make sure when you create a page file that the file name is "page.tsx/jsx" it's a next.js convention.
`,
      references: [],
    },
    {
      name: "Route file",
      file: "route.ts",
      explanation: `Route Handlers allow you to create custom request handlers for a given route using the Web Request
      and Response
      APIs.
      
      A route file allows you to create custom request handlers for a given route. The following HTTP methods
      are supported: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS.
      
      // If \`OPTIONS\` is not defined, Next.js will automatically implement \`OPTIONS\` and  set the appropriate Response \`Allow\` header depending on the other methods defined in the route handler.
      export async function OPTIONS(request: Request) {}
      ###

      File path structure:
      Example	URL	params
      app/dashboard/[team]/route.ts	/dashboard/1	{ team: '1' }
      app/shop/[tag]/[item]/route.ts	/shop/1/2	{ tag: '1', item: '2' }
      app/blog/[...slug]/route.ts	/blog/1/2	{ slug: ['1', '2'] }

      RULES:
      Make sure to implement all \`TODO\` comments.
      Make sure when you create a route that the file name is "route.ts" it's a next.js convention.`,
      references: [],
    },
  ],
};
