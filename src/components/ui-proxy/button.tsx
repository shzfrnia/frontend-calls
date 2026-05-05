import { type ComponentProps } from "react"

import { Button as UIButton } from "../ui/button"

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export function Button({
  children,
  tooltip,
  ...props
}: ComponentProps<typeof UIButton> & {
  tooltip?:
    | ({
        content: string
      } & Pick<ComponentProps<typeof Tooltip>, "onOpenChange">)
    | string
}) {
  const { content, onOpenChange } =
    typeof tooltip === "string" ? { content: tooltip } : { ...tooltip }

  return (
    <Tooltip
      delayDuration={200}
      open={content ? undefined : false}
      onOpenChange={onOpenChange}
    >
      <TooltipContent>{content}</TooltipContent>

      <TooltipTrigger asChild>
        <UIButton {...props}>{children}</UIButton>
      </TooltipTrigger>
    </Tooltip>
  )
}
