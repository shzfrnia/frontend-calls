import type { uuid4 } from "."

import type { Channel } from "./server"

export type User = {
  email: string
  login: string
  nickname: string | null
  is_active: boolean
  is_superuser: boolean
  id: uuid4
  created_at: string
  display_name: string
}

export type ChannelUser = User & {
  mic_mute: boolean
  head_mute: boolean
  channel: Channel
}
