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
          <VoiceChannel
            channel={{ id: "1", name: "name 1", settings: { limit: 1 } }}
          />
        </Category>
        <Category name={`${t("views.server.voice-channels")} 2`}>
          <VoiceChannel
            channel={{ id: "2", name: "name 2", settings: { limit: 1 } }}
          />
          <VoiceChannel
            channel={{ id: "3", name: "name 3", settings: { limit: 2 } }}
          />
          <VoiceChannel
            channel={{ id: "4", name: "name 4", settings: { limit: 3 } }}
          />
          <VoiceChannel
            channel={{ id: "5", name: "name 5", settings: { limit: 4 } }}
          />
          <VoiceChannel
            channel={{ id: "6", name: "name 6", settings: { limit: 5 } }}
          />
        </Category>
        <Category name={`${t("views.server.voice-channels")} 3`}>
          <VoiceChannel
            channel={{ id: "7", name: "name 7", settings: { limit: 7 } }}
          />
        </Category>
      </div>
    </ScrollArea>
  )
}
