import { createSlice } from "@reduxjs/toolkit"

import type { RootState } from "../index"

const initialState: { opened: boolean } = {
  opened: false,
}

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
  },
})

export const { openSettingsDialog, closeSettingsDialog } = settingsSlice.actions

export const selectSettingsDialog = (state: RootState) => state.settings
