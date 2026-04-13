import { RootState } from "@/store"
import { getSocket } from "./socket"

import { api } from ".."

import { type Server } from "@/types/server"

type ConnectionState = "connecting" | "online" | "closed" | "error"

export const applicationWs = api.injectEndpoints({
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
        const {
          application: { url },
          auth: { token },
        } = getState() as RootState

        updateCachedData((draft) => {
          draft.connectionState = "connecting"
        })

        await new Promise((r) => {
          setTimeout(r, 1000)
        })

        if (!token) {
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

export const { useApplicationDataQuery } = applicationWs
