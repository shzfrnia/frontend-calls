import type { User } from "@/types/user"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function VoiceChannelUser({ user }: { user: User }) {
  const name = user.display_name

  return (
    <div className="flex gap-2 items-center">
      <Avatar size="sm">
        <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
      </Avatar>

      <p className="text-muted-foreground text-[0.8rem]">{name}</p>
    </div>
  )
}
