import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  type FetchBaseQueryArgs,
} from "@reduxjs/toolkit/query/react"

import { RootState } from "@/store"

export const baseQuery: (
  baseQueryArgs?: FetchBaseQueryArgs
) => BaseQueryFn<FetchArgs | string, unknown, unknown> = (baseQueryArgs) => {
  const rawBaseQuery = fetchBaseQuery(baseQueryArgs)

  return (args, api, extraOptions) => {
    const {
      application: { url: baseUrl },
    } = api.getState() as RootState

    if (!baseUrl) {
      return { error: { status: 400, data: "No base URL available" } }
    }

    const preparedBaseUrl = `${baseUrl}${baseQueryArgs?.baseUrl || "/"}`

    const dynamicArgs =
      typeof args === "string"
        ? { url: preparedBaseUrl + args }
        : { ...args, url: preparedBaseUrl + args.url }
    return rawBaseQuery(dynamicArgs, api, extraOptions)
  }
}
