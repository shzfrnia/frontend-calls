import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "@/hooks/use-store"

import { useLazyGetServerByInviteQuery } from "@/api/servers"

import {
  selectJoinToServerDialog,
  closeJoinServerDialog,
  openJoinServerAcceptDialog,
  closeCreateServerDialog,
  selectServers,
} from "@/store/slices/servers-slice"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { JoinServerForm } from "@/components/forms/join-server-form"

export function JoinToServerDialog() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const open = useAppSelector(selectJoinToServerDialog)
  const servers = useAppSelector(selectServers)
  const [getServer] = useLazyGetServerByInviteQuery()

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => !value && dispatch(closeJoinServerDialog())}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("dialog.join-server.title")}</DialogTitle>
          <DialogDescription>
            {t("dialog.join-server.description")}
          </DialogDescription>
        </DialogHeader>

        <JoinServerForm
          onSubmit={({ code }) =>
            getServer(code)
              .unwrap()
              .then((data) => {
                const myServer = servers.find((s) => s.id === data.id)
                if (myServer) {
                  navigate(`/server/${myServer.id}`)
                } else {
                  dispatch(openJoinServerAcceptDialog({ server: data, code }))
                }
                dispatch(closeJoinServerDialog())
                dispatch(closeCreateServerDialog())
              })
          }
        >
          {() => {
            return (
              <DialogFooter className="flex !justify-center">
                <Button>{t("dialog.join-server.title")}</Button>
              </DialogFooter>
            )
          }}
        </JoinServerForm>
      </DialogContent>
    </Dialog>
  )
}
