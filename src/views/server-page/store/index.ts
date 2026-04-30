import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { RootState } from "@/store"

import type { WSServer } from "@/types/server"

const initialState: { server: WSServer | null } = {
  server: null,
} as const

export const serverViewSlice = createSlice({
  name: "serverView",
  initialState,
  reducers: {
    setServer: (state, action: PayloadAction<WSServer>) => {
      state.server = action.payload
    },
  },
})

export const { setServer } = serverViewSlice.actions

export const selectServer = (state: RootState) => state.serverView.server
