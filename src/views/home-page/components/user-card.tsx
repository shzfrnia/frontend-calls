import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
  ItemGroup,
} from "@/components/ui/item"
import { X } from "lucide-react"

export function UserCardList({ children }: { children: React.ReactNode }) {
  return <ItemGroup className="gap-1">{children}</ItemGroup>
}

export function UserCard({
  avatar,
  username,
}: {
  avatar: string
  username: string
}) {
  return (
    <Item variant="default" className="p-1">
      <ItemMedia>
        <Avatar>
          <AvatarImage src={avatar} className="grayscale" />
          <AvatarFallback>{username.charAt(0)}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent className="gap-1">
        <ItemTitle>{username}</ItemTitle>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="icon-xs" className="rounded-full">
          <X />
        </Button>
      </ItemActions>
    </Item>
  )
}
