import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border-2 border-yellow-400/30 bg-white/10 backdrop-blur-sm px-4 py-2 text-base text-white transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:border-yellow-400 disabled:cursor-not-allowed disabled:opacity-50 hover:border-yellow-400/50 hover:bg-white/20",
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
