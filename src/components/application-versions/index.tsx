import { ServerCrash } from "lucide-react"

import { useApplicationServer } from "@/api/app-server"

import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

export function ApplicationVersions() {
  const { applicationServerStatus, applicationServerVersion } =
    useApplicationServer()

  return (
    <div className="fixed right-[10px] bottom-[10px] flex gap-1 opacity-25">
      <Badge variant="secondary" className="">
        FE — 0.0.0
      </Badge>

      <Badge
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
