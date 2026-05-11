import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation, Trans } from "react-i18next"
import { Trash2Icon } from "lucide-react"

import { useDeleteServerMutation } from "@/api/servers"

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
import { useAppSelector } from "@/hooks/use-store"
import { selectServer } from "@/views/server-page/store"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"

export function DeleteServerAlert(props: {
  open: boolean
  onOpenChange: (value: boolean) => void
}) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [deleteServer] = useDeleteServerMutation()
  const server = useAppSelector(selectServer)

  const [name, setName] = useState("")

  if (!server) {
    return null
  }

  return (
    <AlertDialog {...props}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>
            {t("dialog.server-settings.nav.remove-section.title")} '
            {server.name}'
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col gap-6">
              <p>
                <Trans
                  i18nKey="dialog.server-settings.nav.remove-section.description"
                  values={{ serverName: server?.name }}
                  components={{ bold: <strong /> }}
                />
              </p>

              <form>
                <Field>
                  <FieldLabel>
                    {t(
                      "dialog.server-settings.nav.remove-section.server-name.label"
                    )}
                  </FieldLabel>
                  <Input
                    placeholder={t(
                      "dialog.server-settings.nav.remove-section.server-name.placeholder"
                    )}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Field>
              </form>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">
            {t("common.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={name !== server.name}
            onClick={() => {
              // TODO fix redirect
              navigate("/")
              deleteServer(server.id)
            }}
          >
            {t("dialog.server-settings.nav.remove-section.title")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
