import { ComponentType, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { UserRoundPen, Cog } from "lucide-react"
import { VisuallyHidden } from "radix-ui"

import { useAppDispatch } from "@/hooks/use-store"

import { closeSettingsDialog } from "@/store/slices/settings-slice"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { SidebarProvider } from "@/components/ui/sidebar"

import { SettingsSidebar, type NavItems } from "./components/sidebar"
import { SettingsDialogContent } from "./components/content"
import { SettingsProfile } from "./components/tabs/profile"
import { SettingsApplication } from "./components/tabs/application"
import { SettingsPrivacy } from "./components/tabs/privacy"

const defaultPath = "user-settings|profile|general"

export function SettingsDialog({ open }: { open: boolean }) {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [tabs] = useState<Record<string, NavItems>>({
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

  const { Icon, title, Component } = useMemo<{
    Icon: ComponentType<{ className: string }>
    title: string
    Component: ComponentType
  }>(() => {
    const path = navPath.split("|").reverse()

    const parentKey: keyof typeof tabs = path.pop() as keyof typeof tabs
    const root = tabs[parentKey]

    const firstKey = path.pop()
    const firstItem = firstKey ? root.items[firstKey] : null
    const Icon = firstItem?.icon ?? (() => null)

    if (path.length && firstItem?.items) {
      const subKey = path.pop() as string
      const subItem = firstItem ? firstItem.items[subKey] : null

      return {
        Icon,
        title: subItem?.title ?? "",
        Component: subItem?.Component ?? (() => null),
      }
    }

    return {
      Icon,
      title: firstItem?.title ?? "",
      Component: firstItem?.Component ?? (() => null),
    }
  }, [navPath, tabs])

  useEffect(() => {
    if (open) {
      setNavPath(defaultPath)
    }
  }, [open])

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => !value && dispatch(closeSettingsDialog())}
    >
      <VisuallyHidden.Root>
        <DialogTitle></DialogTitle>
      </VisuallyHidden.Root>

      <DialogContent
        showCloseButton={false}
        className="w-[90vw] sm:max-w-[90vw] h-[90vh] flex p-0 overflow-hidden"
      >
        <VisuallyHidden.Root>
          <DialogDescription></DialogDescription>
        </VisuallyHidden.Root>

        <SidebarProvider className="flex flex-1 min-h-full h-full">
          <SettingsSidebar
            items={tabs}
            navPath={navPath}
            onNavClick={(tabName) => setNavPath(tabName)}
          />

          <SettingsDialogContent
            title={
              <div className="flex gap-2 items-center">
                <Icon className="h-[1.3em]" />
                <h1>{title}</h1>
              </div>
            }
          >
            <Component />
          </SettingsDialogContent>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
