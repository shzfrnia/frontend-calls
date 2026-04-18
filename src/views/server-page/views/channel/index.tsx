import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Volume2 } from "lucide-react"

import { useAppDispatch, useAppSelector } from "@/hooks/use-store"

import {
  selectChannel,
  // initCall,
  endCall,
} from "@/store/slices/channel-slice"

import { PixelLiquidBg } from "@/components/unlumen-ui/pixel-liquid-bg"

import { DefaultLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"

export function Channel() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { channelID } = useParams()
  const channel = useAppSelector(selectChannel)

  if (!channelID) {
    return null
  }

  return (
    <div className="flex-1 relative">
      <DefaultLayout.LayoutHeaderPanel variant="ghost">
        <div className="flex items-center gap-3">
          <Volume2 className="h-[1.4rem]" />
          <p>{channelID}</p>
        </div>
      </DefaultLayout.LayoutHeaderPanel>

      {!channel && (
        <PixelLiquidBg className="absolute h-full w-full" pixelSize={1} />
      )}

      {!channel && (
        <div className="absolute w-full h-full flex items-center justify-center">
          <div className="flex flex-col gap-4 justify-center">
            <h1 className="text-center text-4xl font-extrabold tracking-tight text-balance">
              {channelID}
            </h1>
            <p>{t("views.server.views.voice-channel.nobody")}</p>
            <Button
            // onClick={() => dispatch(initCall({ channel }))}
            >
              {t("common.join")}
            </Button>
          </div>
        </div>
      )}

      {channel && (
        <div className="absolute w-full h-full flex items-center justify-center">
          <div className="flex flex-col gap-4 justify-center">
            <Button onClick={() => dispatch(endCall())}>
              {t("common.disconnect")}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
