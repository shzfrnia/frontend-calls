import { Outlet } from "react-router-dom"

import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

import "./App.css"
import { useApplicationServer } from "./services/app-server"

function App() {
  useApplicationServer()

  // fetch("https://dummyjson.com/todos/random")
  //   .then((res) => res.json())
  //   .then((body) => console.log(body))

  return (
    <ThemeProvider>
      <Toaster />

      <Outlet />
    </ThemeProvider>
  )
}

export default App
