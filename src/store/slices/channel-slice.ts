import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { RootState } from "../index"

import type { Channel } from "@/types/server"

const initialState: { channel: Channel | null; nextChannel: Channel | null } = {
  channel: null,
  nextChannel: null,
} as const

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    initCall: (
      state,
      action: PayloadAction<{
        channel: NonNullable<(typeof initialState)["channel"]>
        force?: boolean
      }>
    ) => {
      const { channel, force } = action.payload
      state.channel = channel

      // if (force) {
      //   if (force) {
      //     state.channel = channel

      //     return
      //   }
      // }

      // if (state.channel && state.channel !== channel) {
      //   if (state.nextChannel === channel) {
      //     state.channel = channel
      //     state.nextChannel = null
      //   } else {
      //     state.nextChannel = channel
      //   }
      // } else {
      //   state.channel = channel
      // }
    },
    endCall: (state) => {
      state.channel = null
    },
    resetNextCall: (state) => {
      state.nextChannel = null
    },
  },
})

export const { initCall, endCall, resetNextCall } = channelSlice.actions

export const selectChannel = (state: RootState) => state.channel.channel
export const selectNextChannel = (state: RootState) => state.channel.nextChannel
