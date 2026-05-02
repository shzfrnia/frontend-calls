import { api } from ".."

import { uuid4 } from "@/types"
import type { Server, ServerDraft } from "@/types/server"

export const serversApi = api.injectEndpoints({
  endpoints: (build) => ({
    createServer: build.mutation<Server, ServerDraft>({
      query: (body) => ({ url: "servers", method: "POST", body }),
    }),
    deleteServer: build.mutation<string, uuid4>({
      query: (id) => ({ url: `servers/${id}`, method: "DELETE" }),
    }),
  }),
})

export const { useCreateServerMutation, useDeleteServerMutation } = serversApi
