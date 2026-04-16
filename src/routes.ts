import { createHashRouter } from "react-router-dom"

import App from "./App"

import { LoginPage } from "./views/login-page"
import { HomePage } from "./views/home-page"
import { Friends } from "./views/home-page/views/friends"
import { ServerPage } from "./views/server-page"
import { Users } from "./views/server-page/views/users"
import { Channel } from "./views/server-page/views/channel"
import { Page404 } from "./views/404"

export const router = createHashRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: HomePage,
        children: [{ path: "friends", Component: Friends }],
      },
      {
        path: "server/:serverID",
        Component: ServerPage,
        children: [
          { path: "users", Component: Users },
          { path: "channel/:channelID", Component: Channel },
        ],
      },
    ],
  },
  { path: "login", Component: LoginPage },
  { path: "*", Component: Page404 },
])
