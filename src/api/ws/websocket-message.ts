import type { uuid4 } from "@/types"
import type { ChannelUser } from "@/types/user"
import type { WSServer, Channel } from "@/types/server"

export const messageType = {
  userJoinChannel: "user-join-channel",
  userLeftChannel: "user-left-channel",
  updateServers: "update-servers",
  userUpdateMute: "user-update-mute",
  updateChannelUser: "update-channel-user",
} as const

type SendMessageType =
  | {
      type: typeof messageType.userJoinChannel
      payload: { channel: uuid4; mute: { mic: boolean; head: boolean } }
    }
  | {
      type: typeof messageType.userLeftChannel
    }
  | {
      type: typeof messageType.userUpdateMute
      payload: { mic: boolean; head: boolean }
    }

export const createWebSocketMessage = <T extends SendMessageType["type"]>(
  message: Extract<SendMessageType, { type: T }>
): string => {
  return JSON.stringify(message)
}

type ReceiveMessageType =
  | {
      type: typeof messageType.updateServers
      payload: { servers: WSServer[] }
    }
  | {
      type: typeof messageType.userJoinChannel
      payload: { channel: Channel; user: ChannelUser }
    }
  | {
      type: typeof messageType.userLeftChannel
      payload: { channel: Channel; user: ChannelUser }
    }
  | {
      type: typeof messageType.updateChannelUser
      payload: { channel: Channel; user: ChannelUser }
    }

export const parseWebSocketMessage = <T extends ReceiveMessageType["type"]>(
  message: string
): Extract<ReceiveMessageType, { type: T }> => {
  const parsedMessage = JSON.parse(message)
  return parsedMessage
}
