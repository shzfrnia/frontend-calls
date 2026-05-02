import { NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { House } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  SidebarHeader as SidebarHeaderComponent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "./sidebar"
import { sidebarMenuButtonLg } from "./sidebar-menu-button"

export function SidebarHeader() {
  const { t } = useTranslation()

  return (
    <SidebarHeaderComponent>
      <SidebarMenu>
        <SidebarMenuItem>
          <NavLink to="/">
            {({ isActive }) => (
              <SidebarMenuButton
                variant={isActive ? "outline" : undefined}
                className={cn(sidebarMenuButtonLg())}
                tooltip={t("sidebar.header.house-tooltip")}
              >
                <House />
              </SidebarMenuButton>
            )}
          </NavLink>
        </SidebarMenuItem>

        <SidebarSeparator className="mx-auto mt-[10px]" />
      </SidebarMenu>
    </SidebarHeaderComponent>
  )
}
