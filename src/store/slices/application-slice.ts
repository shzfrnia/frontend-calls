import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import type { RootState } from "../index"

const APP_SERVER_URL_KEY = "application-server-url"

export function setApplicationServerUrlLocalStorage(url: string) {
  localStorage.setItem(APP_SERVER_URL_KEY, url)
}

export function getApplicationServerUrlLocalStorage(): string {
  return localStorage.getItem(APP_SERVER_URL_KEY) || ""
}

const initialState: { url: string } = {
  url: getApplicationServerUrlLocalStorage(),
}

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setApplicationServerUrl: (state, action: PayloadAction<string>) => {
      const url = action.payload
      setApplicationServerUrlLocalStorage(url)
      state.url = url
    },
  },
})

export const { setApplicationServerUrl } = applicationSlice.actions

export const selectApplicationServerUrl = (state: RootState) =>
  state.application.url
