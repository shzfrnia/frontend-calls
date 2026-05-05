import { api } from ".."

import { uuid4 } from "@/types"
import type { Server, ServerDraft, Invite } from "@/types/server"

export const serversApi = api.injectEndpoints({
  endpoints: (build) => ({
    createServer: build.mutation<Server, ServerDraft>({
      query: (body) => ({ url: "servers", method: "POST", body }),
    }),
    deleteServer: build.mutation<string, uuid4>({
      query: (id) => ({ url: `servers/${id}`, method: "DELETE" }),
    }),
    getInviteCode: build.mutation<Invite, uuid4>({
      query: (id) => ({ url: `servers/${id}/invite`, method: "POST" }),
    }),
  }),
})

export const {
  useCreateServerMutation,
  useDeleteServerMutation,
  useGetInviteCodeMutation,
} = serversApi
