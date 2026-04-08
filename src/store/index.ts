import { configureStore, combineSlices } from "@reduxjs/toolkit"

import { applicationSlice } from "./slices/application-slice"
import { authSlice } from "./slices/auth-slice"
import { settingsSlice } from "./slices/settings-slice"

import { api } from "@/api"

export const rootReducer = combineSlices(
  api,
  applicationSlice,
  authSlice,
  settingsSlice
)

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
