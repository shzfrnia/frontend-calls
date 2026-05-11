import React, { type ComponentProps, useState, useEffect } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useResize } from "@/hooks/use-overflow-options"

export default function Text({
  children,
  className = "",
  tooltip,
  isCliped = false,
  as = "span",
  mode = 2,
  lines = 1,
}: {
  children: React.ReactNode
  className?: string
  isCliped?: boolean
  as?: keyof HTMLElementTagNameMap
  tooltip?: Partial<
    Pick<ComponentProps<typeof TooltipContent>, "side" | "className">
  >
  mode?: 1 | 2
  lines?: number
}) {
  const [isOverflowing, setIsOverflowing] = useState(false)

  const ref = useResize(
    () => {
      const el = ref.current
      if (!el) return

      const overflowing =
        el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight

      setIsOverflowing(overflowing)
    },
    { mode }
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const overflowing =
      el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight

    setIsOverflowing(overflowing)
  }, [ref])

  const shouldShowTooltip = isCliped && isOverflowing

  const TextComponent = as as React.ElementType

  const content = (
    <TextComponent
      ref={ref}
      className={cn(
        isCliped && [
          "overflow-hidden",
          lines === 1 && [
            "block",
            "whitespace-nowrap",
            "text-ellipsis",
            "truncate",
          ],
          lines > 1 && `line-clamp-${lines}`,
        ],
        className
      )}
    >
      {children}
    </TextComponent>
  )

  if (!shouldShowTooltip) {
    return content
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent
          side={tooltip?.side || "top"}
          className={cn("max-w-[340px] break-words", tooltip?.className)}
        >
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
