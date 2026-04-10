import { type ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const blockVariants = cva("", {
  variants: {
    variant: {
      default: "",
      secondary: "dark:bg-neutral-900 bg-neutral-50",
      "secondary-2": "dark:bg-neutral-700 bg-neutral-200",
      "secondary-3": "dark:bg-neutral-800 bg-neutral-50",
    },
    defaultVariants: {
      variant: "default",
    },
  },
})

export function Block({
  children,
  className,
  variant,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof blockVariants>) {
  return (
    <div {...props} className={cn(blockVariants({ variant, className }))}>
      {children}
    </div>
  )
}
