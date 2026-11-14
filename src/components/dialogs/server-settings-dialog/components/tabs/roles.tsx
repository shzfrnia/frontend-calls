import { useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"
import {
  ChevronRightIcon,
  DotIcon,
  MoreHorizontalIcon,
  Users,
  ShieldUserIcon,
  PenIcon,
  Trash,
  CopyIcon,
} from "lucide-react"

import { useAppDispatch, useAppSelector } from "@/hooks/use-store"

import {
  useCleanInvitesMutation,
  useDeleteInviteMutation,
  useLazyGetInvitesQuery,
} from "@/api/servers"

// import { openInviteServerDialog } from "@/store/slices/servers-slice"
import { selectServer } from "@/views/server-page/store"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui-proxy/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Roles() {
  const { t } = useTranslation()
  // const dispatch = useAppDispatch()
  const server = useAppSelector(selectServer)
  const roles = [
    {
      name: "Администратор",
      users: 12,
    },
    {
      name: "Модератор",
      users: 6,
    },
    {
      name: "Смотрящий за белым яром",
      users: 1,
    },
  ]
  // const [fetchInvites, { data }] = useLazyGetInvitesQuery()

  // useEffect(() => {
  //   if (server) {
  //     fetchInvites(server.id)
  //   }
  // }, [server, fetchInvites])

  if (!server) {
    return null
  }

  return (
    <div className="flex flex-col gap-5">
      <Item asChild variant="outline">
        <a href="#">
          <ItemContent>
            <ItemTitle>
              {t("dialog.server-settings.nav.users.nav.roles.default-role")}
            </ItemTitle>
            <ItemDescription className="flex items-center">
              <span>@everyone</span>
              <DotIcon className="size-4" />
              {t(
                "dialog.server-settings.nav.users.nav.roles.default-role-description"
              )}
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon className="size-4" />
          </ItemActions>
        </a>
      </Item>

      <div className="flex gap-2">
        <Button>
          {t("dialog.server-settings.nav.users.nav.roles.create-role")}
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              {`${t("dialog.server-settings.nav.users.nav.roles.title")} - (${roles.length})`}
            </TableHead>
            <TableHead>
              {t("dialog.server-settings.nav.users.nav.users.title")}
            </TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => {
            return (
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex">
                    <ShieldUserIcon className="h-[1.2rem]" />
                    {role.name}
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    tooltip={t(
                      "dialog.server-settings.nav.users.nav.roles.show-users"
                    )}
                  >
                    <Users />
                    {role.users}
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    tooltip={t("common.edit")}
                  >
                    <PenIcon />
                    <span className="sr-only">{t("common.edit")}</span>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontalIcon />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <CopyIcon />
                        {t("common.duplicate")}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">
                        <Trash />
                        {t("common.delete")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
