import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { UserRoundPen, Cog } from "lucide-react"

import { useAppDispatch } from "@/hooks/use-store"

import { closeSettingsDialog } from "@/store/slices/settings-slice"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { SidebarProvider } from "@/components/ui/sidebar"

import { SettingsSidebar } from "./components/sidebar"
import { SettingsDialogContent } from "./components/content"
import { SettingsProfile } from "./components/tabs/profile"
import { SettingsApplication } from "./components/tabs/application"
import { SettingsPrivacy } from "./components/tabs/privacy"

const defaultPath = "user-settings|profile|general"

export function SettingsDialog({ open }: { open: boolean }) {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [tabs] = useState({
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
  const [navPath, setNavPath] = useState<string>(defaultPath)

  const { parent, title, Component } = useMemo(() => {
    const path = navPath.split("|").reverse()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = { items: tabs }
    const currentStack = []

    while (path.length) {
      const key = path.pop()
      if (key) {
        current = current.items[key]
        currentStack.push(current)
      }
    }

    return {
      title: current.title,
      Component: current.Component,
      parent: currentStack[1],
    }
  }, [navPath, tabs])

  useEffect(() => {
    if (!open) {
      setNavPath(defaultPath)
    }
  }, [open])

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => !value && dispatch(closeSettingsDialog())}
    >
      <DialogContent
        showCloseButton={false}
        className="w-[90vw] sm:max-w-[90vw] h-[90vh] flex p-0 overflow-hidden"
      >
        <SidebarProvider className="flex flex-1 min-h-full h-full">
          <SettingsSidebar
            items={tabs}
            navPath={navPath}
            onNavClick={(tabName) => setNavPath(tabName)}
          />

          <SettingsDialogContent
            title={
              <div className="flex gap-2 items-center">
                <parent.icon className="h-[1.3em]" />
                <h1>{title}</h1>
              </div>
            }
          >
            {open && <Component />}
          </SettingsDialogContent>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
