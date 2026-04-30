import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { Headphones, HeadphoneOff, Mic, MicOff } from "lucide-react"

import { useAppSelector, useAppDispatch } from "@/hooks/use-store"
import {
  useInitWsQuery,
  useMuteHeadMutation,
  useMuteMicMutation,
} from "@/api/ws"

import { selectChannel } from "@/store/slices/channel-slice"
import { selectCurrentUser } from "@/store/slices/auth-slice"
import {
  openSettingsDialog,
  selectHeadphonesIsMuted,
  selectMicIsMuted,
} from "@/store/slices/settings-slice"

import { SettingsIcon, type SettingsIconHandle } from "../ui/settings"
import { Avatar, AvatarBadge, AvatarFallback } from "../ui/avatar"
import { ButtonGroup } from "../ui/button-group"
import { Button } from "../ui-proxy/button"
import { Spinner } from "../ui/spinner"

import { Block } from "../Block"
import { CallPanel } from "./call-panel"

import { cn } from "@/lib/utils"

export function UserPanel() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const { data: { connectionState } = { connectionState: "closed" } } =
    useInitWsQuery()
  const channel = useAppSelector(selectChannel)
  const currentUser = useAppSelector(selectCurrentUser)

  const settingsRef = useRef<SettingsIconHandle>(null)
  const micIsMuted = useAppSelector(selectMicIsMuted)
  const headphonesIsMuted = useAppSelector(selectHeadphonesIsMuted)
  const [muteMic] = useMuteMicMutation()
  const [muteHead] = useMuteHeadMutation()

  if (!currentUser) {
    // TODO skelet
    return null
  }

  const status = {
    connecting: (
      <AvatarBadge>
        <Spinner />
      </AvatarBadge>
    ),
    online: <AvatarBadge className="bg-green-600 dark:bg-green-800" />,
    closed: <AvatarBadge className="bg-yellow-400 dark:bg-yellow-500" />,
    error: <AvatarBadge className="bg-red-600 dark:bg-red-800" />,
  }[connectionState]

  const displayName = currentUser.nickname || currentUser.login

  return (
    <div>
      {channel && <CallPanel />}

      <Block
        variant="secondary-2"
        className={cn("flex p-1", channel ? "rounded-b-sm" : "rounded-sm")}
      >
        <Avatar className="overflow-visible mr-2">
          <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
          {status}
        </Avatar>
        <div className="flex gap-2 items-center overflow-hidden">
          <div className="flex flex-col overflow-hidden">
            <p className="text-xs truncate">{displayName}</p>
          </div>
        </div>

        <ButtonGroup className="ml-auto">
          <Button
            size="icon-sm"
            variant={micIsMuted ? "destructive" : "ghost"}
            tooltip={t(micIsMuted ? "common.mic-on" : "common.mic-off")}
            onClick={() => muteMic(!micIsMuted)}
          >
            {micIsMuted ? <MicOff /> : <Mic />}
          </Button>

          <Button
            size="icon-sm"
            variant={headphonesIsMuted ? "destructive" : "ghost"}
            tooltip={t(
              headphonesIsMuted
                ? "common.headphones-on"
                : "common.headphones-off"
            )}
            onClick={() => muteHead(!headphonesIsMuted)}
          >
            {headphonesIsMuted ? <HeadphoneOff /> : <Headphones />}
          </Button>

          <Button
            size="icon-sm"
            variant="ghost"
            tooltip={t(`common.settings`)}
            onClick={() => dispatch(openSettingsDialog())}
            onMouseMove={settingsRef.current?.startAnimation}
            onMouseLeave={settingsRef.current?.stopAnimation}
          >
            <SettingsIcon ref={settingsRef} />
          </Button>
        </ButtonGroup>
      </Block>
    </div>
  )
}
