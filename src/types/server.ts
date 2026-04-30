import type { uuid4 } from "."
import type { ChannelUser } from "./user"

export type Server = {
  id: uuid4
  name: string
}

export type WSServer = Server & {
  users: Record<uuid4, ChannelUser>
  channels: Array<Category | VoiceChannel>
}

export type ServerDraft = Omit<Server, "id">

export type Channel = {
  id: uuid4
  name: string
  order: number
  category_id: uuid4
  server_id: uuid4
}

export type VoiceChannel = Channel & {
  settings: { limit: number }
}

export type Category = {
  id: uuid4
  order: number
  name: string
  server_id: uuid4
  channels: VoiceChannel[]
}

export const isCategory = (
  channel: WSServer["channels"][number]
): channel is Category => {
  return "channels" in channel
}
