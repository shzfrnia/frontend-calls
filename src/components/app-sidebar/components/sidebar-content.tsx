import { useState, type ComponentProps, type ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"
import {
  // PencilIcon,
  // ShareIcon,
  SquareArrowRightExit,
  Volume2,
} from "lucide-react"

import { randInt } from "@/utils/number"

import { useAppDispatch, useAppSelector } from "@/hooks/use-store"

import {
  openLeaveServerDialog,
  selectServers,
  selectServersLoaded,
} from "@/store/slices/servers-slice"
import { selectChannel } from "@/store/slices/channel-slice"

import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  // ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import {
  SidebarContent as SidebarContentComponent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton as SidebarMenuButtonComponent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuSkeleton,
} from "./sidebar"

import { WSServer } from "@/types/server"

import { cn } from "@/lib/utils"

function SidebarMenuButtonBadge({
  currentCall,
  hasCall,
}: {
  currentCall: boolean
  hasCall: boolean
}) {
  if (![hasCall, currentCall].some(Boolean)) {
    return null
  }

  return (
    <span
      className={cn(
        "w-[18px] aspect-square",
        "absolute right-[-1px] bottom-[-1px]",
        "rounded-full",
        "p-[4px]",
        "[&>svg]:w-full [&>svg]:h-full [&>svg]:fill-current text-neutral-50",
        "shadow-[inset_0_0_0_2px_var(--sidebar)]",
        "bg-neutral-600",
        currentCall ? "bg-green-600 dark:bg-green-800" : undefined
      )}
    >
      {[currentCall, hasCall].some(Boolean) && <Volume2 />}
    </span>
  )
}

function SidebarMenuButton({
  server,
  isActive,
  ...props
}: ComponentProps<typeof SidebarMenuButtonComponent> & {
  isActive: boolean
  server: WSServer
}) {
  const channel = useAppSelector(selectChannel)

  return (
    <SidebarMenuButtonComponent
      {...props}
      variant={isActive ? "outline" : undefined}
      tooltip={server.name}
      className="justify-center relative"
    >
      {server.name.slice(0, 2)}
      {isActive}
      <SidebarMenuButtonBadge
        hasCall={Boolean(Object.keys(server.users).length)}
        currentCall={Boolean(channel && channel.server_id === server.id)}
      />
    </SidebarMenuButtonComponent>
  )
}

export function SidebarContent() {
  const loaded = useAppSelector(selectServersLoaded)
  const servers = useAppSelector(selectServers)

  const [skeletonItems] = useState<string[]>(new Array(randInt(7, 15)).fill(""))

  return (
    <SidebarContentComponent>
      <ScrollArea className="min-h-0">
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
                      <ServerContextMenu key={server.id} server={server}>
                        <NavLink to={`server/${server.id}`}>
                          {({ isActive }) => (
                            <SidebarMenuButton
                              isActive={isActive}
                              server={server}
                            />
                          )}
                        </NavLink>
                      </ServerContextMenu>
                    )
                  })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </ScrollArea>
    </SidebarContentComponent>
  )
}

export function ServerContextMenu({
  children,
  server,
}: {
  children: ReactNode
  server: WSServer
}) {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>

      <ContextMenuContent>
        {/* <ContextMenuGroup>
          <ContextMenuItem>
            <PencilIcon />
            Edit
          </ContextMenuItem>
          <ContextMenuItem>
            <ShareIcon />
            Share
          </ContextMenuItem>
        </ContextMenuGroup>

        <ContextMenuSeparator /> */}

        <ContextMenuGroup>
          <ContextMenuItem
            variant="destructive"
            onClick={() => dispatch(openLeaveServerDialog(server.id))}
          >
            <SquareArrowRightExit />
            {t("views.server.header.dropdown.leave-server")}
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
