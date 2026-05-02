import { api } from ".."
import { getSocket } from "./socket"

import { RootState } from "@/store"

import {
  setServers,
  userJoined,
  userLeft,
  updateChannelUser,
} from "@/store/slices/servers-slice"
import { setConnecting, endCall, initCall } from "@/store/slices/channel-slice"
import { setHeadphonesIsMute, setMicMute } from "@/store/slices/settings-slice"

import {
  parseWebSocketMessage,
  createWebSocketMessage,
  messageType,
} from "./websocket-message"

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
          settings: { headphonesIsMuted, micIsMuted },
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

        const socket = getSocket(url, { token, micIsMuted, headphonesIsMuted })

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
            const {
              auth: { user: currentUser },
            } = getState() as RootState

            const { type, payload } = parseWebSocketMessage(data)

            switch (type) {
              case messageType.updateServers:
                dispatch(setServers(payload.servers))
                break

              case messageType.userJoinChannel: {
                if (currentUser && currentUser.id === payload.user.id) {
                  dispatch(setConnecting(false))
                }
                dispatch(
                  userJoined({ ...payload.user, channel: payload.channel })
                )
                break
              }

              case messageType.userLeftChannel:
                dispatch(
                  userLeft({ ...payload.user, channel: payload.channel })
                )
                break
              case messageType.updateChannelUser:
                dispatch(
                  updateChannelUser({
                    ...payload.user,
                    channel: payload.channel,
                  })
                )
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

    joinToChannel: build.mutation<void, { channel: Channel }>({
      queryFn: (payload, { dispatch, getState }) => {
        const socket = getSocket()
        const {
          auth: { user },
          settings: { micIsMuted, headphonesIsMuted },
          channel: { channel: currentChannel },
        } = getState() as RootState

        if (
          user &&
          socket.readyState === WebSocket.OPEN &&
          currentChannel?.id !== payload.channel.id
        ) {
          socket.send(
            createWebSocketMessage({
              type: messageType.userJoinChannel,
              payload: {
                channel: payload.channel.id,
                mute: { head: headphonesIsMuted, mic: micIsMuted },
              },
            })
          )
          dispatch(initCall({ channel: payload.channel }))
          return { data: undefined }
        }

        return {
          error: { status: "CUSTOM_ERROR", error: "Socket not connected" },
        }
      },
    }),

    leftChannel: build.mutation<void, void>({
      queryFn: (_payload, { dispatch, getState }) => {
        const socket = getSocket()
        const {
          auth: { user },
          channel: { channel },
        } = getState() as RootState

        if (user && channel && socket.readyState === WebSocket.OPEN) {
          socket.send(
            createWebSocketMessage({ type: messageType.userLeftChannel })
          )
          dispatch(endCall())
          return { data: undefined }
        }

        return {
          error: { status: "CUSTOM_ERROR", error: "Socket not connected" },
        }
      },
    }),

    mute: build.mutation<
      void,
      { mic?: boolean; head: boolean } | { mic: boolean; head?: boolean }
    >({
      queryFn: (payload, { dispatch, getState }) => {
        const socket = getSocket()
        const {
          auth: { user },
          settings: { headphonesIsMuted, micIsMuted },
          channel: { channel },
        } = getState() as RootState

        const { head = headphonesIsMuted, mic = micIsMuted } = payload

        dispatch(setMicMute(mic))
        dispatch(setHeadphonesIsMute(head))

        if (user && channel && socket.readyState === WebSocket.OPEN) {
          socket.send(
            createWebSocketMessage({
              type: messageType.userUpdateMute,
              payload: { head, mic },
            })
          )

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
  useJoinToChannelMutation,
  useLeftChannelMutation,
  useMuteMutation,
} = wsApi
