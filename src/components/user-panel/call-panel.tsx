import { NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { AudioLines, PhoneOff } from "lucide-react"

import { useAppDispatch, useAppSelector } from "@/hooks/use-store"

import { endCall, selectChannel } from "@/store/slices/channel-slice"

import { ButtonGroup } from "../ui/button-group"
import { Button } from "../ui-proxy/button"

import { Block } from "../Block"

export function CallPanel() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const channel = useAppSelector(selectChannel)

  if (!channel) {
    return null
  }

  return (
    <Block
      variant="secondary-3"
      className="flex items-center gap-2 rounded-t-sm px-1 py-2"
    >
      <div className="flex items-center justify-center w-[32px]">
        <AudioLines className="h-[1rem]" />
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
          onClick={() => dispatch(endCall())}
        >
          <PhoneOff />
        </Button>
      </ButtonGroup>
    </Block>
  )
}
