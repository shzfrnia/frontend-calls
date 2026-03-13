import { Outlet } from "react-router-dom"

import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

import "./App.css"
import { useApplicationServer } from "./services/app-server"
// import { ThemeToggler } from "@/components/ThemeToggler"
// import { LocalizationToggler } from "@/components/LocalizationToggler"

function App() {
  useApplicationServer()

  return (
    <ThemeProvider>
      <Toaster />
      {/* <div className="flex gap-5 mb-5">
        <ThemeToggler />
        <LocalizationToggler />
      </div> */}

      <Outlet />
    </ThemeProvider>
  )
}

export default App
