import { api } from ".."
import { getSocket } from "./socket"

import { RootState } from "@/store"

import { setServers } from "@/store/slices/servers-slice"
import { setConnecting } from "@/store/slices/channel-slice"

import {
  parseWebSocketMessage,
  createWebSocketMessage,
  messageType,
} from "./websocket-message"

import type { User } from "@/types/user"
import type { Channel } from "@/types/server"

type ConnectionState = "connecting" | "online" | "closed" | "error"

export const wsApi = api.injectEndpoints({
  endpoints: (build) => ({
    initWs: build.query<{ connectionState: ConnectionState }, void>({
      keepUnusedDataFor: Number.MAX_SAFE_INTEGER,
      queryFn: () => {
        return {
          data: { connectionState: "connecting" },
        }
      },
      async onCacheEntryAdded(
        _arg,
        {
          updateCachedData,
          cacheDataLoaded,
          cacheEntryRemoved,
          getState,
          dispatch,
        }
      ) {
        const {
          application: { url },
          auth: { token },
        } = getState() as RootState

        updateCachedData((draft) => {
          draft.connectionState = "connecting"
        })

        if (!token) {
          updateCachedData((draft) => {
            draft.connectionState = "error"
          })
          return
        }

        const socket = getSocket(url, { token })

        socket.onopen = () => {
          updateCachedData((draft) => {
            draft.connectionState = "online"
          })
        }

        socket.onclose = () => {
          updateCachedData((draft) => {
            draft.connectionState = "closed"
          })
        }

        try {
          await cacheDataLoaded
          socket.onmessage = ({ data }) => {
            const { type, payload } = parseWebSocketMessage(data)

            switch (type) {
              case messageType.updateServers:
                dispatch(setServers(payload.servers))
                break

              default:
                break
            }
          }
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }

        await cacheEntryRemoved
        socket.close()
      },
    }),

    userJoinToChannel: build.mutation<void, { channel: Channel; user: User }>({
      queryFn: (payload, { dispatch }) => {
        const socket = getSocket()

        if (socket.readyState === WebSocket.OPEN) {
          socket.send(
            createWebSocketMessage({
              type: messageType.userJoinChannel,
              payload,
            })
          )
          dispatch(setConnecting(true))
          return { data: undefined }
        }

        return {
          error: { status: "CUSTOM_ERROR", error: "Socket not connected" },
        }
      },
    }),
    userLeftChannel: build.mutation<void, { channel: Channel; user: User }>({
      queryFn: (payload, { dispatch }) => {
        const socket = getSocket()

        if (socket.readyState === WebSocket.OPEN) {
          socket.send(
            createWebSocketMessage({
              type: messageType.userLeftChannel,
              payload,
            })
          )
          dispatch(setConnecting(false))
          return { data: undefined }
        }

        return {
          error: { status: "CUSTOM_ERROR", error: "Socket not connected" },
        }
      },
    }),
  }),
})

export const {
  useInitWsQuery,
  useUserJoinToChannelMutation,
  useUserLeftChannelMutation,
} = wsApi
