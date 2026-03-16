import { MessageCircle, EllipsisVertical } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export function UserCardList({ children }: { children: React.ReactNode }) {
  return <ItemGroup className="gap-1">{children}</ItemGroup>
}

export function UserCard({
  avatar,
  username,
  email,
}: {
  avatar: string
  username: string
  email: string
}) {
  return (
    <Item variant="outline" className="cursor-pointer">
      <ItemMedia>
        <Avatar>
          <AvatarImage src={avatar} className="grayscale" />
          <AvatarFallback>{username.charAt(0)}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent className="gap-1">
        <ItemTitle>{username}</ItemTitle>
        <ItemDescription>{email}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MessageCircle />
        </Button>

        <Button variant="ghost" size="icon" className="rounded-full">
          <EllipsisVertical />
        </Button>
      </ItemActions>
    </Item>
  )
}
