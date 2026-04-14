import { useState } from "react"
import { useTranslation } from "react-i18next"

import { SidebarDialog, type Items } from "../templates/sidebar-dialog"

import { UserRoundPen, Cog } from "lucide-react"

import { SettingsProfile } from "../settings-dialog/components/tabs/profile"
import { SettingsPrivacy } from "../settings-dialog/components/tabs/privacy"
import { SettingsApplication } from "../settings-dialog/components/tabs/application"

const defaultPath = "user-settings|profile|general"

export function ServerSettingsDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (value: boolean) => void
}) {
  const { t } = useTranslation()

  const [items] = useState<Items>({
    "user-settings": {
      title: t("dialogs.settings.nav.profile-settings.title"),
      items: {
        profile: {
          title: t("dialogs.settings.nav.profile-settings.nav.profile.title"),
          icon: UserRoundPen,
          items: {
            general: {
              title: t(
                "dialogs.settings.nav.profile-settings.nav.profile.nav.general.title"
              ),
              Component: SettingsProfile,
            },
            privacy: {
              title: t(
                "dialogs.settings.nav.profile-settings.nav.profile.nav.privacy.title"
              ),
              disabled: true,
              Component: SettingsPrivacy,
            },
          },
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
          icon: Cog,
          Component: SettingsApplication,
        },
      },
    },
  })

  return (
    <SidebarDialog
      open={open}
      onOpenChange={onOpenChange}
      items={items}
      defaultPath={defaultPath}
      size="full"
    />
  )
}
