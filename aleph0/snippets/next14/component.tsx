A component is UI that is reusale. You can define components by exporting a component from a component.tsx file. 

Path:
[next-project-path]/ 
  app/
  components/ <--  place new components here.

File Path Examples:
app/components/ui/Label.tsx

Component file content example snippet:
```tsx
// `app/components.tsx` is the UI for the `/` URL
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
```

Rules:
.jsx, or .tsx file extensions can be used for Components.
A component is always the leaf of the route subtree.
Use the existing next-project/components directory as it most likely exists.
Create a new folder for new components under `components/` directory (not under `components/ui` though).
