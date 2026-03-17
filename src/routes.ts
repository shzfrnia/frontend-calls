import { createHashRouter } from "react-router-dom"

import App from "./App"
import { StartPage } from "./views/start-page"
import { HomePage } from "./views/home-page"
import { ServerPage } from "./views/server-page"
import { Friends } from "./views/friends"
import { Page404 } from "./views/404"

export const router = createHashRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "home",
        Component: HomePage,
        children: [{ path: "friends", Component: Friends }],
      },
      { path: ":id", Component: ServerPage },
    ],
  },
  { path: "start-page", Component: StartPage },
  { path: "*", Component: Page404 },
])
