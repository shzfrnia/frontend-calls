import { cva } from "class-variance-authority"
import { ServerCrash } from "lucide-react"

import { cn } from "@/lib/utils"

import { useApplicationServer } from "@/api/app-server"

import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

const badge = cva("text-[6px]")

export function ApplicationVersions() {
  const { applicationServerStatus, applicationServerVersion } =
    useApplicationServer()

  return (
    <div className="fixed right-[10px] bottom-[10px] flex gap-1 opacity-25">
      <Badge variant="secondary" className={cn(badge())}>
        FE — 0.0.0
      </Badge>

      <Badge
        className={cn(badge())}
        variant={
          applicationServerStatus === "failed" ? "destructive" : "secondary"
        }
      >
        {"BE — "}
        {
          {
            checking: <Spinner />,
            failed: <ServerCrash />,
            success: applicationServerVersion,
          }[applicationServerStatus]
        }
      </Badge>
    </div>
  )
}
