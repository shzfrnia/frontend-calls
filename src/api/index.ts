import { createApi } from "@reduxjs/toolkit/query/react"

import { baseQuery } from "./base-query"

export const api = createApi({
  baseQuery: baseQuery({ baseUrl: "/api/v1/" }),
  tagTypes: [],
  endpoints: () => ({}),
})

// https://redux-toolkit.js.org/rtk-query/usage/examples
// https://codesandbox.io/p/sandbox/github/reduxjs/redux-toolkit/tree/master/examples/query/react/kitchen-sink?from-embed
