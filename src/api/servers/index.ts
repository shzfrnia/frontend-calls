import { api } from ".."

import type { Server, ServerDraft } from "@/types/server"

export const serversApi = api.injectEndpoints({
  endpoints: (build) => ({
    createServer: build.mutation<Server, ServerDraft>({
      query: (body) => ({ url: "servers", method: "POST", body }),
    }),
  }),
})

export const { useCreateServerMutation } = serversApi
