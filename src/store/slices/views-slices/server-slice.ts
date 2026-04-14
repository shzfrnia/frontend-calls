import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { RootState } from "../../index"

import type { Server } from "@/types/server"

const initialState: { server: Server | null } = {
  server: null,
} as const

export const serverViewSlice = createSlice({
  name: "serverView",
  initialState,
  reducers: {
    setServer: (state, action: PayloadAction<Server>) => {
      state.server = action.payload
    },
  },
})

export const { setServer } = serverViewSlice.actions

export const selectServer = (state: RootState) => state.serverView.server
