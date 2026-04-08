import { type ComponentProps } from "react"

import { Button as UIButton } from "../ui/button"

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export function Button({
  children,
  tooltip,
  ...props
}: ComponentProps<typeof UIButton> & {
  tooltip?: { content: string } | string
}) {
  const tooltipContent =
    typeof tooltip === "string" ? tooltip : tooltip?.content

  return (
    <Tooltip open={tooltip ? undefined : false}>
      <TooltipContent>{tooltipContent}</TooltipContent>
      <TooltipTrigger asChild>
        <UIButton {...props}>{children}</UIButton>
      </TooltipTrigger>
    </Tooltip>
  )
}
