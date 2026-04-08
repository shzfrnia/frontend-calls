import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Settings, Headphones, HeadphoneOff, Mic, MicOff } from "lucide-react"

import { useApplicationData } from "@/hooks/use-application-data"

import { Avatar, AvatarBadge, AvatarFallback } from "../ui/avatar"
import { ButtonGroup } from "../ui/button-group"
import { Button } from "../ui-proxy/button"
import { Spinner } from "../ui/spinner"

import { Block } from "../Block"

import { useAppSelector, useAppDispatch } from "@/hooks/use-store"

import { selectCurrentUser } from "@/store/slices/auth-slice"
import { openSettingsDialog } from "@/store/slices/settings-slice"

export function UserPanel() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const { connectionState } = useApplicationData()
  const currentUser = useAppSelector(selectCurrentUser)

  const [micIsMuted, setMicIsMuted] = useState(false)
  const [headphonesIsMuted, setHeadphonesIsMuted] = useState(false)

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
    // closed: <AvatarBadge className="bg-yellow-400 dark:bg-yellow-500" />,
    closed: <AvatarBadge className="bg-red-600 dark:bg-red-800" />,
    error: <AvatarBadge className="bg-red-600 dark:bg-red-800" />,
  }[connectionState]

  const displayName = currentUser.nickname || currentUser.login

  return (
    <Block
      variant="secondary-2"
      className="flex gap-2 justify-between p-1 rounded-sm"
    >
      <div className="flex gap-2 items-center">
        <Avatar className="overflow-visible">
          <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
          {status}
        </Avatar>

        <div className="flex flex-col overflow-hidden">
          <p className="text-xs truncate">{displayName}</p>
        </div>
      </div>

      <ButtonGroup>
        <Button
          size="icon-sm"
          variant={micIsMuted ? "destructive" : "ghost"}
          tooltip={t(micIsMuted ? "common.mic-on" : "common.mic-off")}
          onClick={() => setMicIsMuted((v) => !v)}
        >
          {micIsMuted ? <MicOff /> : <Mic />}
        </Button>

        <Button
          size="icon-sm"
          variant={headphonesIsMuted ? "destructive" : "ghost"}
          tooltip={t(
            headphonesIsMuted ? "common.headphones-on" : "common.headphones-off"
          )}
          onClick={() => setHeadphonesIsMuted((v) => !v)}
        >
          {headphonesIsMuted ? <HeadphoneOff /> : <Headphones />}
        </Button>

        <Button
          size="icon-sm"
          variant="ghost"
          tooltip={t(`common.settings`)}
          onClick={() => dispatch(openSettingsDialog())}
        >
          <Settings />
        </Button>
      </ButtonGroup>
    </Block>
  )
}
