import { type ReactNode } from "react"
import { X } from "lucide-react"

import { DialogClose } from "@/components/ui/dialog"
import { SidebarInset } from "@/components/app-sidebar/components/sidebar"
import { Button } from "@/components/ui-proxy/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

export function SettingsDialogContent({
  children,
  title,
}: {
  children: ReactNode
  title: string | ReactNode
}) {
  return (
    <SidebarInset className="flex flex-col">
      <div className="flex flex-col justify-between items-center h-[46px]">
        <div className="flex flex-1 justify-between items-center w-full px-4">
          <div>{typeof title === "string" ? <p>{title}</p> : title}</div>

          <DialogClose asChild>
            <Button variant="ghost" size="icon-sm">
              <X />
            </Button>
          </DialogClose>
        </div>
        <Separator />
      </div>

      <ScrollArea className="flex-1 p-4 overflow-auto">
        <div className="max-w-[700px] mx-auto">{children}</div>
      </ScrollArea>
    </SidebarInset>
  )
}
