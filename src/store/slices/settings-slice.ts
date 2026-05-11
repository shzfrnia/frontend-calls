import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { RootState } from "../index"

const MIC_STATE_KEY = "mic-muted"
const HEAD_STATE_KEY = "head-muted"

const initialState: {
  opened: boolean
  micIsMuted: boolean
  headphonesIsMuted: boolean
} = {
  opened: false,
  micIsMuted: Boolean(localStorage.getItem(MIC_STATE_KEY)),
  headphonesIsMuted: Boolean(localStorage.getItem(HEAD_STATE_KEY)),
} as const

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    openSettingsDialog: (state) => {
      state.opened = true
    },
    closeSettingsDialog: (state) => {
      state.opened = false
    },
    setMicMute: (state, action: PayloadAction<boolean>) => {
      state.micIsMuted = action.payload

      localStorage.setItem(MIC_STATE_KEY, state.micIsMuted ? "true" : "")
    },
    setHeadphonesIsMute: (state, action: PayloadAction<boolean>) => {
      state.headphonesIsMuted = action.payload

      localStorage.setItem(
        HEAD_STATE_KEY,
        state.headphonesIsMuted ? "true" : ""
      )
    },
  },
})

export const {
  openSettingsDialog,
  closeSettingsDialog,
  setMicMute,
  setHeadphonesIsMute,
} = settingsSlice.actions

export const selectSettingsDialog = (state: RootState) => state.settings
export const selectMicIsMuted = (state: RootState) => state.settings.micIsMuted
export const selectHeadphonesIsMuted = (state: RootState) =>
  state.settings.headphonesIsMuted
