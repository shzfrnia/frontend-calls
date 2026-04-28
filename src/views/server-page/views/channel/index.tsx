import { useMemo } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Volume2 } from "lucide-react"

import { useAppSelector } from "@/hooks/use-store"

import {
  useUserJoinToChannelMutation,
  useUserLeftChannelMutation,
} from "@/api/ws"

import { selectChannel } from "@/store/slices/channel-slice"
import { selectCurrentUser } from "@/store/slices/auth-slice"
import { selectServer } from "../../store"

import { PixelLiquidBg } from "@/components/unlumen-ui/pixel-liquid-bg"

import { DefaultLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"

import type { Channel } from "@/types/server"

export function Channel() {
  const { t } = useTranslation()
  const { channelID } = useParams()
  const [join] = useUserJoinToChannelMutation()
  const [left] = useUserLeftChannelMutation()
  const currentChannel = useAppSelector(selectChannel)
  const currentUser = useAppSelector(selectCurrentUser)
  const server = useAppSelector(selectServer)

  const channel = useMemo(() => {
    if (channelID) {
      const channels = (server?.channels || []).reduce<Record<string, Channel>>(
        (prev, current) => {
          if ("channels" in current) {
            current.channels.forEach((ch) => {
              prev[ch.id] = ch
            })
          } else {
            prev[current.id] = current
          }

          return prev
        },
        {}
      )
      return channels[channelID]
    }
  }, [server, channelID])

  if (!channelID || !channel || !currentUser) {
    return null
  }

  return (
    <div className="flex-1 relative">
      <DefaultLayout.LayoutHeaderPanel variant="ghost">
        <div className="flex items-center gap-3">
          <Volume2 className="h-[1.4rem]" />
          <p>{channel.name}</p>
        </div>
      </DefaultLayout.LayoutHeaderPanel>

      {!currentChannel && (
        <PixelLiquidBg className="absolute h-full w-full" pixelSize={1} />
      )}

      {!currentChannel && (
        <div className="absolute w-full h-full flex items-center justify-center">
          <div className="flex flex-col gap-4 justify-center px-4">
            <h1 className="text-center text-4xl font-extrabold tracking-tight text-balance">
              {channel.name}
            </h1>
            <p className="text-center">
              {t("views.server.views.voice-channel.nobody")}
            </p>

            <div className="flex justify-center">
              <Button onClick={() => join({ channel })}>
                {t("common.join")}
              </Button>
            </div>
          </div>
        </div>
      )}

      {currentChannel && (
        <div className="absolute w-full h-full flex items-center justify-center">
          <div className="flex flex-col gap-4 justify-center">
            <Button onClick={() => left({ channel })}>
              {t("common.disconnect")}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
