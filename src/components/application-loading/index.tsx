import { Spinner } from "@/components/ui/spinner"
import { Dialog, DialogOverlay } from "@/components/ui/dialog"

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
