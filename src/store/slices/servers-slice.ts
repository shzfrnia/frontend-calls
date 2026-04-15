import {
  createSlice,
  createEntityAdapter,
  createSelector,
  type PayloadAction,
} from "@reduxjs/toolkit"

import type { RootState } from "../index"

import type { Server } from "@/types/server"
import { uuid4 } from "@/types"

const serversAdapter = createEntityAdapter<Server>()

const initialState = serversAdapter.getInitialState<{
  loaded: boolean
  leaveServerDialog: null | uuid4
}>({
  loaded: false,
  leaveServerDialog: null,
})

export const serversSlice = createSlice({
  name: "servers",
  initialState,
  reducers: {
    setServers: (state, action: PayloadAction<Server[]>) => {
      serversAdapter.setAll(state, action.payload)
      state.loaded = true
    },
    openLeaveServerDialog: (state, action: PayloadAction<uuid4>) => {
      state.leaveServerDialog = action.payload
    },
    closeLeaveServerDialog: (state) => {
      state.leaveServerDialog = null
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

const selectLeaveServerDialog = (state: RootState) =>
  state.servers.leaveServerDialog
export const selectLeaveServer = createSelector(
  [selectLeaveServerDialog, serverEntities],
  (serverID, servers) => (serverID ? servers[serverID] : null)
)

export const { setServers, openLeaveServerDialog, closeLeaveServerDialog } =
  serversSlice.actions
