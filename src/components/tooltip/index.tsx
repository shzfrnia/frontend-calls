import React, { useRef, useState, useLayoutEffect, useCallback } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TextProps {
  children: React.ReactNode
  className?: string
  maxWidth?: string | number
  delayDuration?: number
  sideOffset?: number
  tooltipContentClassName?: string
  side?: "top" | "right" | "bottom" | "left"
}

export default function Text({
  children,
  className = "",
  maxWidth,
  delayDuration = 300,
  sideOffset = 8,
  tooltipContentClassName = "",
  side = "top",
}: TextProps) {
  const textRef = useRef<HTMLDivElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  const checkOverflow = useCallback(() => {
    const el = textRef.current
    if (!el) return
    const overflowing = el.scrollWidth > el.clientWidth + 1
    setIsOverflowing(overflowing)
  }, [])
  useLayoutEffect(() => {
    checkOverflow()
    const observer = new ResizeObserver(checkOverflow)
    if (textRef.current?.parentElement) {
      observer.observe(textRef.current.parentElement)
    }
    window.addEventListener("resize", checkOverflow)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", checkOverflow)
    }
  }, [checkOverflow, children])

  const fullText =
    typeof children === "string" ? children : String(children ?? "")

  // Если текст помещается — рендерим без 
  if (!isOverflowing) {
    return (
      <div
        ref={textRef}
        className={`truncate ${className}`}
        style={{ maxWidth: maxWidth ?? "100%" }}
      >
        {children}
      </div>
    )
  }
  // Если не помещается включаем tooltip
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            ref={textRef}
            className={`truncate cursor-help ${className}`}
            style={{ maxWidth: maxWidth ?? "100%" }}
          >
            {children}
          </div>
        </TooltipTrigger>

        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          className={`max-w-[340px] break-words ${tooltipContentClassName}`}
        >
          {fullText}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
