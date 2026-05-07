import { useTranslation } from "react-i18next"
import {
  ChevronDown,
  SquareArrowRightExit,
  Settings,
  UserRoundPlus,
} from "lucide-react"

import { useAppDispatch, useAppSelector } from "@/hooks/use-store"

import {
  openLeaveServerDialog,
  openInviteServerDialog,
} from "@/store/slices/servers-slice"
import { selectCurrentUser } from "@/store/slices/auth-slice"

import { selectServer } from "../store"

import { Button } from "@/components/ui-proxy/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { useCallback } from "react"

export function ServerHeader({
  openSettingsDialogClick,
}: {
  openSettingsDialogClick: () => void
}) {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const server = useAppSelector(selectServer)
  const currentUser = useAppSelector(selectCurrentUser)

  const openInviteDialog = useCallback(() => {
    if (server) {
      dispatch(openInviteServerDialog(server))
    }
  }, [server, dispatch])

  if (!server) {
    return <Skeleton className="w-full h-full" />
  }

  const isOwner = currentUser?.id == server.owner_id

  return (
    <div className="w-full flex flex-1 items-center justify-between gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="group">
          <Button variant="ghost" className="overflow-hidden shrink-1">
            <span className="truncate">{server.name}</span>
            <ChevronDown className="transition-transform duration-200 group-data-[state=open]:rotate-x-180" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={openInviteDialog}>
              <UserRoundPlus />
              {t("common.invite-to-server")}
            </DropdownMenuItem>

            {isOwner && (
              <DropdownMenuItem onClick={openSettingsDialogClick}>
                <Settings />
                {t("views.server.header.dropdown.server-settings")}
              </DropdownMenuItem>
            )}

            {/* <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem> */}
          </DropdownMenuGroup>

          {/* <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>
        </DropdownMenuGroup> */}

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => dispatch(openLeaveServerDialog(server.id))}
            >
              <SquareArrowRightExit />
              {t("views.server.header.dropdown.leave-server")}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        size="icon-sm"
        variant="ghost"
        tooltip={t("common.invite-to-server")}
        onClick={openInviteDialog}
      >
        <UserRoundPlus />
      </Button>
    </div>
  )
}
