import { useState } from "react"
import { useTranslation } from "react-i18next"
import { UserRoundPen, Cog } from "lucide-react"

import { useAppDispatch } from "@/hooks/use-store"

import { closeSettingsDialog } from "@/store/slices/settings-slice"

import { SettingsProfile } from "./components/tabs/profile"
import { SettingsApplication } from "./components/tabs/application"
import { SettingsPrivacy } from "./components/tabs/privacy"
import { NavUser } from "./components/nav-user"

import { SidebarDialog, type Items } from "../templates/sidebar-dialog"

const defaultPath = "user-settings|profile|general"

export function SettingsDialog({ open }: { open: boolean }) {
  const dispatch = useAppDispatch()
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
      onOpenChange={(value) => !value && dispatch(closeSettingsDialog())}
      defaultPath={defaultPath}
      items={items}
      footer={<NavUser />}
    />
  )
}
