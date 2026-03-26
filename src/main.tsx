import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import "electron-fetch"

import { store } from "./store"
import { router } from "./routes.ts"

import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { Badge } from "./components/ui/badge.tsx"

import { ThemeProvider } from "./components/theme-provider"

import "./i18n.ts"

import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Provider store={store}>
          <RouterProvider router={router} />
          <Badge
            variant="secondary"
            className="fixed right-[10px] bottom-[10px]"
          >
            0.0.0
          </Badge>
        </Provider>
      </TooltipProvider>
    </ThemeProvider>
  </React.StrictMode>
)

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message)
})
