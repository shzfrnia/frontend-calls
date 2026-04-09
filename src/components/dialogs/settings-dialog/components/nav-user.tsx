import { useTranslation } from "react-i18next"
import { ChevronsUpDown, LogOut } from "lucide-react"

import { useAppSelector, useAppDispatch } from "@/hooks/use-store"

import { selectCurrentUser, logout } from "@/store/slices/auth-slice"
import { closeSettingsDialog } from "@/store/slices/settings-slice"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { isMobile } = useSidebar()
  const currentUser = useAppSelector(selectCurrentUser)

  if (!currentUser) {
    return null
  }

  const displayName = currentUser.nickname || currentUser.login

  const avatarFallback = displayName.slice(0, 2)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {/* <AvatarImage src={currentUser.avatar} alt={currentUser.name} /> */}
                <AvatarFallback className="rounded-lg">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayName}</span>
                <span className="truncate text-xs">{currentUser.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  dispatch(closeSettingsDialog())
                  dispatch(logout())
                }}
              >
                <LogOut />
                {t("common.logout")}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
