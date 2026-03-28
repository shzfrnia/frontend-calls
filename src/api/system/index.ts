import { api } from ".."

export const systemApi = api.injectEndpoints({
  endpoints: (build) => ({
    getServerInfo: build.query<{ version: string }, void>({
      query: () => `check`,
    }),
  }),
})

export const { useGetServerInfoQuery } = systemApi
