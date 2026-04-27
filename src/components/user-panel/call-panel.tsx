import { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { PhoneOff, RadioIcon } from "lucide-react"

import { useAppDispatch, useAppSelector } from "@/hooks/use-store"

import {
  useUserJoinToChannelMutation,
  useUserLeftChannelMutation,
} from "@/api/ws"

import {
  endCall,
  selectChannel,
  selectConnecting,
} from "@/store/slices/channel-slice"

import { ButtonGroup } from "../ui/button-group"
import { Button } from "../ui-proxy/button"

import { Block } from "../Block"
import { selectCurrentUser } from "@/store/slices/auth-slice"

import { cn } from "@/lib/utils"

export function CallPanel() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [join] = useUserJoinToChannelMutation()
  const [left] = useUserLeftChannelMutation()
  const channel = useAppSelector(selectChannel)
  const connecting = useAppSelector(selectConnecting)
  const currentUser = useAppSelector(selectCurrentUser)

  useEffect(() => {
    if (channel && currentUser) {
      join({ channel, user: currentUser })
    }
  }, [join, channel, currentUser])

  if (!channel || !currentUser) {
    return null
  }

  return (
    <Block
      variant="secondary-3"
      className="flex items-center gap-2 rounded-t-sm px-1 py-2"
    >
      <div className="flex shrink-0 items-center justify-center w-[32px]">
        <RadioIcon
          className={cn(
            "h-[1rem]",
            connecting
              ? "text-yellow-400 dark:text-yellow-500 animate-pulse"
              : "text-green-600 dark:text-green-800"
          )}
        />
      </div>

      <div className="overflow-hidden">
        <NavLink to={`/server/${channel.server_id}/channel/${channel.id}`}>
          <p className="truncate text-[.7rem] not-hover:text-muted-foreground hover:underline">
            Лобби / {channel.name}
          </p>
        </NavLink>
      </div>

      <ButtonGroup className="ml-auto">
        <Button
          size="icon-sm"
          variant="ghost"
          tooltip={t("common.disconnect")}
          onClick={() => {
            left({ user: currentUser, channel })
            dispatch(endCall())
          }}
        >
          <PhoneOff />
        </Button>
      </ButtonGroup>
    </Block>
  )
}
