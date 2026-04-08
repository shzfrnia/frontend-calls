import { api } from ".."

export const systemApi = api.injectEndpoints({
  endpoints: (build) => ({
    getServerInfo: build.query<{ version: string }, void>({
      query: () => `utils/health-check`,
    }),
  }),
})

export const { useGetServerInfoQuery } = systemApi
