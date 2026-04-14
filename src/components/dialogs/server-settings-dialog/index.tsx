import { VisuallyHidden } from "radix-ui"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { SidebarProvider } from "@/components/ui/sidebar"

import { SettingsSidebar } from "./components/sidebar"
import { SettingsDialogContent } from "./components/content"

export function ServerSettingsDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (value: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <VisuallyHidden.Root>
        <DialogTitle></DialogTitle>
      </VisuallyHidden.Root>

      <DialogContent className="w-[100vw] sm:max-w-[100vw] h-[100vh] flex p-0 overflow-hidden">
        <VisuallyHidden.Root>
          <DialogDescription></DialogDescription>
        </VisuallyHidden.Root>

        {/* <SidebarProvider className="flex flex-1 min-h-full h-full">
          <SettingsSidebar
            items={tabs}
            navPath={navPath}
            onNavClick={(tabName) => setNavPath(tabName)}
          />

          <SettingsDialogContent
            title={
              <div className="flex gap-2 items-center">
                <Icon className="h-[1.3em]" />
                <h1>{title}</h1>
              </div>
            }
          >
            <Component />
          </SettingsDialogContent>
        </SidebarProvider> */}
      </DialogContent>
    </Dialog>
  )
}
