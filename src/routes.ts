import { createHashRouter } from "react-router-dom"

import App from "./App"
import { StartPage } from "./views/start-page"
import { HomePage } from "./views/home-page"
import { ServerPage } from "./views/server-page"

export const router = createHashRouter([
  {
    path: "/",
    Component: App,
    children: [
      { path: "/home", Component: HomePage },
      { path: "/:id", Component: ServerPage },
    ],
  },
  { path: "/start-page", Component: StartPage },
])
