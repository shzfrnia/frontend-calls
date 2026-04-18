import type { uuid4 } from "."

export type Server = {
  id: uuid4
  name: string
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
  channels: Channel[]
}
