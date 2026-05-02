import { useState } from "react"
import { NavLink, useMatch } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Volume2, Settings, UserRoundPlus } from "lucide-react"

import { useAppSelector } from "@/hooks/use-store"

import { useJoinToChannelMutation } from "@/api/ws"

import { selectChannel } from "@/store/slices/channel-slice"
import { selectCurrentUser } from "@/store/slices/auth-slice"
import { selectServerById } from "@/store/slices/servers-slice"

import { Badge } from "@/components/ui/badge"
import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui-proxy/button"

import { VoiceChannelUser } from "./voice-channel-user"

import type { VoiceChannel } from "@/types/server"

import { cn } from "@/lib/utils"

export function VoiceChannel({ channel }: { channel: VoiceChannel }) {
  const { t } = useTranslation()
  const [join] = useJoinToChannelMutation()
  const currentChannel = useAppSelector(selectChannel)
  const currentUser = useAppSelector(selectCurrentUser)
  const channelIsOpened = useMatch("/server/:serverID/channel/:channelID")
  const server = useAppSelector((state) =>
    selectServerById(state, channel.server_id)
  )
  const [tooltipIsOpened, setTooltipIsOpened] = useState(false)

  const { id, name, settings } = channel
  const { limit } = settings
  const isCurrentCall = currentChannel?.id === id

  if (!currentUser || !server) {
    return null
  }

  const users = Object.values(server.users).filter(
    (user) => user.channel.id === channel.id
  )

  return (
    <div className="flex flex-col gap-1">
      <NavLink
        to={`channel/${id}`}
        onClick={(e) => {
          if (!channelIsOpened && !isCurrentCall) {
            e.preventDefault()
          }

          join({ channel })
        }}
      >
        {({ isActive }) => {
          return (
            <div
              className={cn(
                "group",
                "flex items-center gap-2",

                "p-1",
                "cursor-pointer",
                "rounded-md",
                "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
                isActive
                  ? "bg-accent text-accent-foreground dark:bg-accent/50"
                  : undefined
              )}
            >
              <Volume2
                className={cn(
                  "h-[1rem] shrink-0",
                  isCurrentCall
                    ? "text-green-700 dark:text-green-300"
                    : undefined
                )}
              />

              <div className="grid">
                <p
                  className={cn(
                    "truncate",
                    isCurrentCall
                      ? undefined
                      : "group-[:not(:hover)]:text-muted-foreground"
                  )}
                >
                  {name}
                </p>
              </div>

              <div className="flex ml-auto items-center shrink-0">
                {limit !== 0 && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[.6rem] absolute group-hover:hidden",
                      isCurrentCall || tooltipIsOpened ? "hidden" : undefined
                    )}
                  >
                    0 / {limit}
                  </Badge>
                )}

                <ButtonGroup
                  className={cn(
                    isCurrentCall || tooltipIsOpened ? undefined : "opacity-0",
                    "group-hover:opacity-100"
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                >
                  <Button
                    size="icon-xs"
                    variant="ghost"
                    tooltip={{
                      content: t("common.invite"),
                      onOpenChange: setTooltipIsOpened,
                    }}
                  >
                    <UserRoundPlus />
                  </Button>

                  <Button
                    size="icon-xs"
                    variant="ghost"
                    tooltip={{
                      content: t("common.settings"),
                      onOpenChange: setTooltipIsOpened,
                    }}
                  >
                    <Settings />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          )
        }}
      </NavLink>

      {Boolean(users.length) && (
        <div className="ml-[36px] flex flex-col gap-1">
          {users.map((user) => (
            <VoiceChannelUser key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}
