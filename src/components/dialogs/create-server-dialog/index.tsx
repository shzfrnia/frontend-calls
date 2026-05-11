import { useCallback } from "react"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "@/hooks/use-store"

import { useCreateServerMutation } from "@/api/servers"

import {
  openJoinServerDialog,
  closeCreateServerDialog,
  selectCreateServerDialog,
} from "@/store/slices/servers-slice"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { CreateServerForm } from "@/components/forms/create-server-form"

import type { ServerDraft } from "@/types/server"
import type { FormDialogProps } from "../types"

type FormDialog = FormDialogProps<ServerDraft>

export function CreateServerDialog() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [createServer, { isLoading, isError }] = useCreateServerMutation()
  const open = useAppSelector(selectCreateServerDialog)

  const closeDialog = useCallback(() => {
    dispatch(closeCreateServerDialog())
  }, [dispatch])

  const submitHandler = useCallback<FormDialog["onSubmit"]>(
    (data) => {
      createServer(data)
      closeDialog()
    },
    [createServer, closeDialog]
  )

  return (
    <Dialog open={open} onOpenChange={(value) => !value && closeDialog()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("dialog.create-server.title")}</DialogTitle>
        </DialogHeader>

        <CreateServerForm
          onSubmit={submitHandler}
          loading={isLoading}
          submitError={isError ? "isError" : undefined}
        />

        <DialogFooter>
          <div className="flex flex-col items-center gap-3 w-full">
            <DialogTitle>
              {t("dialog.create-server.has-invite-code-title")}
            </DialogTitle>

            <Button
              className="w-full"
              onClick={() => dispatch(openJoinServerDialog())}
            >
              {t("dialog.join-server.title")}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
