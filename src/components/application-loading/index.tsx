import { Spinner } from "@/components/ui/spinner"
import { Dialog, DialogOverlay } from "@/components/ui/dialog"

import { ApplicationVersions } from "../application-versions"

export function ApplicationLoading() {
  return (
    <Dialog open={true}>
      <DialogOverlay>
        <div className="flex items-center justify-center h-full">
          <Spinner className="size-12" />
        </div>
      </DialogOverlay>
    </Dialog>
  )
}
