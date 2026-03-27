import { configureStore, combineSlices } from "@reduxjs/toolkit"

import { applicationSlice } from "./slices/application-slice"

import { applicationWs } from "@/api/application-ws"
import { systemApi } from "@/api/system"

export const rootReducer = combineSlices(
  applicationSlice,
  applicationWs,
  systemApi
)

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      applicationWs.middleware,
      systemApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
