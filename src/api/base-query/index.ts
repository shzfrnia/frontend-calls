import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  retry,
  type FetchBaseQueryArgs,
} from "@reduxjs/toolkit/query/react"

import { logout } from "@/store/slices/auth-slice"

import { RootState } from "@/store"

export const baseQuery: (
  baseQueryArgs?: FetchBaseQueryArgs
) => BaseQueryFn<FetchArgs | string, unknown, unknown> = (baseQueryArgs) => {
  const rawBaseQuery = retry(
    fetchBaseQuery({
      ...baseQueryArgs,
      prepareHeaders: (headers, api) => {
        if (baseQueryArgs?.prepareHeaders) {
          baseQueryArgs.prepareHeaders(headers, api)
        }

        const {
          auth: { token },
        } = api.getState() as RootState

        if (token) {
          headers.set("authorization", `Bearer ${token}`)
        }

        return headers
      },
    }),
    { maxRetries: 0 }
  )

  return async (args, api, extraOptions) => {
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

    const result = await rawBaseQuery(dynamicArgs, api, extraOptions)

    if (result.error && result.error.status === 401) {
      api.dispatch(logout())
    }

    return result
  }
}
