import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { cva } from "class-variance-authority"
import { House, CirclePlus } from "lucide-react"

import { cn } from "@/lib/utils"
import { randInt } from "@/utils/number"

import { useAppSelector } from "@/hooks/use-store"

import {
  selectServers,
  selectServersLoading,
} from "@/store/slices/servers-slice"

import { ScrollArea } from "../ui/scroll-area"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarMenuSkeleton,
} from "./components/sidebar"
import { CreateServerDialog } from "../dialogs/create-server-dialog"

const sidebarMenuButtonLg = cva("[&>svg]:size-5 flex justify-center")

export function AppSidebar() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { loaded } = useAppSelector(selectServersLoading)
  const servers = useAppSelector(selectServers)

  const [createServerDialogOpen, setCreateServerDialogOpen] = useState(false)
  const [skeletonItems] = useState<string[]>(new Array(randInt(7, 15)).fill(""))

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

      <SidebarContent>
        <ScrollArea className="overflow-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {!loaded
                  ? skeletonItems.map((_, index) => {
                      return (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuSkeleton className="p-0 *:w-full *:max-w-full *:h-full" />
                        </SidebarMenuItem>
                      )
                    })
                  : servers.map((server) => {
                      return (
                        <NavLink key={server.id} to={`server/${server.id}`}>
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
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
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
