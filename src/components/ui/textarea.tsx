import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[100px] w-full rounded-lg border-2 border-yellow-400/30 bg-white/10 backdrop-blur-sm px-4 py-3 text-base text-white shadow-sm placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:border-yellow-400 disabled:cursor-not-allowed disabled:opacity-50 hover:border-yellow-400/50 hover:bg-white/20 transition-all",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
