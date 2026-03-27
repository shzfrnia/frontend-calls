import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
} from "@reduxjs/toolkit/query/react"

import { RootState } from "@/store"

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "/",
})

export const baseQuery: BaseQueryFn<
  FetchArgs | string,
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  const {
    application: { url: baseUrl },
  } = api.getState() as RootState

  if (!baseUrl) {
    return { error: { status: 400, data: "No base URL available" } }
  }

  const dynamicArgs =
    typeof args === "string"
      ? { url: baseUrl + args }
      : { ...args, url: baseUrl + args.url }

  return rawBaseQuery(dynamicArgs, api, extraOptions)
}
