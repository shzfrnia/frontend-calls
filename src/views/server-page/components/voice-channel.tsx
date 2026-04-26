import { NavLink, useMatch } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Volume2, Settings, UserRoundPlus } from "lucide-react"

import { cn } from "@/lib/utils"

import { useAppDispatch, useAppSelector } from "@/hooks/use-store"

import { initCall, selectChannel } from "@/store/slices/channel-slice"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui-proxy/button"

import { VoiceChannelUser } from "./voice-channel-user"

import type { VoiceChannel } from "@/types/channel"
import { selectCurrentUser } from "@/store/slices/auth-slice"

export function VoiceChannel({ channel }: { channel: VoiceChannel }) {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const currentChannel = useAppSelector(selectChannel)
  const currentUser = useAppSelector(selectCurrentUser)
  const channelIsOpened = useMatch("/server/:serverID/channel/:channelID")

  const { id, name, settings } = channel
  const { limit } = settings
  const isCurrentCall = currentChannel?.id === id

  return (
    <div className="flex flex-col gap-1">
      <NavLink
        to={`channel/${id}`}
        onClick={(e) => {
          if (!channelIsOpened && !isCurrentCall) {
            e.preventDefault()
          }

          dispatch(initCall({ channel }))
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
                    className="text-[.6rem] group-hover:pointer-events-none group-hover:opacity-0 group-hover:absolute"
                  >
                    0 / {limit}
                  </Badge>
                )}

                <div
                  className="opacity-0 absolute pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-hover:static"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                >
                  <Button
                    size="icon-xs"
                    variant="ghost"
                    tooltip={t("common.invite")}
                  >
                    <UserRoundPlus />
                  </Button>

                  <Button
                    size="icon-xs"
                    variant="ghost"
                    tooltip={t("common.settings")}
                  >
                    <Settings />
                  </Button>
                </div>
              </div>
            </div>
          )
        }}
      </NavLink>

      {isCurrentCall && (
        <div className="ml-[36px]">
          <VoiceChannelUser user={currentUser} />
        </div>
      )}
    </div>
  )
}
