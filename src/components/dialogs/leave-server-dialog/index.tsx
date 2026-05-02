import { useCallback, useEffect, useState } from "react"
import { useTranslation, Trans } from "react-i18next"
import { SquareArrowRightExit } from "lucide-react"

import { useAppDispatch, useAppSelector } from "@/hooks/use-store"

import {
  closeLeaveServerDialog,
  selectLeaveServer,
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

export function LeaveServerDialog() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const serverForLeave = useAppSelector(selectLeaveServer)
  const [server, setServer] = useState(serverForLeave)

  useEffect(() => {
    if (serverForLeave) {
      setServer(serverForLeave)
    }
  }, [serverForLeave, setServer])

  const closeDialog = useCallback(
    () => dispatch(closeLeaveServerDialog()),
    [dispatch]
  )

  return (
    <AlertDialog
      open={Boolean(serverForLeave)}
      onOpenChange={(open) => !open && closeDialog()}
    >
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <SquareArrowRightExit />
          </AlertDialogMedia>

          <AlertDialogTitle>
            {t("dialogs.leave-server.title")} '{server?.name}'?
          </AlertDialogTitle>

          <AlertDialogDescription>
            <Trans
              i18nKey="dialogs.leave-server.description"
              values={{ serverName: server?.name }}
              components={{ bold: <strong /> }}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">
            {t("common.cancel")}
          </AlertDialogCancel>

          <AlertDialogAction variant="destructive" onClick={closeDialog}>
            {t("views.server.header.dropdown.leave-server")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
