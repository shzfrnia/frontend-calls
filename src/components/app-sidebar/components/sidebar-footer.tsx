import { useTranslation } from "react-i18next"
import { CirclePlus } from "lucide-react"

import { useAppDispatch } from "@/hooks/use-store"

import { openCreateServerDialog } from "@/store/slices/servers-slice"

import {
  SidebarFooter as SidebarFooterComponent,
  SidebarMenuButton,
} from "./sidebar"
import { sidebarMenuButtonLg } from "./sidebar-menu-button"

import { cn } from "@/lib/utils"

export function SidebarFooter() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  return (
    <SidebarFooterComponent>
      <SidebarMenuButton
        className={cn(sidebarMenuButtonLg())}
        tooltip={t("sidebar.footer.add-server-tooltip")}
        onClick={() => dispatch(openCreateServerDialog())}
      >
        <CirclePlus />
      </SidebarMenuButton>
    </SidebarFooterComponent>
  )
}
