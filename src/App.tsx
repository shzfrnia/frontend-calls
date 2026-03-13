import { Outlet } from "react-router-dom"

import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

import "./App.css"
import { useApplicationServer } from "./services/app-server"
import { ThemeToggler } from "@/components/ThemeToggler"
import { LocalizationToggler } from "@/components/LocalizationToggler"

function App() {
  useApplicationServer()

  return (
    <ThemeProvider>
      <Toaster />

      {/* <ThemeToggler /> */}
      {/* <LocalizationToggler /> */}

      <Outlet />
    </ThemeProvider>
  )
}

export default App
