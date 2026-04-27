import { Fragment } from "react"
import { NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Users } from "lucide-react"

import { useAppSelector } from "@/hooks/use-store"
import { selectServer } from "../store"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui-proxy/button"

import { Category } from "./category"
import { VoiceChannel } from "./voice-channel"

export function ServerLeftPanel() {
  const { t } = useTranslation()
  const server = useAppSelector(selectServer)

  if (!server) {
    return null
  }

  const { channels } = server

  return (
    <div className="p-2 overflow-hidden">
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

      <div className="flex flex-col gap-4 py-2">
        {channels.map((ch) => {
          return (
            <Fragment key={ch.id}>
              {"channels" in ch ? (
                <Category name={`${t("views.server.voice-channels")} 1`}>
                  {ch.channels.map((voiceChannel) => {
                    return (
                      <VoiceChannel
                        key={voiceChannel.id}
                        channel={voiceChannel}
                      />
                    )
                  })}
                </Category>
              ) : (
                <VoiceChannel channel={ch} />
              )}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
