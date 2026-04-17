import { useState } from "react"
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
  const { content } =
    typeof tooltip === "string" ? { content: tooltip } : { ...tooltip }

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Tooltip open={content ? isOpen : false} onOpenChange={setIsOpen}>
      <TooltipContent>{content}</TooltipContent>
      <TooltipTrigger
        asChild
        onFocus={(e) => e.preventDefault()}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <UIButton {...props}>{children}</UIButton>
      </TooltipTrigger>
    </Tooltip>
  )
}
