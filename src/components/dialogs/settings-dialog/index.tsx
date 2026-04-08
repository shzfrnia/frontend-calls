import { useAppDispatch } from "@/hooks/use-store"

import { closeSettingsDialog } from "@/store/slices/settings-slice"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function SettingsDialog({ open }: { open: boolean }) {
  const dispatch = useAppDispatch()

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => !value && dispatch(closeSettingsDialog())}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>TODO SETTINGS</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
