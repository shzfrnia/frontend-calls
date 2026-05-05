import { useState, type ComponentProps } from "react"
import { useTranslation } from "react-i18next"
import { Copy, Check } from "lucide-react"

import { useTimeout } from "@/hooks/use-timeout"

import { Button } from "../ui-proxy/button"

import { copyToClipboard } from "@/utils/copy"

type ButtonProps = ComponentProps<typeof Button>

export function CopyButton({
  content,
  size = "icon-sm",
  variant = "default",
  disabled,
}: { content?: string } & Pick<ButtonProps, "size" | "disabled"> & {
    variant?: Exclude<ButtonProps["variant"], "destructive" | "link">
  }) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  useTimeout(
    () => {
      if (content) {
        copyToClipboard(content)
        setCopied(false)
      }
    },
    1500,
    copied
  )

  const asIcon = size?.startsWith("icon")
  const text = t(copied ? "common.copied" : "common.copy")
  const icon = copied ? <Check /> : <Copy />

  const isDisabled = disabled || !content

  return (
    <Button
      size={size}
      disabled={isDisabled}
      variant={variant}
      tooltip={asIcon ? text : undefined}
      onClick={() => setCopied(true)}
    >
      {asIcon ? (
        icon
      ) : (
        <>
          {text} {icon}
        </>
      )}
    </Button>
  )
}
