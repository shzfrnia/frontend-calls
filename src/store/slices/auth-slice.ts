import { createSlice, createSelector } from "@reduxjs/toolkit"

import { authApi } from "@/api/auth"
import { userApi } from "@/api/user"

import type { User } from "@/types/user"
import type { RootState } from ".."

const TOKEN_LOCAL_STORAGE_KEY = "token"

const initialState: {
  user: User | null
  token: string | null
} = {
  user: null,
  token: localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY),
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, "")

      return { ...initialState, token: "" }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.token = action.payload.access_token
        localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, state.token)
      }
    )
    builder.addMatcher(userApi.endpoints.me.matchFulfilled, (state, action) => {
      state.user = action.payload
    })
  },
})

export const { logout } = authSlice.actions

const selectCurrentUserRaw = (state: RootState) => state.auth.user
export const selectCurrentUser = createSelector(
  [selectCurrentUserRaw],
  (user) =>
    user ? { ...user, displayName: user.nickname || user.login } : null
)

export const selectToken = (state: RootState) => state.auth.token

export default authSlice.reducer
