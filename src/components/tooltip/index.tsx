import React, { type ComponentProps } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useIsOverflow } from "@/hooks/use-is-overflow"

export default function Text({
  children,
  className,
  tooltip,
  isClipped = false,
  as = "span",
  lines = 1,
}: {
  children: React.ReactNode
  className?: string
  isClipped?: boolean
  as?: keyof HTMLElementTagNameMap
  tooltip?: Partial<
    Pick<ComponentProps<typeof TooltipContent>, "side" | "className">
  >
  lines?: number
}) {
  const [ref, isOverflowing] = useIsOverflow({ enabled: isClipped })

  const shouldShowTooltip = isClipped && isOverflowing

  const TextComponent = as as React.ElementType

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <TextComponent
            ref={ref}
            className={cn(
              isClipped && [
                "overflow-hidden",
                lines === 1
                  ? ["block", "whitespace-nowrap", "text-ellipsis", "truncate"]
                  : `line-clamp-${lines}`,
              ],
              className
            )}
          >
            {children}
          </TextComponent>
        </TooltipTrigger>

        {shouldShowTooltip && (
          <TooltipContent
            side={tooltip?.side || "top"}
            className={cn("max-w-[340px] break-words", tooltip?.className)}
          >
            {children}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}
