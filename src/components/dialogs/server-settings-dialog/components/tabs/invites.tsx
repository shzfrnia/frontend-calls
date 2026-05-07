import { useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Trash } from "lucide-react"

import { useAppDispatch, useAppSelector } from "@/hooks/use-store"

import {
  useCleanInvitesMutation,
  useDeleteInviteMutation,
  useLazyGetInvitesQuery,
} from "@/api/servers"

import { openInviteServerDialog } from "@/store/slices/servers-slice"
import { selectServer } from "@/views/server-page/store"

import { Button } from "@/components/ui-proxy/button"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { CopyButton } from "@/components/copy-button"

import { formatDate } from "@/utils/date"

import { User } from "@/types/user"

export function Invites() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const server = useAppSelector(selectServer)
  const [fetchInvites, { data, isLoading }] = useLazyGetInvitesQuery()
  const [deleteInvite] = useDeleteInviteMutation()
  const [clearInvites] = useCleanInvitesMutation()

  const openInviteDialog = useCallback(() => {
    if (server) {
      dispatch(openInviteServerDialog(server))
    }
  }, [server, dispatch])

  useEffect(() => {
    if (server) {
      fetchInvites(server.id)
    }
  }, [server, fetchInvites])

  if (!server) {
    return null
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {t("dialog.server-settings.nav.users.nav.invites.description")}
        </h4>

        <div className="flex gap-2">
          <Button onClick={openInviteDialog}>
            {t("dialog.server-settings.nav.users.nav.invites.get-invite-code")}
          </Button>
          <Button variant="destructive" onClick={() => clearInvites(server.id)}>
            {t("common.delete-all")}
          </Button>
        </div>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                {t(
                  "dialog.server-settings.nav.users.nav.invites.table.header.creator"
                )}
              </TableHead>
              <TableHead>
                {t(
                  "dialog.server-settings.nav.users.nav.invites.table.header.code"
                )}
              </TableHead>
              <TableHead>
                {t(
                  "dialog.server-settings.nav.users.nav.invites.table.header.used"
                )}
              </TableHead>
              <TableHead>{t("common.created")}</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {(data?.data || []).map(({ id, user, code, used, created_at }) => (
              <TableRow key={id}>
                <TableCell>
                  <UserCard user={user} />
                </TableCell>

                <TableCell>
                  <div className="flex gap-1 items-center">
                    <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                      {code}
                    </span>
                    <CopyButton variant="ghost" content={code} />
                  </div>
                </TableCell>

                <TableCell>{used}</TableCell>

                <TableCell>{formatDate(created_at)}</TableCell>

                <TableCell className="text-right">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="size-8"
                    tooltip={t("common.delete")}
                    onClick={() =>
                      deleteInvite({ server: server.id, invite: id })
                    }
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function UserCard({ user }: { user: User }) {
  const name = user.display_name

  return (
    <div className="flex gap-2 items-center pr-1">
      <Avatar size="sm">
        <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
      </Avatar>

      <div className="flex-1 grid">
        <p className="text-muted-foreground text-[0.8rem] truncate">{name}</p>
      </div>
    </div>
  )
}
