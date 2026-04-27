import type { User } from "@/types/user"
import type { Server, Channel } from "@/types/server"

export const messageType = {
  userJoinChannel: "user-join-channel",
  userLeftChannel: "user-left-channel",
  updateServers: "update-servers",
} as const

type MessageType =
  | {
      type: typeof messageType.userJoinChannel
      payload: { channel: Channel; user: User }
    }
  | {
      type: typeof messageType.userLeftChannel
      payload: { channel: Channel; user: User }
    }

export const createWebSocketMessage = <T extends MessageType["type"]>(
  message: Extract<MessageType, { type: T }>
): string => {
  return JSON.stringify(message)
}

type ReceiveMessageType =
  | {
      type: typeof messageType.updateServers
      payload: { servers: Server[] }
    }
  | Extract<
      MessageType,
      {
        type:
          | typeof messageType.userJoinChannel
          | typeof messageType.userLeftChannel
      }
    >

export const parseWebSocketMessage = <T extends ReceiveMessageType["type"]>(
  message: string
): Extract<ReceiveMessageType, { type: T }> => {
  const parsedMessage = JSON.parse(message)
  return parsedMessage
}
