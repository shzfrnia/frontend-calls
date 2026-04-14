import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Trash2 } from "lucide-react"

import { useAppSelector } from "@/hooks/use-store"

import { selectServer } from "@/store/slices/views-slices/server-slice"

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

  const [items] = useState<Items>({
    "server-settings": {
      title: server?.name ?? "",
      items: {
        "server-profile": {
          title: t("dialogs.server-settings.nav.server-profile.title"),
          Component: ServerProfile,
        },
      },
    },
    general: {
      title: t("dialogs.settings.nav.general.title"),
      items: {
        profile: {
          title: t(
            "dialogs.settings.nav.general.nav.application-settings.title"
          ),
          rightIcon: Trash2,
          onClick: () => setShowDeleteAlert(true),
          variant: "destructive",
        },
      },
    },
  })

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
