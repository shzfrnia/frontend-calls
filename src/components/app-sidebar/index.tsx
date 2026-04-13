import { NavLink, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { cva } from "class-variance-authority"
import { House, CirclePlus } from "lucide-react"

import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback } from "../ui/avatar"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarInset,
} from "./components/sidebar"
import { CreateServerDialog } from "../dialogs/create-server-dialog"

import { useApplicationData } from "@/hooks/use-application-data"
import { useState } from "react"

const sidebarMenuButtonLg = cva("[&>svg]:size-5 flex justify-center")

export function AppSidebar() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [createServerDialogOpen, setCreateServerDialogOpen] = useState(false)

  const { servers } = useApplicationData()

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="!flex">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <NavLink to="/">
              {({ isActive }) => (
                <SidebarMenuButton
                  variant={isActive ? "outline" : undefined}
                  className={cn(sidebarMenuButtonLg())}
                  tooltip={t("sidebar.header.house-tooltip")}
                  onClick={() => navigate("/")}
                >
                  <House />
                </SidebarMenuButton>
              )}
            </NavLink>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="!overflow-auto">
        <SidebarGroup>
          {servers.map((server) => {
            return (
              <NavLink key={server.id} to={`/${server.id}`}>
                {({ isActive }) => (
                  <SidebarMenuButton
                    variant={isActive ? "outline" : undefined}
                    tooltip={server.name}
                    className="justify-center"
                  >
                    {server.name.slice(0, 2)}
                    {isActive}
                  </SidebarMenuButton>
                )}
              </NavLink>
            )
          })}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuButton
          className={cn(sidebarMenuButtonLg())}
          tooltip={t("sidebar.footer.add-server-tooltip")}
          onClick={() => setCreateServerDialogOpen(true)}
        >
          <CirclePlus />
        </SidebarMenuButton>
      </SidebarFooter>

      <CreateServerDialog
        open={createServerDialogOpen}
        onOpenChange={setCreateServerDialogOpen}
      />
    </Sidebar>
  )
}

export { SidebarInset }
