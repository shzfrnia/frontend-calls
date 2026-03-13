import { createHashRouter } from "react-router-dom"

import App from "./App"
import { StartPage } from "./views/StartPage"
import { HomePage } from "./views/HomePage"

export const router = createHashRouter([
  {
    path: "/",
    Component: App,
    children: [
      { path: "/start-page", Component: StartPage },
      { path: "/home", Component: HomePage },
    ],
  },
])
