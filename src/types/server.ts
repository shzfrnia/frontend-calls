export type uuid4 = string

export type Channel = {
  id: uuid4
  name: string
}

export type Server = {
  id: uuid4
  name: string
  icon: string
  channels: Channel[]
}
