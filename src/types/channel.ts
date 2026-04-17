import { uuid4 } from "."

type Channel = {
  id: uuid4
  name: string
}

export type VoiceChannel = Channel & {
  settings: { limit: number }
}
