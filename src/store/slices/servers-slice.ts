import {
  createSlice,
  createEntityAdapter,
  createSelector,
  type PayloadAction,
} from "@reduxjs/toolkit"

import type { RootState } from "../index"

import type { WSServer, Server } from "@/types/server"
import { uuid4 } from "@/types"
import { ChannelUser } from "@/types/user"

const serversAdapter = createEntityAdapter<WSServer>()

const initialState = serversAdapter.getInitialState<{
  loaded: boolean
  leaveServerDialog: null | uuid4
  inviteServerDialog: null | Server
  joinToServerDialog: boolean
  joinToServerAcceptDialog: { server: Server; code: string } | null
  createServerDialog: boolean
}>({
  loaded: false,
  leaveServerDialog: null,
  inviteServerDialog: null,
  joinToServerDialog: false,
  joinToServerAcceptDialog: null,
  createServerDialog: false,
})

export const serversSlice = createSlice({
  name: "servers",
  initialState,
  reducers: {
    setServers: (state, action: PayloadAction<WSServer[]>) => {
      serversAdapter.setAll(state, action.payload)
      state.loaded = true
    },

    openLeaveServerDialog: (state, action: PayloadAction<uuid4>) => {
      state.leaveServerDialog = action.payload
    },
    closeLeaveServerDialog: (state) => {
      state.leaveServerDialog = null
    },

    userJoined: (state, action: PayloadAction<ChannelUser>) => {
      const channelUser = action.payload
      const serverId = channelUser.channel.server_id
      const server = state.entities[serverId]
      const users = { ...server.users }
      users[channelUser.id] = channelUser

      serversAdapter.updateOne(state, {
        id: serverId,
        changes: { users },
      })
    },
    userLeft: (state, action: PayloadAction<ChannelUser>) => {
      const channelUser = action.payload
      const serverId = channelUser.channel.server_id
      const server = state.entities[serverId]
      const users = { ...server.users }
      delete users[channelUser.id]

      serversAdapter.updateOne(state, {
        id: serverId,
        changes: { users },
      })
    },

    updateChannelUser: (state, action: PayloadAction<ChannelUser>) => {
      const channelUser = action.payload
      const serverId = channelUser.channel.server_id
      const server = state.entities[serverId]
      const users = { ...server.users }
      users[channelUser.id] = channelUser

      serversAdapter.updateOne(state, {
        id: serverId,
        changes: { users },
      })
    },

    openInviteServerDialog: (state, action: PayloadAction<Server>) => {
      state.inviteServerDialog = action.payload
    },
    closeInviteServerDialog: (state) => {
      state.inviteServerDialog = null
    },

    openJoinServerDialog: (state) => {
      state.joinToServerDialog = true
    },
    closeJoinServerDialog: (state) => {
      state.joinToServerDialog = false
    },

    openCreateServerDialog: (state) => {
      state.createServerDialog = true
    },
    closeCreateServerDialog: (state) => {
      state.createServerDialog = false
    },

    openJoinServerAcceptDialog: (
      state,
      action: PayloadAction<{ server: Server; code: string }>
    ) => {
      const { server } = action.payload
      if (!state.entities[server.id]) {
        state.joinToServerAcceptDialog = action.payload
      }
    },
    closeJoinServerAcceptDialog: (state) => {
      state.joinToServerAcceptDialog = null
    },
  },
})

export const {
  selectAll: selectServers,
  selectEntities: serverEntities,
  selectById: selectServerById,
  selectTotal: selectServersTotal,
} = serversAdapter.getSelectors<RootState>((state) => state.servers)

export const selectServersLoaded = (state: RootState) => state.servers.loaded
export const selectInviteServerDialog = (state: RootState) =>
  state.servers.inviteServerDialog

const selectLeaveServerDialog = (state: RootState) =>
  state.servers.leaveServerDialog
export const selectLeaveServer = createSelector(
  [selectLeaveServerDialog, serverEntities],
  (serverID, servers) => (serverID ? servers[serverID] : null)
)

export const selectJoinToServerDialog = (state: RootState) =>
  state.servers.joinToServerDialog

export const selectCreateServerDialog = (state: RootState) =>
  state.servers.createServerDialog

export const selectJoinToServerAcceptDialog = (state: RootState) =>
  state.servers.joinToServerAcceptDialog

export const {
  setServers,

  openLeaveServerDialog,
  closeLeaveServerDialog,

  userJoined,
  userLeft,

  updateChannelUser,

  openInviteServerDialog,
  closeInviteServerDialog,

  openJoinServerDialog,
  closeJoinServerDialog,

  openCreateServerDialog,
  closeCreateServerDialog,

  openJoinServerAcceptDialog,
  closeJoinServerAcceptDialog,
} = serversSlice.actions
