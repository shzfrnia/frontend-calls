import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"

import { store } from "./store/index.ts"
import { ThemeProvider } from "./components/theme-provider.tsx"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import "electron-fetch"
import { router } from "./routes.ts"
import "./index.css"
import "./i18n.ts"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </TooltipProvider>
    </ThemeProvider>
  </React.StrictMode>
)

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message)
})
