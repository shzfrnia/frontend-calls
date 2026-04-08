import { createHashRouter } from "react-router-dom"

import App from "./App"
import { LoginPage } from "./views/login-page"
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
        path: "/",
        Component: HomePage,
        children: [{ path: "friends", Component: Friends }],
      },
      { path: ":id", Component: ServerPage },
    ],
  },
  { path: "login", Component: LoginPage },
  { path: "*", Component: Page404 },
])
