import { configureStore, combineSlices } from "@reduxjs/toolkit"

import { apiSlice } from "./slices/api-slice"

import { api } from "@/api/application-ws"

export const rootReducer = combineSlices(apiSlice, api)

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
