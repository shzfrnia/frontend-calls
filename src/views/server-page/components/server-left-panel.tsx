import { NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Users } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui-proxy/button"

import { Category } from "./category"
import { VoiceChannel } from "./voice-channel"

export function ServerLeftPanel() {
  const { t } = useTranslation()

  return (
    <ScrollArea className="p-2 overflow-auto">
      <div>
        <NavLink to="users">
          {({ isActive }) => (
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className="justify-start w-full"
            >
              <Users /> {t("common.members")}
            </Button>
          )}
        </NavLink>

        <Separator className="mt-2" />
      </div>

      <div className="flex flex-col gap-4 py-2 pl-2 pr-1">
        <Category name={`${t("views.server.voice-channels")} 1`}>
          <VoiceChannel name="test test test test test test test 1" />
        </Category>
        <Category name={`${t("views.server.voice-channels")} 2`}>
          <VoiceChannel name="test 2" />
          <VoiceChannel name="test 2" />
          <VoiceChannel name="test 2" />
          <VoiceChannel name="test 2" />
          <VoiceChannel name="test 2" />
        </Category>
        <Category name={`${t("views.server.voice-channels")} 3`}>
          <VoiceChannel name="test 3" />
        </Category>
      </div>
    </ScrollArea>
  )
}
