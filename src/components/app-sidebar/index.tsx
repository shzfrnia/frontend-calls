import { NavLink, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { cva } from "class-variance-authority"
import { House, CirclePlus, Cat, Bird, Panda } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
} from "@/components/ui/sidebar"
import { useApplicationData } from "@/hooks/use-application-data"

const sidebarMenuButtonLg = cva("[&>svg]:size-5 flex justify-center")

export function AppSidebar() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { servers } = useApplicationData()

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="!flex">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <NavLink to="/home/friends">
              {({ isActive }) => (
                <SidebarMenuButton
                  variant={isActive ? "outline" : undefined}
                  className={cn(sidebarMenuButtonLg())}
                  tooltip={t("sidebar.header.house-tooltip")}
                  onClick={() => navigate("/home/friends")}
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
                  >
                    {
                      { cat: <Cat />, bird: <Bird />, panda: <Panda /> }[
                        server.icon
                      ]
                    }
                    {isActive}
                  </SidebarMenuButton>
                )}
              </NavLink>
            )
          })}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavLink to="login">login</NavLink>
        <SidebarMenuButton
          className={cn(sidebarMenuButtonLg())}
          tooltip={t("sidebar.footer.add-server-tooltip")}
          onClick={() => alert("make new server")}
        >
          <CirclePlus />
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}
