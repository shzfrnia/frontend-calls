import type { uuid4 } from "."

export type Channel = {
  id: uuid4
  name: string
}

export type Server = {
  id: uuid4
  name: string
}

export type ServerDraft = Omit<Server, "id">
