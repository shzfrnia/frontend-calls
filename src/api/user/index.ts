import { api } from ".."

import type { User } from "@/types/user"

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<User, void>({
      query: () => "users/me",
    }),
  }),
})

export const { useLazyMeQuery, useMeQuery } = userApi
