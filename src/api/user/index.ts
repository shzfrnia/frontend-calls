import { api } from ".."

import type { User } from "@/types/user"

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<User, void>({
      query: () => "users/me",
    }),
    signup: build.mutation<
      User,
      Pick<User, "email" | "login"> & { password: string }
    >({
      query: (body) => ({ url: "users/signup", method: "POST", body }),
    }),
  }),
})

export const { useLazyMeQuery, useSignupMutation } = userApi
