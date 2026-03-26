import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { RootState } from "@/store"
import { getSocket } from "./socket"

import { type Server } from "@/types/server"

type ConnectionState = "connecting" | "online" | "closed" | "error"

export const api = createApi({
  reducerPath: "ws",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (build) => ({
    applicationData: build.query<
      { servers: Server[]; connectionState: ConnectionState },
      void
    >({
      queryFn: () => {
        return {
          data: { servers: [], connectionState: "connecting" },
        }
      },
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }
      ) {
        const state = getState() as RootState

        updateCachedData((draft) => {
          draft.connectionState = "connecting"
        })

        await new Promise((r) => setTimeout(r, 1000))

        const socket = getSocket(state.api.url)

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
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded
          socket.onmessage = ({ data }) => {
            const { type, payload } = JSON.parse(data)

            switch (type) {
              case "update-application-data":
                updateCachedData((draft) => {
                  draft.servers = payload.servers
                })
                break

              default:
                break
            }
          }
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        // socket.close()
      },
    }),
  }),
})

export const { useApplicationDataQuery } = api
