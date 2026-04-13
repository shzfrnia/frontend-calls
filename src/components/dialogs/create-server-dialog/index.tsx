import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "radix-ui"

import { useCreateServerMutation } from "@/api/servers"

import { CreateServerForm } from "@/components/forms/create-server-form"

import type { ServerDraft } from "@/types/server"
import type { FormDialogProps } from "../types"
import type { Optional } from "@/types/utils"
import { useCallback } from "react"

type FormDialog = FormDialogProps<ServerDraft>

export function CreateServerDialog({
  defaultValues,
  open,
  onOpenChange,
  onSubmit,
}: Optional<FormDialog, "onSubmit">) {
  const [createServer, { isLoading, isError }] = useCreateServerMutation()

  const submitHandler = useCallback<FormDialog["onSubmit"]>(
    (data) => {
      if (onSubmit) {
        return onSubmit(data)
      } else {
        createServer(data)
        onOpenChange(false)
      }
    },
    [onSubmit, onOpenChange]
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <VisuallyHidden.Root>
        <DialogTitle>Форма входа</DialogTitle>
      </VisuallyHidden.Root>

      <DialogContent className="sm:max-w-sm">
        <CreateServerForm
          onSubmit={submitHandler}
          defaultValues={defaultValues}
          loading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}
