import { useState } from "react"
import { useTranslation } from "react-i18next"
import { CirclePlus } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  SidebarFooter as SidebarFooterComponent,
  SidebarMenuButton,
} from "./sidebar"
import { sidebarMenuButtonLg } from "./sidebar-menu-button"

import { CreateServerDialog } from "../../dialogs/create-server-dialog"

export function SidebarFooter() {
  const { t } = useTranslation()
  const [createServerDialogOpen, setCreateServerDialogOpen] = useState(false)

  return (
    <SidebarFooterComponent>
      <SidebarMenuButton
        className={cn(sidebarMenuButtonLg())}
        tooltip={t("sidebar.footer.add-server-tooltip")}
        onClick={() => setCreateServerDialogOpen(true)}
      >
        <CirclePlus />
      </SidebarMenuButton>

      <CreateServerDialog
        open={createServerDialogOpen}
        onOpenChange={setCreateServerDialogOpen}
      />
    </SidebarFooterComponent>
  )
}
