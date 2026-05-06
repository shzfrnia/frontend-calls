import { type ComponentProps } from "react"

import { useIsOverflow } from "@/hooks/use-is-overflow"

import { Button as UIButton } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { cn } from "@/lib/utils"

export function Button({
  children,
  tooltip,
  isClipped,
  className,
  ...props
}: ComponentProps<typeof UIButton> & {
  tooltip?:
    | ({
        content: string
      } & Pick<ComponentProps<typeof Tooltip>, "onOpenChange">)
    | string
} & {
  isClipped?: boolean
}) {
  const { content, onOpenChange } =
    typeof tooltip === "string" ? { content: tooltip } : { ...tooltip }

  const [ref, isOverflow] = useIsOverflow<HTMLButtonElement>({
    enabled: isClipped,
  })
  const childrenToTooltip = isClipped && isOverflow

  return (
    <Tooltip
      delayDuration={200}
      open={content || childrenToTooltip ? undefined : false}
      onOpenChange={onOpenChange}
    >
      <TooltipContent>{childrenToTooltip ? children : content}</TooltipContent>

      <TooltipTrigger asChild>
        <UIButton
          {...props}
          ref={ref}
          className={cn(className, isClipped ? "truncate block" : undefined)}
        >
          {children}
        </UIButton>
      </TooltipTrigger>
    </Tooltip>
  )
}
