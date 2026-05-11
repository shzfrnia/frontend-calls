import { type ComponentProps, type Ref, useState } from "react"
import { useComposedRefs } from "motion/react"

import { useIsOverflow } from "@/hooks/use-is-overflow"

import { Button as UIButton } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

import { cn } from "@/lib/utils"

export function Button({
  children,
  tooltip,
  isClipped = false,
  className,
  ref,
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
  const [openTooltip, setOpenTooltip] = useState(false)
  const { content, onOpenChange } =
    typeof tooltip === "string" ? { content: tooltip } : { ...tooltip }

  const [target, isOverflow] = useIsOverflow<HTMLButtonElement>({
    enabled: isClipped,
  })
  const childrenToTooltip = isClipped && isOverflow
  const composedRef = useComposedRefs(ref as Ref<HTMLButtonElement>, target)

  return (
    <Tooltip
      delayDuration={200}
      open={content || childrenToTooltip ? openTooltip : false}
      onOpenChange={(value) => {
        onOpenChange && onOpenChange(value)
        setOpenTooltip(value)
      }}
    >
      <TooltipContent>{childrenToTooltip ? children : content}</TooltipContent>

      <TooltipTrigger asChild>
        <UIButton
          {...props}
          ref={composedRef}
          className={cn(className, isClipped ? "truncate block" : undefined)}
        >
          {children}
        </UIButton>
      </TooltipTrigger>
    </Tooltip>
  )
}
