import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Trash2 } from "lucide-react"

import { useAppSelector } from "@/hooks/use-store"

import { selectServer } from "@/views/server-page/store"

import { SidebarDialog, type Items } from "../templates/sidebar-dialog"
import { DeleteServerAlert } from "./components/delete-server-alert"
import { ServerProfile } from "./components/tabs/server-profile"

const defaultPath = "server-settings|server-profile"

export function ServerSettingsDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (value: boolean) => void
}) {
  const { t } = useTranslation()

  const server = useAppSelector(selectServer)

  const [showDeleteAlert, setShowDeleteAlert] = useState(false)

  const items = useMemo<Items>(
    () => ({
      "server-settings": {
        title: server?.name,
        items: {
          "server-profile": {
            title: t("dialog.server-settings.nav.server-profile.title"),
            Component: ServerProfile,
          },
        },
      },
      users: {
        title: t("dialog.server-settings.nav.users.title"),
        items: {
          users: {
            title: t("dialog.server-settings.nav.users.nav.users.title"),
            Component: ServerProfile,
          },
          roles: {
            title: t("dialog.server-settings.nav.users.nav.roles.title"),
            Component: ServerProfile,
          },
        },
      },
      "remove-section": {
        items: {
          profile: {
            title: t("dialog.server-settings.nav.remove-section.title"),
            rightIcon: Trash2,
            onClick: () => setShowDeleteAlert(true),
            variant: "destructive",
          },
        },
      },
    }),
    [server, t]
  )

  return (
    <>
      <SidebarDialog
        open={open}
        onOpenChange={onOpenChange}
        items={items}
        defaultPath={defaultPath}
        size="full"
      />

      <DeleteServerAlert
        open={showDeleteAlert}
        onOpenChange={setShowDeleteAlert}
      />
    </>
  )
}
