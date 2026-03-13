import { createHashRouter } from "react-router-dom"

import App from "./App"
import { StartPage } from "./views/StartPage"

export const router = createHashRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/start-page",
        Component: StartPage,
      },
    ],
  },
])
