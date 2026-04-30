import { MicOff, HeadphoneOff } from "lucide-react"

import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui-proxy/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import type { ChannelUser } from "@/types/user"

export function VoiceChannelUser({ user }: { user: ChannelUser }) {
  const name = user.display_name

  return (
    <div className="flex gap-2 items-center pr-1">
      <Avatar size="sm">
        <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
      </Avatar>

      <p className="flex-1 text-muted-foreground text-[0.8rem]">{name}</p>

      <ButtonGroup>
        {(user.mic_mute || user.head_mute) && (
          <Button disabled size="icon-xs" variant="ghost">
            <MicOff />
          </Button>
        )}

        {user.head_mute && (
          <Button disabled size="icon-xs" variant="ghost">
            <HeadphoneOff />
          </Button>
        )}
      </ButtonGroup>
    </div>
  )
}
