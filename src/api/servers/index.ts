import { api } from ".."

import type { RootState } from "@/store"

import { endCall } from "@/store/slices/channel-slice"

import type { uuid4 } from "@/types"
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
      invalidatesTags: ["invites"],
    }),
    getInvites: build.query<{ data: Invite[]; count: number }, uuid4>({
      query: (id) => ({ url: `servers/${id}/invites` }),
      providesTags: ["invites"],
    }),
    deleteInvite: build.mutation<void, { server: uuid4; invite: uuid4 }>({
      query: ({ server, invite }) => ({
        url: `servers/${server}/invite/${invite}`,
        method: "DELETE",
      }),
      invalidatesTags: ["invites"],
    }),
    cleanInvites: build.mutation<void, uuid4>({
      query: (id) => ({
        url: `servers/${id}/invites`,
        method: "DELETE",
      }),
      invalidatesTags: ["invites"],
    }),
    getServerByInvite: build.query<Server, string>({
      query: (code) => ({
        url: `servers/invite/${code}`,
      }),
    }),
    joinServerByInvite: build.mutation<void, string>({
      query: (code) => ({
        url: `servers/invite/${code}`,
        method: "POST",
      }),
    }),
    leaveServer: build.mutation<void, uuid4>({
      query: (id) => ({
        url: `servers/${id}/leave`,
        method: "POST",
      }),
      async onQueryStarted(id, { dispatch, getState }) {
        const {
          channel: { channel },
        } = getState() as RootState
        if (channel && channel.server_id == id) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const endpoints = api.endpoints as any
          dispatch(endpoints.leftChannel.initiate())
        }
      },
    }),
  }),
})

export const {
  useCreateServerMutation,
  useDeleteServerMutation,
  useGetInviteCodeMutation,
  useLazyGetInvitesQuery,
  useDeleteInviteMutation,
  useCleanInvitesMutation,
  useLazyGetServerByInviteQuery,
  useJoinServerByInviteMutation,
  useLeaveServerMutation,
} = serversApi
