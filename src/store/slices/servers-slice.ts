import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
} from "@reduxjs/toolkit"

import type { RootState } from "../index"

import type { Server } from "@/types/server"

const serversAdapter = createEntityAdapter<Server>()

const initialState = serversAdapter.getInitialState({
  loaded: false,
})

export const serversSlice = createSlice({
  name: "servers",
  initialState,
  reducers: {
    setServers: (state, action: PayloadAction<Server[]>) => {
      serversAdapter.setAll(state, action.payload)
      state.loaded = true
    },
  },
})

export const { setServers } = serversSlice.actions

export const selectServersLoading = (state: RootState) => ({
  loaded: state.servers.loaded,
})

export const {
  selectAll: selectServers,
  selectById: selectServerById,
  selectTotal: selectServersTotal,
} = serversAdapter.getSelectors<RootState>((state) => state.servers)
