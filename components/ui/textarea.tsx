import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm",
  "ring-offset-background focus:outline-none",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "text-foreground",
  "placeholder:text-muted-foreground",
  className
)}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea"

export { Textarea }