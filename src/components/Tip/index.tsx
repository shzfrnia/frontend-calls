import type { ReactNode } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from "lucide-react"

export function Tip({ children }: { children: ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Info size={20} />
      </TooltipTrigger>
      <TooltipContent>{children}</TooltipContent>
    </Tooltip>
  )
}
