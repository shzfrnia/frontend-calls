import { api } from ".."

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<{ access_token: string }, FormData>({
      query: (body) => ({ url: `login/access-token`, method: "POST", body }),
    }),
  }),
})

export const { useLoginMutation } = authApi
