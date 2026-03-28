import { createApi } from "@reduxjs/toolkit/query/react"

import { baseQuery } from "../base-query"

export const systemApi = createApi({
  reducerPath: "systemApi",
  baseQuery: baseQuery,
  endpoints: (build) => ({
    getServerInfo: build.query<{ version: string }, void>({
      query: () => `/api/check`,
    }),
  }),
})

export const { useGetServerInfoQuery } = systemApi
