import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ServerUrlForm } from "@/components/forms/server-url-form"

type FormData = { url: string }

export function ServerUrlDialog({
  defaultValues,
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (formData: FormData) => void
  defaultValues: FormData
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <ServerUrlForm onSubmit={onSubmit} defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  )
}
