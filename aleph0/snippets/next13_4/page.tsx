A page is UI that is unique to a route. You can define pages by exporting a component from a page.tsx file. Use nested folders to define a route and a page.js file to make the route publicly accessible.

Examples:
app/page.tsx

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  return <h1>Hello, Home page!</h1>
}
---
app/dashboard/page.tsx

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
  return <h1>Hello, Dashboard Page!</h1>
}

Good to know:
  A page is always the leaf of the route subtree.
  .js, .jsx, or .tsx file extensions can be used for Pages.
  A page.tsx file is required to make a route segment publicly accessible.

Rules:
Make sure that every API route in your code correlates directly to where route.ts will be placed.
Place page files only under app/ NOT under app/components/
Make sure when you create a page file that the file name is "page.tsx/jsx" it's a next.js convention.