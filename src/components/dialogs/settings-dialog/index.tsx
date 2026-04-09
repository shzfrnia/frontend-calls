import { useAppDispatch } from "@/hooks/use-store"

import { closeSettingsDialog } from "@/store/slices/settings-slice"

import { Dialog, DialogContent } from "@/components/ui/dialog"

import { AppSidebar } from "./components/sidebar"

export function SettingsDialog({ open }: { open: boolean }) {
  const dispatch = useAppDispatch()

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => !value && dispatch(closeSettingsDialog())}
    >
      <DialogContent
        showCloseButton={false}
        className="w-[90vw] sm:max-w-[90vw] h-[90vh] flex p-0 overflow-hidden"
      >
        <AppSidebar />
      </DialogContent>
    </Dialog>
  )
}
