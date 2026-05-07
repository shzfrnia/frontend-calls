import { useCallback } from "react"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "@/hooks/use-store"

import { useJoinServerByInviteMutation } from "@/api/servers"

import {
  selectJoinToServerAcceptDialog,
  closeJoinServerAcceptDialog,
} from "@/store/slices/servers-slice"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Spinner } from "@/components/ui/spinner"

export function JoinToServerAcceptDialog() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { server, code } = useAppSelector(selectJoinToServerAcceptDialog) || {}
  const [joinToServer, { isLoading }] = useJoinServerByInviteMutation()

  const closeDialog = useCallback(() => {
    dispatch(closeJoinServerAcceptDialog())
  }, [dispatch])

  return (
    <AlertDialog
      open={Boolean(server)}
      onOpenChange={(value) => !value && closeDialog()}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <p>{server?.name?.slice(0, 2)}</p>
          </AlertDialogMedia>

          <AlertDialogTitle>{server?.name}</AlertDialogTitle>

          <AlertDialogDescription className="w-full">
            {t("dialog.join-server-accept.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={() => joinToServer(code || "").then(closeDialog)}
          >
            {isLoading && <Spinner />}
            {t("common.join")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
